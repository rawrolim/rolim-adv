import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../config/databaseConnection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const advogadosSql = "SELECT id, nome FROM usuarios WHERE (tipo_usuario = 1 OR tipo_usuario = 3) AND STATUS = 'A'";
            const advogados = await query(advogadosSql);
            
            const clientesSql = 'SELECT id, IFNULL(nome,razao_social) nome FROM clientes';
            const clientes = await query(clientesSql);

            res.status(200).json({ advogados, clientes });
        } else if (req.method === 'POST') {
            const body = req.body;
            let sqlProcesso = '';
            let sqlCliente = '';
            let sqlReu = '';
            let processoId: number;
            console.log(body)

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
