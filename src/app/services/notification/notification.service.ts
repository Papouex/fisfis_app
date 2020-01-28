import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {baseUrl} from '../../app.module'
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  authToken: any;
  baseUrl = baseUrl;

  constructor(private http: HttpClient) { }

  createNotification(notification) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + '/notification/create', notification, { headers: headers });
  }
  getUserNotification(id)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/notification/user/' + id, { headers: headers });
  }
  seennotificationUser(userId) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.put(this.baseUrl + '/notification/seenuser/' + userId, { headers: headers });
  }
  getAdminIds()
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/admin/adid', { headers: headers });
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
