import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {baseUrl} from '../../app.module'
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  
  authToken: any;
  baseUrl = baseUrl;

  constructor(private http: HttpClient) { }

  getCategories() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/categorie', {headers: headers})
    ;
  }
  getCategorieNbr() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/categorie/nbr', {headers: headers})
    ;
  }
  ajouterCategorie(categorie:any)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.post(this.baseUrl + '/categorie/ajouter' ,categorie, {headers: headers})
    ;
  }
  getCategorieById(id:string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/categorie/' + id , {headers: headers})
    ;
  }
  updateCategorie(categorie:any,categorieId:string)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/categorie/'+categorieId ,categorie, {headers: headers})
    ; 
  }
  deleteCategorie(id: string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.baseUrl + '/categorie/' + id, {headers: headers}) ;
  }
  addProduct(catId:any,obj)
  {
    //Obj : subcat,product
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/categorie/product/'+catId ,obj, {headers: headers})
    ; 
  }
  updateImage(image: File,id)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    const formData = new FormData();
    formData.append('image',image);
    return this.http.post(this.baseUrl + '/categorie/image/'+id,formData, {headers: headers})
    ; 
  }
  loadToken() {
    const token = getString('id_token');
    this.authToken = token;
  }
}
