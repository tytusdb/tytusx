import { SymbolTable, SymbolTableXQuery } from "../../Structure/TableSymbol";
import { Expression } from "./Expression";
import { XqueryValue } from "../AstXquery";
import { AST } from "../../Structure/Estructura_traduccion/AST";
import { Graph } from "../../Util";


export class NodeAll extends Expression {

  public name: string;

  constructor(line: number, column: number) {
    super(line, column);
    this.name = "*";
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    if (indexParent === undefined) {
      // Viene La raiz
      const current = symbolTable.getSymbolByIndex(0);
      if (current !== undefined) {
        const child = symbolTable.getSymbolChildren(current);
        this.value = child;
      }
    } else {
      const current = symbolTable.getSymbolByIndex(indexParent);
      if (current !== undefined) {
        const child = symbolTable.getSymbolChildren(current);
        this.value = child;
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
        node${NUMID}[label="*",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="TODO(*)",
        fillcolor="LightBlue", style ="filled", shape="box"];    
        node${count.getContador()}[label="*",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
