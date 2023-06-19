import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "../../../../services/user.service";
import { ProductService } from "../../../../services/product.service";
import { filter, map, Observable, Subscription, take } from "rxjs";
import { CheckoutItem } from "../../../../../shared/models/CheckoutItem";
import { CheckoutTableItems } from "../../models/checkout-table-items";
import { Product } from "../../../../../shared/models/Product";
import { CartItem } from "../../models/cart-item";
import { User } from "../../../../../shared/models/User";

@Component({
  selector: "app-cart-main",
  templateUrl: "./cart-main.component.html",
  styleUrls: ["./cart-main.component.scss"]
})
export class CartMainComponent implements OnInit, OnDestroy {

  //region Properties
  public userCheckoutTable: CheckoutTableItems[];
  private _userInfo: Partial<User> = {};
  private _productQuantity: number;
  private _productId: number;
  private _productDetailSubscription: Subscription;
  private _userSubscription: Subscription;
  //endregion

  //region Lifecycle methods

  ngOnInit(): void {
    this._userSubscription = this._userService.user
      .pipe(
        filter(unfilteredValue => unfilteredValue !== null),
        map(user => {
          console.log(user.checkOutList);
          this.userCheckoutTable = this._convertCheckoutItemsToTableValue(user.checkOutList);
          this._userInfo.checkOutList = user.checkOutList;
          this._userInfo.id = user.id;
        }))
      .subscribe();
  }

  ngOnDestroy() {
    this._productDetailSubscription.unsubscribe();
  }

  //endregion

  constructor(private _userService: UserService, private _productService: ProductService) {
  }

  //region Main logic methods

  private _getProductDetail(productId: number): Observable<Product> {
    return this._productService.getById(productId);
  }

  private _removeEmptyAttribute(obj): void {
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    });
  }

  private _updateUserCheckoutTableItem(): void {
    this._userService.user
      .pipe(
        filter(unfilteredValue => unfilteredValue !== null),
        take(1)
      ).subscribe(userData => this.userCheckoutTable = this._convertCheckoutItemsToTableValue(userData.checkOutList));
  }

  private _checkQuantity(userRequestCount: number, userInventoryQuantity: number): boolean {
    const max = this._productQuantity;
    return !(userInventoryQuantity + userRequestCount > max || userInventoryQuantity + userRequestCount < 0);

  }

  private _addToCheckoutList(count: number, CheckoutTableItem: CheckoutTableItems): void {
    const checkoutItemToADD: CheckoutItem = this._convertProductDetailToCheckoutItem(count, CheckoutTableItem);
    this._removeEmptyAttribute(checkoutItemToADD);
    console.log(checkoutItemToADD);

    if (checkoutItemToADD.quantity === 0) {
      // this.checkOutItemQuantity = checkoutItemToADD.quantity;
      this._removeFromCheckoutList(checkoutItemToADD.id);
      return;
    }
    this._productService
      .addToCheckoutList(checkoutItemToADD, this._userInfo.id, this._userInfo.checkOutList)
      .subscribe(response => this._updateUserCheckoutTableItem());
  }

  private _removeFromCheckoutList(itemID: number): void {
    const productIdIndex = this._userInfo.checkOutList.findIndex(item => item.id === itemID);
    // console.log("removed checklist item triggered");
    this._productService
      .removeFromCheckoutList(productIdIndex, this._userInfo.id, this._userInfo.checkOutList)
      .subscribe(response => this._updateUserCheckoutTableItem());
  }

  //endregion

  //region Handler methods

  public onClickCartItemRemoveHandler($event: number): void {
    // console.log(`id to remove: ${$event}, user to remove: ${this.userinfo.id}, target checkoutL: ${this.userinfo.checkOutList}`);
    // console.log("parent: remove button click");
    const productIdIndex = this._userInfo.checkOutList.findIndex(item => item.id === $event);
    //todo can i use response to update checkout list value ??
    this._productService.removeFromCheckoutList(productIdIndex, this._userInfo.id, this._userInfo.checkOutList).subscribe(response => {
      // console.table(JSON.stringify(response));
      console.table(response);
      this._updateUserCheckoutTableItem();
      console.log("removed happened");
    });

  }

  public onClickCartItemSubtractHandler($event: CartItem): void {
    // console.log($event);
    const CheckoutTableItem = this._getCheckoutTableItemById($event.productReferenceId);
    this._productQuantity = CheckoutTableItem.maxQuantity;
    this._productId = CheckoutTableItem.productId
    if (this._checkQuantity($event.count, CheckoutTableItem.quantity)) {
      this._addToCheckoutList($event.count, CheckoutTableItem);
    }
    // console.log(CheckoutTableItem);
  }

  public onClickCartItemAddHandler($event: CartItem): void {
    // console.log($event);
    const CheckoutTableItem = this._getCheckoutTableItemById($event.productReferenceId);
    this._productQuantity = CheckoutTableItem.maxQuantity;
    this._productId = CheckoutTableItem.productId
    if (this._checkQuantity($event.count, CheckoutTableItem.quantity)) {

      this._addToCheckoutList($event.count, CheckoutTableItem);
    }
  }

  private _getCheckoutTableItemById(productReferenceId: number): CheckoutTableItems {
    return this.userCheckoutTable.find(tableItem => tableItem.id === productReferenceId);
  }

  //endregion

  //region Helper methods
  private _convertProductDetailToCheckoutItem(count: number, CheckoutTableItem: CheckoutTableItems): CheckoutItem {

    return {
      id: CheckoutTableItem.id,
      productId: this._productId,
      quantity: count + CheckoutTableItem.quantity,
      color: CheckoutTableItem.color,
      size: CheckoutTableItem.size
    };
  }

  private _convertCheckoutItemsToTableValue(checkOutList: CheckoutItem[]): CheckoutTableItems[] {
    const finalList = [];
    checkOutList.forEach(item => {
      this._productDetailSubscription = this._getProductDetail(item.productId).subscribe(product => {
        // this._productId = product.id;
        const tempObject: CheckoutTableItems = {
          id: item.id,
          thumbnailImage: product.mainImage,
          productName: product.name,
          price: product.price,
          quantity: item.quantity,
          maxQuantity: product.quantity,
          productId: product.id,
          size: item.size,
          color: item.color
        };
        this._removeEmptyAttribute(tempObject);
        finalList.push(tempObject);
      });
    });

    return finalList;
  }

  //endregion

}
