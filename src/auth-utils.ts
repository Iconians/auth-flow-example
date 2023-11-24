import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../prisma/db.setup";

const saltRounds = 11;

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

export const createUnsecuredUserInformation = (user: User) => ({
  email: user.email,
});

export const createAuthTokenForUser = (user: User) => {
  return jwt.sign(
    createUnsecuredUserInformation(user),
    process.env.JWT_SECRET
  );
};

const jwtInfoSchema = z.object({
  email: z.string().email(),
  iat: z.number(),
});

export const getDataFromAuthToken = (token?: string) => {
  if (!token) return null;
  try {
    return jwtInfoSchema.parse(
      jwt.verify(token, process.env.JWT_SECRET)
    );
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [, token] = req.headers.authorization?.split(" ") || [];
  const JwtData = getDataFromAuthToken(token);
  if (!JwtData) {
    return res
      .status(401)
      .json({ message: "Unauthorized, invalid token" });
  }
  const userFromJwt = await prisma.user.findFirst({
    where: {
      email: JwtData.email,
    },
  });
  if (!userFromJwt) {
    return res.status(401).json({ message: "User not found" });
  }
  req.user = userFromJwt;
  next();
};
