import { Component, ViewEncapsulation } from '@angular/core';
// Imports para el parser
import { Environment } from './parser/Symbol/Environment';
import { _Console } from './parser/Util/Salida';
// Imports para los reportes
import { Plotter } from './parser/Report/plotter';
import { Table } from './parser/Report/Table';
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';
// Import para el servicio
import { DotService } from '../../services/dot.service';
// Import para las alertas
import Swal from 'sweetalert2';
// Imports para los iconos
import {
  faCoffee,
  faPencilRuler,
  faGlobe,
  faFileAlt,
  faLanguage,
  faEraser,
  faSpinner,
  faList,
  faFile,
  faExternalLinkAlt,
  faFileDownload,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

import { errores } from './parser/Errores';
import { reglas } from './parser/Reglas';

import { _Optimizer } from './parser/Optimizer/Optimizer';
import { Rule } from './parser/Optimizer/Rule';

declare var require: any;
const parserXMLASC = require('./parser/Grammar/XmlGrammarASC.js');
const parserXMLDESC = require('./parser/Grammar/XmlGrammarDESC.js');
const xPathASC = require('./parser/Grammar/xPathAsc.js');
const xPathDESC = require('./parser/Grammar/xPathDesc.js');

import { EnvironmentXML } from './parser/Symbol/EnviromentXML';
import { EjecutorXML } from './ejecutor/ejecutorXML';
import { EjecutorXPath } from './ejecutor/ejecutorXPath';
import { Error_ } from './parser/Error';

@Component({
  selector: 'editor-root',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent {
  // Variables
  title = 'Compi2_Junio';
  entradaXml = '<helloworld>\n</helloworld>';
  entradaXpath = '/helloworld';
  salida = 'TytusX Output: \n\n';
  ast: any;
  reglas_: Array<Rule>;
  env: Environment;
  flag: boolean;
  envXML = new EnvironmentXML('global');

  // Iconos
  faSpinner = faSpinner;
  faCoffee = faCoffee;
  faPencilRuler = faPencilRuler;
  faGlobe = faGlobe;
  faFileAlt = faFileAlt;
  faLanguage = faLanguage;
  faEraser = faEraser;
  faList = faList;
  faFile = faFile;
  faExternalLinkAlt = faExternalLinkAlt;
  faFileDownload = faFileDownload;
  faPlay = faPlay;

  constructor(private dotService: DotService) {}
  ngOnInit() {
    this.clean();
  }

  clean() {
    this.ast = null;
    this.env = null;
    this.salida = '[Grupo18_TitusX]Output: \n\n';
    _Console.salida = '';
    _Console.count = 0;
    _Console.labels = 0;
    _Console.stackPointer = 0;
    _Console.heapPointer = 0;
    _Console.symbols = new Map();
    errores.length = 0;
    this.flag = true;
  }

  cOutput(body: string) {
    // Muestra el encabezado
    this.salida = '#include <stdio.h> \n\n';
    this.salida += 'float Heap[16384];\n';
    this.salida += 'float Stack[16384]; \n';
    this.salida += 'float p; \n';
    this.salida += 'float h; \n';
    this.salida += 'float ';
    for (let index = 0; index < _Console.count; index++) {
      if (index > 0 && index % 8 == 0) {
        this.salida = this.salida.substring(0, this.salida.length - 2);
        this.salida += ';\nfloat ';
      }
      this.salida += 't' + index + ', ';
    }
    this.salida =
      _Console.count != 0
        ? this.salida.substring(0, this.salida.length - 2)
        : this.salida + 't0';
    this.salida += ';\n\n';
    this.salida += _Console.salida;
    this.salida += 'void main() {\n';
    this.salida += body;
    this.salida += '\nreturn;\n';
    this.salida += '}\n\n';
  }

  ejecutarXmlAsc() {
    this.clean();
    try {
      this.ast = parserXMLASC.parse(this.entradaXml.toString());
      // console.log(this.ast);
      // console.log('ejecutando');
      this.envXML = new EnvironmentXML('global');
      let ejecutor = new EjecutorXML();
      ejecutor.ejecutar(this.ast, this.envXML);
      this.envXML.printEntornos();
      // console.log(this.envXML.getTablaSimbolos());
    } catch (e) {
      console.error(e.message);
    }
    this.flag = false;
  }

  ejecutarXmlDesc() {
    this.clean();
    try {
      this.ast = parserXMLDESC.parse(this.entradaXml.toString());
      // console.log(this.ast);
      // console.log('ejecutando');
      this.envXML = new EnvironmentXML('global');
      let ejecutor = new EjecutorXML();
      ejecutor.ejecutar(this.ast, this.envXML);
      this.envXML.printEntornos();
      // console.log(this.envXML.getTablaSimbolos());
    } catch (e) {
      console.error(e.message);
    }
    this.flag = false;
  }

  ejecutarXPathAsc() {
    if (this.ast == null) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se ha analizado el codigo aun',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
      return;
    }
    this.clean();
    try {
      let queryTree = xPathASC.parse(this.entradaXpath.toString());
      // se pasa el env xml
      let ejecutor = new EjecutorXPath(this.envXML);
      ejecutor.ejecutar(queryTree);
      let envXPath = ejecutor.getEntorno();
      this.salida = 'TytusX Output: \n\n' + _Console.salida;
      // console.log("--- Imprimiendo Entorno de Consultas ---");
      // console.log(envXPath);
      // console.log("------");
      this.ast = queryTree;
    } catch (e) {
      console.error(e);
    }
    this.flag = false;
  }

  ejecutarXPathDesc() {
    if (this.ast == null) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se ha analizado el codigo aun',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
      return;
    }
    this.clean();
    try {
      let queryTree = xPathDESC.parse(this.entradaXpath.toString());
      // se pasa el env xml
      let ejecutor = new EjecutorXPath(this.envXML);
      ejecutor.ejecutar(queryTree);
      let envXPath = ejecutor.getEntorno();
      this.salida = 'TytusX Output: \n\n' + _Console.salida;
      // console.log("--- Imprimiendo Entorno de Consultas ---");
      // console.log(envXPath);
      // console.log("------");
      this.ast = queryTree;
    } catch (e) {
      console.error(e);
    }
    this.flag = false;
  }

  printAST() {
    if (this.flag) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se ha analizado el codigo aun',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else if (errores.length != 0) {
      Swal.fire({
        title: 'Oops...!',
        text: 'Se encontraron errores en su codigo, no puede graficar',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else {
      let dot = new Plotter().makeDotAST(this.ast);
      let viz = new Viz({ Module, render });
      viz
        .renderSVGElement(dot)
        .then(function (element) {
          document.getElementById('reporteAST').innerHTML = '';
          document.getElementById('reporteAST').appendChild(element);
        })
        .catch((error) => {
          viz = new Viz({ Module, render });
          console.error(error);
        });

      return;
    }
  }

  printCST() {
    if (this.flag) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se ha analizado el codigo aun',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else if (errores.length != 0) {
      Swal.fire({
        title: 'Oops...!',
        text: 'Se encontraron errores en su codigo, no puede graficar',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else {
      let dot = new Plotter().makeDotCST(this.ast);
      let viz = new Viz({ Module, render });
      viz
        .renderSVGElement(dot)
        .then(function (element) {
          document.getElementById('reporteCST').innerHTML = '';
          document.getElementById('reporteCST').appendChild(element);
        })
        .catch((error) => {
          viz = new Viz({ Module, render });
          console.error(error);
        });

      return;
    }
  }

  printArbolXML() {
    if (this.flag) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se ha analizado el codigo aun',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else if (errores.length != 0) {
      Swal.fire({
        title: 'Oops...!',
        text: 'Se encontraron errores en su codigo, no puede graficar',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else {
      let dot = new Plotter().makeDotXML(this.envXML);
      let viz = new Viz({ Module, render });
      viz
        .renderSVGElement(dot)
        .then(function (element) {
          document.getElementById('reporteXML').innerHTML = '';
          document.getElementById('reporteXML').appendChild(element);
        })
        .catch((error) => {
          viz = new Viz({ Module, render });
          console.error(error);
        });

      return;
    }
  }

  tokenTable() {
    if (this.flag) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se ha analizado el codigo aun',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else if (_Console.symbols.size == 0) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se encontro ninguna variable o funcion guardada',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else if (errores.length != 0) {
      Swal.fire({
        title: 'Oops...!',
        text: 'Se encontraron errores en su codigo, no puede mostrar tabla de variables',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else {
      Swal.fire({
        title: 'Tabla de Simbolos',
        html: new Table().symbols(_Console.symbols),
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
        width: 800,
      });
    }
  }

  xmlTokenTable() {
    if (this.flag) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se ha analizado el codigo aun',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else if (this.envXML.getTablaSimbolos().length == 0) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se encontro ninguna variable o funcion guardada',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else if (errores.length != 0) {
      Swal.fire({
        title: 'Oops...!',
        text: 'Se encontraron errores en su codigo, no puede mostrar tabla de variables',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else {
      Swal.fire({
        title: 'Tabla de Simbolos',
        html: new Table().xmlTable(this.envXML.getTablaSimbolos()),
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
        width: 800,
      });
    }
  }

  optTable() {
    if (this.reglas_ == undefined) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se ha analizado el codigo aun',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else if (this.reglas_.length == 0) {
      Swal.fire({
        title: 'Cool!',
        text: 'No se encontraron optimizaciones en su codigo',
        icon: 'success',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else {
      Swal.fire({
        title: 'Tabla de Reglas',
        html: new Table().rules(this.reglas_),
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
        width: 800,
      });
    }
  }

  errorTable() {
    if (this.flag) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se ha analizado el codigo aun',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else if (errores.length == 0) {
      Swal.fire({
        title: 'Cool!',
        text: 'No se encontraron errores en su codigo',
        icon: 'success',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else {
      Swal.fire({
        title: 'Tabla de Errores',
        html: new Table().errors(errores),
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
        width: 800,
      });
    }
  }

  RGTable() {
    if (this.flag) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se ha analizado el codigo aun',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else if (reglas.length == 0) {
      Swal.fire({
        title: 'Oops!',
        text: 'No se entro a ninguna regla gramatical',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else {
      Swal.fire({
        title: 'Reporte Gramatical',
        html: new Table().reglas(reglas),
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
        width: 800,
      });
    }
  }

  newXML() {
    //New File
    this.entradaXml = '';
  }

  newXPath() {
    //New File
    this.entradaXpath = '';
  }

  openXML() {
    //Open file
    let fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.onchange = (e) => {
      let file = fileSelector.files[0];
      if (!file) return false;
      let reader = new FileReader();
      reader.addEventListener('load', (event) => {
        this.entradaXml = event.target.result.toString();
      });
      reader.readAsText(file);
    };

    fileSelector.click();
    return false;
  }

  openXPath() {
    //Open file
    let fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.onchange = (e) => {
      let file = fileSelector.files[0];
      if (!file) return false;
      let reader = new FileReader();
      reader.addEventListener('load', (event) => {
        this.entradaXpath = event.target.result.toString();
      });
      reader.readAsText(file);
    };

    fileSelector.click();
    return false;
  }

  saveXML() {
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(this.entradaXml)
    );
    element.setAttribute('download', 'Compi2.xml');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  saveXPath() {
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(this.entradaXpath)
    );
    element.setAttribute('download', 'Compi2.xpath');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  clearConsole() {
    this.salida = '[Grupo18_TitusX]Output: \n\n';
  }

  executeOpt(entrada: string) {
    // try {
    //   this.ast = optimizer.parse(entrada);
    //   let env = new _Optimizer();
    //   try {
    //     for (const instr of this.ast[0]) {
    //       instr.regla1(env);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   this.cOutput(env.salida);
    //   this.ast = optimizer.parse(this.salida);
    //   this.reglas = env.reglas;
    //   env = new _Optimizer();
    //   env.reglas = this.reglas;
    //   try {
    //     for (const instr of this.ast[0]) {
    //       instr.regla2(env);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   this.cOutput(env.salida);
    //   this.ast = optimizer.parse(this.salida);
    //   this.reglas = env.reglas;
    //   env = new _Optimizer();
    //   env.reglas = this.reglas;
    //   try {
    //     for (const instr of this.ast[0]) {
    //       instr.regla3(env);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   this.cOutput(env.salida);
    //   this.ast = optimizer.parse(this.salida);
    //   this.reglas = env.reglas;
    //   env = new _Optimizer();
    //   env.reglas = this.reglas;
    //   try {
    //     for (const instr of this.ast[0]) {
    //       instr.regla4(env);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   this.cOutput(env.salida);
    //   this.ast = optimizer.parse(this.salida);
    //   this.reglas = env.reglas;
    //   env = new _Optimizer();
    //   env.reglas = this.reglas;
    //   try {
    //     for (const instr of this.ast[0]) {
    //       instr.regla5(env);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   this.reglas = env.reglas;
    //   Swal.fire({
    //     title: 'Cool!',
    //     text: 'Su codigo intermedio se ha optimizado correctamente...',
    //     icon: 'success',
    //     confirmButtonText: 'Entendido',
    //     confirmButtonColor: 'rgb(8, 101, 104)',
    //     background: 'black',
    //   }).then(() => {
    //     this.cOutput(env.salida);
    //   });
    // } catch (e) {
    //   console.log(e);
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'Ocurrieron errores en la optimizacion...',
    //     icon: 'error',
    //     confirmButtonText: 'Entendido',
    //     confirmButtonColor: 'rgb(8, 101, 104)',
    //     background: 'black',
    //   });
    // }
  }

  optimizar() {
    // Swal.fire({
    //   title: 'En donde se encuentra el codigo a optimizar?',
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: `Entrada`,
    //   denyButtonText: `Salida`,
    //   confirmButtonColor: 'rgb(8, 101, 104)',
    //   background: 'black',
    //   icon: 'info',
    // }).then((result) => {
    //   if (result.isConfirmed) this.executeOpt(this.entrada.toString());
    //   else if (result.isDenied) this.executeOpt(this.salida.toString());
    // });
  }

  ejecutar() {
    // this.clean();
    // try {
    //   this.ast = parserXML.parse(this.entradaXml.toString());
    //   console.log(this.ast);
    // } catch (e) {
    //   console.error(e.message);
    // }
    // this.flag = false;
    // try {
    //   this.ast = parserXML.parse(this.entradaXml.toString());
    //   console.log(this.ast);
    // } catch (e) {
    //   console.error(e.message);
    // }
    // this.flag = false;
    // try {
    //   this.ast = parser.parse(this.entradaXml.toString());
    //   this.env = new Environment(null);
    //   for (const instr of this.ast) {
    //     try {
    //       if (instr instanceof Function) instr.execute(this.env);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   for (const instr of this.ast) {
    //     if (instr instanceof Function || isString(instr)) continue;
    //     try {
    //       instr.execute(this.env);
    //       // TODO validar return break continue fuera de ciclos
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   if (errores.length == 0) {
    //     // Muestra el resultado en la pagina
    //     this.salida += _Console.salida;
    //   } else {
    //     if (errores.length != 0) {
    //       errores.forEach((error) => {
    //         this.salida +=
    //           'Error ' +
    //           error.getTipo() +
    //           ' (linea: ' +
    //           error.getLinea() +
    //           ', columna: ' +
    //           error.getColumna() +
    //           '): ' +
    //           error.getDescripcion() +
    //           '.  \n';
    //       });
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // this.flag = false;
  }

  translate() {
    // this.clean();
    // try {
    //   this.ast = parser.parse(this.entrada.toString());
    //   this.env = new Environment(null);
    //   this.salida = '';
    //   try {
    //     for (const instr of this.ast) {
    //       this.salida += instr.translate(this.env);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   if (errores.length == 0) {
    //     this.cOutput(this.salida);
    //   } else {
    //     if (errores.length != 0) {
    //       errores.forEach((error) => {
    //         this.salida +=
    //           'Error ' +
    //           error.getTipo() +
    //           ' (linea: ' +
    //           error.getLinea() +
    //           ', columna: ' +
    //           error.getColumna() +
    //           '): ' +
    //           error.getDescripcion() +
    //           '.  \n';
    //       });
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // this.flag = false;
    // _Console.showSystem();
  }
}
