(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\jacks\OneDrive\Desktop\VACAS JUNIO 2021\tytusx\20211SVAC\G24\Frontend\src\main.ts */"zUnb");


/***/ }),

/***/ "0PyG":
/*!**********************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Simbolos/Arbol.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Arbol; });
/* harmony import */ var _tablaSimbolos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tablaSimbolos */ "TD3t");
/* harmony import */ var _Reportes_reporteTabla__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Reportes/reporteTabla */ "Mc8n");
/* harmony import */ var _Expresiones_Objeto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Expresiones/Objeto */ "xzWR");



class Arbol {
    constructor(instrucciones) {
        this.consola = '';
        this.instrucciones = instrucciones;
        this.consola = '';
        this.tablaGlobal = new _tablaSimbolos__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.errores = new Array();
        this.listaSimbolos = new Array();
        this.dot = "";
        this.c = 0;
    }
    getEncoding() {
        return this.encoding;
    }
    setEncoding(encoding) {
        this.encoding = encoding;
    }
    getSimbolos() {
        return this.listaSimbolos;
    }
    actualizarTabla(identificador, valor, linea, entorno, columna) {
        for (var elemento of this.listaSimbolos) {
            if (elemento.getIdentificador().toString() == identificador.toLowerCase() &&
                elemento.getEntorno().toString() == entorno.toString()) {
                elemento.setValor(valor);
                elemento.setLinea(linea);
                elemento.setColumna(columna);
                return true;
            }
        }
        return false;
    }
    BuscarTipo(identificador) {
        for (var elemento of this.listaSimbolos) {
            if (elemento.getIdentificador() == identificador.toLowerCase()) {
                return elemento.getForma().toString();
            }
        }
        return 'as';
    }
    getFuncion(identificador) {
        for (let f of this.instrucciones) {
            if (f instanceof _Expresiones_Objeto__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                if (identificador.toLowerCase() ==
                    f.identificador.toLowerCase()) {
                    if (!this.actualizarTabla(f.identificador.toString(), '', f.fila.toString(), '', f.columna.toString())) {
                        let nuevoSimbolo = new _Reportes_reporteTabla__WEBPACK_IMPORTED_MODULE_1__["reporteTabla"](f.identificador, '', 'MetodoCreacion', 'void', '', f.fila.toString(), f.columna.toString());
                        this.listaSimbolos.push(nuevoSimbolo);
                    }
                    return f;
                }
            }
        }
    }
    geterrores() {
        return this.errores;
    }
    seterrores(value) {
        this.errores = value;
    }
    getinstrucciones() {
        return this.instrucciones;
    }
    setinstrucciones(value) {
        this.instrucciones = value;
    }
    getconsola() {
        return this.consola;
    }
    setconsola(value) {
        this.consola = value;
    }
    actualizaConsola(uptodate) {
        this.consola = `${this.consola}${uptodate}\n`;
    }
    gettablaGlobal() {
        return this.tablaGlobal;
    }
    settablaGlobal(value) {
        this.tablaGlobal = value;
    }
    getDot(raiz) {
        this.dot = "";
        this.dot += "digraph {\n";
        this.dot += "n0[label=\"" + raiz.getValor().replace("\"", "\\\"") + "\"];\n";
        this.c = 1;
        this.recorrerAST("n0", raiz);
        this.dot += "}";
        return this.dot;
    }
    recorrerAST(padre, nPadre) {
        for (let hijo of nPadre.getHijos()) {
            var nombreHijo = "n" + this.c;
            this.dot += nombreHijo + "[label=\"" + hijo.getValor().replace("\"", "\\\"") + "\"];\n";
            this.dot += padre + "->" + nombreHijo + ";\n";
            this.c++;
            this.recorrerAST(nombreHijo, hijo);
        }
    }
}


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

/***/ "2/nI":
/*!*********************************************!*\
  !*** ./src/app/servicios/inicio.service.ts ***!
  \*********************************************/
/*! exports provided: InicioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InicioService", function() { return InicioService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");


class InicioService {
    constructor(http) {
        this.http = http;
        this.path = 'http://localhost:3000';
    }
    obtenerAlgo() {
        return this.http.get(this.path + '/obtenerAlgo', {});
    }
    compilarCodigo(codigo) {
        return this.http.post(this.path + '/interpretar', {
            entrada: codigo,
        });
    }
    graficarAst() {
        return this.http.get(`${this.path}/graficar`, {});
    }
}
InicioService.ɵfac = function InicioService_Factory(t) { return new (t || InicioService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
InicioService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: InicioService, factory: InicioService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "2sLK":
/*!*************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Abstracto/nodoAST.ts ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return nodoAST; });
class nodoAST {
    constructor(valor) {
        this.listaNodos = new Array();
        this.valor = valor;
    }
    agregarHijo(val, ambito, operador) {
        if (ambito != undefined) {
            switch (ambito) {
                case 'ar':
                    switch (operador) {
                        case 0:
                            val = '+';
                            break;
                        case 1:
                            val = '-';
                            break;
                        case 2:
                            val = '*';
                            break;
                        case 3:
                            val = '/';
                            break;
                        case 4:
                            val = '^';
                            break;
                        case 5:
                            val = '%';
                            break;
                    }
                    break;
                case 'log':
                    switch (operador) {
                        case 0:
                            val = '||';
                            break;
                        case 1:
                            val = '&&';
                            break;
                        case 2:
                            val = '!';
                            break;
                    }
                    break;
                case 'rel':
                    switch (operador) {
                        case 0:
                            val = '==';
                            break;
                        case 1:
                            val = '!=';
                            break;
                        case 2:
                            val = '>';
                            break;
                        case 3:
                            val = '<';
                            break;
                        case 4:
                            val = '>=';
                            break;
                        case 5:
                            val = '<=';
                            break;
                    }
                    break;
            }
            this.listaNodos.push(new nodoAST(val));
        }
        else
            this.listaNodos.push(new nodoAST(val));
    }
    agregarHijoAST(hijo) {
        if (hijo != undefined)
            this.listaNodos.push(hijo);
    }
    getValor() {
        return this.valor;
    }
    getHijos() {
        return this.listaNodos;
    }
}


/***/ }),

/***/ "8hwP":
/*!************************************************************!*\
  !*** ./src/app/componentes/side-bar/side-bar.component.ts ***!
  \************************************************************/
/*! exports provided: SideBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideBarComponent", function() { return SideBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/layout */ "0MNC");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");








function SideBarComponent_a_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const nav_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", nav_r2.route);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](nav_r2.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", nav_r2.name, "");
} }
class SideBarComponent {
    constructor(changeDetectorRef, media) {
        this.fillerNav = [
            { name: 'Principal', route: 'inicio', icon: 'home' },
            { name: 'Arbol CST Ascendente', route: 'ast', icon: 'share' },
            { name: 'Arbol CST Descendente', route: 'ast-desc', icon: 'gesture' },
            {
                name: 'Tabla Simbolos',
                route: 'simbolos',
                icon: 'view_quilt',
            },
            { name: 'Reporte gramatical', route: 'gramatical', icon: 'list_alt' },
            /*device_hub*/
            { name: 'Arbol CST', route: 'cst', icon: 'device_hub' },
            { name: 'Reporte Errores', route: 'errores', icon: 'coronavirus' },
        ];
        this.shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) => h.test(window.location.host));
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
SideBarComponent.ɵfac = function SideBarComponent_Factory(t) { return new (t || SideBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["MediaMatcher"])); };
SideBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SideBarComponent, selectors: [["app-sidebar"]], decls: 12, vars: 7, consts: [[1, "example-container"], ["color", "", 1, "example-toolbar"], ["id", "btn", "mat-icon-button", "", 3, "click"], [1, "example-app-name"], [1, "example-sidenav-container"], ["fixedTopGap", "56", 1, "matsnv", 3, "mode", "fixedInViewport"], ["snav", ""], ["mat-list-item", "", 3, "routerLink", 4, "ngFor", "ngForOf"], ["mat-list-item", "", 3, "routerLink"], [1, "icono"]], template: function SideBarComponent_Template(rf, ctx) { if (rf & 1) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-toolbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SideBarComponent_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7); return _r0.toggle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "TYTUSX");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-sidenav-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-sidenav", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, SideBarComponent_a_9_Template, 4, 3, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-sidenav-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("example-is-mobile", ctx.mobileQuery.matches);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("margin-top", ctx.mobileQuery.matches ? 56 : 0, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", ctx.mobileQuery.matches ? "over" : "side")("fixedInViewport", ctx.mobileQuery.matches);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.fillerNav);
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__["MatToolbar"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__["MatSidenavContainer"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__["MatSidenav"], _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatNavList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_3__["MatSidenavContent"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterOutlet"], _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatListItem"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterLinkWithHref"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIcon"]], styles: [".example-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n}\r\n\r\n.example-is-mobile[_ngcontent-%COMP%]   .example-toolbar[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  \r\n  z-index: 2;\r\n}\r\n\r\n.example-toolbar[_ngcontent-%COMP%] {\r\n  background-color: #67676f;\r\n}\r\n\r\nh1.example-app-name[_ngcontent-%COMP%] {\r\n  margin-left: 30%;\r\n  color: #f9faf7;\r\n  font-size: 50px;\r\n}\r\n\r\n.matsnv[_ngcontent-%COMP%] {\r\n  background-color: #a97061;\r\n  color: #f9faf7;\r\n}\r\n\r\n#btn[_ngcontent-%COMP%] {\r\n  background-color: #67676f;\r\n  border: none;\r\n  text-decoration: none;\r\n  width: 100px;\r\n  height: 100%;\r\n  background-image: url('mnwhit.svg');\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n\r\n.example-sidenav-container[_ngcontent-%COMP%] {\r\n  \r\n  flex: 1;\r\n  background-color: #efc2a8;\r\n}\r\n\r\n.example-is-mobile[_ngcontent-%COMP%]   .example-sidenav-container[_ngcontent-%COMP%] {\r\n  \r\n  flex: 1 0 auto;\r\n}\r\n\r\n.icono[_ngcontent-%COMP%] {\r\n  margin-right: 10%;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZGUtYmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sU0FBUztFQUNULE9BQU87RUFDUCxRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsOEVBQThFO0VBQzlFLFVBQVU7QUFDWjs7QUFDQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsZUFBZTtBQUNqQjs7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixjQUFjO0FBQ2hCOztBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixxQkFBcUI7RUFDckIsWUFBWTtFQUNaLFlBQVk7RUFDWixtQ0FBbUQ7RUFDbkQsNEJBQTRCO0VBQzVCLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFOzhGQUM0RjtFQUM1RixPQUFPO0VBQ1AseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0U7bUVBQ2lFO0VBQ2pFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkIiLCJmaWxlIjoic2lkZS1iYXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgYm90dG9tOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbn1cclxuXHJcbi5leGFtcGxlLWlzLW1vYmlsZSAuZXhhbXBsZS10b29sYmFyIHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgLyogTWFrZSBzdXJlIHRoZSB0b29sYmFyIHdpbGwgc3RheSBvbiB0b3Agb2YgdGhlIGNvbnRlbnQgYXMgaXQgc2Nyb2xscyBwYXN0LiAqL1xyXG4gIHotaW5kZXg6IDI7XHJcbn1cclxuLmV4YW1wbGUtdG9vbGJhciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY3Njc2ZjtcclxufVxyXG5oMS5leGFtcGxlLWFwcC1uYW1lIHtcclxuICBtYXJnaW4tbGVmdDogMzAlO1xyXG4gIGNvbG9yOiAjZjlmYWY3O1xyXG4gIGZvbnQtc2l6ZTogNTBweDtcclxufVxyXG4ubWF0c252IHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTk3MDYxO1xyXG4gIGNvbG9yOiAjZjlmYWY3O1xyXG59XHJcbiNidG4ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM2NzY3NmY7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICB3aWR0aDogMTAwcHg7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uLy4uLy4uL2Fzc2V0cy9tbndoaXQuc3ZnXCIpO1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG59XHJcblxyXG4uZXhhbXBsZS1zaWRlbmF2LWNvbnRhaW5lciB7XHJcbiAgLyogV2hlbiB0aGUgc2lkZW5hdiBpcyBub3QgZml4ZWQsIHN0cmV0Y2ggdGhlIHNpZGVuYXYgY29udGFpbmVyIHRvIGZpbGwgdGhlIGF2YWlsYWJsZSBzcGFjZS4gVGhpc1xyXG4gICAgICAgICBjYXVzZXMgYDxtYXQtc2lkZW5hdi1jb250ZW50PmAgdG8gYWN0IGFzIG91ciBzY3JvbGxpbmcgZWxlbWVudCBmb3IgZGVza3RvcCBsYXlvdXRzLiAqL1xyXG4gIGZsZXg6IDE7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VmYzJhODtcclxufVxyXG5cclxuLmV4YW1wbGUtaXMtbW9iaWxlIC5leGFtcGxlLXNpZGVuYXYtY29udGFpbmVyIHtcclxuICAvKiBXaGVuIHRoZSBzaWRlbmF2IGlzIGZpeGVkLCBkb24ndCBjb25zdHJhaW4gdGhlIGhlaWdodCBvZiB0aGUgc2lkZW5hdiBjb250YWluZXIuIFRoaXMgYWxsb3dzIHRoZVxyXG4gICAgICAgICBgPGJvZHk+YCB0byBiZSBvdXIgc2Nyb2xsaW5nIGVsZW1lbnQgZm9yIG1vYmlsZSBsYXlvdXRzLiAqL1xyXG4gIGZsZXg6IDEgMCBhdXRvO1xyXG59XHJcblxyXG4uaWNvbm8ge1xyXG4gIG1hcmdpbi1yaWdodDogMTAlO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "9iyb":
/*!*****************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Abstracto/Instruccion.ts ***!
  \*****************************************************************/
/*! exports provided: Instruccion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instruccion", function() { return Instruccion; });
class Instruccion {
    constructor(tipo, fila, columna) {
        this.tipoDato = tipo;
        this.fila = fila;
        this.columna = columna;
    }
}


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

/***/ "CbqC":
/*!****************************************************************************!*\
  !*** ./src/app/componentes/contenido-inicio/contenido-inicio.component.ts ***!
  \****************************************************************************/
/*! exports provided: listaErrores, ContenidoInicioComponent, Pruebas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listaErrores", function() { return listaErrores; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContenidoInicioComponent", function() { return ContenidoInicioComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pruebas", function() { return Pruebas; });
/* harmony import */ var src_app_Backend_XML_Analizador_Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Excepciones/NodoErrores */ "cikY");
/* harmony import */ var src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos */ "TD3t");
/* harmony import */ var src_app_Backend_XML_Analizador_GramaticaXML__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/GramaticaXML */ "EHLN");
/* harmony import */ var src_app_Backend_XML_Analizador_GramaticaXML__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(src_app_Backend_XML_Analizador_GramaticaXML__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_app_Backend_XML_Analizador_GramaticaXMLDescPRUEBA__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/GramaticaXMLDescPRUEBA */ "pcrZ");
/* harmony import */ var src_app_Backend_XML_Analizador_GramaticaXMLDescPRUEBA__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(src_app_Backend_XML_Analizador_GramaticaXMLDescPRUEBA__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_app_Backend_XML_Analizador_XMLgraph__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/XMLgraph */ "kaQ3");
/* harmony import */ var src_app_Backend_XML_Analizador_XMLgraph__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(src_app_Backend_XML_Analizador_XMLgraph__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_Backend_XML_Analizador_Simbolos_Arbol__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Simbolos/Arbol */ "0PyG");
/* harmony import */ var src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Abstracto/nodoAST */ "2sLK");
/* harmony import */ var src_app_Backend_XML_Analizador_Expresiones_Objeto__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Expresiones/Objeto */ "xzWR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_servicios_inicio_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/servicios/inicio.service */ "2/nI");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");












