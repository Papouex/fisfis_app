import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {baseUrl} from '../../app.module'
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class PrecommandService {

  
  authToken: any;
  baseUrl = baseUrl;

  constructor(private http: HttpClient) { }

  getPrecommand(userId) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/precommand/'+userId, {headers: headers})
    ;
  }
  ajouterPrecommand(precommand:any)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.post(this.baseUrl + '/precommand/ajouter' ,precommand, {headers: headers})
    ;
  }
  getPrecommandById(id:string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/precommand/by/' + id , {headers: headers})
    ;
  }
 

  updatePrecommand(precommand:any,precommandId:string)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/precommand/'+precommandId ,precommand, {headers: headers})
    ; 
  }
  deletePrecommand(id: string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.baseUrl + '/precommand/' + id, {headers: headers}) ;
  }


  loadToken() {
    const token = getString('id_token');
    this.authToken = token;
  }
}
