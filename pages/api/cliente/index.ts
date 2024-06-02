import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method == 'GET'){
            let sql = `
            SELECT 
                id,
                UPPER(nome) nome,
                cpf,
                numero,
                mail email,
                endereco,
                endereco_num,
                endereco_complemento,
                cep,
                rg,
                orgao,
                nome_mae,
                nome_pai,
                CASE 
                    WHEN estado_civil = '1' THEN '1'
                    WHEN estado_civil = '2' THEN '2'
                    WHEN estado_civil = '3' THEN '3'
                    WHEN estado_civil = '4' THEN '4'
                    WHEN estado_civil = '5' THEN '5'
                    ELSE estado_civil
                END estado_civil,
                CASE 
                    WHEN sexo='1' THEN 'Masculino'
                    WHEN sexo='2' THEN 'Feminino'
                    ELSE sexo
                END sexo,
                data_nascimento,
                data_registro,
                profissao,
                status,
                cnh
            FROM clientes`
            const rs_clientes = await query(sql);
            res.status(200).json(rs_clientes);
        }else{
            throw new Error("Methodf not allowed")
        }
    }catch(erro){
        res.status(400).json(erro.toString())
    }
}