
import nodoAST from "src/app/Backend/XML/Analizador/Abstracto/nodoAST";
import Arbol from "src/app/Backend/XML/Analizador/Simbolos/Arbol";
import tablaSimbolos from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import Tipo from "src/app/Backend/XML/Analizador/Simbolos/Tipo";
import { tipoDato } from "src/app/Backend/XML/Analizador/Simbolos/Tipo";
import { Instruccion } from "src/app/Backend/XML/Analizador/Abstracto/Instruccion";
import { reporteTabla } from "../Reportes/reporteTabla";

export default class Atributo extends Instruccion{
  public identificador: string;
  public valor: string;
  public linea: number;
  public columna: number;

  constructor(identificador: string, valor: string, linea: number,columna: number)
  {
    super(new Tipo(tipoDato.ATRIBUTO), linea, columna);
    this.identificador = identificador;
    this.valor = valor;
    linea=this.linea;
    columna=this.columna;
  }

  public interpretar(arbol:Arbol, tabla:tablaSimbolos){
    return {identificador:this.identificador,valor:this.valor,linea:this.fila,columna:this.columna}
  }

  public getNodo(): nodoAST {
    
    let nodo = new nodoAST('ATRIBUTO'); //PADRE ATRIBUTO
    
    var padreidentificador= new nodoAST('IDENTIFICADOR'); //PADRE IDENTIFICADOR
    padreidentificador.agregarHijo(this.identificador);
    nodo.agregarHijoAST(padreidentificador);
    let igual= new nodoAST('=')
    nodo.agregarHijoAST(igual);
   
      var padre = new nodoAST("VALOR"); //PADRE IDENTIFICADOR
      padre.agregarHijo(this.valor)
      nodo.agregarHijoAST(padre);
    
    
    return nodo;
  }
}
