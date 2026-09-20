import { randomUUID } from "node:crypto";
import { prompt } from "trompt";
import { z } from "zod";
import { loadFromLocalEnv } from "./loadFromLocalEnv";
import { type Config, ENV_CONFIG, parseConfig } from "./model";

type ConfigKey = keyof Config;

const QUESTIONS: Record<ConfigKey, string> = {
  PORT: "Port (49152–65535)",
  DATABASE_URL: "PostgreSQL URL (postgres://user:pass@host:5432/db)",
  JWT_ACCESS_TOKEN_SECRET: "Access token secret (UUID, Enter — generate random)",
  JWT_ACCESS_TOKEN_EXPIRES_IN: "Access token TTL (exp. 15m)",
  JWT_REFRESH_TOKEN_SECRET: "Refresh token secret (UUID, Enter — generate random)",
  JWT_REFRESH_TOKEN_EXPIRES_IN: "Refresh token TTL (exp. 7d)",
};

const GENERATED: Partial<Record<ConfigKey, () => string>> = {
  JWT_ACCESS_TOKEN_SECRET: randomUUID,
  JWT_REFRESH_TOKEN_SECRET: randomUUID,
};

const formatIssues = (error: z.ZodError): string =>
  error.issues.map((issue) => issue.message).join("; ");

const askField = async (key: ConfigKey): Promise<unknown> => {
  const schema = ENV_CONFIG.shape[key] as z.ZodTypeAny;
  const fallback = GENERATED[key];

  for (;;) {
    const answer = (await prompt(`${QUESTIONS[key]}: `))?.trim() ?? "";
    const raw = answer === "" && fallback ? fallback() : answer;

    if (raw !== answer) console.log(`  → generated: ${raw}`);

    const result = schema.safeParse(raw);
    if (result.success) return result.data;

    console.error(`  ✖ ${key}: ${formatIssues(result.error)}`);
  }
};

const receiveConfigFromUser = async (): Promise<Config> => {
  const shouldLoad = await prompt({
    type: "select",
    question: "Use default local dev config?",
    choices: [
      { text: "Yes", value: true },
      { text: "No", value: false },
    ],
  });

  if (!shouldLoad) {
    const draft: Record<string, unknown> = {};

    for (const key of Object.keys(ENV_CONFIG.shape) as ConfigKey[]) {
      draft[key] = await askField(key);
    }

    return parseConfig(draft);
  }

  return await loadFromLocalEnv();
};

export { receiveConfigFromUser };
