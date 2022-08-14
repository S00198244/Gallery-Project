import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionQuery } from '../store/session.query';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionQuery: SessionQuery, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

    var isAdmin = this.sessionQuery.isAdmin;

    if (!isAdmin)
    {
      this.router.navigate(['/events']);
      return false;
    }
    else
    {
      return true;
    }
  }
}
