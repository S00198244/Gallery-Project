import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionQuery } from '../store/session.query';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {

  isLoggedIn$!: string | null;

  constructor(private sessionQuery: SessionQuery, private router: Router) {

    this.sessionQuery.isLoggedIn$.subscribe(res => this.isLoggedIn$ = res)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {


    if (this.isLoggedIn$ == null) // Preventing access to component by being logged out
    {
      this.router.navigate(['/']);
      return false
    }    
    else 
      return true;
  }
}
