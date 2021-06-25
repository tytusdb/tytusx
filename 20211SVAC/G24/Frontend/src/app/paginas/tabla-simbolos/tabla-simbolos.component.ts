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
    'AMBITO',
    'CONTENIDO',
    'LINEA',  
    'COLUMNA',
    'POSICION'
  ];
  dataSource = '';
  constructor() {}
  ngOnInit(): void {

    let info = window.localStorage.getItem('symbol');
    let otro = JSON.parse(info);
    this.dataSource = otro;
    console.log("Aqui abajo tabla simbolos")
    console.log(this.dataSource)
  }
}

