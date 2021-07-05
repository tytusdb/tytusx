import { Expression } from "./Expression";
import { relativeexpression, XqueryValue } from "../AstXquery";
import { SymbolTable } from "../../Structure/TableSymbol";
import { Graph } from "../../Util";


export class Epsilon extends Expression implements relativeexpression {
  constructor(line: number, column: number) {
    super(line, column);
  }
  interpretrelative(): XqueryValue {
    return this.value;
  }

  public interpret(): XqueryValue {
    return this.value;
  }


  public traducir(symbolTable: SymbolTable) {
    throw new Error("Method not implemented.");
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="()",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="EXP",
        fillcolor="LightBlue", style ="filled", shape="box"];    
        node${count.getContador()}[label="()",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }

}
