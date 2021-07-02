import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ErroresComponent } from './paginas/errores/errores.component';
import { TablaSimbolosComponent } from './paginas/tabla-simbolos/tabla-simbolos.component';
import { ArbolASTComponent } from './paginas/arbol-ast/arbol-ast.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SideBarComponent } from './componentes/side-bar/side-bar.component';
import { TabsinicioComponent } from './componentes/tabsinicio/tabsinicio.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ContenidoInicioComponent } from './componentes/contenido-inicio/contenido-inicio.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AceEditorComponent } from 'ng2-ace-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { MatDialogModule } from '@angular/material/dialog';
import { GramaticalReportComponent } from './paginas/gramatical-report/gramatical-report.component';
import { AstDescComponent } from './paginas/ast-desc/ast-desc.component';
import { XpathAscAstComponent } from './paginas/xpath-asc-ast/xpath-asc-ast.component';
import { ReporteOptimizacionComponent } from './paginas/reporte-optimizacion/reporte-optimizacion.component';
import { TablasimbolosXqueryComponent } from './paginas/tablasimbolos-xquery/tablasimbolos-xquery.component';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ErroresComponent,
    TablaSimbolosComponent,
    ArbolASTComponent,
    SideBarComponent,
    TabsinicioComponent,
    ContenidoInicioComponent,
    GramaticalReportComponent,
    AstDescComponent,
    XpathAscAstComponent,
    ReporteOptimizacionComponent,
    TablasimbolosXqueryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    CodemirrorModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
