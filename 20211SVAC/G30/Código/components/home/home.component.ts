import { Component, OnInit } from '@angular/core';

// XML STUFFS
import { parser } from '../../utils/gramaticaXML/xmlGrammar.js';
import { Paquete } from "src/app/models/CST/paquete.model";
import { NodoCST } from 'src/app/models/CST/nodoCST.model';

//XPATH STUFFS
import { parser as parser2 } from '../../utils/gramaticaXPath/xpathGrammar.js';
import { Paquete as Paquete2 } from '../../models/reportes.model';
import { Token } from 'src/app/models/token.model';
import { NodoFinal }from 'src/app/models/AST/nodoAST.model';

//BOTH OF THEM
import { Excepcion } from 'src/app/models/excepcion.model';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public contentXML: string;
  public contentXPATH: string;
  public consoleOutput: string;
  private file!: File;
  
  //XML
  public resAnalisisXML: Paquete;
  public autoResize: boolean;
  public exceptions: Array<Excepcion>;
  public chartOption: any;

  //XPATH
  public resultadoAnalisisXPath: Paquete2;
  public exceptions2: Array<Excepcion>;
  public chartOption2: any;
  public autoResize2: boolean;

  //BOTH OF THEM
  public erroresXPath: string;
  public erroresXML: string;
  public simbolosXPath: string;
  public simbolosXML: string;
  

  constructor() { 
    this.contentXML = '';
    this.contentXPATH = '';
    this.consoleOutput = '';
    
    //XML
    this.resAnalisisXML = new Paquete([], new NodoCST('INICIO', []), "", "", "");
    this.autoResize = true;
    this.exceptions = [];
    this.exceptions2 = [];
    this.setChartOption({});
    
    //XPATH
    this.resultadoAnalisisXPath = new Paquete2([], [],new NodoFinal('INICIO', []), '');
    this.autoResize2 = true;
    this.setChartOption2({});

    //BOTH OF THEM
    this.erroresXML = '';
    this.erroresXPath = '';
    this.simbolosXML = '';
    this.simbolosXPath = '';

   }

   

  ngOnInit(): void {
  }

  // el num es true si es el reporte de errores xml, y false si es el reporte de errores de xpath
  public createErrorReports(arreglo: Array<Excepcion>, num:boolean):void {

    //console.log("Generando Reporte Errores")

    let a = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    }
    </style>
    </head>
    <body>
    
    <h2>Reporte de Errores</h2>
    
    <table style="width:100%">
      <tr>
        <th>Tipo</th>
        <th>Descripción</th> 
        <th>Fila</th>
        <th>Columna</th>
      </tr>`;


    for (var index in arreglo){

      a += "<tr><td>" + arreglo[index].sTipo + "</td>";
      a += "<td>" + arreglo[index].sDescripcion + "</td>";
      a += "<td>" + arreglo[index].sFila + "</td>";
      a += "<td>" + arreglo[index].sColumna + "</td></tr>";

    }

    a += `</table>
    
    </body>
    </html>`;

    if (num) {

      this.erroresXML = a;
      console.log(this.erroresXML);
      
    } else {

      this.erroresXPath = a;
      console.log(this.erroresXPath);
      
    }

  }

  // el num es true si es la tabla de símbolos xml, y false si es la tabla de símbolos de xpath
  public hacerTablaSimbolos(arreglo: Array<Token>, num:boolean):void {

    let a = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    }
    </style>
    </head>
    <body>
    
    <h2>Tabla de Símbolos</h2>
    
    <table style="width:100%">
      <tr>
        <th>Tipo</th>
        <th>Valor</th> 
        <th>Fila</th>
        <th>Columna</th>
       </tr>`;

    for (var index in arreglo){

        a += "<tr><td>" + arreglo[index].sTipo + "</td>";
        a += "<td>" + arreglo[index].sValorToken + "</td>";
        a += "<td>" + arreglo[index].sFila + "</td>";
        a += "<td>" + arreglo[index].sColumna + "</td></tr>";
  
      }
  
      a += `</table>
      
      </body>
      </html>`;

      if (num) {

        this.simbolosXML = a;
        console.log(this.simbolosXML);
        
      } else {
  
        this.simbolosXPath = a;
        console.log(this.simbolosXPath);
        
      }

  }

  public executeXML(): void {
    this.erroresXML = '';
    this.simbolosXML = '';
    this.resAnalisisXML = parser.parse(this.contentXML);
    console.log(this.resAnalisisXML);

    this.exceptions = this.resAnalisisXML.getErrores();
    this.setChartOption(this.resAnalisisXML.getArbol());
    this.consoleOutput = this.resAnalisisXML.getGramaticaRecorrida();
    
    console.log(this.resAnalisisXML.getXmlVersion());
    console.log(this.resAnalisisXML.getXmlEncoding());
  }
  
  public executeXPATH(): void {
    console.log(this.contentXPATH);
    this.erroresXPath = '';
    this.simbolosXPath = '';

    this.resultadoAnalisisXPath = parser2.parse(this.contentXPATH);
    this.exceptions2 = this.resultadoAnalisisXPath.getErrores();
    this.setChartOption2(this.resultadoAnalisisXPath.getArbolAST())

  }

  //#region FUNCIONES BÁSICAS
  public cleanXmlEditor():void {
    this.contentXML = '';
    this.simbolosXML = '';
}
  public cleanXpathEditor(): void {
    this.contentXPATH = '';
    this.erroresXPath = '';
    this.simbolosXPath = '';
  }

  public uploadXmlFile(event: any): void {
    this.file = event.target.files[0];
    this.uploadXmlEditor();
  }
  private uploadXmlEditor(): void {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result != null) {
          this.contentXML = fileReader.result.toString();
      }
    }
    fileReader.readAsText(this.file);
  }
  public uploadXpathFile(event: any): void {
    this.file = event.target.files[0];
    this.uploadXpathEditor();
  }
  private uploadXpathEditor(): void {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result != null) {
          this.contentXPATH = fileReader.result.toString();
      }
    }
    fileReader.readAsText(this.file);
  }
  //#endregion FUNCIONES BÁSICAS

  public downloadXmlFile(): void{}
  public downloadXpathFile(): void{}

  public setChartOption(data: Object){
    console.log(data);
    this.chartOption = {
      backgroundColor: 'black',
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: [
        {
          type: 'tree',
          data: [data],
          orient: 'vertical',
          top: '3%',
          bottom: '3%',
          left: '5%',
          right: '5%',
          symbolSize: 12,
          symbol: 'circle',
          roam: true,
          initialTreeDepth: 25,
          emphasis: {
            focus: 'descendant'
          },
          label: {
            position: 'top',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 14,
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
            },
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    };
  }
  public setChartOption2(data: Object){
    console.log(data);
    this.chartOption = {
      backgroundColor: 'black',
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: [
        {
          type: 'tree',
          data: [data],
          orient: 'vertical',
          top: '3%',
          bottom: '3%',
          left: '5%',
          right: '5%',
          symbolSize: 12,
          symbol: 'circle',
          roam: true,
          initialTreeDepth: 25,
          emphasis: {
            focus: 'descendant'
          },
          label: {
            position: 'top',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 14,
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
            },
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    };
  }

}

