import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TokenService } from '../token';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    public http: HttpClient,
    private token: TokenService
  ) { }

  public getProfile() {
    // console.log('service : ', this.token.getToken());
    return this.http
      .get<{status: boolean, message: string, data: {}}>(API_URL + '/profile?auth=' + this.token.getToken());
  }
}
