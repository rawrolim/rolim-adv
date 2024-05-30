import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body, query } = req;

    if(method === "GET") {
        const id = "3607";
        let cliente = axios.get("/api/clientes/" + id);
    
        var docDefinition = {
            content: [
                'Declaração de Hipossuficiência',
                'Eu, '+  +'Pedro'
            ]
        };
    
      res.status(200).json(docDefinition);
    }
}
