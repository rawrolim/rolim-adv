import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const authHeader = req.body.authorization;

        const rs_user = await query(`SELECT * FROM usuarios WHERE token = '${authHeader}'`);
        if (rs_user.length > 0) {
            res.status(200).json({ accepted: true })
        } else {
            res.status(200).json({ accepted: false })
        }
    } catch (err) {
        console.log(err.toString())
        res.status(200).json({ accepted: false })
    }
}
