const Inscricao = require('../models/tb_Inscricao');

const createInscricao = async (req, res) => {
    try {
        const { Cod_Aluno, Cod_Curso } = req.body;
        
        // Verificar se os dados estão vindo no body
        console.log('Dados recebidos:', { Cod_Aluno, Cod_Curso});

        // Criar a Inscricao no banco de dados
        const inscricao = await Inscricao.create({Cod_Aluno, Cod_Curso });
        
        // Retorna o curso criado
        res.status(201).json(inscricao);
    } catch (error) {
        // Log do erro para ver os detalhes
        console.error('Erro ao criar inscricao:', error);

        res.status(500).json({ error: "Erro ao criar inscricao." });
    }
};

const readInscricao = async (req, res) => {
    try {
        // Faz a leitura das inscrições no banco de dados
        const inscricoes = await Inscricao.findAll();
        
        // Retorna as inscrições encontrados
        res.send(inscricoes);
    } catch (error) {
        console.error("Erro ao buscar inscrições: ", error);
        res.status(500).json({ error: "Erro ao buscar inscrições." });
    }
};

const deleteInscricao = async (req, res) => {
    try {
        const { ID_Inscricao } = req.params; // ID da inscrição que será excluída

        // Verificar se a inscrição existe no banco
        const inscricao = await Inscricao.findByPk(ID_Inscricao);
        if (!inscricao) {
            return res.status(404).json({ error: "Inscrição não encontrada." });
        }

        {
    
            // Excluir a inscrição
            await inscricao.destroy();

            // Retorna uma mensagem de sucesso
            res.json({ message: "Inscrição excluída com sucesso!" });

        }


    } catch (error) {
        console.error("Erro ao excluir inscrição: ", error);
        res.status(500).json({ error: "Erro ao excluir inscrição." });
    }
};

module.exports = {
createInscricao,
readInscricao,
deleteInscricao

}