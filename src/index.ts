import { PartnerConstructor, StringDict } from "../types";
import setCookie from "./setCookie";
import getQuery from "./getQuery";

// クラス
import FormListener from "./formListener";
import { fetchJSON } from "./api-helpers";

export const loadPartner: PartnerConstructor = (programId) => {
  return new Partner(programId);
};

class Partner {
  programId: string;
  constructor(programId: string) {
    this.programId = programId;
  }

  cookieInit(): void {
    console.log(">>> cookieInit <<<");
    // トラッキングIdがクエリに存在する場合はcookieにセット
    const projectId = getQuery("projectId");
    const memberId = getQuery("memberId");
    const trackingId = getQuery("trackingId");
    if (projectId) setCookie("projectId", projectId, 30);
    if (memberId) setCookie("memberId", memberId, 30);
    if (trackingId) setCookie("trackingId", trackingId, 30);
  }

  formInit(programId: string): void {
    console.log(">>> formInit <<<");
    this.cookieInit();
    const formListener = new FormListener(programId);
    formListener.form();
  }

  createTrader(memberId: string, projectId?: string, trackingId?: string): void {
    console.log(memberId, projectId, trackingId);
    let input: StringDict = {
      memberId: memberId,
      programId: this.programId,
    };
    if (projectId) input["projectId"] = projectId;
    if (trackingId) input["trackingId"] = trackingId;
    fetchJSON("PUT", "trader", input);
  }

  updateTrader(email: string, accountNumber: string): void {
    console.log(email, accountNumber);
    let input: StringDict = {
      email: email,
      accountNumber: accountNumber,
      programId: this.programId,
    };
    fetchJSON("POST", "trader", input);
  }

  updateProgramMembers(programMembersId: string, pips: string): void {
    console.log(programMembersId, pips);
    let input: StringDict = {
      programMembersId: programMembersId,
      pips: pips,
      programId: this.programId,
    };
    fetchJSON("POST", "programMembers", input);
  }

  createTraderReport(accountNumber: string, amount: string, lot?: string): void {
    console.log(accountNumber, amount, lot);
    let input: StringDict = {
      accountNumber: accountNumber,
      programId: this.programId,
      amount: amount,
    };
    if (lot) input["lot"] = lot;
    fetchJSON("PUT", "traderReport", input);
  }

  user(name: string): void {
    console.log("name: ", name);
  }

  track(): void {
    console.log("track");
    console.log(this.programId);
  }
}
