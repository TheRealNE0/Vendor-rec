import { Component, Input } from "@angular/core";
import { Image } from "../../../../../shared/models/Image";
import Swiper, { Navigation } from "swiper";

@Component({
  selector: "app-carousel-section",
  templateUrl: "./carousel-section.component.html",
  styleUrls: ["./carousel-section.component.scss"]
})

export class CarouselSectionComponent {
  //region Properties
  @Input() carouselImageList: Image[];

  //endregion

  //region Lifecycle methods
  ngOnInit(): void {
    this._createSlider();
  }

  //endregion

  //region Main Logic methods
  private _createSlider(): void {
    const swiper = new Swiper(".secondSwiper", {
      modules: [Navigation],
      spaceBetween: 50,
      slidesPerView: 4
    });
  }

  //endregion
}
