import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-simbolos',
  templateUrl: './tabla-simbolos.component.html',
  styleUrls: ['./tabla-simbolos.component.css']
})
export class TablaSimbolosComponent implements OnInit {

  @Input() tablaSimbolos:any 
            error:any
            ReporteGramatica:any

  constructor() {


      }

  ngOnInit(): void {
  }

}
