import { Injectable } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";
import { User } from "../../../../shared/models/User";

@Injectable({
  providedIn: "root"
})
export class FormService {

  constructor() {
  }

  public repassValidator(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const password = formGroup.get("password").value;
      const passwordConfirm = formGroup.get("passwordConfirm").value;
      // console.log(password);
      // console.log(passwordConfirm);
      if (!password || !passwordConfirm) return null;

      if (password !== passwordConfirm) {
        return { notSamePassword: true };
      }

      return null;
    };
  }

  completeFormValue(formValues: { username: string, password: string }): User {
    return Object.assign(formValues, {
      id: this.getUniqueId(),
      orderList: [],
      wishList: [],
      checkOutList: []
    });

  }

  getUniqueId(): number {
    return Math.floor(Math.random() * 100000000);
  }
}
