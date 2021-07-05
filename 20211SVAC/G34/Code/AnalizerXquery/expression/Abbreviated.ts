import { SymbolTable, SymbolTableXQuery } from "../../Structure/TableSymbol";
import { Expression } from "./Expression";
import { XqueryValue } from "../AstXquery";
import { AST } from "../../Structure/Estructura_traduccion/AST";
import { Graph } from "../../Util";


export class Abbreviated extends Expression {

  constructor(line: number, column: number, public abbreviated: boolean) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    if (indexParent) {
      /**
       * True -> si es ..
       * False -> si es .
       */
      if (this.abbreviated) {
        const current = symbolTable.getSymbolByIndex(indexParent);
        if (current && current.indexParent !== undefined) {
          const previous = symbolTable.getSymbolByIndex(current.indexParent);
          this.value = previous !== undefined ? [previous] : [];
          return this.value;
        }
      } else {
        const current = symbolTable.getSymbolByIndex(indexParent);
        this.value = current !== undefined ? [current] : [];
        return this.value;
      }
    }
    return [];
  }


  public traducir(symbolTable: SymbolTable) {
    throw new Error("Method not implemented.");
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    if (this.abbreviated) {
      str.push(`
        node${NUMID}[label="..",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    } else {
      str.push(`
        node${NUMID}[label=".",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    }
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    if (this.abbreviated) {
      str.push(`
        node${NUMID}[label="ABBREVIATED",
        fillcolor="LightBlue", style ="filled", shape="box"];    
        node${count.getContador()}[label="..",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    } else {
      str.push(`
        node${NUMID}[label="ABBREVIATED",
        fillcolor="LightBlue", style ="filled", shape="box"];    
        node${count.getContador()}[label=".",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    }
    return NUMID;
  }
}
