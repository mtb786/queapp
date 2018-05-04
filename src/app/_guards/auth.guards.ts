import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class Authguard implements CanActivate  {
    constructor(private router: Router) {
        console.log('hello authguard');


     }
    isAuthenticated(): boolean{
        if (localStorage.getItem('user_id')) {
          return true;
        } else {
          return false;
        }
      }

      canActivate(): boolean {
        if (!this.isAuthenticated()) {
          this.router.navigate(['']);
          return false;
        }
        return true;
      }}