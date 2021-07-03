"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TipoSeleccion_1 = require("./TipoSeleccion");
const NodoControlError_1 = require("./NodoControlError");
class ControlError {
    constructor(simbolo, tipo, linea, columna, entorno) {
        console.log("adentro");
        ControlError.ListaE.push(new NodoControlError_1.NodoControlError(simbolo, tipo, linea, columna, entorno));
        console.log(ControlError.ListaE);
    }
    static Agregar(simbolo, tipo, linea, columna, entorno) {
        ControlError.ListaE.push(new NodoControlError_1.NodoControlError(simbolo, tipo, linea, columna, entorno));
    }
}
exports.ControlError = ControlError;
ControlError.ListaE = [];
function graficar(errores, errorbusqueda = {
    simbolo: "",
    tipo: "",
    linea: "",
    columna: "",
}) {
    var text = "";
    for (let set of errores) {
        if (set.tipo === TipoSeleccion_1.TipoSeleccion.ERROR_LEXICO) {
            text = text + '\n' + "simbolo de error: " + set.simbolo + " tipo: error lexico" + " " + set.linea + " " + set.columna;
        }
        else if (set.tipo === TipoSeleccion_1.TipoSeleccion.ERROR_SINTACTICO) {
            text = text + '\n' + "simbolo de error: " + set.simbolo + " tipo: error sintactico" + " " + set.linea + " " + set.columna;
        }
    }
    return text;
}
exports.graficar = graficar;
