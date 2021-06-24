export enum TipoParametro {
  Entero ,
  Decimal,
  Funtion_Last,
  Funtion_Position,
  DosPuntos,
  Punto,
  Atributo,
  Cadena,
  Nodo,
  Operacion,
  Ruta
}
export enum TipoNodo {
  Raiz = "RAIZ",
  Descendiente = "DESCENDIENTE",
  ID = "ID",
  Axis = "AXIS",
  AutoReferencia = "AUTOREFERENCIA",
  Asterisco = "ASTERISCO",
  NodoPadre = "NODO_PADRE",
  Atributo = "ATRIBUTO",
  Funcion_Node = "Funcion_Node",
  Funcion_Text = "Funcion_Text"
  
}
export enum TipoOperador{
  Mas,
  Menos,
  Por,
  Mod,
  Div,
  MenorIgual,
  MayorIgual,
  Menor,
  Mayor,
  Igual,
  Diferente,
  And,
  Or,
  None
}
