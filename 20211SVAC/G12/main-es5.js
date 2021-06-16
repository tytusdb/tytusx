(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! C:\Users\fuent\Desktop\compiladores 2 componer\CompiP2\src\main.ts */
      "zUnb");
      /***/
    },

    /***/
    "AytR":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
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

      /***/
    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! angular-bootstrap-md */
      "dbUT");
      /* harmony import */


      var _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ctrl/ngx-codemirror */
      "Xl2X");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");

      function AppComponent_div_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Crear archivos");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Abrir archivos");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Guardar el archivo");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "div", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Eliminar pesta\xF1a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function AppComponent_div_13_Template(rf, ctx) {
        if (rf & 1) {
          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Errores l\xE9xico");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Errores sint\xE1ctico");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_div_13_Template_a_click_5_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3);

            var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r2.openPage("TablaSim", 2);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Errores el sem\xE1ntico");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      var _c0 = function _c0() {
        return {
          lineNumbers: true,
          theme: "material",
          mode: "markdown"
        };
      };

      var AppComponent = /*#__PURE__*/function () {
        function AppComponent() {
          _classCallCheck(this, AppComponent);

          this.entradaxpath = "";
          this.consola = "";
          this.entradaxml = "";
          this.htmlts = "";
          this.htmlerrores = "";
          this.reporteGramatical = "";
          this.xpathRG = "";
        }

        _createClass(AppComponent, [{
          key: "recorrer",
          value: function recorrer() {}
        }, {
          key: "ejecutar",
          value: function ejecutar() {}
        }, {
          key: "openPage",
          value: function openPage(pageName, valor) {}
        }, {
          key: "imprimirTabla",
          value: function imprimirTabla() {}
        }]);

        return AppComponent;
      }();

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)();
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        decls: 84,
        vars: 15,
        consts: [[1, "nav", "grey", "lighten-4", "py-4"], [1, "nav-item"], ["href", "#!", 1, "nav-link", "disabled"], ["dropdown", "", 1, "nav-item", "dropdown"], ["dropdownToggle", "", "mdbWavesEffect", "", "type", "button", "mdbWavesEffect", "", 1, "nav-link", "dropdown-toggle", "waves-light"], [1, "caret"], ["class", "dropdown-menu dropdown dropdown-primary", "role", "menu", 4, "dropdownMenu"], ["mdbBtn", "", "type", "button", "color", "success", "rounded", "true", "outline", "true", "mdbWavesEffect", "", 3, "click"], ["mdbBtn", "", "type", "button", "color", "info", "rounded", "true", "outline", "true", "mdbWavesEffect", "", 3, "click"], ["mdbBtn", "", "type", "button", "color", "default", "rounded", "true", "outline", "true", "mdbWavesEffect", "", 3, "click"], [1, "container-fluid"], [1, "col"], [3, "ngModel", "options", "ngModelChange"], [1, "row"], [1, "col-sm-6", "mb-3", "mb-md-0"], [1, "col-sm-6"], ["id", "TablaSim", 1, "tabcontent", 2, "background-color", "#1b1d1c"], ["mdbTable", "", "id", "tablasimbols", "bordered", "true", 2, "width", "100%"], ["id", "ast", 1, "tabcontent", 2, "background-color", "#1b1d1c"], ["id", "graph", 1, "overflow-auto", 2, "text-align", "center"], ["id", "app"], ["role", "menu", 1, "dropdown-menu", "dropdown", "dropdown-primary"], ["mdbWavesEffect", "", "href", "#", 1, "dropdown-item", "waves-light"], [1, "divider", "dropdown-divider"], ["mdbWavesEffect", "", "href", "#", 1, "dropdown-item", "waves-light", 3, "click"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "li", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Organizaci\xF3n de Lenguajes y Compiladores 2");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "li", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " Funcionalidades");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "span", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, AppComponent_div_8_Template, 10, 0, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "li", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Reporte de Errores");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "span", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, AppComponent_div_13_Template, 7, 0, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "li", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_15_listener() {
              return ctx.ejecutar();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Ejecutar");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_18_listener() {
              return ctx.recorrer();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Generar \xC1rbol AST");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "li", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_21_listener() {
              return ctx.imprimirTabla();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Reporte Gramatical");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "li", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "button", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_24_listener() {
              return ctx.openPage("TablaSim", 1);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Tabla de S\xEDmbolos");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "mdb-card");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "mdb-card-body");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "mdb-card-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "h5");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "XPAHT");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "ngx-codemirror", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngx_codemirror_ngModelChange_34_listener($event) {
              return ctx.entradaxpath = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "mdb-card");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "mdb-card-body");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "mdb-card-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "h5");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "XML");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "ngx-codemirror", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngx_codemirror_ngModelChange_45_listener($event) {
              return ctx.entradaxml = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "mdb-card");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "mdb-card-body");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "mdb-card-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "h5");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "Consola");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "ngx-codemirror", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngx_codemirror_ngModelChange_53_listener($event) {
              return ctx.consola = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](54, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "table", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](59, "div", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "mdb-card");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "mdb-card-body");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "mdb-card-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "h5");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "Arbol");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](66, "div", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "mdb-card");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "mdb-card-body");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "mdb-card-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "h5");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "REPORTE GRAMATICAL");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "div", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "div", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "mdb-card-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "h5");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "XML");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "ngx-codemirror", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngx_codemirror_ngModelChange_78_listener($event) {
              return ctx.reporteGramatical = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "mdb-card-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "h5");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "XPATH");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "ngx-codemirror", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngx_codemirror_ngModelChange_83_listener($event) {
              return ctx.xpathRG = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](34);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.entradaxpath)("options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](10, _c0));

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.entradaxml)("options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](11, _c0));

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.consola)("options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](12, _c0));

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](25);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.reporteGramatical)("options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](13, _c0));

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.xpathRG)("options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](14, _c0));
          }
        },
        directives: [angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_1__["BsDropdownDirective"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_1__["BsDropdownToggleDirective"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_1__["WavesDirective"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_1__["BsDropdownMenuDirective"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_1__["MdbBtnDirective"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_1__["MdbCardComponent"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_1__["MdbCardBodyComponent"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_1__["MdbCardTitleComponent"], _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_2__["CodemirrorComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_1__["MdbTableDirective"]],
        styles: [".column[_ngcontent-%COMP%] {\n  float: left;\n  width: 33.33%;\n  padding: 15px;\n}\n\n.row[_ngcontent-%COMP%]:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n.ui-tabs[_ngcontent-%COMP%] {\n  position: relative;\n  \n  padding: 0.2em;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.2em 0.2em 0;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  list-style: none;\n  float: left;\n  position: relative;\n  top: 0;\n  margin: 1px 0.2em 0 0;\n  border-bottom-width: 0;\n  padding: 0;\n  white-space: nowrap;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  float: left;\n  padding: 0.5em 1em;\n  text-decoration: none;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li.ui-tabs-active[_ngcontent-%COMP%] {\n  margin-bottom: -1px;\n  padding-bottom: 1px;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li.ui-tabs-active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li.ui-state-disabled[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li.ui-tabs-loading[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  cursor: text;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .ui-tabs-collapsible[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li.ui-tabs-active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-panel[_ngcontent-%COMP%] {\n  display: block;\n  border-width: 0;\n  padding: 1em 1.4em;\n  background: none;\n}\n\nbody[_ngcontent-%COMP%], html[_ngcontent-%COMP%] {\n  height: 100%;\n  margin: 0;\n  font-family: Arial;\n}\n\n.tablink[_ngcontent-%COMP%] {\n  background-color: #555;\n  color: white;\n  float: left;\n  border: none;\n  outline: none;\n  cursor: pointer;\n  padding: 14px 16px;\n  font-size: 17px;\n  width: 25%;\n}\n.tablink[_ngcontent-%COMP%]:hover {\n  background-color: #777;\n}\n\n.tabcontent[_ngcontent-%COMP%] {\n  color: white;\n  display: none;\n  padding: 100px 20px;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGtEQUFBO0FBQ0E7RUFDQyxXQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7QUFDRDtBQUVFLG1DQUFBO0FBQ0E7RUFDRCxXQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7QUFDRDtBQUVFO0VBQ0Qsa0JBQUE7RUFBbUIsdUlBQUE7RUFDbkIsY0FBQTtBQUVEO0FBQUE7RUFDQyxTQUFBO0VBQ0Esc0JBQUE7QUFHRDtBQURBO0VBQ0MsZ0JBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtFQUNBLFVBQUE7RUFDQSxtQkFBQTtBQUlEO0FBRkE7RUFDQyxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtBQUtEO0FBSEE7RUFDQyxtQkFBQTtFQUNBLG1CQUFBO0FBTUQ7QUFKQTs7O0VBR0MsWUFBQTtBQU9EO0FBTEE7O0VBRUMsZUFBQTtBQVFEO0FBTkE7RUFDQyxjQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFTRDtBQU5BLDJFQUFBO0FBQ0E7RUFDQyxZQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBU0Q7QUFORSxvQkFBQTtBQUNBO0VBQ0Qsc0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLFVBQUE7QUFTRDtBQU5FO0VBQ0Qsc0JBQUE7QUFTRDtBQU5FLHNFQUFBO0FBQ0E7RUFDRCxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQVNEIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENyZWF0ZSBjb2x1bW5zIHRoYXQgZmxvYXRzIG5leHQgdG8gZWFjaCBvdGhlciAqL1xuLmNvbHVtbiB7XG5cdGZsb2F0OiBsZWZ0O1xuXHR3aWR0aDogMzMuMzMlO1xuXHRwYWRkaW5nOiAxNXB4O1xuICB9XG4gIFxuICAvKiBDbGVhciBmbG9hdHMgYWZ0ZXIgdGhlIGNvbHVtbnMgKi9cbiAgLnJvdzphZnRlciB7XG5cdGNvbnRlbnQ6IFwiXCI7XG5cdGRpc3BsYXk6IHRhYmxlO1xuXHRjbGVhcjogYm90aDtcbiAgfVxuXG4gIC51aS10YWJzIHtcblx0cG9zaXRpb246IHJlbGF0aXZlOy8qIHBvc2l0aW9uOiByZWxhdGl2ZSBwcmV2ZW50cyBJRSBzY3JvbGwgYnVnIChlbGVtZW50IHdpdGggcG9zaXRpb246IHJlbGF0aXZlIGluc2lkZSBjb250YWluZXIgd2l0aCBvdmVyZmxvdzogYXV0byBhcHBlYXIgYXMgXCJmaXhlZFwiKSAqL1xuXHRwYWRkaW5nOiAuMmVtO1xufVxuLnVpLXRhYnMgLnVpLXRhYnMtbmF2IHtcblx0bWFyZ2luOiAwO1xuXHRwYWRkaW5nOiAuMmVtIC4yZW0gMDtcbn1cbi51aS10YWJzIC51aS10YWJzLW5hdiBsaSB7XG5cdGxpc3Qtc3R5bGU6IG5vbmU7XG5cdGZsb2F0OiBsZWZ0O1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdHRvcDogMDtcblx0bWFyZ2luOiAxcHggLjJlbSAwIDA7XG5cdGJvcmRlci1ib3R0b20td2lkdGg6IDA7XG5cdHBhZGRpbmc6IDA7XG5cdHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG4udWktdGFicyAudWktdGFicy1uYXYgbGkgYSB7XG5cdGZsb2F0OiBsZWZ0O1xuXHRwYWRkaW5nOiAuNWVtIDFlbTtcblx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuLnVpLXRhYnMgLnVpLXRhYnMtbmF2IGxpLnVpLXRhYnMtYWN0aXZlIHtcblx0bWFyZ2luLWJvdHRvbTogLTFweDtcblx0cGFkZGluZy1ib3R0b206IDFweDtcbn1cbi51aS10YWJzIC51aS10YWJzLW5hdiBsaS51aS10YWJzLWFjdGl2ZSBhLFxuLnVpLXRhYnMgLnVpLXRhYnMtbmF2IGxpLnVpLXN0YXRlLWRpc2FibGVkIGEsXG4udWktdGFicyAudWktdGFicy1uYXYgbGkudWktdGFicy1sb2FkaW5nIGEge1xuXHRjdXJzb3I6IHRleHQ7XG59XG4udWktdGFicyAudWktdGFicy1uYXYgbGkgYSwgLyogZmlyc3Qgc2VsZWN0b3IgaW4gZ3JvdXAgc2VlbXMgb2Jzb2xldGUsIGJ1dCByZXF1aXJlZCB0byBvdmVyY29tZSBidWcgaW4gT3BlcmEgYXBwbHlpbmcgY3Vyc29yOiB0ZXh0IG92ZXJhbGwgaWYgZGVmaW5lZCBlbHNld2hlcmUuLi4gKi9cbi51aS10YWJzLWNvbGxhcHNpYmxlIC51aS10YWJzLW5hdiBsaS51aS10YWJzLWFjdGl2ZSBhIHtcblx0Y3Vyc29yOiBwb2ludGVyO1xufVxuLnVpLXRhYnMgLnVpLXRhYnMtcGFuZWwge1xuXHRkaXNwbGF5OiBibG9jaztcblx0Ym9yZGVyLXdpZHRoOiAwO1xuXHRwYWRkaW5nOiAxZW0gMS40ZW07XG5cdGJhY2tncm91bmQ6IG5vbmU7XG59XG5cbi8qIFNldCBoZWlnaHQgb2YgYm9keSBhbmQgdGhlIGRvY3VtZW50IHRvIDEwMCUgdG8gZW5hYmxlIFwiZnVsbCBwYWdlIHRhYnNcIiAqL1xuYm9keSwgaHRtbCB7XG5cdGhlaWdodDogMTAwJTtcblx0bWFyZ2luOiAwO1xuXHRmb250LWZhbWlseTogQXJpYWw7XG4gIH1cbiAgXG4gIC8qIFN0eWxlIHRhYiBsaW5rcyAqL1xuICAudGFibGluayB7XG5cdGJhY2tncm91bmQtY29sb3I6ICM1NTU7XG5cdGNvbG9yOiB3aGl0ZTtcblx0ZmxvYXQ6IGxlZnQ7XG5cdGJvcmRlcjogbm9uZTtcblx0b3V0bGluZTogbm9uZTtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHRwYWRkaW5nOiAxNHB4IDE2cHg7XG5cdGZvbnQtc2l6ZTogMTdweDtcblx0d2lkdGg6IDI1JTtcbiAgfVxuICBcbiAgLnRhYmxpbms6aG92ZXIge1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjNzc3O1xuICB9XG4gIFxuICAvKiBTdHlsZSB0aGUgdGFiIGNvbnRlbnQgKGFuZCBhZGQgaGVpZ2h0OjEwMCUgZm9yIGZ1bGwgcGFnZSBjb250ZW50KSAqL1xuICAudGFiY29udGVudCB7XG5cdGNvbG9yOiB3aGl0ZTtcblx0ZGlzcGxheTogbm9uZTtcblx0cGFkZGluZzogMTAwcHggMjBweDtcblx0aGVpZ2h0OiAxMDAlO1xuICB9XG4gIFxuICJdfQ== */"]
      });
      /***/
    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      "R1ws");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! angular-bootstrap-md */
      "dbUT");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ctrl/ngx-codemirror */
      "Xl2X");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.ɵfac = function AppModule_Factory(t) {
        return new (t || AppModule)();
      };

      AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
        type: AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
      });
      AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
        providers: [],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MDBBootstrapModule"].forRoot(), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_5__["CodemirrorModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MDBRootModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_5__["CodemirrorModule"]]
        });
      })();
      /***/

    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");
      /* harmony import */


      var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! codemirror/mode/javascript/javascript */
      "+dQi");
      /* harmony import */


      var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4__);
      /* harmony import */


      var codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! codemirror/mode/markdown/markdown */
      "lZu9");
      /* harmony import */


      var codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_5__);

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
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
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map