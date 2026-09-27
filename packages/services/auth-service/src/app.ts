import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "@fastify/type-provider-zod";
import Fastify from "fastify";
import { errorMiddleware } from "./middlewares/ErrorMiddleware";
import { PORT } from "./model/env";
import { loggerConfig } from "./model/logger";
import { InvalidCredentialError } from "./modules/auth/auth.error";
import { authModule } from "./modules/auth/auth.module";

const DEFAULT_URL_PREFIX = "/api/v1";

const app = Fastify({
  logger: loggerConfig,
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSchemaErrorFormatter((errors) => {
  const params: Record<string, string[]> = {};

  for (const err of errors) {
    const key = err.instancePath.replace(/^\//, "") || "_root";
    (params[key] ??= []).push(err.message ?? "Invalid value");
  }

  return new InvalidCredentialError(params);
});
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorMiddleware);

app.register(authModule, { prefix: DEFAULT_URL_PREFIX });

app.listen({ port: PORT }, (err) => {
  if (err) {
    app.log.error(`Application failed with error: ${err}`);
    process.exit(1);
  }
  app.log.info(`Application listening on ${PORT}`);
});
