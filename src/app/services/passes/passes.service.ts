import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {baseUrl} from '../../app.module'
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PassesService {

  
  authToken: any;
  baseUrl = baseUrl;

  constructor(private http: HttpClient) { }

  getPasses() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/pass', {headers: headers});
  }
  getPassByCreator(id)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/pass/creator/' + id , {headers: headers});
  }
  ajouterPass(pass:any)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.post(this.baseUrl + '/pass/ajouter' ,pass, {headers: headers})
    ;
  }
  getPassById(id:string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/pass/' + id , {headers: headers})
    ;
  }
 

  updatePass(pass:any,passId:string)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/pass/'+passId ,pass, {headers: headers})
    ; 
  }
  deletePass(id: string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.baseUrl + '/pass/' + id, {headers: headers}) ;
  }

  submitUser(passId:any,obj)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/pass/user/'+passId ,obj, {headers: headers})
    ; 
  }
  loadToken() {
    const token = getString('id_token');
    this.authToken = token;
  }
}
