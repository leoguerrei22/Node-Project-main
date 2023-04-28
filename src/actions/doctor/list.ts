import { Request, Response } from "express";
import { all } from "../../services/doctor";

export default async (req: Request, res: Response) => {
  const doctor = await all();

  return res.json(doctor);
}