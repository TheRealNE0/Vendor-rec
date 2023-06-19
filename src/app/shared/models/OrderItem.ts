import {BaseEntity} from "./BaseEntity";
import {Color} from "../enums/color";
import {Size} from "../enums/size";

export interface OrderItem extends BaseEntity{
  color: Color;
  size?: Size;
  productId: number;
  quantity: number;
  price: number;
}

