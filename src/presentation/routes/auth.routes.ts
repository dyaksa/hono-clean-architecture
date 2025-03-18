import { Hono } from "hono";
import { authController } from "../../container";
import { zValidator } from "@hono/zod-validator";
import {
  LoginSchema,
  RegisterSchema,
} from "../../domain/entities/auth.entities";

export const authRoute = (router: Hono) => {
  router.post(
    "/register",
    zValidator("json", RegisterSchema),
    authController.register.bind(authController)
  );

  router.post(
    "/login",
    zValidator("json", LoginSchema),
    authController.login.bind(authController)
  );
};
