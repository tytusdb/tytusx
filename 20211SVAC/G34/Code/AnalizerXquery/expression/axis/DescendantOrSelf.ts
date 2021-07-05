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

export class DescendantOrSelf extends Axis implements relativeexpression {
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
      const aux = symbolTable.getSymbolByIndex(indexParent);
      if (aux?.indexParent === undefined) {
        const actual = symbolTable.getAllSymbolsByParent(0);
        const respuesta: Array<SymbolXml> = [];
        if (aux && aux.node.name === this.nameAxis) {
          respuesta.push(aux);
        }
        this.fillResult(actual, respuesta, symbolTable);
        this.value = respuesta;
        return this.value;
      } else {
        const actual = symbolTable.getAllSymbolsByParent(aux?.indexParent);
        const respuesta: Array<SymbolXml> = [];
        this.fillResult(actual, respuesta, symbolTable);
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
    const respuesta: Array<SymbolXml> = [];
    if (indexParent !== undefined) {
      const actual = symbolTable.getAllSymbolsByParent(indexParent);
      const padre = symbolTable.getSymbolByIndex(indexParent);
      if (padre && padre.node.name === this.nameAxis) {
        respuesta.push(padre);
      }
      this.fillResult(actual, respuesta, symbolTable);
    }
    this.value = respuesta;
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
        node${NUMID}[label="DESCENDANT-OR-SELF",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="${this.nameAxis}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
