import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  isLoggedIn

  constructor( private router: Router, private authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn
  }

  canActivate() {
    return this.isLoggedIn() ? true : this.router.navigate(["/"])
  }
}

export const canActivateTeam: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(AuthGuard).canActivate();
};