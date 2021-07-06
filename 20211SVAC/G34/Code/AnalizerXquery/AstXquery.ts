import {
  SymbolTable,
  SymbolTableXQuery,
  SymbolXml,
} from "../Structure/TableSymbol";
import { Graph } from "../Util";
import { FunctionXquery } from "./Functions";

import { AST } from "../Structure/Estructura_traduccion/AST";
import { UnionPath } from "./expression";
import { Expression } from ".";
import * as Globals3d from "../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../Structure/Estructura_traduccion/Listado_enums";


export type XqueryValue =
  | number
  | string
  | boolean
  | Array<SymbolXml | XqueryValue>
  | undefined;

export abstract class NodeXquery {

  public global: number;
  public esFuncion: number;
  public tipoValor: enumGlobal.TIPO_PRIMITIVO;
  public nombreFuncion: string;
  constructor(public line: number, public column: number) {
    this.global = 0;
    this.esFuncion = 0;
    this.tipoValor = enumGlobal.TIPO_PRIMITIVO.NUMERICO;
    this.nombreFuncion = "";
  }

  public abstract interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue;


  public abstract traducir(symbolTable: SymbolTable): any;

  public abstract graphAST(str: Array<string>, count: Graph): number;

  public abstract graphCST(str: Array<string>, count: Graph): number;

}

export class AstXquery {
  constructor(
    private nodes: Array<NodeXquery>,
    private functions: Array<FunctionXquery> | undefined
  ) { }

  public interpret(
    symbolTable: SymbolTable,
    symbolTableXquery: SymbolTableXQuery
  ): Array<XqueryValue> {
    this.functions?.forEach((temp) => {
      symbolTableXquery.setFunction(temp.name, temp);
    });
    const values = this.nodes.map((node) =>
      node.interpret(symbolTable, undefined, symbolTableXquery)
    );
    const result: Array<XqueryValue> = [];
    return result.concat(...values).filter((val) => val !== undefined);
  }


  public traducir(symbolTable: SymbolTable): any {
    Globals3d.inicializarFunciones();
    if (this.functions !== undefined) {
      for (let i: number = 0; i < this.functions.length; i++) {
        if (this.functions[i].esFuncion == 1) {
          Globals3d.setFuncion(this.functions[i].nombreFuncion, this.functions[i].tipoValor);
        }
      }
      for (let i: number = 0; i < this.functions.length; i++) {
        if (this.functions[i].esFuncion == 1) {
          this.functions[i].global = 1;
          this.functions[i].traducir(symbolTable);
        }
      }
    }
    Globals3d.setTemporalInicio();
    Globals3d.str_codigo3d.setValor("int main(){");
    for (let i: number = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].esFuncion == 0) {
        this.nodes[i].global = 1;
        this.nodes[i].traducir(symbolTable);
      }
    }
    Globals3d.str_codigo3d.setValor("return 0;");
    Globals3d.str_codigo3d.setValor("}");
  }


  public graphAST(): string {
    const str: Array<string> = [];
    const count: Graph = new Graph();
    const NUMID = count.incrementCount();
    const encabezado = `digraph AST 
        {
        rankdir=TB; 
        node[shape = box, style = filled, color = white];
        node${NUMID}[label="AST QUERYS"];
        `;
    str.push(encabezado);
    this.functions?.forEach((fn) =>
      str.push(`node${NUMID} -> node${fn.graphAST(str, count)};`)
    );
    this.nodes.forEach((node) =>
      str.push(`node${NUMID} -> node${node.graphAST(str, count)};`)
    );
    str.push("\n}\n");
    return str.join("");
  }

  public graphCST(): string {
    const str: Array<string> = [];
    const count: Graph = new Graph();
    const NUMID = count.incrementCount();
    const encabezado = `digraph AST 
        {
        rankdir=TB; 
        node[shape = box, style = filled, color = white];
        node${NUMID}[label="CST QUERYS"];
        `;
    str.push(encabezado);
    this.functions?.forEach((fn) =>
      str.push(`node${NUMID} -> node${fn.graphCST(str, count)};`)
    );
    this.nodes.forEach((node) =>
      str.push(`node${NUMID} -> node${node.graphCST(str, count)};`)
    );
    str.push("\n}\n");
    return str.join("");
  }

}



export interface relativeexpression {
  interpretrelative(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue;

  graphAST(str: Array<string>, count: Graph): number;

  graphCST(str: Array<string>, count: Graph): number;
}
