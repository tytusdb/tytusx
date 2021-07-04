var Type;
(function (Type) {
    Type[Type["EMPTY"] = 0] = "EMPTY";
    Type[Type["DOUBLE_TAG"] = 1] = "DOUBLE_TAG";
    Type[Type["ATRIBUTO"] = 2] = "ATRIBUTO";
    Type[Type["COMMENT"] = 3] = "COMMENT";
})(Type || (Type = {}));
function getName(tipo) {
    switch (tipo) {
        case Type.EMPTY: return "ETIQUETA AUTO CERRADA";
        case Type.DOUBLE_TAG: return "ETIQUETA";
        case Type.ATRIBUTO: return "ATRIBUTO";
        case Type.COMMENT: return "COMMENT";
    }
}
