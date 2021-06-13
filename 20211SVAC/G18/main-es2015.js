(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/Components/ast/ast.component.ts":
/*!*************************************************!*\
  !*** ./src/app/Components/ast/ast.component.ts ***!
  \*************************************************/
/*! exports provided: AstComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AstComponent", function() { return AstComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vis */ "./node_modules/vis/dist/vis.js");
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vis__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_dot_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/dot.service */ "./src/app/services/dot.service.ts");

// Import para las graficas



class AstComponent {
    constructor(dotService) {
        this.dotService = dotService;
    }
    ngOnInit() {
        let dotRes = this.dotService.getDot();
        //alert(dotRes);
        var parsedData = vis__WEBPACK_IMPORTED_MODULE_1__["network"].convertDot(dotRes);
        var data = {
            nodes: parsedData.nodes,
            edges: parsedData.edges
        };
        var options = parsedData.options;
        var container = document.getElementById("graph");
        var network = new vis__WEBPACK_IMPORTED_MODULE_1__["Network"](container, data, options);
    }
}
AstComponent.ɵfac = function AstComponent_Factory(t) { return new (t || AstComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_dot_service__WEBPACK_IMPORTED_MODULE_2__["DotService"])); };
AstComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AstComponent, selectors: [["app-ast"]], decls: 18, vars: 0, consts: [["role", "main", 1, "content"], [1, "container-fluid"], [1, "row"], [1, "col-md-12", "text-center"], [1, "title"], ["id", "graph", 1, "col-md-12", "text-center"]], template: function AstComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "h1", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Abstract Syntax Tree ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " ( Linea, Columna ) Tipo ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvYXN0L2FzdC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AstComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-ast',
                templateUrl: './ast.component.html',
                styleUrls: ['./ast.component.css']
            }]
    }], function () { return [{ type: _services_dot_service__WEBPACK_IMPORTED_MODULE_2__["DotService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/Components/editor/editor.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/Components/editor/editor.component.ts ***!
  \*******************************************************/
/*! exports provided: EditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorComponent", function() { return EditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _parser_Util_Salida__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser/Util/Salida */ "./src/app/Components/editor/parser/Util/Salida.ts");
/* harmony import */ var _parser_Report_plotter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser/Report/plotter */ "./src/app/Components/editor/parser/Report/plotter.ts");
/* harmony import */ var _parser_Report_Table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parser/Report/Table */ "./src/app/Components/editor/parser/Report/Table.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _parser_Errores__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./parser/Errores */ "./src/app/Components/editor/parser/Errores.ts");
/* harmony import */ var _services_dot_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/dot.service */ "./src/app/services/dot.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/__ivy_ngcc__/fesm2015/angular-fontawesome.js");
/* harmony import */ var _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ctrl/ngx-codemirror */ "./node_modules/@ctrl/ngx-codemirror/__ivy_ngcc__/fesm2015/ctrl-ngx-codemirror.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");


// Imports para los reportes


// Import para las alertas

// Imports para los iconos








