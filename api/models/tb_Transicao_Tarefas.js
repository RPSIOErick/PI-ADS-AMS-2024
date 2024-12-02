const { DataTypes } = require('sequelize');
const { sq } = require('../config/database'); // Referência ao banco configurado

const TransicaoTarefas = sq.define('Transicao_Tarefas', {
  ID_Transicao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_Turma: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tb_Turma', // Referência à tabela de turmas
      key: 'ID_Turma',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  ID_Tarefa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tb_Tarefas', // Referência à tabela de tarefas
      key: 'ID_Tarefa',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'tb_Transicao_Tarefas',
  timestamps: false, // Não adicionar timestamps automáticos
});

module.exports = TransicaoTarefas;