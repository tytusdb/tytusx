(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+HJF":
/*!************************************************!*\
  !*** ./src/app/services/compilador.service.ts ***!
  \************************************************/
/*! exports provided: CompiladorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompiladorService", function() { return CompiladorService; });
/* harmony import */ var _Backend_src_backend_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../Backend/src_backend/index */ "5Lqd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



//import { Analizar_XML } from '../Backend/src_backend/index';
class CompiladorService {
    constructor(http) {
        this.http = http;
    }
    analizar(codigo) {
        console.log(codigo);
        Object(_Backend_src_backend_index__WEBPACK_IMPORTED_MODULE_0__["Analizar_XML"])(codigo);
        var alv = {
            simbolo: Object(_Backend_src_backend_index__WEBPACK_IMPORTED_MODULE_0__["Analizar_XML"])(codigo).simbolo,
            cst: Object(_Backend_src_backend_index__WEBPACK_IMPORTED_MODULE_0__["Analizar_XML"])(codigo).cst
        };
        return alv;
    }
    getAstBase64(ast) {
        const json = { ast: ast };
        return this.http.post('http://localhost:3000/getAstBase64', json);
    }
}
CompiladorService.ɵfac = function CompiladorService_Factory(t) { return new (t || CompiladorService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
CompiladorService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CompiladorService, factory: CompiladorService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\juand\Desktop\compi1\frontend\src\main.ts */"zUnb");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "5Lqd":
/*!******************************************!*\
  !*** ./src/Backend/src_backend/index.ts ***!
  \******************************************/
/*! exports provided: Analizar_XML */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Analizar_XML", function() { return Analizar_XML; });
/* harmony import */ var _Reportes_TablaSimbolos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Reportes/TablaSimbolos */ "U/w1");
/* harmony import */ var _build_Grammar_xmlA_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../build/Grammar/xmlA.js */ "O0zG");
/* harmony import */ var _build_Grammar_xmlA_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_build_Grammar_xmlA_js__WEBPACK_IMPORTED_MODULE_1__);


const port = 3000;
//const parserXpath = require('./Grammar/xpathA.js');
function Analizar_XML(entrada) {
    // aqui voy a vaciar antes que nada los nuevos simbolos
    _Reportes_TablaSimbolos__WEBPACK_IMPORTED_MODULE_0__["SimbolsReport"].aux = "";
    console.log("suu adentro papasito");
    const tree = _build_Grammar_xmlA_js__WEBPACK_IMPORTED_MODULE_1___default.a.parse(entrada);
    // const resXpath:any = parserXpath.parse("/negocio/unica | /negocio/videojuego")
    // console.log("Respuesta xpath:")
    //console.log(resXpath)
    //console.log("\nResultado de busqueda:")
    //console.log(tree.getAsTable().buscar(resXpath))
    /**aqui se llenara el reporte HTML de la tabla de simbolos  */
    /*tree.getAsTable().filas.forEach(fila => {
      //console.log(fila)
  
  
      SimbolsReport.aux += "<td>\n" + fila.nombre + "</td>" + "\n";
  
      SimbolsReport.aux += "<td>\n" + fila.tipo + "</td>" + "\n";
  
      SimbolsReport.aux += "<td>\n" + fila.listaAmbito.join("-") + "</td>" + "\n";
  
      SimbolsReport.aux += "<td>\n" + fila.fila + "</td>" + "\n";
  
      SimbolsReport.aux += "<td>\n" + fila.columna + "</td>" + "\n";
      SimbolsReport.aux += "<td>\n" + fila.valor + "</td>" + "\n";
      SimbolsReport.aux += "</tr>" + "\n";
  
  
    });
  */
    /*  aqui termina el llenado de la tabla de simbolos **/
    console.log(tree.getErroresSemanticos());
    // console.log(Xpath)
    //console.log(tree.getCstDotA());
    var alv = {
        cst: tree.getCstDotA(),
        simbolo: tree.getAsTable().filas
    };
    return alv;
}


/***/ }),

/***/ "6FQ4":
/*!***********************************************!*\
  !*** ./src/Backend/build/Xml/XmlResultado.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Graficas_1 = __webpack_require__(/*! ../Graficas/Graficas */ "nnRf");
const Tabla_1 = __webpack_require__(/*! ./Tabla */ "Jixd");
class XmlResultado {
    constructor(etiquitaInicio, etiquetasCuerpo) {
        this.etiquitaInicio = etiquitaInicio;
        this.etiquetasCuerpo = etiquetasCuerpo;
    }
    imprimir() {
        let texto = "";
        this.etiquetasCuerpo.forEach(etiqueta => {
            texto += etiqueta.imprimir();
        });
        return texto;
    }
    getAsTable() {
        let tabla = new Tabla_1.Tabla();
        this.etiquetasCuerpo.forEach(etiqueta => {
            etiqueta.getAsTable().filas.forEach(fila => {
                tabla.addFila(fila);
            });
        });
        return tabla;
    }
    getErroresSemanticos() {
        let texto = "";
        this.etiquetasCuerpo.forEach(etiqueta => {
            texto += etiqueta.getErroresSemanticos();
        });
        return texto;
    }
    getCstDotA() {
        let texto = "";
        texto += "dinetwork {\n";
        texto += Graficas_1.Graficas.defNodo(0, "XML");
        texto += Graficas_1.Graficas.getElement(1, "TAG_CONFIGURACION", 0);
        texto += this.etiquitaInicio.getCstDotA(1);
        if (this.etiquetasCuerpo.length > 0) {
            let cont = 3;
            for (let etiqueta of this.etiquetasCuerpo) {
                if (cont - 3 != this.etiquetasCuerpo.length - 1) {
                    texto += Graficas_1.Graficas.getElement(cont, "LISTA_ETIQUETAS", cont + 1);
                    texto += etiqueta.getCstDotA(cont);
                }
                else {
                    texto += Graficas_1.Graficas.getElement(cont, "LISTA_ETIQUETAS", 0);
                    texto += etiqueta.getCstDotA(cont);
                }
                cont += 1;
            }
        }
        texto += "}";
        return texto;
    }
    getCstDotD() {
        let texto = "";
        texto += "dinetwork{\n";
        texto += Graficas_1.Graficas.defNodo(0, "XML");
        texto += Graficas_1.Graficas.getElement(1, "TAG_CONFIGURACION", 0);
        texto += this.etiquitaInicio.getCstDotA(1);
        if (this.etiquetasCuerpo.length > 0) {
            let cont = 3;
            for (let etiqueta of this.etiquetasCuerpo) {
                if (cont === 3) {
                    texto += Graficas_1.Graficas.getElement(cont, "LISTA_ETIQUETAS", 0);
                    texto += etiqueta.getCstDotD(cont);
                }
                else {
                    texto += Graficas_1.Graficas.getElement(cont, "LISTA_ETIQUETAS", cont - 1);
                    texto += etiqueta.getCstDotD(cont);
                }
                cont += 1;
            }
        }
        texto += "}";
        return texto;
    }
}
exports.XmlResultado = XmlResultado;


/***/ }),

/***/ "AytR":
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

/***/ "BP3C":
/*!*************************************************************!*\
  !*** ./src/app/components/arbol-ast/arbol-ast.component.ts ***!
  \*************************************************************/
/*! exports provided: ArbolAstComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArbolAstComponent", function() { return ArbolAstComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class ArbolAstComponent {
    constructor() { }
    ngOnInit() {
    }
}
ArbolAstComponent.ɵfac = function ArbolAstComponent_Factory(t) { return new (t || ArbolAstComponent)(); };
ArbolAstComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ArbolAstComponent, selectors: [["app-arbol-ast"]], inputs: { arbolJson: "arbolJson" }, decls: 7, vars: 0, consts: [[1, "row", "justify-content-center", "tabla"], [1, "col-md-8", "tab"], [1, "nav", "nav-tabs", "justify-content-center"], [1, "nav-item", "active"], ["data-toggle", "tab", "href", "#errores", 1, "nav-link", "active"], ["src", "https://media.gettyimages.com/photos/artificial-ingelligence-cpu-empty-landscape-picture-id1132483126?s=2048x2048"]], template: function ArbolAstComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Arbol Ast");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".tabla[_ngcontent-%COMP%] {\r\n    margin-top: 25px;\r\n}\r\n\r\nimg[_ngcontent-%COMP%] {\r\n    margin-left: auto;\r\n}\r\n\r\nsvg.vtree[_ngcontent-%COMP%] {\r\n    background: whitesmoke;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyYm9sLWFzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksc0JBQXNCO0FBQzFCIiwiZmlsZSI6ImFyYm9sLWFzdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRhYmxhIHtcclxuICAgIG1hcmdpbi10b3A6IDI1cHg7XHJcbn1cclxuXHJcbmltZyB7XHJcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcclxufVxyXG5cclxuc3ZnLnZ0cmVlIHtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlc21va2U7XHJcbn0gICJdfQ== */"] });


