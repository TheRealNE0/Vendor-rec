import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { FormService } from "../../services/form.service";
import { User } from "../../../../../shared/models/User";
import { SignInFormResponse } from "../../models/sign-in-form-response";

@Component({
  selector: "app-forms-section",
  templateUrl: "./forms-section.component.html",
  styleUrls: ["./forms-section.component.scss"]
})
export class FormsSectionComponent implements OnInit {
  //region Properties
  @Output() submittedSignInForm: EventEmitter<SignInFormResponse> = new EventEmitter();
  @Output() submittedSignUpForm: EventEmitter<User> = new EventEmitter();
  signIn: FormGroup;
  signUp: FormGroup;
  //endregion

  constructor(private _formBuilder: FormBuilder, private _formService: FormService) {
  }

  //region Lifecycle methods

  ngOnInit(): void {
    this.signIn = this._signInFormInit();
    this.signUp = this._signUpFormInit();
  }

  //endregion

  //region Handler methods
  public signInOnSubmit(formDirective: FormGroupDirective): void {
    const finalObject = formDirective.value;
    this.submittedSignInForm.emit(finalObject);
  }

  public signUpOnSubmit(formDirective: FormGroupDirective):void {
    delete formDirective.value.passwordConfirm;
    const finalObject = this._formService.completeFormValue(formDirective.value);
    this.submittedSignUpForm.emit(finalObject);
  }
  //endregion

  //region Main Logic methods
  private _signInFormInit(): FormGroup {
    return this._formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]

    });
  }

  private _signUpFormInit(): FormGroup {
    return this._formBuilder.group({
        username: ["", [Validators.required]],
        password: ["", [Validators.required]],
        passwordConfirm: ["", [Validators.required]]
      },
      {
        validators: [this._formService.repassValidator()]
      });
  }
  //endregion

}
