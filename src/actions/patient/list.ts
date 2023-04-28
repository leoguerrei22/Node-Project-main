import { Request, Response } from "express";
import { all } from "../../services/patient";

export default async (req: Request, res: Response) => {
  const patients = await all();

  return res.json(patients);
}