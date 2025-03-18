import { HTTPException } from "hono/http-exception";
import {
  LoginRequest,
  RegisterRequest,
} from "../domain/entities/auth.entities";
import { User } from "../domain/entities/user.entities";
import { UserRepository } from "../domain/repositories/user.repository";
import { compare, hash } from "bcrypt";
import { generateToken } from "../internal/tokenutils";
import { StatusCodes } from "http-status-codes";

export class AuthUsecase {
  constructor(private userRepository: UserRepository) {}

  async register(input: RegisterRequest): Promise<User> {
    const existUser = await this.userRepository.findByEmail(input.email);
    if (existUser) {
      throw new HTTPException(StatusCodes.CONFLICT, {
        message: "Email already registered",
      });
    }

    const existUsername = await this.userRepository.findByUsername(
      input.username
    );

    if (existUsername) {
      throw new HTTPException(StatusCodes.CONFLICT, {
        message: "Username already registered",
      });
    }

    const passwordHash = await hash(input.password, 10);

    const newUser: Omit<User, "id"> = {
      username: input.username,
      email: input.email,
      password: passwordHash,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const createdUser = await this.userRepository.create(newUser);

    return createdUser;
  }

  async login(input: LoginRequest): Promise<any> {
    const existEmail = await this.userRepository.findByEmail(input.email);
    if (!existEmail) {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: "Email not found",
      });
    }

    const passwordMatch = await compare(input.password, existEmail.password);
    if (!passwordMatch) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, {
        message: "Invalid password",
      });
    }

    const token = await generateToken(existEmail, "secret", 3600);

    return {
      token: token,
    };
  }
}
