import { Expression } from "./Expression";
import { XqueryValue } from "../AstXquery";
import * as Globals3d from "../../Structure/Estructura_traduccion/Estructuras_estaticas";
import * as enumGlobal from "../../Structure/Estructura_traduccion/Listado_enums";
import { Graph } from "../../Util";


export class Literal extends Expression {

  constructor(line: number, column: number, value: XqueryValue, public type: string) {
    super(line, column);
    this.value = value;
    this.type = type;
  }

  public interpret(): XqueryValue {
    if (this.value !== undefined) {
      return this.value;

    }
    throw new Error("Error en expresión 'literal'");
  }


  public traducir(symbolTable: import("../../Structure/TableSymbol").SymbolTable) {
    if (this.type === "number" && this.value !== undefined) {
      this.valor_temporal = this.value.toString();
      this.tipoValor = enumGlobal.TIPO_PRIMITIVO.NUMERICO;
    } else if (this.type === "string") {
      this.tipoValor = enumGlobal.TIPO_PRIMITIVO.CADENA;
      this.valor_temporal = Globals3d.getTemporal3d();
      Globals3d.str_codigo3d.setValor(this.valor_temporal + " = HP;");
      let textoA: String = String(this.value);
      for (let i: number = 0; i < textoA.length; i++) {
        let caracter: number = textoA.charCodeAt(i);
        Globals3d.str_codigo3d.setValor("Heap[(int)HP] = " + caracter + ";");
        Globals3d.str_codigo3d.setValor("HP = HP + 1;");
      }
      Globals3d.str_codigo3d.setValor("Heap[(int)HP] = 03;");
      Globals3d.str_codigo3d.setValor("HP = HP + 1;");
    }
  }
  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="${this.value}",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="LITERAL",
        fillcolor="LightBlue", style ="filled", shape="box"];    
        node${count.getContador()}[label="${this.value}",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${count.incrementCount()};
      `);
    return NUMID;
  }
}
