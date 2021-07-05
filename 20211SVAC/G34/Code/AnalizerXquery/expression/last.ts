import { SymbolTable } from "../../Structure/TableSymbol";
import { Expression } from "./Expression";
import { XqueryValue } from "../AstXquery";
import { Graph } from "../../Util";

export class Last extends Expression {
  constructor(line: number, column: number) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined
  ): XqueryValue {
    if (indexParent !== undefined) {
      const actual = symbolTable.getSymbolByIndex(indexParent);
      if (actual !== undefined && actual.indexParent !== undefined) {
        const hermanos = symbolTable.getSymbolsByParent(
          actual.node.name,
          actual.indexParent
        );
        this.value = hermanos.length;
        return this.value;
      }
    }
    return this.value;
  }

  public traducir(symbolTable: SymbolTable) {
    throw new Error("Method not implemented.");
  }
  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="last",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="LAST()",
        fillcolor="LightBlue", style ="filled", shape="box"];    
        node${count.getContador()}[label="last",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
