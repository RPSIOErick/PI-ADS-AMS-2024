const { DataTypes } = require('sequelize');
const { sq } = require('../config/database');

const Permissao = sq.define('Permissao', {
    ID_Permissao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ID_Prof: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tb_Professor',
            key: 'ID_Prof',
        }
    },
    ID_Tipo_Prof: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tb_Tipo_Prof',
            key: 'ID_Tipo_Prof',
        }
    }
}, {
    tableName: 'tb_Permissao',
    timestamps: false,
});

module.exports = Permissao;
