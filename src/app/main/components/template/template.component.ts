import {Component, EventEmitter, OnDestroy, OnInit, Output, Renderer2} from "@angular/core";
import {UserService} from "../../services/user.service";
import {User} from "../../../shared/models/User";
import {Subscription} from "rxjs";
import {CheckoutItem} from "../../../shared/models/CheckoutItem";
import {SideBarItem} from "../../models/side-bar-item";
import {ProductService} from "../../services/product.service";

@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styleUrls: ["./template.component.scss"]
})
export class TemplateComponent implements OnInit, OnDestroy {

  //region Properties
  public loggedInUser: User | null = null;
  public isCartButtonClicked: boolean = false;
  public sidebarList: SideBarItem[];
  private _logInSubject !: Subscription;

  //endregion

  constructor(private _userService: UserService, private _renderer: Renderer2, private _productService: ProductService) {
  }

  //region Lifecycle methods

  ngOnInit(): void {
    this._logInSubject = this._userService.user.subscribe(
      user => {
        this.loggedInUser = user;
        this.sidebarList = this._convertCheckoutItemsToSideBarItem(this.loggedInUser.checkOutList)
      }
    );
    this._didUserExist();
  }

  ngOnDestroy(): void {
    this._logInSubject.unsubscribe();
  }

  //endregion

  //region Main Logic methods

  private _didUserExist(): void {
    this._userService.checkUserExist();
  }

  private _changePageOverflow(): void {
    const body = this._renderer.selectRootElement('body');

    if (this.isCartButtonClicked) {
      console.log()
      this._renderer.setStyle(body, 'overflow', 'hidden');
      return
    }
    this._renderer.setStyle(body, 'overflow', 'auto');
  }

  private _removeCartItem(productId: number): void {
    const productIdIndex = this.loggedInUser.checkOutList.findIndex(item => item.id === productId);

    this._productService.removeFromCheckoutList(productIdIndex, this.loggedInUser.id, this.loggedInUser.checkOutList).subscribe(response => {
      this.sidebarList = this.sidebarList.filter(function( obj ) {
        return obj.id !== productId;
      });
      console.log(this.sidebarList)
    });
  }
  //endregion


  //region Handler methods
  public cartButtonOnClickHandler(): void {
    this.isCartButtonClicked = true

    // this._changePageOverflow()
  }

  public cartCloseOnClickHandler(): void {
    this.isCartButtonClicked = false;

    // this._changePageOverflow()
  }


  public onClickRemoveHandler(cartItemId: number): void {
    this._removeCartItem(cartItemId)
  }

  //endregion


  //region Helper methods
  private _convertCheckoutItemsToSideBarItem(checkOutList: CheckoutItem[]): SideBarItem[] {

    const finalList = [];
    checkOutList.forEach(item => {
      this._productService.getById(item.productId).subscribe(product => {
        finalList.push({
          id: item.id,
          thumbnailImage: product.mainImage,
          productName: product.name,
          price: product.price,
          quantity: item.quantity,
          productId: product.id,
          size: item.size,
          color: item.color
        });
      });
    });

    return finalList
  }

  //endregion

}
