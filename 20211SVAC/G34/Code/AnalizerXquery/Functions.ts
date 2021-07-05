import { TIPO_PRIMITIVO } from "../Structure/Estructura_traduccion/Listado_enums";
import { SymbolTable, SymbolTableXQuery } from "../Structure/TableSymbol";
import { Graph } from "../Util";
import { NodeXquery, XqueryValue } from "./AstXquery";
import { Expression } from "./expression";
import * as Globals3d from "../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../Structure/Estructura_traduccion/Listado_enums";

export class ParamsXquery {
  constructor(
    public line: number,
    public column: number,
    public id: string,
    public type: string,
    public tipoValor: TIPO_PRIMITIVO
  ) {
    if (type == "number") {
      this.tipoValor = TIPO_PRIMITIVO.NUMERICO;
    } else {
      this.tipoValor = TIPO_PRIMITIVO.CADENA;
    }
  }
}

export class FunctionXquery extends NodeXquery {
  constructor(
    public line: number,
    public column: number,
    public name: string,
    public params: Array<ParamsXquery> | undefined,
    public type: string,
    public expression: Expression
  ) {
    super(line, column);
    this.esFuncion = 1;
    this.nombreFuncion = name;
    if (type == "number") {
      this.tipoValor = TIPO_PRIMITIVO.NUMERICO;
    } else {
      this.tipoValor = TIPO_PRIMITIVO.CADENA;
    }
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
    if (typeof result !== this.type) throw new Error("Error de tipos");
    return result;
  }


  public traducir(symbolTable: SymbolTable) {
    Globals3d.setEtiquetaSalida();
    Globals3d.setTemporalInicio();
    if (this.params !== undefined) {
      for (let i: number = 0; i < this.params.length; i++) {
        Globals3d.tsGlobal.setSimbolo(this.params[i].id, this.params[i].tipoValor, "LOCAL", false, i + 1, 1, undefined, 1, enumGlobal.TIPO_SIMBOLO.PARAMETRO);
      }
    }
    Globals3d.str_codigo3d.setValor("int " + this.nombreFuncion + "(){");
    this.expression.traducir(symbolTable);
    Globals3d.str_codigo3d.setValor(Globals3d.etqSalida + ":");
    Globals3d.str_codigo3d.setValor("return 0;");
    Globals3d.str_codigo3d.setValor("}");
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="${this.name}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="PARAMS",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);

    const v = count.getContador() - 1;
    this.params?.forEach((temp) => {
      str.push(`
        node${count.getContador()}[label="${temp.id}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${v} -> node${count.incrementCount()};
        `);
    });

    str.push(`node${NUMID} -> node${this.expression.graphAST(str, count)};\n`);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="FUNCTION",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="${this.name}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador()}[label="PARAMS",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);

    const v = count.getContador() - 1;
    this.params?.forEach((temp) => {
      str.push(`
        node${count.getContador()}[label="${temp.id}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${v} -> node${count.incrementCount()};
        `);
    });

    str.push(`node${NUMID} -> node${this.expression.graphCST(str, count)};\n`);
    return NUMID;
  }
}
