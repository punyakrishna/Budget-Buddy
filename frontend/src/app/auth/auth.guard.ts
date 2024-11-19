import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  const authToken = localStorage.getItem('authToken');
  if (authToken !== null) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
