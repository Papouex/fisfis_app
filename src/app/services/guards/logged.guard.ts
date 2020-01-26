import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../utilisateur/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(private authService:UserService,private router:Router){}
  canActivate() {
    if(this.authService.loggedIn())
    {
      console.log(this.authService.getIdfromToken())
      this.router.navigate(['/home/main'])
      return false;
    }else{
      return true;
    }
  }
  
}
