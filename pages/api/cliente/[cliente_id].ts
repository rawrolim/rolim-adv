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
                nome,
                CASE 
                    WHEN status = 'A' THEN 'Ativo'
                    WHEN status = 'I' THEN 'Inativo'
                    ELSE status
                END status,
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
                estado_civil,
                sexo,
                DATE_FORMAT(data_nascimento, '%Y-%m-%d') as data_nascimento,
                data_registro,
                profissao,
                cnh, 
                cnpj,
                razao_social,
                inscricao_municipal,
                inscricao_estadual,
                nome_representante,
                cpf_representante,
                profissao_representante,
                numero_representante,
                email_empresa,
                cep_empresa,
                endereco_empresa,
                endereco_numero_empresa,
                estado_civil_representante,
                endereco_complemento_empresa,
                rg_representante,
                cep_representante,
                endereco_representante,
                endereco_num_representante,
                endereco_complemento_representante,
                CONCAT(UPPER(SUBSTRING(tp_pessoa, 1, 1)), LOWER(SUBSTRING(tp_pessoa, 2))) AS tp_pessoa
            FROM clientes
            WHERE id = ?`
            const rs_cliente = await query(sql, [req.query.cliente_id]);

            if (rs_cliente.length == 0)
                throw new Error("Cliente não encontrado.")

            const cliente = rs_cliente[0];

            res.status(200).json(cliente);
        } else if (req.method == 'PUT') {
            const body = req.body;

            if (body.nome == '')
                throw new Error("Necessário informar o nome")
            if (body.email == '')
                throw new Error("Necessário informar o e-mail")
            if (body.cpf == '')
                throw new Error("Necessário informar o CPF")
            if (body.rg == '')
                throw new Error("Necessário informar o RG")
            if (body.orgao == '')
                throw new Error("Necessário informar o ORGÃO")
            if (body.id == '') {
                throw new Error("Necessário informar o ID do usuário")
            } else {
                if (!Number(body.id))
                    throw new Error("Necessário informar um ID válido para o usuário")
            }
            let sql = '';
            if(body.tp_pessoa === 'Física'){
                
                sql = `UPDATE clientes SET
                nome = ?,
                cpf = ?,
                numero = ?,
                mail = ?,
                endereco = ?,
                endereco_num = ?,
                endereco_complemento = ?,
                cep = ?,
                rg = ?,
                orgao = ?,
                nome_mae = ?,
                nome_pai = ?,
                estado_civil = ?,
                sexo = ?,
                numero = ?,
                profissao = ?,
                cnh = ?,
                data_nascimento = ?
            WHERE id = ?
            `;
            await query(sql,[body.nome,body.cpf,body.numero,body.email,body.endereco,body.endereco_num,body.endereco_complemento,body.cep,body.rg,body.orgao,body.nome_mae,body.nome_pai,body.estado_civil,body.sexo,body.numero,body.profissao,body.cnh,body.data_nascimento,body.id]);
            res.status(200).json("CLIENTE ATUALIZADO COM SUCESSO");
            }
            else{
                if (body.inscricao_municipal == '')
                    throw new Error("Necessário informar a Inscrição Municipal")
                if (body.inscricao_estadual == '')
                    throw new Error("Necessário informar a Inscrição Estadual")
                if (body.cnpj == '')
                    throw new Error("Necessário informar o CNPJ")

                sql = `UPDATE clientes SET
                cnpj = ?,
                razao_social = ?,
                inscricao_municipal = ?,
                inscricao_estadual = ?,
                nome_representante = ?,
                cpf_representante = ?,
                profissao_representante = ?,
                numero_representante = ?,
                email_empresa = ?,
                cep_empresa = ?,
                endereco_empresa = ?,
                endereco_numero_empresa = ?,
                endereco_complemento_empresa= ?,
                estado_civil_representante = ?,
                cep_representante = ?,
                endereco_representante = ?, 
                endereco_num_representante = ?,
                endereco_complemento_representante = ?,
                rg_representante = ?
            WHERE id = ?
            `;
            await query(sql,[body.cnpj,body.razao_social,
                body.inscricao_municipal,body.inscricao_estadual,
                body.nome_representante,body.cpf_representante,
                body.profissao_representante,body.numero_representante,
                body.email_empresa,body.cep_empresa,body.endereco_empresa,
                body.endereco_numero_empresa ,body.endereco_complemento_empresa,
                body.estado_civil_representante,body.cep_representante,body.endereco_representante,
                body.endereco_num_representante,
                body.endereco_complemento_representante,body.rg_representante,body.id]);
            res.status(200).json("CLIENTE ATUALIZADO COM SUCESSO");
            }

        } else if (req.method == 'DELETE') {
            let sql = '';
            const queryString = req.query;
            let status = '';

            sql = 'SELECT status FROM clientes WHERE id = ?'
            const rs_status = await query(sql, [queryString.cliente_id]);
            if (rs_status[0]['status'] == 'I') {
                status = 'A'
            } else {
                status = 'I'
            }

            sql = `
                UPDATE clientes SET 
                    status = ?
                WHERE id = ?
            `;
            await query(sql, [status, queryString.cliente_id]);
            res.status(200).json("CLIENTE DELETADO COM SUCESSO");
        } else {
            throw new Error("Method not allowed")
        }
    } catch (erro) {
        res.status(400).json(erro.toString())
    }
}
