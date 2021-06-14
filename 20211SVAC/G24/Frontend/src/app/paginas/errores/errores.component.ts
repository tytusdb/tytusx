import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errores',
  templateUrl: './errores.component.html',
  styleUrls: ['./errores.component.css'],
})
export class ErroresComponent implements OnInit {
  displayedColumns: string[] = ['tipoError', 'Descripcion', 'Linea', 'Columna'];
  dataSource = '';
  constructor() {}

  ngOnInit(): void {
    let info = window.localStorage.getItem('errores');
    let otro = JSON.parse(info);
    this.dataSource = otro;
    console.log(otro);
  }
}
