import { SymbolTable, SymbolTableXQuery } from "../../Structure/TableSymbol";
import { Expression } from "./Expression";
import { relativeexpression, XqueryValue } from "../AstXquery";
import { Graph } from "../../Util";

export class Nodo extends Expression implements relativeexpression {
  constructor(line: number, column: number) {
    super(line, column);
  }
  interpretrelative(
    symbolTable: SymbolTable,
    indexParent: number | undefined
  ): XqueryValue {
    if (indexParent !== undefined) {
      const actual = symbolTable.getSymbolByIndex(indexParent);
      const hijos = symbolTable.getAllSymbolsByParent(indexParent);
      if (hijos.length > 0) {
        this.value = hijos;
      } else {
        this.value = actual?.node.value;
      }
    } else {
      this.value = undefined;
    }
    return this.value;
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined
  ): XqueryValue {
    if (indexParent !== undefined) {
      const actual = symbolTable.getSymbolByIndex(indexParent);
      const hijos = symbolTable.getAllSymbolsByParent(indexParent);
      if (hijos.length > 0) {
        this.value = hijos;
      } else {
        this.value = actual?.node.value;
      }
    } else {
      this.value = undefined;
    }
    return this.value;
  }
  public traducir(symbolTable: SymbolTable) {
    throw new Error("Method not implemented.");
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="Node",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="NODE()",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="node",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
