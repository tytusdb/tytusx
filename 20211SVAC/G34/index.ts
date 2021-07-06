import Viz from "./Library/viz/viz";
import * as Gui from "./Gui";
import * as Globals from "./Globals";
import { XqueryValue } from "./Code/AnalizerXquery";
import { SymbolTableXQuery, SymbolXml } from "./Code/Structure/TableSymbol";
import * as Globals3d from "./Code/Structure/Estructura_traduccion/Estructuras_estaticas";
import { Codigo3d } from "./Code/Structure/Estructura_traduccion/Codigo3d";

/* CREANDO LA FUNCION QUE SE VA A CONSUMIR DESDE LA ACCION DEL BOTON */

const analyzerXMLASC = (value: string) => {
  try {
    Globals.analyzerXml(value);
    Gui.consola.doc.setValue(
      "Mensaje Grupo34 >> Se analizo el documento XML\n"
    );
  } catch (error) {
    console.error(error);
    Gui.consola.doc.setValue(
      "Mensaje Grupo34 >> No analizo el documento XML\n"
    );
  }
};

const analyzerXPATHASC = (value: string) => {
  try {
    const symbolTable = Globals.lstLabelXML?.createSymbolTable();
    Gui.consola.doc.setValue(
      "Mensaje Grupo34 >> Se analizo el documento XPATH\n"
    );
    if (symbolTable) {
      const astxpath = Globals.analyzerXpath(value);
      console.log({ astxpath });
      const results = astxpath.interpret(symbolTable, new SymbolTableXQuery());
      //console.log({ results });
      const documentXml = outputXml(results);
      Gui.consola.doc.setValue(documentXml);
    }
  } catch (error) {
    console.error(error);
    Gui.consola.doc.setValue(`Mensaje Grupo34 >> ${error.message}.\n`);
  }
};

const translateXPATHASC = (value: string) => {
  try {
    const symbolTable = Globals.lstLabelXML?.createSymbolTable();
    Gui.consola.doc.setValue(
      "Mensaje Grupo34 >> Se tradujo el documento XPATH\n"
    );
    if (symbolTable) {
      const astxpath = Globals.analyzerXpath(value);
      console.log({ astxpath });
      const results = astxpath.traducir(symbolTable);
      Gui.consola.doc.setValue(Globals3d.str_codigo3d.getReporte());
    }
  } catch (error) {
    console.error(error);
    Gui.consola.doc.setValue(`Mensaje Grupo34 >> ${error.message}.\n`);
  }
};
const translateXMLASC = (value: string) => {
  try {
    Globals.translateXml(value);
    Gui.consola.doc.setValue(
      "Mensaje Grupo34 >> Se tradujo el documento XML\n"
    );
  } catch (error) {
    console.error(error);
    Gui.consola.doc.setValue(
      "Mensaje Grupo34 >> No tradujo el documento XML\n"
    );
  }
};

const analyzerOPTIMIZER = (value: string) => {
  try {
    Globals.analyzerOptimizer(value);
    Gui.consola.doc.setValue(
      "Mensaje Grupo34 >> Se optimizo el documento 3D\n"
    );
  } catch (error) {
    console.error(error);
    Gui.consola.doc.setValue(`Mensaje Grupo34 >> ${error.message}.\n`);
  }
};

