import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {baseUrl} from '../../app.module'
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AdsService {

  
  authToken: any;
  baseUrl = baseUrl;

  constructor(private http: HttpClient) { }

  getAds() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/ads', {headers: headers})
    ;
  }
  ajouterAds(ads:any)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.post(this.baseUrl + '/ads/ajouter' ,ads, {headers: headers})
    ;
  }
  getAdsById(id:string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/ads/' + id , {headers: headers})
    ;
  }
 

  updateAds(ads:any,adsId:string)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/ads/'+adsId ,ads, {headers: headers})
    ; 
  }
  deleteAds(id: string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.baseUrl + '/ads/' + id, {headers: headers}) ;
  }

  updateImage(image: File,id)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    const formData = new FormData();
    formData.append('image',image);
    return this.http.post(this.baseUrl + '/ads/image/'+id,formData, {headers: headers})
    ; 
  }
  loadToken() {
    const token = getString('id_token');
    this.authToken = token;
  }
}
