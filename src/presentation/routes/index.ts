import { Hono } from "hono";
import { authRoute } from "./auth.routes";

export const router = (router: Hono) => {
  authRoute(router);
};