const _c0 = function () { return { lineNumbers: true, theme: "material-ocean", mode: "xml" }; };
const _c1 = function () { return { lineNumbers: true, theme: "material-ocean" }; };
const _c2 = function () { return { lineNumbers: false, theme: "blackboard" }; };
const parserXML = __webpack_require__(/*! ./parser/Grammar/XmlGrammarASC.js */ "./src/app/Components/editor/parser/Grammar/XmlGrammarASC.js");
class EditorComponent {
    constructor(dotService) {
        this.dotService = dotService;
        // Variables
        this.title = 'Compi2_Junio';
        this.entradaXml = '<helloworld>\n</helloworld>';
        this.entradaXpath = '/helloworld';
        this.salida = 'TytusX Output: \n\n';
        // Iconos
        this.faSpinner = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faSpinner"];
        this.faCoffee = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faCoffee"];
        this.faPencilRuler = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faPencilRuler"];
        this.faGlobe = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faGlobe"];
        this.faFileAlt = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faFileAlt"];
        this.faLanguage = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faLanguage"];
        this.faEraser = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faEraser"];
        this.faList = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faList"];
        this.faFile = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faFile"];
        this.faExternalLinkAlt = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faExternalLinkAlt"];
        this.faFileDownload = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faFileDownload"];
        this.faPlay = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faPlay"];
    }
    ngOnInit() {
        this.clean();
    }
    // cleanText(){
    //   this.consulta = '';
    //   this.salida = '[TytusX] Output: \n\n';
    //   this.entrada = '';
    // }
    // Metodos
    clean() {
        this.ast = null;
        this.env = null;
        this.salida = '[Grupo18_TitusX]Output: \n\n';
        _parser_Util_Salida__WEBPACK_IMPORTED_MODULE_1__["_Console"].salida = '';
        _parser_Util_Salida__WEBPACK_IMPORTED_MODULE_1__["_Console"].count = 0;
        _parser_Util_Salida__WEBPACK_IMPORTED_MODULE_1__["_Console"].labels = 0;
        _parser_Util_Salida__WEBPACK_IMPORTED_MODULE_1__["_Console"].stackPointer = 0;
        _parser_Util_Salida__WEBPACK_IMPORTED_MODULE_1__["_Console"].heapPointer = 0;
        _parser_Util_Salida__WEBPACK_IMPORTED_MODULE_1__["_Console"].symbols = new Map();
        _parser_Errores__WEBPACK_IMPORTED_MODULE_6__["errores"].length = 0;
        this.flag = true;
    }
    cOutput(body) {
        // Muestra el encabezado
        this.salida = '#include <stdio.h> \n\n';
        this.salida += 'float Heap[16384];\n';
        this.salida += 'float Stack[16384]; \n';
        this.salida += 'float p; \n';
        this.salida += 'float h; \n';
        this.salida += 'float ';
        for (let index = 0; index < _parser_Util_Salida__WEBPACK_IMPORTED_MODULE_1__["_Console"].count; index++) {
            if (index > 0 && index % 8 == 0) {
                this.salida = this.salida.substring(0, this.salida.length - 2);
                this.salida += ';\nfloat ';
            }
            this.salida += 't' + index + ', ';
        }
        this.salida =
            _parser_Util_Salida__WEBPACK_IMPORTED_MODULE_1__["_Console"].count != 0
                ? this.salida.substring(0, this.salida.length - 2)
                : this.salida + 't0';
        this.salida += ';\n\n';
        this.salida += _parser_Util_Salida__WEBPACK_IMPORTED_MODULE_1__["_Console"].salida;
        this.salida += 'void main() {\n';
        this.salida += body;
        this.salida += '\nreturn;\n';
        this.salida += '}\n\n';
    }
    // onFileSelected(event) {
    //   const file: File = event.target.files[0];
    //   if (file) {
    //     var reader = new FileReader();
    //     Swal.fire({
    //       title: '¡Carga Correcta! ¿En que area de texto desea cargar?',
    //       showDenyButton: true,
    //       showCancelButton: true,
    //       confirmButtonText: `Area 1`,
    //       denyButtonText: `Area 2`,
    //       confirmButtonColor: 'rgb(8, 101, 104)',
    //       background: 'black',
    //       icon: 'info'
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         reader.onload = () => {
    //           this.entrada = reader.result.toString();
    //         };
    //         reader.readAsText(file);
    //       }
    //       else if (result.isDenied) {
    //         reader.onload = () => {
    //           this.consulta = reader.result.toString();
    //         };
    //         reader.readAsText(file);
    //       }
    //     });
    //   }
    // }
    // saveFile() {
    //   var reader = new FileReader();
    //   Swal.fire({
    //     title: '¿Que area de texto desea descargar?',
    //     showDenyButton: true,
    //     showCancelButton: true,
    //     confirmButtonText: `Area 1`,
    //     denyButtonText: `Area 2`,
    //     confirmButtonColor: 'rgb(8, 101, 104)',
    //     background: 'black',
    //     icon: 'info'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       const blob = new Blob([this.entrada], { type: 'text/txt' });
    //       const url = window.URL.createObjectURL(blob);
    //       var a = document.createElement("a");
    //       a.href = url;
    //       a.download = "TytusX.txt";
    //       // start download
    //       a.click();
    //     }
    //     else if (result.isDenied) {
    //       const blob = new Blob([this.consulta], { type: 'text/txt' });
    //       const url = window.URL.createObjectURL(blob);
    //       var a = document.createElement("a");
    //       a.href = url;
    //       a.download = "TytusX.txt";
    //       // start download
    //       a.click();
    //     }
    //   });
    // }
    executeOpt(entrada) {
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
    ejecutarXmlAsc() {
        this.clean();
        try {
            this.ast = parserXML.parse(this.entradaXml.toString());
            console.log(this.ast);
        }
        catch (e) {
            console.error(e.message);
        }
        this.flag = false;
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
    printAst() {
        if (this.flag) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
                title: 'Oops...',
                text: 'No se ha analizado el codigo aun',
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: 'rgb(8, 101, 104)',
                background: 'black',
            });
        }
        else if (_parser_Errores__WEBPACK_IMPORTED_MODULE_6__["errores"].length != 0) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
                title: 'Oops...!',
                text: 'Se encontraron errores en su codigo, no puede graficar',
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: 'rgb(8, 101, 104)',
                background: 'black',
            });
        }
        else {
            // alert(new Plotter().makeDot(this.ast));
            //return;
            this.dotService.setDot(new _parser_Report_plotter__WEBPACK_IMPORTED_MODULE_2__["Plotter"]().makeDot(this.ast));
            window.open('/ast');
            return;
        }
    }
    tokenTable() {
        if (this.flag) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
                title: 'Oops...',
                text: 'No se ha analizado el codigo aun',
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: 'rgb(8, 101, 104)',
                background: 'black',
            });
        }
        else if (_parser_Util_Salida__WEBPACK_IMPORTED_MODULE_1__["_Console"].symbols.size == 0) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
                title: 'Oops...',
                text: 'No se encontro ninguna variable o funcion guardada',
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: 'rgb(8, 101, 104)',
                background: 'black',
            });
        }
        else if (_parser_Errores__WEBPACK_IMPORTED_MODULE_6__["errores"].length != 0) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
                title: 'Oops...!',
                text: 'Se encontraron errores en su codigo, no puede mostrar tabla de variables',
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: 'rgb(8, 101, 104)',
                background: 'black',
            });
        }
        else {
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
                title: 'Tabla de Simbolos',
                html: new _parser_Report_Table__WEBPACK_IMPORTED_MODULE_3__["Table"]().symbols(_parser_Util_Salida__WEBPACK_IMPORTED_MODULE_1__["_Console"].symbols),
                confirmButtonText: 'Entendido',
                confirmButtonColor: 'rgb(8, 101, 104)',
                background: 'black',
                width: 800,
            });
        }
    }
    optTable() {
        if (this.reglas == undefined) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
                title: 'Oops...',
                text: 'No se ha analizado el codigo aun',
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: 'rgb(8, 101, 104)',
                background: 'black',
            });
        }
        else if (this.reglas.length == 0) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
                title: 'Cool!',
                text: 'No se encontraron optimizaciones en su codigo',
                icon: 'success',
                confirmButtonText: 'Entendido',
                confirmButtonColor: 'rgb(8, 101, 104)',
                background: 'black',
            });
        }
        else {
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
                title: 'Tabla de Reglas',
                html: new _parser_Report_Table__WEBPACK_IMPORTED_MODULE_3__["Table"]().rules(this.reglas),
                confirmButtonText: 'Entendido',
                confirmButtonColor: 'rgb(8, 101, 104)',
                background: 'black',
                width: 800,
            });
        }
    }
    errorTable() {
        if (this.flag) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
                title: 'Oops...',
                text: 'No se ha analizado el codigo aun',
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: 'rgb(8, 101, 104)',
                background: 'black',
            });
        }
        else if (_parser_Errores__WEBPACK_IMPORTED_MODULE_6__["errores"].length == 0) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
                title: 'Cool!',
                text: 'No se encontraron errores en su codigo',
                icon: 'success',
                confirmButtonText: 'Entendido',
                confirmButtonColor: 'rgb(8, 101, 104)',
                background: 'black',
            });
        }
        else {
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire({
                title: 'Tabla de Errores',
                html: new _parser_Report_Table__WEBPACK_IMPORTED_MODULE_3__["Table"]().errors(_parser_Errores__WEBPACK_IMPORTED_MODULE_6__["errores"]),
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
            if (!file)
                return false;
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
            if (!file)
                return false;
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
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.entradaXml));
        element.setAttribute('download', 'Compi2.xml');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    saveXPath() {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.entradaXpath));
        element.setAttribute('download', 'Compi2.xpath');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    clearConsole() {
        this.salida = '[Grupo18_TitusX]Output: \n\n';
    }
}
EditorComponent.ɵfac = function EditorComponent_Factory(t) { return new (t || EditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_dot_service__WEBPACK_IMPORTED_MODULE_7__["DotService"])); };
EditorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: EditorComponent, selectors: [["editor-root"]], decls: 102, vars: 31, consts: [["role", "main", 1, "content"], [1, "container-fluid"], [1, "row"], [1, "col-md-12"], ["ngbDropdown", "", 1, "d-inline-block"], ["id", "dropdownBasic1", "ngbDropdownToggle", "", 1, "btn", "btn-dark", 2, "background-color", "rgb(8, 101, 104)"], [3, "icon"], ["ngbDropdownMenu", "", "aria-labelledby", "dropdownBasic1", 1, "btn", "btn-info", "dropdown-toggle", 2, "background-color", "rgb(8, 101, 104)"], ["type", "button", 1, "dropdown-item", 3, "click"], ["type", "button", 1, "btn", "btn-dark", 2, "background-color", "rgb(8, 101, 104)", 3, "click"], [1, "col-md-6"], [1, "terminal"], [1, "term-title"], [3, "ngModel", "options", "ngModelChange"], ["id", "output", 1, "terminal"], ["disabled", "", 3, "ngModel", "options", "ngModelChange"], ["id", "graph", 1, "col-md-12", "text-center"], ["id", "temporal", 2, "display", "none"]], template: function EditorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " XML ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_9_listener() { return ctx.ejecutarXmlAsc(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Ejecutar Ascendente ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_12_listener() { return ctx.ejecutar(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " Ejecutar Descendente ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_15_listener() { return ctx.newXML(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Nuevo ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_18_listener() { return ctx.openXML(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " Abrir ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_21_listener() { return ctx.saveXML(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " Guardar ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, " XPath ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_30_listener() { return ctx.ejecutar(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " Ejecutar Ascendente ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_33_listener() { return ctx.ejecutar(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, " Ejecutar Descendente ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_36_listener() { return ctx.newXPath(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, " Nuevo ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_39_listener() { return ctx.openXPath(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, " Abrir ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_42_listener() { return ctx.saveXPath(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, " Guardar ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_46_listener() { return ctx.translate(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, " XQuery ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_50_listener() { return ctx.optimizar(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, " Optimizar ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, " Reportes ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_59_listener() { return ctx.printAst(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, " AST ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_62_listener() { return ctx.printAst(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, " CST ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_65_listener() { return ctx.printAst(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](66, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, " DAG ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_68_listener() { return ctx.tokenTable(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](69, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, " Tabla de Simbolos ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_71_listener() { return ctx.errorTable(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](72, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, " Tabla de Errores ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_74_listener() { return ctx.optTable(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](75, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, " Tabla de Optimizacion ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_78_listener() { return ctx.clearConsole(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](79, "fa-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](80, " Limpiar Consola ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "h2", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, "XML");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "ngx-codemirror", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function EditorComponent_Template_ngx_codemirror_ngModelChange_87_listener($event) { return ctx.entradaXml = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "h2", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91, "XPath");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "ngx-codemirror", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function EditorComponent_Template_ngx_codemirror_ngModelChange_92_listener($event) { return ctx.entradaXpath = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "h2", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](97, "Result");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "ngx-codemirror", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function EditorComponent_Template_ngx_codemirror_ngModelChange_98_listener($event) { return ctx.salida = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](100, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](101, "div", 17);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faList);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faPlay);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faPlay);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faFile);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faExternalLinkAlt);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faFileDownload);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faList);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faPlay);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faPlay);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faFile);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faExternalLinkAlt);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faFileDownload);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faGlobe);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faSpinner);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faFileAlt);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faPencilRuler);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faPencilRuler);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faPencilRuler);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faLanguage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faEraser);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faSpinner);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faEraser);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.entradaXml)("options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](28, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.entradaXpath)("options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](29, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.salida)("options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](30, _c2));
    } }, directives: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbDropdown"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbDropdownToggle"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_9__["FaIconComponent"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbDropdownMenu"], _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_10__["CodemirrorComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgModel"]], styles: [":host {\r\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica,\r\n    Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\r\n  font-size: 14px;\r\n  color: #333;\r\n  box-sizing: border-box;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.spacer {\r\n  flex: 1;\r\n}\r\n\r\n.content {\r\n  display: flex;\r\n  margin: 82px auto 32px;\r\n  padding: 0 16px;\r\n  max-width: 1260px;\r\n  flex-direction: column;\r\n}\r\n\r\nbody {\r\n  background-color: black;\r\n}\r\n\r\n.terminal {\r\n  position: relative;\r\n  border-radius: 6px;\r\n  padding-top: 45px;\r\n  margin-top: 8px;\r\n  overflow: hidden;\r\n  background-color: rgb(8, 101, 104);\r\n}\r\n\r\n.terminal::before {\r\n  content: \"\\2022 \\2022 \\2022\";\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  height: 10px;\r\n  background: rgb(8, 101, 104);\r\n  color: #c2c3c4;\r\n  width: 100%;\r\n  font-size: 2rem;\r\n  line-height: 0;\r\n  padding: 14px 0;\r\n  text-indent: 4px;\r\n}\r\n\r\n.terminal pre {\r\n  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;\r\n  color: white;\r\n  padding: 0 1rem 1rem;\r\n  margin: 0;\r\n}\r\n\r\n.my-custom-scrollbar {\r\n  position: relative;\r\n  height: 200px;\r\n  overflow: auto;\r\n}\r\n\r\n.table-wrapper-scroll-y {\r\n  display: block;\r\n}\r\n\r\n.term-title {\r\n  position: absolute;\r\n  top: 0.5em;\r\n  right: 1em;\r\n  font-size: 20px;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.exec-btn {\r\n  float: right;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQ29tcG9uZW50cy9lZGl0b3IvZWRpdG9yLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTsrRUFDNkU7RUFDN0UsZUFBZTtFQUNmLFdBQVc7RUFDWCxzQkFBc0I7RUFDdEIsbUNBQW1DO0VBQ25DLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLE9BQU87QUFDVDs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLDRCQUE0QjtFQUM1QixrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLE9BQU87RUFDUCxZQUFZO0VBQ1osNEJBQTRCO0VBQzVCLGNBQWM7RUFDZCxXQUFXO0VBQ1gsZUFBZTtFQUNmLGNBQWM7RUFDZCxlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usd0VBQXdFO0VBQ3hFLFlBQVk7RUFDWixvQkFBb0I7RUFDcEIsU0FBUztBQUNYOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsVUFBVTtFQUNWLGVBQWU7RUFDZixTQUFTO0VBQ1QsVUFBVTtBQUNaOztBQUVBO0VBQ0UsWUFBWTtBQUNkIiwiZmlsZSI6InNyYy9hcHAvQ29tcG9uZW50cy9lZGl0b3IvZWRpdG9yLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBSb2JvdG8sIEhlbHZldGljYSxcclxuICAgIEFyaWFsLCBzYW5zLXNlcmlmLCBcIkFwcGxlIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgRW1vamlcIiwgXCJTZWdvZSBVSSBTeW1ib2xcIjtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgY29sb3I6ICMzMzM7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcclxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xyXG59XHJcblxyXG4uc3BhY2VyIHtcclxuICBmbGV4OiAxO1xyXG59XHJcblxyXG4uY29udGVudCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXJnaW46IDgycHggYXV0byAzMnB4O1xyXG4gIHBhZGRpbmc6IDAgMTZweDtcclxuICBtYXgtd2lkdGg6IDEyNjBweDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLnRlcm1pbmFsIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIHBhZGRpbmctdG9wOiA0NXB4O1xyXG4gIG1hcmdpbi10b3A6IDhweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig4LCAxMDEsIDEwNCk7XHJcbn1cclxuXHJcbi50ZXJtaW5hbDo6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlxcMjAyMiBcXDIwMjIgXFwyMDIyXCI7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMDtcclxuICBsZWZ0OiAwO1xyXG4gIGhlaWdodDogMTBweDtcclxuICBiYWNrZ3JvdW5kOiByZ2IoOCwgMTAxLCAxMDQpO1xyXG4gIGNvbG9yOiAjYzJjM2M0O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGZvbnQtc2l6ZTogMnJlbTtcclxuICBsaW5lLWhlaWdodDogMDtcclxuICBwYWRkaW5nOiAxNHB4IDA7XHJcbiAgdGV4dC1pbmRlbnQ6IDRweDtcclxufVxyXG5cclxuLnRlcm1pbmFsIHByZSB7XHJcbiAgZm9udC1mYW1pbHk6IFNGTW9uby1SZWd1bGFyLCBDb25zb2xhcywgTGliZXJhdGlvbiBNb25vLCBNZW5sbywgbW9ub3NwYWNlO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBwYWRkaW5nOiAwIDFyZW0gMXJlbTtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbi5teS1jdXN0b20tc2Nyb2xsYmFyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgaGVpZ2h0OiAyMDBweDtcclxuICBvdmVyZmxvdzogYXV0bztcclxufVxyXG5cclxuLnRhYmxlLXdyYXBwZXItc2Nyb2xsLXkge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4udGVybS10aXRsZSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMC41ZW07XHJcbiAgcmlnaHQ6IDFlbTtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbi5leGVjLWJ0biB7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG59XHJcbiJdfQ== */"], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EditorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'editor-root',
                templateUrl: './editor.component.html',
                styleUrls: ['./editor.component.css'],
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            }]
    }], function () { return [{ type: _services_dot_service__WEBPACK_IMPORTED_MODULE_7__["DotService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/Components/editor/parser/Abstract/Nodo.ts":
/*!***********************************************************!*\
  !*** ./src/app/Components/editor/parser/Abstract/Nodo.ts ***!
  \***********************************************************/
/*! exports provided: Nodo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nodo", function() { return Nodo; });
class Nodo {
    constructor(name, type, line, column) {
        this.name = name;
        this.type = type;
        this.line = line;
        this.column = column;
        this.listaNodos = new Array();
    }
}


/***/ }),

/***/ "./src/app/Components/editor/parser/Error.ts":
/*!***************************************************!*\
  !*** ./src/app/Components/editor/parser/Error.ts ***!
  \***************************************************/
/*! exports provided: Error_ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Error_", function() { return Error_; });
class Error_ {
    constructor(linea, columna, tipo, mensaje) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.mensaje = mensaje;
    }
    getLinea() { return this.linea; }
    getColumna() { return this.columna; }
    getTipo() { return this.tipo; }
    getDescripcion() { return this.mensaje; }
    htmlRow() {
        let result = "<td>" + this.tipo + "</td>";
        result += "<td>" + this.mensaje + "</td>";
        result += "<td>" + this.linea + "</td>";
        result += "<td>" + this.columna + "</td>";
        return result;
    }
}


/***/ }),

/***/ "./src/app/Components/editor/parser/Errores.ts":
/*!*****************************************************!*\
  !*** ./src/app/Components/editor/parser/Errores.ts ***!
  \*****************************************************/
/*! exports provided: errores */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errores", function() { return errores; });
let errores = new Array();


/***/ }),

/***/ "./src/app/Components/editor/parser/Grammar/XmlGrammarASC.js":
/*!*******************************************************************!*\
  !*** ./src/app/Components/editor/parser/Grammar/XmlGrammarASC.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var XmlGrammarASC = (function () {
  var o = function (k, v, o, l) {
      for (o = o || {}, l = k.length; l--; o[k[l]] = v);
      return o;
    },
    $V0 = [1, 5],
    $V1 = [1, 6],
    $V2 = [1, 12],
    $V3 = [1, 13],
    $V4 = [1, 14],
    $V5 = [1, 15],
    $V6 = [6, 10, 14],
    $V7 = [10, 14],
    $V8 = [1, 23],
    $V9 = [1, 29],
    $Va = [11, 12];
  var parser = {
    trace: function trace() {},
    yy: {},
    symbols_: {
      error: 2,
      S: 3,
      tk_xmldec: 4,
      I: 5,
      EOF: 6,
      OTAG: 7,
      CONTENIDO: 8,
      CTAG: 9,
      tk_starttag: 10,
      tk_id: 11,
      tk_endtag: 12,
      ARGUMENTOS: 13,
      tk_valin: 14,
      tk_igual: 15,
      tk_tagval: 16,
      tk_closetag: 17,
      $accept: 0,
      $end: 1,
    },
    terminals_: {
      2: "error",
      4: "tk_xmldec",
      6: "EOF",
      10: "tk_starttag",
      11: "tk_id",
      12: "tk_endtag",
      14: "tk_valin",
      15: "tk_igual",
      16: "tk_tagval",
      17: "tk_closetag",
    },
    productions_: [
      0,
      [3, 3],
      [3, 2],
      [5, 3],
      [5, 2],
      [7, 3],
      [7, 4],
      [7, 3],
      [7, 4],
      [13, 4],
      [13, 3],
      [8, 2],
      [8, 1],
      [9, 4],
      [9, 4],
    ],
    performAction: function anonymous(
      yytext,
      yyleng,
      yylineno,
      yy,
      yystate /* action[1] */,
      $$ /* vstack */,
      _$ /* lstack */
    ) {
      /* this == yyval */

      var $0 = $$.length - 1;
      switch (yystate) {
        case 1:
          var s = new NodoXML(
            "S",
            "S",
            +yylineno + 1,
            +_$[$0 - 2].first_column + 1,
            null
          );
          var dec = new NodoXML(
            "DEC",
            "DEC",
            +yylineno + 1,
            +_$[$0 - 2].first_column + 1,
            $$[$0 - 2]
          );
          // s.addHijo(dec);
          // s.addHijo($$[$0-1]);
          return s;

          break;
        case 2:
          var s = new NodoXML(
            "S",
            "S",
            +yylineno + 1,
            +_$[$0 - 1].first_column + 1,
            null
          );
          // s.addHijo($$[$0-1]);
          return s;

          break;
        case 3:
          var i = new NodoXML(
            "I",
            "I",
            +yylineno + 1,
            +_$[$0 - 2].first_column + 1,
            null
          );
          i.addHijo($$[$0 - 2]);
          i.addHijo($$[$0 - 1]);
          i.addHijo($$[$0]);
          this.$ = i;

          break;
        case 4:
          var i = new NodoXML(
            "I",
            "I",
            +yylineno + 1,
            +_$[$0 - 1].first_column + 1,
            null
          );
          i.addHijo($$[$0 - 1]);
          i.addHijo($$[$0]);
          this.$ = i;

          break;
        case 5:
          this.$ = tag = new NodoXML(
            $$[$0 - 2],
            "OTAG",
            +yylineno + 1,
            +_$[$0 - 2].first_column + 1,
            null
          );

          break;
        case 6:
          var tag = new NodoXML(
            $$[$0 - 3],
            "OTAG",
            +yylineno + 1,
            +_$[$0 - 3].first_column + 1,
            null
          );
          tag.addHijo($$[$0 - 3]);
          this.$ = tag;

          break;
      }
    },
    table: [
      { 3: 1, 4: [1, 2], 5: 3, 7: 4, 10: $V0, 14: $V1 },
      { 1: [3] },
      { 5: 7, 7: 4, 10: $V0, 14: $V1 },
      { 6: [1, 8] },
      { 5: 11, 7: 4, 8: 9, 9: 10, 10: $V2, 14: $V3 },
      { 11: $V4 },
      { 11: $V5 },
      { 6: [1, 16] },
      { 1: [2, 2] },
      { 5: 18, 7: 4, 9: 17, 10: $V2, 14: $V3 },
      o($V6, [2, 4]),
      o($V7, [2, 12]),
      { 11: $V4, 17: [1, 19] },
      { 11: $V5, 17: [1, 20] },
      { 11: $V8, 12: [1, 21], 13: 22 },
      { 11: $V8, 12: [1, 24], 13: 25 },
      { 1: [2, 1] },
      o($V6, [2, 3]),
      o($V7, [2, 11]),
      { 11: [1, 26] },
      { 11: [1, 27] },
      o($V7, [2, 5]),
      { 11: $V9, 12: [1, 28] },
      { 15: [1, 30] },
      o($V7, [2, 7]),
      { 11: $V9, 12: [1, 31] },
      { 12: [1, 32] },
      { 12: [1, 33] },
      o($V7, [2, 6]),
      { 15: [1, 34] },
      { 16: [1, 35] },
      o($V7, [2, 8]),
      o($V6, [2, 13]),
      o($V6, [2, 14]),
      { 16: [1, 36] },
      o($Va, [2, 10]),
      o($Va, [2, 9]),
    ],
    defaultActions: { 8: [2, 2], 16: [2, 1] },
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
      }
    },
    parse: function parse(input) {
      var self = this,
        stack = [0],
        tstack = [],
        vstack = [null],
        lstack = [],
        table = this.table,
        yytext = "",
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;
      if (typeof lexer.yylloc == "undefined") {
        lexer.yylloc = {};
      }
      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;
      if (typeof sharedState.yy.parseError === "function") {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      _token_stack: var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        if (typeof token !== "number") {
          token = self.symbols_[token] || token;
        }
        return token;
      };
      var symbol,
        preErrorSymbol,
        state,
        action,
        a,
        r,
        yyval = {},
        p,
        len,
        newState,
        expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol == "undefined") {
            symbol = lex();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
          var errStr = "";
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push("'" + this.terminals_[p] + "'");
            }
          }
          if (lexer.showPosition) {
            errStr =
              "Parse error on line " +
              (yylineno + 1) +
              ":\n" +
              lexer.showPosition() +
              "\nExpecting " +
              expected.join(", ") +
              ", got '" +
              (this.terminals_[symbol] || symbol) +
              "'";
          } else {
            errStr =
              "Parse error on line " +
              (yylineno + 1) +
              ": Unexpected " +
              (symbol == EOF
                ? "end of input"
                : "'" + (this.terminals_[symbol] || symbol) + "'");
          }
          this.parseError(errStr, {
            text: lexer.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer.yylineno,
            loc: yyloc,
            expected: expected,
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error(
            "Parse Error: multiple actions possible at state: " +
              state +
              ", token: " +
              symbol
          );
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer.yyleng;
              yytext = lexer.yytext;
              yylineno = lexer.yylineno;
              yyloc = lexer.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column,
            };
            if (ranges) {
              yyval._$.range = [
                lstack[lstack.length - (len || 1)].range[0],
                lstack[lstack.length - 1].range[1],
              ];
            }
            r = this.performAction.apply(
              yyval,
              [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack,
              ].concat(args)
            );
            if (typeof r !== "undefined") {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    },
  };

  let valDeclaration = "";
  let valTag = "";
  let valInside = "";

  const { Error_ } = __webpack_require__(/*! ../Error */ "./src/app/Components/editor/parser/Error.ts");
  const { errores } = __webpack_require__(/*! ../Errores */ "./src/app/Components/editor/parser/Errores.ts");
  const { NodoXML } = __webpack_require__(/*! ../Nodes/NodoXml */ "./src/app/Components/editor/parser/Nodes/NodoXml.ts");
  /* generated by jison-lex 0.3.4 */
  var lexer = (function () {
    var lexer = {
      EOF: 1,

      parseError: function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      },

      // resets the lexer, sets new input
      setInput: function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = "";
        this.conditionStack = ["INITIAL"];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0,
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      },

      // consumes and returns one char from the input
      input: function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
      },

      // unshifts one char (or a string) into the input
      unput: function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines
            ? (lines.length === oldLines.length
                ? this.yylloc.first_column
                : 0) +
              oldLines[oldLines.length - lines.length].length -
              lines[0].length
            : this.yylloc.first_column - len,
        };

        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      },

      // When called from action, caches matched text and appends it on next action
      more: function () {
        this._more = true;
        return this;
      },

      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function () {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError(
            "Lexical error on line " +
              (this.yylineno + 1) +
              ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" +
              this.showPosition(),
            {
              text: "",
              token: null,
              line: this.yylineno,
            }
          );
        }
        return this;
      },

      // retain first n characters of the match
      less: function (n) {
        this.unput(this.match.slice(n));
      },

      // displays already matched input, i.e. for error messages
      pastInput: function () {
        var past = this.matched.substr(
          0,
          this.matched.length - this.match.length
        );
        return (
          (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "")
        );
      },

      // displays upcoming input, i.e. for error messages
      upcomingInput: function () {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(
          /\n/g,
          ""
        );
      },

      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
      },

      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function (match, indexed_rule) {
        var token, lines, backup;

        if (this.options.backtrack_lexer) {
          // save context
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column,
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done,
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines
            ? lines[lines.length - 1].length -
              lines[lines.length - 1].match(/\r?\n?/)[0].length
            : this.yylloc.last_column + match[0].length,
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, (this.offset += this.yyleng)];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(
          this,
          this.yy,
          this,
          indexed_rule,
          this.conditionStack[this.conditionStack.length - 1]
        );
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          // recover context
          for (var k in backup) {
            this[k] = backup[k];
          }
          return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
      },

      // return next match in input
      next: function () {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }

        var token, match, tempMatch, index;
        if (!this._more) {
          this.yytext = "";
          this.match = "";
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue; // rule action called reject() implying a rule MISmatch.
              } else {
                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
          return false;
        }
        if (this._input === "") {
          return this.EOF;
        } else {
          return this.parseError(
            "Lexical error on line " +
              (this.yylineno + 1) +
              ". Unrecognized text.\n" +
              this.showPosition(),
            {
              text: "",
              token: null,
              line: this.yylineno,
            }
          );
        }
      },

      // return next match that has a token
      lex: function lex() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      },

      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },

      // pop the previously active lexer condition state off the condition stack
      popState: function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },

      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (
          this.conditionStack.length &&
          this.conditionStack[this.conditionStack.length - 1]
        ) {
          return this.conditions[
            this.conditionStack[this.conditionStack.length - 1]
          ].rules;
        } else {
          return this.conditions["INITIAL"].rules;
        }
      },

      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return "INITIAL";
        }
      },

      // alias for begin(condition)
      pushState: function pushState(condition) {
        this.begin(condition);
      },

      // return the number of states currently on the stack
      stateStackSize: function stateStackSize() {
        return this.conditionStack.length;
      },
      options: { "case-sensitive": true },
      performAction: function anonymous(
        yy,
        yy_,
        $avoiding_name_collisions,
        YY_START
      ) {
        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            this.begin("xmloptions");
            break;
          case 1:
            this.popState();
            console.log("xmloptions: " + valDeclaration);
            yy_.yytext = valDeclaration;
            valDeclaration = "";
            return 4;

            break;
          case 2:
            valDeclaration += yy_.yytext;
            break;
          case 3:
            this.popState();
            return 6;
            break;
          case 4:
            this.begin("tagval1");
            break;
          case 5:
            this.popState();
            console.log("valtag: " + valTag);
            yy_.yytext = valTag;
            valTag = "";
            return 16;

            break;
          case 6:
            valTag += "\n";
            break;
          case 7:
            valTag += "\t";
            break;
          case 8:
            valTag += "\\";
            break;
          case 9:
            valTag += "\r";
            break;
          case 10:
            valTag += '"';
            break;
          case 11:
            valTag += yy_.yytext;
            break;
          case 12:
            this.begin("tagval2");
            break;
          case 13:
            this.popState();
            console.log("valtag: " + valTag);
            yy_.yytext = valTag;
            valTag = "";
            return 16;

            break;
          case 14:
            valTag += "<";
            break;
          case 15:
            valTag += ">";
            break;
          case 16:
            valTag += "&";
            break;
          case 17:
            valTag += "'";
            break;
          case 18:
            valTag += '"';
            break;
          case 19:
            valTag += yy_.yytext;
            break;
          case 20:
            this.begin("valin");
            return 12;
            break;
          case 21:
            this.popState();
            console.log("value Inside: " + valInside);
            yy_.yytext = valInside;
            valInside = "";
            return 14;

            break;
          case 22:
            valInside += yy_.yytext;
            break;
          case 23:
            this.popState();
            return 6;
            break;
          case 24:
            console.log(yy_.yytext);
            return 12;
            break;
          case 25:
            console.log(yy_.yytext);
            return 10;
            break;
          case 26:
            console.log(yy_.yytext);
            return 17;
            break;
          case 27:
            console.log(yy_.yytext);
            return 15;
            break;
          case 28:
            console.log("id:" + yy_.yytext);
            return 11;
            break;
          case 29 /*se ignoran*/:
            break;
          case 30:
            return 6;
            break;
          case 31:
            errores.push(
              new Error_(
                yy_.yylloc.first_line,
                yy_.yylloc.first_column,
                "Lexico",
                "Valor inesperado " + yy_.yytext
              )
            );
            console.error(errores);
            break;
        }
      },
      rules: [
        /^(?:<\?xml\b)/,
        /^(?:\?>)/,
        /^(?:[^(\?>)])/,
        /^(?:$)/,
        /^(?:["])/,
        /^(?:["])/,
        /^(?:\\n)/,
        /^(?:\\t)/,
        /^(?:\\\\)/,
        /^(?:\\r)/,
        /^(?:\\")/,
        /^(?:.)/,
        /^(?:['])/,
        /^(?:['])/,
        /^(?:&lt;)/,
        /^(?:&gt;)/,
        /^(?:&amp;)/,
        /^(?:&apos;)/,
        /^(?:&quot;)/,
        /^(?:.)/,
        /^(?:>[^<])/,
        /^(?:<)/,
        /^(?:[^<])/,
        /^(?:$)/,
        /^(?:>)/,
        /^(?:<)/,
        /^(?:\/)/,
        /^(?:=)/,
        /^(?:[[a-zA-ZñÑáéíóúÁÉÍÓÚ]["_""-"0-9a-zA-ZñÑáéíóúÁÉÍÓÚ]*|["_""-"]+[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ]["_""-"0-9a-zA-ZñÑáéíóúÁÉÍÓÚ]*)/,
        /^(?:[ \t\n\r\f])/,
        /^(?:$)/,
        /^(?:.)/,
      ],
      conditions: {
        valin: { rules: [21, 22, 23], inclusive: false },
        tagval2: { rules: [13, 14, 15, 16, 17, 18, 19], inclusive: false },
        tagval1: { rules: [5, 6, 7, 8, 9, 10, 11], inclusive: false },
        xmloptions: { rules: [1, 2, 3], inclusive: false },
        INITIAL: {
          rules: [0, 4, 12, 20, 24, 25, 26, 27, 28, 29, 30, 31],
          inclusive: true,
        },
      },
    };
    return lexer;
  })();
  parser.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  Parser.prototype = parser;
  parser.Parser = Parser;
  return new Parser();
})();

if (true) {
  exports.parser = XmlGrammarASC;
  exports.Parser = XmlGrammarASC.Parser;
  exports.parse = function () {
    return XmlGrammarASC.parse.apply(XmlGrammarASC, arguments);
  };
  exports.main = function commonjsMain(args) {
    if (!args[1]) {
      console.log("Usage: " + args[0] + " FILE");
      process.exit(1);
    }
    // var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    // return exports.parser.parse(source);
  };
  if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
    exports.main(process.argv.slice(1));
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/app/Components/editor/parser/Nodes/NodoXml.ts":
/*!***********************************************************!*\
  !*** ./src/app/Components/editor/parser/Nodes/NodoXml.ts ***!
  \***********************************************************/
/*! exports provided: NodoXML */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodoXML", function() { return NodoXML; });
/* harmony import */ var _Abstract_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Abstract/Nodo */ "./src/app/Components/editor/parser/Abstract/Nodo.ts");

class NodoXML extends _Abstract_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"] {
    constructor(id, tipo, line, column, val) {
        super(id, tipo, line, column);
        this.val = val;
    }
    plotCst(count) {
        let result = `node${count} [label="(${this.line},${this.column}) ${this.name} (${this.type})"];\n`;
        this.getHijos().forEach(element => {
            result += "node${count} -> node${count}1;\n";
            result += element.plotCst((Number(count + "1")));
        });
        // Flechas
        return result;
    }
    plotAst(count) {
        throw new Error('Method not implemented.');
    }
    getID() {
        return this.name;
    }
    getVAl() {
        return this.val;
    }
    addHijo(nodo) {
        this.listaNodos.push(nodo);
    }
    getHijos() {
        return this.listaNodos;
    }
}


/***/ }),

/***/ "./src/app/Components/editor/parser/Report/Table.ts":
/*!**********************************************************!*\
  !*** ./src/app/Components/editor/parser/Report/Table.ts ***!
  \**********************************************************/
/*! exports provided: Table */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
class Table {
    rules(rules) {
        let result = '<table class="table">\n';
        result += '<thead>\n<tr>\n<th scope="col">#</th>\n';
        result += '<th scope="col">Linea</th>\n';
        result += '<th scope="col">Tipo</th>\n';
        result += '<th scope="col">Regla</th>\n';
        result += '<th scope="col">Cod. Agregado</th>\n';
        result += '<th scope="col">Cod. Eliminado</th>\n';
        result += '</tr>\n';
        result += '</thead>\n';
        result += '<tbody>\n';
        let count = 1;
        rules.forEach(element => {
            result += '<tr>\n';
            result += '<th scope="row">' + count + '</th>\n';
            result += element.htmlRow();
            result += '</tr>\n';
            count++;
        });
        result += '</tbody>\n';
        return result += '</table>\n</div>';
    }
    symbols(simbolos) {
        let result = '<div class="table-wrapper-scroll-y my-custom-scrollbar">';
        result += '<table class="table table-dark table-hover">\n';
        result += '<thead>\n<tr>\n<th scope="col">#</th>\n';
        result += '<th scope="col">Valor</th>\n';
        result += '<th scope="col">ID</th>\n';
        result += '<th scope="col">Tipo</th>\n';
        result += '<th scope="col">Ambito</th>\n';
        result += '</tr>\n';
        result += '</thead>\n';
        result += '<tbody>\n';
        let count = 1;
        simbolos.forEach(element => {
            result += '<tr>\n';
            result += '<th scope="row">' + count + '</th>\n';
            result += element.htmlRow();
            result += '</tr>\n';
            count++;
        });
        result += '</tbody>\n';
        return result += '</table></div>';
    }
    errors(errores) {
        //console.log(errores);
        let result = '<table class="table">\n';
        result += '<thead>\n<tr>\n<th scope="col">#</th>\n';
        result += '<th scope="col">Tipo</th>\n';
        result += '<th scope="col">Descripcion</th>\n';
        result += '<th scope="col">Linea</th>\n';
        result += '<th scope="col">Columna</th>\n';
        result += '</tr>\n';
        result += '</thead>\n';
        result += '<tbody>\n';
        let count = 1;
        errores.forEach(element => {
            result += '<tr>\n';
            result += '<th scope="row">' + count + '</th>\n';
            result += element.htmlRow();
            result += '</tr>\n';
            count++;
        });
        result += '</tbody>\n';
        return result += '</table>\n</div>';
    }
}


/***/ }),

