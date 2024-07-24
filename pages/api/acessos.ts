import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = req.body;
        let sql = '';
        if (req.method == "POST") {
            sql = `INSERT INTO acessos(tipo_usuario_id,rota) VALUES(?,?)`;
            await query(sql, [body.tipo_usuario, body.rota]);
            res.status(200).json("ACESSO LIBERADO COM SUCESSO.");
        } else if (req.method == "GET") {
            sql = `SELECT id, rota, DATE_FORMAT(createdAt, '%d/%m/%Y') createdAt  FROM acessos
            WHERE tipo_usuario_id = ?`;
            const rs_acessos = await query(sql, [req.query.tipo_usuario_id]);
            res.status(200).json(rs_acessos);
        } else if (req.method == "DELETE") {
            sql = `DELETE FROM acessos WHERE id = ?`;
            await query(sql, [req.query.id]);
            res.status(200).json("ACESSO DELETADO COM SUCESSO.");
        } else {
            throw new Error("Method not allowed.")
        }
    } catch (err) {
        res.status(400).json(err.toString());
    }
}
