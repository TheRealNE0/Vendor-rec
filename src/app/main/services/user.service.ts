import { Injectable } from "@angular/core";
import { BaseService } from "../../shared/class/baseService";
import { User } from "../../shared/models/User";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService extends BaseService<User> {
  private readonly httpHeaders = { "content-type": "application/json"};
  public static readonly userLocalStorageKey: string = "user";

  constructor(http: HttpClient, private _router: Router) {
    super(http, "users");
  }

  // private isLoggedIn: boolean;
  private _user = new BehaviorSubject<User | null>(null);

  // @ts-ignore
get user(): BehaviorSubject<User | null> {
    return this._user;
  }

  set user(value: User | null) {
    this._user.next(value);
  }

  public checkUserAuth(user: string, password: string): Observable<User | null> {

    return this.getAll().pipe(map(
      data => {
        // console.log(data);
        const index = data.findIndex(objectId => user.toLowerCase() === objectId.username.toLowerCase() && objectId.password === password);
        if (index === -1) {
          return null;
        }
        return data[index];
      }
    ));
  }

  public addUser(user: User): Observable<any> {
    // const headers = { "content-type": "application/json" };
    const body = JSON.stringify(user);
    // console.log(body)
    return this.http.post(this.baseUrl, body, { "headers": this.httpHeaders });
  }


  checkUserExist() {
    const localStorageBucket = localStorage.getItem(UserService.userLocalStorageKey);

    if (localStorageBucket !== null) {

      const savedUser = JSON.parse(localStorageBucket);
      this.checkUserAuth(savedUser.username, savedUser.password).subscribe(user => this.user = user);

    } else return;

  }


  logUserOut() {
    localStorage.removeItem(UserService.userLocalStorageKey);
    this.user = null;
    // console.log(this._router.url);
    if (this._router.url !== "/home")
      this._router.navigate(["/home"]);
  }

  onUserSuccess(user: User) {
    localStorage.setItem(UserService.userLocalStorageKey, JSON.stringify(user));
    this.user = user;
    this._router.navigate(["/home"]);
  }


  //todo maybe changes to change user (some)property/ies
  changePassword(user:Partial<User>):Observable<any>{
    const body = JSON.stringify(user);
    // user.id
    return this.http.patch(`${this.baseUrl}/${user.id}`,body,{ "headers": this.httpHeaders })
  }

  editUserWishlist(user:Partial<User>):Observable<any>{
    const body = JSON.stringify(user);
    return this.http.patch(`${this.baseUrl}/${user.id}`,body,{ "headers": this.httpHeaders })


  }

  editUserCheckoutList(user:Partial<User>):Observable<any>{
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.patch(`${this.baseUrl}/${user.id}`,body,{ "headers": this.httpHeaders })

  }

}
