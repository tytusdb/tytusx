import { ParamType, TipoDeclaracionXquery } from "../tipificacion";
import { SingleExpresion } from "./SingleExpresion";

//Clases para declaraciones de variables
export class DeclaracionXquery{
    Tipo:TipoDeclaracionXquery;
    Valor:Object;
    constructor(Tipo:TipoDeclaracionXquery, Valor:Object){
        this.Tipo = Tipo;
        this.Valor = Valor;
    }
}
export class VariableXquery{
    Varname:string;
    Sentencia:SingleExpresion;
    constructor(Varname:string, Sentencia:SingleExpresion){
        this.Varname = Varname;
        this.Sentencia = Sentencia;
    }
}
//Clases para Funciones definidas por el usuario
export class FuncionXquery{
    FunctionName:FunctionName;
    ListaParametros: ParametroXquery[];
    Tipo:TypeDeclaration;
    Body:SingleExpresion[];
    constructor(FunctionName:FunctionName, ListaParametros: ParametroXquery[], Tipo:TypeDeclaration, Body:SingleExpresion[]){
        this.FunctionName = FunctionName;
        this.ListaParametros = ListaParametros;
        this.Tipo = Tipo;
        this.Body = Body;
    }
}
export class FunctionName{
    Name:string;
    Ambiente:string;
    constructor(Name:string, Ambiente:string){
        this.Ambiente = Ambiente;
        this.Name = Name;
    }
}
export class ParametroXquery{
    Name: string;
    TipoParam: TypeDeclaration;
    constructor( Name: string , TipoParam: TypeDeclaration){
        this.Name = Name;
        this.TipoParam = TipoParam;
   }
}

export class TypeDeclaration{
   Tipo: ParamType;
   OccurrenceIndicator:string;
   constructor( Tipo: ParamType,OccurrenceIndicator:string){
        this.Tipo = Tipo;
        this.OccurrenceIndicator = OccurrenceIndicator;
   }
}