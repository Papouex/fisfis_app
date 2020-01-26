import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../utilisateur/user.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private authService:UserService,private router:Router){}
  canActivate() {
    if(this.authService.loggedIn())
    {
      console.log(this.authService.getIdfromToken());
      return true;
    }else{
        this.router.navigate(['/login'])
      return false;
    }
  }
  
}
