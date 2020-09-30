export default class LocalStorageManager {
  constructor(namespace = "") {
    this.namespace = namespace;
  }

  _normalizeKey(key) {
    return `${this.namespace}_${key}`;
  }

  get(key, defaultValue) {
    return new Promise((res, rej) => {
      try {
        let storedItem = localStorage.getItem(this._normalizeKey(key));
        if (storedItem) {
          res(JSON.parse(storedItem));
        } else {
          res(defaultValue);
        }
      } catch (err) {
        rej(err);
      }
    });
  }

  set(key, value) {
    return new Promise((res, rej) => {
      try {
        let storing = JSON.stringify(value);
        localStorage.setItem(this._normalizeKey(key), storing);
        res();
      } catch (err) {
        rej(err);
      }
    });
  }

  addResource(key, singleValue) {
    return this.get(key, []).then((arr) =>
      this.set(key, [...arr, singleValue])
    );
  }
}
