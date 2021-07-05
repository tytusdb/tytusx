
import { NodeXquery, XqueryValue } from "..";
import { SymbolTable, SymbolTableXQuery, SymbolXml } from "../../Structure/TableSymbol";
import { Graph } from "../../Util";
import { Expression } from "./Expression";
import { PathExp } from "./PathExp";
import { outputTranslate } from "../../Structure/Estructura_traduccion/Traducciones"
import * as Globals3d from "../../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../../Structure/Estructura_traduccion/Listado_enums";
import { Label, NodeXml } from "../../AnalizerXML";

export class UnionPath extends Expression {


  constructor(line: number, column: number, public paths: Array<PathExp>) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    const values = this.paths.map((path) =>
      path.interpret(symbolTable, indexParent, symbolTableXquery)
    );
    let result: Array<XqueryValue> = [];
    result = result.concat(...values);
    if (result.length === 1) {
      const val = result[0];
      if (
        typeof val === "number" ||
        typeof val === "string" ||
        typeof val === "boolean"
      ) {
        this.value = val;
        return this.value;
      }
    }
    this.value = result;
    return this.value;
  }


  public traducir(symbolTable: SymbolTable) {
    let aux = this.paths[0];
    console.log(this.paths);
    if (this.paths[0] instanceof PathExp) {
      if (this.paths[0].paths.length > 1) {
        let nodes: Array<NodeXquery> = [this];

        const valu = nodes.map((node) =>
          this.interpret(symbolTable, undefined, new SymbolTableXQuery())
        );

        const resultaux: Array<XqueryValue> = [];
        const result = resultaux.concat(...valu).filter((val) => val !== undefined);
        const result_str = outputTranslate(result);
        console.log(result);
        console.log({ result_str });

        let unico: number = 0;
        if (result.length == 1) {
          if (result[0] instanceof SymbolXml) {
            if (result[0].node instanceof Label) {
              let nodo: Label = result[0].node;
              if (nodo.value != undefined) {
                if (parseInt(nodo.value.toString(), 10) != NaN) {
                  unico = 1;
                  this.tipoValor = enumGlobal.TIPO_PRIMITIVO.NUMERICO;
                  this.valor_temporal = nodo.value;
                } else {
                  unico = 1;
                  this.tipoValor = enumGlobal.TIPO_PRIMITIVO.CADENA;
                  this.valor_temporal = nodo.value;
                }
              }
            }
          }
        }
        if (unico == 0) {
          if (this.global == 1) {
            this.valor_temporal = Globals3d.getTemporal3d();
            Globals3d.str_codigo3d.setValor(this.valor_temporal + " = HP;");
            let textoA: String = String(result_str);
            for (let i: number = 0; i < textoA.length; i++) {
              let caracter: number = textoA.charCodeAt(i);
              Globals3d.str_codigo3d.setValor("Heap[(int)HP] = " + caracter + ";");
              Globals3d.str_codigo3d.setValor("HP = HP + 1;");
            }
            Globals3d.str_codigo3d.setValor("Heap[(int)HP] = 03;");
            Globals3d.str_codigo3d.setValor("HP = HP + 1;");
            let pivote: string = Globals3d.getTemporal3d();
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
      } else {
        this.paths[0].global = this.global;
        this.paths[0].traducir(symbolTable);
        this.valor_temporal = this.paths[0].valor_temporal;
        this.tipoValor = this.paths[0].tipoValor;
      }
    } else {
      aux.global = this.global;
      aux.traducir(symbolTable);
      this.valor_temporal = aux.valor_temporal;
      this.tipoValor = aux.tipoValor;
    }
  }


  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="EXP",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    this.paths.forEach((temp) => {
      str.push(`node${NUMID} -> node${temp.graphAST(str, count)};\n`);
    });
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="EXP",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    this.paths.forEach((temp) => {
      str.push(`node${NUMID} -> node${temp.graphCST(str, count)};\n`);
    });
    return NUMID;
  }

}
