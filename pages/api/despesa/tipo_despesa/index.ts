import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../config/databaseConnection";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method == 'GET'){
            let sql = `
            SELECT 
                id,
                nome,
                CASE
                    WHEN status = 'A' THEN 'ATIVO'
                    WHEN status = 'I' THEN 'INATIVO'
                END status
            FROM tipo_despesa
            `
            const rs_tipo_despesa = await query(sql);
            res.status(200).json(rs_tipo_despesa);
        }else if(req.method == 'POST'){
            const body = req.body;
            let sql = '';
            if(body.nome == '')
                throw new Error("Necessário informar o nome")

            sql = `SELECT * FROM tipo_despesa WHERE nome = '${body.nome}'`;
            const rs_nome = await query(sql);
            if (rs_nome.length > 0)
                throw new Error("Nome já cadastrado no sistema.");

            sql = `
            INSERT INTO tipo_despesa(
                nome,
                status
            ) VALUES (?,'A')
        `;
        await query(sql, [body.nome]);
            res.status(200).json("Tipo DESPESA CRIADO COM SUCESSO");
           
        }          
    } catch (erro) {
        res.status(400).json(erro.toString())
    }
}