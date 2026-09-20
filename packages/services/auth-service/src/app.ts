import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "@fastify/type-provider-zod";
import Fastify from "fastify";
import { PORT } from "./model/env";
import { loggerConfig } from "./model/logger";
import { authModule } from "./modules/auth/auth.module";

const DEFAULT_URL_PREFIX = "/api/v1";

const app = Fastify({
  logger: loggerConfig,
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(authModule, { prefix: DEFAULT_URL_PREFIX });

app.listen({ port: PORT }, (err) => {
  if (err) {
    app.log.error(`Application failed with error: ${err}`);
    process.exit(1);
  }
  app.log.info(`Application listening on ${PORT}`);
});
