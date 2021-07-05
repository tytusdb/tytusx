"use strict";
var ReglaC3D;
(function (ReglaC3D) {
    ReglaC3D[ReglaC3D["Regla1"] = 0] = "Regla1";
    ReglaC3D[ReglaC3D["Regla2"] = 1] = "Regla2";
    ReglaC3D[ReglaC3D["Regla3"] = 2] = "Regla3";
    ReglaC3D[ReglaC3D["Regla4"] = 3] = "Regla4";
    ReglaC3D[ReglaC3D["Regla5"] = 4] = "Regla5";
    ReglaC3D[ReglaC3D["Regla6"] = 5] = "Regla6";
    ReglaC3D[ReglaC3D["Regla7"] = 6] = "Regla7";
    ReglaC3D[ReglaC3D["Regla8"] = 7] = "Regla8";
    ReglaC3D[ReglaC3D["Regla9"] = 8] = "Regla9";
    ReglaC3D[ReglaC3D["Regla10"] = 9] = "Regla10";
    ReglaC3D[ReglaC3D["Regla11"] = 10] = "Regla11";
    ReglaC3D[ReglaC3D["Regla12"] = 11] = "Regla12";
    ReglaC3D[ReglaC3D["Regla13"] = 12] = "Regla13";
    ReglaC3D[ReglaC3D["Regla14"] = 13] = "Regla14";
    ReglaC3D[ReglaC3D["Regla15"] = 14] = "Regla15";
    ReglaC3D[ReglaC3D["Regla16"] = 15] = "Regla16";
})(ReglaC3D || (ReglaC3D = {}));
class Optimizador {
    constructor(codigo3d) {
        this.codigo3d = codigo3d;
    }
    optimizarCodigo() {
        let cadena = "";
        for (let codigo of this.codigo3d) {
            if (codigo instanceof DeclaracionMetodoC3D) {
                codigo.optimizarCodigo();
            }
            cadena += codigo.toString();
        }
        return cadena;
    }
}