/***/ }),

/***/ "D4eS":
/*!*********************************************************************!*\
  !*** ./src/app/components/tabla-errores/tabla-errores.component.ts ***!
  \*********************************************************************/
/*! exports provided: TablaErroresComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablaErroresComponent", function() { return TablaErroresComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class TablaErroresComponent {
    constructor() { }
    ngOnInit() {
    }
}
TablaErroresComponent.ɵfac = function TablaErroresComponent_Factory(t) { return new (t || TablaErroresComponent)(); };
TablaErroresComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TablaErroresComponent, selectors: [["app-tabla-errores"]], decls: 32, vars: 0, consts: [[1, "row", "justify-content-center", "tabla"], [1, "col-md-8", "tab"], [1, "nav", "nav-tabs", "justify-content-center"], [1, "nav-item", "active"], ["data-toggle", "tab", "href", "#errores", 1, "nav-link", "active"], ["id", "errores", 1, "tab-pane"], [1, "col-md-12"], [2, "width", "auto", "height", "auto"], [1, "table", "table-danger", "table-hover"]], template: function TablaErroresComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Tabla de Errores");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "table", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "TIPO");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "ERROR");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "FILA");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "COLUMNA");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".tabla[_ngcontent-%COMP%] {\r\n    margin-top: 25px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYmxhLWVycm9yZXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGdCQUFnQjtBQUNwQiIsImZpbGUiOiJ0YWJsYS1lcnJvcmVzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGFibGEge1xyXG4gICAgbWFyZ2luLXRvcDogMjVweDtcclxufSJdfQ== */"] });


/***/ }),

/***/ "EfQ4":
/*!************************************************!*\
  !*** ./src/Backend/build/Xml/EtiquetaDoble.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Graficas_1 = __webpack_require__(/*! ../Graficas/Graficas */ "nnRf");
const Fila_1 = __webpack_require__(/*! ./Fila */ "jn+f");
const Tabla_1 = __webpack_require__(/*! ./Tabla */ "Jixd");
const Tipos_1 = __webpack_require__(/*! ./Tipos */ "OkFX");
class EtiquetaDoble {
    constructor(nombreTagAbre, nombreTagCierre, listaAtributos, cadenaValores, listaHijos, linea, columna, idSent) {
        this.padre = null;
        this.nombreTagAbre = nombreTagAbre;
        this.nombreTagCierre = nombreTagCierre;
        this.listaAtributos = listaAtributos;
        this.tineHijos = listaHijos.length > 0;
        this.cadenaValores = (listaHijos.length == 0) ? cadenaValores : "";
        this.listaHijos = (listaHijos.length > 0) ? listaHijos : [];
        this.linea = linea;
        this.columna = columna;
        this.idSent = idSent;
        this.listaAtributos.forEach(atributo => {
            atributo.etiquetaContendora = this;
        });
        this.listaHijos.forEach(hijo => {
            hijo.padre = this;
        });
    }
    imprimir() {
        let texto = "";
        texto += "<" + this.nombreTagAbre;
        this.listaAtributos.forEach(atributo => {
            texto += " " + atributo.imprimir();
        });
        texto += ">";
        if (this.listaHijos.length > 0) {
            texto += "\n";
        }
        texto += this.cadenaValores;
        this.listaHijos.forEach(hijo => {
            texto += hijo.imprimir();
        });
        texto += "</" + this.nombreTagCierre + "> \n";
        return texto;
    }
    getName() {
        return this.nombreTagAbre;
    }
    getAmbito() {
        let listaAmbito = [];
        for (let etiqueta = this.padre; etiqueta != null; etiqueta = etiqueta.padre) {
            listaAmbito.push(etiqueta.getName());
        }
        listaAmbito.push("GLOBAL");
        return listaAmbito;
    }
    getAsTable() {
        let tabla = new Tabla_1.Tabla();
        tabla.addFila(new Fila_1.Fila(this.nombreTagAbre, Tipos_1.Tipos.ETIQUETA_DOBLE, this.getAmbito(), this.linea, this.columna, this.imprimir()));
        this.listaAtributos.forEach(atributo => {
            tabla.addFila(atributo.getAsRowTable());
        });
        this.listaHijos.forEach(etiqueta => {
            etiqueta.getAsTable().filas.forEach(fila => {
                tabla.addFila(fila);
            });
        });
        if (!this.tineHijos) {
            if (this.cadenaValores != "") {
                tabla.addFila(new Fila_1.Fila("-", Tipos_1.Tipos.VALOR, [this.getName()].concat(this.getAmbito()), this.linea, this.columna + this.nombreTagAbre.length + 2, this.cadenaValores));
            }
        }
        return tabla;
    }
    getErroresSemanticos() {
        let texto = "";
        if (this.nombreTagAbre != this.nombreTagCierre) {
            texto += `Error(Linea: ${this.linea}, Columna: ${this.columna}): El nombre del tag de apertura no es igual al de cierre.\n`;
        }
        this.listaAtributos.forEach(atributo => {
            let apariciones = 0;
            for (let atr2 of this.listaAtributos) {
                if (atributo.nombre == atr2.nombre) {
                    apariciones += 1;
                }
                if (apariciones > 1) {
                    texto += `Error(Linea: ${atributo.linea}, Columna: ${atributo.columna}): El atributo '${atributo.nombre}' se encuentra repetido.\n`;
                    break;
                }
            }
        });
        this.listaHijos.forEach(hijo => {
            texto += hijo.getErroresSemanticos();
        });
        return texto;
    }
    getCstDotA(idPadre) {
        let texto = "";
        texto += Graficas_1.Graficas.getElement(this.idSent, "ETIQUETA", idPadre);
        texto += Graficas_1.Graficas.getElement(this.idSent + 1, "TAG_APERTURA", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 2, "AbreTagApertura", this.idSent + 1);
        texto += Graficas_1.Graficas.getElement(this.idSent + 3, "<" + this.nombreTagAbre, this.idSent + 2);
        if (this.listaAtributos.length > 0) {
            let cont = 4;
            for (let atributo of this.listaAtributos) {
                if (cont - 4 != this.listaAtributos.length - 1) {
                    texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent + cont + 1);
                    texto += atributo.getCstDotA(this.idSent + cont);
                }
                else {
                    texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent + 1);
                    texto += atributo.getCstDotA(this.idSent + cont);
                }
                cont += 1;
            }
        }
        let idSent2 = this.idSent + 4 + this.listaAtributos.length;
        texto += Graficas_1.Graficas.getElement(idSent2 + 1, "CierreTagApertura", this.idSent + 1);
        texto += Graficas_1.Graficas.getElement(idSent2 + 2, ">", idSent2 + 1);
        if (this.listaHijos.length > 0) {
            let cont = 3;
            for (let hijo of this.listaHijos) {
                if (cont - 3 != this.listaHijos.length - 1) {
                    texto += Graficas_1.Graficas.getElement(idSent2 + cont, "LISTA_ETIQUETAS", idSent2 + cont + 1);
                    texto += hijo.getCstDotA(idSent2 + cont);
                }
                else {
                    texto += Graficas_1.Graficas.getElement(idSent2 + cont, "LISTA_ETIQUETAS", this.idSent);
                    texto += hijo.getCstDotA(idSent2 + cont);
                }
                cont += 1;
            }
        }
        else if (this.cadenaValores != "") {
            texto += Graficas_1.Graficas.getElement(idSent2 + 3, "CadenaValores", this.idSent);
            texto += Graficas_1.Graficas.getElement(idSent2 + 4, this.cadenaValores, idSent2 + 3);
        }
        let idSent3 = idSent2 + 4 + this.listaHijos.length;
        texto += Graficas_1.Graficas.getElement(idSent3 + 1, "TAG_CIERRE", this.idSent);
        texto += Graficas_1.Graficas.getElement(idSent3 + 2, "AbreTagCierre", idSent3 + 1);
        texto += Graficas_1.Graficas.getElement(idSent3 + 3, "</" + this.nombreTagCierre, idSent3 + 2);
        texto += Graficas_1.Graficas.getElement(idSent3 + 4, "CierreTagCierre", idSent3 + 1);
        texto += Graficas_1.Graficas.getElement(idSent3 + 5, ">", idSent3 + 4);
        return texto;
    }
    getCstDotD(idPadre) {
        let texto = "";
        texto += Graficas_1.Graficas.getElement(this.idSent, "ETIQUETA", idPadre);
        texto += Graficas_1.Graficas.getElement(this.idSent + 1, "TAG_APERTURA", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 2, "AbreTagApertura", this.idSent + 1);
        texto += Graficas_1.Graficas.getElement(this.idSent + 3, "<" + this.nombreTagAbre, this.idSent + 2);
        if (this.listaAtributos.length > 0) {
            let cont = 4;
            for (let atributo of this.listaAtributos) {
                if (cont === 4) {
                    texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent + 1);
                    texto += atributo.getCstDotA(this.idSent + cont);
                }
                else {
                    texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent + cont - 1);
                    texto += atributo.getCstDotA(this.idSent + cont);
                }
                cont += 1;
            }
        }
        let idSent2 = this.idSent + 4 + this.listaAtributos.length;
        texto += Graficas_1.Graficas.getElement(idSent2 + 1, "CierreTagApertura", this.idSent + 1);
        texto += Graficas_1.Graficas.getElement(idSent2 + 2, ">", idSent2 + 1);
        if (this.listaHijos.length > 0) {
            let cont = 3;
            for (let hijo of this.listaHijos) {
                if (cont === 3) {
                    texto += Graficas_1.Graficas.getElement(idSent2 + cont, "LISTA_ETIQUETAS", this.idSent);
                    texto += hijo.getCstDotD(idSent2 + cont);
                }
                else {
                    texto += Graficas_1.Graficas.getElement(idSent2 + cont, "LISTA_ETIQUETAS", idSent2 + cont - 1);
                    texto += hijo.getCstDotD(idSent2 + cont);
                }
                cont += 1;
            }
        }
        else if (this.cadenaValores != "") {
            texto += Graficas_1.Graficas.getElement(idSent2 + 3, "CadenaValores", this.idSent);
            texto += Graficas_1.Graficas.getElement(idSent2 + 4, this.cadenaValores, idSent2 + 3);
        }
        let idSent3 = idSent2 + 4 + this.listaHijos.length;
        texto += Graficas_1.Graficas.getElement(idSent3 + 1, "TAG_CIERRE", this.idSent);
        texto += Graficas_1.Graficas.getElement(idSent3 + 2, "AbreTagCierre", idSent3 + 1);
        texto += Graficas_1.Graficas.getElement(idSent3 + 3, "</" + this.nombreTagCierre, idSent3 + 2);
        texto += Graficas_1.Graficas.getElement(idSent3 + 4, "CierreTagCierre", idSent3 + 1);
        texto += Graficas_1.Graficas.getElement(idSent3 + 5, ">", idSent3 + 4);
        return texto;
    }
}
exports.EtiquetaDoble = EtiquetaDoble;


