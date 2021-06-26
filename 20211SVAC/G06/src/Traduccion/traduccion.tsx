export class traduccion {
    static t: number = -1;
    static stackCounter: number = -1;
    static etiquetaCounter: number = -1;
    static tranlate: string = "";
    static printString: boolean = false;
    static metodostring:string = "";
    static metodoConsultaXPATH:string = "";
    static compararCadenas3d:string="";
    static etiquetaTexto:string="";
    static etiquetaApertura:string="";
    static etiquetaCierre:string="";
    static etiquetaUnitaria:string="";

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
        content += this.metodostring;
        content += this.metodoConsultaXPATH;
        content += this.compararCadenas3d;
        content += this.etiquetaTexto;
        content += this.etiquetaApertura;
        content += this.etiquetaCierre;
        content += this.etiquetaUnitaria;
        content += "//Metodo Main\t--------------\n";
        content += "void main(){\n";
        content += "S = 0; H = 0;\n\n";
        content += this.tranlate;
        content += "\nreturn;\n";
        content += "}";
        return content;
    }

    public static setTranslate(content: string) {
        this.tranlate += content + "\n";
    }

    public static setPrintString(content:string) {
        this.metodostring += content + "\n";
    }

    public static setConsultaXPATH(content:string) {
        this.metodoConsultaXPATH += content + "\n";
    }

    //CREACION DEL METODO comparar cadenas****************************
    public static metodoCompararCadenas() {
        this.compararCadenas3d += "//Metodo Comparar cadenas\t--------------\n";
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

    //CREACION DEL METODO imprimir nodo Texto****************************
    public static crearEtiquetaTexto() {
        this.etiquetaTexto += "//Metodo Comparar cadenas\t--------------\n";
        this.etiquetaTexto += "void crearEtiquetaTexto() {\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t+" = S + 1;\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t + " = stack[(int)t"+(traduccion.t-1)+"];\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t+" = t"+(traduccion.t-2)+" + 1;\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t + " = stack[(int)t"+(traduccion.t-1)+"];\n";


        this.etiquetaTexto += "printf(\"%c\", (char)60);\n";
        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "L"+traduccion.etiquetaCounter+":\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t + " = heap[(int)t"+(traduccion.t-3)+"];\n";

        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "if(t"+(traduccion.t)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.etiquetaTexto += "printf(\"%c\", (char)t"+traduccion.t+");\n";
        this.etiquetaTexto += "t"+(traduccion.t-3)+" = t"+(traduccion.t-3)+" + 1;\n";
        this.etiquetaTexto += "goto L"+(traduccion.etiquetaCounter-1)+";\n";
        this.etiquetaTexto += "L"+(traduccion.etiquetaCounter)+":\n";
        this.etiquetaTexto += "printf(\"%c\", (char)62);\n";
        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "goto L"+(traduccion.etiquetaCounter)+";\n";
        this.etiquetaTexto += "L"+traduccion.etiquetaCounter+":\n";
        traduccion.t++;
        this.etiquetaTexto += "t"+traduccion.t + " = heap[(int)t"+(traduccion.t-2)+"];\n";
        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "if(t"+(traduccion.t)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.etiquetaTexto += "printf(\"%c\", (char)t"+traduccion.t+");\n";
        this.etiquetaTexto += "t"+(traduccion.t-2)+" = t"+(traduccion.t-2)+" + 1;\n";
        this.etiquetaTexto += "goto L"+(traduccion.etiquetaCounter-1)+";\n";
        this.etiquetaTexto += "L"+(traduccion.etiquetaCounter)+":\n";
        this.etiquetaTexto += "printf(\"%c\", (char)60);\n";
        this.etiquetaTexto += "printf(\"%c\", (char)47);\n";
        this.etiquetaTexto += "t"+(traduccion.t-5)+" = S + 1;\n";
        this.etiquetaTexto += "t"+(traduccion.t-4) + " = stack[(int)t"+(traduccion.t-5)+"];\n";
        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "L"+(traduccion.etiquetaCounter)+":\n";
        this.etiquetaTexto += "t"+(traduccion.t-1) + " = heap[(int)t"+(traduccion.t-4)+"];\n";
        traduccion.etiquetaCounter++;
        this.etiquetaTexto += "if(t"+(traduccion.t-1)+"==-1) goto L"+traduccion.etiquetaCounter+";\n";
        this.etiquetaTexto += "printf(\"%c\", (char)t"+(traduccion.t-1)+");\n";
        this.etiquetaTexto += "t"+(traduccion.t-4)+" = t"+(traduccion.t-4)+" + 1;\n";
        this.etiquetaTexto += "goto L"+(traduccion.etiquetaCounter-1)+";\n";
        this.etiquetaTexto += "L"+(traduccion.etiquetaCounter)+":\n";
        this.etiquetaTexto += "printf(\"%c\", (char)62);\n";
        this.etiquetaTexto += "printf(\"%c\", (char)10);\n";
        this.etiquetaTexto += "return;\n";
        this.etiquetaTexto += "}\n\n";
    }

    //CREACION DEL METODO imprimir etiqueta apertura*********************
    public static crearEtiquetaApertura() {
        this.etiquetaApertura += "//Metodo Etiqueta apertura\t--------------\n";
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
        this.etiquetaApertura += "printf(\"%c\", (char)62);\t\t// >\n";   
        this.etiquetaApertura += "printf(\"%c\", (char)10);\t\t// Salto de linea\n";  
        this.etiquetaApertura += "return;\n}\n\n";
    }

    //CREACION DEL METODO imprimir etiqueta cierre*********************
    public static crearEtiquetaCierre() {
        this.etiquetaCierre += "//Metodo Etiqueta Cierre\t--------------\n";
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

    //CREACION DEL METODO imprimir etiqueta Unitaria*********************
    public static crearEtiquetaUnitaria() {
        this.etiquetaUnitaria += "//Metodo Etiqueta Unitaria\t--------------\n";
        this.etiquetaUnitaria += "void crearEtiquetaUnitaria() {\n"
        traduccion.t++;
        this.etiquetaUnitaria += "t"+traduccion.t+" = S + 1;\n";
        traduccion.t++;
        this.etiquetaUnitaria += "t"+traduccion.t+" = stack[(int)t"+(traduccion.t-1)+"];\n"
        this.etiquetaUnitaria += "printf(\"%c\", (char)60);\t\t// <\n";
        this.etiquetaCounter++;
        this.etiquetaUnitaria += "L"+this.etiquetaCounter+":\n";
        traduccion.t++;
        this.etiquetaUnitaria += "t"+traduccion.t+" = heap[(int)t"+(traduccion.t-1)+"];\n";
        this.etiquetaCounter++;
        this.etiquetaUnitaria += "if(t"+traduccion.t+"==-1) goto L"+this.etiquetaCounter+";\n";
        this.etiquetaUnitaria += "printf(\"%c\", (char)t"+(traduccion.t)+");\n";
        this.etiquetaUnitaria += "t"+(traduccion.t-1)+" = t" + (traduccion.t-1) + " + 1;\n";
        this.etiquetaUnitaria += "goto L"+(this.etiquetaCounter-1)+";\n";
        this.etiquetaUnitaria += "L"+this.etiquetaCounter+":\n";
        this.etiquetaUnitaria += "printf(\"%c\", (char)47);\t\t// /\n"; 
        this.etiquetaUnitaria += "printf(\"%c\", (char)62);\t\t// >\n";   
        this.etiquetaUnitaria += "printf(\"%c\", (char)10);\t\t// Salto de linea\n";  
        this.etiquetaUnitaria += "return;\n}\n\n";
    }
}