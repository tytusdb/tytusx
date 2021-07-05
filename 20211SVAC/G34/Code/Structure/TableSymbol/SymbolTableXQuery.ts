import { FunctionXquery, XqueryValue } from "../../AnalizerXquery";

export class SymbolTableXQuery {
  public variables: Map<string, XqueryValue>;
  public anterior?: SymbolTableXQuery;
  public global?: SymbolTableXQuery;
  public functions: Map<string, FunctionXquery>;

  constructor(anterior?: SymbolTableXQuery, global?: SymbolTableXQuery) {
    this.variables = new Map<string, XqueryValue>();
    this.anterior = anterior;
    this.global = global || this;
    this.functions = new Map<string, FunctionXquery>();
  }

  getVariable(value: string): XqueryValue {
    for (
      let ambit: SymbolTableXQuery | undefined = this;
      ambit !== undefined;
      ambit = ambit.anterior
    ) {
      const isFind = ambit?.variables.get(value);
      if (isFind !== undefined) {
        return isFind;
      }
    }
    return undefined;
  }

  setVariable(identified: string, value: XqueryValue): XqueryValue {
    this.variables.set(identified, value);
    return value;
  }

  getFunction(value: string): FunctionXquery | undefined {
    for (
      let ambit: SymbolTableXQuery | undefined = this;
      ambit !== undefined;
      ambit = ambit.anterior
    ) {
      const isFind = ambit?.functions.get(value);
      if (isFind !== undefined) {
        return isFind;
      }
    }
    return undefined;
  }

  setFunction(identified: string, value: FunctionXquery): FunctionXquery {
    this.functions.set(identified, value);
    return value;
  }
}
