//No modificar esta clase, altera funcionamiento de xquery
var TiposDatos;
(function (TiposDatos) {
    TiposDatos[TiposDatos["ENTERO"] = 0] = "ENTERO";
    TiposDatos[TiposDatos["STRING"] = 1] = "STRING";
    TiposDatos[TiposDatos["DECIMAL"] = 2] = "DECIMAL";
    TiposDatos[TiposDatos["BOOLEAN"] = 3] = "BOOLEAN";
})(TiposDatos || (TiposDatos = {}));
