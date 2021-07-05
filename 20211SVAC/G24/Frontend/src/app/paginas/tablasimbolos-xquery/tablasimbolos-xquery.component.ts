import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tablasimbolos-xquery',
  templateUrl: './tablasimbolos-xquery.component.html',
  styleUrls: ['./tablasimbolos-xquery.component.css']
})
export class TablasimbolosXqueryComponent implements OnInit {
  displayedColumns: string[] = [
    'ID',
    'TIPO',
    'AMBITO',
    'CONTENIDO',
    'LINEA',
    'COLUMNA',
    'POSICION'
  ];
  dataSource = '';
  constructor() { }

  ngOnInit(): void {
    let info = window.localStorage.getItem('symbolXQUERY');
    let otro = JSON.parse(info);
    this.dataSource = otro;
    console.log("Aqui abajo tabla simbolos")
    console.log(this.dataSource)
  }

}
