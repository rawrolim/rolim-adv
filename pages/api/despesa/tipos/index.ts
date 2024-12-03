// pages/api/despesa/tipos.js
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../../config/databaseConnection';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const tiposDespesasSql = "SELECT id, nome FROM tipo_despesa";
      const tiposDespesas = await query(tiposDespesasSql);

      console.log("Tipos retornados da API:", tiposDespesas); // Log para depuração
      res.status(200).json({ tiposDespesas });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Erro na API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
