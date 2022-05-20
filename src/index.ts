import setCookie from "./setCookie";
import getQuery from "./getQuery";

// クラス
import Tracker from "./tracker";

const cookieInit = () => {
  // トラッキングIdがクエリに存在する場合はcookieにセット
  const projectId = getQuery("projectId");
  const memberId = getQuery("memberId");
  const trackingId = getQuery("trackingId");
  if (projectId) setCookie("projectId", projectId, 30);
  if (memberId) setCookie("memberId", memberId, 30);
  if (trackingId) setCookie("trackingId", trackingId, 30);
};

const trackerInit = (publicKey: string) => {
  // console.log("trackerInit", publicKey);
  cookieInit();
  return new Tracker(publicKey);
};

export default { cookieInit, trackerInit };
