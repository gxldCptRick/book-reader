import LocalStorageManager from "./localStorageManager";
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
  return container;
};
