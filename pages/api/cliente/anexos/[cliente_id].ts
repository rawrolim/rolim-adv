import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let sql = '';
    try {
        if (!req.query.cliente_id)
            throw new Error("Necessário informar o id do cliente.");
        if (req.method == 'GET') {
            const rs_attachs = await query(`SELECT id, nome_arquivo, arquivo FROM anexos_cliente WHERE cliente_id = ?`, [req.query.cliente_id]);
            res.status(200).json(rs_attachs);
        } else if (req.method == 'POST') {
            sql = `INSERT INTO anexos_cliente(cliente_id,nome_arquivo, arquivo) VALUES(?,?,?)`
            await query(sql, [req.query.cliente_id, req.body.nome_arquivo, req.body.arquivo]);
            res.status(200).json({ response: "ARQUIVO CRIADO" });
        } else if (req.method == 'DELETE') {
            sql = `DELETE FROM anexos_cliente WHERE id = ?`
            await query(sql, [req.query.anexo_id]);
            res.status(200).json({ response: "ARQUIVO DELETADO" });
        } else {
            throw new Error("Method not allowed")
        }
    } catch (erro) {
        res.status(400).json(erro.toString());
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        },
    },
}