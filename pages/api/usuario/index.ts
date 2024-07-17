import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";
import sendEmail from "../email";

// Função para gerar uma senha aleatória
function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const body = req.body;

            if (body.nome === '')
                throw new Error("Necessário informar o nome.");
            if (body.email === '')
                throw new Error("Necessário informar o e-mail.");
            if (body.usuario === '')
                throw new Error("Necessário informar o usuário.");

            let sql = `SELECT * FROM usuarios WHERE email = '${body.email}'`;
            const rs_email = await query(sql);
            if (rs_email.length > 0)
                throw new Error("E-mail já cadastrado no sistema.");

            const senhaGerada = generateRandomPassword(10); 

            sql = `INSERT INTO usuarios (
                nome,
                tipo_usuario,
                senha,
                usuario,
                status,
                primeiro_acesso,
                email,
                foto_perfil,
                senha_email
            ) VALUES (
                '${body.nome}',
                '${body.tipo_usuario}',
                '${senhaGerada}', // Usar a senha gerada
                '${body.usuario}',
                'A',
                'S',
                '${body.email}',
                '${body.foto_perfil}',
                '${body.senha_email}'
            )`;
            await query(sql);

            // Enviar email com a senha gerada
            await sendEmail({
                to: body.email,
                subject: "Sua conta foi criada",
                text: `Olá ${body.nome},\n\nSua conta foi criada com sucesso. Sua senha é: ${senhaGerada}\n\nPor favor, altere sua senha após o primeiro acesso.\n\nObrigado!`
            });

            res.status(200).json("USUÁRIO CRIADO COM SUCESSO");
        } else if (req.method === 'GET') {
            let sql = `
                SELECT 
                    u.id,
                    u.nome,
                    tu.nome nome_acesso,
                    u.senha,
                    u.email,
                    u.usuario,
                    u.primeiro_acesso,
                    CASE
                        WHEN u.status = 'A' THEN 'ATIVO'
                        WHEN u.status = 'I' THEN 'INATIVO'
                    END status,
                    u.senha_email
                FROM usuarios u 
                INNER JOIN tipo_usuario tu ON tu.id = u.tipo_usuario
                ORDER BY u.nome ASC`;
            const rs_usuarios = await query(sql);
            res.status(200).json(rs_usuarios);
        } else {
            throw new Error("Method not allowed");
        }
    } catch (erro) {
        res.status(400).json(erro.toString());
    }
}