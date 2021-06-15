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


    __webpack_exports__["default"] = "<div id = \"barra\">\n  <mat-toolbar color = \"warn\">\n    <span>Tytus X</span>\n\n    <div class = \"spacer\"></div>\n\n    <button mat-raised-button color = \"accent\" [matMenuTriggerFor] = \"archivo\">Archivo</button>\n    <mat-menu #archivo = \"matMenu\">\n        <button mat-menu-item>\n            <mat-icon>attach_file</mat-icon>\n            <label for = \"file\">Abrir XML</label>\n            <input type = \"file\"\n            id = \"file\"\n            class = \"hidend\"\n            (change) = \"abrirXML($event.target.files)\">\n        </button>\n        <button mat-menu-item>\n            <mat-icon>attach_file</mat-icon>\n            <span>Abrir XPath</span>\n        </button>\n        <button mat-menu-item>\n            <mat-icon>delete</mat-icon>\n            <span>Limpiar</span>\n        </button>\n    </mat-menu>\n\n    <button mat-raised-button color = \"accent\" [matMenuTriggerFor] = \"ejecutar\">Ejecutar</button>\n    <mat-menu #ejecutar = \"matMenu\">\n        <button mat-menu-item (click) = \"ejecutarAscendente()\">\n            <mat-icon>keyboard_arrow_up</mat-icon>\n            <span>Ascendete</span>\n        </button>\n        <button mat-menu-item>\n            <mat-icon>keyboard_arrow_down</mat-icon>\n            <span>Descendente</span>\n        </button>\n    </mat-menu>\n\n    <button mat-raised-button color = \"accent\" [matMenuTriggerFor] = \"reporte\">Reportes</button>\n    <mat-menu #reporte = \"matMenu\">\n        <button mat-menu-item (click) = \"reporteTablaSimbolosXML()\">\n            <span>Tabla de simbolos XML</span>\n        </button>\n    </mat-menu>\n</mat-toolbar>\n</div>\n\n<div id = \"superior\">\n  <ngx-codemirror\n    [options] = \"editorQueryOptions\"\n    [(ngModel)] = \"querys\">\n  </ngx-codemirror>\n</div>\n\n<div id = \"separador1\"></div>\n\n<div id = \"inferior\">\n  <div id = \"izquierda\">\n    <ngx-codemirror\n      [options] = \"editorXMLEntradaOptions\"\n      [(ngModel)] = \"xmlEntrada\">\n    </ngx-codemirror>\n  </div>\n  <div id = \"separador2\"></div>\n  <div id = \"derecha\">\n    <ngx-codemirror\n      [options] = \"editorXMLSalidaOptions\"\n      [(ngModel)] = \"xmlSalida\">\n    </ngx-codemirror>\n  </div> \n</div>";
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


    __webpack_exports__["default"] = "<table mat-table [dataSource]=\"simbolos\" class=\"mat-elevation-z8\">\n\n    <!--- Note that these columns can be defined in any order.\n    The actual rendered columns are set as a property on the row definition\" -->\n    <!-- Position Column -->\n    <ng-container matColumnDef=\"no\">\n      <th mat-header-cell *matHeaderCellDef> No. </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.no}} </td>\n    </ng-container>\n\n    <!-- Name Column -->\n    <ng-container matColumnDef=\"nombre\">\n      <th mat-header-cell *matHeaderCellDef> Nombre </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.nombre}} </td>\n    </ng-container>\n\n    <!-- Weight Column -->\n    <ng-container matColumnDef=\"tipo\">\n      <th mat-header-cell *matHeaderCellDef> Tipo </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.tipo}} </td>\n    </ng-container>\n\n    <!-- Symbol Column -->\n    <ng-container matColumnDef=\"valor\">\n      <th mat-header-cell *matHeaderCellDef> Valor </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.valor}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"ambito\">\n        <th mat-header-cell *matHeaderCellDef> Ambito </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.ambito}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"fila\">\n        <th mat-header-cell *matHeaderCellDef> Fila </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.linea}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"columna\">\n        <th mat-header-cell *matHeaderCellDef> Columna </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.columna}} </td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n</table>";
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
          var reportBody = "<TABLE BORDER> \n";
          reportBody += "    <thead> \n";
          reportBody += "        <tr> \n";
          reportBody += "        <th>Producci\xF3n</th> \n";
          reportBody += "        <th>Regla Semantica</th> \n";
          reportBody += "        </tr> \n";
          reportBody += "    </thead> \n";
          reportBody += "    <tbody> \n";

          for (var i = 0; i < this.reporte.length; i++) {
            reportBody += this.generarBodyReporte(this.reporte[i], this.reporte2[i]);
          }

          reportBody += "    </tbody> \n";
          reportBody += "</TABLE> \n";
          return reportBody;
        }
      }, {
        key: "generarBodyReporte",
        value: function generarBodyReporte(object, object2) {
          var fila = "  <tr> \n";
          fila += "      <td class=\"text-left\">".concat(object, "</td>\n");
          fila += "      <td class=\"text-left\">".concat(object2, "</td>\n");
          fila += "  </tr> \n";
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

    var SalidaGramatica = function SalidaGramatica(objetos, reporte, reporte2) {
      _classCallCheck(this, SalidaGramatica);

      this.objetos = objetos;
      this.reporteBNF = reporte;
      this.reporteBNF2 = reporte2;
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
          var fila = {
            no: this.contador,
            nombre: objeto.identificador,
            tipo: tipo,
            valor: valor,
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

    var Objeto = function Objeto(id, texto, linea, columna, listaAtributos, listaO) {
      _classCallCheck(this, Objeto);

      this.identificador = id;
      this.texto = texto;
      this.linea = linea;
      this.columna = columna;
      this.listaAtributos = listaAtributos;
      this.listaObjetos = listaO;
      this.entorno = new _AST_Entorno__WEBPACK_IMPORTED_MODULE_0__["Entorno"](null);
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
            $V0 = [1, 5],
            $V1 = [5, 8],
            $V2 = [1, 8],
            $V3 = [11, 13],
            $V4 = [1, 12],
            $V5 = [9, 11, 13],
            $V6 = [1, 23],
            $V7 = [1, 30],
            $V8 = [1, 32],
            $V9 = [1, 24],
            $Va = [1, 21],
            $Vb = [1, 22],
            $Vc = [1, 25],
            $Vd = [1, 27],
            $Ve = [1, 28],
            $Vf = [1, 29],
            $Vg = [1, 31],
            $Vh = [1, 33],
            $Vi = [1, 34],
            $Vj = [1, 35],
            $Vk = [1, 36],
            $Vl = [1, 37],
            $Vm = [1, 38],
            $Vn = [1, 39],
            $Vo = [1, 40],
            $Vp = [1, 41],
            $Vq = [1, 42],
            $Vr = [1, 43],
            $Vs = [1, 44],
            $Vt = [1, 45],
            $Vu = [1, 46],
            $Vv = [1, 47],
            $Vw = [1, 48],
            $Vx = [1, 49],
            $Vy = [1, 50],
            $Vz = [1, 51],
            $VA = [8, 9, 13, 17, 18, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];

        var parser = {
          trace: function trace() {},
          yy: {},
          symbols_: {
            "error": 2,
            "START": 3,
            "RAICES": 4,
            "EOF": 5,
            "RAIZ": 6,
            "OBJETO": 7,
            "lt": 8,
            "identifier": 9,
            "LATRIBUTOS": 10,
            "gt": 11,
            "OBJETOS": 12,
            "div": 13,
            "LISTA_ID_OBJETO": 14,
            "ATRIBUTOS": 15,
            "ATRIBUTO": 16,
            "asig": 17,
            "StringLiteral": 18,
            "LISTA_VALORES": 19,
            "IntegerLiteral": 20,
            "DoubleLiteral": 21,
            "CharLiteral": 22,
            "CARACTERES": 23,
            "plus": 24,
            "minus": 25,
            "times": 26,
            "mod": 27,
            "equal": 28,
            "nequal": 29,
            "and": 30,
            "or": 31,
            "not": 32,
            "semicolon": 33,
            "lparen": 34,
            "rparen": 35,
            "lcurly": 36,
            "rcurly": 37,
            "lbracket": 38,
            "rbracket": 39,
            "period": 40,
            "coma": 41,
            "lesst": 42,
            "greatert": 43,
            "ampersand": 44,
            "apostro": 45,
            "quotation": 46,
            "$accept": 0,
            "$end": 1
          },
          terminals_: {
            2: "error",
            5: "EOF",
            8: "lt",
            9: "identifier",
            11: "gt",
            13: "div",
            17: "asig",
            18: "StringLiteral",
            20: "IntegerLiteral",
            21: "DoubleLiteral",
            22: "CharLiteral",
            24: "plus",
            25: "minus",
            26: "times",
            27: "mod",
            28: "equal",
            29: "nequal",
            30: "and",
            31: "or",
            32: "not",
            33: "semicolon",
            34: "lparen",
            35: "rparen",
            36: "lcurly",
            37: "rcurly",
            38: "lbracket",
            39: "rbracket",
            40: "period",
            41: "coma",
            42: "lesst",
            43: "greatert",
            44: "ampersand",
            45: "apostro",
            46: "quotation"
          },
          productions_: [0, [3, 2], [4, 2], [4, 1], [6, 1], [7, 9], [7, 9], [7, 5], [10, 1], [10, 0], [15, 2], [15, 1], [16, 3], [12, 2], [12, 1], [14, 2], [14, 1], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [19, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1], [23, 1]],
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
                reportBNF.push('&lt;START&gt; ::= &lt;RAICES&gt; EOF');
                reportBNF2.push('Start.val = Raiz.val. // Fin del documento');
                this.$ = $$[$0 - 1];
                return new SalidaGramatica(this.$, reportBNF, reportBNF2);
                break;

              case 2:
                reportBNF.push('&lt;RAICES&gt; ::= &lt;RAICES&gt; &lt;RAIZ&gt;');
                reportBNF2.push('Raices.val = Raices.push(Raiz)');
                $$[$0 - 1].push($$[$0]);
                this.$ = $$[$0 - 1];
                break;

              case 3:
                reportBNF.push('&lt;RAICES&gt; ::= &lt;RAIZ&gt;');
                reportBNF2.push('Raices.val = Raiz.val');
                this.$ = [$$[$0]];
                break;

              case 4:
                reportBNF.push('&lt;RAIZ&gt; ::= &lt;OBJETO&gt;');
                reportBNF2.push('Raiz.val = Objeto.val');
                this.$ = $$[$0];
                break;

              case 5:
                reportBNF.push('&lt;OBJETO&gt; ::= lt identifier &lt;LATRIBUTOS&gt; gt &lt;OBJETOS&gt; lt div identifier gt');
                reportBNF2.push('Objeto = new Objeto(id,\'\',linea, columna, atributos, objetos)');
                this.$ = new Objeto($$[$0 - 7], '', _$[$0 - 8].first_line, _$[$0 - 8].first_column, $$[$0 - 6], $$[$0 - 4]);
                break;

              case 6:
                reportBNF.push('&lt;OBJETO&gt; ::= lt identifier &lt;LATRIBUTOS&gt; gt &lt;LISTA_ID_OBJETO&gt; lt div identifier gt');
                reportBNF2.push('Objeto = new Objeto(id,texto,linea, columna,atributos,[])');
                this.$ = new Objeto($$[$0 - 7], $$[$0 - 4], _$[$0 - 8].first_line, _$[$0 - 8].first_column, $$[$0 - 6], []);
                break;

              case 7:
                reportBNF.push('&lt;OBJETO&gt; ::= lt identifier &lt;LATRIBUTOS&gt; div gt');
                reportBNF2.push('Objeto = new Objeto(id,\'\',linea, columna,atributos,[])');
                this.$ = new Objeto($$[$0 - 3], '', _$[$0 - 4].first_line, _$[$0 - 4].first_column, $$[$0 - 2], []);
                break;

              case 8:
                reportBNF.push('&lt;LATRIBUTOS&gt; ::= &lt;ATRIBUTOS&gt;');
                reportBNF2.push('Lista_Atributos.val = Atributos.val');
                this.$ = $$[$0];
                break;

              case 9:
                reportBNF.push('&lt;LATRIBUTOS&gt; ::= /*vacio*/');
                reportBNF2.push('Lista_Atributos.val = [] ');
                this.$ = [];
                break;

              case 10:
                reportBNF.push('&lt;ATRIBUTOS&gt; ::= &lt;ATRIBUTOS&gt; &lt;ATRIBUTO&gt;');
                reportBNF2.push('Atributos.val = Atributos.push(Atributo)');
                $$[$0 - 1].push($$[$0]);
                this.$ = $$[$0 - 1];
                /*revisar*/

                break;

              case 11:
                reportBNF.push('&lt;ATRIBUTOS&gt; ::= &lt;ATRIBUTO&gt;');
                reportBNF2.push('Atributos.val = Atributo.val');
                this.$ = [$$[$0]];
                break;

              case 12:
                reportBNF.push('&lt;ATRIBUTO&gt; ::= identifier asig StringLiteral');
                reportBNF2.push('Atributo = new Atributo(id, valor, fila, columna)');
                this.$ = new Atributo($$[$0 - 2], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 13:
                reportBNF.push('&lt;OBJETOS&gt; ::= &lt;OBJETOS&gt; &lt;OBJETO&gt;');
                reportBNF2.push('Objetos.val = Objetos.push(Objeto)');
                $$[$0 - 1].push($$[$0]);
                this.$ = $$[$0 - 1];
                break;

              case 14:
                reportBNF.push('&lt;OBJETOS&gt; ::= &lt;OBJETO&gt;');
                reportBNF2.push('Objetos.val = Objeto.val');
                this.$ = [$$[$0]];
                break;

              case 15:
                reportBNF.push('&lt;LISTA_ID_OBJETO&gt; ::= &lt;LISTA_ID_OBJETO&gt; &lt;LISTA_VALORES&gt;');
                reportBNF2.push('Lista_Id_Objeto.val = Lista_Id_Objeto.val + \' \' + Lista_Id_Objeto.val');
                this.$ = $$[$0 - 1] + ' ' + $$[$0];
                break;

              case 16:
                reportBNF.push('&lt;LISTA_ID_OBJETO&gt; ::= &lt;LISTA_VALORES&gt;');
                reportBNF2.push('Lista_Id_Objeto.val = Lista_valores.val');
                this.$ = $$[$0];
                break;

              case 17:
              case 18:
              case 19:
              case 20:
              case 21:
              case 22:
                this.$ = $$[$0];
                break;

              case 23:
              case 24:
              case 25:
              case 26:
              case 27:
              case 28:
              case 29:
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
                this.$ = $$[$0];
                break;

              case 43:
                this.$ = '<';
                break;

              case 44:
                this.$ = '>';
                break;

              case 45:
                this.$ = '&';
                break;

              case 46:
                this.$ = '\'';
                break;

              case 47:
                this.$ = '"';
                break;
            }
          },
          table: [{
            3: 1,
            4: 2,
            6: 3,
            7: 4,
            8: $V0
          }, {
            1: [3]
          }, {
            5: [1, 6],
            6: 7,
            7: 4,
            8: $V0
          }, o($V1, [2, 3]), o($V1, [2, 4]), {
            9: $V2
          }, {
            1: [2, 1]
          }, o($V1, [2, 2]), o($V3, [2, 9], {
            10: 9,
            15: 10,
            16: 11,
            9: $V4
          }), {
            11: [1, 13],
            13: [1, 14]
          }, o($V3, [2, 8], {
            16: 15,
            9: $V4
          }), o($V5, [2, 11]), {
            17: [1, 16]
          }, {
            7: 19,
            8: $V0,
            9: $V6,
            12: 17,
            13: $V7,
            14: 18,
            17: $V8,
            18: $V9,
            19: 20,
            20: $Va,
            21: $Vb,
            22: $Vc,
            23: 26,
            24: $Vd,
            25: $Ve,
            26: $Vf,
            27: $Vg,
            28: $Vh,
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
            46: $Vz
          }, {
            11: [1, 52]
          }, o($V5, [2, 10]), {
            18: [1, 53]
          }, {
            7: 55,
            8: [1, 54]
          }, {
            8: [1, 56],
            9: $V6,
            13: $V7,
            17: $V8,
            18: $V9,
            19: 57,
            20: $Va,
            21: $Vb,
            22: $Vc,
            23: 26,
            24: $Vd,
            25: $Ve,
            26: $Vf,
            27: $Vg,
            28: $Vh,
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
            46: $Vz
          }, {
            8: [2, 14]
          }, o($VA, [2, 16]), o($VA, [2, 17]), o($VA, [2, 18]), o($VA, [2, 19]), o($VA, [2, 20]), o($VA, [2, 21]), o($VA, [2, 22]), o($VA, [2, 23]), o($VA, [2, 24]), o($VA, [2, 25]), o($VA, [2, 26]), o($VA, [2, 27]), o($VA, [2, 28]), o($VA, [2, 29]), o($VA, [2, 30]), o($VA, [2, 31]), o($VA, [2, 32]), o($VA, [2, 33]), o($VA, [2, 34]), o($VA, [2, 35]), o($VA, [2, 36]), o($VA, [2, 37]), o($VA, [2, 38]), o($VA, [2, 39]), o($VA, [2, 40]), o($VA, [2, 41]), o($VA, [2, 42]), o($VA, [2, 43]), o($VA, [2, 44]), o($VA, [2, 45]), o($VA, [2, 46]), o($VA, [2, 47]), o($V1, [2, 7]), o($V5, [2, 12]), {
            9: $V2,
            13: [1, 58]
          }, {
            8: [2, 13]
          }, {
            13: [1, 59]
          }, o($VA, [2, 15]), {
            9: [1, 60]
          }, {
            9: [1, 61]
          }, {
            11: [1, 62]
          }, {
            11: [1, 63]
          }, o($V1, [2, 5]), o($V1, [2, 6])],
          defaultActions: {
            6: [2, 1],
            19: [2, 14],
            55: [2, 13]
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
                  return 42;
                  break;

                case 6:
                  return 43;
                  break;

                case 7:
                  return 44;
                  break;

                case 8:
                  return 45;
                  break;

                case 9:
                  return 46;
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
                  return 24;
                  break;

                case 14:
                  return 25;
                  break;

                case 15:
                  return 26;
                  break;

                case 16:
                  return 13;
                  break;

                case 17:
                  return 27;
                  break;

                case 18:
                  return 'lte';
                  break;

                case 19:
                  return 'gte';
                  break;

                case 20:
                  return 8;
                  break;

                case 21:
                  return 11;
                  break;

                case 22:
                  return 17;
                  break;

                case 23:
                  return 28;
                  break;

                case 24:
                  return 29;
                  break;

                case 25:
                  return 30;
                  break;

                case 26:
                  return 31;
                  break;

                case 27:
                  return 32;
                  break;

                case 28:
                  return 33;
                  break;

                case 29:
                  return 41;
                  break;

                case 30:
                  return 40;
                  break;

                case 31:
                  return 34;
                  break;

                case 32:
                  return 35;
                  break;

                case 33:
                  return 36;
                  break;

                case 34:
                  return 37;
                  break;

                case 35:
                  return 38;
                  break;

                case 36:
                  return 39;
                  break;

                case 37:
                  return 21;
                  break;

                case 38:
                  return 20;
                  break;

                case 39:
                  return 9;
                  break;

                case 40:
                  return 18;
                  break;

                case 41:
                  return 22;
                  break;

                case 42:
                  console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                  break;

                case 43:
                  return 5;
                  break;
              }
            },
            rules: [/^(?:\/\/.*)/i, /^(?:<!--)/i, /^(?:-->)/i, /^(?:.)/i, /^(?:\s+)/i, /^(?:&lt;)/i, /^(?:&gt;)/i, /^(?:&amp;)/i, /^(?:&apos;)/i, /^(?:&quot;)/i, /^(?:null\b)/i, /^(?:true\b)/i, /^(?:false\b)/i, /^(?:\+)/i, /^(?:-)/i, /^(?:\*)/i, /^(?:\/)/i, /^(?:%)/i, /^(?:<=)/i, /^(?:>=)/i, /^(?:<)/i, /^(?:>)/i, /^(?:=)/i, /^(?:==)/i, /^(?:!=)/i, /^(?:&&)/i, /^(?:\|\|)/i, /^(?:!)/i, /^(?:;)/i, /^(?:,)/i, /^(?:\.)/i, /^(?:\()/i, /^(?:\))/i, /^(?:\{)/i, /^(?:\})/i, /^(?:\[)/i, /^(?:\])/i, /^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/i, /^(?:[0-9]+)/i, /^(?:[a-zA-Z_][a-zA-Z0-9_ñÑ]*)/i, /^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/i, /^(?:('((\\([\'\"\\bfnrtv]))|([^\'\\]))'))/i, /^(?:.)/i, /^(?:$)/i],
            conditions: {
              "comment": {
                "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
                "inclusive": true
              },
              "INITIAL": {
                "rules": [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
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
          var reporteBNF = gramBnf.getBNFReport(); //console.log('--------', gramBnf.getBNFReport() );
          // DOT CST

          var reporteCST = arbolCST.generarArbolCST(salidaG.objetos);
          var ret = {
            tablaRep: reporteTabla,
            bnfRep: reporteBNF,
            cstRep: reporteCST
          };
          return ret;
        }
      }]);

      return AnalizadorASCXML;
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
            $V8 = [2, 43],
            $V9 = [1, 14],
            $Va = [1, 18],
            $Vb = [1, 20],
            $Vc = [1, 21],
            $Vd = [1, 22],
            $Ve = [1, 23],
            $Vf = [1, 25],
            $Vg = [1, 26],
            $Vh = [1, 27],
            $Vi = [1, 28],
            $Vj = [1, 29],
            $Vk = [1, 30],
            $Vl = [1, 31],
            $Vm = [1, 32],
            $Vn = [1, 33],
            $Vo = [1, 34],
            $Vp = [1, 35],
            $Vq = [1, 36],
            $Vr = [8, 12, 16, 17, 19, 25, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
            $Vs = [2, 13],
            $Vt = [1, 48],
            $Vu = [1, 47],
            $Vv = [1, 51],
            $Vw = [1, 45],
            $Vx = [1, 46],
            $Vy = [1, 49],
            $Vz = [1, 50],
            $VA = [1, 60],
            $VB = [1, 59],
            $VC = [1, 61],
            $VD = [1, 81],
            $VE = [1, 90],
            $VF = [1, 79],
            $VG = [1, 80],
            $VH = [1, 82],
            $VI = [1, 83],
            $VJ = [1, 84],
            $VK = [1, 85],
            $VL = [1, 86],
            $VM = [1, 87],
            $VN = [1, 88],
            $VO = [1, 91],
            $VP = [16, 23, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
            $VQ = [5, 6, 14, 16, 23, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
            $VR = [1, 126],
            $VS = [1, 124],
            $VT = [1, 125],
            $VU = [1, 127],
            $VV = [16, 23, 42, 45, 46, 47, 48, 49, 50, 51, 52, 53],
            $VW = [23, 42, 46, 47, 48, 49, 50, 51, 52, 53],
            $VX = [23, 42, 50, 51, 52, 53];

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
            "DERIVACIONPATHS": 15,
            "tk_asterisco": 16,
            "tk_node": 17,
            "DERIVADOS": 18,
            "tk_arroba": 19,
            "ATRIBUTO": 20,
            "COMPLEMENTOATRIBUTO": 21,
            "AXES": 22,
            "tk_igual": 23,
            "tk_stringTexto": 24,
            "tk_child": 25,
            "tk_dosPuntos": 26,
            "NODETEST": 27,
            "tk_descendant": 28,
            "tk_descendatOr": 29,
            "tk_ancestor": 30,
            "tk_ancestorOr": 31,
            "tk_attribute": 32,
            "tk_following": 33,
            "tk_followingSi": 34,
            "tk_parent": 35,
            "tk_preceding": 36,
            "tk_precedingSi": 37,
            "tk_self": 38,
            "tk_text": 39,
            "tk_llaveA": 40,
            "EXPRESION": 41,
            "tk_llaveC": 42,
            "tk_mas": 43,
            "tk_menos": 44,
            "tk_div": 45,
            "tk_menor": 46,
            "tk_mayor": 47,
            "tk_menorIgual": 48,
            "tk_mayorIgual": 49,
            "tk_or": 50,
            "tk_and": 51,
            "tk_mod": 52,
            "tk_distinto": 53,
            "tk_entero": 54,
            "tk_decimal": 55,
            "tk_position": 56,
            "tk_last": 57,
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
            19: "tk_arroba",
            23: "tk_igual",
            24: "tk_stringTexto",
            25: "tk_child",
            26: "tk_dosPuntos",
            28: "tk_descendant",
            29: "tk_descendatOr",
            30: "tk_ancestor",
            31: "tk_ancestorOr",
            32: "tk_attribute",
            33: "tk_following",
            34: "tk_followingSi",
            35: "tk_parent",
            36: "tk_preceding",
            37: "tk_precedingSi",
            38: "tk_self",
            39: "tk_text",
            40: "tk_llaveA",
            42: "tk_llaveC",
            43: "tk_mas",
            44: "tk_menos",
            45: "tk_div",
            46: "tk_menor",
            47: "tk_mayor",
            48: "tk_menorIgual",
            49: "tk_mayorIgual",
            50: "tk_or",
            51: "tk_and",
            52: "tk_mod",
            53: "tk_distinto",
            54: "tk_entero",
            55: "tk_decimal",
            56: "tk_position",
            57: "tk_last"
          },
          productions_: [0, [3, 2], [4, 3], [4, 1], [7, 4], [7, 3], [7, 2], [7, 3], [7, 3], [7, 3], [9, 1], [9, 2], [11, 3], [11, 0], [15, 3], [15, 1], [10, 2], [10, 2], [10, 2], [10, 3], [10, 1], [18, 1], [18, 2], [18, 1], [21, 2], [21, 0], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [27, 2], [27, 2], [27, 2], [27, 1], [13, 3], [13, 0], [41, 3], [41, 3], [41, 3], [41, 3], [41, 3], [41, 3], [41, 3], [41, 3], [41, 3], [41, 3], [41, 3], [41, 3], [41, 3], [41, 1], [41, 1], [41, 2], [41, 1], [41, 1], [41, 1], [41, 1], [20, 1], [20, 1], [20, 1]],
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
                var a = {
                  "hola": tokenList
                };
                return a;
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
            40: $V9
          }), {
            8: $Va,
            10: 19,
            12: $Vb,
            14: [1, 16],
            15: 15,
            16: $Vc,
            17: $Vd,
            18: 17,
            19: $Ve,
            22: 24,
            25: $Vf,
            28: $Vg,
            29: $Vh,
            30: $Vi,
            31: $Vj,
            32: $Vk,
            33: $Vl,
            34: $Vm,
            35: $Vn,
            36: $Vo,
            37: $Vp,
            38: $Vq
          }, o($V7, $V8, {
            13: 37,
            40: $V9
          }), o($V7, $V8, {
            13: 38,
            40: $V9
          }), {
            1: [2, 1]
          }, {
            4: 39,
            7: 3,
            8: $V0,
            12: $V1,
            14: $V2,
            16: $V3,
            17: $V4
          }, {
            10: 40,
            12: $Vb,
            16: $Vc,
            17: $Vd,
            19: $Ve,
            22: 24,
            25: $Vf,
            28: $Vg,
            29: $Vh,
            30: $Vi,
            31: $Vj,
            32: $Vk,
            33: $Vl,
            34: $Vm,
            35: $Vn,
            36: $Vo,
            37: $Vp,
            38: $Vq
          }, o($Vr, [2, 10], {
            14: [1, 41]
          }), o($V5, $Vs, {
            11: 42,
            9: 43,
            14: $V6
          }), {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 44,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, o($V5, [2, 6]), {
            8: $Va,
            10: 19,
            12: $Vb,
            15: 52,
            16: $Vc,
            17: $Vd,
            18: 17,
            19: $Ve,
            22: 24,
            25: $Vf,
            28: $Vg,
            29: $Vh,
            30: $Vi,
            31: $Vj,
            32: $Vk,
            33: $Vl,
            34: $Vm,
            35: $Vn,
            36: $Vo,
            37: $Vp,
            38: $Vq
          }, o($V5, [2, 15], {
            9: 53,
            14: $V6
          }), o($V7, [2, 21], {
            8: [1, 54]
          }), o($V7, [2, 23]), o($V7, $V8, {
            13: 55,
            40: $V9
          }), o($V7, $V8, {
            13: 56,
            40: $V9
          }), o($V7, $V8, {
            13: 57,
            40: $V9
          }), {
            12: $VA,
            16: $VB,
            17: $VC,
            20: 58
          }, o($V7, [2, 20]), {
            26: [1, 62]
          }, {
            26: [1, 63]
          }, {
            26: [1, 64]
          }, {
            26: [1, 65]
          }, {
            26: [1, 66]
          }, {
            26: [1, 67]
          }, {
            26: [1, 68]
          }, {
            26: [1, 69]
          }, {
            26: [1, 70]
          }, {
            26: [1, 71]
          }, {
            26: [1, 72]
          }, {
            26: [1, 73]
          }, o($V5, $Vs, {
            9: 43,
            11: 74,
            14: $V6
          }), o($V5, $Vs, {
            9: 43,
            11: 75,
            14: $V6
          }), o($V5, [2, 2]), o($V5, $Vs, {
            9: 43,
            11: 76,
            14: $V6
          }), o($Vr, [2, 11]), o($V5, [2, 5]), {
            8: $Va,
            10: 19,
            12: $Vb,
            16: $Vc,
            17: $Vd,
            18: 77,
            19: $Ve,
            22: 24,
            25: $Vf,
            28: $Vg,
            29: $Vh,
            30: $Vi,
            31: $Vj,
            32: $Vk,
            33: $Vl,
            34: $Vm,
            35: $Vn,
            36: $Vo,
            37: $Vp,
            38: $Vq
          }, {
            16: $VD,
            23: $VE,
            42: [1, 78],
            43: $VF,
            44: $VG,
            45: $VH,
            46: $VI,
            47: $VJ,
            48: $VK,
            49: $VL,
            50: $VM,
            51: $VN,
            52: [1, 89],
            53: $VO
          }, o($VP, [2, 57]), o($VP, [2, 58]), {
            12: $VA,
            16: $VB,
            17: $VC,
            20: 92
          }, o($VP, [2, 60]), o($VP, [2, 61]), o($VP, [2, 62]), o($VP, [2, 63]), o($V5, [2, 7]), {
            8: $Va,
            10: 19,
            12: $Vb,
            15: 93,
            16: $Vc,
            17: $Vd,
            18: 17,
            19: $Ve,
            22: 24,
            25: $Vf,
            28: $Vg,
            29: $Vh,
            30: $Vi,
            31: $Vj,
            32: $Vk,
            33: $Vl,
            34: $Vm,
            35: $Vn,
            36: $Vo,
            37: $Vp,
            38: $Vq
          }, o($V7, [2, 22]), o($V7, [2, 16]), o($V7, [2, 17]), o($V7, [2, 18]), o($V7, [2, 25], {
            21: 94,
            23: [1, 95]
          }), o($VQ, [2, 64]), o($VQ, [2, 65]), o($VQ, [2, 66]), {
            26: [1, 96]
          }, {
            26: [1, 97]
          }, {
            26: [1, 98]
          }, {
            26: [1, 99]
          }, {
            26: [1, 100]
          }, {
            26: [1, 101]
          }, {
            26: [1, 102]
          }, {
            26: [1, 103]
          }, {
            26: [1, 104]
          }, {
            26: [1, 105]
          }, {
            26: [1, 106]
          }, {
            26: [1, 107]
          }, o($V5, [2, 8]), o($V5, [2, 9]), o($V5, [2, 4]), o($V5, $Vs, {
            9: 43,
            11: 108,
            14: $V6
          }), o($V7, [2, 42]), {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 109,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 110,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 111,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 112,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 113,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 114,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 115,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 116,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 117,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 118,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 119,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 120,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, {
            12: $Vt,
            19: $Vu,
            24: $Vv,
            41: 121,
            54: $Vw,
            55: $Vx,
            56: $Vy,
            57: $Vz
          }, o($VP, [2, 59]), o($V5, [2, 14]), o($V7, [2, 19]), {
            24: [1, 122]
          }, {
            12: $VR,
            16: $VS,
            17: $VT,
            27: 123,
            39: $VU
          }, {
            12: $VR,
            16: $VS,
            17: $VT,
            27: 128,
            39: $VU
          }, {
            12: $VR,
            16: $VS,
            17: $VT,
            27: 129,
            39: $VU
          }, {
            12: $VR,
            16: $VS,
            17: $VT,
            27: 130,
            39: $VU
          }, {
            12: $VR,
            16: $VS,
            17: $VT,
            27: 131,
            39: $VU
          }, {
            12: $VR,
            16: $VS,
            17: $VT,
            27: 132,
            39: $VU
          }, {
            12: $VR,
            16: $VS,
            17: $VT,
            27: 133,
            39: $VU
          }, {
            12: $VR,
            16: $VS,
            17: $VT,
            27: 134,
            39: $VU
          }, {
            12: $VR,
            16: $VS,
            17: $VT,
            27: 135,
            39: $VU
          }, {
            12: $VR,
            16: $VS,
            17: $VT,
            27: 136,
            39: $VU
          }, {
            12: $VR,
            16: $VS,
            17: $VT,
            27: 137,
            39: $VU
          }, {
            12: $VR,
            16: $VS,
            17: $VT,
            27: 138,
            39: $VU
          }, o($V5, [2, 12]), o($VP, [2, 44]), o($VP, [2, 45]), o($VV, [2, 46], {
            43: $VF,
            44: $VG
          }), o($VV, [2, 47], {
            43: $VF,
            44: $VG
          }), o($VW, [2, 48], {
            16: $VD,
            43: $VF,
            44: $VG,
            45: $VH
          }), o($VW, [2, 49], {
            16: $VD,
            43: $VF,
            44: $VG,
            45: $VH
          }), o($VW, [2, 50], {
            16: $VD,
            43: $VF,
            44: $VG,
            45: $VH
          }), o($VW, [2, 51], {
            16: $VD,
            43: $VF,
            44: $VG,
            45: $VH
          }), o([42, 50, 52], [2, 52], {
            16: $VD,
            23: $VE,
            43: $VF,
            44: $VG,
            45: $VH,
            46: $VI,
            47: $VJ,
            48: $VK,
            49: $VL,
            51: $VN,
            53: $VO
          }), o([42, 50, 51, 52], [2, 53], {
            16: $VD,
            23: $VE,
            43: $VF,
            44: $VG,
            45: $VH,
            46: $VI,
            47: $VJ,
            48: $VK,
            49: $VL,
            53: $VO
          }), o([42, 52], [2, 54], {
            16: $VD,
            23: $VE,
            43: $VF,
            44: $VG,
            45: $VH,
            46: $VI,
            47: $VJ,
            48: $VK,
            49: $VL,
            50: $VM,
            51: $VN,
            53: $VO
          }), o($VX, [2, 55], {
            16: $VD,
            43: $VF,
            44: $VG,
            45: $VH,
            46: $VI,
            47: $VJ,
            48: $VK,
            49: $VL
          }), o($VX, [2, 56], {
            16: $VD,
            43: $VF,
            44: $VG,
            45: $VH,
            46: $VI,
            47: $VJ,
            48: $VK,
            49: $VL
          }), o($V7, [2, 24]), o($V7, [2, 26]), o($V7, $V8, {
            13: 139,
            40: $V9
          }), o($V7, $V8, {
            13: 140,
            40: $V9
          }), o($V7, $V8, {
            13: 141,
            40: $V9
          }), o($V7, [2, 41]), o($V7, [2, 27]), o($V7, [2, 28]), o($V7, [2, 29]), o($V7, [2, 30]), o($V7, [2, 31]), o($V7, [2, 32]), o($V7, [2, 33]), o($V7, [2, 34]), o($V7, [2, 35]), o($V7, [2, 36]), o($V7, [2, 37]), o($V7, [2, 38]), o($V7, [2, 39]), o($V7, [2, 40])],
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
        var tokenList = [];
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
                  return "tk_stringTexto";
                  break;

                case 39:
                  return "tk_stringTexto";
                  break;

                case 40:
                  return "tk_stringTexto";
                  break;

                case 41:
                  return "tk_stringTexto";
                  break;

                case 42:
                  tokenList.push("tk_identificador");
                  return "tk_identificador";
                  break;

                case 43:
                  return "EOF";
                  break;

                case 44:
                  break;

                case 45:
                  break;
              }
            },
            rules: [/^(?:[0-9]+(\.[0-9]+)\b)/, /^(?:[0-9]+\b)/, /^(?:node\(\))/, /^(?:child\b)/, /^(?:descendant\b)/, /^(?:descendant-or-self\b)/, /^(?:ancestor\b)/, /^(?:ancestor-or-self\b)/, /^(?:attribute\b)/, /^(?:following\b)/, /^(?:following-sibling\b)/, /^(?:parent\b)/, /^(?:preceding\b)/, /^(?:preceding-sibling\b)/, /^(?:self\b)/, /^(?:text\(\))/, /^(?:position\(\))/, /^(?:last\(\))/, /^(?:div\b)/, /^(?:and\b)/, /^(?:or\b)/, /^(?:mod\b)/, /^(?:\|)/, /^(?:\.)/, /^(?:\/)/, /^(?:\*)/, /^(?::)/, /^(?:\+)/, /^(?:-)/, /^(?:<=)/, /^(?:>=)/, /^(?:<)/, /^(?:>)/, /^(?:!=)/, /^(?:=)/, /^(?:\[)/, /^(?:\])/, /^(?:@)/, /^(?:"[^\"]*")/, /^(?:“[^\“]*“)/, /^(?:'[^\']*')/, /^(?:‘[^\‘]*‘)/, /^(?:[a-zA-Z]([a-zA-Z0-9_])*)/, /^(?:$)/, /^(?:[ \t\r\n\f])/, /^(?:.)/],
            conditions: {
              "INITIAL": {
                "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
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

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"], _paginas_tabla_xml_tabla_xml_component__WEBPACK_IMPORTED_MODULE_15__["TablaXMLComponent"], _paginas_principal_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"], _paginas_grafico_grafico_component__WEBPACK_IMPORTED_MODULE_17__["GraficoComponent"]],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_9__["MatMenuModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"], _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_12__["CodemirrorModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormsModule"], ngx_material_file_input__WEBPACK_IMPORTED_MODULE_14__["MaterialFileInputModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_16__["MatTableModule"]],
      providers: [_reporte_service__WEBPACK_IMPORTED_MODULE_3__["ReporteService"]],
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
    })], AppModule);
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
          console.log(localStorage.getItem("CSTxml"));
          var DOTstring = localStorage.getItem("CSTxml");
          ;
          var parsedData = vis__WEBPACK_IMPORTED_MODULE_2__["network"].convertDot(DOTstring);
          var data = {
            nodes: parsedData.nodes,
            edges: parsedData.edges
          };
          var options = parsedData.options; // you can extend the options like a normal JSON variable:

          options.nodes = {
            color: "red"
          };
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
      selector: 'grafico-root',
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


    var _analizadores_xpathAsc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../../analizadores/xpathAsc */
    "./src/analizadores/xpathAsc.js");
    /* harmony import */


    var _analizadores_xpathAsc__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_analizadores_xpathAsc__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */


    var _analizadorXML_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../../analizadorXML/index */
    "./src/analizadorXML/index.ts");
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

        this.xmlEntrada = "<bookstore>\n  <book>\n    <title lang=\"en\">Harry Potter</title>\n    <price>29.99</price>\n  </book>\n  <book1>\n    <title lang=\"en\">Learning XML</title>\n    <price>39.95</price>\n  </book1>\n</bookstore>";
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
        };
      }

      _createClass(HomeComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          console.log(_analizadores_xpathAsc__WEBPACK_IMPORTED_MODULE_2__["parse"]("hola"));
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
          var ascXML = new _analizadorXML_index__WEBPACK_IMPORTED_MODULE_3__["AnalizadorASCXML"]();
          var ret = ascXML.ejecutarCodigo(this.xmlEntrada);
          localStorage.setItem('tablaXML', JSON.stringify(ret.tablaRep));
          localStorage.setItem('CSTxml', ret.cstRep); //this._servicio.llenarTablaXML(ret.tablaRep);
          //console.log(retorno);
        }
      }, {
        key: "reporteTablaSimbolosXML",
        value: function reporteTablaSimbolosXML() {
          window.open("tablaSimbolosXML", "_blank");
        }
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

        this.displayedColumns = ['no', 'nombre', 'tipo', 'valor', 'ambito', 'fila', 'columna'];
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
//# sourceMappingURL=main-es5.a0d9b16410899d9f63e6.js.map