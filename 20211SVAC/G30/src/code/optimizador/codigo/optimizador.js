"use strict";
exports.__esModule = true;
exports.Optimizacion = exports.Optimizador = void 0;
var test_1 = require("../test");
var Optimizador = /** @class */ (function () {
    function Optimizador() {
        this.cadenaOptimizada = '';
        this.cadenaInicial = '';
        this.listaInstrucciones = [];
        this.reporteOptimizacion = [];
        this.nuevasInstrucciones = [];
        this.asignacionesPrevias = [];
    }
    Optimizador.prototype.addInstruccion = function (instruccion) {
        this.listaInstrucciones.push(instruccion);
    };
    Optimizador.prototype.optimizar = function (codigo) {
        this.listaInstrucciones = [];
        // trayendo c3d del main
        this.cadenaOptimizada = '';
        console.log('cadenan1 ', this.cadenaOptimizada);
        console.log('codigo -Z', codigo);
        //metiendo el c3d al parser
        this.listaInstrucciones = test_1.parse(codigo);
        console.log(this.listaInstrucciones);
        // nuevalista.lenght = viejalista.lenght
        this.nuevasInstrucciones = this.listaInstrucciones;
        this.reglas6_16Header(this.listaInstrucciones);
        this.reglas3_4(this.listaInstrucciones);
        this.reglas1_2(this.listaInstrucciones);
        //paso el array a la cadena
        this.arrayCadena();
        console.log(this.reporteOptimizacion);
        return this.cadenaOptimizada;
    };
    Optimizador.prototype.getReporte = function () {
        console.log('geteando reporte');
        //console.log(this.reporteOptimizacion);
        return this.reporteOptimizacion;
    };
    Optimizador.prototype.reglas6_16Header = function (array) {
        var contador = 0;
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var instruccion = array_1[_i];
            //DIVIDIDOS
            if (instruccion.operador == '/') {
                if (instruccion.arg1 == '0' || instruccion.arg2 == '0') {
                    // si cumple con todas las condiciones de 16 
                    var regla = '16';
                    this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = 0;';
                    this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                }
                if (instruccion.arg2 == '1') {
                    if (instruccion.arg1 == instruccion.resultado) {
                        var regla = '9';
                        this.nuevasInstrucciones[contador].cadena = '';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                    }
                    else {
                        var regla = '13';
                        this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg1 + ';';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                    }
                }
            }
            // MULTIPLICADOS
            if (instruccion.operador == '*') {
                if (instruccion.arg1 == '0' || instruccion.arg2 == '0') {
                    // si cumple con todas las condiciones de 15
                    var regla = '15';
                    this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = 0;';
                    this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                }
                if (instruccion.arg1 == '1') {
                    if (instruccion.arg2 == instruccion.resultado) {
                        var regla = '8';
                        this.nuevasInstrucciones[contador].cadena = '';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                    }
                    else {
                        var regla = '12';
                        this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg2 + ';';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                    }
                }
                else if (instruccion.arg2 == '1') {
                    if (instruccion.arg1 == instruccion.resultado) {
                        var regla = '8';
                        this.nuevasInstrucciones[contador].cadena = '';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                    }
                    else {
                        var regla = '12';
                        this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg1 + ';';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                    }
                }
                if (instruccion.arg1 == '2') {
                    // si no es un  numero = es un temporal o un id. Si es un temp o un id, lo sumo.
                    if (isNaN(parseInt(instruccion.arg2))) {
                        // si cumple con todas las condiciones de 14
                        var regla = '14';
                        this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg2 + ' + ' + instruccion.arg2 + ';';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                    }
                }
                else if (instruccion.arg2 == '2') {
                    if (isNaN(parseInt(instruccion.arg1))) {
                        // si cumple con todas las condiciones de 14
                        var regla = '14';
                        this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg1 + ' + ' + instruccion.arg1 + ';';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                    }
                }
            }
            // MENOS
            if (instruccion.operador == '-') {
                if (instruccion.arg2 == '0') {
                    if (instruccion.resultado == instruccion.arg1) {
                        var regla = '7';
                        this.nuevasInstrucciones[contador].cadena = '';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                    }
                    else {
                        var regla = '11';
                        this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg1 + ';';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                    }
                }
            }
            // MAS
            if (instruccion.operador == '+') {
                if (instruccion.arg2 == '0') {
                    if (instruccion.resultado == instruccion.arg1) {
                        var regla = '6';
                        this.nuevasInstrucciones[contador].cadena = '';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                    }
                    else {
                        //console.log('regla 10!')
                        var regla = '10';
                        this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg1 + ';';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                    }
                }
                else if (instruccion.arg1 == '0') {
                    if (instruccion.resultado == instruccion.arg2) {
                        var regla = '6';
                        this.nuevasInstrucciones[contador].cadena = '';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                    }
                    else {
                        var regla = '10';
                        this.nuevasInstrucciones[contador].cadena = instruccion.resultado + ' = ' + instruccion.arg2 + ';';
                        this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                    }
                }
            }
            //console.log('# ', contador);
            contador++;
        }
    };
    Optimizador.prototype.reglas1_2 = function (array) {
        var contador = 0;
        var regla1abierta = false;
        var eliminarabierto = false;
        for (var _i = 0, array_2 = array; _i < array_2.length; _i++) {
            var instruccion = array_2[_i];
            if (regla1abierta) {
                if (instruccion.getTipo() == 'etiqueta') {
                    // si si es, quito regla 1
                    regla1abierta = false;
                    this.nuevasInstrucciones[contador].cadena = instruccion.cadena;
                }
                else {
                    var regla = '1';
                    this.nuevasInstrucciones[contador].cadena = '';
                    this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                }
            }
            if (instruccion.getTipo() == 'salto' && !regla1abierta) {
                if (!eliminarabierto) {
                    regla1abierta = true;
                    console.log('salto detectado');
                    this.nuevasInstrucciones[contador].cadena = instruccion.cadena;
                }
                else {
                    var regla = '2';
                    this.nuevasInstrucciones[contador].cadena = '';
                    this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                }
            }
            if (instruccion.getTipo() == 'salto_condicional' && this.listaInstrucciones.length > (contador + 2)) {
                // ifs para ver si cumple con 2
                var coso = contador;
                if (this.listaInstrucciones[coso + 1].getTipo() == 'salto') {
                    if (this.listaInstrucciones[coso + 2].getTipo() == 'etiqueta') {
                        // si la etiqueta if = a la etiqueta de después, cumple con #2
                        if (this.listaInstrucciones[contador + 2].cadena.includes(instruccion.resultado)) {
                            if (instruccion.operador == '<') {
                                this.nuevasInstrucciones[contador].operador = '>';
                            }
                            else if (instruccion.operador == '>') {
                                this.nuevasInstrucciones[contador].operador = '<';
                            }
                            else if (instruccion.operador == '==') {
                                this.nuevasInstrucciones[contador].operador = '!=';
                            }
                            else if (instruccion.operador == '!=') {
                                this.nuevasInstrucciones[contador].operador = '==';
                            }
                            else if (instruccion.operador == '<=') {
                                this.nuevasInstrucciones[contador].operador = '>=';
                            }
                            else if (instruccion.operador == '>=') {
                                this.nuevasInstrucciones[contador].operador = '<=';
                            }
                            this.nuevasInstrucciones[contador].cadena = 'if ( ' + instruccion.arg1 + this.nuevasInstrucciones[contador].operador + instruccion.arg2 + ' ) ' + this.listaInstrucciones[coso + 1].cadena;
                            this.reporteOptimizacion.push(new Optimizacion(contador, '2', this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                            eliminarabierto = true;
                        }
                    }
                }
            }
            contador++;
        }
        console.log('final');
        console.log(this.nuevasInstrucciones);
    };
    Optimizador.prototype.reglas3_4 = function (array) {
        var contador = 0;
        for (var _i = 0, array_3 = array; _i < array_3.length; _i++) {
            var instruccion = array_3[_i];
            if (instruccion.getTipo() == 'salto_condicional') {
                var arg1 = parseInt(instruccion.arg1);
                var arg2 = parseInt(instruccion.arg2);
                // si los dos son números, hago para las reglas 3 y 4
                if (!isNaN(arg1) && !isNaN(arg2)) {
                    if (instruccion.operador == '==') {
                        if (arg1 == arg2) {
                            var regla = '3';
                            this.nuevasInstrucciones[contador].cadena = 'goto ' + instruccion.resultado + ';';
                            this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                        }
                        else {
                            var regla = '4';
                            this.nuevasInstrucciones[contador].cadena = '';
                            this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                        }
                    }
                    else if (instruccion.operador == '!=') {
                        if (arg1 != arg2) {
                            var regla = '3';
                            this.nuevasInstrucciones[contador].cadena = 'goto ' + instruccion.resultado + ';';
                            this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                        }
                        else {
                            var regla = '4';
                            this.nuevasInstrucciones[contador].cadena = '';
                            this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                        }
                    }
                    else if (instruccion.operador == '<=') {
                        if (arg1 <= arg2) {
                            var regla = '3';
                            this.nuevasInstrucciones[contador].cadena = 'goto ' + instruccion.resultado + ';';
                            this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                        }
                        else {
                            var regla = '4';
                            this.nuevasInstrucciones[contador].cadena = '';
                            this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                        }
                    }
                    else if (instruccion.operador == '>=') {
                        if (arg1 >= arg2) {
                            var regla = '3';
                            this.nuevasInstrucciones[contador].cadena = 'goto ' + instruccion.resultado + ';';
                            this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                        }
                        else {
                            var regla = '4';
                            this.nuevasInstrucciones[contador].cadena = '';
                            this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                        }
                    }
                    else if (instruccion.operador == '<') {
                        if (arg1 < arg2) {
                            var regla = '3';
                            this.nuevasInstrucciones[contador].cadena = 'goto ' + instruccion.resultado + ';';
                            this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                        }
                        else {
                            var regla = '4';
                            this.nuevasInstrucciones[contador].cadena = '';
                            this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                        }
                    }
                    else if (instruccion.operador == '>') {
                        if (arg1 > arg2) {
                            var regla = '3';
                            this.nuevasInstrucciones[contador].cadena = 'goto ' + instruccion.resultado + ';';
                            this.reporteOptimizacion.push(new Optimizacion(contador, regla, this.nuevasInstrucciones[contador].cadena, instruccion.cadena));
                        }
                        else {
                            var regla = '4';
                            this.nuevasInstrucciones[contador].cadena = '';
                            this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                        }
                    }
                }
            }
            if (instruccion.getTipo() == 'etiqueta') {
                this.asignacionesPrevias.push(instruccion);
            }
            if (instruccion.getTipo() == 'asignacion') {
                // si es iwal transverso al previo, elimino este
                if (instruccion.operador == '') {
                    var match = false;
                    var cont2 = 0;
                    // si es una asignación, miro si hay un H1 = H2, H2 = H1 antes.
                    // si ya encontré un match, miro que ninguno de los dos se reasigne
                    for (var _a = 0, _b = this.asignacionesPrevias; _a < _b.length; _a++) {
                        var iterator = _b[_a];
                        if ((iterator.resultado == instruccion.arg1) && (iterator.arg1 == instruccion.resultado)) {
                            match = true;
                            console.log('match!');
                            var conti = 0;
                            for (var _c = 0, _d = this.asignacionesPrevias; _c < _d.length; _c++) {
                                var cosita = _d[_c];
                                if (conti > cont2) { // si pasa después del contador en el que ando arriba
                                    console.log(cosita.resultado, ' == ', instruccion.arg1);
                                    if (cosita.resultado == instruccion.arg1 || cosita.getTipo() == 'etiqueta') {
                                        match = false;
                                        console.log('2', cosita.resultado == instruccion.arg1);
                                        console.log(cosita.getTipo() == 'etiqueta');
                                        console.log('match inverso :c');
                                        return;
                                        // si hay otra asignación o es una etiqueta, no hago nada
                                    }
                                }
                                conti++;
                            }
                            if (match) {
                                var regla = '5';
                                this.nuevasInstrucciones[contador].cadena = '';
                                this.reporteOptimizacion.push(new Optimizacion(contador, regla, 'cadena eliminada', instruccion.cadena));
                            }
                        }
                        cont2++;
                    }
                    if (match) {
                        // 
                    }
                    this.asignacionesPrevias.push(instruccion);
                }
            }
            contador++;
        }
    };
    Optimizador.prototype.arrayCadena = function () {
        for (var _i = 0, _a = this.nuevasInstrucciones; _i < _a.length; _i++) {
            var linea = _a[_i];
            if (linea.cadena == '') {
            }
            else {
                this.cadenaOptimizada += linea.cadena + '\n';
            }
        }
    };
    return Optimizador;
}());
exports.Optimizador = Optimizador;
var Optimizacion = /** @class */ (function () {
    function Optimizacion(linea, regla, codigo, codigo_original) {
        this.linea = linea;
        this.regla = regla;
        this.codigo = codigo;
        this.codigo_original = codigo_original;
    }
    return Optimizacion;
}());
exports.Optimizacion = Optimizacion;
