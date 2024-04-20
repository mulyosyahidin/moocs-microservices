import {Sequelize} from 'sequelize';
import logger from "./logging.js";

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

sequelize.authenticate()
    .then(() => {
        logger.info(`Sequelize berhasil terhubung ke database ${process.env.DB_NAME}`);
    })
    .catch(err => {
        logger.error(`Sequelize gagal terhubung ke database ${process.env.DB_NAME}: ${err}`);
    });

export default sequelize;
