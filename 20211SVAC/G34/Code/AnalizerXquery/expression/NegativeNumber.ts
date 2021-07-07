import { SymbolTable, SymbolTableXQuery } from "../../Structure/TableSymbol";
import { Expression } from "./Expression";
import { XqueryValue } from "../AstXquery";
import { AST } from "../../Structure/Estructura_traduccion/AST";
import * as Globals3d from "../../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../../Structure/Estructura_traduccion/Listado_enums";
import { Graph } from "../../Util";

export class NegativeNumber extends Expression {

  constructor(line: number, column: number, public child: Expression) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    let valchild = this.child.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );
    if (Number.isNaN(valchild)) {
      throw new Error("Error no se puede operar valores distintos a numeros!");
    }
    valchild = Number(valchild);
    this.value = -valchild;
    return this.value;
  }

  public traducir(symbolTable: SymbolTable) {
    this.tipoValor = enumGlobal.TIPO_PRIMITIVO.NUMERICO;
    this.child.traducir(symbolTable);
    this.valor_temporal = Globals3d.getTemporal3d();
    let negativo: string = Globals3d.getTemporal3d();
    Globals3d.str_codigo3d.setValor(negativo + " = 0 - 1;");
    Globals3d.str_codigo3d.setValor(this.valor_temporal + " = " + this.child.valor_temporal + " * " + negativo + ";");
  }
  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="-",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${this.child.graphAST(str, count)};
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    const numleft = this.child.graphCST(str, count);
    str.push(`
        node${NUMID}[label="NEGATIVO",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="-",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador() - 1} -> node${numleft};
      `);
    return NUMID;
  }
}
