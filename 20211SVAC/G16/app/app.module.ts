import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { TablaSimbolosComponent } from './tabla-simbolos/tabla-simbolos.component';
import { CstascendenteComponent } from './cstascendente/cstascendente.component';
import { ToastrModule } from "ngx-toastr";
import { ErroresComponent } from './errores/errores.component';
import { ASTXPathComponent } from './astxpath/astxpath.component';
import { CommonModule } from '@angular/common';
import { ReporteGramaticalComponent } from './reporte-gramatical/reporte-gramatical.component';
import { ReporteOptimizarComponent } from './reporte-optimizar/reporte-optimizar.component';
@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    TablaSimbolosComponent,
    CstascendenteComponent,
    ASTXPathComponent,
    ErroresComponent,
    ReporteGramaticalComponent,
    ReporteOptimizarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodemirrorModule,
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
