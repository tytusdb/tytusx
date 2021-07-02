"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.TipoBloque = exports.TipoInstruccion3D = void 0;
var TipoInstruccion3D;
(function (TipoInstruccion3D) {
    TipoInstruccion3D[TipoInstruccion3D["ASIGNACION_OPERACION"] = 0] = "ASIGNACION_OPERACION";
    TipoInstruccion3D[TipoInstruccion3D["ASIGNACION_SIMPLE"] = 1] = "ASIGNACION_SIMPLE";
    TipoInstruccion3D[TipoInstruccion3D["ASIGNACION_ARREGLO"] = 2] = "ASIGNACION_ARREGLO";
    TipoInstruccion3D[TipoInstruccion3D["ARREGLO_ASIGNACION"] = 3] = "ARREGLO_ASIGNACION";
    TipoInstruccion3D[TipoInstruccion3D["ETIQUETA"] = 4] = "ETIQUETA";
    TipoInstruccion3D[TipoInstruccion3D["GOTO"] = 5] = "GOTO";
    TipoInstruccion3D[TipoInstruccion3D["RETURN"] = 6] = "RETURN";
    TipoInstruccion3D[TipoInstruccion3D["IF"] = 7] = "IF";
    TipoInstruccion3D[TipoInstruccion3D["LLAMADA"] = 8] = "LLAMADA";
    TipoInstruccion3D[TipoInstruccion3D["PRINT"] = 9] = "PRINT";
})(TipoInstruccion3D || (TipoInstruccion3D = {}));
var TipoBloque;

(function (TipoBloque) {
    TipoBloque[TipoBloque["INCLUDE"] = 0] = "INCLUDE";
    TipoBloque[TipoBloque["DECLARACION"] = 1] = "DECLARACION";
    TipoBloque[TipoBloque["DECLARACION_ARREGLO"] = 2] = "DECLARACION_ARREGLO";
    TipoBloque[TipoBloque["VOID"] = 3] = "VOID";
    TipoBloque[TipoBloque["MAIN"] = 4] = "MAIN";
})(TipoBloque || (TipoBloque = {}));
