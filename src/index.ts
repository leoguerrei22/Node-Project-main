import env from "dotenv";
import express from "express";
import router from "./routes";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./middleware/token";
env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const requestLogger = (
  request: Request,
  response: Response,
  Next: NextFunction) => {
    console.log(`[${request.method}] => url:: ${request.url}`);
    Next()
};
app.use(requestLogger);

app.use(verifyToken);

app.use(router);

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);

// https://www.prisma.io

// npm i prisma -D

// npx prisma init

// npx prisma migrate dev --name initial

// npm i @prisma/client

// caso não consigam migrar para a base da dados de casa usar o comando npx migrate reset
