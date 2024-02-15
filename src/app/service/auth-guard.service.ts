import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { CanActivateFn } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor( private router: Router) {}
    canActivate() {
      return true;
    }
    canMatch(): boolean {
      return false;
    }

}

export const canActivateTeam: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(AuthGuard).canActivate();
};