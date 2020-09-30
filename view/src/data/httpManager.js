export default class HttpManager {
  constructor() {
    this.basePath = "/api/";
  }

  get(key) {
    return fetch(this.basePath + key, { method: "GET" }).then((res) =>
      res.json()
    );
  }

  set(key, value) {
    return fetch(this.basePath + key, {
      method: "POST",
      body: JSON.stringify(value),
      credentials: "include",
    }).then((res) => res.json());
  }
}
