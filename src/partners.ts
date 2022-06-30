import type { Partner as IPartner, StringDict } from '../types/index';
import setCookie from './setCookie';
import getQuery from './getQuery';

// クラス
import FormListener from '../src/formListener';
import { fetchJSON } from './api-helpers';

export class Partner implements IPartner {
  token: string;
  public constructor(token: string) {
    this.token = token;
  }
  public cookieInit(): void {
    console.log('>>> cookieInit <<<');
    // トラッキングIdがクエリに存在する場合はcookieにセット
    const projectId = getQuery('projectId');
    const memberId = getQuery('memberId');
    const trackingId = getQuery('trackingId');
    if (projectId) setCookie('projectId', projectId, 30);
    if (memberId) setCookie('memberId', memberId, 30);
    if (trackingId) setCookie('trackingId', trackingId, 30);
  }

  public formInit(programId: string): void {
    console.log('>>> formInit <<<');
    this.cookieInit();
    const formListener = new FormListener(programId);
    formListener.form();
  }

  public createTrader(input: StringDict): void {
    console.log('createTrader', input);
    fetchJSON('PUT', 'trader', input, this.token);
  }

  public updateTrader(input: StringDict): void {
    console.log('updateTrader', input);
    fetchJSON('POST', 'trader', input, this.token);
  }

  public updateProgramMembers(input: StringDict): void {
    console.log('updateProgramMembers', input);
    fetchJSON('POST', 'programMembers', input, this.token);
  }

  public createTraderReport(input: StringDict): void {
    console.log('createTraderReport', input);
    fetchJSON('PUT', 'traderReport', input, this.token);
  }

  public user(name: string): void {
    console.log('name: ', name);
  }

  public track(): void {
    console.log('track');
    console.log(this.token);
  }
}
