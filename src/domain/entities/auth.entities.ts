import { password } from "bun";
import { z } from "zod";

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export const RegisterSchema = z.object({
  username: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export type LoginRequest = {
  email: string;
  password: string;
};

export const LoginSchema = z.object({
  email: z.string().email().min(3).max(100),
  password: z.string().min(8).max(255),
});
