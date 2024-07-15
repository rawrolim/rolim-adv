import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method == 'GET'){
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
            ORDER BY TRIM(UPPER(nome)) ASC`
            const rs_clientes = await query(sql);
            res.status(200).json(rs_clientes);
        }else if(req.method == 'POST'){
            const body = req.body;
            let sql = '';

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
                WHERE cpf = '${body.cpf}'`;
            const rs_cpf = await query(sql);
            if(rs_cpf.length > 0)
                throw new Error("CPF já cadastrado no sistema.");

            sql = `SELECT * FROM clientes
                WHERE mail = '${body.email}'`;
            const rs_email = await query(sql);
            if(rs_email.length > 0)
                throw new Error("E-mail já cadastrado no sistema.");

            sql = `INSERT INTO clientes(
                nome,
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
                data_nascimento,
                data_registro,
                profissao,
                status,
                cnh
            ) VALUES(
                '${body.nome}',
                '${body.cpf}',
                '${body.numero}',
                '${body.email}',
                '${body.endereco}',
                '${body.endereco_num}',
                '${body.endereco_complemento}',
                '${body.cep}',
                '${body.rg}',
                '${body.orgao}',
                '${body.nome_mae}',
                '${body.nome_pai}',
                '${body.estado_civil}',
                '${body.sexo}',
                '${body.data_nascimento}',
                NOW(),
                '${body.profissao}',
                'A',
                '${body.cnh}
            )`;
            await query(sql);
            res.status(200).json("CLIENTE CRIADO COM SUCESSO");
        }else{
            throw new Error("Method not allowed")
        }
    }catch(erro){
        res.status(400).json(erro.toString())
    }
}