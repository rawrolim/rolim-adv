import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method == 'GET'){
            let sql = `
            SELECT 
                id,
                UPPER(nome) nome,
                mail email,
                numero,
                CASE 
                    WHEN status = 'A' THEN 'Ativo'
                    WHEN status = 'I' THEN 'Inativo'
                    ELSE status
                END status,
                tp_pessoa,
                nome_representante,
                email_empresa,
                numero_representante
            FROM clientes
            ORDER BY TRIM(UPPER(nome)) ASC`
            const rs_clientes = await query(sql);
            res.status(200).json(rs_clientes);
        }else if(req.method == 'POST'){
            const body = req.body;
            let sql = '';
            console.log(body.tp_pessoa);
            if(body.tp_pessoa === 'física'){
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
    
                sql = `SELECT * FROM clientes 
                    WHERE cpf = ?`;
                const rs_cpf = await query(sql,[body.cpf]);
                if(rs_cpf.length > 0)
                    throw new Error("CPF já cadastrado no sistema.");
    
                sql = `SELECT * FROM clientes
                    WHERE mail = ?`;
                const rs_email = await query(sql,[body.email]);
                if(rs_email.length > 0)
                    throw new Error("E-mail já cadastrado no sistema.");
    
                sql = `INSERT INTO clientes(
                    nome,
                    cpf,
                    numero,
                    mail,
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
                    data_nascimento,
                    data_registro,
                    profissao,
                    status,
                    cnh,
                    tp_pessoa
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
                    ?,
                    NOW(),
                    ?,
                    'A',
                    ?,
                    ?
                )`;
                await query(sql,[body.nome,body.cpf,body.numero,body.email,body.endereco,body.endereco_num,body.endereco_complemento,body.cep,body.rg,body.orgao,body.nome_mae,body.nome_pai,body.estado_civil,body.sexo,body.data_nascimento,body.profissao,body.cnh,body.tp_pessoa]);
                res.status(200).json("CLIENTE CRIADO COM SUCESSO");
            }else{
                if(body.cnpj == '')
                    throw new Error("Necessário informar o CNPJ")
                if(body.inscricao_municipal == '')
                    throw new Error("Necessário informar a Inscrição Municipal")
                if(body.inscricao_estadual == '')
                    throw new Error("Necessário informar a Inscrição Estadual")
    
                sql = `INSERT INTO clientes(
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
                    endereco_complemento_empresa,
                    tp_pessoa
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
                    ?
                )`;
                await query(sql,[body.cnpj,body.razao_social,body.inscricao_municipal,body.inscricao_estadual,body.nome_representante,body.cpf_representante,
                    body.profissao_representante,body.numero_representante,body.email_empresa,body.cep_empresa,body.endereco_empresa,body.endereco_numero_empresa,body.endereco_complemento_empresa,body.tp_pessoa]);
                res.status(200).json("CLIENTE CRIADO COM SUCESSO");

            }
            
        }else{
            throw new Error("Method not allowed")
        }
    }catch(erro){
        res.status(400).json(erro.toString())
    }
}