import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {baseUrl} from '../../app.module'
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  authToken: any;
  baseUrl = baseUrl;

  constructor(private http: HttpClient) { }

  getCommands() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/command', {headers: headers})
    ;
  }
  getCommandsToday() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/command/today', {headers: headers})
    ;
  }
  getCommandsNbr() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/command/nbr', {headers: headers})
    ;
  }
  ajouterCommande(command:any)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.post(this.baseUrl + '/command/ajouter' ,command, {headers: headers})
    ;
  }
  getCommandById(id:string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/command/' + id , {headers: headers})
    ;
  }
  getCommandByUserId(id:string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/command/user/' + id , {headers: headers})
    ;
  }

  updateCommand(command:any,commandId:string)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/command/'+commandId ,command, {headers: headers})
    ; 
  }

  updateTravelerCommand(commandId,commandUser)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/command/user/'+commandId ,commandUser, {headers: headers})
    ; 
  }
  deleteCommand(id: string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.baseUrl + '/command/' + id, {headers: headers}) ;
  }
  loadToken() {
    const token = getString('id_token');
    this.authToken = token;
  }
}
