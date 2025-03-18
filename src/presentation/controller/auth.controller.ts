import { HTTPException } from "hono/http-exception";
import { AuthUsecase } from "../../usecase/auth.usecase";
import { Context } from "hono";

export class AuthController {
  constructor(private authUsecase: AuthUsecase) {}

  async register(c: Context) {
    try {
      const body = await c.req.json();
      const user = await this.authUsecase.register(body);
      return c.json(user);
    } catch (e) {
      if (e instanceof HTTPException) {
        return c.json({ error: e.message }, e.status);
      }
    }
  }

  async login(c: Context) {
    try {
      const body = await c.req.json();
      const token = await this.authUsecase.login(body);
      return c.json(token);
    } catch (e) {
      if (e instanceof HTTPException) {
        return c.json({ error: e.message }, e.status);
      }
    }
  }
}
