import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    public http: HttpClient
    ) {
     }
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  undefined
      })
    };

  public login( formData ) {
    return this.http
      .post<{status: boolean, message: string, token: string, data: {}}>(API_URL + '/login', formData);
  }
}
