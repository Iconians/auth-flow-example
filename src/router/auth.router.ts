import e, { Router } from "express";
import { prisma } from "../../prisma/db.setup";
import "express-async-errors";
import { validateRequest } from "zod-express-middleware";
import { z } from "zod";
import { intParseableString } from "../zod/parseableString.schema";
import bcrypt from "bcrypt";
import {
  createAuthTokenForUser,
  createUnsecuredUserInformation,
} from "../auth-utils";

const authControlller = Router();

authControlller.post(
  "/auth/login",
  validateRequest({
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  }),
  async ({
    body: { email: bodyEmail, password: bodyPassword },
    res,
  }) => {
    if (!res) {
      throw new Error("Response object is undefined");
    }
    const user = await prisma.user.findFirst({
      where: {
        email: bodyEmail,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      bodyPassword,
      user.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const userInformation = createUnsecuredUserInformation(user);
    const token = createAuthTokenForUser(user);

    return res?.status(200).json({ token, userInformation });
  }
);

export { authControlller };
