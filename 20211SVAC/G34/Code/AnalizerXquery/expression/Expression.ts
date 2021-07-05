import { SymbolTable, SymbolXml } from "../../Structure/TableSymbol";
import { NodeXquery } from "../AstXquery";
import { XqueryValue } from "../AstXquery";
import * as Globals3d from "../../Structure/Estructura_traduccion/Estructuras_estaticas"
import * as enumGlobal from "../../Structure/Estructura_traduccion/Listado_enums";

export abstract class Expression extends NodeXquery {
  public value: XqueryValue;

  public valor_temporal: string;
  public etiqueta_verdadera: Array<string>;
  public etiqueta_falsa: Array<string>;
  public etiqueta_inicio: any;
  public etiqueta_fin: any;
  public etqSalidaIf: string;

  constructor(line: number, column: number) {
    super(line, column);
    this.tipoValor = enumGlobal.TIPO_PRIMITIVO.NUMERICO;
    this.etiqueta_verdadera = new Array<string>();
    this.etiqueta_falsa = new Array<string>();
    this.valor_temporal = ""; //preguntar
    this.etqSalidaIf = "";
  }

  public fillResult(
    currentSymbols: Array<SymbolXml>,
    coincidences: Array<SymbolXml>,
    symbolTable: SymbolTable,
    name: string
  ): void {
    for (const iterator of currentSymbols) {
      if (iterator.node.name === name || name === "*") {
        coincidences.push(iterator);
      }
      const index = symbolTable.getIndex(iterator);
      const symbolsFound = symbolTable.getAllSymbolsByParent(index);
      this.fillResult(symbolsFound, coincidences, symbolTable, name);
    }
  }
  public obteneratributos(
    currentSymbols: Array<SymbolXml>,
    coincidences: Array<SymbolXml>,
    symbolTable: SymbolTable,
    name: string
  ): void {
    for (const iterator of currentSymbols) {
      const index = symbolTable.getIndex(iterator);
      const attributeFound = symbolTable.getAllAttributeByParent(index);
      if (attributeFound !== undefined) {
        for (const ite of attributeFound) {
          if (ite.node.name === name || name === "*") {
            coincidences.push(ite);
          }
        }
      }
      const symbolsFound = symbolTable.getAllSymbolsByParent(index);
      this.obteneratributos(symbolsFound, coincidences, symbolTable, name);
    }
  }
}
