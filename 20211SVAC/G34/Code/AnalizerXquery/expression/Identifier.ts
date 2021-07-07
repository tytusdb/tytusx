import {
  SymbolTable,
  SymbolTableXQuery,
  SymbolXml,
} from "../../Structure/TableSymbol";
import { Expression } from "./Expression";
import { AST } from "../../Structure/Estructura_traduccion/AST";

import { relativeexpression, XqueryValue } from "../AstXquery";
import { Graph } from "../../Util";

export class Identifier extends Expression implements relativeexpression {
  constructor(line: number, column: number, public name: string) {
    super(line, column);
  }
  interpretrelative(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    if (indexParent === undefined) {
      this.value = symbolTable.getSymbolsByName(this.name);
      return this.value;
    }

    const actual = symbolTable.getAllSymbolsByParent(indexParent);
    const respuesta: Array<SymbolXml> = [];
    this.fillResult(actual, respuesta, symbolTable, this.name);
    this.value = respuesta;
    return this.value;
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    if (this.name === "*") {
      this.value = symbolTable.getAllSymbolsByParent(indexParent);
      return this.value;
    } else {
      this.value = symbolTable.getSymbolsByParent(this.name, indexParent);
      return this.value;
    }
  }

  public traducir(symbolTable: SymbolTable) {
    throw new Error("Method not implemented.");
  }
  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="${this.name}",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="ID",
        fillcolor="LightBlue", style ="filled", shape="box"];    
        node${count.getContador()}[label="${this.name}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
