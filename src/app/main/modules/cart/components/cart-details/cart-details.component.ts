import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CheckoutTableItems } from "../../models/checkout-table-items";
import { debounce } from "lodash";
import { CartItem } from "../../models/cart-item";

@Component({
  selector: "app-cart-details",
  templateUrl: "./cart-details.component.html",
  styleUrls: ["./cart-details.component.scss"]
})
export class CartDetailsComponent implements OnInit {
  //region Properties
  @Input() checkoutList: CheckoutTableItems[];
  @Output() addCartItemEvent = new EventEmitter<CartItem>();
  @Output() subtractCartItemEvent = new EventEmitter<CartItem>();
  @Output() removeCartItemEvent = new EventEmitter<number>();
  private _counter = 0;

  cartItemSubtractEventHandlerDebounce =debounce((productReferenceId) => {
    // console.log(this._counter);
    this.subtractCartItemEvent.emit({ count: this._counter, productReferenceId: productReferenceId });
    this._counter = 0;
  }, 700);
  cartItemAddEventHandlerDebounce =debounce((productReferenceId) => {
    // console.log(this._counter);
    this.addCartItemEvent.emit({ count: this._counter, productReferenceId: productReferenceId });
    this._counter = 0;
  }, 700);
  //endregion

  //region Lifecycle methods
  ngOnInit(): void {
    console.log(this.checkoutList);
  }
  //endregion

  //region Handler methods
  onClickSubtractHandler(productReferenceId: number):void {
    this._counter--;
    this.cartItemSubtractEventHandler(productReferenceId);
  }

  onClickAddHandler(productReferenceId: number):void {
    this._counter++;
    this.cartItemAddEventHandler(productReferenceId);
  }

  onClickRemoveHandler(cartItemId: number):void {
    console.log("parent: remove button click "+ cartItemId);
    this.cartItemRemoveHandler(cartItemId);

  }

  //endregion

  //region Main Logic methods

  private cartItemSubtractEventHandler(productReferenceId: number) {
    this.cartItemSubtractEventHandlerDebounce(productReferenceId);

  }

  private cartItemAddEventHandler(productReferenceId: number) {
    this.cartItemAddEventHandlerDebounce(productReferenceId);

  }

  private cartItemRemoveHandler(cartItemId: number) {
    this.removeCartItemEvent.emit(cartItemId);
  }

  //endregion

}
