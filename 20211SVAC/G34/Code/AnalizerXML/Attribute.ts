import { NodeXml } from "./ASTXML";
import { SymbolTable } from "../Structure/TableSymbol/SymbolTable";
import { SymbolXml } from "../Structure/TableSymbol";
import { Graph } from "../Util/Graph";

export class Attribute extends NodeXml {
  constructor(
    name: string,
    value: string | undefined,
    line: number,
    column: number
  ) {
    super(name, value, line, column);
  }

  save(symbolTable: SymbolTable, indexParent: number): void {
    const symbol = new SymbolXml(this, indexParent);
    const myIndex = symbolTable.saveSymbol(symbol);
    symbol.setIndex(myIndex);
  }

  graph(tree: string[], count: Graph): number {
    const NUMID = count.incrementCount();
    tree.push(`
        node${NUMID}[label="ATRIBUTO",
        fillcolor="LightBlue", style ="filled", shape="box"];    
        node${count.getContador()}[label="${this.name}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador()}[label="${this.value}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }

  xmlRepresentation(documentXml: string[]): void {
    documentXml.push(` ${this.name}="${this.value}"`);
  }
}
