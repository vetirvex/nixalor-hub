import { FastifyReply, FastifyRequest } from "fastify";
import { ServiceError } from "../model/serviceError";

const errorMiddleware = (
  error: unknown,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof ServiceError) {
    return reply.status(error.statusCode).send({
      status: error.statusCode,
      message: error.message,
      code: error.code,
      params: error.params,
    });
  }

  return reply.status(500).send(error);
};

export { errorMiddleware };
