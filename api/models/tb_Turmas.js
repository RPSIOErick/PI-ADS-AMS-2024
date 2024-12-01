const { DataTypes } = require('sequelize');
const { sq } = require('../config/database');

const Turmas = sq.define('Turmas', {
    ID_Turma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Turno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Semestre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Ano: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ID_Disc: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tb_Disciplinas',
            key: 'ID_Disc',
        }
    },
    Status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    tableName: 'tb_Turma',
    timestamps: false
});

module.exports = Turmas;
