import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/token';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PassResetService {

  constructor(
    public http: HttpClient,
    private token: TokenService
  ) { }

  public passreset(formData) {
    return this.http
      .post<{status: boolean, message: string}>(API_URL + '/change-pass?auth=' + this.token.getToken(), formData);
  }
}
