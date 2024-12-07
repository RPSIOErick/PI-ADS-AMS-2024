const Tarefa = require('../models/tb_Tarefas');
const TransicaoTarefas = require('../models/tb_Transicao_Tarefas');

// Criar uma nova tarefa
const createTarefa = async (req, res) => {
    try {
        const { ID_Turma, Nome, Descricao, Data_Lancamento, Hora_Lancamento, Data_Entrega, Hora_Entrega } = req.body;

        // Pré-Status
        const preStatus = 0;

        // Criar a tarefa no banco de dados
        const tarefa = await Tarefa.create({
            Nome,
            Descricao,
            Data_Lancamento,
            Hora_Lancamento,
            Data_Entrega,
            Hora_Entrega,
            Entregue: preStatus
        });

        if(!tarefa){

            return res.status(500).json({ error: "Erro ao criar tarefa." });

        }

        // Criar a transição da tarefa
        await craeteTransicaoTarefa(tarefa.ID_Tarefa, ID_Turma);

        // Retorna a tarefa criada
        return res.status(201).json(tarefa);
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({ error: "Erro ao criar tarefa." });
    }
};

async function craeteTransicaoTarefa(ID_Tarefa, ID_Turma) {

    try {

        const transicao = await TransicaoTarefas.create({
            ID_Tarefa,
            ID_Turma
        })

        if(!transicao) {
            return res.status(500).json({ error: "Erro ao criar a transição da tarefa." });
        }

    }

    catch (err) {
        console.error('Erro ao criar transição da tarefa:', err);
        res.status(500).json({ error: "Erro ao criar transição da tarefa." });
    }

}

// Ler todas as tarefas
const readTarefas = async (req, res) => {
    try {
        // Busca todas as tarefas no banco de dados
        const tarefas = await Tarefa.findAll();

        // Retorna as tarefas encontradas
        res.status(200).json(tarefas);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ error: "Erro ao buscar tarefas." });
    }
};

// Ler uma única tarefa pelo ID
const readTarefaById = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca a tarefa pelo ID
        const tarefa = await Tarefa.findByPk(id);

        if (!tarefa) {
            return res.status(404).json({ error: "Tarefa não encontrada." });
        }

        // Retorna a tarefa encontrada
        res.status(200).json(tarefa);
    } catch (error) {
        console.error('Erro ao buscar tarefa:', error);
        res.status(500).json({ error: "Erro ao buscar tarefa." });
    }
};

// Atualizar uma tarefa pelo ID
const updateTarefa = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nome, Descricao, Data_Lancamento, Hora_Lancamento, Data_Entrega, Hora_Entrega } = req.body;

        // Busca a tarefa pelo ID
        const tarefa = await Tarefa.findByPk(id);

        if (!tarefa) {
            return res.status(404).json({ error: "Tarefa não encontrada." });
        }

        // Atualiza os dados da tarefa
        await tarefa.update({ Nome, Descricao, Data_Lancamento, Hora_Lancamento, Data_Entrega, Hora_Entrega });

        // Retorna a tarefa atualizada
        res.status(200).json({ message: "Tarefa atualizada com sucesso!", tarefa });
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ error: "Erro ao atualizar tarefa." });
    }
};

// Alterar o status de uma tarefa
const changeStatusTarefa = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca a tarefa pelo ID
        const tarefa = await Tarefa.findByPk(id);

        if (!tarefa) {
            return res.status(404).json({ error: "Tarefa não encontrada." });
        }

        // Alterna o status
        const novoStatus = !tarefa.Status;
        await tarefa.update({ Status: novoStatus });

        // Retorna mensagem de sucesso
        res.status(200).json({ message: "Status da tarefa alterado com sucesso!", tarefa });
    } catch (error) {
        console.error('Erro ao alterar status da tarefa:', error);
        res.status(500).json({ error: "Erro ao alterar status da tarefa." });
    }
};

// Excluir uma tarefa
const deleteTarefas = async (req, res) => {
    try {
        const { ID_Tarefa } = req.params;

        // Verificar se a tarefa existe
        const tarefa = await Tarefa.findByPk(ID_Tarefa);
        if (!tarefa) {
            return res.status(404).json({ error: "Tarefa não encontrada." });
        }

        // Excluir a tarefa
        await tarefa.destroy();

        res.json({ message: "Tarefa excluída com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir tarefa: ", error);
        res.status(500).json({ error: "Erro ao excluir tarefa." });
    }
};

module.exports = {
    createTarefa,
    readTarefas,
    readTarefaById,
    updateTarefa,
    changeStatusTarefa,
    deleteTarefas,
};