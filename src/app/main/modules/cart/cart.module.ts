import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartMainComponent } from "./components/cart-main/cart-main.component";
import { CartSummaryComponent } from "./components/cart-summary/cart-summary.component";
import { CartDetailsComponent } from "./components/cart-details/cart-details.component";
import { Route, RouterModule } from "@angular/router";

const routes: Route[] = [{
  path: '',
  component: CartMainComponent
}];

@NgModule({
  declarations: [
    CartMainComponent,
    CartSummaryComponent,
    CartDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CartModule {
}
