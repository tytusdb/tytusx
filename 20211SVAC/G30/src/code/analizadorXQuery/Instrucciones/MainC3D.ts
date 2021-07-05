import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Instruccion } from "../Interfaces/Instruccion";
import { Tipo } from "../AST/Tipo"
import { count } from "console";


export class MainC3D implements Instruccion {
    linea: number;
    columna: number;
    public variables: any;
    public returns: string;
    public contador: number;
    public SP: number;
    public HP: number;

    constructor(linea: number, columna: number, variables: any, returns: any, contador: number, SP: number, HP: number) {
        this.linea = linea;
        this.columna = columna;
        this.variables = variables;
        this.returns = returns;
        this.contador = contador;
        this.SP = SP;
        this.HP = HP;
    }

    ejecutar(ent: Entorno): any {

        var flag = false;
        var id = 'return';
        console.log(this.variables)
        for (let vari of this.variables) {
            if (JSON.stringify(vari[1]) === JSON.stringify(this.returns)) {
                flag = true;
                id = vari[0];
            }
        }

        if (!flag) {
            //hay que agregar
            this.variables.push([id, this.returns])
        }

        return this.BuildC3D(this.variables, this.SP, this.HP, this.contador, id);


    }
    //obtener contador
    GetCountStorage(): number {
        var data = localStorage.getItem('contador');
        return Number(JSON.parse(data));
    }

    //actualizar contador
    SetStorage(contador: any, id: string) {
        localStorage.setItem(id, contador);
    }



    BuildC3D(variables, SP, HP, cont, id) {
        //TODO: este contador se va a traer al local storage
        var cont_label = 0;

        var stack = [];
        var output = '/*------MAIN------*/\nvoid main() {\n PQ = 0; HQ = 0;\n SP = 0; HP = 0;\n SPXP = 0; HPXP = 0;\n\n';
        //recorriendo las variables
        for (let variable of variables) {
            if (variable[1].length == 1) {
                //si es un numero
                stack.push(variable);
                output += '/*------GUARDANDO NUMERO------*/\nstackxq[(int)' + (stack.length - 1) + '] = ' + variable[1] + ';\n\n';
            } else {
                //si es un arreglo de asciis
                output += '/*------GUARDANDO STRING------*/\nt' + cont + ' = HQ;\n'

                for (let asc of variable[1]) {
                    output += 'heapxq[(int)HQ] = ' + asc + ';\nHQ = HQ + 1;\n';
                    HP += 1;
                }
                output += 'heapxq[(int)HQ] = -1;\nHQ = HQ + 1;\n';
                HP += 1;
                stack.push(variable);
                output += 'stackxq[(int)' + (stack.length - 1) + '] = t' + cont + ';\n\n';
                cont += 1;
            }
        }
        //recorremos el stack nuevamente
        for (let i = 0; i < stack.length; i++) {
            //validando posicion del valor a imprimir
            if (stack[i][0] == id) {
                //i es la posicion del stack donde se imprime
                //validando si es un numero
                if (stack[i][1].length == 1) {

                    output += '/*------RETORNANDO NUMERO------*/\nt'+cont+' = stackxq[(int)' + i + '];\n';
                    output += 'printf("%f", (double)t'+cont+');\n';
                    output += 'printf("%c", (char)10);\n\n';
                    cont += 1

                } else {
                    //manda a llamar funcion print
                    output += '/*------RETORNANDO STRING------*/\nt' + cont + ' = stackxq[(int)' + i + '];\n';
                    output += 't' + (cont + 4) + ' = PQ+' + stack.length + ';\n';
                    output += 't' + (cont + 4) + ' = t' + (cont + 4) + '+ 1;\n';
                    output += 'stackxq[(int)t' + (cont + 4) + '] = t' + cont + ';\n';
                    output += 'PQ = PQ + ' + stack.length + ';\n';
                    output += '/*------LLAMANDO FUNCION------*/\nReturnString();\n';
                    output += 't' + (cont + 5) + ' = stackxq[(int)PQ];\n';
                    output += 'PQ = PQ - ' + stack.length + ';\n';
                    output += 'printf("%c", (char)10);\n\n';
                    cont += 1;
                    //creando funcion
                    let out_temp = '/*------RETORNO------*/\nvoid ReturnString() {\n';
                    out_temp += 't' + cont + ' = PQ + 1;\n';
                    out_temp += 't' + (cont + 1) + ' = stackxq[(int)t' + cont + '];\n';
                    cont += 1;
                    out_temp += 'L' + cont_label + ':\n';
                    cont_label += 1;
                    out_temp += 't' + (cont + 1) + ' = heapxq[(int)t' + cont + '];\n';
                    out_temp += 'if(t' + (cont + 1) + ' == -1) goto L' + cont_label + ';\n';
                    out_temp += 'printf("%c", (char)t' + (cont + 1) + ');\n';
                    out_temp += 't' + cont + ' = t' + cont + ' + 1;\n';
                    out_temp += 'goto L' + (cont_label - 1) + ';\n';
                    out_temp += 'L' + cont_label + ':\nreturn;\n}\n\n'
                    cont_label += 1;
                    cont += 4
                    //agregando funcion
                    output = out_temp + output;
                    out_temp = '';
                }
            }
        }

        //TODO: setear cont_label en el local storage
        this.SetStorage(cont_label, 'contadorEtiquetas');
        this.SetStorage(cont, 'contadorTemporales');
        this.SetStorage(output, 'Code3D');

        //agregando return
        /* output += 'return;\n}\n\n'
        return [output, cont]; */
    }

}