let listaErrores;
class ContenidoInicioComponent {
    constructor(inicioSrv, dialog) {
        this.inicioSrv = inicioSrv;
        this.dialog = dialog;
        this.code = '';
        this.contenido = '';
        this.textoEsperado = '';
        this.code = 'asd';
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.data = JSON.parse(localStorage.getItem('contenido'));
        if (this.data != '' || this.data != undefined) {
            this.mostrarContenido(this.data.text, 'contenido');
            this.mostrarContenido(this.data.console, 'consolas');
        }
    }
    colocarConsola(res, texto) {
        const dataObject = {
            text: 'asd',
            console: 'res',
        };
        localStorage.setItem('contenido', JSON.stringify(dataObject));
    }
    getConsola() {
        this.data = JSON.parse(localStorage.getItem('contenido'));
        if (this.data != '' || this.data != undefined) {
            this.mostrarContenido(this.data.text, 'contenido');
        }
    }
    /*A R B O L  A S C E N D E N T E */
    interpretarContenido(texto) {
        listaErrores = new Array();
        if (texto == null)
            return document.write('Error');
        try {
            const analizador = src_app_Backend_XML_Analizador_GramaticaXML__WEBPACK_IMPORTED_MODULE_2__;
            const objetos = analizador.parse(texto);
            const tablaGlobal = new src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["default"]();
            var Tree = new src_app_Backend_XML_Analizador_Simbolos_Arbol__WEBPACK_IMPORTED_MODULE_5__["default"]([objetos]);
            Tree.settablaGlobal(tablaGlobal);
            console.log(tablaGlobal);
            //  PARA GUARDAR DATOS
            // TODO FOR INTERPRETAR
            for (let i of Tree.getinstrucciones()) {
                if (i instanceof src_app_Backend_XML_Analizador_Expresiones_Objeto__WEBPACK_IMPORTED_MODULE_7__["default"]) {
                    var objetito = i.interpretar(Tree, tablaGlobal); //retorna simbolo
                    tablaGlobal.setVariable(objetito);
                }
            }
            console.log(tablaGlobal);
            // TERMINA FOR 
            var init = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_6__["default"]("RAIZ");
            var instrucciones = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_6__["default"]("HIJOS");
            for (let i of Tree.getinstrucciones()) {
                instrucciones.agregarHijoAST(i.getNodo());
            }
            for (let i of Tree.getinstrucciones()) {
                if (i instanceof src_app_Backend_XML_Analizador_Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                    listaErrores.push(i);
                }
            }
            init.agregarHijoAST(instrucciones);
            let sim_string = JSON.stringify(init);
            localStorage.setItem("simbolos", sim_string);
            const gramat = src_app_Backend_XML_Analizador_XMLgraph__WEBPACK_IMPORTED_MODULE_4__;
            const gramar = gramat.parse(texto);
            localStorage.setItem("gramatica", gramar);
            console.log(listaErrores);
            let errores = JSON.stringify(listaErrores);
            localStorage.setItem("errores", errores);
            /**M A N E J O   E R R O R  S I N T A C T I C O */
            let errorsito = src_app_Backend_XML_Analizador_GramaticaXML__WEBPACK_IMPORTED_MODULE_2__;
            let errorts = errorsito.parse(texto);
            //console.log(listaErrores);
        }
        catch (error) {
            if (error instanceof ReferenceError) {
                let errores = JSON.stringify(listaErrores);
                localStorage.setItem("errores", errores);
            }
        }
        finally {
            let errores = JSON.stringify(listaErrores);
            localStorage.setItem("errores", errores);
        }
        //console.log(gramar);
    }
    /*A R B O L  D E S C E N D E N T E */
    interpretarContenidoDesc(texto) {
        listaErrores = new Array();
        if (texto == null)
            return document.write('Error');
        const analizador = src_app_Backend_XML_Analizador_GramaticaXMLDescPRUEBA__WEBPACK_IMPORTED_MODULE_3__;
        const objetos = analizador.parse(texto);
        const tablaGlobal = new src_app_Backend_XML_Analizador_Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["default"]();
        var Tree = new src_app_Backend_XML_Analizador_Simbolos_Arbol__WEBPACK_IMPORTED_MODULE_5__["default"]([objetos]);
        Tree.settablaGlobal(tablaGlobal);
        console.log(tablaGlobal);
        //  PARA GUARDAR DATOS
        // TODO FOR INTERPRETAR
        var init2 = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_6__["default"]("RAIZ");
        var instrucciones = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_6__["default"]("HIJOS");
        for (let i of Tree.getinstrucciones()) {
            instrucciones.agregarHijoAST(i.getNodo());
        }
        for (let i of Tree.getinstrucciones()) {
            /*if (i instanceof Errores) {
              listaErrores.push(i);
            }*/
        }
        init2.agregarHijoAST(instrucciones);
        let sim_string = JSON.stringify(init2);
        localStorage.setItem("simbolos1", sim_string);
        const gramat = src_app_Backend_XML_Analizador_XMLgraph__WEBPACK_IMPORTED_MODULE_4__;
        const gramar = gramat.parse(texto);
        localStorage.setItem("gramatica1", gramar);
        //console.log(gramar);
    }
    textInputChange(fileInputEvent) {
        var archivo = fileInputEvent.target.files[0];
        if (!archivo) {
            return;
        }
        var lector = new FileReader();
        lector.onload = (e) => {
            var contenido = e.target.result;
            this.mostrarContenido(contenido, 'contenido');
        };
        lector.readAsText(archivo);
    }
    mostrarContenido(contenido, identificador) {
        var elemento = document.getElementById(identificador);
        elemento.innerHTML = contenido;
    }
    generarAst() {
        this.inicioSrv.graficarAst().subscribe((res) => {
            if (res.msg == false) {
                alert('ALGO FALLO EN EL GRAFICO');
            }
            else {
                this.presentAlert();
            }
        });
    }
    presentAlert() {
        // #docregion focus-restoration
        this.dialog.open(Pruebas, {});
    }
}
ContenidoInicioComponent.ɵfac = function ContenidoInicioComponent_Factory(t) { return new (t || ContenidoInicioComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_servicios_inicio_service__WEBPACK_IMPORTED_MODULE_9__["InicioService"]), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialog"])); };
ContenidoInicioComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: ContenidoInicioComponent, selectors: [["app-contenido-inicio"]], decls: 30, vars: 0, consts: [[1, "contenedor"], [1, "consolaContainer"], ["value", "Interpretar", 3, "click"], ["id", "consolas", 1, "consola"], ["consolas", ""], [1, "editores"], ["id", "ediT"], ["name", "fontStyle", "aria-label", "Font Style"], ["value", "InterpretarDesc", 3, "click"], ["value", "Abrir Archivo", 3, "click"], ["type", "file", "hidden", "true", "onclick", "this.value=null", "accept", ".ty", 3, "change"], ["textInput", ""], ["value", "Guardar"], ["id", "contenido", 1, "forma", 3, "this.onload"], ["contenido", ""], ["id", "resultado", 1, "forma"], ["resultado", ""]], template: function ContenidoInicioComponent_Template(rf, ctx) { if (rf & 1) {
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "EDITOR XPATH");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "mat-button-toggle", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ContenidoInicioComponent_Template_mat_button_toggle_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](24); return ctx.interpretarContenido(_r2.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Ejecutar");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "textarea", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, "Editor XML");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "mat-button-toggle-group", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "mat-button-toggle", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ContenidoInicioComponent_Template_mat_button_toggle_click_13_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](24); return ctx.interpretarContenido(_r2.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, "Interpretar XML Asc");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "mat-button-toggle", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ContenidoInicioComponent_Template_mat_button_toggle_click_15_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](24); return ctx.interpretarContenidoDesc(_r2.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](16, "Interpretar XML Desc");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "mat-button-toggle", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ContenidoInicioComponent_Template_mat_button_toggle_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r4); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](20); return _r1.click(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18, "Abrir Archivo XML");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "input", 10, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function ContenidoInicioComponent_Template_input_change_19_listener($event) { return ctx.textInputChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](21, "mat-button-toggle", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](22, "Guardar XML");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "textarea", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("this.onload", function ContenidoInicioComponent_Template_textarea_this_onload_23_listener() { return ctx.getConsola(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](27, "RESULTADO XPATH");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](28, "textarea", 15, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_11__["MatButtonToggle"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_11__["MatButtonToggleGroup"]], styles: ["mat-button-toggle-group[_ngcontent-%COMP%] {\r\n  margin-top: 20px;\r\n  background-color: #a97061;\r\n}\r\n\r\nmat-button-toggle[_ngcontent-%COMP%] {\r\n  width: auto;\r\n  height: 50px;\r\n  background-color: #67676f;\r\n  color: #f9faf7;\r\n  font: \"Century Gothic\"\r\n}\r\n\r\n.contenedor[_ngcontent-%COMP%] {\r\n  background-color: #a97061;\r\n  height: auto;\r\n  width: 95%;\r\n  margin-left: 2%;\r\n  font: \"Century Gothic\"\r\n\r\n}\r\n\r\n.editores[_ngcontent-%COMP%] {\r\n  display: flex;\r\n}\r\n\r\n#ediT[_ngcontent-%COMP%] {\r\n  margin-top: 2%;\r\n  width: 50%;\r\n}\r\n\r\n.forma[_ngcontent-%COMP%] {\r\n  padding-top: 13px;\r\n  margin-top: 10px;\r\n  margin-bottom: 10px;\r\n  height: 1000px;\r\n  border-style: solid;\r\n  width: 80%;\r\n  margin-left: 10%;\r\n  font-family: \"Courier New\", \"Lucida Console\", \"Century Gothic\";\r\n  font-size: 96%;\r\n  resize: none;\r\n  white-space: nowrap;\r\n}\r\n\r\n.consola[_ngcontent-%COMP%] {\r\n  padding-top: 13px;\r\n  margin-top: 10px;\r\n  height: 50px;\r\n  border-style: solid;\r\n  width: 80%;\r\n  margin-left: 2%;\r\n  background-color: #67676f;\r\n  color: #f9faf7;\r\n  font-family: \"Courier New\", \"Century Gothic\", monospace;\r\n  font-size: 20px;\r\n  resize: vertical;\r\n  white-space: nowrap;\r\n}\r\n\r\n.consolaContainer[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\r\n}\r\n\r\n#ediT[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  margin-left: 10%;\r\n  font-size: 20px;\r\n}\r\n\r\n.consolaContainer[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  font-size: 20px;\r\n  margin-right: 20px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRlbmlkby1pbmljaW8uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtFQUNoQix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2Q7QUFDRjs7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osVUFBVTtFQUNWLGVBQWU7RUFDZjs7QUFFRjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFDQTtFQUNFLGNBQWM7RUFDZCxVQUFVO0FBQ1o7O0FBQ0E7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixjQUFjO0VBQ2QsbUJBQW1CO0VBQ25CLFVBQVU7RUFDVixnQkFBZ0I7RUFDaEIsOERBQThEO0VBQzlELGNBQWM7RUFDZCxZQUFZO0VBQ1osbUJBQW1CO0FBQ3JCOztBQUNBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLFVBQVU7RUFDVixlQUFlO0VBQ2YseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCx1REFBdUQ7RUFDdkQsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7O0FBQ0E7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLG1CQUFtQjtBQUNyQjs7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixlQUFlO0FBQ2pCOztBQUNBO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtBQUNwQiIsImZpbGUiOiJjb250ZW5pZG8taW5pY2lvLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJtYXQtYnV0dG9uLXRvZ2dsZS1ncm91cCB7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTk3MDYxO1xyXG59XHJcblxyXG5tYXQtYnV0dG9uLXRvZ2dsZSB7XHJcbiAgd2lkdGg6IGF1dG87XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM2NzY3NmY7XHJcbiAgY29sb3I6ICNmOWZhZjc7XHJcbiAgZm9udDogXCJDZW50dXJ5IEdvdGhpY1wiXHJcbn1cclxuLmNvbnRlbmVkb3Ige1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNhOTcwNjE7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIHdpZHRoOiA5NSU7XHJcbiAgbWFyZ2luLWxlZnQ6IDIlO1xyXG4gIGZvbnQ6IFwiQ2VudHVyeSBHb3RoaWNcIlxyXG5cclxufVxyXG5cclxuLmVkaXRvcmVzIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbiNlZGlUIHtcclxuICBtYXJnaW4tdG9wOiAyJTtcclxuICB3aWR0aDogNTAlO1xyXG59XHJcbi5mb3JtYSB7XHJcbiAgcGFkZGluZy10b3A6IDEzcHg7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIGhlaWdodDogMTAwMHB4O1xyXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgd2lkdGg6IDgwJTtcclxuICBtYXJnaW4tbGVmdDogMTAlO1xyXG4gIGZvbnQtZmFtaWx5OiBcIkNvdXJpZXIgTmV3XCIsIFwiTHVjaWRhIENvbnNvbGVcIiwgXCJDZW50dXJ5IEdvdGhpY1wiO1xyXG4gIGZvbnQtc2l6ZTogOTYlO1xyXG4gIHJlc2l6ZTogbm9uZTtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcbi5jb25zb2xhIHtcclxuICBwYWRkaW5nLXRvcDogMTNweDtcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gIGhlaWdodDogNTBweDtcclxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xyXG4gIHdpZHRoOiA4MCU7XHJcbiAgbWFyZ2luLWxlZnQ6IDIlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM2NzY3NmY7XHJcbiAgY29sb3I6ICNmOWZhZjc7XHJcbiAgZm9udC1mYW1pbHk6IFwiQ291cmllciBOZXdcIiwgXCJDZW50dXJ5IEdvdGhpY1wiLCBtb25vc3BhY2U7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIHJlc2l6ZTogdmVydGljYWw7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG4uY29uc29sYUNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuI2VkaVQgbGFiZWwge1xyXG4gIG1hcmdpbi1sZWZ0OiAxMCU7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG59XHJcbi5jb25zb2xhQ29udGFpbmVyIGxhYmVsIHtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG59XHJcbiJdfQ== */"] });
class Pruebas {
}
Pruebas.ɵfac = function Pruebas_Factory(t) { return new (t || Pruebas)(); };
Pruebas.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: Pruebas, selectors: [["contenido-dialog"]], decls: 5, vars: 0, consts: [["mat-dialog-title", ""], ["mat-dialog-content", ""], ["mat-dialog-actions", ""]], template: function Pruebas_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "ARBOL AST");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Se creo de forma exitosa el arbol AST");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "div", 2);
    } }, encapsulation: 2 });


