import setCookie from "./setCookie";
import getQuery from "./getQuery";

// クラス
import FormListener from "./formListener";
import { fetchJSON } from "./api-helpers";

// 辞書オブジェクトを作成する
interface StringDict {
  [name: string]: string;
}

export default class TradersRoomPartner {
  programId: string;
  constructor(programId: string) {
    this.programId = programId;
  }

  cookieInit() {
    console.log(">>> cookieInit <<<");
    // トラッキングIdがクエリに存在する場合はcookieにセット
    const projectId = getQuery("projectId");
    const memberId = getQuery("memberId");
    const trackingId = getQuery("trackingId");
    if (projectId) setCookie("projectId", projectId, 30);
    if (memberId) setCookie("memberId", memberId, 30);
    if (trackingId) setCookie("trackingId", trackingId, 30);
  }

  formInit(programId: string) {
    console.log(">>> formInit <<<");
    this.cookieInit();
    const formListener = new FormListener(programId);
    formListener.form();
  }

  createTrader(memberId: string, projectId?: string, trackingId?: string) {
    console.log(memberId, projectId, trackingId);
    let input: StringDict = {
      memberId: memberId,
      programId: this.programId,
    };
    if (projectId) input["projectId"] = projectId;
    if (trackingId) input["trackingId"] = trackingId;
    fetchJSON("PUT", "trader", input);
  }

  updateTrader(email: string, accountNumber: string) {
    console.log(email, accountNumber);
    let input: StringDict = {
      email: email,
      accountNumber: accountNumber,
      programId: this.programId,
    };
    fetchJSON("POST", "trader", input);
  }

  updateProgramMembers(programMembersId: string, pips: string) {
    console.log(programMembersId, pips);
    let input: StringDict = {
      programMembersId: programMembersId,
      pips: pips,
      programId: this.programId,
    };
    fetchJSON("POST", "programMembers", input);
  }

  createTraderReport(accountNumber: string, amount: string, lot?: string) {
    console.log(accountNumber, amount, lot);
    let input: StringDict = {
      accountNumber: accountNumber,
      programId: this.programId,
      amount: amount,
    };
    if (lot) input["lot"] = lot;
    fetchJSON("PUT", "traderReport", input);
  }

  user(name: string) {
    console.log("name: ", name);
  }

  track() {
    console.log("track");
    console.log(this.programId);
  }
}
