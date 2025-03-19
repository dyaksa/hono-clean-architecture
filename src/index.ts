import { Hono } from "hono";
import { logger } from "hono/logger";
import "./container";
import { router } from "./presentation/routes";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { ErrorHandler } from "./infrastructure/http/error/error.handler";
import { NotFoundError } from "./internal/errors/errors";
import { environment } from "./env.configs";

const app = new Hono();
const errorHandler = new ErrorHandler();

app.use("*", logger());
app.use("*", cors());
app.use("*", secureHeaders());

app.notFound(async (c) => {
  const error = new NotFoundError("Route not found");
  return errorHandler.handleError(error, c);
});

router(app.basePath("/api"));

export default {
  port: environment.port,
  fetch: app.fetch,
};
