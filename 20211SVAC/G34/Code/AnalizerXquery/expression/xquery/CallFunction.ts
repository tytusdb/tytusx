import { SymbolTableXQuery, SymbolTable } from "../../../Structure/TableSymbol";
import { Graph } from "../../../Util";
import { XqueryValue } from "../../AstXquery";
import { ParamsXquery } from "../../Functions";
import { Expression } from "../Expression";
import * as Globals3d from "../../../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../../../Structure/Estructura_traduccion/Listado_enums";

export class CallFunctions extends Expression {
  constructor(
    line: number,
    column: number,
    public name: string,
    public expression: Array<Expression> | undefined
  ) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    const fun = symbolTableXquery.getFunction(this.name);
    if (fun) {
      const ambitFunction = new SymbolTableXQuery(
        symbolTableXquery,
        symbolTableXquery.global
      );
      const params: Array<ParamsXquery> | undefined = fun.params;
      if (params !== undefined && params.length > 0) {
        if (params.length !== this.expression?.length) {
          throw new Error(
            "La cantidad de argumentos no es la misma cantidad que la funcion"
          );
        }
        let i = 0;
        let param: ParamsXquery;
        let exp: Expression;
        let valueArg: XqueryValue;
        for (; i < params.length; i++) {
          param = params[i];
          exp = this.expression[i];
          valueArg = exp.interpret(symbolTable, indexParent, symbolTableXquery);
          if (typeof valueArg !== param.type)
            throw new Error("tipos distintos en los parametros");
          ambitFunction.setVariable(param.id, valueArg);
        }
      }
      this.value = fun.interpret(symbolTable, undefined, ambitFunction);
      //
    } else {
      throw new Error("No existe la funcion.");
    }
    return this.value;
  }

  public traducir(symbolTable: SymbolTable) {
    var symbol = Globals3d.getFuncion(this.name);
    if (symbol != null) {
      this.tipoValor = symbol;

      if (this.expression !== undefined) {
        for (let i: number = 0; i < this.expression.length; i++) {
          console.log("Parametro")
          console.log(this.expression[i]);
          this.expression[i].traducir(symbolTable);
        }
      }

      let inicio = Globals3d.tsGlobal.simbolos.length + 1;
      let temporalInicio = Globals3d.temporalInicial;
      let temporalActual = Globals3d.g_temporales;
      let pivote: string = Globals3d.getTemporal3d();

      // guardar temporales
      let temporales: Map<number, string> = new Map();
      let posicion = temporalInicio;
      for (let i: number = temporalInicio; i < temporalActual; i++) {
        Globals3d.str_codigo3d.setValor(pivote + " = SP + " + inicio + ";")
        posicion++;
        Globals3d.str_codigo3d.setValor("Stack[(int)" + pivote + "] = T" + posicion + ";");
        temporales.set(inicio, "T" + posicion);
        inicio++;
      }

      let posicionEntorno = Globals3d.tsGlobal.getVariablesLocales() + 3;
      if (this.expression !== undefined) {
        for (let i: number = 0; i < this.expression.length; i++) {
          posicion = posicionEntorno + i;
          Globals3d.str_codigo3d.setValor(pivote + " = SP + " + posicion + ";")
          Globals3d.str_codigo3d.setValor("Stack[(int)" + pivote + "] = " + this.expression[i].valor_temporal + ";");
        }
      }

      posicionEntorno--;
      // llamada funcion
      Globals3d.str_codigo3d.setValor("SP = SP + " + posicionEntorno + ";");
      Globals3d.str_codigo3d.setValor(this.name + "();");
      this.valor_temporal = Globals3d.getTemporal3d();
      Globals3d.str_codigo3d.setValor(this.valor_temporal + " = Stack[(int)SP];");
      Globals3d.str_codigo3d.setValor("SP = SP - " + posicionEntorno + ";");

      // retorno de temporales
      for (let i: number = temporalInicio; i < temporalActual; i++) {
        inicio--;
        let temporal = temporales.get(inicio);
        Globals3d.str_codigo3d.setValor(pivote + " = SP + " + inicio + ";")
        Globals3d.str_codigo3d.setValor(temporal + " = Stack[(int)" + pivote + "];");
      }

      if (this.global == 1) {
        if (this.tipoValor == enumGlobal.TIPO_PRIMITIVO.NUMERICO) {
          Globals3d.str_codigo3d.setValor("printf(\"%f\", (float)" + this.valor_temporal + ");")
        } else {
          Globals3d.str_codigo3d.setValor(pivote + " = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
          Globals3d.str_codigo3d.setValor(pivote + " = " + pivote + " + 1;");
          Globals3d.str_codigo3d.setValor("Stack[(int)" + pivote + "] = " + this.valor_temporal + ";");
          Globals3d.str_codigo3d.setValor("SP = SP + " + Globals3d.tsGlobal.getVariablesLocales() + ";");
          Globals3d.str_codigo3d.setValor("imprimirXML_macano();");
          let resultado: string = Globals3d.getTemporal3d();
          Globals3d.str_codigo3d.setValor(resultado + " = Stack[(int)SP];");
          Globals3d.str_codigo3d.setValor("SP = SP - " + Globals3d.tsGlobal.getVariablesLocales() + ";");
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
    this.expression?.forEach((temp) => {
      str.push(`node${NUMID} -> node${temp.graphAST(str, count)};\n`);
    });
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="CALLFUNCTION",
        fillcolor="LightBlue", style ="filled", shape="box"];    
        node${count.getContador()}[label="${this.name}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);

    this.expression?.forEach((temp) => {
      str.push(
        `node${count.getContador() - 1} -> node${temp.graphCST(str, count)};\n`
      );
    });
    return NUMID;
  }
}
