import { Injectable } from "@angular/core";
import { BaseService } from "../../shared/class/baseService";
import { Product } from "../../shared/models/Product";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { Observable } from "rxjs";
import { WishItem } from "../../shared/models/WishItem";
import { CheckoutItem } from "../../shared/models/CheckoutItem";

@Injectable({
  providedIn: "root"
})
export class ProductService extends BaseService<Product> {

  constructor(http: HttpClient, private _userService: UserService) {
    super(http, "products");
  }

  public addToWishlist(newWishItem: WishItem, userId: number, targetWishList: WishItem[]): Observable<void> {
    targetWishList.push(newWishItem);
    return this._userService.editUserWishlist({ id: userId, wishList: targetWishList });
  }

  public removeFromWishlist(wishItemIndex: number, userId: number, targetWishList: WishItem[]): Observable<void> {
    targetWishList.splice(wishItemIndex, 1);
    return this._userService.editUserWishlist({ id: userId, wishList: targetWishList });
  }

  public addToCheckoutList(newCheckoutItem: CheckoutItem, userId: number, targetCheckoutList: CheckoutItem[]): Observable<void>{
    const index = targetCheckoutList.findIndex(item => newCheckoutItem.id === item.id)
    if (index === -1) targetCheckoutList.push(newCheckoutItem)
    else targetCheckoutList[index] = newCheckoutItem
    if(newCheckoutItem.quantity === 0) this.removeFromCheckoutList(newCheckoutItem.id,userId, targetCheckoutList)
    return this._userService.editUserCheckoutList({ id: userId, checkOutList: targetCheckoutList })
  }

  public removeFromCheckoutList(checkOutIdIndex: number, userId: number,targetCheckoutList: CheckoutItem[]): Observable<void>{
    targetCheckoutList.splice(checkOutIdIndex,1)
    return this._userService.editUserCheckoutList({ id: userId, checkOutList: targetCheckoutList })
  }

}
