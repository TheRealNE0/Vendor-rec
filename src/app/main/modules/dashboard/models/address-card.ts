import { BaseEntity } from "../../../../shared/models/BaseEntity";

export interface AddressCard extends BaseEntity{
  destination: { address:string , city:string };
  receiverName: string;
}
