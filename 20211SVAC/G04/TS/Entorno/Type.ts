enum Type {
    EMPTY = 0,
    DOUBLE_TAG = 1,
    ATRIBUTO = 2,
    COMMENT = 3
}

function getName(tipo: Type): string {
    switch (tipo) {
        case Type.EMPTY: return "ETIQUETA AUTO CERRADA";
        case Type.DOUBLE_TAG: return "ETIQUETA";
        case Type.ATRIBUTO: return "ATRIBUTO";
        case Type.COMMENT: return "COMMENT";
    }
}