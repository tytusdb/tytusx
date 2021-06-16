import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Objeto } from 'src/Expresiones/Objeto';

export interface Data {
  Nombre: string;
  Tipo: string;
  Fila: number;
  Columna: number;
  Padre: string;
  TipoEtiqueta: number;
}

@Component({
  selector: 'app-tabla-simbolos',
  templateUrl: './tabla-simbolos.component.html',
  styleUrls: ['./tabla-simbolos.component.css']
})
export class TablaSimbolosComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Objeto[]) {}
  source:Data[] =  [];
  ngOnInit(): void {
    console.log(this.data);
   this.FillData(this.data);
  }

  FillData(data:Objeto[]){
    data.forEach(element => {
      this.source.push({
        Nombre:element.identificador,
        Fila:element.linea,
        Columna:element.columna,
        Padre :element.padre?.identificador,
        Tipo:'Nodo',
        TipoEtiqueta:element.tipo});

        element.listaAtributos.forEach(atr => {
          this.source.push({
            Nombre:atr.identificador,
            Fila:atr.linea,
            Columna:atr.columna,
            Padre :element.padre?.identificador,
            Tipo:'Atributo',
            TipoEtiqueta:null});
        });
        this.FillData(element.listaObjetos);
      });
     
  }
}
