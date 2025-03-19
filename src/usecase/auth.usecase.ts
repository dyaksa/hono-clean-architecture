import {
  LoginRequest,
  RegisterRequest,
} from "../domain/entities/auth.entities";
import { User } from "../domain/entities/user.entities";
import { UserRepository } from "../domain/repositories/user.repository";
import { compare, hash } from "bcrypt";
import { generateToken } from "../internal/tokenutils";
import {
  ConflictError,
  DomainError,
  NotFoundError,
} from "../internal/errors/errors";
import { environment } from "../env.configs";

export class AuthUsecase {
  constructor(private userRepository: UserRepository) {}

  async register(input: RegisterRequest): Promise<User> {
    const existUser = await this.userRepository.findByEmail(input.email);
    if (existUser) {
      throw new ConflictError("Email already registered");
    }

    const existUsername = await this.userRepository.findByUsername(
      input.username
    );

    if (existUsername) {
      throw new ConflictError("Username already registered");
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
      throw new NotFoundError("Email not found");
    }

    const passwordMatch = await compare(input.password, existEmail.password);
    if (!passwordMatch) {
      throw new DomainError("Password not match");
    }

    const token = await generateToken(
      existEmail,
      environment.jwt.secret,
      parseInt(environment.jwt.expiry)
    );

    return {
      token: token,
    };
  }
}
