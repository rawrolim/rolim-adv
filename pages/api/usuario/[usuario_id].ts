import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == 'GET') {
            if (!req.query.usuario_id)
                throw new Error("Necessário informar o id do usuário.");
            
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
                WHERE id = '${req.query.usuario_id}'
                ORDER BY TRIM(UPPER(nome)) ASC`;
                
            const rs_usuario = await query(sql);

            if (rs_usuario.length == 0)
                throw new Error("Usuário não encontrado.");

            const usuario = rs_usuario[0];

            res.status(200).json(usuario);
        } else if (req.method == 'PUT') {
            const body = req.body;

            if (body.nome === '')
                throw new Error("Necessário informar o nome.");
            if (body.email === '')
                throw new Error("Necessário informar o e-mail.");
            if (body.usuario === '')
                throw new Error("Necessário informar o usuário.");
            if (body.id === '') {
                throw new Error("Necessário informar o ID do usuário.");
            } else {
                if (!Number(body.id))
                    throw new Error("Necessário informar um ID válido para o usuário.");
            }

            let sql = `UPDATE usuarios SET
                nome = '${body.nome}',
                email = '${body.email}',
                senha = '${body.senha}',
                senha_email = '${body.senha_email}',
                primeiro_acesso = 'N',
                tipo_usuario = '${body.tipo_usuario}',
                usuario = '${body.usuario}',
                status = '${body.status}',
                foto_perfil = '${body.foto_perfil}'
            WHERE id = '${body.id}'
            `;
            await query(sql);
            res.status(200).json("USUÁRIO ATUALIZADO COM SUCESSO");
        } else if (req.method == 'DELETE') {
            const queryString = req.query;
            let sql = `
                UPDATE usuarios SET 
                    status = 'I'
                WHERE id = '${queryString.id}'
            `;
            await query(sql);
            res.status(200).json("USUÁRIO DELETADO COM SUCESSO");
        } else {
            throw new Error("Method not allowed");
        }
    } catch (erro) {
        res.status(400).json(erro.toString());
    }
}