import { Request, Response } from "express";
import { add } from "../../services/doctor";

export default async (req: Request, res: Response) => {
  const { name, specialty } = req.body;

  const doctor = await add( name, specialty );

  return res.json(doctor);
}
