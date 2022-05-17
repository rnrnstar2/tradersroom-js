export default class TrackerOld {
  publicKey: string;
  constructor(publicKey: string) {
    this.publicKey = publicKey;
  }

  user(name: string) {
    console.log("user: ", name);
  }

  track() {
    console.log("track");
    console.log(this.publicKey);
  }

  push() {
    console.log("push");
  }

  listenerStart() {
    console.log("listenerStart");
  }

  setCookie() {
    console.log("setCookie");
  }

  sum() {
    console.log("sum");
  }

  hello() {
    console.log("hello");
  }
}
