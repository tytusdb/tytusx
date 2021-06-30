
import nodoAST from "src/app/Backend/XML/Analizador/Abstracto/nodoAST";
import Arbol from "src/app/Backend/XML/Analizador/Simbolos/Arbol";
import tablaSimbolos from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import Tipo from "src/app/Backend/XML/Analizador/Simbolos/Tipo";
import { tipoDato } from "src/app/Backend/XML/Analizador/Simbolos/Tipo";
import { Instruccion } from "src/app/Backend/XML/Analizador/Abstracto/Instruccion";
import { reporteTabla } from "../Reportes/reporteTabla";
import Simbolo from "../Simbolos/Simbolo";

export default class Atributo extends Instruccion {

  public identificador: string;
  public valor: string;
  public linea: number;
  public columna: number;

  constructor(identificador: string, valor: string, linea: number, columna: number) {
    super(new Tipo(tipoDato.ATRIBUTO), linea, columna);
    this.identificador = identificador;
    this.valor = valor;
    linea = this.linea;
    columna = this.columna;
  }

  public interpretar(arbol: Arbol, tabla: tablaSimbolos) {
    return { identificador: this.identificador, valor: this.valor, linea: this.fila, columna: this.columna }
  }

  public getNodo(): nodoAST {

    let nodo = new nodoAST('ATRIBUTO'); //PADRE ATRIBUTO

    var padreidentificador = new nodoAST('IDENTIFICADOR'); //PADRE IDENTIFICADOR
    padreidentificador.agregarHijo(this.identificador);
    nodo.agregarHijoAST(padreidentificador);
    let igual = new nodoAST('=')
    nodo.agregarHijoAST(igual);

    var padre = new nodoAST("VALOR"); //PADRE IDENTIFICADOR
    padre.agregarHijo(this.valor)
    nodo.agregarHijoAST(padre);


    return nodo;
  }
  codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
    var simbolo
    let stackID = arbol.getSTACK();
    let contadorID = arbol.getContadort(); //temporales
    arbol.codigo3d.push(`// declaracion atributo ${this.identificador}`);
    arbol.codigo3d.push(`$t${contadorID}=sp+${stackID};`);

    let data: string = this.valor + "";
    let estado = 0;
    for (let x = 0; x < data.length; x++) {
      const iterator = data[x];
      switch (estado) {
        case 0: {
          if (iterator == "\\") { estado = 1; continue; }
          arbol.codigo3d.push(`//agregamos el string al heap ${iterator}`);
          arbol.codigo3d.push("$t0=hp;");

          arbol.codigo3d.push("$t1=" + iterator.charCodeAt(0) + ";");
          arbol.codigo3d.push("guardarString();");
          break;
        }
        case 1:
          {
            let assci = 0;
            if (iterator == "n") { assci = 10; }
            else if (iterator == "\"") { assci = 34; }
            else if (iterator == "\\") { assci = 92 }
            else if (iterator == "r") { assci = 10 }
            else if (iterator == "t") { assci = 9; }
            else {
              arbol.codigo3d.push("//agregamos el string al heap");
              arbol.codigo3d.push("$t0=hp;");

              arbol.codigo3d.push("$t1=" + 34 + ";");
              arbol.codigo3d.push("guardarString();");
              arbol.codigo3d.push("//agregamos el string al heap");
              arbol.codigo3d.push("$t0=hp;");

              arbol.codigo3d.push("$t1=" + iterator.charAt(0) + ";");
              arbol.codigo3d.push("guardarString();");
            }
            arbol.codigo3d.push("//agregamos el string al heap");
            arbol.codigo3d.push("$t0=hp;");

            arbol.codigo3d.push("$t1=" + assci + ";");
            arbol.codigo3d.push("guardarString();");
            estado = 0;
            break;
          }
      }

    }
    arbol.codigo3d.push("$t0=hp;");
    arbol.codigo3d.push("$t1=-1;");
    arbol.codigo3d.push("guardarString();");
    const contadort = arbol.getContadort();
    arbol.codigo3d.push("$t" + contadort + "=hp-" + (data.length + 1) + ";");
    arbol.codigo3d.push(`stack[(int)$t${contadorID}]= $t${contadort};`);
   
    
    return { identificador: this.identificador, valor: this.valor, linea: this.fila, columna: this.columna, cd3script: `$t${contadorID}` }
  }
}
