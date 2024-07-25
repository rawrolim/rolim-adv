import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

function generateRandomPassword() {
    return Math.random().toString(36).slice(2);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == 'GET') {
            let sql = `
                SELECT 
                    u.id,
                    u.nome,
                    tu.nome nome_acesso,
                    u.email,
                    CASE
                        WHEN u.status = 'A' THEN 'ATIVO'
                        WHEN u.status = 'I' THEN 'INATIVO'
                    END status,
                FROM usuarios u 
                INNER JOIN tipo_usuario tu ON tu.id = u.tipo_usuario
                ORDER BY u.nome ASC`;
            const rs_usuarios = await query(sql);
            res.status(200).json(rs_usuarios);
        } else if (req.method == 'POST') {
            const body = req.body;

            if (body.nome === '')
                throw new Error("Necessário informar o nome.");
            if (body.email === '')
                throw new Error("Necessário informar o e-mail.");
            if (body.usuario === '')
                throw new Error("Necessário informar o usuário.");
            if (body.tipo_usuario === 0)
                throw new Error("Necessário informar o Tipo de Usuário");

            let sql = `SELECT * FROM usuarios WHERE email = '${body.email}'`;
            const rs_email = await query(sql);
            if (rs_email.length > 0)
                throw new Error("E-mail já cadastrado no sistema.");
            const senhaGerada = generateRandomPassword();

            sql = `INSERT INTO usuarios (
                    nome,
                    tipo_usuario,
                    senha,
                    usuario,
                    status,
                    primeiro_acesso,
                    email,
                    senha_email
                ) VALUES (?, ?, ?, ?, 'A', 'S', ?, ?)`;
            await query(sql, [
                body.nome,
                body.tipo_usuario,
                senhaGerada,
                body.usuario,
                body.email,
                body.senha_email
            ]);
            res.status(200).json({senhaGerada});

        } else {
            throw new Error("Method not allowed")
        }
    } catch (erro) {
        res.status(400).json(erro.toString())
    }
}