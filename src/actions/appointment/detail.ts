import { Request, Response } from "express";
import { detail } from "../../services/appointment";


export default async (req: Request, res: Response)=> {
  const { id } = req.params;

  const appointment = await detail(Number(id));

  if (!appointment) {
    return res.status(404).json({ error: "Appointment not found" });
  }

  return res.json(appointment);
}

