import LocalStorageManager from "./localStorageManager";
import HttpManager from "./httpManager";
import { DATA_PROVIDERS } from "./iocConstants";

class InversionOfControlContainer {
  registerItem(key = "", value) {
    if (value === undefined || value === null) {
      throw new Error("Value cannot be nothing");
    }
    let loweredKey = key.toLowerCase();
    this[loweredKey] = value;
  }
  get(key = "") {
    let loweredKey = key.toLowerCase();
    return this[loweredKey];
  }
}

export const initializeIOC = () => {
  const Config = require("../" +
    (process.env.REACT_CONFIG_NAME || "config.json"));
  const container = new InversionOfControlContainer();
  container.registerItem(
    DATA_PROVIDERS.SESSION_MANAGER,
    new LocalStorageManager()
  );
  container.registerItem(
    DATA_PROVIDERS.EXTERNAL_MANAGER,
    new HttpManager(Config.BASE_URI)
  );
  container.registerItem(
    DATA_PROVIDERS.HISTORY_MANAGER,
    new LocalStorageManager("history")
  );
  return container;
};
