import {
  SymbolTable,
  SymbolTableXQuery,
  SymbolXml,
} from "../../Structure/TableSymbol";
import { Expression } from "./Expression";
import { XqueryValue } from "../AstXquery";
import { AST } from "../../Structure/Estructura_traduccion/AST";
import * as Globals3d from "../../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../../Structure/Estructura_traduccion/Listado_enums";
import { Graph } from "../../Util";

type primitiveType = string | number | boolean;

export class Relational extends Expression {
  public arrValue: XqueryValue;
  constructor(
    line: number,
    column: number,
    public childleft: Expression,
    public childright: Expression,
    public operator: string
  ) {
    super(line, column);
  }

  private verifyCondition(
    valleft: primitiveType,
    valright: primitiveType
  ): boolean {
    if (typeof valleft !== typeof valright) {
      console.log("izquierdo:", valleft);
      console.log("derecha:", valright);
      throw new Error(
        "Error solamente se puede operar entre valores del mismo tipo!"
      );
    }

    if (this.operator === "<") {
      return valleft < valright;
    } else if (this.operator === ">") {
      return valleft > valright;
    } else if (this.operator === "<=") {
      return valleft <= valright;
    } else if (this.operator === ">=") {
      return valleft >= valright;
    } else if (this.operator === "=") {
      return valleft === valright;
    } else if (this.operator === "!=") {
      return valleft !== valright;
    }
    return false;
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    const valleft = this.childleft.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );
    const valright = this.childright.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );

    if (
      Array.isArray(valleft) &&
      (typeof valright === "number" || typeof valright === "string")
    ) {
      const result = valleft.map((val) => {
        if (val instanceof SymbolXml) {
          const nodeValue = val.node.value || "0";
          const newVal = typeof valright === "number" ? +nodeValue : nodeValue;
          const check =
            (typeof valright === "number" || typeof valright === "string") &&
            this.verifyCondition(newVal, valright);
          return check;
        }
        if (
          typeof val === "string" ||
          typeof val === "number" ||
          typeof val === "boolean"
        ) {
          const check =
            (typeof valright === "number" || typeof valright === "string") &&
            this.verifyCondition(val, valright);
          return check;
        }
        return false;
      });
      this.arrValue = result;
      const length = result.length;
      if (length > 1) {
        let val = result[0];
        for (let index = 1; index < length; index++) {
          val = val || result[index];
        }
        this.value = val;
      } else {
        this.value = result[0] || false;
      }
      return this.value;
    }

    if (
      (typeof valleft === "number" || typeof valright === "string") &&
      Array.isArray(valright)
    ) {
      const result = valright.map((val) => {
        if (val instanceof SymbolXml) {
          const nodeValue = val.node.value || "0";
          const newVal = typeof valleft === "number" ? +nodeValue : nodeValue;
          const check =
            (typeof valright === "number" || typeof valright === "string") &&
            this.verifyCondition(valright, newVal);
          return check;
        }
      });
      this.arrValue = result;
      const length = result.length;
      if (length > 1) {
        let val = result[0];
        for (let index = 1; index < length; index++) {
          val = val || result[index];
        }
        this.value = val;
      } else {
        this.value = result[0] || false;
      }
      return this.value;
    }

    if (
      (typeof valleft === "string" ||
        typeof valleft === "number" ||
        typeof valleft === "boolean") &&
      (typeof valright === "string" ||
        typeof valright === "number" ||
        typeof valright === "boolean")
    ) {
      this.value = this.verifyCondition(valleft, valright);
    } else {
      this.value = false;
    }
    this.arrValue = this.value;
    return this.value;
  }


  public traducir(symbolTable: SymbolTable) {
    this.childleft.traducir(symbolTable);
    this.childright.traducir(symbolTable);

    if (this.childleft.tipoValor == enumGlobal.TIPO_PRIMITIVO.NUMERICO && this.childright.tipoValor == enumGlobal.TIPO_PRIMITIVO.NUMERICO) {
      let verdadera: string = Globals3d.getEtiqueta3d();
      let falsa: string = Globals3d.getEtiqueta3d();
      this.etiqueta_falsa.push(falsa);
      this.etiqueta_verdadera.push(verdadera);
      Globals3d.str_codigo3d.setValor("if ( " + this.childleft.valor_temporal + this.getSigno() + this.childright.valor_temporal + " ) goto " + verdadera + ";");
      Globals3d.str_codigo3d.setValor("goto " + falsa + ";");
    } else if (this.childleft.tipoValor == enumGlobal.TIPO_PRIMITIVO.CADENA && this.childright.tipoValor == enumGlobal.TIPO_PRIMITIVO.CADENA) {
      if (this.operator === "=" || this.operator === "!=") {
        let pivote: string = Globals3d.getTemporal3d();
        Globals3d.str_codigo3d.setValor(pivote + " = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
        Globals3d.str_codigo3d.setValor(pivote + " = " + pivote + " + 1;");
        Globals3d.str_codigo3d.setValor("Stack[(int)" + pivote + "] = " + this.childleft.valor_temporal + ";");
        Globals3d.str_codigo3d.setValor(pivote + " = " + pivote + " + 1;");
        Globals3d.str_codigo3d.setValor("Stack[(int)" + pivote + "] = " + this.childright.valor_temporal + ";");
        Globals3d.str_codigo3d.setValor("SP = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
        Globals3d.str_codigo3d.setValor("comparar_cadenas_macano();");
        let resultado: string = Globals3d.getTemporal3d();
        Globals3d.str_codigo3d.setValor(resultado + " = Stack[(int)SP];");
        Globals3d.str_codigo3d.setValor("SP = SP - " + Globals3d.tsGlobal.getVariablesLocales() + ";");
        let verdadera: string = Globals3d.getEtiqueta3d();
        let falsa: string = Globals3d.getEtiqueta3d();
        this.etiqueta_falsa.push(falsa);
        this.etiqueta_verdadera.push(verdadera);

        Globals3d.str_codigo3d.setValor("if ( " + resultado + this.getSigno() + " 1  ) goto " + verdadera + ";");


        Globals3d.str_codigo3d.setValor("goto " + falsa + ";");
      } else {
        // error no se puede operar
      }
    }
  }

  getSigno(): string {
    if (this.operator === "=") {
      return "==";
    } else if (this.operator === ">=") {
      return ">=";
    } else if (this.operator === ">") {
      return ">";
    } else if (this.operator === "<=") {
      return "<=";
    } else if (this.operator === "<=") {
      return "<";
    } else {
      return "!=";
    }
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
        node${NUMID}[label="RELACIONALES",
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
