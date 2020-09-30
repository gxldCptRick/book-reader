import LocalStorageManager from "./localStorageManager";
import HttpManager from "./httpManager";

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
  const container = new InversionOfControlContainer();
  container.registerItem("sessionManager", new LocalStorageManager());
  container.registerItem("externalManager", new HttpManager());
  container.registerItem("historyManager", new LocalStorageManager("history"));
  return container;
};
