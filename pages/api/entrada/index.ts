import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method == 'GET'){
            let sql = `
            SELECT 
                e.id AS id, 
                p.numero_processo AS numero_processo, 
                DATE_FORMAT(e.data_entrada, '%d/%m/%Y') AS data_entrada, 
                e.valor AS valor, 
                p.id AS processo_id,
                e.processo_id As processo 
            FROM entradas e 
            INNER JOIN processos p ON e.processo_id = p.id
            `
            const rs_tipo_entrada = await query(sql);
            res.status(200).json(rs_tipo_entrada);
        }else if(req.method == 'POST'){
            const body = req.body;
            let sql = ''
            if(body.valor == '')
                throw new Error("Necessário informar o Valor")

            if(body.processo_id == '')
                throw new Error("Necessário informar o Processo")

            if(body.data_entrada == '')
                throw new Error("Necessário informar a Data de Entrada")

            sql = `
            INSERT INTO entradas(
                data_entrada,
                valor,
                processo_id
            ) VALUES (?,?,?)
        `;
        await query(sql, [body.data_entrada,body.valor,body.processo_id]);
            res.status(200).json("ENTRADA CRIADA COM SUCESSO");
           
        }          
    } catch (erro) {
        res.status(400).json(erro.toString())
    }
}