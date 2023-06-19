import {Component} from "@angular/core";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../../shared/models/User";
import {SignInFormResponse} from "../../models/sign-in-form-response";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: "app-user-auth-main",
  templateUrl: "./user-auth-main.component.html",
  styleUrls: ["./user-auth-main.component.scss"],
})
export class UserAuthMainComponent {


  constructor(private _userService: UserService, private _toaster: ToastrService) {
  }

  //region Handler methods

  //todo add ng-toaster for "no such user Found" found situation
  public checkUser(data: SignInFormResponse): void {
    this._userService.checkUserAuth(data.username, data.password).subscribe(
      user => {
        if (user) {
          this._userService.onUserSuccess(user);
          // } else console.log("no such user Found");
        } else this._showLoginError();
      });
  }

  public createAccount(userInfo: User): void {
    this._userService.addUser(userInfo).subscribe(() => {
      this._userService.onUserSuccess(userInfo);
    });
  }
  //endregion

  //region Main Logic methods

  private _showLoginError(): void {
    console.log('hello')
    this._toaster.error('everything is broken', 'Major Error')
  }
  //endregion
}
