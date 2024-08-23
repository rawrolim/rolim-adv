import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method == 'GET'){
            let sql = `
            SELECT * FROM clientes`
            const rs_clientes = await query(sql);
            res.status(200).json(rs_clientes);
        }else{
            throw new Error("Method not allowed")
        }
    }catch(erro){
        res.status(400).json(erro.toString())
    }
}