/***/ }),

/***/ "EHLN":
/*!********************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/GramaticaXML.js ***!
  \********************************************************/
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
var GramaticaXML = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [2, 12], $V1 = [1, 3], $V2 = [1, 4], $V3 = [1, 5], $V4 = [5, 9, 10, 13, 16, 17], $V5 = [1, 11], $V6 = [2, 15], $V7 = [10, 12, 14, 15], $V8 = [5, 10, 16], $V9 = [1, 21], $Va = [1, 19];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "START": 3, "OBJETO": 4, "EOF": 5, "INSTRUCCION": 6, "CUERPO": 7, "OBJETOS": 8, "MENORQUEESPECIAL": 9, "IDENTIFICADOR": 10, "L_ATRIBUTOS": 11, "MAYORQUEESPECIAL": 12, "MENORQUE": 13, "SELFCLOSE": 14, "MAYORQUE": 15, "SALIDA": 16, "COMENTARIOS": 17, "ATRIBUTO": 18, "IGUAL": 19, "CADENA": 20, "QUOTE": 21, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 7: "CUERPO", 9: "MENORQUEESPECIAL", 10: "IDENTIFICADOR", 12: "MAYORQUEESPECIAL", 13: "MENORQUE", 14: "SELFCLOSE", 15: "MAYORQUE", 16: "SALIDA", 17: "COMENTARIOS", 19: "IGUAL", 20: "CADENA", 21: "QUOTE" },
        productions_: [0, [3, 2], [6, 1], [6, 1], [6, 1], [8, 2], [8, 1], [4, 5], [4, 5], [4, 8], [4, 7], [4, 1], [4, 0], [11, 2], [11, 1], [11, 0], [18, 3], [18, 3]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return $$[$0 - 1];
                    break;
                case 2:
                case 3:
                    this.$ = $$[$0];
                    break;
                case 4:
                    inicio.listaErrores.push(new CNodoErrores.default("Error Sintactico", "Se esperaba un token, error en : " + yytext, _$[$0].first_line, _$[$0].first_column));
                    console.log("Error Sintactico, Se esperaba un token en esta linea " + "Linea: " + _$[$0].first_line + " Columna: " + _$[$0].first_column);
                    this.$ = false;
                    break;
                case 5:
                    $$[$0 - 1].push($$[$0]);
                    this.$ = $$[$0 - 1];
                    break;
                case 6:
                    this.$ = [$$[$0]];
                    break;
                case 7:
                case 8:
                    this.$ = new objeto.default($$[$0 - 3], null, $$[$0 - 2], $$[$0], _$[$0 - 4].first_line, _$[$0 - 4].first_column);
                    break;
                case 9:
                    this.$ = new objeto.default($$[$0 - 6], null, $$[$0 - 5], $$[$0 - 3], _$[$0 - 7].first_line, _$[$0 - 7].first_column);
                    break;
                case 10:
                    this.$ = new objeto.default($$[$0 - 5], $$[$0 - 2], $$[$0 - 4], null, _$[$0 - 6].first_line, _$[$0 - 6].first_column);
                    break;
                case 11:
                    this.$ = "<!-- " + $$[$0] + " --!>";
                    break;
                case 12:
                    this.$ = "";
                    break;
                case 13:
                    $$[$0 - 1].push($$[$0]);
                    this.$ = $$[$0 - 1];
                    break;
                case 14:
                    this.$ = [$$[$0]];
                    break;
                case 15:
                    this.$ = [];
                    break;
                case 16:
                case 17:
                    this.$ = new atributo.default($$[$0 - 2], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 5: $V0, 9: $V1, 13: $V2, 17: $V3 }, { 1: [3] }, { 5: [1, 6] }, { 10: [1, 7] }, { 10: [1, 8] }, o($V4, [2, 11]), { 1: [2, 1] }, { 10: $V5, 11: 9, 12: $V6, 18: 10 }, o([14, 15], $V6, { 18: 10, 11: 12, 10: $V5 }), { 10: $V5, 12: [1, 13], 18: 14 }, o($V7, [2, 14]), { 19: [1, 15] }, { 10: $V5, 14: [1, 16], 15: [1, 17], 18: 14 }, o($V8, $V0, { 6: 18, 8: 20, 4: 22, 2: $V9, 7: $Va, 9: $V1, 13: $V2, 17: $V3 }), o($V7, [2, 13]), { 20: [1, 23], 21: [1, 24] }, o($V8, $V0, { 8: 20, 4: 22, 6: 25, 2: $V9, 7: $Va, 9: $V1, 13: $V2, 17: $V3 }), o([10, 16], $V0, { 8: 20, 4: 22, 6: 26, 2: $V9, 7: $Va, 9: $V1, 13: $V2, 17: $V3 }), o($V4, [2, 7]), o($V4, [2, 2]), o($V8, [2, 3], { 4: 27, 9: $V1, 13: $V2, 17: $V3 }), o($V4, [2, 4]), o($V4, [2, 6]), o($V7, [2, 16]), o($V7, [2, 17]), o($V4, [2, 8]), { 10: [1, 29], 16: [1, 28] }, o($V4, [2, 5]), { 10: [1, 30] }, { 15: [1, 31] }, { 15: [1, 32] }, o($V4, [2, 10]), o($V4, [2, 9])],
        defaultActions: { 6: [2, 1] },
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
            var self = this, stack = [0], tstack = [], // token stack
            vstack = [null], // semantic value stack
            lstack = [], // location stack
            table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            //this.reductionCount = this.shiftCount = 0;
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            // copy state
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
                // if token isn't its numeric value, convert
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                // retreive state number from top of stack
                state = stack[stack.length - 1];
                // use default actions if available
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                }
                else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    // read action for current state and first input
                    action = table[state] && table[state][symbol];
                }
                _handle_error: 
                // handle parse error
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var error_rule_depth;
                    var errStr = '';
                    // Return the rule stack depth where the nearest error rule can be found.
                    // Return FALSE when no error recovery rule was found.
                    function locateNearestErrorRecoveryRule(state) {
                        var stack_probe = stack.length - 1;
                        var depth = 0;
                        // try to recover from error
                        for (;;) {
                            // check for error recovery rule in this state
                            if ((TERROR.toString()) in table[state]) {
                                return depth;
                            }
                            if (state === 0 || stack_probe < 2) {
                                return false; // No suitable error recovery rule available.
                            }
                            stack_probe -= 2; // popStack(1): [symbol, action]
                            state = stack[stack_probe];
                            ++depth;
                        }
                    }
                    if (!recovering) {
                        // first see if there's any chance at hitting an error recovery rule:
                        error_rule_depth = locateNearestErrorRecoveryRule(state);
                        // Report error
                        expected = [];
                        for (p in table[state]) {
                            if (this.terminals_[p] && p > TERROR) {
                                expected.push("'" + this.terminals_[p] + "'");
                            }
                        }
                        if (lexer.showPosition) {
                            errStr = 'Parse error on line ' + (yylineno + 1) + ":\n" + lexer.showPosition() + "\nExpecting " + expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                        }
                        else {
                            errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " +
                                (symbol == EOF ? "end of input" :
                                    ("'" + (this.terminals_[symbol] || symbol) + "'"));
                        }
                        this.parseError(errStr, {
                            text: lexer.match,
                            token: this.terminals_[symbol] || symbol,
                            line: lexer.yylineno,
                            loc: yyloc,
                            expected: expected,
                            recoverable: (error_rule_depth !== false)
                        });
                    }
                    else if (preErrorSymbol !== EOF) {
                        error_rule_depth = locateNearestErrorRecoveryRule(state);
                    }
                    // just recovered from another error
                    if (recovering == 3) {
                        if (symbol === EOF || preErrorSymbol === EOF) {
                            throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                        }
                        // discard current lookahead and grab another
                        yyleng = lexer.yyleng;
                        yytext = lexer.yytext;
                        yylineno = lexer.yylineno;
                        yyloc = lexer.yylloc;
                        symbol = lex();
                    }
                    // try to recover from error
                    if (error_rule_depth === false) {
                        throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
                    }
                    popStack(error_rule_depth);
                    preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
                    symbol = TERROR; // insert generic error symbol as new lookahead
                    state = stack[stack.length - 1];
                    action = table[state] && table[state][TERROR];
                    recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
                }
                // this shouldn't happen, unless resolve defaults are off
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1: // shift
                        //this.shiftCount++;
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]); // push state
                        symbol = null;
                        if (!preErrorSymbol) { // normal execution/no error
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        }
                        else {
                            // error just occurred, resume old lookahead f/ before error
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        // reduce
                        //this.reductionCount++;
                        len = this.productions_[action[1]][1];
                        // perform semantic action
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
                        }
                        // pop off stack
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]); // push nonterminal (reduce)
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        // goto new state = table[STATE][NONTERMINAL]
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        // accept
                        return true;
                }
            }
            return true;
        } };
    const atributo = __webpack_require__(/*! ./Expresiones/Atributo */ "uvkm");
    const tipo = __webpack_require__(/*! ./Simbolos/Tipo */ "Oyrp");
    const objeto = __webpack_require__(/*! ./Expresiones/Objeto */ "xzWR");
    const CErrores = __webpack_require__(/*! ./Excepciones/Errores */ "Vgfr");
    const CNodoErrores = __webpack_require__(/*! ./Excepciones/NodoErrores */ "cikY");
    const inicio = __webpack_require__(/*! ../../../componentes/contenido-inicio/contenido-inicio.component */ "CbqC");
    var palabra = "";
    var palabra1 = "";
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
                        break;
                    case 1:
                        console.log("Comenzo el comentario");
                        this.begin("Comentario");
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        console.log("Termino el comentario");
                        this.popState();
                        break;
                    case 5:
                        console.log("Texto dentro del comentario: " + yy_.yytext + " :(");
                        return 17;
                        break;
                    case 6:
                        this.begin('cuerpo');
                        return 15;
                        break;
                    case 7:
                        this.begin('INITIAL');
                        if (palabra.replaceAll(" ", "") == "")
                            return 16;
                        yy_.yytext = palabra;
                        palabra = "";
                        if (palabra.replaceAll(" ", "") == "")
                            return 7;
                        break;
                    case 8:
                        this.begin('INITIAL');
                        return 13;
                        yy_.yytext = palabra;
                        palabra = "";
                        return 7;
                        break;
                    case 9:
                        this.begin('INITIAL');
                        return 14;
                        yy_.yytext = palabra;
                        palabra = "";
                        return 7;
                        break;
                    case 10:
                        palabra += yy_.yytext;
                        break;
                    case 11:
                        return 12;
                        break;
                    case 12:
                        return 16;
                        break;
                    case 13:
                        return 14;
                        break;
                    case 14:
                        return 9;
                        break;
                    case 15:
                        return 13;
                        break;
                    case 16:
                        return 19;
                        break;
                    case 17:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                        return 20;
                        break;
                    case 18:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                        return 21;
                        break;
                    case 19:
                        return 10;
                        break;
                    case 20:
                        return 5;
                        break;
                    case 21:
                        break;
                    case 22:
                        break;
                    case 23:
                        break;
                    case 24:
                        inicio.listaErrores.push(new CNodoErrores.default("Lexico", "No se esperaba el caracter: " + yy_.yytext, yy_.yylloc.first_line, yy_.yylloc.first_column));
                        console.log("Lexico, No se esperaba el caracter: " + yy_.yytext + " Linea: " + yy_.yylloc.first_line + "Columna: " + yy_.yylloc.first_column);
                        break;
                }
            },
            rules: [/^(?:\/\/.*)/i, /^(?:<!--)/i, /^(?:[ \r\t]+)/i, /^(?:\n)/i, /^(?:-->)/i, /^(?:[^"-->"]+)/i, /^(?:>)/i, /^(?:<\/)/i, /^(?:<)/i, /^(?:<)/i, /^(?:.)/i, /^(?:\?>)/i, /^(?:<\/)/i, /^(?:\/>)/i, /^(?:<\?)/i, /^(?:<)/i, /^(?:=)/i, /^(?:"[^\"]*")/i, /^(?:'[^\']*')/i, /^(?:([a-zA-Z])[a-zA-Z0-9_^Ññáéíúó]*)/i, /^(?:$)/i, /^(?:[ \r\t]+)/i, /^(?:\n+)/i, /^(?:\s+)/i, /^(?:.)/i],
            conditions: { "Comentario": { "rules": [2, 3, 4, 5], "inclusive": false }, "xml": { "rules": [0, 1, 6, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "inclusive": true }, "cuerpo": { "rules": [0, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "inclusive": true }, "INITIAL": { "rules": [0, 1, 6, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "inclusive": true } }
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
    exports.parser = GramaticaXML;
    exports.Parser = GramaticaXML.Parser;
    exports.parse = function () { return GramaticaXML.parse.apply(GramaticaXML, arguments); };
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "Er68":
/*!******************************************************!*\
  !*** ./src/app/paginas/errores/errores.component.ts ***!
  \******************************************************/
/*! exports provided: ErroresComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErroresComponent", function() { return ErroresComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ "+0xr");


function ErroresComponent_th_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Error de Tipo. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ErroresComponent_td_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r10.tipoError, " ");
} }
function ErroresComponent_th_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Descripcion ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ErroresComponent_td_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r11.desc, " ");
} }
function ErroresComponent_th_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Linea ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ErroresComponent_td_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r12.fila, " ");
} }
function ErroresComponent_th_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Columna ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ErroresComponent_td_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r13.columna, " ");
} }
function ErroresComponent_tr_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 12);
} }
function ErroresComponent_tr_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 13);
} }
class ErroresComponent {
    constructor() {
        this.displayedColumns = ['tipoError', 'Descripcion', 'Linea', 'Columna'];
        this.dataSource = '';
    }
    ngOnInit() {
        let info = window.localStorage.getItem('errores');
        let otro = JSON.parse(info);
        this.dataSource = otro;
        console.log(otro);
    }
}
ErroresComponent.ɵfac = function ErroresComponent_Factory(t) { return new (t || ErroresComponent)(); };
ErroresComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ErroresComponent, selectors: [["app-errores"]], decls: 18, vars: 3, consts: [[1, "tabla"], ["mat-table", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "tipoError"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "Descripcion"], ["matColumnDef", "Linea"], ["matColumnDef", "Columna"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""]], template: function ErroresComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "TABLA DE ERRORES");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](4, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ErroresComponent_th_5_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ErroresComponent_td_6_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](7, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, ErroresComponent_th_8_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ErroresComponent_td_9_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](10, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, ErroresComponent_th_11_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, ErroresComponent_td_12_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](13, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, ErroresComponent_th_14_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, ErroresComponent_td_15_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, ErroresComponent_tr_16_Template, 1, 0, "tr", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, ErroresComponent_tr_17_Template, 1, 0, "tr", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
    } }, directives: [_angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRow"]], styles: ["table[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  width: 98%;\r\n  margin-top: 1%;\r\n  margin-bottom: 1%;\r\n  margin-left: 1%;\r\n  background-color: #a97061;\r\n}\r\nh1[_ngcontent-%COMP%] {\r\n  margin-left: 35%;\r\n  margin-top: 5%;\r\n  margin-bottom: 5%;\r\n  font-size: 50px;\r\n  font-family: \"Franklin Gothic Medium\", \"Arial Narrow\", Arial, sans-serif;\r\n  background-color: transparent;\r\n}\r\n.tabla[_ngcontent-%COMP%] {\r\n  border: 2px solid #67676f;\r\n  margin: auto;\r\n  width: 90%;\r\n  height: auto;\r\n  overflow: hidden;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9yZXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsY0FBYztFQUNkLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YseUJBQXlCO0FBQzNCO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2Ysd0VBQXdFO0VBQ3hFLDZCQUE2QjtBQUMvQjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixVQUFVO0VBQ1YsWUFBWTtFQUNaLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJlcnJvcmVzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHdpZHRoOiA5OCU7XHJcbiAgbWFyZ2luLXRvcDogMSU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMSU7XHJcbiAgbWFyZ2luLWxlZnQ6IDElO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNhOTcwNjE7XHJcbn1cclxuaDEge1xyXG4gIG1hcmdpbi1sZWZ0OiAzNSU7XHJcbiAgbWFyZ2luLXRvcDogNSU7XHJcbiAgbWFyZ2luLWJvdHRvbTogNSU7XHJcbiAgZm9udC1zaXplOiA1MHB4O1xyXG4gIGZvbnQtZmFtaWx5OiBcIkZyYW5rbGluIEdvdGhpYyBNZWRpdW1cIiwgXCJBcmlhbCBOYXJyb3dcIiwgQXJpYWwsIHNhbnMtc2VyaWY7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuLnRhYmxhIHtcclxuICBib3JkZXI6IDJweCBzb2xpZCAjNjc2NzZmO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICB3aWR0aDogOTAlO1xyXG4gIGhlaWdodDogYXV0bztcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "LdXe":
/*!**************************************************************************!*\
  !*** ./src/app/paginas/gramatical-report/gramatical-report.component.ts ***!
  \**************************************************************************/
/*! exports provided: GramaticalReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GramaticalReportComponent", function() { return GramaticalReportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class GramaticalReportComponent {
    constructor() { }
    ngOnInit() {
        let info = window.localStorage.getItem('gramatica');
        console.log(info);
        let texto = document.getElementById("text2");
        if (texto != null) {
            texto.innerHTML += info;
        }
    }
}
GramaticalReportComponent.ɵfac = function GramaticalReportComponent_Factory(t) { return new (t || GramaticalReportComponent)(); };
GramaticalReportComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GramaticalReportComponent, selectors: [["app-gramatical-report"]], decls: 3, vars: 0, consts: [["name", "Estruct", "id", "text2", "cols", "125", "rows", "35"]], template: function GramaticalReportComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "textarea", 0);
    } }, styles: ["textarea[_ngcontent-%COMP%]{\r\n    background: url(http://i.imgur.com/2cOaJ.png);\r\nbackground-attachment: local;\r\nbackground-repeat: no-repeat;\r\npadding-left: 40px;\r\nfont-size: 95%;\r\ncolor: white;\r\nposition: relative;\r\nleft: 100px;\r\n    border-color:rgb(126, 123, 123);\r\n    background-color: rgb(58, 56, 56);\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYW1hdGljYWwtcmVwb3J0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSw2Q0FBNkM7QUFDakQsNEJBQTRCO0FBQzVCLDRCQUE0QjtBQUM1QixrQkFBa0I7QUFDbEIsY0FBYztBQUNkLFlBQVk7QUFDWixrQkFBa0I7QUFDbEIsV0FBVztJQUNQLCtCQUErQjtJQUMvQixpQ0FBaUM7QUFDckMiLCJmaWxlIjoiZ3JhbWF0aWNhbC1yZXBvcnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRleHRhcmVhe1xyXG4gICAgYmFja2dyb3VuZDogdXJsKGh0dHA6Ly9pLmltZ3VyLmNvbS8yY09hSi5wbmcpO1xyXG5iYWNrZ3JvdW5kLWF0dGFjaG1lbnQ6IGxvY2FsO1xyXG5iYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG5wYWRkaW5nLWxlZnQ6IDQwcHg7XHJcbmZvbnQtc2l6ZTogOTUlO1xyXG5jb2xvcjogd2hpdGU7XHJcbnBvc2l0aW9uOiByZWxhdGl2ZTtcclxubGVmdDogMTAwcHg7XHJcbiAgICBib3JkZXItY29sb3I6cmdiKDEyNiwgMTIzLCAxMjMpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU4LCA1NiwgNTYpO1xyXG59Il19 */"] });


/***/ }),

/***/ "Mc8n":
/*!*****************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Reportes/reporteTabla.ts ***!
  \*****************************************************************/
/*! exports provided: reporteTabla */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reporteTabla", function() { return reporteTabla; });
class reporteTabla {
    constructor(identificador, valor, forma, tipo, entorno, linea, columna) {
        this.identificador = identificador.toLowerCase();
        this.forma = forma;
        this.tipo = tipo;
        this.entorno = entorno;
        this.linea = linea;
        this.columna = columna;
        this.valor = valor;
    }
    getIdentificador() {
        return this.identificador;
    }
    getForma() {
        return this.forma;
    }
    getTipo() {
        return this.tipo;
    }
    getEntorno() {
        return this.entorno;
    }
    getLinea() {
        return this.linea;
    }
    getColumna() {
        return this.columna;
    }
    getValor() {
        return this.valor;
    }
    setLinea(linea) {
        this.linea = linea;
    }
    setColumna(col) {
        this.columna = col;
    }
    setValor(val) {
        this.valor = val;
    }
    setEntorno(ent) {
        this.entorno = ent;
    }
}


/***/ }),

