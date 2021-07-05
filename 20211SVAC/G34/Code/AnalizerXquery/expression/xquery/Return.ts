import { SymbolTableXQuery, SymbolTable } from "../../../Structure/TableSymbol";
import { Graph } from "../../../Util";
import { XqueryValue } from "../../AstXquery";
import { Expression } from "../Expression";
import { AST } from "../../../Structure/Estructura_traduccion/AST";
import * as Globals3d from "../../../Structure/Estructura_traduccion/Estructuras_estaticas"

export class Return extends Expression {

  constructor(line: number, column: number, public expression: Expression) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    this.value = this.expression.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );
    return this.value;
  }


  public traducir(symbolTable: SymbolTable) {
    this.expression.traducir(symbolTable);
    this.tipoValor = this.expression.tipoValor;
    Globals3d.str_codigo3d.setValor("Stack[(int)SP] = " + this.expression.valor_temporal + ";");
    Globals3d.str_codigo3d.setValor("goto " + Globals3d.etqSalida + ";");
  }
  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="return",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${this.expression.graphAST(str, count)};
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    const numleft = this.expression.graphCST(str, count);
    str.push(`
        node${NUMID}[label="RETURN",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="return",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador() - 1} -> node${numleft};
      `);
    return NUMID;

  }
}
