import { Entorno } from "../AST/Entorno";
import { InstruccionXQuery } from "../Interfaz/instruccionXQuery";
import { TraduceXML } from "./TraduceXML";
import { TranslateXPath } from "./TranslateXPath";


export class TranslateXQuery{
    contSQ: number;
    contHQ: number;
    xQueryHeap: Array<number>;
    xQueryStack: Array<number>;
    strTraduccion: string;    
    xmlHeap: Array<number>;
    xmlStack: Array<number>;
    //funcionesUtilizadas: Array<NativaXPath>;
    instruccion: InstruccionXQuery
    xQueryTabla: Entorno;
    xmlTabla: Entorno;
    contT: number;
    translateXPath: TranslateXPath
    funcionesUtilizadas: Array<NativaXQuery>;
    constructor(instruccion: InstruccionXQuery, xqueryTabla: Entorno, xmlTabla: Entorno, translateXPath: TranslateXPath){
        this.contSQ = 0
        this.contHQ = 0;
        this.xQueryHeap = []
        this.xQueryStack = []
        this.strTraduccion = "";
        this.xmlHeap = []
        this.xmlStack = []
        this.instruccion = instruccion
        this.xQueryTabla = xqueryTabla;
        this.translateXPath = translateXPath;
        this.xmlTabla = xmlTabla;
        this.contT = 0;
        this.funcionesUtilizadas = [];
    }

    public getFuncionesUtilizadas(): string{
        let funciones = "";
        this.funcionesUtilizadas = this.funcionesUtilizadas.reverse();
        this.funcionesUtilizadas.forEach((func: any) =>{
            switch(func){
                case NativaXQuery.FROMHEAPTOXQHEAP:
                    funciones += this.getFromHeapToXQHeap()
                    break;
                case NativaXQuery.IMPRIMIRATRIBUTOXQ:
                    funciones += this.getImprimirAtributo();
                    break;
                case NativaXQuery.IMPRIMIRCONSULTAXQ:
                    funciones += this.getImprimirConsulta();
                    break;
                case NativaXQuery.IMPRIMIRETIQUETAXQ:
                    funciones += this.getImprimirEtiqueta();
                    break;
                case NativaXQuery.IMPRIMIRTEXTOXQ:
                    funciones += this.getImprimirTexto();
                    break;
                default:
                break;
            }
        });
        return funciones;
    }
    public getDeclaraTempsXQuery(): string{
        //Ver cuantos temporales fueron utlizados.
        let temps = "";
        if(this.contT > 0){
            let i = 0;
            temps = "double tq"+i;
            i++;
            while(i < this.contT){
                temps += ", tq"+i;
                i++;
            }
            temps += ";\n"
        }
        return temps;
    }

    iniciarTraduccion(): string{
        return this.instruccion.getCodigo3Dir(this.xQueryTabla, this.xmlTabla, this.translateXPath, this);
    }

    StringToHeap(nombre: string, id: string): string{
        //XQStack[(int)0] = 30
         let tradNodo:string = '\n\t /* VARIABLE "'+id+'" EN HEAP de XQUERY*/ \n';
         let temporal = 'tq'+this.contT;
         tradNodo += '\t'+temporal+' = HQ;\n';
         tradNodo +='\tXQHeap[(int)HQ] = -3; \n'
         +'\tHQ = HQ + 1; \n';
         nombre.split('').forEach((element:any) => {
            tradNodo = tradNodo
            +'\tXQHeap[(int)HQ] = '+element.charCodeAt(0)+'; \n'
            +'\tHQ = HQ + 1; \n';
            this.xQueryHeap.push(element.charCodeAt(0));
            this.contHQ++;
        });
        tradNodo +='\tXQHeap[(int)HQ] = -3; \n'
        +'\tHQ = HQ + 1; \n';        
        tradNodo += '\tXQStack[(int)SQ] = '+temporal+';\n'
        this.contSQ++;
        return tradNodo;
    }


