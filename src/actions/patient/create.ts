import { Request, Response } from "express";
import { add } from "../../services/patient";

export default async (req: Request, res: Response) => {
  const { name, age, gender, address, contact } = req.body;

  const patient = await add(name, age, gender, address, contact );

  return res.json(patient);
}
