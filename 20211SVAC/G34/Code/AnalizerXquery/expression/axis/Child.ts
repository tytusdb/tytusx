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

export class Child extends Axis implements relativeexpression {
  constructor(line: number, column: number) {
    super(line, column);
  }

  interpretrelative(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    if (indexParent === undefined && this.nameAxis !== undefined) {
      if (this.nameAxis === "*") {
        this.value = symbolTable.getAllSymbols();
        return this.value;
      } else {
        this.value = symbolTable.getSymbolsByName(this.nameAxis);
        return this.value;
      }
    } else if (indexParent !== undefined && this.nameAxis !== undefined) {
      const actual = symbolTable.getAllSymbolsByParent(indexParent);
      const respuesta: Array<SymbolXml> = [];
      this.fillResult(actual, respuesta, symbolTable);
      this.value = respuesta;
      return this.value;
    }
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    if (indexParent !== undefined) {
      if (this.nameAxis !== undefined) {
        if (this.nameAxis === "*") {
          const actual = symbolTable.getAllSymbolsByParent(indexParent);
          this.value = actual;
          return this.value;
        } else {
          const actual = symbolTable.getSymbolsByParent(
            this.nameAxis,
            indexParent
          );
          this.value = actual;
          return this.value;
        }
      }
    }
    this.value = [];
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
        node${NUMID}[label="CHILD",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="${this.nameAxis}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
