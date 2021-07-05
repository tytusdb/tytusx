import { XqueryValue } from "..";
import { SymbolTable, SymbolTableXQuery } from "../../Structure/TableSymbol";
import { Graph } from "../../Util";
import { Expression } from "./Expression";
import { AST } from "../../Structure/Estructura_traduccion/AST";

export class AbsoluteLocationPath extends Expression {

  constructor(line: number, column: number, public exp: Expression) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    this.value = this.exp.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );
    return this.value;
  }

  public traducir(symbolTable: SymbolTable) {
    throw new Error("Method not implemented.");
  }
  public graphAST(str: Array<string>, count: Graph): number {
    return this.exp.graphAST(str, count);
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="/",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${this.exp.graphCST(str, count)};
      `);
    return NUMID;
  }
}
