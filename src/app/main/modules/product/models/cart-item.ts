import { CheckoutItem } from "../../../../shared/models/CheckoutItem";

export interface CartItem {
  count: number;
  itemAppearance: Partial<CheckoutItem>
}
