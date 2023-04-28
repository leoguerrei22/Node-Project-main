import { Request, Response } from "express";
import { update } from "../../services/patient";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age, gender, address, contact } = req.body;

  const patient = await update(Number(id), req.body);

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  return res.json(patient);
}
