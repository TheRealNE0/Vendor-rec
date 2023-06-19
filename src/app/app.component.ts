import { Component, OnInit } from "@angular/core";
import { UserService } from "./main/services/user.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor( private _userService: UserService) {}

  //region Lifecycle methods
  ngOnInit(): void {
  }
  //endregion

}
