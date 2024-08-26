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
        }else if(req.method == 'POST'){
            const body = req.body;
            let sql = '';
            
                if(body.advogado == '')
                    throw new Error("Necessário informar o Advogado")
                if(body.cliente_id == '')
                    throw new Error("Necessário informar o Cliente")
    
                sql = `INSERT INTO processos(
                    advogado,
                    cliente_id,
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
                ) VALUES(
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )`;
                await query(sql,[body.advogado,
                    body.cliente_id,body.numero_processo,body.instancia,
                    body.tribunal,body.numero_orgao,body.natureza,
                    body.motivo,body.comarca,body.valor_causa,body.data_distribuicao,
                    body.valor_contrato,body.parcelas,body.entrada,
                    body.inicio_prestacao]);
                res.status(200).json("PROCESSO CRIADO COM SUCESSO");
            
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}