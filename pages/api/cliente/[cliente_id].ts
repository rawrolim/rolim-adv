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
                CASE 
                    WHEN status = 'A' THEN 'Ativo'
                    WHEN status = 'I' THEN 'Inativo'
                    ELSE status
                END status,
                cnh
            FROM clientes
            WHERE id = '${req.query.cliente_id}'`
            const rs_cliente = await query(sql);

            if (rs_cliente.length == 0)
                throw new Error("Cliente não encontrado.")

            const cliente = rs_cliente[0];

            res.status(200).json(cliente);
        }else if(req.method == 'PUT'){
            const body = req.body;

            if(body.nome == '')
                throw new Error("Necessário informar o nome")
            if(body.email == '')
                throw new Error("Necessário informar o e-mail")
            if(body.cpf == '')
                throw new Error("Necessário informar o CPF")
            if(body.rg == '')
                throw new Error("Necessário informar o RG")
            if(body.orgao == '')
                throw new Error("Necessário informar o ORGÃO")
            if(body.id == ''){
                throw new Error("Necessário informar o ID do usuário")
            }else{
                if(!Number(body.id))
                    throw new Error("Necessário informar um ID válido para o usuário")
            }

            let sql = `UPDATE clientes SET
                nome = '${body.nome}',
                cpf = '${body.cpf}',
                numero = '${body.numero}',
                mail email = '${body.email}',
                endereco = '${body.endereco}',
                endereco_num = '${body.endereco_num}',
                endereco_complemento = '${body.endereco_complemento}',
                cep = '${body.cep}',
                rg = '${body.rg}',
                orgao = '${body.orgao}',
                nome_mae = '${body.nome_mae}',
                nome_pai = '${body.nome_pai}',
                estado_civil = '${body.estado_civil}',
                sexo = '${body.sexo}',
                data_nascimento = '${body.data_nascimento}',
                profissao = '${body.profissao}',
                status = '${body.status}',
                cnh = '${body.cnh}'
            WHERE id = '${body.id}'
            `;
            await query(sql);
            res.status(200).json("USUÁRIO ATUALIZADO COM SUCESSO");
        }else if(req.method == 'DELETE'){
            const queryString = req.query;
            let sql = `
                UPDATE clientes SET 
                    status = 'I'
                WHERE id = '${queryString.id}'
            `;
            await query(sql);
            res.status(200).json("USUÁRIO DELETADO COM SUCESSO");
        }else {
            throw new Error("Method not allowed")
        }
    } catch (erro) {
        res.status(400).json(erro.toString())
    }
}
