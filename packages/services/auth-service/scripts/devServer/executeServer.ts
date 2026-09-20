import { spawn } from "node:child_process";
import { APP_FILE_PATH, Config } from "./model";

const executeServer = async (config: Config): Promise<void> => {
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    ...Object.fromEntries(Object.entries(config).map(([k, v]) => [k, String(v)])),
  };

  return new Promise((resolve, reject) => {
    const child = spawn("tsx", ["watch", APP_FILE_PATH], {
      env,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("error", reject);

    child.on("exit", (code, signal) => {
      if (signal) {
        resolve();
        return;
      }
      if (code === 0) resolve();
      else reject(new Error(`Server exited with code ${code}`));
    });
  });
};

export { executeServer };
