export enum Tipo {
    STRING,
    INT,
    DOUBLE,
    BOOL,
    VOID,
    STRUCT,
    NULL,
    ARRAY,
    ATRIBUTO
}

export enum Operador {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    MENOS_UNARIO,
    MAYOR_QUE,
    MENOR_QUE,
    IGUAL,
    DIFERENTE_QUE,
    OR,
    AND,
    NOT,
    MAYOR_IGUAL_QUE,
    MENOR_IGUAL_QUE,
    DESCONOCIDO
}

export enum TipoSelector {
    DOBLE_SLASH,
    SLASH,
    DOSPUNTOS_DOSSLASH,
    PUNTO_DOSSLASH,
    DOSPUNTOS_SLASH,
    PUNTO_SLASH,
    FIN
}

export enum TipoExpresioXPath {
    IDENTIFICADOR,
    ASTERISCO,
    NODE,
    TEXT,
    PUNTO,
    DOBLEPUNTO,
    ARROBA,
    ARROBA_ID
}

export enum TipoExpresioDefinida {
    LAST,
    POSITION,
    AXES,
    ASTERISCO,
    ARROBA,
    NODE,
    TEXT
}

export enum TipoNodo {
    SELECTOR_EXPRESION,
    EXPRESION,
    AXES,
    SELECTOR_AXES,
    FIN
}

export enum TipoAxes {
    ANCESTOR,
    ANCESTOR_OR_SELF,
    ATTRIBUTE,
    CHILD,
    DESCENDANT,
    DESCENDANT_OR_SELF,
    FOLLOWING,
    FOLLOWING_SIBLING,
    PARENT,
    PRECEDING,
    PRECEDING_SIBLING,
    SELF,
    NINGUNO
}

export enum TipoOperadores {
    ELEMENTOS,
    ATRIBUTOS
}