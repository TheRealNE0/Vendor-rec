import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistMainComponent } from './wishlist-main/wishlist-main.component';
import { Route, RouterModule } from "@angular/router";


const routes: Route[] = [
  {
    path: "",
    component: WishlistMainComponent
  }
];


@NgModule({
  declarations: [
    WishlistMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WishlistModule { }
