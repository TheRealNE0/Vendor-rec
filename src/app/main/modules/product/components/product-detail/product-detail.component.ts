import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Product } from "../../../../../shared/models/Product";
import Swiper, { Navigation, Pagination } from "swiper";
import { ProductService } from "../../../../services/product.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { debounce } from "lodash";
import { CartItem } from "../../models/cart-item";
import { Subscription } from "rxjs";
import { CheckoutItem } from "../../../../../shared/models/CheckoutItem";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  //region Properties
  @Input() productInfo!: Product;
  @Input() wishButtonFlag!: boolean;
  @Input() addToCartButtonFlag!: boolean;
  @Input() checkOutItemQuantity!: number;
  @Output() toggleWishListEvent = new EventEmitter<void>();
  @Output() addCartItemEvent = new EventEmitter<CartItem>();
  @Output() subtractCartItemEvent = new EventEmitter<CartItem>();
  @Output() productAppearanceChangesEvent = new EventEmitter<Partial<CheckoutItem>>();
  public productForm: FormGroup;
  public isAddToCartButtonVisible: boolean = true;
  private _productFormValueChangesSubscription: Subscription;
  private readonly _formKeys = {
    color: "color",
    size: "size"
  };
  private _counter = 0;

  cartItemADDEventHandler = debounce(() => {
    // console.log(this._counter);
    this.addCartItemEvent.emit({ count: this._counter, itemAppearance: this._convertFormValueToProduct() });
    this._counter = 0;
  }, 700);

  cartItemSubtractEventHandler = debounce(() => {
    // console.log(this._counter);
    this.subtractCartItemEvent.emit({ count: this._counter, itemAppearance: this._convertFormValueToProduct() });
    this._counter = 0;
  }, 700);

  //endregion

  constructor(private _productService: ProductService, private _formBuilder: FormBuilder) {

  }

  //region Lifecycle methods
  ngOnInit(): void {
    // console.log(this.productInfo);
    // console.log(this.WishButtonFlag);
    this._createSwiper();

    this.productForm = this._productFormInit();

    this._productFormValueChangesSubscription = this.productForm.valueChanges
      .pipe().subscribe(data => {
        // console.log(data);
        this.isAddToCartButtonVisible = this.addToCartButtonFlag
        this.productAppearanceChangesEvent.emit(data);
      });

  }

  ngOnDestroy(): void {
    this._productFormValueChangesSubscription.unsubscribe();
  }

  //endregion

  //region Handler methods
  public addToWishlistHandler(): void {
    this.toggleWishListEvent.emit();
  }

  public onClickSubmitHandler() {
    this.isAddToCartButtonVisible = false;
    this._counter++;
    this.cartItemADDEventHandler();
    console.log(this._convertFormValueToProduct());

  }

  public onClickAddHandler() {
    this._counter++;
    this.cartItemADDEventHandler();
  }

  public onClickSubtractHandler() {
    this._counter--;
    this.cartItemSubtractEventHandler();
  }


  //endregion

  //region Main Logic methods
  private _createSwiper() {
    const swiper = new Swiper(".thirdSwiper", {
      modules: [Navigation, Pagination],
      loop: true,
      pagination: true,
      slidesPerView: 1
    });
  }

  private _productFormInit(): FormGroup {

    return this._formBuilder.group({
      [this._formKeys.color]: [this.productInfo.color[0], [Validators.required]],
      [this._formKeys.size]: [(this.productInfo.size === undefined ? "" : this.productInfo.size[0]), [Validators.required]]
    });
  }

  //endregion

  //region Helper methods
  private _convertFormValueToProduct(): any {
    return this.productForm.value;
  }

  //endregion

}
