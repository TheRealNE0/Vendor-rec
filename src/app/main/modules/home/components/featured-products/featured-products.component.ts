import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "../../../../../shared/models/Product";

@Component({
  selector: "app-featured-products",
  templateUrl: "./featured-products.component.html",
  styleUrls: ["./featured-products.component.scss"]
})
export class FeaturedProductsComponent {
  //region Properties

  public viewName: string = "BS";
  @Input() productList: Product[];
  @Output() productId = new EventEmitter<number>();

  //endregion

  //region Main Logic methods

  public setView(viewName: string): void {
    this.viewName = viewName;
  }

  private _navigateToProduct(productId): void {
    this.productId.emit(productId);
  }

  //endregion

  //region Handler methods
  public onClickProductImageHandler(productId): void {
    this._navigateToProduct(productId);
  }

  //endregion
}
