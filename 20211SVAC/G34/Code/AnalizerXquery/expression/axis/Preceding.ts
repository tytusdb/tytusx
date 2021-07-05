import { XqueryValue } from "../..";
import {
  SymbolTable,
  SymbolTableXQuery,
  SymbolXml,
} from "../../../Structure/TableSymbol";
import { Graph } from "../../../Util";
import { relativeexpression } from "../../AstXquery";
import { Axis } from "./Axis";
import { AST } from "../../../Structure/Estructura_traduccion/AST";

export class Preceding extends Axis implements relativeexpression {
  interpretrelative(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    const coincidences: Array<SymbolXml> = [];
    if (indexParent !== undefined) {
      const currentSymbol = symbolTable.getSymbolByIndex(indexParent);
      if (currentSymbol) {
        const siblingSymbols = symbolTable
          .getAllSymbolsByParent(currentSymbol.indexParent)
          .filter((sym) => sym.getIndex() < currentSymbol.getIndex());
        this.fillResult(siblingSymbols, coincidences, symbolTable);
      }
    }
    this.value = coincidences;
    return this.value;
  }
  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    const coincidences: Array<SymbolXml> = [];
    if (indexParent !== undefined) {
      const currentSymbol = symbolTable.getSymbolByIndex(indexParent);
      if (currentSymbol) {
        const siblingSymbols = symbolTable
          .getAllSymbolsByParent(currentSymbol.indexParent)
          .filter((sym) => sym.getIndex() < currentSymbol.getIndex());
        this.fillResult(siblingSymbols, coincidences, symbolTable);
      }
    }
    this.value = coincidences;
    return this.value;
  }

  public traducir(symbolTable: SymbolTable) {
    throw new Error("Method not implemented.");
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="${this.nameAxis}",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="PRECEDING",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="${this.nameAxis}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