/***/ "OBp0":
/*!**********************************************************!*\
  !*** ./src/app/paginas/arbol-ast/arbol-ast.component.ts ***!
  \**********************************************************/
/*! exports provided: ArbolASTComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArbolASTComponent", function() { return ArbolASTComponent; });
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vis */ "TycK");
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vis__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ArbolASTComponent {
    constructor() {
        //**desde aqui vro */
        this.contador = 1;
        this.cuerpo = '';
        this.dataSource = '';
        this.nodes = null;
        this.edges = null;
        this.network = null;
        this.directionInput = document.getElementById("direction");
        this.c = 0;
    }
    ngOnInit() {
        this.destroy();
        this.nodes = [];
        this.edges = [];
        var connectionCount = [];
        let info = window.localStorage.getItem('simbolos');
        let contenido = JSON.parse(info);
        console.log(contenido);
        var nivel = 0;
        this.nodes.push({ id: this.c, label: this.getValor(contenido), nivel: nivel });
        this.nodes[this.c]["level"] = nivel;
        var hijos = this.recorrerAST(this.c, contenido, nivel);
        console.log(hijos);
        for (let nodo of hijos.nodos) {
            this.nodes.push({ id: nodo.id, label: nodo.label });
        }
        for (let enlace of hijos.enlaces) {
            this.edges.push({ from: enlace.id1, to: enlace.id2 });
        }
        for (let nodo of hijos.nodos) {
            this.nodes[nodo.id]["level"] = nodo.nivel;
        }
        var container = document.getElementById("mynetwork");
        var data = {
            nodes: this.nodes,
            edges: this.edges,
        };
        var options = {
            nodes: {
                borderWidth: 2,
                size: 30,
                color: {
                    border: '#46304E',
                    background: '#D297E9',
                },
                font: {
                    color: "#000000",
                    face: 'Century Gothic'
                }
            },
            edges: {
                smooth: {
                    type: "cubicBezier",
                    forceDirection: "vertical",
                    roundness: 0.4,
                }
            },
            layout: {
                randomSeed: undefined,
                improvedLayout: true,
                hierarchical: {
                    direction: "UD",
                    sortMethod: "hubsize"
                },
            },
            physics: false,
        };
        this.network = new vis__WEBPACK_IMPORTED_MODULE_0__["Network"](container, data, options);
        this.network.on("select", function (params) {
            document.getElementById("selection").innerText =
                "Selection: " + params.nodes;
        });
        let registros = [];
    }
    destroy() {
        if (this.network !== null) {
            this.network.destroy();
            this.network = null;
        }
    }
    recorrerAST(padre, nPadre, nivel) {
        var arr = { nodos: [], enlaces: [] };
        for (let hijo of this.getHijos(nPadre)) {
            nivel++;
            this.c++;
            arr.enlaces.push({ id1: padre, id2: this.c });
            arr.nodos.push({ id: this.c, label: this.getValor(hijo), nivel: nivel });
            var resultado = this.recorrerAST(this.c, hijo, nivel);
            arr.enlaces = arr.enlaces.concat(resultado.enlaces);
            arr.nodos = arr.nodos.concat(resultado.nodos);
        }
        return arr;
    }
    getValor(nodo) {
        return nodo.valor;
    }
    getHijos(nodo) {
        return nodo.listaNodos;
    }
}
ArbolASTComponent.ɵfac = function ArbolASTComponent_Factory(t) { return new (t || ArbolASTComponent)(); };
ArbolASTComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ArbolASTComponent, selectors: [["app-arbol-ast"]], decls: 1, vars: 0, consts: [["id", "mynetwork"]], template: function ArbolASTComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
    } }, styles: ["#mynetwork[_ngcontent-%COMP%] {\r\n    width: 1362px;\r\n    height: 595px;\r\n    border: 1px solid rgb(221, 58, 58);\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyYm9sLWFzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYixrQ0FBa0M7RUFDcEMiLCJmaWxlIjoiYXJib2wtYXN0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjbXluZXR3b3JrIHtcclxuICAgIHdpZHRoOiAxMzYycHg7XHJcbiAgICBoZWlnaHQ6IDU5NXB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDIyMSwgNTgsIDU4KTtcclxuICB9Il19 */"] });


