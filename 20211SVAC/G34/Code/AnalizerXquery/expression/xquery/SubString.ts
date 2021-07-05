import { AST } from "../../../Structure/Estructura_traduccion/AST";
import {
  SymbolTableXQuery,
  SymbolTable,
  SymbolXml,
} from "../../../Structure/TableSymbol";
import { Graph } from "../../../Util";
import { XqueryValue } from "../../AstXquery";
import { Expression } from "../Expression";

export class SubString extends Expression {
  constructor(
    line: number,
    column: number,
    public expressionstring: Expression,
    public expressionstart: Expression,
    public expressionend: Expression | undefined
  ) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    const text = this.expressionstring.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );
    const starttext = this.expressionstart.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );

    const start = Number(starttext) - 1;

    const endtext = this.expressionend?.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );

    const end = Number(endtext) + 1;

    if (Array.isArray(text)) {
      const coincidencia: Array<string> = [];
      text.forEach((temp) => {
        if (temp instanceof SymbolXml) {
          this.SubStr(temp, coincidencia, symbolTable, start, end);
        } else {
          temp && coincidencia.push(temp.toString().substring(start, end));
        }
      });
      this.value = coincidencia;
    } else {
      this.value = text?.toString().substring(start, end);
    }

    return this.value;
  }

  public SubStr(
    current: SymbolXml,
    coincidences: Array<string>,
    symbolTable: SymbolTable,
    start: number,
    end: number
  ): void {
    if (current.node.value !== undefined)
      coincidences.push(current.node.value.toString().substring(start, end));
    const index = symbolTable.getIndex(current);
    const currentSymbols = symbolTable.getAllSymbolsByParent(index);
    for (const iterator of currentSymbols) {
      this.SubStr(iterator, coincidences, symbolTable, start, end);
    }
  }


  public traducir(symbolTable: SymbolTable) {
    throw new Error("Method not implemented.");
  }
  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="substring",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${this.expressionstring.graphAST(str, count)};
        node${NUMID} -> node${this.expressionstart.graphAST(str, count)};
      `);
    if (this.expressionend !== undefined) {
      str.push(
        `node${NUMID} -> node${this.expressionend.graphAST(str, count)};\n`
      );
    }
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    const numstring = this.expressionstring.graphCST(str, count);
    const numleft = this.expressionstart.graphCST(str, count);
    const numend = this.expressionend?.graphCST(str, count);
    str.push(`
        node${NUMID}[label="SUBSTRING",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="substring",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador() - 1} -> node${numstring};
        node${count.getContador() - 1} -> node${numleft};
      `);
    if (numend !== undefined) {
      str.push(`node${count.getContador() - 1} -> node${numend};\n`);
    }
    return NUMID;
  }
}
