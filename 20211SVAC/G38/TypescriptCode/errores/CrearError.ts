class CrearError{
    public static tiposInvalidos(operador: string, izquierda: Tipo, derecha: Tipo, linea: number, columna :number): TokenError{
        let mensaje = "Operación de "+operador+" invalida para los tipos "+izquierda+" y el tipo "+ derecha;
        return new TokenError(TipoError.Semantico,mensaje,linea,columna);
    }

    public static errorSemantico(mensaje:string, linea: number, columna :number){
        return new TokenError(TipoError.Semantico,mensaje,linea,columna);
    }
}