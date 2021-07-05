function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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


    __webpack_exports__["default"] = "<div id = \"barra\">\n  <mat-toolbar color = \"warn\">\n    <span>Tytus X</span>\n\n    <div class = \"spacer\"></div>\n\n    <button mat-raised-button color = \"accent\" [matMenuTriggerFor] = \"archivo\">Archivo</button>\n    <mat-menu #archivo = \"matMenu\">\n        <button mat-menu-item>\n            <mat-icon>attach_file</mat-icon>\n            <label for = \"file\">Abrir XML</label>\n            <input type = \"file\"\n            id = \"file\"\n            class = \"hidend\"\n            (change) = \"abrirXML($event.target.files)\">\n        </button>\n        <button mat-menu-item>\n            <mat-icon>attach_file</mat-icon>\n            <span>Abrir XPath</span>\n        </button>\n        <button mat-menu-item>\n            <mat-icon>delete</mat-icon>\n            <span>Limpiar</span>\n        </button>\n    </mat-menu>\n\n    <button mat-raised-button color = \"accent\" [matMenuTriggerFor] = \"ejecutar\">Ejecutar</button>\n    <mat-menu #ejecutar = \"matMenu\">\n        <button mat-menu-item (click) = \"ejecutarAscendente()\">\n            <mat-icon>keyboard_arrow_up</mat-icon>\n            <span>Ascendete XPATH</span>\n        </button>\n        <button mat-menu-item (click) = \"ejecutarDescendente()\"> \n            <mat-icon>keyboard_arrow_down</mat-icon>\n            <span>Descendente XPATH</span>\n        </button>\n        <button mat-menu-item (click) = \"ejecutarXquery()\"> \n          <mat-icon>keyboard_arrow_up</mat-icon>\n          <span>Ascendete XQUERY</span>\n        </button>\n        <button mat-menu-item (click) = \"optimizar3D()\"> \n          <span>Optimizar 3D</span>\n        </button>\n    </mat-menu>\n\n    <button mat-raised-button color = \"accent\" [matMenuTriggerFor] = \"reporte\">Reportes</button>\n    <mat-menu #reporte = \"matMenu\">\n        <button mat-menu-item (click) = \"reporteTablaSimbolosXML()\">\n            <span>Tabla de simbolos XML</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteCSTXML()\">\n          <span>CST XML</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteASTXPATH()\">\n          <span>AST XPATH</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteCSTXPATH()\">\n          <span>CST XPATH</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteBNFXML()\">\n          <span>BNF XML</span>\n        </button>  \n        <button mat-menu-item (click) = \"reporteBNFXPATH()\">\n          <span>BNF XPATH</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteErroresXPATH()\">\n          <span>Errores XPATH</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteErroresXML()\">\n          <span>Errores XML</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteCSTXQUERY()\">\n          <span>CST XQUERY</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteASTXQUERY()\">\n          <span>AST XQUERY</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteBNFXQUERY()\">\n          <span>BNF XQUERY</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteTablaXQUERY()\">\n          <span>Tabla XQUERY</span>\n        </button>\n        <button mat-menu-item (click) = \"reporteOpt()\">\n          <span>Optimizacion 3D</span>\n        </button>\n      </mat-menu>\n</mat-toolbar>\n</div>\n\n<div id = \"superior\">\n  <ngx-codemirror\n    [options] = \"editorQueryOptions\"\n    [(ngModel)] = \"querys\">\n  </ngx-codemirror>\n</div>\n\n<div id = \"separador1\"></div>\n\n<div id = \"inferior\">\n  <div id = \"izquierda\">\n    <div id = \"superior3\">\n    <ngx-codemirror\n      [options] = \"editorXMLEntradaOptions\"\n      [(ngModel)] = \"xmlEntrada\">\n    </ngx-codemirror>\n  </div>\n    <div id = \"separador4\"></div>\n    <div id = \"inferior3\">\n    <ngx-codemirror\n    [options] = \"editorXMLSalidaOptions\"\n    [(ngModel)] = \"xmlSalida\">\n  </ngx-codemirror>\n</div>  \n</div>\n  <div id = \"separador2\"></div>\n  <div id = \"derecha\">\n    <div id = \"superior2\">\n    <ngx-codemirror\n      [options] = \"editor3DSalidaOptions\"\n      [(ngModel)] = \"salida3D\">\n    </ngx-codemirror>\n    </div>\n    <div id = \"separador3\"></div>\n    <div id = \"inferior2\">\n      <ngx-codemirror\n      [options] = \"editor3DSalidaOptions\"\n      [(ngModel)] = \"salida3DOpt\">\n    </ngx-codemirror>\n    </div>  \n  </div> \n</div>\n\n<div id = \"grafo\" *ngIf=\"grafo == true\">\n  <app-grafico></app-grafico>\n</div>\n\n<div id = \"tablaS\" *ngIf = \"tabla == true\">\n  <app-tabla-xml></app-tabla-xml>\n</div>\n\n<div id = \"bnf\" *ngIf = \"bnf == true\">\n  <app-bnf></app-bnf>\n</div>\n\n<div id = \"bnf\" *ngIf = \"error == true\">\n  <app-tabla-errores></app-tabla-errores>\n</div>\n\n<div id = \"tablaS2\" *ngIf = \"tabla2 == true\">\n  <app-tabla-xquery></app-tabla-xquery>\n</div>\n\n<div id = \"opt\" *ngIf = \"opt == true\">\n  <app-tabla-opt></app-tabla-opt>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/tabla-errores/tabla-errores.component.html":
  /*!**********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/tabla-errores/tabla-errores.component.html ***!
    \**********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPaginasTablaErroresTablaErroresComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<table mat-table [dataSource]=\"simbolos\" class=\"mat-elevation-z8\">\n\n    <!--- Note that these columns can be defined in any order.\n    The actual rendered columns are set as a property on the row definition\" -->\n    <!-- Position Column -->\n    <ng-container matColumnDef=\"no\">\n      <th mat-header-cell *matHeaderCellDef> No. </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.no}} </td>\n    </ng-container>\n\n    <!-- Weight Column -->\n    <ng-container matColumnDef=\"tipo\">\n      <th mat-header-cell *matHeaderCellDef> Tipo </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.tipo}} </td>\n    </ng-container>\n\n    <!-- Symbol Column -->\n    <ng-container matColumnDef=\"valor\">\n      <th mat-header-cell *matHeaderCellDef> Valor </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.valor}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"fila\">\n        <th mat-header-cell *matHeaderCellDef> Fila </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.linea}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"columna\">\n        <th mat-header-cell *matHeaderCellDef> Columna </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.columna}} </td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n</table>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/tabla-opt/tabla-opt.component.html":
  /*!**************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/tabla-opt/tabla-opt.component.html ***!
    \**************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPaginasTablaOptTablaOptComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<table mat-table [dataSource]=\"simbolos\" class=\"mat-elevation-z8\">\n\n    <!--- Note that these columns can be defined in any order.\n    The actual rendered columns are set as a property on the row definition\" -->\n    <!-- Position Column -->\n    <ng-container matColumnDef=\"no\">\n      <th mat-header-cell *matHeaderCellDef> Regla optimizada </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element}} </td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n</table>";
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
  "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/tabla-xquery/tabla-xquery.component.html":
  /*!********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/tabla-xquery/tabla-xquery.component.html ***!
    \********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPaginasTablaXqueryTablaXqueryComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<table mat-table [dataSource]=\"simbolos\" class=\"mat-elevation-z8\">\n\n    <!--- Note that these columns can be defined in any order.\n    The actual rendered columns are set as a property on the row definition\" -->\n    <!-- Position Column -->\n\n    <!-- Name Column -->\n    <ng-container matColumnDef=\"nombre\">\n      <th mat-header-cell *matHeaderCellDef> Nombre </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.id}} </td>\n    </ng-container>\n\n    <!-- Weight Column -->\n    <ng-container matColumnDef=\"tipo\">\n      <th mat-header-cell *matHeaderCellDef> Tipo </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.tipo.tipo}} </td>\n    </ng-container>\n\n    <!-- Symbol Column -->\n    <ng-container matColumnDef=\"valor\">\n      <th mat-header-cell *matHeaderCellDef> Tipo </th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.tipo2.tipo}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"fila\">\n        <th mat-header-cell *matHeaderCellDef> Fila </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.line}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"columna\">\n        <th mat-header-cell *matHeaderCellDef> Columna </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.column}} </td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n</table>";
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
  "./src/analizadorXML/Codigo3D/xml3D.ts":
  /*!*********************************************!*\
    !*** ./src/analizadorXML/Codigo3D/xml3D.ts ***!
    \*********************************************/

  /*! exports provided: xml3D */

  /***/
  function srcAnalizadorXMLCodigo3DXml3DTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "xml3D", function () {
      return xml3D;
    }); //const fs = require('fs');


    var xml3D = /*#__PURE__*/function () {
      function xml3D() {
        _classCallCheck(this, xml3D);

        this.salida3D = '';
        this.tmpArray = [];
        this.contadorSalidas = 0;
        this.contadorEtiqueta = 0;
        this.contadort4 = 0;
        this.contadort5 = 0;
        this.contadorStack = 0;
      } //Construccion del codigo 3D en C

      /*
      EJEMPLO LLAMADA:
      const dir = new xml3D();
      dir.getNodesByFilters(salidaG.objetos,lError.validateEtiquetas(salidaG.objetos).length,busqueda.returnListValues());
      */


      _createClass(xml3D, [{
        key: "getNodesByFilters",
        value: function getNodesByFilters(objects) {
          var validationEt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var xpath = arguments.length > 2 ? arguments[2] : undefined;
          var definiciones = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
          this.salida3D += "\n#include <stdio.h>\n#include <locale.h>\n#include <stdlib.h>\n\n\n\nint STACK[30101999];\nint HEAP[30101999];\nint H = 0;\nint S = 0;\nint sp = 0;\nint t0 = 0;\nint t1 = 0;\nint t2 = 0;\nint t3 = 0;\nint t4 = 0;\nint t5 = 0;\nint t6 = 0;\nint t7 = 0;\n\nvoid imprimir(){\n\n    etiqueta_a:\n        if(HEAP[t2] == 160){\n            printf(\"\xE1\");\n            goto etiqueta_exit;\n        }\n    etiqueta_e:\n        if(HEAP[t2] == 130){\n            printf(\"\xE9\");\n            goto etiqueta_exit;\n        }\n    etiqueta_i:\n        if(HEAP[t2] == 161){\n            printf(\"\xED\");\n            goto etiqueta_exit;\n        }\n    etiqueta_o:\n        if(HEAP[t2] == 162){\n            printf(\"\xF3\");\n            goto etiqueta_exit;\n        }\n    etiqueta_u:\n        if(HEAP[t2] == 163){\n            printf(\"\xFA\");\n            goto etiqueta_exit;\n        }\n    etiqueta_n:\n        if(HEAP[t2] == 164 ){\n            printf(\"\xF1\");\n            goto etiqueta_exit;\n        }\n    imprimir_todo:\n        printf(\"%c\",  HEAP[t2]);\n        goto etiqueta_exit;\n\n    etiqueta_exit:\n        return;\n}\n\nvoid imprimir2(){\n    etiqueta_a:\n        if(HEAP[t4] == 160){\n            printf(\"\xE1\");\n            goto etiqueta_exit;\n        }\n    etiqueta_e:\n        if(HEAP[t4] == 130){\n            printf(\"\xE9\");\n            goto etiqueta_exit;\n        }\n    etiqueta_i:\n        if(HEAP[t4] == 161){\n            printf(\"\xED\");\n            goto etiqueta_exit;\n        }\n    etiqueta_o:\n        if(HEAP[t4] == 162){\n            printf(\"\xF3\");\n            goto etiqueta_exit;\n        }\n    etiqueta_u:\n        if(HEAP[t4] == 163){\n            printf(\"\xFA\");\n            goto etiqueta_exit;\n        }\n    etiqueta_n:\n        if(HEAP[t4] == 164 ){\n            printf(\"\xF1\");\n            goto etiqueta_exit;\n        }\n    etiqueta_neg:\n        if(HEAP[t4] == -1 ){\n            printf(\" \");\n            goto etiqueta_exit;\n        }\n    imprimir_todo:\n        printf(\"%c\",  HEAP[t4]);\n        goto etiqueta_exit;\n\n    etiqueta_exit:\n        return;\n}\n\nvoid imprimir3(){\n\n    etiqueta_a:\n        if(HEAP[t6] == 160){\n            printf(\"\xE1\");\n            goto etiqueta_exit;\n        }\n    etiqueta_e:\n        if(HEAP[t6] == 130){\n            printf(\"\xE9\");\n            goto etiqueta_exit;\n        }\n    etiqueta_i:\n        if(HEAP[t6] == 161){\n            printf(\"\xED\");\n            goto etiqueta_exit;\n        }\n    etiqueta_o:\n        if(HEAP[t6] == 162){\n            printf(\"\xF3\");\n            goto etiqueta_exit;\n        }\n    etiqueta_u:\n        if(HEAP[t6] == 163){\n            printf(\"\xFA\");\n            goto etiqueta_exit;\n        }\n    etiqueta_n:\n        if(HEAP[t6] == 164 ){\n            printf(\"\xF1\");\n            goto etiqueta_exit;\n        }\n    imprimir_todo:\n        printf(\"%c\",  HEAP[t6]);\n        goto etiqueta_exit;\n\n    etiqueta_exit:\n        return;\n}\n\n\nvoid xml(){\n    ".concat(this.salida3D += this.create3dC(this.initSearchMethod(objects)), "\n    \n\n    // ---------------------------------------- INICIO CODIGO PARA IMPRIMIR LOS VALORES XML\n    sp = t1 - 1;\n    int t4 = 0;\n    t4 = t4 + 0;\n\n    printf(\"VALORES XML:%c\",10);\n\n    etiqueta_for:\n        //printf(\"%d\",HEAP[t4]);\n        if( HEAP[t4] == -1 ){\n            printf(\"%c\", 10);            \n            goto etiqueta_for2;\n        }\n        goto etiqueta_imp;\n    etiqueta_for2:\n        t4 = t4 + 1;\n        if (t4 >= sp ) {\n            goto etiqueta_salida;\n        }\n        goto etiqueta_for;\n\n    etiqueta_imp:\n        if( HEAP[t4] == 152 ){\n            goto etiqueta_for2;\n        }\n    etiqueta_imp1:\n        if( HEAP[t4] == 153 ){\n            goto etiqueta_for2;\n        }\n    etiqueta_imp2:\n        if( HEAP[t4] == 154 ){\n            goto etiqueta_for2;\n        }\n    etiqueta_imp3:\n        t2 = t4;\n        t2 = t2 + 0;\n        imprimir();\n        goto etiqueta_for2;\n    // ---------------------------------------- FIN CODIGO PARA IMPRIMIR LOS VALORES\n\n    etiqueta_salida:\n        printf(\"Final Valores XML%c\",10);\n\n    return;\n}\n\n").concat(this.getXpath3D(xpath), "\n\n").concat(this.crear3DDecla(definiciones), "\n\n\n\n\n");
          this.salida3D += "int main() {\n    setlocale(LC_ALL,\"\");\n    int ID_0 = 0;\n    ID_0 = ".concat(validationEt, ";\n\n    if(ID_0 == 0){\n        xml();\n        goto impresion_xpath;\n    }\n    printf(\"Existe un error en las etiquetas\");\n    goto etiqueta_final;\n\n    impresion_xpath:\n        xpath();\n\n    manejo_declaraciones:\n        declaraciones();\n\n    etiqueta_final:    \n        return 0;");
          this.salida3D += "\n}"; //Crear archivo 3d .c
          // fs.appendFile('codigo3D.c', this.salida3D, (error: any) => {
          //   if (error) {
          //     throw error;
          //}
          //});

          return this.salida3D;
        } //Recorrer objetos obtenidos del analisis, para crear lista de 1d

      }, {
        key: "initSearchMethod",
        value: function initSearchMethod(objects) {
          var qryValue = '';
          var index = 0;

          for (var i = 0; i < objects.length; i++) {
            qryValue += "152\n"; //qryValue += `${objects[i].linea}_${objects[i].columna}\n`;

            qryValue += "".concat(objects[i].identificador, "\n");
            qryValue += this.findByRootNode(objects[i], index);
          } //console.log('-Salida {0}\n', qryValue);


          return qryValue;
        }
      }, {
        key: "findByRootNode",
        value: function findByRootNode(nodeObject) {
          var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
          var valueQry = '';
          var tamObj = 0;
          var tamAtr = 0;
          var arr = nodeObject.listaObjetos;
          var arr2 = nodeObject.listaAtributos;
          tamObj = arr.length;
          tamAtr = arr2.length;

          for (var i = 0; i < arr.length; i++) {
            valueQry += "153\n "; //OBJETO
            //valueQry += `${arr[i].linea}_${arr[i].columna}\n`;

            valueQry += "".concat(arr[i].identificador, "\n");
            valueQry += "".concat(arr[i].texto, "\n");
            valueQry += this.findByRootNode(arr[i]);
          }

          for (var _i = 0; _i < arr2.length; _i++) {
            valueQry += "154\n"; //ATRIBUTO
            //valueQry += `${arr2[i].linea}_${arr2[i].columna}\n`;

            valueQry += "".concat(arr2[_i].identificador, "\n");
            valueQry += "".concat(arr2[_i].valor, "\n");
          }

          return valueQry;
        } //Colocar los valores de la lista1d en arreglo de caracteres en C

      }, {
        key: "create3dC",
        value: function create3dC(list) {
          var lista = '';
          var valores = list.split('\n'); //var contadorStack = 0;

          for (var i = 0; i < valores.length; i++) {
            if (valores[i] === '') {
              lista += "  HEAP[t1] = 32;   //TEXTO VACIO \n";
              lista += "  t1 = t1 + 1;\n";
              this.tmpArray.push('32');
            } else if (valores[i].includes("152")) {
              //lista += `    STACK[(int)${this.contadorStack}] =  t1;   // --- AGREGAR OBJETO\n`;
              //this.contadorStack++;
              lista += "  t0 = t1;\n";
              lista += "  t0 = t0 + 0;\n";
              lista += "  HEAP[t1] = ".concat(valores[i], ";   //RAIZ\n");
              lista += "  t1 = t1 + 1;\n";
              lista += "  STACK[(int)".concat(this.contadorStack, "] =  t0;   // --- AGREGAR OBJETO\n");
              this.tmpArray.push(153);
            } else if (valores[i].includes("153")) {
              this.contadorStack++;
              lista += "  t0 = t1;\n";
              lista += "  t0 = t0 + 0;\n";
              lista += "  HEAP[t1] = ".concat(valores[i], ";   //OBJETO\n");
              lista += "  t1 = t1 + 1;\n";
              lista += "  STACK[(int)".concat(this.contadorStack, "] =  t0;   // --- AGREGAR OBJETO\n");
              this.tmpArray.push(valores[i]);
            } else if (valores[i].includes("154")) {
              lista += "  HEAP[t1] = ".concat(valores[i], ";   //ATRIBUTO\n");
              lista += "  t1 = t1 + 1;\n";
              this.tmpArray.push(valores[i]);
            } else if (valores[i].startsWith(" ")) {
              lista += this.splitString(valores[i].substring(1));
              lista += "  HEAP[t1] = -1;   // --------- FIN DEL STRING\n";
              lista += "  t1 = t1 + 1;\n";
              this.tmpArray.push(-1);
            } else {
              lista += this.splitString(valores[i]);
              lista += "  HEAP[t1] = -1;   // --------- FIN DEL STRING\n";
              lista += "  t1 = t1 + 1;\n";
              this.tmpArray.push(-1);
            }
          }

          return lista;
        } //Pasar string a cadena de caracteres

      }, {
        key: "splitString",
        value: function splitString(word) {
          var tmpWord = '';
          var tmp = word.split('');

          for (var i = 0; i < tmp.length; i++) {
            var letter = '';

            if (tmp[i] === 'á' || tmp[i] === 'Á') {
              letter = '160';
            } else if (tmp[i] === 'é' || tmp[i] === 'É') {
              letter = '130';
            } else if (tmp[i] === 'í' || tmp[i] === 'Í') {
              letter = '161';
            } else if (tmp[i] === 'ó' || tmp[i] === 'Ó') {
              letter = '162';
            } else if (tmp[i] === 'ú' || tmp[i] === 'Ú') {
              letter = '163';
            } else if (tmp[i] === 'ñ' || tmp[i] === 'Ñ') {
              letter = '164';
            } else {
              letter = tmp[i].charCodeAt(0);
            }

            tmpWord += "    HEAP[t1] = ".concat(letter, ";     //").concat(tmp[i], "\n");
            tmpWord += "    t1 = t1 + 1;\n";
            this.tmpArray.push(letter);
          }

          return tmpWord;
        }
      }, {
        key: "getXpath3D",
        value: function getXpath3D(xpath) {
          var tmpCodigo = "void xpath(){\n    printf(\"%c\", 10);            \n    printf(\"INICIO VALORES XPATH%c\",10);\n\n    ";

          for (var contAtr = 0; contAtr < xpath.length; contAtr++) {
            // console.log('--- ', xpath[contAtr]); //XPATH VALS
            tmpCodigo += this.findPosition(this.getSplitString(xpath[contAtr]));
          }

          tmpCodigo += "\n    etiqueta_salida:\n        printf(\"FIN VALORES XPATH%c\",10);\n        return;\n}";
          return tmpCodigo;
        } // Pasar el resultado del xpath a un arreglo de caracteres

      }, {
        key: "getSplitString",
        value: function getSplitString(valList) {
          var tmp = [];

          if (valList.tipo === 'A') {
            tmp.push(154);
          } else if (valList.tipo === 'O') {
            tmp.push(153);
          }

          tmp = tmp.concat(this.getCharAtCodeSplit(valList.id));
          tmp = tmp.concat(-1);
          tmp = tmp.concat(this.getCharAtCodeSplit(valList.val));
          return tmp;
        } // Obtener code del caracter 

      }, {
        key: "getCharAtCodeSplit",
        value: function getCharAtCodeSplit(valL) {
          var tmpAr = [];
          valL = valL.toString();
          valL = valL.split('');

          for (var i = 0; i < valL.length; i++) {
            var letter = '';

            if (valL[i] === 'á' || valL[i] === 'Á') {
              letter = '160';
            } else if (valL[i] === 'é' || valL[i] === 'É') {
              letter = '130';
            } else if (valL[i] === 'í' || valL[i] === 'Í') {
              letter = '161';
            } else if (valL[i] === 'ó' || valL[i] === 'Ó') {
              letter = '162';
            } else if (valL[i] === 'ú' || valL[i] === 'Ú') {
              letter = '163';
            } else if (valL[i] === 'ñ' || valL[i] === 'Ñ') {
              letter = '164';
            } else if (valL[i] === 155) {
              letter = '155';
            } else if (valL[i] === '') {
              letter = '32';
            } else {
              letter = valL[i].charCodeAt(0);
            }

            tmpAr.push(letter);
          }

          return tmpAr;
        } // buscar posicion

      }, {
        key: "findPosition",
        value: function findPosition(xpathL) {
          var xpath3dCode = '';
          var found = false;

          for (var i = 0; i < this.tmpArray.length; i++) {
            if (this.tmpArray[i] == xpathL[0]) {
              found = this.validate(this.tmpArray, xpathL, i, 0);

              if (found) {
                //console.log(' -- ', i, ' tam ', xpathL.length);
                xpath3dCode += this.traducir3DXpath(i, xpathL.length);
                break;
              }
            }
          }

          return xpath3dCode;
        }
      }, {
        key: "validate",
        value: function validate(arrTodo, arrPath, contTodo, contPath) {
          var hasFounded = false;

          if (arrTodo[contTodo] == arrPath[contPath]) {
            //console.log(contTodo, ' ', String.fromCharCode(arrPath[contPath]),' -- ', contPath);
            contTodo++;
            contPath++;
            hasFounded = this.validate(arrTodo, arrPath, contTodo, contPath);
          }

          if (contPath == arrPath.length - 1) {
            hasFounded = true;
          }

          return hasFounded;
        }
      }, {
        key: "traducir3DXpath",
        value: function traducir3DXpath(pos, tam) {
          var tmp = "\n    t4 = ".concat(pos, ";\n    t5 = ").concat(tam, ";\n    etiqueta_part").concat(this.contadorEtiqueta, ":\n        imprimir2();\n        t4 = t4 + 1;\n        t5 = t5 - 1; \n        if(t5 == 0) goto inicio").concat(this.contadorSalidas, ";\n        goto etiqueta_part").concat(this.contadorEtiqueta, ";\n        \n    inicio").concat(this.contadorSalidas, ":\n    printf(\"%c\", 10);            \n    \n");
          this.contadorEtiqueta++;
          this.contadorSalidas++;
          return tmp;
        } //Construcción deficiones

      }, {
        key: "crear3DDecla",
        value: function crear3DDecla(lista) {
          var decla3D = "void declaraciones(){\n         \n    t6 = sp + 1;\n    t7 = t6;\n    t7 = t7 * 1;\n\n    ".concat(this.generate3DDecla(lista), "\n\n    // ---------------------------------------- INICIO CODIGO PARA IMPRIMIR LOS VALORES DECLARACIONES\n    printf(\"VALORES DECLARACIONES:%c\",10);\n    etiqueta_for:\n        //printf(\"%d\",HEAP[t4]);\n        if( HEAP[t6] == -1 ){\n            printf(\"%c\", 10);            \n            goto etiqueta_for2;\n        }\n        goto etiqueta_imp;\n    etiqueta_for2:\n        t6 = t6 + 1;\n        if (t6 >= t1 ) {\n            goto etiqueta_salida;\n        }\n        goto etiqueta_for;\n\n    etiqueta_imp:\n        if( HEAP[t6] == 155 ){\n            goto etiqueta_for2;\n        }\n    etiqueta_imp1:\n        if( HEAP[t6] == -2 ){\n            printf(\" = \"); \n            goto etiqueta_for2;\n        }\n    etiqueta_imp3:\n        imprimir3();\n        goto etiqueta_for2;\n    // ---------------------------------------- FIN CODIGO PARA IMPRIMIR LAS DECLARACIONES\n\n    etiqueta_salida:\n        return;\n}");
          return decla3D;
        }
      }, {
        key: "generate3DDecla",
        value: function generate3DDecla(list) {
          var tmp = '';

          if (list !== null) {
            for (var i = 0; i < list.length; i++) {
              if (list[i].id.startsWith("$")) {
                tmp += this.generate3Decla('int', list[i].id, list[i].valor);
              }
            }
          }

          return tmp;
        } ///155 156 157

      }, {
        key: "generate3Decla",
        value: function generate3Decla(tipo, nombre, valor) {
          var caracteres = [];
          var tmpWord = '';
          caracteres.push(155); //tipo int

          caracteres = caracteres.concat(this.getCharAtCodeSplit(nombre));
          caracteres = caracteres.concat(-2);
          caracteres = caracteres.concat(this.getCharAtCodeSplit(valor));
          this.contadorStack++;
          tmpWord += "    t0 = t1;\n";
          tmpWord += "    t0 = t0 * 1;\n";

          for (var i = 0; i < caracteres.length; i++) {
            tmpWord += "    HEAP[t1] = ".concat(caracteres[i], ";     //").concat(caracteres[i], "\n");
            tmpWord += "    t1 = t1 + 1;\n";
          }

          tmpWord += "    HEAP[t1] = -1;     //FIN DE LA DECLARACI\xD3N\n";
          tmpWord += "    t1 = t1 + 1;\n";
          tmpWord += "    STACK[(int)".concat(this.contadorStack, "] =  t0;   // --- AGREGAR VARIABLE\n");
          return tmpWord;
        }
      }]);

      return xml3D;
    }();
    /*
        if(valores[i] === "OBJETO"){
        lista += `
        \n\n
        // ------------------------------ INICIA A GUARDAR UN OBJETO
        t1 = H;
        H = H + 5
        HEAP[(int)t1] = ${valores[i+2]};
        t1 = t1 + 1;
        HEAP[(int)t1] = ${valores[i+3]};
        t1 = t1 + 1;
        HEAP[(int)t1] = LISTA_OBJETOS};
        t1 = t1 + 1;
        HEAP[(int)t1] = -1};
        // ------------------------------ TERMINA GUARDAR UN OBJETO
        \n`;
    
        } else if(valores[i] === "ATRIBUTO"){
    
        }
    */

    /***/

  },

  /***/
  "./src/analizadorXML/Errores/ListaErrores.ts":
  /*!***************************************************!*\
    !*** ./src/analizadorXML/Errores/ListaErrores.ts ***!
    \***************************************************/

  /*! exports provided: ListaErrores */

  /***/
  function srcAnalizadorXMLErroresListaErroresTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ListaErrores", function () {
      return ListaErrores;
    });
    /* harmony import */


    var _Expresiones_tError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Expresiones/tError */
    "./src/analizadorXML/Expresiones/tError.ts");

    var ListaErrores = /*#__PURE__*/function () {
      function ListaErrores() {
        _classCallCheck(this, ListaErrores);

        this.contador = 1;
        this.contador = 1;
      } //LLAMARLO AL INICIO PARA VALIDAR LAS ETIQUETAS


      _createClass(ListaErrores, [{
        key: "validateEtiquetas",
        value: function validateEtiquetas(listaO) {
          var tmpArray = [];

          for (var i = 0; i < listaO.length; i++) {
            if (listaO[i].identificador !== listaO[i].cierre) {
              tmpArray.push(new _Expresiones_tError__WEBPACK_IMPORTED_MODULE_0__["tError"]('Semantico', "Etiquetas incorrectas ".concat(listaO[i].identificador, " !=== ").concat(listaO[i].cierre), listaO[i].linea, listaO[i].columna)); //console.log(`Etiquetas incorrectas ${listaO[i].identificador} !=== ${listaO[i].cierre}`);
            } else {
              var tmp = this.validateEtiquetas(listaO[i].listaObjetos);

              if (tmp.length !== 0) {
                tmpArray = tmp;
              }
            }
          }

          return tmpArray;
        }
        /*
            var arrTmp = lError.validateEtiquetas(salidaG.objetos);
            console.log(lError.generateHtmlBody(salidaG.lErrores, arrTmp));
        */
        //ARCHIVO .HTML

      }, {
        key: "generateHtmlBody",
        value: function generateHtmlBody(erroresLS, erroresEtiquetas) {
          var _this5 = this;

          var arrayCuerpo = [];

          if (erroresLS.length > 0) {
            erroresLS.forEach(function (object) {
              arrayCuerpo.push(_this5.getHtmlBody(object));
            });
          }

          if (erroresEtiquetas.length > 0) {
            erroresEtiquetas.forEach(function (object) {
              arrayCuerpo.push(_this5.getHtmlBody(object));
            });
          }

          return arrayCuerpo;
        }
      }, {
        key: "getHtmlBody",
        value: function getHtmlBody(error) {
          var fila = {
            no: this.contador,
            tipo: error.tipo,
            valor: error.texto,
            linea: error.linea,
            columna: error.columna
          };
          return fila;
        }
      }]);

      return ListaErrores;
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
            $V0 = [2, 5],
            $V1 = [1, 7],
            $V2 = [1, 13],
            $V3 = [6, 7],
            $V4 = [2, 14, 22],
            $V5 = [2, 15],
            $V6 = [1, 17],
            $V7 = [2, 18],
            $V8 = [1, 33],
            $V9 = [1, 40],
            $Va = [1, 31],
            $Vb = [1, 30],
            $Vc = [1, 38],
            $Vd = [1, 28],
            $Ve = [1, 29],
            $Vf = [1, 32],
            $Vg = [1, 35],
            $Vh = [1, 36],
            $Vi = [1, 37],
            $Vj = [1, 39],
            $Vk = [1, 41],
            $Vl = [1, 42],
            $Vm = [1, 43],
            $Vn = [1, 44],
            $Vo = [1, 45],
            $Vp = [1, 46],
            $Vq = [1, 47],
            $Vr = [1, 48],
            $Vs = [1, 49],
            $Vt = [1, 50],
            $Vu = [1, 51],
            $Vv = [1, 52],
            $Vw = [1, 53],
            $Vx = [1, 54],
            $Vy = [1, 55],
            $Vz = [1, 56],
            $VA = [1, 57],
            $VB = [1, 58],
            $VC = [1, 59],
            $VD = [7, 9, 11, 12, 17, 22, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
            $VE = [1, 70],
            $VF = [1, 68];

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
          productions_: [0, [3, 3], [4, 11], [4, 2], [5, 2], [5, 0], [15, 2], [16, 3], [19, 4], [19, 2], [19, 2], [21, 3], [21, 3], [21, 2], [18, 2], [18, 0], [23, 3], [20, 2], [20, 0], [24, 1], [24, 1], [24, 1], [24, 1], [24, 1], [24, 1], [24, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1]],
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
                return new SalidaGramatica(this.$, reportBNF, reportBNF2, $$[$0 - 2], listaErrores);
                break;

              case 2:
                reportBNF.push("<ENCODING> ::= lt interC xml version asig StringLiteral encoding asig StringLiteral interC gt");
                reportBNF2.push('Encoding.val = StringLiteral');
                this.$ = $$[$0 - 2];
                break;

              case 3:
              case 10:
              case 13:
                listaErrores.push(new tError('Sintactico', "Token inesperado: ".concat(yytext), _$[$0 - 1].first_line, _$[$0 - 1].first_column));
                break;

              case 4:
                reportBNF.push('<RAIZ> ::= <OBJETO> <RAIZ>');
                reportBNF2.push('Raiz.val = Objeto.val.Concatenar(Raiz.Val])');
                this.$ = $$[$0 - 1].concat($$[$0]);
                break;

              case 5:
                this.$ = [];
                break;

              case 6:
                reportBNF.push('<OBJETO> ::= lt <OBJETOPRIN>');
                reportBNF2.push('OBJETO.val = [Objetoprin.val]');
                this.$ = [$$[$0]];
                break;

              case 7:
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

              case 8:
                reportBNF.push('<OBJETOSEC> ::= gt <LISTA_ID_OBJETO> lt <OBJETOTER>');
                reportBNF2.push('Objetosec.val = Objetoter.val');

                if ($$[$0].id !== "") {
                  if ($$[$0 - 2] !== "") {
                    $$[$0].texto = $$[$0 - 2];
                  }

                  this.$ = $$[$0];
                }

                break;

              case 9:
                reportBNF.push('<OBJETOSEC> ::= div gt');
                reportBNF2.push('Objetosec.val = {texto: vacio, lista: vacia: id: vacio, tipo: simple}');
                this.$ = {
                  texto: '',
                  lista: null,
                  id: '',
                  tipo: 0
                };
                break;

              case 11:
                reportBNF.push('<OBJETOTER> ::= div identifier gt');
                reportBNF2.push('Objetoter = {texto: vacio, lista: vacia, id: identifier, tipo: doble}');
                this.$ = {
                  texto: '',
                  lista: null,
                  id: $$[$0 - 1],
                  tipo: 1
                };
                break;

              case 12:
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

              case 14:
                reportBNF.push('<LATRIBUTOS> ::= <ATRIBUTOS> <LATRIBUTOS>');
                reportBNF2.push('Latributos.val.agregar(Atributo.val)');
                this.$ = $$[$0 - 1].concat($$[$0]);
                break;

              case 15:
                reportBNF.push('<LATRIBUTOS> ::= epsilon');
                reportBNF2.push('Latributos.val = [] ');
                this.$ = [];
                break;

              case 16:
                reportBNF.push('<ATRIBUTO> ::= identifier asig StringLiteral');
                reportBNF2.push('Atributo.val = [new Atributo(id, valor, fila, columna)]');
                this.$ = [new Atributo($$[$0 - 2], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column)];
                break;

              case 17:
                reportBNF.push('<LISTA_ID_OBJETO> ::= <LISTA_VALORES> <LISTA_ID_OBJETO>');
                reportBNF2.push('Lista_id_objeto.val = Lista_valores.val + \" \" + Lista_id_objeto.val');
                this.$ = $$[$0 - 1] + " " + $$[$0];
                break;

              case 18:
                reportBNF.push('<LISTA_ID_OBJETO> ::= epsilon');
                reportBNF2.push('Lista_id_objeto.val = \"\"');
                this.$ = "";
                break;

              case 19:
                reportBNF.push('<LISTA_VALORES> ::= IntegerLiteral');
                reportBNF2.push('Lista_valores.val = IntegerLiteral');
                this.$ = $$[$0];
                break;

              case 20:
                reportBNF.push('<LISTA_VALORES> ::= DoubleLiteral');
                reportBNF2.push('Lista_valores.val = DoubleLiteral');
                this.$ = $$[$0];
                break;

              case 21:
                reportBNF.push('<LISTA_VALORES> ::= identifier');
                reportBNF2.push('Lista_valores.val = identifier');
                this.$ = $$[$0];
                break;

              case 22:
                reportBNF.push('<LISTA_VALORES> ::= StringLiteral');
                reportBNF2.push('Lista_valores.val = StringLiteral');
                this.$ = $$[$0];
                break;

              case 23:
                reportBNF.push('<LISTA_VALORES> ::= CharLiteral');
                reportBNF2.push('Lista_valores.val = CharLiteral');
                this.$ = $$[$0];
                break;

              case 24:
                reportBNF.push('<LISTA_VALORES> ::= xml');
                reportBNF2.push('Lista_valores.val = xml');
                this.$ = $$[$0];
                break;

              case 25:
                reportBNF.push('<LISTA_VALORES> ::= <CARACTERES>');
                reportBNF2.push('Lista_valores.val = Caracteres.val');
                this.$ = $$[$0];
                break;

              case 26:
              case 27:
                reportBNF.push('<CARACTERES> ::= plus');
                reportBNF2.push('Caracteres.val = plus');
                this.$ = $$[$0];
                break;

              case 28:
                reportBNF.push('<CARACTERES> ::= times');
                reportBNF2.push('Caracteres.val = times');
                this.$ = $$[$0];
                break;

              case 29:
                reportBNF.push('<CARACTERES> ::= div');
                reportBNF2.push('Caracteres.val = div');
                this.$ = $$[$0];
                break;

              case 30:
                reportBNF.push('<CARACTERES> ::= mod');
                reportBNF2.push('Caracteres.val = mod');
                this.$ = $$[$0];
                break;

              case 31:
                reportBNF.push('<CARACTERES> ::= asign');
                reportBNF2.push('Caracteres.val = asign');
                this.$ = $$[$0];
                break;

              case 32:
                reportBNF.push('<CARACTERES> ::= equal');
                reportBNF2.push('Caracteres.val = equal');
                this.$ = $$[$0];
                break;

              case 33:
                reportBNF.push('<CARACTERES> ::= nequal');
                reportBNF2.push('Caracteres.val = nequal');
                this.$ = $$[$0];
                break;

              case 34:
                reportBNF.push('<CARACTERES> ::= and');
                reportBNF2.push('Caracteres.val = and');
                this.$ = $$[$0];
                break;

              case 35:
                reportBNF.push('<CARACTERES> ::= or');
                reportBNF2.push('Caracteres.val = or');
                this.$ = $$[$0];
                break;

              case 36:
                reportBNF.push('<CARACTERES> ::= not');
                reportBNF2.push('Caracteres.val = not');
                this.$ = $$[$0];
                break;

              case 37:
                reportBNF.push('<CARACTERES> ::= semicolon');
                reportBNF2.push('Caracteres.val = semicolon');
                this.$ = $$[$0];
                break;

              case 38:
                reportBNF.push('<CARACTERES> ::= lparen');
                reportBNF2.push('Caracteres.val = lparen');
                this.$ = $$[$0];
                break;

              case 39:
                reportBNF.push('<CARACTERES> ::= rparen');
                reportBNF2.push('Caracteres.val = rparen');
                this.$ = $$[$0];
                break;

              case 40:
                reportBNF.push('<CARACTERES> ::= lcurly');
                reportBNF2.push('Caracteres.val = lcurly');
                this.$ = $$[$0];
                break;

              case 41:
                reportBNF.push('<CARACTERES> ::= rcurly');
                reportBNF2.push('Caracteres.val = rcurly');
                this.$ = $$[$0];
                break;

              case 42:
                reportBNF.push('<CARACTERES> ::= lbracket');
                reportBNF2.push('Caracteres.val = lbracket');
                this.$ = $$[$0];
                break;

              case 43:
                reportBNF.push('<CARACTERES> ::= rbracket');
                reportBNF2.push('Caracteres.val = rbracket');
                this.$ = $$[$0];
                break;

              case 44:
                reportBNF.push('<CARACTERES> ::= period');
                reportBNF2.push('Caracteres.val = period');
                this.$ = $$[$0];
                break;

              case 45:
                reportBNF.push('<CARACTERES> ::= coma');
                reportBNF2.push('Caracteres.val = coma');
                this.$ = $$[$0];
                break;

              case 46:
                reportBNF.push('<CARACTERES> ::= lesst');
                reportBNF2.push('Caracteres.val = >');
                this.$ = '<';
                break;

              case 47:
                reportBNF.push('<CARACTERES> ::= greatert');
                reportBNF2.push('Caracteres.val = >');
                this.$ = '>';
                break;

              case 48:
                reportBNF.push('<CARACTERES> ::= ampersand');
                reportBNF2.push('Caracteres.val = &');
                this.$ = '&';
                break;

              case 49:
                reportBNF.push('<CARACTERES> ::= apostro');
                reportBNF2.push('Caracteres.val = \'');
                this.$ = '\'';
                break;

              case 50:
                reportBNF.push('<CARACTERES> ::= quotation');
                reportBNF2.push('Caracteres.val = \"');
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
            5: 5,
            6: $V0,
            7: $V1,
            15: 6
          }, {
            8: [1, 8]
          }, {
            14: [1, 9]
          }, {
            6: [1, 10]
          }, {
            5: 11,
            6: $V0,
            7: $V1,
            15: 6
          }, {
            16: 12,
            17: $V2
          }, {
            9: [1, 14]
          }, o($V3, [2, 3]), {
            1: [2, 1]
          }, {
            6: [2, 4]
          }, o($V3, [2, 6]), o($V4, $V5, {
            18: 15,
            23: 16,
            17: $V6
          }), {
            10: [1, 18]
          }, {
            2: [1, 22],
            14: [1, 20],
            19: 19,
            22: [1, 21]
          }, o($V4, $V5, {
            23: 16,
            18: 23,
            17: $V6
          }), {
            11: [1, 24]
          }, {
            11: [1, 25]
          }, o($V3, [2, 7]), {
            7: $V7,
            9: $V8,
            11: $V9,
            12: $Va,
            17: $Vb,
            20: 26,
            22: $Vc,
            24: 27,
            25: $Vd,
            26: $Ve,
            27: $Vf,
            28: 34,
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
            14: [1, 60]
          }, {
            14: [1, 61]
          }, o($V4, [2, 14]), {
            12: [1, 62]
          }, {
            12: [1, 63]
          }, {
            7: [1, 64]
          }, {
            7: $V7,
            9: $V8,
            11: $V9,
            12: $Va,
            17: $Vb,
            20: 65,
            22: $Vc,
            24: 27,
            25: $Vd,
            26: $Ve,
            27: $Vf,
            28: 34,
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
          }, o($VD, [2, 19]), o($VD, [2, 20]), o($VD, [2, 21]), o($VD, [2, 22]), o($VD, [2, 23]), o($VD, [2, 24]), o($VD, [2, 25]), o($VD, [2, 26]), o($VD, [2, 27]), o($VD, [2, 28]), o($VD, [2, 29]), o($VD, [2, 30]), o($VD, [2, 31]), o($VD, [2, 32]), o($VD, [2, 33]), o($VD, [2, 34]), o($VD, [2, 35]), o($VD, [2, 36]), o($VD, [2, 37]), o($VD, [2, 38]), o($VD, [2, 39]), o($VD, [2, 40]), o($VD, [2, 41]), o($VD, [2, 42]), o($VD, [2, 43]), o($VD, [2, 44]), o($VD, [2, 45]), o($VD, [2, 46]), o($VD, [2, 47]), o($VD, [2, 48]), o($VD, [2, 49]), o($VD, [2, 50]), o($V3, [2, 9]), o($V3, [2, 10]), o([2, 14, 17, 22], [2, 16]), {
            13: [1, 66]
          }, {
            2: $VE,
            16: 69,
            17: $V2,
            21: 67,
            22: $VF
          }, {
            7: [2, 17]
          }, {
            11: [1, 71]
          }, o($V3, [2, 8]), {
            17: [1, 72]
          }, {
            7: [1, 73]
          }, {
            14: [1, 74]
          }, {
            12: [1, 75]
          }, {
            14: [1, 76]
          }, {
            2: $VE,
            16: 69,
            17: $V2,
            21: 77,
            22: $VF
          }, o($V3, [2, 13]), {
            8: [1, 78]
          }, o($V3, [2, 11]), o($V3, [2, 12]), {
            14: [1, 79]
          }, o($V3, [2, 2])],
          defaultActions: {
            10: [2, 1],
            11: [2, 4],
            65: [2, 17]
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

        var _webpack_require__8 = __webpack_require__(
        /*! ../Expresiones/tError */
        "./src/analizadorXML/Expresiones/tError.ts"),
            tError = _webpack_require__8.tError;

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
                  listaErrores.push(new tError('Léxico', "Simbolo inesperado: ".concat(yy_.yytext), yy_.yylloc.first_line, yy_.yylloc.first_column));
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
  "./src/analizadorXML/Instrucciones/Busqueda/xpathBusqueda.ts":
  /*!*******************************************************************!*\
    !*** ./src/analizadorXML/Instrucciones/Busqueda/xpathBusqueda.ts ***!
    \*******************************************************************/

  /*! exports provided: xpathBusqueda */

  /***/
  function srcAnalizadorXMLInstruccionesBusquedaXpathBusquedaTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "xpathBusqueda", function () {
      return xpathBusqueda;
    });

    var xpathBusqueda = /*#__PURE__*/function () {
      function xpathBusqueda() {
        _classCallCheck(this, xpathBusqueda);

        this.listNodosName = [];
        this.listObjects = [];
      }

      _createClass(xpathBusqueda, [{
        key: "getNodesByFilters",
        value: function getNodesByFilters(filter, param, objects) {
          var salida; // solo el nombre del root ej: mundo

          if (filter === '1') {
            salida = this.findByRootName(param, objects);
          } // rutas 


          if (filter === '2') {
            salida = this.startTypeSearch(param, objects);
          } //multiples rutas ej. /mundo/continente/pais1/nombre|/mundo/continente/pais/nombre


          if (filter === '3') {
            salida = [];

            if (param.includes('|')) {
              var parameters = param.split('|'); //console.log('val nodo m ', parameters);

              for (var i = 0; i < parameters.length; i++) {
                salida.push(this.startTypeSearch(parameters[i], objects));
              }
            }
          }

          return salida;
        }
      }, {
        key: "startTypeSearch",
        value: function startTypeSearch(param, objects) {
          // console.log('param ', param);
          param = param.replace('//', '/-'); // console.log('param replace ', param);
          //ruta relativa, inicia con /        

          if (param.startsWith('/')) {
            /*console.log('val nodo\n\t', */
            return this.initSearchMethod(param.substring(1), objects); //);
          } else {
            /*console.log('val nodo\n\t',*/
            return this.initSearchMethod(param, objects); //);
          }
        } // 1. Obtener cuando solo se escribe el nombre

      }, {
        key: "findByRootName",
        value: function findByRootName(param, objects) {
          var _this6 = this;

          var valorNodo = '';
          objects.forEach(function (obj) {
            if (obj.identificador === param) {
              valorNodo += '\n - ';

              if (obj.listaObjetos.length !== 0) {
                valorNodo += _this6.findValuesNodes(obj);
              } else {
                valorNodo += obj.text;
              }
            }
          });
          return valorNodo;
        } // 2. Obtener cuando la ruta empiza por el root '/'

      }, {
        key: "initSearchMethod",
        value: function initSearchMethod(param, objects) {
          var qryValue = '';
          var parameters = param.split('/');

          for (var i = 0; i < objects.length; i++) {
            qryValue = this.findByRootNode(parameters, objects[i]);
          }

          return qryValue;
        }
      }, {
        key: "findByRootNode",
        value: function findByRootNode(param, nodeObject) {
          var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
          var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
          // console.log('\nNODE: ', nodeObject.identificador);
          // console.log('PARAM: ', index);
          // console.log('TMP ROOT: ', param[index]);
          var valueQry = '';
          var tmp = index + 1;
          var root = param[index];
          var hasDoubleSlash = false;

          if (root.startsWith('-')) {
            hasDoubleSlash = true;
          }

          if (nodeObject.identificador === root && tmp === param.length) {
            //console.log('FINAL NODE ', nodeObject.identificador);
            valueQry += this.findValuesNodes(nodeObject);
          } else if (nodeObject.identificador === root && param.length > tmp) {
            var arr = nodeObject.listaObjetos;
            var secondR = param[tmp]; // console.log('SECOND ROOT', secondR);

            var hasPassedDot = false;
            var hasAtribute = false;

            for (var i = 0; i < arr.length; i++) {
              var tmpParam = param;

              if (arr[i].identificador === secondR) {
                valueQry += "".concat(this.findByRootNode(tmpParam, arr[i], tmp, nodeObject), "\n");
              } else if (secondR.startsWith('-')) {
                valueQry += "".concat(this.findByRootNode(tmpParam, arr[i], tmp, nodeObject), "\n");
              } else if (secondR === '.' && !hasPassedDot) {
                hasPassedDot = true;
                valueQry += this.findValuesNodes(nodeObject);
              } else if (secondR === '..' && !hasPassedDot) {
                hasPassedDot = true;
                valueQry += this.findValuesNodes(parent);
              } else if (secondR.startsWith('@*') && !hasAtribute) {
                hasAtribute = true;
                valueQry += this.findAllAtribute(nodeObject);
              } else if (secondR.startsWith('@') && !hasAtribute) {
                hasAtribute = true;
                valueQry += this.findAtribute(nodeObject, secondR);
              }
            }

            if (arr.length === 0 && secondR === '.') {
              valueQry += this.findValuesNodes(nodeObject);
            } else if (arr.length === 0 && secondR === '..') {
              valueQry += this.findValuesNodes(parent);
            } else if (arr.length === 0 && secondR.startsWith('@*')) {
              valueQry += this.findAllAtribute(nodeObject);
            } else if (arr.length === 0 && secondR.startsWith('@')) {
              valueQry += this.findAtribute(nodeObject, secondR);
            }
          } else if (hasDoubleSlash) {
            //  console.log('TIENE SLASH');
            var tmpName = param[index].substring(1);

            if (tmpName === nodeObject.identificador && tmp === param.length) {
              valueQry += this.findValuesNodes(nodeObject);
            } else if (tmpName === nodeObject.identificador) {
              var arr = nodeObject.listaObjetos;
              var secondR = param[tmp]; // console.log('SECOND ROOT+', secondR);

              var hasPassedDot = false;
              var hasAtribute = false;

              for (var _i2 = 0; _i2 < arr.length; _i2++) {
                var tmpParam = param;

                if (arr[_i2].identificador === secondR) {
                  valueQry += "".concat(this.findByRootNode(tmpParam, arr[_i2], tmp, nodeObject), "\n");
                } else if (secondR.startsWith('-')) {
                  valueQry += "".concat(this.findByRootNode(tmpParam, arr[_i2], tmp, nodeObject), "\n");
                } else if (secondR === '.' && !hasPassedDot) {
                  hasPassedDot = true;
                  valueQry += this.findValuesNodes(nodeObject);
                } else if (secondR === '..' && !hasPassedDot) {
                  hasPassedDot = true;
                  valueQry += this.findValuesNodes(parent);
                } else if (secondR.startsWith('@*') && !hasAtribute) {
                  hasAtribute = true;
                  valueQry += this.findAllAtribute(nodeObject);
                } else if (secondR.startsWith('@') && !hasAtribute) {
                  hasAtribute = true;
                  valueQry += this.findAtribute(nodeObject, secondR);
                }
              }

              if (arr.length === 0 && secondR === '.') {
                valueQry += this.findValuesNodes(nodeObject);
              } else if (arr.length === 0 && secondR === '..') {
                valueQry += this.findValuesNodes(parent);
              } else if (arr.length === 0 && secondR.startsWith('@*')) {
                valueQry += this.findAllAtribute(nodeObject);
              } else if (arr.length === 0 && secondR.startsWith('@')) {
                valueQry += this.findAtribute(nodeObject, secondR);
              }
            } else {
              if (param[index].startsWith('-@*')) {
                valueQry += this.findAllAtribute(nodeObject);
              } else if (param[index].startsWith('-@')) {
                valueQry += this.findAtribute(nodeObject, param[index].substring(1));
              } else if (param[index].startsWith('-*')) {
                valueQry += "NODOS: \n\t ".concat(this.findValuesNodes(nodeObject)); // valueQry += `ATRIBUTOS: \n\t ${this.findAllAtribute(nodeObject)}`;
              }

              var arr1 = nodeObject.listaObjetos;

              for (var _i3 = 0; _i3 < arr1.length; _i3++) {
                var tmpParam = param;
                valueQry += "".concat(this.findByRootNode(tmpParam, arr1[_i3], index));
              }
            }
          } else {
            console.log('ELSEEEEEEEEEEE', nodeObject.identificador, '-', param);
          }

          return valueQry;
        } // Obtener el valor de los nodos

      }, {
        key: "findValuesNodes",
        value: function findValuesNodes(nodeList) {
          var _this7 = this;

          var texto = ' ';

          if (nodeList.listaObjetos.length !== 0) {
            nodeList.listaObjetos.forEach(function (obj) {
              texto += _this7.findValuesNodes(obj);
            });
          } else {
            texto += "<".concat(nodeList.identificador, ">").concat(nodeList.texto, "</").concat(nodeList.cierre, ">\n");
            this.listNodosName.push({
              id: nodeList.identificador,
              val: nodeList.texto,
              tipo: 'O'
            });
            this.listObjects.push(nodeList); //para el for
          } // console.log('TEXTO ', texto);


          return texto;
        }
      }, {
        key: "findAtribute",
        value: function findAtribute(nodeList, param) {
          var _this8 = this;

          var texto = ' ';

          if (nodeList.listaAtributos.length !== 0) {
            nodeList.listaAtributos.forEach(function (obj) {
              if (obj.identificador === param.substring(1)) {
                texto += "- ".concat(obj.valor, "\n");

                _this8.listNodosName.push({
                  id: obj.identificador,
                  val: obj.valor,
                  tipo: 'A'
                });

                _this8.listObjects.push(nodeList); //para el for

              }
            });
          }

          return texto;
        }
      }, {
        key: "findAllAtribute",
        value: function findAllAtribute(nodeList) {
          var _this9 = this;

          var texto = ' ';

          if (nodeList.listaAtributos.length !== 0) {
            nodeList.listaAtributos.forEach(function (obj) {
              texto += "- ".concat(obj.valor, "\n");

              _this9.listNodosName.push({
                id: obj.identificador,
                val: obj.valor,
                tipo: 'A'
              });

              _this9.listObjects.push(nodeList); //para el for

            });
          }

          return texto;
        }
      }, {
        key: "returnListValues",
        value: function returnListValues() {
          //SALIDA 3D

          /*for(let i = 0; i < this.listNodosName.length; i ++){
              console.log(this.listNodosName[i]);
          }*/
          return this.listNodosName;
        }
      }, {
        key: "returnListObjects",
        value: function returnListObjects() {
          /*for (let i = 0; i < this.listObjects.length; i++) {
              console.log(this.listObjects[i]);
          }*/
          return this.listObjects;
        }
      }, {
        key: "clearList",
        value: function clearList() {
          this.listNodosName = [];
          this.listObjects = [];
        }
      }]);

      return xpathBusqueda;
    }();
    /***/

  },

  /***/
  "./src/analizadorXML/Optimizacion/Optimizar.ts":
  /*!*****************************************************!*\
    !*** ./src/analizadorXML/Optimizacion/Optimizar.ts ***!
    \*****************************************************/

  /*! exports provided: Optimizar */

  /***/
  function srcAnalizadorXMLOptimizacionOptimizarTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Optimizar", function () {
      return Optimizar;
    });

    var Optimizar = /*#__PURE__*/function () {
      function Optimizar() {
        _classCallCheck(this, Optimizar);

        this.salidaConsola = [];
        this.salidaOptimizado = [];
      }

      _createClass(Optimizar, [{
        key: "optimizarCodigo",
        value: function optimizarCodigo(lista) {
          var objectList = lista.split('\n');

          try {
            for (var i = 0; i < objectList.length; i++) {
              var tmpSplit = this.obtenerLista(objectList[i]); // objectList[i].split(' ');

              if (objectList[i].includes('+ 0')) {
                // Regla 6 T1 = T1 + 0; 
                if (tmpSplit[0] == tmpSplit[2]) {
                  //this.salidaOptimizado.push(`${tmpSplit[0]} = ${tmpSplit[0]};`);
                  this.salidaConsola.push("* REGLA 6: Se ha optimizado la linea: '".concat(objectList[i], "', Se elimino la instrucci\xF3n "));
                } // REGLA 10 T1 = T2 + 0;
                else {
                    this.salidaOptimizado.push("".concat(tmpSplit[0], " = ").concat(tmpSplit[2], ";"));
                    this.salidaConsola.push("* REGLA 10: Se ha optimizado la linea: '".concat(objectList[i], "' a '").concat(tmpSplit[0], " = ").concat(tmpSplit[2], ";' "));
                  }
              } else if (objectList[i].includes('- 0')) {
                // REGLA 7 T1 = T1 - 0; 
                if (tmpSplit[0] == tmpSplit[2]) {
                  //this.salidaOptimizado.push(`${tmpSplit[0]} = ${tmpSplit[0]};`);
                  this.salidaConsola.push("* REGLA 7: Se ha optimizado la linea: '".concat(objectList[i], "', Se elimino la instrucci\xF3n "));
                } // REGLA 11 T1 = T2 - 0;
                else {
                    this.salidaOptimizado.push("".concat(tmpSplit[0], " = ").concat(tmpSplit[2], ";"));
                    this.salidaConsola.push("* REGLA 11: Se ha optimizado la linea: '".concat(objectList[i], "' a '").concat(tmpSplit[0], " = ").concat(tmpSplit[2], ";' "));
                  }
              } else if (objectList[i].includes('* 1')) {
                // REGLA 8 T1 = T1 * 1; 
                if (tmpSplit[0] == tmpSplit[2]) {
                  //this.salidaOptimizado.push(`${tmpSplit[0]} = ${tmpSplit[0]};`);
                  this.salidaConsola.push("* REGLA 8: Se ha optimizado la linea: '".concat(objectList[i], "', Se elimino la instrucci\xF3n "));
                } // REGLA 12 T1 = T2 * 1;
                else {
                    this.salidaOptimizado.push("".concat(tmpSplit[0], " = ").concat(tmpSplit[2], ";"));
                    this.salidaConsola.push("* REGLA 12: Se ha optimizado la linea: '".concat(objectList[i], "' a '").concat(tmpSplit[0], " = ").concat(tmpSplit[2], ";' "));
                  }
              } else if (objectList[i].includes('/ 1')) {
                // REGLA 9 T1 = T1 / 1;
                if (tmpSplit[0] == tmpSplit[2]) {
                  //this.salidaOptimizado.push(`${tmpSplit[0]} = ${tmpSplit[0]};`);
                  this.salidaConsola.push("* REGLA 9: Se ha optimizado la linea: '".concat(objectList[i], "', Se elimino la instrucci\xF3n "));
                } // REGLA 13 T1 = T2 / 1;
                else {
                    this.salidaOptimizado.push("".concat(tmpSplit[0], " = ").concat(tmpSplit[2], ";"));
                    this.salidaConsola.push("* REGLA 13: Se ha optimizado la linea: '".concat(objectList[i], "' a '").concat(tmpSplit[0], " = ").concat(tmpSplit[2], ";' "));
                  }
              } else if (objectList[i].includes('* 0')) {
                // REGLA 15 T1 = T2 * 0;
                this.salidaOptimizado.push("".concat(tmpSplit[0], " = 0;"));
                this.salidaConsola.push("* REGLA 15: Se ha optimizado la linea: '".concat(objectList[i], "' a '").concat(tmpSplit[0], " = 0;' "));
              } else if (objectList[i].includes('/ 0')) {
                // REGLA 16 T1 = 0 / T2;
                this.salidaOptimizado.push("".concat(tmpSplit[0], " = 0;"));
                this.salidaConsola.push("* REGLA 13 Se ha optimizado la linea: '".concat(objectList[i], "' a '").concat(tmpSplit[0], " = 0;' "));
              } else if (objectList[i].includes('* 2;')) {
                // REGLA 14 T1 = T2 * 2;
                this.salidaOptimizado.push("".concat(tmpSplit[0], " = ").concat(tmpSplit[0], " + ").concat(tmpSplit[0], ";"));
                this.salidaConsola.push("* REGLA 14 Se ha optimizado la linea: '".concat(objectList[i], "' a '").concat(tmpSplit[0], " = ").concat(tmpSplit[0], " + ").concat(tmpSplit[0], ";' "));
              } else {
                this.salidaOptimizado.push(objectList[i]);
              }
            }
          } catch (error) {
            console.log('Trono :( ', error);
          }

          return this.salidaOptimizado.join("\n"); //Crear archivo 3d .c

          /*
          fs.appendFile('codigo3DOptimizado.c', this.salidaOptimizado.join('\n'), (error: any) => {
              if (error) {
                  throw error;
              }
          });*/
        }
      }, {
        key: "obtenerLista",
        value: function obtenerLista(word) {
          var tmpSplit = word.split(' ');
          var tmpArreglo = [];

          for (var i = 0; i < tmpSplit.length; i++) {
            if (tmpSplit[i] != '') {
              tmpArreglo.push(tmpSplit[i]);
            }
          }

          return tmpArreglo;
        }
      }, {
        key: "limpiarArreglos",
        value: function limpiarArreglos() {
          this.salidaConsola = [];
          this.salidaOptimizado = [];
        }
      }, {
        key: "returnConsola",
        value: function returnConsola() {
          return this.salidaConsola;
        }
      }, {
        key: "returnOptimizado",
        value: function returnOptimizado() {
          return this.salidaOptimizado;
        }
      }]);

      return Optimizar;
    }();
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


    var _Errores_ListaErrores__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./Errores/ListaErrores */
    "./src/analizadorXML/Errores/ListaErrores.ts");
    /* harmony import */


    var _Gramatica_gramatica__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./Gramatica/gramatica */
    "./src/analizadorXML/Gramatica/gramatica.js");
    /* harmony import */


    var _Gramatica_gramatica__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Gramatica_gramatica__WEBPACK_IMPORTED_MODULE_4__);

    var AnalizadorASCXML = /*#__PURE__*/function () {
      function AnalizadorASCXML() {
        _classCallCheck(this, AnalizadorASCXML);
      }

      _createClass(AnalizadorASCXML, [{
        key: "ejecutarCodigo",
        value: function ejecutarCodigo(entrada) {
          var tabla = new _AST_TablaSimbolos__WEBPACK_IMPORTED_MODULE_2__["TablaSimbolos"]();

          var salidaG = _Gramatica_gramatica__WEBPACK_IMPORTED_MODULE_4__["parse"](entrada);

          var arbolCST = new _AST_CST__WEBPACK_IMPORTED_MODULE_0__["CST"](salidaG.objetos);
          var Listaerrores = new _Errores_ListaErrores__WEBPACK_IMPORTED_MODULE_3__["ListaErrores"](); // TABLA SIMBOLOS

          var reporteTabla = tabla.generarReporteTablaObjetos(salidaG.objetos); // BNF

          var gramBnf = new _AST_GramaticaBNF__WEBPACK_IMPORTED_MODULE_1__["GramaticaBNF"](salidaG.reporteBNF, salidaG.reporteBNF2);
          var reporteBNF = gramBnf.getBNFReport(); // DOT CST

          var reporteCST = arbolCST.generarArbolCST(salidaG.objetos); //Errores

          var errores = Listaerrores.generateHtmlBody(salidaG.lErrores, Listaerrores.validateEtiquetas(salidaG.objetos));
          var ret = {
            tablaRep: reporteTabla,
            bnfRep: reporteBNF,
            cstRep: reporteCST,
            encoding: salidaG.encoding,
            objetos: salidaG.objetos,
            errores: errores
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


    var _Errores_ListaErrores__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./Errores/ListaErrores */
    "./src/analizadorXML/Errores/ListaErrores.ts");
    /* harmony import */


    var _Gramatica_gramaticaDesc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./Gramatica/gramaticaDesc */
    "./src/analizadorXML/Gramatica/gramaticaDesc.js");
    /* harmony import */


    var _Gramatica_gramaticaDesc__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Gramatica_gramaticaDesc__WEBPACK_IMPORTED_MODULE_4__);

    var AnalizadorASCXML = /*#__PURE__*/function () {
      function AnalizadorASCXML() {
        _classCallCheck(this, AnalizadorASCXML);
      }

      _createClass(AnalizadorASCXML, [{
        key: "ejecutarCodigo",
        value: function ejecutarCodigo(entrada) {
          var tabla = new _AST_TablaSimbolos__WEBPACK_IMPORTED_MODULE_2__["TablaSimbolos"]();

          var salidaG = _Gramatica_gramaticaDesc__WEBPACK_IMPORTED_MODULE_4__["parse"](entrada);

          var arbolCST = new _AST_CST__WEBPACK_IMPORTED_MODULE_0__["CST"](salidaG.objetos);
          var Listaerrores = new _Errores_ListaErrores__WEBPACK_IMPORTED_MODULE_3__["ListaErrores"](); // TABLA SIMBOLOS

          var reporteTabla = tabla.generarReporteTablaObjetos(salidaG.objetos); // BNF

          var gramBnf = new _AST_GramaticaBNF__WEBPACK_IMPORTED_MODULE_1__["GramaticaBNF"](salidaG.reporteBNF, salidaG.reporteBNF2);
          var reporteBNF = gramBnf.getBNFReport(); // DOT CST

          var reporteCST = arbolCST.generarArbolCST(salidaG.objetos); //Errores

          var errores = Listaerrores.generateHtmlBody(salidaG.lErrores, Listaerrores.validateEtiquetas(salidaG.objetos));
          var ret = {
            tablaRep: reporteTabla,
            bnfRep: reporteBNF,
            cstRep: reporteCST,
            encoding: salidaG.encoding,
            objetos: salidaG.objetos,
            errores: errores
          };
          return ret;
        }
      }]);

      return AnalizadorASCXML;
    }();
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Arbol/Ejecucion.ts":
  /*!*************************************************!*\
    !*** ./src/analizadorXQUERY/Arbol/Ejecucion.ts ***!
    \*************************************************/

  /*! exports provided: EjecucionXpath */

  /***/
  function srcAnalizadorXQUERYArbolEjecucionTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EjecucionXpath", function () {
      return EjecucionXpath;
    });

    var EjecucionXpath = /*#__PURE__*/function () {
      function EjecucionXpath(objetos, dot) {
        _classCallCheck(this, EjecucionXpath);

        this.objetos = objetos;
        this.dot = dot;
      } //constructor(){}


      _createClass(EjecucionXpath, [{
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

          return this.dot;
        }
      }, {
        key: "ejecutarNodoArbol",
        value: function ejecutarNodoArbol(objeto) {
          var aux = objeto.estado + objeto.identificador;

          if (objeto.nodos.length > 0) {
            aux += this.ejecutarNodoArbol(objeto.nodos[0]);
          }

          return aux;
        }
      }]);

      return EjecucionXpath;
    }();
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Arbol/GramaticaBNF.ts":
  /*!****************************************************!*\
    !*** ./src/analizadorXQUERY/Arbol/GramaticaBNF.ts ***!
    \****************************************************/

  /*! exports provided: GramaticaBNF */

  /***/
  function srcAnalizadorXQUERYArbolGramaticaBNFTs(module, __webpack_exports__, __webpack_require__) {
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
  "./src/analizadorXQUERY/Arbol/Nodo.ts":
  /*!********************************************!*\
    !*** ./src/analizadorXQUERY/Arbol/Nodo.ts ***!
    \********************************************/

  /*! exports provided: Nodo */

  /***/
  function srcAnalizadorXQUERYArbolNodoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Nodo", function () {
      return Nodo;
    });

    var Nodo = function Nodo(tipo, line, column) {
      _classCallCheck(this, Nodo);

      this.tipo = tipo;
      this.line = line;
      this.column = column;
    };
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Arbol/NodoAST.ts":
  /*!***********************************************!*\
    !*** ./src/analizadorXQUERY/Arbol/NodoAST.ts ***!
    \***********************************************/

  /*! exports provided: NodoAST */

  /***/
  function srcAnalizadorXQUERYArbolNodoASTTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NodoAST", function () {
      return NodoAST;
    }); //import LinkedList from 'ts-linked-list';


    var NodoAST = /*#__PURE__*/function () {
      function NodoAST(valor) {
        _classCallCheck(this, NodoAST);

        this.hijos = new Array();
        this.valor = valor;
      }

      _createClass(NodoAST, [{
        key: "setHijos",
        value: function setHijos(hijos) {
          this.hijos = hijos;
        }
      }, {
        key: "agregarHijo",
        value: function agregarHijo(hijo) {
          if (hijo instanceof NodoAST) {
            this.hijos.push(hijo);
          } else {
            this.hijos.push(new NodoAST(hijo));
          }
        }
      }, {
        key: "agregarHijos",
        value: function agregarHijos(hijos) {
          var _this10 = this;

          hijos.forEach(function (hijo) {
            return _this10.hijos.push(hijo);
          });
        }
      }, {
        key: "agregarPrimerHijo",
        value: function agregarPrimerHijo(hijo) {
          if (hijo instanceof String) {
            this.hijos.push(new NodoAST(hijo));
          } else if (hijo instanceof NodoAST) {
            this.hijos.push(hijo);
          }
        }
      }, {
        key: "getValor",
        value: function getValor() {
          return this.valor;
        }
      }, {
        key: "setValor",
        value: function setValor(cad) {
          this.valor = cad;
        }
      }, {
        key: "getHijos",
        value: function getHijos() {
          return this.hijos;
        }
      }]);

      return NodoAST;
    }();
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Arbol/NodoCST.ts":
  /*!***********************************************!*\
    !*** ./src/analizadorXQUERY/Arbol/NodoCST.ts ***!
    \***********************************************/

  /*! exports provided: NodoCST */

  /***/
  function srcAnalizadorXQUERYArbolNodoCSTTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NodoCST", function () {
      return NodoCST;
    });

    var NodoCST = /*#__PURE__*/function () {
      function NodoCST(valor) {
        _classCallCheck(this, NodoCST);

        this.hijos = new Array();
        this.valor = valor;
      }

      _createClass(NodoCST, [{
        key: "setHijos",
        value: function setHijos(hijos) {
          this.hijos = hijos;
        }
      }, {
        key: "agregarHijo",
        value: function agregarHijo(hijo) {
          if (hijo instanceof NodoCST) {
            this.hijos.push(hijo);
          } else {
            this.hijos.push(new NodoCST(hijo));
          }
        }
      }, {
        key: "agregarHijos",
        value: function agregarHijos(hijos) {
          var _this11 = this;

          hijos.forEach(function (hijo) {
            return _this11.hijos.push(hijo);
          });
        }
      }, {
        key: "agregarPrimerHijo",
        value: function agregarPrimerHijo(hijo) {
          if (hijo instanceof String) {
            this.hijos.push(new NodoCST(hijo));
          } else if (hijo instanceof NodoCST) {
            this.hijos.push(hijo);
          }
        }
      }, {
        key: "getValor",
        value: function getValor() {
          return this.valor;
        }
      }, {
        key: "setValor",
        value: function setValor(cad) {
          this.valor = cad;
        }
      }, {
        key: "getHijos",
        value: function getHijos() {
          return this.hijos;
        }
      }]);

      return NodoCST;
    }();
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Expresiones/Aritmetica.ts":
  /*!********************************************************!*\
    !*** ./src/analizadorXQUERY/Expresiones/Aritmetica.ts ***!
    \********************************************************/

  /*! exports provided: Aritmetica */

  /***/
  function srcAnalizadorXQUERYExpresionesAritmeticaTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Aritmetica", function () {
      return Aritmetica;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");
    /* harmony import */


    var _Varios_Error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Varios/Error */
    "./src/analizadorXQUERY/Varios/Error.ts");
    /* harmony import */


    var _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../Varios/Tipo */
    "./src/analizadorXQUERY/Varios/Tipo.ts");

    function esEntero(numero) {
      if (numero % 1 == 0) {
        return true;
      } else {
        return false;
      }
    }

    var Aritmetica = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_) {
      _inherits(Aritmetica, _Arbol_Nodo__WEBPACK_);

      var _super = _createSuper(Aritmetica);

      function Aritmetica(operadorIzq, operadorDer, operador, line, column) {
        var _this12;

        _classCallCheck(this, Aritmetica);

        _this12 = _super.call(this, null, line, column);
        _this12.operadorIzq = operadorIzq;
        _this12.operadorDer = operadorDer;
        _this12.operador = operador;
        return _this12;
      }

      _createClass(Aritmetica, [{
        key: "execute",
        value: function execute(table, tree) {
          if (this.operadorIzq !== null) {
            var resultadoIzq = this.operadorIzq.execute(table, tree);

            if (resultadoIzq instanceof _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]) {
              return resultadoIzq;
            }

            var resultadoDerecho = this.operadorDer.execute(table, tree);

            if (resultadoDerecho instanceof _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]) {
              return resultadoDerecho;
            }

            if (this.operador === '+') {
              //ENTERO + 
              if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                //ENTERO + ENTERO = ENTERO
                if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO);
                  return resultadoIzq + resultadoDerecho; //ENTERO + DECIMAL = DECIMAL
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq + resultadoDerecho; //ENTERO + STRING = STRING
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].STRING) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].STRING);
                  return resultadoIzq + resultadoDerecho;
                } //DOUBLE + 

              } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                //DOUBLE + ENTERO = DOUBLE
                if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq + resultadoDerecho; //DOUBLE + DOUBLE = DOUBLE
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq + resultadoDerecho; //DOUBLE + STRING = STRING
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].STRING) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].STRING);
                  return resultadoIzq + resultadoDerecho;
                } //STRING +

              } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].STRING) {
                //STRING + ENTERO = STRING
                if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].STRING);
                  return resultadoIzq + resultadoDerecho; //STRING + DOUBLE = STRING
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].STRING);
                  return resultadoIzq + resultadoDerecho; //STRING + STRING = STRING
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].STRING) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].STRING);
                  return resultadoIzq + resultadoDerecho;
                } else {
                  var error = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se pueden Sumar los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);
                  tree.errores.push(error); // tree.consola.push(error.toString());

                  return error;
                }
              } else {
                var _error = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se pueden Sumar los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error); // tree.consola.push(error.toString());

                return _error;
              }
            } else if (this.operador === '-') {
              //ENTERO - 
              if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                //ENTERO - ENTERO = ENTERO
                if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO);
                  return resultadoIzq - resultadoDerecho; //ENTERO - DECIMAL = DECIMAL
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq - resultadoDerecho;
                } else {
                  var _error2 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se pueden Restar los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                  tree.errores.push(_error2); // tree.consola.push(error.toString());

                  return _error2;
                } //DOUBLE -

              } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                //DOUBLE - ENTERO = DOUBLE
                if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq - resultadoDerecho; //DOUBLE - DOUBLE = DOUBLE
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq - resultadoDerecho;
                } else {
                  var _error3 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se pueden Restar los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                  tree.errores.push(_error3); // tree.consola.push(error.toString());

                  return _error3;
                }
              } else {
                var _error4 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se pueden Restar los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error4); // tree.consola.push(error.toString());

                return _error4;
              }
            } else if (this.operador === '*') {
              //ENTERO * 
              if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                //ENTERO * ENTERO = ENTERO
                if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO);
                  return resultadoIzq * resultadoDerecho; //ENTERO * DECIMAL = DECIMAL
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq * resultadoDerecho;
                } else {
                  var _error5 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se pueden Multiplicar los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                  tree.errores.push(_error5); // tree.consola.push(error.toString());

                  return _error5;
                } //DOUBLE *

              } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                //DOUBLE * ENTERO = DOUBLE
                if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq * resultadoDerecho; //DOUBLE * DOUBLE = DOUBLE
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq * resultadoDerecho;
                } else {
                  var _error6 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se pueden Multiplicar los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                  tree.errores.push(_error6); // tree.consola.push(error.toString());

                  return _error6;
                }
              } else {
                var _error7 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se pueden Multiplicar los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error7); // tree.consola.push(error.toString());

                return _error7;
              }
            } else if (this.operador === '/') {
              //DIVISION SOBRE 0
              if (resultadoDerecho === 0) {
                var _error8 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "Error aritmetico, La division con cero no esta permitida", this.line, this.column);

                tree.errores.push(_error8);
                return _error8;
              } //ENTERO / 


              if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                //ENTERO / ENTERO = DOUBLE
                if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq / resultadoDerecho; //DECIMAL / DECIMAL = DECIMAL
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq / resultadoDerecho;
                } else {
                  var _error9 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se pueden Dividir los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                  tree.errores.push(_error9); // tree.consola.push(error.toString());

                  return _error9;
                } //DOUBLE /

              } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                //DOUBLE / ENTERO = DOUBLE
                if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq / resultadoDerecho; //DOUBLE / DOUBLE = DOUBLE
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq / resultadoDerecho;
                } else {
                  var _error10 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se pueden Dividir los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                  tree.errores.push(_error10); // tree.consola.push(error.toString());

                  return _error10;
                }
              } else {
                var _error11 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se pueden Dividir los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error11); // tree.consola.push(error.toString());

                return _error11;
              }
            } else if (this.operador === '%') {
              //ENTERO % 
              if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                //ENTERO % ENTERO = DOUBLE
                if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq % resultadoDerecho; //ENTERO % DECIMAL = DECIMAL
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq % resultadoDerecho;
                } else {
                  var _error12 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se puede aplicar modulo con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                  tree.errores.push(_error12); // tree.consola.push(error.toString());

                  return _error12;
                } //DOUBLE %

              } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                //DOUBLE % ENTERO = DOUBLE
                if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].ENTERO) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq % resultadoDerecho; //DOUBLE % DOUBLE = DOUBLE
                } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL) {
                  this.tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_4__["tipos"].DECIMAL);
                  return resultadoIzq % resultadoDerecho;
                } else {
                  var _error13 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se puede aplicar modulo los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                  tree.errores.push(_error13); // tree.consola.push(error.toString());

                  return _error13;
                }
              } else {
                var _error14 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "No se puede aplicar modulo los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error14); // tree.consola.push(error.toString());

                return _error14;
              }
            } else {
              var _error15 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_3__["Error"]('Semantico', "Error, Operador desconocido", this.line, this.column);

              tree.errores.push(_error15);
              tree.consola.push(_error15.toString());
              return _error15;
            }
          }
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_1__["NodoAST"]("");

          if (this.operadorIzq != null) {
            nodo.agregarHijo(this.operadorIzq.getNodo());
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodo());
          } else {
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodo());
          }

          return nodo;
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_2__["NodoCST"]("ARITMETICA");

          if (this.operadorIzq != null) {
            nodo.agregarHijo(this.operadorIzq.getNodoCST());
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodoCST());
          } else {
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodoCST());
          }

          return nodo;
        }
      }]);

      return Aritmetica;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Expresiones/Logico.ts":
  /*!****************************************************!*\
    !*** ./src/analizadorXQUERY/Expresiones/Logico.ts ***!
    \****************************************************/

  /*! exports provided: Logico */

  /***/
  function srcAnalizadorXQUERYExpresionesLogicoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Logico", function () {
      return Logico;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Varios_Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Varios/Error */
    "./src/analizadorXQUERY/Varios/Error.ts");
    /* harmony import */


    var _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Varios/Tipo */
    "./src/analizadorXQUERY/Varios/Tipo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    var Logico = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_2) {
      _inherits(Logico, _Arbol_Nodo__WEBPACK_2);

      var _super2 = _createSuper(Logico);

      function Logico(operadorIzq, operadorDer, operador, line, column) {
        var _this13;

        _classCallCheck(this, Logico);

        _this13 = _super2.call(this, new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO), line, column);
        _this13.operadorIzq = operadorIzq;
        _this13.operadorDer = operadorDer;
        _this13.operador = operador;
        return _this13;
      }

      _createClass(Logico, [{
        key: "execute",
        value: function execute(table, tree) {
          if (this.operadorIzq !== null) {
            var resultadoIzq = this.operadorIzq.execute(table, tree);

            if (resultadoIzq instanceof _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
              return resultadoIzq;
            }

            var resultadoDer = this.operadorDer.execute(table, tree);

            if (resultadoDer instanceof _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
              return resultadoDer;
            }

            if (this.operador === '||') {
              if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO && this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
                return resultadoIzq || resultadoDer;
              } else {
                var error = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "No se puede operar OR con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);
                tree.errores.push(error); // tree.consola.push(error.toString());

                return error;
              }
            } else if (this.operador === '&&') {
              if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO && this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
                return resultadoIzq && resultadoDer;
              } else {
                var _error16 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "No se puede operar AND con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error16); // tree.consola.push(error.toString());

                return _error16;
              }
            } else {
              var _error17 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "Error, Operador desconocido", this.line, this.column);

              tree.errores.push(_error17);
              tree.consola.push(_error17.toString());
              return _error17;
            }
          } else {
            var _resultadoDer = this.operadorDer.execute(table, tree);

            if (_resultadoDer instanceof _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
              return _resultadoDer;
            }

            if (this.operador === '!') {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
                return !_resultadoDer;
              } else {
                var _error18 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "No se puede operar Not con el tipo ".concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error18); // tree.consola.push(error.toString());

                return _error18;
              }
            } else {
              var _error19 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "Error, Operador desconocido", this.line, this.column);

              tree.errores.push(_error19); // tree.consola.push(error.toString());

              return _error19;
            }
          }
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("");

          if (this.operadorIzq != null) {
            nodo.agregarHijo(this.operadorIzq.getNodo());
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodo());
          } else {
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodo());
          }

          return nodo;
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("LOGICO");

          if (this.operadorIzq != null) {
            nodo.agregarHijo(this.operadorIzq.getNodoCST());
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodoCST());
          } else {
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodoCST());
          }

          return nodo;
        }
      }]);

      return Logico;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Expresiones/NodoX.ts":
  /*!***************************************************!*\
    !*** ./src/analizadorXQUERY/Expresiones/NodoX.ts ***!
    \***************************************************/

  /*! exports provided: NodoX */

  /***/
  function srcAnalizadorXQUERYExpresionesNodoXTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NodoX", function () {
      return NodoX;
    });

    var NodoX = function NodoX(estado, identificador, nodos) {
      _classCallCheck(this, NodoX);

      this.estado = estado;
      this.identificador = identificador;
      this.nodos = nodos;
    };
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Expresiones/Primitivo.ts":
  /*!*******************************************************!*\
    !*** ./src/analizadorXQUERY/Expresiones/Primitivo.ts ***!
    \*******************************************************/

  /*! exports provided: Primitivo */

  /***/
  function srcAnalizadorXQUERYExpresionesPrimitivoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Primitivo", function () {
      return Primitivo;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts"); // Esta clase crea un nodo del tipo primitivo, ya sea int, double, string, char, boolean


    var Primitivo = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_3) {
      _inherits(Primitivo, _Arbol_Nodo__WEBPACK_3);

      var _super3 = _createSuper(Primitivo);

      function Primitivo(tipo, valor, line, column) {
        var _this14;

        _classCallCheck(this, Primitivo);

        _this14 = _super3.call(this, tipo, line, column);
        _this14.valor = valor;
        return _this14;
      }

      _createClass(Primitivo, [{
        key: "execute",
        value: function execute(table, tree) {
          return this.valor;
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_1__["NodoAST"]("");
          nodo.agregarHijo(this.valor + '');
          return nodo;
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_2__["NodoCST"]("PRIMITIVO");
          nodo.agregarHijo(this.valor + '');
          return nodo;
        }
      }]);

      return Primitivo;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Expresiones/Relacional.ts":
  /*!********************************************************!*\
    !*** ./src/analizadorXQUERY/Expresiones/Relacional.ts ***!
    \********************************************************/

  /*! exports provided: Relacional */

  /***/
  function srcAnalizadorXQUERYExpresionesRelacionalTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Relacional", function () {
      return Relacional;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Varios_Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Varios/Error */
    "./src/analizadorXQUERY/Varios/Error.ts");
    /* harmony import */


    var _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Varios/Tipo */
    "./src/analizadorXQUERY/Varios/Tipo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    var Relacional = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_4) {
      _inherits(Relacional, _Arbol_Nodo__WEBPACK_4);

      var _super4 = _createSuper(Relacional);

      function Relacional(operadorIzq, operadorDer, operador, line, column) {
        var _this15;

        _classCallCheck(this, Relacional);

        _this15 = _super4.call(this, new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO), line, column);
        _this15.operadorIzq = operadorIzq;
        _this15.operadorDer = operadorDer;
        _this15.operador = operador;
        return _this15;
      }

      _createClass(Relacional, [{
        key: "execute",
        value: function execute(table, tree) {
          var resultadoIzq = this.operadorIzq.execute(table, tree);

          if (resultadoIzq instanceof _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
            return resultadoIzq;
          }

          var resultadoDer = this.operadorDer.execute(table, tree);

          if (resultadoDer instanceof _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
            return resultadoDer;
          }

          if (this.operador === '<') {
            if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq < resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq < resultadoDer;
              } else {
                var error = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);
                tree.errores.push(error); // tree.consola.push(error.toString());

                return error;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq < resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq < resultadoDer;
              } else {
                var _error20 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error20); // tree.consola.push(error.toString());

                return _error20;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
                return resultadoIzq < resultadoDer;
              } else {
                var _error21 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR QUE se esta tratando de operar con los tipos".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error21); // tree.consola.push(error.toString());

                return _error21;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
                return resultadoIzq < resultadoDer;
              } else {
                var _error22 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error22); // tree.consola.push(error.toString());

                return _error22;
              }
            } else {
              var _error23 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

              tree.errores.push(_error23); // tree.consola.push(error.toString());

              return _error23;
            }
          } else if (this.operador === 'lt') {
            if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq < resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq < resultadoDer;
              } else {
                var _error24 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error24); // tree.consola.push(error.toString());

                return _error24;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq < resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq < resultadoDer;
              } else {
                var _error25 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error25); // tree.consola.push(error.toString());

                return _error25;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
                return resultadoIzq < resultadoDer;
              } else {
                var _error26 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR QUE se esta tratando de operar con los tipos".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error26); // tree.consola.push(error.toString());

                return _error26;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
                return resultadoIzq < resultadoDer;
              } else {
                var _error27 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error27); // tree.consola.push(error.toString());

                return _error27;
              }
            } else {
              var _error28 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

              tree.errores.push(_error28); // tree.consola.push(error.toString());

              return _error28;
            }
          } else if (this.operador === '<=') {
            if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq <= resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq <= resultadoDer;
              } else {
                var _error29 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error29); // tree.consola.push(error.toString());

                return _error29;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq <= resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq <= resultadoDer;
              } else {
                var _error30 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error30); // tree.consola.push(error.toString());

                return _error30;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
                return resultadoIzq <= resultadoDer;
              } else {
                var _error31 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error31); // tree.consola.push(error.toString());

                return _error31;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
                return resultadoIzq <= resultadoDer;
              } else {
                var _error32 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error32); // tree.consola.push(error.toString());

                return _error32;
              }
            } else {
              var _error33 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

              tree.errores.push(_error33); // tree.consola.push(error.toString());

              return _error33;
            }
          } else if (this.operador === 'gt') {
            if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq > resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq > resultadoDer;
              } else {
                var _error34 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error34); // tree.consola.push(error.toString());

                return _error34;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq > resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq > resultadoDer;
              } else {
                var _error35 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error35); // tree.consola.push(error.toString());

                return _error35;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
                return resultadoIzq > resultadoDer;
              } else {
                var _error36 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error36); // tree.consola.push(error.toString());

                return _error36;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
                return resultadoIzq > resultadoDer;
              } else {
                var _error37 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error37); // tree.consola.push(error.toString());

                return _error37;
              }
            } else {
              var _error38 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

              tree.errores.push(_error38); // tree.consola.push(error.toString());

              return _error38;
            }
          } else if (this.operador === '>') {
            if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq > resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq > resultadoDer;
              } else {
                var _error39 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error39); // tree.consola.push(error.toString());

                return _error39;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq > resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq > resultadoDer;
              } else {
                var _error40 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error40); // tree.consola.push(error.toString());

                return _error40;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
                return resultadoIzq > resultadoDer;
              } else {
                var _error41 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error41); // tree.consola.push(error.toString());

                return _error41;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
                return resultadoIzq > resultadoDer;
              } else {
                var _error42 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error42); // tree.consola.push(error.toString());

                return _error42;
              }
            } else {
              var _error43 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

              tree.errores.push(_error43); // tree.consola.push(error.toString());

              return _error43;
            }
          } else if (this.operador === '>=') {
            if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq >= resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq >= resultadoDer;
              } else {
                var _error44 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error44); // tree.consola.push(error.toString());

                return _error44;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq >= resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq >= resultadoDer;
              } else {
                var _error45 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error45); // tree.consola.push(error.toString());

                return _error45;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
                return resultadoIzq >= resultadoDer;
              } else {
                var _error46 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error46); // tree.consola.push(error.toString());

                return _error46;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
                return resultadoIzq >= resultadoDer;
              } else {
                var _error47 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error47); // tree.consola.push(error.toString());

                return _error47;
              }
            } else {
              var _error48 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

              tree.errores.push(_error48); // tree.consola.push(error.toString());

              return _error48;
            }
          } else if (this.operador === '!=') {
            if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq != resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq != resultadoDer;
              } else {
                var _error49 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error49); // tree.consola.push(error.toString());

                return _error49;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq != resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq != resultadoDer;
              } else {
                var _error50 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error50); // tree.consola.push(error.toString());

                return _error50;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
                return resultadoIzq != resultadoDer;
              } else {
                var _error51 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error51); // tree.consola.push(error.toString());

                return _error51;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
                return resultadoIzq != resultadoDer;
              } else {
                var _error52 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error52); // tree.consola.push(error.toString());

                return _error52;
              }
            } else {
              var _error53 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

              tree.errores.push(_error53); // tree.consola.push(error.toString());

              return _error53;
            }
          } else if (this.operador === '==') {
            if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq == resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq == resultadoDer;
              } else {
                var _error54 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional IGUAL A se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error54); // tree.consola.push(error.toString());

                return _error54;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
                return resultadoIzq == resultadoDer;
              } else if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
                return resultadoIzq == resultadoDer;
              } else {
                var _error55 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional IGUAL A se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error55); // tree.consola.push(error.toString());

                return _error55;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
                return resultadoIzq == resultadoDer;
              } else {
                var _error56 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional IGUAL A se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error56); // tree.consola.push(error.toString());

                return _error56;
              }
            } else if (this.operadorIzq.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
              if (this.operadorDer.tipo.tipo === _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
                return resultadoIzq == resultadoDer;
              } else {
                var _error57 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional IGUAL A se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

                tree.errores.push(_error57); // tree.consola.push(error.toString());

                return _error57;
              }
            } else {
              var _error58 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "El operador relacional IGUAL A se esta tratando de operar con los tipos ".concat(this.operadorIzq.tipo, " y ").concat(this.operadorDer.tipo), this.line, this.column);

              tree.errores.push(_error58); // tree.consola.push(error.toString());

              return _error58;
            }
          } else {
            var _error59 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "Operador desconocido", this.line, this.column);

            tree.errores.push(_error59); // tree.consola.push(error.toString());

            return _error59;
          }
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("");
          nodo.agregarHijo(this.operadorIzq.getNodo());
          nodo.agregarHijo(this.operador + "");
          nodo.agregarHijo(this.operadorDer.getNodo());
          return nodo;
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("RELACIONAL");
          nodo.agregarHijo(this.operadorIzq.getNodoCST());
          nodo.agregarHijo(this.operador + "");
          nodo.agregarHijo(this.operadorDer.getNodoCST());
          return nodo;
        }
      }]);

      return Relacional;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Expresiones/Substring.ts":
  /*!*******************************************************!*\
    !*** ./src/analizadorXQUERY/Expresiones/Substring.ts ***!
    \*******************************************************/

  /*! exports provided: Substrings */

  /***/
  function srcAnalizadorXQUERYExpresionesSubstringTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Substrings", function () {
      return Substrings;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Varios/Exepciones */
    "./src/analizadorXQUERY/Varios/Exepciones.ts");
    /* harmony import */


    var _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Varios/Tipo */
    "./src/analizadorXQUERY/Varios/Tipo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    var Substrings = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_5) {
      _inherits(Substrings, _Arbol_Nodo__WEBPACK_5);

      var _super5 = _createSuper(Substrings);

      function Substrings(expresion, inicio, fin, line, column) {
        var _this16;

        _classCallCheck(this, Substrings);

        _this16 = _super5.call(this, new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING), line, column);
        _this16.expresion = expresion;
        _this16.inicio = inicio;
        _this16.fin = fin;
        return _this16;
      }

      _createClass(Substrings, [{
        key: "execute",
        value: function execute(table, tree) {
          try {
            var resultado = this.expresion.execute(table, tree);
            var ini = this.inicio.execute(table, tree);
            var fini = this.fin.execute(table, tree);

            if (resultado instanceof _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__["Excepcion"]) {
              return resultado;
            } else {
              if (fini == -1) {
                return resultado.substring(ini);
              } else {
                return resultado.substring(ini, fini);
              }
            }
          } catch (err) {
            var error = new _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__["Excepcion"]('Semantico', "Ha ocurrido un error al devolver el tipo", this.line, this.column);
            tree.errores.push(error);
            tree.consola.push(error.toString());
            return error;
          }
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          try {
            var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("");
            nodo.agregarHijo("ToString");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijo(")");
            return nodo;
          } catch (err) {
            var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("");
            return nodo;
          }
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          try {
            var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("SUBSTRING");
            nodo.agregarHijo("SUBSTRING");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodoCST());
            nodo.agregarHijo(",");
            nodo.agregarHijo(this.inicio.getNodoCST());
            nodo.agregarHijo(",");
            nodo.agregarHijo(this.fin.getNodoCST());
            nodo.agregarHijo(")");
            return nodo;
          } catch (err) {
            var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("SUBSTRING");
            return nodo;
          }
        }
      }]);

      return Substrings;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Expresiones/ToLower.ts":
  /*!*****************************************************!*\
    !*** ./src/analizadorXQUERY/Expresiones/ToLower.ts ***!
    \*****************************************************/

  /*! exports provided: ToLower */

  /***/
  function srcAnalizadorXQUERYExpresionesToLowerTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ToLower", function () {
      return ToLower;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Varios/Exepciones */
    "./src/analizadorXQUERY/Varios/Exepciones.ts");
    /* harmony import */


    var _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Varios/Tipo */
    "./src/analizadorXQUERY/Varios/Tipo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    var ToLower = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_6) {
      _inherits(ToLower, _Arbol_Nodo__WEBPACK_6);

      var _super6 = _createSuper(ToLower);

      function ToLower(expresion, line, column) {
        var _this17;

        _classCallCheck(this, ToLower);

        _this17 = _super6.call(this, new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING), line, column);
        _this17.expresion = expresion;
        return _this17;
      }

      _createClass(ToLower, [{
        key: "execute",
        value: function execute(table, tree) {
          try {
            var resultado = this.expresion.execute(table, tree);

            if (resultado instanceof _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__["Excepcion"]) {
              return resultado;
            } else {
              return resultado.toLowerCase();
            }
          } catch (err) {
            var error = new _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__["Excepcion"]('Semantico', "Ha ocurrido un error al convertir en minusculas", this.line, this.column);
            tree.errores.push(error);
            tree.consola.push(error.toString());
            return error;
          }
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          try {
            var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("");
            nodo.agregarHijo("ToLower");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijo(")");
            return nodo;
          } catch (err) {
            var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("");
            return nodo;
          }
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          try {
            var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("TOLOWER");
            nodo.agregarHijo("ToLower");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodoCST());
            nodo.agregarHijo(")");
            return nodo;
          } catch (err) {
            var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("ToLower");
            return nodo;
          }
        }
      }]);

      return ToLower;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Expresiones/ToNumber.ts":
  /*!******************************************************!*\
    !*** ./src/analizadorXQUERY/Expresiones/ToNumber.ts ***!
    \******************************************************/

  /*! exports provided: ToNumber */

  /***/
  function srcAnalizadorXQUERYExpresionesToNumberTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ToNumber", function () {
      return ToNumber;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Varios/Exepciones */
    "./src/analizadorXQUERY/Varios/Exepciones.ts");
    /* harmony import */


    var _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Varios/Tipo */
    "./src/analizadorXQUERY/Varios/Tipo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    var ToNumber = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_7) {
      _inherits(ToNumber, _Arbol_Nodo__WEBPACK_7);

      var _super7 = _createSuper(ToNumber);

      function ToNumber(expresion, line, column) {
        var _this18;

        _classCallCheck(this, ToNumber);

        _this18 = _super7.call(this, new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING), line, column);
        _this18.expresion = expresion;
        return _this18;
      }

      _createClass(ToNumber, [{
        key: "execute",
        value: function execute(table, tree) {
          try {
            var resultado = this.expresion.execute(table, tree);

            if (resultado instanceof _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__["Excepcion"]) {
              return resultado;
            } else {
              var r = parseInt(resultado);
              return r;
            }
          } catch (err) {
            var error = new _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__["Excepcion"]('Semantico', "Ha ocurrido un error al devolver el tipo", this.line, this.column);
            tree.errores.push(error);
            tree.consola.push(error.toString());
            return error;
          }
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          try {
            var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("");
            nodo.agregarHijo("ToString");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijo(")");
            return nodo;
          } catch (err) {
            var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("");
            return nodo;
          }
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          try {
            var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("TONUMBER");
            nodo.agregarHijo("ToNumber");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodoCST());
            nodo.agregarHijo(")");
            return nodo;
          } catch (err) {
            var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("ToNumber");
            return nodo;
          }
        }
      }]);

      return ToNumber;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Expresiones/ToString.ts":
  /*!******************************************************!*\
    !*** ./src/analizadorXQUERY/Expresiones/ToString.ts ***!
    \******************************************************/

  /*! exports provided: ToString */

  /***/
  function srcAnalizadorXQUERYExpresionesToStringTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ToString", function () {
      return ToString;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Varios/Exepciones */
    "./src/analizadorXQUERY/Varios/Exepciones.ts");
    /* harmony import */


    var _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Varios/Tipo */
    "./src/analizadorXQUERY/Varios/Tipo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    var ToString = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_8) {
      _inherits(ToString, _Arbol_Nodo__WEBPACK_8);

      var _super8 = _createSuper(ToString);

      function ToString(expresion, line, column) {
        var _this19;

        _classCallCheck(this, ToString);

        _this19 = _super8.call(this, new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING), line, column);
        _this19.expresion = expresion;
        return _this19;
      }

      _createClass(ToString, [{
        key: "execute",
        value: function execute(table, tree) {
          try {
            var resultado = this.expresion.execute(table, tree);

            if (resultado instanceof _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__["Excepcion"]) {
              return resultado;
            } else {
              return resultado.toString();
            }
          } catch (err) {
            var error = new _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__["Excepcion"]('Semantico', "Ha ocurrido un error al devolver el tipo", this.line, this.column);
            tree.errores.push(error);
            tree.consola.push(error.toString());
            return error;
          }
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          try {
            var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("");
            nodo.agregarHijo("ToString");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijo(")");
            return nodo;
          } catch (err) {
            var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("");
            return nodo;
          }
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          try {
            var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("TOSTRING");
            nodo.agregarHijo("ToString");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodoCST());
            nodo.agregarHijo(")");
            return nodo;
          } catch (err) {
            var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("ToString");
            return nodo;
          }
        }
      }]);

      return ToString;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Expresiones/identificador.ts":
  /*!***********************************************************!*\
    !*** ./src/analizadorXQUERY/Expresiones/identificador.ts ***!
    \***********************************************************/

  /*! exports provided: Identificador */

  /***/
  function srcAnalizadorXQUERYExpresionesIdentificadorTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Identificador", function () {
      return Identificador;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Varios_Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Varios/Error */
    "./src/analizadorXQUERY/Varios/Error.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    var Identificador = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_9) {
      _inherits(Identificador, _Arbol_Nodo__WEBPACK_9);

      var _super9 = _createSuper(Identificador);

      function Identificador(id, line, column) {
        var _this20;

        _classCallCheck(this, Identificador);

        _this20 = _super9.call(this, null, line, column);
        _this20.id = id;
        return _this20;
      }

      _createClass(Identificador, [{
        key: "execute",
        value: function execute(table, tree) {
          var variable;
          variable = table.getVariable(this.id);

          if (variable == null) {
            var error = new _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]('Semantico', "La variable {".concat(this.id, "} no ha sido encontrada"), this.line, this.column);
            tree.errores.push(error);
            return error;
          }

          this.tipo = variable.tipo;
          this.valor = variable.valor;
          return variable.valor;
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_2__["NodoAST"]("");
          var nodo2 = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_2__["NodoAST"](this.id + "");
          nodo2.agregarHijo(this.valor + "");
          nodo.agregarHijo(nodo2);
          return nodo;
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_3__["NodoCST"]("IDENTIFICADOR");
          var nodo2 = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_3__["NodoCST"](this.id + "");
          nodo2.agregarHijo(this.valor + "");
          nodo.agregarHijo(nodo2);
          return nodo;
        }
      }]);

      return Identificador;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Expresiones/uppercase.ts":
  /*!*******************************************************!*\
    !*** ./src/analizadorXQUERY/Expresiones/uppercase.ts ***!
    \*******************************************************/

  /*! exports provided: ToUpper */

  /***/
  function srcAnalizadorXQUERYExpresionesUppercaseTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ToUpper", function () {
      return ToUpper;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Varios/Exepciones */
    "./src/analizadorXQUERY/Varios/Exepciones.ts");
    /* harmony import */


    var _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Varios/Tipo */
    "./src/analizadorXQUERY/Varios/Tipo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    var ToUpper = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_10) {
      _inherits(ToUpper, _Arbol_Nodo__WEBPACK_10);

      var _super10 = _createSuper(ToUpper);

      function ToUpper(expresion, line, column) {
        var _this21;

        _classCallCheck(this, ToUpper);

        _this21 = _super10.call(this, new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING), line, column);
        _this21.expresion = expresion;
        return _this21;
      }

      _createClass(ToUpper, [{
        key: "execute",
        value: function execute(table, tree) {
          try {
            var resultado = this.expresion.execute(table, tree);

            if (resultado instanceof _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__["Excepcion"]) {
              return resultado;
            } else {
              return resultado.toUpperCase();
            }
          } catch (err) {
            var error = new _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__["Excepcion"]('Semantico', "Ha ocurrido un error al convertir en mayusculas", this.line, this.column);
            tree.errores.push(error);
            tree.consola.push(error.toString());
            return error;
          }
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          try {
            var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("");
            nodo.agregarHijo("ToUpper");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijo(")");
            return nodo;
          } catch (err) {
            var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("");
            return nodo;
          }
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          try {
            var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("TOUPPER");
            nodo.agregarHijo("ToUpper");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodoCST());
            nodo.agregarHijo(")");
            return nodo;
          } catch (err) {
            var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("ToUpper");
            return nodo;
          }
        }
      }]);

      return ToUpper;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/GramaticaXquery.js":
  /*!*************************************************!*\
    !*** ./src/analizadorXQUERY/GramaticaXquery.js ***!
    \*************************************************/

  /*! no static exports found */

  /***/
  function srcAnalizadorXQUERYGramaticaXqueryJs(module, exports, __webpack_require__) {
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
      var GramaticaXquery = function () {
        var o = function o(k, v, _o3, l) {
          for (_o3 = _o3 || {}, l = k.length; l--; _o3[k[l]] = v) {
            ;
          }

          return _o3;
        },
            $V0 = [1, 10],
            $V1 = [1, 12],
            $V2 = [1, 17],
            $V3 = [1, 14],
            $V4 = [1, 11],
            $V5 = [1, 15],
            $V6 = [1, 16],
            $V7 = [1, 18],
            $V8 = [1, 19],
            $V9 = [1, 9],
            $Va = [5, 7, 20, 26, 28, 37, 39, 46, 49, 50, 51, 53],
            $Vb = [1, 24],
            $Vc = [1, 33],
            $Vd = [1, 32],
            $Ve = [1, 34],
            $Vf = [1, 29],
            $Vg = [1, 30],
            $Vh = [1, 31],
            $Vi = [5, 7, 20, 23, 26, 28, 37, 39, 46, 49, 50, 51, 53],
            $Vj = [1, 47],
            $Vk = [1, 48],
            $Vl = [1, 49],
            $Vm = [1, 50],
            $Vn = [1, 51],
            $Vo = [1, 52],
            $Vp = [1, 53],
            $Vq = [1, 54],
            $Vr = [1, 55],
            $Vs = [1, 56],
            $Vt = [1, 57],
            $Vu = [1, 58],
            $Vv = [1, 59],
            $Vw = [5, 7, 14, 20, 23, 26, 28, 37, 39, 41, 46, 47, 49, 50, 51, 53, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68],
            $Vx = [1, 70],
            $Vy = [1, 72],
            $Vz = [1, 69],
            $VA = [1, 71],
            $VB = [1, 73],
            $VC = [14, 23],
            $VD = [14, 23, 73],
            $VE = [1, 101],
            $VF = [2, 74],
            $VG = [1, 108],
            $VH = [1, 109],
            $VI = [1, 106],
            $VJ = [1, 110],
            $VK = [1, 111],
            $VL = [5, 7, 14, 20, 23, 26, 28, 37, 39, 41, 46, 49, 50, 51, 53, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68],
            $VM = [5, 7, 14, 20, 23, 26, 28, 37, 39, 41, 46, 49, 50, 51, 53, 59, 61, 62, 63, 64, 65, 66, 67, 68],
            $VN = [5, 7, 14, 20, 23, 26, 28, 37, 39, 41, 46, 49, 50, 51, 53, 59, 65, 66, 67, 68],
            $VO = [11, 60, 75, 81, 82],
            $VP = [14, 23, 73, 79],
            $VQ = [1, 154],
            $VR = [1, 173],
            $VS = [1, 174],
            $VT = [1, 175],
            $VU = [1, 176],
            $VV = [1, 177],
            $VW = [2, 4],
            $VX = [1, 180],
            $VY = [14, 19, 22, 23];

        var parser = {
          trace: function trace() {},
          yy: {},
          symbols_: {
            "error": 2,
            "INICIO_XQUERY": 3,
            "INSTRUCCIONES": 4,
            "EOF": 5,
            "FUNCION": 6,
            "tk_declare": 7,
            "tk_function": 8,
            "MENU_LOCAL": 9,
            "tk_dosPuntos": 10,
            "tk_identificador": 11,
            "tk_parA": 12,
            "LISTA_DECLARACION_FUNCION": 13,
            "tk_parC": 14,
            "tk_as": 15,
            "tk_xs": 16,
            "TIPO_DATO": 17,
            "MENU_INTERROGA": 18,
            "llaveA": 19,
            "llaveC": 20,
            "tk_punto_coma": 21,
            "tk_Interroga": 22,
            "tk_coma": 23,
            "DECLARACION_FUNCION": 24,
            "tk_identificadorXQUERY": 25,
            "tk_local": 26,
            "tk_int": 27,
            "tk_string": 28,
            "tk_double": 29,
            "tk_DECIMAL": 30,
            "tk_integer": 31,
            "INSTRUCCION": 32,
            "DECLARACION_GLOBAL": 33,
            "IF": 34,
            "LLAMADA_FUNCION": 35,
            "RETURN_CICLO": 36,
            "tk_return": 37,
            "EXP_XQUERY": 38,
            "tk_if": 39,
            "tk_then": 40,
            "tk_else": 41,
            "Parametros_llamada": 42,
            "NATIVAS": 43,
            "DUALIDAD": 44,
            "XPATH": 45,
            "tk_upper": 46,
            "tk_menos": 47,
            "tk_case": 48,
            "tk_lower": 49,
            "tk_number": 50,
            "tk_subString": 51,
            "Parametros_funcion": 52,
            "tk_let": 53,
            "LISTA_ID": 54,
            "DECLARACION_INDIVIDUAL": 55,
            "tk_igualXQUERY": 56,
            "tk_mas": 57,
            "tk_div": 58,
            "tk_mod": 59,
            "tk_asterisco": 60,
            "tk_menor": 61,
            "tk_mayor": 62,
            "tk_menorIgual": 63,
            "tk_mayorIgual": 64,
            "tk_igual": 65,
            "tk_distinto": 66,
            "tk_or": 67,
            "tk_and": 68,
            "tk_entero": 69,
            "tk_decimal": 70,
            "tk_stringTexto": 71,
            "INICIO": 72,
            "tk_barra": 73,
            "INICIALES": 74,
            "tk_punto": 75,
            "DIAGONALES": 76,
            "DERIVADOSLIMITADO": 77,
            "DERIVACIONDIAGONAL": 78,
            "tk_diagonal": 79,
            "DERIVADOS": 80,
            "tk_node": 81,
            "tk_arroba": 82,
            "ATRIBUTO": 83,
            "tk_ParC": 84,
            "$accept": 0,
            "$end": 1
          },
          terminals_: {
            2: "error",
            5: "EOF",
            7: "tk_declare",
            8: "tk_function",
            10: "tk_dosPuntos",
            11: "tk_identificador",
            12: "tk_parA",
            14: "tk_parC",
            15: "tk_as",
            16: "tk_xs",
            19: "llaveA",
            20: "llaveC",
            21: "tk_punto_coma",
            22: "tk_Interroga",
            23: "tk_coma",
            25: "tk_identificadorXQUERY",
            26: "tk_local",
            27: "tk_int",
            28: "tk_string",
            29: "tk_double",
            30: "tk_DECIMAL",
            31: "tk_integer",
            37: "tk_return",
            39: "tk_if",
            40: "tk_then",
            41: "tk_else",
            46: "tk_upper",
            47: "tk_menos",
            48: "tk_case",
            49: "tk_lower",
            50: "tk_number",
            51: "tk_subString",
            53: "tk_let",
            56: "tk_igualXQUERY",
            57: "tk_mas",
            58: "tk_div",
            59: "tk_mod",
            60: "tk_asterisco",
            61: "tk_menor",
            62: "tk_mayor",
            63: "tk_menorIgual",
            64: "tk_mayorIgual",
            65: "tk_igual",
            66: "tk_distinto",
            67: "tk_or",
            68: "tk_and",
            69: "tk_entero",
            70: "tk_decimal",
            71: "tk_stringTexto",
            73: "tk_barra",
            75: "tk_punto",
            79: "tk_diagonal",
            81: "tk_node",
            82: "tk_arroba",
            84: "tk_ParC"
          },
          productions_: [0, [3, 2], [6, 17], [18, 1], [18, 0], [13, 3], [13, 1], [24, 6], [9, 1], [17, 1], [17, 1], [17, 1], [17, 1], [17, 1], [4, 2], [4, 1], [32, 1], [32, 1], [32, 1], [32, 1], [32, 1], [36, 2], [34, 6], [34, 8], [34, 8], [35, 6], [35, 1], [44, 1], [44, 1], [43, 6], [43, 6], [43, 4], [43, 4], [43, 6], [42, 3], [42, 1], [52, 3], [52, 1], [33, 2], [54, 3], [54, 1], [55, 3], [38, 3], [38, 3], [38, 3], [38, 3], [38, 3], [38, 3], [38, 3], [38, 3], [38, 3], [38, 3], [38, 3], [38, 3], [38, 3], [38, 1], [38, 1], [38, 1], [38, 1], [38, 3], [38, 6], [38, 1], [45, 1], [72, 3], [72, 1], [74, 4], [74, 2], [74, 3], [74, 4], [74, 2], [74, 4], [76, 1], [76, 2], [78, 3], [78, 0], [77, 1], [77, 1], [77, 3], [77, 2], [80, 1], [80, 2], [80, 1], [83, 1], [83, 1], [83, 3]],
          performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate
          /* action[1] */
          , $$
          /* vstack */
          , _$
          /* lstack */
          ) {
            var _this$$;

            /* this == yyval */
            var $0 = $$.length - 1;

            switch (yystate) {
              case 1:
                produccion.push("<INICIO_XQUERY> ::= <INSTRUCCIONES> EOF");
                accion.push("INICIO_XQUERY.Val ::= new Tree()");
                var arbol = new Tree($$[$0 - 1]);
                arbol.accion = accion;
                arbol.produccion = produccion;
                arbol.salida3d = codigo3Dxpath;
                return arbol;
                break;

              case 2:
                produccion.push("<FUNCION> ::= declare function <MENU_LOCAL> : identificador ( <LISTA_DECLARACION_FUNCION> ) as xs : <TIPO_DATO> <MENU_INTERROGA> { <INSTRUCCIONES>  } ;");
                accion.push("FUNCION.Val ::= new Declaracion()");
                this.$ = new DeclaracionMetodo($$[$0 - 5], $$[$0 - 12], $$[$0 - 10], $$[$0 - 2], _$[$0 - 16].first_line, _$[$0 - 16].first_column);
                break;

              case 3:
                produccion.push("<MENU_INTERROGA> ::= ?");
                accion.push("MENU_INTERROGA.Val ::= ?");
                this.$ = $$[$0];
                break;

              case 4:
                produccion.push("<MENU_INTERROGA> ::= epsilon");
                accion.push("MENU_INTERROGA.Val ::= vacio");
                this.$ = '';
                break;

              case 5:
                produccion.push("<LISTA_DECLARACION_FUNCION> ::= <LISTA_DECLARACION_FUNCION> , <DECLARACION_FUNCION>");
                accion.push("LISTA_DECLARACION_FUNCION.Val.push(DECLARACION_FUNCION.Val)");
                this.$.push($$[$0]);
                break;

              case 6:
                produccion.push("<LISTA_DECLARACION_FUNCION> ::= <DECLARACION_FUNCION>");
                accion.push("LISTA_DECLARACION_FUNCION.Val = [DECLARACION_FUNCION.Val]");
                this.$ = [$$[$0]];
                break;

              case 7:
                produccion.push("<DECLARACION_FUNCION> ::= identificador as xs : <TIPO_DATO> <MENU_INTERROGA>");
                accion.push("DECLARACION_FUNCION.Val = new Declaracion()");
                this.$ = new Declaracion($$[$0 - 1], $$[$0 - 5], null, _$[$0 - 5].first_line, _$[$0 - 5].first_column);
                break;

              case 8:
                produccion.push("<LMENU_LOCAL> ::= local");
                accion.push("MENU_LOCAL.Val = local");
                this.$ = $$[$0];
                break;

              case 9:
                produccion.push("<TIPO_DATO> ::= int");
                accion.push("TIPO_DATO.Val = new Tipo()");
                this.$ = new Tipo(tipos.ENTERO);
                break;

              case 10:
                produccion.push("<TIPO_DATO> ::= string");
                accion.push("TIPO_DATO.Val = new Tipo()");
                this.$ = new Tipo(tipos.STRING);
                break;

              case 11:
                produccion.push("<TIPO_DATO> ::= double");
                accion.push("TIPO_DATO.Val = new Tipo()");
                this.$ = new Tipo(tipos.DECIMAL);
                break;

              case 12:
                produccion.push("<TIPO_DATO> ::= decimal");
                accion.push("TIPO_DATO.Val = new Tipo()");
                this.$ = new Tipo(tipos.DECIMAL);
                break;

              case 13:
                produccion.push("<TIPO_DATO> ::= integer");
                accion.push("TIPO_DATO.Val = new Tipo()");
                this.$ = new Tipo(tipos.ENTERO);
                break;

              case 14:
                produccion.push("<INSTRUCCIONES> ::= <INSTRUCCIONES> <INSTRUCCION>");
                accion.push("INSTRUCCIONES.Val.push(INSTRUCCION.Val)");

                (_this$$ = this.$).push.apply(_this$$, _toConsumableArray($$[$0]));

                break;

              case 15:
                produccion.push("<INSTRUCCIONES> ::= <INSTRUCCION>");
                accion.push("INSTRUCCIONES.Val = [INSRUCCION.Val]");
                this.$ = _toConsumableArray($$[$0]);
                break;

              case 16:
                produccion.push("<INSTRUCCION> ::= <DECLARACION_GLOBAL>");
                accion.push("INSTRUCCION.Val = DECLARACION_GLOBAL.Val");
                this.$ = $$[$0];
                break;

              case 17:
                produccion.push("<INSTRUCCION> ::= <FUNCION>");
                accion.push("INSTRUCCION.Val = Funcion.Val");
                this.$ = [$$[$0]];
                break;

              case 18:
                produccion.push("<INSTRUCCION> ::= <IF>");
                accion.push("INSTRUCCION.Val = IF.Val");
                this.$ = [$$[$0]];
                break;

              case 19:
                produccion.push("<INSTRUCCION> ::= <LLAMDA_FUNCION>");
                accion.push("INSTRUCCION.Val = LLAMDA_FUNCION.Val");
                this.$ = [$$[$0]];
                break;

              case 20:
                produccion.push("<INSTRUCCION> ::= <RETURN_CICLO>");
                accion.push("INSTRUCCION.Val = RETURN_CICLO.Val");
                this.$ = [$$[$0]];
                break;

              case 21:
                produccion.push("<RETURN_CICLO> ::= return <EXP_QUERY>");
                accion.push("RETURN_CICLO.Val = new Retorno()");
                this.$ = new Retorno($$[$0], _$[$0 - 1].first_line, _$[$0 - 1].first_column);
                break;

              case 22:
                produccion.push("<IF> ::= if ( <EXP_QUERY> ) then <EXP_QUERY>");
                accion.push("IF.Val = new If()");
                this.$ = new If($$[$0 - 3], [new Retorno($$[$0], _$[$0 - 5].first_line, _$[$0 - 5].first_column)], [], _$[$0 - 5].first_line, _$[$0 - 5].first_column);
                break;

              case 23:
                produccion.push("<IF> ::= if ( <EXP_QUERY> ) then <EXP_QUERY> else <EXP_QUERY>");
                accion.push("IF.Val = new If()");
                this.$ = new If($$[$0 - 5], [new Retorno($$[$0 - 2], _$[$0 - 7].first_line, _$[$0 - 7].first_column)], [new Retorno($$[$0], _$[$0 - 7].first_line, _$[$0 - 7].first_column)], _$[$0 - 7].first_line, _$[$0 - 7].first_column);
                break;

              case 24:
                produccion.push("<IF> ::= if ( <EXP_QUERY> ) then <EXP_QUERY> else <If>");
                accion.push("IF.Val = new If()");
                this.$ = new If($$[$0 - 5], [new Retorno($$[$0 - 2], _$[$0 - 7].first_line, _$[$0 - 7].first_column)], [$$[$0]], _$[$0 - 7].first_line, _$[$0 - 7].first_column);
                break;

              case 25:
                produccion.push("<LLAMADA_FUNCION> ::= local : identificador ( <PARAMETROS_LLAMADA> )");
                accion.push("LLAMADA_FUNCION.Val = new LlamadaMetodo()");
                this.$ = new Print(new LlamadaMetodo($$[$0 - 3], $$[$0 - 1], _$[$0 - 5].first_line, _$[$0 - 5].first_column), _$[$0 - 5].first_line, _$[$0 - 5].first_column);
                break;

              case 26:
                this.$ = new Print($$[$0]);
                break;

              case 27:
                this.$ = $$[$0];
                break;

              case 28:
                this.$ = $$[$0];
                break;

              case 29:
                this.$ = new ToUpper($$[$0 - 1], _$[$0 - 5].first_line, _$[$0 - 5].first_column);
                break;

              case 30:
                this.$ = new ToLower($$[$0 - 1], _$[$0 - 5].first_line, _$[$0 - 5].first_column);
                break;

              case 31:
                this.$ = new ToString($$[$0 - 1], _$[$0 - 3].first_line, _$[$0 - 3].first_column);
                break;

              case 32:
                this.$ = new ToNumber($$[$0 - 1], _$[$0 - 3].first_line, _$[$0 - 3].first_column);
                break;

              case 33:
                this.$ = new Substrings($$[$0 - 3], $$[$0 - 1], new Primitivo(new Tipo(esEntero(Number(-1))), Number(-1), _$[$0 - 5].first_line, _$[$0 - 5].first_column), _$[$0 - 5].first_line, _$[$0 - 5].first_column);
                break;

              case 34:
                produccion.push("<PARAMETROS_LLAMADA> ::= <PARAMETROS_LLAMADA> , <XPATH>");
                accion.push("PARAMETROS_LLAMDA.Val.push(XPATH.Val)");
                this.$.push($$[$0]);
                break;

              case 35:
                produccion.push("<PARAMETROS_LLAMADA> ::= <XPATH>");
                accion.push("PARAMETROS_LLAMADA.Val = [XPATH.Val]");
                this.$ = [$$[$0]];
                break;

              case 36:
                produccion.push("<PARAMETROS_FUNCION> ::= <PARAMETROS_FUNCION> , <EXP_QUERY>");
                accion.push("PARAMETROS_FUNCION.Val.push(EXP_QUERY.Val)");
                this.$.push($$[$0]);
                break;

              case 37:
                produccion.push("<PARAMETROS_FUNCION> ::= <EXP_QUERY>");
                accion.push("PARAMETROS_FUNCION.Val = [EXP_QUERY.Val]");
                this.$ = [$$[$0]];
                break;

              case 38:
                produccion.push("<DECLARACION_GLOBAL> ::= let <LISTA_ID>");
                accion.push("DECLARACION_GLOBAL.Val = LISTA_ID.Val");
                this.$ = $$[$0];
                break;

              case 39:
                produccion.push("<LISTA_ID> ::= <LISTA_ID> , <DECLARACION_INDIVIDUAL>");
                accion.push("LISTA_ID.Val.push(DECLARACION_INDIVIDUAL.Val)");
                this.$.push($$[$0]);
                break;

              case 40:
                produccion.push("<LISTA_ID> ::= <DECLARACION_INDIVIDUAL>");
                accion.push("LISTA_ID.Val = [DECLARACION_INDIVIDUAL.Val]");
                this.$ = [$$[$0]];
                break;

              case 41:
                produccion.push("<DECLARACION_INDIVIDUAL> ::= identificador igual <EXP_QUERY>");
                accion.push("DECLARACION_INDIVIDUAL.Val = new Declaracion()");
                this.$ = new Declaracion($$[$0].tipo, $$[$0 - 2], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 42:
                produccion.push("<EXP_QUERY> ::= <EXP_QUERY> - <EXP_QUERY>");
                accion.push("EXP_QUERY.Val = new Aritmetica()");
                this.$ = new Aritmetica($$[$0 - 2], $$[$0], '-', _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 43:
                produccion.push("<EXP_QUERY> ::= <EXP_QUERY> + <EXP_QUERY>");
                accion.push("EXP_QUERY.Val = new Aritmetica()");
                this.$ = new Aritmetica($$[$0 - 2], $$[$0], '+', _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 44:
                produccion.push("<EXP_QUERY> ::= <EXP_QUERY> div <EXP_QUERY>");
                accion.push("EXP_QUERY.Val = new Aritmetica()");
                this.$ = new Aritmetica($$[$0 - 2], $$[$0], '/', _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 45:
                produccion.push("<EXP_QUERY> ::= <EXP_QUERY> mod <EXP_QUERY>");
                accion.push("EXP_QUERY.Val = new Aritmetica()");
                this.$ = new Aritmetica($$[$0 - 2], $$[$0], '%', _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 46:
                produccion.push("<EXP_QUERY> ::= <EXP_QUERY> * <EXP_QUERY>");
                accion.push("EXP_QUERY.Val = new Aritmetica()");
                this.$ = new Aritmetica($$[$0 - 2], $$[$0], '*', _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 47:
                produccion.push("<EXP_QUERY> ::= <EXP_QUERY> < <EXP_QUERY>");
                accion.push("EXP_QUERY.Val = new Relacional()");
                this.$ = new Relacional($$[$0 - 2], $$[$0], '<', _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 48:
                produccion.push("<EXP_QUERY> ::= <EXP_QUERY> > <EXP_QUERY>");
                accion.push("EXP_QUERY.Val = new Relacional()");
                this.$ = new Relacional($$[$0 - 2], $$[$0], '>', _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 49:
                produccion.push("<EXP_QUERY> ::= <EXP_QUERY> <= <EXP_QUERY>");
                accion.push("EXP_QUERY.Val = new Relacional()");
                this.$ = new Relacional($$[$0 - 2], $$[$0], '<=', _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 50:
                produccion.push("<EXP_QUERY> ::= <EXP_QUERY> >= <EXP_QUERY>");
                accion.push("EXP_QUERY.Val = new Relacional()");
                this.$ = new Relacional($$[$0 - 2], $$[$0], '>=', _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 51:
                produccion.push("<EXP_QUERY> ::= <EXP_QUERY> = <EXP_QUERY>");
                accion.push("EXP_QUERY.Val = new Relacional()");
                this.$ = new Relacional($$[$0 - 2], $$[$0], '==', _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 52:
                produccion.push("<EXP_QUERY> ::= <EXP_QUERY> != <EXP_QUERY>");
                accion.push("EXP_QUERY.Val = new Relacional()");
                this.$ = new Relacional($$[$0 - 2], $$[$0], '!=', _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 53:
                produccion.push("<EXP_QUERY> ::= <EXP_QUERY> or <EXP_QUERY>");
                accion.push("EXP_QUERY.Val = new Logico()");
                this.$ = new Logico($$[$0 - 2], $$[$0], '||', _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 54:
                produccion.push("<EXP_QUERY> ::= <EXP_QUERY> and <EXP_QUERY>");
                accion.push("EXP_QUERY.Val = new Logico()");
                this.$ = new Logico($$[$0 - 2], $$[$0], '&&', _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 55:
                produccion.push("<EXP_QUERY> ::= entero");
                accion.push("EXP_QUERY.Val = new Primitivo()");
                this.$ = new Primitivo(new Tipo(tipos.ENTERO), Number($$[$0]), _$[$0].first_line, _$[$0].first_column);
                break;

              case 56:
                produccion.push("<EXP_QUERY> ::= decimal");
                accion.push("EXP_QUERY.Val = new Primitivo()");
                this.$ = new Primitivo(new Tipo(tipos.DECIMAL), Number($$[$0]), _$[$0].first_line, _$[$0].first_column);
                break;

              case 57:
                produccion.push("<EXP_QUERY> ::= string");
                accion.push("EXP_QUERY.Val = new Primitivo()");
                this.$ = new Primitivo(new Tipo(tipos.STRING), $$[$0], _$[$0].first_line, _$[$0].first_column);
                break;

              case 58:
                produccion.push("<EXP_QUERY> ::= identificador");
                accion.push("EXP_QUERY.Val = new Identificador()");
                this.$ = new Identificador($$[$0], _$[$0].first_line, _$[$0].first_column);
                break;

              case 59:
                produccion.push("<EXP_QUERY> ::= ( <EXP_QUERY> )");
                accion.push("EXP_QUERY.Val = EXP_QUERY.Val");
                this.$ = $$[$0 - 1];
                break;

              case 60:
                produccion.push("<EXP_QUERY> ::= local : identificador ( <Parametros_funcion> )");
                accion.push("EXP_QUERY.Val = new LlamdaMetodo()");
                this.$ = new LlamadaMetodo($$[$0 - 3], $$[$0 - 1], _$[$0 - 5].first_line, _$[$0 - 5].first_column);
                break;

              case 61:
                this.$ = $$[$0];
                break;

              case 62:
                produccion.push('<XPATH> ::= <INICIO>');
                accion.push('XPATH.Val = INICIO.val');
                var analizador = new AnalizadorASCXML();
                var buscador = new xpathBusqueda();
                var ejecu = new EjecucionXpath($$[$0], "");
                var ret = analizador.ejecutarCodigo(localStorage.getItem("xml"));
                var tabla = ret.objetos;
                var query = ejecu.ejecutarArbol();

                if (query.includes("|")) {
                  buscador.getNodesByFilters("3", query, tabla);
                } else if (query[0] !== "/" && query[0] !== "//") {
                  buscador.getNodesByFilters("1", query, tabla);
                } else {
                  buscador.getNodesByFilters("2", query, tabla);
                }

                var retorno = buscador.returnListObjects();
                var dir = new xml3D();
                var salida3D = dir.getNodesByFilters(tabla, 0, buscador.returnListValues());
                salida3D = "// 3D de consulta: " + query + salida3D;
                codigo3Dxpath.push(salida3D);
                var valor = retorno[0].texto;
                var tipoR;

                if (valor.match(/^[0-9]+$/)) {
                  tipoR = new Tipo(esEntero(valor));
                  valor = parseInt(valor);
                } else if (valor.match(/^[0-9]+[.][0-9]+$/)) {
                  tipoR = new Tipo(esEntero(valor));
                  valor = parseInt(valor);
                } else {
                  tipoR = new Tipo(tipos.STRING);
                }

                this.$ = new Primitivo(tipoR, valor, _$[$0].first_line, _$[$0].first_column);
                break;

              case 63:
                produccion.push('<INICIO> ::= <INICIO> | <INICIALES>');
                accion.push('INICIO.Val = INICIO.push(INICIALES)');
                this.$.push($$[$0]);
                break;

              case 64:
                produccion.push('<INICIO> ::= <INICIALES>');
                accion.push('INICIO.Val = INICIALES.Val');
                this.$ = [$$[$0]];
                break;

              case 65:
                produccion.push("<INICIALES> ::= punto <DIAGONALES> <DERIVADOSLIMITADO> <DERIVAIONDIAGONAL>");
                accion.push('INICIALES.Val = new NodoX();');
                this.$ = new NodoX("", ".", [new NodoX($$[$0 - 2], $$[$0 - 1].val, _toConsumableArray($$[$0]))]);
                break;

              case 66:
                produccion.push("<INICIALES> ::= identificador <DERIVAIONDIAGONAL>");
                accion.push('INICIALES.Val = new NodoX();');
                this.$ = new NodoX("", $$[$0 - 1], _toConsumableArray($$[$0]));
                break;

              case 67:
                produccion.push("<INICIALES> ::= diagonal <DERIVADOS> <DERIVAIONDIAGONAL>");
                accion.push('INICIALES.Val = new NodoX();');
                this.$ = new NodoX($$[$0 - 2], $$[$0 - 1].val, _toConsumableArray($$[$0]));
                break;

              case 68:
                produccion.push("<INICIALES> ::= diagonal diagonal <DERIVADOSLIMITADO> <DERIVAIONDIAGONAL>");
                accion.push('INICIALES.Val = new NodoX();');
                this.$ = new NodoX("//", $$[$0 - 1].val, _toConsumableArray($$[$0]));
                break;

              case 69:
                produccion.push("<INICIALES> ::= asterisco <DERIVAIONDIAGONAL>");
                accion.push('INICIALES.Val = new NodoX();');
                this.$ = new NodoX("", $$[$0 - 1], _toConsumableArray($$[$0]));
                break;

              case 70:
                produccion.push("<INICIALES> ::= node() <DERIVAIONDIAGONAL>");
                accion.push('INICIALES.Val = new NodoX();');
                this.$ = new NodoX("", "node()", _toConsumableArray($$[$0]));
                break;

              case 71:
                produccion.push("<DIAGONALES> ::= diagoanl");
                accion.push('DIAGONALES.Val = /;');
                this.$ = $$[$0];
                break;

              case 72:
                produccion.push("<DIAGONALES> ::= diagonal diagonal");
                accion.push('DIAGONALES.Val = //');
                this.$ = "//";
                break;

              case 73:
                produccion.push("<DERIVACIONDIAGONAL> ::= <DIAGONALES> <DERIVADOS> <DERIVACIONDIAGONAL>");
                accion.push('DERIVACIONDIAGONAL.Val = []; DERIVACIONDIAGONAL.Val.push(new Nodo(tipo, id, predicado, fila, columna)); DERIVACIONDIAGONAL.push(DERIVACIONDIAGONAL)');
                this.$ = new Array();
                this.$.push(new NodoX($$[$0 - 2], $$[$0 - 1].val, _toConsumableArray($$[$0])));
                break;

              case 74:
                produccion.push("<DERIVACIONDIAGONAL> ::= epsilon");
                accion.push('DERIVACIONDIAGONAL.Val = [/*Vacio*/]');
                this.$ = [];
                break;

              case 75:
                produccion.push("<DERIVADOSLIMIADO> ::= identificador <PREDICATE>");
                accion.push('DERIVADOSLIMITADO.Val = identificador + PREDICATE.Val');
                this.$ = {
                  val: $$[$0],
                  pre: null
                };
                break;

              case 76:
                produccion.push("<DERIVADOSLIMIADO> ::= asterisco <PREDICATE>");
                accion.push('DERIVADOSLIMITADO.Val = \"*\" + PREDICATE.Val');
                this.$ = {
                  val: $$[$0],
                  pre: null
                };
                break;

              case 77:
                produccion.push("<DERIVADOSLIMIADO> ::= node() <PREDICATE>");
                accion.push('DERIVADOSLIMITADO.Val = \"@\" + ATRIBUTO.Val');
                this.$ = {
                  val: "node()",
                  pre: null
                };
                break;

              case 78:
                produccion.push("<DERIVADOSLIMIADO> ::= arroba <ATRIBUTO>");
                accion.push('DERIVADOSLIMITADO.Val = \"@\" + ATRIBUTO.Val');
                this.$ = {
                  val: $$[$0 - 1] + "" + $$[$0],
                  pre: null
                };
                break;

              case 79:
                produccion.push("<DERIVADOS> ::= punto");
                accion.push("DERIVADOS.Val = \".\" ");
                this.$ = {
                  val: $$[$0],
                  pre: null
                };
                break;

              case 80:
                produccion.push("<DERIVADOS> ::= doblePunto");
                accion.push('DERIVADOS.Val = \"..\"');
                this.$ = {
                  val: "..",
                  pre: null
                };
                break;

              case 81:
                produccion.push("<DERIVADOS> ::= <DERIVADOSLIMITADO>");
                accion.push('DERIVADOS.Val = DERIVADOSLIMITADO.Val');
                this.$ = $$[$0];
                break;

              case 82:
                produccion.push("<ATRIBUTO> ::= asterisco");
                accion.push('ATRIBUTO.Val = \"*\"');
                this.$ = $$[$0];
                break;

              case 83:
                produccion.push("<ATRIBUTO> ::= identificador");
                accion.push('ATRIBUTO.Val = identificador');
                this.$ = $$[$0];
                break;

              case 84:
                produccion.push("<ATRIBUTO> ::= node");
                accion.push('ATRIBUTO.Val = \"node()\"');
                this.$ = "node()";
                break;
            }
          },
          table: [{
            3: 1,
            4: 2,
            6: 5,
            7: $V0,
            26: $V1,
            28: $V2,
            32: 3,
            33: 4,
            34: 6,
            35: 7,
            36: 8,
            37: $V3,
            39: $V4,
            43: 13,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            53: $V9
          }, {
            1: [3]
          }, {
            5: [1, 20],
            6: 5,
            7: $V0,
            26: $V1,
            28: $V2,
            32: 21,
            33: 4,
            34: 6,
            35: 7,
            36: 8,
            37: $V3,
            39: $V4,
            43: 13,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            53: $V9
          }, o($Va, [2, 15]), o($Va, [2, 16]), o($Va, [2, 17]), o($Va, [2, 18]), o($Va, [2, 19]), o($Va, [2, 20]), {
            25: $Vb,
            54: 22,
            55: 23
          }, {
            8: [1, 25]
          }, {
            12: [1, 26]
          }, {
            10: [1, 27]
          }, o($Va, [2, 26]), {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 28,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            47: [1, 36]
          }, {
            47: [1, 37]
          }, {
            12: [1, 38]
          }, {
            12: [1, 39]
          }, {
            12: [1, 40]
          }, {
            1: [2, 1]
          }, o($Va, [2, 14]), o($Va, [2, 38], {
            23: [1, 41]
          }), o($Vi, [2, 40]), {
            56: [1, 42]
          }, {
            9: 43,
            26: [1, 44]
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 45,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            11: [1, 46]
          }, o($Va, [2, 21], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            59: $Vm,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr,
            65: $Vs,
            66: $Vt,
            67: $Vu,
            68: $Vv
          }), o($Vw, [2, 55]), o($Vw, [2, 56]), o($Vw, [2, 57]), o($Vw, [2, 58]), {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 60,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            10: [1, 61]
          }, o($Vw, [2, 61]), {
            48: [1, 62]
          }, {
            48: [1, 63]
          }, {
            11: $Vx,
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 66,
            43: 35,
            44: 64,
            45: 65,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            60: $Vy,
            69: $Vf,
            70: $Vg,
            71: $Vh,
            72: 67,
            74: 68,
            75: $Vz,
            79: $VA,
            81: $VB
          }, {
            11: $Vx,
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 66,
            43: 35,
            44: 74,
            45: 65,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            60: $Vy,
            69: $Vf,
            70: $Vg,
            71: $Vh,
            72: 67,
            74: 68,
            75: $Vz,
            79: $VA,
            81: $VB
          }, {
            11: $Vx,
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 66,
            43: 35,
            44: 75,
            45: 65,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            60: $Vy,
            69: $Vf,
            70: $Vg,
            71: $Vh,
            72: 67,
            74: 68,
            75: $Vz,
            79: $VA,
            81: $VB
          }, {
            25: $Vb,
            55: 76
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 77,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            10: [1, 78]
          }, {
            10: [2, 8]
          }, {
            14: [1, 79],
            47: $Vj,
            57: $Vk,
            58: $Vl,
            59: $Vm,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr,
            65: $Vs,
            66: $Vt,
            67: $Vu,
            68: $Vv
          }, {
            12: [1, 80]
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 81,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 82,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 83,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 84,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 85,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 86,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 87,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 88,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 89,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 90,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 91,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 92,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 93,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            14: [1, 94],
            47: $Vj,
            57: $Vk,
            58: $Vl,
            59: $Vm,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr,
            65: $Vs,
            66: $Vt,
            67: $Vu,
            68: $Vv
          }, {
            11: [1, 95]
          }, {
            12: [1, 96]
          }, {
            12: [1, 97]
          }, {
            14: [1, 98]
          }, o($VC, [2, 27]), o($VC, [2, 28], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            59: $Vm,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr,
            65: $Vs,
            66: $Vt,
            67: $Vu,
            68: $Vv
          }), o($VC, [2, 62], {
            73: [1, 99]
          }), o($VD, [2, 64]), {
            76: 100,
            79: $VE
          }, o($VD, $VF, {
            78: 102,
            76: 103,
            79: $VE
          }), {
            11: $VG,
            60: $VH,
            75: $VI,
            77: 107,
            79: [1, 105],
            80: 104,
            81: $VJ,
            82: $VK
          }, o($VD, $VF, {
            76: 103,
            78: 112,
            79: $VE
          }), {
            12: [1, 113]
          }, {
            14: [1, 114]
          }, {
            23: [1, 115]
          }, o($Vi, [2, 39]), o($Vi, [2, 41], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            59: $Vm,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr,
            65: $Vs,
            66: $Vt,
            67: $Vu,
            68: $Vv
          }), {
            11: [1, 116]
          }, {
            40: [1, 117]
          }, {
            11: $Vx,
            42: 118,
            45: 119,
            60: $Vy,
            72: 67,
            74: 68,
            75: $Vz,
            79: $VA,
            81: $VB
          }, o($Vw, [2, 42]), o($Vw, [2, 43]), o($VL, [2, 44], {
            47: $Vj,
            57: $Vk
          }), o([5, 7, 14, 20, 23, 26, 28, 37, 39, 41, 46, 49, 50, 51, 53, 59], [2, 45], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr,
            65: $Vs,
            66: $Vt,
            67: $Vu,
            68: $Vv
          }), o($VL, [2, 46], {
            47: $Vj,
            57: $Vk
          }), o($VM, [2, 47], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            60: $Vn
          }), o($VM, [2, 48], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            60: $Vn
          }), o($VM, [2, 49], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            60: $Vn
          }), o($VM, [2, 50], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            60: $Vn
          }), o($VN, [2, 51], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr
          }), o($VN, [2, 52], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr
          }), o([5, 7, 14, 20, 23, 26, 28, 37, 39, 41, 46, 49, 50, 51, 53, 59, 67], [2, 53], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr,
            65: $Vs,
            66: $Vt,
            68: $Vv
          }), o([5, 7, 14, 20, 23, 26, 28, 37, 39, 41, 46, 49, 50, 51, 53, 59, 67, 68], [2, 54], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr,
            65: $Vs,
            66: $Vt
          }), o($Vw, [2, 59]), {
            12: [1, 120]
          }, {
            11: $Vx,
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 66,
            43: 35,
            44: 121,
            45: 65,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            60: $Vy,
            69: $Vf,
            70: $Vg,
            71: $Vh,
            72: 67,
            74: 68,
            75: $Vz,
            79: $VA,
            81: $VB
          }, {
            11: $Vx,
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 66,
            43: 35,
            44: 122,
            45: 65,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            60: $Vy,
            69: $Vf,
            70: $Vg,
            71: $Vh,
            72: 67,
            74: 68,
            75: $Vz,
            79: $VA,
            81: $VB
          }, o($Vw, [2, 31]), {
            11: $Vx,
            60: $Vy,
            74: 123,
            75: $Vz,
            79: $VA,
            81: $VB
          }, {
            11: $VG,
            60: $VH,
            77: 124,
            81: $VJ,
            82: $VK
          }, o($VO, [2, 71], {
            79: [1, 125]
          }), o($VD, [2, 66]), {
            11: $VG,
            60: $VH,
            75: $VI,
            77: 107,
            80: 126,
            81: $VJ,
            82: $VK
          }, o($VD, $VF, {
            76: 103,
            78: 127,
            79: $VE
          }), {
            11: $VG,
            60: $VH,
            75: $VI,
            77: 107,
            80: 128,
            81: $VJ,
            82: $VK
          }, o($VP, [2, 79], {
            75: [1, 129]
          }), o($VP, [2, 81]), o($VP, [2, 75]), o($VP, [2, 76]), {
            12: [1, 130]
          }, {
            11: [1, 133],
            60: [1, 132],
            81: [1, 134],
            83: 131
          }, o($VD, [2, 69]), {
            14: [1, 135]
          }, o($Vw, [2, 32]), {
            11: $Vx,
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 66,
            43: 35,
            44: 136,
            45: 65,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            60: $Vy,
            69: $Vf,
            70: $Vg,
            71: $Vh,
            72: 67,
            74: 68,
            75: $Vz,
            79: $VA,
            81: $VB
          }, {
            12: [1, 137]
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 138,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            14: [1, 139],
            23: [1, 140]
          }, o($VC, [2, 35]), {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 142,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            52: 141,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, {
            14: [1, 143]
          }, {
            14: [1, 144]
          }, o($VD, [2, 63]), o($VD, $VF, {
            76: 103,
            78: 145,
            79: $VE
          }), o($VO, [2, 72]), o($VD, $VF, {
            76: 103,
            78: 146,
            79: $VE
          }), o($VD, [2, 67]), o($VD, $VF, {
            76: 103,
            78: 147,
            79: $VE
          }), o($VP, [2, 80]), {
            14: [1, 148]
          }, o($VP, [2, 78]), o($VP, [2, 82]), o($VP, [2, 83]), {
            12: [1, 149]
          }, o($VD, $VF, {
            76: 103,
            78: 150,
            79: $VE
          }), {
            14: [1, 151]
          }, {
            13: 152,
            24: 153,
            25: $VQ
          }, o($Va, [2, 22], {
            41: [1, 155],
            47: $Vj,
            57: $Vk,
            58: $Vl,
            59: $Vm,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr,
            65: $Vs,
            66: $Vt,
            67: $Vu,
            68: $Vv
          }), o($Va, [2, 25]), {
            11: $Vx,
            45: 156,
            60: $Vy,
            72: 67,
            74: 68,
            75: $Vz,
            79: $VA,
            81: $VB
          }, {
            14: [1, 157],
            23: [1, 158]
          }, o($VC, [2, 37], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            59: $Vm,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr,
            65: $Vs,
            66: $Vt,
            67: $Vu,
            68: $Vv
          }), o($Vw, [2, 29]), o($Vw, [2, 30]), o($VD, [2, 65]), o($VD, [2, 73]), o($VD, [2, 68]), o($VP, [2, 77]), {
            84: [1, 159]
          }, o($VD, [2, 70]), o($Vw, [2, 33]), {
            14: [1, 160],
            23: [1, 161]
          }, o($VC, [2, 6]), {
            15: [1, 162]
          }, {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            34: 164,
            38: 163,
            39: $V4,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, o($VC, [2, 34]), o($Vw, [2, 60]), {
            12: $Vc,
            25: $Vd,
            26: $Ve,
            28: $V2,
            38: 165,
            43: 35,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            69: $Vf,
            70: $Vg,
            71: $Vh
          }, o($VP, [2, 84]), {
            15: [1, 166]
          }, {
            24: 167,
            25: $VQ
          }, {
            16: [1, 168]
          }, o($Va, [2, 23], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            59: $Vm,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr,
            65: $Vs,
            66: $Vt,
            67: $Vu,
            68: $Vv
          }), o($Va, [2, 24]), o($VC, [2, 36], {
            47: $Vj,
            57: $Vk,
            58: $Vl,
            59: $Vm,
            60: $Vn,
            61: $Vo,
            62: $Vp,
            63: $Vq,
            64: $Vr,
            65: $Vs,
            66: $Vt,
            67: $Vu,
            68: $Vv
          }), {
            16: [1, 169]
          }, o($VC, [2, 5]), {
            10: [1, 170]
          }, {
            10: [1, 171]
          }, {
            17: 172,
            27: $VR,
            28: $VS,
            29: $VT,
            30: $VU,
            31: $VV
          }, {
            17: 178,
            27: $VR,
            28: $VS,
            29: $VT,
            30: $VU,
            31: $VV
          }, o($VC, $VW, {
            18: 179,
            22: $VX
          }), o($VY, [2, 9]), o($VY, [2, 10]), o($VY, [2, 11]), o($VY, [2, 12]), o($VY, [2, 13]), {
            18: 181,
            19: $VW,
            22: $VX
          }, o($VC, [2, 7]), o([14, 19, 23], [2, 3]), {
            19: [1, 182]
          }, {
            4: 183,
            6: 5,
            7: $V0,
            26: $V1,
            28: $V2,
            32: 3,
            33: 4,
            34: 6,
            35: 7,
            36: 8,
            37: $V3,
            39: $V4,
            43: 13,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            53: $V9
          }, {
            6: 5,
            7: $V0,
            20: [1, 184],
            26: $V1,
            28: $V2,
            32: 21,
            33: 4,
            34: 6,
            35: 7,
            36: 8,
            37: $V3,
            39: $V4,
            43: 13,
            46: $V5,
            49: $V6,
            50: $V7,
            51: $V8,
            53: $V9
          }, {
            21: [1, 185]
          }, o($Va, [2, 2])],
          defaultActions: {
            20: [2, 1],
            44: [2, 8]
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

        var _webpack_require__9 = __webpack_require__(
        /*! ./Simbolos/Tree */
        "./src/analizadorXQUERY/Simbolos/Tree.ts"),
            Tree = _webpack_require__9.Tree;

        var _webpack_require__10 = __webpack_require__(
        /*! ./Varios/Tipo */
        "./src/analizadorXQUERY/Varios/Tipo.ts"),
            Tipo = _webpack_require__10.Tipo,
            tipos = _webpack_require__10.tipos,
            esEntero = _webpack_require__10.esEntero;

        var _webpack_require__11 = __webpack_require__(
        /*! ./Expresiones/Primitivo */
        "./src/analizadorXQUERY/Expresiones/Primitivo.ts"),
            Primitivo = _webpack_require__11.Primitivo;

        var _webpack_require__12 = __webpack_require__(
        /*! ./Varios/Error */
        "./src/analizadorXQUERY/Varios/Error.ts"),
            Error = _webpack_require__12.Error;

        var _webpack_require__13 = __webpack_require__(
        /*! ./Expresiones/identificador */
        "./src/analizadorXQUERY/Expresiones/identificador.ts"),
            Identificador = _webpack_require__13.Identificador; //const {Vector} = require('../Expresiones/Vector');
        //const {Lista} = require('../Expresiones/Lista');
        //Instrucciones


        var _webpack_require__14 = __webpack_require__(
        /*! ./Instrucciones/Print */
        "./src/analizadorXQUERY/Instrucciones/Print.ts"),
            Print = _webpack_require__14.Print;

        var _webpack_require__15 = __webpack_require__(
        /*! ./Instrucciones/Declaracion */
        "./src/analizadorXQUERY/Instrucciones/Declaracion.ts"),
            Declaracion = _webpack_require__15.Declaracion; // // const {DeclaracionArray} = require('../Instrucciones/DeclaracionArray');
        //const {DeclaracionLista} = require('../Instrucciones/DeclaracionLista');
        //const {Asignacion} = require('../Instrucciones/Asignacion');
        //const {AsignacionVector} = require('../Instrucciones/AsignacionVector');
        // const {AsignacionLista} = require('../Instrucciones/AsignacionLista');

        /*const {AddLista} = require('../Instrucciones/AddLista');
        
        const {Switch} = require('../Instrucciones/Switch');
        const {Case} = require('../Instrucciones/Case');
        const {While} = require('../Instrucciones/While');
        const {DoWhile} = require('../Instrucciones/DoWhile');
        const {For} = require('../Instrucciones/For');
        const {DeclaracionMetodo} = require('../Instrucciones/DeclaracionMetodo');
        const {LlamadaMetodo} = require('../Instrucciones/LlamadaMetodo');
        const {Continue} = require('../Expresiones/Continue');
        const {Break} = require('../Expresiones/Break');
        const {Retorno} = require('../Instrucciones/Retorno');
        */
        //Expresion


        var _webpack_require__16 = __webpack_require__(
        /*! ./Instrucciones/DeclaracionMetodo */
        "./src/analizadorXQUERY/Instrucciones/DeclaracionMetodo.ts"),
            DeclaracionMetodo = _webpack_require__16.DeclaracionMetodo;

        var _webpack_require__17 = __webpack_require__(
        /*! ./Instrucciones/LlamadaMetodo */
        "./src/analizadorXQUERY/Instrucciones/LlamadaMetodo.ts"),
            LlamadaMetodo = _webpack_require__17.LlamadaMetodo;

        var _webpack_require__18 = __webpack_require__(
        /*! ./Instrucciones/If */
        "./src/analizadorXQUERY/Instrucciones/If.ts"),
            If = _webpack_require__18.If;

        var _webpack_require__19 = __webpack_require__(
        /*! ./Instrucciones/Retorno */
        "./src/analizadorXQUERY/Instrucciones/Retorno.ts"),
            Retorno = _webpack_require__19.Retorno;

        var _webpack_require__20 = __webpack_require__(
        /*! ./Expresiones/Aritmetica */
        "./src/analizadorXQUERY/Expresiones/Aritmetica.ts"),
            Aritmetica = _webpack_require__20.Aritmetica;

        var _webpack_require__21 = __webpack_require__(
        /*! ./Expresiones/Relacional */
        "./src/analizadorXQUERY/Expresiones/Relacional.ts"),
            Relacional = _webpack_require__21.Relacional;

        var _webpack_require__22 = __webpack_require__(
        /*! ./Expresiones/Logico */
        "./src/analizadorXQUERY/Expresiones/Logico.ts"),
            Logico = _webpack_require__22.Logico;

        var _webpack_require__23 = __webpack_require__(
        /*! ./Expresiones/NodoX */
        "./src/analizadorXQUERY/Expresiones/NodoX.ts"),
            NodoX = _webpack_require__23.NodoX;

        var _webpack_require__24 = __webpack_require__(
        /*! ./Arbol/Ejecucion */
        "./src/analizadorXQUERY/Arbol/Ejecucion.ts"),
            EjecucionXpath = _webpack_require__24.EjecucionXpath;

        var _webpack_require__25 = __webpack_require__(
        /*! ./Expresiones/uppercase */
        "./src/analizadorXQUERY/Expresiones/uppercase.ts"),
            ToUpper = _webpack_require__25.ToUpper;

        var _webpack_require__26 = __webpack_require__(
        /*! ./Expresiones/ToLower */
        "./src/analizadorXQUERY/Expresiones/ToLower.ts"),
            ToLower = _webpack_require__26.ToLower;

        var _webpack_require__27 = __webpack_require__(
        /*! ./Expresiones/ToString */
        "./src/analizadorXQUERY/Expresiones/ToString.ts"),
            ToString = _webpack_require__27.ToString;

        var _webpack_require__28 = __webpack_require__(
        /*! ./Expresiones/Substring */
        "./src/analizadorXQUERY/Expresiones/Substring.ts"),
            Substrings = _webpack_require__28.Substrings;

        var _webpack_require__29 = __webpack_require__(
        /*! ./Expresiones/ToNumber */
        "./src/analizadorXQUERY/Expresiones/ToNumber.ts"),
            ToNumber = _webpack_require__29.ToNumber;
        /*const {Logico} = require('../Expresiones/Logico');
        const {Ternario} = require('../Expresiones/Ternario');
        const {Casteo} = require('../Expresiones/Casteo');
        const {InDecrement} = require('../Expresiones/InDecrement');
        const {Length} = require('../Expresiones/Length');
        const {ToLower} = require('../Expresiones/ToLower');
        const {ToUpper} = require('../Expresiones/ToUpper');
        const {Truncate} = require('../Expresiones/Truncate');
        const {Round} = require('../Expresiones/Round');
        const {TypeOf} = require('../Expresiones/TypeOf');
        const {ToString} = require('../Expresiones/ToString');
        const {ToCharArray} = require('../Expresiones/ToCharArray');*/


        var _webpack_require__30 = __webpack_require__(
        /*! ../analizadorXML/index */
        "./src/analizadorXML/index.ts"),
            AnalizadorASCXML = _webpack_require__30.AnalizadorASCXML;

        var _webpack_require__31 = __webpack_require__(
        /*! ../analizadorXML/Instrucciones/Busqueda/xpathBusqueda */
        "./src/analizadorXML/Instrucciones/Busqueda/xpathBusqueda.ts"),
            xpathBusqueda = _webpack_require__31.xpathBusqueda;

        var _webpack_require__32 = __webpack_require__(
        /*! ../analizadorXML/Codigo3D/xml3D */
        "./src/analizadorXML/Codigo3D/xml3D.ts"),
            xml3D = _webpack_require__32.xml3D;

        var produccion = [];
        var accion = [];
        var codigo3Dxpath = [];
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
                  return "tk_decimal";
                  break;

                case 6:
                  return "tk_entero";
                  break;

                case 7:
                  return "tk_node";
                  break;

                case 8:
                  return "tk_child";
                  break;

                case 9:
                  return "tk_let";
                  break;

                case 10:
                  return "tk_descendant";
                  break;

                case 11:
                  return "tk_descendatOr";
                  break;

                case 12:
                  return "tk_ancestor";
                  break;

                case 13:
                  return "tk_ancestorOr";
                  break;

                case 14:
                  return "tk_attribute";
                  break;

                case 15:
                  return "tk_following";
                  break;

                case 16:
                  return "tk_followingSi";
                  break;

                case 17:
                  return "tk_parent";
                  break;

                case 18:
                  return "tk_preceding";
                  break;

                case 19:
                  return "tk_precedingSi";
                  break;

                case 20:
                  return "tk_self";
                  break;

                case 21:
                  return "tk_text";
                  break;

                case 22:
                  return "tk_position";
                  break;

                case 23:
                  return "tk_last";
                  break;

                case 24:
                  return "tk_div";
                  break;

                case 25:
                  return "tk_and";
                  break;

                case 26:
                  return "tk_or";
                  break;

                case 27:
                  return "tk_mod";
                  break;

                case 28:
                  return "tk_for";
                  break;

                case 29:
                  return "tk_in";
                  break;

                case 30:
                  return "tk_where";
                  break;

                case 31:
                  return "tk_order";
                  break;

                case 32:
                  return "tk_by";
                  break;

                case 33:
                  return "tk_return";
                  break;

                case 34:
                  return "tk_if";
                  break;

                case 35:
                  return "tk_else";
                  break;

                case 36:
                  return "tk_then";
                  break;

                case 37:
                  return "tk_int";
                  break;

                case 38:
                  return "tk_integer";
                  break;

                case 39:
                  return "tk_string";
                  break;

                case 40:
                  return "tk_DECIMAL";
                  break;

                case 41:
                  return "tk_double";
                  break;

                case 42:
                  return "tk_declare";
                  break;

                case 43:
                  return "tk_function";
                  break;

                case 44:
                  return "tk_AS";
                  break;

                case 45:
                  return "tk_as";
                  break;

                case 46:
                  return "tk_xs";
                  break;

                case 47:
                  return "tk_to";
                  break;

                case 48:
                  return "tk_at";
                  break;

                case 49:
                  return "tk_local";
                  break;

                case 50:
                  return "tk_mayor";
                  break;

                case 51:
                  return "tk_menor";
                  break;

                case 52:
                  return "tk_igual";
                  break;

                case 53:
                  return "tk_distinto";
                  break;

                case 54:
                  return "tk_menorIgual";
                  break;

                case 55:
                  return "tk_mayorIgual";
                  break;

                case 56:
                  return "tk_upper";
                  break;

                case 57:
                  return "tk_case";
                  break;

                case 58:
                  return "tk_lower";
                  break;

                case 59:
                  return "tk_subString";
                  break;

                case 60:
                  return "tk_number";
                  break;

                case 61:
                  return "tk_barra";
                  break;

                case 62:
                  return "tk_punto";
                  break;

                case 63:
                  return "tk_punto_coma";
                  break;

                case 64:
                  return "tk_coma";
                  break;

                case 65:
                  return "tk_diagonal";
                  break;

                case 66:
                  return "tk_asterisco";
                  break;

                case 67:
                  return "tk_Interroga";
                  break;

                case 68:
                  return "tk_mas";
                  break;

                case 69:
                  return "tk_menos";
                  break;

                case 70:
                  return "tk_menorIgual";
                  break;

                case 71:
                  return "tk_mayorIgual";
                  break;

                case 72:
                  return "tk_menor";
                  break;

                case 73:
                  return "tk_mayor";
                  break;

                case 74:
                  return "tk_distinto";
                  break;

                case 75:
                  return "tk_igualXQUERY";
                  break;

                case 76:
                  return "tk_dosPuntos";
                  break;

                case 77:
                  return "tk_igual";
                  break;

                case 78:
                  return "tk_llaveA";
                  break;

                case 79:
                  return "tk_llaveC";
                  break;

                case 80:
                  return "tk_arroba";
                  break;

                case 81:
                  return "llaveA";
                  break;

                case 82:
                  return "llaveC";
                  break;

                case 83:
                  return "tk_parA";
                  break;

                case 84:
                  return "tk_parC";
                  break;

                case 85:
                  return "tk_stringTexto";
                  break;

                case 86:
                  return "tk_stringTexto";
                  break;

                case 87:
                  return "tk_stringTexto";
                  break;

                case 88:
                  return "tk_stringTexto";
                  break;

                case 89:
                  return "tk_identificador";
                  break;

                case 90:
                  return "tk_identificadorXQUERY";
                  console.log("indentificador papa");
                  break;

                case 91:
                  return "EOF";
                  break;

                case 92:
                  break;

                case 93:
                  console.log('Léxico', yy_.yytext, yy_.yylloc.first_line, yy_.yylloc.first_column);
                  break;
              }
            },
            rules: [/^(?:\/\/.*)/, /^(?:\(:)/, /^(?::\))/, /^(?:.)/, /^(?:\s+)/, /^(?:[0-9]+(\.[0-9]+)\b)/, /^(?:[0-9]+\b)/, /^(?:node\b)/, /^(?:child\b)/, /^(?:let\b)/, /^(?:descendant\b)/, /^(?:descendant-or-self\b)/, /^(?:ancestor\b)/, /^(?:ancestor-or-self\b)/, /^(?:attribute\b)/, /^(?:following\b)/, /^(?:following-sibling\b)/, /^(?:parent\b)/, /^(?:preceding\b)/, /^(?:preceding-sibling\b)/, /^(?:self\b)/, /^(?:text\b)/, /^(?:position\b)/, /^(?:last\b)/, /^(?:div\b)/, /^(?:and\b)/, /^(?:or\b)/, /^(?:mod\b)/, /^(?:for\b)/, /^(?:in\b)/, /^(?:where\b)/, /^(?:order\b)/, /^(?:by\b)/, /^(?:return\b)/, /^(?:if\b)/, /^(?:else\b)/, /^(?:then\b)/, /^(?:int\b)/, /^(?:integer\b)/, /^(?:string\b)/, /^(?:decimal\b)/, /^(?:double\b)/, /^(?:declare\b)/, /^(?:function\b)/, /^(?:AS\b)/, /^(?:as\b)/, /^(?:xs\b)/, /^(?:to\b)/, /^(?:at\b)/, /^(?:local\b)/, /^(?:gt\b)/, /^(?:lt\b)/, /^(?:eq\b)/, /^(?:ne\b)/, /^(?:le\b)/, /^(?:ge\b)/, /^(?:upper\b)/, /^(?:case\b)/, /^(?:lower\b)/, /^(?:substring\b)/, /^(?:number\b)/, /^(?:\|)/, /^(?:\.)/, /^(?:;)/, /^(?:,)/, /^(?:\/)/, /^(?:\*)/, /^(?:\?)/, /^(?:\+)/, /^(?:-)/, /^(?:<=)/, /^(?:>=)/, /^(?:<)/, /^(?:>)/, /^(?:!=)/, /^(?::=)/, /^(?::)/, /^(?:=)/, /^(?:\[)/, /^(?:\])/, /^(?:@)/, /^(?:\{)/, /^(?:\})/, /^(?:\()/, /^(?:\))/, /^(?:"[^\"]*")/, /^(?:“[^\“]*“)/, /^(?:'[^\']*')/, /^(?:‘[^\‘]*‘)/, /^(?:[a-zA-Z]([a-zA-Z0-9_])*)/, /^(?:[$]([a-zA-Z0-9_])*)/, /^(?:$)/, /^(?:[ \t\r\n\f])/, /^(?:.)/],
            conditions: {
              "comment": {
                "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93],
                "inclusive": true
              },
              "INITIAL": {
                "rules": [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93],
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
        exports.parser = GramaticaXquery;
        exports.Parser = GramaticaXquery.Parser;

        exports.parse = function () {
          return GramaticaXquery.parse.apply(GramaticaXquery, arguments);
        };

        exports.main = function commonjsMain(args) {
          if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
          }

          var source = __webpack_require__(
          /*! fs */
          5).readFileSync(__webpack_require__(
          /*! path */
          6).normalize(args[1]), "utf8");

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
  "./src/analizadorXQUERY/Instrucciones/Declaracion.ts":
  /*!***********************************************************!*\
    !*** ./src/analizadorXQUERY/Instrucciones/Declaracion.ts ***!
    \***********************************************************/

  /*! exports provided: defal, Declaracion */

  /***/
  function srcAnalizadorXQUERYInstruccionesDeclaracionTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "defal", function () {
      return defal;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Declaracion", function () {
      return Declaracion;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Varios_Error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Varios/Error */
    "./src/analizadorXQUERY/Varios/Error.ts");
    /* harmony import */


    var _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Varios/Tipo */
    "./src/analizadorXQUERY/Varios/Tipo.ts");
    /* harmony import */


    var _Simbolos_Simbolo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Simbolos/Simbolo */
    "./src/analizadorXQUERY/Simbolos/Simbolo.ts");
    /* harmony import */


    var _Expresiones_Primitivo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../Expresiones/Primitivo */
    "./src/analizadorXQUERY/Expresiones/Primitivo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    function defal(tipo, line, column) {
      if (tipo.tipo == _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].ENTERO) {
        return new _Expresiones_Primitivo__WEBPACK_IMPORTED_MODULE_4__["Primitivo"](tipo, 0, line, column);
      } else if (tipo.tipo == _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].DECIMAL) {
        return new _Expresiones_Primitivo__WEBPACK_IMPORTED_MODULE_4__["Primitivo"](tipo, 0.0, line, column);
      } else if (tipo.tipo == _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].BOOLEANO) {
        return new _Expresiones_Primitivo__WEBPACK_IMPORTED_MODULE_4__["Primitivo"](tipo, true, line, column);
      } else if (tipo.tipo == _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].CARACTER) {
        return new _Expresiones_Primitivo__WEBPACK_IMPORTED_MODULE_4__["Primitivo"](tipo, '', line, column);
      } else if (tipo.tipo == _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING) {
        return new _Expresiones_Primitivo__WEBPACK_IMPORTED_MODULE_4__["Primitivo"](tipo, "", line, column);
      }

      return "";
    }

    var Declaracion = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_11) {
      _inherits(Declaracion, _Arbol_Nodo__WEBPACK_11);

      var _super11 = _createSuper(Declaracion);

      function Declaracion(tipo, id, valor, line, column) {
        var _this22;

        _classCallCheck(this, Declaracion);

        _this22 = _super11.call(this, tipo, line, column);
        _this22.id = id;
        _this22.valor = valor;
        return _this22;
      }

      _createClass(Declaracion, [{
        key: "execute",
        value: function execute(table, tree) {
          var result = this.valor.execute(table, tree);

          if (result instanceof _Varios_Error__WEBPACK_IMPORTED_MODULE_1__["Error"]) {
            return result;
          }

          var simbolo;
          var tipo;

          if (isNaN(result)) {
            tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].STRING);
          } else {
            tipo = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](Object(_Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["esEntero"])(result));
          }

          simbolo = new _Simbolos_Simbolo__WEBPACK_IMPORTED_MODULE_3__["Simbolo"](tipo, this.id, result, new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].VARIABLE), this.line, this.column);
          var res = table.setVariable(simbolo);
          tree.Variables.push(simbolo); // if (res != null) {
          // const error = new Excepcion('Semantico',
          // res,
          // this.line, this.column);
          // tree.excepciones.push(error);
          // tree.consola.push(error.toString());
          // }

          return null;
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_5__["NodoAST"]("");
          nodo.agregarHijo(this.tipo + "");
          nodo.agregarHijo(this.id);

          if (this.valor != null) {
            nodo.agregarHijo("=");
            nodo.agregarHijo(this.valor.getNodo());
          }

          return nodo;
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_6__["NodoCST"]("DECLARACION");
          nodo.agregarHijo(this.tipo + "");
          nodo.agregarHijo(this.id);

          if (this.valor != null) {
            nodo.agregarHijo("=");
            nodo.agregarHijo(this.valor.getNodoCST());
          }

          return nodo;
        }
      }]);

      return Declaracion;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Instrucciones/DeclaracionMetodo.ts":
  /*!*****************************************************************!*\
    !*** ./src/analizadorXQUERY/Instrucciones/DeclaracionMetodo.ts ***!
    \*****************************************************************/

  /*! exports provided: DeclaracionMetodo */

  /***/
  function srcAnalizadorXQUERYInstruccionesDeclaracionMetodoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DeclaracionMetodo", function () {
      return DeclaracionMetodo;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Varios/Exepciones */
    "./src/analizadorXQUERY/Varios/Exepciones.ts");
    /* harmony import */


    var _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Varios/Tipo */
    "./src/analizadorXQUERY/Varios/Tipo.ts");
    /* harmony import */


    var _Simbolos_Simbolo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Simbolos/Simbolo */
    "./src/analizadorXQUERY/Simbolos/Simbolo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    var DeclaracionMetodo = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_12) {
      _inherits(DeclaracionMetodo, _Arbol_Nodo__WEBPACK_12);

      var _super12 = _createSuper(DeclaracionMetodo);

      function DeclaracionMetodo(tipo, id, listaParams, instrucciones, line, column) {
        var _this23;

        _classCallCheck(this, DeclaracionMetodo);

        _this23 = _super12.call(this, tipo, line, column);
        _this23.id = id;
        _this23.listaParams = listaParams;
        _this23.instrucciones = instrucciones;
        return _this23;
      }

      _createClass(DeclaracionMetodo, [{
        key: "execute",
        value: function execute(table, tree) {
          var nombre = this.id + "$";
          var index = 0;

          var _iterator = _createForOfIteratorHelper(this.listaParams),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var param = _step.value;
              // nombre += param.tipo;
              index += 1;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          nombre += index + "";

          if (table.getVariable(nombre) == null) {
            var tipo2 = new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].FUNCION);
            var metodo = new _Simbolos_Simbolo__WEBPACK_IMPORTED_MODULE_3__["Simbolo"](this.tipo, nombre, [this.listaParams, this.instrucciones], tipo2, this.line, this.column);
            table.setVariable(metodo);
            tree.Variables.push(metodo);
          } else {
            var error = new _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_1__["Excepcion"]('Semantico', "El metodo {".concat(nombre.split("$", 1)[0], "} ya ha sido creado con anterioridad "), this.line, this.column);
            tree.errores.push(error);
            tree.consola.push(error.toString());
            return error;
          }
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_4__["NodoAST"]("");

          if (this.tipo.tipo == _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].VOID) {
            nodo.agregarHijo("Void");
          } else {
            nodo.agregarHijo(this.tipo + "");
          }

          nodo.agregarHijo(this.id);
          nodo.agregarHijo("(");

          if (this.listaParams.length != 0) {
            var nodo2 = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_4__["NodoAST"]("");
            var index = 1;

            for (var i = 0; i < this.listaParams.length; i++) {
              var param = this.listaParams[i];
              var nodo3 = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_4__["NodoAST"](param.tipo + "");
              nodo3.agregarHijo(param.id + "");
              nodo2.agregarHijo(nodo3);
            }

            nodo.agregarHijo(nodo2);
          }

          nodo.agregarHijo(")");
          nodo.agregarHijo("{");
          var nodo3 = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_4__["NodoAST"]("");

          for (var _i4 = 0; _i4 < this.instrucciones.length; _i4++) {
            nodo3.agregarHijo(this.instrucciones[_i4].getNodo());
          }

          nodo.agregarHijo(nodo3);
          nodo.agregarHijo("}");
          return nodo;
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_5__["NodoCST"]("DECLARACION METODO");

          if (this.tipo.tipo == _Varios_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipos"].VOID) {
            nodo.agregarHijo("Void");
          } else {
            nodo.agregarHijo(this.tipo + "");
          }

          nodo.agregarHijo(this.id);
          nodo.agregarHijo("(");

          if (this.listaParams.length != 0) {
            var nodo2 = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_5__["NodoCST"]("Parametros");
            var index = 1;

            for (var i = 0; i < this.listaParams.length; i++) {
              var param = this.listaParams[i];
              var nodo3 = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_5__["NodoCST"](param.tipo + "");
              nodo3.agregarHijo(param.id + "");
              nodo2.agregarHijo(nodo3);
            }

            nodo.agregarHijo(nodo2);
          }

          nodo.agregarHijo(")");
          nodo.agregarHijo("{");
          var nodo3 = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_5__["NodoCST"]("INSTRUCCIONES");

          for (var _i5 = 0; _i5 < this.instrucciones.length; _i5++) {
            nodo3.agregarHijo(this.instrucciones[_i5].getNodoCST());
          }

          nodo.agregarHijo(nodo3);
          nodo.agregarHijo("}");
          return nodo;
        }
      }]);

      return DeclaracionMetodo;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Instrucciones/If.ts":
  /*!**************************************************!*\
    !*** ./src/analizadorXQUERY/Instrucciones/If.ts ***!
    \**************************************************/

  /*! exports provided: If */

  /***/
  function srcAnalizadorXQUERYInstruccionesIfTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "If", function () {
      return If;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Simbolos_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Simbolos/Table */
    "./src/analizadorXQUERY/Simbolos/Table.ts");
    /* harmony import */


    var _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Varios/Exepciones */
    "./src/analizadorXQUERY/Varios/Exepciones.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Retorno__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./Retorno */
    "./src/analizadorXQUERY/Instrucciones/Retorno.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    var If = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_13) {
      _inherits(If, _Arbol_Nodo__WEBPACK_13);

      var _super13 = _createSuper(If);

      function If(condicion, listaIf, listaElse, line, column) {
        var _this24;

        _classCallCheck(this, If);

        _this24 = _super13.call(this, null, line, column);
        _this24.condicion = condicion;
        _this24.listaIf = listaIf;
        _this24.listaElse = listaElse;
        return _this24;
      }

      _createClass(If, [{
        key: "execute",
        value: function execute(table, tree) {
          var newtable = new _Simbolos_Table__WEBPACK_IMPORTED_MODULE_1__["Table"](table);
          var result;
          result = this.condicion.execute(newtable, tree);

          if (result instanceof _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_2__["Excepcion"]) {
            return result;
          }

          if (result) {
            for (var i = 0; i < this.listaIf.length; i++) {
              var res = this.listaIf[i].execute(newtable, tree);

              if (res instanceof _Retorno__WEBPACK_IMPORTED_MODULE_4__["Retorno"]) {
                return res;
              }
            }
          } else {
            for (var _i6 = 0; _i6 < this.listaElse.length; _i6++) {
              var _res = this.listaElse[_i6].execute(newtable, tree);

              if (_res instanceof _Retorno__WEBPACK_IMPORTED_MODULE_4__["Retorno"]) {
                return _res;
              }
            }
          }

          return null;
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("IF");
          nodo.agregarHijo("if");
          nodo.agregarHijo("(");
          nodo.agregarHijo(this.condicion.getNodo());
          nodo.agregarHijo(")");
          nodo.agregarHijo("{");
          var nodo2 = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("INSTRUCCIONES IF");

          for (var i = 0; i < this.listaIf.length; i++) {
            nodo2.agregarHijo(this.listaIf[i].getNodo());
          }

          nodo.agregarHijo(nodo2);
          nodo.agregarHijo("}");

          if (this.listaElse != null) {
            // ELSE
            nodo.agregarHijo("else");
            nodo.agregarHijo("{");
            var nodo3 = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_3__["NodoAST"]("INSTRUCCIONES ELSE");

            for (var _i7 = 0; _i7 < this.listaElse.length; _i7++) {
              nodo3.agregarHijo(this.listaElse[_i7].getNodo());
            }

            nodo.agregarHijo(nodo3);
            nodo.agregarHijo("}");
          }

          return nodo;
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_5__["NodoCST"]("IF");
          nodo.agregarHijo("if");
          nodo.agregarHijo("(");
          nodo.agregarHijo(this.condicion.getNodoCST());
          nodo.agregarHijo(")");
          nodo.agregarHijo("{");
          var nodo2 = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_5__["NodoCST"]("INSTRUCCIONES IF");

          for (var i = 0; i < this.listaIf.length; i++) {
            nodo2.agregarHijo(this.listaIf[i].getNodoCST());
          }

          nodo.agregarHijo(nodo2);
          nodo.agregarHijo("}");

          if (this.listaElse != null) {
            // ELSE
            nodo.agregarHijo("else");
            nodo.agregarHijo("{");
            var nodo3 = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_5__["NodoCST"]("INSTRUCCIONES ELSE");

            for (var _i8 = 0; _i8 < this.listaElse.length; _i8++) {
              nodo3.agregarHijo(this.listaElse[_i8].getNodoCST());
            }

            nodo.agregarHijo(nodo3);
            nodo.agregarHijo("}");
          }

          return nodo;
        }
      }]);

      return If;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Instrucciones/LlamadaMetodo.ts":
  /*!*************************************************************!*\
    !*** ./src/analizadorXQUERY/Instrucciones/LlamadaMetodo.ts ***!
    \*************************************************************/

  /*! exports provided: LlamadaMetodo */

  /***/
  function srcAnalizadorXQUERYInstruccionesLlamadaMetodoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LlamadaMetodo", function () {
      return LlamadaMetodo;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Simbolos_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Simbolos/Table */
    "./src/analizadorXQUERY/Simbolos/Table.ts");
    /* harmony import */


    var _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Varios/Exepciones */
    "./src/analizadorXQUERY/Varios/Exepciones.ts");
    /* harmony import */


    var _Varios_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Varios/Tipo */
    "./src/analizadorXQUERY/Varios/Tipo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Retorno__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./Retorno */
    "./src/analizadorXQUERY/Instrucciones/Retorno.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    var LlamadaMetodo = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_14) {
      _inherits(LlamadaMetodo, _Arbol_Nodo__WEBPACK_14);

      var _super14 = _createSuper(LlamadaMetodo);

      function LlamadaMetodo(id, listaParams, line, column) {
        var _this25;

        _classCallCheck(this, LlamadaMetodo);

        _this25 = _super14.call(this, null, line, column);
        _this25.id = id;
        _this25.listaParams = listaParams;
        return _this25;
      }

      _createClass(LlamadaMetodo, [{
        key: "execute",
        value: function execute(table, tree) {
          var newtable = new _Simbolos_Table__WEBPACK_IMPORTED_MODULE_1__["Table"](table);
          var nombre = this.id + "$"; // var nombre = this.id;

          var index = 0;

          var _iterator2 = _createForOfIteratorHelper(this.listaParams),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var param = _step2.value;
              var valor = param.execute(newtable, tree); // nombre += <any>param.tipo;

              index += 1;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          nombre += index + "";
          var simboloMetodo;
          simboloMetodo = table.getVariable(nombre);

          if (simboloMetodo == null) {
            var error = new _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_2__["Excepcion"]('Semantico', "El metodo {".concat(this.id, "} no ha sido encontrado con esa combinacion de parametros"), this.line, this.column);
            tree.errores.push(error);
            tree.consola.push(error.toString());
            return error;
          }

          var parametros = simboloMetodo.valor[0];

          for (var i = 0; i < parametros.length; i++) {
            var para;
            var crear;
            para = parametros[i];
            crear = para;
            crear.valor = this.listaParams[i];
            crear.execute(newtable, tree);
          }

          var result = simboloMetodo.valor[1];

          if (result) {
            for (var _i9 = 0; _i9 < result.length; _i9++) {
              var res = result[_i9].execute(newtable, tree);

              if (simboloMetodo.tipo.tipo == _Varios_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipos"].VOID) {
                if (res instanceof _Retorno__WEBPACK_IMPORTED_MODULE_5__["Retorno"]) {
                  var _error60 = new _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_2__["Excepcion"]('Semantico', "No se esperaba un retorno en este metodo", res.line, res.column);

                  tree.errores.push(_error60);
                  tree.consola.push(_error60.toString());
                  return _error60;
                }
              } else {
                if (res instanceof _Retorno__WEBPACK_IMPORTED_MODULE_5__["Retorno"]) {
                  if (res.expresion != null) {
                    this.tipo = res.expresion.tipo;
                    res.execute(newtable, tree);
                    var retorno = res.exp;

                    if (simboloMetodo.tipo.tipo == res.expresion.tipo.tipo) {
                      return retorno;
                    } else {
                      if (simboloMetodo.tipo.tipo == _Varios_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipos"].DECIMAL && res.expresion.tipo.tipo == _Varios_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipos"].ENTERO) {
                        return retorno;
                      }

                      var _error61 = new _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_2__["Excepcion"]('Semantico', "No se puede retornar debido a que es de un tipo diferente al declarado", res.line, res.column);

                      tree.errores.push(_error61);
                      tree.consola.push(_error61.toString());
                      return _error61;
                    }
                  } else {
                    var _error62 = new _Varios_Exepciones__WEBPACK_IMPORTED_MODULE_2__["Excepcion"]('Semantico', "No se puede retornar debido a que es de un tipo diferente al declarado", res.line, res.column);

                    tree.errores.push(_error62);
                    tree.consola.push(_error62.toString());
                    return _error62;
                  }
                }
              }
            }
            /*if (simboloMetodo.tipo.tipo != tipos.VOID) {
                const error = new Excepcion('Semantico',
                    `Se esperaba un retorno en esta Funcion`,
                    this.line, this.column);
                tree.errores.push(error);
                tree.consola.push(error.toString());
                return error;
            }*/

          }

          return null;
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_4__["NodoAST"]("");
          nodo.agregarHijo(this.id);
          nodo.agregarHijo("(");

          if (this.listaParams.length != 0) {
            var nodo2 = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_4__["NodoAST"]("");
            var index = 1;

            for (var i = 0; i < this.listaParams.length; i++) {
              var param = this.listaParams[i];
              var nodo3 = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_4__["NodoAST"](param.tipo + "");
              nodo3.agregarHijo(param.id + "");
              nodo2.agregarHijo(nodo3);
            }

            nodo.agregarHijo(nodo2);
          }

          nodo.agregarHijo(")");
          nodo.agregarHijo("{");
          var nodo3 = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_4__["NodoAST"]("");
          nodo.agregarHijo(nodo3);
          nodo.agregarHijo("}");
          return nodo;
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_6__["NodoCST"]("LLAMADA METODO");
          nodo.agregarHijo(this.id);
          nodo.agregarHijo("(");

          if (this.listaParams.length != 0) {
            var nodo2 = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_6__["NodoCST"]("Parametros");
            var index = 1;

            for (var i = 0; i < this.listaParams.length; i++) {
              var param = this.listaParams[i];
              var nodo3 = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_6__["NodoCST"](param.tipo + "");
              nodo3.agregarHijo(param.id + "");
              nodo2.agregarHijo(nodo3);
            }

            nodo.agregarHijo(nodo2);
          }

          nodo.agregarHijo(")");
          nodo.agregarHijo("{");
          var nodo3 = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_6__["NodoCST"]("INSTRUCCIONES");
          nodo.agregarHijo(nodo3);
          nodo.agregarHijo("}");
          return nodo;
        }
      }]);

      return LlamadaMetodo;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Instrucciones/Print.ts":
  /*!*****************************************************!*\
    !*** ./src/analizadorXQUERY/Instrucciones/Print.ts ***!
    \*****************************************************/

  /*! exports provided: Print */

  /***/
  function srcAnalizadorXQUERYInstruccionesPrintTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Print", function () {
      return Print;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Varios_Tipo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Varios/Tipo */
    "./src/analizadorXQUERY/Varios/Tipo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    var Print = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_15) {
      _inherits(Print, _Arbol_Nodo__WEBPACK_15);

      var _super15 = _createSuper(Print);

      function Print(expresion, line, column) {
        var _this26;

        _classCallCheck(this, Print);

        _this26 = _super15.call(this, new _Varios_Tipo__WEBPACK_IMPORTED_MODULE_1__["Tipo"](_Varios_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipos"].VOID), line, column);
        _this26.expresion = expresion;
        return _this26;
      }

      _createClass(Print, [{
        key: "execute",
        value: function execute(table, tree) {
          var valor = this.expresion.execute(table, tree);
          tree.consola.push(valor);
          return null;
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_2__["NodoAST"]("");
          nodo.agregarHijo("print");
          nodo.agregarHijo("(");
          nodo.agregarHijo(this.expresion.getNodo());
          nodo.agregarHijo(")");
          return nodo;
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_3__["NodoCST"]("PRINT");
          nodo.agregarHijo("print");
          nodo.agregarHijo("(");
          nodo.agregarHijo(this.expresion.getNodoCST());
          nodo.agregarHijo(")");
          return nodo;
        }
      }]);

      return Print;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Instrucciones/Retorno.ts":
  /*!*******************************************************!*\
    !*** ./src/analizadorXQUERY/Instrucciones/Retorno.ts ***!
    \*******************************************************/

  /*! exports provided: Retorno */

  /***/
  function srcAnalizadorXQUERYInstruccionesRetornoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Retorno", function () {
      return Retorno;
    });
    /* harmony import */


    var _Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Arbol/Nodo */
    "./src/analizadorXQUERY/Arbol/Nodo.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");

    var Retorno = /*#__PURE__*/function (_Arbol_Nodo__WEBPACK_16) {
      _inherits(Retorno, _Arbol_Nodo__WEBPACK_16);

      var _super16 = _createSuper(Retorno);

      function Retorno(expresion, line, column) {
        var _this27;

        _classCallCheck(this, Retorno);

        _this27 = _super16.call(this, null, line, column);
        _this27.expresion = expresion;
        return _this27;
      }

      _createClass(Retorno, [{
        key: "execute",
        value: function execute(table, tree) {
          if (this.expresion != null) {
            this.exp = this.expresion.execute(table, tree);
          }

          return this;
        }
      }, {
        key: "getNodo",
        value: function getNodo() {
          var nodo = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_1__["NodoAST"]("");

          if (this.expresion != null) {
            nodo.agregarHijo(this.expresion.getNodo());
          }

          return nodo;
        }
      }, {
        key: "getNodoCST",
        value: function getNodoCST() {
          var nodo = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_2__["NodoCST"]("RETURN");

          if (this.expresion != null) {
            nodo.agregarHijo(this.expresion.getNodoCST());
          }

          return nodo;
        }
      }]);

      return Retorno;
    }(_Arbol_Nodo__WEBPACK_IMPORTED_MODULE_0__["Nodo"]);
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Simbolos/Simbolo.ts":
  /*!**************************************************!*\
    !*** ./src/analizadorXQUERY/Simbolos/Simbolo.ts ***!
    \**************************************************/

  /*! exports provided: Simbolo */

  /***/
  function srcAnalizadorXQUERYSimbolosSimboloTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Simbolo", function () {
      return Simbolo;
    });

    var Simbolo = function Simbolo(tipo, id, valor, tipo2, line, column) {
      _classCallCheck(this, Simbolo);

      this.tipo = tipo;
      this.id = id;
      this.valor = valor;
      this.line = line;
      this.column = column;
      this.tipo2 = tipo2;
    };
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Simbolos/Table.ts":
  /*!************************************************!*\
    !*** ./src/analizadorXQUERY/Simbolos/Table.ts ***!
    \************************************************/

  /*! exports provided: Table */

  /***/
  function srcAnalizadorXQUERYSimbolosTableTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Table", function () {
      return Table;
    });

    var Table = /*#__PURE__*/function () {
      function Table(Anterior) {
        _classCallCheck(this, Table);

        this.Anterior = Anterior;
        this.Variables = new Map();
      }

      _createClass(Table, [{
        key: "setVariable",
        value: function setVariable(simbol) {
          var ambito;

          for (ambito = this; ambito != null; ambito = ambito.Anterior) {
            for (var _i10 = 0, _Array$from = Array.from(ambito.Variables.keys()); _i10 < _Array$from.length; _i10++) {
              var key = _Array$from[_i10];

              if (key.toLowerCase() === simbol.id.toLowerCase()) {
                // return `La variable ${key} ya ha sido declarada.`;
                return this.Variables.set(simbol.id.toLowerCase(), simbol);
              }
            }
          }

          this.Variables.set(simbol.id.toLowerCase(), simbol);
          return null;
        }
      }, {
        key: "getVariable",
        value: function getVariable(id) {
          var ambito;

          for (ambito = this; ambito != null; ambito = ambito.Anterior) {
            for (var _i11 = 0, _Array$from2 = Array.from(ambito.Variables.keys()); _i11 < _Array$from2.length; _i11++) {
              var key = _Array$from2[_i11];

              if (key.toLowerCase() === id.toLowerCase()) {
                return ambito.Variables.get(key.toLocaleLowerCase());
              }
            }
          }

          return null;
        }
      }]);

      return Table;
    }();
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Simbolos/Tree.ts":
  /*!***********************************************!*\
    !*** ./src/analizadorXQUERY/Simbolos/Tree.ts ***!
    \***********************************************/

  /*! exports provided: Tree */

  /***/
  function srcAnalizadorXQUERYSimbolosTreeTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Tree", function () {
      return Tree;
    });

    var Tree = function Tree(instrucciones) {
      _classCallCheck(this, Tree);

      this.instrucciones = instrucciones;
      this.errores = new Array();
      this.consola = new Array();
      this.Variables = new Array();
      this.produccion = new Array();
      this.accion = new Array();
      this.salida3d = new Array();
    };
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Varios/Error.ts":
  /*!**********************************************!*\
    !*** ./src/analizadorXQUERY/Varios/Error.ts ***!
    \**********************************************/

  /*! exports provided: Error */

  /***/
  function srcAnalizadorXQUERYVariosErrorTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Error", function () {
      return Error;
    });

    var Error = /*#__PURE__*/function () {
      function Error(tipo, descripcion, line, column) {
        _classCallCheck(this, Error);

        this.tipo = tipo;
        this.descripcion = descripcion;
        this.line = line;
        this.column = column;
      }

      _createClass(Error, [{
        key: "toString",
        value: function toString() {
          return "Error ".concat(this.tipo, " en la linea ").concat(this.line, " y columna ").concat(this.column, ", ").concat(this.descripcion);
        }
      }]);

      return Error;
    }();
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Varios/Exepciones.ts":
  /*!***************************************************!*\
    !*** ./src/analizadorXQUERY/Varios/Exepciones.ts ***!
    \***************************************************/

  /*! exports provided: Excepcion */

  /***/
  function srcAnalizadorXQUERYVariosExepcionesTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Excepcion", function () {
      return Excepcion;
    });

    var Excepcion = /*#__PURE__*/function () {
      function Excepcion(tipo, descripcion, line, column) {
        _classCallCheck(this, Excepcion);

        this.tipo = tipo;
        this.descripcion = descripcion;
        this.line = line;
        this.column = column;
      }

      _createClass(Excepcion, [{
        key: "toString",
        value: function toString() {
          return "Error ".concat(this.tipo, " en la linea ").concat(this.line, " y columna ").concat(this.column, ", ").concat(this.descripcion);
        }
      }]);

      return Excepcion;
    }();
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Varios/Graficar.ts":
  /*!*************************************************!*\
    !*** ./src/analizadorXQUERY/Varios/Graficar.ts ***!
    \*************************************************/

  /*! exports provided: graphAST, graphCST */

  /***/
  function srcAnalizadorXQUERYVariosGraficarTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "graphAST", function () {
      return graphAST;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "graphCST", function () {
      return graphCST;
    });

    function graphAST(raiz) {
      getDot(raiz);
      return grafo;
    }

    function graphCST(raiz) {
      getDotCST(raiz);
      return grafo;
    }

    var c;
    var grafo;

    function getDotCST(raiz) {
      grafo = "digraph cst {\n";
      var val = raiz.getValor();
      val = val.replace(/\'/gi, "");
      val = val.replace(/\"/gi, "");
      grafo += "n0 [label = \"" + val + "\"]\n";
      c = 1;
      recorrerCST("n0", raiz);
      grafo += "}";
      return grafo;
    }

    function recorrerCST(padre, nPadre) {
      nPadre.getHijos().forEach(function (hijo) {
        var nombreHijo = "n" + c;
        var val = hijo.getValor();
        val = val.replace(/\'/gi, "");
        val = val.replace(/\"/gi, "");
        grafo += nombreHijo + " [label = \"";
        grafo = grafo + "" + val;
        grafo += "\"]\n";
        grafo += padre + " -> " + nombreHijo + "\n";
        c++;
        recorrerCST(nombreHijo, hijo);
      });
    }

    function getDot(raiz) {
      grafo = "digraph ast {\n";
      var val = raiz.getValor();
      val = val.replace(/\'/gi, "");
      val = val.replace(/\"/gi, "");
      grafo += "n0 [label = \"" + val + "\"]\n";
      c = 1;
      recorrerAST("n0", raiz);
      grafo += "}";
      return grafo;
    }

    function recorrerAST(padre, nPadre) {
      nPadre.getHijos().forEach(function (hijo) {
        var nombreHijo = "n" + c;
        var val = hijo.getValor();
        val = val.replace(/\'/gi, "");
        val = val.replace(/\"/gi, "");
        grafo += nombreHijo + " [label = \"" + val + "\"]\n";
        grafo += padre + " -> " + nombreHijo + "\n";
        c++;
        recorrerAST(nombreHijo, hijo);
      });
    }
    /***/

  },

  /***/
  "./src/analizadorXQUERY/Varios/Tipo.ts":
  /*!*********************************************!*\
    !*** ./src/analizadorXQUERY/Varios/Tipo.ts ***!
    \*********************************************/

  /*! exports provided: tipos, esEntero, Tipo */

  /***/
  function srcAnalizadorXQUERYVariosTipoTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "tipos", function () {
      return tipos;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "esEntero", function () {
      return esEntero;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Tipo", function () {
      return Tipo;
    });

    var tipos;

    (function (tipos) {
      tipos[tipos["ENTERO"] = 0] = "ENTERO";
      tipos[tipos["DECIMAL"] = 1] = "DECIMAL";
      tipos[tipos["NUMERO"] = 2] = "NUMERO";
      tipos[tipos["CARACTER"] = 3] = "CARACTER";
      tipos[tipos["STRING"] = 4] = "STRING";
      tipos[tipos["BOOLEANO"] = 5] = "BOOLEANO";
      tipos[tipos["LISTA"] = 6] = "LISTA";
      tipos[tipos["ARRAY"] = 7] = "ARRAY";
      tipos[tipos["VOID"] = 8] = "VOID";
      tipos[tipos["METODO"] = 9] = "METODO";
      tipos[tipos["FUNCION"] = 10] = "FUNCION";
      tipos[tipos["VARIABLE"] = 11] = "VARIABLE";
    })(tipos || (tipos = {}));

    function esEntero(numero) {
      if (numero % 1 == 0) {
        return tipos.ENTERO;
      } else {
        return tipos.DECIMAL;
      }
    }

    var Tipo = /*#__PURE__*/function () {
      function Tipo(tipo) {
        _classCallCheck(this, Tipo);

        this.tipo = tipo;
      }

      _createClass(Tipo, [{
        key: "toString",
        value: function toString() {
          if (this.tipo === tipos.BOOLEANO) {
            return 'boolean';
          } else if (this.tipo === tipos.ENTERO) {
            return 'entero';
          } else if (this.tipo === tipos.DECIMAL) {
            return 'decimal';
          } else if (this.tipo === tipos.STRING) {
            return 'string';
          } else if (this.tipo === tipos.CARACTER) {
            return 'caracter';
          } else if (this.tipo === tipos.VARIABLE) {
            return 'Variable';
          } else if (this.tipo === tipos.METODO) {
            return 'Metodo';
          } else if (this.tipo === tipos.FUNCION) {
            return 'Funcion';
          } else if (this.tipo === tipos.VOID) {
            return 'Void';
          } else if (this.tipo === tipos.ARRAY) {
            return 'Vector';
          } else if (this.tipo === tipos.LISTA) {
            return 'Lista';
          }
        }
      }]);

      return Tipo;
    }();
    /***/

  },

  /***/
  "./src/analizadorXQUERY/index.ts":
  /*!***************************************!*\
    !*** ./src/analizadorXQUERY/index.ts ***!
    \***************************************/

  /*! exports provided: AnalizadorXquery */

  /***/
  function srcAnalizadorXQUERYIndexTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AnalizadorXquery", function () {
      return AnalizadorXquery;
    });
    /* harmony import */


    var _Varios_Error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./Varios/Error */
    "./src/analizadorXQUERY/Varios/Error.ts");
    /* harmony import */


    var _Simbolos_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./Simbolos/Table */
    "./src/analizadorXQUERY/Simbolos/Table.ts");
    /* harmony import */


    var _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./Arbol/NodoAST */
    "./src/analizadorXQUERY/Arbol/NodoAST.ts");
    /* harmony import */


    var _Varios_Graficar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./Varios/Graficar */
    "./src/analizadorXQUERY/Varios/Graficar.ts");
    /* harmony import */


    var _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./Arbol/NodoCST */
    "./src/analizadorXQUERY/Arbol/NodoCST.ts");
    /* harmony import */


    var _Arbol_GramaticaBNF__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./Arbol/GramaticaBNF */
    "./src/analizadorXQUERY/Arbol/GramaticaBNF.ts");
    /* harmony import */


    var _analizadorXML_Codigo3D_xml3D__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../analizadorXML/Codigo3D/xml3D */
    "./src/analizadorXML/Codigo3D/xml3D.ts");
    /* harmony import */


    var _GramaticaXquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./GramaticaXquery */
    "./src/analizadorXQUERY/GramaticaXquery.js");
    /* harmony import */


    var _GramaticaXquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_GramaticaXquery__WEBPACK_IMPORTED_MODULE_7__);

    var AnalizadorXquery = /*#__PURE__*/function () {
      function AnalizadorXquery() {
        _classCallCheck(this, AnalizadorXquery);
      }

      _createClass(AnalizadorXquery, [{
        key: "ejecutarCodigo",
        value: function ejecutarCodigo(entrada) {
          //entrada = `local:minPrice($/bookstore/book/price,$/bookstore/book/year)`
          //let arbol: Tree = gramatica.parse(entrada)
          var ret = {
            errores: [],
            consola: [],
            ast: "",
            cst: "",
            tabla: [],
            bnf: [],
            salida3d: []
          };

          try {
            var tree = _GramaticaXquery__WEBPACK_IMPORTED_MODULE_7__["parse"](entrada);

            var tabla = new _Simbolos_Table__WEBPACK_IMPORTED_MODULE_1__["Table"](null);
            tree.instrucciones.map(function (m) {
              try {
                var res = m.execute(tabla, tree);
              } catch (error) {
                var error2 = new _Varios_Error__WEBPACK_IMPORTED_MODULE_0__["Error"]('Sintactico', "Irrecuperable", 0, 0);
                tree.consola.push(error2.toString());
              }
            });
            var init = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_2__["NodoAST"]("RAIZ");
            var instr = new _Arbol_NodoAST__WEBPACK_IMPORTED_MODULE_2__["NodoAST"]("INSTRUCCIONES");
            tree.instrucciones.map(function (m) {
              instr.agregarHijo(m.getNodo());
            });
            init.agregarHijo(instr);
            var init2 = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("RAIZ");
            var instr2 = new _Arbol_NodoCST__WEBPACK_IMPORTED_MODULE_4__["NodoCST"]("INSTRUCCIONES");
            tree.instrucciones.map(function (m) {
              instr2.agregarHijo(m.getNodoCST());
            });
            init2.agregarHijo(instr2);
            ret.cst = Object(_Varios_Graficar__WEBPACK_IMPORTED_MODULE_3__["graphCST"])(init2);
            ret.ast = Object(_Varios_Graficar__WEBPACK_IMPORTED_MODULE_3__["graphAST"])(init);
            var bnfC = new _Arbol_GramaticaBNF__WEBPACK_IMPORTED_MODULE_5__["GramaticaBNF"](tree.produccion, tree.accion);
            var reporteBNF = bnfC.getBNFReport();
            var buscador = new _analizadorXML_Codigo3D_xml3D__WEBPACK_IMPORTED_MODULE_6__["xml3D"]();
            console.log(tree);
            ret.consola = tree.consola;
            ret.errores = tree.errores;
            ret.tabla = tree.Variables;
            ret.bnf = reporteBNF;
            ret.salida3d = tree.salida3d;
            var decla = buscador.crear3DDecla(tree.Variables);
            ret.salida3d.push(decla);
          } catch (error) {
            var consola2 = new Array();
            consola2.push(error);
            consola2.push("Ocurrio un Error sintactico Irrecuperable\n\n");
            consola2.push("                   FFFFFFFFFFFFFFF\n" + "                   FFFFFFFFFFFFFFF\n" + "                   FFFFFF\n" + "                   FFFFFF\n" + "                   FFFFFFFFFFFFFFF\n" + "                   FFFFFFFFFFFFFFF\n" + "                   FFFFFFF\n" + "                   FFFFFFF\n" + "                   FFFFFFF\n" + "                   FFFFFFF");
            ret.consola = consola2;
            ret.errores = [];
          }

          return ret;
        }
      }]);

      return AnalizadorXquery;
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
          var _this28 = this;

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
              _this28.dot += _this28.generarNodoAST(objeto, 'raiz');
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
          var _this29 = this;

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
              _this29.dot += _this29.generarNodoCST(objeto, 'raiz');
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

    var SalidaGramatica = function SalidaGramatica(objetos, reporte, reporte2, reporteE) {
      _classCallCheck(this, SalidaGramatica);

      this.objetos = objetos;
      this.reporteBNF = reporte;
      this.reporteBNF2 = reporte2;
      this.reportError = reporteE;
    };
    /***/

  },

  /***/
  "./src/analizadores/Errores/ListaErrores.ts":
  /*!**************************************************!*\
    !*** ./src/analizadores/Errores/ListaErrores.ts ***!
    \**************************************************/

  /*! exports provided: ListaErrores */

  /***/
  function srcAnalizadoresErroresListaErroresTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ListaErrores", function () {
      return ListaErrores;
    });
    /* harmony import */


    var _Expresiones_tError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ../Expresiones/tError */
    "./src/analizadores/Expresiones/tError.ts");

    var ListaErrores = /*#__PURE__*/function () {
      function ListaErrores() {
        _classCallCheck(this, ListaErrores);

        this.contador = 1;
        this.contador = 1;
      } //LLAMARLO AL INICIO PARA VALIDAR LAS ETIQUETAS


      _createClass(ListaErrores, [{
        key: "validateEtiquetas",
        value: function validateEtiquetas(listaO) {
          var tmpArray = [];

          for (var i = 0; i < listaO.length; i++) {
            if (listaO[i].identificador !== listaO[i].cierre) {
              tmpArray.push(new _Expresiones_tError__WEBPACK_IMPORTED_MODULE_0__["tError"]('Semantico', "Etiquetas incorrectas ".concat(listaO[i].identificador, " !=== ").concat(listaO[i].cierre), listaO[i].linea, listaO[i].columna)); //console.log(`Etiquetas incorrectas ${listaO[i].identificador} !=== ${listaO[i].cierre}`);
            } else {
              var tmp = this.validateEtiquetas(listaO[i].listaObjetos);

              if (tmp.length !== 0) {
                tmpArray = tmp;
              }
            }
          }

          return tmpArray;
        }
        /*
            var arrTmp = lError.validateEtiquetas(salidaG.objetos);
            console.log(lError.generateHtmlBody(salidaG.lErrores, arrTmp));
        */
        //ARCHIVO .HTML

      }, {
        key: "generateHtmlBody",
        value: function generateHtmlBody(erroresLS, erroresEtiquetas) {
          var _this30 = this;

          var arrayCuerpo = [];

          if (erroresLS.length > 0) {
            erroresLS.forEach(function (object) {
              arrayCuerpo.push(_this30.getHtmlBody(object));
            });
          }

          if (erroresEtiquetas.length > 0) {
            erroresEtiquetas.forEach(function (object) {
              arrayCuerpo.push(_this30.getHtmlBody(object));
            });
          }

          return arrayCuerpo;
        }
      }, {
        key: "getHtmlBody",
        value: function getHtmlBody(error) {
          var fila = {
            no: this.contador,
            tipo: error.tipo,
            valor: error.texto,
            linea: error.linea,
            columna: error.columna
          };
          return fila;
        }
      }]);

      return ListaErrores;
    }();
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
  "./src/analizadores/Expresiones/tError.ts":
  /*!************************************************!*\
    !*** ./src/analizadores/Expresiones/tError.ts ***!
    \************************************************/

  /*! exports provided: tError */

  /***/
  function srcAnalizadoresExpresionesTErrorTs(module, __webpack_exports__, __webpack_require__) {
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


    var _Errores_ListaErrores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./Errores/ListaErrores */
    "./src/analizadores/Errores/ListaErrores.ts");
    /* harmony import */


    var _xpathAsc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./xpathAsc */
    "./src/analizadores/xpathAsc.js");
    /* harmony import */


    var _xpathAsc__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_xpathAsc__WEBPACK_IMPORTED_MODULE_3__);

    var AnalizadosAscXpath = /*#__PURE__*/function () {
      function AnalizadosAscXpath() {
        _classCallCheck(this, AnalizadosAscXpath);
      }

      _createClass(AnalizadosAscXpath, [{
        key: "ejecutarCodigo",
        value: function ejecutarCodigo(entrada) {
          var salidaG = _xpathAsc__WEBPACK_IMPORTED_MODULE_3__["parse"](entrada);

          var gramBnf = new _AST_GramaticaBNF__WEBPACK_IMPORTED_MODULE_0__["GramaticaBNF"](salidaG.reporteBNF, salidaG.reporteBNF2);
          var arbol = new _AST_Arbol__WEBPACK_IMPORTED_MODULE_1__["Arbol"](salidaG.objetos);
          var Listaerrores = new _Errores_ListaErrores__WEBPACK_IMPORTED_MODULE_2__["ListaErrores"]();
          console.log(salidaG.objetos);
          var reporteBNF = gramBnf.getBNFReport();
          var reporteAST = arbol.crearGrafoAST();
          var reporteCST = arbol.crearGrafoCST();
          var resultado = arbol.ejecutarArbol(); //Errores

          var errores = Listaerrores.generateHtmlBody(salidaG.reportError, []);
          return {
            objetos: salidaG.objetos,
            bnfRep: reporteBNF,
            astRep: reporteAST,
            cstRep: reporteCST,
            ejecutado: resultado,
            errores: errores
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


    var _Errores_ListaErrores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./Errores/ListaErrores */
    "./src/analizadores/Errores/ListaErrores.ts");
    /* harmony import */


    var _xpathDesc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./xpathDesc */
    "./src/analizadores/xpathDesc.js");
    /* harmony import */


    var _xpathDesc__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_xpathDesc__WEBPACK_IMPORTED_MODULE_3__);

    var AnalizadosAscXpath = /*#__PURE__*/function () {
      function AnalizadosAscXpath() {
        _classCallCheck(this, AnalizadosAscXpath);
      }

      _createClass(AnalizadosAscXpath, [{
        key: "ejecutarCodigo",
        value: function ejecutarCodigo(entrada) {
          var salidaG = _xpathDesc__WEBPACK_IMPORTED_MODULE_3__["parse"](entrada);

          var gramBnf = new _AST_GramaticaBNF__WEBPACK_IMPORTED_MODULE_0__["GramaticaBNF"](salidaG.reporteBNF, salidaG.reporteBNF2);
          var arbol = new _AST_Arbol__WEBPACK_IMPORTED_MODULE_1__["Arbol"](salidaG.objetos);
          var Listaerrores = new _Errores_ListaErrores__WEBPACK_IMPORTED_MODULE_2__["ListaErrores"]();
          var reporteBNF = gramBnf.getBNFReport();
          var reporteAST = arbol.crearGrafoAST();
          var reporteCST = arbol.crearGrafoCST();
          var resultado = arbol.ejecutarArbol(); //Errores

          var errores = Listaerrores.generateHtmlBody(salidaG.reportError, []);
          return {
            objetos: salidaG.objetos,
            bnfRep: reporteBNF,
            astRep: reporteAST,
            cstRep: reporteCST,
            ejecutado: resultado,
            errores: errores
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
            $V5 = [5, 6],
            $V6 = [1, 13],
            $V7 = [1, 12],
            $V8 = [2, 5, 6, 14],
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
            $Vs = [8, 12, 16, 17, 20, 23, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
            $Vt = [2, 14],
            $Vu = [1, 49],
            $Vv = [1, 53],
            $Vw = [1, 48],
            $Vx = [1, 46],
            $Vy = [1, 47],
            $Vz = [1, 50],
            $VA = [1, 51],
            $VB = [1, 52],
            $VC = [1, 62],
            $VD = [1, 61],
            $VE = [1, 63],
            $VF = [1, 83],
            $VG = [1, 81],
            $VH = [1, 82],
            $VI = [1, 84],
            $VJ = [1, 85],
            $VK = [1, 86],
            $VL = [1, 87],
            $VM = [1, 88],
            $VN = [1, 89],
            $VO = [1, 90],
            $VP = [1, 91],
            $VQ = [1, 92],
            $VR = [1, 93],
            $VS = [16, 19, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
            $VT = [2, 5, 6, 14, 16, 19, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
            $VU = [1, 136],
            $VV = [1, 134],
            $VW = [1, 135],
            $VX = [1, 137],
            $VY = [16, 19, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
            $VZ = [19, 40, 44, 45, 46, 47, 48, 49, 50, 51, 52],
            $V_ = [19, 40, 44, 49, 50, 51, 52];

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
          productions_: [0, [3, 2], [4, 3], [4, 1], [7, 4], [7, 3], [7, 3], [7, 4], [7, 3], [7, 5], [9, 1], [9, 2], [9, 2], [11, 3], [11, 0], [10, 2], [10, 2], [10, 4], [10, 2], [10, 1], [15, 1], [15, 2], [15, 1], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [22, 4], [25, 2], [25, 4], [25, 2], [25, 3], [13, 3], [13, 0], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 3], [39, 1], [39, 1], [39, 2], [39, 1], [39, 3], [39, 3], [39, 1], [39, 3], [21, 1], [21, 1], [21, 3]],
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
                return new SalidaGramatica($$[$0 - 1], produccion, accion, listaErrores);
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
                listaErrores.push(new tError('Sintactico', "Token inesperado: ".concat(yytext), _$[$0 - 1].first_line, _$[$0 - 1].first_column));
                break;

              case 13:
                produccion.push("<DERIVACIONDIAGONAL> ::= <DIAGONALES> <DERIVADOS> <DERIVACIONDIAGONAL>");
                accion.push('DERIVACIONDIAGONAL.Val = []; DERIVACIONDIAGONAL.Val.push(new Nodo(tipo, id, predicado, fila, columna)); DERIVACIONDIAGONAL.push(DERIVACIONDIAGONAL)');
                this.$ = new Array();
                this.$.push(new Nodo($$[$0 - 2], $$[$0 - 1].val, $$[$0 - 1].pre, _toConsumableArray($$[$0]), _$[$0 - 2].first_line, _$[$0 - 2].first_column)); //this.$.push(...$$[$0])

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
                produccion.push("<EXPRESION> ::= <EXPRESION> mas <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '+', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 42:
                produccion.push("<EXPRESION> ::= <EXPRESION> menos <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val - EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '-', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 43:
                produccion.push("<EXPRESION> ::= <EXPRESION> asterisco <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val * EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '*', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 44:
                produccion.push("<EXPRESION> ::= <EXPRESION> div <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val / EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '/', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 45:
                produccion.push("<EXPRESION> ::= <EXPRESION> mod <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val % EXPRESION.Val');
                this.$ = new Aritmetica["default"]($$[$0 - 2], '%', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 46:
                produccion.push("<EXPRESION> ::= <EXPRESION> menor <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \"<\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '<', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 47:
                produccion.push("<EXPRESION> ::= <EXPRESION> mayor <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \">\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '>', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 48:
                produccion.push("<EXPRESION> ::= <EXPRESION> menorIgual <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \"<=\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '<=', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 49:
                produccion.push("<EXPRESION> ::= <EXPRESION> mayorIgual <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \">=\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '>=', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 50:
                produccion.push("<EXPRESION> ::= <EXPRESION> igual <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \"=\" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '=', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 51:
                produccion.push("<EXPRESION> ::= <EXPRESION> distinto <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + "" + EXPRESION.Val');
                this.$ = new Relacional["default"]($$[$0 - 2], '!=', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 52:
                produccion.push("<EXPRESION> ::= <EXPRESION> or <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \"or\" + EXPRESION.Val');
                this.$ = new Logica["default"]($$[$0 - 2], 'or', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 53:
                produccion.push("<EXPRESION> ::= <EXPRESION> and <EXPRESION>");
                accion.push('EXPRESION.Val = EXPRESION.Val + \"and\" + EXPRESION.Val');
                this.$ = new Logica["default"]($$[$0 - 2], 'and', $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 54:
                produccion.push("<EXPRESION> ::= entero");
                accion.push('EXPRESION.Val = \"entero\"');
                this.$ = new Primitivo["default"](Number(yytext), _$[$0].first_line, _$[$0].first_column);
                break;

              case 55:
                produccion.push("<EXPRESION> ::= decimal");
                accion.push('EXPRESION.Val = \"decimal\"');
                this.$ = new Primitivo["default"](Number(yytext), _$[$0].first_line, _$[$0].first_column);
                break;

              case 56:
                produccion.push("<EXPRESION> ::= arroba <ATRIBUTO>");
                accion.push('EXPRESION.Val = \"@\" + ATRIBUTO.Val');
                this.$ = new Primitivo["default"]("this._".concat($$[$0]), _$[$0 - 1].first_line, _$[$0 - 1].first_column);
                break;

              case 57:
                produccion.push("<EXPRESION> ::= identificador");
                accion.push('EXPRESION.Val = \"identificador\"');
                this.$ = new Primitivo["default"]($$[$0], _$[$0].first_line, _$[$0].first_column);
                break;

              case 58:
                produccion.push("<EXPRESION> ::= position()");
                accion.push('EXPRESION.Val = \"position()\"');
                this.$ = new Primitivo["default"]("position()", _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 59:
                produccion.push("<EXPRESION> ::= last()");
                accion.push('EXPRESION.Val = \"last()\"');
                this.$ = new Primitivo["default"]("last()", _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 60:
                produccion.push("<EXPRESION> ::= texto");
                accion.push('EXPRESION.Val = \"texto\"');
                this.$ = new Primitivo["default"]($$[$0], _$[$0].first_line, _$[$0].first_column);
                break;

              case 61:
                produccion.push("<EXPRESION> ::= ( <EXPRESION> )");
                accion.push('EXPRESION.Val = EXPRESION1.Val');
                this.$ = new Primitivo["default"]($$[$0 - 2], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                break;

              case 62:
                produccion.push("<ATRIBUTO> ::= asterisco");
                accion.push('ATRIBUTO.Val = \"*\"');
                this.$ = $$[$0];
                break;

              case 63:
                produccion.push("<ATRIBUTO> ::= identificador");
                accion.push('ATRIBUTO.Val = identificador');
                this.$ = $$[$0];
                break;

              case 64:
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
            2: $V6,
            9: 11,
            14: $V7
          }, o($V8, $V9, {
            13: 14,
            38: $Va
          }), {
            8: $Vb,
            10: 19,
            12: $Vc,
            14: [1, 17],
            15: 16,
            16: $Vd,
            17: $Ve,
            20: $Vf,
            22: 24,
            23: $Vg,
            26: $Vh,
            27: $Vi,
            28: $Vj,
            29: $Vk,
            30: $Vl,
            31: $Vm,
            32: $Vn,
            33: $Vo,
            34: $Vp,
            35: $Vq,
            36: $Vr
          }, o($V8, $V9, {
            13: 37,
            38: $Va
          }), {
            18: [1, 38]
          }, {
            1: [2, 1]
          }, {
            7: 39,
            8: $V0,
            12: $V1,
            14: $V2,
            16: $V3,
            17: $V4
          }, {
            10: 40,
            12: $Vc,
            16: $Vd,
            17: $Ve,
            20: $Vf,
            22: 24,
            23: $Vg,
            26: $Vh,
            27: $Vi,
            28: $Vj,
            29: $Vk,
            30: $Vl,
            31: $Vm,
            32: $Vn,
            33: $Vo,
            34: $Vp,
            35: $Vq,
            36: $Vr
          }, o($Vs, [2, 10], {
            14: [1, 41]
          }), {
            14: [1, 42]
          }, o($V5, $Vt, {
            11: 43,
            9: 44,
            2: $V6,
            14: $V7
          }), {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 45,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, o($V5, $Vt, {
            9: 44,
            11: 54,
            2: $V6,
            14: $V7
          }), {
            8: $Vb,
            10: 19,
            12: $Vc,
            15: 55,
            16: $Vd,
            17: $Ve,
            20: $Vf,
            22: 24,
            23: $Vg,
            26: $Vh,
            27: $Vi,
            28: $Vj,
            29: $Vk,
            30: $Vl,
            31: $Vm,
            32: $Vn,
            33: $Vo,
            34: $Vp,
            35: $Vq,
            36: $Vr
          }, o($V8, [2, 20], {
            8: [1, 56]
          }), o($V8, [2, 22]), o($V8, $V9, {
            13: 57,
            38: $Va
          }), o($V8, $V9, {
            13: 58,
            38: $Va
          }), {
            18: [1, 59]
          }, {
            12: $VC,
            16: $VD,
            17: $VE,
            21: 60
          }, o($V8, [2, 19]), {
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
          }, {
            24: [1, 74]
          }, {
            24: [1, 75]
          }, o($V5, $Vt, {
            9: 44,
            11: 76,
            2: $V6,
            14: $V7
          }), {
            19: [1, 77]
          }, o($V5, [2, 2]), o($V5, $Vt, {
            9: 44,
            11: 78,
            2: $V6,
            14: $V7
          }), o($Vs, [2, 11]), o($Vs, [2, 12]), o($V5, [2, 5]), {
            8: $Vb,
            10: 19,
            12: $Vc,
            15: 79,
            16: $Vd,
            17: $Ve,
            20: $Vf,
            22: 24,
            23: $Vg,
            26: $Vh,
            27: $Vi,
            28: $Vj,
            29: $Vk,
            30: $Vl,
            31: $Vm,
            32: $Vn,
            33: $Vo,
            34: $Vp,
            35: $Vq,
            36: $Vr
          }, {
            16: $VF,
            40: [1, 80],
            41: $VG,
            42: $VH,
            43: $VI,
            44: $VJ,
            45: $VK,
            46: $VL,
            47: $VM,
            48: $VN,
            49: $VO,
            50: $VP,
            51: $VQ,
            52: $VR
          }, o($VS, [2, 54]), o($VS, [2, 55]), {
            12: $VC,
            16: $VD,
            17: $VE,
            21: 94
          }, o($VS, [2, 57]), {
            18: [1, 95]
          }, {
            18: [1, 96]
          }, o($VS, [2, 60]), {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 97,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, o($V5, [2, 6]), o($V5, $Vt, {
            9: 44,
            11: 98,
            2: $V6,
            14: $V7
          }), o($V8, [2, 21]), o($V8, [2, 15]), o($V8, [2, 16]), {
            19: [1, 99]
          }, o($V8, [2, 18]), o($VT, [2, 62]), o($VT, [2, 63]), {
            18: [1, 100]
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
          }, {
            24: [1, 111]
          }, {
            24: [1, 112]
          }, o($V5, [2, 8]), o($V8, $V9, {
            13: 113,
            38: $Va
          }), o($V5, [2, 4]), o($V5, $Vt, {
            9: 44,
            11: 114,
            2: $V6,
            14: $V7
          }), o($V8, [2, 39]), {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 115,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 116,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 117,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 118,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 119,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 120,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 121,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 122,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 123,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 124,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 125,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 126,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, {
            12: $Vu,
            18: $Vv,
            20: $Vw,
            39: 127,
            53: $Vx,
            54: $Vy,
            55: $Vz,
            56: $VA,
            57: $VB
          }, o($VS, [2, 56]), {
            19: [1, 128]
          }, {
            19: [1, 129]
          }, {
            16: $VF,
            19: [1, 130],
            41: $VG,
            42: $VH,
            43: $VI,
            44: $VJ,
            45: $VK,
            46: $VL,
            47: $VM,
            48: $VN,
            49: $VO,
            50: $VP,
            51: $VQ,
            52: $VR
          }, o($V5, [2, 7]), o($V8, $V9, {
            13: 131,
            38: $Va
          }), {
            58: [1, 132]
          }, {
            12: $VU,
            16: $VV,
            17: $VW,
            25: 133,
            37: $VX
          }, {
            12: $VU,
            16: $VV,
            17: $VW,
            25: 138,
            37: $VX
          }, {
            12: $VU,
            16: $VV,
            17: $VW,
            25: 139,
            37: $VX
          }, {
            12: $VU,
            16: $VV,
            17: $VW,
            25: 140,
            37: $VX
          }, {
            12: $VU,
            16: $VV,
            17: $VW,
            25: 141,
            37: $VX
          }, {
            12: $VU,
            16: $VV,
            17: $VW,
            25: 142,
            37: $VX
          }, {
            12: $VU,
            16: $VV,
            17: $VW,
            25: 143,
            37: $VX
          }, {
            12: $VU,
            16: $VV,
            17: $VW,
            25: 144,
            37: $VX
          }, {
            12: $VU,
            16: $VV,
            17: $VW,
            25: 145,
            37: $VX
          }, {
            12: $VU,
            16: $VV,
            17: $VW,
            25: 146,
            37: $VX
          }, {
            12: $VU,
            16: $VV,
            17: $VW,
            25: 147,
            37: $VX
          }, {
            12: $VU,
            16: $VV,
            17: $VW,
            25: 148,
            37: $VX
          }, o($V5, $Vt, {
            9: 44,
            11: 149,
            2: $V6,
            14: $V7
          }), o($V5, [2, 13]), o($VS, [2, 41]), o($VS, [2, 42]), o($VY, [2, 43], {
            41: $VG,
            42: $VH
          }), o($VY, [2, 44], {
            41: $VG,
            42: $VH
          }), o([19, 40, 44], [2, 45], {
            16: $VF,
            41: $VG,
            42: $VH,
            43: $VI,
            45: $VK,
            46: $VL,
            47: $VM,
            48: $VN,
            49: $VO,
            50: $VP,
            51: $VQ,
            52: $VR
          }), o($VZ, [2, 46], {
            16: $VF,
            41: $VG,
            42: $VH,
            43: $VI
          }), o($VZ, [2, 47], {
            16: $VF,
            41: $VG,
            42: $VH,
            43: $VI
          }), o($VZ, [2, 48], {
            16: $VF,
            41: $VG,
            42: $VH,
            43: $VI
          }), o($VZ, [2, 49], {
            16: $VF,
            41: $VG,
            42: $VH,
            43: $VI
          }), o($V_, [2, 50], {
            16: $VF,
            41: $VG,
            42: $VH,
            43: $VI,
            45: $VK,
            46: $VL,
            47: $VM,
            48: $VN
          }), o($V_, [2, 51], {
            16: $VF,
            41: $VG,
            42: $VH,
            43: $VI,
            45: $VK,
            46: $VL,
            47: $VM,
            48: $VN
          }), o([19, 40, 44, 51], [2, 52], {
            16: $VF,
            41: $VG,
            42: $VH,
            43: $VI,
            45: $VK,
            46: $VL,
            47: $VM,
            48: $VN,
            49: $VO,
            50: $VP,
            52: $VR
          }), o([19, 40, 44, 51, 52], [2, 53], {
            16: $VF,
            41: $VG,
            42: $VH,
            43: $VI,
            45: $VK,
            46: $VL,
            47: $VM,
            48: $VN,
            49: $VO,
            50: $VP
          }), o($VS, [2, 58]), o($VS, [2, 59]), o($VS, [2, 61]), o($V8, [2, 17]), o($VT, [2, 64]), o($V8, [2, 23]), o($V8, $V9, {
            13: 150,
            38: $Va
          }), {
            18: [1, 151]
          }, o($V8, $V9, {
            13: 152,
            38: $Va
          }), {
            18: [1, 153]
          }, o($V8, [2, 24]), o($V8, [2, 25]), o($V8, [2, 26]), o($V8, [2, 27]), o($V8, [2, 28]), o($V8, [2, 29]), o($V8, [2, 30]), o($V8, [2, 31]), o($V8, [2, 32]), o($V8, [2, 33]), o($V8, [2, 34]), o($V5, [2, 9]), o($V8, [2, 35]), {
            19: [1, 154]
          }, o($V8, [2, 37]), {
            19: [1, 155]
          }, o($V8, $V9, {
            13: 156,
            38: $Va
          }), o($V8, [2, 38]), o($V8, [2, 36])],
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

        var _webpack_require__33 = __webpack_require__(
        /*! ./AST/SalidaGramatica */
        "./src/analizadores/AST/SalidaGramatica.ts"),
            SalidaGramatica = _webpack_require__33.SalidaGramatica;

        var _webpack_require__34 = __webpack_require__(
        /*! ./Expresiones/Nodo */
        "./src/analizadores/Expresiones/Nodo.ts"),
            Nodo = _webpack_require__34.Nodo;

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

        var _webpack_require__35 = __webpack_require__(
        /*! ./Expresiones/Predicate */
        "./src/analizadores/Expresiones/Predicate.ts"),
            Predicate = _webpack_require__35.Predicate; //const { Atributo } = require('./Expresiones/Atributo');


        var _webpack_require__36 = __webpack_require__(
        /*! ./Expresiones/tError */
        "./src/analizadores/Expresiones/tError.ts"),
            tError = _webpack_require__36.tError;

        var listaErrores = [];
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
                  listaErrores.push(new tError('Léxico', "Simbolo inesperado: ".concat(yy_.yytext), yy_.yylloc.first_line, yy_.yylloc.first_column));
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
        var o = function o(k, v, _o5, l) {
          for (_o5 = _o5 || {}, l = k.length; l--; _o5[k[l]] = v) {
            ;
          }

          return _o5;
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
            var _this$$2, _this$$3;

            /* this == yyval */
            var $0 = $$.length - 1;

            switch (yystate) {
              case 1:
                produccion.push('<INICIOPURO> ::= <INICIO> EOF');
                accion.push('INICIOPURO.Val = INICIO.val //fin del documento');
                return new SalidaGramatica($$[$0 - 1], produccion, accion, listaErrores);
                break;

              case 2:
                produccion.push('<INICIO> ::= <INICIALES>');
                accion.push('INICIO.Val = INICIALES.Val');
                this.$ = [$$[$0 - 1]];

                (_this$$2 = this.$).push.apply(_this$$2, _toConsumableArray($$[$0]));

                break;

              case 3:
                produccion.push('<INICIOP> ::= | <INICIALES> <INICIOP>');
                accion.push('INICIOP.val.push(INICIALES)');
                this.$ = [$$[$0 - 1]];

                (_this$$3 = this.$).push.apply(_this$$3, _toConsumableArray($$[$0]));

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

        var _webpack_require__37 = __webpack_require__(
        /*! ./AST/SalidaGramatica */
        "./src/analizadores/AST/SalidaGramatica.ts"),
            SalidaGramatica = _webpack_require__37.SalidaGramatica;

        var _webpack_require__38 = __webpack_require__(
        /*! ./Expresiones/Nodo */
        "./src/analizadores/Expresiones/Nodo.ts"),
            Nodo = _webpack_require__38.Nodo;

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

        var _webpack_require__39 = __webpack_require__(
        /*! ./Expresiones/Predicate */
        "./src/analizadores/Expresiones/Predicate.ts"),
            Predicate = _webpack_require__39.Predicate; //const { Atributo } = require('./Expresiones/Atributo');


        var _webpack_require__40 = __webpack_require__(
        /*! ./Expresiones/tError */
        "./src/analizadores/Expresiones/tError.ts"),
            tError = _webpack_require__40.tError;

        var listaErrores = [];
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
                  listaErrores.push(new tError('Léxico', "Simbolo inesperado: ".concat(yy_.yytext), yy_.yylloc.first_line, yy_.yylloc.first_column));
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
    /* harmony import */


    var _paginas_tabla_errores_tabla_errores_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! ./paginas/tabla-errores/tabla-errores.component */
    "./src/app/paginas/tabla-errores/tabla-errores.component.ts");
    /* harmony import */


    var _paginas_tabla_xquery_tabla_xquery_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
    /*! ./paginas/tabla-xquery/tabla-xquery.component */
    "./src/app/paginas/tabla-xquery/tabla-xquery.component.ts");
    /* harmony import */


    var _paginas_tabla_opt_tabla_opt_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
    /*! ./paginas/tabla-opt/tabla-opt.component */
    "./src/app/paginas/tabla-opt/tabla-opt.component.ts");

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"], _paginas_tabla_xml_tabla_xml_component__WEBPACK_IMPORTED_MODULE_15__["TablaXMLComponent"], _paginas_principal_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"], _paginas_grafico_grafico_component__WEBPACK_IMPORTED_MODULE_17__["GraficoComponent"], _paginas_bnf_bnf_component__WEBPACK_IMPORTED_MODULE_18__["BnfComponent"], _paginas_tabla_errores_tabla_errores_component__WEBPACK_IMPORTED_MODULE_19__["TablaErroresComponent"], _paginas_tabla_xquery_tabla_xquery_component__WEBPACK_IMPORTED_MODULE_20__["TablaXqueryComponent"], _paginas_tabla_opt_tabla_opt_component__WEBPACK_IMPORTED_MODULE_21__["TablaOptComponent"]],
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


    __webpack_exports__["default"] = "#barra {\n    height: 06vh;\n}\n\n.spacer {\n    flex: 1 1 auto;\n}\n\n#superior { \n    height: 15vh;\n}\n\n#separador1 {\n    height: 01vh;\n    background-color: #f44336;\n}\n\n#inferior {\n    height: 78vh;\n    width: 100vw;\n    display: flex;\n}\n\n#izquierda {\n    width: 49.50vw;\n}\n\n#separador2 {\n    width: 01vw;\n    background-color: #f44336;\n}\n\n#derecha {\n    width: 49.50vw;\n}\n\n#inferior2 {\n    height: 49.25%;\n}\n\n#inferior3 {\n    height: 49.25%;\n}\n\n#superior3 {\n    height: 49.25%;\n}\n\n#separador4 {\n    height: 01vh;\n    background-color: #f44336;\n}\n\n#separador3 {\n    height: 01vh;\n    background-color: #f44336;\n}\n\n#superior2 {\n    height: 49.25%;\n}\n\n#grafo {\n    width: 100%;\n    height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnaW5hcy9wcmluY2lwYWwvaG9tZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1osYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLFlBQVk7SUFDWix5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxZQUFZO0lBQ1oseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvcGFnaW5hcy9wcmluY2lwYWwvaG9tZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2JhcnJhIHtcbiAgICBoZWlnaHQ6IDA2dmg7XG59XG5cbi5zcGFjZXIge1xuICAgIGZsZXg6IDEgMSBhdXRvO1xufVxuXG4jc3VwZXJpb3IgeyBcbiAgICBoZWlnaHQ6IDE1dmg7XG59XG5cbiNzZXBhcmFkb3IxIHtcbiAgICBoZWlnaHQ6IDAxdmg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0NDMzNjtcbn1cblxuI2luZmVyaW9yIHtcbiAgICBoZWlnaHQ6IDc4dmg7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIGRpc3BsYXk6IGZsZXg7XG59XG5cbiNpenF1aWVyZGEge1xuICAgIHdpZHRoOiA0OS41MHZ3O1xufVxuXG4jc2VwYXJhZG9yMiB7XG4gICAgd2lkdGg6IDAxdnc7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0NDMzNjtcbn1cblxuI2RlcmVjaGEge1xuICAgIHdpZHRoOiA0OS41MHZ3O1xufVxuXG4jaW5mZXJpb3IyIHtcbiAgICBoZWlnaHQ6IDQ5LjI1JTtcbn1cblxuI2luZmVyaW9yMyB7XG4gICAgaGVpZ2h0OiA0OS4yNSU7XG59XG5cbiNzdXBlcmlvcjMge1xuICAgIGhlaWdodDogNDkuMjUlO1xufVxuXG4jc2VwYXJhZG9yNCB7XG4gICAgaGVpZ2h0OiAwMXZoO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNDQzMzY7XG59XG5cbiNzZXBhcmFkb3IzIHtcbiAgICBoZWlnaHQ6IDAxdmg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0NDMzNjtcbn1cblxuI3N1cGVyaW9yMiB7XG4gICAgaGVpZ2h0OiA0OS4yNSU7XG59XG5cbiNncmFmbyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xufSJdfQ== */";
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


    var _analizadorXQUERY_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../../../analizadorXQUERY/index */
    "./src/analizadorXQUERY/index.ts");
    /* harmony import */


    var _reporte_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../../reporte.service */
    "./src/app/reporte.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _analizadorXML_Instrucciones_Busqueda_xpathBusqueda__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../../../analizadorXML/Instrucciones/Busqueda/xpathBusqueda */
    "./src/analizadorXML/Instrucciones/Busqueda/xpathBusqueda.ts");
    /* harmony import */


    var _analizadorXML_Codigo3D_xml3D__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ../../../analizadorXML/Codigo3D/xml3D */
    "./src/analizadorXML/Codigo3D/xml3D.ts");
    /* harmony import */


    var _analizadorXML_Optimizacion_Optimizar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ../../../analizadorXML/Optimizacion/Optimizar */
    "./src/analizadorXML/Optimizacion/Optimizar.ts");

    var HomeComponent = /*#__PURE__*/function () {
      function HomeComponent(_servicio, _router) {
        _classCallCheck(this, HomeComponent);

        this._servicio = _servicio;
        this._router = _router;
        this.title = 'interfaz'; //editor query

        this.querys = "declare function local:ackerman($m as xs:integer, $n as xs:integer ) as xs:integer {\n  if ($m = 0) then $n+1\n  else if ($m gt 0 and $n = 0) then local:ackerman($m - 1, 1)\n  else local:ackerman ($m - 1, local:ackerman($m, $n - 1))\n};\n  \nlocal:ackerman(/pruebas/m, /pruebas/n)";
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

        this.xmlEntrada = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\n<pruebas>\n  <m>2</m>\n  <n>1</n>\n</pruebas>";
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
        this.salida3D = "Salida del codigo de tres direcciones";
        this.salida3DOpt = "Salida del codigo de tres direcciones optimizado";
        this.editor3DSalidaOptions = {
          theme: 'gruvbox-dark',
          mode: "text/x-csrc",
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
        this.erroresXML = [];
        this.erroresXPATH = [];
        this.queryMod = "";
        this.bnfXpath = [];
        this.astXpath = "";
        this.cstXpath = "";
        this.astXquery = "";
        this.cstXquery = "";
        this.tablaXquery = [];
        this.bnfXquery = [];
        this.opt3d = []; //reportesVisualizacion

        this.grafo = false;
        this.bnf = false;
        this.tabla = false;
        this.tabla2 = false;
        this.error = false;
        this.opt = false;
      }

      _createClass(HomeComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          localStorage.clear();
        }
      }, {
        key: "abrirXML",
        value: function abrirXML(files) {
          var _this31 = this;

          this.xmlEntrada = files.item(0);
          var fileReader = new FileReader();

          fileReader.onload = function (e) {
            _this31.xmlEntrada = fileReader.result;
            console.log(fileReader.result);
          };

          fileReader.readAsText(this.xmlEntrada);
        }
      }, {
        key: "ejecutarXquery",
        value: function ejecutarXquery() {
          localStorage.clear();
          localStorage.setItem("xml", this.xmlEntrada);
          var ascXquery = new _analizadorXQUERY_index__WEBPACK_IMPORTED_MODULE_6__["AnalizadorXquery"]();
          var ret = ascXquery.ejecutarCodigo(this.querys);
          this.astXquery = ret.ast;
          this.cstXquery = ret.cst;
          this.tablaXquery = ret.tabla;
          this.bnfXquery = ret.bnf;
          this.salida3D = "";

          for (var i = 0; i < ret.salida3d.length; i++) {
            this.salida3D += ret.salida3d[i];
            this.salida3D += "\n\n\n";
          }

          this.xmlSalida = "";

          for (var _i12 = 0; _i12 < ret.consola.length; _i12++) {
            this.xmlSalida += ret.consola[_i12] + "\n";
          }
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
          this.simbolos = ret.objetos;
          this.tablaXML = ret.tablaRep;
          this.cstXML = ret.cstRep;
          this.bnfXML = ret.bnfRep;
          this.encodingXML = ret.encoding;
          this.erroresXML = ret.errores;
          this.queryMod = ret1.ejecutado;
          this.bnfXpath = ret1.bnfRep;
          this.astXpath = ret1.astRep;
          this.cstXpath = ret1.cstRep;
          this.erroresXPATH = ret1.errores;
          this.obtenerConsulta(this.queryMod, this.simbolos);
          alert("Analisis concluido");
        }
      }, {
        key: "obtenerConsulta",
        value: function obtenerConsulta(query, tabla) {
          var buscador = new _analizadorXML_Instrucciones_Busqueda_xpathBusqueda__WEBPACK_IMPORTED_MODULE_9__["xpathBusqueda"]();
          var texto = "";

          if (query.includes("|")) {
            var multiple = buscador.getNodesByFilters("3", query, tabla);
            this.xmlSalida = "";

            for (var i = 0; i < multiple.length; i++) {
              texto += multiple[i];
              texto += "\n";
            }
          } else if (query[0] !== "/" && query[0] !== "//") {
            texto = buscador.getNodesByFilters("1", query, tabla);
          } else {
            texto = buscador.getNodesByFilters("2", query, tabla);
          }

          var dir = new _analizadorXML_Codigo3D_xml3D__WEBPACK_IMPORTED_MODULE_10__["xml3D"]();
          this.salida3D = this.salida3DOpt = "";
          this.salida3D = dir.getNodesByFilters(tabla, 0, buscador.returnListValues()); //var buf = Buffer.from(texto);

          this.xmlSalida = texto; //buf.toString(this.encoding()); 
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
          this.simbolos = ret.objetos;
          this.tablaXML = ret.tablaRep;
          this.cstXML = ret.cstRep;
          this.bnfXML = ret.bnfRep;
          this.erroresXML = ret.errores;
          this.queryMod = ret1.ejecutado;
          this.bnfXpath = ret1.bnfRep;
          this.astXpath = ret1.astRep;
          this.cstXpath = ret1.cstRep;
          this.erroresXPATH = ret1.errores;
          this.encodingXML = ret.encoding;
          this.obtenerConsulta(this.queryMod, this.simbolos);
          alert("Analisis concluido");
        }
      }, {
        key: "optimizar3D",
        value: function optimizar3D() {
          var opti = new _analizadorXML_Optimizacion_Optimizar__WEBPACK_IMPORTED_MODULE_11__["Optimizar"]();
          this.salida3DOpt = opti.optimizarCodigo(this.salida3D);
          this.opt3d = opti.returnConsola();
        }
      }, {
        key: "botarReportes",
        value: function botarReportes() {
          this.grafo = this.bnf = this.tabla = this.error = this.tabla2 = this.opt = false;
        }
      }, {
        key: "reporteOpt",
        value: function reporteOpt() {
          this.botarReportes();
          localStorage.clear();
          console.log(this.opt3d);
          localStorage.setItem('opt', JSON.stringify(this.opt3d));
          this.opt = true;
        }
      }, {
        key: "reporteASTXQUERY",
        value: function reporteASTXQUERY() {
          this.botarReportes();
          localStorage.clear();
          console.log(this.astXquery);
          localStorage.setItem('grafo', this.astXquery);
          this.grafo = true;
        }
      }, {
        key: "reporteCSTXQUERY",
        value: function reporteCSTXQUERY() {
          this.botarReportes();
          localStorage.clear();
          localStorage.setItem('grafo', this.cstXquery);
          this.grafo = true;
        }
      }, {
        key: "reporteTablaXQUERY",
        value: function reporteTablaXQUERY() {
          this.botarReportes();
          localStorage.clear();
          console.log(this.tablaXquery);
          localStorage.setItem('tablaXquery', JSON.stringify(this.tablaXquery));
          this.tabla2 = true;
        }
      }, {
        key: "reporteBNFXQUERY",
        value: function reporteBNFXQUERY() {
          this.botarReportes();
          localStorage.clear();
          console.log(this.bnfXquery);
          localStorage.setItem('bnf', JSON.stringify(this.bnfXquery));
          this.bnf = true;
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
      }, {
        key: "reporteErroresXML",
        value: function reporteErroresXML() {
          this.botarReportes();
          localStorage.clear();
          localStorage.setItem('errores', JSON.stringify(this.erroresXML));
          this.error = true;
        }
      }, {
        key: "reporteErroresXPATH",
        value: function reporteErroresXPATH() {
          this.botarReportes();
          localStorage.clear();
          localStorage.setItem('errores', JSON.stringify(this.erroresXPATH));
          this.error = true;
        }
      }, {
        key: "encoding",
        value: function encoding() {
          this.encodingXML = this.encodingXML.toLowerCase();

          if (this.encodingXML.includes("utf8")) {
            return "utf8";
          } else if (this.encodingXML.includes("ascii")) {
            return "ascii";
          } else if (this.encodingXML.includes("utf16")) {
            return "utf16";
          } else if (this.encodingXML.includes("ucs")) {
            return "ucs2";
          } else if (this.encodingXML.includes("base")) {
            return "base64";
          } else if (this.encodingXML.includes("binary")) {
            return "binary";
          } else if (this.encodingXML.includes("hex")) {
            return "hex";
          }

          return "utf8";
        }
      }]);

      return HomeComponent;
    }();

    HomeComponent.ctorParameters = function () {
      return [{
        type: _reporte_service__WEBPACK_IMPORTED_MODULE_7__["ReporteService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"]
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
  "./src/app/paginas/tabla-errores/tabla-errores.component.css":
  /*!*******************************************************************!*\
    !*** ./src/app/paginas/tabla-errores/tabla-errores.component.css ***!
    \*******************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPaginasTablaErroresTablaErroresComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "table {\n    width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnaW5hcy90YWJsYS1lcnJvcmVzL3RhYmxhLWVycm9yZXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7QUFDZiIsImZpbGUiOiJzcmMvYXBwL3BhZ2luYXMvdGFibGEtZXJyb3Jlcy90YWJsYS1lcnJvcmVzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XG4gICAgd2lkdGg6IDEwMCU7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/paginas/tabla-errores/tabla-errores.component.ts":
  /*!******************************************************************!*\
    !*** ./src/app/paginas/tabla-errores/tabla-errores.component.ts ***!
    \******************************************************************/

  /*! exports provided: TablaErroresComponent */

  /***/
  function srcAppPaginasTablaErroresTablaErroresComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TablaErroresComponent", function () {
      return TablaErroresComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var TablaErroresComponent = /*#__PURE__*/function () {
      function TablaErroresComponent() {
        _classCallCheck(this, TablaErroresComponent);

        this.displayedColumns = ['no', 'tipo', 'valor', 'fila', 'columna'];
        this.simbolos = localStorage.getItem('errores');
      }

      _createClass(TablaErroresComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.simbolos = JSON.parse(this.simbolos);
          console.log(this.simbolos, "vacia?");
        }
      }]);

      return TablaErroresComponent;
    }();

    TablaErroresComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-tabla-errores',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./tabla-errores.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/tabla-errores/tabla-errores.component.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./tabla-errores.component.css */
      "./src/app/paginas/tabla-errores/tabla-errores.component.css"))["default"]]
    })], TablaErroresComponent);
    /***/
  },

  /***/
  "./src/app/paginas/tabla-opt/tabla-opt.component.css":
  /*!***********************************************************!*\
    !*** ./src/app/paginas/tabla-opt/tabla-opt.component.css ***!
    \***********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPaginasTablaOptTablaOptComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "table {\n    width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnaW5hcy90YWJsYS1vcHQvdGFibGEtb3B0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0FBQ2YiLCJmaWxlIjoic3JjL2FwcC9wYWdpbmFzL3RhYmxhLW9wdC90YWJsYS1vcHQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcbiAgICB3aWR0aDogMTAwJTtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/paginas/tabla-opt/tabla-opt.component.ts":
  /*!**********************************************************!*\
    !*** ./src/app/paginas/tabla-opt/tabla-opt.component.ts ***!
    \**********************************************************/

  /*! exports provided: TablaOptComponent */

  /***/
  function srcAppPaginasTablaOptTablaOptComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TablaOptComponent", function () {
      return TablaOptComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var TablaOptComponent = /*#__PURE__*/function () {
      function TablaOptComponent() {
        _classCallCheck(this, TablaOptComponent);

        this.displayedColumns = ['no'];
        this.simbolos = localStorage.getItem('opt');
      }

      _createClass(TablaOptComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.simbolos = JSON.parse(this.simbolos);
        }
      }]);

      return TablaOptComponent;
    }();

    TablaOptComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-tabla-opt',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./tabla-opt.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/tabla-opt/tabla-opt.component.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./tabla-opt.component.css */
      "./src/app/paginas/tabla-opt/tabla-opt.component.css"))["default"]]
    })], TablaOptComponent);
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
  "./src/app/paginas/tabla-xquery/tabla-xquery.component.css":
  /*!*****************************************************************!*\
    !*** ./src/app/paginas/tabla-xquery/tabla-xquery.component.css ***!
    \*****************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPaginasTablaXqueryTablaXqueryComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "table {\n    width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnaW5hcy90YWJsYS14cXVlcnkvdGFibGEteHF1ZXJ5LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0FBQ2YiLCJmaWxlIjoic3JjL2FwcC9wYWdpbmFzL3RhYmxhLXhxdWVyeS90YWJsYS14cXVlcnkuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcbiAgICB3aWR0aDogMTAwJTtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/paginas/tabla-xquery/tabla-xquery.component.ts":
  /*!****************************************************************!*\
    !*** ./src/app/paginas/tabla-xquery/tabla-xquery.component.ts ***!
    \****************************************************************/

  /*! exports provided: TablaXqueryComponent */

  /***/
  function srcAppPaginasTablaXqueryTablaXqueryComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TablaXqueryComponent", function () {
      return TablaXqueryComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var TablaXqueryComponent = /*#__PURE__*/function () {
      function TablaXqueryComponent() {
        _classCallCheck(this, TablaXqueryComponent);

        this.displayedColumns = ['nombre', 'tipo', 'valor', 'fila', 'columna'];
        this.simbolos = localStorage.getItem('tablaXquery');
      }

      _createClass(TablaXqueryComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.simbolos = JSON.parse(this.simbolos);

          for (var i = 0; i < this.simbolos.length; i++) {
            if (this.simbolos[i].tipo.tipo == 0) {
              this.simbolos[i].tipo.tipo = "Entero";
            } else if (this.simbolos[i].tipo.tipo == 1) {
              this.simbolos[i].tipo.tipo = "Decimal";
            } else if (this.simbolos[i].tipo.tipo == 2) {
              this.simbolos[i].tipo.tipo = "Numero";
            } else if (this.simbolos[i].tipo.tipo == 3) {
              this.simbolos[i].tipo.tipo = "Caracter";
            } else if (this.simbolos[i].tipo.tipo == 4) {
              this.simbolos[i].tipo.tipo = "String";
            } else if (this.simbolos[i].tipo.tipo == 5) {
              this.simbolos[i].tipo.tipo = "Booleano";
            } else if (this.simbolos[i].tipo.tipo == 8) {
              this.simbolos[i].tipo.tipo = "Void";
            } else if (this.simbolos[i].tipo.tipo == 9) {
              this.simbolos[i].tipo.tipo = "Metodo";
            } else if (this.simbolos[i].tipo.tipo == 10) {
              this.simbolos[i].tipo.tipo = "Funcion";
            } else if (this.simbolos[i].tipo.tipo == 11) {
              this.simbolos[i].tipo.tipo = "Variable";
            }

            if (this.simbolos[i].tipo2.tipo == 0) {
              this.simbolos[i].tipo2.tipo = "Entero";
            } else if (this.simbolos[i].tipo2.tipo == 1) {
              this.simbolos[i].tipo2.tipo = "Decimal";
            } else if (this.simbolos[i].tipo2.tipo == 2) {
              this.simbolos[i].tipo2.tipo = "Numero";
            } else if (this.simbolos[i].tipo2.tipo == 3) {
              this.simbolos[i].tipo2.tipo = "Caracter";
            } else if (this.simbolos[i].tipo2.tipo == 4) {
              this.simbolos[i].tipo2.tipo = "String";
            } else if (this.simbolos[i].tipo2.tipo == 5) {
              this.simbolos[i].tipo2.tipo = "Booleano";
            } else if (this.simbolos[i].tipo2.tipo == 8) {
              this.simbolos[i].tipo2.tipo = "Void";
            } else if (this.simbolos[i].tipo2.tipo == 9) {
              this.simbolos[i].tipo2.tipo = "Metodo";
            } else if (this.simbolos[i].tipo2.tipo == 10) {
              this.simbolos[i].tipo2.tipo = "Funcion";
            } else if (this.simbolos[i].tipo2.tipo == 11) {
              this.simbolos[i].tipo2.tipo = "Variable";
            }
          }
        }
      }]);

      return TablaXqueryComponent;
    }();

    TablaXqueryComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-tabla-xquery',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./tabla-xquery.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/paginas/tabla-xquery/tabla-xquery.component.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./tabla-xquery.component.css */
      "./src/app/paginas/tabla-xquery/tabla-xquery.component.css"))["default"]]
    })], TablaXqueryComponent);
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
    /* harmony import */


    var codemirror_mode_clike_clike__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! codemirror/mode/clike/clike */
    "./node_modules/codemirror/mode/clike/clike.js");
    /* harmony import */


    var codemirror_mode_clike_clike__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_clike_clike__WEBPACK_IMPORTED_MODULE_14__);

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
  },

  /***/
  5:
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
  6:
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
//# sourceMappingURL=main-es5.31793128a21cc8f662bd.js.map