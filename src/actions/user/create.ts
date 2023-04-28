import { Request, Response } from "express";
import { add } from "../../services/user";

export default async (request: Request, response: Response) => {
  const { login, password } = request.body;

  const user = await add(login, password);

  return response.json(user);
};
