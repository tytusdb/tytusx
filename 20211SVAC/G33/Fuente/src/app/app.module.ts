import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReporteService } from './reporte.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './paginas/principal/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { TablaXMLComponent } from './paginas/tabla-xml/tabla-xml.component';
import { MatTableModule } from '@angular/material/table';
import { GraficoComponent } from './paginas/grafico/grafico.component';
import { BnfComponent } from './paginas/bnf/bnf.component';
import { TablaErroresComponent } from './paginas/tabla-errores/tabla-errores.component';
import { TablaXqueryComponent } from './paginas/tabla-xquery/tabla-xquery.component';

@NgModule({
  declarations: [
    AppComponent,
    TablaXMLComponent,
    HomeComponent,
    GraficoComponent,
    BnfComponent,
    TablaErroresComponent,
    TablaXqueryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    CodemirrorModule,
    FormsModule,
    MaterialFileInputModule,
    MatTableModule
  ],
  providers: [
    ReporteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
