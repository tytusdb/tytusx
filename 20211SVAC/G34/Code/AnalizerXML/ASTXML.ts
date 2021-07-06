import { SymbolTable } from "../Structure/TableSymbol/SymbolTable";
import { Graph } from "../Util/Graph";

export abstract class NodeXml {
  name: string;
  value: string | undefined;
  line: number;
  column: number;

  constructor(
    name: string,
    value: string | undefined,
    line: number,
    column: number
  ) {
    this.name = name;
    this.value = value;
    this.line = line;
    this.column = column;
  }

  abstract save(
    symbolTable: SymbolTable,
    indexParent: number | undefined
  ): void;

  abstract graph(tree: Array<string>, count: Graph): number;

  abstract xmlRepresentation(documentXml: Array<string>, level: number): void;
}

export class AstXml {
  constructor(private nodes: Array<NodeXml>) {}

  createSymbolTable(): SymbolTable {
    const symbolTable = new SymbolTable();
    this.nodes.forEach((node) => {
      node.save(symbolTable, undefined);
    });
    return symbolTable;
  }

  graph(): string {
    const tree: Array<string> = [];
    const count: Graph = new Graph();
    const NUMID = count.incrementCount();
    const encabezado = `digraph AST 
        {
        rankdir=TB; 
        node[shape = box, style = filled, color = white];
        node${NUMID}[label="CST XML"];
        `;
    tree.push(encabezado);
    this.nodes.forEach((node) =>
      tree.push(`node${NUMID} -> node${node.graph(tree, count)};`)
    );
    tree.push("\n}\n");
    return tree.join("");
  }
}