    public getFromHeapToXQHeap(){
        //Escribir nombre de la funcion
        let code = 'void fromHeapToXQHeap(){\n'
        //Guardar en un temporal el inicio del simbolo en el heap del Xq
        //0. tq0 = HQ
        code += '\t/*--- TQ'+this.contT+' TIENE EL VALOR CON EL QUE FINALIZA EL AMBITO --- */ \n';
        let segundoTemp = 'tq'+this.contT;
        this.contT = this.contT + 1;
        //Un segundo temporal para guardar el valor con el que se finaliza el ambito.
        //1. tq2 = heap[(int)H];
        code += "\t"+segundoTemp+" = heap[(int)H];\n";
        //2. Empezar a copiar lo que hay en el heap del xml hacia el heap del Xq

        code += '\tXQHeap[(int)HQ] = heap[(int)H];\n';
        //3. Sumar los contadores del heap del xml y el heap de XPATH
        code += '\t HQ = HQ + 1;\n\t H = H+1;\n';
        //Tercer temporal para ir copiando del heap xml hacia el heap del query
        let tercerTemp = 'tq'+this.contT;
        this.contT = this.contT + 1;

        //Empezar con la primera etiqueta
        code += '\tL1:\n'
            + '\t\t'+tercerTemp+' = heap[(int)H];\n'
            + '\t\tif('+tercerTemp+' == '+segundoTemp+') goto L2;\n'
            + '\t\tXQHeap[(int)HQ] = '+tercerTemp+';\n'
        //4. Sumar los contadores del heap del xml y el heap de Xquery
        code += '\t\t HQ = HQ + 1;\n\t\t H = H+1;\n';
        //5. Regresar a primer etiqueta para seguir copiando.
        code += '\t\tgoto L1;\n'
        //6. Escribir el contenido de la etiqueta 2.
        code += '\tL2: \n'
            + '\t\t/*--- Ya se completo el ambito en el heap del xpath ---*/\n'
            + '\t\tXQHeap[(int)HQ] = heap[(int)H];\n'
            + '\t\t H = H + 1;\n';
        //7. Return.       
        code += '\treturn;\n'
        code += '}\n';
        return code;
    }
    
    
    private getImprimirConsulta(): string{
        let code = "void imprimirConsultaXQ(){\n";
        code += "\t/* --- tq"+this.contT+" TIENE EL VALOR CON EL QUE FINALIZA LA CONSULTA -- */\n";
        let primerTemp = 'tq'+this.contT;
        this.contT = this.contT + 1;
        //Guardar el valor con el que termina la consulta.
        code += '\tHQ = HQ + 1;\n'
        //Etiqueta 0, para ciclar hasta encontrar un -13.
        code += '\tL0:\n'
            +'\t'+primerTemp+' = XQHeap[(int)HQ];\n'        
            + '\t\t\if('+primerTemp+' == -13) goto L5;\n'
            + '\t\tgoto L1;\n'
        //Empezar con la primera et para verificar que tipo de consulta es
        code += '\tL1:\n'; //Este verifica si es etiqueta <
        code += '\t\t /* -- Ver si es etiqueta -- */\n';
        code += '\t\t if('+primerTemp+' > -5) goto L2;\n';
        code += '\t\timprimirEtiquetaXQ();\n';
        code += '\t\tprintf("%c", (char) 10);\n';
        code +=  '\t\tgoto L0;\n'        
        //La segunda etiqueta verifica si es atributo o texto.
        code += '\tL2:\n'
        code += '\t\t /* -- Ver si es atributo(-2) o texto(-3) -- */\n';
        code += '\t\tif('+primerTemp+' == -2) goto L3;\n';
        code += '\t\tif('+primerTemp+' == -3) goto L4;\n';        
        code += '\t\tgoto L5;\n';
        //La tercera etiqueta llama al metodo para imprimir atributo.
        code += '\tL3: \n'
            + '\t\tHQ = HQ + 2;\n'
            + '\t\timprimirAtributoXQ();\n'
            + '\t\printf("%c", (char) 10);\n'
            + '\t\tgoto L0;\n';
        //La cuarta etiqueta llama al metodo para imprimir texto
        code += '\tL4: \n'
            + '\t\tHQ = HQ + 1;\n'
            + '\t\timprimirTextoXQ();\n'
            + '\t\tprintf("%c", (char) 10);\n'            
            + '\t\tgoto L0;\n';
        //La quinta etiqueta es el fin del metodo.
        code += '\tL5: \n'
            + '\tprintf("%c", (char) 10);\n'
            + '\treturn;\n'
            + '}\n';
        
    
        return code;
    }


