export class traduccion {
    static t: number = -1;
    static stackCounter: number = -1;
    static etiquetaCounter: number = 0;
    static tranlate: string = "";
    //static printString: boolean = false;
    //static metodostring:string = "";
    static metodoConsultaXPATH:string = "";
    static compararCadenas3d:string="";
    static etiquetaTexto:string="";
    static etiquetaApertura:string="";
    static etiquetaCierre:string="";
    static etiquetaUnitaria:string="";
    static etiquetaAtributo:string="";
    static verificarAtributo:string="";
    static printString:string="";

    public static getTranslate(): string {
        var content: string = "";
        content += "//Header\t--------------\n";
        content += "#include <stdio.h>\n\n";
        content += "double heap[30101999];\n";
        content += "double stack[30101999];\n\n";
        content += "double S;\n";
        content += "double H;\n\n";
        if (this.t > 0) {
            content += "double ";
            for (let i = 0; i < this.t+1; i++) {
                content += "t" + i.toString();
                if (i < this.t) {
                    content += ", ";
                }
            }
            content += ";\n\n";
        }
        //content += this.metodostring;
        content += this.printString;
        content += this.metodoConsultaXPATH;
        content += this.compararCadenas3d;
        content += this.etiquetaTexto;
        content += this.etiquetaApertura;
        content += this.etiquetaCierre;
        content += this.etiquetaUnitaria;
        content += this.verificarAtributo;
        content += this.etiquetaAtributo;
        content += "//Metodo Main\t--------------\n";
        content += "void main(){\n";
        content += "S = 0; H = 0;\n\n";
        content += this.tranlate;
        content += "\nL0:\n";
        content += "\nreturn;\n";
        content += "}";
        return content;
    }

    public static setTranslate(content: string) {
        this.tranlate += content + "\n";
    }

    /*public static setPrintString(content:string) {
        this.metodostring += content + "\n";
    }*/

    public static setConsultaXPATH(content:string) {
        this.metodoConsultaXPATH += content + "\n";
    }

    //CREACION DEL METODO comparar cadenas****************************
    public static metodoCompararCadenas() {
        this.compararCadenas3d += "//Metodo Comparar cadenas\t--------------\n\n";
        this.compararCadenas3d += "void compararCadenas() {\n";
        traduccion.t++;
        this.compararCadenas3d += "t"+traduccion.t+" = S + 1;\n";
        traduccion.t++;
        this.compararCadenas3d += "t"+traduccion.t + " = stack[(int)t"+(traduccion.t-1)+"];\n";
        traduccion.t++;
        this.compararCadenas3d += "t"+traduccion.t+" = t"+(traduccion.t-2)+" + 1;\n";
        traduccion.t++;
        this.compararCadenas3d += "t"+traduccion.t + " = stack[(int)t"+(traduccion.t-1)+"];\n";
        traduccion.etiquetaCounter++;
        this.compararCadenas3d += "L"+traduccion.etiquetaCounter+":\n";
        traduccion.t++;
        this.compararCadenas3d += "t"+traduccion.t + " = heap[(int)t"+(traduccion.t-3)+"];\n";
        traduccion.t++;
        this.compararCadenas3d += "t"+traduccion.t + " = heap[(int)t"+(traduccion.t-2)+"];\n";
        traduccion.t++;
        traduccion.etiquetaCounter++;
        this.compararCadenas3d += "if(t"+(traduccion.t-2)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.compararCadenas3d += "if(t"+(traduccion.t-1)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.compararCadenas3d += "if(t"+(traduccion.t-2)+"!=t"+(traduccion.t-1)+") goto L"+traduccion.etiquetaCounter+";\n";
        this.compararCadenas3d += "t"+(traduccion.t-5)+" = t"+(traduccion.t-5)+" + 1;\n";
        this.compararCadenas3d += "t"+(traduccion.t-3)+" = t"+(traduccion.t-3)+" + 1;\n";
        this.compararCadenas3d += "goto L"+(traduccion.etiquetaCounter-1)+";\n";
        this.compararCadenas3d += "L"+traduccion.etiquetaCounter+":\n";
        traduccion.etiquetaCounter++;
        this.compararCadenas3d += "if(t"+(traduccion.t-1)+"==t"+(traduccion.t-2)+") goto L"+traduccion.etiquetaCounter+";\n";
        this.compararCadenas3d += "stack[(int)t"+(traduccion.t-6)+"] = 0;\n";
        traduccion.etiquetaCounter++;
        this.compararCadenas3d += "goto L"+(traduccion.etiquetaCounter)+";\n";
        traduccion.etiquetaCounter++;
        this.compararCadenas3d += "L"+(traduccion.etiquetaCounter-2)+":\n";
        this.compararCadenas3d += "stack[(int)t"+(traduccion.t-6)+"] = 1;\n";
        this.compararCadenas3d += "L"+(traduccion.etiquetaCounter-1)+":\n";
        this.compararCadenas3d += "return;\n";
        this.compararCadenas3d += "}\n\n";
        //traduccion.t++;
    }

