const { DataTypes } = require('sequelize');
const { sq } = require('../config/database');

const Disciplinas = sq.define('Disciplinas', {
    ID_Disc: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ID_Prof: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tb_Professor',
            key: 'ID_Prof',
        }
    },
    Nome_Disc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Cod_Curso: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tb_Cursos',
            key: 'Cod_Curso',
        }
    },
}, {
    tableName: 'tb_Disciplinas',
    timestamps: false
});

module.exports = Disciplinas;