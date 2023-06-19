import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardMainComponent } from "./components/dashboard-main/dashboard-main.component";
import { Route, RouterModule, RouterOutlet } from "@angular/router";

const routes: Route[] = [
  {
    path: "",
    component: DashboardMainComponent,
    children: [
      {
        path: "",
        redirectTo: "profile",
        pathMatch: "full"
      },
      {
        path: "profile",
        loadChildren: () => import("./modules/profile/profile.module").then(m => m.ProfileModule)
      },
      {
        path: "orders",
        loadChildren: () => import("./modules/orders/orders.module").then(m => m.OrdersModule)
      },
      {
        path: "addresses",
        loadChildren: () => import("./modules/addresses/addresses.module").then(m => m.AddressesModule)
      },
      {
        path: "payments",
        loadChildren: () => import("./modules/payments/payments.module").then(m => m.PaymentsModule)
      },
      {
        path: "wishlist",
        loadChildren: () => import("./modules/wishlist/wishlist.module").then(m => m.WishlistModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardMainComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule {
}
