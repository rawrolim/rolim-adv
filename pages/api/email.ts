import { NextApiRequest, NextApiResponse } from "next";
import sendEmail from "../../config/sendEmail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const body = req.body;

        if(req.method != 'POST')
            throw new Error("Method not allowed")
        if(!body.toAddresses)
            throw new Error("Necessário informar os destinos")
        if(!body.bodyHtml)
            throw new Error("Necessário informar o corpo do e-mail em html")
        if(!body.subject)
            throw new Error("Necessário informar o assunto")

        //Caso queira informar mais do um email para enviar é só separar por virgula eles
        await sendEmail(body.toAddresses, body.subject, body.bodyHtml);
        res.status(200).json("EMAIL ENVIADO COM SUCESSO");
    }catch(err){
        res.status(400).json(err.toString());
    }
}
