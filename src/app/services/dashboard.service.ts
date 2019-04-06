import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/token';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    public http: HttpClient,
    private token: TokenService
  ) { }

  public dashboardCounts() {
    return this.http
      .get<{status: boolean, message: string, data: {}}>(API_URL + '/dashboard?auth=' + this.token.getToken());
  }
}
