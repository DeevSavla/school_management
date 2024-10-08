import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const School = sequelize.define('school', {
    schoolId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    tableName: 'school',
    timestamps: false,
});

export default School;