/***/ "./src/app/Components/editor/parser/Report/plotter.ts":
/*!************************************************************!*\
  !*** ./src/app/Components/editor/parser/Report/plotter.ts ***!
  \************************************************************/
/*! exports provided: Plotter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plotter", function() { return Plotter; });
// import { count } from 'console';
class Plotter {
    makeDot(ast) {
        let count = 1;
        let result = 'digraph AST{ node[shape="box"];';
        result += 'node' + count + '[label="(0,0) Inicio"];';
        result += this.printAST(ast, count);
        // if (ast != null) {
        //     for (const instr of ast) {
        //         result += instr.plot(Number(count + '1'));
        //         // Flechas
        //         result += "node1 -> " + "node" + count + "1;";
        //         count++;
        //     }
        // }
        return result + '}';
    }
    printAST(ast, count) {
        var res = '';
        if (ast != null) {
            res += ast.plot(Number(count + '1'));
            res += 'node1 -> ' + 'node' + count + '1;';
            count++;
            ast.getHijos().forEach((element) => {
                res += this.printAST(element, count);
            });
        }
        return res;
    }
}


/***/ }),

/***/ "./src/app/Components/editor/parser/Util/Salida.ts":
/*!*********************************************************!*\
  !*** ./src/app/Components/editor/parser/Util/Salida.ts ***!
  \*********************************************************/