const outputXml = (results: Array<XqueryValue>): string => {
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

/* ASIGNAR ACCIONES A BOTONES */
const reporterrorsXML = () => {
  try {
    let cadena = "";
    let p = 0;
    Globals.errorsXML.forEach((err) => {
      p = p + 1;
      cadena +=
        "<tr>\n<th scope='row'>" +
        p +
        "</th>\n" +
        "<td scope='row'>" +
        err.lexeme +
        "</td>\n" +
        "<td>" +
        err.description +
        "</td>\n" +
        "<td>" +
        err.typeerror +
        "</td>\n" +
        "<td>" +
        err.language +
        "</td>\n" +
        "<td>" +
        err.row +
        "</td>\n" +
        "<td>" +
        err.column +
        "</td>\n" +
        "</tr>\n";
    });
    Gui.tbodyErrors.innerHTML = cadena;
  } catch (error) {
    Gui.consola.doc.setValue(
      "Mensaje Grupo34 >> No se realizo el reporte de errores XML.\n"
    );
  }
};
const reporterrorsXPATH = () => {
  try {
    let cadena = "";
    let p = 0;
    Globals.errorsXPATH.forEach((err) => {
      p = p + 1;
      cadena +=
        "<tr>\n<th scope='row'>" +
        p +
        "</th>\n" +
        "<td scope='row'>" +
        err.lexeme +
        "</td>\n" +
        "<td>" +
        err.description +
        "</td>\n" +
        "<td>" +
        err.typeerror +
        "</td>\n" +
        "<td>" +
        err.language +
        "</td>\n" +
        "<td>" +
        err.row +
        "</td>\n" +
        "<td>" +
        err.column +
        "</td>\n" +
        "</tr>\n";
    });
    Gui.tbodyErrors.innerHTML = cadena;
  } catch (error) {
    Gui.consola.doc.setValue(
      "Mensaje Grupo34 >> No se realizo el reporte de errores XPATH.\n"
    );
  }
};

const reportetabla = () => {
  try {
    if (Globals.lstLabelXML != undefined) {
      let cadena: string =
        "<thead><tr>" +
        "<th scope='col'>No.</th>" +
        "<th scope='col'>Identificador</th>" +
        "<th scope='col'>Valor</th>" +
        "<th scope='col'>Tipo</th>" +
        "<th scope='col'>Entorno</th>" +
        "<th scope='col'>Fila</th>" +
        "<th scope='col'>Columna</th>" +
        "</tr></thead>" +
        "<tbody id='contts'>";
      const symbolTable = Globals.lstLabelXML?.createSymbolTable();
      //console.log(symbolTable);
      cadena = cadena + symbolTable.graficartabla();

      Gui.tbodytabla.innerHTML = cadena;
    }
  } catch (error) {
    Gui.consola.doc.setValue(
      "Mensaje Grupo34 >> No se realizo el reporte de simbolos.\n"
    );
  }
};
/* ASIGNANDO LA ACCION AL BOTON */

Gui.btnAnalizarxmlasc.addEventListener("click", () => {
  const text = Gui.editorXml.doc.getValue();
  analyzerXMLASC(text);
});

Gui.btnAnalizarxpahasc.addEventListener("click", () => {
  const text = Gui.editorXquery.doc.getValue();
  analyzerXPATHASC(text);
});

Gui.btnTraducirxpahasc.addEventListener("click", () => {
  const text = Gui.editorXquery.doc.getValue();
  translateXPATHASC(text);
});

Gui.btnTraducirxmlasc.addEventListener("click", () => {
  const text = Gui.editorXml.doc.getValue();
  translateXMLASC(text);
});

Gui.btnOptimizer.addEventListener("click", () => {
  const text = Gui.editorXquery.doc.getValue();
  analyzerOPTIMIZER(text);
});

Gui.btnRgxml.addEventListener("click", () => {
  try {
    Gui.rgconsola.innerHTML = "";
    Gui.rgconsola.innerHTML = Globals.rg.getReporte();
  } catch (error) {
    Gui.consola.doc.setValue(
      "Mensaje Grupo34 >> No se pudo mostrar el reporte gramatical XML.\n"
    );
  }
});

Gui.btnRgquerys.addEventListener("click", () => {
  try {
    Gui.rgconsola.innerHTML = "";
    Gui.rgconsola.innerHTML = Globals.rgquerys.getReporte();
  } catch (error) {
    Gui.consola.doc.setValue(
      "Mensaje Grupo34 >> No se pudo mostrar el reporte gramatical QUERYS.\n"
    );
  }
});

Gui.btnRperrorsxml.addEventListener("click", () => {
  reporterrorsXML();
});
Gui.btnRperrorsquerys.addEventListener("click", () => {
  reporterrorsXPATH();
});
Gui.btnTsxml.addEventListener("click", () => {
  reportetabla();
});
Gui.btnCstxml.addEventListener("click", () => {
  const v = Viz(Globals.lstLabelXML.graph(), { format: "svg" });
  Gui.divGraph.innerHTML = v;
});

Gui.btnCstxpath.addEventListener("click", () => {
  console.log(Globals.lstxquery);
  const v = Viz(Globals.lstxquery.graphCST(), { format: "svg" });
  Gui.divGraph.innerHTML = v;
});

Gui.btnAstxpath.addEventListener("click", () => {
  const v = Viz(Globals.lstxquery.graphAST(), { format: "svg" });
  Gui.divGraph.innerHTML = v;
});
