import { FastifyReply, FastifyRequest } from "fastify";
import { LoginBody } from "./auth.schema";
import { AuthService } from "./auth.service";

class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) => {
    const { email, password } = request.body;
    const user = await this.authService.login(email, password);
  };
}

export { AuthController };