/***/ }),

/***/ "GvPq":
/*!*******************************************!*\
  !*** ./src/Backend/build/Xml/Atributo.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Graficas_1 = __webpack_require__(/*! ../Graficas/Graficas */ "nnRf");
const Fila_1 = __webpack_require__(/*! ./Fila */ "jn+f");
const Tipos_1 = __webpack_require__(/*! ./Tipos */ "OkFX");
class Atributo {
    constructor(nombre, valor, linea, columna, idSent) {
        this.etiquetaContendora = null;
        this.nombre = nombre;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.idSent = idSent;
    }
    getAmbito() {
        let listaAmbito = [];
        for (let etiqueta = this.etiquetaContendora; etiqueta != null; etiqueta = etiqueta.padre) {
            listaAmbito.push(etiqueta.getName());
        }
        listaAmbito.push("GLOBAL");
        return listaAmbito;
    }
    getAsRowTable() {
        return (new Fila_1.Fila(this.nombre, Tipos_1.Tipos.ATRIBUTO, this.getAmbito(), this.linea, this.columna, this.imprimir()));
    }
    imprimir() {
        let texto = "";
        texto = this.nombre + "=" + this.valor;
        return texto;
    }
    getCstDotA(idPadre) {
        let texto = "";
        texto += Graficas_1.Graficas.getElement(this.idSent, "ATRIBUTO", idPadre);
        texto += Graficas_1.Graficas.getElement(this.idSent + 1, "NombreAtributo", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 2, this.nombre, this.idSent + 1);
        texto += Graficas_1.Graficas.getElement(this.idSent + 4, "IgualAtributo", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 5, "=", this.idSent + 4);
        texto += Graficas_1.Graficas.getElement(this.idSent + 6, "ValorAtributo", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 7, this.valor.split("\"").join("\"\"  "), this.idSent + 6);
        return texto;
    }
}
exports.Atributo = Atributo;


/***/ }),

/***/ "Jixd":
/*!****************************************!*\
  !*** ./src/Backend/build/Xml/Tabla.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TipoSeleccion_1 = __webpack_require__(/*! ../Xpath/TipoSeleccion */ "OjI0");
const TipoVal_1 = __webpack_require__(/*! ../Xpath/TipoVal */ "eU3H");
function sonAmbitosIguales(ambito1, ambito2) {
    if (ambito1.length === ambito2.length) {
        for (let i = 0; i < ambito1.length; i++) {
            if (ambito1[i] != ambito2[i]) {
                return false;
            }
        }
    }
    else {
        return false;
    }
    return true;
}
function esSimboloIgual(elemBusqueda, fila) {
    if (elemBusqueda.nombre == fila.nombre &&
        sonAmbitosIguales(elemBusqueda.listaAmbito, fila.listaAmbito)) {
        return true;
    }
    return false;
}
class Tabla {
    constructor() {
        this.filas = [];
    }
    addFila(fila) {
        this.filas.push(fila);
    }
    buscar(resXpath, elemBusqueda = {
        nombre: "",
        tipo: "",
        listaAmbito: ['GLOBAL']
    }) {
        let texto = "";
        for (let set of resXpath) {
            if (set.tipo === TipoSeleccion_1.TipoSeleccion.ACCESO_NODO_RAIZ && set.predicado == null) {
                for (let fila of this.filas) {
                    if (fila.nombre === set.id && fila.listaAmbito[0] === 'GLOBAL') {
                        texto += fila.valor;
                    }
                }
            }
            if (set.tipo === TipoSeleccion_1.TipoSeleccion.SELECT_NODOS_FROM_NODO) {
                elemBusqueda.nombre = set.id;
                if (set.selector === "//" && set.predicado == null && set.next == null) {
                    for (let fila of this.filas) {
                        if (fila.nombre == elemBusqueda.nombre) {
                            if (!texto.includes(fila.valor)) {
                                return fila.valor;
                            }
                        }
                    }
                }
                if (set.predicado != null) {
                    let opBinaria = set.predicado;
                    let res = opBinaria.ejecutar();
                    if (res.tipo === TipoVal_1.TipoVal.ENTERO) {
                        let cont = 0;
                        for (let fila of this.filas) {
                            if (fila.nombre == elemBusqueda.nombre) {
                                if (!texto.includes(fila.valor) && cont === res.valor - 1) {
                                    return fila.valor;
                                }
                                cont += 1;
                            }
                        }
                    }
                }
                if (set.next === null) {
                    for (let fila of this.filas) {
                        if (esSimboloIgual(elemBusqueda, fila)) {
                            texto += fila.valor;
                        }
                    }
                }
                if (set.next != null) {
                    elemBusqueda.listaAmbito.unshift(set.id);
                    texto += this.buscar([set.next], elemBusqueda);
                }
            }
            elemBusqueda = {
                nombre: "",
                tipo: "",
                listaAmbito: ['GLOBAL']
            };
            texto += "\n";
        }
        return texto;
    }
}
exports.Tabla = Tabla;


/***/ }),

