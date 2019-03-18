import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TokenService } from '../token';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(
    public http: HttpClient,
    private token: TokenService
  ) { }

  // List all campaign
  public getCampaigns(search) {
    return this.http
      .get<{status: boolean, message: string, data: []}>(API_URL + '/campaigns?auth=' + this.token.getToken() + search);
  }
  // Individual campaigns
  public getCamapignDtl(id) {
    return this.http
      .get<{status: boolean, message: string, data: {}}>(API_URL + '/campaign/' + id + '?auth=' + this.token.getToken());
  }

  // Insert campaign
  public postCampaign(formdata) {
    return this.http
      .post<{status: boolean, message: string}>(API_URL + '/campaign?auth=' + this.token.getToken(), formdata);
  }

  // Delete campaigns
  public deleteCampaign(id) {
    return this.http
      .delete<{status: boolean, message: string}>(API_URL + '/campaign/' + id + '?auth=' + this.token.getToken());
  }

  // Status campaigns
  public statusCampaign(id, status) {
    return this.http
      .get<{status: boolean, message: string}>(API_URL + '/campaign/' + id + '/status/' + status + '?auth=' + this.token.getToken());
  }
}
