import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersMainComponent } from "./orders-main/orders-main.component";
import { Route, RouterModule } from "@angular/router";

const routes: Route[] = [
  {
    path: "",
    component: OrdersMainComponent
  }
];

@NgModule({
  declarations: [
    OrdersMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrdersModule {
}
