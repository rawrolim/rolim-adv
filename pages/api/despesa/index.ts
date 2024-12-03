import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method == 'GET'){
            let sql = `
            SELECT 
                d.id AS id, 
                td.nome AS nome, 
                DATE_FORMAT(d.data_pagamento, '%d/%m/%Y') AS data_pagamento, 
                d.valor AS valor, 
                td.id AS tipo_despesa_id, 
                d.tipo_despesa
            FROM despesas d 
            INNER JOIN tipo_despesa td ON td.id = d.tipo_despesa
            `
            const rs_tipo_despesa = await query(sql);
            res.status(200).json(rs_tipo_despesa);
        }else if(req.method == 'POST'){
            const body = req.body;
            let sql = ''
            if(body.valor == '')
                throw new Error("Necessário informar o Valor")

            if(body.tipoDespesa == '')
                throw new Error("Necessário informar o Tipo Despesa")

            if(body.data_pagamento == '')
                throw new Error("Necessário informar a Data Pagamento")

            sql = `
            INSERT INTO despesas(
                data_pagamento,
                valor,
                tipo_despesa
            ) VALUES (?,?,?)
        `;
        await query(sql, [body.data_pagamento,body.valor,body.tipoDespesa]);
            res.status(200).json("DESPESA CRIADO COM SUCESSO");
           
        }          
    } catch (erro) {
        res.status(400).json(erro.toString())
    }
}