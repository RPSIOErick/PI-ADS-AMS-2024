const { DataTypes } = require('sequelize');
const { sq } = require('../config/database');

const Tarefas = sq.define('Tarefas', {
    ID_Tarefa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Data_Lancamento: {
        type: DataTypes.DATEONLY, 
        allowNull: false,
    },
    Hora_Lancamento: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    Data_Entrega: {
        type: DataTypes.DATEONLY, 
        allowNull: false,
    },
    Hora_Entrega: {
        type: DataTypes.TIME, 
        allowNull: false,
    }
}, {
    tableName: 'tb_Tarefas',
    timestamps: false
});

module.exports = Tarefas;