import { XqueryValue } from "../..";
import { Graph } from "../../../Util";
import { relativeexpression } from "../../AstXquery";
import { Axis } from "./Axis";
import { AST } from "../../../Structure/Estructura_traduccion/AST";
import { SymbolTable } from "../../../Structure/TableSymbol";

export class Namespace extends Axis implements relativeexpression {
  public traducir(symbolTable: SymbolTable) {
    throw new Error("Method not implemented.");
  }
  interpretrelative(): XqueryValue {
    this.value = [];
    return this.value;
  }
  public interpret(): XqueryValue {
    this.value = [];
    return this.value;
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="${this.nameAxis}",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="NAMESPACE",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${count.getContador()}[label="${this.nameAxis}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
