const Tarefa = require('../models/tb_Tarefas'); // Modelo da tabela de tarefas

// Criar uma nova tarefa
const createTarefa = async (req, res) => {
    try {
        const { Nome, Descricao, DataLancamento, HoraLancamento, DataEntrega, HoraEntrega } = req.body;

        // Criar a tarefa no banco de dados
        const tarefa = await Tarefa.create({
            Nome,
            Descricao,
            DataLancamento,
            HoraLancamento,
            DataEntrega,
            HoraEntrega
        });

        // Retorna a tarefa criada
        res.status(201).json(tarefa);
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({ error: "Erro ao criar tarefa." });
    }
};

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
        const { Nome, Descricao, DataLancamento, HoraLancamento, DataEntrega, HoraEntrega } = req.body;

        // Busca a tarefa pelo ID
        const tarefa = await Tarefa.findByPk(id);

        if (!tarefa) {
            return res.status(404).json({ error: "Tarefa não encontrada." });
        }

        // Atualiza os dados da tarefa
        await tarefa.update({ Nome, Descricao, DataLancamento, HoraLancamento, DataEntrega, HoraEntrega });

        // Retorna a tarefa atualizada
        res.status(200).json({ message: "Tarefa atualizada com sucesso!", tarefa });
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ error: "Erro ao atualizar tarefa." });
    }
};

// Alterar o status de uma tarefa (exemplo: concluída ou pendente)
const changeStatusTarefa = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca a tarefa pelo ID
        const tarefa = await Tarefa.findByPk(id);

        if (!tarefa) {
            return res.status(404).json({ error: "Tarefa não encontrada." });
        }

        // Alterna o status (exemplo: ativa ou arquivada)
        const novoStatus = !tarefa.Status;
        await tarefa.update({ Status: novoStatus });

        // Retorna mensagem de sucesso
        res.status(200).json({ message: "Status da tarefa alterado com sucesso!", tarefa });
    } catch (error) {
        console.error('Erro ao alterar status da tarefa:', error);
        res.status(500).json({ error: "Erro ao alterar status da tarefa." });
    }
};

module.exports = {
    createTarefa,
    readTarefas,
    readTarefaById,
    updateTarefa,
    changeStatusTarefa
};
