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

const trackerInit = (programId: string) => {
  const tracker = new Tracker(programId);
  tracker.form();
  return tracker;
};

let tracker: Tracker;
const currentScript = document.currentScript;
if (currentScript) {
  const programId = currentScript.getAttribute("data-program-id");
  console.log("programId", programId);
  if (programId) {
    cookieInit();
    tracker = trackerInit(programId);
  }
}

export default { cookieInit, trackerInit };

// const documentLoaded = async () => {
//   return new Promise((resolve) => {
//     document.addEventListener("DOMContentLoaded", function () {
//       resolve(true);
//     });
//   });
// };
