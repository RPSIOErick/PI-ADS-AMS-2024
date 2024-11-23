const { DataTypes } = require('sequelize');
const { sq } = require('../config/database');

const Inscricao = sq.define('Inscricao', {
    ID_Inscricao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Cod_Aluno: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tb_Aluno',
            key: 'Cod_Aluno',
        }
    },
    ID_Turma: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tb_Turma',
            key: 'ID_Turma',
        }
    }
}, {
    tableName: 'tb_Inscricao',
    timestamps: false,
});

module.exports = Inscricao;
