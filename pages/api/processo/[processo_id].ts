import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            if (!req.query.processo_id) {
                throw new Error("Necessário informar o id do processo.");
            }

            const sql = `
            SELECT 
                p.id,
                p.advogado,
                p.cliente_id,
                u.nome AS nome_advogado,
                c.nome AS nome_cliente,
                p.numero_processo,
                p.instancia,
                p.tribunal,
                p.numero_orgao,
                p.natureza,
                p.motivo,
                p.comarca,
                p.valor_causa,
                DATE_FORMAT(p.data_distribuicao, '%Y-%m-%d') AS data_distribuicao,
                p.valor_contrato,
                p.parcelas,
                p.entrada,
                r.nome_reu,
                r.tp_reu,
                r.cpf_reu,
                r.cnpj_reu,
                r.nome_representante_reu,
                r.estado_civil_reu,
                r.rg_reu,
                r.email_reu,
                r.numero_reu,
                r.cep_reu,
                r.endereco_reu,
                r.endereco_numero_reu,
                r.endereco_complemento_reu,
                r.sexo_reu,
                r.profissao_reu,
                r.cnh_reu,
                DATE_FORMAT(p.inicio_prestacao, '%Y-%m-%d') AS inicio_prestacao
            FROM processos p
            INNER JOIN clientes c ON c.id = p.cliente_id
            INNER JOIN usuarios u ON u.id = p.advogado 
            LEFT JOIN reus r ON r.processo_id = p.id
            WHERE p.id = ?`;

            const rs_processo = await query(sql, [req.query.processo_id]);

            if (rs_processo.length === 0) {
                throw new Error("Processo não encontrado.");
            }

            const processo = rs_processo[0];

            res.status(200).json(processo);
        } else if (req.method === 'PUT') {
            const body = req.body;

            if (!body.id) throw new Error("Necessário informar o ID do Processo");
            if (!body.advogado) throw new Error("Necessário informar o Advogado");
            if (!body.cliente_id) throw new Error("Necessário informar o Cliente");

            const sqlProcesso = `UPDATE processos SET
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
            WHERE id = ?`;

            await query(sqlProcesso, [
                body.advogado,
                body.cliente_id,
                body.numero_processo,
                body.instancia,
                body.tribunal,
                body.numero_orgao,
                body.natureza,
                body.motivo,
                body.comarca,
                body.valor_causa,
                body.data_distribuicao,
                body.valor_contrato,
                body.parcelas,
                body.entrada,
                body.inicio_prestacao,
                body.id
            ]);

            if (!Array.isArray(body.reus)) {
                throw new Error("Formato inválido para réus.");
            }

            for (const reu of body.reus) {
                let sqlReu;
                let params;

                if (reu.id) {
                    sqlReu = `UPDATE reus SET
                        nome_reu = ?,
                        tp_reu = ?,
                        cpf_reu = ?,
                        cnpj_reu = ?,
                        nome_representante_reu = ?,
                        estado_civil_reu = ?,
                        rg_reu = ?,
                        email_reu = ?,
                        numero_reu = ?,
                        cep_reu = ?,
                        endereco_reu = ?,
                        endereco_numero_reu = ?,
                        endereco_complemento_reu = ?,
                        sexo_reu = ?,
                        profissao_reu = ?,
                        cnh_reu = ?
                    WHERE id = ?`;

                    params = [
                        reu.nome_reu,
                        reu.tp_reu,
                        reu.cpf_reu || null,
                        reu.cnpj_reu || null,
                        reu.nome_representante_reu || null,
                        reu.estado_civil_reu || null,
                        reu.rg_reu || null,
                        reu.email_reu || null,
                        reu.numero_reu || null,
                        reu.cep_reu || null,
                        reu.endereco_reu || null,
                        reu.endereco_numero_reu || null,
                        reu.endereco_complemento_reu || null,
                        reu.sexo_reu || null,
                        reu.profissao_reu || null,
                        reu.cnh_reu || null,
                        reu.id
                    ];
                } else {
                    sqlReu = `INSERT INTO reus (
                        nome_reu,
                        tp_reu,
                        cpf_reu,
                        cnpj_reu,
                        nome_representante_reu,
                        estado_civil_reu,
                        rg_reu,
                        email_reu,
                        numero_reu,
                        cep_reu,
                        endereco_reu,
                        endereco_numero_reu,
                        endereco_complemento_reu,
                        sexo_reu,
                        profissao_reu,
                        cnh_reu,
                        processo_id
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                    params = [
                        reu.nome_reu,
                        reu.tp_reu,
                        reu.cpf_reu || null,
                        reu.cnpj_reu || null,
                        reu.nome_representante_reu || null,
                        reu.estado_civil_reu || null,
                        reu.rg_reu || null,
                        reu.email_reu || null,
                        reu.numero_reu || null,
                        reu.cep_reu || null,
                        reu.endereco_reu || null,
                        reu.endereco_numero_reu || null,
                        reu.endereco_complemento_reu || null,
                        reu.sexo_reu || null,
                        reu.profissao_reu || null,
                        reu.cnh_reu || null,
                        body.id
                    ];
                }

                await query(sqlReu, params);
            }

            res.status(200).json("PROCESSO ATUALIZADO COM SUCESSO");
        } else {
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
