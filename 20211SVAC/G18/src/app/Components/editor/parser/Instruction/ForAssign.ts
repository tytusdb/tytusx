import { EjecutorXPath } from "../../ejecutor/ejecutorXPath";
import { Expression } from "../Abstract/Expression";
import { Instruction } from "../Abstract/Instruction";
import { NodoXML } from "../Nodes/NodoXml";
import { Environment } from "../Symbol/Environment";
import { _Console } from '../Util/Salida';
import { Fin } from "./Fin";

export class ForAssign extends Instruction {

    constructor(private variable1: string, private variable2: string, private clause: Array<Fin>, line: number, column: number) {
        super(line, column);
    }

    public execute(env: Environment) {
        
        if(this.variable2 == null) {
            let valor = "";
            this.clause.forEach(element => {
                valor += "/" + element.getValor() 
            });
            env.guardar(this.variable1,valor,0)
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