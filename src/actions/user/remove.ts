import { Request, Response } from "express";
import { remove } from "../../services/user";

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await remove(Number(id));

  if (!user) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  return res.json(user);
}