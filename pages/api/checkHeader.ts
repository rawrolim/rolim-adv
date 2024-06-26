import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const authHeader = req.body.authorization;

        const rs_user = await query(`SELECT * FROM usuarios WHERE token = '${authHeader}'`);
        if (rs_user.length > 0) {
            jwt.verify(authHeader,process.env.JWT_SECRET);
            
            const tokenData = jwt.decode(authHeader)
            const rs_user2 = await query(`SELECT * FROM usuarios WHERE token = '${authHeader}' AND id = '${tokenData.user_id}'`);
            if(rs_user2.length > 0){
                res.status(200).json({ accepted: true })
            }else{
                res.status(200).json({ accepted: false })
            }
            res.status(200).json({ accepted: true })
        } else {
            res.status(200).json({ accepted: false })
        }
    } catch (err) {
        if(err.toString() == 'TokenExpiredError: jwt expired'){
            res.status(401).json({ accepted: false })
        }else{
            res.status(200).json({ accepted: false })
        }
    }
}
