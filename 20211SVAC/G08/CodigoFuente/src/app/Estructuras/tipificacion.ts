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
  Ruta,
  Variable
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
export enum SingleExpresionType{
  FLWORExpr
	,IfExpr
  ,Contador
  ,HtmlSequence
  ,FuncionDefinida
  ,XPARAM
  ,Path
}

export enum FLWORTipo{
  For,
  Let
} 


export enum TipoBinding{
  VarInSentencia
} 

export enum OrderModifierType{
  Ascendente,
  Descendente,
  Ninguno
}
export enum TipoClausulaIntermedia{
  InitialClause,
  OrderByClause,
  WhereClause
}

export enum TipoFuncion{
  Definida,
  Nativa
}

export enum TipoDeclaracionXquery{
  Varible,
  FuncionDefinida
}
export enum ParamType{
  xsString, 
  xsDate
  ,xsDecimal
  ,xsBoolean
}