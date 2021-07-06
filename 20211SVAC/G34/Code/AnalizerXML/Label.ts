import { NodeXml } from "./ASTXML";
import { Attribute } from "./Attribute";
import { Graph } from "../Util/Graph";
import { SymbolTable, SymbolXml } from "../Structure/TableSymbol";

export class Label extends NodeXml {
  private children: Array<Label>;
  private attributes: Array<Attribute>;
  id_open: string; //etiqueta apertura
  id_close: string; //etiqueta cierre
  isAutomaticClosing: boolean; // Si tiene etiqueta de apertura y cierre (<a />)

  constructor(
    id_open: string,
    id_close: string,
    name: string,
    isAutomaticClosing: boolean,
    children: Array<Label>,
    attribute: Array<Attribute>,
    value: string | undefined,
    line: number,
    column: number
  ) {
    super(name, value, line, column);
    this.children = children;
    this.attributes = attribute;
    this.id_open = id_open;
    this.id_close = id_close;
    this.isAutomaticClosing = isAutomaticClosing;
  }

  save(symbolTable: SymbolTable, indexParent: number): void {
    const symbol = new SymbolXml(this, indexParent);
    const myIndex = symbolTable.saveSymbol(symbol);
    symbol.setIndex(myIndex);
    this.children.forEach((child) => child.save(symbolTable, myIndex));
    this.attributes.forEach((attr) => attr.save(symbolTable, myIndex));
  }

  graph(tree: string[], count: Graph): number {
    const NUMID = count.incrementCount();
    tree.push(`
    node${NUMID}[label="ETIQUETA",fillcolor="LightBlue", style ="filled", shape="box"];    
    node${count.getContador()}[label="${this.id_open}",
    fillcolor="LightBlue", style ="filled", shape="box"];
    node${NUMID} -> node${count.incrementCount()};
    `);

    this.attributes.forEach((attr) =>
      tree.push(`node${NUMID} -> node${attr.graph(tree, count)}`)
    );

    if (this.value !== undefined) {
      tree.push(`
        node${count.getContador()}[label="${this.value}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        `);
    }

    this.children.forEach((child) =>
      tree.push(`node${NUMID} -> node${child.graph(tree, count)}`)
    );
    tree.push(`
        node${count.getContador()}[label="${this.id_close}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        `);
    return NUMID;
  }

  xmlRepresentation(documentXml: string[], level: number): void {
    const spaces: string = level > 0 ? "  ".repeat(level * 2) : "";
    if (this.isAutomaticClosing) {
      documentXml.push(`${spaces}<${this.id_open}`);
      this.attributes.forEach((attr) => attr.xmlRepresentation(documentXml));
      documentXml.push(" />\n");
    } else {
      documentXml.push(`${spaces}<${this.id_open}`);
      this.attributes.forEach((attr) => attr.xmlRepresentation(documentXml));
      documentXml.push(">\n");
      if (this.value !== undefined) {
        documentXml.push(`${spaces}  ${this.value}\n`);
      }
      this.children.forEach((child) =>
        child.xmlRepresentation(documentXml, level + 1)
      );
      documentXml.push(`${spaces}</${this.id_close}>\n`);
    }
  }
}
