import mysql from 'mysql2';

export async function connectDb() {
    const connection = mysql.createPool({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT)
    })
    const pool = connection.promise();
    return pool;
}

export async function query(sql = '') {
    try {
        const db = await connectDb();
        const queryReturn = await db.query(sql);
        await db.end()
        return queryReturn[0];
    } catch (e) {
        console.log(`ERROR`, e.toString());
        throw new Error(`Erro na query do banco de dados.`);
    }
}