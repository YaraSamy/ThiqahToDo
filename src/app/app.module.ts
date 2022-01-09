import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {CustomTranslateLoader} from "./core/configs/localization-config";

import {AppComponent} from './app.component';
import { HeaderComponent } from './layout/header/header.component';

function GetCurrentLanguage(): string {
  return <string>(localStorage.getItem('LANG') ? localStorage.getItem('LANG') : 'en-US');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      defaultLanguage: GetCurrentLanguage(),
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
