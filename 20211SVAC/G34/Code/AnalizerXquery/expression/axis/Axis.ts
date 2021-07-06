import { SymbolTable, SymbolXml } from "../../../Structure/TableSymbol";
import { Expression } from "../Expression";

export abstract class Axis extends Expression {
  public nameAxis: string | undefined;

  public fillResult(
    currentSymbols: Array<SymbolXml>,
    coincidences: Array<SymbolXml>,
    symbolTable: SymbolTable
  ): void {
    for (const iterator of currentSymbols) {
      if (iterator.node.name === this.nameAxis || this.nameAxis === "*") {
        coincidences.push(iterator);
      }
      const index = symbolTable.getIndex(iterator);
      const symbolsFound = symbolTable.getAllSymbolsByParent(index);
      this.fillResult(symbolsFound, coincidences, symbolTable);
    }
  }
  public obteneratributos(
    currentSymbols: Array<SymbolXml>,
    coincidences: Array<SymbolXml>,
    symbolTable: SymbolTable
  ): void {
    for (const iterator of currentSymbols) {
      const index = symbolTable.getIndex(iterator);
      const attributeFound = symbolTable.getAllAttributeByParent(index);
      if (attributeFound !== undefined) {
        for (const ite of attributeFound) {
          if (ite.node.name === this.nameAxis || this.nameAxis === "*") {
            coincidences.push(ite);
          }
        }
      }
      const symbolsFound = symbolTable.getAllSymbolsByParent(index);
      this.obteneratributos(symbolsFound, coincidences, symbolTable);
    }
  }

  public resultparent(
    currentSymbols: Array<SymbolXml>,
    coincidences: Array<SymbolXml>,
    symbolTable: SymbolTable,
    indexactual: number
  ): void {
    for (const iterator of currentSymbols) {
      if (
        (iterator.node.name === this.nameAxis || this.nameAxis === "*") &&
        (iterator.getIndex() === indexactual ||
          iterator.indexParent === indexactual)
      ) {
        coincidences.push(iterator);
      }
      const index = symbolTable.getIndex(iterator);
      const symbolsFound = symbolTable.getAllSymbolsByParent(index);
      this.resultparent(symbolsFound, coincidences, symbolTable, indexactual);
    }
  }
}