    private getImprimirEtiqueta(): string {
        let code = "void imprimirEtiquetaXQ() {\n";
        let primerTemp  = "tq"+this.contT; //tq5
        this.contT = this.contT + 1;
        code += "\t"+primerTemp+' = XQHeap[(int)HQ];\n';
        code += '\tHQ = HQ + 1;\n';
        let segundoTemp = "tq"+this.contT;
        this.contT = this.contT + 1;
        code += '\t'+segundoTemp+' = 0;\n'; //tq11
        let tercerTemp = "tq"+this.contT;
        this.contT = this.contT + 1;
        code += '\t'+tercerTemp+' = HQ;\n'    //tq10
        //Empezar a imprimir la etiqueta.
        code += '\tprintf("%c", (int) 60); //Ascii <\n';
        let cuartoTemp = "tq"+this.contT; // tq6
        this.contT = this.contT + 1;        
        //Primer etiqueta, verifica si ya se acabo el ambito.
        code += '\tL1:\n'
            + '\t\t'+cuartoTemp+' = XQHeap[(int)HQ];\n'
            + '\t\tif('+cuartoTemp+' == '+primerTemp+') goto L2;\n'
            + '\t\tgoto L3;\n';
        //Etiqueta L3, verifica si es atributo (-2)
        code += '\tL3:\n'
            + '\t\tif('+cuartoTemp+' != -2) goto L4;\n'
            + '\t\tHQ = HQ + 1;\n'
            + '\t\tprintf("%c", (char) 32); // Espacio\n'
            + '\t\timprimirAtributoXQ();\n'
            + '\t\tHQ = HQ + 1;\n'
            + '\t\tgoto L1;\n';
        //Etiqueta L4, verifica si es texto (-3)
        code += '\tL4:\n'
            + '\t\t//Ver si es texto\n'
            + '\t\tif('+cuartoTemp+' != -3) goto L5;\n'
            + '\t\tprintf("%c", (char) 62); //Ascii >\n'
            + '\t\tHQ = HQ + 1;\n'
            + '\t\t'+segundoTemp+' = 1;\n'
            + '\t\timprimirTextoXQ();\n'
            + '\t\tgoto L1;\n';
        //Etiqueta L5, verifica si es -1 (ya termino el id de la etiqueta)
        code += '\tL5:\n'
            + '\t\tif('+cuartoTemp+' != -1) goto L6;\n'
            + '\t\tHQ = HQ + 1;\n'
            + '\t\tgoto L1;\n';
        //Etiqueta L6
        code += '\tL6:\n'
            + '\t\t//Revisar si hay otra etiqueta\n'
            + '\t\tif('+cuartoTemp+' < '+primerTemp+') goto L7;\n'
            + '\t\t//Aun no, solo imprimir caracter. (Revisar antes si es fin de ambito -13)\n'
            + '\t\tif('+cuartoTemp+' == -13) goto L2;\n'
            + '\t\tprintf("%c", (char) '+cuartoTemp+');\n'
            + '\t\tHQ = HQ + 1;\n'
            + '\t\tgoto L1;\n';
        //Etiqueta L7, imprimir el entorno de la etiqueta interior.
        let quintoTemp = "tq"+this.contT; // tq13
        this.contT = this.contT + 1;        
        code += '\tL7:\n'
            + '\t\tif('+cuartoTemp+' == -13) goto L2;\n'
            + '\t\tif('+segundoTemp+' == 0) goto L10;\n'
            + '\t\tXQStack[(int)SQ] = '+primerTemp+';\n'
            + '\t\tSQ = SQ + 1;\n'
            + '\t\tXQStack[(int)SQ] = '+tercerTemp+';\n'
            + '\t\tSQ = SQ + 1;\n'
            + '\t\timprimirEtiquetaXQ();\n'
            + '\t\t'+primerTemp+' = XQStack[(int)SQ];\n'
            + '\t\t'+quintoTemp+' = SQ + 1;\n'
            + '\t\t'+segundoTemp+' = 1;\n'
            + '\t\t'+tercerTemp+' = XQStack[(int)'+quintoTemp+'];\n'
            + '\t\tHQ = HQ + 1;\n'
            + '\t\tgoto L1;\n';
        //Etiqueta L10, imprime caracter de cierre. >
        code += '\tL10:\n'
            + '\t\tprintf("%c", (char) 62); //Ascii >\n'
            + '\t\t'+segundoTemp+' = 1;\n'
            + '\t\tgoto L7;\n';
        //Etiqueta L2: Escribe una etiqueta de cierra </cierre>
        code += '\tL2:\n'
            + '\t\t//EScribir etiqueta de cierre.\n'
            + '\t\tif('+segundoTemp+'== 0) goto L11;\n'
            + '\t\tprintf("%c", (char) 60); //Ascii <\n'
            + '\t\tprintf("%c", (char) 47); //Ascii /\n'
            + '\t\tgoto L8;\n';
        //Etiqueta L11: Imprime caracter de cierre. >
        code += '\tL11:\n'
        + '\t\tprintf("%c", (char) 62); //Ascii >\n'
        + '\t\t'+segundoTemp+' = 1;\n'
        + '\t\tgoto L2;\n';
        //Etiqueta L8: Escribe id de cierre </ cierre >
        code += '\tL8:\n'
            + '\t\t'+cuartoTemp+' = XQHeap[(int)'+tercerTemp+'];\n'
            + '\t\tif('+cuartoTemp+' == -1) goto L9;\n'
            + '\t\tprintf("%c", (char) '+cuartoTemp+');\n'
            + '\t\t'+tercerTemp+' = '+tercerTemp+' + 1;\n'
            + '\t\tgoto L8;\n';
        
        //Etiqueta L9: imprimire caracter de cierre > y termina el metodo :D
        code += '\tL9:\n'
            + '\t\tprintf("%c", (char) 62); //Ascii >\n'
            + '\tSQ = SQ - 2;\n'
            + '\treturn;\n'
        code += "}\n"
        return code;
    }

