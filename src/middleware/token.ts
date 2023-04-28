import { detail } from "./../services/user";
import { ExtendedPayload } from "./../models/token";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const publicEndpoints = ["/user/login", "/user/register"];

export function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (publicEndpoints.includes(request.path)) {
    return next();
  }

  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.status(401).json({
      code: 401,
      message: "Token not found",
    });
  }
  verify(token, "VeryScreteKeyToSignMyLogin", async (error, payload) => {
    if (error) {
      return response.status(403).json({
        code: 403,
        message: error.message,
      });
    }
    const { user_id: id } = payload as ExtendedPayload;

    request.user = await detail(id);
    next();
  });
}