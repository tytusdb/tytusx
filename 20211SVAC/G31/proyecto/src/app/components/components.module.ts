import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { XmlEditorComponent } from './xml-editor/xml-editor.component';
import { QueryEditorComponent } from './query-editor/query-editor.component';
import { ConsolaComponent } from './consola/consola.component';
import { AstComponent } from './ast/ast.component';
import { ErroresComponent } from './errores/errores.component';
import { SimbolosComponent } from './simbolos/simbolos.component';
import { CstComponent } from './cst/cst.component';
import { ReporteGramaticalComponent } from './reporte-gramatical/reporte-gramatical.component';


@NgModule({
  declarations: [
    XmlEditorComponent,
    QueryEditorComponent,
    ConsolaComponent,
    AstComponent,
    CstComponent,
    ErroresComponent,
    SimbolosComponent,
    ReporteGramaticalComponent
  ],
  exports: [
    XmlEditorComponent,
    QueryEditorComponent,
    ConsolaComponent,
    AstComponent,
    CstComponent,
    ErroresComponent,
    SimbolosComponent,
    ReporteGramaticalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    CodemirrorModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSnackBarModule
  ]
})
export class ComponentsModule { }
