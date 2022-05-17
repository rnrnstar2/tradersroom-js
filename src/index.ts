import sum from "./sum";
import hello from "./hello";
import setCookie from "./setCookie";
// イベント
import buttonClick from "./buttonClick";
import inputSubmit from "./inputSubmit";
// クラス
import Tracker from "./tracker";

const listenerStart = () => {
  buttonClick();
  inputSubmit();
};

const tracker = (publicKey: string) => {
  return new Tracker(publicKey);
};

export default { sum, hello, setCookie, listenerStart, tracker };
