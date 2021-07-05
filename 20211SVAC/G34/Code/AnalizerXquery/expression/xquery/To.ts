import { SymbolTableXQuery, SymbolTable } from "../../../Structure/TableSymbol";
import { Graph } from "../../../Util";
import { XqueryValue } from "../../AstXquery";
import { Expression } from "../Expression";

export class To extends Expression {
  constructor(
    line: number,
    column: number,
    public childleft: Expression,
    public childright: Expression
  ) {
    super(line, column);
  }
  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    let valleft = this.childleft.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );
    let valright = this.childright.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );
    if (typeof valleft !== typeof valright) {
      throw new Error(
        "Error solamente se puede operar entre valores del mismo tipo!"
      );
    }
    if (typeof valright === "number" && typeof valleft === "number") {
      valleft = Number(valleft);
      valright = Number(valright);
      const arr = [];
      for (let i = valleft; i <= valright; i++) {
        arr.push(i);
      }
      this.value = arr;
    } else {
      throw new Error("Error No se puede operar un for de cadenas o booleanos");
    }
    return this.value;
  }
  public traducir(symbolTable: SymbolTable) {
    throw new Error("Method not implemented.");
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="To",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${this.childleft.graphAST(str, count)};
        node${NUMID} -> node${this.childright.graphAST(str, count)};
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    const numleft = this.childleft.graphCST(str, count);
    const numright = this.childright.graphCST(str, count);
    str.push(`
        node${NUMID}[label="TO",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="To",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador() - 1} -> node${numleft};
        node${count.getContador() - 1} -> node${numright};
      `);
    return NUMID;
  }
}