/***/ }),

/***/ "Oyrp":
/*!*********************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Simbolos/Tipo.ts ***!
  \*********************************************************/
/*! exports provided: default, tipoDato */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tipo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tipoDato", function() { return tipoDato; });
class Tipo {
    constructor(tipos) {
        this.tipos = tipos;
    }
    getTipo() {
        return this.tipos;
    }
    setTipo(tipo) {
        this.tipos = tipo;
    }
    igual(compara) {
        return (this.tipos = compara.tipos);
    }
}
var tipoDato;
(function (tipoDato) {
    tipoDato[tipoDato["CADENA"] = 0] = "CADENA";
    tipoDato[tipoDato["OBJETO"] = 1] = "OBJETO";
    tipoDato[tipoDato["QUOTE"] = 2] = "QUOTE";
})(tipoDato || (tipoDato = {}));


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
/* harmony import */ var _componentes_side_bar_side_bar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./componentes/side-bar/side-bar.component */ "8hwP");


class AppComponent {
    constructor() {
        this.title = 'Frontend';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-sidebar");
    } }, directives: [_componentes_side_bar_side_bar_component__WEBPACK_IMPORTED_MODULE_1__["SideBarComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "T1j4":
/*!**********************************************************!*\
  !*** ./src/app/paginas/arbol-cst/arbol-cst.component.ts ***!
  \**********************************************************/
/*! exports provided: ArbolCstComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArbolCstComponent", function() { return ArbolCstComponent; });
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vis */ "TycK");
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vis__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ArbolCstComponent {
    constructor() {
        this.contador = 1;
        this.cuerpo = '';
        this.dataSource = '';
        this.nodes = null;
        this.edges = null;
        this.network = null;
        this.directionInput = document.getElementById("direction");
        this.c = 0;
    }
    ngOnInit() {
        this.destroy();
        this.nodes = [];
        this.edges = [];
        var connectionCount = [];
        let info = window.localStorage.getItem('simbolo');
        let contenido = JSON.parse(info);
        console.log(contenido);
        var nivel = 0;
        this.nodes.push({ id: this.c, label: this.getValor(contenido), nivel: nivel });
        this.nodes[this.c]["level"] = nivel;
        var hijos = this.recorrerAST(this.c, contenido, nivel);
        console.log(hijos);
        for (let nodo of hijos.nodos) {
            this.nodes.push({ id: nodo.id, label: nodo.label });
        }
        for (let enlace of hijos.enlaces) {
            this.edges.push({ from: enlace.id1, to: enlace.id2 });
        }
        for (let nodo of hijos.nodos) {
            this.nodes[nodo.id]["level"] = nodo.nivel;
        }
        var container = document.getElementById("mynetwork");
        var data = {
            nodes: this.nodes,
            edges: this.edges,
        };
        var options = {
            edges: {
                smooth: {
                    type: "cubicBezier",
                    forceDirection: "vertical",
                    roundness: 0.4,
                },
            },
            layout: {
                hierarchical: {
                    direction: "UD",
                },
            },
            physics: false,
        };
        this.network = new vis__WEBPACK_IMPORTED_MODULE_0__["Network"](container, data, options);
        this.network.on("select", function (params) {
            document.getElementById("selection").innerText =
                "Selection: " + params.nodes;
        });
    }
    destroy() {
        if (this.network !== null) {
            this.network.destroy();
            this.network = null;
        }
    }
    recorrerAST(padre, nPadre, nivel) {
        var arr = { nodos: [], enlaces: [] };
        for (let hijo of this.getHijos(nPadre)) {
            nivel++;
            this.c++;
            arr.enlaces.push({ id1: padre, id2: this.c });
            arr.nodos.push({ id: this.c, label: this.getValor(hijo), nivel: nivel });
            var resultado = this.recorrerAST(this.c, hijo, nivel);
            arr.enlaces = arr.enlaces.concat(resultado.enlaces);
            arr.nodos = arr.nodos.concat(resultado.nodos);
        }
        return arr;
    }
    getValor(nodo) {
        return nodo.valor;
    }
    getHijos(nodo) {
        return nodo.listaNodos;
    }
}
ArbolCstComponent.ɵfac = function ArbolCstComponent_Factory(t) { return new (t || ArbolCstComponent)(); };
ArbolCstComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ArbolCstComponent, selectors: [["app-arbol-cst"]], decls: 1, vars: 0, consts: [["id", "mynetwork"]], template: function ArbolCstComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
    } }, styles: ["#mynetwork[_ngcontent-%COMP%] {\r\n    width: 1362px;\r\n    height: 595px;\r\n    border: 1px solid rgb(58, 221, 58);\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFyYm9sLWNzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYixrQ0FBa0M7RUFDcEMiLCJmaWxlIjoiYXJib2wtY3N0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjbXluZXR3b3JrIHtcclxuICAgIHdpZHRoOiAxMzYycHg7XHJcbiAgICBoZWlnaHQ6IDU5NXB4O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDU4LCAyMjEsIDU4KTtcclxuICB9Il19 */"] });


/***/ }),

/***/ "TD3t":
/*!******************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return tablaSimbolos; });
/* harmony import */ var _Tipo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tipo */ "Oyrp");

class tablaSimbolos {
    constructor(anterior) {
        this.tablaAnterior = anterior;
        this.tablaActual = new Map();
        this.tipoDato = new _Tipo__WEBPACK_IMPORTED_MODULE_0__["default"](_Tipo__WEBPACK_IMPORTED_MODULE_0__["tipoDato"].CADENA);
        this.nombreDato = '';
    }
    getAnterior() {
        return this.tablaAnterior;
    }
    setAnterior(anterior) {
        this.tablaAnterior = anterior;
    }
    getTabla() {
        return this.tablaActual;
    }
    setTabla(Tabla) {
        this.tablaActual = Tabla;
    }
    setVariable(simbolo) {
        for (let e = this; e != null; e = e.getAnterior()) {
            let encontrado = (e.getTabla().get(simbolo.getidentificador().toLowerCase()));
            if (encontrado != null) {
                return `La variable existe actualmente`;
            }
            break;
        }
        this.tablaActual.set(simbolo.getidentificador().toLowerCase(), simbolo);
        return `creada con exito`;
    }
    getVariable(id) {
        for (let e = this; e != null; e = e.getAnterior()) {
            let encontrado = e.getTabla().get(id.toLowerCase());
            if (encontrado != null) {
                return encontrado;
            }
        }
        return null;
    }
    getNombre() {
        return this.nombreDato;
    }
    setNombre(nombre) {
        this.nombreDato = nombre;
    }
}
//ARREGLO DE SOLO ID DE METODOS


/***/ }),

/***/ "U3hP":
/*!****************************************************!*\
  !*** ./src/app/paginas/inicio/inicio.component.ts ***!
  \****************************************************/
/*! exports provided: InicioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InicioComponent", function() { return InicioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _componentes_tabsinicio_tabsinicio_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../componentes/tabsinicio/tabsinicio.component */ "nUj/");


class InicioComponent {
    ngOnInit() { }
}
InicioComponent.ɵfac = function InicioComponent_Factory(t) { return new (t || InicioComponent)(); };
InicioComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: InicioComponent, selectors: [["app-inicio"]], decls: 1, vars: 0, template: function InicioComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-tabsinicio");
    } }, directives: [_componentes_tabsinicio_tabsinicio_component__WEBPACK_IMPORTED_MODULE_1__["TabsinicioComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbmljaW8uY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "Vgfr":
/*!***************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Excepciones/Errores.ts ***!
  \***************************************************************/
/*! exports provided: Errores */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Errores", function() { return Errores; });
class Errores extends Array {
    constructor(err) {
        super();
        this.push(err);
    }
    static add(err) {
        this.prototype.push(err);
    }
    static verificarerror() {
        if (this.prototype.length > 0) {
            return "Se Detectaron Errores de Compilacion";
        }
        return "Compilacion Sin Errores";
    }
    static geterror() {
        var cad = "";
        cad += "<html>\n";
        cad += "<header>\n";
        cad += "<title>Reporte Errores</title>\n";
        cad += "</header>\n";
        cad += "<body background=\"gray\">\n";
        cad += "<div align=\"center\">\n";
        cad += "<h1>Reporte de Errores de Compilacion</h1>\n";
        cad += "<table border=\"2\" align=\"center\">\n";
        cad += "<tr>\n";
        cad += "<th>TIPO DE ERROR</th><th>DESCRIPCION</th><th>LINEA</th>\n";
        cad += "</tr>\n";
        for (var i = 0; i < this.prototype.length; i++) {
            cad += "<tr>\n";
            cad += "<td>" + this.prototype[i].getTipoError() + "</td><td>" +
                this.prototype[i].getDesc() + "</td><td>" +
                this.prototype[i].getFila() + "</td><td>" +
                this.prototype[i].getcolumna() + "</td>\n";
            cad += "</tr>\n";
        }
        cad += "</table>\n";
        cad += "</div>\n";
        cad += "</body>\n";
        cad += "</html>\n";
        return cad;
    }
    static clear() {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    }
}



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
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _paginas_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./paginas/inicio/inicio.component */ "U3hP");
/* harmony import */ var _paginas_errores_errores_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./paginas/errores/errores.component */ "Er68");
/* harmony import */ var _paginas_tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./paginas/tabla-simbolos/tabla-simbolos.component */ "g7AS");
/* harmony import */ var _paginas_arbol_ast_arbol_ast_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./paginas/arbol-ast/arbol-ast.component */ "OBp0");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _componentes_side_bar_side_bar_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./componentes/side-bar/side-bar.component */ "8hwP");
/* harmony import */ var _componentes_tabsinicio_tabsinicio_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./componentes/tabsinicio/tabsinicio.component */ "nUj/");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _componentes_contenido_inicio_contenido_inicio_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./componentes/contenido-inicio/contenido-inicio.component */ "CbqC");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var ng2_codemirror__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng2-codemirror */ "Hzbz");
/* harmony import */ var ng2_codemirror__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(ng2_codemirror__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _paginas_arbol_cst_arbol_cst_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./paginas/arbol-cst/arbol-cst.component */ "T1j4");
/* harmony import */ var _paginas_gramatical_report_gramatical_report_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./paginas/gramatical-report/gramatical-report.component */ "LdXe");
/* harmony import */ var _paginas_ast_desc_ast_desc_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./paginas/ast-desc/ast-desc.component */ "gX41");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/core */ "fXoL");


























class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
            ng2_codemirror__WEBPACK_IMPORTED_MODULE_20__["CodemirrorModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"],
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatSidenavModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_12__["MatListModule"],
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__["MatTabsModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_16__["MatButtonToggleModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_18__["MatInputModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_19__["MatTableModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_21__["MatDialogModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_25__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _paginas_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_4__["InicioComponent"],
        _paginas_errores_errores_component__WEBPACK_IMPORTED_MODULE_5__["ErroresComponent"],
        _paginas_tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_6__["TablaSimbolosComponent"],
        _paginas_arbol_ast_arbol_ast_component__WEBPACK_IMPORTED_MODULE_7__["ArbolASTComponent"],
        _componentes_side_bar_side_bar_component__WEBPACK_IMPORTED_MODULE_13__["SideBarComponent"],
        _componentes_tabsinicio_tabsinicio_component__WEBPACK_IMPORTED_MODULE_14__["TabsinicioComponent"],
        _componentes_contenido_inicio_contenido_inicio_component__WEBPACK_IMPORTED_MODULE_17__["ContenidoInicioComponent"],
        _paginas_arbol_cst_arbol_cst_component__WEBPACK_IMPORTED_MODULE_22__["ArbolCstComponent"],
        _paginas_gramatical_report_gramatical_report_component__WEBPACK_IMPORTED_MODULE_23__["GramaticalReportComponent"],
        _paginas_ast_desc_ast_desc_component__WEBPACK_IMPORTED_MODULE_24__["AstDescComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
        ng2_codemirror__WEBPACK_IMPORTED_MODULE_20__["CodemirrorModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_10__["BrowserAnimationsModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__["MatSidenavModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_12__["MatListModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__["MatTabsModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_16__["MatButtonToggleModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_18__["MatInputModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_19__["MatTableModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_21__["MatDialogModule"]] }); })();


/***/ }),

/***/ "cikY":
/*!*******************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Excepciones/NodoErrores.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NodoErrores; });
class NodoErrores {
    constructor(tipo, desc, fila, columna) {
        this.tipoError = tipo;
        this.desc = desc;
        this.fila = fila;
        this.columna = columna;
    }
    getDesc() {
        return this.desc;
    }
    getTipoError() {
        return this.tipoError;
    }
    getcolumna() {
        return this.columna;
    }
    getFila() {
        return this.fila;
    }
    returnError() {
        return ('Se obtuvo: ' +
            this.tipoError +
            ' desc:{' +
            this.desc +
            '} en la fila: ' +
            this.fila +
            ' en la columna: ' +
            this.columna +
            '\n');
    }
}


/***/ }),

