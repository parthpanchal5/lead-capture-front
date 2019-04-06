import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/token';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    public http: HttpClient,
    private token: TokenService
  ) { }


  public logout() {
    return this.http
    .get<{status: boolean, message: string, token: string}>(API_URL + '/logout?auth=' + this.token.getToken());
  }
}
