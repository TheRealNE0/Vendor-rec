import { Injectable } from "@angular/core";
import { filter, last, map, Observable, takeLast } from "rxjs";
import { UserService } from "../../../services/user.service";
import { User } from "../../../../shared/models/User";
import { WishItem } from "../../../../shared/models/WishItem";
import { OrderItem } from "../../../../shared/models/OrderItem";

@Injectable({
  providedIn: "root"
})
export class DashboardService {

  constructor(private _userService: UserService) {
  }

  getProfileInfo(): Observable<string | null> {
    return this.getDashboardInfo().pipe(map(user => user.username));
  }

  getOrdersList(): Observable<OrderItem[] | null> {
    return this.getDashboardInfo().pipe(map(user => user.orderList));
  }

  getWishlist(): Observable<WishItem[] | null> {
    return this.getDashboardInfo().pipe(map(user => user.wishList));
  }

  private getDashboardInfo(): Observable<User> {
    return this._userService.user.pipe(filter(user => user !== null));
  }

  signOut(){
    this._userService.logUserOut()
  }

}
