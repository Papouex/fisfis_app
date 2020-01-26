import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import {baseUrl} from '../../app.module'
import { getString } from 'tns-core-modules/application-settings/application-settings';
@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  
  authToken: any;
  baseUrl = baseUrl;

  constructor(private http: HttpClient) { }

  getPromotions() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/promotion', {headers: headers})
    ;
  }
  getPromotionNbr() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/promotion/nbr', {headers: headers})
    ;
  }
  ajouterPromotion(promotion:any)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.post(this.baseUrl + '/promotion/ajouter' ,promotion, {headers: headers})
    ;
  }
  getPromotionById(id:string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/promotion/' + id , {headers: headers})
    ;
  }
 

  updatePromotion(promotion:any,promotionId:string)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/promotion/'+promotionId ,promotion, {headers: headers})
    ; 
  }
  deletePromotion(id: string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.baseUrl + '/promotion/' + id, {headers: headers}) ;
  }

  submitUser(promoId:any,obj)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/promotion/user/'+promoId ,obj, {headers: headers})
  }
  loadToken() {
    const token = getString('id_token');
    this.authToken = token;
  }
}
