"use strict";
class DeclaracionMetodoC3D extends Codigo3d {
    constructor(nombre, instrucciones, linea, columna) {
        super(linea, columna);
        this.nombre = nombre;
        this.instrucciones = instrucciones;
    }
    optimizarCodigo() {
        this.ejecutarRegla(ReglaC3D.Regla1);
        this.ejecutarRegla(ReglaC3D.Regla2);
        this.ejecutarRegla(ReglaC3D.Regla3);
        this.ejecutarRegla(ReglaC3D.Regla4);
        this.ejecutarRegla(ReglaC3D.Regla5);
        this.ejecutarRegla(ReglaC3D.Regla6);
        this.ejecutarRegla(ReglaC3D.Regla7);
        this.ejecutarRegla(ReglaC3D.Regla8);
        this.ejecutarRegla(ReglaC3D.Regla9);
        this.ejecutarRegla(ReglaC3D.Regla10);
        this.ejecutarRegla(ReglaC3D.Regla11);
        this.ejecutarRegla(ReglaC3D.Regla12);
        this.ejecutarRegla(ReglaC3D.Regla13);
        this.ejecutarRegla(ReglaC3D.Regla14);
        this.ejecutarRegla(ReglaC3D.Regla15);
        this.ejecutarRegla(ReglaC3D.Regla16);
    }
    ejecutarRegla(regla) {
        let i = 0;
        for (let codigo of this.instrucciones) {
            if (!codigo.eliminado) {
                if (codigo instanceof AsignacionC3D && regla >= ReglaC3D.Regla6) {
                    switch (regla) {
                        case ReglaC3D.Regla6:
                            codigo.regla6();
                            break;
                        case ReglaC3D.Regla7:
                            codigo.regla7();
                            break;
                        case ReglaC3D.Regla8:
                            codigo.regla8();
                            break;
                        case ReglaC3D.Regla9:
                            codigo.regla9();
                            break;
                        case ReglaC3D.Regla10:
                            codigo.regla10();
                            break;
                        case ReglaC3D.Regla11:
                            codigo.regla11();
                            break;
                        case ReglaC3D.Regla12:
                            codigo.regla12();
                            break;
                        case ReglaC3D.Regla13:
                            codigo.regla13();
                            break;
                        case ReglaC3D.Regla14:
                            codigo.regla14();
                            break;
                        case ReglaC3D.Regla15:
                            codigo.regla15();
                            break;
                        case ReglaC3D.Regla16:
                            codigo.regla16();
                            break;
                        default:
                            break;
                    }
                }
                else if (codigo instanceof SaltoCondicionalC3D && regla >= ReglaC3D.Regla2 && regla <= ReglaC3D.Regla5) {
                    switch (regla) {
                        case ReglaC3D.Regla2:
                            this.regla2(codigo, i);
                            break;
                        case ReglaC3D.Regla3:
                            if (this.instrucciones.length >= i + 1 && !this.instrucciones[i + 1].eliminado)
                                codigo.regla3(this.instrucciones[i + 1]);
                            break;
                        case ReglaC3D.Regla4:
                            if (this.instrucciones.length >= i + 1 && !this.instrucciones[i + 1].eliminado)
                                codigo.regla4(this.instrucciones[i + 1]);
                            break;
                        default:
                            break;
                    }
                }
                else if (codigo instanceof SaltoC3D && regla == ReglaC3D.Regla1) {
                    this.regla1(codigo.etiquetaSalto, i);
                }
            }
            i++;
        }
    }
    regla1(etiqueta, indiceActual) {
        let marcador = -1;
        let i = indiceActual;
        for (let j = i + 1; j < this.instrucciones.length; j++) {
            if (this.instrucciones[j] instanceof EtiquetaC3D && !this.instrucciones[j].eliminado) {
                if (j > i + 1) {
                    if (this.instrucciones[j].etiqueta == etiqueta) {
                        marcador = j;
                        break;
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }
        if (marcador != -1) {
            var codigoEliminado = "";
            for (let j = i + 1; j < marcador; j++) {
                this.instrucciones[j].eliminado = true;
                codigoEliminado += this.instrucciones[j].toString();
            }
            var opt = new FilaOptimizacion("1", codigoEliminado, "", this.instrucciones[indiceActual].linea, this.instrucciones[indiceActual].columna);
            ReporteOptimizacion.AgregarFilaOptimizacion(opt);
        }
    }
    regla2(instruccion, indiceActual) {
        /* if ... goto etqV;
         * goto etgF;
         * etqV:
         *
         * if !... goto etqF;
         * eliminar
         * eliminar
         * */
        let i = indiceActual;
        if (this.instrucciones.length < i + 2) {
            return;
        }
        if (this.instrucciones[i + 1] instanceof SaltoC3D && this.instrucciones[i + 2] instanceof EtiquetaC3D &&
            !this.instrucciones[i + 1].eliminado && !this.instrucciones[i + 2].eliminado) {
            if (instruccion.etiquetaSalto == this.instrucciones[i + 2].etiqueta) {
                this.instrucciones[i + 1].eliminado = true;
                this.instrucciones[i + 2].eliminado = true;
                var opt = new FilaOptimizacion("2", instruccion.toString() + this.instrucciones[i + 1].toString() + this.instrucciones[i + 2].toString(), "", instruccion.linea, instruccion.columna);
                instruccion.etiquetaSalto = this.instrucciones[i + 1].etiquetaSalto;
                instruccion.condicion.negarTipoRelacional();
                opt.codigoAgregado = instruccion.toString();
                ReporteOptimizacion.AgregarFilaOptimizacion(opt);
            }
        }
    }
    toString() {
        let cadena = "void " + this.nombre + "(){\n";
        for (let instruccion of this.instrucciones) {
            if (!instruccion.eliminado)
                cadena += instruccion.toString();
        }
        cadena += "}\n";
        return cadena;
    }
}
