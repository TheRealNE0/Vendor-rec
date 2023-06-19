import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HomeImages } from "../../models/home-images";
import { BlogPost } from "../../models/blog-post";
import { Product } from "../../../../../shared/models/Product";
import { ProductService } from "../../../../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home-main",
  templateUrl: "./home-main.component.html",
  styleUrls: ["./home-main.component.scss"]
})
export class HomeMainComponent implements OnInit {
  //region Properties

  public homeImageList: HomeImages;
  public productList: Product[];
  public blogPostList: BlogPost[];
  private _baseUrl = "http://localhost:3000/";

  //endregion

  constructor(private _http: HttpClient, private _productService: ProductService, private _router: Router) {

  }

  //region LifeCycle methods

  ngOnInit(): void {
    this._getAllHomeMainResources();
  }

  //endregion

  //region Main Logic methods

  private _getAllHomeMainResources(): void {
    this._productService.getAll().subscribe(data => this.productList = data);
    this._getHomeImages().subscribe(data => this.homeImageList = data);
    this._getBlogPost().subscribe(data => this.blogPostList = data);

  }

  private _getHomeImages(): Observable<HomeImages> {
    return this._http.get<HomeImages>(this._baseUrl + "homeImages");
  }

  private _getBlogPost(): Observable<BlogPost[]> {
    return this._http.get<BlogPost[]>(this._baseUrl + "blogPost");
  }

  private _navigateToProduct(productId: number) {
    this._router.navigate([`product/${productId}`]);
  }

  //endregion

  //region Handler methods
  public onClickProductImageEventHandler(productId: number): void {
    this._navigateToProduct(productId);
  }

  //endregion

}
