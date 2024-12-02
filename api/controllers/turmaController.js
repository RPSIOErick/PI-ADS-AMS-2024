const Turmas = require('../models/tb_Turmas');
const Aluno = require('../models/tb_Aluno')
const xlsx = require('xlsx');
const alunoController = require('./alunoController');
const Inscricao = require('../models/tb_Inscricao')
const { Op } = require('sequelize');

const readTurmaFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Arquivo CSV não identificado." });
        }

        const sigaFile = req.file.buffer;
        const alunoWb = xlsx.read(sigaFile, { type: 'buffer' });
        const alunoWs = alunoWb.Sheets[alunoWb.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(alunoWs);

        if (data.length === 0) {
            return res.status(400).json({ error: "Nenhum dado encontrado no arquivo." });
        }

        // Mapeia os dados para incluir apenas RA e Nome
        const alunosFiltrados = data.map((item) => ({
            RA: item["20241"] ? item["20241"].trim() : null,
            Nome: item["IAL021A "] ? item["IAL021A "].trim() : null
        }))
        .filter(aluno => aluno.RA && aluno.Nome && aluno.RA !== "RA" && aluno.Nome !== "ALUNO");

        const alunosConfirmados = [];
        const alunosCriados = [];

        for (const aluno of alunosFiltrados) {
            const alunoExistente = await Aluno.findOne({
                where: {
                    RA: aluno.RA
                }
            });

            if (!alunoExistente) {
                // Simula uma requisição ao método createAluno
                const reqSimulado = {
                    body: {
                        Cod_Curso: req.body.Cod_Curso,
                        Nome: aluno.Nome,
                        RA: aluno.RA
                    }
                };
                const resSimulado = {
                    status: (code) => ({
                        json: (result) => {
                            if (code === 201) alunosCriados.push(result);
                            else console.error("Erro na criação do aluno:", result);
                        }
                    })
                };

                // Chama createAluno diretamente
                await alunoController.createAluno(reqSimulado, resSimulado);
            } else {
                alunosConfirmados.push(alunoExistente);
            }
        }

        // Retorna os alunos encontrados para confirmação
        res.status(200).json({ 
            message: "Processamento concluído.",
            alunosConfirmados,
            alunosCriados 
        });
    } catch (error) {
        console.error("Erro ao ler o arquivo: ", error);
        res.status(500).json({ error: "Erro ao ler o arquivo." });
    }
};


const createTurma = async (req, res) => {
    try {
        const { Nome, Turno, Semestre, Ano, alunos, disciplina } = req.body;

        const turma = await Turmas.create({
            Nome,
            Turno,
            Semestre,
            Ano,
            ID_Disc: disciplina,
            Status: 1
        })

        if(!turma) {
            return res.status(500).json({ error: "Erro ao criar a turma." });
        }

        console.log("Turma com o ID: ", turma.ID_Turma)

        alunos.forEach(async (Cod_Aluno) => {
            await createInscricao(Cod_Aluno, turma.ID_Turma);
        });
        
        res.status(201).json({ message: "Turma e alunos cadastrados com sucesso!" });
    } catch (error) {
        console.error("Erro ao criar a turma: ", error);
        res.status(500).json({ error: "Erro ao criar a turma." });
    }
};

const readTurmas = async (req, res) => {
    try {
        const classes = await Turmas.findAll({
            attributes: ['ID_Turma', 'Nome', 'Turno', 'Semestre', 'Ano', 'ID_Disc', 'Status'], 
            group: ['ID_Turma', 'Nome', 'Turno', 'Semestre', 'Ano', 'ID_Disc', 'Status'], 
        });

        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao ler as turmas do sistema' });
    }
};
  
const readUniTurma = async (req, res) => {

    const { id } = req.params; 

    try {

        

        const turma = await Turmas.findByPk(id);



        if (!turma) {

            return res.status(404).json({ error: 'Turma não encontrada' });

        }



        res.json(turma);

    } catch (error) {

        console.error(error);

        res.status(500).json({ error: 'Deu errado a leitura de uma única turma' });

    }

};

const updateTurma = async (req, res) => {

    const { id } = req.params;
    
    try
    {
        const { Nome, Turno, Semestre, Ano, Disciplina, Status } = req.body;

        const turma = await Turmas.findOne({ where: { ID_Turma: id } });
        
        await turma.update({ Nome, Turno, Semestre, Ano, Disciplina, Status });

        res.status(200).json({ message: "Turma atualizada com sucesso!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Algo deu errado.' });
    }
}

const removeAluno = async (id, array) => {

    try {
    
        array.forEach(Cod_Aluno => {
            
            Turmas.destroy({ where: {
                Cod_Aluno: Cod_Aluno,
                ID_Disc: id
            } })

        });

    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Deu errado' });
    }

}

const addAluno = async (req) => {
    try {
        const id = req.params.id;
        const { Nome, Turno, Semestre, Ano, Disciplina, alunoAddArray, Status } = req.body;

        // Realizando upsert para cada aluno
        await Promise.all(alunoAddArray.map(Cod_Aluno => {
            return Turmas.upsert({
                Cod_Aluno,      
                ID_Disc: id,  
                Nome,        
                Turno,       
                Semestre,   
                Ano,
                Status
            });
        }));

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}


const deleteTurma = async (req, res) => {

    try
    {
        const { id } = req.params;

        const turma = await Turmas.findOne({ where: { ID_Disc: id}})

        turma.destroy();

        res.status(200).json({ message: "Turma deletada com sucesso!" });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

async function createInscricao (Cod_Aluno, ID_Turma) {

    try {

        console.log(Cod_Aluno, ID_Turma);

        const inscricao = await Inscricao.create({
            Cod_Aluno,
            ID_Turma
        });

        if (!inscricao) {
            return res.status(500).json({ error: "Erro ao criar a inscrição." });
        }

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Deu errado' });
    }

}

const changeStatusTurma = async (req, res) => {
    try {
        const { id } = req.params; // ID da turma que será excluído

        // Verificar se o curso existe no banco
        const turma = await Turmas.findByPk(id);
        if (!turma) {
            return res.status(404).json({ error: "Turma não encontrada." });
        }

        // Arquivar o curso
        const turmaStatus = !turma.Status
        await turma.update({ Status: turmaStatus });

        // Retorna uma mensagem de sucesso
        res.json({ message: "Turma alterada com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir turma: ", error);
        res.status(500).json({ error: "Erro ao excluir turma." });
    }
};

module.exports = {
    readTurmaFile,
    createTurma,
    readTurmas,
    readUniTurma,
    deleteTurma,
    updateTurma,
    changeStatusTurma
};