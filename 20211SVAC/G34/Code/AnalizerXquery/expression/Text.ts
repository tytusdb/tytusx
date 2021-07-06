import { SymbolTable, SymbolTableXQuery } from "../../Structure/TableSymbol";
import { Expression } from "./Expression";
import { XqueryValue } from "../AstXquery";
import { AST } from "../../Structure/Estructura_traduccion/AST";
import { Graph } from "../../Util";


export class Text extends Expression {

  constructor(line: number, column: number) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    if (indexParent !== undefined) {
      const actual = symbolTable.getSymbolByIndex(indexParent);
      this.value = actual?.node.value;
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
        node${NUMID}[label="text",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="TEXT()",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="text",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
