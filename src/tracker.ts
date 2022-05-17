export default class Tracker {
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
}
