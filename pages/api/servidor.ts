import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method == 'GET'){
            if(req.query.path){
                const serverResponse = await axios.get(`${process.env.FILESERVER}/getFile?key=${req.query.path}`, {
                    headers: {
                        Authorization: req.headers.authorization
                    }
                });
                res.status(200).json(serverResponse.data);
            }else{
                const serverResponse = await axios.get(`${process.env.FILESERVER}/getDirectory`, {
                    headers: {
                        Authorization: req.headers.authorization
                    }
                });
                res.status(200).json(serverResponse.data);
            }
        }
        
    }catch(err){
        res.status(400).json(err.toString())
    }
}
