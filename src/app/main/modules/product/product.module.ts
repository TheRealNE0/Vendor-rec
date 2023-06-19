import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductMainComponent } from "./components/product-main/product-main.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { SuggestionCarouselComponent } from "./components/suggestion-carousel/suggestion-carousel.component";
import { Route, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";


const routes: Route[] = [
  {
    path: ":productId",
    component: ProductMainComponent
  }
];

@NgModule({
  declarations: [
    ProductMainComponent,
    ProductDetailComponent,
    SuggestionCarouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class ProductModule {
}
