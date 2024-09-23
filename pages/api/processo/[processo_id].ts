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
                u.nome AS nome_advogado,
                p.numero_processo,
                p.instancia,
                p.tribunal,
                p.numero_orgao,
                p.natureza,
                p.motivo,
                p.comarca,
                p.valor_causa,
                DATE_FORMAT(p.inicio_prestacao, '%Y-%m-%d') AS inicio_prestacao,
                DATE_FORMAT(p.data_distribuicao, '%Y-%m-%d') AS data_distribuicao,
                p.valor_contrato,
                p.parcelas,
                p.entrada,
                primeira_rescisao,
                segunda_rescisao,
                terceira_rescisao
            FROM processos p
            INNER JOIN usuarios u 
                ON u.id = p.advogado
            WHERE p.id = ?`;
            const rs_processo = await query(sql, [req.query.processo_id]);

            const sqlCliente=`
            SELECT 
                c.nome AS nome_cliente,
                cp.cliente_id AS cliente_id
            FROM cliente_processo cp
            INNER JOIN clientes c 
                ON c.id = cp.cliente_id
            WHERE cp.processo_id = ?;`;
            const rs_clientes = await query(sqlCliente, [req.query.processo_id]);

            const sqlReu = `
            SELECT 
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
                cnh_reu
            FROM reus
            WHERE processo_id = ?`;
            const rs_reus = await query (sqlReu, [req.query.processo_id]);

            if (rs_processo.length === 0) {
                throw new Error("Processo não encontrado.");
            }
            res.status(200).json({
                processo: rs_processo[0],
                clientes: rs_clientes,
                reus: rs_reus
            })
        } else if (req.method === 'PUT') {
            const body = req.body;
            console.log(body)

            if (!body.id) 
                throw new Error("Necessário informar o ID do Processo");
            
            if (!body.advogado) 
                throw new Error("Necessário informar o Advogado");
            

            const sqlProcesso = `UPDATE processos SET
                advogado = ?,
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
                inicio_prestacao = ?,
                primeira_rescisao = ?,
                segunda_rescisao = ?,
                terceira_rescisao = ?
            WHERE id = ?`;

            await query(sqlProcesso, [
                body.advogado,
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
                body.primeira_rescisao,
                body.segunda_rescisao,
                body.terceira_rescisao,
                body.id
            ]);
           for (const cliente of body.clientes) {
                let sqlCliente;
                let params;
                if (cliente.id) {
                    sqlCliente = `UPDATE cliente_processo SET
                        cliente_id = ?,
                    WHERE processo_id = ?`;
                    params = [
                        cliente.cliente_id,
                        body.id
                    ];
                }else{
                    sqlCliente = `INSERT INTO cliente_processo (
                            cliente_id,
                            processo_id
                        ) VALUES (?, ?)`;
                        params = [
                            cliente.cliente_id,
                            body.id
                        ];
                }
            await query(sqlCliente, params);
            }

     for (const reu of body.reus) {
                let sqlReu;
                let params;

                if (reu.id) {
                    if(reu.tp_reu == 'Física'){
                        sqlReu = `UPDATE reus SET
                        nome_reu = ?,
                        tp_reu = ?,
                        cpf_reu = ?,
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
                    }else if(reu.tp_reu == 'Jurídica'){
                        sqlReu = `UPDATE reus SET
                        nome_reu = ?,
                        tp_reu = ?,
                        cnpj_reu = ?,
                        nome_representante_reu = ?,
                        estado_civil_reu = ?,
                        email_reu = ?,
                        numero_reu = ?,
                        cep_reu = ?,
                        endereco_reu = ?,
                        endereco_numero_reu = ?,
                        endereco_complemento_reu = ?,
                        sexo_reu = ?,
                        profissao_reu = ?
                    WHERE id = ?`;
                    params = [
                        reu.nome_reu,
                        reu.tp_reu,
                        reu.cnpj_reu || null,
                        reu.nome_representante_reu || null,
                        reu.estado_civil_reu || null,
                        reu.email_reu || null,
                        reu.numero_reu || null,
                        reu.cep_reu || null,
                        reu.endereco_reu || null,
                        reu.endereco_numero_reu || null,
                        reu.endereco_complemento_reu || null,
                        reu.sexo_reu || null,
                        reu.profissao_reu || null,
                        reu.id
                    ];
                    }
                } else {
                    if(reu.tp_reu == 'Física'){
                        sqlReu = `INSERT INTO reus (
                            nome_reu,
                            tp_reu,
                            cpf_reu,
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
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
    
                        params = [
                            reu.nome_reu,
                            reu.tp_reu,
                            reu.cpf_reu || null,
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
                    else if(reu.tp_reu == 'Jurídica'){
                        sqlReu = `INSERT INTO reus (
                            nome_reu,
                            tp_reu,
                            cnpj_reu,
                            nome_representante_reu,
                            estado_civil_reu,
                            email_reu,
                            numero_reu,
                            cep_reu,
                            endereco_reu,
                            endereco_numero_reu,
                            endereco_complemento_reu,
                            sexo_reu,
                            profissao_reu,
                            processo_id
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
                        params = [
                            reu.nome_reu,
                            reu.tp_reu,
                            reu.cnpj_reu || null,
                            reu.nome_representante_reu || null,
                            reu.estado_civil_reu || null,
                            reu.email_reu || null,
                            reu.numero_reu || null,
                            reu.cep_reu || null,
                            reu.endereco_reu || null,
                            reu.endereco_numero_reu || null,
                            reu.endereco_complemento_reu || null,
                            reu.sexo_reu || null,
                            reu.profissao_reu || null,
                            body.id
                        ];
                    }
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
