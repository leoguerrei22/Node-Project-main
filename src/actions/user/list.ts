import { Request, Response } from "express";
import { all } from "../../services/user";

export default async (req: Request, res: Response) => {
  const user = await all();

  return res.json(user);
}

//!! provavelmente vou excluir