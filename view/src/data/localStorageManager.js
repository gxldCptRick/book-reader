export default class LocalStorageManager {
  get(key, defaultValue) {
    return new Promise((res, rej) => {
      try {
        let storedItem = localStorage.getItem(key);
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
        localStorage.setItem(key, storing);
        res();
      } catch (err) {
        rej(err);
      }
    });
  }
}
