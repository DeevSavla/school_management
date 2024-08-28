import { Sequelize } from 'sequelize';
import { configDotenv } from 'dotenv';

configDotenv();

const sequelize = new Sequelize(process.env.DB_NAME || '', process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
});

export default sequelize;
