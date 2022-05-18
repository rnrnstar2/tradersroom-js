import setCookie from "./setCookie";
import getQuery from "./getQuery";

// イベント
import inputSubmit from "./inputSubmit";

// クラス
import Tracker from "./tracker";

const listenerStart = () => {
  inputSubmit();
};

const cookieInit = () => {
  // トラッキングIdがクエリに存在する場合はcookieにセット
  const trackingId = getQuery("trackingId");
  if (trackingId) setCookie("trackingId", trackingId, 30);
};

const trackerInit = (publicKey: string) => {
  return new Tracker(publicKey);
};

export default { listenerStart, cookieInit, trackerInit };
