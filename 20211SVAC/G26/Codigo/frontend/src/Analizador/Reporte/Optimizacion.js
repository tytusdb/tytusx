export class Optimizacion {
    constructor(tipo, codigoAntes, codigoAhora, fila, columna) {
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.codigoAntes = codigoAntes;
        this.codigoAhora = codigoAhora;
    }
    getFila() {
        return this.fila;
    }
    getColumna() {
        return this.columna;
    }
    getCodigoAntes() {
        return this.codigoAntes;
    }
    getCodigoAhora() {
        return this.codigoAhora;
    }
    tipoReglaToString() {
        switch (this.tipo) {
            case ReglaOptimizacion.REGLA1:
                return "Regla 1";
            case ReglaOptimizacion.REGLA2:
                return "Regla 2";
            case ReglaOptimizacion.REGLA3:
                return "Regla 3";
            case ReglaOptimizacion.REGLA4:
                return "Regla 4";
            case ReglaOptimizacion.REGLA5:
                return "Regla 5";
            case ReglaOptimizacion.REGLA6:
                return "Regla 6";
            case ReglaOptimizacion.REGLA7:
                return "Regla 7";
            case ReglaOptimizacion.REGLA8:
                return "Regla 8";
            case ReglaOptimizacion.REGLA9:
                return "Regla 9";
            case ReglaOptimizacion.REGLA10:
                return "Regla 10";
            case ReglaOptimizacion.REGLA10:
                return "Regla 11";
            case ReglaOptimizacion.REGLA10:
                return "Regla 12";
            case ReglaOptimizacion.REGLA10:
                return "Regla 13";
            case ReglaOptimizacion.REGLA10:
                return "Regla 14";
            case ReglaOptimizacion.REGLA10:
                return "Regla 15";
            case ReglaOptimizacion.REGLA10:
                return "Regla 16";
            default:
                return "Regla x";
        }
    }
}
export var ReglaOptimizacion;
(function (ReglaOptimizacion) {
    ReglaOptimizacion[ReglaOptimizacion["REGLA1"] = 0] = "REGLA1";
    ReglaOptimizacion[ReglaOptimizacion["REGLA2"] = 1] = "REGLA2";
    ReglaOptimizacion[ReglaOptimizacion["REGLA3"] = 2] = "REGLA3";
    ReglaOptimizacion[ReglaOptimizacion["REGLA4"] = 3] = "REGLA4";
    ReglaOptimizacion[ReglaOptimizacion["REGLA5"] = 4] = "REGLA5";
    ReglaOptimizacion[ReglaOptimizacion["REGLA6"] = 5] = "REGLA6";
    ReglaOptimizacion[ReglaOptimizacion["REGLA7"] = 6] = "REGLA7";
    ReglaOptimizacion[ReglaOptimizacion["REGLA8"] = 7] = "REGLA8";
    ReglaOptimizacion[ReglaOptimizacion["REGLA9"] = 8] = "REGLA9";
    ReglaOptimizacion[ReglaOptimizacion["REGLA10"] = 9] = "REGLA10";
    ReglaOptimizacion[ReglaOptimizacion["REGLA11"] = 10] = "REGLA11";
    ReglaOptimizacion[ReglaOptimizacion["REGLA12"] = 11] = "REGLA12";
    ReglaOptimizacion[ReglaOptimizacion["REGLA13"] = 12] = "REGLA13";
    ReglaOptimizacion[ReglaOptimizacion["REGLA14"] = 13] = "REGLA14";
    ReglaOptimizacion[ReglaOptimizacion["REGLA15"] = 14] = "REGLA15";
    ReglaOptimizacion[ReglaOptimizacion["REGLA16"] = 15] = "REGLA16";
})(ReglaOptimizacion || (ReglaOptimizacion = {}));
