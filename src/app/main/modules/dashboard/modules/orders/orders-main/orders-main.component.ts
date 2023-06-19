import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { DashboardService } from "../../../services/dashboard.service";
import { OrderItem } from "../../../../../../shared/models/OrderItem";
import { Subscription, take } from "rxjs";
import { ProductService } from "../../../../../services/product.service";

@Component({
  selector: "app-orders-main",
  templateUrl: "./orders-main.component.html",
  styleUrls: ["./orders-main.component.scss"],
  host: { "style": "width:100%" }
})
export class OrdersMainComponent implements OnInit, OnDestroy {
  //region Properties
  public orderList: OrderItem[];
  public productImageTable = {};
  private _orderListSubscription: Subscription;

  //endregion

  constructor(private _dashboardService: DashboardService, private _productService: ProductService) {
  }

  //region lifeCycle methods
  ngOnInit() {
    this._orderListSubscription = this._dashboardService.getOrdersList().subscribe(data => {
      this.orderList = data;
      if (this.orderList) this._createImageTable();
    });
  }

  ngOnDestroy(): void {
    this._orderListSubscription.unsubscribe();
  }

  //endregion

  //region Main Logic methods

  private _createImageTable() {
    this.orderList.forEach(orderItem => {
      if (!this.productImageTable.hasOwnProperty(`${orderItem.productId}`)) {
        this._getProductMainImage(orderItem.productId);
        console.log(this.productImageTable);
      }
    });
    // console.log(this.productImageTable);
  }

  private _getProductMainImage(productId: number): void {
    this._productService.getById(productId).pipe(take(1)).subscribe(item => {
      this.productImageTable[`${productId}`] = item.mainImage.uri;
    });
  }

  //endregion
}
