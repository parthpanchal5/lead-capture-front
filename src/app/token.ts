import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  public token: string;

  constructor() {
    this.token = '';
  }

  setToken(data) {
    this.token = 'Bearer ' + data;
  }
  getToken() {
    return this.token;
  }
}
