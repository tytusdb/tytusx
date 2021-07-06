import { XqueryValue } from "..";
import { relativeexpression } from "../AstXquery";
import {
  SymbolTable,
  SymbolTableXQuery,
  SymbolXml,
} from "../../Structure/TableSymbol";
import { Expression } from "./Expression";
import { Graph } from "../../Util";

export class Predicate extends Expression implements relativeexpression {

  constructor(
    line: number,
    column: number,
    public exp: Expression,
    public predicate: Expression
  ) {
    super(line, column);
  }
  interpretrelative(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    //const pepito=this.exp as relativeexpression;
    const expValue = (this.exp as any).interpretrelative(
      symbolTable,
      indexParent
    );
    this.value = this.copia(
      symbolTable,
      indexParent,
      expValue,
      symbolTableXquery
    );
    return this.value;
  }

  public interpret(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    const expValue = this.exp.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );
    this.value = this.copia(
      symbolTable,
      indexParent,
      expValue,
      symbolTableXquery
    );
    return this.value;
  }

  public traducir(symbolTable: SymbolTable) {
    throw new Error("Method not implemented.");
  }
  /*
    const expValue = this.exp.interpret(
      symbolTable,
      indexParent,
      symbolTableXquery
    );
    
    >>>>>>> dev_aroche
    */

  public copia(
    symbolTable: SymbolTable,
    indexParent: number | undefined,
    expValue: XqueryValue,
    symbolTableXquery: SymbolTableXQuery
  ): XqueryValue {
    if (
      typeof expValue === "number" ||
      typeof expValue === "string" ||
      typeof expValue === "boolean"
    ) {
      const predicate = this.predicate.interpret(
        symbolTable,
        undefined,
        symbolTableXquery
      );
      if (typeof predicate === "boolean" || typeof predicate === "string") {
        this.value = predicate.valueOf() ? expValue : [];
        return this.value;
      }

      if (typeof predicate === "number") {
        this.value = predicate === 1 ? expValue : [];
        return this.value;
      }

      throw new Error("Error: No se puede acceder a esta posicion");
    }

    if (Array.isArray(expValue)) {
      const result = expValue
        .map((val) => {
          if (
            typeof val === "number" ||
            typeof val === "boolean" ||
            typeof val === "string"
          ) {
            const predicate = this.predicate.interpret(
              symbolTable,
              undefined,
              symbolTableXquery
            );

            if (
              typeof predicate === "boolean" ||
              typeof predicate === "string"
            ) {
              return predicate.valueOf() && val;
            }

            if (typeof predicate === "number") {
              return predicate === 1 && val;
            }

            throw new Error("Error: No se puede acceder a esta posicion");
          }

          if (val instanceof SymbolXml) {
            console.log("predicate: ", val);
            console.log("predicate: ", val.getIndex());
            const predicate = this.predicate.interpret(
              symbolTable,
              val.getIndex(),
              symbolTableXquery
            );

            if (
              typeof predicate === "boolean" ||
              typeof predicate === "string"
            ) {
              return predicate.valueOf() && val;
            }

            if (typeof predicate === "number") {
              if (predicate > 0) {
                const index = predicate - 1;
                const symbol = expValue[index];
                return symbol instanceof SymbolXml && symbol;
              }
            }
          }

          throw new Error(`Error: Tipo no valido '${JSON.stringify(val)}'`);
        })
        .filter((val) => Boolean(val));
      // this.value = Array.from(new Set(result));
      this.value = result;
      return this.value;
    }
    this.value = [];
    return this.value;
  }

  public graphAST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="PREDICATE",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${this.exp.graphAST(str, count)};
        node${NUMID} -> node${this.predicate.graphAST(str, count)};
      `);
    return NUMID;
  }

  public graphCST(str: Array<string>, count: Graph): number {
    const NUMID = count.incrementCount();
    str.push(`
        node${NUMID}[label="PREDICATE",
        fillcolor="LightBlue", style ="filled", shape="box"];
        node${NUMID} -> node${this.exp.graphCST(str, count)};
        node${NUMID} -> node${this.predicate.graphCST(str, count)};
      `);
    return NUMID;
  }
}