/***/ "O0zG":
/*!*******************************************!*\
  !*** ./src/Backend/build/Grammar/xmlA.js ***!
  \*******************************************/
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
var xmlA = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [1, 8], $V1 = [1, 14], $V2 = [6, 12, 15], $V3 = [1, 18], $V4 = [14, 17, 19, 21], $V5 = [10, 12, 15];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "XML": 3, "TAG_CONFIGURACION": 4, "LISTA_ETIQUETAS": 5, "EOF": 6, "ETIQUETA": 7, "TAG_APERTURA": 8, "TAG_CIERRE": 9, "CadenaValores": 10, "TAG_UNICO": 11, "AbreTagApertura": 12, "LISTA_ATRIBUTOS": 13, "CierreTagApertura": 14, "AbreTagCierre": 15, "CierreTagCierre": 16, "CierreTagUnico": 17, "AbreTagConf": 18, "CierreTagConf": 19, "ATRIBUTO": 20, "NombreAtributo": 21, "IgualAtributo": 22, "ValorAtributo": 23, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 6: "EOF", 10: "CadenaValores", 12: "AbreTagApertura", 14: "CierreTagApertura", 15: "AbreTagCierre", 16: "CierreTagCierre", 17: "CierreTagUnico", 18: "AbreTagConf", 19: "CierreTagConf", 21: "NombreAtributo", 22: "IgualAtributo", 23: "ValorAtributo" },
        productions_: [0, [3, 3], [3, 2], [5, 2], [5, 1], [7, 3], [7, 3], [7, 2], [7, 1], [8, 3], [8, 2], [9, 2], [11, 3], [11, 2], [4, 3], [13, 2], [13, 1], [20, 3]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    this.$ = new XmlResultado($$[$0 - 2], $$[$0 - 1]);
                    return this.$;
                    break;
                case 2:
                    this.$ = new XmlResultado(null, $$[$0]);
                    return this.$;
                    break;
                case 3:
                case 15:
                    $$[$0 - 1].push($$[$0]);
                    this.$ = $$[$0 - 1];
                    break;
                case 4:
                case 16:
                    this.$ = [$$[$0]];
                    break;
                case 5:
                    this.$ = new EtiquetaDoble($$[$0 - 2].nombreTagApertura, $$[$0], $$[$0 - 2].listaAtributos, '', $$[$0 - 1], _$[$0 - 2].first_line, _$[$0 - 2].first_column, getId());
                    break;
                case 6:
                    this.$ = new EtiquetaDoble($$[$0 - 2].nombreTagApertura, $$[$0], $$[$0 - 2].listaAtributos, $$[$0 - 1], [], _$[$0 - 2].first_line, _$[$0 - 2].first_column, getId());
                    break;
                case 7:
                    this.$ = new EtiquetaDoble($$[$0 - 1].nombreTagApertura, $$[$0], $$[$0 - 1].listaAtributos, '', [], _$[$0 - 1].first_line, _$[$0 - 1].first_column, getId());
                    break;
                case 8:
                    this.$ = $$[$0];
                    break;
                case 9:
                    this.$ = {
                        nombreTagApertura: formatTagName($$[$0 - 2]),
                        listaAtributos: $$[$0 - 1]
                    };
                    break;
                case 10:
                    this.$ = {
                        nombreTagApertura: formatTagName($$[$0 - 1]),
                        listaAtributos: []
                    };
                    break;
                case 11:
                    this.$ = formatTagName(formatTagName($$[$0 - 1]));
                    break;
                case 12:
                    this.$ = new EtiquetaSimple(formatTagName($$[$0 - 2]), $$[$0 - 1], _$[$0 - 2].first_line, _$[$0 - 2].first_column, getId());
                    break;
                case 13:
                    this.$ = new EtiquetaSimple(formatTagName($$[$0 - 1]), [], _$[$0 - 1].first_line, _$[$0 - 1].first_column, getId());
                    break;
                case 14:
                    this.$ = new EtiquetaInicio($$[$0 - 1], _$[$0 - 2].first_line, _$[$0 - 2].first_column, getId());
                    break;
                case 17:
                    this.$ = new Atributo($$[$0 - 2], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column, getId());
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 5: 3, 7: 5, 8: 6, 11: 7, 12: $V0, 18: [1, 4] }, { 1: [3] }, { 5: 9, 7: 5, 8: 6, 11: 7, 12: $V0 }, { 6: [1, 10], 7: 11, 8: 6, 11: 7, 12: $V0 }, { 13: 12, 20: 13, 21: $V1 }, o($V2, [2, 4]), { 5: 15, 7: 5, 8: 6, 9: 17, 10: [1, 16], 11: 7, 12: $V0, 15: $V3 }, o($V2, [2, 8]), { 13: 19, 14: [1, 20], 17: [1, 21], 20: 13, 21: $V1 }, { 6: [1, 22], 7: 11, 8: 6, 11: 7, 12: $V0 }, { 1: [2, 2] }, o($V2, [2, 3]), { 19: [1, 23], 20: 24, 21: $V1 }, o($V4, [2, 16]), { 22: [1, 25] }, { 7: 11, 8: 6, 9: 26, 11: 7, 12: $V0, 15: $V3 }, { 9: 27, 15: $V3 }, o($V2, [2, 7]), { 16: [1, 28] }, { 14: [1, 29], 17: [1, 30], 20: 24, 21: $V1 }, o($V5, [2, 10]), o($V2, [2, 13]), { 1: [2, 1] }, { 12: [2, 14] }, o($V4, [2, 15]), { 23: [1, 31] }, o($V2, [2, 5]), o($V2, [2, 6]), o($V2, [2, 11]), o($V5, [2, 9]), o($V2, [2, 12]), o($V4, [2, 17])],
        defaultActions: { 10: [2, 2], 22: [2, 1], 23: [2, 14] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
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
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            }
            else {
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
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                }
                else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    }
                    else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
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
                        }
                        else {
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
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [
                                lstack[lstack.length - (len || 1)].range[0],
                                lstack[lstack.length - 1].range[1]
                            ];
                        }
                        r = this.performAction.apply(yyval, [
                            yytext,
                            yyleng,
                            yylineno,
                            sharedState.yy,
                            action[1],
                            vstack,
                            lstack
                        ].concat(args));
                        if (typeof r !== 'undefined') {
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
        } };
    const { EtiquetaDoble } = __webpack_require__(/*! ../Xml/EtiquetaDoble */ "EfQ4");
    const { EtiquetaSimple } = __webpack_require__(/*! ../Xml/EtiquetaSimple */ "XPWx");
    const { EtiquetaInicio } = __webpack_require__(/*! ../Xml/EtiquetaInicio */ "oO3V");
    const { Atributo } = __webpack_require__(/*! ../Xml/Atributo */ "GvPq");
    const { XmlResultado } = __webpack_require__(/*! ../Xml/XmlResultado */ "6FQ4");
    let idSent = 1;
    function getId() {
        idSent += 100;
        return idSent;
    }
    function formatTagName(AbreTagApertura) {
        return AbreTagApertura.substring(1, AbreTagApertura.length);
    }
    /* generated by jison-lex 0.3.4 */
    var lexer = (function () {
        var lexer = ({
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                }
                else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
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
                }
                else {
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
                    last_column: lines ?
                        (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                            + oldLines[oldLines.length - lines.length].length - lines[0].length :
                        this.yylloc.first_column - len
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
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
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
                            last_column: this.yylloc.last_column
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
                        done: this.done
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
                    last_column: lines ?
                        lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                        this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                }
                else if (this._backtrack) {
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
                    this.yytext = '';
                    this.match = '';
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
                            }
                            else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            }
                            else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        }
                        else if (!this.options.flex) {
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
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                }
                else {
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
                }
                else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                }
                else {
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
            options: { "case-insensitive": true },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        this.begin("Comentario");
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        this.popState();
                        break;
                    case 4:
                        break;
                    case 5:
                        this.begin("TagApertura");
                        return 18;
                        break;
                    case 6:
                        break;
                    case 7:
                        return 21;
                        break;
                    case 8:
                        return 22;
                        break;
                    case 9:
                        return 23;
                        break;
                    case 10:
                        this.popState();
                        return 19;
                        break;
                    case 11:
                        this.begin("TagApertura");
                        return 12;
                        break;
                    case 12:
                        break;
                    case 13:
                        return 21;
                        break;
                    case 14:
                        return 22;
                        break;
                    case 15:
                        return 23;
                        break;
                    case 16:
                        this.popState();
                        return 14;
                        break;
                    case 17:
                        this.popState();
                        return 17;
                        break;
                    case 18:
                        this.begin("TagCierre");
                        return 15;
                        break;
                    case 19:
                        this.popState();
                        return 16;
                        break;
                    case 20:
                        break;
                    case 21:
                        return 10;
                        break;
                    case 22:
                        return 6;
                        break;
                    case 23:
                        console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                        break;
                }
            },
            rules: [/^(?:<!--)/i, /^(?:[\r\t]+)/i, /^(?:\n)/i, /^(?:-->)/i, /^(?:[^"-->"]+)/i, /^(?:<\?xml\b)/i, /^(?:[\s\r\t\n]+)/i, /^(?:[a-zA-Z_][a-zA-Z0-9_]*)/i, /^(?:=)/i, /^(?:"[^\"\n]*")/i, /^(?:\?>)/i, /^(?:<[a-zA-Z_][a-zA-Z0-9_]*)/i, /^(?:[\s\r\t\n]+)/i, /^(?:[a-zA-Z_][a-zA-Z0-9_]*)/i, /^(?:=)/i, /^(?:"[^\"\n]*")/i, /^(?:>)/i, /^(?:\/>)/i, /^(?:<\/[a-zA-Z_][a-zA-Z0-9_]*)/i, /^(?:>)/i, /^(?:[\s\r\t\n]+)/i, /^(?:[^<]+)/i, /^(?:$)/i, /^(?:.)/i],
            conditions: { "TagCierre": { "rules": [19], "inclusive": false }, "TagApertura": { "rules": [6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17], "inclusive": false }, "Comentario": { "rules": [1, 2, 3, 4], "inclusive": false }, "INITIAL": { "rules": [0, 5, 11, 18, 20, 21, 22, 23], "inclusive": true } }
        });
        return lexer;
    })();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser;
})();
if (true) {
    exports.parser = xmlA;
    exports.Parser = xmlA.Parser;
    exports.parse = function () { return xmlA.parse.apply(xmlA, arguments); };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = __webpack_require__(/*! fs */ 1).readFileSync(__webpack_require__(/*! path */ 2).normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "OjI0":
/*!**************************************************!*\
  !*** ./src/Backend/build/Xpath/TipoSeleccion.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TipoSeleccion;
(function (TipoSeleccion) {
    TipoSeleccion["ACCESO_NODO_RAIZ"] = "ACCESO_NODO_RAIZ";
    TipoSeleccion["SELECT_NODOS_FROM_NODO"] = "SELECT_NODOS_FROM_NODO";
})(TipoSeleccion = exports.TipoSeleccion || (exports.TipoSeleccion = {}));


/***/ }),

