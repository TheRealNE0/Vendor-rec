import {BaseEntity} from "./BaseEntity";
import {Image} from "./Image";

export interface Category extends BaseEntity{
  name: string;
  image: Image;
}
