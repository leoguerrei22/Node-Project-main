import { Request, Response } from "express";
import { remove } from "../../services/patient";

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  const patient = await remove(Number(id));

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  return res.json(patient);
}