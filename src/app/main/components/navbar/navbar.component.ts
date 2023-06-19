import {Component, EventEmitter, HostListener, Input, OnInit, Output} from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "../../../shared/models/User";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {

  //region Properties
  // public userCartCount: number;
  private _currentScrollPosition;
  private _scrollDirectionStatus;
  @Input() loggedInUser: User | null = null;
  @Output() cartButtonOnClickEventHandler = new EventEmitter<void>()

  //endregion

  constructor(public userService: UserService) {
  }

  //region Lifecycle methods
  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  //endregion

  //region Main Logic methods
  @HostListener("window:scroll", [])
  private _onWindowScroll(): void {
    // console.log(window.scrollY)
    let scroll = window.scrollY;
    if (scroll > this._currentScrollPosition) {
      this.scrollDirectionStatus = "DOWN";
      console.log("Navbar Down");
    } else {
      this.scrollDirectionStatus = "UP";
      console.log("Navbar Down");
    }
    if (window.scrollY === 0) {
      this.scrollDirectionStatus = "TOP";
      console.log("Navbar is on Top");

    }
    this._currentScrollPosition = scroll;
  }

  get scrollDirectionStatus(): "UP" | "DOWN" | "TOP" {
    return this._scrollDirectionStatus;
  }

  set scrollDirectionStatus(value) {
    this._scrollDirectionStatus = value;
  }

  //endregion

  //region Handler methods
  public cartButtonClickHandler(): void {
    // this.cartButtonOnClickEventHandler.emit(!this._sideCartFlag)
    this.cartButtonOnClickEventHandler.emit()
  }
  //endregion
}
