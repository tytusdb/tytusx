import { XqueryValue } from "../..";
import { SymbolTable, SymbolTableXQuery } from "../../../Structure/TableSymbol";
import { Graph } from "../../../Util";
import { relativeexpression } from "../../AstXquery";
import { Axis } from "./Axis";
import { AST } from "../../../Structure/Estructura_traduccion/AST";


export class AncestorOrSelf extends Axis implements relativeexpression {
  constructor(line: number, column: number) {
    super(line, column);
  }

  interpretrelative(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    if (this.nameAxis !== undefined) {
      if (this.nameAxis === "*") {
        this.value = [symbolTable.getSymbolByIndex(0)];
        return this.value;
      } else {
        this.value = symbolTable.getSymbolsByName(this.nameAxis);
        return this.value;
      }
    }
  }
  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined
  ): XqueryValue {
    if (indexParent) {
      if (this.nameAxis === "*") {
        this.value = [symbolTable.getSymbolByIndex(0)];
        return this.value;
      } else {
        let auxiliar = symbolTable.getSymbolByIndex(indexParent);
        while (auxiliar !== undefined) {
          if (auxiliar.node.name === this.nameAxis) {
            this.value = [auxiliar];
            return this.value;
          } else {
            if (auxiliar.indexParent !== undefined) {
              auxiliar = symbolTable.getSymbolByIndex(auxiliar.indexParent);
            } else {
              return [];
            }
          }
        }
      }
    }
    return [];
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
        node${NUMID}[label="ANCESTOR-OR-SELF",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="${this.nameAxis}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
