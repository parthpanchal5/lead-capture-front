import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TokenService } from '../token';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(
    public http: HttpClient,
    private token: TokenService
  ) { }

  // List all organizations
  public getOrganizations(search) {
    return this.http
      .get<{status: boolean, message: string, data: []}>(API_URL + '/organizations?auth=' + this.token.getToken() + search);
  }
  // Individual Organization
  public getOrganizationDtl(id) {
    return this.http
      .get<{
        status: boolean,
        message: string,
        data: {
          org_name: string,
          org_desc: string
        }
      }>(API_URL + '/organization/' + id + '?auth=' + this.token.getToken());
  }

  // Insert organizations
  public postOrganization(formdata) {
    return this.http
      .post<{status: boolean, message: string}>(API_URL + '/organization?auth=' + this.token.getToken(), formdata);
  }

  // Delete organization
  public deleteOrganization(id) {
    return this.http
      .delete<{status: boolean, message: string}>(API_URL + '/organization/' + id + '?auth=' + this.token.getToken());
  }

  // Status organization
  public statusOrganization(id, status) {
    return this.http
      .get<{status: boolean, message: string}>(API_URL + '/organization/' + id + '/status/' + status + '?auth=' + this.token.getToken());
  }
}
