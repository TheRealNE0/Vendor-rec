import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from "../../../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../../../../shared/models/Product";
import { concatMap, filter, Observable, Subscription } from "rxjs";
import { WishItem } from "../../../../../shared/models/WishItem";
import { UserService } from "../../../../services/user.service";
import { User } from "../../../../../shared/models/User";
import { CartItem } from "../../models/cart-item";
import { CheckoutItem } from "../../../../../shared/models/CheckoutItem";
import { Color } from "../../../../../shared/enums/color";
import { Size } from "../../../../../shared/enums/size";

@Component({
  selector: "app-product-main",
  templateUrl: "./product-main.component.html",
  styleUrls: ["./product-main.component.scss"]
})
export class ProductMainComponent implements OnInit, OnDestroy {
  //region Properties
  public product: Product;
  public wishButtonFlag: boolean;
  public addToCartButtonFlag: boolean;
  public checkOutItemQuantity: number;
  private _productIdFromRoute: number;
  private _userSubscription: Subscription;
  private _userInfo: User;

  //endregion

  constructor(private _route: ActivatedRoute, private _productService: ProductService, private _userService: UserService) {
  }

  //region LifeCycle methods
  ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }

  ngOnInit(): void {

    const routeParams = this._route.snapshot.paramMap;
    this._productIdFromRoute = Number(routeParams.get("productId"));
    this._getProductDetail();

    this._userSubscription = this._userService.user
      .pipe(filter(user => !!user), concatMap(user => {
        this._userInfo = user;
        return this._getProductDetail();
      })).subscribe(product => {
        this.product = product;
        // console.log(this._userInfo);
        // console.log(this.product);
        if (this._userInfo && this.product) {
          this._checkWishItemStatus();
          this._checkCartItemStatus();
        }
      });


  }

  //endregion

  //region Handler methods
  public onToggleWishListHandler(): void {

    // console.log(this.WishButtonFlag);
    if (this.wishButtonFlag) this._addToWishlist();
    else this._removeFromWishlist();
  }

  public onClickCartItemAddHandler($event: CartItem) {
    if (this._checkQuantity($event.count) && $event.itemAppearance.size) this._addToCheckoutList($event.count, $event.itemAppearance.color, $event.itemAppearance.size);
    else if (this._checkQuantity($event.count)) this._addToCheckoutList($event.count, $event.itemAppearance.color);
    // else console.log("can't process your operation");
    // console.log(`add ${JSON.stringify($event)} item`);

  }

  public onClickCartItemSubtractHandler($event: CartItem) {
    if (this._checkQuantity($event.count) && $event.itemAppearance.size) this._addToCheckoutList($event.count, $event.itemAppearance.color, $event.itemAppearance.size);
    // else console.log("can't process your operation");
    else if (this._checkQuantity($event.count)) this._addToCheckoutList($event.count, $event.itemAppearance.color);
    // console.log(`sub ${JSON.stringify($event)} item`);
  }

  onAppearanceChangesEventHandler($event: Partial<CheckoutItem>) {
    console.log($event);
    const checkoutItemIndex = $event.size !== undefined
      ? this._getCheckoutItemIndexByAppearance($event.color, $event.size)
      : this._getCheckoutItemIndexByAppearance($event.color);
    if (checkoutItemIndex !== -1) this.checkOutItemQuantity = this._userInfo.checkOutList[checkoutItemIndex].quantity;
    else this.checkOutItemQuantity = 0;
  }

  //endregion

  //region Main Logic methods

  private _removeEmptyAttribute(obj): void {
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    });
  }

  private _checkQuantity(userRequestCount: number): boolean {
    const max = this.product.quantity;

    let userInventoryQuantity = 0;
    const userInventoryItem = this._userInfo.checkOutList.find(item => item.productId === this.product.id);
    if (userInventoryItem !== undefined) userInventoryQuantity = userInventoryItem.quantity;
    return !(userInventoryQuantity + userRequestCount > max || userInventoryQuantity + userRequestCount < 0);

  }

  private _getProductDetail(): Observable<Product> {
    return this._productService.getById(this._productIdFromRoute);
    // .subscribe(data => this.product = data);
  }

  private _checkWishItemStatus(): void {
    this.wishButtonFlag = this._userInfo.wishList.findIndex(item => item.productId === this.product.id) === -1;
    // console.log(this.WishButtonFlag);

  }

  private _checkCartItemStatus(): void {
    const checkOutItemIndex = this._userInfo.checkOutList.findIndex(item => item.productId === this.product.id);
    if (checkOutItemIndex === -1) {
      this.checkOutItemQuantity = 0;
      this.addToCartButtonFlag = false
    } else {
      this.checkOutItemQuantity = this._userInfo.checkOutList[checkOutItemIndex].quantity;
      this.addToCartButtonFlag = true;
    }

  }

  private _getUid(): number {
    return Math.floor(Math.random() * 10000);
  }

  private _addToWishlist(): void {
    const wishItemToADD: WishItem = this._convertProductDetailToWishItem();
    this._productService
      .addToWishlist(wishItemToADD, this._userInfo.id, this._userInfo.wishList)
      .subscribe(response => this._checkWishItemStatus());
  }

  private _removeFromWishlist(): void {
    const productId = this._userInfo.wishList.findIndex(item => item.productId === this.product.id);
    this._productService.removeFromWishlist(productId, this._userInfo.id, this._userInfo.wishList)
      .subscribe(response => this._checkWishItemStatus());
  }

  private _addToCheckoutList(count: number, color: Color, size?: Size): void {
    const checkoutItemIndex = size !== undefined ? this._getCheckoutItemIndexByAppearance(color, size) : this._getCheckoutItemIndexByAppearance(color);

    const checkoutItemToADD: CheckoutItem = this._convertProductDetailToCheckoutItem(checkoutItemIndex, count, color, size);
    this._removeEmptyAttribute(checkoutItemToADD);

    this.checkOutItemQuantity = checkoutItemToADD.quantity;
    console.log(checkoutItemToADD);
    if (checkoutItemToADD.quantity === 0 && checkoutItemIndex !== -1) {
      this.checkOutItemQuantity = checkoutItemToADD.quantity;
      this._removeFromCheckoutList(checkoutItemToADD.id);
      return;
    }
    this._productService
      .addToCheckoutList(checkoutItemToADD, this._userInfo.id, this._userInfo.checkOutList)
      .subscribe();
  }

  private _removeFromCheckoutList(itemID: number): void {
    const productIdIndex = this._userInfo.checkOutList.findIndex(item => item.id === itemID);
    this._productService
      .removeFromCheckoutList(productIdIndex, this._userInfo.id, this._userInfo.checkOutList)
      .subscribe();
  }

  private _getCheckoutItemIndexByAppearance(color: Color, size?: Size): number {
    if (size) {
      return this._userInfo.checkOutList.findIndex(item => item.productId === this.product.id && item.color === color && item.size === size);
    } else return this._userInfo.checkOutList.findIndex(item => item.productId === this.product.id && item.color === color);
  }

  //endregion

  //region Helper methods
  private _convertProductDetailToWishItem(): WishItem {
    return { id: this._getUid(), productId: this.product.id };
  }

  private _convertProductDetailToCheckoutItem(index: number, count: number, color: Color, size: Size): CheckoutItem {
    if (index !== -1) {
      const inventoryItem = this._userInfo.checkOutList[index];
      return {
        id: inventoryItem.id,
        productId: inventoryItem.productId,
        quantity: count + inventoryItem.quantity,
        color: inventoryItem.color,
        size: inventoryItem.size
      };
    } else return { id: this._getUid(), productId: this.product.id, quantity: count, color: color, size: size };

  }

  //endregion


}
