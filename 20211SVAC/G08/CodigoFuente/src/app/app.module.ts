import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {} from '../app/Gramatica/gramatica.js';
import {} from '../app/Gramatica/xpathGramatica.js';
import {TipoNodo,TipoOperador,TipoParametro} from '../app/Estructuras/tipificacion';
import { TablaSimbolosComponent } from './Reportes/tabla-simbolos/tabla-simbolos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErroresXMLComponent } from './Reportes/errores-xml/errores-xml.component';

@NgModule({
  declarations: [
    AppComponent,
    TablaSimbolosComponent,
    ErroresXMLComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
