import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-optimizacion',
  templateUrl: './reporte-optimizacion.component.html',
  styleUrls: ['./reporte-optimizacion.component.css']
})
export class ReporteOptimizacionComponent implements OnInit {

  displayedColumns: string[] = [
    'TIPO OPTIMIZACION',
    'REGLA',
    'CODIGO ELIMINADO',
    'CODIGO AGREGADO',
    'LINEA',
    'COLUMNA'
  ];
  dataSource = '';
  constructor() { }
  ngOnInit(): void {

    let info = window.localStorage.getItem('optimo');
    let otro = JSON.parse(info);
    this.dataSource = otro;
  }
}
