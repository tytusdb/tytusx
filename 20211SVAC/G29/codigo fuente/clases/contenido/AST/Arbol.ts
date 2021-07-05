import {Nodo} from './Nodo';
import {Errror} from './Errror';
import {Tabla} from './Tabla';

class Arbol{

    instrucciones: Array<Nodo>;// Lista de instrucciones globales
    errores: Array<Errror>;// lissta de errores lexIcos, sintacticos ysemanticos
    consola: Array<String>;// consola de resultado
    reportes: Array<string>;// reporte de ts (guarda una lsita de tablas en html)
    contador_tmp: number;
    cont_etiqueta: number;
    contador_p: number;
    contador_h: number;
    contenido: string;
    cabecera: string;
    etiquetas_fin: Array<string>;
    etiquetas_return: Array<string>;
    tmp_return: Array<string>;

    return_principal :string;
    constructor(instrucciones: Array<Nodo>, errores: Array<Errror>) {// inizializacion de attributos
        this.instrucciones = instrucciones;
        this.errores = errores;
        this.consola = new Array<String>();
        this.reportes = new Array<string>();
        this.etiquetas_fin = [];
        this.etiquetas_return = [];
        this.tmp_return = [];
        this.contador_tmp = 9;
        this.contador_p  = 0;
        this.cont_etiqueta = 11;
        this.contenido = "";
        this.return_principal = "";
        this.cabecera = "#include <stdio.h> //Importar para el uso de Printf\n" +
                        "double heap[1638400]; //Estructura para heap\n" +
                        "double stack[1639400]; //Estructura para stack\n" +
                        "char chars_aux[100]; //Estructura para concatenacion de numeros\n" +
                        "double p = 4; //Puntero P\n" +
                        "double h; //Puntero H\n" +
                        "void potencia();\n" +
                        "void guardar_cadena();\n" +
                        "void unir_cadena();\n" +
                        "void convertir_numero();\n" +
                        "void imprimir_cadena();\n" +
                        "void length_expresion();\n" +
                        "void to_upper_case();\n" +
                        "void to_lower_case();\n" +
                        "void char_at();\n" +
                        "void comparar_cadena();\n";
    }
    generar_temporales(){
        let j = 0;
        if(this.contador_tmp > 0){
            this.cabecera += "double ";
        }
        for(let i = 1; i <= this.contador_tmp; i++){
            this.cabecera += "t" + i;
            if(i == this.contador_tmp){
                this.cabecera += ";";
                j++;
            }else if(j < 10){
                this.cabecera += ", ";
                j++;
            }else{
                this.cabecera += ";\ndouble ";
                j = 0;

            }
        }
    }
    generar_nativas():string{
        let nativas = "";
        nativas += "\n\nvoid potencia(){" +
                    "\n\tt3 = 1;" +
                    "\n\tgoto L1;" +
                    "\n\tL1:" +
                    "\n\t\tif(t2 > 0) goto L2;" +
                    "\n\t\tgoto L3;"+
                    "\n\tL2:"+
                    "\n\t\tt3 = t3 * t1;"+
                    "\n\t\tt2 = t2- 1;"+
                    "\n\t\tgoto L1;"+
                    "\n\tL3:"+
                    "\n\t\treturn;\n}";

        nativas += "\n\nvoid guardar_cadena(){" +
                    "\n\theap[(int)h] = t1;" +
                    "\n\th = h + 1;" +
                    "\n\treturn;\n}";

        nativas +=  "\n\nvoid unir_cadena(){" +
                    "\n\tL0:" +
                    "\n\t\tt2 = heap[(int) t1];" +
                    "\n\t\tif(t2 != -1) goto L1;"+
                    "\n\t\tgoto L2;" +
                    "\n\tL1:" +
                    "\n\t\theap[(int)h] = t2;" +
                    "\n\t\th = h + 1;" +
                    "\n\t\tt1 = t1 + 1;" +
                    "\n\t\tgoto L0;" +
                    "\n\tL2: " +
                    "\n\t\treturn;\n}";

        nativas +=  "\n\nvoid convertir_numero(){" +
                    "\n\tsnprintf(chars_aux, 100, \"%f\", t3);" +
                    "\n\tt4 = 0;" +
                    "\n\tt7 = 0;" +
                    "\n\tL0:" +
                    "\n\t\tt5 = chars_aux[(int)t4];" +
                    "\n\t\tif(t5 == 0) goto L1;" +
                    "\n\t\tif(t5 == 46) goto L2;" +
                    "\n\t\tt1 = t5;" +
                    "\n\t\tguardar_cadena();" +
                    "\n\t\tt4 = t4 + 1;" +
                    "\n\t\tt7 = t7 + 1;" +
                    "\n\t\tgoto L0;" +
                    "\n\tL2:" +
                    "\n\t\tt6 = t4;" +
                    "\n\tL3:" +
                    "\n\t\tt4 = t4 + 1;" +
                    "\n\t\tt5 = chars_aux[(int)t4];" +
                    "\n\t\tif(t5 == 48)goto L3;" +
                    "\n\t\tif(t5 == 0)goto L4;" +
                    "\n\t\tgoto L2;" +
                    "\n\tL4:" +
                    "\n\t\tif(t6 > t7)goto L5;" +
                    "\n\t\tgoto L1;" +
                    "\n\tL5:" +
                    "\n\t\tt5 = chars_aux[(int)t7];" +
                    "\n\t\tt1 = h;" +
                    "\n\t\tt2 = t5;" +
                    "\n\t\tguardar_cadena();" +
                    "\n\t\tt7 = t7 + 1;" +
                    "\n\t\tif(t6 < t7)goto L1;" +
                    "\n\t\tif(t6 >= t7)goto L5;" +
                    "\n\tL1:" +
                    "\n\t\treturn;" +
                    "\n}";

            nativas +=  "\nvoid imprimir_cadena(){" +
                        "\n\tgoto L0;" +
                        "\n\tL0:" +
                        "\n\t\tt2 = heap[(int)t1];" +
                        "\n\t\tif(t2 != -1)goto L1;" +
                        "\n\t\tgoto L2;" +
                        "\n\tL1:" +
                        "\n\t\tif(t2 == -2)goto L3;" +
                        "\n\t\tif(t2 == -3)goto L4;" +
                        "\n\t\tprintf(\"%c\",(int)t2);" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tgoto L0;" +
                        "\n\tL3:" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tt2 = heap[(int)t1];" +
                        "\n\t\tprintf(\"%f\", t2);" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tgoto L0;" +
                        "\n\tL4:" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tt2=heap[(int)t1];" +
                        "\n\t\tif(t2 == 1) goto L5;" +
                        "\n\t\tgoto L6;" +
                        "\n\tL5:" +
                        "\n\t\tprintf(\"true\");" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tgoto L0;" +
                        "\n\tL6:" +
                        "\n\t\tprintf(\"false\");" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tgoto L0;" +
                        "\n\tL2:" +
                        "\n\t\treturn;" +
                        "\n}";
            nativas += "\nvoid comparar_cadena(){"+
                        "\n\tL0:" +
                        "\n\t\tt3 = heap[(int)t1];" +
                        "\n\t\tt4 = heap[(int)t2];" +
                        "\n\t\tif(t3 != t4) goto L2;" +
                        "\n\t\tif(t3 == -1) goto L3;" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tt2 = t2 + 1;" +
                        "\n\t\tgoto L0;" +
                        "\n\tL2:" +
                        "\n\t\tt5 = 0;" +
                        "\n\t\tgoto L5;" +
                        "\n\tL3:" +
                        "\n\t\tt5 = 1;" +
                        "\n\tL5:\n\t\treturn;\n}"

            nativas += "\nvoid length_expresion(){" +
                        "\n\tt5 = 0;" +
                        "\n\tL1:" +
                        "\n\t\tt2 = heap[(int)t1];" +
                        "\n\t\tif(t2 != -1) goto L2;" +
                        "\n\t\tgoto L3;" +
                        "\n\tL2:" +
                        "\n\t\tif(t2 == -2) goto L4;" +
                        "\n\t\tif(t2 == -3) goto L4;" +
                        "\n\t\tt5 = t5 + 1;" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tgoto L1;" +
                        "\n\tL4:" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tt2 = heap[(int)t1];" +
                        "\n\t\tif(t2 < 0)goto L5;" +
                        "\n\t\tt5 = t5 + 1;" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tgoto L2;" +
                        "\n\tL5:" +
                        "\n\t\tt5 = t5 + 2;" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tgoto L1;" +
                        "\n\tL3:" +
                        "\n\t\treturn;\n}";

            nativas +=  "\nvoid to_upper_case(){" +
                        "\n\tL1:" +
                        "\n\t\tt2=heap[(int)t1];" +
                        "\n\t\tif(t2 != -1) goto L2;" +
                        "\n\t\tgoto L3;" +
                        "\n\tL2:" +
                        "\n\t\tif(t2 < 123)goto L4;" +
                        "\n\t\tgoto L11;" +
                        "\n\tL4:" +
                        "\n\t\tif(t2 > 96)goto L5;" +
                        "\n\t\tgoto L11;" +
                        "\n\tL5:" +
                        "\n\t\tt3 = t2 - 32;" +
                        "\n\t\theap[(int)t1] = t3;" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tgoto L1;" +
                        "\n\tL11:" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tgoto L1;" +
                        "\n\tL3:" +
                        "\n\t\treturn;\n}";

            nativas +=  "\nvoid to_lower_case(){" +
                        "\n\tL1:" +
                        "\n\t\tt2=heap[(int)t1];" +
                        "\n\t\tif(t2 != -1) goto L2;" +
                        "\n\t\tgoto L3;" +
                        "\n\tL2:" +
                        "\n\t\tif(t2 < 91)goto L4;" +
                        "\n\t\tgoto L11;" +
                        "\n\tL4:" +
                        "\n\t\tif(t2 > 64)goto L5;" +
                        "\n\t\tgoto L11;" +
                        "\n\tL5:" +
                        "\n\t\tt3 = t2 + 32;" +
                        "\n\t\theap[(int)t1] = t3;" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tgoto L1;" +
                        "\n\tL11:" +
                        "\n\t\tt1 = t1 + 1;" +
                        "\n\t\tgoto L1;" +
                        "\n\tL3:" +
                        "\n\t\treturn;\n}";

            nativas += "void char_at(){" +
                "\n\tt6=0;" +
                "\n\tt5=-1;" +
                "\n\tL1:" +
                "\n\t\tt2=heap[(int)t1];" +
                "\n\t\tif(t2 != -1) goto L2;" +
                "\n\t\tgoto L3;" +
                "\n\tL2:" +
                "\n\t\tif(t2 == -2) goto L4;" +
                "\n\t\tif(t2 == -3) goto L4;" +
                "\n\t\tt5 = t5 + 1;" +
                "\n\t\tt1 = t1 + 1;" +
                "\n\t\tif(t4 == t5) goto L11;" +
                "\n\t\tgoto L1;" +
                "\n\tL4:" +
                "\n\t\tt1 = t1 + 1;" +
                "\n\t\tt2 = heap[(int)t1];" +
                "\n\t\tif(t2 < 0)goto L5;" +
                "\n\t\tt5 = t5 + 1;" +
                "\n\t\tt1 = t1 + 1;" +
                "\n\t\tgoto L1;" +
                "\n\tL5:" +
                "\n\t\tt5 = t5 + 2;" +
                "\n\t\tt1 = t1 + 1;" +
                "\n\t\tgoto L1;" +
                "\n\tL11:" +
                "\n\t\tt6 = 1;" +
                "\n\tL3:" +
                "\n\t\treturn;\n}";
        return nativas;
    }
    generar_etiqueta(){
        this.cont_etiqueta++;
        return "L" + this.cont_etiqueta;
    }
    generar_temporal(){
        this.contador_tmp++;
        return "t" + this.contador_tmp;
    }
}


export {Arbol};
