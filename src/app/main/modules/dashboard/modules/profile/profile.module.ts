import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Route, RouterModule } from "@angular/router";
import { ProfileMainComponent } from "./profile-main/profile-main.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Route[] = [
  {
    path: "",
    component: ProfileMainComponent
  }
];

@NgModule({
  declarations: [
    ProfileMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class ProfileModule {
}
