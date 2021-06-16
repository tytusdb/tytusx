"use strict";
var Tipo_Enum;
(function (Tipo_Enum) {
    Tipo_Enum[Tipo_Enum["STRING"] = 0] = "STRING";
    Tipo_Enum[Tipo_Enum["INT"] = 1] = "INT";
    Tipo_Enum[Tipo_Enum["DOUBLE"] = 2] = "DOUBLE";
    Tipo_Enum[Tipo_Enum["BOOL"] = 3] = "BOOL";
    Tipo_Enum[Tipo_Enum["VOID"] = 4] = "VOID";
    Tipo_Enum[Tipo_Enum["STRUCT"] = 5] = "STRUCT";
    Tipo_Enum[Tipo_Enum["ARRAY"] = 6] = "ARRAY";
})(Tipo_Enum || (Tipo_Enum = {}));
class Tipo {
    constructor() {
        this.type = Tipo_Enum.VOID;
    }
    setType(type) {
        this.type = type;
    }
    getType() {
        return this.type;
    }
}
