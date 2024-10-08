import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const cliente_id = req.query.cliente_id;

            if (!cliente_id || isNaN(Number(cliente_id))) {
                throw new Error("Necessário informar um id de cliente válido.");
            }

            const sql = `
                SELECT 
                    p.id,
                    c.nome AS nome_cliente,
                    u.nome AS nome_advogado,
                    p.numero_processo,
                    DATE_FORMAT(p.data_distribuicao, '%d/%m/%Y') AS data_distribuicao,
                    p.motivo          
                FROM processos p
                INNER JOIN cliente_processo cp
                    ON p.id = cp.processo_id
                INNER JOIN clientes c 
                    ON c.id = cp.cliente_id
                INNER JOIN usuarios u
                    ON u.id = p.advogado 
                WHERE c.id = ?
                ORDER BY c.nome ASC;
            `;

            const rs_processos = await query(sql, [cliente_id]);

            res.status(200).json(rs_processos);
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (erro) {
        res.status(400).json({ error: erro.toString() });
    }
}