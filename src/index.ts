import setCookie from "./setCookie";
import getQuery from "./getQuery";

// クラス
import Tracker from "./tracker";

if (document.currentScript) {
  const programId = document.currentScript.getAttribute("data-program-id");
  console.log("programId", programId);
  if (programId) {
    const tracker = new Tracker(programId);
    tracker.form();
  }
}

const cookieInit = () => {
  // トラッキングIdがクエリに存在する場合はcookieにセット
  const projectId = getQuery("projectId");
  const memberId = getQuery("memberId");
  const trackingId = getQuery("trackingId");
  if (projectId) setCookie("projectId", projectId, 30);
  if (memberId) setCookie("memberId", memberId, 30);
  if (trackingId) setCookie("trackingId", trackingId, 30);
};

// const documentLoaded = async () => {
//   return new Promise((resolve) => {
//     document.addEventListener("DOMContentLoaded", function () {
//       resolve(true);
//     });
//   });
// };

const trackerInit = async (publicKey: string) => {
  // console.log("trackerInit", publicKey);
  cookieInit();
  // console.log("documentLoaded開始");
  // await documentLoaded();
  // console.log("documentLoaded完了");
  return new Tracker(publicKey);
};

export default { cookieInit, trackerInit };
