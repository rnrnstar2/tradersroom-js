export class TradersRoomPartner {
  constructor(programId: string);
  public cookieInit(): void;
  public formInit(programId: string): void;
  public createTrader(memberId: string, projectId?: string, trackingId?: string): void;
  public updateTrader(email: string, accountNumber: string): void;
  public updateProgramMembers(programMembersId: string, pips: string): void;
  public createTraderReport(accountNumber: string, amount: string, lot?: string): void;
  public user(name: string): void;
  public track(): void;
}
