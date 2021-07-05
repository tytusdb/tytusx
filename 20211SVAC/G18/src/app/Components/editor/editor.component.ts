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
import { Function } from './parser/Instruction/Function';

declare var require: any;
const parserXMLASC = require('./parser/Grammar/XmlGrammarASC.js');
const parserXMLDESC = require('./parser/Grammar/XmlGrammarDESC.js');
const xPathASC = require('./parser/Grammar/xPathAsc.js');
const xPathDESC = require('./parser/Grammar/xPathDesc.js');
const xQuery = require('./parser/Grammar/xQuery.js');
const optimizer = require('./parser/Grammar/OptGrammar');
const xQueryTrad = require('./parser/Grammar/xQueryTrad.js');

import { EnvironmentXML } from './parser/Symbol/EnviromentXML';
import { EjecutorXML } from './ejecutor/ejecutorXML';
import { EjecutorXPath } from './ejecutor/ejecutorXPath';
import { _Optimizer } from './parser/Optimizer/Optimizer';
import { Rule } from './parser/Optimizer/Rule';
import { environment } from 'src/environments/environment';
import { TraductorXQuery } from './traductor/traductorXQuery';
import { EnvironmentXQuery } from './parser/Symbol/EnviromentXQueryTrad';

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
  entradaXpath = 'let $x := /helloworld';
  salida = 'TytusX Output: \n\n';
  ast: any;
  env: Environment;
  flag: boolean;
  envXML = new EnvironmentXML('global');
  envXQuery = new EnvironmentXQuery('global', null);
  reglas: Array<Rule>;

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
    this.salida += 'float HeapXML[100000];\n';
    this.salida += 'float StackXML[100000]; \n';

    this.salida += 'float HeapXPath[100000];\n';
    this.salida += 'float StackXPath[100000]; \n';

    this.salida += 'float HeapXQuery[100000];\n';
    this.salida += 'float StackXQuery[100000]; \n';

    this.salida += 'float pxml; \n';
    this.salida += 'float hxml; \n';

    this.salida += 'float pxpath; \n';
    this.salida += 'float hxpath; \n';

    this.salida += 'float pxquery; \n';
    this.salida += 'float hxquery; \n';

    this.translateXML();

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

  translateXML() {
    let table = this.envXML.getTablaSimbolos();
    let result = 'void cargaXML(){\n';
    result += 'pxml = 0;\nhxml = 0;\n\n';
    let tempc = _Console.count;
    let temph = _Console.heapPointer;
    let temps = _Console.stackPointer;
    var c = (_Console.count = 0);
    var h = (_Console.heapPointer = 0);
    var s = (_Console.stackPointer = 0);

    table.forEach((element) => {
      // console.log(element);
      if (element.tipo === 0) {
        //atributo
        result += `// atributo (etiqueta: ${element.ambito}): ${element.nombre} = "${element.valor}"\n`;
      } else {
        //valor
        result += `// contenido (etiqueta: ${element.ambito}): ${element.valor}\n`;
      }
      result += `t${c} = hxml;\n`;
      c++;
      for (var x = 0; x < element.valor.length; x++) {
        var char = element.valor.charCodeAt(x);
        result += `HeapXML[(int)hxml] = ${char};\n`;
        result += `hxml = hxml + 1;\n`;
        h++;
      }
      result += `HeapXML[(int)hxml] = -1;\n`;
      result += `hxml = hxml + 1;\n`;
      result += `StackXML[(int)pxml] = t${c - 1};\n\n`;
      result += 'pxml = pxml + 1;\n';
      element.posicion = s;
      s++;
    });
    result += '}\n\n';
    _Console.salida = result;
    _Console.count = c > tempc ? c : tempc;
    _Console.heapPointer = h;
    _Console.stackPointer = s;
  }

  translate() {
    this.ejecutarXmlAsc(); // traducir xml primero
    try {
      let salida = '';
      if (errores.length == 0) {
        // Muestra el resultado en la pagina
        salida += '//main\n';
        salida += 'pxpath=0;\n';
        salida += 'hxpath=0;\n';
        salida += 'pxquery=0;\n';
        salida += 'hxquery=0;\n';
        salida += 'cargaXML();\n\n';
        this.ast = xQueryTrad.parse(this.entradaXpath.toString());
        let traductor = new TraductorXQuery();
        this.envXQuery = new EnvironmentXQuery('global', null);
        let trad = traductor.traducir(this.ast, this.envXML, this.envXQuery);
        salida += trad.salida;
        _Console.count = trad.count;
        _Console.labels = trad.labels;
        this.cOutput(salida);
      } else {
        errores.forEach((error) => {
          this.salida +=
            'Error ' +
            error.getTipo() +
            ' (linea: ' +
            error.getLinea() +
            ', columna: ' +
            error.getColumna() +
            '): ' +
            error.getDescripcion() +
            '.  \n';
        });
      }
    } catch (e) {
      console.error(e);
    }
    this.flag = false;
  }

  ejecutarXQuery() {
    this.ejecutarXmlAsc();
    this.clean();
    try {
      let queryTree = xQuery.parse(this.entradaXpath.toString());
      let queryEnv = new Environment(null, this.envXML);
      console.log('------------TREE------------');
      console.log(queryTree);
      // Saving functions in table
      for (const instr of queryTree) {
        try {
          if (instr instanceof Function) {
            // console.log('instace of function');
            instr.execute(queryEnv);
          }
        } catch (error) {
          console.log(error);
        }
      }
      // Executing Instructions Not Functions
      for (const instr of queryTree) {
        if (instr instanceof Function) continue;
        try {
          // console.log('instace of instruction');
          instr.execute(queryEnv);
        } catch (error) {
          console.log(error);
        }
      }
      if (errores.length == 0) {
        // Muestra el resultado en la pagina
        this.salida += _Console.salida;
        console.log(_Console.symbols);
        console.log(_Console.salida);
      } else {
        errores.forEach((error) => {
          this.salida +=
            'Error ' +
            error.getTipo() +
            ' (linea: ' +
            error.getLinea() +
            ', columna: ' +
            error.getColumna() +
            '): ' +
            error.getDescripcion() +
            '.  \n';
        });
      }
    } catch (e) {
      console.error(e);
    }
    this.flag = false;
  }

  ejecutarXmlAsc() {
    this.clean();
    try {
      this.ast = parserXMLASC.parse(this.entradaXml.toString());
      this.envXML = new EnvironmentXML('global');
      let ejecutor = new EjecutorXML();
      ejecutor.ejecutar(this.ast, this.envXML);
      this.envXML.printEntornos();
    } catch (e) {
      console.error(e.message);
    }
    this.flag = false;
  }

  ejecutarXmlDesc() {
    this.clean();
    try {
      this.ast = parserXMLDESC.parse(this.entradaXml.toString());
      this.envXML = new EnvironmentXML('global');
      let ejecutor = new EjecutorXML();
      ejecutor.ejecutar(this.ast, this.envXML);
      this.envXML.printEntornos();
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
      let newEnv = new Environment(null, this.envXML);
      // se pasa el env xml
      let ejecutor = new EjecutorXPath(newEnv);
      ejecutor.ejecutar(queryTree);
      let envXPath = ejecutor.getEntorno();
      this.salida = 'TytusX Output: \n\n' + _Console.salida;
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
      let newEnv = new Environment(null, this.envXML);
      // se pasa el env xml
      let ejecutor = new EjecutorXPath(newEnv);
      ejecutor.ejecutar(queryTree);
      let envXPath = ejecutor.getEntorno();
      this.salida = 'TytusX Output: \n\n' + _Console.salida;
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

  xQueryTokenTable() {
    if (this.flag) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se ha analizado el codigo aun',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else if (this.envXQuery.getTablaSimbolos().length == 0) {
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
        html: new Table().xmlTable(this.envXQuery.getTablaSimbolos()),
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
        width: 800,
      });
    }
  }

  optTable() {
    if (this.reglas == undefined) {
      Swal.fire({
        title: 'Oops...',
        text: 'No se ha analizado el codigo aun',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: 'rgb(8, 101, 104)',
        background: 'black',
      });
    } else if (this.reglas.length == 0) {
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
        html: new Table().rules(this.reglas),
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

  optimizar() {
    // Regla 1

    let c_code_tree = optimizer.parse(this.entradaXml);
    console.log(c_code_tree);
    let env = new _Optimizer();
    try {
      for (const instr of c_code_tree[1]) {
        instr.regla1(env);
      }
    } catch (e) {
      console.log(e);
    }

    // Regla 3

    this.cOutput(env.salida);
    this.ast = optimizer.parse(this.salida);
    let c_rules = env.reglas;
    env = new _Optimizer();
    env.reglas = c_rules;
    try {
      for (const instr of this.ast[1]) {
        instr.regla3(env);
      }
    } catch (e) {
      console.log(e);
    }

    // Regla 4
    this.cOutput(env.salida);
    this.ast = optimizer.parse(this.salida);
    c_rules = env.reglas;
    env = new _Optimizer();
    env.reglas = c_rules;
    try {
      for (const instr of this.ast[1]) {
        instr.regla4(env);
      }
    } catch (e) {
      console.log(e);
    }

    // Regla 2

    this.cOutput(env.salida);
    this.ast = optimizer.parse(this.salida);
    c_rules = env.reglas;
    env = new _Optimizer();
    env.reglas = c_rules;
    try {
      for (const instr of this.ast[1]) {
        instr.regla2(env);
      }
    } catch (e) {
      console.log(e);
    }

    // Regla 5

    this.cOutput(env.salida);
    this.ast = optimizer.parse(this.salida);
    c_rules = env.reglas;
    env = new _Optimizer();
    env.reglas = c_rules;
    try {
      for (const instr of this.ast[1]) {
        instr.regla5(env);
      }
    } catch (e) {
      console.log(e);
    }
    c_rules = env.reglas;

    // Restantes

    this.cOutput(env.salida);
    this.ast = optimizer.parse(this.salida);
    c_rules = env.reglas;
    env = new _Optimizer();
    env.reglas = c_rules;
    try {
      for (const instr of this.ast[1]) {
        instr.optimize(env);
      }
    } catch (e) {
      console.log(e);
    }
    c_rules = env.reglas;

    Swal.fire({
      title: 'Cool!',
      text: 'Su codigo intermedio se ha optimizado correctamente...',
      icon: 'success',
      confirmButtonText: 'Entendido',
      confirmButtonColor: 'rgb(8, 101, 104)',
      background: 'black',
    }).then(() => {
      this.reglas = env.reglas;
      this.cOutput(env.salida);
    });
  }
}
