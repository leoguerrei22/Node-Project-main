import { Request, Response } from "express";
import { detail } from "../../services/user";


export default async (req: Request, res: Response)=> {
  return res.json(req.user);
      
  };

