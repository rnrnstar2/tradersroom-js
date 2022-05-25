import setCookie from "./setCookie";
import getQuery from "./getQuery";

// クラス
import Tracker from "./tracker";
import FormListener from "./formListener";

const getProgramId = () => {
  const currentScript = document.currentScript;
  if (!currentScript) return null;
  const programId = currentScript.getAttribute("data-program-id");
  console.log("programId", programId);
  return programId;
};

const cookieInit = () => {
  // トラッキングIdがクエリに存在する場合はcookieにセット
  const projectId = getQuery("projectId");
  const memberId = getQuery("memberId");
  const trackingId = getQuery("trackingId");
  if (projectId) setCookie("projectId", projectId, 30);
  if (memberId) setCookie("memberId", memberId, 30);
  if (trackingId) setCookie("trackingId", trackingId, 30);
};

const trackerInit = () => {
  const programId = getProgramId();
  if (programId) return new Tracker(programId);
  else return null;
};

const formInit = () => {
  const programId = getProgramId();
  if (programId) {
    cookieInit();
    const formListener = new FormListener(programId);
    formListener.form();
  }
};

export default { trackerInit, formInit };
