import {
  SymbolTableXQuery,
  SymbolTable,
  SymbolXml,
} from "../../../Structure/TableSymbol";
import { Graph } from "../../../Util";
import { XqueryValue } from "../../AstXquery";
import { Expression } from "../Expression";
import { ForStament } from "./ForStament";
import { OrderBy } from "./OrderBy";
import { Return } from "./Return";
import { Where } from "./Where";
import { AST } from "../../../Structure/Estructura_traduccion/AST";
import { outputTranslate } from "../../../Structure/Estructura_traduccion/Traducciones";
import * as Globals3d from "../../../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../../../Structure/Estructura_traduccion/Listado_enums";



export class FLWR extends Expression {

  constructor(
    line: number,
    column: number,
    public lstForStament: Array<ForStament>,
    public orderby: OrderBy | undefined,
    public where: Where | undefined,
    public valueReturn: Return
  ) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    this.lstForStament.forEach((temp) => {
      temp.interpret(symbolTable, indexParent, symbolTableXquery);
    });

    let conds: XqueryValue;
    if (this.where !== undefined) {
      conds = this.where.interpret(symbolTable, indexParent, symbolTableXquery);
    } else {
      conds = [];
    }

    let newPositions: Array<number>;
    if (this.orderby !== undefined) {
      newPositions = this.orderby.interpret(
        symbolTable,
        indexParent,
        symbolTableXquery
      );
    } else {
      newPositions = [];
    }

    this.value = this.valueReturn.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );

    if (Array.isArray(this.value)) {
      if (Array.isArray(conds) && conds.length > 0) {
        const newArray: Array<XqueryValue | SymbolXml> = [];
        let i = 0;
        for (const cond of conds) {
          const value = this.value[i];
          cond && value !== undefined && newArray.push(value);
          i += 1;
        }
        this.value = newArray;
      }
      if (newPositions.length > 0) {
        const newArray: Array<XqueryValue | SymbolXml> = [];
        for (const pos of newPositions) {
          const value = this.value[pos];
          value !== undefined && newArray.push(value);
        }
        this.value = newArray;
      }
    }

    return this.value;
  }


  public traducir(symbolTable: SymbolTable) {
    const indexParent = undefined;
    const symbolTableXquery = new SymbolTableXQuery();
    let valores: Array<any> = [];

    this.lstForStament.forEach((temp) => {
      temp.interpret(symbolTable, indexParent, symbolTableXquery);
    });

    let conds: XqueryValue;
    if (this.where !== undefined) {
      conds = this.where.interpret(symbolTable, indexParent, symbolTableXquery);
    } else {
      conds = [];
    }

    let newPositions: Array<number>;
    if (this.orderby !== undefined) {
      newPositions = this.orderby.interpret(
        symbolTable,
        indexParent,
        symbolTableXquery
      );
    } else {
      newPositions = [];
    }

    this.value = this.valueReturn.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );

    valores = Object.assign(this.value, valores);

    if (Array.isArray(this.value)) {
      if (Array.isArray(conds) && conds.length > 0) {
        const newArray: Array<XqueryValue | SymbolXml> = [];
        let i = 0;
        for (const cond of conds) {
          const value = this.value[i];
          cond && value !== undefined && newArray.push(value);
          i += 1;
        }
        this.value = newArray;
        valores = newArray;
      }
      if (newPositions.length > 0) {
        const newArray: Array<XqueryValue | SymbolXml> = [];
        for (const pos of newPositions) {
          const value = this.value[pos];
          value !== undefined && newArray.push(value);
        }
        this.value = newArray;
        valores = newArray;
      }
    }
    // this.value contiene el resultado del for
    console.log(this.value);
    //result_str contiene el texto del for
    const result_str = outputTranslate(valores);
    console.log({ result_str });

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


  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="FLWR",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    this.lstForStament.forEach((temp) => {
      str.push(`node${NUMID} -> node${temp.graphAST(str, count)};\n`);
    });
    if (this.orderby !== undefined) {
      str.push(`node${NUMID} -> node${this.orderby.graphAST(str, count)};\n`);
    }
    if (this.where !== undefined) {
      str.push(`node${NUMID} -> node${this.where.graphAST(str, count)};\n`);
    }
    str.push(`node${NUMID} -> node${this.valueReturn.graphAST(str, count)};\n`);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="FLWR",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    this.lstForStament.forEach((temp) => {
      str.push(`node${NUMID} -> node${temp.graphCST(str, count)};\n`);
    });
    if (this.orderby !== undefined) {
      str.push(`node${NUMID} -> node${this.orderby.graphCST(str, count)};\n`);
    }
    if (this.where !== undefined) {
      str.push(`node${NUMID} -> node${this.where.graphCST(str, count)};\n`);
    }
    str.push(`node${NUMID} -> node${this.valueReturn.graphCST(str, count)};\n`);
    return NUMID;
  }
}