/***/ "g7AS":
/*!********************************************************************!*\
  !*** ./src/app/paginas/tabla-simbolos/tabla-simbolos.component.ts ***!
  \********************************************************************/
/*! exports provided: TablaSimbolosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablaSimbolosComponent", function() { return TablaSimbolosComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ "+0xr");


function TablaSimbolosComponent_th_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Id. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TablaSimbolosComponent_td_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r16.identificador, " ");
} }
function TablaSimbolosComponent_th_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Tipo ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TablaSimbolosComponent_td_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r17.forma, " ");
} }
function TablaSimbolosComponent_th_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " TipoDato ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TablaSimbolosComponent_td_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r18.tipo, " ");
} }
function TablaSimbolosComponent_th_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Entorno ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TablaSimbolosComponent_td_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r19.entorno, " ");
} }
function TablaSimbolosComponent_th_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Linea ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TablaSimbolosComponent_td_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r20.linea, " ");
} }
function TablaSimbolosComponent_th_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Columna ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TablaSimbolosComponent_td_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r21.columna, " ");
} }
function TablaSimbolosComponent_th_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Valor ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TablaSimbolosComponent_td_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r22 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r22.valor, " ");
} }
function TablaSimbolosComponent_tr_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 15);
} }
function TablaSimbolosComponent_tr_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 16);
} }
class TablaSimbolosComponent {
    constructor() {
        this.displayedColumns = [
            'ID',
            'TIPO',
            'TIPODATO',
            'ENTORNO',
            'LINEA',
            'COLUMNA',
            'VALOR',
        ];
        this.dataSource = '';
    }
    ngOnInit() {
        let info = window.localStorage.getItem('simbolos');
        let otro = JSON.parse(info);
        this.dataSource = otro;
    }
}
TablaSimbolosComponent.ɵfac = function TablaSimbolosComponent_Factory(t) { return new (t || TablaSimbolosComponent)(); };
TablaSimbolosComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TablaSimbolosComponent, selectors: [["app-tabla-simbolos"]], decls: 27, vars: 3, consts: [[1, "tabla"], ["mat-table", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "ID"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "TIPO"], ["matColumnDef", "TIPODATO"], ["matColumnDef", "ENTORNO"], ["matColumnDef", "LINEA"], ["matColumnDef", "COLUMNA"], ["matColumnDef", "VALOR"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""]], template: function TablaSimbolosComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "TABLA DE SIMBOLOS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](4, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, TablaSimbolosComponent_th_5_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, TablaSimbolosComponent_td_6_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](7, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, TablaSimbolosComponent_th_8_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, TablaSimbolosComponent_td_9_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](10, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, TablaSimbolosComponent_th_11_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, TablaSimbolosComponent_td_12_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](13, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, TablaSimbolosComponent_th_14_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, TablaSimbolosComponent_td_15_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](16, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, TablaSimbolosComponent_th_17_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, TablaSimbolosComponent_td_18_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](19, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, TablaSimbolosComponent_th_20_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, TablaSimbolosComponent_td_21_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](22, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, TablaSimbolosComponent_th_23_Template, 2, 0, "th", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, TablaSimbolosComponent_td_24_Template, 2, 1, "td", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, TablaSimbolosComponent_tr_25_Template, 1, 0, "tr", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, TablaSimbolosComponent_tr_26_Template, 1, 0, "tr", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
    } }, directives: [_angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatRow"]], styles: ["table[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  width: 98%;\r\n  margin-top: 1%;\r\n  margin-bottom: 1%;\r\n  margin-left: 1%;\r\n  background-color: #a97061;\r\n}\r\nh1[_ngcontent-%COMP%] {\r\n  margin-left: 35%;\r\n  margin-top: 5%;\r\n  margin-bottom: 5%;\r\n  font-size: 50px;\r\n  font-family: \"Franklin Gothic Medium\", \"Arial Narrow\", Arial, sans-serif;\r\n  background-color: transparent;\r\n}\r\n.tabla[_ngcontent-%COMP%] {\r\n  border: 2px solid #67676f;\r\n  margin: auto;\r\n  width: 90%;\r\n  height: auto;\r\n  overflow: hidden;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYmxhLXNpbWJvbG9zLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLHlCQUF5QjtBQUMzQjtBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLHdFQUF3RTtFQUN4RSw2QkFBNkI7QUFDL0I7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osVUFBVTtFQUNWLFlBQVk7RUFDWixnQkFBZ0I7QUFDbEIiLCJmaWxlIjoidGFibGEtc2ltYm9sb3MuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgd2lkdGg6IDk4JTtcclxuICBtYXJnaW4tdG9wOiAxJTtcclxuICBtYXJnaW4tYm90dG9tOiAxJTtcclxuICBtYXJnaW4tbGVmdDogMSU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2E5NzA2MTtcclxufVxyXG5oMSB7XHJcbiAgbWFyZ2luLWxlZnQ6IDM1JTtcclxuICBtYXJnaW4tdG9wOiA1JTtcclxuICBtYXJnaW4tYm90dG9tOiA1JTtcclxuICBmb250LXNpemU6IDUwcHg7XHJcbiAgZm9udC1mYW1pbHk6IFwiRnJhbmtsaW4gR290aGljIE1lZGl1bVwiLCBcIkFyaWFsIE5hcnJvd1wiLCBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxufVxyXG4udGFibGEge1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICM2NzY3NmY7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIHdpZHRoOiA5MCU7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "gX41":
/*!********************************************************!*\
  !*** ./src/app/paginas/ast-desc/ast-desc.component.ts ***!
  \********************************************************/
/*! exports provided: AstDescComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AstDescComponent", function() { return AstDescComponent; });
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vis */ "TycK");
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vis__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class AstDescComponent {
    constructor() {
        this.contador = 1;
        this.cuerpo = '';
        this.dataSource = '';
        this.nodes = null;
        this.edges = null;
        this.network = null;
        this.directionInput = document.getElementById("direction");
        this.c = 0;
    }
    ngOnInit() {
        this.nodes = [];
        this.edges = [];
        var connectionCount = [];
        let info = window.localStorage.getItem('simbolos1');
        let contenido = JSON.parse(info);
        console.log(contenido);
        var nivel = 0;
        this.nodes.push({ id: this.c, label: this.getValor(contenido), nivel: nivel });
        this.nodes[this.c]["level"] = nivel;
        var hijos = this.recorrerAST(this.c, contenido, nivel);
        console.log(hijos);
        for (let nodo of hijos.nodos) {
            this.nodes.push({ id: nodo.id, label: nodo.label });
        }
        for (let enlace of hijos.enlaces) {
            this.edges.push({ from: enlace.id1, to: enlace.id2 });
        }
        for (let nodo of hijos.nodos) {
            this.nodes[nodo.id]["level"] = nodo.nivel;
        }
        var container = document.getElementById("mynetwork");
        var data = {
            nodes: this.nodes,
            edges: this.edges,
        };
        var options = {
            nodes: {
                borderWidth: 2,
                size: 30,
                color: {
                    border: '#46304E',
                    background: '#D297E9',
                },
                font: {
                    color: "#000000",
                    face: 'Century Gothic'
                }
            },
            edges: {
                smooth: {
                    type: "cubicBezier",
                    forceDirection: "vertical",
                    roundness: 0.4,
                }
            },
            layout: {
                randomSeed: undefined,
                improvedLayout: true,
                hierarchical: {
                    direction: "UD",
                    sortMethod: "hubsize"
                },
            },
            physics: false,
        };
        this.network = new vis__WEBPACK_IMPORTED_MODULE_0__["Network"](container, data, options);
        this.network.on("select", function (params) {
            document.getElementById("selection").innerText =
                "Selection: " + params.nodes;
        });
        let registros = [];
    }
    destroy() {
        if (this.network !== null) {
            this.network.destroy();
            this.network = null;
        }
    }
    recorrerAST(padre, nPadre, nivel) {
        var arr = { nodos: [], enlaces: [] };
        for (let hijo of this.getHijos(nPadre)) {
            nivel++;
            this.c++;
            arr.enlaces.push({ id1: padre, id2: this.c });
            arr.nodos.push({ id: this.c, label: this.getValor(hijo), nivel: nivel });
            var resultado = this.recorrerAST(this.c, hijo, nivel);
            arr.enlaces = arr.enlaces.concat(resultado.enlaces);
            arr.nodos = arr.nodos.concat(resultado.nodos);
        }
        return arr;
    }
    getValor(nodo) {
        return nodo.valor;
    }
    getHijos(nodo) {
        return nodo.listaNodos;
    }
}
AstDescComponent.ɵfac = function AstDescComponent_Factory(t) { return new (t || AstDescComponent)(); };
AstDescComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AstDescComponent, selectors: [["app-ast-desc"]], decls: 1, vars: 0, consts: [["id", "mynetwork"]], template: function AstDescComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 0);
    } }, styles: ["#mynetwork[_ngcontent-%COMP%] {\r\n    width: 1362px;\r\n    height: 595px;\r\n    border: 1px solid rgb(221, 58, 58);\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzdC1kZXNjLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiLGtDQUFrQztFQUNwQyIsImZpbGUiOiJhc3QtZGVzYy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI215bmV0d29yayB7XHJcbiAgICB3aWR0aDogMTM2MnB4O1xyXG4gICAgaGVpZ2h0OiA1OTVweDtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyMjEsIDU4LCA1OCk7XHJcbiAgfSJdfQ== */"] });


/***/ }),

