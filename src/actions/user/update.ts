import { Request, Response } from "express";
import { update } from "../../services/user";

export default async (req: Request, res: Response) => {
  try { const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  // Verificar se a senha antiga está correta
  const user = await update(Number(id), oldPassword, newPassword);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  } 

  return res.json(user);
} catch (e: any) {
    return res.status(401).json({
      code: 401,
      message: e.message,
    });
}
}