/*! exports provided: _Console */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_Console", function() { return _Console; });
class Console {
    constructor() {
        this.salida = "";
        this.symbols = new Map();
        this.stack = new Array;
        this.heap = new Array;
        this.printOption = 0;
    }
    showSystem() {
        console.log('----------- Stack -----------');
        console.table(this.stack);
        console.log('----------- Heap -----------');
        console.table(this.heap);
        console.log('----------- Stack Pointer -----------');
        console.log(this.stackPointer);
        console.log('----------- Heap Pointer -----------');
        console.log(this.heapPointer);
        console.log('----------- Tabla de Simbolos -----------');
        console.log(this.symbols);
    }
    saveInHeap(index, id) {
        this.heap[index] = id;
    }
    saveInStack(index, id) {
        this.stack[index] = id;
    }
}
const _Console = new Console();


/***/ }),

/***/ "./src/app/Components/footer/footer.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/Components/footer/footer.component.ts ***!
  \*******************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 13, vars: 0, consts: [[1, "page-footer", "font-small", "blue", "pt-4"], [1, "container-fluid", "text-center", "text-md-left"], [1, "row"], [1, "col-md-6", "mt-md-0", "mt-3"], [1, "clearfix", "w-100", "d-md-none", "pb-3"], [1, "footer-copyright", "text-center", "py-3"], ["href", "https://github.com/Xvimnt/Compi2_Junio"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "footer", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Universidad San Carlos de Guatemala");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Escuela de Ciencias y Sistemas");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "hr", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "\u00A9 2021 MIT: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Grupo18 TytusX");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL0NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FooterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-footer',
                templateUrl: './footer.component.html',
                styleUrls: ['./footer.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/Components/toolbar/toolbar.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/Components/toolbar/toolbar.component.ts ***!
  \*********************************************************/
/*! exports provided: ToolbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarComponent", function() { return ToolbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class ToolbarComponent {
    constructor() { }
    ngOnInit() {
    }
}
ToolbarComponent.ɵfac = function ToolbarComponent_Factory(t) { return new (t || ToolbarComponent)(); };
ToolbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ToolbarComponent, selectors: [["app-toolbar"]], decls: 4, vars: 0, consts: [["role", "banner", 1, "toolbar"], ["width", "40", "alt", "Angular Logo", "src", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F18%2Fe9%2F84%2F18e98488f4463e3114d7059324ec382c.png&f=1&nofb=1"]], template: function ToolbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Organizacion de Lenguajes y Compiladores 2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".toolbar[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    height: 60px;\r\n    display: flex;\r\n    align-items: center;\r\n    background-color: rgb(8, 101, 104);\r\n    color: white;\r\n    font-weight: 600;\r\n}\r\n\r\n.toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\r\n    margin: 0 16px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQ29tcG9uZW50cy90b29sYmFyL3Rvb2xiYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtJQUNsQixNQUFNO0lBQ04sT0FBTztJQUNQLFFBQVE7SUFDUixZQUFZO0lBQ1osYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixrQ0FBa0M7SUFDbEMsWUFBWTtJQUNaLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9Db21wb25lbnRzL3Rvb2xiYXIvdG9vbGJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRvb2xiYXIge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgaGVpZ2h0OiA2MHB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoOCwgMTAxLCAxMDQpO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG5cclxuLnRvb2xiYXIgaW1nIHtcclxuICAgIG1hcmdpbjogMCAxNnB4O1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ToolbarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-toolbar',
                templateUrl: './toolbar.component.html',
                styleUrls: ['./toolbar.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _Components_ast_ast_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/ast/ast.component */ "./src/app/Components/ast/ast.component.ts");
