import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserAuthMainComponent } from "./components/user-auth-main/user-auth-main.component";
import { FormsSectionComponent } from "./components/forms-section/forms-section.component";
import { ReactiveFormsModule } from "@angular/forms";
import { Route, RouterModule, ROUTES } from "@angular/router";

const routes: Route[] = [
  {
    path: "",
    component: UserAuthMainComponent
  }
];

@NgModule({
  declarations: [
    UserAuthMainComponent,
    FormsSectionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserAuthModule {
}
