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


    __webpack_exports__["default"] = "<div id = \"barra\">\n  <mat-toolbar color = \"warn\">\n    <span>Tytus X</span>\n\n    <div class = \"spacer\"></div>\n\n    <button mat-raised-button color = \"accent\" [matMenuTriggerFor] = \"archivo\">Archivo</button>\n    <mat-menu #archivo = \"matMenu\">\n        <button mat-menu-item>\n            <mat-icon>attach_file</mat-icon>\n            <label for = \"file\">Abrir XML</label>\n            <input type = \"file\"\n            id = \"file\"\n            class = \"hidend\"\n            (change) = \"abrirXML($event.target.files)\">\n        </button>\n        <button mat-menu-item>\n            <mat-icon>attach_file</mat-icon>\n            <span>Abrir XPath</span>\n        </button>\n        <button mat-menu-item>\n            <mat-icon>delete</mat-icon>\n            <span>Limpiar</span>\n        </button>\n    </mat-menu>\n\n    <button mat-raised-button color = \"accent\" [matMenuTriggerFor] = \"ejecutar\">Ejecutar</button>\n    <mat-menu #ejecutar = \"matMenu\">\n        <button mat-menu-item (click) = \"ejecutarAscendente()\">\n            <mat-icon>keyboard_arrow_up</mat-icon>\n            <span>Ascendete</span>\n        </button>\n        <button mat-menu-item>\n            <mat-icon>keyboard_arrow_down</mat-icon>\n            <span>Descendente</span>\n        </button>\n    </mat-menu>\n\n    <button mat-raised-button color = \"accent\" [matMenuTriggerFor] = \"reporte\">Reportes</button>\n    <mat-menu #reporte = \"matMenu\">\n        <button mat-menu-item (click) = \"reporteTablaSimbolosXML()\">\n            <span>Tabla de simbolos XML</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteCSTXML()\">\n          <span>CST XML</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteBNFXML()\">\n          <span>BNF XML</span>\n        </button>  \n        <button mat-menu-item (click) = \"reporteBNFXPATH()\">\n          <span>BNF XPATH</span>\n        </button>  \n      </mat-menu>\n</mat-toolbar>\n</div>\n\n<div id = \"superior\">\n  <ngx-codemirror\n    [options] = \"editorQueryOptions\"\n    [(ngModel)] = \"querys\">\n  </ngx-codemirror>\n</div>\n\n<div id = \"separador1\"></div>\n\n<div id = \"inferior\">\n  <div id = \"izquierda\">\n    <ngx-codemirror\n      [options] = \"editorXMLEntradaOptions\"\n      [(ngModel)] = \"xmlEntrada\">\n    </ngx-codemirror>\n  </div>\n  <div id = \"separador2\"></div>\n  <div id = \"derecha\">\n    <ngx-codemirror\n      [options] = \"editorXMLSalidaOptions\"\n      [(ngModel)] = \"xmlSalida\">\n    </ngx-codemirror>\n  </div> \n</div>";
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
          this.generateDot(this.cuerpoDot);
          return this.cuerpoDot;
        }
      }, {
        key: "generarNodoObjeto",
        value: function generarNodoObjeto(objeto, pos, padre) {
          var _this2 = this;

          var nodo = "nodo".concat(pos, " [label = \n        \"ETIQUETA\n").concat(objeto.identificador, "\" ]\n");
          /*var nodo = `nodo${pos} [shape=plaintext ` +
              `label=<` +
              `<table border="0" cellborder="1" cellspacing="0">` +
              `<tr><td bgcolor="red">ETIQUETA</td></tr>` +
              `<tr><td bgcolor="lightblue">${objeto.identificador}</td></tr>` +
              `</table>> ]\n`;
          */

          if (padre !== null) {
            nodo += "nodo".concat(padre, " -> nodo").concat(pos, "\n");
          }

          if (objeto.texto !== '') {
            nodo += "nodo".concat(pos, "_t [label =\"").concat(objeto.texto, "\" ]\n");
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
          var nodo = "nodo".concat(pos, " [label =\n        \"ATRIBUTO\n").concat(objeto.identificador, "\"]\n"); //+

          /* var nodo = `nodo${pos} [shape=plaintext ` +
               `label=<` +
               `<table border="0" cellborder="1" cellspacing="0">` +
               `<tr><td bgcolor="yellow">ATRIBUTO</td></tr>` +
               `<tr><td bgcolor="lightblue">${objeto.identificador}</td></tr>` +
               `</table>> ]\n`;*/

          nodo += "nodo".concat(padre, " -> nodo").concat(pos, "\n");
          nodo += "nodo".concat(pos, "_a [label=").concat(objeto.valor, "]\n");
          nodo += "nodo".concat(pos, " -> nodo").concat(pos, "_a [label=\"valor\"]\n");
          return nodo;
        }
      }, {
        key: "generateDot",
        value: function generateDot(cuerpo) {
          console.log('Cuerpo', cuerpo);
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

    var SalidaGramatica = function SalidaGramatica(objetos, reporte, reporte2, encoding) {
      _classCallCheck(this, SalidaGramatica);

      this.objetos = objetos;
      this.reporteBNF = reporte;
      this.reporteBNF2 = reporte2;
      this.encoding = encoding;
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
                return new SalidaGramatica(this.$, reportBNF, reportBNF2, $$[$0 - 2]);
                break;

              case 2:
                this.$ = $$[$0 - 2];
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

    var Nodo = function Nodo(estado, identificador, predicado, linea, columna) {
      _classCallCheck(this, Nodo);

      this.estado = estado;
      this.identificador = identificador;
      this.predicado = predicado;
      this.linea = linea;
      this.columna = columna;
    };
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


    var _xpathAsc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./xpathAsc */
    "./src/analizadores/xpathAsc.js");
    /* harmony import */


    var _xpathAsc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_xpathAsc__WEBPACK_IMPORTED_MODULE_0__);

    var AnalizadosAscXpath = /*#__PURE__*/function () {
      function AnalizadosAscXpath() {
        _classCallCheck(this, AnalizadosAscXpath);
      }

      _createClass(AnalizadosAscXpath, [{
        key: "ejecutarCodigo",
        value: function ejecutarCodigo(entrada) {
          var salidaG = _xpathAsc__WEBPACK_IMPORTED_MODULE_0__["parse"](entrada);

          var a = {
            objetos: salidaG.objetos,
            bnf1: salidaG.reporteBNF,
            bnf2: salidaG.reporteBNF2
          };
          return a;
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
        var o = function o(k, v, _o2, l) {
          for (_o2 = _o2 || {}, l = k.length; l--; _o2[k[l]] = v) {
            ;
          }

          return _o2;
        },
            $V0 = [1, 4],
            $V1 = [1, 5],
            $V2 = [1, 6],
            $V3 = [1, 7],
            $V4 = [1, 8],
            $V5 = [5, 6],
            $V6 = [1, 12],
            $V7 = [5, 6, 14],
            $V8 = [2, 41],
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
            $Vr = [8, 12, 16, 17, 20, 26, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
            $Vs = [2, 13],
            $Vt = [1, 47],
            $Vu = [1, 51],
            $Vv = [1, 46],
            $Vw = [1, 50],
            $Vx = [1, 44],
            $Vy = [1, 45],
            $Vz = [1, 48],
            $VA = [1, 49],
            $VB = [1, 60],
            $VC = [1, 59],
            $VD = [1, 61],
            $VE = [1, 81],
            $VF = [1, 90],
            $VG = [1, 79],
            $VH = [1, 80],
            $VI = [1, 82],
            $VJ = [1, 83],
            $VK = [1, 84],
            $VL = [1, 85],
            $VM = [1, 86],
            $VN = [1, 87],
            $VO = [1, 88],
            $VP = [1, 89],
            $VQ = [1, 91],
            $VR = [16, 19, 24, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
            $VS = [5, 6, 14, 16, 19, 24, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
            $VT = [1, 134],
            $VU = [1, 132],
            $VV = [1, 133],
            $VW = [1, 135],
            $VX = [16, 19, 24, 43, 46, 47, 48, 49, 50, 51, 52, 53, 54],
            $VY = [19, 24, 43, 47, 48, 49, 50, 51, 52, 53, 54],
            $VZ = [19, 24, 43, 51, 52, 53, 54];

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
            "COMPLEMENTOATRIBUTO": 23,
            "tk_igual": 24,
            "tk_stringTexto": 25,
            "tk_child": 26,
            "tk_dosPuntos": 27,
            "NODETEST": 28,
            "tk_descendant": 29,
            "tk_descendatOr": 30,
            "tk_ancestor": 31,
            "tk_ancestorOr": 32,
            "tk_attribute": 33,
            "tk_following": 34,
            "tk_followingSi": 35,
            "tk_parent": 36,
            "tk_preceding": 37,
            "tk_precedingSi": 38,
            "tk_self": 39,
            "tk_text": 40,
            "tk_llaveA": 41,
            "EXPRESION": 42,
            "tk_llaveC": 43,
            "tk_mas": 44,
            "tk_menos": 45,
            "tk_div": 46,
            "tk_menor": 47,
            "tk_mayor": 48,
            "tk_menorIgual": 49,
            "tk_mayorIgual": 50,
            "tk_or": 51,
            "tk_and": 52,
            "tk_mod": 53,
            "tk_distinto": 54,
            "tk_entero": 55,
            "tk_decimal": 56,
            "tk_position": 57,
            "tk_last": 58,
            "tk_ParC": 59,
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
            24: "tk_igual",
            25: "tk_stringTexto",
            26: "tk_child",
            27: "tk_dosPuntos",
            29: "tk_descendant",
            30: "tk_descendatOr",
            31: "tk_ancestor",
            32: "tk_ancestorOr",
            33: "tk_attribute",
            34: "tk_following",
            35: "tk_followingSi",
            36: "tk_parent",
            37: "tk_preceding",
            38: "tk_precedingSi",
            39: "tk_self",
            40: "tk_text",
            41: "tk_llaveA",
            43: "tk_llaveC",
            44: "tk_mas",
            45: "tk_menos",
            46: "tk_div",
            47: "tk_menor",
            48: "tk_mayor",
            49: "tk_menorIgual",
            50: "tk_mayorIgual",
            51: "tk_or",
            52: "tk_and",
            53: "tk_mod",
            54: "tk_distinto",
            55: "tk_entero",
            56: "tk_decimal",
            57: "tk_position",
            58: "tk_last",
            59: "tk_ParC"
          },
          productions_: [0, [3, 2], [4, 3], [4, 1], [7, 4], [7, 3], [7, 3], [7, 4], [7, 3], [7, 5], [9, 1], [9, 2], [11, 3], [11, 0], [10, 2], [10, 2], [10, 4], [10, 2], [10, 1], [15, 1], [15, 2], [15, 1], [23, 2], [23, 0], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [28, 2], [28, 4], [28, 2], [28, 3], [13, 3], [13, 0], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 3], [42, 1], [42, 1], [42, 2], [42, 1], [42, 3], [42, 3], [42, 1], [42, 3], [21, 1], [21, 1], [21, 3]],
          performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate
          /* action[1] */
          , $$
          /* vstack */
          , _$
          /* lstack */
          ) {
            var _this$$, _this$$2, _this$$3, _this$$4, _this$$5, _this$$6, _this$$7;

            /* this == yyval */
            var $0 = $$.length - 1;

            switch (yystate) {
              case 1:
                produccion.push('&lt;INICIOPURO&gt; ::= &lt;INICIO&gt; EOF');
                accion.push('INICIOPURO.Val = INICIO.val //fin del documento');
                this.$ = $$[$0 - 1];
                return new SalidaGramatica(this.$, produccion, accion);
                break;

              case 2:
                produccion.push('&lt;INICIO&gt; ::= &lt;INICIO&gt; | &lt;INICIALES&gt;');
                accion.push('INICIO.Val = INICIO.push(INICIALES)');
                $$[$0 - 2].push($$[$0]);
                this.$ = $$[$0 - 2];
                break;

              case 3:
                produccion.push('&lt;INICIO&gt; ::= &lt;INICIALES&gt;');
                accion.push('INICIO.Val = INICIALES.Val');
                this.$ = $$[$0];
                break;

              case 4:
                produccion.push("&lt;INICIALES&gt; ::= punto &lt;DIAGONALES&gt; &lt;DERIVADOSLIMITADO&gt; &lt;DERIVAIONDIAGONAL&gt;");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)');
                this.$ = new Array();
                this.$.push(new Nodo("", ".", [], _$[$0 - 3].first_line, _$[$0 - 3].first_column));
                this.$.push(new Nodo($$[$0 - 2], $$[$0 - 1], [], _$[$0 - 3].first_line, _$[$0 - 3].first_column));

                (_this$$ = this.$).push.apply(_this$$, _toConsumableArray($$[$0]));

                break;

              case 5:
                produccion.push("&lt;INICIALES&gt; ::= identificador &lt;PREDICATE&gt; &lt;DERIVACIONDIAGONAL&gt;");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)');
                this.$ = new Array();
                this.$.push(new Nodo("", $$[$0 - 2], [], _$[$0 - 2].first_line, _$[$0 - 2].first_column));

                (_this$$2 = this.$).push.apply(_this$$2, _toConsumableArray($$[$0]));

                break;

              case 6:
                produccion.push("&lt;INICIALES&gt; ::= / &lt;DERIVADOS&gt; &lt;DERIVACIONDIAGONAL&gt;");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)');
                this.$ = new Array();
                this.$.push(new Nodo($$[$0 - 2], $$[$0 - 1], [], _$[$0 - 2].first_line, _$[$0 - 2].first_column));

                (_this$$3 = this.$).push.apply(_this$$3, _toConsumableArray($$[$0]));

                break;

              case 7:
                produccion.push('&lt;INICIALES&gt; ::= // &lt;DERIVADOS&gt; &lt;DERIVACIONDIAGONAL&gt;');
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)');
                this.$ = new Array();
                this.$.push(new Nodo("//", $$[$0 - 1], [], _$[$0 - 3].first_line, _$[$0 - 3].first_column));

                (_this$$4 = this.$).push.apply(_this$$4, _toConsumableArray($$[$0]));

                break;

              case 8:
                produccion.push("&lt;INICIALES&gt; ::= asterisco &lt;PREDICATE&gt; &lt;DERIVACIONDIAGONAL&gt;");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)');
                this.$ = new Array();
                this.$.push(new Nodo("", $$[$0 - 2], [], _$[$0 - 2].first_line, _$[$0 - 2].first_column));

                (_this$$5 = this.$).push.apply(_this$$5, _toConsumableArray($$[$0]));

                break;

              case 9:
                produccion.push("&lt;INICIALES&gt; ::= node() &lt;PREDICATE&gt; &lt;DERIVACIONDIAGONAL&gt;");
                accion.push('INICIALES.Val = []; INICIALES.Val.push(new Nodo(tipo, id, predicado, fila, columna)); INICIALES.push(DERIVACIONDIAGONAL)');
                this.$ = new Array();
                this.$.push(new Nodo("", "node()", [], _$[$0 - 4].first_line, _$[$0 - 4].first_column));

                (_this$$6 = this.$).push.apply(_this$$6, _toConsumableArray($$[$0 - 2]));

                break;

              case 10:
                produccion.push('&lt;DIAGONALES&gt; ::= /');
                accion.push('DIAGONALES.Val = \"/\"');
                this.$ = $$[$0];
                break;

              case 11:
                produccion.push("&lt;DIAGONALES&gt; ::= //");
                accion.push('DIAGONALES.Val = \"//\"');
                this.$ = "//";
                break;

              case 12:
                produccion.push("&lt;DERIVACIONDIAGONAL&gt; ::= &lt;DIAGONALES&gt; &lt;DERIVADOS&gt; &lt;DERIVACIONDIAGONAL&gt;");
                accion.push('DERIVACIONDIAGONAL.Val = []; DERIVACIONDIAGONAL.Val.push(new Nodo(tipo, id, predicado, fila, columna)); DERIVACIONDIAGONAL.push(DERIVACIONDIAGONAL)');
                this.$ = new Array();
                this.$.push(new Nodo($$[$0 - 2], $$[$0 - 1], [], _$[$0 - 2].first_line, _$[$0 - 2].first_column));

                (_this$$7 = this.$).push.apply(_this$$7, _toConsumableArray($$[$0]));

                break;

              case 13:
                this.$ = [null];
                break;

              case 14:
              case 15:
                this.$ = $$[$0 - 1];
                break;

              case 16:
                this.$ = $$[$0 - 3];
                break;

              case 17:
                produccion.push("&lt;DERIVADOSLIMIADO&gt; ::= arroba &lt;ATRIBUTO&gt;");
                accion.push('DERIVADOSLIMITADO.Val = \"@\" + ATRIBUTO.Val');
                this.$ = $$[$0 - 1] + "" + $$[$0];
                break;

              case 18:
                this.$ = $$[$0];
                break;

              case 19:
                produccion.push("&lt;DERIVADOS&gt; ::= punto");
                accion.push("DERIVADOS.Val = \".\" ");
                this.$ = $$[$0];
                break;

              case 20:
                produccion.push("&lt;DERIVADOS&gt; ::= doblePunto");
                accion.push('DERIVADOS.Val = \"..\"');
                this.$ = "..";
                break;

              case 21:
                produccion.push("&lt;DERIVADOS&gt; ::= &lt;DERIVADOSLIMITADO&gt;");
                accion.push('DERIVADOS.Val = DERIVADOSLIMITADO.Val');
                this.$ = $$[$0];
                break;

              case 22:
              case 63:
                this.$ = $$[$0];
                break;

              case 23:
                this.$ = "";
                break;

              case 64:
                this.$ = $$[$0];
                break;

              case 65:
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
            41: $V9
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
            26: $Vf,
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
            39: $Vq
          }, o($V7, $V8, {
            13: 36,
            41: $V9
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
            26: $Vf,
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
            39: $Vq
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
            25: $Vw,
            42: 43,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
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
            26: $Vf,
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
            39: $Vq
          }, o($V7, [2, 19], {
            8: [1, 54]
          }), o($V7, [2, 21]), o($V7, $V8, {
            13: 55,
            41: $V9
          }), o($V7, $V8, {
            13: 56,
            41: $V9
          }), {
            18: [1, 57]
          }, {
            12: $VB,
            16: $VC,
            17: $VD,
            21: 58
          }, o($V7, [2, 18]), {
            27: [1, 62]
          }, {
            27: [1, 63]
          }, {
            27: [1, 64]
          }, {
            27: [1, 65]
          }, {
            27: [1, 66]
          }, {
            27: [1, 67]
          }, {
            27: [1, 68]
          }, {
            27: [1, 69]
          }, {
            27: [1, 70]
          }, {
            27: [1, 71]
          }, {
            27: [1, 72]
          }, {
            27: [1, 73]
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
            26: $Vf,
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
            39: $Vq
          }, {
            16: $VE,
            24: $VF,
            43: [1, 78],
            44: $VG,
            45: $VH,
            46: $VI,
            47: $VJ,
            48: $VK,
            49: $VL,
            50: $VM,
            51: $VN,
            52: $VO,
            53: $VP,
            54: $VQ
          }, o($VR, [2, 55]), o($VR, [2, 56]), {
            12: $VB,
            16: $VC,
            17: $VD,
            21: 92
          }, o($VR, [2, 58]), {
            18: [1, 93]
          }, {
            18: [1, 94]
          }, o($VR, [2, 61]), {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 95,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, o($V5, [2, 6]), o($V5, $Vs, {
            9: 42,
            11: 96,
            14: $V6
          }), o($V7, [2, 20]), o($V7, [2, 14]), o($V7, [2, 15]), {
            19: [1, 97]
          }, o($V7, [2, 17]), o($VS, [2, 63]), o($VS, [2, 64]), {
            18: [1, 98]
          }, {
            27: [1, 99]
          }, {
            27: [1, 100]
          }, {
            27: [1, 101]
          }, {
            27: [1, 102]
          }, {
            27: [1, 103]
          }, {
            27: [1, 104]
          }, {
            27: [1, 105]
          }, {
            27: [1, 106]
          }, {
            27: [1, 107]
          }, {
            27: [1, 108]
          }, {
            27: [1, 109]
          }, {
            27: [1, 110]
          }, o($V5, [2, 8]), o($V7, $V8, {
            13: 111,
            41: $V9
          }), o($V5, [2, 4]), o($V5, $Vs, {
            9: 42,
            11: 112,
            14: $V6
          }), o($V7, [2, 40]), {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 113,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 114,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 115,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 116,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 117,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 118,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 119,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 120,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 121,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 122,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 123,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 124,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, {
            12: $Vt,
            18: $Vu,
            20: $Vv,
            25: $Vw,
            42: 125,
            55: $Vx,
            56: $Vy,
            57: $Vz,
            58: $VA
          }, o($VR, [2, 57]), {
            19: [1, 126]
          }, {
            19: [1, 127]
          }, {
            16: $VE,
            19: [1, 128],
            24: $VF,
            44: $VG,
            45: $VH,
            46: $VI,
            47: $VJ,
            48: $VK,
            49: $VL,
            50: $VM,
            51: $VN,
            52: $VO,
            53: $VP,
            54: $VQ
          }, o($V5, [2, 7]), o($V7, $V8, {
            13: 129,
            41: $V9
          }), {
            59: [1, 130]
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            28: 131,
            40: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            28: 136,
            40: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            28: 137,
            40: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            28: 138,
            40: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            28: 139,
            40: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            28: 140,
            40: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            28: 141,
            40: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            28: 142,
            40: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            28: 143,
            40: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            28: 144,
            40: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            28: 145,
            40: $VW
          }, {
            12: $VT,
            16: $VU,
            17: $VV,
            28: 146,
            40: $VW
          }, o($V5, $Vs, {
            9: 42,
            11: 147,
            14: $V6
          }), o($V5, [2, 12]), o($VR, [2, 42]), o($VR, [2, 43]), o($VX, [2, 44], {
            44: $VG,
            45: $VH
          }), o($VX, [2, 45], {
            44: $VG,
            45: $VH
          }), o($VY, [2, 46], {
            16: $VE,
            44: $VG,
            45: $VH,
            46: $VI
          }), o($VY, [2, 47], {
            16: $VE,
            44: $VG,
            45: $VH,
            46: $VI
          }), o($VY, [2, 48], {
            16: $VE,
            44: $VG,
            45: $VH,
            46: $VI
          }), o($VY, [2, 49], {
            16: $VE,
            44: $VG,
            45: $VH,
            46: $VI
          }), o([19, 43, 51, 53], [2, 50], {
            16: $VE,
            24: $VF,
            44: $VG,
            45: $VH,
            46: $VI,
            47: $VJ,
            48: $VK,
            49: $VL,
            50: $VM,
            52: $VO,
            54: $VQ
          }), o([19, 43, 51, 52, 53], [2, 51], {
            16: $VE,
            24: $VF,
            44: $VG,
            45: $VH,
            46: $VI,
            47: $VJ,
            48: $VK,
            49: $VL,
            50: $VM,
            54: $VQ
          }), o([19, 43, 53], [2, 52], {
            16: $VE,
            24: $VF,
            44: $VG,
            45: $VH,
            46: $VI,
            47: $VJ,
            48: $VK,
            49: $VL,
            50: $VM,
            51: $VN,
            52: $VO,
            54: $VQ
          }), o($VZ, [2, 53], {
            16: $VE,
            44: $VG,
            45: $VH,
            46: $VI,
            47: $VJ,
            48: $VK,
            49: $VL,
            50: $VM
          }), o($VZ, [2, 54], {
            16: $VE,
            44: $VG,
            45: $VH,
            46: $VI,
            47: $VJ,
            48: $VK,
            49: $VL,
            50: $VM
          }), o($VR, [2, 59]), o($VR, [2, 60]), o($VR, [2, 62]), o($V7, [2, 16]), o($VS, [2, 65]), o($V7, [2, 24]), o($V7, $V8, {
            13: 148,
            41: $V9
          }), {
            18: [1, 149]
          }, o($V7, $V8, {
            13: 150,
            41: $V9
          }), {
            18: [1, 151]
          }, o($V7, [2, 25]), o($V7, [2, 26]), o($V7, [2, 27]), o($V7, [2, 28]), o($V7, [2, 29]), o($V7, [2, 30]), o($V7, [2, 31]), o($V7, [2, 32]), o($V7, [2, 33]), o($V7, [2, 34]), o($V7, [2, 35]), o($V5, [2, 9]), o($V7, [2, 36]), {
            19: [1, 152]
          }, o($V7, [2, 38]), {
            19: [1, 153]
          }, o($V7, $V8, {
            13: 154,
            41: $V9
          }), o($V7, [2, 39]), o($V7, [2, 37])],
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

        var _webpack_require__4 = __webpack_require__(
        /*! ./AST/SalidaGramatica */
        "./src/analizadores/AST/SalidaGramatica.ts"),
            SalidaGramatica = _webpack_require__4.SalidaGramatica;

        var _webpack_require__5 = __webpack_require__(
        /*! ./Expresiones/Nodo */
        "./src/analizadores/Expresiones/Nodo.ts"),
            Nodo = _webpack_require__5.Nodo; //const { Atributo } = require('./Expresiones/Atributo');


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


    __webpack_exports__["default"] = "#barra {\n    height: 06vh;\n}\n\n.spacer {\n    flex: 1 1 auto;\n}\n\n#superior { \n    height: 24vh;\n}\n\n#separador1 {\n    height: 01vh;\n    background-color: #f44336;\n}\n\n#inferior {\n    height: 69vh;\n    width: 100vw;\n    display: flex;\n}\n\n#izquierda {\n    width: 49.50vw;\n}\n\n#separador2 {\n    width: 01vw;\n    background-color: #f44336;\n}\n\n#derecha {\n    width: 49.50vw;\n}\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnaW5hcy9wcmluY2lwYWwvaG9tZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1osYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksY0FBYztBQUNsQiIsImZpbGUiOiJzcmMvYXBwL3BhZ2luYXMvcHJpbmNpcGFsL2hvbWUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNiYXJyYSB7XG4gICAgaGVpZ2h0OiAwNnZoO1xufVxuXG4uc3BhY2VyIHtcbiAgICBmbGV4OiAxIDEgYXV0bztcbn1cblxuI3N1cGVyaW9yIHsgXG4gICAgaGVpZ2h0OiAyNHZoO1xufVxuXG4jc2VwYXJhZG9yMSB7XG4gICAgaGVpZ2h0OiAwMXZoO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNDQzMzY7XG59XG5cbiNpbmZlcmlvciB7XG4gICAgaGVpZ2h0OiA2OXZoO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBkaXNwbGF5OiBmbGV4O1xufVxuXG4jaXpxdWllcmRhIHtcbiAgICB3aWR0aDogNDkuNTB2dztcbn1cblxuI3NlcGFyYWRvcjIge1xuICAgIHdpZHRoOiAwMXZ3O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNDQzMzY7XG59XG5cbiNkZXJlY2hhIHtcbiAgICB3aWR0aDogNDkuNTB2dztcbn1cblxuIl19 */";
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


    var _analizadores_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../../analizadores/index */
    "./src/analizadores/index.ts");
    /* harmony import */


    var _reporte_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../reporte.service */
    "./src/app/reporte.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var HomeComponent = /*#__PURE__*/function () {
      function HomeComponent(_servicio, _router) {
        _classCallCheck(this, HomeComponent);

        this._servicio = _servicio;
        this._router = _router;
        this.title = 'interfaz'; //editor query

        this.querys = "Ingrese una query";
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
      }

      _createClass(HomeComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var ascXpath = new _analizadores_index__WEBPACK_IMPORTED_MODULE_3__["AnalizadosAscXpath"]();
          console.log(ascXpath.ejecutarCodigo("//hola/hola//adios/pero"));
          localStorage.clear();
        }
      }, {
        key: "abrirXML",
        value: function abrirXML(files) {
          var _this5 = this;

          this.xmlEntrada = files.item(0);
          var fileReader = new FileReader();

          fileReader.onload = function (e) {
            _this5.xmlEntrada = fileReader.result;
            console.log(fileReader.result);
          };

          fileReader.readAsText(this.xmlEntrada);
        }
      }, {
        key: "ejecutarAscendente",
        value: function ejecutarAscendente() {
          localStorage.clear();
          var ascXML = new _analizadorXML_index__WEBPACK_IMPORTED_MODULE_2__["AnalizadorASCXML"]();
          var ascXpath = new _analizadores_index__WEBPACK_IMPORTED_MODULE_3__["AnalizadosAscXpath"]();
          var ret = ascXML.ejecutarCodigo(this.xmlEntrada);
          var ret1 = ascXpath.ejecutarCodigo(this.querys);
          this.queryMod = "";

          for (var i = 0; i < ret1.objetos.length; i++) {
            if (ret1.objetos[i] != null) {
              this.queryMod += ret1.objetos[i].estado + ret1.objetos[i].identificador;
            }
          }

          console.log(ret);
          this.tablaXML = ret.tablaRep;
          this.cstXML = ret.cstRep;
          this.bnfXML = ret.bnfRep;
          alert("Analisis concluido");
        }
      }, {
        key: "reporteTablaSimbolosXML",
        value: function reporteTablaSimbolosXML() {
          localStorage.clear();
          localStorage.setItem('tablaXML', JSON.stringify(this.tablaXML));
          window.open("tablaSimbolosXML", "_blank");
        }
      }, {
        key: "reporteCSTXML",
        value: function reporteCSTXML() {
          localStorage.clear();
          localStorage.setItem('grafo', this.cstXML);
          window.open("grafico", "_blank");
        }
      }, {
        key: "reporteBNFXML",
        value: function reporteBNFXML() {
          localStorage.clear();
          localStorage.setItem('bnf', JSON.stringify(this.bnfXML));
          window.open("bnf", "_blank");
        }
      }, {
        key: "reproteBNFXPATH",
        value: function reproteBNFXPATH() {}
      }]);

      return HomeComponent;
    }();

    HomeComponent.ctorParameters = function () {
      return [{
        type: _reporte_service__WEBPACK_IMPORTED_MODULE_4__["ReporteService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
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
//# sourceMappingURL=main-es5.5508032c47418e6388fc.js.map