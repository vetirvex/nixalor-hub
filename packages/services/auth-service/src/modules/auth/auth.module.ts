import { FastifyInstance } from "fastify";
import { JwtService } from "../jwt/jwt.service";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { loginSchema, refreshSchema, registerSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

const AUTH_URL_PREFIX = "/auth";

const authModule = (app: FastifyInstance) => {
  const authService = new AuthService(new UsersService(), new JwtService());
  const authController = new AuthController(authService);

  app.post(`${AUTH_URL_PREFIX}/login`, { schema: loginSchema }, authController.login);
  app.post(
    `${AUTH_URL_PREFIX}/register`,
    { schema: registerSchema },
    authController.register
  );
  app.post(
    `${AUTH_URL_PREFIX}/refresh`,
    { schema: refreshSchema },
    authController.refresh
  );
};

export { authModule };