/***/ "kaQ3":
/*!****************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/XMLgraph.js ***!
  \****************************************************/
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
var XMLgraph = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [2, 11], $V1 = [1, 3], $V2 = [1, 4], $V3 = [1, 5], $V4 = [5, 9, 10, 13, 16, 17], $V5 = [1, 11], $V6 = [2, 14], $V7 = [10, 12, 14, 15], $V8 = [5, 10, 16], $V9 = [1, 19];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "START": 3, "OBJETO": 4, "EOF": 5, "INSTRUCCION": 6, "CUERPO": 7, "OBJETOS": 8, "MENORQUEESPECIAL": 9, "IDENTIFICADOR": 10, "L_ATRIBUTOS": 11, "MAYORQUEESPECIAL": 12, "MENORQUE": 13, "SELFCLOSE": 14, "MAYORQUE": 15, "SALIDA": 16, "COMENTARIOS": 17, "ATRIBUTO": 18, "IGUAL": 19, "CADENA": 20, "QUOTE": 21, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 7: "CUERPO", 9: "MENORQUEESPECIAL", 10: "IDENTIFICADOR", 12: "MAYORQUEESPECIAL", 13: "MENORQUE", 14: "SELFCLOSE", 15: "MAYORQUE", 16: "SALIDA", 17: "COMENTARIOS", 19: "IGUAL", 20: "CADENA", 21: "QUOTE" },
        productions_: [0, [3, 2], [6, 1], [6, 1], [8, 2], [8, 1], [4, 5], [4, 5], [4, 8], [4, 7], [4, 1], [4, 0], [11, 2], [11, 1], [11, 0], [18, 3], [18, 3]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return "<START> ::= <OBJETO> <EOF>\n" + $$[$0 - 1];
                    break;
                case 2:
                    this.$ = $$[$0] + "<INSTRUCCION> ::= <CUERPO>\n" + "<INSTRUCCION> ::= " + " \n";
                    break;
                case 3:
                    this.$ = $$[$0] + "<INSTRUCCION> ::= <OBJETOS>\n";
                    break;
                case 4:
                    this.$ = "<OBJETOS> ::= <OBJETOS><OBJETO>\n" + $$[$0 - 1] + $$[$0];
                    break;
                case 5:
                    this.$ = "<OBJETOS> ::= <OBJETO>\n" + $$[$0];
                    break;
                case 6:
                    this.$ = "<OBJETO> ::= <MENORQUEESPECIAL> <IDENTIFICADOR> <L_ATRIBUTOS> <MAYORQUEESPECIAL> <INSTRUCCION>\n<OBJETO> ::= <?" + $$[$0 - 3] + " " + $$[$0 - 2] + "?>\n" + $$[$0];
                    break;
                case 7:
                    this.$ = "<OBJETO> ::= <MENORQUE> <IDENTIFICADOR> <L_ATRIBUTOS> <SELFCLOSE> <INSTRUCCION>\n<OBJETO> ::= <" + $$[$0 - 3] + " " + $$[$0 - 2] + "/>\n" + $$[$0];
                    break;
                case 8:
                    this.$ = "<OBJETO> ::= <MENORQUE> <IDENTIFICADOR> <L_ATRIBUTOS> <MAYORQUE> <INSTRUCCION> <SALIDA> <IDENTIFICADOR> <MAYORQUE>\n<OBJETO> ::= <" + $$[$0 - 6] + $$[$0 - 5] + ">\n" + $$[$0 - 3] + "<" + $$[$0 - 1] + ">\n";
                    break;
                case 9:
                    this.$ = "<OBJETO> ::= <MENORQUE> <IDENTIFICADOR> <L_ATRIBUTOS> <MAYORQUE> <INSTRUCCION> <IDENTIFICADOR> <MAYORQUE>\n<OBJETO> ::= <" + $$[$0 - 5] + $$[$0 - 4] + ">\n" + $$[$0 - 2] + "<" + $$[$0 - 1] + ">\n";
                    break;
                case 10:
                    this.$ = "<OBJETO> ::= <COMENTARIOS>\n<OBJETO> ::= <!--" + $$[$0] + "-->\n";
                    break;
                case 11:
                case 14:
                    this.$ = "";
                    break;
                case 12:
                    this.$ = "<L_ATRIBUTOS> ::= <L_ATRIBUTOS><ATRIBUTO>\n" + $$[$0 - 1] + $$[$0] + "\n";
                    break;
                case 13:
                    this.$ = "<L_ATRIBUTOS> ::= <ATRIBUTO>\n" + $$[$0] + "\n";
                    break;
                case 15:
                case 16:
                    this.$ = "<ATRIBUTO> ::= <IDENTIFICADOR><IGUAL><CADENA>\n<ATRIBUTO> ::= " + $$[$0 - 2] + "= \"" + $$[$0] + "\"\n";
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 5: $V0, 9: $V1, 13: $V2, 17: $V3 }, { 1: [3] }, { 5: [1, 6] }, { 10: [1, 7] }, { 10: [1, 8] }, o($V4, [2, 10]), { 1: [2, 1] }, { 10: $V5, 11: 9, 12: $V6, 18: 10 }, o([14, 15], $V6, { 18: 10, 11: 12, 10: $V5 }), { 10: $V5, 12: [1, 13], 18: 14 }, o($V7, [2, 13]), { 19: [1, 15] }, { 10: $V5, 14: [1, 16], 15: [1, 17], 18: 14 }, o($V8, $V0, { 6: 18, 8: 20, 4: 21, 7: $V9, 9: $V1, 13: $V2, 17: $V3 }), o($V7, [2, 12]), { 20: [1, 22], 21: [1, 23] }, o($V8, $V0, { 8: 20, 4: 21, 6: 24, 7: $V9, 9: $V1, 13: $V2, 17: $V3 }), o([10, 16], $V0, { 8: 20, 4: 21, 6: 25, 7: $V9, 9: $V1, 13: $V2, 17: $V3 }), o($V4, [2, 6]), o($V4, [2, 2]), o($V8, [2, 3], { 4: 26, 9: $V1, 13: $V2, 17: $V3 }), o($V4, [2, 5]), o($V7, [2, 15]), o($V7, [2, 16]), o($V4, [2, 7]), { 10: [1, 28], 16: [1, 27] }, o($V4, [2, 4]), { 10: [1, 29] }, { 15: [1, 30] }, { 15: [1, 31] }, o($V4, [2, 9]), o($V4, [2, 8])],
        defaultActions: { 6: [2, 1] },
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
    var palabra = "";
    var palabra1 = "";
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
                        break;
                    case 1:
                        console.log("Comenzo el comentario");
                        this.begin("Comentario");
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        console.log("Termino el comentario");
                        this.popState();
                        break;
                    case 5:
                        console.log("Texto dentro del comentario: " + yy_.yytext + " :(");
                        return 17;
                        break;
                    case 6:
                        this.begin('cuerpo');
                        return 15;
                        break;
                    case 7:
                        this.begin('INITIAL');
                        if (palabra.replaceAll(" ", "") == "")
                            return 16;
                        yy_.yytext = palabra;
                        palabra = "";
                        if (palabra.replaceAll(" ", "") == "")
                            return 7;
                        break;
                    case 8:
                        this.begin('INITIAL');
                        return 13;
                        yy_.yytext = palabra;
                        palabra = "";
                        return 7;
                        break;
                    case 9:
                        this.begin('INITIAL');
                        return 14;
                        yy_.yytext = palabra;
                        palabra = "";
                        return 7;
                        break;
                    case 10:
                        palabra += yy_.yytext;
                        break;
                    case 11:
                        return 12;
                        break;
                    case 12:
                        return 16;
                        break;
                    case 13:
                        return 14;
                        break;
                    case 14:
                        return 9;
                        break;
                    case 15:
                        return 13;
                        break;
                    case 16:
                        return 19;
                        break;
                    case 17:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                        return 20;
                        break;
                    case 18:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                        return 21;
                        break;
                    case 19:
                        return 10;
                        break;
                    case 20:
                        return 5;
                        break;
                    case 21:
                        break;
                    case 22:
                        break;
                    case 23:
                        break;
                    case 24:
                        console.log("Error Lexico");
                        break;
                }
            },
            rules: [/^(?:\/\/.*)/i, /^(?:<!--)/i, /^(?:[ \r\t]+)/i, /^(?:\n)/i, /^(?:-->)/i, /^(?:[^"-->"]+)/i, /^(?:>)/i, /^(?:<\/)/i, /^(?:<)/i, /^(?:<)/i, /^(?:.)/i, /^(?:\?>)/i, /^(?:<\/)/i, /^(?:\/>)/i, /^(?:<\?)/i, /^(?:<)/i, /^(?:=)/i, /^(?:"[^\"]*")/i, /^(?:'[^\']*')/i, /^(?:([a-zA-Z])[a-zA-Z0-9_]*)/i, /^(?:$)/i, /^(?:[ \r\t]+)/i, /^(?:\n+)/i, /^(?:\s+)/i, /^(?:.)/i],
            conditions: { "Comentario": { "rules": [2, 3, 4, 5], "inclusive": false }, "xml": { "rules": [0, 1, 6, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "inclusive": true }, "cuerpo": { "rules": [0, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "inclusive": true }, "INITIAL": { "rules": [0, 1, 6, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "inclusive": true } }
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
    exports.parser = XMLgraph;
    exports.Parser = XMLgraph.Parser;
    exports.parse = function () { return XMLgraph.parse.apply(XMLgraph, arguments); };
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "nUj/":
/*!****************************************************************!*\
  !*** ./src/app/componentes/tabsinicio/tabsinicio.component.ts ***!
  \****************************************************************/
/*! exports provided: TabsinicioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsinicioComponent", function() { return TabsinicioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _contenido_inicio_contenido_inicio_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contenido-inicio/contenido-inicio.component */ "CbqC");



class TabsinicioComponent {
    constructor() { }
    ngOnInit() {
    }
}
TabsinicioComponent.ɵfac = function TabsinicioComponent_Factory(t) { return new (t || TabsinicioComponent)(); };
TabsinicioComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TabsinicioComponent, selectors: [["app-tabsinicio"]], decls: 7, vars: 0, consts: [["dynamicHeight", ""], ["label", "CONTENIDO 1"], ["label", "CONTENIDO 2"], ["label", "CONTENIDO 3"]], template: function TabsinicioComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab-group", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-contenido-inicio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-contenido-inicio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "app-contenido-inicio");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_tabs__WEBPACK_IMPORTED_MODULE_1__["MatTabGroup"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_1__["MatTab"], _contenido_inicio_contenido_inicio_component__WEBPACK_IMPORTED_MODULE_2__["ContenidoInicioComponent"]], styles: [".example-small-box[_ngcontent-%COMP%], .example-large-box[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  margin: 16px;\r\n  padding: 16px;\r\n  border-radius: 8px;\r\n}\r\n\r\n.example-small-box[_ngcontent-%COMP%] {\r\n  height: 100px;\r\n  width: 100px;\r\n}\r\n\r\n.example-large-box[_ngcontent-%COMP%] {\r\n  height: 300px;\r\n  width: 300px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYnNpbmljaW8uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUFFRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsWUFBWTtBQUNkIiwiZmlsZSI6InRhYnNpbmljaW8uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLXNtYWxsLWJveCxcclxuLmV4YW1wbGUtbGFyZ2UtYm94IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgbWFyZ2luOiAxNnB4O1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1zbWFsbC1ib3gge1xyXG4gIGhlaWdodDogMTAwcHg7XHJcbiAgd2lkdGg6IDEwMHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1sYXJnZS1ib3gge1xyXG4gIGhlaWdodDogMzAwcHg7XHJcbiAgd2lkdGg6IDMwMHB4O1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "ob2c":
/*!************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Simbolos/Simbolo.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Simbolo; });
class Simbolo {
    constructor(tipo, identificador, valor) {
        this.atributo = new Map();
        this.tipo = tipo;
        this.identificador = identificador.toLowerCase();
        this.valor = valor;
    }
    //getters y setters
    gettipo() {
        return this.tipo;
    }
    settipo(value) {
        this.tipo = value;
    }
    getidentificador() {
        return this.identificador;
    }
    setidentificador(value) {
        this.identificador = value;
    }
    getvalor() {
        return this.valor;
    }
    setvalor(value) {
        this.valor = value;
    }
    agregarAtributo(par1, par2) {
        this.atributo.set(par1, par2);
    }
    getAtributo() {
        return this.atributo;
    }
    setAtributo(atributo) {
        this.atributo = atributo;
    }
}


/***/ }),

/***/ "pcrZ":
/*!******************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/GramaticaXMLDescPRUEBA.js ***!
  \******************************************************************/
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
var GramaticaXMLDescPRUEBA = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [1, 3], $V1 = [1, 4], $V2 = [1, 5], $V3 = [5, 9, 10, 13, 16, 17], $V4 = [1, 11], $V5 = [2, 15], $V6 = [12, 14, 15], $V7 = [5, 10, 16], $V8 = [2, 6], $V9 = [1, 19], $Va = [10, 12, 14, 15];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "START": 3, "OBJETO": 4, "EOF": 5, "INSTRUCCION": 6, "CUERPO": 7, "OBJETOS": 8, "MENORQUEESPECIAL": 9, "IDENTIFICADOR": 10, "L_ATRIBUTOS": 11, "MAYORQUEESPECIAL": 12, "MENORQUE": 13, "SELFCLOSE": 14, "MAYORQUE": 15, "SALIDA": 16, "COMENTARIOS": 17, "ATRIBUTO": 18, "IGUAL": 19, "CADENA": 20, "QUOTE": 21, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 7: "CUERPO", 9: "MENORQUEESPECIAL", 10: "IDENTIFICADOR", 12: "MAYORQUEESPECIAL", 13: "MENORQUE", 14: "SELFCLOSE", 15: "MAYORQUE", 16: "SALIDA", 17: "COMENTARIOS", 19: "IGUAL", 20: "CADENA", 21: "QUOTE" },
        productions_: [0, [3, 2], [6, 1], [6, 1], [8, 2], [8, 1], [8, 0], [4, 5], [4, 5], [4, 8], [4, 7], [4, 1], [4, 0], [11, 2], [11, 1], [11, 0], [18, 3], [18, 3]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    console.log($$[$0 - 1]);
                    return $$[$0 - 1];
                    break;
                case 2:
                case 3:
                    this.$ = $$[$0];
                    break;
                case 4:
                    $$[$0].push($$[$0 - 1]);
                    this.$ = $$[$0];
                    break;
                case 5:
                    this.$ = [$$[$0]];
                    break;
                case 7:
                case 8:
                    this.$ = new objeto.default($$[$0 - 3], null, $$[$0 - 2], $$[$0], _$[$0 - 4].first_line, _$[$0 - 4].first_column);
                    break;
                case 9:
                    this.$ = new objeto.default($$[$0 - 6], null, $$[$0 - 5], $$[$0 - 3], _$[$0 - 7].first_line, _$[$0 - 7].first_column);
                    break;
                case 10:
                    this.$ = new objeto.default($$[$0 - 5], $$[$0 - 2], $$[$0 - 4], null, _$[$0 - 6].first_line, _$[$0 - 6].first_column);
                    break;
                case 11:
                    this.$ = "<!-- " + $$[$0] + " --!>";
                    break;
                case 12:
                    this.$ = "";
                    break;
                case 13:
                    $$[$0].push($$[$0 - 1]);
                    this.$ = $$[$0];
                    break;
                case 14:
                    this.$ = [$$[$0]];
                    break;
                case 16:
                case 17:
                    this.$ = new atributo.default($$[$0 - 2], $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 5: [2, 12], 9: $V0, 13: $V1, 17: $V2 }, { 1: [3] }, { 5: [1, 6] }, { 10: [1, 7] }, { 10: [1, 8] }, o($V3, [2, 11]), { 1: [2, 1] }, { 10: $V4, 11: 9, 12: $V5, 18: 10 }, o([14, 15], $V5, { 18: 10, 11: 12, 10: $V4 }), { 12: [1, 13] }, o($V6, [2, 14], { 18: 10, 11: 14, 10: $V4 }), { 19: [1, 15] }, { 14: [1, 16], 15: [1, 17] }, o($V7, $V8, { 6: 18, 8: 20, 4: 21, 7: $V9, 9: $V0, 13: $V1, 17: $V2 }), o($V6, [2, 13]), { 20: [1, 22], 21: [1, 23] }, o($V7, $V8, { 8: 20, 4: 21, 6: 24, 7: $V9, 9: $V0, 13: $V1, 17: $V2 }), o([10, 16], $V8, { 8: 20, 4: 21, 6: 25, 7: $V9, 9: $V0, 13: $V1, 17: $V2 }), o($V3, [2, 7]), o($V3, [2, 2]), o($V3, [2, 3]), o($V7, [2, 5], { 4: 21, 8: 26, 9: $V0, 13: $V1, 17: $V2 }), o($Va, [2, 16]), o($Va, [2, 17]), o($V3, [2, 8]), { 10: [1, 28], 16: [1, 27] }, o($V3, [2, 4]), { 10: [1, 29] }, { 15: [1, 30] }, { 15: [1, 31] }, o($V3, [2, 10]), o($V3, [2, 9])],
        defaultActions: { 6: [2, 1] },
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
    const atributo = __webpack_require__(/*! ./Expresiones/Atributo */ "uvkm");
    const tipo = __webpack_require__(/*! ./Simbolos/Tipo */ "Oyrp");
    const objeto = __webpack_require__(/*! ./Expresiones/Objeto */ "xzWR");
    const CErrores = __webpack_require__(/*! ./Excepciones/Errores */ "Vgfr");
    const CNodoErrores = __webpack_require__(/*! ./Excepciones/NodoErrores */ "cikY");
    const inicio = __webpack_require__(/*! ../../../componentes/contenido-inicio/contenido-inicio.component */ "CbqC");
    var palabra = "";
    var palabra1 = "";
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
                        break;
                    case 1:
                        console.log("Comenzo el comentario");
                        this.begin("Comentario");
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        console.log("Termino el comentario");
                        this.popState();
                        break;
                    case 5:
                        console.log("Texto dentro del comentario: " + yy_.yytext + " :(");
                        return 17;
                        break;
                    case 6:
                        this.begin('cuerpo');
                        return 15;
                        break;
                    case 7:
                        this.begin('INITIAL');
                        if (palabra.replaceAll(" ", "") == "")
                            return 16;
                        yy_.yytext = palabra;
                        palabra = "";
                        if (palabra.replaceAll(" ", "") == "")
                            return 7;
                        break;
                    case 8:
                        this.begin('INITIAL');
                        return 13;
                        yy_.yytext = palabra;
                        palabra = "";
                        return 7;
                        break;
                    case 9:
                        this.begin('INITIAL');
                        return 14;
                        yy_.yytext = palabra;
                        palabra = "";
                        return 7;
                        break;
                    case 10:
                        palabra += yy_.yytext;
                        break;
                    case 11:
                        return 12;
                        break;
                    case 12:
                        return 16;
                        break;
                    case 13:
                        return 14;
                        break;
                    case 14:
                        return 9;
                        break;
                    case 15:
                        return 13;
                        break;
                    case 16:
                        return 19;
                        break;
                    case 17:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                        return 20;
                        break;
                    case 18:
                        yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                        return 21;
                        break;
                    case 19:
                        return 10;
                        break;
                    case 20:
                        return 5;
                        break;
                    case 21:
                        break;
                    case 22:
                        break;
                    case 23:
                        break;
                    case 24:
                        inicio.listaErrores.push(new CNodoErrores.default("Lexico", "No se esperaba el caracter: " + yy_.yytext, yy_.yylloc.first_line, yy_.yylloc.first_column));
                        console.log("Lexico, No se esperaba el caracter: " + yy_.yytext + " Linea: " + yy_.yylloc.first_line + "Columna: " + yy_.yylloc.first_column);
                        break;
                }
            },
            rules: [/^(?:\/\/.*)/i, /^(?:<!--)/i, /^(?:[ \r\t]+)/i, /^(?:\n)/i, /^(?:-->)/i, /^(?:[^"-->"]+)/i, /^(?:>)/i, /^(?:<\/)/i, /^(?:<)/i, /^(?:<)/i, /^(?:.)/i, /^(?:\?>)/i, /^(?:<\/)/i, /^(?:\/>)/i, /^(?:<\?)/i, /^(?:<)/i, /^(?:=)/i, /^(?:"[^\"]*")/i, /^(?:'[^\']*')/i, /^(?:([a-zA-Z])[a-zA-Z0-9_]*)/i, /^(?:$)/i, /^(?:[ \r\t]+)/i, /^(?:\n+)/i, /^(?:\s+)/i, /^(?:.)/i],
            conditions: { "Comentario": { "rules": [2, 3, 4, 5], "inclusive": false }, "xml": { "rules": [0, 1, 6, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "inclusive": true }, "cuerpo": { "rules": [0, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "inclusive": true }, "INITIAL": { "rules": [0, 1, 6, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], "inclusive": true } }
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
    exports.parser = GramaticaXMLDescPRUEBA;
    exports.Parser = GramaticaXMLDescPRUEBA.Parser;
    exports.parse = function () { return GramaticaXMLDescPRUEBA.parse.apply(GramaticaXMLDescPRUEBA, arguments); };
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "uvkm":
/*!****************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Expresiones/Atributo.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Atributo; });
/* harmony import */ var src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Abstracto/nodoAST */ "2sLK");
/* harmony import */ var src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Simbolos/Tipo */ "Oyrp");
/* harmony import */ var src_app_Backend_XML_Analizador_Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Abstracto/Instruccion */ "9iyb");




