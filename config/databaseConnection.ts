import { Sequelize } from "sequelize"

export function connectDb() {
    try {
        const db = new Sequelize({
            dialect: 'mysql',
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT)
        });
        console.log({
            dialect: 'mysql',
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT)
        })
        return db;
    } catch (e) {
        throw new Error("Erro na conexão do banco de dados.", e)
    }
}

export async function query(sql=''){
    try {
        const db = connectDb();
        const dbSynced = await db.sync();
        const queryReturn = await dbSynced.query(sql);
        await dbSynced.close()
        await db.close()
        console.log("QUERY EXECUTED", sql);
        return queryReturn[0];
    } catch (e) {
        console.log(`QUERY ERROR`,sql);
        throw new Error(`Erro na query do banco de dados.`);
    }
}