import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PagesComponent
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