    //CREACION DEL METODO imprimir nodo Texto**********
    public static crearEtiquetaTexto() {
        this.etiquetaTexto += "//Metodo etiqueta texto\t--------------\n\n";
        this.etiquetaTexto += "void crearEtiquetaTexto() {\n";
        //Obtiene posiciones
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t+" = S + 1;\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t + " = stack[(int)t"+(traduccion.t-1)+"];\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t+" = t"+(traduccion.t-2)+" + 1;\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t + " = stack[(int)t"+(traduccion.t-1)+"];\n";
        //Imprimir NODOTEXTO
        this.etiquetaTexto += "L"+traduccion.etiquetaCounter+":\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t + " = heap[(int)t"+(traduccion.t-1)+"];\n";
        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "if(t"+(traduccion.t)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.etiquetaTexto += "printf(\"%c\", (char)t"+traduccion.t+");\n";
        this.etiquetaTexto += "t"+(traduccion.t-1)+" = t"+(traduccion.t-1)+" + 1;\n";
        this.etiquetaTexto += "goto L"+(traduccion.etiquetaCounter-1)+";\n";
        //Imprimirt </
        this.etiquetaTexto += "L"+(traduccion.etiquetaCounter)+":\n";
        this.etiquetaTexto += "printf(\"%c\", (char)60);\n";
        this.etiquetaTexto += "printf(\"%c\", (char)47);\n";
        this.etiquetaTexto += "t"+(traduccion.t-5)+" = S + 1;\n";
        this.etiquetaTexto += "t"+(traduccion.t-4) + " = stack[(int)t"+(traduccion.t-5)+"];\n";
        //Obtener ID1
        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "L"+(traduccion.etiquetaCounter)+":\n";
        this.etiquetaTexto += "t"+(traduccion.t-1) + " = heap[(int)t"+(traduccion.t-4)+"];\n";
        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "if(t"+(traduccion.t-1)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.etiquetaTexto += "printf(\"%c\", (char)t"+(traduccion.t-1)+");\n";
        this.etiquetaTexto += "t"+(traduccion.t-4)+" = t"+(traduccion.t-4)+" + 1;\n";
        this.etiquetaTexto += "goto L"+(traduccion.etiquetaCounter-1)+";\n";
        //Imrprimir >
        this.etiquetaTexto += "L"+(traduccion.etiquetaCounter)+":\n";
        this.etiquetaTexto += "printf(\"%c\", (char)62);\n";
        this.etiquetaTexto += "printf(\"%c\", (char)10);\n";
        this.etiquetaTexto += "return;\n";
        this.etiquetaTexto += "}\n\n";
    }

    //CREACION DEL METODO imprimir etiqueta apertura*********************
    public static crearEtiquetaApertura() {
        this.etiquetaApertura += "//Metodo Etiqueta apertura\t--------------\n\n";
        this.etiquetaApertura += "void crearEtiquetaApertura() {\n"
        traduccion.t++;
        this.etiquetaApertura += "t"+traduccion.t+" = S + 1;\n";
        traduccion.t++;
        this.etiquetaApertura += "t"+traduccion.t+" = stack[(int)t"+(traduccion.t-1)+"];\n"
        this.etiquetaApertura += "printf(\"%c\", (char)60);\t\t// <\n";
        this.etiquetaCounter++;
        this.etiquetaApertura += "L"+this.etiquetaCounter+":\n";
        traduccion.t++;
        this.etiquetaApertura += "t"+traduccion.t+" = heap[(int)t"+(traduccion.t-1)+"];\n";
        this.etiquetaCounter++;
        this.etiquetaApertura += "if(t"+traduccion.t+"==-1) goto L"+this.etiquetaCounter+";\n";
        this.etiquetaApertura += "printf(\"%c\", (char)t"+(traduccion.t)+");\n";
        this.etiquetaApertura += "t"+(traduccion.t-1)+" = t" + (traduccion.t-1) + " + 1;\n";
        this.etiquetaApertura += "goto L"+(this.etiquetaCounter-1)+";\n";
        this.etiquetaApertura += "L"+this.etiquetaCounter+":\n";
        this.etiquetaApertura += "return;\n}\n\n";
    }

