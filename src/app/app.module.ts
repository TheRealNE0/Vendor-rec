import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GlobalConfig, ToastrModule} from "ngx-toastr";

const toasterOptions: Partial<GlobalConfig> = {
  timeOut: 5000,
  extendedTimeOut: 2500,
  easeTime: 250,
  progressBar: true,
  positionClass: "toast-bottom-center",
  preventDuplicates: true,
  resetTimeoutOnDuplicate: true,

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toasterOptions),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
