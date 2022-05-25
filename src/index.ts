import setCookie from "./setCookie";
import getQuery from "./getQuery";

// クラス
import Tracker from "./tracker";
import FormListener from "./formListener";

//
const currentScript = document.currentScript;
// if (!currentScript) return null;
let programId: string;
if (currentScript) programId = currentScript.getAttribute("data-program-id") as string;

// const getProgramId = () => {
//   console.log(">>> getProgramId <<<");
//   console.log("programId", programId);
//   return programId;
// };

const cookieInit = () => {
  console.log(">>> cookieInit <<<");
  // トラッキングIdがクエリに存在する場合はcookieにセット
  const projectId = getQuery("projectId");
  const memberId = getQuery("memberId");
  const trackingId = getQuery("trackingId");
  if (projectId) setCookie("projectId", projectId, 30);
  if (memberId) setCookie("memberId", memberId, 30);
  if (trackingId) setCookie("trackingId", trackingId, 30);
};

const trackerInit = () => {
  console.log(">>> trackerInit <<<");
  // const programId = getProgramId();
  if (programId) return new Tracker(programId);
  else return null;
};

const formInit = () => {
  console.log(">>> formInit <<<");
  // const programId = getProgramId();
  if (programId) {
    cookieInit();
    const formListener = new FormListener(programId);
    formListener.form();
  }
};

export default { trackerInit, formInit };
