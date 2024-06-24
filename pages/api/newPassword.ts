import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const authToken = req.headers.authorization;
        const tokenData = jwt.decode(authToken)
        await query(`
        UPDATE usuarios SET
            senha = MD5('${req.body.password}'), 
            primeiro_acesso = 'N' 
        WHERE id = '${tokenData.user_id}'
        `)
        res.status(200).json("SENHA ATUALIZADA COM SUCESSO")
    }catch(err){
        res.status(400).json(err.toString())
    }
}
