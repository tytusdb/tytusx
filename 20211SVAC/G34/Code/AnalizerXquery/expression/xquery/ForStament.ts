import { SymbolTableXQuery, SymbolTable } from "../../../Structure/TableSymbol";
import { Graph } from "../../../Util";
import { Assigment } from "./Assigment";

export class ForStament {
  constructor(
    public line: number,
    public column: number,
    public lstAssigment: Array<Assigment>
  ) {}

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): void {
    this.lstAssigment.forEach((temp) => {
      temp.interpret(symbolTable, indexParent, symbolTableXquery);
    });
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="for",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    this.lstAssigment.forEach((temp) => {
      str.push(`node${NUMID} -> node${temp.graphAST(str, count)};\n`);
    });
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="FOR",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    this.lstAssigment.forEach((temp) => {
      str.push(`node${NUMID} -> node${temp.graphCST(str, count)};\n`);
    });
    return NUMID;
  }
}
