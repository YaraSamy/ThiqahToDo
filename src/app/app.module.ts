import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {CustomTranslateLoader} from "./core/configs/localization-config";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./core/fake-api/in-memory-data.service";
import {ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {ToDoListComponent} from './layout/to-do-list/to-do-list.component';

function GetCurrentLanguage(): string {
  return <string>(localStorage.getItem('LANG') ? localStorage.getItem('LANG') : 'en-US');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToDoListComponent
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
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService
    ),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
