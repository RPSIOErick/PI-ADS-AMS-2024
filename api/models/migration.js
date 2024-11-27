// Import Aluno's Model
const Aluno = require('./tb_Aluno');
const Cursos = require('./tb_Cursos');
const Disciplinas = require('./tb_Disciplinas');
const Permissao = require('./tb_Permissao');
const Professor = require('./tb_Professor');
const Tipo_Prof = require('./tb_Tipo_Prof');
const Turmas = require('./tb_Turmas');
const Inscricao = require('./tb_Inscricao');
const Tarefas = require ('./tb_Tarefas');
const Transicao_Tarefas = require ('./tb_Transicao_Tarefas')

// Async function to sync tables
async function syncTables() {
    try {
        await Tipo_Prof.sync();
        console.log("Tabela tb_tipo_prof criada com sucesso!");

        await Professor.sync();
        console.log("Tabela tb_professor criada com sucesso!");

        await Permissao.sync();
        console.log("Tabela tb_permissao criada com sucesso!");

        await Disciplinas.sync();
        console.log("Tabela tb_disciplinas criada com sucesso!");

        await Cursos.sync();
        console.log("Tabela tb_cursos criada com sucesso!");

        await Aluno.sync();
        console.log("Tabela tb_alunos criada com sucesso!");

        await Turmas.sync();
        console.log("Tabela tb_turmas criada com sucesso!");

        await Inscricao.sync();
        console.log("Tabela tb_inscricao criada com sucesso!")

        await Tarefas.sync();
        console.log("Tabela tb_tarefas criada com sucesso!")

        await Transicao_Tarefas.sync();
        console.log("Tabela tb_transicao_tarefas criada com sucesso!")

    } catch (error) {
        console.error("Erro ao sincronizar tabelas: ", error);
    }
}

// Sync funcion
syncTables();