import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method == 'GET'){
            if (!req.query.despesa_id)
                throw new Error("Necessário informar o id da despesa.")
            let sql = `
            SELECT 
            id,
            valor,
            DATE_FORMAT(data_pagamento, '%d/%m/%Y') AS data_pagamento,
            tipo_despesa
            FROM despesas
            WHERE id = ?`
            const rs_despesa = await query(sql, [req.query.despesa_id]);

            if (rs_despesa.length == 0)
                throw new Error("Despesa não encontrado.")

            const despesa = rs_despesa[0];

            res.status(200).json(despesa);
        }else if(req.method == 'PUT'){
            const body = req.body;
            let sql = '';
            if (body.valor == '')
                throw new Error("Necessário informar o valor")
            
            if(body.tipo_despesa == '')
                throw new Error("Necessário informar o Tipo Despesa")

            if(body.data_pagamento == '')
                throw new Error("Necessário informar a Data Pagamento")

            if (body.id == '') {
                throw new Error("Necessário informar o ID da despesa")
            } else {
                if (!Number(body.id))
                    throw new Error("Necessário informar um ID válido para a Despesa")
            }

            sql = `UPDATE despesas SET
                    valor = ?,
                    data_pagamento = ?,
                    tipo_despesa = ?
                WHERE id = ?
            `;

            await query(sql, [
                body.valor,
                body.data_pagamento,
                body.tipo_despesa,
                body.id
            ]);
            res.status(200).json("DESPESA ATUALIZADO COM SUCESSO");
        }
    } catch (erro) {
        res.status(400).json(erro.toString())
        }
        }