import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import {baseUrl} from '../../app.module'
import { JwtHelperService } from '@auth0/angular-jwt';
import { isIOS } from "tns-core-modules/platform";
declare var NSString: any;
declare var NSUTF8StringEncoding: any;
declare var java: any;
declare var android: any;
//import * as localStorage from 'nativescript-localstorage';
//require( "@proplugins/nativescript-localstorage" );
import {
  getBoolean,
  setBoolean,
  getNumber,
  setNumber,
  getString,
  setString,
  hasKey,
  remove,
  clear
} from "tns-core-modules/application-settings";
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class UserService {

  authToken: any;
  baseUrl = baseUrl;
  user:any;

  constructor(private http: HttpClient) { }

  getUsers() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/user', {headers: headers})
  }
  getUsersToday() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/user/today', {headers: headers})
    
  }
  getUsersNbr() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/user/nbr', {headers: headers})
  }
  ajouterUtilisateur(user:any)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.post(this.baseUrl + '/user/register' ,user, {headers: headers})
  }
  getUserById(id:string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.baseUrl + '/user/' + id , {headers: headers})
  }

  updateUser(user:any,userId:string)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/user/'+userId ,user, {headers: headers})
  }

  banUser(id:string,ban)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.put(this.baseUrl + '/user/ban/' + id,ban, {headers: headers})
  }
  deleteUser(id: string) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.baseUrl + '/user/' + id, {headers: headers}) ;
  }
  updateImage(image: File,id)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    const formData = new FormData();
    formData.append('image',image);
    return this.http.post(this.baseUrl + '/user/image/'+id,formData, {headers: headers})
  }
 

  updateUserCono(id,obj)
  {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json')
    return this.http.put(this.baseUrl + '/user/cono/'+id ,obj, {headers: headers})
  }
  loadToken() {
    const token = getString('id_token');
    this.authToken = token;
  }

  authenticateUser(user) {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.baseUrl + '/user/auth', user, {headers: headers});
    
  }


  storeUserData(token, user) {
    setString('id_token' , token);
    setString('user', JSON.stringify(user));
    this.user = user ;
  }
  emptyCommandData()
  {
    setString('command','');
  }
  storeCommandData(command)
  {
    setString('command',JSON.stringify(command));
  }
  getCommandData()
  {
  
    const command=getString('command');
    console.log("command"+command)
    if(command)
    {
      return command;
    }else{
      return null;
    }
    
  }
  getUserData() {
    const info = JSON.parse(getString('user')) ;
    console.log("user info"+info)
    return info ;
  }
  loggedIn() {
    return !helper.isTokenExpired(getString('id_token'));
  }
 
  logout() {
    this.user = null ;
    clear();
  }

   public getToken(): string {
     return getString('id_token');
   }
 
   getIdfromToken(){
    /* const jwtData = this.getToken().split('.')[1]
     const decodedJwtJsonData = this.base64Encode(jwtData);
     console.log(decodedJwtJsonData)
     const decodedJwtData = JSON.parse(decodedJwtJsonData)
     console.log('id: ' + decodedJwtData._id);
     return decodedJwtData._id;*/
 }

 base64Encode(value) {
  if (isIOS) {
    const decodedData = NSString.alloc().initWithBase64EncodedStringOptions(value,0);
const decodedString = NSString.alloc().initWithDataEncoding(decodedData,NSUTF8StringEncoding);
    //let text = NSString.stringWithString(value);
    //let data = text.dataUsingEncoding(NSUTF8StringEncoding);
    //return data.base64EncodedStringWithOptions(0);
    return decodedString;
  } else {
    /*let text = new java.lang.String(value);
    let data = text.getBytes("UTF-8");
    return android.util.Base64.encodeToString(data, android.util.Base64.DEFAULT);*/
return android.util.Base64.decode(value, android.util.Base64.DEFAULT);

  }
}
}