    //CREACION DEL METODO imprimir etiqueta cierre*********************
    public static crearEtiquetaCierre() {
        this.etiquetaCierre += "//Metodo Etiqueta Cierre\t--------------\n\n";
        this.etiquetaCierre += "void crearEtiquetaCierre() {\n"
        traduccion.t++;
        this.etiquetaCierre += "t"+traduccion.t+" = S + 1;\n";
        traduccion.t++;
        this.etiquetaCierre += "t"+traduccion.t+" = stack[(int)t"+(traduccion.t-1)+"];\n"
        this.etiquetaCierre += "printf(\"%c\", (char)60);\t\t// <\n";
        this.etiquetaCierre += "printf(\"%c\", (char)47);\t\t// /\n"; 
        this.etiquetaCounter++;
        this.etiquetaCierre += "L"+this.etiquetaCounter+":\n";
        traduccion.t++;
        this.etiquetaCierre += "t"+traduccion.t+" = heap[(int)t"+(traduccion.t-1)+"];\n";
        this.etiquetaCounter++;
        this.etiquetaCierre += "if(t"+traduccion.t+"==-1) goto L"+this.etiquetaCounter+";\n";
        this.etiquetaCierre += "printf(\"%c\", (char)t"+(traduccion.t)+");\n";
        this.etiquetaCierre += "t"+(traduccion.t-1)+" = t" + (traduccion.t-1) + " + 1;\n";
        this.etiquetaCierre += "goto L"+(this.etiquetaCounter-1)+";\n";
        this.etiquetaCierre += "L"+this.etiquetaCounter+":\n";
        this.etiquetaCierre += "printf(\"%c\", (char)62);\t\t// >\n";   
        this.etiquetaCierre += "printf(\"%c\", (char)10);\t\t// Salto de linea\n";  
        this.etiquetaCierre += "return;\n}\n\n";
    }

    public static crearAtributoEtiqueta() {
        this.etiquetaAtributo += "//Metodo Obtener Atributo\t--------------\n";
        this.etiquetaAtributo += "void crearAtributoEtiqueta() {\n";
        //Obetener posiciones----------
        traduccion.t++;
        this.etiquetaAtributo += "t"+traduccion.t+" = S + 1;\n";
        traduccion.t++;
        this.etiquetaAtributo += "t"+traduccion.t + " = stack[(int)t"+(traduccion.t-1)+"];\n";
        traduccion.t++;
        this.etiquetaAtributo+= "t"+traduccion.t+" = t"+(traduccion.t-2)+" + 1;\n";
        traduccion.t++;
        this.etiquetaAtributo += "t"+traduccion.t + " = stack[(int)t"+(traduccion.t-1)+"];\n";
        //Imprimir espacio en blanco-----------
        this.etiquetaAtributo += "printf(\"%c\", (char)32);\t\t// \' \'\n";
        //Obtener ID1
        traduccion.etiquetaCounter++;
        this.etiquetaAtributo += "L"+traduccion.etiquetaCounter+":\n";
        traduccion.t++;
        //this.etiquetaAtributo += "t"+(traduccion.t-3)+"= t"+ (traduccion.t-3)+" + 1;\n"
        this.etiquetaAtributo += "t"+traduccion.t + " = heap[(int)t"+(traduccion.t-3)+"];\n";
        traduccion.etiquetaCounter++;
        this.etiquetaAtributo += "if(t"+(traduccion.t)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.etiquetaAtributo += "printf(\"%c\", (char)t"+traduccion.t+");\n";
        this.etiquetaAtributo += "t"+(traduccion.t-3)+" = t"+(traduccion.t-3)+" + 1;\n";
        this.etiquetaAtributo += "goto L"+(traduccion.etiquetaCounter-1)+";\n";
        //Imprimir ="
        this.etiquetaAtributo += "L"+(traduccion.etiquetaCounter)+":\n";
        this.etiquetaAtributo += "printf(\"%c\", (char)61);\t\t// =\n";
        this.etiquetaAtributo += "printf(\"%c\", (char)34);\t\t// \"\n";
        traduccion.etiquetaCounter++;
        this.etiquetaAtributo += "goto L"+(traduccion.etiquetaCounter)+";\n";
        //Obtener ID2
        this.etiquetaAtributo += "L"+traduccion.etiquetaCounter+":\n";
        traduccion.t++;
        this.etiquetaAtributo += "t"+traduccion.t + " = heap[(int)t"+(traduccion.t-2)+"];\n";
        traduccion.etiquetaCounter++;
        this.etiquetaAtributo += "if(t"+(traduccion.t)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.etiquetaAtributo += "printf(\"%c\", (char)t"+traduccion.t+");\n";
        this.etiquetaAtributo += "t"+(traduccion.t-2)+" = t"+(traduccion.t-2)+" + 1;\n";
        this.etiquetaAtributo += "goto L"+(traduccion.etiquetaCounter-1)+";\n";
        //Imprimir " y fin
        this.etiquetaAtributo += "L"+(traduccion.etiquetaCounter)+":\n";
        this.etiquetaAtributo += "printf(\"%c\", (char)34);\t\t// \"\n";
        this.etiquetaAtributo += "return;\n}\n\n";
    }

