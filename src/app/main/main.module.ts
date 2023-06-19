import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {TemplateComponent} from "./components/template/template.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FooterComponent} from "./components/footer/footer.component";
import {AuthPermissionGuard} from "../shared/guards/auth-permission.guard";
import {GlobalConfig, ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const routes: Route[] = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'user-auth',
        canActivate: [AuthPermissionGuard],
        loadChildren: () => import('./modules/user-auth/user-auth.module').then(m => m.UserAuthModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('./modules/checkout/checkout.module').then(m => m.CheckoutModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule)
      }
    ]
  }
]



@NgModule({
  declarations: [
    TemplateComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule {
}
