import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PrincipalComponent} from './principal/principal.component'
import {TablaSimbolosComponent} from './tabla-simbolos/tabla-simbolos.component'
import { CstascendenteComponent } from './cstascendente/cstascendente.component';
import { ASTXPathComponent } from './astxpath/astxpath.component';
import {ErroresComponent} from './errores/errores.component';
import { ReporteGramaticalComponent } from './reporte-gramatical/reporte-gramatical.component';
const routes: Routes = [
  {
    path:'inicio',
    component: PrincipalComponent
  },
  {
    path:'tablasimbolos',
    component:TablaSimbolosComponent
  },
  {
    path:'cstASC',
    component:CstascendenteComponent
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path:'astASC',
    component:ASTXPathComponent
  },
  {
    path:'errores',
    component:ErroresComponent
  },
  {
    path:'gramatical',
    component:ReporteGramaticalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
