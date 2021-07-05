import { SymbolTableXQuery, SymbolTable } from "../../../Structure/TableSymbol";
import { Graph } from "../../../Util";
import { XqueryValue } from "../../AstXquery";
import { Expression } from "../Expression";
import { AST } from "../../../Structure/Estructura_traduccion/AST";
import * as Globals3d from "../../../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../../../Structure/Estructura_traduccion/Listado_enums"

export class IdentifierXquery extends Expression {

  constructor(line: number, column: number, public name: string) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    const isExist = symbolTableXquery.getVariable(this.name);
    if (isExist !== undefined) {
      this.value = isExist;
      return this.value;
    }
    throw new Error("Error la variable no ha sido declarada.");
  }

  public traducir(symbolTable: SymbolTable) {
    let variable = Globals3d.tsGlobal.getSimbolo(this.name);
    if (variable != "ERROR") {
      if (variable.tipo == enumGlobal.TIPO_PRIMITIVO.CADENA || variable.tipo == enumGlobal.TIPO_PRIMITIVO.NUMERICO) {
        this.tipoValor = variable.tipo;
        if (variable.entorno == "GLOBAL") {
          this.valor_temporal = Globals3d.getTemporal3d();
          Globals3d.str_codigo3d.setValor(this.valor_temporal + " = Heap[(int)" + variable.posicion + "];");
        } else {
          this.valor_temporal = Globals3d.getTemporal3d();
          let pivote: string = Globals3d.getTemporal3d();
          Globals3d.str_codigo3d.setValor(pivote + " = SP + " + variable.posicion + ";")
          Globals3d.str_codigo3d.setValor(this.valor_temporal + " = Stack[(int)" + pivote + "];");
        }
      }
    }
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
        node${NUMID}[label="ID",
        fillcolor="LightBlue", style ="filled", shape="box"];    
        node${count.getContador()}[label="${this.name}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
