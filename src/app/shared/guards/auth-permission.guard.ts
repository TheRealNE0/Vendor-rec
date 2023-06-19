import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";
import { UserService } from "../../main/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthPermissionGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem(UserService.userLocalStorageKey)) {
      // console.log("user found");
      return this._router.createUrlTree([""]);
    }

    else return true

  }

}
