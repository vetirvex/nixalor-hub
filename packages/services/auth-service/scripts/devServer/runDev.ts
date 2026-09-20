import { prompt } from "trompt";
import { executeServer } from "./executeServer";
import { loadConfigFromCache } from "./loadConfigFromCache";
import { Config } from "./model";
import { receiveConfigFromUser } from "./receiveConfigFromUser";
import { saveConfigToCache } from "./saveConfigToCache";

const main = async () => {
  const shouldLoad = await prompt({
    type: "select",
    question: "Load config from cache?",
    choices: [
      { text: "Yes", value: true },
      { text: "No", value: false },
    ],
  });

  let config: Config;
  if (shouldLoad) {
    config = await loadConfigFromCache();
  } else {
    config = await receiveConfigFromUser();
    await saveConfigToCache(config);
  }

  await executeServer(config);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
