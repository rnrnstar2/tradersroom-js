import sum from "./sum";
import hello from "./hello";
import setCookie from "./setCookie";
// イベント
import buttonClick from "./buttonClick";
import inputSubmit from "./inputSubmit";

const listenerStart = () => {
  buttonClick();
  inputSubmit();
};

export default { listenerStart, setCookie, sum, hello };
