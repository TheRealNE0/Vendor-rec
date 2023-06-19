import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { DashboardService } from "../../services/dashboard.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard-main",
  templateUrl: "./dashboard-main.component.html",
  styleUrls: ["./dashboard-main.component.scss"]

})
export class DashboardMainComponent implements OnInit, OnDestroy, AfterViewInit {
  // @ViewChild('lavaBorder', { static: false }) lavaBorderElement: ElementRef;
  dashboardInfoSubscription: Subscription;
  userInfo: string;
  activeIndex: number;
  private activeElement: HTMLElement;
  private lavaElement: HTMLElement;
  private pageKeys = { "profile": 1, "orders": 2, "addresses": 3, "payments": 4, "wishlist": 5 };

  constructor(private _dashboardService: DashboardService, private _renderer: Renderer2, private _router: Router) {
  }

  private _lavaBorderStyle;

  get lavaBorderStyle() {
    return this._lavaBorderStyle;
  }

  set lavaBorderStyle(value) {

    this._lavaBorderStyle = value;
  }

  ngAfterViewInit(): void {
    // console.log("hello After");
    this.activeElement = document.getElementById("active");
    this.lavaElement = document.getElementById("lavaBorder");
    this.drawLavaBorder(<HTMLLIElement>this.activeElement, this.activeIndex);
  }

  ngOnDestroy(): void {
    this.dashboardInfoSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // console.log('hello init');
    this.whatPage();
    this.dashboardInfoSubscription = this._dashboardService.getProfileInfo().subscribe(data => this.userInfo = data);

  }

  signOut(): void {
    this._dashboardService.signOut();
  }

  drawLavaBorder(clickedButton: HTMLLIElement, activeIndex: number): void {
    this.activeIndex = activeIndex;
    this._renderer.setStyle(this.lavaElement, "top", `${clickedButton.offsetTop}px`);
    this._renderer.setStyle(this.lavaElement, "left", `${clickedButton.offsetLeft}px`);
    this._renderer.setStyle(this.lavaElement, "width", `${clickedButton.offsetWidth}px`);
    this._renderer.setStyle(this.lavaElement, "height", `${clickedButton.offsetHeight}px`);
  }

  private whatPage() {
    Object.keys(this.pageKeys).forEach(key =>{
      if (this._router.url.includes(key)) {
        this.activeIndex = this.pageKeys[key];
        return
      }
    })

  }
}
