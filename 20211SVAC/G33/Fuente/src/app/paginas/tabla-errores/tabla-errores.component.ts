import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-errores',
  templateUrl: './tabla-errores.component.html',
  styleUrls: ['./tabla-errores.component.css']
})
export class TablaErroresComponent implements OnInit {
  displayedColumns: string[] = ['no', 'tipo', 'valor', 'fila', 'columna'];
  simbolos: any;

  constructor() {this.simbolos = localStorage.getItem('errores'); }

  ngOnInit(): void {
    this.simbolos = JSON.parse(this.simbolos);
    console.log(this.simbolos, "vacia?")
  }

}
