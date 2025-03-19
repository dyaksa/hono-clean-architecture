import { verify, sign, decode } from "hono/jwt";
import { User } from "../../domain/entities/user.entities";
import { z } from "zod";

export const jwtSchema = z.object({
  sub: z.string(),
  exp: z.number().refine((n) => n > Date.now() / 1000, {
    message: "Token has expired",
  }),
});

export type JwtPayload = z.infer<typeof jwtSchema>;

export type TokenPayload = {
  sub: string;
  exp: number;
};

export const generateToken = async (
  user: User,
  secret: string,
  expiry: number
): Promise<string> => {
  const payload: TokenPayload = {
    sub: user.id,
    exp: Math.floor(Date.now() / 1000) + expiry,
  };
  return await sign(payload, secret, "HS256");
};

export const verifyToken = async (token: string, secret: string) => {
  return await verify(token, secret, "HS256");
};

// export const getIdentity = async (token: string): Promise<User> => {
//   const de = await decode(token);
// };
