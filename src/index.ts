import { Hono } from "hono";
import { logger } from "hono/logger";
import "./container";
import { router } from "./presentation/routes";
import { cors } from "hono/cors";

const app = new Hono();

app.use(logger());
app.use(cors());

router(app.basePath("/api"));

export default app;
