import { SymbolTableXQuery, SymbolTable } from "../../../Structure/TableSymbol";
import { Graph } from "../../../Util";
import { XqueryValue } from "../../AstXquery";
import { Expression } from "../Expression";
import { AST } from "../../../Structure/Estructura_traduccion/AST";
import * as Globals3d from "../../../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../../../Structure/Estructura_traduccion/Listado_enums";

export class Assigment extends Expression {

  constructor(
    line: number,
    column: number,
    public id_xquery: string,
    public expression: Expression
  ) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    const isExist = symbolTableXquery.getVariable(this.id_xquery);
    if (isExist !== undefined) {
      throw new Error(
        "La variable ya fue declarada, Fila: " +
        this.line +
        ", Columna:" +
        this.column
      );
    }
    this.value = symbolTableXquery.setVariable(
      this.id_xquery,
      this.expression.interpret(symbolTable, indexParent, symbolTableXquery)
    );
    return this.value;
  }

  public traducir(symbolTable: SymbolTable) {
    this.tipoValor = enumGlobal.TIPO_PRIMITIVO.CADENA;
    this.expression.traducir(symbolTable);
    let pivote: string = Globals3d.getTemporal3d();
    Globals3d.str_codigo3d.setValor(pivote + " = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
    Globals3d.str_codigo3d.setValor(pivote + " = " + pivote + " + 1;");
    Globals3d.str_codigo3d.setValor("Stack[(int)" + pivote + "] = " + this.expression.valor_temporal + ";");
    Globals3d.str_codigo3d.setValor("SP = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
    let resultado: string = Globals3d.getTemporal3d();
    Globals3d.str_codigo3d.setValor(resultado + " = Stack[(int)SP];");
    Globals3d.str_codigo3d.setValor("SP = SP - " + Globals3d.tsGlobal.getVariablesLocales() + ";");
    this.valor_temporal = resultado;
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="${this.id_xquery}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${this.expression.graphAST(str, count)};
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    const numleft = this.expression.graphCST(str, count);
    str.push(`
        node${NUMID}[label="ASSIGMENT",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="${this.id_xquery}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador() - 1} -> node${numleft};
      `);
    return NUMID;
  }
}
