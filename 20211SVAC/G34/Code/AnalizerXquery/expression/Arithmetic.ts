import { SymbolTable, SymbolTableXQuery } from "../../Structure/TableSymbol";
import { Expression } from "./Expression";
import { XqueryValue } from "../AstXquery";
import { AST } from "../../Structure/Estructura_traduccion/AST";
import * as Globals3d from "../../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../../Structure/Estructura_traduccion/Listado_enums";
import { Graph } from "../../Util";


export class Arithmetic extends Expression {

  constructor(
    line: number,
    column: number,
    public childleft: Expression,
    public childright: Expression,
    public operator: string
  ) {
    super(line, column);
  }

  public traducir(symbolTable: SymbolTable) {
    this.childleft.traducir(symbolTable);
    this.childright.traducir(symbolTable);

    if (this.childleft.tipoValor == enumGlobal.TIPO_PRIMITIVO.NUMERICO && this.childright.tipoValor == enumGlobal.TIPO_PRIMITIVO.NUMERICO) {
      this.valor_temporal = Globals3d.getTemporal3d();
      Globals3d.str_codigo3d.setValor(this.valor_temporal + " = " + this.childleft.valor_temporal + this.getSigno() + this.childright.valor_temporal + ";")
      this.tipoValor = enumGlobal.TIPO_PRIMITIVO.NUMERICO;
    } else if (this.childleft.tipoValor == enumGlobal.TIPO_PRIMITIVO.CADENA || this.childright.tipoValor == enumGlobal.TIPO_PRIMITIVO.CADENA) {
      let izq: string = this.childleft.valor_temporal;
      let der: string = this.childright.valor_temporal;
      if (this.childleft.tipoValor == enumGlobal.TIPO_PRIMITIVO.NUMERICO) {
        let pivote: string = Globals3d.getTemporal3d();
        Globals3d.str_codigo3d.setValor(pivote + " = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
        Globals3d.str_codigo3d.setValor(pivote + " = " + pivote + " + 1;");
        Globals3d.str_codigo3d.setValor("Stack[(int)" + pivote + "] = " + this.childleft.valor_temporal + ";");
        Globals3d.str_codigo3d.setValor("SP = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
        Globals3d.str_codigo3d.setValor("convertir_numero_macano();");
        let resultado: string = Globals3d.getTemporal3d();
        Globals3d.str_codigo3d.setValor(resultado + " = Stack[(int)SP];");
        Globals3d.str_codigo3d.setValor("SP = SP - " + Globals3d.tsGlobal.getVariablesLocales() + ";");
        izq = resultado;
      }

      if (this.childright.tipoValor == enumGlobal.TIPO_PRIMITIVO.NUMERICO) {
        let pivote: string = Globals3d.getTemporal3d();
        Globals3d.str_codigo3d.setValor(pivote + " = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
        Globals3d.str_codigo3d.setValor(pivote + " = " + pivote + " + 1;");
        Globals3d.str_codigo3d.setValor("Stack[(int)" + pivote + "] = " + this.childright.valor_temporal + ";");
        Globals3d.str_codigo3d.setValor("SP = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
        Globals3d.str_codigo3d.setValor("convertir_numero_macano();");
        let resultado: string = Globals3d.getTemporal3d();
        Globals3d.str_codigo3d.setValor(resultado + " = Stack[(int)SP];");
        Globals3d.str_codigo3d.setValor("SP = SP - " + Globals3d.tsGlobal.getVariablesLocales() + ";");
        der = resultado;
      }

      if (this.operator === "+") {
        this.tipoValor = enumGlobal.TIPO_PRIMITIVO.CADENA;
        let pivote: string = Globals3d.getTemporal3d();
        Globals3d.str_codigo3d.setValor(pivote + " = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
        Globals3d.str_codigo3d.setValor(pivote + " = " + pivote + " + 1;");
        Globals3d.str_codigo3d.setValor("Stack[(int)" + pivote + "] = " + izq + ";");
        Globals3d.str_codigo3d.setValor(pivote + " = " + pivote + " + 1;");
        Globals3d.str_codigo3d.setValor("Stack[(int)" + pivote + "] = " + der + ";");
        Globals3d.str_codigo3d.setValor("SP = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
        Globals3d.str_codigo3d.setValor("concatenar_cadenas_macano();");
        let resultado: string = Globals3d.getTemporal3d();
        Globals3d.str_codigo3d.setValor(resultado + " = Stack[(int)SP];");
        Globals3d.str_codigo3d.setValor("SP = SP - " + Globals3d.tsGlobal.getVariablesLocales() + ";");
        this.valor_temporal = resultado;
        this.tipoValor = enumGlobal.TIPO_PRIMITIVO.CADENA;
      } else {
        // error no se puede operar
      }
    }
  }

  getSigno(): String {
    if (this.operator == "div") {
      return "/";
    } else if (this.operator == "*") {
      return "*";
    } else if (this.operator == "-") {
      return "-";
    } else if (this.operator == "+") {
      return "+";
    } else {
      return "%";
    }
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    let valleft = this.childleft.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );
    let valright = this.childright.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );
    if (Number.isNaN(valleft) || Number.isNaN(valright)) {
      throw new Error("Error no se puede operar valores distintos a numeros!");
    }
    valleft = Number(valleft);
    valright = Number(valright);
    if (this.operator === "+") {
      this.value = valleft + valright;
    } else if (this.operator === "-") {
      this.value = valleft - valright;
    } else if (this.operator === "*") {
      this.value = valleft * valright;
    } else if (this.operator === "div") {
      if (valright !== 0) this.value = valleft / valright;
      else throw new Error("No se puede dividir dentro de 0");
    } else if (this.operator === "mod") {
      if (valright !== 0) this.value = valleft % valright;
      else throw new Error("No se puede sacar el modulo dentro de 0");
    }
    return this.value;
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="${this.operator}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${this.childleft.graphAST(str, count)};
        node${NUMID} -> node${this.childright.graphAST(str, count)};
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    const numleft = this.childleft.graphCST(str, count);
    const numright = this.childright.graphCST(str, count);
    str.push(`
        node${NUMID}[label="ARITMETICAS",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="${this.operator}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador() - 1} -> node${numleft};
        node${count.getContador() - 1} -> node${numright};
      `);
    return NUMID;
  }
}
