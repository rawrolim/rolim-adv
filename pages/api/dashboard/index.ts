import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../config/databaseConnection";

export const revalidate = 5;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method == 'GET'){
            let responseObject = {
                clientesAtivos: 0,
                clientesTotal: 0,
                processosAtivos: 0,
                usuariosAtivos: 0,
                Advogados: []
            };

            let sql = `
            SELECT * FROM clientes`
            const rs_clientes = await query(sql);
            responseObject.clientesAtivos = rs_clientes.filter(c => c.status = 'A').length;
            responseObject.clientesTotal = rs_clientes.length;

            sql = `
            SELECT * FROM processos`
            const rs_processos = await query(sql);
            responseObject.processosAtivos = rs_processos.length;

            sql = `
            SELECT * FROM usuarios WHERE status = 'A'`
            const rs_usuarios = await query(sql);
            responseObject.usuariosAtivos = rs_usuarios.length - 2;
            responseObject.Advogados = rs_usuarios.filter(u => u.tipo_usuario == 1 || u.tipo_usuario == 3);

            res.status(200).json(responseObject);
        }else{
            throw new Error("Method not allowed")
        }
    }catch(erro){
        res.status(400).json(erro.toString())
    }
}