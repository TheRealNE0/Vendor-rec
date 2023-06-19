import {BaseEntity} from "./BaseEntity";
import {CheckoutItem} from "./CheckoutItem";
import {WishItem} from "./WishItem";
import {OrderItem} from "./OrderItem";

export interface User extends BaseEntity {

  username: string;
  password: string;
  orderList : OrderItem[];
  wishList: WishItem[];
  checkOutList : CheckoutItem[];
}


