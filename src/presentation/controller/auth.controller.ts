import { HTTPException } from "hono/http-exception";
import { AuthUsecase } from "../../usecase/auth.usecase";
import { Context } from "hono";
import { BaseController } from "./base.controller";

export class AuthController extends BaseController {
  constructor(private authUsecase: AuthUsecase) {
    super();
  }

  async register(c: Context) {
    try {
      const body = await c.req.json();
      const user = await this.authUsecase.register(body);
      return this.created(c, "user success registered", user);
    } catch (e) {
      return this.error(c, e as Error);
    }
  }

  async login(c: Context) {
    try {
      const body = await c.req.json();
      const token = await this.authUsecase.login(body);
      return this.ok(c, "login success", token);
    } catch (e) {
      return this.error(c, e as Error);
    }
  }
}
