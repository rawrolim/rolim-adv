import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method == 'GET'){
            if (!req.query.tipo_despesa_id)
                throw new Error("Necessário informar o id do Tipo despesa.")
            let sql = `
                 SELECT 
                    id,
                    nome
                FROM tipo_despesa
            WHERE id = ?`
            const rs_tipo_despesa = await query(sql, [req.query.tipo_despesa_id]);

            if (rs_tipo_despesa.length == 0)
                throw new Error("Tipo despesa não encontrado.")

            const tipo_despesa = rs_tipo_despesa[0];

            res.status(200).json(tipo_despesa);
        }else if(req.method == 'PUT'){
            const body = req.body;
            let sql = '';
            if (body.nome == '')
                throw new Error("Necessário informar o nome")
            if (body.id == '') {
                throw new Error("Necessário informar o ID do Tipo despesa")
            } else {
                if (!Number(body.id))
                    throw new Error("Necessário informar um ID válido para o Tipo despesa")
            }
        
            sql = `SELECT * FROM tipo_despesa WHERE nome = '${body.nome}'`;
            const rs_nome = await query(sql);
            if (rs_nome.length > 0)
                throw new Error("Nome já cadastrado no sistema.");

            sql = `UPDATE tipo_despesa SET
                    nome = ?
                WHERE id = ?
            `;

            await query(sql, [
                body.nome,
                body.id
            ]);
            res.status(200).json("TIPO DESPESA ATUALIZADO COM SUCESSO");
        }
        else if (req.method == 'DELETE') {
    let sql = '';
    const queryString = req.query;
    console.log(queryString.tipo_despesa_id)
    let status = '';

    sql = 'SELECT status FROM tipo_despesa WHERE id = ?'
    const rs_status = await query(sql, [queryString.tipo_despesa_id]);
    if (rs_status[0]['status'] == 'I') {
        status = 'A'
    } else {
        status = 'I'
    }

    sql = `
        UPDATE tipo_despesa SET 
            status = ?
        WHERE id = ?
    `;
    await query(sql, [status, queryString.tipo_despesa_id]);
    res.status(200).json("Tipo Despesa DELETADO COM SUCESSO");
}
} catch (erro) {
res.status(400).json(erro.toString())
}
}