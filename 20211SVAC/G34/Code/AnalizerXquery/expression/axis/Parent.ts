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

export class Parent extends Axis implements relativeexpression {
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
      const aux = symbolTable.getSymbolByIndex(indexParent);
      if (aux?.indexParent === undefined) {
        this.value = symbolTable.getAllSymbols();
        return this.value;
      } else {
        const actual = symbolTable.getAllSymbolsByParent(aux.indexParent);
        const respuesta: Array<SymbolXml> = [];
        const aux2 = symbolTable.getSymbolByIndex(aux.indexParent);
        if (
          aux2 !== undefined &&
          (aux2?.node.name === this.nameAxis || this.nameAxis === "*")
        ) {
          respuesta.push(aux2);
        }
        if (aux.node.name === this.nameAxis || this.nameAxis === "*") {
          respuesta.push(aux);
        }

        this.resultparent(actual, respuesta, symbolTable, indexParent);
        this.value = respuesta;
        return this.value;
      }
    }
  }
  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    const result: Array<SymbolXml> = [];
    if (indexParent) {
      const currentSymbol = symbolTable.getSymbolByIndex(indexParent);
      if (currentSymbol && currentSymbol.indexParent !== undefined) {
        const parentSymbol = symbolTable.getSymbolByIndex(
          currentSymbol.indexParent
        );
        if (
          parentSymbol &&
          (parentSymbol.node.name === this.nameAxis || this.nameAxis === "*")
        ) {
          result.push(parentSymbol);
        }
      }
    }
    this.value = result;
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
        node${NUMID}[label="PARENT",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="${this.nameAxis}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
