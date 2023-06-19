import { BaseEntity } from "../../../../shared/models/BaseEntity";

export interface PaymentCard extends BaseEntity{
  type: string;
  cardNumber: string;
  name: string;
  date: { month:string , year:string };
}
