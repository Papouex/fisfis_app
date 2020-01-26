import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import {baseUrl} from '../../app.module'
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  
  authToken: any;
  baseUrl = baseUrl;

  constructor(private http: HttpClient) { }

  getProducts() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/product', {headers: headers})
    ;
  }
  getProductsNbr() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/product/nbr', {headers: headers})
    ;
  }
  ajouterProduct(product:any)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.post(this.baseUrl + '/product/ajouter' ,product, {headers: headers})
    ;
  }
  getProductById(id:string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/product/' + id , {headers: headers})
    ;
  }
 

  updateProduct(product:any,productId:string)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/product/'+productId ,product, {headers: headers})
    ; 
  }
  deleteProduct(id: string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.baseUrl + '/product/' + id, {headers: headers}) ;
  }

  updateActive(id,obj)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/product/active/'+id ,obj, {headers: headers})
    ; 
  }
  updateQuantite(id,obj)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/product/qte/'+id ,obj, {headers: headers})
    ; 
  }
  uploadImage(image: File)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    const formData = new FormData();
    formData.append('image',image);
    return this.http.post(this.baseUrl + '/product/imageup',formData, {headers: headers})
    ; 
  }
  updateImage(image: File,id)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    const formData = new FormData();
    formData.append('image',image);
    return this.http.post(this.baseUrl + '/product/image/'+id,formData, {headers: headers})
    ; 
  }
  loadToken() {
    const token = getString('id_token');
    this.authToken = token;
  }
}