/***/ "OkFX":
/*!****************************************!*\
  !*** ./src/Backend/build/Xml/Tipos.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Tipos;
(function (Tipos) {
    Tipos["ETIQUETA_DOBLE"] = "ETIQUETA_DOBLE";
    Tipos["ETIQUETA_SIMPLE"] = "ETIQUETA_SIMPLE";
    Tipos["ETIQUETA_UNICA"] = "ETIQUETA_UNICA";
    Tipos["ATRIBUTO"] = "ATRIBUTO";
    Tipos["VALOR"] = "VALOR";
})(Tipos = exports.Tipos || (exports.Tipos = {}));


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class AppComponent {
    constructor() {
        this.title = 'frontend';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "U/w1":
/*!***********************************************************!*\
  !*** ./src/Backend/src_backend/Reportes/TablaSimbolos.ts ***!
  \***********************************************************/
/*! exports provided: SimbolsReport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimbolsReport", function() { return SimbolsReport; });
class SimbolsReport {
    constructor() {
        this.Lista = [];
    }
    static Llenado_tabla() {
    }
    static REPORTE() {
        console.log("suuuuu adentro");
        var grafo = "";
        grafo += "<html ><head><title>Reporte </title>    </head>";
        grafo += "<body class=\"MIfondo\">\n";
        grafo += "<div align=\"center\"  class=\"MIfondo\"> \n";
        grafo += "<h1 class = \"tituloTb\">TABLA DE SIMBOLOS </h1>\n";
        grafo += "<table border=\"2\" align=\"center\" class=\"tabl\">\n";
        grafo += "<tr>\n";
        grafo += "<th>Nombre</th>  <th>Tipo</th><th>Ambito</th><th>Fila</th><th>Columna</th><th>Valor</th>\n";
        grafo += "</tr>\n";
        grafo += SimbolsReport.aux;
        grafo += "</table>\n";
        grafo += "</div>\n";
        grafo += "</body>\n";
        grafo += "</html>\n";
    }
}
SimbolsReport.aux = "";


/***/ }),

/***/ "XPWx":
/*!*************************************************!*\
  !*** ./src/Backend/build/Xml/EtiquetaSimple.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Fila_1 = __webpack_require__(/*! ./Fila */ "jn+f");
const Tipos_1 = __webpack_require__(/*! ./Tipos */ "OkFX");
const Tabla_1 = __webpack_require__(/*! ./Tabla */ "Jixd");
const Graficas_1 = __webpack_require__(/*! ../Graficas/Graficas */ "nnRf");
class EtiquetaSimple {
    constructor(nombreTag, listaAtributos, linea, columna, idSent) {
        this.nombreTag = nombreTag;
        this.padre = null;
        this.listaAtributos = listaAtributos;
        this.linea = linea;
        this.columna = columna;
        this.idSent = idSent;
        this.listaAtributos.forEach(atributo => {
            atributo.etiquetaContendora = this;
        });
    }
    getName() {
        return this.nombreTag;
    }
    getAmbito() {
        let listaAmbito = [];
        for (let etiqueta = this.padre; etiqueta != null; etiqueta = etiqueta.padre) {
            listaAmbito.push(etiqueta.getName());
        }
        listaAmbito.push("GLOBAL");
        return listaAmbito;
    }
    imprimir() {
        let texto = "";
        texto += "<" + this.nombreTag;
        this.listaAtributos.forEach(atributo => {
            texto += " " + atributo.imprimir();
        });
        texto += "/> \n";
        return texto;
    }
    getAsTable() {
        let tabla = new Tabla_1.Tabla();
        tabla.addFila(new Fila_1.Fila(this.getName(), Tipos_1.Tipos.ETIQUETA_SIMPLE, this.getAmbito(), this.linea, this.columna, this.imprimir()));
        this.listaAtributos.forEach(atributo => {
            tabla.addFila(atributo.getAsRowTable());
        });
        return tabla;
    }
    getErroresSemanticos() {
        let texto = "";
        this.listaAtributos.forEach(atributo => {
            let apariciones = 0;
            for (let atr2 of this.listaAtributos) {
                if (atributo.nombre == atr2.nombre) {
                    apariciones += 1;
                }
                if (apariciones > 1) {
                    texto += `Error(Linea: ${atributo.linea}, Columna: ${atributo.columna}): El atributo '${atributo.nombre}' se encuentra repetido.\n`;
                    break;
                }
            }
        });
        return texto;
    }
    getCstDotA(idPadre) {
        let texto = "";
        texto += Graficas_1.Graficas.getElement(this.idSent, "TAG_UNICO", idPadre);
        texto += Graficas_1.Graficas.getElement(this.idSent + 1, "AbreTagCierre", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 2, "<" + this.nombreTag, this.idSent + 1);
        if (this.listaAtributos.length > 0) {
            let cont = 3;
            for (let atributo of this.listaAtributos) {
                if (cont - 3 != this.listaAtributos.length - 1) {
                    texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent + cont + 1);
                    texto += atributo.getCstDotA(this.idSent + cont);
                }
                else {
                    texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent);
                    texto += atributo.getCstDotA(this.idSent + cont);
                }
                cont += 1;
            }
        }
        texto += Graficas_1.Graficas.getElement(this.idSent + 3 + this.listaAtributos.length, "CierreTagCierre", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 4 + this.listaAtributos.length, "\\>", this.idSent + 3 + this.listaAtributos.length);
        return texto;
    }
    getCstDotD(idPadre) {
        let texto = "";
        texto += Graficas_1.Graficas.getElement(this.idSent, "TAG_UNICO", idPadre);
        texto += Graficas_1.Graficas.getElement(this.idSent + 1, "AbreTagCierre", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 2, "<" + this.nombreTag, this.idSent + 1);
        if (this.listaAtributos.length > 0) {
            let cont = 3;
            for (let atributo of this.listaAtributos) {
                let cont = 3;
                for (let atributo of this.listaAtributos) {
                    if (cont === 3) {
                        texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent + 1);
                        texto += atributo.getCstDotA(this.idSent + cont);
                    }
                    else {
                        texto += Graficas_1.Graficas.getElement(this.idSent + cont, "LISTA_ATRIBUTOS", this.idSent + cont - 1);
                        texto += atributo.getCstDotA(this.idSent + cont);
                    }
                    cont += 1;
                }
            }
        }
        texto += Graficas_1.Graficas.getElement(this.idSent + 3 + this.listaAtributos.length, "CierreTagCierre", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 4 + this.listaAtributos.length, "\\>", this.idSent + 3 + this.listaAtributos.length);
        return texto;
    }
}
exports.EtiquetaSimple = EtiquetaSimple;


