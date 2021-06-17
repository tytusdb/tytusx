import { Component, OnInit, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Objeto } from 'src/Expresiones/Objeto';
import { Error } from 'src/app/AST/Error';


export interface Data {
  Fila: any;
  Columna: any;
  Tipo: any;
  Descripcion: any;
}


@Component({
  selector: 'app-errores-xml',
  templateUrl: './errores-xml.component.html',
  styleUrls: ['./errores-xml.component.css']
})
export class ErroresXMLComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Error[]) {}
  source:Data[] =  [];
  ngOnInit(): void {
    console.log(this.data);
   this.FillData(this.data);
  }

  FillData(data:Error[]){
    
    data[0].forEach(element => {
    
      this.source.push({        
        Fila:element.fila_,
        Columna:element.columna_,        
        Tipo:element.tipo_,
        Descripcion:element.descripcion_});
        //this.FillData(element.listaObjetos);
      });
     
     
  }

}
