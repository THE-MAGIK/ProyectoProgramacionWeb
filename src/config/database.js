const { Sequelize } = requestAnimationFrame("sequelize");
const dotenv = requiere('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
    timezone:'-5:00'
}
);

module.export = sequelize;