class Atributo extends src_app_Backend_XML_Analizador_Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_2__["Instruccion"] {
    constructor(identificador, valor, linea, columna) {
        super(new src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"](src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipoDato"].CADENA), linea, columna);
        this.identificador = identificador;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        return { identificador: this.identificador, valor: this.valor };
    }
    getNodo() {
        let nodo = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_0__["default"]('ATRIBUTO'); //PADRE ATRIBUTO
        var padreidentificador = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_0__["default"]('IDENTIFICADOR'); //PADRE IDENTIFICADOR
        padreidentificador.agregarHijo(this.identificador);
        nodo.agregarHijoAST(padreidentificador);
        let igual = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_0__["default"]('=');
        nodo.agregarHijoAST(igual);
        var padre = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_0__["default"]("VALOR"); //PADRE IDENTIFICADOR
        padre.agregarHijo(this.valor);
        nodo.agregarHijoAST(padre);
        return nodo;
    }
}


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
/* harmony import */ var _paginas_arbol_ast_arbol_ast_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paginas/arbol-ast/arbol-ast.component */ "OBp0");
/* harmony import */ var _paginas_errores_errores_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./paginas/errores/errores.component */ "Er68");
/* harmony import */ var _paginas_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./paginas/inicio/inicio.component */ "U3hP");
/* harmony import */ var _paginas_tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./paginas/tabla-simbolos/tabla-simbolos.component */ "g7AS");
/* harmony import */ var _paginas_arbol_cst_arbol_cst_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./paginas/arbol-cst/arbol-cst.component */ "T1j4");
/* harmony import */ var _paginas_gramatical_report_gramatical_report_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./paginas/gramatical-report/gramatical-report.component */ "LdXe");
/* harmony import */ var _paginas_ast_desc_ast_desc_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./paginas/ast-desc/ast-desc.component */ "gX41");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");










const routes = [
    { path: 'gramatical', component: _paginas_gramatical_report_gramatical_report_component__WEBPACK_IMPORTED_MODULE_6__["GramaticalReportComponent"] },
    // { path: 'gramatical', component: ErroresComponent },
    { path: 'ast', component: _paginas_arbol_ast_arbol_ast_component__WEBPACK_IMPORTED_MODULE_1__["ArbolASTComponent"] },
    { path: 'ast-desc', component: _paginas_ast_desc_ast_desc_component__WEBPACK_IMPORTED_MODULE_7__["AstDescComponent"] },
    { path: 'cst', component: _paginas_arbol_cst_arbol_cst_component__WEBPACK_IMPORTED_MODULE_5__["ArbolCstComponent"] },
    { path: 'errores', component: _paginas_errores_errores_component__WEBPACK_IMPORTED_MODULE_2__["ErroresComponent"] },
    { path: 'inicio', component: _paginas_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_3__["InicioComponent"] },
    // { path: 'cst', component: InicioComponent },
    { path: 'simbolos', component: _paginas_tabla_simbolos_tabla_simbolos_component__WEBPACK_IMPORTED_MODULE_4__["TablaSimbolosComponent"] },
    { path: '', component: _paginas_inicio_inicio_component__WEBPACK_IMPORTED_MODULE_3__["InicioComponent"] },
    { path: '**', redirectTo: '' },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "xzWR":
/*!**************************************************************!*\
  !*** ./src/app/Backend/XML/Analizador/Expresiones/Objeto.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Objeto; });
/* harmony import */ var src_app_Backend_XML_Analizador_Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Abstracto/Instruccion */ "9iyb");
/* harmony import */ var src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Abstracto/nodoAST */ "2sLK");
/* harmony import */ var src_app_Backend_XML_Analizador_Simbolos_Simbolo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Simbolos/Simbolo */ "ob2c");
/* harmony import */ var src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Backend/XML/Analizador/Simbolos/Tipo */ "Oyrp");
/* harmony import */ var _Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Simbolos/tablaSimbolos */ "TD3t");
/* harmony import */ var _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Excepciones/NodoErrores */ "cikY");
/* harmony import */ var src_app_componentes_contenido_inicio_contenido_inicio_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/componentes/contenido-inicio/contenido-inicio.component */ "CbqC");







class Objeto extends src_app_Backend_XML_Analizador_Abstracto_Instruccion__WEBPACK_IMPORTED_MODULE_0__["Instruccion"] {
    constructor(identificador, contenido, listaAtributos = [], listaObjetos, linea, columna) {
        super(new src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].OBJETO), linea, columna);
        this.identificador = identificador;
        this.contenido = contenido;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaObjetos;
        this.linea = linea;
        this.columna = columna;
    }
    interpretar(arbol, tabla) {
        var simbolo;
        if (this.listaAtributos != null) {
            for (let i of this.listaAtributos) {
                var s = i.interpretar(arbol, tabla);
                if (s.identificador == "encoding") {
                    console.log(s.valor);
                    arbol.setEncoding(s.valor);
                }
            }
        }
        if (this.listaObjetos != null) {
            var ts = new _Simbolos_tablaSimbolos__WEBPACK_IMPORTED_MODULE_4__["default"](); /*entorno hijo */
            for (let i of this.listaObjetos) {
                var r = i.interpretar(arbol, tabla); /* Obtiene el objeto hijo */
                ts.setVariable(r);
            }
            simbolo = new src_app_Backend_XML_Analizador_Simbolos_Simbolo__WEBPACK_IMPORTED_MODULE_2__["default"](new src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].OBJETO), this.identificador, ts);
        }
        else if (this.contenido != null) {
            console.log(arbol.getEncoding());
            //if o switch buscando codificacion
            if (arbol.getEncoding() == "UTF-8") {
                this.contenido = encodeURI(this.contenido);
            } /*else if(arbol.getEncoding()=="ISO-8859-1"){
             // nuevocontenido.
            }*/
            else if (arbol.getEncoding() == "ASCII") {
                console.log(this.getCharCodes(this.contenido));
                this.contenido = this.getCharCodes(this.contenido) + "";
            }
            else {
                this.contenido = this.contenido;
            }
            simbolo = new src_app_Backend_XML_Analizador_Simbolos_Simbolo__WEBPACK_IMPORTED_MODULE_2__["default"](new src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"](src_app_Backend_XML_Analizador_Simbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipoDato"].OBJETO), this.identificador, this.contenido);
        }
        else {
            src_app_componentes_contenido_inicio_contenido_inicio_component__WEBPACK_IMPORTED_MODULE_6__["listaErrores"].push(new _Excepciones_NodoErrores__WEBPACK_IMPORTED_MODULE_5__["default"]('SEMANTICO', this.identificador + ' Datos nulos', this.fila, this.columna));
        }
        if (this.listaAtributos != null) {
            for (let i of this.listaAtributos) {
                var s = i.interpretar(arbol, tabla);
                simbolo.agregarAtributo(s.identificador, s.valor);
            }
        }
        return simbolo;
    }
    getCharCodes(s) {
        let charCodeArr = [];
        for (let i = 0; i < s.length; i++) {
            let code = s.charCodeAt(i);
            charCodeArr.push(code);
        }
        return charCodeArr;
    }
    getNodo() {
        let nodo = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('OBJETOS');
        let objectos = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('OBJETO');
        let mayor = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]("<");
        objectos.agregarHijoAST(mayor);
        var padreidentificador = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]('IDENTIFICADOR');
        padreidentificador.agregarHijo(this.identificador);
        objectos.agregarHijoAST(padreidentificador);
        let menor = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"](">");
        objectos.agregarHijoAST(menor);
        nodo.agregarHijoAST(objectos);
        if (this.contenido != null) {
            var padre = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]("INSTRUCCION");
            padre.agregarHijo(this.contenido);
            nodo.agregarHijoAST(padre);
        }
        if (this.listaAtributos != null) {
            var lista = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]("LISTA ATRIBUTOS");
            for (let i of this.listaAtributos) {
                lista.agregarHijoAST(i.getNodo());
            }
            nodo.agregarHijoAST(lista);
        }
        if (this.listaObjetos != null) {
            var lista = new src_app_Backend_XML_Analizador_Abstracto_nodoAST__WEBPACK_IMPORTED_MODULE_1__["default"]("LISTA OBJETOS");
            for (let i of this.listaObjetos) {
                lista.agregarHijoAST(i.getNodo());
            }
            nodo.agregarHijoAST(lista);
        }
        return nodo;
    }
}


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