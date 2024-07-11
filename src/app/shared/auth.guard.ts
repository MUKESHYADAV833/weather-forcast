// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const authData = localStorage.getItem('auth');
    if (authData) {
      // Optionally, add additional checks on authData
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
