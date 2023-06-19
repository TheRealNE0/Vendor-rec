import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { FormService } from "../../../../user-auth/services/form.service";
import { UserService } from "../../../../../services/user.service";
import { take } from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: "app-profile-main",
  templateUrl: "./profile-main.component.html",
  styleUrls: ["./profile-main.component.scss"],
  host: { "style": "width:100%" }
})
export class ProfileMainComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _formService: FormService,
              private _userService: UserService, private _toaster: ToastrService) {
  }

  ngOnInit(): void {
    this.profileForm = this.profileFormInit();
    // console.log(this.profileForm);
  }

  profileFormOnSubmit(formDirective: FormGroupDirective) {
    const finalObject = formDirective.value;
    // console.log(finalObject);
    this.changePasswordRequest(finalObject.password, finalObject.oldPassword);
    // this.submittedSignInForm.emit(finalObject);
  }

  private profileFormInit(): FormGroup {
    //more fromControls Could be added further more
    return this._formBuilder.group({
        oldPassword: ["", [Validators.required]],
        password: ["", [Validators.required]],
        passwordConfirm: ["", [Validators.required]]
      },
      {
        validators: [this._formService.repassValidator()]
      });
  }

  //todo add toaster for failed condition
  private changePasswordRequest(newPassword, oldPassword) {

    this._userService.user.pipe(take(1)).subscribe(user => {

      if (user && user.password === oldPassword) {
        this._userService.changePassword({ password: newPassword, id: user.id })
          .subscribe(() => this._userService.logUserOut());
      // } else console.log("something wrong happened either password checking went wrong or user was null");
      } else this.showPasswordError();
    });

  }

  private showPasswordError(): void {
    // const toasterOption = {}
    // this._toaster.error('everything is broken', 'Major Error', toasterOption)
    this._toaster.error('everything is broken', 'Major Error')
  }
}
