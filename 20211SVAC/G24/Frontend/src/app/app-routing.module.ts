import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbolASTComponent } from './paginas/arbol-ast/arbol-ast.component';
import { ErroresComponent } from './paginas/errores/errores.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { TablaSimbolosComponent } from './paginas/tabla-simbolos/tabla-simbolos.component';
import {ArbolCstComponent} from './paginas/arbol-cst/arbol-cst.component'
import {GramaticalReportComponent} from './paginas/gramatical-report/gramatical-report.component'
import { AstDescComponent } from './paginas/ast-desc/ast-desc.component';
const routes: Routes = [
  { path: 'gramatical', component: GramaticalReportComponent },
 // { path: 'gramatical', component: ErroresComponent },
  { path: 'ast', component: ArbolASTComponent },
  { path: 'ast-desc', component: AstDescComponent },
  { path: 'cst', component: ArbolCstComponent },
  { path: 'errores', component: ErroresComponent },
  { path: 'inicio', component: InicioComponent },
 // { path: 'cst', component: InicioComponent },
  { path: 'simbolos', component: TablaSimbolosComponent },
  { path: '', component: InicioComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
