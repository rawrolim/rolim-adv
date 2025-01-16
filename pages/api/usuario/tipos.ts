import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export const revalidate = 10;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == "GET") {
            const data = await query("SELECT * FROM tipo_usuario");
            res.status(200).json({
                tipo_usuario: data
            });
        } else {
            throw new Error("Method not allowed")
        }
    } catch (err) {
        res.status(400).json(err.toString());
    }
}
