import type { Partner as IPartner, StringDict } from '../types/index';

// クラス
import { fetchJSON } from './api-helpers';

export class Partner implements IPartner {
  token: string;
  public constructor(token: string) {
    this.token = token;
  }

  public createTrader(input: StringDict): void {
    console.log('createTrader', input);
    fetchJSON('PUT', 'trader', input, this.token);
  }

  public user(name: string): void {
    console.log('name: ', name);
  }

  public track(): void {
    console.log('track');
    console.log(this.token);
  }
}
