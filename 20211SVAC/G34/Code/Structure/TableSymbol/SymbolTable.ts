import { Attribute, Label } from "../../AnalizerXML";
import { SymbolXml } from "./NodeSymbol";

export class SymbolTable {
  private symbols: Array<SymbolXml>;

  constructor() {
    this.symbols = [];
  }

  saveSymbol(symbol: SymbolXml): number {
    return this.symbols.push(symbol) - 1;
  }

  getIndex(symbol: SymbolXml): number {
    return this.symbols.indexOf(symbol);
  }

  getSymbolsByParent(
    name: string,
    indexParent: number | undefined
  ): Array<SymbolXml> {
    return this.symbols.filter(
      (sym) =>
        sym.node instanceof Label &&
        sym.node.name === name &&
        sym.indexParent === indexParent
    );
  }

  getAllSymbolsByParent(indexParent: number | undefined): Array<SymbolXml> {
    return this.symbols.filter(
      (sym) => sym.node instanceof Label && sym.indexParent === indexParent
    );
  }

  getAttributeByParent(
    name: string,
    indexParent: number | undefined
  ): Array<SymbolXml> {
    return this.symbols.filter(
      (sym) =>
        sym.node instanceof Attribute &&
        sym.node.name === name &&
        sym.indexParent === indexParent
    );
  }

  getAllAttributeByParent(indexParent: number | undefined): Array<SymbolXml> {
    return this.symbols.filter(
      (sym) => sym.node instanceof Attribute && sym.indexParent === indexParent
    );
  }

  getAllAttribute(): Array<SymbolXml> {
    return this.symbols.filter((sym) => sym.node instanceof Attribute);
  }
  getAllSymbols(): Array<SymbolXml> {
    return this.symbols.filter((sym) => sym.node instanceof Label);
  }

  getSymbolsByName(name: string): Array<SymbolXml> {
    return this.symbols.filter(
      (sym) => sym.node instanceof Label && sym.node.name === name
    );
  }
  getattributeByName(name: string): Array<SymbolXml> {
    return this.symbols.filter(
      (sym) => sym.node instanceof Attribute && sym.node.name === name
    );
  }
  getSymbolByName(name: string): Array<SymbolXml> {
    return this.symbols.filter(
      (sym) => sym.node instanceof Label && sym.node.name === name
    );
  }

  getattributeByParent(indexParent: number): Array<SymbolXml> {
    return this.symbols.filter(
      (sym) => sym.node instanceof Attribute && sym.indexParent === indexParent
    );
  }

  getSymbolChildren(symbolParent: SymbolXml): Array<SymbolXml> {
    const indexParent = symbolParent.getIndex();
    return this.symbols.filter((sym) => sym.indexParent === indexParent);
  }

  getSymbolByIndex(index: number): SymbolXml | undefined {
    return this.symbols[index];
  }

  graficartabla(): string | undefined {
    if (this.symbols.length > 0) {
      let contador = 1;
      let cadena = "";
      for (const simbolo of this.symbols) {
        cadena =
          cadena +
          "<tr>\n<th scope='row'>" +
          contador +
          "</th>\n" +
          "<td scope='row'>" +
          simbolo.node.name +
          "</td>\n";
        if (simbolo.node.value !== undefined) {
          cadena = cadena + "<td>" + simbolo.node.value + "</td>\n";
        } else {
          cadena = cadena + "<td></td>\n";
        }
        if (simbolo.node instanceof Label) {
          cadena = cadena + "<td>etiqueta</td>\n";
        } else if (simbolo.node instanceof Attribute) {
          cadena = cadena + "<td>atributo</td>\n";
        }
        if (simbolo.indexParent !== undefined) {
          cadena =
            cadena +
            "<td>" +
            this.getSymbolByIndex(simbolo.indexParent)?.node.name +
            "</td>\n";
        } else {
          cadena = cadena + "<td>Global</td>\n";
        }
        cadena =
          cadena +
          "<td>" +
          simbolo.node.line +
          "</td>\n" +
          "<td>" +
          simbolo.node.column +
          "</td>\n" +
          "</tr>\n";
        contador++;
      }
      return cadena;
    }
  }
}
