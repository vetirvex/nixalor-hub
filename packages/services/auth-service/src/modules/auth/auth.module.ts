import { FastifyInstance } from "fastify";
import { JwtService } from "../jwt/jwt.service";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { loginSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

const AUTH_URL_PREFIX = "/auth";

const authModule = (app: FastifyInstance) => {
  const authService = new AuthService(new UsersService(), new JwtService());
  const authController = new AuthController(authService);

  app.post(`${AUTH_URL_PREFIX}/login`, { schema: loginSchema }, authController.login);
};

export { authModule };
