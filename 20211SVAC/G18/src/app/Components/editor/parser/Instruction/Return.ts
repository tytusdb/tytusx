import { EjecutorXPath } from "../../ejecutor/ejecutorXPath";
import { Instruction } from "../Abstract/Instruction";
import { NodoXML } from "../Nodes/NodoXml";
import { Environment } from "../Symbol/Environment";
import { _Console } from '../Util/Salida';
import { Fin } from "./Fin";

export class Return extends Instruction {

    constructor(private instructions: Array<Fin>, line: number, column: number) {
        super(line, column);
    }

    public execute(env: Environment) {
        try {
            // Hacer la consulta a xpath
            var Return = new NodoXML("Return", "Return",0,0);
            this.instructions.forEach(element => {
                Return.addHijo(element.tree);
            });
            let ejecutor = new EjecutorXPath(env);
            let result = ejecutor.ejecutar(Return);
            // _Console.salida += result;
        } catch (e) {
            console.error(e);
        }
    }

    public translate(environment: Environment): String {
        let result = "// Inicia ForIn\n";
        return result;
    }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Foreach\"];";
        // result += "node" + count + "3[label=\"(" + this.code.line + "," + this.code.column + ") Codigo\"];";
        // result += this.code.plot(Number(count + "3"));
        // // Flechas
        // result += "node" + count + " -> " + "node" + count + "1;";
        // result += "node" + count + " -> " + "node" + count + "3;";

        return result;

    }



}