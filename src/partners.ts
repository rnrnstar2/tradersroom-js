import type { Partner as IPartner, StringDict } from "../types/index";
import setCookie from "./setCookie";
import getQuery from "./getQuery";

// クラス
import FormListener from "./formListener";
import { fetchJSON } from "./api-helpers";

export class Partner implements IPartner {
  token: string;
  public constructor(token: string) {
    this.token = token;
  }

  public cookieInit(): void {
    console.log(">>> cookieInit <<<");
    // トラッキングIdがクエリに存在する場合はcookieにセット
    const projectId = getQuery("projectId");
    const memberId = getQuery("memberId");
    const trackingId = getQuery("trackingId");
    if (projectId) setCookie("projectId", projectId, 30);
    if (memberId) setCookie("memberId", memberId, 30);
    if (trackingId) setCookie("trackingId", trackingId, 30);
  }

  public formInit(programId: string): void {
    console.log(">>> formInit <<<");
    this.cookieInit();
    const formListener = new FormListener(programId);
    formListener.form();
  }

  public createTrader(memberId: string, projectId?: string, trackingId?: string): void {
    console.log(memberId, projectId, trackingId);
    let input: StringDict = {
      memberId: memberId,
    };
    if (projectId) input["projectId"] = projectId;
    if (trackingId) input["trackingId"] = trackingId;
    fetchJSON("PUT", "trader", input, this.token);
  }

  public updateTrader(email: string, accountNumber: string): void {
    console.log(email, accountNumber);
    let input: StringDict = {
      email: email,
      accountNumber: accountNumber,
    };
    fetchJSON("POST", "trader", input, this.token);
  }

  public updateProgramMembers(programMembersId: string, pips: string): void {
    console.log(programMembersId, pips);
    let input: StringDict = {
      programMembersId: programMembersId,
      pips: pips,
    };
    fetchJSON("POST", "programMembers", input, this.token);
  }

  public createTraderReport(accountNumber: string, amount: string, lot?: string): void {
    console.log(accountNumber, amount, lot);
    let input: StringDict = {
      accountNumber: accountNumber,
      amount: amount,
    };
    if (lot) input["lot"] = lot;
    fetchJSON("PUT", "traderReport", input, this.token);
  }

  public user(name: string): void {
    console.log("name: ", name);
  }

  public track(): void {
    console.log("track");
    console.log(this.token);
  }
}
