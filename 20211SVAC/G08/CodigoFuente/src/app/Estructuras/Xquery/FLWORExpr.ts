import { parametroXpath } from '../parametroXpath';
import {sentenciaXpath} from '../sentenciaXpath'
import { FLWORTipo, OrderModifierType, TipoClausulaIntermedia } from '../tipificacion';
import { SingleExpresion } from './SingleExpresion';

export class FLWORExpr{
    Binding:FLWORBinding;
    IntermediteClauses:IntermediteClause[];
    //WhereClause:parametroXpath;
    //OrderList:OrderSpec[];
    ReturnClause: SingleExpresion;
    constructor(binding: FLWORBinding, IntermediteClauses:IntermediteClause[] , returnClause: SingleExpresion){
        this.Binding = binding;
        this.IntermediteClauses = IntermediteClauses;
        this.ReturnClause = returnClause;
    }
}

export class IntermediteClause{
    Tipo:TipoClausulaIntermedia;
    Clausula:Object;
    constructor( Tipo:TipoClausulaIntermedia, Clausula:Object){
        this.Tipo = Tipo;
        this.Clausula = Clausula;
    }
}
export class OrderSpec{
    SingleExpresion : SingleExpresion;
    OrderModifierType: OrderModifierType;
    constructor( SingleExpresion : SingleExpresion,OrderModifierType: OrderModifierType){
        this.SingleExpresion = SingleExpresion;
        this.OrderModifierType = OrderModifierType;
        
    }
 
}
export class FLWORVariables{
    VarName:string;
    Sentencia: sentenciaXpath;
    SEValue: SingleExpresion;
    constructor(varName:string, sentencia: sentenciaXpath,SEValue:SingleExpresion){
        this.VarName = varName;
        this.Sentencia = sentencia;
        this.SEValue = SEValue;
    }
}

export class FLWORBinding{
    Tipo:FLWORTipo;
    Variables:FLWORVariables[];
    constructor(tipo:FLWORTipo,Variable:FLWORVariables){
        this.Tipo = tipo;
        this.Variables = [];
        this.Variables.push(Variable);
    }
}