import { XqueryValue } from "..";
import { atributo } from "./atributo";
import {
  SymbolTable,
  SymbolTableXQuery,
  SymbolXml,
} from "../../Structure/TableSymbol";
import { Expression } from "./Expression";
import { Identifier } from "./Identifier";
import { AST } from "../../Structure/Estructura_traduccion/AST";
import { Graph } from "../../Util";


export class PathExp extends Expression {

  /**
   *
   * @param line linea donde se encuentra el nodo
   * @param column columna donde se encuentra el nodo
   * @param paths Arreglo de expresiones. Ejemplo: /bookstore /book /title
   */
  constructor(line: number, column: number, public paths: Array<Expression>) {
    super(line, column);
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    if (this.paths.length > 0) {
      let arrIndices: Array<number | undefined>;
      if (
        this.paths[0] instanceof Identifier ||
        this.paths[0] instanceof atributo
      ) {
        arrIndices = [indexParent];
      } else {
        arrIndices = [undefined];
      }

      let latestResults: Array<XqueryValue> = [];
      this.paths.forEach((path) => {
        // Interpretar cada nodo por cada indice padre que exista
        const valuesPath = arrIndices.map((indexParentCurrent) =>
          path.interpret(symbolTable, indexParentCurrent, symbolTableXquery)
        );
        // Crear arreglo para guardar los resultados actuales
        let resultPath: Array<XqueryValue> = [];
        // Concatenar los valores, para quitar arreglos dentro de otros
        resultPath = resultPath.concat(...valuesPath);
        // Quitar repetidos del arreglo
        // resultPath = Array.from(new Set(resultPath));
        // Crear el nuevo conjunto de indices padres
        arrIndices = [];
        resultPath.forEach((res) => {
          // de los resultados solo se necesitan los symbolos
          if (res instanceof SymbolXml) {
            arrIndices.push(res.getIndex());
          }
        });
        // Guardar los ultimos resultados
        latestResults = resultPath;
      });
      this.value = latestResults;
    } else {
      this.value = [];
    }
    return this.value;
  }


  public traducir(symbolTable: SymbolTable) {
    this.paths[0].global = this.global;
    this.paths[0].traducir(symbolTable);
    this.valor_temporal = this.paths[0].valor_temporal;
    this.tipoValor = this.paths[0].tipoValor;
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="PATH",
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
        node${NUMID}[label="PATH",
        fillcolor="LightBlue", style ="filled", shape="box"];
      `);
    this.paths.forEach((temp) => {
      str.push(`node${NUMID} -> node${temp.graphCST(str, count)};\n`);
    });
    return NUMID;
  }
}
