import { SymbolTable, SymbolXml } from "../TableSymbol";
import * as Globals from "../../../Globals"
import { NodeXquery, XqueryValue } from "../../AnalizerXquery";



export const outputTranslate = (results: Array<XqueryValue>): string => {


  const documentXml: Array<string> = [];
  results.forEach((val) => {
    if (
      typeof val === "boolean" ||
      typeof val === "string" ||
      typeof val === "number"
    ) {
      documentXml.push(val.toString() + "\n");
    }

    if (val instanceof SymbolXml) {
      const node = val.node;
      node.xmlRepresentation(documentXml, 0);
    }
  });
  return documentXml.join("");
};
