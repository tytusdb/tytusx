"use strict";
class AsignacionC3D extends Codigo3d {
    constructor(tipo, id, valor, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
        this._valorCasteo = null;
        this._valorAcceso = null;
    }
    optimizarCodigo() {
    }
    regla6() {
        if (this.tipo != TipoValor.arreglo) {
            if (this.valor instanceof ExpresionNumerica) {
                if (this.valor.tipoNumerico == TipoNumerico.suma) {
                    if ((this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoIzquierda.valor == 0 &&
                        this.valor.primitivoDerecha.valor == this.id) {
                        this.eliminado = true;
                        var opt = new FilaOptimizacion("6", this.toString(), "", this.linea, this.columna);
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                    else if ((this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoDerecha.valor == 0 &&
                        this.valor.primitivoIzquierda.valor == this.id) {
                        this.eliminado = true;
                        var opt = new FilaOptimizacion("6", this.toString(), "", this.linea, this.columna);
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    regla7() {
        if (this.tipo != TipoValor.arreglo) {
            if (this.valor instanceof ExpresionNumerica) {
                if (this.valor.tipoNumerico == TipoNumerico.resta) {
                    if ((this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoIzquierda.valor == 0 &&
                        this.valor.primitivoDerecha.valor == this.id) {
                        this.eliminado = true;
                        var opt = new FilaOptimizacion("7", this.toString(), "", this.linea, this.columna);
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                    else if ((this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoDerecha.valor == 0 &&
                        this.valor.primitivoIzquierda.valor == this.id) {
                        this.eliminado = true;
                        var opt = new FilaOptimizacion("7", this.toString(), "", this.linea, this.columna);
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    regla8() {
        if (this.tipo != TipoValor.arreglo) {
            if (this.valor instanceof ExpresionNumerica) {
                if (this.valor.tipoNumerico == TipoNumerico.multiplicacion) {
                    if ((this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoIzquierda.valor == 1 &&
                        this.valor.primitivoDerecha.valor == this.id) {
                        this.eliminado = true;
                        var opt = new FilaOptimizacion("8", this.toString(), "", this.linea, this.columna);
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                    else if ((this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoDerecha.valor == 1 &&
                        this.valor.primitivoIzquierda.valor == this.id) {
                        this.eliminado = true;
                        var opt = new FilaOptimizacion("8", this.toString(), "", this.linea, this.columna);
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    regla9() {
        if (this.tipo != TipoValor.arreglo) {
            if (this.valor instanceof ExpresionNumerica) {
                if (this.valor.tipoNumerico == TipoNumerico.division) {
                    if ((this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoDerecha.valor == 1 &&
                        this.valor.primitivoIzquierda.valor == this.id) {
                        this.eliminado = true;
                        var opt = new FilaOptimizacion("9", this.toString(), "", this.linea, this.columna);
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    regla10() {
        if (this.tipo != TipoValor.arreglo) {
            if (this.valor instanceof ExpresionNumerica) {
                if (this.valor.tipoNumerico == TipoNumerico.suma) {
                    if ((this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoIzquierda.valor == 0) {
                        var opt = new FilaOptimizacion("10", this.toString(), "", this.linea, this.columna);
                        this.valor = this.valor.primitivoDerecha;
                        opt.codigoAgregado = this.toString();
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                    else if ((this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoDerecha.valor == 0) {
                        var opt = new FilaOptimizacion("10", this.toString(), "", this.linea, this.columna);
                        this.valor = this.valor.primitivoIzquierda;
                        opt.codigoAgregado = this.toString();
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    regla11() {
        if (this.tipo != TipoValor.arreglo) {
            if (this.valor instanceof ExpresionNumerica) {
                if (this.valor.tipoNumerico == TipoNumerico.resta) {
                    if ((this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoIzquierda.valor == 0) {
                        var opt = new FilaOptimizacion("11", this.toString(), "", this.linea, this.columna);
                        this.valor = this.valor.primitivoDerecha;
                        opt.codigoAgregado = this.toString();
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                    else if ((this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoDerecha.valor == 0) {
                        var opt = new FilaOptimizacion("11", this.toString(), "", this.linea, this.columna);
                        this.valor = this.valor.primitivoIzquierda;
                        opt.codigoAgregado = this.toString();
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    regla12() {
        if (this.tipo != TipoValor.arreglo) {
            if (this.valor instanceof ExpresionNumerica) {
                if (this.valor.tipoNumerico == TipoNumerico.multiplicacion) {
                    if ((this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoIzquierda.valor == 1) {
                        var opt = new FilaOptimizacion("12", this.toString(), "", this.linea, this.columna);
                        this.valor = this.valor.primitivoDerecha;
                        opt.codigoAgregado = this.toString();
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                    else if ((this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoDerecha.valor == 1) {
                        var opt = new FilaOptimizacion("12", this.toString(), "", this.linea, this.columna);
                        this.valor = this.valor.primitivoIzquierda;
                        opt.codigoAgregado = this.toString();
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    regla13() {
        if (this.tipo != TipoValor.arreglo) {
            if (this.valor instanceof ExpresionNumerica) {
                if (this.valor.tipoNumerico == TipoNumerico.division) {
                    if ((this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoDerecha.valor == 1) {
                        var opt = new FilaOptimizacion("13", this.toString(), "", this.linea, this.columna);
                        this.valor = this.valor.primitivoIzquierda;
                        opt.codigoAgregado = this.toString();
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    regla14() {
        if (this.tipo != TipoValor.arreglo) {
            if (this.valor instanceof ExpresionNumerica) {
                if (this.valor.tipoNumerico == TipoNumerico.multiplicacion) {
                    if ((this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoIzquierda.valor == 2) {
                        var opt = new FilaOptimizacion("14", this.toString(), "", this.linea, this.columna);
                        this.valor.primitivoIzquierda = this.valor.primitivoDerecha;
                        this.valor.tipoNumerico = TipoNumerico.suma;
                        opt.codigoAgregado = this.toString();
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                    else if ((this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoDerecha.valor == 2) {
                        var opt = new FilaOptimizacion("14", this.toString(), "", this.linea, this.columna);
                        this.valor.primitivoDerecha = this.valor.primitivoIzquierda;
                        this.valor.tipoNumerico = TipoNumerico.suma;
                        opt.codigoAgregado = this.toString();
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    regla15() {
        if (this.tipo != TipoValor.arreglo) {
            if (this.valor instanceof ExpresionNumerica) {
                if (this.valor.tipoNumerico == TipoNumerico.multiplicacion) {
                    if ((this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoIzquierda.valor == 0) {
                        var opt = new FilaOptimizacion("15", this.toString(), "", this.linea, this.columna);
                        this.valor = this.valor.primitivoIzquierda;
                        opt.codigoAgregado = this.toString();
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                    else if ((this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoDerecha.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoDerecha.valor == 0) {
                        var opt = new FilaOptimizacion("15", this.toString(), "", this.linea, this.columna);
                        this.valor = this.valor.primitivoDerecha;
                        opt.codigoAgregado = this.toString();
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    regla16() {
        if (this.tipo != TipoValor.arreglo) {
            if (this.valor instanceof ExpresionNumerica) {
                if (this.valor.tipoNumerico == TipoNumerico.division) {
                    if ((this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.integer ||
                        this.valor.primitivoIzquierda.tipoPrimitiva == TipoValor.double) &&
                        this.valor.primitivoIzquierda.valor == 0) {
                        var opt = new FilaOptimizacion("16", this.toString(), "", this.linea, this.columna);
                        this.valor = this.valor.primitivoIzquierda;
                        opt.codigoAgregado = this.toString();
                        ReporteOptimizacion.AgregarFilaOptimizacion(opt);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    set valorCasteo(value) {
        this._valorCasteo = value;
    }
    set valorAcceso(value) {
        this._valorAcceso = value;
    }
    toString() {
        let cadenaSalida = "";
        if (this.tipo == TipoValor.arreglo) {
            if (this._valorCasteo != null) {
                cadenaSalida = this.id + '[(' + this._valorCasteo.toString() + ')' + this._valorAcceso.toString() + ']' +
                    '=' + this.valor.toString() + ";\n";
            }
            else if (this._valorAcceso != null) {
                cadenaSalida = this.id + '[' + this._valorAcceso.toString() + ']' +
                    '=' + this.valor.toString() + ";\n";
            }
        }
        else {
            cadenaSalida = this.id + '=' + this.valor.toString() + ";\n";
        }
        return cadenaSalida;
    }
}