/***/ }),

/***/ "YJIf":
/*!*******************************************************!*\
  !*** ./src/app/components/editor/editor.component.ts ***!
  \*******************************************************/
/*! exports provided: EditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorComponent", function() { return EditorComponent; });
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! file-saver */ "Iab2");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vis */ "TycK");
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vis__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _materia_ui_ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @materia-ui/ngx-monaco-editor */ "0LvA");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var src_app_services_compilador_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/compilador.service */ "+HJF");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tabla-simbolos/tabla-simbolos.component */ "f1JB");


//importamos para el editor









function EditorComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EditorComponent_div_29_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6); const i_r4 = ctx.index; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r5.indiceEditorActual = i_r4; });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EditorComponent_div_29_Template_div_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r7.imprimir(); })("click", function EditorComponent_div_29_Template_div_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6); const i_r4 = ctx.index; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r8.eliminarEditor(i_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "x");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r4 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("TAB_", i_r4, "");
} }
function EditorComponent_div_52_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-tabla-simbolos", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("tablaSimbolos", ctx_r1.tablaSimbolos);
} }
function EditorComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "img", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, " alv ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("src", ctx_r2.astBase64, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
} }
class EditorComponent {
    constructor(sanitizer, monacoLoaderService, compiladorService) {
        this.sanitizer = sanitizer;
        this.monacoLoaderService = monacoLoaderService;
        this.compiladorService = compiladorService;
        this.nombreArchivo = "Choose file";
        this.reporteSelccionado = "";
        this.textoEditores = [""];
        this.indiceEditorActual = 0;
        this.console = "";
        this.xpath = "";
        this.monacoComponent = new _materia_ui_ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_3__["MonacoEditorComponent"](this.monacoLoaderService);
        this.editorOptions = {
            theme: 'myCustomTheme',
            language: '',
            roundedSelection: true,
            autoIndent: "full"
        };
        this.consoleOptions = {
            theme: 'myCustomTheme',
            language: 'XML',
            roundedSelection: true,
            autoIndent: "full",
            readOnly: true
        };
        this.XpathOptions = {
            theme: 'myCustomTheme',
            language: '',
            roundedSelection: true,
            autoIndent: "full",
            readOnly: true
        };
        this.monacoLoaderService.isMonacoLoaded$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(isLoaded => isLoaded), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1))
            .subscribe(() => {
            monaco.editor.defineTheme('myCustomTheme', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                    {
                        token: 'comment',
                        foreground: 'ffa500',
                        fontStyle: 'italic underline'
                    },
                    { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
                    { token: 'comment.css', foreground: '0000ff' } // will inherit fontStyle from `comment` above
                ],
                colors: {}
            });
        });
    }
    editorInit(editor) {
        editor.setSelection({
            startLineNumber: 1,
            startColumn: 1,
            endColumn: 500,
            endLineNumber: 3
        });
    }
    ngOnInit() {
    }
    compilar() {
        this.console = "";
        this.xpath = "";
        this.astJson = [];
        this.tablaSimbolos = this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual]).simbolo;
        // this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual])
        // viz("string en dot")
        // format: 'png-image-element'
        /*   this.console = res.consola
          this.astJson = res.arbol
          this.tablaSimbolos = res.tablaSimbolos
          this.astBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image;base64, ${res.astBase64}`)
        */
        this.prueba(this.compiladorService.analizar(this.textoEditores[this.indiceEditorActual]).cst);
    }
    seleccionarArchivo(event) {
        this.nombreArchivo = event.target.files[0].name;
        this.archivo = event.target.files[0];
    }
    prueba(grafo) {
        console.log("grafo0000000" + grafo);
        const container = document.getElementById("app");
        // provide data in the DOT language
        var DOTstring = grafo;
        var parsedData = vis__WEBPACK_IMPORTED_MODULE_1__["network"].convertDot(DOTstring);
        var options = parsedData.options;
        options["physics"] = {
            enabled: false
        };
        options["layout"] = {
            improvedLayout: true,
            hierarchical: {
                enabled: true,
                levelSeparation: 150,
                treeSpacing: 35,
                blockShifting: true,
                edgeMinimization: true,
                parentCentralization: true,
                direction: "UD",
                sortMethod: "directed"
            },
            font: {
                size: 15,
                color: 'gray'
            },
            borderWidth: 2
        };
        var network = new vis__WEBPACK_IMPORTED_MODULE_1__["Network"](container, parsedData, options);
        network.on("stabilizationIterationsDone", function () {
            network.setOptions({ physics: false });
        });
    }
    cargarArchivo() {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = reader.result.toString().trim();
            this.textoEditores[this.indiceEditorActual] = text;
        };
        reader.readAsText(this.archivo);
    }
    agregarTab() {
        this.textoEditores.push("");
        this.indiceEditorActual = this.textoEditores.length - 1;
    }
    eliminarEditor(i) {
        if (i != 0) {
            this.textoEditores.splice(i, 1);
            this.indiceEditorActual = 0;
        }
        else {
            this.textoEditores[0] = "";
        }
    }
    guardar() {
        var file = new File([this.textoEditores[this.indiceEditorActual]], "Codigo.ty", {
            type: "text/plain",
        });
        Object(file_saver__WEBPACK_IMPORTED_MODULE_0__["saveAs"])(file);
    }
    selectReporte(opcion) {
        this.reporteSelccionado = opcion;
    }
    imprimir() {
    }
}
EditorComponent.ɵfac = function EditorComponent_Factory(t) { return new (t || EditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_materia_ui_ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_3__["MonacoEditorLoaderService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_compilador_service__WEBPACK_IMPORTED_MODULE_6__["CompiladorService"])); };
EditorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: EditorComponent, selectors: [["app-editor"]], viewQuery: function EditorComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_materia_ui_ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_3__["MonacoEditorComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.monacoComponent = _t.first);
    } }, decls: 71, vars: 11, consts: [[1, "navbar", "navbar-expand-lg", "navbar-dark"], ["type", "button", "data-toggle", "collapse", "data-target", "#navbarColor01", "aria-controls", "navbarColor01", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "navbar-toggler"], [1, "navbar-toggler-icon"], ["id", "navbarColor01", 1, "navbar"], [1, "navbar-nav", "mr-auto"], [1, "nav-item", "active"], ["type", "button", 1, "btn", "btn-primary", "principal", 3, "click"], [1, "nav-item"], [1, "btn", "btn-primary", "opcion", 3, "click"], ["type", "button", 1, "btn", "btn-primary", "opcion", 3, "click"], [1, "card-body"], [1, "monacoCointeiner", 2, "width", "850px", "height", "400px", "margin", "auto"], [1, "card", "text-white", "tarjeta"], ["aria-readonly", "true", 3, "options", "ngModel", "ngModelChange", "init"], [1, "container-fluid"], [1, "row", "justify-content-center", "contenedor"], [1, "col-md-12"], [1, "row"], [1, "col-md-6"], [1, "card-header"], [1, "lab"], ["type", "button", "class", "btn btn-primary tab verde", 3, "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", "btn-primary", "mas", "verde", 3, "click"], ["type", "button", "data-toggle", "modal", "data-target", "#exampleModal", 1, "btn", "btn-primary", "op", "mas", "verde", 3, "click"], ["type", "button", 1, "btn", "btn-primary", "op", "mas", "verde", 3, "click"], [1, "monacoCointeiner", 2, "width", "auto", "height", "450px"], [3, "options", "ngModel", "ngModelChange", "init"], ["type", "button", 1, "btn", "btn-primary", "mas", "op", "verde", 3, "click"], [1, "monacoCointeiner", 2, "width", "auto", "height", "458px"], [4, "ngIf"], ["id", "app", 4, "ngIf"], ["id", "app", 2, "width", "auto", "height", "1000px"], [1, "zoom", 3, "src"], ["id", "exampleModal", "tabindex", "-1", "role", "dialog", "aria-labelledby", "exampleModalLabel", "aria-hidden", "true", 1, "modal", "fade"], ["role", "document", 1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], ["id", "exampleModalLabel", 1, "modal-title"], [1, "modal-body"], [1, "input-group"], [1, "custom-file"], ["type", "file", "id", "inputGroupFile01", "aria-describedby", "inputGroupFileAddon01", 1, "custom-file-input", 3, "change"], ["for", "inputGroupFile01", "id", "choosedFile", "accept", ".xml", 1, "custom-file-label"], [1, "modal-footer"], ["type", "button", "data-dismiss", "modal", 1, "btn", "btn-primary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", "tab", "verde", 3, "click"], [1, "equis"], ["type", "button", 1, "btn", "btn-primary", "equisa", "verde", 3, "click"], [3, "tablaSimbolos"], ["id", "app"]], template: function EditorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ul", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_6_listener() { return ctx.selectReporte("editor"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Compilador");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_9_listener() { return ctx.selectReporte("arbolAst"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "Arbol AST");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_12_listener() { return ctx.selectReporte("tablaSimbolos"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, "REPORTES");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, " XPATH ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "ngx-monaco-editor", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function EditorComponent_Template_ngx_monaco_editor_ngModelChange_18_listener($event) { return ctx.xpath = $event; })("init", function EditorComponent_Template_ngx_monaco_editor_init_18_listener($event) { return ctx.editorInit($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](22, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "p", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](28, "Editor");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](29, EditorComponent_div_29_Template, 5, 1, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "button", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_30_listener() { return ctx.agregarTab(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](31, "+");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_32_listener() { return ctx.imprimir(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](33, " Cargar Archivo ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_34_listener() { return ctx.guardar(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](35, "Guardar");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](36, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](37, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "ngx-monaco-editor", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function EditorComponent_Template_ngx_monaco_editor_ngModelChange_38_listener($event) { return (ctx.textoEditores[ctx.indiceEditorActual] = $event); })("init", function EditorComponent_Template_ngx_monaco_editor_init_38_listener($event) { return ctx.editorInit($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](39, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](40, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](41, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](42, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](43, " Consola ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](44, "button", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_44_listener() { return ctx.compilar(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](45, "Compilar");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](46, "button", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_46_listener() { return ctx.console = ""; });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](47, "Limpiar");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](48, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](49, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](50, "ngx-monaco-editor", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function EditorComponent_Template_ngx_monaco_editor_ngModelChange_50_listener($event) { return ctx.console = $event; })("init", function EditorComponent_Template_ngx_monaco_editor_init_50_listener($event) { return ctx.editorInit($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](51, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](52, EditorComponent_div_52_Template, 2, 1, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](53, EditorComponent_div_53_Template, 3, 1, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](54, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](55, "img", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](56, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](57, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](58, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](59, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](60, "h5", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](61, "Cargar archivo de entrada");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](62, "div", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](63, "div", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](64, "div", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](65, "input", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function EditorComponent_Template_input_change_65_listener($event) { return ctx.seleccionarArchivo($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](66, "label", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](67);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](68, "div", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](69, "button", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function EditorComponent_Template_button_click_69_listener() { return ctx.cargarArchivo(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](70, "Continuar");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("options", ctx.editorOptions)("ngModel", ctx.xpath);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.textoEditores);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("options", ctx.editorOptions)("ngModel", ctx.textoEditores[ctx.indiceEditorActual]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("options", ctx.consoleOptions)("ngModel", ctx.console);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.reporteSelccionado === "tablaSimbolos");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.reporteSelccionado === "arbolAst");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("src", ctx.astBase64, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.nombreArchivo);
    } }, directives: [_materia_ui_ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_3__["MonacoEditorComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_9__["TablaSimbolosComponent"]], styles: ["ngx-monaco-editor[_ngcontent-%COMP%] {\r\n    height: 400px;\r\n    width: 100%;\r\n    padding: 15px;\r\n}\r\n\r\n.principal[_ngcontent-%COMP%] {\r\n    background-color: black;\r\n}\r\n\r\n.contenedor[_ngcontent-%COMP%] {\r\n    margin-bottom: 25px;\r\n}\r\n\r\n.op[_ngcontent-%COMP%] {\r\n    margin-right: 2.4px;\r\n}\r\n\r\n.mas[_ngcontent-%COMP%] {\r\n    float: right;\r\n}\r\n\r\n.tab[_ngcontent-%COMP%] {\r\n    height: 40px;\r\n    margin-right: 5px;\r\n}\r\n\r\np[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    margin-right: 10px;\r\n}\r\n\r\n.equis[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    margin-right: 5px;\r\n}\r\n\r\n.equisa[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    margin-top: -6px;\r\n}\r\n\r\n.tarjeta[_ngcontent-%COMP%] {\r\n    border-radius: 10px;\r\n}\r\n\r\n.monacoCointeiner[_ngcontent-%COMP%] {\r\n    margin-top: -40px;\r\n}\r\n\r\n.opcion[_ngcontent-%COMP%] {\r\n    background-color: #1E1E1E;\r\n}\r\n\r\n.verde[_ngcontent-%COMP%] {\r\n    background-color: #5db163;\r\n    border-color: #5db163;\r\n}\r\n\r\nbutton[_ngcontent-%COMP%]:hover, button[_ngcontent-%COMP%]:focus{\r\n    text-decoration: none;\r\n    outline: none;\r\n    background: #363636;\r\n}\r\n\r\n.tab[_ngcontent-%COMP%]:hover, .equisa[_ngcontent-%COMP%]:hover{\r\n    text-decoration: none;\r\n    outline: none;\r\n    background: #363636;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRvci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtJQUNiLFdBQVc7SUFDWCxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLHFCQUFxQjtJQUNyQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIscUJBQXFCO0FBQ3pCOztBQUVBOztJQUVJLHFCQUFxQjtJQUNyQixhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUVBOztJQUVJLHFCQUFxQjtJQUNyQixhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCIiwiZmlsZSI6ImVkaXRvci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsibmd4LW1vbmFjby1lZGl0b3Ige1xyXG4gICAgaGVpZ2h0OiA0MDBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZzogMTVweDtcclxufVxyXG5cclxuLnByaW5jaXBhbCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLmNvbnRlbmVkb3Ige1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjVweDtcclxufVxyXG5cclxuLm9wIHtcclxuICAgIG1hcmdpbi1yaWdodDogMi40cHg7XHJcbn1cclxuXHJcbi5tYXMge1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG59XHJcblxyXG4udGFiIHtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIG1hcmdpbi1yaWdodDogNXB4O1xyXG59XHJcblxyXG5wIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG5cclxuLmVxdWlzIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIG1hcmdpbi1yaWdodDogNXB4O1xyXG59XHJcblxyXG4uZXF1aXNhIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIG1hcmdpbi10b3A6IC02cHg7XHJcbn1cclxuXHJcbi50YXJqZXRhIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbn1cclxuXHJcbi5tb25hY29Db2ludGVpbmVyIHtcclxuICAgIG1hcmdpbi10b3A6IC00MHB4O1xyXG59XHJcblxyXG4ub3BjaW9uIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxRTFFMUU7XHJcbn1cclxuXHJcbi52ZXJkZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWRiMTYzO1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjNWRiMTYzO1xyXG59XHJcblxyXG5idXR0b246aG92ZXIsXHJcbmJ1dHRvbjpmb2N1c3tcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMzYzNjM2O1xyXG59XHJcblxyXG4udGFiOmhvdmVyLFxyXG4uZXF1aXNhOmhvdmVye1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICAgIGJhY2tncm91bmQ6ICMzNjM2MzY7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _components_editor_editor_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/editor/editor.component */ "YJIf");
/* harmony import */ var _materia_ui_ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @materia-ui/ngx-monaco-editor */ "0LvA");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var src_app_components_arbol_ast_arbol_ast_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/components/arbol-ast/arbol-ast.component */ "BP3C");
/* harmony import */ var _components_tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/tabla-simbolos/tabla-simbolos.component */ "f1JB");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "fXoL");











class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({ providers: [
        {
            provide: _materia_ui_ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_6__["MONACO_PATH"],
            useValue: 'https://unpkg.com/monaco-editor@0.19.3/min/vs'
        }
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
            _materia_ui_ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_6__["MonacoEditorModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
        _components_editor_editor_component__WEBPACK_IMPORTED_MODULE_5__["EditorComponent"],
        src_app_components_arbol_ast_arbol_ast_component__WEBPACK_IMPORTED_MODULE_8__["ArbolAstComponent"],
        _components_tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_9__["TablaSimbolosComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        _materia_ui_ngx_monaco_editor__WEBPACK_IMPORTED_MODULE_6__["MonacoEditorModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"]] }); })();


/***/ }),

/***/ "eU3H":
/*!********************************************!*\
  !*** ./src/Backend/build/Xpath/TipoVal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TipoVal;
(function (TipoVal) {
    TipoVal["ENTERO"] = "ENTERO";
    TipoVal["ID"] = "ID";
    TipoVal["DECIMAL"] = "DECIMAL";
    TipoVal["CADENA"] = "CADENA";
    TipoVal["ARROBA"] = "ARROBA";
    TipoVal["PUNTO"] = "PUTNO";
    TipoVal["LANG"] = "LANG";
    TipoVal["TEXTO"] = "TEXTO";
    TipoVal["POSICION"] = "POSICION";
    TipoVal["NODO"] = "NODO";
    TipoVal["BOLEANO"] = "BOLEANO";
    TipoVal["LAST"] = "LAST";
})(TipoVal = exports.TipoVal || (exports.TipoVal = {}));


/***/ }),

/***/ "f1JB":
/*!***********************************************************************!*\
  !*** ./src/app/components/tabla-simbolos/tabla-simbolos.component.ts ***!
  \***********************************************************************/
/*! exports provided: TablaSimbolosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablaSimbolosComponent", function() { return TablaSimbolosComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");


function TablaSimbolosComponent_tr_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const fila_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](fila_r4.nombre);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](fila_r4.tipo);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("-", fila_r4.listaAmbito.join("-"), "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](fila_r4.columna);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](fila_r4.fila);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("--", fila_r4.valor, "--");
} }
function TablaSimbolosComponent_tr_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "ALV");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "ALV");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "as");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const fila_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](fila_r5.columna);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](fila_r5.fila);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("--", fila_r5.valor, "--");
} }
function TablaSimbolosComponent_tr_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const fila_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](fila_r6.nombre);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](fila_r6.tipo);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("-", fila_r6.listaAmbito.join("-"), "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](fila_r6.columna);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](fila_r6.fila);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("--", fila_r6.valor, "--");
} }
function TablaSimbolosComponent_tr_51_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "ALV");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "ALV");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "as");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const fila_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](fila_r7.columna);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](fila_r7.fila);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("--", fila_r7.valor, "--");
} }
class TablaSimbolosComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
TablaSimbolosComponent.ɵfac = function TablaSimbolosComponent_Factory(t) { return new (t || TablaSimbolosComponent)(); };
TablaSimbolosComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TablaSimbolosComponent, selectors: [["app-tabla-simbolos"]], inputs: { tablaSimbolos: "tablaSimbolos" }, decls: 71, vars: 4, consts: [[1, "row", "justify-content-center", "tabla"], [1, "col-md-8", "tab"], [1, "nav", "nav-tabs", "justify-content-center"], [1, "nav-item", "active"], ["data-toggle", "tab", "href", "#simbolos", 1, "nav-link", "active"], ["id", "myTabContent", 1, "tab-content"], ["id", "simbolos", 1, "tab-pane", "fade", "in", "active", "show"], [1, "col-md-12"], [2, "width", "auto", "height", "auto"], [1, "table", "table-hover", "table-hover"], [4, "ngFor", "ngForOf"], ["id", "errores", 1, "tab-pane", "fade"], [1, "table", "table-danger", "table-hover"]], template: function TablaSimbolosComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Tabla de S\u00EDmbolos");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "table", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "NOMBRE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "TIPO_SIMBOLO");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "AMBITO");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "COLUMNA");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "FILA");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "VALOR");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, TablaSimbolosComponent_tr_27_Template, 13, 6, "tr", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, TablaSimbolosComponent_tr_28_Template, 13, 3, "tr", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Tabla de S\u00EDmbolos");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "table", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "NOMBRE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "TIPO_SIMBOLO");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "AMBITO");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "COLUMNA");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "FILA");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "VALOR");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](50, TablaSimbolosComponent_tr_50_Template, 13, 6, "tr", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](51, TablaSimbolosComponent_tr_51_Template, 13, 3, "tr", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](52, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "table", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "hola");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "mundo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.tablaSimbolos);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.tablaSimbolos);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.tablaSimbolos);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.tablaSimbolos);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0YWJsYS1zaW1ib2xvcy5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ "jn+f":
/*!***************************************!*\
  !*** ./src/Backend/build/Xml/Fila.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Fila {
    constructor(nombre, tipo, listaAmbito, fila, columna, valor) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.listaAmbito = listaAmbito;
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
    }
}
exports.Fila = Fila;


/***/ }),

/***/ "nnRf":
/*!************************************************!*\
  !*** ./src/Backend/build/Graficas/Graficas.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Graficas;
(function (Graficas) {
    function formatId(numId) {
        return "nodo" + numId.toString();
    }
    function defNodo(nodoId, etiqueta) {
        return formatId(nodoId) + "[label=\"" + etiqueta + "\"] \n";
    }
    Graficas.defNodo = defNodo;
    function defEdge(id1, id2) {
        return formatId(id1) + " -> " + formatId(id2) + "\n";
    }
    Graficas.defEdge = defEdge;
    function getElement(id, etiqueta, idPadre) {
        let dotText = "";
        dotText += defNodo(id, etiqueta);
        dotText += defEdge(idPadre, id);
        return dotText;
    }
    Graficas.getElement = getElement;
})(Graficas = exports.Graficas || (exports.Graficas = {}));


/***/ }),

