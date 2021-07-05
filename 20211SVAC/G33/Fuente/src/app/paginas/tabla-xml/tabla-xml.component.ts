import { Component, OnInit } from '@angular/core';

import { ReporteService } from '../../reporte.service';

@Component({
  selector: 'app-tabla-xml',
  templateUrl: './tabla-xml.component.html',
  styleUrls: ['./tabla-xml.component.css']
})

export class TablaXMLComponent implements OnInit {
  displayedColumns: string[] = ['no', 'nombre', 'tipo', 'valor', 'ambito', 'tipoEtiqueta', 'fila', 'columna'];
  simbolos: any;

constructor(_servicio: ReporteService) {this.simbolos = localStorage.getItem('tablaXML'); }

  ngOnInit(): void {
    this.simbolos = JSON.parse(this.simbolos);
    console.log(this.simbolos, "vacia?")
  }

}
