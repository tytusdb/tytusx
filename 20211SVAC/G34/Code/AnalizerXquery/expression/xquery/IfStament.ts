import { AST } from "../../../Structure/Estructura_traduccion/AST";
import { SymbolTableXQuery, SymbolTable } from "../../../Structure/TableSymbol";
import { Graph } from "../../../Util";
import { XqueryValue } from "../../AstXquery";
import { Expression } from "../Expression";
import * as Globals3d from "../../../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../../../Structure/Estructura_traduccion/Listado_enums";
import { Or } from "../Or";
import { And } from "../And";
import { Relational } from "../Relational";
import { Arithmetic } from "../Arithmetic";
import { Literal } from "../Literal";
import { IdentifierXquery } from "./IdentifierXquery";
import { CallFunctions } from "./CallFunction";
import { Return } from "./Return";
import { UnionPath } from "../UnionPath";

export class IfStament extends Expression {
  constructor(
    line: number,
    column: number,
    public expressionif: Expression,
    public expressionbodyif: Expression,
    public expressionbodyelse: Expression
  ) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    if (
      this.expressionif.interpret(symbolTable, indexParent, symbolTableXquery)
    ) {
      this.value = this.expressionbodyif.interpret(
        symbolTable,
        indexParent,
        symbolTableXquery
      );
    } else {
      this.value = this.expressionbodyelse.interpret(
        symbolTable,
        indexParent,
        symbolTableXquery
      );
    }
    return this.value;
  }

  public traducir(symbolTable: SymbolTable) {
    this.expressionif.traducir(symbolTable);
    let heredado: number = 0;
    if (this.etqSalidaIf == "") {
      this.etqSalidaIf = Globals3d.getEtiqueta3d();
      heredado = 1;
    }
    this.escribirEtiquetas(this.expressionif.etiqueta_verdadera);


    if (this.expressionbodyif instanceof Or || this.expressionbodyif instanceof And || this.expressionbodyif instanceof Relational || this.expressionbodyif instanceof Arithmetic || this.expressionbodyif instanceof Literal || this.expressionbodyif instanceof IdentifierXquery || this.expressionbodyif instanceof CallFunctions || this.expressionbodyif instanceof UnionPath) {
      console.log("Entro al retorno del if");
      let retorno = new Return(this.line, this.column, this.expressionbodyif);
      retorno.traducir(symbolTable);
      this.valor_temporal = retorno.valor_temporal;
      this.tipoValor = retorno.tipoValor;
    } else {
      this.expressionbodyif.traducir(symbolTable);
    }

    Globals3d.str_codigo3d.setValor("goto " + this.etqSalidaIf + ";");
    this.escribirEtiquetas(this.expressionif.etiqueta_falsa);
    this.expressionbodyelse.etqSalidaIf = this.etqSalidaIf;

    // revisar retorno
    if (this.expressionbodyelse instanceof Or || this.expressionbodyelse instanceof And || this.expressionbodyelse instanceof Relational || this.expressionbodyelse instanceof Arithmetic || this.expressionbodyelse instanceof Literal || this.expressionbodyelse instanceof IdentifierXquery || this.expressionbodyelse instanceof CallFunctions || this.expressionbodyelse instanceof UnionPath) {
      let retorno = new Return(this.line, this.column, this.expressionbodyelse);
      retorno.traducir(symbolTable);
      this.valor_temporal = retorno.valor_temporal;
      this.tipoValor = retorno.tipoValor;
    } else {
      this.expressionbodyelse.traducir(symbolTable);
    }
    if (heredado == 1) {
      Globals3d.str_codigo3d.setValor(this.etqSalidaIf + ":");
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
        node${NUMID}[label="if",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${this.expressionif.graphAST(str, count)};
        node${NUMID} -> node${this.expressionbodyif.graphAST(str, count)};
        node${NUMID} -> node${this.expressionbodyelse.graphAST(str, count)};
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    const numleft = this.expressionif.graphCST(str, count);
    const bodyif = this.expressionbodyif.graphCST(str, count);
    const bodyelse = this.expressionbodyelse.graphCST(str, count);
    str.push(`
        node${NUMID}[label="IF",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="if",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador() - 1} -> node${numleft};
        node${count.getContador() - 1} -> node${bodyif};
        node${count.getContador()}[label="else",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
        node${count.getContador() - 1} -> node${bodyelse};
      `);
    return NUMID;
  }
}
