import { Image } from "../../../../shared/models/Image";
import { Color } from "../../../../shared/enums/color";
import { Size } from "../../../../shared/enums/size";
import { BaseEntity } from "../../../../shared/models/BaseEntity";

export interface CheckoutTableItems extends BaseEntity{
  thumbnailImage: Image;
  productName: string;
  color: Color;
  size: Size;
  price: number;
  quantity: number;
  maxQuantity: number;
  productId: number;
}
