import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import * as Sentry from "@sentry/node";
import "express-async-errors";

import "@shared/infra/orm/prisma";
import "@shared/containers";
import { AppError } from "@shared/AppError";
import { router } from "./routes";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(cors());
app.use(express.json());

app.use(router);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message} `,
    });
  },
);

export { app };
