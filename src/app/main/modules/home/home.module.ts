import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeMainComponent} from './components/home-main/home-main.component';
import {Route, RouterModule} from "@angular/router";
import { FirstSectionComponent } from './components/first-section/first-section.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { SpringCollectionComponent } from './components/spring-collection/spring-collection.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { CarouselSectionComponent } from './components/carousel-section/carousel-section.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeMainComponent
  }
]

@NgModule({
  declarations: [
    HomeMainComponent,
    FirstSectionComponent,
    FeaturedProductsComponent,
    SpringCollectionComponent,
    BlogPostComponent,
    CarouselSectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule {
}
