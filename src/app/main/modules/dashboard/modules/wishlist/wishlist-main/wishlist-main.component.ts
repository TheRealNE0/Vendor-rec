import { Component, OnDestroy, OnInit } from "@angular/core";
import { DashboardService } from "../../../services/dashboard.service";
import { WishItem } from "../../../../../../shared/models/WishItem";
import { Subscription, take } from "rxjs";
import { ProductService } from "../../../../../services/product.service";
import { Product } from "../../../../../../shared/models/Product";
import { Router } from "@angular/router";

@Component({
  selector: "app-wishlist-main",
  templateUrl: "./wishlist-main.component.html",
  styleUrls: ["./wishlist-main.component.scss"],
  host: { "style": "width:100%" }
})
export class WishlistMainComponent implements OnInit, OnDestroy {
  //region Properties
  public wishlist: WishItem[];
  public productList: Product[] = [];
  private _wishlistSubscription: Subscription;

  //endregion

  constructor(private _dashboardService: DashboardService, private _productService: ProductService, private _router: Router) {
  }

  //region Lifecycle methods
  ngOnInit() {
    this._wishlistSubscription = this._dashboardService.getWishlist().subscribe(data => {
      this.wishlist = data;
      if (this.wishlist) this._createProductList();
    });
  }

  ngOnDestroy(): void {
    this._wishlistSubscription.unsubscribe();
  }

  //endregion

  //region Handler methods
  public onClickNavigateToProductHandler(productId: number) {
    this._router.navigate([`product/${productId}`]);
  }

  //endregion

  //region Main Logic methods
  private _createProductList() {
    this.wishlist.forEach(orderItem => this._getProductInfo(orderItem.productId));
  }

  private _getProductInfo(productId: number) {
    this._productService.getById(productId).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.productList.push(item);
    });
  }

  //endregion
}