    public static metodoVerificarAtributo() {
        this.verificarAtributo += "//Metodo verificar atributo\t--------------\n\n";
        this.verificarAtributo += "void verificarAtributo() {\n";
        traduccion.t++;
        this.verificarAtributo += "t"+traduccion.t+" = S + 1;\n";
        traduccion.t++;
        this.verificarAtributo += "t"+traduccion.t + " = stack[(int)t"+(traduccion.t-1)+"];\n";
        traduccion.etiquetaCounter++;
        this.verificarAtributo += "L"+traduccion.etiquetaCounter+":\n";
        traduccion.t++;
        this.verificarAtributo += "t"+traduccion.t + " = heap[(int)t"+(traduccion.t-1)+"];\n";        
        traduccion.etiquetaCounter++;
        this.verificarAtributo += "if(t"+(traduccion.t)+"==64) goto L"+traduccion.etiquetaCounter+";\n";
        this.verificarAtributo += "stack[(int)t"+(traduccion.t-2)+"] = 0;\n";
        traduccion.etiquetaCounter++;
        this.verificarAtributo += "goto L"+(traduccion.etiquetaCounter)+";\n";
        this.verificarAtributo += "L"+(traduccion.etiquetaCounter-1)+":\n";
        this.verificarAtributo += "stack[(int)t"+(traduccion.t-2)+"] = 1;\n";
        this.verificarAtributo += "L"+(traduccion.etiquetaCounter)+":\n";
        this.verificarAtributo += "return;\n";
        this.verificarAtributo += "}\n\n";
    }

    public static crearPrintString() {
        traduccion.printString += "//Metodo printString\t--------------\n\n";
        traduccion.printString += "void printString() {\n";
        traduccion.t++;
        traduccion.printString += "t"+traduccion.t+" = S+1;\n";
        traduccion.t++;
        traduccion.printString += "t"+traduccion.t+" = stack[(int)t"+(traduccion.t-1).toString()+"];\n";
        traduccion.etiquetaCounter++;
        traduccion.t++;
        traduccion.printString += "L"+traduccion.etiquetaCounter+":\n"; //L0
        traduccion.printString += "t"+traduccion.t+" = heap[(int)t"+(traduccion.t-1)+"];\n";
        traduccion.etiquetaCounter++;
        traduccion.printString += "if(t"+traduccion.t+" == -1) goto L"+traduccion.etiquetaCounter+";\n"; //L1
        traduccion.printString += "printf(\"%c\", (char)t"+traduccion.t+");\n";
        traduccion.printString += "t"+(traduccion.t-1)+" = t"+(traduccion.t-1)+"+1;\n";
        traduccion.printString += "goto L"+(traduccion.etiquetaCounter-1)+";\n";
        traduccion.printString += "L"+traduccion.etiquetaCounter+":\n";
        traduccion.printString += "return;\n";
        traduccion.printString += "}\n\n";
    }
}