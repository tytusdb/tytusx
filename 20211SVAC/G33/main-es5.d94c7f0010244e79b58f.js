function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./$$_lazy_route_resource lazy recursive":
  /*!******************************************************!*\
    !*** ./$$_lazy_route_resource lazy namespace object ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function $$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
  /*!**************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
    \**************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAppComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<router-outlet></router-outlet>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/bnf/bnf.component.html":
  /*!**************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/bnf/bnf.component.html ***!
    \**************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPaginasBnfBnfComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<table mat-table [dataSource]=\"simbolos\" class=\"mat-elevation-z8\">\n\n    <!--- Note that these columns can be defined in any order.\n    The actual rendered columns are set as a property on the row definition\" -->\n    <!-- Position Column -->\n    <ng-container matColumnDef=\"no\">\n      <th mat-header-cell *matHeaderCellDef> No. </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.no}} </td>\n    </ng-container>\n\n    <!-- Name Column -->\n    <ng-container matColumnDef=\"produccion\">\n      <th mat-header-cell *matHeaderCellDef> Produccion </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.produccion}} </td>\n    </ng-container>\n\n    <!-- Weight Column -->\n    <ng-container matColumnDef=\"accion\">\n      <th mat-header-cell *matHeaderCellDef> Accion </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.accion}} </td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n</table>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/grafico/grafico.component.html":
  /*!**********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/grafico/grafico.component.html ***!
    \**********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPaginasGraficoGraficoComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div id = \"vis\"></div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/principal/home.component.html":
  /*!*********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/principal/home.component.html ***!
    \*********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPaginasPrincipalHomeComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div id = \"barra\">\n  <mat-toolbar color = \"warn\">\n    <span>Tytus X</span>\n\n    <div class = \"spacer\"></div>\n\n    <button mat-raised-button color = \"accent\" [matMenuTriggerFor] = \"archivo\">Archivo</button>\n    <mat-menu #archivo = \"matMenu\">\n        <button mat-menu-item>\n            <mat-icon>attach_file</mat-icon>\n            <label for = \"file\">Abrir XML</label>\n            <input type = \"file\"\n            id = \"file\"\n            class = \"hidend\"\n            (change) = \"abrirXML($event.target.files)\">\n        </button>\n        <button mat-menu-item>\n            <mat-icon>attach_file</mat-icon>\n            <span>Abrir XPath</span>\n        </button>\n        <button mat-menu-item>\n            <mat-icon>delete</mat-icon>\n            <span>Limpiar</span>\n        </button>\n    </mat-menu>\n\n    <button mat-raised-button color = \"accent\" [matMenuTriggerFor] = \"ejecutar\">Ejecutar</button>\n    <mat-menu #ejecutar = \"matMenu\">\n        <button mat-menu-item (click) = \"ejecutarAscendente()\">\n            <mat-icon>keyboard_arrow_up</mat-icon>\n            <span>Ascendete</span>\n        </button>\n        <button mat-menu-item (click) = \"ejecutarDescendente()\"> \n            <mat-icon>keyboard_arrow_down</mat-icon>\n            <span>Descendente</span>\n        </button>\n    </mat-menu>\n\n    <button mat-raised-button color = \"accent\" [matMenuTriggerFor] = \"reporte\">Reportes</button>\n    <mat-menu #reporte = \"matMenu\">\n        <button mat-menu-item (click) = \"reporteTablaSimbolosXML()\">\n            <span>Tabla de simbolos XML</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteCSTXML()\">\n          <span>CST XML</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteASTXPATH()\">\n          <span>AST XPATH</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteCSTXPATH()\">\n          <span>CST XPATH</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteBNFXML()\">\n          <span>BNF XML</span>\n        </button>  \n        <button mat-menu-item (click) = \"reporteBNFXPATH()\">\n          <span>BNF XPATH</span>\n        </button>  \n      </mat-menu>\n</mat-toolbar>\n</div>\n\n<div id = \"superior\">\n  <ngx-codemirror\n    [options] = \"editorQueryOptions\"\n    [(ngModel)] = \"querys\">\n  </ngx-codemirror>\n</div>\n\n<div id = \"separador1\"></div>\n\n<div id = \"inferior\">\n  <div id = \"izquierda\">\n    <ngx-codemirror\n      [options] = \"editorXMLEntradaOptions\"\n      [(ngModel)] = \"xmlEntrada\">\n    </ngx-codemirror>\n  </div>\n  <div id = \"separador2\"></div>\n  <div id = \"derecha\">\n    <ngx-codemirror\n      [options] = \"editorXMLSalidaOptions\"\n      [(ngModel)] = \"xmlSalida\">\n    </ngx-codemirror>\n  </div> \n</div>\n\n<div id = \"grafo\" *ngIf=\"grafo == true\">\n  <app-grafico></app-grafico>\n</div>\n\n<div id = \"tablaS\" *ngIf = \"tabla == true\">\n  <app-tabla-xml></app-tabla-xml>\n</div>\n\n<div id = \"bnf\" *ngIf = \"bnf == true\">\n  <app-bnf></app-bnf>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/tabla-xml/tabla-xml.component.html":
  /*!**************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/tabla-xml/tabla-xml.component.html ***!
    \**************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPaginasTablaXmlTablaXmlComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<table mat-table [dataSource]=\"simbolos\" class=\"mat-elevation-z8\">\n\n    <!--- Note that these columns can be defined in any order.\n    The actual rendered columns are set as a property on the row definition\" -->\n    <!-- Position Column -->\n    <ng-container matColumnDef=\"no\">\n      <th mat-header-cell *matHeaderCellDef> No. </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.no}} </td>\n    </ng-container>\n\n    <!-- Name Column -->\n    <ng-container matColumnDef=\"nombre\">\n      <th mat-header-cell *matHeaderCellDef> Nombre </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.nombre}} </td>\n    </ng-container>\n\n    <!-- Weight Column -->\n    <ng-container matColumnDef=\"tipo\">\n      <th mat-header-cell *matHeaderCellDef> Tipo </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.tipo}} </td>\n    </ng-container>\n\n    <!-- Symbol Column -->\n    <ng-container matColumnDef=\"valor\">\n      <th mat-header-cell *matHeaderCellDef> Valor </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.valor}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"ambito\">\n        <th mat-header-cell *matHeaderCellDef> Ambito </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.ambito}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"tipoEtiqueta\">\n      <th mat-header-cell *matHeaderCellDef> Tipo de etiqueta </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.tipoEtiqueta}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"fila\">\n        <th mat-header-cell *matHeaderCellDef> Fila </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.linea}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"columna\">\n        <th mat-header-cell *matHeaderCellDef> Columna </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.columna}} </td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n</table>";
    /***/
  },

  /***/
  "./src/analizadorXML/AST/CST.ts":
  /*!**************************************!*\
    !*** ./src/analizadorXML/AST/CST.ts ***!
    \**************************************/

  /*! exports provided: CST */

  /***/
  function srcAnalizadorXMLASTCSTTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CST", function () {
      return CST;
    });

    var CST = /*#__PURE__*/function () {
      function CST(objetos) {
        _classCallCheck(this, CST);

        this.cuerpoDot = '';
        this.objetos = objetos;
      }

      _createClass(CST, [{
        key: "generarArbolCST",
        value: function generarArbolCST(objetos) {
          var _this = this;

          var num;
          this.cuerpoDot = 'digraph D { \n ';
          objetos.forEach(function (object) {
            num = "".concat(object.linea.toString(), "_").concat(object.columna.toString());
            _this.cuerpoDot += _this.generarNodoObjeto(object, num, null);
            num = num + 1000;
          });
          this.cuerpoDot += '} \n ';
          return this.cuerpoDot;
        }
      }, {
        key: "generarNodoObjeto",
        value: function generarNodoObjeto(objeto, pos, padre) {
          var _this2 = this;

          var id = objeto.identificador;
          id = id.replace(/\'/gi, "");
          id = id.replace(/\"/gi, "");
          var nodo = "nodo".concat(pos, " [label = \n        \"ETIQUETA\n").concat(id, "\" ]\n");

          if (padre !== null) {
            nodo += "nodo".concat(padre, " -> nodo").concat(pos, "\n");
          }

          if (objeto.texto !== '') {
            var texto = objeto.texto;
            texto = texto.replace(/\'/gi, "");
            texto = texto.replace(/\"/gi, "");
            nodo += "nodo".concat(pos, "_t [label =\"").concat(texto, "\" ]\n");
            nodo += "nodo".concat(pos, " -> nodo").concat(pos, "_t [label=\"txt\"]\n");
          }

          objeto.listaAtributos.forEach(function (atribute) {
            var num = "".concat(atribute.linea.toString(), "_").concat(atribute.columna.toString());
            nodo += _this2.generarNodoAtributo(atribute, num, pos);
          });
          objeto.listaObjetos.forEach(function (obj) {
            var num = "".concat(obj.linea.toString(), "_").concat(obj.columna.toString());
            nodo += _this2.generarNodoObjeto(obj, num, pos);
          });
          return nodo;
        }
      }, {
        key: "generarNodoAtributo",
        value: function generarNodoAtributo(objeto, pos, padre) {
          var id = objeto.identificador;
          id = id.replace(/\'/gi, "");
          id = id.replace(/\"/gi, "");
          var valor = objeto.valor;
          valor = valor.replace(/\'/gi, "");
          valor = valor.replace(/\"/gi, "");
          var nodo = "nodo".concat(pos, " [label =\n        \"ATRIBUTO\n").concat(id, "\"]\n");
          nodo += "nodo".concat(padre, " -> nodo").concat(pos, "\n");
          nodo += "nodo".concat(pos, "_a [label=").concat(valor, "]\n");
          nodo += "nodo".concat(pos, " -> nodo").concat(pos, "_a [label=\"valor\"]\n");
          return nodo;
        }
      }]);

      return CST;
    }();
    /***/

  },

  /***/
  "./src/analizadorXML/AST/Entorno.ts":
  /*!******************************************!*\
    !*** ./src/analizadorXML/AST/Entorno.ts ***!
    \******************************************/

  /*! exports provided: Entorno */

  /***/
  function srcAnalizadorXMLASTEntornoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Entorno", function () {
      return Entorno;
    });

    var Entorno = /*#__PURE__*/function () {
      function Entorno(anterior) {
        _classCallCheck(this, Entorno);

        this.tabla = {};
        this.anterior = anterior;
      }

      _createClass(Entorno, [{
        key: "agregar",
        value: function agregar(id, simbolo) {
          id = id.toLowerCase();
          simbolo.indentificador = simbolo.indentificador.toLowerCase();
          this.tabla[id] = simbolo;
        }
      }, {
        key: "eliminar",
        value: function eliminar(id) {
          id = id.toLowerCase();

          for (var e = this; e != null; e = e.anterior) {
            var value = e.tabla[id];

            if (value !== undefined) {
              delete e.tabla[id];
              return true;
            }
          }

          return false;
        }
      }, {
        key: "existe",
        value: function existe(id) {
          id = id.toLowerCase();

          for (var e = this; e != null; e = e.anterior) {
            var value = e.tabla[id];

            if (value !== undefined) {
              return true;
            }
          }

          return false;
        }
      }, {
        key: "existeEnActual",
        value: function existeEnActual(id) {
          id = id.toLowerCase();

          if (this.tabla[id] !== undefined) {
            return true;
          }

          return false;
        }
      }, {
        key: "getSimbolo",
        value: function getSimbolo(id) {
          id = id.toLowerCase();

          for (var e = this; e != null; e = e.anterior) {
            if (e.tabla[id] !== undefined) {
              return e.tabla[id];
            }
          }

          return null;
        }
      }, {
        key: "reemplazar",
        value: function reemplazar(id, nuevoValor) {
          id = id.toLowerCase();

          for (var e = this; e != null; e = e.anterior) {
            var value = e.tabla[id];

            if (value !== undefined) {
              e.tabla[id] = nuevoValor;
            }
          }
        }
      }]);

      return Entorno;
    }();
    /***/

  },

  /***/
  "./src/analizadorXML/AST/GramaticaBNF.ts":
  /*!***********************************************!*\
    !*** ./src/analizadorXML/AST/GramaticaBNF.ts ***!
    \***********************************************/

  /*! exports provided: GramaticaBNF */

  /***/
  function srcAnalizadorXMLASTGramaticaBNFTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "GramaticaBNF", function () {
      return GramaticaBNF;
    });

    var GramaticaBNF = /*#__PURE__*/function () {
      function GramaticaBNF(repo, repo2) {
        _classCallCheck(this, GramaticaBNF);

        this.reporte = repo;
        this.reporte2 = repo2;
      }

      _createClass(GramaticaBNF, [{
        key: "getBNFReport",
        value: function getBNFReport() {
          var ret = [];

          for (var i = 0; i < this.reporte.length; i++) {
            ret.push(this.generarBodyReporte(this.reporte[i], this.reporte2[i], i));
          }

          return ret;
        }
      }, {
        key: "generarBodyReporte",
        value: function generarBodyReporte(object, object2, iterator) {
          var fila = {
            no: iterator,
            produccion: object,
            accion: object2
          };
          return fila;
        }
      }]);

      return GramaticaBNF;
    }();
    /***/

  },

  /***/
  "./src/analizadorXML/AST/SalidaGramatica.ts":
  /*!**************************************************!*\
    !*** ./src/analizadorXML/AST/SalidaGramatica.ts ***!
    \**************************************************/

  /*! exports provided: SalidaGramatica */

  /***/
  function srcAnalizadorXMLASTSalidaGramaticaTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SalidaGramatica", function () {
      return SalidaGramatica;
    });

    var SalidaGramatica = function SalidaGramatica(objetos, reporte, reporte2, encoding, lError) {
      _classCallCheck(this, SalidaGramatica);

      this.objetos = objetos;
      this.reporteBNF = reporte;
      this.reporteBNF2 = reporte2;
      this.encoding = encoding;
      this.lErrores = lError;
    };
    /***/

  },

  /***/
  "./src/analizadorXML/AST/TablaSimbolos.ts":
  /*!************************************************!*\
    !*** ./src/analizadorXML/AST/TablaSimbolos.ts ***!
    \************************************************/

  /*! exports provided: TablaSimbolos */

  /***/
  function srcAnalizadorXMLASTTablaSimbolosTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TablaSimbolos", function () {
      return TablaSimbolos;
    });

    var TablaSimbolos = /*#__PURE__*/function () {
      function TablaSimbolos() {
        _classCallCheck(this, TablaSimbolos);

        this.contador = 1;
        this.contador = 1;
      }

      _createClass(TablaSimbolos, [{
        key: "generarReporteTablaObjetos",
        value: function generarReporteTablaObjetos(objetos) {
          var _this3 = this;

          var arrayCuerpo = [];
          objetos.forEach(function (object) {
            _this3.generarFilaObjeto(object, null, 'Etiqueta', arrayCuerpo);
          });
          return arrayCuerpo;
        }
      }, {
        key: "generarFilaObjeto",
        value: function generarFilaObjeto(objeto, ambito, tipo, array) {
          var _this4 = this;

          var valor;
          objeto.texto === '' ? valor = "Etiqueta raiz" : valor = objeto.texto;
          var ambitoElemento;
          ambito === null ? ambitoElemento = "Global" : ambitoElemento = ambito;
          var tipoEti;
          objeto.completa === 1 ? tipoEti = "Doble" : tipoEti = "Simple";
          var fila = {
            no: this.contador,
            nombre: objeto.identificador,
            tipo: tipo,
            valor: valor,
            tipoEtiqueta: tipoEti,
            linea: objeto.linea,
            columna: objeto.columna,
            ambito: ambitoElemento
          };
          array.push(fila);
          this.contador++;
          objeto.listaAtributos.forEach(function (atribute) {
            _this4.generarFilaAtributo(atribute, objeto.identificador, 'Atributo', array);
          });
          objeto.listaObjetos.forEach(function (atribute) {
            _this4.generarFilaObjeto(atribute, objeto.identificador, 'Etiqueta', array);
          });
        }
      }, {
        key: "generarFilaAtributo",
        value: function generarFilaAtributo(objeto, ambito, tipo, array) {
          var fila = {
            no: this.contador,
            nombre: objeto.identificador,
            tipo: tipo,
            valor: objeto.valor,
            tipoEtiqueta: "No aplica",
            linea: objeto.linea,
            columna: objeto.columna,
            ambito: ambito
          };
          array.push(fila);
          this.contador++;
        }
      }]);

      return TablaSimbolos;
    }();
    /***/

  },

  /***/
  "./src/analizadorXML/Expresiones/Atributo.ts":
  /*!***************************************************!*\
    !*** ./src/analizadorXML/Expresiones/Atributo.ts ***!
    \***************************************************/

  /*! exports provided: Atributo */

  /***/
  function srcAnalizadorXMLExpresionesAtributoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Atributo", function () {
      return Atributo;
    });

    var Atributo = function Atributo(id, valor, linea, columna) {
      _classCallCheck(this, Atributo);

      this.identificador = id;
      this.valor = valor;
      this.linea = linea;
      this.columna = columna;
    };
    /***/

  },

  /***/
  "./src/analizadorXML/Expresiones/Objeto.ts":
  /*!*************************************************!*\
    !*** ./src/analizadorXML/Expresiones/Objeto.ts ***!
    \*************************************************/

  /*! exports provided: Objeto */

  /***/
  function srcAnalizadorXMLExpresionesObjetoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Objeto", function () {
      return Objeto;
    });
    /* harmony import */


    var _AST_Entorno__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../AST/Entorno */
    "./src/analizadorXML/AST/Entorno.ts");

    var Objeto = function Objeto(id, texto, linea, columna, listaAtributos, listaO, completa, cierre) {
      _classCallCheck(this, Objeto);

      this.identificador = id;
      this.texto = texto;
      this.linea = linea;
      this.columna = columna;
      this.listaAtributos = listaAtributos;
      this.listaObjetos = listaO;
      this.entorno = new _AST_Entorno__WEBPACK_IMPORTED_MODULE_0__["Entorno"](null);
      this.completa = completa;
      this.cierre = cierre;
    };
    /***/

  },

  /***/
  "./src/analizadorXML/Expresiones/tError.ts":
  /*!*************************************************!*\
    !*** ./src/analizadorXML/Expresiones/tError.ts ***!
    \*************************************************/

  /*! exports provided: tError */

  /***/
  function srcAnalizadorXMLExpresionesTErrorTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "tError", function () {
      return tError;
    });

    var tError =
    /**
     * @constructor creamos un nuevo primitivo
     * @param tipo hace referencia al tipo de error
     * @param texto hace referencia al contenido del mensaje del error
     * @param linea idica la linea donde se encuentra
     * @param columna indica la columna donde se encuentra
     */
    function tError(tipo, texto, linea, columna) {
      _classCallCheck(this, tError);

      this.columna = columna;
      this.linea = linea;
      this.texto = texto;
      this.tipo = tipo;
    };
    /***/

  },

  /***/
  "./src/analizadorXML/Gramatica/gramatica.js":
  /*!**************************************************!*\
    !*** ./src/analizadorXML/Gramatica/gramatica.js ***!
    \**************************************************/

  /*! no static exports found */

  /***/
  function srcAnalizadorXMLGramaticaGramaticaJs(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */
    (function (module) {
      /* parser generated by jison 0.4.18 */

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
      var gramatica = function () {
        var o = function o(k, v, _o, l) {
          for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {
            ;
          }

          return _o;
        },
            $V0 = [1, 9],
            $V1 = [1, 8],
            $V2 = [2, 6, 7],
            $V3 = [1, 14],
            $V4 = [1, 15],
            $V5 = [2, 7],
            $V6 = [14, 20],
            $V7 = [1, 21],
            $V8 = [1, 20],
            $V9 = [2, 14, 17, 20],
            $Va = [1, 40],
            $Vb = [1, 47],
            $Vc = [1, 38],
            $Vd = [1, 37],
            $Ve = [1, 45],
            $Vf = [1, 35],
            $Vg = [1, 36],
            $Vh = [1, 39],
            $Vi = [1, 42],
            $Vj = [1, 43],
            $Vk = [1, 44],
            $Vl = [1, 46],
            $Vm = [1, 48],
            $Vn = [1, 49],
            $Vo = [1, 50],
            $Vp = [1, 51],
            $Vq = [1, 52],
            $Vr = [1, 53],
            $Vs = [1, 54],
            $Vt = [1, 55],
            $Vu = [1, 56],
            $Vv = [1, 57],
            $Vw = [1, 58],
            $Vx = [1, 59],
            $Vy = [1, 60],
            $Vz = [1, 61],
            $VA = [1, 62],
            $VB = [1, 63],
            $VC = [1, 64],
            $VD = [1, 65],
            $VE = [1, 66],
            $VF = [2, 7, 9, 11, 12, 17, 20, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
            $VG = [2, 29];

        var parser = {
          trace: function trace() {},
          yy: {},
          symbols_: {
            "error": 2,
            "START": 3,
            "ENCODING": 4,
            "RAICES": 5,
            "EOF": 6,
            "lt": 7,
            "interC": 8,
            "xml": 9,
            "version": 10,
            "asig": 11,
            "StringLiteral": 12,
            "encoding": 13,
            "gt": 14,
            "RAIZ": 15,
            "OBJETO": 16,
            "identifier": 17,
            "LATRIBUTOS": 18,
            "OBJETOS": 19,
            "div": 20,
            "LISTA_ID_OBJETO": 21,
            "ATRIBUTOS": 22,
            "ATRIBUTO": 23,
            "LISTA_VALORES": 24,
            "IntegerLiteral": 25,
            "DoubleLiteral": 26,
            "CharLiteral": 27,
            "CARACTERES": 28,
            "plus": 29,
            "minus": 30,
            "times": 31,
            "mod": 32,
            "equal": 33,
            "nequal": 34,
            "and": 35,
            "or": 36,
            "not": 37,
            "semicolon": 38,
            "lparen": 39,
            "rparen": 40,
            "lcurly": 41,
            "rcurly": 42,
            "lbracket": 43,
            "rbracket": 44,
            "period": 45,
            "coma": 46,
            "lesst": 47,
            "greatert": 48,
            "ampersand": 49,
            "apostro": 50,
            "quotation": 51,
            "$accept": 0,
            "$end": 1
          },
          terminals_: {
            2: "error",
            6: "EOF",
            7: "lt",
            8: "interC",
            9: "xml",
            10: "version",
            11: "asig",
            12: "StringLiteral",
            13: "encoding",
            14: "gt",
            17: "identifier",
            20: "div",
            25: "IntegerLiteral",
            26: "DoubleLiteral",
            27: "CharLiteral",
            29: "plus",
            30: "minus",
            31: "times",
            32: "mod",
            33: "equal",
            34: "nequal",
            35: "and",
            36: "or",
            37: "not",
            38: "semicolon",
            39: "lparen",
            40: "rparen",
            41: "lcurly",
            42: "rcurly",
            43: "lbracket",
            44: "rbracket",
            45: "period",
            46: "coma",
            47: "lesst",
            48: "greatert",
            49: "ampersand",
            50: "apostro",
            51: "quotation"
          },
          productions_: [0, [3, 3], [4, 11], [4, 2], [5, 2], [5, 1], [15, 1], [16, 9], [16, 9], [16, 5], [16, 2], [18, 1], [18, 0], [22, 2], [22, 1], [23, 3], [23, 2], [23, 2], [19, 2], [19, 1], [21, 2], [21, 1], [24, 1], [24, 1], [24, 1], [24, 1], [24, 1], [24, 1], [24, 1], [24, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1]],
          performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate
          /* action[1] */
          , $$
          /* vstack */
          , _$
          /* lstack */
          ) {
            /* this == yyval */
            var $0 = $$.length - 1;

            switch (yystate) {
              case 1:
                reportBNF.push("<START> ::= <RAICES> EOF");
                reportBNF2.push('Start.val = Raiz.val. // Fin del documento');
                this.$ = $$[$0 - 1];
                return new SalidaGramatica(this.$, reportBNF, reportBNF2, $$[$0 - 2], listaErrores);
                break;

              case 2:
                this.$ = $$[$0 - 2];
                break;

              case 3:
                listaErrores.push(new tError('Sintactico', "Token inesperado: ".concat(yytext), _$[$0 - 1].first_line, _$[$0 - 1].first_column));
                break;

              case 4:
                reportBNF.push('<RAICES> ::= <RAICES> <RAIZ>');
                reportBNF2.push('Raices.val = Raices.push(Raiz)');
                $$[$0 - 1].push($$[$0]);
                this.$ = $$[$0 - 1];
                break;

              case 5:
                reportBNF.push('<RAICES> ::= <RAIZ>');
                reportBNF2.push('Raices.val = Raiz.val');
                this.$ = [$$[$0]];
                break;

              case 6:
                reportBNF.push('<RAIZ> ::= <OBJETO>');
                reportBNF2.push('Raiz.val = Objeto.val');
                this.$ = $$[$0];
                break;

              case 7:
                reportBNF.push('<OBJETO> ::= lt identifier <LATRIBUTOS> gt <OBJETOS> lt div identifier gt');
                reportBNF2.push('Objeto = new Objeto(id,\'\',linea, columna, atributos, objetos)');
                this.$ = new Objeto($$[$0 - 7], '', _$[$0 - 8].first_line, _$[$0 - 8].first_column, $$[$0 - 6], $$[$0 - 4], 1, $$[$0 - 1]);
                break;

              case 8:
                reportBNF.push('<OBJETO> ::= lt identifier <LATRIBUTOS> gt <LISTA_ID_OBJETO> lt div identifier gt');
                reportBNF2.push('Objeto = new Objeto(id,texto,linea, columna,atributos,[])');
                this.$ = new Objeto($$[$0 - 7], $$[$0 - 4], _$[$0 - 8].first_line, _$[$0 - 8].first_column, $$[$0 - 6], [], 1, $$[$0 - 1]);
                break;

              case 9:
                reportBNF.push('<OBJETO> ::= lt identifier <LATRIBUTOS> div gt');
                reportBNF2.push('Objeto = new Objeto(id,\'\',linea, columna,atributos,[])');
                this.$ = new Objeto($$[$0 - 3], '', _$[$0 - 4].first_line, _$[$0 - 4].first_column, $$[$0 - 2], [], 0, '');
                break;

              case 10:
                listaErrores.push(new tError('Sintactico', "Token inesperado: ".concat(yytext), _$[$0 - 1].first_line, _$[$0 - 1].first_column));
                break;

              case 11:
                reportBNF.push('<LATRIBUTOS> ::= <ATRIBUTOS>');
                reportBNF2.push('Lista_Atributos.val = Atributos.val');
                this.$ = $$[$0];
                break;

              case 12:
                reportBNF.push('<LATRIBUTOS> ::= /*vacio*/');
                reportBNF2.push('Lista_Atributos.val = [] ');
                this.$ = [];
                break;

              case 13:
                reportBNF.push('<ATRIBUTOS> ::= <ATRIBUTOS> <ATRIBUTO>');
                reportBNF2.push('Atributos.val = Atributos.push(Atributo)');
                $$[$0 - 1].push($$[$0]);
                this.$ = $$[$0 - 1];
                /*revisar*/

                break;

              case 14:
                reportBNF.push('<ATRIBUTOS> ::= <ATRIBUTO>');
                reportBNF2.push('Atributos.val = Atributo.val');
                this.$ = [$$[$0]];
                break;

              case 15:
                reportBNF.push('<ATRIBUTO> ::= identifier asig StringLiteral');
                reportBNF2.push('Atributo = new Atributo(id, valor, fila, columna)');
                this.$ = new Atributo($$[$0 - 2], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 16:
              case 17:
                listaErrores.push(new tError('Sintactico', "Token inesperado: ".concat(yytext), _$[$0 - 1].first_line, _$[$0 - 1].first_column));
                break;

              case 18:
                reportBNF.push('<OBJETOS> ::= <OBJETOS> <OBJETO>');
                reportBNF2.push('Objetos.val = Objetos.push(Objeto)');
                $$[$0 - 1].push($$[$0]);
                this.$ = $$[$0 - 1];
                break;

              case 19:
                reportBNF.push('<OBJETOS> ::= <OBJETO>');
                reportBNF2.push('Objetos.val = Objeto.val');
                this.$ = [$$[$0]];
                break;

              case 20:
                reportBNF.push('<LISTA_ID_OBJETO> ::= <LISTA_ID_OBJETO> <LISTA_VALORES>');
                reportBNF2.push('Lista_Id_Objeto.val = Lista_Id_Objeto.val + \' \' + Lista_Id_Objeto.val');
                this.$ = $$[$0 - 1] + ' ' + $$[$0];
                break;

              case 21:
                reportBNF.push('<LISTA_ID_OBJETO> ::= <LISTA_VALORES>');
                reportBNF2.push('Lista_Id_Objeto.val = Lista_valores.val');
                this.$ = $$[$0];
                break;

              case 22:
              case 23:
              case 24:
              case 25:
              case 26:
              case 27:
              case 28:
                this.$ = $$[$0];
                break;

              case 29:
                listaErrores.push(new tError('Sintactico', "Token inesperado: ".concat(yytext), _$[$0].first_line, _$[$0].first_column));
                break;

              case 30:
              case 31:
              case 32:
              case 33:
              case 34:
              case 35:
              case 36:
              case 37:
              case 38:
              case 39:
              case 40:
              case 41:
              case 42:
              case 43:
              case 44:
              case 45:
              case 46:
              case 47:
              case 48:
              case 49:
                this.$ = $$[$0];
                break;

              case 50:
                this.$ = '<';
                break;

              case 51:
                this.$ = '>';
                break;

              case 52:
                this.$ = '&';
                break;

              case 53:
                this.$ = '\'';
                break;

              case 54:
                this.$ = '"';
                break;
            }
          },
          table: [{
            2: [1, 4],
            3: 1,
            4: 2,
            7: [1, 3]
          }, {
            1: [3]
          }, {
            2: $V0,
            5: 5,
            7: $V1,
            15: 6,
            16: 7
          }, {
            8: [1, 10]
          }, {
            14: [1, 11]
          }, {
            2: $V0,
            6: [1, 12],
            7: $V1,
            15: 13,
            16: 7
          }, o($V2, [2, 5]), o($V2, [2, 6]), {
            17: $V3
          }, {
            14: $V4
          }, {
            9: [1, 16]
          }, o($V5, [2, 3]), {
            1: [2, 1]
          }, o($V2, [2, 4]), o($V6, [2, 12], {
            18: 17,
            22: 18,
            23: 19,
            2: $V7,
            17: $V8
          }), o($V2, [2, 10]), {
            10: [1, 22]
          }, {
            14: [1, 23],
            20: [1, 24]
          }, o($V6, [2, 11], {
            23: 25,
            2: $V7,
            17: $V8
          }), o($V9, [2, 14]), {
            11: [1, 26]
          }, {
            7: [1, 28],
            14: [1, 27]
          }, {
            11: [1, 29]
          }, {
            2: [1, 34],
            7: $V1,
            9: $Va,
            11: $Vb,
            12: $Vc,
            16: 32,
            17: $Vd,
            19: 30,
            20: $Ve,
            21: 31,
            24: 33,
            25: $Vf,
            26: $Vg,
            27: $Vh,
            28: 41,
            29: $Vi,
            30: $Vj,
            31: $Vk,
            32: $Vl,
            33: $Vm,
            34: $Vn,
            35: $Vo,
            36: $Vp,
            37: $Vq,
            38: $Vr,
            39: $Vs,
            40: $Vt,
            41: $Vu,
            42: $Vv,
            43: $Vw,
            44: $Vx,
            45: $Vy,
            46: $Vz,
            47: $VA,
            48: $VB,
            49: $VC,
            50: $VD,
            51: $VE
          }, {
            14: [1, 67]
          }, o($V9, [2, 13]), {
            12: [1, 68]
          }, o($V9, [2, 16]), o($V9, [2, 17]), {
            12: [1, 69]
          }, {
            2: $V0,
            7: [1, 70],
            16: 71
          }, {
            2: [1, 74],
            7: [1, 72],
            9: $Va,
            11: $Vb,
            12: $Vc,
            17: $Vd,
            20: $Ve,
            24: 73,
            25: $Vf,
            26: $Vg,
            27: $Vh,
            28: 41,
            29: $Vi,
            30: $Vj,
            31: $Vk,
            32: $Vl,
            33: $Vm,
            34: $Vn,
            35: $Vo,
            36: $Vp,
            37: $Vq,
            38: $Vr,
            39: $Vs,
            40: $Vt,
            41: $Vu,
            42: $Vv,
            43: $Vw,
            44: $Vx,
            45: $Vy,
            46: $Vz,
            47: $VA,
            48: $VB,
            49: $VC,
            50: $VD,
            51: $VE
          }, o($V5, [2, 19]), o($VF, [2, 21]), o($VF, $VG, {
            14: $V4
          }), o($VF, [2, 22]), o($VF, [2, 23]), o($VF, [2, 24]), o($VF, [2, 25]), o($VF, [2, 26]), o($VF, [2, 27]), o($VF, [2, 28]), o($VF, [2, 30]), o($VF, [2, 31]), o($VF, [2, 32]), o($VF, [2, 33]), o($VF, [2, 34]), o($VF, [2, 35]), o($VF, [2, 36]), o($VF, [2, 37]), o($VF, [2, 38]), o($VF, [2, 39]), o($VF, [2, 40]), o($VF, [2, 41]), o($VF, [2, 42]), o($VF, [2, 43]), o($VF, [2, 44]), o($VF, [2, 45]), o($VF, [2, 46]), o($VF, [2, 47]), o($VF, [2, 48]), o($VF, [2, 49]), o($VF, [2, 50]), o($VF, [2, 51]), o($VF, [2, 52]), o($VF, [2, 53]), o($VF, [2, 54]), o($V2, [2, 9]), o($V9, [2, 15]), {
            13: [1, 75]
          }, {
            17: $V3,
            20: [1, 76]
          }, o($V5, [2, 18]), {
            20: [1, 77]
          }, o($VF, [2, 20]), o($VF, $VG), {
            11: [1, 78]
          }, {
            17: [1, 79]
          }, {
            17: [1, 80]
          }, {
            12: [1, 81]
          }, {
            14: [1, 82]
          }, {
            14: [1, 83]
          }, {
            8: [1, 84]
          }, o($V2, $V5), o($V2, [2, 8]), {
            14: [1, 85]
          }, o($V5, [2, 2])],
          defaultActions: {
            12: [2, 1]
          },
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
                // token stack
            vstack = [null],
                // semantic value stack
            lstack = [],
                // location stack
            table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1); //this.reductionCount = this.shiftCount = 0;

            var lexer = Object.create(this.lexer);
            var sharedState = {
              yy: {}
            }; // copy state

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
            } else {
              this.parseError = Object.getPrototypeOf(this).parseError;
            }

            function popStack(n) {
              stack.length = stack.length - 2 * n;
              vstack.length = vstack.length - n;
              lstack.length = lstack.length - n;
            }

            _token_stack: var lex = function lex() {
              var token;
              token = lexer.lex() || EOF; // if token isn't its numeric value, convert

              if (typeof token !== 'number') {
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
              // retreive state number from top of stack
              state = stack[stack.length - 1]; // use default actions if available

              if (this.defaultActions[state]) {
                action = this.defaultActions[state];
              } else {
                if (symbol === null || typeof symbol == 'undefined') {
                  symbol = lex();
                } // read action for current state and first input


                action = table[state] && table[state][symbol];
              }

              _handle_error: // handle parse error
              if (typeof action === 'undefined' || !action.length || !action[0]) {
                // Return the rule stack depth where the nearest error rule can be found.
                // Return FALSE when no error recovery rule was found.
                var locateNearestErrorRecoveryRule = function locateNearestErrorRecoveryRule(state) {
                  var stack_probe = stack.length - 1;
                  var depth = 0; // try to recover from error

                  for (;;) {
                    // check for error recovery rule in this state
                    if (TERROR.toString() in table[state]) {
                      return depth;
                    }

                    if (state === 0 || stack_probe < 2) {
                      return false; // No suitable error recovery rule available.
                    }

                    stack_probe -= 2; // popStack(1): [symbol, action]

                    state = stack[stack_probe];
                    ++depth;
                  }
                };

                var error_rule_depth;
                var errStr = '';

                if (!recovering) {
                  // first see if there's any chance at hitting an error recovery rule:
                  error_rule_depth = locateNearestErrorRecoveryRule(state); // Report error

                  expected = [];

                  for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                      expected.push("'" + this.terminals_[p] + "'");
                    }
                  }

                  if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ":\n" + lexer.showPosition() + "\nExpecting " + expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                  } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                  }

                  this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: error_rule_depth !== false
                  });
                } else if (preErrorSymbol !== EOF) {
                  error_rule_depth = locateNearestErrorRecoveryRule(state);
                } // just recovered from another error


                if (recovering == 3) {
                  if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                  } // discard current lookahead and grab another


                  yyleng = lexer.yyleng;
                  yytext = lexer.yytext;
                  yylineno = lexer.yylineno;
                  yyloc = lexer.yylloc;
                  symbol = lex();
                } // try to recover from error


                if (error_rule_depth === false) {
                  throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
                }

                popStack(error_rule_depth);
                preErrorSymbol = symbol == TERROR ? null : symbol; // save the lookahead token

                symbol = TERROR; // insert generic error symbol as new lookahead

                state = stack[stack.length - 1];
                action = table[state] && table[state][TERROR];
                recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
              } // this shouldn't happen, unless resolve defaults are off


              if (action[0] instanceof Array && action.length > 1) {
                throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
              }

              switch (action[0]) {
                case 1:
                  // shift
                  //this.shiftCount++;
                  stack.push(symbol);
                  vstack.push(lexer.yytext);
                  lstack.push(lexer.yylloc);
                  stack.push(action[1]); // push state

                  symbol = null;

                  if (!preErrorSymbol) {
                    // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;

                    if (recovering > 0) {
                      recovering--;
                    }
                  } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                  }

                  break;

                case 2:
                  // reduce
                  //this.reductionCount++;
                  len = this.productions_[action[1]][1]; // perform semantic action

                  yyval.$ = vstack[vstack.length - len]; // default to $$ = $1
                  // default location, uses first token for firsts, last for lasts

                  yyval._$ = {
                    first_line: lstack[lstack.length - (len || 1)].first_line,
                    last_line: lstack[lstack.length - 1].last_line,
                    first_column: lstack[lstack.length - (len || 1)].first_column,
                    last_column: lstack[lstack.length - 1].last_column
                  };

                  if (ranges) {
                    yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                  }

                  r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                  if (typeof r !== 'undefined') {
                    return r;
                  } // pop off stack


                  if (len) {
                    stack = stack.slice(0, -1 * len * 2);
                    vstack = vstack.slice(0, -1 * len);
                    lstack = lstack.slice(0, -1 * len);
                  }

                  stack.push(this.productions_[action[1]][0]); // push nonterminal (reduce)

                  vstack.push(yyval.$);
                  lstack.push(yyval._$); // goto new state = table[STATE][NONTERMINAL]

                  newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                  stack.push(newState);
                  break;

                case 3:
                  // accept
                  return true;
              }
            }

            return true;
          }
        };

        var _webpack_require__ = __webpack_require__(
        /*! ../Expresiones/Objeto */
        "./src/analizadorXML/Expresiones/Objeto.ts"),
            Objeto = _webpack_require__.Objeto;

        var _webpack_require__2 = __webpack_require__(
        /*! ../Expresiones/Atributo */
        "./src/analizadorXML/Expresiones/Atributo.ts"),
            Atributo = _webpack_require__2.Atributo;

        var _webpack_require__3 = __webpack_require__(
        /*! ../AST/SalidaGramatica */
        "./src/analizadorXML/AST/SalidaGramatica.ts"),
            SalidaGramatica = _webpack_require__3.SalidaGramatica;

        var _webpack_require__4 = __webpack_require__(
        /*! ../Expresiones/tError */
        "./src/analizadorXML/Expresiones/tError.ts"),
            tError = _webpack_require__4.tError;

        var listaErrores = [];
        var reportBNF = [];
        var reportBNF2 = [];
        /* generated by jison-lex 0.3.4 */

        var lexer = function () {
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
            setInput: function setInput(input, yy) {
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
            input: function input() {
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
            unput: function unput(ch) {
              var len = ch.length;
              var lines = ch.split(/(?:\r\n?|\n)/g);
              this._input = ch + this._input;
              this.yytext = this.yytext.substr(0, this.yytext.length - len); //this.yyleng -= len;

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
                last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
              };

              if (this.options.ranges) {
                this.yylloc.range = [r[0], r[0] + this.yyleng - len];
              }

              this.yyleng = this.yytext.length;
              return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function more() {
              this._more = true;
              return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function reject() {
              if (this.options.backtrack_lexer) {
                this._backtrack = true;
              } else {
                return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                  text: "",
                  token: null,
                  line: this.yylineno
                });
              }

              return this;
            },
            // retain first n characters of the match
            less: function less(n) {
              this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function pastInput() {
              var past = this.matched.substr(0, this.matched.length - this.match.length);
              return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function upcomingInput() {
              var next = this.match;

              if (next.length < 20) {
                next += this._input.substr(0, 20 - next.length);
              }

              return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function showPosition() {
              var pre = this.pastInput();
              var c = new Array(pre.length + 1).join("-");
              return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function test_match(match, indexed_rule) {
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
                last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
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
            next: function next() {
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
                } // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)


                return false;
              }

              if (this._input === "") {
                return this.EOF;
              } else {
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
              if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
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
            options: {
              "case-insensitive": true
            },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
              var YYSTATE = YY_START;

              switch ($avoiding_name_collisions) {
                case 0:
                  /* skip comments */
                  break;

                case 1:
                  this.begin('comment');
                  break;

                case 2:
                  this.popState();
                  break;

                case 3:
                  /* skip comment content*/
                  break;

                case 4:
                  /* skip whitespace */
                  break;

                case 5:
                  return 47;
                  break;

                case 6:
                  return 48;
                  break;

                case 7:
                  return 49;
                  break;

                case 8:
                  return 50;
                  break;

                case 9:
                  return 51;
                  break;

                case 10:
                  return 'null';
                  break;

                case 11:
                  return 'true';
                  break;

                case 12:
                  return 'false';
                  break;

                case 13:
                  return 9;
                  break;

                case 14:
                  return 10;
                  break;

                case 15:
                  return 13;
                  break;

                case 16:
                  return 29;
                  break;

                case 17:
                  return 30;
                  break;

                case 18:
                  return 31;
                  break;

                case 19:
                  return 20;
                  break;

                case 20:
                  return 32;
                  break;

                case 21:
                  return 'lte';
                  break;

                case 22:
                  return 'gte';
                  break;

                case 23:
                  return 7;
                  break;

                case 24:
                  return 14;
                  break;

                case 25:
                  return 11;
                  break;

                case 26:
                  return 33;
                  break;

                case 27:
                  return 34;
                  break;

                case 28:
                  return 35;
                  break;

                case 29:
                  return 36;
                  break;

                case 30:
                  return 37;
                  break;

                case 31:
                  return 8;
                  break;

                case 32:
                  return 38;
                  break;

                case 33:
                  return 46;
                  break;

                case 34:
                  return 45;
                  break;

                case 35:
                  return 39;
                  break;

                case 36:
                  return 40;
                  break;

                case 37:
                  return 41;
                  break;

                case 38:
                  return 42;
                  break;

                case 39:
                  return 43;
                  break;

                case 40:
                  return 44;
                  break;

                case 41:
                  return 26;
                  break;

                case 42:
                  return 25;
                  break;

                case 43:
                  return 17;
                  break;

                case 44:
                  return 12;
                  break;

                case 45:
                  return 27;
                  break;

                case 46:
                  listaErrores.push(new tError('Léxico', "Simbolo inesperado: ".concat(yy_.yytext), yy_.yylloc.first_line, yy_.yylloc.first_column)); //console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);

                  break;

                case 47:
                  return 6;
                  break;
              }
            },
            rules: [/^(?:\/\/.*)/i, /^(?:<!--)/i, /^(?:-->)/i, /^(?:.)/i, /^(?:\s+)/i, /^(?:&lt;)/i, /^(?:&gt;)/i, /^(?:&amp;)/i, /^(?:&apos;)/i, /^(?:&quot;)/i, /^(?:null\b)/i, /^(?:true\b)/i, /^(?:false\b)/i, /^(?:xml\b)/i, /^(?:version\b)/i, /^(?:encoding\b)/i, /^(?:\+)/i, /^(?:-)/i, /^(?:\*)/i, /^(?:\/)/i, /^(?:%)/i, /^(?:<=)/i, /^(?:>=)/i, /^(?:<)/i, /^(?:>)/i, /^(?:=)/i, /^(?:==)/i, /^(?:!=)/i, /^(?:&&)/i, /^(?:\|\|)/i, /^(?:!)/i, /^(?:\?)/i, /^(?:;)/i, /^(?:,)/i, /^(?:\.)/i, /^(?:\()/i, /^(?:\))/i, /^(?:\{)/i, /^(?:\})/i, /^(?:\[)/i, /^(?:\])/i, /^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/i, /^(?:[0-9]+)/i, /^(?:[a-zA-Z_ñÑáÁéÉíÍóÓ][a-zA-Z0-9_ñÑáÁéÉíÍóÓ]*)/i, /^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/i, /^(?:('((\\([\'\"\\bfnrtv]))|([^\'\\]))'))/i, /^(?:.)/i, /^(?:$)/i],
            conditions: {
              "comment": {
                "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
                "inclusive": true
              },
              "INITIAL": {
                "rules": [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
                "inclusive": true
              }
            }
          };
          return lexer;
        }();

        parser.lexer = lexer;

        function Parser() {
          this.yy = {};
        }

        Parser.prototype = parser;
        parser.Parser = Parser;
        return new Parser();
      }();

      if (true) {
        exports.parser = gramatica;
        exports.Parser = gramatica.Parser;

        exports.parse = function () {
          return gramatica.parse.apply(gramatica, arguments);
        };

        exports.main = function commonjsMain(args) {
          if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
          }

          var source = __webpack_require__(
          /*! fs */
          1).readFileSync(__webpack_require__(
          /*! path */
          2).normalize(args[1]), "utf8");

          return exports.parser.parse(source);
        };

        if (true && __webpack_require__.c[__webpack_require__.s] === module) {
          exports.main(process.argv.slice(1));
        }
      }
      /* WEBPACK VAR INJECTION */

    }).call(this, __webpack_require__(
    /*! ./../../../node_modules/webpack/buildin/module.js */
    "./node_modules/webpack/buildin/module.js")(module));
    /***/
  },

  /***/
  "./src/analizadorXML/Gramatica/gramaticaDesc.js":
  /*!******************************************************!*\
    !*** ./src/analizadorXML/Gramatica/gramaticaDesc.js ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function srcAnalizadorXMLGramaticaGramaticaDescJs(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */
    (function (module) {
      /* parser generated by jison 0.4.18 */

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
      var gramaticaDesc = function () {
        var o = function o(k, v, _o2, l) {
          for (_o2 = _o2 || {}, l = k.length; l--; _o2[k[l]] = v) {
            ;
          }

          return _o2;
        },
            $V0 = [2, 4],
            $V1 = [1, 6],
            $V2 = [1, 11],
            $V3 = [6, 7],
            $V4 = [14, 22],
            $V5 = [2, 12],
            $V6 = [1, 15],
            $V7 = [2, 15],
            $V8 = [1, 30],
            $V9 = [1, 37],
            $Va = [1, 28],
            $Vb = [1, 27],
            $Vc = [1, 35],
            $Vd = [1, 25],
            $Ve = [1, 26],
            $Vf = [1, 29],
            $Vg = [1, 32],
            $Vh = [1, 33],
            $Vi = [1, 34],
            $Vj = [1, 36],
            $Vk = [1, 38],
            $Vl = [1, 39],
            $Vm = [1, 40],
            $Vn = [1, 41],
            $Vo = [1, 42],
            $Vp = [1, 43],
            $Vq = [1, 44],
            $Vr = [1, 45],
            $Vs = [1, 46],
            $Vt = [1, 47],
            $Vu = [1, 48],
            $Vv = [1, 49],
            $Vw = [1, 50],
            $Vx = [1, 51],
            $Vy = [1, 52],
            $Vz = [1, 53],
            $VA = [1, 54],
            $VB = [1, 55],
            $VC = [1, 56],
            $VD = [7, 9, 11, 12, 17, 22, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
            $VE = [1, 64];

        var parser = {
          trace: function trace() {},
          yy: {},
          symbols_: {
            "error": 2,
            "START": 3,
            "ENCODING": 4,
            "RAIZ": 5,
            "EOF": 6,
            "lt": 7,
            "interC": 8,
            "xml": 9,
            "version": 10,
            "asig": 11,
            "StringLiteral": 12,
            "encoding": 13,
            "gt": 14,
            "OBJETO": 15,
            "OBJETOPRIN": 16,
            "identifier": 17,
            "LATRIBUTOS": 18,
            "OBJETOSEC": 19,
            "LISTA_ID_OBJETO": 20,
            "OBJETOTER": 21,
            "div": 22,
            "ATRIBUTO": 23,
            "LISTA_VALORES": 24,
            "IntegerLiteral": 25,
            "DoubleLiteral": 26,
            "CharLiteral": 27,
            "CARACTERES": 28,
            "plus": 29,
            "minus": 30,
            "times": 31,
            "mod": 32,
            "equal": 33,
            "nequal": 34,
            "and": 35,
            "or": 36,
            "not": 37,
            "semicolon": 38,
            "lparen": 39,
            "rparen": 40,
            "lcurly": 41,
            "rcurly": 42,
            "lbracket": 43,
            "rbracket": 44,
            "period": 45,
            "coma": 46,
            "lesst": 47,
            "greatert": 48,
            "ampersand": 49,
            "apostro": 50,
            "quotation": 51,
            "$accept": 0,
            "$end": 1
          },
          terminals_: {
            2: "error",
            6: "EOF",
            7: "lt",
            8: "interC",
            9: "xml",
            10: "version",
            11: "asig",
            12: "StringLiteral",
            13: "encoding",
            14: "gt",
            17: "identifier",
            22: "div",
            25: "IntegerLiteral",
            26: "DoubleLiteral",
            27: "CharLiteral",
            29: "plus",
            30: "minus",
            31: "times",
            32: "mod",
            33: "equal",
            34: "nequal",
            35: "and",
            36: "or",
            37: "not",
            38: "semicolon",
            39: "lparen",
            40: "rparen",
            41: "lcurly",
            42: "rcurly",
            43: "lbracket",
            44: "rbracket",
            45: "period",
            46: "coma",
            47: "lesst",
            48: "greatert",
            49: "ampersand",
            50: "apostro",
            51: "quotation"
          },
          productions_: [0, [3, 3], [4, 11], [5, 2], [5, 0], [15, 2], [16, 3], [19, 4], [19, 2], [21, 3], [21, 3], [18, 2], [18, 0], [23, 3], [20, 2], [20, 0], [24, 1], [24, 1], [24, 1], [24, 1], [24, 1], [24, 1], [24, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1]],
          performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate
          /* action[1] */
          , $$
          /* vstack */
          , _$
          /* lstack */
          ) {
            /* this == yyval */
            var $0 = $$.length - 1;

            switch (yystate) {
              case 1:
                reportBNF.push("<START> ::= <ENCODING> <RAIZ> EOF");
                reportBNF2.push('Start.val = Raiz.val. // Fin del documento');
                this.$ = $$[$0 - 1];
                return new SalidaGramatica(this.$, reportBNF, reportBNF2, $$[$0 - 2]);
                break;

              case 2:
                reportBNF.push("<ENCODING> ::= lt interC xml version asig StringLiteral encoding asig StringLiteral interC gt");
                reportBNF2.push('Encoding.val = StringLiteral');
                this.$ = $$[$0 - 2];
                break;

              case 3:
                reportBNF.push('<RAIZ> ::= <OBJETO> <RAIZ>');
                reportBNF2.push('Raiz.val = Objeto.val.Concatenar(Raiz.Val])');
                this.$ = $$[$0 - 1].concat($$[$0]);
                break;

              case 4:
                this.$ = [];
                break;

              case 5:
                reportBNF.push('<OBJETO> ::= lt <OBJETOPRIN>');
                reportBNF2.push('OBJETO.val = [Objetoprin.val]');
                this.$ = [$$[$0]];
                break;

              case 6:
                var nuevo = null;

                if ($$[$0].tipo === 0) {
                  nuevo = new Objeto($$[$0 - 2], '', _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 1], [], 0, $$[$0].id);
                } else if ($$[$0].id !== "") {
                  if ($$[$0].lista !== null) {
                    nuevo = new Objeto($$[$0 - 2], '', _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 1], $$[$0].lista, 1, $$[$0].id);
                  } else if ($$[$0].texto !== "") {
                    nuevo = new Objeto($$[$0 - 2], $$[$0].texto, _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 1], [], 1, $$[$0].id);
                  } else {
                    nuevo = new Objeto($$[$0 - 2], '', _$[$0 - 2].first_line, _$[$0 - 2].first_column, $$[$0 - 1], [], 1, $$[$0].id);
                  }
                }

                reportBNF.push('<OBJETOPRIN> ::= identifier <LATRIBUTOS> <OBJETOSEC>');
                reportBNF2.push('Objetoprin.val = new Objeto(id, texto, linea, columna, atributos, objetos, completo, cierre)');
                this.$ = nuevo;
                break;

              case 7:
                reportBNF.push('<OBJETOSEC> ::= gt <LISTA_ID_OBJETO> lt <OBJETOTER>');
                reportBNF2.push('Objetosec.val = Objetoter.val');

                if ($$[$0].id !== "") {
                  if ($$[$0 - 2] !== "") {
                    $$[$0].texto = $$[$0 - 2];
                  }

                  this.$ = $$[$0];
                }

                break;

              case 8:
                reportBNF.push('<OBJETOSEC> ::= div gt');
                reportBNF2.push('Objetosec.val = {texto: vacio, lista: vacia: id: vacio, tipo: simple}');
                this.$ = {
                  texto: '',
                  lista: null,
                  id: '',
                  tipo: 0
                };
                break;

              case 9:
                reportBNF.push('<OBJETOTER> ::= div identifier gt');
                reportBNF2.push('Objetoter = {texto: vacio, lista: vacia, id: identifier, tipo: doble}');
                this.$ = {
                  texto: '',
                  lista: null,
                  id: $$[$0 - 1],
                  tipo: 1
                };
                break;

              case 10:
                reportBNF.push('<OBJETOTER> ::= <OBJETOPRIN> lt <OBJETOTER>');

                if ($$[$0].id !== "") {
                  if ($$[$0 - 2] instanceof Objeto) {
                    if ($$[$0].lista === null) {
                      reportBNF2.push('Objetoter.val = {texto: vacio, lista: [Objetoprin.val], id: Objetoter.val, tipo: doble}}');
                      this.$ = {
                        texto: '',
                        lista: [$$[$0 - 2]],
                        id: $$[$0].id,
                        tipo: 1
                      };
                    } else {
                      reportBNF2.push('Objetoter.lista.agregarAlInicio(Objetoprin.val); Objetoter.val = {texto: vacio, lista: Objetoter.val, id: Objetoter.val, tipo: doble}}');
                      $$[$0].lista.unshift($$[$0 - 2]);
                      this.$ = {
                        texto: '',
                        lista: $$[$0].lista,
                        id: $$[$0].id,
                        tipo: 1
                      };
                    }
                  } else if ($$[$0 - 2] === null) {
                    reportBNF2.push('Objetoter.val = Objetoter.val');
                    this.$ === $$[$0];
                  }
                }

                break;

              case 11:
                reportBNF.push('<LATRIBUTOS> ::= <ATRIBUTOS> <LATRIBUTOS>');
                reportBNF2.push('Latributos.val.agregar(Atributo.val)');
                this.$ = $$[$0 - 1].concat($$[$0]);
                break;

              case 12:
                reportBNF.push('<LATRIBUTOS> ::= epsilon');
                reportBNF2.push('Latributos.val = [] ');
                this.$ = [];
                break;

              case 13:
                reportBNF.push('<ATRIBUTO> ::= identifier asig StringLiteral');
                reportBNF2.push('Atributo.val = [new Atributo(id, valor, fila, columna)]');
                this.$ = [new Atributo($$[$0 - 2], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column)];
                break;

              case 14:
                reportBNF.push('<LISTA_ID_OBJETO> ::= <LISTA_VALORES> <LISTA_ID_OBJETO>');
                reportBNF2.push('Lista_id_objeto.val = Lista_valores.val + \" \" + Lista_id_objeto.val');
                this.$ = $$[$0 - 1] + " " + $$[$0];
                break;

              case 15:
                reportBNF.push('<LISTA_ID_OBJETO> ::= epsilon');
                reportBNF2.push('Lista_id_objeto.val = \"\"');
                this.$ = "";
                break;

              case 16:
                reportBNF.push('<LISTA_VALORES> ::= IntegerLiteral');
                reportBNF2.push('Lista_valores.val = IntegerLiteral');
                this.$ = $$[$0];
                break;

              case 17:
                reportBNF.push('<LISTA_VALORES> ::= DoubleLiteral');
                reportBNF2.push('Lista_valores.val = DoubleLiteral');
                this.$ = $$[$0];
                break;

              case 18:
                reportBNF.push('<LISTA_VALORES> ::= identifier');
                reportBNF2.push('Lista_valores.val = identifier');
                this.$ = $$[$0];
                break;

              case 19:
                reportBNF.push('<LISTA_VALORES> ::= StringLiteral');
                reportBNF2.push('Lista_valores.val = StringLiteral');
                this.$ = $$[$0];
                break;

              case 20:
                reportBNF.push('<LISTA_VALORES> ::= CharLiteral');
                reportBNF2.push('Lista_valores.val = CharLiteral');
                this.$ = $$[$0];
                break;

              case 21:
                reportBNF.push('<LISTA_VALORES> ::= xml');
                reportBNF2.push('Lista_valores.val = xml');
                this.$ = $$[$0];
                break;

              case 22:
                reportBNF.push('<LISTA_VALORES> ::= <CARACTERES>');
                reportBNF2.push('Lista_valores.val = Caracteres.val');
                this.$ = $$[$0];
                break;

              case 23:
              case 24:
                reportBNF.push('<CARACTERES> ::= plus');
                reportBNF2.push('Caracteres.val = plus');
                this.$ = $$[$0];
                break;

              case 25:
                reportBNF.push('<CARACTERES> ::= times');
                reportBNF2.push('Caracteres.val = times');
                this.$ = $$[$0];
                break;

              case 26:
                reportBNF.push('<CARACTERES> ::= div');
                reportBNF2.push('Caracteres.val = div');
                this.$ = $$[$0];
                break;

              case 27:
                reportBNF.push('<CARACTERES> ::= mod');
                reportBNF2.push('Caracteres.val = mod');
                this.$ = $$[$0];
                break;

              case 28:
                reportBNF.push('<CARACTERES> ::= asign');
                reportBNF2.push('Caracteres.val = asign');
                this.$ = $$[$0];
                break;

              case 29:
                reportBNF.push('<CARACTERES> ::= equal');
                reportBNF2.push('Caracteres.val = equal');
                this.$ = $$[$0];
                break;

              case 30:
                reportBNF.push('<CARACTERES> ::= nequal');
                reportBNF2.push('Caracteres.val = nequal');
                this.$ = $$[$0];
                break;

              case 31:
                reportBNF.push('<CARACTERES> ::= and');
                reportBNF2.push('Caracteres.val = and');
                this.$ = $$[$0];
                break;

              case 32:
                reportBNF.push('<CARACTERES> ::= or');
                reportBNF2.push('Caracteres.val = or');
                this.$ = $$[$0];
                break;

              case 33:
                reportBNF.push('<CARACTERES> ::= not');
                reportBNF2.push('Caracteres.val = not');
                this.$ = $$[$0];
                break;

              case 34:
                reportBNF.push('<CARACTERES> ::= semicolon');
                reportBNF2.push('Caracteres.val = semicolon');
                this.$ = $$[$0];
                break;

              case 35:
                reportBNF.push('<CARACTERES> ::= lparen');
                reportBNF2.push('Caracteres.val = lparen');
                this.$ = $$[$0];
                break;

              case 36:
                reportBNF.push('<CARACTERES> ::= rparen');
                reportBNF2.push('Caracteres.val = rparen');
                this.$ = $$[$0];
                break;

              case 37:
                reportBNF.push('<CARACTERES> ::= lcurly');
                reportBNF2.push('Caracteres.val = lcurly');
                this.$ = $$[$0];
                break;

              case 38:
                reportBNF.push('<CARACTERES> ::= rcurly');
                reportBNF2.push('Caracteres.val = rcurly');
                this.$ = $$[$0];
                break;

              case 39:
                reportBNF.push('<CARACTERES> ::= lbracket');
                reportBNF2.push('Caracteres.val = lbracket');
                this.$ = $$[$0];
                break;

              case 40:
                reportBNF.push('<CARACTERES> ::= rbracket');
                reportBNF2.push('Caracteres.val = rbracket');
                this.$ = $$[$0];
                break;

              case 41:
                reportBNF.push('<CARACTERES> ::= period');
                reportBNF2.push('Caracteres.val = period');
                this.$ = $$[$0];
                break;

              case 42:
                reportBNF.push('<CARACTERES> ::= coma');
                reportBNF2.push('Caracteres.val = coma');
                this.$ = $$[$0];
                break;

              case 43:
                reportBNF.push('<CARACTERES> ::= lesst');
                reportBNF2.push('Caracteres.val = >');
                this.$ = '<';
                break;

              case 44:
                reportBNF.push('<CARACTERES> ::= greatert');
                reportBNF2.push('Caracteres.val = >');
                this.$ = '>';
                break;

              case 45:
                reportBNF.push('<CARACTERES> ::= ampersand');
                reportBNF2.push('Caracteres.val = &');
                this.$ = '&';
                break;

              case 46:
                reportBNF.push('<CARACTERES> ::= apostro');
                reportBNF2.push('Caracteres.val = \'');
                this.$ = '\'';
                break;

              case 47:
                reportBNF.push('<CARACTERES> ::= quotation');
                reportBNF2.push('Caracteres.val = \"');
                this.$ = '"';
                break;
            }
          },
          table: [{
            3: 1,
            4: 2,
            7: [1, 3]
          }, {
            1: [3]
          }, {
            5: 4,
            6: $V0,
            7: $V1,
            15: 5
          }, {
            8: [1, 7]
          }, {
            6: [1, 8]
          }, {
            5: 9,
            6: $V0,
            7: $V1,
            15: 5
          }, {
            16: 10,
            17: $V2
          }, {
            9: [1, 12]
          }, {
            1: [2, 1]
          }, {
            6: [2, 3]
          }, o($V3, [2, 5]), o($V4, $V5, {
            18: 13,
            23: 14,
            17: $V6
          }), {
            10: [1, 16]
          }, {
            14: [1, 18],
            19: 17,
            22: [1, 19]
          }, o($V4, $V5, {
            23: 14,
            18: 20,
            17: $V6
          }), {
            11: [1, 21]
          }, {
            11: [1, 22]
          }, o($V3, [2, 6]), {
            7: $V7,
            9: $V8,
            11: $V9,
            12: $Va,
            17: $Vb,
            20: 23,
            22: $Vc,
            24: 24,
            25: $Vd,
            26: $Ve,
            27: $Vf,
            28: 31,
            29: $Vg,
            30: $Vh,
            31: $Vi,
            32: $Vj,
            33: $Vk,
            34: $Vl,
            35: $Vm,
            36: $Vn,
            37: $Vo,
            38: $Vp,
            39: $Vq,
            40: $Vr,
            41: $Vs,
            42: $Vt,
            43: $Vu,
            44: $Vv,
            45: $Vw,
            46: $Vx,
            47: $Vy,
            48: $Vz,
            49: $VA,
            50: $VB,
            51: $VC
          }, {
            14: [1, 57]
          }, o($V4, [2, 11]), {
            12: [1, 58]
          }, {
            12: [1, 59]
          }, {
            7: [1, 60]
          }, {
            7: $V7,
            9: $V8,
            11: $V9,
            12: $Va,
            17: $Vb,
            20: 61,
            22: $Vc,
            24: 24,
            25: $Vd,
            26: $Ve,
            27: $Vf,
            28: 31,
            29: $Vg,
            30: $Vh,
            31: $Vi,
            32: $Vj,
            33: $Vk,
            34: $Vl,
            35: $Vm,
            36: $Vn,
            37: $Vo,
            38: $Vp,
            39: $Vq,
            40: $Vr,
            41: $Vs,
            42: $Vt,
            43: $Vu,
            44: $Vv,
            45: $Vw,
            46: $Vx,
            47: $Vy,
            48: $Vz,
            49: $VA,
            50: $VB,
            51: $VC
          }, o($VD, [2, 16]), o($VD, [2, 17]), o($VD, [2, 18]), o($VD, [2, 19]), o($VD, [2, 20]), o($VD, [2, 21]), o($VD, [2, 22]), o($VD, [2, 23]), o($VD, [2, 24]), o($VD, [2, 25]), o($VD, [2, 26]), o($VD, [2, 27]), o($VD, [2, 28]), o($VD, [2, 29]), o($VD, [2, 30]), o($VD, [2, 31]), o($VD, [2, 32]), o($VD, [2, 33]), o($VD, [2, 34]), o($VD, [2, 35]), o($VD, [2, 36]), o($VD, [2, 37]), o($VD, [2, 38]), o($VD, [2, 39]), o($VD, [2, 40]), o($VD, [2, 41]), o($VD, [2, 42]), o($VD, [2, 43]), o($VD, [2, 44]), o($VD, [2, 45]), o($VD, [2, 46]), o($VD, [2, 47]), o($V3, [2, 8]), o([14, 17, 22], [2, 13]), {
            13: [1, 62]
          }, {
            16: 65,
            17: $V2,
            21: 63,
            22: $VE
          }, {
            7: [2, 14]
          }, {
            11: [1, 66]
          }, o($V3, [2, 7]), {
            17: [1, 67]
          }, {
            7: [1, 68]
          }, {
            12: [1, 69]
          }, {
            14: [1, 70]
          }, {
            16: 65,
            17: $V2,
            21: 71,
            22: $VE
          }, {
            8: [1, 72]
          }, o($V3, [2, 9]), o($V3, [2, 10]), {
            14: [1, 73]
          }, o($V3, [2, 2])],
          defaultActions: {
            8: [2, 1],
            9: [2, 3],
            61: [2, 14]
          },
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
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = {
              yy: {}
            };

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
            } else {
              this.parseError = Object.getPrototypeOf(this).parseError;
            }

            function popStack(n) {
              stack.length = stack.length - 2 * n;
              vstack.length = vstack.length - n;
              lstack.length = lstack.length - n;
            }

            _token_stack: var lex = function lex() {
              var token;
              token = lexer.lex() || EOF;

              if (typeof token !== 'number') {
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
                } else {
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
                    last_column: lstack[lstack.length - 1].last_column
                  };

                  if (ranges) {
                    yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                  }

                  r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

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
          }
        };

        var _webpack_require__5 = __webpack_require__(
        /*! ../Expresiones/Objeto */
        "./src/analizadorXML/Expresiones/Objeto.ts"),
            Objeto = _webpack_require__5.Objeto;

        var _webpack_require__6 = __webpack_require__(
        /*! ../Expresiones/Atributo */
        "./src/analizadorXML/Expresiones/Atributo.ts"),
            Atributo = _webpack_require__6.Atributo;

        var _webpack_require__7 = __webpack_require__(
        /*! ../AST/SalidaGramatica */
        "./src/analizadorXML/AST/SalidaGramatica.ts"),
            SalidaGramatica = _webpack_require__7.SalidaGramatica;

        var reportBNF = [];
        var reportBNF2 = [];
        /* generated by jison-lex 0.3.4 */

        var lexer = function () {
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
            setInput: function setInput(input, yy) {
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
            input: function input() {
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
            unput: function unput(ch) {
              var len = ch.length;
              var lines = ch.split(/(?:\r\n?|\n)/g);
              this._input = ch + this._input;
              this.yytext = this.yytext.substr(0, this.yytext.length - len); //this.yyleng -= len;

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
                last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
              };

              if (this.options.ranges) {
                this.yylloc.range = [r[0], r[0] + this.yyleng - len];
              }

              this.yyleng = this.yytext.length;
              return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function more() {
              this._more = true;
              return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function reject() {
              if (this.options.backtrack_lexer) {
                this._backtrack = true;
              } else {
                return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                  text: "",
                  token: null,
                  line: this.yylineno
                });
              }

              return this;
            },
            // retain first n characters of the match
            less: function less(n) {
              this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function pastInput() {
              var past = this.matched.substr(0, this.matched.length - this.match.length);
              return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function upcomingInput() {
              var next = this.match;

              if (next.length < 20) {
                next += this._input.substr(0, 20 - next.length);
              }

              return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function showPosition() {
              var pre = this.pastInput();
              var c = new Array(pre.length + 1).join("-");
              return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function test_match(match, indexed_rule) {
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
                last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
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
            next: function next() {
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
                } // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)


                return false;
              }

              if (this._input === "") {
                return this.EOF;
              } else {
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
              if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
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
            options: {
              "case-insensitive": true
            },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
              var YYSTATE = YY_START;

              switch ($avoiding_name_collisions) {
                case 0:
                  /* skip comments */
                  break;

                case 1:
                  this.begin('comment');
                  break;

                case 2:
                  this.popState();
                  break;

                case 3:
                  /* skip comment content*/
                  break;

                case 4:
                  /* skip whitespace */
                  break;

                case 5:
                  return 47;
                  break;

                case 6:
                  return 48;
                  break;

                case 7:
                  return 49;
                  break;

                case 8:
                  return 50;
                  break;

                case 9:
                  return 51;
                  break;

                case 10:
                  return 'null';
                  break;

                case 11:
                  return 'true';
                  break;

                case 12:
                  return 'false';
                  break;

                case 13:
                  return 9;
                  break;

                case 14:
                  return 10;
                  break;

                case 15:
                  return 13;
                  break;

                case 16:
                  return 29;
                  break;

                case 17:
                  return 30;
                  break;

                case 18:
                  return 31;
                  break;

                case 19:
                  return 22;
                  break;

                case 20:
                  return 32;
                  break;

                case 21:
                  return 'lte';
                  break;

                case 22:
                  return 'gte';
                  break;

                case 23:
                  return 7;
                  break;

                case 24:
                  return 14;
                  break;

                case 25:
                  return 11;
                  break;

                case 26:
                  return 33;
                  break;

                case 27:
                  return 34;
                  break;

                case 28:
                  return 35;
                  break;

                case 29:
                  return 36;
                  break;

                case 30:
                  return 37;
                  break;

                case 31:
                  return 8;
                  break;

                case 32:
                  return 38;
                  break;

                case 33:
                  return 46;
                  break;

                case 34:
                  return 45;
                  break;

                case 35:
                  return 39;
                  break;

                case 36:
                  return 40;
                  break;

                case 37:
                  return 41;
                  break;

                case 38:
                  return 42;
                  break;

                case 39:
                  return 43;
                  break;

                case 40:
                  return 44;
                  break;

                case 41:
                  return 26;
                  break;

                case 42:
                  return 25;
                  break;

                case 43:
                  return 17;
                  break;

                case 44:
                  return 12;
                  break;

                case 45:
                  return 27;
                  break;

                case 46:
                  console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                  break;

                case 47:
                  return 6;
                  break;
              }
            },
            rules: [/^(?:\/\/.*)/i, /^(?:<!--)/i, /^(?:-->)/i, /^(?:.)/i, /^(?:\s+)/i, /^(?:&lt;)/i, /^(?:&gt;)/i, /^(?:&amp;)/i, /^(?:&apos;)/i, /^(?:&quot;)/i, /^(?:null\b)/i, /^(?:true\b)/i, /^(?:false\b)/i, /^(?:xml\b)/i, /^(?:version\b)/i, /^(?:encoding\b)/i, /^(?:\+)/i, /^(?:-)/i, /^(?:\*)/i, /^(?:\/)/i, /^(?:%)/i, /^(?:<=)/i, /^(?:>=)/i, /^(?:<)/i, /^(?:>)/i, /^(?:=)/i, /^(?:==)/i, /^(?:!=)/i, /^(?:&&)/i, /^(?:\|\|)/i, /^(?:!)/i, /^(?:\?)/i, /^(?:;)/i, /^(?:,)/i, /^(?:\.)/i, /^(?:\()/i, /^(?:\))/i, /^(?:\{)/i, /^(?:\})/i, /^(?:\[)/i, /^(?:\])/i, /^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/i, /^(?:[0-9]+)/i, /^(?:[a-zA-Z_áÁéÉíÍóÓ][a-zA-Z0-9_ñÑ]*)/i, /^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/i, /^(?:('((\\([\'\"\\bfnrtv]))|([^\'\\]))'))/i, /^(?:.)/i, /^(?:$)/i],
            conditions: {
              "comment": {
                "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
                "inclusive": true
              },
              "INITIAL": {
                "rules": [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
                "inclusive": true
              }
            }
          };
          return lexer;
        }();

        parser.lexer = lexer;

        function Parser() {
          this.yy = {};
        }

        Parser.prototype = parser;
        parser.Parser = Parser;
        return new Parser();
      }();

      if (true) {
        exports.parser = gramaticaDesc;
        exports.Parser = gramaticaDesc.Parser;

        exports.parse = function () {
          return gramaticaDesc.parse.apply(gramaticaDesc, arguments);
        };

        exports.main = function commonjsMain(args) {
          if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
          }

          var source = __webpack_require__(
          /*! fs */
          1).readFileSync(__webpack_require__(
          /*! path */
          2).normalize(args[1]), "utf8");

          return exports.parser.parse(source);
        };

        if (true && __webpack_require__.c[__webpack_require__.s] === module) {
          exports.main(process.argv.slice(1));
        }
      }
      /* WEBPACK VAR INJECTION */

    }).call(this, __webpack_require__(
    /*! ./../../../node_modules/webpack/buildin/module.js */
    "./node_modules/webpack/buildin/module.js")(module));
    /***/
  },

  /***/
  "./src/analizadorXML/index.ts":
  /*!************************************!*\
    !*** ./src/analizadorXML/index.ts ***!
    \************************************/

  /*! exports provided: AnalizadorASCXML */

  /***/
  function srcAnalizadorXMLIndexTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AnalizadorASCXML", function () {
      return AnalizadorASCXML;
    });
    /* harmony import */


    var _AST_CST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./AST/CST */
    "./src/analizadorXML/AST/CST.ts");
    /* harmony import */


    var _AST_GramaticaBNF__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./AST/GramaticaBNF */
    "./src/analizadorXML/AST/GramaticaBNF.ts");
    /* harmony import */


    var _AST_TablaSimbolos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./AST/TablaSimbolos */
    "./src/analizadorXML/AST/TablaSimbolos.ts");
    /* harmony import */


    var _Gramatica_gramatica__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./Gramatica/gramatica */
    "./src/analizadorXML/Gramatica/gramatica.js");
    /* harmony import */


    var _Gramatica_gramatica__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Gramatica_gramatica__WEBPACK_IMPORTED_MODULE_3__);

    var AnalizadorASCXML = /*#__PURE__*/function () {
      function AnalizadorASCXML() {
        _classCallCheck(this, AnalizadorASCXML);
      }

      _createClass(AnalizadorASCXML, [{
        key: "ejecutarCodigo",
        value: function ejecutarCodigo(entrada) {
          var tabla = new _AST_TablaSimbolos__WEBPACK_IMPORTED_MODULE_2__["TablaSimbolos"]();

          var salidaG = _Gramatica_gramatica__WEBPACK_IMPORTED_MODULE_3__["parse"](entrada);

          var arbolCST = new _AST_CST__WEBPACK_IMPORTED_MODULE_0__["CST"](salidaG.objetos); // TABLA SIMBOLOS

          var reporteTabla = tabla.generarReporteTablaObjetos(salidaG.objetos); // BNF

          var gramBnf = new _AST_GramaticaBNF__WEBPACK_IMPORTED_MODULE_1__["GramaticaBNF"](salidaG.reporteBNF, salidaG.reporteBNF2);
          var reporteBNF = gramBnf.getBNFReport(); // DOT CST

          var reporteCST = arbolCST.generarArbolCST(salidaG.objetos);
          var ret = {
            tablaRep: reporteTabla,
            bnfRep: reporteBNF,
            cstRep: reporteCST,
            encoding: salidaG.encoding
          };
          return ret;
        }
      }]);

      return AnalizadorASCXML;
    }();
    /***/

  },

  /***/
  "./src/analizadorXML/indexDesc.ts":
  /*!****************************************!*\
    !*** ./src/analizadorXML/indexDesc.ts ***!
    \****************************************/

  /*! exports provided: AnalizadorASCXML */

  /***/
  function srcAnalizadorXMLIndexDescTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AnalizadorASCXML", function () {
      return AnalizadorASCXML;
    });
    /* harmony import */


    var _AST_CST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./AST/CST */
    "./src/analizadorXML/AST/CST.ts");
    /* harmony import */


    var _AST_GramaticaBNF__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./AST/GramaticaBNF */
    "./src/analizadorXML/AST/GramaticaBNF.ts");
    /* harmony import */


    var _AST_TablaSimbolos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./AST/TablaSimbolos */
    "./src/analizadorXML/AST/TablaSimbolos.ts");
    /* harmony import */


    var _Gramatica_gramaticaDesc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./Gramatica/gramaticaDesc */
    "./src/analizadorXML/Gramatica/gramaticaDesc.js");
    /* harmony import */


    var _Gramatica_gramaticaDesc__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Gramatica_gramaticaDesc__WEBPACK_IMPORTED_MODULE_3__);

    var AnalizadorASCXML = /*#__PURE__*/function () {
      function AnalizadorASCXML() {
        _classCallCheck(this, AnalizadorASCXML);
      }

      _createClass(AnalizadorASCXML, [{
        key: "ejecutarCodigo",
        value: function ejecutarCodigo(entrada) {
          var tabla = new _AST_TablaSimbolos__WEBPACK_IMPORTED_MODULE_2__["TablaSimbolos"]();

          var salidaG = _Gramatica_gramaticaDesc__WEBPACK_IMPORTED_MODULE_3__["parse"](entrada);

          var arbolCST = new _AST_CST__WEBPACK_IMPORTED_MODULE_0__["CST"](salidaG.objetos); // TABLA SIMBOLOS

          var reporteTabla = tabla.generarReporteTablaObjetos(salidaG.objetos); // BNF

          var gramBnf = new _AST_GramaticaBNF__WEBPACK_IMPORTED_MODULE_1__["GramaticaBNF"](salidaG.reporteBNF, salidaG.reporteBNF2);
          var reporteBNF = gramBnf.getBNFReport(); // DOT CST

          var reporteCST = arbolCST.generarArbolCST(salidaG.objetos);
          var ret = {
            tablaRep: reporteTabla,
            bnfRep: reporteBNF,
            cstRep: reporteCST,
            encoding: salidaG.encoding
          };
          return ret;
        }
      }]);

      return AnalizadorASCXML;
    }();
    /***/

  },

  /***/
  "./src/analizadores/AST/Arbol.ts":
  /*!***************************************!*\
    !*** ./src/analizadores/AST/Arbol.ts ***!
    \***************************************/

  /*! exports provided: Arbol */

  /***/
  function srcAnalizadoresASTArbolTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Arbol", function () {
      return Arbol;
    });

    var Arbol = /*#__PURE__*/function () {
      function Arbol(objetos) {
        _classCallCheck(this, Arbol);

        this.dot = "";
        this.objetos = [];
        this.objetos = objetos;
        this.dot = "";
      }

      _createClass(Arbol, [{
        key: "crearGrafoAST",
        value: function crearGrafoAST() {
          var _this5 = this;

          this.dot = "digraph AST{\n";
          this.dot += "\"raiz\" [label = \"Raiz\"]\n";

          if (this.objetos.length > 1) {
            var i = 0;

            while (i < this.objetos.length) {
              this.dot += "\"".concat(i, "\" [label = \"|\"]\n");
              this.dot += "\"raiz\" -> \"".concat(i, "\"\n");
              this.dot += this.generarNodoAST(this.objetos[i], "".concat(i));

              if (i + 1 < this.objetos.length) {
                this.dot += this.generarNodoAST(this.objetos[i + 1], "".concat(i));
              }

              i += 2;
            }
          } else {
            this.objetos.forEach(function (objeto) {
              _this5.dot += _this5.generarNodoAST(objeto, 'raiz');
            });
          }

          this.dot += "}";
          console.log(this.dot);
          return this.dot;
        }
      }, {
        key: "generarNodoAST",
        value: function generarNodoAST(objeto, padre) {
          var aux = "";
          var izqID = "".concat(objeto.linea.toString(), "_").concat(objeto.columna.toString(), "I");
          var derID = "".concat(objeto.linea.toString(), "_").concat(objeto.columna.toString(), "D");
          aux = "\"".concat(izqID, "\" [label = \"").concat(objeto.estado, "\"]\n");
          aux += "\"".concat(derID, "\" [label = \"").concat(objeto.identificador, "\"]\n");
          aux += "\"".concat(padre, "\" -> \"").concat(izqID, "\"\n");
          aux += "\"".concat(padre, "\" -> \"").concat(derID, "\"\n");

          if (objeto.nodos.length > 0) {
            aux += this.generarNodoAST(objeto.nodos[0], izqID);
          }

          return aux;
        }
      }, {
        key: "crearGrafoCST",
        value: function crearGrafoCST() {
          var _this6 = this;

          this.dot = "digraph AST {\n";
          this.dot += "\"raiz\" [label = \"Raiz\"]\n";

          if (this.objetos.length > 1) {
            var i = 0;

            while (i < this.objetos.length) {
              this.dot += "\"".concat(i, "S\" [label = \"Separador\"]\n");
              this.dot += "\"".concat(i, "\" [label = \"|\"]\n");
              this.dot += "\"raiz\" -> \"".concat(i, "S\"\n");
              this.dot += "\"".concat(i, "S\" -> \"").concat(i, "\"\n");
              this.dot += this.generarNodoCST(this.objetos[i], "".concat(i));

              if (i + 1 < this.objetos.length) {
                this.dot += this.generarNodoCST(this.objetos[i + 1], "".concat(i));
              }

              i += 2;
            }
          } else {
            this.objetos.forEach(function (objeto) {
              _this6.dot += _this6.generarNodoCST(objeto, 'raiz');
            });
          }

          this.dot += "}";
          return this.dot;
        }
      }, {
        key: "generarNodoCST",
        value: function generarNodoCST(objeto, padre) {
          var aux = "";
          var izqID = "".concat(objeto.linea.toString(), "_").concat(objeto.columna.toString(), "I");
          var derID = "".concat(objeto.linea.toString(), "_").concat(objeto.columna.toString(), "D");
          var centroID = "".concat(objeto.linea.toString(), "_").concat(objeto.columna.toString(), "C");
          aux = "\"".concat(izqID, "\" [label = \"").concat(objeto.estado, "\"]\n");
          aux += "\"".concat(derID, "\" [label = \"").concat(objeto.identificador, "\"]\n");
          aux += "\"".concat(centroID, "\" [label = \"Nodo\"]\n");
          aux += "\"".concat(centroID, "\" -> \"").concat(izqID, "\"\n");
          aux += "\"".concat(centroID, "\" -> \"").concat(derID, "\"\n");
          aux += "\"".concat(padre, "\" -> \"").concat(centroID, "\"\n");

          if (objeto.nodos.length > 0) {
            aux += this.generarNodoCST(objeto.nodos[0], izqID);
          }

          return aux;
        }
      }, {
        key: "ejecutarArbol",
        value: function ejecutarArbol() {
          this.dot = "";

          if (this.objetos.length > 1) {
            for (var i = 0; i < this.objetos.length; i++) {
              this.dot += this.ejecutarNodoArbol(this.objetos[i]);

              if (i != this.objetos.length - 1) {
                this.dot += "|";
              }
            }
          } else {
            this.dot += this.ejecutarNodoArbol(this.objetos[0]);
          }

          console.log(this.dot);
          return this.dot;
        }
      }, {
        key: "ejecutarNodoArbol",
        value: function ejecutarNodoArbol(objeto) {
          var aux = objeto.estado + objeto.identificador;

          if (objeto.nodos.length > 0) {
            aux += this.ejecutarNodoArbol(objeto.nodos[0]);
          }
          /*if (objeto.predicado !== null){
              let ret = this.ejecutarPredicado(objeto.predicado.expresion)
              aux += "[" + ret.ex1 + ret.ex2 + "]";
          }*/


          return aux;
        }
      }]);

      return Arbol;
    }();
    /***/

  },

  /***/
  "./src/analizadores/AST/GramaticaBNF.ts":
  /*!**********************************************!*\
    !*** ./src/analizadores/AST/GramaticaBNF.ts ***!
    \**********************************************/

  /*! exports provided: GramaticaBNF */

  /***/
  function srcAnalizadoresASTGramaticaBNFTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "GramaticaBNF", function () {
      return GramaticaBNF;
    });

    var GramaticaBNF = /*#__PURE__*/function () {
      function GramaticaBNF(repo, repo2) {
        _classCallCheck(this, GramaticaBNF);

        this.reporte = repo;
        this.reporte2 = repo2;
      }

      _createClass(GramaticaBNF, [{
        key: "getBNFReport",
        value: function getBNFReport() {
          var ret = [];

          for (var i = 0; i < this.reporte.length; i++) {
            ret.push(this.generarBodyReporte(this.reporte[i], this.reporte2[i], i));
          }

          return ret;
        }
      }, {
        key: "generarBodyReporte",
        value: function generarBodyReporte(object, object2, iterator) {
          var fila = {
            no: iterator,
            produccion: object,
            accion: object2
          };
          return fila;
        }
      }]);

      return GramaticaBNF;
    }();
    /***/

  },

  /***/
  "./src/analizadores/AST/SalidaGramatica.ts":
  /*!*************************************************!*\
    !*** ./src/analizadores/AST/SalidaGramatica.ts ***!
    \*************************************************/

  /*! exports provided: SalidaGramatica */

  /***/
  function srcAnalizadoresASTSalidaGramaticaTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SalidaGramatica", function () {
      return SalidaGramatica;
    });

    var SalidaGramatica = function SalidaGramatica(objetos, reporte, reporte2) {
      _classCallCheck(this, SalidaGramatica);

      this.objetos = objetos;
      this.reporteBNF = reporte;
      this.reporteBNF2 = reporte2;
    };
    /***/

  },

  /***/
  "./src/analizadores/Expresiones/Nodo.ts":
  /*!**********************************************!*\
    !*** ./src/analizadores/Expresiones/Nodo.ts ***!
    \**********************************************/

  /*! exports provided: Nodo */

  /***/
  function srcAnalizadoresExpresionesNodoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Nodo", function () {
      return Nodo;
    });

    var Nodo = function Nodo(estado, identificador, predicado, nodos, linea, columna) {
      _classCallCheck(this, Nodo);

      this.estado = estado;
      this.identificador = identificador;
      this.predicado = predicado;
      this.nodos = nodos;
      this.linea = linea;
      this.columna = columna;
    };
    /***/

  },

  /***/
  "./src/analizadores/Expresiones/Predicate.ts":
  /*!***************************************************!*\
    !*** ./src/analizadores/Expresiones/Predicate.ts ***!
    \***************************************************/

  /*! exports provided: Predicate */

  /***/
  function srcAnalizadoresExpresionesPredicateTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Predicate", function () {
      return Predicate;
    });

    var Predicate = function Predicate(expresion, linea, columna) {
      _classCallCheck(this, Predicate);

      this.expresion = expresion;
      this.linea = linea;
      this.columna = columna;
    };
    /***/

  },

  /***/
  "./src/analizadores/Expresiones/Primitivo.ts":
  /*!***************************************************!*\
    !*** ./src/analizadores/Expresiones/Primitivo.ts ***!
    \***************************************************/

  /*! exports provided: default */

  /***/
  function srcAnalizadoresExpresionesPrimitivoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "default", function () {
      return Primitivo;
    });

    var Primitivo = /*#__PURE__*/function () {
      /**
       * @constructor creamos un nuevo primitivo
       * @param primitivo hace referencia a los valores enteros, dobles, cadenas, caracteres, booleanos
       * @param linea idica la linea donde se encuentra
       * @param columna indica la columna donde se encuentra
       */
      function Primitivo(primitivo, linea, columna) {
        _classCallCheck(this, Primitivo);

        this.columna = columna;
        this.linea = linea;
        this.primitivo = primitivo;
      }

      _createClass(Primitivo, [{
        key: "getTipo",
        value: function getTipo() {
          var valor = this.getValor();

          if (typeof valor === 'number') {
            return "numero";
          } else if (typeof valor === 'string') {
            return "string";
          }
        }
        /**
         * @returns retorna el valor exacto del primitivo
         */

      }, {
        key: "getValor",
        value: function getValor() {
          return this.primitivo;
        }
      }]);

      return Primitivo;
    }();
    /***/

  },

  /***/
  "./src/analizadores/Operaciones/Aritmeticas.ts":
  /*!*****************************************************!*\
    !*** ./src/analizadores/Operaciones/Aritmeticas.ts ***!
    \*****************************************************/

  /*! exports provided: default */

  /***/
  function srcAnalizadoresOperacionesAritmeticasTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "default", function () {
      return Aritmetica;
    });

    var Aritmetica = /*#__PURE__*/function () {
      function Aritmetica(exp1, operador, exp2, linea, columna) {
        _classCallCheck(this, Aritmetica);

        this.exp1 = exp1;
        this.operador = operador;
        this.exp2 = exp2;
        this.linea = linea;
        this.columna = columna;
      }

      _createClass(Aritmetica, [{
        key: "getTipo",
        value: function getTipo() {
          var valor = this.getValor();

          if (typeof valor === 'number') {
            return "numero";
          } else if (typeof valor === 'string') {
            return "string";
          }
        }
      }, {
        key: "getValor",
        value: function getValor() {
          var valor_exp1 = this.exp1.getValor();
          var valor_exp2 = this.exp2.getValor();

          switch (this.operador) {
            case "+":
              if (typeof valor_exp1 === 'number') {
                if (typeof valor_exp2 === 'number') {
                  return valor_exp1 + valor_exp2;
                }
              }

              break;

            case "-":
              if (typeof valor_exp1 == 'number') {
                if (typeof valor_exp2 == "number") {
                  return valor_exp1 - valor_exp2;
                }
              }

              break;

            case "*":
              if (typeof valor_exp1 === 'number') {
                if (typeof valor_exp2 === 'number') {
                  return valor_exp1 * valor_exp2;
                }
              }

              break;

            case "/":
              if (typeof valor_exp1 === 'number') {
                if (typeof valor_exp2 === 'number') {
                  if (valor_exp2 != 0) {
                    return valor_exp1 / valor_exp2;
                  }
                }
              }

              break;

            case "%":
              if (typeof valor_exp1 === 'number') {
                if (typeof valor_exp2 === 'number') {
                  if (valor_exp2 != 0) {
                    return valor_exp1 % valor_exp2;
                  }
                }
              }

              break;

            default:
              return "";
              break;
          }
        }
      }]);

      return Aritmetica;
    }();
    /***/

  },

  /***/
  "./src/analizadores/Operaciones/Logica.ts":
  /*!************************************************!*\
    !*** ./src/analizadores/Operaciones/Logica.ts ***!
    \************************************************/

  /*! exports provided: default */

  /***/
  function srcAnalizadoresOperacionesLogicaTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "default", function () {
      return Logica;
    });

    var Logica
    /*extends Operacion*/
    = /*#__PURE__*/function () {
      function Logica(exp1, operador, exp2, linea, columna) {
        _classCallCheck(this, Logica);

        this.exp1 = exp1;
        this.operador = operador;
        this.exp2 = exp2;
        this.linea = linea;
        this.columna = columna;
      }

      _createClass(Logica, [{
        key: "getTipo",
        value: function getTipo()
        /*controlador: Controlador, ts: TablaSimbolos*/
        {
          return "";
        }
      }, {
        key: "getValor",
        value: function getValor()
        /*Controlador: Controlador, TablaSimbolos: TablaSimbolos*/
        {
          return this.exp1.getValor() + " " + this.operador + " " + this.exp2.getValor();
        }
      }]);

      return Logica;
    }();
    /***/

  },

  /***/
  "./src/analizadores/Operaciones/Relacional.ts":
  /*!****************************************************!*\
    !*** ./src/analizadores/Operaciones/Relacional.ts ***!
    \****************************************************/

  /*! exports provided: default */

  /***/
  function srcAnalizadoresOperacionesRelacionalTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "default", function () {
      return Relacional;
    });

    var Relacional
    /*extends Operacion*/
    = /*#__PURE__*/function () {
      function Relacional(exp1, operador, exp2, linea, columna) {
        _classCallCheck(this, Relacional);

        this.exp1 = exp1;
        this.operador = operador;
        this.exp2 = exp2;
        this.linea = linea;
        this.columna = columna;
      }

      _createClass(Relacional, [{
        key: "getTipo",
        value: function getTipo()
        /*controlador: Controlador, ts: TablaSimbolos*/
        {
          return "";
        }
      }, {
        key: "getValor",
        value: function getValor()
        /*Controlador: Controlador, TablaSimbolos: TablaSimbolos*/
        {
          return this.exp1.getValor() + " " + this.operador + " " + this.exp2.getValor();
        }
      }]);

      return Relacional;
    }();
    /***/

  },

  /***/
  "./src/analizadores/index.ts":
  /*!***********************************!*\
    !*** ./src/analizadores/index.ts ***!
    \***********************************/

  /*! exports provided: AnalizadosAscXpath */

  /***/
  function srcAnalizadoresIndexTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AnalizadosAscXpath", function () {
      return AnalizadosAscXpath;
    });
    /* harmony import */


    var _AST_GramaticaBNF__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./AST/GramaticaBNF */
    "./src/analizadores/AST/GramaticaBNF.ts");
    /* harmony import */


    var _AST_Arbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./AST/Arbol */
    "./src/analizadores/AST/Arbol.ts");
    /* harmony import */


    var _xpathAsc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./xpathAsc */
    "./src/analizadores/xpathAsc.js");
    /* harmony import */


    var _xpathAsc__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_xpathAsc__WEBPACK_IMPORTED_MODULE_2__);

    var AnalizadosAscXpath = /*#__PURE__*/function () {
      function AnalizadosAscXpath() {
        _classCallCheck(this, AnalizadosAscXpath);
      }

      _createClass(AnalizadosAscXpath, [{
        key: "ejecutarCodigo",
        value: function ejecutarCodigo(entrada) {
          var salidaG = _xpathAsc__WEBPACK_IMPORTED_MODULE_2__["parse"](entrada);

          var gramBnf = new _AST_GramaticaBNF__WEBPACK_IMPORTED_MODULE_0__["GramaticaBNF"](salidaG.reporteBNF, salidaG.reporteBNF2);
          var arbol = new _AST_Arbol__WEBPACK_IMPORTED_MODULE_1__["Arbol"](salidaG.objetos);
          console.log(salidaG.objetos);
          var reporteBNF = gramBnf.getBNFReport();
          var reporteAST = arbol.crearGrafoAST();
          var reporteCST = arbol.crearGrafoCST();
          var resultado = arbol.ejecutarArbol();
          return {
            objetos: salidaG.objetos,
            bnfRep: reporteBNF,
            astRep: reporteAST,
            cstRep: reporteCST,
            ejecutado: resultado
          };
        }
      }]);

      return AnalizadosAscXpath;
    }();
    /***/

  },

  /***/
  "./src/analizadores/indexDesc.ts":
  /*!***************************************!*\
    !*** ./src/analizadores/indexDesc.ts ***!
    \***************************************/

  /*! exports provided: AnalizadosAscXpath */

  /***/
  function srcAnalizadoresIndexDescTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AnalizadosAscXpath", function () {
      return AnalizadosAscXpath;
    });
    /* harmony import */


    var _AST_GramaticaBNF__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./AST/GramaticaBNF */
    "./src/analizadores/AST/GramaticaBNF.ts");
    /* harmony import */


    var _AST_Arbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./AST/Arbol */
    "./src/analizadores/AST/Arbol.ts");
    /* harmony import */


    var _xpathDesc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./xpathDesc */
    "./src/analizadores/xpathDesc.js");
    /* harmony import */


    var _xpathDesc__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_xpathDesc__WEBPACK_IMPORTED_MODULE_2__);

    var AnalizadosAscXpath = /*#__PURE__*/function () {
      function AnalizadosAscXpath() {
        _classCallCheck(this, AnalizadosAscXpath);
      }

      _createClass(AnalizadosAscXpath, [{
        key: "ejecutarCodigo",
        value: function ejecutarCodigo(entrada) {
          var salidaG = _xpathDesc__WEBPACK_IMPORTED_MODULE_2__["parse"](entrada);

          var gramBnf = new _AST_GramaticaBNF__WEBPACK_IMPORTED_MODULE_0__["GramaticaBNF"](salidaG.reporteBNF, salidaG.reporteBNF2);
          var arbol = new _AST_Arbol__WEBPACK_IMPORTED_MODULE_1__["Arbol"](salidaG.objetos);
          console.log(salidaG.objetos);
          var reporteBNF = gramBnf.getBNFReport();
          var reporteAST = arbol.crearGrafoAST();
          var reporteCST = arbol.crearGrafoCST();
          var resultado = arbol.ejecutarArbol();
          return {
            objetos: salidaG.objetos,
            bnfRep: reporteBNF,
            astRep: reporteAST,
            cstRep: reporteCST,
            ejecutado: resultado
          };
        }
      }]);

      return AnalizadosAscXpath;
    }();
    /***/

  },

  /***/
  "./src/analizadores/xpathAsc.js":
  /*!**************************************!*\
    !*** ./src/analizadores/xpathAsc.js ***!
    \**************************************/

  /*! no static exports found */

  /***/
  function srcAnalizadoresXpathAscJs(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */
    (function (module) {
      /* parser generated by jison 0.4.18 */

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
      var xpathAsc = function () {
        var o = function o(k, v, _o3, l) {
          for (_o3 = _o3 || {}, l = k.length; l--; _o3[k[l]] = v) {
            ;
          }

          return _o3;
        },
            $V0 = [1, 4],
            $V1 = [1, 5],
            $V2 = [1, 6],
            $V3 = [1, 7],
            $V4 = [1, 8],
            $V5 = [5, 6],
            $V6 = [1, 12],
            $V7 = [5, 6, 14],
            $V8 = [2, 39],
            $V9 = [1, 14],
            $Va = [1, 17],
            $Vb = [1, 19],
            $Vc = [1, 20],
            $Vd = [1, 21],
            $Ve = [1, 22],
            $Vf = [1, 24],
            $Vg = [1, 25],
            $Vh = [1, 26],
            $Vi = [1, 27],
            $Vj = [1, 28],
            $Vk = [1, 29],
            $Vl = [1, 30],
            $Vm = [1, 31],
            $Vn = [1, 32],
            $Vo = [1, 33],
            $Vp = [1, 34],
            $Vq = [1, 35],
            $Vr = [8, 12, 16, 17, 20, 23, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
            $Vs = [2, 13],
            $Vt = [1, 47],
            $Vu = [1, 51],
            $Vv = [1, 46],
            $Vw = [1, 44],
            $Vx = [1, 45],
            $Vy = [1, 48],
            $Vz = [1, 49],
            $VA = [1, 50],
            $VB = [1, 60],
            $VC = [1, 59],
            $VD = [1, 61],
            $VE = [1, 81],
            $VF = [1, 79],
            $VG = [1, 80],
            $VH = [1, 82],
            $VI = [1, 83],
            $VJ = [1, 84],
            $VK = [1, 85],
            $VL = [1, 86],
            $VM = [1, 87],
            $VN = [1, 88],
            $VO = [1, 89],
            $VP = [1, 90],
            $VQ = [1, 91],
            $VR = [16, 19, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
            $VS = [5, 6, 14, 16, 19, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
            $VT = [1, 134],
            $VU = [1, 132],
            $VV = [1, 133],
            $VW = [1, 135],
            $VX = [16, 19, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
            $VY = [19, 40, 44, 45, 46, 47, 48, 49, 50, 51, 52],
            $VZ = [19, 40, 44, 49, 50, 51, 52];

        var parser = {
          trace: function trace() {},
          yy: {},
          symbols_: {
            "error": 2,
            "INICIOPURO": 3,
            "INICIO": 4,
            "EOF": 5,
            "tk_barra": 6,
            "INICIALES": 7,
            "tk_punto": 8,
            "DIAGONALES": 9,
            "DERIVADOSLIMITADO": 10,
            "DERIVACIONDIAGONAL": 11,
            "tk_identificador": 12,
            "PREDICATE": 13,
            "tk_diagonal": 14,
            "DERIVADOS": 15,
            "tk_asterisco": 16,
            "tk_node": 17,
            "tk_parA": 18,
            "tk_parC": 19,
            "tk_arroba": 20,
            "ATRIBUTO": 21,
            "AXES": 22,
            "tk_child": 23,
            "tk_dosPuntos": 24,
            "NODETEST": 25,
            "tk_descendant": 26,
            "tk_descendatOr": 27,
            "tk_ancestor": 28,
            "tk_ancestorOr": 29,
            "tk_attribute": 30,
            "tk_following": 31,
            "tk_followingSi": 32,
            "tk_parent": 33,
            "tk_preceding": 34,
            "tk_precedingSi": 35,
            "tk_self": 36,
            "tk_text": 37,
            "tk_llaveA": 38,
            "EXPRESION": 39,
            "tk_llaveC": 40,
            "tk_mas": 41,
            "tk_menos": 42,
            "tk_div": 43,
            "tk_mod": 44,
            "tk_menor": 45,
            "tk_mayor": 46,
            "tk_menorIgual": 47,
            "tk_mayorIgual": 48,
            "tk_igual": 49,
            "tk_distinto": 50,
            "tk_or": 51,
            "tk_and": 52,
            "tk_entero": 53,
            "tk_decimal": 54,
            "tk_position": 55,
            "tk_last": 56,
            "tk_stringTexto": 57,
            "tk_ParC": 58,
            "$accept": 0,
            "$end": 1
          },
          terminals_: {
            2: "error",
            5: "EOF",
            6: "tk_barra",
            8: "tk_punto",
            12: "tk_identificador",
            14: "tk_diagonal",
            16: "tk_asterisco",
            17: "tk_node",
            18: "tk_parA",
            19: "tk_parC",
            20: "tk_arroba",
            23: "tk_child",
            24: "tk_dosPuntos",
            26: "tk_descendant",
            27: "tk_descendatOr",
            28: "tk_ancestor",
            29: "tk_ancestorOr",
            30: "tk_attribute",
            31: "tk_following",
            32: "tk_followingSi",
            33: "tk_parent",
            34: "tk_preceding",
            35: "tk_precedingSi",
            36: "tk_self",
            37: "tk_text",
            38: "tk_llaveA",
            40: "tk_llaveC",
            41: "tk_mas",
            42: "tk_menos",
            43: "tk_div",
            44: "tk_mod",
            45: "tk_menor",
            46: "tk_mayor",
            47: "tk_menorIgual",
            48: "tk_mayorIgual",
            49: "tk_igual",
            50: "tk_distinto",
            51: "tk_or",
            52: "tk_and",
            53: "tk_entero",
            54: "tk_decimal",
            55: "tk_position",
            56: "tk_last",
            57: "tk_stringTexto",
            58: "tk_ParC"
          },
          productions_: [0, [3, 2], [4, 3], [4, 1], [7, 4], [7, 3], [7, 3], [7, 4], [7, 3], [7, 5], [9, 1], [9, 2], [11, 3], [11, 0], [10, 2], [10, 2], [10, 4], [10, 2], [10, 1], [15, 1], [15, 2], [15, 1], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [25, 2], [25, 4], [25, 2], [25, 3], [13, 3], [13, 0], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 1], [39, 1], [39, 2], [39, 1], [39, 3], [39, 3], [39, 1], [39, 3], [21, 1], [21, 1], [21, 3]],
          performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate
          /* action[1] */
          , $$
          /* vstack */
          , _$
          /* lstack */
          ) {
            /* this == yyval */
            var $0 = $$.length - 1;

            switch (yystate) {
              case 1:
                produccion.push('<INICIOPURO> ::= <INICIO> EOF');
                accion.push('INICIOPURO.Val = INICIO.val //fin del documento');
                return new SalidaGramatica($$[$0 - 1], produccion, accion);
                break;

              case 2:
                produccion.push('<INICIO> ::= <INICIO> | <INICIALES>');
                accion.push('INICIO.Val = INICIO.push(INICIALES)'); //this.$ = new Array();

                this.$.push($$[$0]);
                break;

              case 3:
                produccion.push('<INICIO> ::= <INICIALES>');
                accion.push('INICIO.Val = INICIALES.Val');
                this.$ = [$$[$0]];
                break;

              case 4:
                produccion.push("<INICIALES> ::= punto <DIAGONALES> <DERIVADOSLIMITADO> <DERIVAIONDIAGONAL>");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)');
                this.$ = new Nodo("", ".", null, [new Nodo($$[$0 - 2], $$[$0 - 1].val, $$[$0 - 1].pre, _toConsumableArray($$[$0]), _$[$0 - 3].first_line, _$[$0 - 3].first_column)], _$[$0 - 3].first_line, _$[$0 - 3].first_column);
                break;

              case 5:
                produccion.push("<INICIALES> ::= identificador <PREDICATE> <DERIVACIONDIAGONAL>");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)'); //this.$ = new Array();

                this.$ = new Nodo("", $$[$0 - 2], $$[$0 - 1], _toConsumableArray($$[$0]), _$[$0 - 2].first_line, _$[$0 - 2].first_column); //this.$.push(...$$[$0])

                break;

              case 6:
                produccion.push("<INICIALES> ::= / <DERIVADOS> <DERIVACIONDIAGONAL>");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)'); //this.$ = new Array();

                this.$ = new Nodo($$[$0 - 2], $$[$0 - 1].val, $$[$0 - 1].pre, _toConsumableArray($$[$0]), _$[$0 - 2].first_line, _$[$0 - 2].first_column); //this.$.push(...$$[$0])

                break;

              case 7:
                produccion.push('<INICIALES> ::= // <DERIVADOS> <DERIVACIONDIAGONAL>');
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)'); //this.$ = new Array();

                this.$ = new Nodo("//", $$[$0 - 1].val, $$[$0 - 1].pre, _toConsumableArray($$[$0]), _$[$0 - 3].first_line, _$[$0 - 3].first_column); //this.$.push(...$$[$0])

                break;

              case 8:
                produccion.push("<INICIALES> ::= asterisco <PREDICATE> <DERIVACIONDIAGONAL>");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)'); //this.$ = new Array();

                this.$ = new Nodo("", $$[$0 - 2], $$[$0 - 1], _toConsumableArray($$[$0]), _$[$0 - 2].first_line, _$[$0 - 2].first_column); //this.$.push(...$$[$0])

                break;

              case 9:
                produccion.push("<INICIALES> ::= node() <PREDICATE> <DERIVACIONDIAGONAL>");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)'); //this.$ = new Array();

                this.$ = new Nodo("", "node()", $$[$0 - 1], _toConsumableArray($$[$0 - 2]), _$[$0 - 4].first_line, _$[$0 - 4].first_column); //this.$.push(...$$[$0-2])

                break;

              case 10:
                produccion.push('<DIAGONALES> ::= /');
                accion.push('DIAGONALES.Val = \"/\"');
                this.$ = $$[$0];
                break;

              case 11:
                produccion.push("<DIAGONALES> ::= //");
                accion.push('DIAGONALES.Val = \"//\"');
                this.$ = "//";
                break;

              case 12:
                produccion.push("<DERIVACIONDIAGONAL> ::= <DIAGONALES> <DERIVADOS> <DERIVACIONDIAGONAL>");
                accion.push('DERIVACIONDIAGONAL.Val = []; DERIVACIONDIAGONAL.Val.push(new Nodo(tipo, id, predicado, fila, columna)); DERIVACIONDIAGONAL.push(DERIVACIONDIAGONAL)');
                this.$ = new Array();
                this.$.push(new Nodo($$[$0 - 2], $$[$0 - 1].val, $$[$0 - 1].pre, _toConsumableArray($$[$0]), _$[$0 - 2].first_line, _$[$0 - 2].first_column)); //this.$.push(...$$[$0])

                break;

              case 13:
                produccion.push("<DERIVACIONDIAGONAL> ::= epsilon");
                accion.push('DERIVACIONDIAGONAL.Val = [/*Vacio*/]');
                this.$ = [];
                break;

              case 14:
                produccion.push("<DERIVADOSLIMIADO> ::= identificador <PREDICATE>");
                accion.push('DERIVADOSLIMITADO.Val = identificador + PREDICATE.Val');
                this.$ = {
                  val: $$[$0 - 1],
                  pre: $$[$0]
                };
                break;

              case 15:
                produccion.push("<DERIVADOSLIMIADO> ::= asterisco <PREDICATE>");
                accion.push('DERIVADOSLIMITADO.Val = \"*\" + PREDICATE.Val');
                this.$ = {
                  val: $$[$0 - 1],
                  pre: $$[$0]
                };
                break;

              case 16:
                produccion.push("<DERIVADOSLIMIADO> ::= node() <PREDICATE>");
                accion.push('DERIVADOSLIMITADO.Val = \"@\" + ATRIBUTO.Val');
                this.$ = {
                  val: "node()",
                  pre: $$[$0]
                };
                break;

              case 17:
                produccion.push("<DERIVADOSLIMIADO> ::= arroba <ATRIBUTO>");
                accion.push('DERIVADOSLIMITADO.Val = \"@\" + ATRIBUTO.Val');
                this.$ = {
                  val: $$[$0 - 1] + "" + $$[$0],
                  pre: null
                };
                break;

              case 18:
                produccion.push("<DERIVADOSLIMITADO> ::= <AXES>");
                accion.push('DERIVADOSLIMITADO.Val = AXES.Val');
                this.$ = {
                  val: $$[$0],
                  pre: null
                };
                break;

              case 19:
                produccion.push("<DERIVADOS> ::= punto");
                accion.push("DERIVADOS.Val = \".\" ");
                this.$ = {
                  val: $$[$0],
                  pre: null
                };
                break;

              case 20:
                produccion.push("<DERIVADOS> ::= doblePunto");
                accion.push('DERIVADOS.Val = \"..\"');
                this.$ = {
                  val: "..",
                  pre: null
                };
                break;

              case 21:
                produccion.push("<DERIVADOS> ::= <DERIVADOSLIMITADO>");
                accion.push('DERIVADOS.Val = DERIVADOSLIMITADO.Val');
                this.$ = $$[$0];
                break;

              case 38:
                produccion.push("<PREDICATE> ::= llaveA <EXPRESION> llaveC");
                accion.push('PREDICATE.Val = EXPRESION.Val');
                this.$ = new Predicate($$[$0 - 1], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 39:
                produccion.push("<PREDICATE> ::= epsilon");
                accion.push('PREDICATE.Val = /*vacio*/');
                this.$ = null;
                break;

              case 40:
                produccion.push("<EXPRESION> ::= <EXPRESION> mas <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '+', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 41:
                produccion.push("<EXPRESION> ::= <EXPRESION> menos <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val - EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '-', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 42:
                produccion.push("<EXPRESION> ::= <EXPRESION> asterisco <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val * EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '*', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 43:
                produccion.push("<EXPRESION> ::= <EXPRESION> div <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val / EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '/', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 44:
                produccion.push("<EXPRESION> ::= <EXPRESION> mod <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val % EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '%', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 45:
                produccion.push("<EXPRESION> ::= <EXPRESION> menor <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \"<\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '<', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 46:
                produccion.push("<EXPRESION> ::= <EXPRESION> mayor <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \">\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '>', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 47:
                produccion.push("<EXPRESION> ::= <EXPRESION> menorIgual <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \"<=\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '<=', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 48:
                produccion.push("<EXPRESION> ::= <EXPRESION> mayorIgual <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \">=\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '>=', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 49:
                produccion.push("<EXPRESION> ::= <EXPRESION> igual <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \"=\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '=', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 50:
                produccion.push("<EXPRESION> ::= <EXPRESION> distinto <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + "" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '!=', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 51:
                produccion.push("<EXPRESION> ::= <EXPRESION> or <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \"or\" + EXPRESION.Val');
                this.$ = new Logica["default"]($$[$0 - 2], 'or', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 52:
                produccion.push("<EXPRESION> ::= <EXPRESION> and <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \"and\" + EXPRESION.Val');
                this.$ = new Logica["default"]($$[$0 - 2], 'and', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 53:
                produccion.push("<EXPRESION> ::= entero");
                accion.push('EXPRESION.Val = \"entero\"');
                this.$ = new Primitivo["default"](Number(yytext), _$[$0].first_line, _$[$0].first_column);
                break;

              case 54:
                produccion.push("<EXPRESION> ::= decimal");
                accion.push('EXPRESION.Val = \"decimal\"');
                this.$ = new Primitivo["default"](Number(yytext), _$[$0].first_line, _$[$0].first_column);
                break;

              case 55:
                produccion.push("<EXPRESION> ::= arroba <ATRIBUTO>");
                accion.push('EXPRESION.Val = \"@\" + ATRIBUTO.Val');
                this.$ = new Primitivo["default"]("this._".concat($$[$0]), _$[$0 - 1].first_line, _$[$0 - 1].first_column);
                break;

              case 56:
                produccion.push("<EXPRESION> ::= identificador");
                accion.push('EXPRESION.Val = \"identificador\"');
                this.$ = new Primitivo["default"]($$[$0], _$[$0].first_line, _$[$0].first_column);
                break;

              case 57:
                produccion.push("<EXPRESION> ::= position()");
                accion.push('EXPRESION.Val = \"position()\"');
                this.$ = new Primitivo["default"]("position()", _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 58:
                produccion.push("<EXPRESION> ::= last()");
                accion.push('EXPRESION.Val = \"last()\"');
                this.$ = new Primitivo["default"]("last()", _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 59:
                produccion.push("<EXPRESION> ::= texto");
                accion.push('EXPRESION.Val = \"texto\"');
                this.$ = new Primitivo["default"]($$[$0], _$[$0].first_line, _$[$0].first_column);
                break;

              case 60:
                produccion.push("<EXPRESION> ::= ( <EXPRESION> )");
                accion.push('EXPRESION.Val = EXPRESION1.Val');
                this.$ = new Primitivo["default"]($$[$0 - 2], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 61:
                produccion.push("<ATRIBUTO> ::= asterisco");
                accion.push('ATRIBUTO.Val = \"*\"');
                this.$ = $$[$0];
                break;

              case 62:
                produccion.push("<ATRIBUTO> ::= identificador");
                accion.push('ATRIBUTO.Val = identificador');
                this.$ = $$[$0];
                break;

              case 63:
                produccion.push("<ATRIBUTO> ::= node");
                accion.push('ATRIBUTO.Val = \"node()\"');
                this.$ = "node()";
                break;
            }
          },
          table: [{
            3: 1,
            4: 2,
            7: 3,
            8: $V0,
            12: $V1,
            14: $V2,
            16: $V3,
            17: $V4
          }, {
            1: [3]
          }, {
            5: [1, 9],
            6: [1, 10]
          }, o($V5, [2, 3]), {
            9: 11,
            14: $V6
          }, o($V7, $V8, {
            13: 13,
            38: $V9
          }), {
            8: $Va,
            10: 18,
            12: $Vb,
            14: [1, 16],
            15: 15,
            16: $Vc,
            17: $Vd,
            20: $Ve,
            22: 23,
            23: $Vf,
            26: $Vg,
            27: $Vh,
            28: $Vi,
            29: $Vj,
            30: $Vk,
            31: $Vl,
            32: $Vm,
            33: $Vn,
            34: $Vo,
            35: $Vp,
            36: $Vq
          }, o($V7, $V8, {
            13: 36,
            38: $V9
          }), {
            18: [1, 37]
          }, {
            1: [2, 1]
          }, {
            7: 38,
            8: $V0,
            12: $V1,
            14: $V2,
            16: $V3,
            17: $V4
          }, {
            10: 39,
            12: $Vb,
            16: $Vc,
            17: $Vd,
            20: $Ve,
            22: 23,
            23: $Vf,
            26: $Vg,
            27: $Vh,
            28: $Vi,
            29: $Vj,
            30: $Vk,
            31: $Vl,
            32: $Vm,
            33: $Vn,
            34: $Vo,
            35: $Vp,
            36: $Vq
          }, o($Vr, [2, 10], {
            14: [1, 40]
          }), o($V5, $Vs, {
            11: 41,
            9: 42,
            14: $V6
          }), {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 43,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, o($V5, $Vs, {
            9: 42,
            11: 52,
            14: $V6
          }), {
            8: $Va,
            10: 18,
            12: $Vb,
            15: 53,
            16: $Vc,
            17: $Vd,
            20: $Ve,
            22: 23,
            23: $Vf,
            26: $Vg,
            27: $Vh,
            28: $Vi,
            29: $Vj,
            30: $Vk,
            31: $Vl,
            32: $Vm,
            33: $Vn,
            34: $Vo,
            35: $Vp,
            36: $Vq
          }, o($V7, [2, 19], {
            8: [1, 54]
          }), o($V7, [2, 21]), o($V7, $V8, {
            13: 55,
            38: $V9
          }), o($V7, $V8, {
            13: 56,
            38: $V9
          }), {
            18: [1, 57]
          }, {
            12: $VB,
            16: $VC,
            17: $VD,
            21: 58
          }, o($V7, [2, 18]), {
            24: [1, 62]
          }, {
            24: [1, 63]
          }, {
            24: [1, 64]
          }, {
            24: [1, 65]
          }, {
            24: [1, 66]
          }, {
            24: [1, 67]
          }, {
            24: [1, 68]
          }, {
            24: [1, 69]
          }, {
            24: [1, 70]
          }, {
            24: [1, 71]
          }, {
            24: [1, 72]
          }, {
            24: [1, 73]
          }, o($V5, $Vs, {
            9: 42,
            11: 74,
            14: $V6
          }), {
            19: [1, 75]
          }, o($V5, [2, 2]), o($V5, $Vs, {
            9: 42,
            11: 76,
            14: $V6
          }), o($Vr, [2, 11]), o($V5, [2, 5]), {
            8: $Va,
            10: 18,
            12: $Vb,
            15: 77,
            16: $Vc,
            17: $Vd,
            20: $Ve,
            22: 23,
            23: $Vf,
            26: $Vg,
            27: $Vh,
            28: $Vi,
            29: $Vj,
            30: $Vk,
            31: $Vl,
            32: $Vm,
            33: $Vn,
            34: $Vo,
            35: $Vp,
            36: $Vq
          }, {
            16: $VE,
            40: [1, 78],
            41: $VF,
            42: $VG,
            43: $VH,
            44: $VI,
            45: $VJ,
            46: $VK,
            47: $VL,
            48: $VM,
            49: $VN,
            50: $VO,
            51: $VP,
            52: $VQ
          }, o($VR, [2, 53]), o($VR, [2, 54]), {
            12: $VB,
            16: $VC,
            17: $VD,
            21: 92
          }, o($VR, [2, 56]), {
            18: [1, 93]
          }, {
            18: [1, 94]
          }, o($VR, [2, 59]), {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 95,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, o($V5, [2, 6]), o($V5, $Vs, {
            9: 42,
            11: 96,
            14: $V6
          }), o($V7, [2, 20]), o($V7, [2, 14]), o($V7, [2, 15]), {
            19: [1, 97]
          }, o($V7, [2, 17]), o($VS, [2, 61]), o($VS, [2, 62]), {
            18: [1, 98]
          }, {
            24: [1, 99]
          }, {
            24: [1, 100]
          }, {
            24: [1, 101]
          }, {
            24: [1, 102]
          }, {
            24: [1, 103]
          }, {
            24: [1, 104]
          }, {
            24: [1, 105]
          }, {
            24: [1, 106]
          }, {
            24: [1, 107]
          }, {
            24: [1, 108]
          }, {
            24: [1, 109]
          }, {
            24: [1, 110]
          }, o($V5, [2, 8]), o($V7, $V8, {
            13: 111,
            38: $V9
          }), o($V5, [2, 4]), o($V5, $Vs, {
            9: 42,
            11: 112,
            14: $V6
          }), o($V7, [2, 38]), {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 113,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 114,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 115,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 116,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 117,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 118,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 119,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 120,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 121,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 122,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 123,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 124,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            39: 125,
            53: $Vw,
            54: $Vx,
            55: $Vy,
            56: $Vz,
            57: $VA
          }, o($VR, [2, 55]), {
            19: [1, 126]
          }, {
            19: [1, 127]
          }, {
            16: $VE,
            19: [1, 128],
            41: $VF,
            42: $VG,
            43: $VH,
            44: $VI,
            45: $VJ,
            46: $VK,
            47: $VL,
            48: $VM,
            49: $VN,
            50: $VO,
            51: $VP,
            52: $VQ
          }, o($V5, [2, 7]), o($V7, $V8, {
            13: 129,
            38: $V9
          }), {
            58: [1, 130]
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            25: 131,
            37: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            25: 136,
            37: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            25: 137,
            37: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            25: 138,
            37: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            25: 139,
            37: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            25: 140,
            37: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            25: 141,
            37: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            25: 142,
            37: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            25: 143,
            37: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            25: 144,
            37: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            25: 145,
            37: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            25: 146,
            37: $VW
          }, o($V5, $Vs, {
            9: 42,
            11: 147,
            14: $V6
          }), o($V5, [2, 12]), o($VR, [2, 40]), o($VR, [2, 41]), o($VX, [2, 42], {
            41: $VF,
            42: $VG
          }), o($VX, [2, 43], {
            41: $VF,
            42: $VG
          }), o([19, 40, 44], [2, 44], {
            16: $VE,
            41: $VF,
            42: $VG,
            43: $VH,
            45: $VJ,
            46: $VK,
            47: $VL,
            48: $VM,
            49: $VN,
            50: $VO,
            51: $VP,
            52: $VQ
          }), o($VY, [2, 45], {
            16: $VE,
            41: $VF,
            42: $VG,
            43: $VH
          }), o($VY, [2, 46], {
            16: $VE,
            41: $VF,
            42: $VG,
            43: $VH
          }), o($VY, [2, 47], {
            16: $VE,
            41: $VF,
            42: $VG,
            43: $VH
          }), o($VY, [2, 48], {
            16: $VE,
            41: $VF,
            42: $VG,
            43: $VH
          }), o($VZ, [2, 49], {
            16: $VE,
            41: $VF,
            42: $VG,
            43: $VH,
            45: $VJ,
            46: $VK,
            47: $VL,
            48: $VM
          }), o($VZ, [2, 50], {
            16: $VE,
            41: $VF,
            42: $VG,
            43: $VH,
            45: $VJ,
            46: $VK,
            47: $VL,
            48: $VM
          }), o([19, 40, 44, 51], [2, 51], {
            16: $VE,
            41: $VF,
            42: $VG,
            43: $VH,
            45: $VJ,
            46: $VK,
            47: $VL,
            48: $VM,
            49: $VN,
            50: $VO,
            52: $VQ
          }), o([19, 40, 44, 51, 52], [2, 52], {
            16: $VE,
            41: $VF,
            42: $VG,
            43: $VH,
            45: $VJ,
            46: $VK,
            47: $VL,
            48: $VM,
            49: $VN,
            50: $VO
          }), o($VR, [2, 57]), o($VR, [2, 58]), o($VR, [2, 60]), o($V7, [2, 16]), o($VS, [2, 63]), o($V7, [2, 22]), o($V7, $V8, {
            13: 148,
            38: $V9
          }), {
            18: [1, 149]
          }, o($V7, $V8, {
            13: 150,
            38: $V9
          }), {
            18: [1, 151]
          }, o($V7, [2, 23]), o($V7, [2, 24]), o($V7, [2, 25]), o($V7, [2, 26]), o($V7, [2, 27]), o($V7, [2, 28]), o($V7, [2, 29]), o($V7, [2, 30]), o($V7, [2, 31]), o($V7, [2, 32]), o($V7, [2, 33]), o($V5, [2, 9]), o($V7, [2, 34]), {
            19: [1, 152]
          }, o($V7, [2, 36]), {
            19: [1, 153]
          }, o($V7, $V8, {
            13: 154,
            38: $V9
          }), o($V7, [2, 37]), o($V7, [2, 35])],
          defaultActions: {
            9: [2, 1]
          },
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
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = {
              yy: {}
            };

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
            } else {
              this.parseError = Object.getPrototypeOf(this).parseError;
            }

            function popStack(n) {
              stack.length = stack.length - 2 * n;
              vstack.length = vstack.length - n;
              lstack.length = lstack.length - n;
            }

            _token_stack: var lex = function lex() {
              var token;
              token = lexer.lex() || EOF;

              if (typeof token !== 'number') {
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
                } else {
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
                    last_column: lstack[lstack.length - 1].last_column
                  };

                  if (ranges) {
                    yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                  }

                  r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

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
          }
        };

        var _webpack_require__8 = __webpack_require__(
        /*! ./AST/SalidaGramatica */
        "./src/analizadores/AST/SalidaGramatica.ts"),
            SalidaGramatica = _webpack_require__8.SalidaGramatica;

        var _webpack_require__9 = __webpack_require__(
        /*! ./Expresiones/Nodo */
        "./src/analizadores/Expresiones/Nodo.ts"),
            Nodo = _webpack_require__9.Nodo;

        var Primitivo = __webpack_require__(
        /*! ./Expresiones/Primitivo */
        "./src/analizadores/Expresiones/Primitivo.ts");

        var Aritmetica = __webpack_require__(
        /*! ./Operaciones/Aritmeticas */
        "./src/analizadores/Operaciones/Aritmeticas.ts");

        var Relacional = __webpack_require__(
        /*! ./Operaciones/Relacional */
        "./src/analizadores/Operaciones/Relacional.ts");

        var Logica = __webpack_require__(
        /*! ./Operaciones/Logica */
        "./src/analizadores/Operaciones/Logica.ts");

        var _webpack_require__10 = __webpack_require__(
        /*! ./Expresiones/Predicate */
        "./src/analizadores/Expresiones/Predicate.ts"),
            Predicate = _webpack_require__10.Predicate; //const { Atributo } = require('./Expresiones/Atributo');


        var produccion = [];
        var accion = [];
        /* generated by jison-lex 0.3.4 */

        var lexer = function () {
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
            setInput: function setInput(input, yy) {
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
            input: function input() {
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
            unput: function unput(ch) {
              var len = ch.length;
              var lines = ch.split(/(?:\r\n?|\n)/g);
              this._input = ch + this._input;
              this.yytext = this.yytext.substr(0, this.yytext.length - len); //this.yyleng -= len;

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
                last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
              };

              if (this.options.ranges) {
                this.yylloc.range = [r[0], r[0] + this.yyleng - len];
              }

              this.yyleng = this.yytext.length;
              return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function more() {
              this._more = true;
              return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function reject() {
              if (this.options.backtrack_lexer) {
                this._backtrack = true;
              } else {
                return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                  text: "",
                  token: null,
                  line: this.yylineno
                });
              }

              return this;
            },
            // retain first n characters of the match
            less: function less(n) {
              this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function pastInput() {
              var past = this.matched.substr(0, this.matched.length - this.match.length);
              return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function upcomingInput() {
              var next = this.match;

              if (next.length < 20) {
                next += this._input.substr(0, 20 - next.length);
              }

              return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function showPosition() {
              var pre = this.pastInput();
              var c = new Array(pre.length + 1).join("-");
              return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function test_match(match, indexed_rule) {
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
                last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
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
            next: function next() {
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
                } // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)


                return false;
              }

              if (this._input === "") {
                return this.EOF;
              } else {
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
              if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
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
            options: {},
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
              var YYSTATE = YY_START;

              switch ($avoiding_name_collisions) {
                case 0:
                  return "tk_decimal";
                  break;

                case 1:
                  return "tk_entero";
                  break;

                case 2:
                  return "tk_node";
                  break;

                case 3:
                  return "tk_child";
                  break;

                case 4:
                  return "tk_descendant";
                  break;

                case 5:
                  return "tk_descendatOr";
                  break;

                case 6:
                  return "tk_ancestor";
                  break;

                case 7:
                  return "tk_ancestorOr";
                  break;

                case 8:
                  return "tk_attribute";
                  break;

                case 9:
                  return "tk_following";
                  break;

                case 10:
                  return "tk_followingSi";
                  break;

                case 11:
                  return "tk_parent";
                  break;

                case 12:
                  return "tk_preceding";
                  break;

                case 13:
                  return "tk_precedingSi";
                  break;

                case 14:
                  return "tk_self";
                  break;

                case 15:
                  return "tk_text";
                  break;

                case 16:
                  return "tk_position";
                  break;

                case 17:
                  return "tk_last";
                  break;

                case 18:
                  return "tk_div";
                  break;

                case 19:
                  return "tk_and";
                  break;

                case 20:
                  return "tk_or";
                  break;

                case 21:
                  return "tk_mod";
                  break;

                case 22:
                  return "tk_barra";
                  break;

                case 23:
                  return "tk_punto";
                  break;

                case 24:
                  return "tk_diagonal";
                  break;

                case 25:
                  return "tk_asterisco";
                  break;

                case 26:
                  return "tk_dosPuntos";
                  break;

                case 27:
                  return "tk_mas";
                  break;

                case 28:
                  return "tk_menos";
                  break;

                case 29:
                  return "tk_menorIgual";
                  break;

                case 30:
                  return "tk_mayorIgual";
                  break;

                case 31:
                  return "tk_menor";
                  break;

                case 32:
                  return "tk_mayor";
                  break;

                case 33:
                  return "tk_distinto";
                  break;

                case 34:
                  return "tk_igual";
                  break;

                case 35:
                  return "tk_llaveA";
                  break;

                case 36:
                  return "tk_llaveC";
                  break;

                case 37:
                  return "tk_arroba";
                  break;

                case 38:
                  return "tk_parA";
                  break;

                case 39:
                  return "tk_parC";
                  break;

                case 40:
                  return "tk_stringTexto";
                  break;

                case 41:
                  return "tk_stringTexto";
                  break;

                case 42:
                  return "tk_stringTexto";
                  break;

                case 43:
                  return "tk_stringTexto";
                  break;

                case 44:
                  return "tk_identificador";
                  break;

                case 45:
                  return "EOF";
                  break;

                case 46:
                  break;

                case 47:
                  break;
              }
            },
            rules: [/^(?:[0-9]+(\.[0-9]+)\b)/, /^(?:[0-9]+\b)/, /^(?:node\b)/, /^(?:child\b)/, /^(?:descendant\b)/, /^(?:descendant-or-self\b)/, /^(?:ancestor\b)/, /^(?:ancestor-or-self\b)/, /^(?:attribute\b)/, /^(?:following\b)/, /^(?:following-sibling\b)/, /^(?:parent\b)/, /^(?:preceding\b)/, /^(?:preceding-sibling\b)/, /^(?:self\b)/, /^(?:text\b)/, /^(?:position\b)/, /^(?:last\b)/, /^(?:div\b)/, /^(?:and\b)/, /^(?:or\b)/, /^(?:mod\b)/, /^(?:\|)/, /^(?:\.)/, /^(?:\/)/, /^(?:\*)/, /^(?::)/, /^(?:\+)/, /^(?:-)/, /^(?:<=)/, /^(?:>=)/, /^(?:<)/, /^(?:>)/, /^(?:!=)/, /^(?:=)/, /^(?:\[)/, /^(?:\])/, /^(?:@)/, /^(?:\()/, /^(?:\))/, /^(?:"[^\"]*")/, /^(?:“[^\“]*“)/, /^(?:'[^\']*')/, /^(?:‘[^\‘]*‘)/, /^(?:[a-zA-Z]([a-zA-Z0-9_])*)/, /^(?:$)/, /^(?:[ \t\r\n\f])/, /^(?:.)/],
            conditions: {
              "INITIAL": {
                "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
                "inclusive": true
              }
            }
          };
          return lexer;
        }();

        parser.lexer = lexer;

        function Parser() {
          this.yy = {};
        }

        Parser.prototype = parser;
        parser.Parser = Parser;
        return new Parser();
      }();

      if (true) {
        exports.parser = xpathAsc;
        exports.Parser = xpathAsc.Parser;

        exports.parse = function () {
          return xpathAsc.parse.apply(xpathAsc, arguments);
        };

        exports.main = function commonjsMain(args) {
          if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
          }

          var source = __webpack_require__(
          /*! fs */
          3).readFileSync(__webpack_require__(
          /*! path */
          4).normalize(args[1]), "utf8");

          return exports.parser.parse(source);
        };

        if (true && __webpack_require__.c[__webpack_require__.s] === module) {
          exports.main(process.argv.slice(1));
        }
      }
      /* WEBPACK VAR INJECTION */

    }).call(this, __webpack_require__(
    /*! ./../../node_modules/webpack/buildin/module.js */
    "./node_modules/webpack/buildin/module.js")(module));
    /***/
  },

  /***/
  "./src/analizadores/xpathDesc.js":
  /*!***************************************!*\
    !*** ./src/analizadores/xpathDesc.js ***!
    \***************************************/

  /*! no static exports found */

  /***/
  function srcAnalizadoresXpathDescJs(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */
    (function (module) {
      /* parser generated by jison 0.4.18 */

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
      var xpathDesc = function () {
        var o = function o(k, v, _o4, l) {
          for (_o4 = _o4 || {}, l = k.length; l--; _o4[k[l]] = v) {
            ;
          }

          return _o4;
        },
            $V0 = [1, 4],
            $V1 = [1, 5],
            $V2 = [1, 6],
            $V3 = [1, 7],
            $V4 = [1, 8],
            $V5 = [2, 4],
            $V6 = [1, 11],
            $V7 = [1, 13],
            $V8 = [5, 8, 15],
            $V9 = [2, 40],
            $Va = [1, 15],
            $Vb = [1, 18],
            $Vc = [1, 20],
            $Vd = [1, 21],
            $Ve = [1, 22],
            $Vf = [1, 23],
            $Vg = [1, 25],
            $Vh = [1, 26],
            $Vi = [1, 27],
            $Vj = [1, 28],
            $Vk = [1, 29],
            $Vl = [1, 30],
            $Vm = [1, 31],
            $Vn = [1, 32],
            $Vo = [1, 33],
            $Vp = [1, 34],
            $Vq = [1, 35],
            $Vr = [1, 36],
            $Vs = [9, 13, 17, 18, 21, 24, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
            $Vt = [5, 8],
            $Vu = [2, 14],
            $Vv = [2, 51],
            $Vw = [1, 50],
            $Vx = [1, 54],
            $Vy = [1, 49],
            $Vz = [1, 47],
            $VA = [1, 48],
            $VB = [1, 51],
            $VC = [1, 52],
            $VD = [1, 53],
            $VE = [1, 63],
            $VF = [1, 62],
            $VG = [1, 64],
            $VH = [1, 85],
            $VI = [1, 83],
            $VJ = [1, 84],
            $VK = [1, 86],
            $VL = [1, 87],
            $VM = [1, 88],
            $VN = [1, 89],
            $VO = [1, 90],
            $VP = [1, 91],
            $VQ = [1, 92],
            $VR = [1, 93],
            $VS = [1, 94],
            $VT = [1, 95],
            $VU = [17, 20, 41, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
            $VV = [5, 8, 15, 17, 20, 41, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
            $VW = [1, 138],
            $VX = [1, 136],
            $VY = [1, 137],
            $VZ = [1, 139],
            $V_ = [17, 20, 41, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
            $V$ = [20, 41, 52, 53, 54, 55, 56, 57, 58, 59, 60],
            $V01 = [20, 41, 52, 57, 58, 59, 60];

        var parser = {
          trace: function trace() {},
          yy: {},
          symbols_: {
            "error": 2,
            "INICIOPURO": 3,
            "INICIO": 4,
            "EOF": 5,
            "INICIALES": 6,
            "INICIOP": 7,
            "tk_barra": 8,
            "tk_punto": 9,
            "DIAGONALES": 10,
            "DERIVADOSLIMITADO": 11,
            "DERIVACIONDIAGONAL": 12,
            "tk_identificador": 13,
            "PREDICATE": 14,
            "tk_diagonal": 15,
            "DERIVADOS": 16,
            "tk_asterisco": 17,
            "tk_node": 18,
            "tk_parA": 19,
            "tk_parC": 20,
            "tk_arroba": 21,
            "ATRIBUTO": 22,
            "AXES": 23,
            "tk_child": 24,
            "tk_dosPuntos": 25,
            "NODETEST": 26,
            "tk_descendant": 27,
            "tk_descendatOr": 28,
            "tk_ancestor": 29,
            "tk_ancestorOr": 30,
            "tk_attribute": 31,
            "tk_following": 32,
            "tk_followingSi": 33,
            "tk_parent": 34,
            "tk_preceding": 35,
            "tk_precedingSi": 36,
            "tk_self": 37,
            "tk_text": 38,
            "tk_llaveA": 39,
            "EXPRESION": 40,
            "tk_llaveC": 41,
            "OPERAR": 42,
            "PRIMITIVO": 43,
            "tk_entero": 44,
            "tk_decimal": 45,
            "tk_position": 46,
            "tk_last": 47,
            "tk_stringTexto": 48,
            "tk_mas": 49,
            "tk_menos": 50,
            "tk_div": 51,
            "tk_mod": 52,
            "tk_menor": 53,
            "tk_mayor": 54,
            "tk_menorIgual": 55,
            "tk_mayorIgual": 56,
            "tk_igual": 57,
            "tk_distinto": 58,
            "tk_or": 59,
            "tk_and": 60,
            "tk_ParC": 61,
            "$accept": 0,
            "$end": 1
          },
          terminals_: {
            2: "error",
            5: "EOF",
            8: "tk_barra",
            9: "tk_punto",
            13: "tk_identificador",
            15: "tk_diagonal",
            17: "tk_asterisco",
            18: "tk_node",
            19: "tk_parA",
            20: "tk_parC",
            21: "tk_arroba",
            24: "tk_child",
            25: "tk_dosPuntos",
            27: "tk_descendant",
            28: "tk_descendatOr",
            29: "tk_ancestor",
            30: "tk_ancestorOr",
            31: "tk_attribute",
            32: "tk_following",
            33: "tk_followingSi",
            34: "tk_parent",
            35: "tk_preceding",
            36: "tk_precedingSi",
            37: "tk_self",
            38: "tk_text",
            39: "tk_llaveA",
            41: "tk_llaveC",
            44: "tk_entero",
            45: "tk_decimal",
            46: "tk_position",
            47: "tk_last",
            48: "tk_stringTexto",
            49: "tk_mas",
            50: "tk_menos",
            51: "tk_div",
            52: "tk_mod",
            53: "tk_menor",
            54: "tk_mayor",
            55: "tk_menorIgual",
            56: "tk_mayorIgual",
            57: "tk_igual",
            58: "tk_distinto",
            59: "tk_or",
            60: "tk_and",
            61: "tk_ParC"
          },
          productions_: [0, [3, 2], [4, 2], [7, 3], [7, 0], [6, 4], [6, 3], [6, 3], [6, 4], [6, 3], [6, 5], [10, 1], [10, 2], [12, 3], [12, 0], [11, 2], [11, 2], [11, 4], [11, 2], [11, 1], [16, 1], [16, 2], [16, 1], [23, 4], [23, 4], [23, 4], [23, 4], [23, 4], [23, 4], [23, 4], [23, 4], [23, 4], [23, 4], [23, 4], [23, 4], [26, 2], [26, 4], [26, 2], [26, 3], [14, 3], [14, 0], [40, 1], [40, 1], [43, 1], [43, 1], [43, 2], [43, 1], [43, 3], [43, 3], [43, 1], [43, 3], [43, 0], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [22, 1], [22, 1], [22, 3]],
          performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate
          /* action[1] */
          , $$
          /* vstack */
          , _$
          /* lstack */
          ) {
            var _this$$, _this$$2;

            /* this == yyval */
            var $0 = $$.length - 1;

            switch (yystate) {
              case 1:
                produccion.push('<INICIOPURO> ::= <INICIO> EOF');
                accion.push('INICIOPURO.Val = INICIO.val //fin del documento');
                return new SalidaGramatica($$[$0 - 1], produccion, accion);
                break;

              case 2:
                produccion.push('<INICIO> ::= <INICIALES>');
                accion.push('INICIO.Val = INICIALES.Val');
                this.$ = [$$[$0 - 1]];

                (_this$$ = this.$).push.apply(_this$$, _toConsumableArray($$[$0]));

                break;

              case 3:
                produccion.push('<INICIOP> ::= | <INICIALES> <INICIOP>');
                accion.push('INICIOP.val.push(INICIALES)');
                this.$ = [$$[$0 - 1]];

                (_this$$2 = this.$).push.apply(_this$$2, _toConsumableArray($$[$0]));

                break;

              case 4:
                produccion.push('<INICIOP> ::= epsilon');
                accion.push('INICIOP.val = []');
                this.$ = [];
                break;

              case 5:
                produccion.push("<INICIALES> ::= punto <DIAGONALES> <DERIVADOSLIMITADO> <DERIVAIONDIAGONAL>");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)');
                this.$ = new Nodo("", ".", null, [new Nodo($$[$0 - 2], $$[$0 - 1].val, $$[$0 - 1].pre, _toConsumableArray($$[$0]), _$[$0 - 3].first_line, _$[$0 - 3].first_column)], _$[$0 - 3].first_line, _$[$0 - 3].first_column);
                break;

              case 6:
                produccion.push("<INICIALES> ::= identificador <PREDICATE> <DERIVACIONDIAGONAL>");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)');
                this.$ = new Nodo("", $$[$0 - 2], $$[$0 - 1], _toConsumableArray($$[$0]), _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 7:
                produccion.push("<INICIALES> ::= / <DERIVADOS> <DERIVACIONDIAGONAL>");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)');
                this.$ = new Nodo($$[$0 - 2], $$[$0 - 1].val, $$[$0 - 1].pre, _toConsumableArray($$[$0]), _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 8:
                produccion.push('<INICIALES> ::= // <DERIVADOS> <DERIVACIONDIAGONAL>');
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)');
                this.$ = new Nodo("//", $$[$0 - 1].val, $$[$0 - 1].pre, _toConsumableArray($$[$0]), _$[$0 - 3].first_line, _$[$0 - 3].first_column);
                break;

              case 9:
                produccion.push("<INICIALES> ::= asterisco <PREDICATE> <DERIVACIONDIAGONAL>");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)');
                this.$ = new Nodo("", $$[$0 - 2], $$[$0 - 1], _toConsumableArray($$[$0]), _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 10:
                produccion.push("<INICIALES> ::= node() <PREDICATE> <DERIVACIONDIAGONAL>");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)');
                this.$ = new Nodo("", "node()", $$[$0 - 1], _toConsumableArray($$[$0 - 2]), _$[$0 - 4].first_line, _$[$0 - 4].first_column);
                break;

              case 11:
                produccion.push('<DIAGONALES> ::= /');
                accion.push('DIAGONALES.Val = \"/\"');
                this.$ = $$[$0];
                break;

              case 12:
                produccion.push("<DIAGONALES> ::= //");
                accion.push('DIAGONALES.Val = \"//\"');
                this.$ = "//";
                break;

              case 13:
                produccion.push("<DERIVACIONDIAGONAL> ::= <DIAGONALES> <DERIVADOS> <DERIVACIONDIAGONAL>");
                accion.push('DERIVACIONDIAGONAL.Val = []; DERIVACIONDIAGONAL.Val.push(new Nodo(tipo, id, predicado, fila, columna)); DERIVACIONDIAGONAL.push(DERIVACIONDIAGONAL)');
                this.$ = new Array();
                this.$.push(new Nodo($$[$0 - 2], $$[$0 - 1].val, $$[$0 - 1].pre, _toConsumableArray($$[$0]), _$[$0 - 2].first_line, _$[$0 - 2].first_column));
                break;

              case 14:
                produccion.push("<DERIVACIONDIAGONAL> ::= epsilon");
                accion.push('DERIVACIONDIAGONAL.Val = [/*Vacio*/]');
                this.$ = [];
                break;

              case 15:
                produccion.push("<DERIVADOSLIMIADO> ::= identificador <PREDICATE>");
                accion.push('DERIVADOSLIMITADO.Val = identificador + PREDICATE.Val');
                this.$ = {
                  val: $$[$0 - 1],
                  pre: $$[$0]
                };
                break;

              case 16:
                produccion.push("<DERIVADOSLIMIADO> ::= asterisco <PREDICATE>");
                accion.push('DERIVADOSLIMITADO.Val = \"*\" + PREDICATE.Val');
                this.$ = {
                  val: $$[$0 - 1],
                  pre: $$[$0]
                };
                break;

              case 17:
                produccion.push("<DERIVADOSLIMIADO> ::= node() <PREDICATE>");
                accion.push('DERIVADOSLIMITADO.Val = \"@\" + ATRIBUTO.Val');
                this.$ = {
                  val: "node()",
                  pre: $$[$0]
                };
                break;

              case 18:
                produccion.push("<DERIVADOSLIMIADO> ::= arroba <ATRIBUTO>");
                accion.push('DERIVADOSLIMITADO.Val = \"@\" + ATRIBUTO.Val');
                this.$ = {
                  val: $$[$0 - 1] + "" + $$[$0],
                  pre: null
                };
                break;

              case 19:
                produccion.push("<DERIVADOSLIMITADO> ::= <AXES>");
                accion.push('DERIVADOSLIMITADO.Val = AXES.Val');
                this.$ = {
                  val: $$[$0],
                  pre: null
                };
                break;

              case 20:
                produccion.push("<DERIVADOS> ::= punto");
                accion.push("DERIVADOS.Val = \".\" ");
                this.$ = {
                  val: $$[$0],
                  pre: null
                };
                break;

              case 21:
                produccion.push("<DERIVADOS> ::= doblePunto");
                accion.push('DERIVADOS.Val = \"..\"');
                this.$ = {
                  val: "..",
                  pre: null
                };
                break;

              case 22:
                produccion.push("<DERIVADOS> ::= <DERIVADOSLIMITADO>");
                accion.push('DERIVADOS.Val = DERIVADOSLIMITADO.Val');
                this.$ = $$[$0];
                break;

              case 39:
                produccion.push("<PREDICATE> ::= llaveA <EXPRESION> llaveC");
                accion.push('PREDICATE.Val = EXPRESION.Val');
                this.$ = new Predicate($$[$0 - 1], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 40:
                produccion.push("<PREDICATE> ::= epsilon");
                accion.push('PREDICATE.Val = /*vacio*/');
                this.$ = null;
                break;

              case 41:
                produccion.push("<OPERAR> ::= <EXPRESION>");
                accion.push("OPERAR.Val = EXPRESION.Val");
                this.$ = $$[$0];
                break;

              case 42:
                produccion.push("<OPERAR> ::= <PRIMITIVO>");
                accion.push("OPERAR.Val = PRIMITIVO.Val");
                this.$ = $$[$0];
                break;

              case 43:
                produccion.push("<PRIMITIVO> ::= entero");
                accion.push('PRIMITIVO.Val = \"entero\"');
                this.$ = new Primitivo["default"](Number(yytext), _$[$0].first_line, _$[$0].first_column);
                break;

              case 44:
                produccion.push("<PRIMITIVO> ::= decimal");
                accion.push('PRIMITIVO.Val = \"decimal\"');
                this.$ = new Primitivo["default"](Number(yytext), _$[$0].first_line, _$[$0].first_column);
                break;

              case 45:
                produccion.push("<PRIMITIVO> ::= arroba <ATRIBUTO>");
                accion.push('PRIMITIVO.Val = \"@\" + ATRIBUTO.Val');
                this.$ = new Primitivo["default"]("this._".concat($$[$0]), _$[$0 - 1].first_line, _$[$0 - 1].first_column);
                break;

              case 46:
                produccion.push("<PRIMITIVO> ::= identificador");
                accion.push('PPRIMITIVO.Val = \"identificador\"');
                this.$ = new Primitivo["default"]($$[$0], _$[$0].first_line, _$[$0].first_column);
                break;

              case 47:
                produccion.push("<PRIMITIVO> ::= position()");
                accion.push('PRIMITIVO.Val = \"position()\"');
                this.$ = new Primitivo["default"]("position()", _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 48:
                produccion.push("<EXPRESION> ::= last()");
                accion.push('EXPRESION.Val = \"last()\"');
                this.$ = new Primitivo["default"]("last()", _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 49:
                produccion.push("<PRIMITIVO> ::= texto");
                accion.push('PRIMITIVO.Val = \"texto\"');
                this.$ = new Primitivo["default"]($$[$0], _$[$0].first_line, _$[$0].first_column);
                break;

              case 50:
                produccion.push("<EXPRESION> ::= ( <EXPRESION> )");
                accion.push('EXPRESION.Val = EXPRESION1.Val');
                this.$ = new Primitivo["default"]($$[$0 - 2], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 52:
                produccion.push("<OPERAR> ::= <EXPRESION> mas <EXPRESION>");
                accion.push('OPERAR.Val = EXPRESION.Val + EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '+', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 53:
                produccion.push("<OPERAR> ::= <EXPRESION> menos <EXPRESION>");
                accion.push('OPERAR.Val = EXPRESION.Val - EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '-', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 54:
                produccion.push("<OPERAR> ::= <EXPRESION> asterisco <EXPRESION>");
                accion.push('OPERAR.Val = EXPRESION.Val * EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '*', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 55:
                produccion.push("<OPERAR> ::= <EXPRESION> div <EXPRESION>");
                accion.push('OPERAR.Val = EXPRESION.Val / EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '/', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 56:
                produccion.push("<OPERAR> ::= <EXPRESION> mod <EXPRESION>");
                accion.push('OPERAR.Val = EXPRESION.Val % EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '%', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 57:
                produccion.push("<OPERAR> ::= <EXPRESION> menor <EXPRESION>");
                accion.push('OPERAR.Val = EXPRESION.Val + \"<\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '<', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 58:
                produccion.push("<OPERAR> ::= <EXPRESION> mayor <EXPRESION>");
                accion.push('OPERAR.Val = EXPRESION.Val + \">\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '>', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 59:
                produccion.push("<OPERAR> ::= <EXPRESION> menorIgual <EXPRESION>");
                accion.push('OPERAR.Val = EXPRESION.Val + \"<=\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '<=', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 60:
                produccion.push("<OPERAR> ::= <EXPRESION> mayorIgual <EXPRESION>");
                accion.push('OPERAR.Val = EXPRESION.Val + \">=\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '>=', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 61:
                produccion.push("<OPERAR> ::= <EXPRESION> igual <EXPRESION>");
                accion.push('OPERA.Val = EXPRESION.Val + \"=\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '=', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 62:
                produccion.push("<OPERAR> ::= <EXPRESION> distinto <EXPRESION>");
                accion.push('OPERAR.Val = EXPRESION.Val + "" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '!=', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 63:
                produccion.push("<OPERAR> ::= <EXPRESION> or <EXPRESION>");
                accion.push('OPERAR.Val = EXPRESION.Val + \"or\" + EXPRESION.Val');
                this.$ = new Logica["default"]($$[$0 - 2], 'or', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 64:
                produccion.push("<OPERAR> ::= <EXPRESION> and <EXPRESION>");
                accion.push('OPERAR.Val = EXPRESION.Val + \"and\" + EXPRESION.Val');
                this.$ = new Logica["default"]($$[$0 - 2], 'and', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 65:
                produccion.push("<ATRIBUTO> ::= asterisco");
                accion.push('ATRIBUTO.Val = \"*\"');
                this.$ = $$[$0];
                break;

              case 66:
                produccion.push("<ATRIBUTO> ::= identificador");
                accion.push('ATRIBUTO.Val = identificador');
                this.$ = $$[$0];
                break;

              case 67:
                produccion.push("<ATRIBUTO> ::= node");
                accion.push('ATRIBUTO.Val = \"node()\"');
                this.$ = "node()";
                break;
            }
          },
          table: [{
            3: 1,
            4: 2,
            6: 3,
            9: $V0,
            13: $V1,
            15: $V2,
            17: $V3,
            18: $V4
          }, {
            1: [3]
          }, {
            5: [1, 9]
          }, {
            5: $V5,
            7: 10,
            8: $V6
          }, {
            10: 12,
            15: $V7
          }, o($V8, $V9, {
            14: 14,
            39: $Va
          }), {
            9: $Vb,
            11: 19,
            13: $Vc,
            15: [1, 17],
            16: 16,
            17: $Vd,
            18: $Ve,
            21: $Vf,
            23: 24,
            24: $Vg,
            27: $Vh,
            28: $Vi,
            29: $Vj,
            30: $Vk,
            31: $Vl,
            32: $Vm,
            33: $Vn,
            34: $Vo,
            35: $Vp,
            36: $Vq,
            37: $Vr
          }, o($V8, $V9, {
            14: 37,
            39: $Va
          }), {
            19: [1, 38]
          }, {
            1: [2, 1]
          }, {
            5: [2, 2]
          }, {
            6: 39,
            9: $V0,
            13: $V1,
            15: $V2,
            17: $V3,
            18: $V4
          }, {
            11: 40,
            13: $Vc,
            17: $Vd,
            18: $Ve,
            21: $Vf,
            23: 24,
            24: $Vg,
            27: $Vh,
            28: $Vi,
            29: $Vj,
            30: $Vk,
            31: $Vl,
            32: $Vm,
            33: $Vn,
            34: $Vo,
            35: $Vp,
            36: $Vq,
            37: $Vr
          }, o($Vs, [2, 11], {
            15: [1, 41]
          }), o($Vt, $Vu, {
            12: 42,
            10: 43,
            15: $V7
          }), o([17, 41, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60], $Vv, {
            40: 44,
            42: 45,
            43: 46,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($Vt, $Vu, {
            10: 43,
            12: 55,
            15: $V7
          }), {
            9: $Vb,
            11: 19,
            13: $Vc,
            16: 56,
            17: $Vd,
            18: $Ve,
            21: $Vf,
            23: 24,
            24: $Vg,
            27: $Vh,
            28: $Vi,
            29: $Vj,
            30: $Vk,
            31: $Vl,
            32: $Vm,
            33: $Vn,
            34: $Vo,
            35: $Vp,
            36: $Vq,
            37: $Vr
          }, o($V8, [2, 20], {
            9: [1, 57]
          }), o($V8, [2, 22]), o($V8, $V9, {
            14: 58,
            39: $Va
          }), o($V8, $V9, {
            14: 59,
            39: $Va
          }), {
            19: [1, 60]
          }, {
            13: $VE,
            17: $VF,
            18: $VG,
            22: 61
          }, o($V8, [2, 19]), {
            25: [1, 65]
          }, {
            25: [1, 66]
          }, {
            25: [1, 67]
          }, {
            25: [1, 68]
          }, {
            25: [1, 69]
          }, {
            25: [1, 70]
          }, {
            25: [1, 71]
          }, {
            25: [1, 72]
          }, {
            25: [1, 73]
          }, {
            25: [1, 74]
          }, {
            25: [1, 75]
          }, {
            25: [1, 76]
          }, o($Vt, $Vu, {
            10: 43,
            12: 77,
            15: $V7
          }), {
            20: [1, 78]
          }, {
            5: $V5,
            7: 79,
            8: $V6
          }, o($Vt, $Vu, {
            10: 43,
            12: 80,
            15: $V7
          }), o($Vs, [2, 12]), o($Vt, [2, 6]), {
            9: $Vb,
            11: 19,
            13: $Vc,
            16: 81,
            17: $Vd,
            18: $Ve,
            21: $Vf,
            23: 24,
            24: $Vg,
            27: $Vh,
            28: $Vi,
            29: $Vj,
            30: $Vk,
            31: $Vl,
            32: $Vm,
            33: $Vn,
            34: $Vo,
            35: $Vp,
            36: $Vq,
            37: $Vr
          }, {
            17: $VH,
            41: [1, 82],
            49: $VI,
            50: $VJ,
            51: $VK,
            52: $VL,
            53: $VM,
            54: $VN,
            55: $VO,
            56: $VP,
            57: $VQ,
            58: $VR,
            59: $VS,
            60: $VT
          }, o($VU, [2, 41]), o($VU, [2, 42]), o($VU, [2, 43]), o($VU, [2, 44]), {
            13: $VE,
            17: $VF,
            18: $VG,
            22: 96
          }, o($VU, [2, 46]), {
            19: [1, 97]
          }, {
            19: [1, 98]
          }, o($VU, [2, 49]), o([17, 20, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60], $Vv, {
            42: 45,
            43: 46,
            40: 99,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($Vt, [2, 7]), o($Vt, $Vu, {
            10: 43,
            12: 100,
            15: $V7
          }), o($V8, [2, 21]), o($V8, [2, 15]), o($V8, [2, 16]), {
            20: [1, 101]
          }, o($V8, [2, 18]), o($VV, [2, 65]), o($VV, [2, 66]), {
            19: [1, 102]
          }, {
            25: [1, 103]
          }, {
            25: [1, 104]
          }, {
            25: [1, 105]
          }, {
            25: [1, 106]
          }, {
            25: [1, 107]
          }, {
            25: [1, 108]
          }, {
            25: [1, 109]
          }, {
            25: [1, 110]
          }, {
            25: [1, 111]
          }, {
            25: [1, 112]
          }, {
            25: [1, 113]
          }, {
            25: [1, 114]
          }, o($Vt, [2, 9]), o($V8, $V9, {
            14: 115,
            39: $Va
          }), {
            5: [2, 3]
          }, o($Vt, [2, 5]), o($Vt, $Vu, {
            10: 43,
            12: 116,
            15: $V7
          }), o($V8, [2, 39]), o($VU, $Vv, {
            42: 45,
            43: 46,
            40: 117,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($VU, $Vv, {
            42: 45,
            43: 46,
            40: 118,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($VU, $Vv, {
            42: 45,
            43: 46,
            40: 119,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($VU, $Vv, {
            42: 45,
            43: 46,
            40: 120,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($VU, $Vv, {
            42: 45,
            43: 46,
            40: 121,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($VU, $Vv, {
            42: 45,
            43: 46,
            40: 122,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($VU, $Vv, {
            42: 45,
            43: 46,
            40: 123,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($VU, $Vv, {
            42: 45,
            43: 46,
            40: 124,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($VU, $Vv, {
            42: 45,
            43: 46,
            40: 125,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($VU, $Vv, {
            42: 45,
            43: 46,
            40: 126,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($VU, $Vv, {
            42: 45,
            43: 46,
            40: 127,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($VU, $Vv, {
            42: 45,
            43: 46,
            40: 128,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($VU, $Vv, {
            42: 45,
            43: 46,
            40: 129,
            13: $Vw,
            19: $Vx,
            21: $Vy,
            44: $Vz,
            45: $VA,
            46: $VB,
            47: $VC,
            48: $VD
          }), o($VU, [2, 45]), {
            20: [1, 130]
          }, {
            20: [1, 131]
          }, {
            17: $VH,
            20: [1, 132],
            49: $VI,
            50: $VJ,
            51: $VK,
            52: $VL,
            53: $VM,
            54: $VN,
            55: $VO,
            56: $VP,
            57: $VQ,
            58: $VR,
            59: $VS,
            60: $VT
          }, o($Vt, [2, 8]), o($V8, $V9, {
            14: 133,
            39: $Va
          }), {
            61: [1, 134]
          }, {
            13: $VW,
            17: $VX,
            18: $VY,
            26: 135,
            38: $VZ
          }, {
            13: $VW,
            17: $VX,
            18: $VY,
            26: 140,
            38: $VZ
          }, {
            13: $VW,
            17: $VX,
            18: $VY,
            26: 141,
            38: $VZ
          }, {
            13: $VW,
            17: $VX,
            18: $VY,
            26: 142,
            38: $VZ
          }, {
            13: $VW,
            17: $VX,
            18: $VY,
            26: 143,
            38: $VZ
          }, {
            13: $VW,
            17: $VX,
            18: $VY,
            26: 144,
            38: $VZ
          }, {
            13: $VW,
            17: $VX,
            18: $VY,
            26: 145,
            38: $VZ
          }, {
            13: $VW,
            17: $VX,
            18: $VY,
            26: 146,
            38: $VZ
          }, {
            13: $VW,
            17: $VX,
            18: $VY,
            26: 147,
            38: $VZ
          }, {
            13: $VW,
            17: $VX,
            18: $VY,
            26: 148,
            38: $VZ
          }, {
            13: $VW,
            17: $VX,
            18: $VY,
            26: 149,
            38: $VZ
          }, {
            13: $VW,
            17: $VX,
            18: $VY,
            26: 150,
            38: $VZ
          }, o($Vt, $Vu, {
            10: 43,
            12: 151,
            15: $V7
          }), o($Vt, [2, 13]), o($VU, [2, 52]), o($VU, [2, 53]), o($V_, [2, 54], {
            49: $VI,
            50: $VJ
          }), o($V_, [2, 55], {
            49: $VI,
            50: $VJ
          }), o([20, 41, 52], [2, 56], {
            17: $VH,
            49: $VI,
            50: $VJ,
            51: $VK,
            53: $VM,
            54: $VN,
            55: $VO,
            56: $VP,
            57: $VQ,
            58: $VR,
            59: $VS,
            60: $VT
          }), o($V$, [2, 57], {
            17: $VH,
            49: $VI,
            50: $VJ,
            51: $VK
          }), o($V$, [2, 58], {
            17: $VH,
            49: $VI,
            50: $VJ,
            51: $VK
          }), o($V$, [2, 59], {
            17: $VH,
            49: $VI,
            50: $VJ,
            51: $VK
          }), o($V$, [2, 60], {
            17: $VH,
            49: $VI,
            50: $VJ,
            51: $VK
          }), o($V01, [2, 61], {
            17: $VH,
            49: $VI,
            50: $VJ,
            51: $VK,
            53: $VM,
            54: $VN,
            55: $VO,
            56: $VP
          }), o($V01, [2, 62], {
            17: $VH,
            49: $VI,
            50: $VJ,
            51: $VK,
            53: $VM,
            54: $VN,
            55: $VO,
            56: $VP
          }), o([20, 41, 52, 59], [2, 63], {
            17: $VH,
            49: $VI,
            50: $VJ,
            51: $VK,
            53: $VM,
            54: $VN,
            55: $VO,
            56: $VP,
            57: $VQ,
            58: $VR,
            60: $VT
          }), o([20, 41, 52, 59, 60], [2, 64], {
            17: $VH,
            49: $VI,
            50: $VJ,
            51: $VK,
            53: $VM,
            54: $VN,
            55: $VO,
            56: $VP,
            57: $VQ,
            58: $VR
          }), o($VU, [2, 47]), o($VU, [2, 48]), o($VU, [2, 50]), o($V8, [2, 17]), o($VV, [2, 67]), o($V8, [2, 23]), o($V8, $V9, {
            14: 152,
            39: $Va
          }), {
            19: [1, 153]
          }, o($V8, $V9, {
            14: 154,
            39: $Va
          }), {
            19: [1, 155]
          }, o($V8, [2, 24]), o($V8, [2, 25]), o($V8, [2, 26]), o($V8, [2, 27]), o($V8, [2, 28]), o($V8, [2, 29]), o($V8, [2, 30]), o($V8, [2, 31]), o($V8, [2, 32]), o($V8, [2, 33]), o($V8, [2, 34]), o($Vt, [2, 10]), o($V8, [2, 35]), {
            20: [1, 156]
          }, o($V8, [2, 37]), {
            20: [1, 157]
          }, o($V8, $V9, {
            14: 158,
            39: $Va
          }), o($V8, [2, 38]), o($V8, [2, 36])],
          defaultActions: {
            9: [2, 1],
            10: [2, 2],
            79: [2, 3]
          },
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
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = {
              yy: {}
            };

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
            } else {
              this.parseError = Object.getPrototypeOf(this).parseError;
            }

            function popStack(n) {
              stack.length = stack.length - 2 * n;
              vstack.length = vstack.length - n;
              lstack.length = lstack.length - n;
            }

            _token_stack: var lex = function lex() {
              var token;
              token = lexer.lex() || EOF;

              if (typeof token !== 'number') {
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
                } else {
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
                    last_column: lstack[lstack.length - 1].last_column
                  };

                  if (ranges) {
                    yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                  }

                  r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

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
          }
        };

        var _webpack_require__11 = __webpack_require__(
        /*! ./AST/SalidaGramatica */
        "./src/analizadores/AST/SalidaGramatica.ts"),
            SalidaGramatica = _webpack_require__11.SalidaGramatica;

        var _webpack_require__12 = __webpack_require__(
        /*! ./Expresiones/Nodo */
        "./src/analizadores/Expresiones/Nodo.ts"),
            Nodo = _webpack_require__12.Nodo;

        var Primitivo = __webpack_require__(
        /*! ./Expresiones/Primitivo */
        "./src/analizadores/Expresiones/Primitivo.ts");

        var Aritmetica = __webpack_require__(
        /*! ./Operaciones/Aritmeticas */
        "./src/analizadores/Operaciones/Aritmeticas.ts");

        var Relacional = __webpack_require__(
        /*! ./Operaciones/Relacional */
        "./src/analizadores/Operaciones/Relacional.ts");

        var Logica = __webpack_require__(
        /*! ./Operaciones/Logica */
        "./src/analizadores/Operaciones/Logica.ts");

        var _webpack_require__13 = __webpack_require__(
        /*! ./Expresiones/Predicate */
        "./src/analizadores/Expresiones/Predicate.ts"),
            Predicate = _webpack_require__13.Predicate; //const { Atributo } = require('./Expresiones/Atributo');


        var produccion = [];
        var accion = [];
        /* generated by jison-lex 0.3.4 */

        var lexer = function () {
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
            setInput: function setInput(input, yy) {
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
            input: function input() {
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
            unput: function unput(ch) {
              var len = ch.length;
              var lines = ch.split(/(?:\r\n?|\n)/g);
              this._input = ch + this._input;
              this.yytext = this.yytext.substr(0, this.yytext.length - len); //this.yyleng -= len;

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
                last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
              };

              if (this.options.ranges) {
                this.yylloc.range = [r[0], r[0] + this.yyleng - len];
              }

              this.yyleng = this.yytext.length;
              return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function more() {
              this._more = true;
              return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function reject() {
              if (this.options.backtrack_lexer) {
                this._backtrack = true;
              } else {
                return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                  text: "",
                  token: null,
                  line: this.yylineno
                });
              }

              return this;
            },
            // retain first n characters of the match
            less: function less(n) {
              this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function pastInput() {
              var past = this.matched.substr(0, this.matched.length - this.match.length);
              return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function upcomingInput() {
              var next = this.match;

              if (next.length < 20) {
                next += this._input.substr(0, 20 - next.length);
              }

              return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function showPosition() {
              var pre = this.pastInput();
              var c = new Array(pre.length + 1).join("-");
              return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function test_match(match, indexed_rule) {
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
                last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
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
            next: function next() {
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
                } // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)


                return false;
              }

              if (this._input === "") {
                return this.EOF;
              } else {
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
              if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
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
            options: {},
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
              var YYSTATE = YY_START;

              switch ($avoiding_name_collisions) {
                case 0:
                  return "tk_decimal";
                  break;

                case 1:
                  return "tk_entero";
                  break;

                case 2:
                  return "tk_node";
                  break;

                case 3:
                  return "tk_child";
                  break;

                case 4:
                  return "tk_descendant";
                  break;

                case 5:
                  return "tk_descendatOr";
                  break;

                case 6:
                  return "tk_ancestor";
                  break;

                case 7:
                  return "tk_ancestorOr";
                  break;

                case 8:
                  return "tk_attribute";
                  break;

                case 9:
                  return "tk_following";
                  break;

                case 10:
                  return "tk_followingSi";
                  break;

                case 11:
                  return "tk_parent";
                  break;

                case 12:
                  return "tk_preceding";
                  break;

                case 13:
                  return "tk_precedingSi";
                  break;

                case 14:
                  return "tk_self";
                  break;

                case 15:
                  return "tk_text";
                  break;

                case 16:
                  return "tk_position";
                  break;

                case 17:
                  return "tk_last";
                  break;

                case 18:
                  return "tk_div";
                  break;

                case 19:
                  return "tk_and";
                  break;

                case 20:
                  return "tk_or";
                  break;

                case 21:
                  return "tk_mod";
                  break;

                case 22:
                  return "tk_barra";
                  break;

                case 23:
                  return "tk_punto";
                  break;

                case 24:
                  return "tk_diagonal";
                  break;

                case 25:
                  return "tk_asterisco";
                  break;

                case 26:
                  return "tk_dosPuntos";
                  break;

                case 27:
                  return "tk_mas";
                  break;

                case 28:
                  return "tk_menos";
                  break;

                case 29:
                  return "tk_menorIgual";
                  break;

                case 30:
                  return "tk_mayorIgual";
                  break;

                case 31:
                  return "tk_menor";
                  break;

                case 32:
                  return "tk_mayor";
                  break;

                case 33:
                  return "tk_distinto";
                  break;

                case 34:
                  return "tk_igual";
                  break;

                case 35:
                  return "tk_llaveA";
                  break;

                case 36:
                  return "tk_llaveC";
                  break;

                case 37:
                  return "tk_arroba";
                  break;

                case 38:
                  return "tk_parA";
                  break;

                case 39:
                  return "tk_parC";
                  break;

                case 40:
                  return "tk_stringTexto";
                  break;

                case 41:
                  return "tk_stringTexto";
                  break;

                case 42:
                  return "tk_stringTexto";
                  break;

                case 43:
                  return "tk_stringTexto";
                  break;

                case 44:
                  return "tk_identificador";
                  break;

                case 45:
                  return "EOF";
                  break;

                case 46:
                  break;

                case 47:
                  break;
              }
            },
            rules: [/^(?:[0-9]+(\.[0-9]+)\b)/, /^(?:[0-9]+\b)/, /^(?:node\b)/, /^(?:child\b)/, /^(?:descendant\b)/, /^(?:descendant-or-self\b)/, /^(?:ancestor\b)/, /^(?:ancestor-or-self\b)/, /^(?:attribute\b)/, /^(?:following\b)/, /^(?:following-sibling\b)/, /^(?:parent\b)/, /^(?:preceding\b)/, /^(?:preceding-sibling\b)/, /^(?:self\b)/, /^(?:text\b)/, /^(?:position\b)/, /^(?:last\b)/, /^(?:div\b)/, /^(?:and\b)/, /^(?:or\b)/, /^(?:mod\b)/, /^(?:\|)/, /^(?:\.)/, /^(?:\/)/, /^(?:\*)/, /^(?::)/, /^(?:\+)/, /^(?:-)/, /^(?:<=)/, /^(?:>=)/, /^(?:<)/, /^(?:>)/, /^(?:!=)/, /^(?:=)/, /^(?:\[)/, /^(?:\])/, /^(?:@)/, /^(?:\()/, /^(?:\))/, /^(?:"[^\"]*")/, /^(?:“[^\“]*“)/, /^(?:'[^\']*')/, /^(?:‘[^\‘]*‘)/, /^(?:[a-zA-Z]([a-zA-Z0-9_])*)/, /^(?:$)/, /^(?:[ \t\r\n\f])/, /^(?:.)/],
            conditions: {
              "INITIAL": {
                "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
                "inclusive": true
              }
            }
          };
          return lexer;
        }();

        parser.lexer = lexer;

        function Parser() {
          this.yy = {};
        }

        Parser.prototype = parser;
        parser.Parser = Parser;
        return new Parser();
      }();

      if (true) {
        exports.parser = xpathDesc;
        exports.Parser = xpathDesc.Parser;

        exports.parse = function () {
          return xpathDesc.parse.apply(xpathDesc, arguments);
        };

        exports.main = function commonjsMain(args) {
          if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
          }

          var source = __webpack_require__(
          /*! fs */
          3).readFileSync(__webpack_require__(
          /*! path */
          4).normalize(args[1]), "utf8");

          return exports.parser.parse(source);
        };

        if (true && __webpack_require__.c[__webpack_require__.s] === module) {
          exports.main(process.argv.slice(1));
        }
      }
      /* WEBPACK VAR INJECTION */

    }).call(this, __webpack_require__(
    /*! ./../../node_modules/webpack/buildin/module.js */
    "./node_modules/webpack/buildin/module.js")(module));
    /***/
  },

  /***/
  "./src/app/app-routing.module.ts":
  /*!***************************************!*\
    !*** ./src/app/app-routing.module.ts ***!
    \***************************************/

  /*! exports provided: AppRoutingModule */

  /***/
  function srcAppAppRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
      return AppRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _paginas_tabla_xml_tabla_xml_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./paginas/tabla-xml/tabla-xml.component */
    "./src/app/paginas/tabla-xml/tabla-xml.component.ts");
    /* harmony import */


    var _paginas_principal_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./paginas/principal/home.component */
    "./src/app/paginas/principal/home.component.ts");
    /* harmony import */


    var _paginas_grafico_grafico_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./paginas/grafico/grafico.component */
    "./src/app/paginas/grafico/grafico.component.ts");
    /* harmony import */


    var _paginas_bnf_bnf_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./paginas/bnf/bnf.component */
    "./src/app/paginas/bnf/bnf.component.ts");

    var routes = [{
      path: '',
      pathMatch: 'prefix',
      redirectTo: 'home'
    }, {
      path: 'home',
      component: _paginas_principal_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"]
    }, {
      path: 'tablaSimbolosXML',
      component: _paginas_tabla_xml_tabla_xml_component__WEBPACK_IMPORTED_MODULE_3__["TablaXMLComponent"]
    }, {
      path: 'grafico',
      component: _paginas_grafico_grafico_component__WEBPACK_IMPORTED_MODULE_5__["GraficoComponent"]
    }, {
      path: 'bnf',
      component: _paginas_bnf_bnf_component__WEBPACK_IMPORTED_MODULE_6__["BnfComponent"]
    }];

    var AppRoutingModule = function AppRoutingModule() {
      _classCallCheck(this, AppRoutingModule);
    };

    AppRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], AppRoutingModule);
    /***/
  },

  /***/
  "./src/app/app.component.css":
  /*!***********************************!*\
    !*** ./src/app/app.component.css ***!
    \***********************************/

  /*! exports provided: default */

  /***/
  function srcAppAppComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var AppComponent = function AppComponent() {
      _classCallCheck(this, AppComponent);
    };

    AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-root',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./app.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./app.component.css */
      "./src/app/app.component.css"))["default"]]
    })], AppComponent);
    /***/
  },

  /***/
  "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/

  /*! exports provided: AppModule */

  /***/
  function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
    /* harmony import */


    var _reporte_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./reporte.service */
    "./src/app/reporte.service.ts");
    /* harmony import */


    var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./app-routing.module */
    "./src/app/app-routing.module.ts");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _paginas_principal_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./paginas/principal/home.component */
    "./src/app/paginas/principal/home.component.ts");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
    /* harmony import */


    var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/material/toolbar */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/toolbar.js");
    /* harmony import */


    var _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/material/menu */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/menu.js");
    /* harmony import */


    var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @angular/material/button */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
    /* harmony import */


    var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @angular/material/icon */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
    /* harmony import */


    var _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! @ctrl/ngx-codemirror */
    "./node_modules/@ctrl/ngx-codemirror/__ivy_ngcc__/fesm2015/ctrl-ngx-codemirror.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ngx-material-file-input */
    "./node_modules/ngx-material-file-input/__ivy_ngcc__/fesm2015/ngx-material-file-input.js");
    /* harmony import */


    var _paginas_tabla_xml_tabla_xml_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ./paginas/tabla-xml/tabla-xml.component */
    "./src/app/paginas/tabla-xml/tabla-xml.component.ts");
    /* harmony import */


    var _angular_material_table__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! @angular/material/table */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/table.js");
    /* harmony import */


    var _paginas_grafico_grafico_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! ./paginas/grafico/grafico.component */
    "./src/app/paginas/grafico/grafico.component.ts");
    /* harmony import */


    var _paginas_bnf_bnf_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! ./paginas/bnf/bnf.component */
    "./src/app/paginas/bnf/bnf.component.ts");

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"], _paginas_tabla_xml_tabla_xml_component__WEBPACK_IMPORTED_MODULE_15__["TablaXMLComponent"], _paginas_principal_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"], _paginas_grafico_grafico_component__WEBPACK_IMPORTED_MODULE_17__["GraficoComponent"], _paginas_bnf_bnf_component__WEBPACK_IMPORTED_MODULE_18__["BnfComponent"]],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__["MatMenuModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"], _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_12__["CodemirrorModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormsModule"], ngx_material_file_input__WEBPACK_IMPORTED_MODULE_14__["MaterialFileInputModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_16__["MatTableModule"]],
      providers: [_reporte_service__WEBPACK_IMPORTED_MODULE_3__["ReporteService"]],
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
    })], AppModule);
    /***/
  },

  /***/
  "./src/app/paginas/bnf/bnf.component.css":
  /*!***********************************************!*\
    !*** ./src/app/paginas/bnf/bnf.component.css ***!
    \***********************************************/

  /*! exports provided: default */

  /***/
  function srcAppPaginasBnfBnfComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "table {\n    width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnaW5hcy9ibmYvYm5mLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0FBQ2YiLCJmaWxlIjoic3JjL2FwcC9wYWdpbmFzL2JuZi9ibmYuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcbiAgICB3aWR0aDogMTAwJTtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/paginas/bnf/bnf.component.ts":
  /*!**********************************************!*\
    !*** ./src/app/paginas/bnf/bnf.component.ts ***!
    \**********************************************/

  /*! exports provided: BnfComponent */

  /***/
  function srcAppPaginasBnfBnfComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "BnfComponent", function () {
      return BnfComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var BnfComponent = /*#__PURE__*/function () {
      function BnfComponent() {
        _classCallCheck(this, BnfComponent);

        this.displayedColumns = ['no', 'produccion', 'accion'];
        this.simbolos = localStorage.getItem('bnf');
      }

      _createClass(BnfComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.simbolos = JSON.parse(this.simbolos);
          console.log(this.simbolos, "vacia?");
        }
      }]);

      return BnfComponent;
    }();

    BnfComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-bnf',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./bnf.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/bnf/bnf.component.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./bnf.component.css */
      "./src/app/paginas/bnf/bnf.component.css"))["default"]]
    })], BnfComponent);
    /***/
  },

  /***/
  "./src/app/paginas/grafico/grafico.component.css":
  /*!*******************************************************!*\
    !*** ./src/app/paginas/grafico/grafico.component.css ***!
    \*******************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPaginasGraficoGraficoComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "#vis {\n    width: 100%;\n    height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnaW5hcy9ncmFmaWNvL2dyYWZpY28uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvcGFnaW5hcy9ncmFmaWNvL2dyYWZpY28uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiN2aXMge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/paginas/grafico/grafico.component.ts":
  /*!******************************************************!*\
    !*** ./src/app/paginas/grafico/grafico.component.ts ***!
    \******************************************************/

  /*! exports provided: GraficoComponent */

  /***/
  function srcAppPaginasGraficoGraficoComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "GraficoComponent", function () {
      return GraficoComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var vis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! vis */
    "./node_modules/vis/dist/vis.js");
    /* harmony import */


    var vis__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vis__WEBPACK_IMPORTED_MODULE_2__);

    var GraficoComponent = /*#__PURE__*/function () {
      function GraficoComponent() {
        _classCallCheck(this, GraficoComponent);
      }

      _createClass(GraficoComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var container = document.getElementById("vis");
          console.log(localStorage.getItem("grafo"));
          var DOTstring = localStorage.getItem("grafo");
          ;
          var parsedData = vis__WEBPACK_IMPORTED_MODULE_2__["network"].convertDot(DOTstring);
          var data = {
            nodes: parsedData.nodes,
            edges: parsedData.edges
          };
          var options = parsedData.options; // you can extend the options like a normal JSON variable:

          options = {
            layout: {
              hierarchical: {
                sortMethod: 'directed',
                direction: 'UD' // UD, DU, LR, RL

              }
            },
            nodes: {
              color: 'skyblue',
              shape: 'box'
            }
          }; // create a network

          var network = new vis__WEBPACK_IMPORTED_MODULE_2__["Network"](container, data, options);
          network.stabilize();
        }
      }]);

      return GraficoComponent;
    }();

    GraficoComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-grafico',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./grafico.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/grafico/grafico.component.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./grafico.component.css */
      "./src/app/paginas/grafico/grafico.component.css"))["default"]]
    })], GraficoComponent);
    /***/
  },

  /***/
  "./src/app/paginas/principal/home.component.css":
  /*!******************************************************!*\
    !*** ./src/app/paginas/principal/home.component.css ***!
    \******************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPaginasPrincipalHomeComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "#barra {\n    height: 06vh;\n}\n\n.spacer {\n    flex: 1 1 auto;\n}\n\n#superior { \n    height: 24vh;\n}\n\n#separador1 {\n    height: 01vh;\n    background-color: #f44336;\n}\n\n#inferior {\n    height: 69vh;\n    width: 100vw;\n    display: flex;\n}\n\n#izquierda {\n    width: 49.50vw;\n}\n\n#separador2 {\n    width: 01vw;\n    background-color: #f44336;\n}\n\n#derecha {\n    width: 49.50vw;\n}\n\n#grafo {\n    width: 100%;\n    height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnaW5hcy9wcmluY2lwYWwvaG9tZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1osYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvcGFnaW5hcy9wcmluY2lwYWwvaG9tZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2JhcnJhIHtcbiAgICBoZWlnaHQ6IDA2dmg7XG59XG5cbi5zcGFjZXIge1xuICAgIGZsZXg6IDEgMSBhdXRvO1xufVxuXG4jc3VwZXJpb3IgeyBcbiAgICBoZWlnaHQ6IDI0dmg7XG59XG5cbiNzZXBhcmFkb3IxIHtcbiAgICBoZWlnaHQ6IDAxdmg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0NDMzNjtcbn1cblxuI2luZmVyaW9yIHtcbiAgICBoZWlnaHQ6IDY5dmg7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIGRpc3BsYXk6IGZsZXg7XG59XG5cbiNpenF1aWVyZGEge1xuICAgIHdpZHRoOiA0OS41MHZ3O1xufVxuXG4jc2VwYXJhZG9yMiB7XG4gICAgd2lkdGg6IDAxdnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0NDMzNjtcbn1cblxuI2RlcmVjaGEge1xuICAgIHdpZHRoOiA0OS41MHZ3O1xufVxuXG4jZ3JhZm8ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/paginas/principal/home.component.ts":
  /*!*****************************************************!*\
    !*** ./src/app/paginas/principal/home.component.ts ***!
    \*****************************************************/

  /*! exports provided: HomeComponent */

  /***/
  function srcAppPaginasPrincipalHomeComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomeComponent", function () {
      return HomeComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _analizadorXML_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../../analizadorXML/index */
    "./src/analizadorXML/index.ts");
    /* harmony import */


    var _analizadorXML_indexDesc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../../analizadorXML/indexDesc */
    "./src/analizadorXML/indexDesc.ts");
    /* harmony import */


    var _analizadores_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../../analizadores/index */
    "./src/analizadores/index.ts");
    /* harmony import */


    var _analizadores_indexDesc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../../../analizadores/indexDesc */
    "./src/analizadores/indexDesc.ts");
    /* harmony import */


    var _reporte_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../reporte.service */
    "./src/app/reporte.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var HomeComponent = /*#__PURE__*/function () {
      function HomeComponent(_servicio, _router) {
        _classCallCheck(this, HomeComponent);

        this._servicio = _servicio;
        this._router = _router;
        this.title = 'interfaz'; //editor query

        this.querys = "/bookstore/book";
        this.editorQueryOptions = {
          theme: 'gruvbox-dark',
          mode: "application/xquery",
          lineNumbers: true,
          lineWrapping: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
          autoCloseBrackets: true,
          matchBrackets: true,
          lint: true
        }; //editor XML entrada

        this.xmlEntrada = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<bookstore>\n  <book>\n    <title lang=\"en\">Harry Potter</title>\n    <price>29.99</price>\n  </book>\n  <book1>\n    <title lang=\"en\">Learning XML</title>\n    <price>39.95</price>\n  </book1>\n</bookstore>";
        this.editorXMLEntradaOptions = {
          theme: 'gruvbox-dark',
          mode: "application/xml",
          lineNumbers: true,
          lineWrapping: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
          autoCloseBrackets: true,
          matchBrackets: true,
          lint: true
        }; //editor XML Salida

        this.xmlSalida = "XML Salida";
        this.editorXMLSalidaOptions = {
          theme: 'gruvbox-dark',
          mode: "application/xml",
          lineNumbers: true,
          lineWrapping: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
          autoCloseBrackets: true,
          matchBrackets: true,
          lint: true
        }; //reportes

        this.tablaXML = [];
        this.cstXML = "";
        this.bnfXML = [];
        this.encodingXML = "";
        this.queryMod = "";
        this.bnfXpath = [];
        this.astXpath = "";
        this.cstXpath = ""; //reportesVisualizacion

        this.grafo = false;
        this.bnf = false;
        this.tabla = false;
      }

      _createClass(HomeComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          localStorage.clear();
        }
      }, {
        key: "abrirXML",
        value: function abrirXML(files) {
          var _this7 = this;

          this.xmlEntrada = files.item(0);
          var fileReader = new FileReader();

          fileReader.onload = function (e) {
            _this7.xmlEntrada = fileReader.result;
            console.log(fileReader.result);
          };

          fileReader.readAsText(this.xmlEntrada);
        }
      }, {
        key: "ejecutarAscendente",
        value: function ejecutarAscendente() {
          this.botarReportes();
          localStorage.clear();
          var ascXML = new _analizadorXML_index__WEBPACK_IMPORTED_MODULE_2__["AnalizadorASCXML"]();
          var ascXpath = new _analizadores_index__WEBPACK_IMPORTED_MODULE_4__["AnalizadosAscXpath"]();
          var ret = ascXML.ejecutarCodigo(this.xmlEntrada);
          var ret1 = ascXpath.ejecutarCodigo(this.querys);
          this.tablaXML = ret.tablaRep;
          this.cstXML = ret.cstRep;
          this.bnfXML = ret.bnfRep;
          this.encodingXML = ret.encoding;
          this.queryMod = ret1.ejecutado;
          this.bnfXpath = ret1.bnfRep;
          this.astXpath = ret1.astRep;
          this.cstXpath = ret1.cstRep;
          alert("Analisis concluido");
        }
      }, {
        key: "ejecutarDescendente",
        value: function ejecutarDescendente() {
          this.botarReportes();
          localStorage.clear();
          var descXML = new _analizadorXML_indexDesc__WEBPACK_IMPORTED_MODULE_3__["AnalizadorASCXML"]();
          var descXPATH = new _analizadores_indexDesc__WEBPACK_IMPORTED_MODULE_5__["AnalizadosAscXpath"]();
          var ret = descXML.ejecutarCodigo(this.xmlEntrada);
          var ret1 = descXPATH.ejecutarCodigo(this.querys);
          this.tablaXML = ret.tablaRep;
          this.cstXML = ret.cstRep;
          this.bnfXML = ret.bnfRep;
          this.queryMod = ret1.ejecutado;
          this.bnfXpath = ret1.bnfRep;
          this.astXpath = ret1.astRep;
          this.cstXpath = ret1.cstRep;
          alert("Analisis concluido");
        }
      }, {
        key: "botarReportes",
        value: function botarReportes() {
          this.grafo = this.bnf = this.tabla = false;
        }
      }, {
        key: "reporteTablaSimbolosXML",
        value: function reporteTablaSimbolosXML() {
          this.botarReportes();
          localStorage.clear();
          localStorage.setItem('tablaXML', JSON.stringify(this.tablaXML));
          this.tabla = true; //window.open("tablaSimbolosXML", "_blank")
        }
      }, {
        key: "reporteCSTXML",
        value: function reporteCSTXML() {
          this.botarReportes();
          localStorage.clear();
          localStorage.setItem('grafo', this.cstXML);
          this.grafo = true; //window.open("grafico", "_blank")
        }
      }, {
        key: "reporteBNFXML",
        value: function reporteBNFXML() {
          this.botarReportes();
          localStorage.clear();
          localStorage.setItem('bnf', JSON.stringify(this.bnfXML));
          this.bnf = true; //window.open("bnf", "_blank")
        }
      }, {
        key: "reporteBNFXPATH",
        value: function reporteBNFXPATH() {
          this.botarReportes();
          localStorage.clear();
          localStorage.setItem('bnf', JSON.stringify(this.bnfXpath));
          this.bnf = true; //window.open("bnf", "_blank")
        }
      }, {
        key: "reporteASTXPATH",
        value: function reporteASTXPATH() {
          this.botarReportes();
          localStorage.clear();
          localStorage.setItem('grafo', this.astXpath);
          this.grafo = true; //window.open("grafico", "_blank")
        }
      }, {
        key: "reporteCSTXPATH",
        value: function reporteCSTXPATH() {
          this.botarReportes();
          localStorage.clear();
          localStorage.setItem('grafo', this.cstXpath);
          this.grafo = true; // window.open("grafico", "_blank")
        }
      }]);

      return HomeComponent;
    }();

    HomeComponent.ctorParameters = function () {
      return [{
        type: _reporte_service__WEBPACK_IMPORTED_MODULE_6__["ReporteService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"]
      }];
    };

    HomeComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'home-root',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./home.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/principal/home.component.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./home.component.css */
      "./src/app/paginas/principal/home.component.css"))["default"]]
    })], HomeComponent);
    /***/
  },

  /***/
  "./src/app/paginas/tabla-xml/tabla-xml.component.css":
  /*!***********************************************************!*\
    !*** ./src/app/paginas/tabla-xml/tabla-xml.component.css ***!
    \***********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPaginasTablaXmlTablaXmlComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "table {\n    width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnaW5hcy90YWJsYS14bWwvdGFibGEteG1sLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0FBQ2YiLCJmaWxlIjoic3JjL2FwcC9wYWdpbmFzL3RhYmxhLXhtbC90YWJsYS14bWwuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcbiAgICB3aWR0aDogMTAwJTtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/paginas/tabla-xml/tabla-xml.component.ts":
  /*!**********************************************************!*\
    !*** ./src/app/paginas/tabla-xml/tabla-xml.component.ts ***!
    \**********************************************************/

  /*! exports provided: TablaXMLComponent */

  /***/
  function srcAppPaginasTablaXmlTablaXmlComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TablaXMLComponent", function () {
      return TablaXMLComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _reporte_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../reporte.service */
    "./src/app/reporte.service.ts");

    var TablaXMLComponent = /*#__PURE__*/function () {
      function TablaXMLComponent(_servicio) {
        _classCallCheck(this, TablaXMLComponent);

        this.displayedColumns = ['no', 'nombre', 'tipo', 'valor', 'ambito', 'tipoEtiqueta', 'fila', 'columna'];
        this.simbolos = localStorage.getItem('tablaXML');
      }

      _createClass(TablaXMLComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.simbolos = JSON.parse(this.simbolos);
          console.log(this.simbolos, "vacia?");
        }
      }]);

      return TablaXMLComponent;
    }();

    TablaXMLComponent.ctorParameters = function () {
      return [{
        type: _reporte_service__WEBPACK_IMPORTED_MODULE_2__["ReporteService"]
      }];
    };

    TablaXMLComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-tabla-xml',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./tabla-xml.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/tabla-xml/tabla-xml.component.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./tabla-xml.component.css */
      "./src/app/paginas/tabla-xml/tabla-xml.component.css"))["default"]]
    })], TablaXMLComponent);
    /***/
  },

  /***/
  "./src/app/reporte.service.ts":
  /*!************************************!*\
    !*** ./src/app/reporte.service.ts ***!
    \************************************/

  /*! exports provided: ReporteService */

  /***/
  function srcAppReporteServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ReporteService", function () {
      return ReporteService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var ReporteService = /*#__PURE__*/function () {
      function ReporteService() {
        _classCallCheck(this, ReporteService);

        this.tablaSimbolosXML = [];
      }

      _createClass(ReporteService, [{
        key: "llenarTablaXML",
        value: function llenarTablaXML(array) {
          this.tablaSimbolosXML = array;
          console.log(this.tablaSimbolosXML);
        }
      }, {
        key: "obtenerTablaXML",
        value: function obtenerTablaXML() {
          return this.tablaSimbolosXML;
        }
      }]);

      return ReporteService;
    }();

    ReporteService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], ReporteService);
    /***/
  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    });

    var environment = {
      production: true
    };
    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! no exports provided */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/platform-browser-dynamic */
    "./node_modules/@angular/platform-browser-dynamic/__ivy_ngcc__/fesm2015/platform-browser-dynamic.js");
    /* harmony import */


    var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app/app.module */
    "./src/app/app.module.ts");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! codemirror/mode/javascript/javascript */
    "./node_modules/codemirror/mode/javascript/javascript.js");
    /* harmony import */


    var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4__);
    /* harmony import */


    var codemirror_addon_fold_foldgutter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! codemirror/addon/fold/foldgutter */
    "./node_modules/codemirror/addon/fold/foldgutter.js");
    /* harmony import */


    var codemirror_addon_fold_foldgutter__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_fold_foldgutter__WEBPACK_IMPORTED_MODULE_5__);
    /* harmony import */


    var codemirror_addon_fold_brace_fold__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! codemirror/addon/fold/brace-fold */
    "./node_modules/codemirror/addon/fold/brace-fold.js");
    /* harmony import */


    var codemirror_addon_fold_brace_fold__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_fold_brace_fold__WEBPACK_IMPORTED_MODULE_6__);
    /* harmony import */


    var codemirror_lib_codemirror__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! codemirror/lib/codemirror */
    "./node_modules/codemirror/lib/codemirror.js");
    /* harmony import */


    var codemirror_lib_codemirror__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(codemirror_lib_codemirror__WEBPACK_IMPORTED_MODULE_7__);
    /* harmony import */


    var codemirror_addon_edit_closebrackets__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! codemirror/addon/edit/closebrackets */
    "./node_modules/codemirror/addon/edit/closebrackets.js");
    /* harmony import */


    var codemirror_addon_edit_closebrackets__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_edit_closebrackets__WEBPACK_IMPORTED_MODULE_8__);
    /* harmony import */


    var codemirror_addon_edit_matchbrackets__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! codemirror/addon/edit/matchbrackets */
    "./node_modules/codemirror/addon/edit/matchbrackets.js");
    /* harmony import */


    var codemirror_addon_edit_matchbrackets__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_edit_matchbrackets__WEBPACK_IMPORTED_MODULE_9__);
    /* harmony import */


    var codemirror_addon_lint_lint__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! codemirror/addon/lint/lint */
    "./node_modules/codemirror/addon/lint/lint.js");
    /* harmony import */


    var codemirror_addon_lint_lint__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_lint_lint__WEBPACK_IMPORTED_MODULE_10__);
    /* harmony import */


    var codemirror_addon_lint_json_lint__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! codemirror/addon/lint/json-lint */
    "./node_modules/codemirror/addon/lint/json-lint.js");
    /* harmony import */


    var codemirror_addon_lint_json_lint__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(codemirror_addon_lint_json_lint__WEBPACK_IMPORTED_MODULE_11__);
    /* harmony import */


    var codemirror_mode_xquery_xquery__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! codemirror/mode/xquery/xquery */
    "./node_modules/codemirror/mode/xquery/xquery.js");
    /* harmony import */


    var codemirror_mode_xquery_xquery__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_xquery_xquery__WEBPACK_IMPORTED_MODULE_12__);
    /* harmony import */


    var codemirror_mode_xml_xml__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! codemirror/mode/xml/xml */
    "./node_modules/codemirror/mode/xml/xml.js");
    /* harmony import */


    var codemirror_mode_xml_xml__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_xml_xml__WEBPACK_IMPORTED_MODULE_13__);

    if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    }

    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
      return console.error(err);
    });
    /***/
  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! /home/chepe/OLC2_Proyecto/src/main.ts */
    "./src/main.ts");
    /***/
  },

  /***/
  1:
  /*!********************!*\
    !*** fs (ignored) ***!
    \********************/

  /*! no static exports found */

  /***/
  function _(module, exports) {
    /* (ignored) */

    /***/
  },

  /***/
  2:
  /*!**********************!*\
    !*** path (ignored) ***!
    \**********************/

  /*! no static exports found */

  /***/
  function _(module, exports) {
    /* (ignored) */

    /***/
  },

  /***/
  3:
  /*!********************!*\
    !*** fs (ignored) ***!
    \********************/

  /*! no static exports found */

  /***/
  function _(module, exports) {
    /* (ignored) */

    /***/
  },

  /***/
  4:
  /*!**********************!*\
    !*** path (ignored) ***!
    \**********************/

  /*! no static exports found */

  /***/
  function _(module, exports) {
    /* (ignored) */

    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.d94c7f0010244e79b58f.js.map