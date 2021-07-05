import { Expression } from "../Expression";
import {
  SymbolTableXQuery,
  SymbolTable,
  SymbolXml,
} from "../../../Structure/TableSymbol";
import { Graph } from "../../../Util";

export class OrderBy {
  constructor(
    public line: number,
    public column: number,
    public expression: Expression
  ) { }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): Array<number> {
    const valueExp = this.expression.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );

    if (Array.isArray(valueExp)) {
      return valueExp
        .map((value, index) => ({
          index,
          value,
        }))
        .sort((prev, current) => {
          let { value: value1 } = prev;
          let { value: value2 } = current;
          if (value1 instanceof SymbolXml) {
            value1 = value1.node.value;
            if (value2 instanceof SymbolXml) {
              value2 = value2.node.value;
            }
          } else if (value2 instanceof SymbolXml) {
            value2 = value2.node.value;
            if (value1 instanceof SymbolXml) {
              value1 = value1.node.value;
            }
          }
          if (value1 !== undefined && value2 !== undefined) {
            if (value1 > value2) {
              return 1;
            } else if (value1 < value2) {
              return -1;
            }
          }
          return 0;
        })
        .map((value) => value.index);
    }
    return [];
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="Order by",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${this.expression.graphAST(str, count)};
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    const numleft = this.expression.graphCST(str, count);
    str.push(`
        node${NUMID}[label="ORDER BY",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="order by",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador() - 1} -> node${numleft};
      `);
    return NUMID;
  }
}
