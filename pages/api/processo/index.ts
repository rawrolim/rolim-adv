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
        } else if (req.method === 'POST') {
            const body = req.body;
            let sqlProcesso = '';
            let sqlCliente = '';
            let sqlReu = '';
            let processoId: number;

            if(body.advogado == '')
                throw new Error("Necessário informar o Advogado")
            
            let sql = `SELECT * FROM processos WHERE numero_processo = '${body.numero_processo}'`;
            const rs_numero_processo = await query(sql);
            if (rs_numero_processo.length > 0)
                throw new Error("Número de Processo já cadastrado no sistema.");

            sqlProcesso = `INSERT INTO processos (
                advogado,
                numero_processo,
                instancia,
                tribunal,
                numero_orgao,
                natureza,
                motivo,
                comarca,
                valor_causa,
                data_distribuicao,
                valor_contrato,
                parcelas,
                entrada,
                inicio_prestacao
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const processoResult = await query(sqlProcesso, [
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
                body.inicio_prestacao
            ]);

            processoId = processoResult.insertId;

            for (const cliente of body.clientes) {
                sqlCliente = `INSERT INTO cliente_processo (
                        cliente_id,
                        processo_id
                    ) VALUES (?, ${processoId})`;
                    await query(sqlCliente, [cliente.cliente_id]);
            }

            for (const reu of body.reus) {
                if (reu.tp_reu === 'Física') {
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
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ${processoId})`;

                    await query(sqlReu, [
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
                        reu.cnh_reu || null
                    ]);
                } else {
                    sqlReu = `INSERT INTO reus (
                        nome_reu,
                        tp_reu,
                        cnpj_reu,
                        estado_civil_reu,
                        nome_representante_reu,
                        email_reu,
                        numero_reu,
                        cep_reu,
                        endereco_reu,
                        endereco_numero_reu,
                        endereco_complemento_reu,
                        sexo_reu,
                        profissao_reu,
                        processo_id
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ${processoId})`;

                    await query(sqlReu, [
                        reu.nome_reu,
                        reu.tp_reu,
                        reu.cnpj_reu || null,
                        reu.estado_civil_reu || null,
                        reu.nome_representante_reu || null,
                        reu.email_reu || null,
                        reu.numero_reu || null,
                        reu.cep_reu || null,
                        reu.endereco_reu || null,
                        reu.endereco_numero_reu || null,
                        reu.endereco_complemento_reu || null,
                        reu.sexo_reu || null,
                        reu.profissao_reu || null
                    ]);
                }
            }



            res.status(200).json("PROCESSO CRIADO COM SUCESSO");
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Erro na API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
