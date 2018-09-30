import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthHelper } from '../helpers/auth.helper';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

    constructor(private authHelper: AuthHelper, private router: Router) {}

    canActivate(): boolean {
        const authUser = this.authHelper.getUser()

        if (!authUser) {
            this.router.navigate(['auth', 'login']);
            return false;
        }

        return true;
    }
}

@Injectable()
export class GuestGuard implements CanActivate {

    constructor(private authHelper: AuthHelper, private router: Router) {}

    canActivate(): boolean {
        const authUser = this.authHelper.getUser()

        if (authUser) {
            this.router.navigate(['']);
            return false;
        }

        return true;
    }
}