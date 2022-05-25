import { fetchJSON } from "./api-helpers";

// 辞書オブジェクトを作成する
interface StringDict {
  [name: string]: string;
}

export default class Tracker {
  programId: string;
  constructor(programId: string) {
    this.programId = programId;
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
