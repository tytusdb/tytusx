import grammar_xml_asc from "./grammar_xml_asc";
import { NodeError } from "../Code/Structure/Node";
import { Label, Attribute, NodeXml, AstXml } from "../Code/AnalizerXML";
import { GrammarReport } from "../Code/Util/GrammarReport";

import grammar_xpath_asc from "./grammar_xpath_asc";
import {
  AstXquery,
  Expression,
  FunctionXquery,
  ParamsXquery,
} from "../Code/AnalizerXquery";

import grammar_optimizer from "./grammar_optimizer";

export const createXmlParser = (
  errorsXML: Array<NodeError>,
  rg: GrammarReport
): grammar_xml_asc.Parser => {
  const XmlParser = new grammar_xml_asc.Parser();
  XmlParser.yy = {
    errorsXML,
    rg,
    NodeError,
    Label,
    Attribute,
    NodeXml,
    AstXml,
  };
  return XmlParser;
};

export const createXpathParser = (
  errorsXPATH: Array<NodeError>,
  rgquerys: GrammarReport
): grammar_xpath_asc.Parser => {
  const XpathParser = new grammar_xpath_asc.Parser();
  XpathParser.yy = {
    errorsXPATH,
    rgquerys,
    NodeError,
    AstXquery,
    Expression,
    ParamsXquery,
    FunctionXquery,
  };
  return XpathParser;
};

export const createOptimizerParser = (
  errorsOptimizer: Array<NodeError>,
  rgquerys: GrammarReport
): grammar_xpath_asc.Parser => {
  const OptimizerParser = new grammar_optimizer.Parser();
  OptimizerParser.yy = {
    errorsOptimizer,
    rgquerys,
    NodeError,
    AstXquery,
    Expression,
  };
  return OptimizerParser;
};