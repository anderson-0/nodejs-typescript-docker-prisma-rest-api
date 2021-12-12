import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import jwt from "@config/jwt";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.cookies.ecommerce_jwt_token;

  if (!authHeader) return res.status(401).json({ error: "Token missing" });

  const [, token] = authHeader.split(" ");

  try {
    // Make sure the token was generated using the same secret used to verify it
    const { sub: userId } = verify(token, jwt.secretToken) as IPayload;

    // Extract user id from token and add it to the request
    req.user = {
      id: userId,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid JWT Token" });
  }
}