/***/ "oO3V":
/*!*************************************************!*\
  !*** ./src/Backend/build/Xml/EtiquetaInicio.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Graficas_1 = __webpack_require__(/*! ../Graficas/Graficas */ "nnRf");
class EtiquetaInicio {
    constructor(listaAtributos, linea, columna, idSent) {
        this.linea = linea;
        this.columna = columna;
        this.idSent = idSent;
        listaAtributos.forEach(atributo => {
            if (atributo.nombre == "version") {
                this.version = atributo.valor;
            }
            else if (atributo.nombre == "encoding") {
                this.encoding = atributo.valor;
            }
        });
    }
    getCstDotA(idPadre) {
        let texto = "";
        texto += Graficas_1.Graficas.getElement(this.idSent, "TAG_CONFIGURACION", idPadre);
        texto += Graficas_1.Graficas.getElement(this.idSent + 1, "AbreTagConf", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 2, "<?", this.idSent + 1);
        texto += Graficas_1.Graficas.getElement(this.idSent + 3, "version", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 4, this.version.split("\"").join("\"\""), this.idSent + 3);
        texto += Graficas_1.Graficas.getElement(this.idSent + 5, "encoding", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 6, this.encoding.split("\"").join("\"\""), this.idSent + 5);
        texto += Graficas_1.Graficas.getElement(this.idSent + 7, "CierreTagConf", this.idSent);
        texto += Graficas_1.Graficas.getElement(this.idSent + 8, "?>", this.idSent + 7);
        return texto;
    }
}
exports.EtiquetaInicio = EtiquetaInicio;


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_editor_editor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/editor/editor.component */ "YJIf");
/* harmony import */ var src_app_components_arbol_ast_arbol_ast_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/arbol-ast/arbol-ast.component */ "BP3C");
/* harmony import */ var src_app_components_tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/tabla-simbolos/tabla-simbolos.component */ "f1JB");
/* harmony import */ var src_app_components_tabla_errores_tabla_errores_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/tabla-errores/tabla-errores.component */ "D4eS");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");







const routes = [
    {
        path: '',
        component: _components_editor_editor_component__WEBPACK_IMPORTED_MODULE_1__["EditorComponent"],
        children: [
            { path: 'arbolAst', component: src_app_components_arbol_ast_arbol_ast_component__WEBPACK_IMPORTED_MODULE_2__["ArbolAstComponent"] },
            { path: 'tablaDeSimbolos', component: src_app_components_tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_3__["TablaSimbolosComponent"] },
            { path: 'tablaDeErrores', component: src_app_components_tabla_errores_tabla_errores_component__WEBPACK_IMPORTED_MODULE_4__["TablaErroresComponent"] },
        ]
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
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
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map