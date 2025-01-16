
import { query } from '../../../../config/databaseConnection';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const tiposDespesasSql = "SELECT id, nome FROM tipo_despesa";
      const tipo_despesas = await query(tiposDespesasSql);

      res.status(200).json({ tipo_despesas });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
