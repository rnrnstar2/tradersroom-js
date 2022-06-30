import setCookie from './setCookie';
import getQuery from './getQuery';

// クラス
import FormListener from './formListener';

const cookieInit = () => {
  console.log('>>> cookieInit <<<');
  // トラッキングIdがクエリに存在する場合はcookieにセット
  const projectId = getQuery('projectId');
  const memberId = getQuery('memberId');
  const trackingId = getQuery('trackingId');
  if (projectId) setCookie('projectId', projectId, 30);
  if (memberId) setCookie('memberId', memberId, 30);
  if (trackingId) setCookie('trackingId', trackingId, 30);
};

const formInit = (programId: string) => {
  console.log('>>> formInit <<<');
  cookieInit();
  const formListener = new FormListener(programId);
  formListener.form();
};

// ブラウザでスクリプトを読み込んだ場合
const currentScript = document.currentScript;
if (currentScript) {
  const programId = currentScript.getAttribute('data-program-id') as string;
  if (programId) formInit(programId);
}

export default { cookieInit, formInit };
