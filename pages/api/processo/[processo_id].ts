import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    try {
        if (req.method == 'GET') {
            if (!req.query.processo_id)
            throw new Error("Necessário informar o id do processo.")
        
            let sql = `
            SELECT 
                p.id,
                p.advogado,
                p.cliente_id,
                u.nome As nome_advogado,
                c.nome AS nome_cliente,
                p.numero_processo,
                p.instancia,
                p.tribunal,
                p.numero_orgao,
                p.natureza,
                p.motivo,
                p.comarca,
                p.valor_causa,
                DATE_FORMAT(p.data_distribuicao, '%Y-%m-%d') as data_distribuicao,
                p.valor_contrato,
                p.parcelas,
                p.entrada,
                DATE_FORMAT(p.inicio_prestacao, '%Y-%m-%d') AS inicio_prestacao
                FROM processos p
                INNER JOIN clientes c 
                    ON c.id = p.cliente_id
                INNER JOIN usuarios u
                    ON u.id = p.advogado 
                WHERE p.id = ?`
            const rs_processo = await query(sql, [req.query.processo_id]);

            if (rs_processo.length == 0)
                throw new Error("Processo não encontrado.")

            const processo = rs_processo[0];

            res.status(200).json(processo);
        } else if (req.method == 'PUT') {
            const body = req.body;

            if (body.advogado == '')
                throw new Error("Necessário informar o Advogado")
            if (body.cliente == '')
                throw new Error("Necessário informar o Cliente")
                
                let sql = `UPDATE processos SET
                advogado = ?,
                cliente_id = ?,
                numero_processo = ?,
                instancia = ?,
                tribunal = ?,
                numero_orgao = ?,
                natureza = ?,
                motivo = ?,
                comarca = ?,
                valor_causa = ?,
                data_distribuicao = ?,
                valor_contrato = ?,
                parcelas = ?,
                entrada = ?,
                inicio_prestacao = ?
            WHERE id = ?
            `;
            await query(sql,[body.advogado,
                body.cliente_id,body.numero_processo,body.instancia,
                body.tribunal,body.numero_orgao,body.natureza,
                body.motivo,body.comarca,body.valor_causa,body.data_distribuicao,
                body.valor_contrato,body.parcelas,body.entrada,
                body.inicio_prestacao,body.id]);
            res.status(200).json("CLIENTE ATUALIZADO COM SUCESSO");
            }
           
    } catch (erro) {
        res.status(400).json(erro.toString())
    }
}
