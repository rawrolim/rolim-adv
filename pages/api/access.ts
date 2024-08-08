import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.status(200).json("ACESSO DELETADO COM SUCESSO.");
    } catch (err) {
        res.status(400).json(err.toString());
    }
}
