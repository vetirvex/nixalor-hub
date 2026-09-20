import * as fs from "node:fs";
import { Config, CONFIG_FILE_PATH, parseConfig } from "./model";

const loadConfigFromCache = async (): Promise<Config> => {
  if (!fs.existsSync(CONFIG_FILE_PATH)) {
    throw new Error("Cannot load config from cache. File does not exist");
  }

  const configFileData = await fs.promises.readFile(CONFIG_FILE_PATH, "utf8");
  return parseConfig(JSON.parse(configFileData));
};

export { loadConfigFromCache };
