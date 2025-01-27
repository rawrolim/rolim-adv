import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../config/databaseConnection";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const serverResponse = await axios.get(`${process.env.FILESERVER}/getDirectory`, {
            headers: {
                Authorization: req.headers.authorization
            }
        });
        res.status(200).json(serverResponse.data);
    }catch(err){
        res.status(400).json(err.toString())
    }
}
