import { Request, Response } from "express";
import { update } from "../../services/doctor";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, specialty } = req.body;

  const doctor = await update(Number(id), req.body);

  if (!doctor) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  return res.json(doctor);
}
