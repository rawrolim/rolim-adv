import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../config/databaseConnection";
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { body } = req;

        if (!body.username)
            throw new Error("O login não foi inserido");

        if(!body.password)
            throw new Error("A senha não foi inserida");
        
        let sql = `
            SELECT 
                u.nome, 
                u.email, 
                u.id,  
                tu.nome nome_acesso,
                NOT ISNULL(tu.master) acesso_master,
                IF(u.primeiro_acesso='S',1,0) primeiro_acesso
            FROM usuarios u 
            INNER JOIN tipo_usuario tu ON tu.id = u.tipo_usuario 
            WHERE 
                u.usuario = '${body.username}'
                AND u.senha = MD5('${body.password}')
                AND u.status = 'A'
        `;
        const rs_user = await query(sql);

        if(rs_user.length > 0){
            const usuario = rs_user[0];
            const jwtData = {
                user_id: usuario['id'],
                user_name: usuario['nome'],
                user_email: usuario['email'],
                user_access_name: usuario['nome_acesso'],
                user_first_access: usuario['primeiro_acesso'],
                user_access_master: Boolean(usuario['acesso_master']),
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                iat: Math.floor(Date.now() / 1000),
                refreshToken: generateToken()
            }
            
            const jwtToken = jwt.sign(jwtData, process.env.JWT_SECRET);

            sql = `
            UPDATE usuarios SET token = '${jwtToken}' 
                WHERE id = '${usuario['id']}'
            `;
            await query(sql)

            res.status(200).json({jwtData, jwtToken })
        }else{
            throw new Error("Nenhum usuário encontrado")
        }
    } catch (err) {
        res.status(400).json(err.toString())
    }
}

function generateToken(){
    var token = ""
    for (var i = 0; i < 16; i++) {
        token += rand();
    }
    return token;
};

function rand(){
    return Math.random().toString(36).substr(2);
};