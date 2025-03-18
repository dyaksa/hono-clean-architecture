import { verify, sign, decode } from "hono/jwt";
import { User } from "../../domain/entities/user.entities";

export const generateToken = async (
  user: User,
  secret: string,
  expiry: number
): Promise<string> => {
  return await sign(
    {
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + expiry,
    },
    secret,
    "HS256"
  );
};
