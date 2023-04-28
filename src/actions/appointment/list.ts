import { Request, Response } from "express";
import { all } from "../../services/appointment";

export default async (req: Request, res: Response) => {
  const appointment = await all();

  return res.json(appointment);
}