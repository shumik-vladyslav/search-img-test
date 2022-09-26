import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GifListComponent } from './components/gif-list/gif-list.component';
import { MultiTagSearchComponent } from './utils/multi-tag-search/multi-tag-search.component';
import { PaginatorComponent } from './utils/paginator/paginator.component';


@NgModule({
  declarations: [
    AppComponent,
    GifListComponent,
    MultiTagSearchComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
