import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method == 'GET'){
            if (!req.query.entrada_id)
                throw new Error("Necessário informar o id da entrada.")
            let sql = `
            SELECT 
            id,
            valor,
            DATE_FORMAT(data_entrada, '%d/%m/%Y') AS data_entrada,
            processo_id
            FROM entradas
            WHERE id = ?`
            const rs_entrada = await query(sql, [req.query.entrada_id]);

            if (rs_entrada.length == 0)
                throw new Error("Entrada não encontrada.")

            const entrada = rs_entrada[0];

            res.status(200).json(entrada);
        }else if(req.method == 'PUT'){
            const body = req.body;
            let sql = '';
            if (body.valor == '')
                throw new Error("Necessário informar o valor")
            
            if(body.processo_id == '')
                throw new Error("Necessário informar o Processo")

            if(body.data_entrada == '')
                throw new Error("Necessário informar a Data Entrada")

            if (body.id == '') {
                throw new Error("Necessário informar o ID da Entrada")
            } else {
                if (!Number(body.id))
                    throw new Error("Necessário informar um ID válido para a Entrada")
            }

            sql = `UPDATE entradas SET
                    valor = ?,
                    data_entrada = ?,
                    processo_id = ?
                WHERE id = ?
            `;

            await query(sql, [
                body.valor,
                body.data_entrada,
                body.processo_id,
                body.id
            ]);
            res.status(200).json("ENTRADA ATUALIZADA COM SUCESSO");
        }
    } catch (erro) {
        res.status(400).json(erro.toString())
        }
        }