/* harmony import */ var _Components_editor_editor_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/editor/editor.component */ "./src/app/Components/editor/editor.component.ts");






const routes = [
    { path: 'ast', component: _Components_ast_ast_component__WEBPACK_IMPORTED_MODULE_2__["AstComponent"] },
    { path: 'editor', component: _Components_editor_editor_component__WEBPACK_IMPORTED_MODULE_3__["EditorComponent"] },
    { path: '', redirectTo: '/editor', pathMatch: 'full' },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _Components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/toolbar/toolbar.component */ "./src/app/Components/toolbar/toolbar.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _Components_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/footer/footer.component */ "./src/app/Components/footer/footer.component.ts");





class AppComponent {
    constructor() {
        this.title = 'Compi2_Junio';
    }
    ngOnInit() {
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-toolbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-footer");
    } }, directives: [_Components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_1__["ToolbarComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"], _Components_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ctrl/ngx-codemirror */ "./node_modules/@ctrl/ngx-codemirror/__ivy_ngcc__/fesm2015/ctrl-ngx-codemirror.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/__ivy_ngcc__/fesm2015/angular-fontawesome.js");
/* harmony import */ var _Components_ast_ast_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Components/ast/ast.component */ "./src/app/Components/ast/ast.component.ts");
/* harmony import */ var _Components_editor_editor_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Components/editor/editor.component */ "./src/app/Components/editor/editor.component.ts");
/* harmony import */ var _Components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Components/toolbar/toolbar.component */ "./src/app/Components/toolbar/toolbar.component.ts");
/* harmony import */ var _Components_footer_footer_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Components/footer/footer.component */ "./src/app/Components/footer/footer.component.ts");








