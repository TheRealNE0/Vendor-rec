import {BaseEntity} from "./BaseEntity";
import {Image} from "./Image";
import {Size} from "../enums/size";
import {Color} from "../enums/color";

export interface Product extends BaseEntity {
  name: string; //check

  mainImage: Image; //check

  images: Image[]; //check

  description: string; //check

  discount: number; //check

  price: number; //check

  reviewNumber: number;

  color: Color[];

  size?: Size[];

  categoryId: number;

  quantity: number; //check
}
