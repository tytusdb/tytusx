import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import {RouterModule, Routes} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CodemirrorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
