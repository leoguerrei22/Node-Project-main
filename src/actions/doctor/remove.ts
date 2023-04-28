import { Request, Response } from "express";
import { remove } from "../../services/doctor";

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  const doctor = await remove(Number(id));

  if (!doctor) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  return res.json(doctor);
}