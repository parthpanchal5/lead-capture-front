import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TokenService } from '../token';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    public http: HttpClient,
    private token: TokenService
  ) { }

  // List all post
  public getPosts(search) {
    return this.http
      .get<{status: boolean, message: string, data: []}>(API_URL + '/posts?auth=' + this.token.getToken() + search);
  }
  // Individual post
  public getPostDtl(id) {
    return this.http
      .get<{
        status: boolean,
        message: string,
        data: {
          post: {
          org_id: string,
          campaign_id: string,
          title: string,
          post_desc: string,
          post_type: string,
          track_id: string,
          post_content: string,
          remark: string
        },
        organizations: [],
        campaigns: []
      }}>(API_URL + '/post/' + id + '?auth=' + this.token.getToken());
  }

  public getPostLink(id) {
    return this.http
      .get<{
        status: boolean,
        message: string,
        data: string
      }>(API_URL + '/post-link/' + id + '?auth=' + this.token.getToken());
  }
  // Insert post
  public insPost(formdata) {
    return this.http
      .post<{status: boolean, message: string}>(API_URL + '/post?auth=' + this.token.getToken(), formdata);
  }

  // Delete post
  public deletePost(id) {
    return this.http
      .delete<{status: boolean, message: string}>(API_URL + '/post/' + id + '?auth=' + this.token.getToken());
  }

  public postChart(id) {
    return this.http
      .get<{
        status: boolean,
        message: string,
        data: {}
      }>(API_URL + '/post-chart/' + id + '?auth=' + this.token.getToken());
  }
  // Status post
  public statusPost(id, status) {
    return this.http
      .get<{status: boolean, message: string}>(API_URL + '/post/' + id + '/status/' + status + '?auth=' + this.token.getToken());
  }
}
