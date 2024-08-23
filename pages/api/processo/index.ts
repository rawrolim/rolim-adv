import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../config/databaseConnection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const advogadosSql = "SELECT id, nome FROM usuarios WHERE (tipo_usuario = 1 OR tipo_usuario = 3) AND STATUS = 'A'";
            const advogados = await query(advogadosSql);
            
            const clientesSql = 'SELECT id, nome FROM clientes';
            const clientes = await query(clientesSql);

            res.status(200).json({ advogados, clientes });
        }else{
            console.log("erro na api");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}