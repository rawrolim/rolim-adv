import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == 'GET') {
            let sql = `
                SELECT 
                    p.id,
                    GROUP_CONCAT(c.nome SEPARATOR '; ') AS nome_cliente,
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
                group by p.id, p.numero_processo, p.data_distribuicao, p.motivo, u.nome;`

            const rs_processos = await query(sql);
            res.status(200).json(rs_processos);

        } else if (req.method == 'POST') {
            throw new Error("Method not allowed")
        } else {
            throw new Error("Method not allowed")
        }
    } catch (erro) {
        res.status(400).json(erro.toString())
    }

}