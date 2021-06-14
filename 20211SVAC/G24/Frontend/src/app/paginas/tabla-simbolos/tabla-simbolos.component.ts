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
    let info = window.localStorage.getItem('simbolos');
    let otro = JSON.parse(info);
    this.dataSource = otro;
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
