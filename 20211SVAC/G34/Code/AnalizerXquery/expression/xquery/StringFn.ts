import { AST } from "../../../Structure/Estructura_traduccion/AST";
import {
  SymbolTableXQuery,
  SymbolTable,
  SymbolXml,
} from "../../../Structure/TableSymbol";
import { Graph } from "../../../Util";
import { XqueryValue } from "../../AstXquery";
import { Expression } from "../Expression";
import * as Globals3d from "../../../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../../../Structure/Estructura_traduccion/Listado_enums";

export class StringFn extends Expression {

  constructor(line: number, column: number, public expression: Expression) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    const result = this.expression.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );
    if (Array.isArray(result)) {
      const coincidencia: Array<string> = [];
      result.forEach((temp) => {
        if (temp instanceof SymbolXml) {
          this.Str(temp, coincidencia, symbolTable);
        } else {
          temp && coincidencia.push(temp.toString());
        }
      });
      this.value = coincidencia;
    } else {
      this.value = result?.toString();
    }
    return this.value;
  }

  public Str(
    current: SymbolXml,
    coincidences: Array<string>,
    symbolTable: SymbolTable
  ): void {
    if (current.node.value !== undefined)
      coincidences.push(current.node.value.toString());
    const index = symbolTable.getIndex(current);
    const currentSymbols = symbolTable.getAllSymbolsByParent(index);
    for (const iterator of currentSymbols) {
      this.Str(iterator, coincidences, symbolTable);
    }
  }


  public traducir(symbolTable: SymbolTable) {
    this.expression.traducir(symbolTable);
    let pivote: string = Globals3d.getTemporal3d();
    Globals3d.str_codigo3d.setValor(pivote + " = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
    Globals3d.str_codigo3d.setValor(pivote + " = " + pivote + " + 1;");
    Globals3d.str_codigo3d.setValor("Stack[(int)" + pivote + "] = " + this.expression.valor_temporal + ";");
    Globals3d.str_codigo3d.setValor("SP = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
    Globals3d.str_codigo3d.setValor("convertir_numero_macano();");
    let resultado: string = Globals3d.getTemporal3d();
    Globals3d.str_codigo3d.setValor(resultado + " = Stack[(int)SP];");
    Globals3d.str_codigo3d.setValor("SP = SP - " + Globals3d.tsGlobal.getVariablesLocales() + ";");
    this.valor_temporal = this.expression.valor_temporal;
    this.tipoValor = enumGlobal.TIPO_PRIMITIVO.CADENA;
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="string",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${this.expression.graphAST(str, count)};
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    const numleft = this.expression.graphCST(str, count);
    str.push(`
        node${NUMID}[label="STRING",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="string",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador() - 1} -> node${numleft};
      `);
    return NUMID;
  }
}
