import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs'; 

import { FormsModule } from '@angular/forms';

import {DataServiceProvider} from '../data-service';

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button'; 

import { CodeEditorModule } from '@ngstack/code-editor';
import { CovalentCodeEditorModule } from '@covalent/code-editor';

import { CodeTabComponent } from './code-tab/code-tab.component';
import { CodeTab2Component } from './code-tab2/code-tab2.component';

import { NgxXml2jsonService } from 'ngx-xml2json';

import * as saveAs from 'file-saver';



@NgModule({
  declarations: [
    AppComponent,
    CodeTabComponent,
    CodeTab2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    CodeEditorModule,
    FormsModule,
    CovalentCodeEditorModule
  ],
  providers: [DataServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
