import { NextApiRequest, NextApiResponse } from "next";
import sendEmail from "../../config/sendEmail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const res = await sendEmail(['alemaorolim@gmail.com'],'Teste de envio', '<h1>TESTE HTML</h1><br>123');
        console.log(res)
        res.status(200).json("OK");
    }catch(err){
        console.log(err)
        res.status(400).json("NOK");
    }
}
