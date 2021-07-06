import {
  SymbolTable,
  SymbolTableXQuery,
  SymbolXml,
} from "../../Structure/TableSymbol";
import { Expression } from "./Expression";
import { relativeexpression, XqueryValue } from "../AstXquery";
import { AST } from "../../Structure/Estructura_traduccion/AST";
import { Graph } from "../../Util";


export class atributo extends Expression implements relativeexpression {
  constructor(line: number, column: number, public name: string) {
    super(line, column);
  }
  interpretrelative(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    if (indexParent === undefined) {
      if (this.name === "*") {
        this.value = symbolTable.getAllAttribute();
        return this.value;
      } else {
        this.value = symbolTable.getattributeByName(this.name);
        return this.value;
      }
    } else if (indexParent !== undefined && this.name !== undefined) {
      const aux = symbolTable.getSymbolByIndex(indexParent);
      if (aux?.indexParent === undefined) {
        const actual = symbolTable.getAllSymbolsByParent(0);
        const respuesta: Array<SymbolXml> = [];
        this.obteneratributos(actual, respuesta, symbolTable, this.name);
        this.value = respuesta;
        return this.value;
      } else {
        const actual = symbolTable.getAllSymbolsByParent(aux.indexParent);
        const respuesta: Array<SymbolXml> = [];
        this.obteneratributos(actual, respuesta, symbolTable, this.name);
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
    console.log(indexParent);
    if (indexParent !== undefined) {
      if (this.name !== undefined) {
        if (this.name === "*") {
          const actual = symbolTable.getAllAttributeByParent(indexParent);
          this.value = actual;
          return this.value;
        } else {
          const actual = symbolTable.getAttributeByParent(
            this.name,
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
        node${NUMID}[label="${this.name}",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="ATRIBUTO",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="@",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador()}[label="${this.name}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
