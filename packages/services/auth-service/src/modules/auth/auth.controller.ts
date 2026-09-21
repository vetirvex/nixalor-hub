import { FastifyReply, FastifyRequest } from "fastify";
import { LoginBody, RegisterBody } from "./auth.schema";
import { AuthService } from "./auth.service";

class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) => {
    const { email, password } = request.body;
    const user = await this.authService.login(email, password);
  };

  register = async (
    request: FastifyRequest<{ Body: RegisterBody }>,
    reply: FastifyReply
  ) => {
    const { email, password, name } = request.body;
  };
}

export { AuthController };