    private getImprimirAtributo(): string {
        let code = "void imprimirAtributoXQ(){\n";
        let primerTemp = 'tq'+this.contT;
        this.contT = this.contT + 1;
        code += '\tL1:\n'
            + '\t\t'+primerTemp+' = XQHeap[(int)HQ];\n'
            + '\t\tif('+primerTemp+' == -2) goto L2;\n'
            + '\t\tprintf("%c", (char)'+primerTemp+');\n'
            + '\t\tHQ = HQ + 1;\n'
            + '\t\tgoto L1;\n';
        //Etiqueta L2, imprimir espacio = y el valor del atributo
        code += '\tL2:\n'
            + '\t\tprintf("%c", (char) 32); // Espacio\n'
            + '\t\tprintf("%c", (char)61); // = \n'
            + '\t\tprintf("%c", (char) 32); // Espacio\n'
            + '\t\tHQ = HQ + 2;\n';

        //Etiqueta L3, imprime el valor del atributo.
        code += '\tL3:\n'
        code += '\t\t'+primerTemp+' = XQHeap[(int)HQ];\n'
        code += '\t\tif('+primerTemp+' == -3) goto L4;\n'
        code += '\t\tprintf("%c", (char)'+primerTemp+');\n'
        code += '\t\tHQ = HQ + 1;\n'
        code += '\t\tgoto L3;\n';
        //Etiqueta L4; Imprime espacio y termina el metodo.
        code += '\tL4:\n'
            + '\t\tprintf("%c", (char) 32);// Espacio\n'
            + '\treturn;\n';
        code += '}\n'
        return code;
    }

    private getImprimirTexto(): string{
        let code = "void imprimirTextoXQ(){\n";
        code += "\t//Texto termina con -3\n";
        let primerTemp = 'tq'+this.contT;
        this.contT = this.contT + 1;        
        code += '\tL1:\n'
            + '\t\t'+primerTemp+' = XQHeap[(int)HQ];\n'
            + '\t\tif('+primerTemp+' == -3) goto L2;\n'
            + '\t\tprintf("%c", (char)'+primerTemp+');\n'
            + '\t\tHQ = HQ + 1;\n'
            + '\t\tgoto L1;\n'
            + '\tL2:\n'
            + '\t\tHQ = HQ + 1;\n'
            + '\treturn;\n';
        code += "}\n"
        return code;
    }    

}

export enum NativaXQuery{
    FROMHEAPTOXQHEAP,
    IMPRIMIRCONSULTAXQ,
    IMPRIMIRETIQUETAXQ,
    IMPRIMIRTEXTOXQ,
    IMPRIMIRATRIBUTOXQ,
}