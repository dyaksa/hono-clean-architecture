import { PostgresqlConnection } from "./infrastructure/db";
import { UserRepositoryImpl } from "./infrastructure/db/repositories/user.repository";
import { AuthController } from "./presentation/controller/auth.controller";
import { AuthUsecase } from "./usecase/auth.usecase";

const database = new PostgresqlConnection();
const userRepository = new UserRepositoryImpl(database);
const authUsecase = new AuthUsecase(userRepository);
const authController = new AuthController(authUsecase);

export { authController };
