import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method == 'GET'){
            if(!req.query.cliente_id)
                throw new Error("Necessário informar o id do cliente.")

            const rs_cliente = await query(`SELECT * FROM clientes WHERE id = '${req.query.cliente_id}'`);
        
            if(rs_cliente.length == 0)
                throw new Error("Cliente não encontrado.")

            const cliente = rs_cliente[0];

            res.status(200).json(cliente);
        }else{
            throw new Error("Method not allowed")
        }
    }catch(erro){
        res.status(400).json(erro.toString())
    }
}
