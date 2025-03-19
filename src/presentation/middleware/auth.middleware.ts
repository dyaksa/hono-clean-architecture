import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/utils/jwt/jwt";
import { StatusCodes } from "http-status-codes";
import { environment } from "../../env.configs";
import { jwtSchema, TokenPayload } from "../../internal/tokenutils/jwt";

const auth = () => {
  return createMiddleware(async (c, next) => {
    const token = c.req.header("Authorization");
    if (!token) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, {
        message: "Unauthorized",
      });
    }

    const jwtToken = token!.replace("Bearer ", "");

    let payload: TokenPayload;

    try {
      payload = jwtSchema.parse(
        await verify(jwtToken, environment.jwt.secret!)
      );
    } catch (e) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, {
        message: "Unauthorized",
      });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTime) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, {
        message: "token has expired",
      });
    }

    c.set("user_id", payload.sub);
    await next;
  });
};
