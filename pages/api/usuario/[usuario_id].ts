import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == 'GET') {
            if (!req.query.cliente_id)
                throw new Error("Necessário informar o id do usuário.")
            let sql = `
                 SELECT 
                    id,
                    UPPER(nome) AS nome,
                    tipo_usuario,
                    senha,
                    email,
                    usuario,
                    primeiro_acesso,
                    status,
                    senha_email
                FROM usuarios
            WHERE id = ?`
            const rs_usuario = await query(sql, [req.query.usuario_id]);

            if (rs_usuario.length == 0)
                throw new Error("Usuário não encontrado.")

            const usuario = rs_usuario[0];

            res.status(200).json(usuario);
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

            let sql = `UPDATE usuarios SET
                nome = ?,
                email = ?,
                senha = ?,
                senha_email = ?,
                primeiro_acesso = 'N',
                tipo_usuario = ?,
                usuario = ?,
                status = ?,
                foto_perfil = ?
            WHERE id = ?
            `;
            await query(sql,[body.nome,body.email,body.senha,body.senha_email,body.tipo_usuario,body.status,body.foto_perfil,body.id]);
            res.status(200).json("USUÁRIO ATUALIZADO COM SUCESSO");
        } else if (req.method == 'DELETE') {
            let sql = '';
            const queryString = req.query;
            let status = '';

            sql = 'SELECT status FROM usuarios WHERE id = ?'
            const rs_status = await query(sql, [queryString.usuario_id]);
            if (rs_status[0]['status'] == 'I') {
                status = 'A'
            } else {
                status = 'I'
            }

            sql = `
                UPDATE usuarios SET 
                    status = ?
                WHERE id = ?
            `;
            await query(sql, [status, queryString.usuario_id]);
            res.status(200).json("USUÁRIO DELETADO COM SUCESSO");
        } else {
            throw new Error("Method not allowed")
        }
    } catch (erro) {
        res.status(400).json(erro.toString())
    }
}