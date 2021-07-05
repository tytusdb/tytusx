import { SymbolTable, SymbolTableXQuery } from "../../Structure/TableSymbol";
import { Expression } from "./Expression";
import { XqueryValue } from "../AstXquery";
import { AST } from "../../Structure/Estructura_traduccion/AST";
import * as Globals3d from "../../Structure/Estructura_traduccion/Estructuras_estaticas";
import { Graph } from "../../Util";


export class And extends Expression {

  //variable 3d
  public valor_temporal: any;

  constructor(
    line: number,
    column: number,
    public childleft: Expression,
    public childright: Expression,
    public operator: string
  ) {
    super(line, column);
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
    if (typeof valleft !== typeof valright) {
      throw new Error(
        "Error solamente se puede operar entre valores del mismo tipo!"
      );
    }

    if (typeof valleft === "string" && typeof valright === "string") {
      valleft = String(valleft);
      valright = String(valright);
    } else if (typeof valright === "boolean" && typeof valleft === "boolean") {
      valleft = Boolean(valleft);
      valright = Boolean(valright);
    } else {
      valleft = Number(valleft);
      valright = Number(valright);
    }
    this.value = valleft && valright;
    return this.value;
  }

  public traducir(symbolTable: SymbolTable) {
    this.childleft.traducir(symbolTable);
    this.escribirEtiquetas(this.childleft.etiqueta_verdadera);
    this.childright.traducir(symbolTable);
    this.etiqueta_verdadera = this.childright.etiqueta_verdadera;
    this.etiqueta_falsa = this.childleft.etiqueta_falsa;
    for (let i: number = 0; i < this.childright.etiqueta_falsa.length; i++) {
      this.etiqueta_falsa.push(this.childright.etiqueta_falsa[i]);
    }
  }

  escribirEtiquetas(etiquetas: Array<string>): void {
    for (let i: number = 0; i < etiquetas.length; i++) {
      Globals3d.str_codigo3d.setValor(etiquetas[i] + ":");
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
        node${NUMID}[label="LOGICAS",
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
