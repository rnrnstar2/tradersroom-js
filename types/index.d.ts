// export interface Partner {
//   cookieInit(): void;
//   formInit(programId: string): void;
//   createTrader(memberId: string, projectId?: string, trackingId?: string): void;
//   updateTrader(email: string, accountNumber: string): void;
//   updateProgramMembers(programMembersId: string, pips: string): void;
//   createTraderReport(accountNumber: string, amount: string, lot?: string): void;
//   user(name: string): void;
//   track(): void;
// }

// export * from './src';
// import {Partner} from './src';

export interface PartnerConstructor {
  (programId: string): Partner;
}

// 辞書オブジェクトを作成する
export interface StringDict {
  [name: string]: string;
}

// export const loadPartner: (programId: string) => Promise<Partner | null>;

// declare global {
//   interface Window {
//     Partner?: PartnerConstructor;
//   }
// }

export class Partner {
  public static cookieInit(): void;
  public static formInit(programId: string): void;
  public static createTrader(memberId: string, projectId?: string, trackingId?: string): void;
  public static updateTrader(email: string, accountNumber: string): void;
  public static updateProgramMembers(programMembersId: string, pips: string): void;
  public static createTraderReport(accountNumber: string, amount: string, lot?: string): void;
  public static user(name: string): void;
  public static track(): void;
}
