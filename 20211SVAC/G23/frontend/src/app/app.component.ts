import { Component } from '@angular/core';
import { AppService } from './app.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private appService: AppService) { }

  EditorOptions = {
    theme: "vs-dark",
    automaticLayout: true,
    scrollBeyondLastLine: false,
    fontSize: 16,
    minimap: {
      enabled: true
    },
    language: 'xml'
  }

  ConsoleOptions = {
    theme: "vs-dark",
    readOnly: true,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    fontSize: 16,
    minimap: {
      enabled: true
    },
    language: 'xml'
  }

  entrada: string = `
  <?xml version="1.0" encoding="UTF-8"?>
  <bookstore f="false">
  <book>
    <title lang="en">Harry Potter</title>
    <price>29.99</price>
  </book>
  <book>
    <title lang="en">Learning XML</title>
    <price>39.95</price>
  </book>
  <book id="5">
    <title lang="en">Harry Potter</title>
    <price>29.99</price>
  </book>
  
  </bookstore>`;
  consulta: string = '';
  salida: string = '';

  fname: string = '';
  simbolos: any = [];
  errores: any = [];

  newTab() {
    window.open("/tytusx-G23", "_blank");
  }

  closeTab() {
    window.close();
  }

  onSubmit() {
    let grammar_value = (<HTMLSelectElement>document.getElementById('grammar_selector')).value;
    if (this.entrada != "" && this.consulta != "") {
      const x = {
        xml: this.entrada, // documento XML
        query: this.consulta, // consultas
        grammar: Number(grammar_value) // gramática 1=ascendente, 2=descendente
      }
      // llamo a la función compile que devuelve un objeto de retorno
      let data = require('../js/routes/compile').compile(x);
      this.salida = data.output;
      this.errores = data.arreglo_errores;
      this.simbolos = data.arreglo_simbolos;
      console.log('Data received!');
    } else
      alert("Alguna entrada se encuentra vacía. Intente de nuevo.");
  }

  getAST() {
    this.simbolos = [];
    this.errores = [];
    if (this.entrada != "") {
      const x = { "input": this.entrada }
      this.appService.getAST(x).subscribe(
        data => {
          saveAs(data, "AST");
          this.salida = "AST has been generated!";
          console.log('AST received!');
        },
        error => {
          console.log('There was an error :(', error);
          this.salida = "Ocurrió un error al analizar la entrada.\nNo se generó el AST."
        }
      );
    } else
      alert("Entrada vacía. No se puede generar el AST.");
  }

  getCST() {
    this.simbolos = [];
    this.errores = [];
    if (this.entrada != "") {
      const x = { "input": this.entrada }
      this.appService.getCST(x).subscribe(
        data => {
          saveAs(data, "CST");
          this.salida = "CST has been generated!";
          console.log('CST received!');
        },
        error => {
          console.log('There was an error :(', error);
          this.salida = "Ocurrió un error al analizar la entrada.\nNo se generó el CST."
        }
      );
    } else
      alert("Entrada vacía. No se puede generar el CST.");
  }

  getDAG() {
    this.simbolos = [];
    this.errores = [];
    if (this.entrada != "") {
      const x = { "input": this.entrada }
      this.appService.getDAG(x).subscribe(
        data => {
          saveAs(data, "DAG");
          this.salida = "DAG has been generated!";
          console.log('DAG received!');
        },
        error => {
          console.log('There was an error :(', error);
          this.salida = "Ocurrió un error al analizar la entrada.\nNo se generó el DAG."
        }
      );
    } else
      alert("Entrada vacía. No se puede generar el DAG.");
  }


  saveFile(id: number) {
    var f = document.createElement('a');
    let data = "";
    if (id === 1)
      data = this.entrada;
    else
      data = this.consulta;
    f.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    f.setAttribute('download', this.fname ? this.fname.replace("C:\\fakepath\\", "") : (id === 1 ? 'file.xml' : 'file.xpath'));
    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      f.dispatchEvent(event);
    }
    else {
      f.click();
    }
    console.log('File saved!');
  }

  openDialog(id: number) {
    if (id === 1)
      document.getElementById("fileInput1")!.click();
    else
      document.getElementById("fileInput2")!.click();
  }

  readFile(event: any, id: number) {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = () => {
      var text = reader.result;
      if (text) {
        switch (id) {
          case 1:
            this.entrada = String(text);
            break;
          case 2:
            this.consulta = String(text);
            break;
        }
      }
    }
    reader.readAsText(input.files[0]);
    this.salida = '';
    console.log('File opened!')
  }

  cleanEditor(id: number) {
    switch (id) {
      case 1:
        this.entrada = "";
        break;
      case 2:
        this.consulta = "";
        break;
    }
    this.salida = "";
  }

}
