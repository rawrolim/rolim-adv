import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from "next";
import { query } from '../../config/databaseConnection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const authToken = req.headers.authorization;

        const tokenDecoded = jwt.decode(authToken) 

        tokenDecoded.exp = Math.floor(Date.now() / 1000) + (60*60);
        tokenDecoded.iat = Math.floor(Date.now() / 1000);
        tokenDecoded.refreshToken = generateToken();

        let jwtToken = jwt.sign(tokenDecoded, process.env.JWT_SECRET);
        
        let sql = `
        UPDATE usuarios SET token = ? 
            WHERE id = ?
        `;
        await query(sql, [jwtToken,tokenDecoded.user_id])

        res.status(200).json({jwtData: tokenDecoded, jwtToken })
    }catch(err){
        res.status(400).json(err.toString())
    }
}

function generateToken(){
    var token = ""
    for (var i = 0; i < 16; i++) {
        token += rand();
    }
    return token;
};

function rand(){
    return Math.random().toString(36).slice(2);
};