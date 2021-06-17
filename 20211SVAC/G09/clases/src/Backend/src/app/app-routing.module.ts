import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from "./components/editor/editor.component";
import { ArbolAstComponent } from 'src/app/components/arbol-ast/arbol-ast.component'
import { TablaSimbolosComponent } from 'src/app/components/tabla-simbolos/tabla-simbolos.component'
import { TablaErroresComponent } from 'src/app/components/tabla-errores/tabla-errores.component'

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    children: [
      {path: 'arbolAst', component: ArbolAstComponent},
      {path: 'tablaDeSimbolos', component:TablaSimbolosComponent},
      {path: 'tablaDeErrores', component: TablaErroresComponent},
    ]
  }
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
