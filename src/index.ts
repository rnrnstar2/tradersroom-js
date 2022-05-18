import setCookie from "./setCookie";
import getQuery from "./getQuery";

// イベント
import inputSubmit from "./inputSubmit";

// クラス
import Tracker from "./tracker";

const cookieInit = () => {
  // トラッキングIdがクエリに存在する場合はcookieにセット
  const trackingId = getQuery("trackingId");
  if (trackingId) setCookie("trackingId", trackingId, 30);
};

const trackerInit = (publicKey: string) => {
  console.log("trackerInit", publicKey);
  return new Tracker(publicKey);
};

const listenerStart = () => {
  inputSubmit();
};

export default { cookieInit, trackerInit, listenerStart };
