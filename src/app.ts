import express from "express";
import { dogController } from "./router/dog.router";
import { userController } from "./router/user.router";
import "express-async-errors";
import { authControlller } from "./router/auth.router";
import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }

  namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

["DATABASE_URL", "JWT_SECRET"].forEach((env) => {
  if (process.env[env] === undefined) {
    throw new Error(`Environment variable ${env} is missing`);
  }
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(dogController);
app.use(userController);
app.use(authControlller);

app.listen(3000);
