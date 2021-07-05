import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbolASTComponent } from './paginas/arbol-ast/arbol-ast.component';
import { ErroresComponent } from './paginas/errores/errores.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { TablaSimbolosComponent } from './paginas/tabla-simbolos/tabla-simbolos.component';
import {GramaticalReportComponent} from './paginas/gramatical-report/gramatical-report.component'
import { AstDescComponent } from './paginas/ast-desc/ast-desc.component';
import { XpathAscAstComponent } from './paginas/xpath-asc-ast/xpath-asc-ast.component';
import { ReporteOptimizacionComponent } from './paginas/reporte-optimizacion/reporte-optimizacion.component';
import { TablasimbolosXqueryModule } from './paginas/tablasimbolos-xquery/tablasimbolos-xquery.module';

const routes: Routes = [
  { path: 'gramatical', component: GramaticalReportComponent },
 // { path: 'gramatical', component: ErroresComponent },
  { path: 'ast', component: ArbolASTComponent },
  { path: 'ast-desc', component: AstDescComponent },
  { path: 'xpath-ast', component: XpathAscAstComponent },
  { path: 'errores', component: ErroresComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'optimo', component: ReporteOptimizacionComponent },
  { path: 'simbolos', component: TablaSimbolosComponent },
  { path: 'simbolos-xquery', component: TablasimbolosXqueryModule },

  { path: '', component: InicioComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