// Modulos propios





class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_5__["CodemirrorModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"],
            _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _Components_editor_editor_component__WEBPACK_IMPORTED_MODULE_9__["EditorComponent"],
        _Components_ast_ast_component__WEBPACK_IMPORTED_MODULE_8__["AstComponent"],
        _Components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__["ToolbarComponent"],
        _Components_footer_footer_component__WEBPACK_IMPORTED_MODULE_11__["FooterComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
        _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_5__["CodemirrorModule"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"],
        _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _Components_editor_editor_component__WEBPACK_IMPORTED_MODULE_9__["EditorComponent"],
                    _Components_ast_ast_component__WEBPACK_IMPORTED_MODULE_8__["AstComponent"],
                    _Components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_10__["ToolbarComponent"],
                    _Components_footer_footer_component__WEBPACK_IMPORTED_MODULE_11__["FooterComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                    _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_5__["CodemirrorModule"],
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"],
                    _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/services/dot.service.ts":
/*!*****************************************!*\
  !*** ./src/app/services/dot.service.ts ***!
  \*****************************************/
/*! exports provided: DotService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DotService", function() { return DotService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-webstorage-service */ "./node_modules/ngx-webstorage-service/__ivy_ngcc__/fesm2015/ngx-webstorage-service.js");



class DotService {
    constructor(storage) {
        this.storage = storage;
        this.data = [];
    }
    setDot(dot) {
        this.storage.set('dot', dot);
    }
    getDot() {
        return this.storage.get('dot');
    }
}
DotService.ɵfac = function DotService_Factory(t) { return new (t || DotService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_1__["SESSION_STORAGE"])); };
DotService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: DotService, factory: DotService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DotService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [ngx_webstorage_service__WEBPACK_IMPORTED_MODULE_1__["SESSION_STORAGE"]]
            }] }]; }, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! codemirror/mode/javascript/javascript */ "./node_modules/codemirror/mode/javascript/javascript.js");
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! codemirror/mode/markdown/markdown */ "./node_modules/codemirror/mode/markdown/markdown.js");
/* harmony import */ var codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");






if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_4__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\matri\OneDrive\Documents\Compi2\Compi2_Junio\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map