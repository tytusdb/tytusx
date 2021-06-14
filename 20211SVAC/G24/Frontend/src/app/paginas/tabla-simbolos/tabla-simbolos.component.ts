import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-simbolos',
  templateUrl: './tabla-simbolos.component.html',
  styleUrls: ['./tabla-simbolos.component.css'],
})
export class TablaSimbolosComponent implements OnInit {
  displayedColumns: string[] = [
    'ID',
    'TIPO',
    'TIPODATO',
    'ENTORNO',
    'LINEA',
    'COLUMNA',
    'VALOR',
  ];
  dataSource = '';
  constructor() {}
  ngOnInit(): void {
    
  }
}
export interface Simbolos {
  id: string;
  tipo: string;
  tipoDato: string;
  entorno: string;
  linea: string;
  columna: string;
  valor: string;
}
