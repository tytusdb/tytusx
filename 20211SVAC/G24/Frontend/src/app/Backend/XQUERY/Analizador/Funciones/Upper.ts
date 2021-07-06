import { Expression } from "@angular/compiler";
import Tipo, { tipoDato } from "src/app/Backend/XQUERY/Analizador/Simbolos/Tipo";
import { Instruccion } from "src/app/Backend/XQUERY/Analizador/Abstracto/Instruccion";
import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import tablaSimbolos from "../Simbolos/tablaSimbolos";

export default class Upper extends Instruccion {
    public expresion: Instruccion;

    constructor(expresion: Instruccion, linea: number, columna: number,) {
        super(new Tipo(tipoDato.ENTERO), linea, columna);
        this.expresion = expresion;

    }
    interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
        if (this.expresion instanceof Instruccion) {
            console.log("entre")
            var hola = this.expresion.interpretar(arbol, tabla, tablaxml);
            var resp = hola.toString();
            var uper = resp.toUpperCase();
            var val = this.Textocd3(arbol, hola.toString())
            arbol.codigo3d.push("//***print****")
            let countprint = arbol.getContadort();
            arbol.codigo3d.push(`$t${countprint}=stack[(int)${val}]; `);
            arbol.codigo3d.push("//*****ToUpperCase******");
            arbol.codigo3d.push(`$t0=$t${countprint};`);
            arbol.codigo3d.push(`toUpperCase();`);
            arbol.codigo3d.push(`$t0=$t${countprint};`);
            arbol.codigo3d.push("imprimirString();");
            arbol.codigo3d.push(`printf("%c",10);`);
            return uper;
        }
    }
    getNodoAST(): nodoAST {
        throw new Error("Method not implemented.");
    }
    codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    Textocd3(arbol: Arbol, valor: String) {
        let stackID = arbol.getSTACK();
        let contadorID = arbol.getContadort(); //temporales
        arbol.codigo3d.push(`// declaracion PARA TOLOWERCASE `);
        arbol.codigo3d.push(`$t${contadorID}=sp+${stackID};`);
        let data: string = valor + "";
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

        return `$t${contadorID}`
    }

}