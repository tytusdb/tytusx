import { Expression } from "..";
import { XqueryValue } from "../..";
import { AST } from "../../../Structure/Estructura_traduccion/AST";
import { SymbolTable, SymbolTableXQuery } from "../../../Structure/TableSymbol";
import * as Globals3d from "../../../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../../../Structure/Estructura_traduccion/Listado_enums"
import { Graph } from "../../../Util";

export class ObtenerVariable extends Expression {
  public graphAST(str: string[], count: Graph): number {
    throw new Error("Method not implemented.");
  }
  public graphCST(str: string[], count: Graph): number {
    throw new Error("Method not implemented.");
  }

  constructor(
    line: number,
    column: number,
    public identificador: string
  ) {
    super(line, column);
  }

  public interpret(symbolTable: SymbolTable, indexParent: number | undefined, symbolTableXquery: SymbolTableXQuery): XqueryValue {
    throw new Error("Method not implemented.");
  }
  public traducir(symbolTable: SymbolTable) {
    let variable = Globals3d.tsGlobal.getSimbolo(this.identificador);
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

}