import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == 'GET') {
            if (!req.query.cliente_id)
                throw new Error("Necessário informar o id do cliente.")
            let sql = `
            SELECT 
                id,
                UPPER(nome) nome,
                cpf,
                numero,
                mail email,
                endereco,
                endereco_num,
                endereco_complemento,
                cep,
                rg,
                orgao,
                nome_mae,
                nome_pai,
                CASE 
                    WHEN estado_civil = '1' THEN 'Solteiro(a)'
                    WHEN estado_civil = '2' THEN 'Casado(a)'
                    WHEN estado_civil = '3' THEN 'Divorciado(a)'
                    WHEN estado_civil = '4' THEN 'Viúvo(a)'
                    WHEN estado_civil = '5' THEN 'Outros(a)'
                    WHEN estado_civil = '6' THEN 'Separado(a) Judicialmente'
                    WHEN estado_civil = '7' THEN 'União Estável'
                    ELSE estado_civil
                END estado_civil,
                CASE 
                    WHEN sexo='1' THEN 'Masculino'
                    WHEN sexo='2' THEN 'Feminino'
                    ELSE sexo
                END sexo,
                data_nascimento,
                data_registro,
                profissao,
                status,
                cnh
            FROM clientes
            WHERE id = '${req.query.cliente_id}'`
            const rs_cliente = await query(sql);

            if (rs_cliente.length == 0)
                throw new Error("Cliente não encontrado.")

            const cliente = rs_cliente[0];

            res.status(200).json(cliente);
        } else {
            throw new Error("Method not allowed")
        }
    } catch (erro) {
        res.status(400).json(erro.toString())
    }
}
