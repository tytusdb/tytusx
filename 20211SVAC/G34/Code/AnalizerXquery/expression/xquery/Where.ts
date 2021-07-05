import { Expression } from "../Expression";
import { SymbolTableXQuery, SymbolTable } from "../../../Structure/TableSymbol";
import { XqueryValue } from "../../AstXquery";
import { Relational } from "../Relational";
import { Graph } from "../../../Util";

export class Where {
  constructor(
    public line: number,
    public column: number,
    public expCond: Expression
  ) {}

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    const value = this.expCond.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );
    return this.expCond instanceof Relational ? this.expCond.arrValue : value;
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="where",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${this.expCond.graphAST(str, count)};
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    const numleft = this.expCond.graphCST(str, count);
    str.push(`
        node${NUMID}[label="WHERE",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="where",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador() - 1} -> node${numleft};
      `);
    return NUMID;
  }
}
