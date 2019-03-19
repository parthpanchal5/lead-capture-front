import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommanService {

  link: any;

  constructor() { }

  public randomString(num) {
    this.link = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < num; i++) {
      this.link += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return this.link;
  }
}
