import { Component, Input, OnInit } from "@angular/core";
import Swiper, { Navigation, Pagination } from "swiper";
import { Banner } from "../../models/banner";


@Component({
  selector: "app-first-section",
  templateUrl: "./first-section.component.html",
  styleUrls: ["./first-section.component.scss"]
})
export class FirstSectionComponent implements OnInit {

  //region Properties
  @Input() sliderImageList: Banner[];

  //endregion

  //region Lifecycle methods
  ngOnInit(): void {
    this._createSlider();
    // console.log(this.sliderImageList)
  }

  //endregion

  //region Main Logic methods
  private _createSlider(): void {
    const swiper = new Swiper(".firstSwiper", {
      modules: [Navigation, Pagination],
      loop: true,
      pagination: true
    });
  }

  //endregion

}
