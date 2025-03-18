import { Hono } from "hono";
import { logger } from "hono/logger";
import "./container";
import { router } from "./presentation/routes";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { errorHandler, errorResponse } from "./internal/response";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());
app.use("*", secureHeaders());

app.onError(errorHandler);

app.notFound(async (c) => {
  return errorResponse(c, "Not Found", 404);
});

router(app.basePath("/api"));

export default app;
