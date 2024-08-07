import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const authToken = req.headers.authorization;
    const tokenData = jwt.decode(authToken);

    // Verifica se a foto está sendo enviada
    if (!req.body.Foto) {
      return res.status(400).json("Foto não fornecida");
    }
    // Atualiza a foto de perfil no banco de dados
    await query(`
      UPDATE usuarios SET
      foto_perfil = ?
      WHERE id = ?
    `, [req.body.Foto,tokenData.user_id]);

    res.status(200).json("Foto atualizada com sucesso");
  } catch (err) {
    res.status(400).json(err.toString());
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}