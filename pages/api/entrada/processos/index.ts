import { query } from '../../../../config/databaseConnection';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const processosSql = "SELECT id, numero_processo FROM processos";
      const processos = await query(processosSql);

      res.status(200).json({ processos });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
