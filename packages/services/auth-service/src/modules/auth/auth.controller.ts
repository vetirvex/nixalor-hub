import { FastifyReply, FastifyRequest } from "fastify";
import { LoginBody, RefreshBody, RegisterBody } from "./auth.schema";
import { AuthService } from "./auth.service";

class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) => {
    const { email, password } = request.body;
    const data = await this.authService.login(email, password);
    return reply.status(200).send(data);
  };

  register = async (
    request: FastifyRequest<{ Body: RegisterBody }>,
    reply: FastifyReply
  ) => {
    const { email, password, name } = request.body;
    const data = await this.authService.register(email, password, name);
    return reply.status(201).send(data);
  };

  refresh = async (
    request: FastifyRequest<{ Body: RefreshBody }>,
    reply: FastifyReply
  ) => {
    const { refreshToken } = request.body;
    const tokens = await this.authService.refresh(refreshToken);
    return reply.status(200).send(tokens);
  };
}

export { AuthController };
