import mysql, { RowDataPacket } from 'mysql2/promise';

export async function connectDb() {
    const connection = mysql.createPool({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT)
    })
    return connection;
}

export async function query(sql = '', values = []) {
    try {
        const db = await connectDb();
        for (let i = 0; i < values.length; i++) {
            if (values[i] == "")
                values[i] = null
        };
        const [rows] = await db.query<RowDataPacket[]>(sql, values);
        await db.end();
        return rows;
    } catch (e) {
        console.log(`ERROR`, e.toString());
        throw new Error(`Erro na query do banco de dados.`);
    }
}