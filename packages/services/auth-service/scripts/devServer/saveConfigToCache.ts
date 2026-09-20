import * as fs from "node:fs";
import { Config, CONFIG_FILE_PATH } from "./model";

const saveConfigToCache = async (config: Config) => {
  const configString = JSON.stringify(config);
  await fs.promises.writeFile(CONFIG_FILE_PATH, configString, {
    encoding: "utf8",
    flag: "w",
  });
};

export { saveConfigToCache };
