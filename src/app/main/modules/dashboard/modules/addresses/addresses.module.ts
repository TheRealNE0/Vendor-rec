import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddressesMainComponent } from "./addresses-main/addresses-main.component";
import { Route, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Route[] = [
  {
    path: "",
    component: AddressesMainComponent
  }
];

@NgModule({
  declarations: [
    AddressesMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AddressesModule {
}
