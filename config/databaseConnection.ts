import { Sequelize } from "sequelize"

function connectDb() {
    try {
        const db = new Sequelize({
            dialect: 'mysql',
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT)
        });
        return db;
    } catch (e) {
        throw new Error("Erro na conexão do banco de dados.", e)
    }
}

export default connectDb();