import { NextApiRequest, NextApiResponse } from "next";
import db from "../../config/databaseConnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientes = await db.query("SELECT * FROM clientes");

  console.log(clientes)
  
  res.status(200).json({ name: 'John Doe' })
}
