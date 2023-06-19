import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentsMainComponent } from "./payments-main/payments-main.component";
import { Route, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Route[] = [
  {
    path: "",
    component: PaymentsMainComponent
  }
];

@NgModule({
  declarations: [
    PaymentsMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class PaymentsModule {
}
