"use strict";
class CodeUtil {
    constructor() {
    }
    static init() {
        this._cadSalida = "";
        this._sp = 0;
        this._hp = 0;
        this._rp = 0;
        this._temporal = 0;
        this._etiqueta = 0;
        this.initCad();
        this.generarFuncionesNativas();
    }
    static generarFuncionesNativas() {
        this.concatenarObjeto();
        this.crearLista();
        this.genEqualsFunction();
        this.genPrintstring();
        CodeUtil.print("/*************************************/");
        CodeUtil.print("");
    }
    static printWithComment(cadena, comentario) {
        CodeUtil._cadSalida += cadena + ((comentario == null) ? "" : "\t\t\t//" + comentario) + "\n";
    }
    static print(cadena) {
        CodeUtil._cadSalida += cadena + "\n";
    }
    static printComment(comentario) {
        CodeUtil._cadSalida += "//" + comentario + "\n";
    }
    static initCad() {
        this._cadSalida = "";
        this._cadSalida += "float Heap[1000000]; //estructura heap\n";
        this._cadSalida += "float Stack[1000000]; //estructura stack\n";
        this._cadSalida += "float Repository[2000000]; //estructura repository\n";
        this._cadSalida += "int SP=0;\n";
        this._cadSalida += "int HP=0;\n";
        this._cadSalida += "int RP=0;\n";
        CodeUtil.print("");
        CodeUtil.print("");
    }
    static getDefinitionTemps() {
        var cadFinal = "";
        var cad = "float ";
        for (var _i = 0; _i <= this._temporal; _i++) {
            cad += (cad == "float ") ? "" : ",";
            cad += " t" + _i;
            if (cad.length > 150) {
                cadFinal += cad + ";\n";
                cad = "float ";
            }
        }
        cad += ";";
        cadFinal += cad;
        return cadFinal;
    }
    static generarTemporal() {
        var temporal = "t" + this._temporal;
        this._temporal += 1;
        return temporal;
    }
    static generarEtiqueta() {
        var etiqueta = "L" + this._etiqueta;
        this._etiqueta += 1;
        return etiqueta;
    }
    static crearMain() {
        this.print("/**************************************");
        this.print("main():void");
        this.print("AmbitaoGlboal->stack[P]");
        this.print("**************************************/");
        CodeUtil.print("int main()");
        CodeUtil.print("{");
        CodeUtil.print(CodeUtil.METHOD_CARGARXML + ";");
        CodeUtil.print("}");
    }
    static createTemps() {
        this._cadSalida = this.getDefinitionTemps() + "\n" + this._cadSalida;
    }
    static createLibs() {
        this._cadSalida = "#include <stdio.h>\n\n" + this._cadSalida;
    }
    static finalizeCad() {
        CodeUtil.crearMain();
        CodeUtil.createTemps();
        CodeUtil.createLibs();
    }
    static genPrintstring() {
        this.print("/**************************************");
        this.print("printString(string cadena1 ):void");
        this.print("cadena1->stack[P]");
        this.print("**************************************/");
        this.print("void " + this.METHOD_PRINT_STRING);
        this.print("{");
        var temporalPosParametro1 = this.generarTemporal();
        this.printWithComment(temporalPosParametro1 + " = SP + 0 ; ", "Pos parametro 1 (Cadena1)");
        var temporalRefCadena = this.generarTemporal();
        this.printWithComment(temporalRefCadena + " = Stack[(int)" + temporalPosParametro1 + "] ; ", "Obtenemos el valor del parametro");
        var lInicio = this.generarEtiqueta();
        var lFinl = this.generarEtiqueta();
        var temporalChar1 = this.generarTemporal();
        this.printWithComment(lInicio + ":", "Etiqueta Inicio");
        this.printWithComment(temporalChar1 + " = Repository[(int)" + temporalRefCadena + "] ; ", "Caracter de la cadena.");
        this.print("if ( " + temporalChar1 + " == -1 ) goto " + lFinl + " ;");
        this.print('printf("%c",(int)' + temporalChar1 + ');');
        this.print(temporalRefCadena + " = " + temporalRefCadena + " + " + 1 + " ;");
        this.print("goto " + lInicio + " ;");
        this.printWithComment(lFinl + ":", "Etiqueta Fin");
        this.print('printf("\\n"); ');
        this.print("}");
        this.print("");
    }
    static genEqualsFunction() {
        this.print("/**************************************");
        this.print("equalString(string cadena1, string cadena2):boolean");
        this.print("cadena1->stack[P]");
        this.print("cadena2->stack[P+1]");
        this.print("return->stack[P]");
        this.print("**************************************/");
        this.print("void " + this.METHOD_EQUAL_);
        this.print("{");
        var temporalI = this.generarTemporal();
        this.printWithComment(temporalI + " = 0 ;", "Temporal i");
        var temporalIgual = this.generarTemporal();
        this.printWithComment(temporalIgual + " = 1 ;", "Temporal result ");
        var temporalPosParametro1 = this.generarTemporal();
        this.printWithComment(temporalPosParametro1 + " = SP + 0 ; ", "Pos parametro 1 (Cadena1)");
        var temporalPosParametro2 = this.generarTemporal();
        this.printWithComment(temporalPosParametro2 + " = SP + 1 ; ", "Pos parametro 2 (Cadena2)");
        var temporalChar1 = this.generarTemporal();
        var temporalChar2 = this.generarTemporal();
        var lInicio = this.generarEtiqueta();
        var lBreak = this.generarEtiqueta();
        //var lFin = this.generarEtiqueta();
        var lIfEof = this.generarEtiqueta();
        this.printWithComment(lInicio + ":", "Etiqueta Inicio");
        //this.printWithComment("if ("+temporalIgual+"!= 1 ) goto "+lFin+" ;"," Ciclo");
        this.print(temporalPosParametro1 + " = " + temporalPosParametro1 + " + " + temporalI + " ;");
        this.print(temporalPosParametro2 + " = " + temporalPosParametro2 + " + " + temporalI + " ;");
        this.printWithComment(temporalChar1 + " = Repository[(int)" + temporalPosParametro1 + "] ; ", "Caracter de la cadena 1");
        this.printWithComment(temporalChar2 + " = Repository[(int)" + temporalPosParametro2 + "] ; ", "Caracter de la cadena 2");
        this.print("if (" + temporalChar1 + " == " + temporalChar2 + " ) goto " + lIfEof + " ;");
        this.print(temporalIgual + " = 0 ;");
        this.print("goto " + lBreak + " ;");
        this.printWithComment(lIfEof + ":", "Etiqueta para validar fin de cadena");
        this.printWithComment("if (" + temporalChar1 + " == -1 ) goto " + lBreak + ";", "Si encontro -1 terminar de analizar la cadena");
        this.print(temporalI + " = " + temporalI + " + 1 ;");
        this.print("goto " + lInicio + ";");
        this.printWithComment(lBreak + ":", "Etiqueta de break;");
        //this.printWithComment(lFin+":","Etiqueta falso");
        this.printWithComment("Stack[SP] = " + temporalIgual + ";", "Retornamos el boleano si es igual o no");
        this.print("}");
        this.print("");
    }
    static crearLista() {
        this.print("/**************************************");
        this.print("crearLista():int");
        this.print("return->stack[P]");
        this.print("**************************************/");
        this.print("void crarLista()");
        this.print("{");
        var tmpReferencia = this.generarTemporal();
        this.print(tmpReferencia + " = HP ;");
        this.printWithComment("Heap[ HP ] = -1 ;", "Se inicializa el espacio del objeto");
        this.print("HP = HP + 1 ;");
        this.printWithComment("Heap[ HP ] = -1 ;", "Se inicializa el espacio de la referencia");
        this.print("HP = HP + 1 ;");
        this.print("Stack [ SP ] = " + tmpReferencia + " ;");
        this.print("}");
    }
    static concatenarObjeto() {
        this.print("/**************************************");
        this.print("concatenarObjeto(ListObjects listaObjetos, Object objetoNuevo):void");
        this.print("listaObjetos->stack[P]");
        this.print("objetoNuevo->stack[P+1]");
        this.print("**************************************/");
        this.print("void concatenarObjeto()");
        this.print("{");
        var lInicio = this.generarEtiqueta();
        var lValidarApuntador = this.generarEtiqueta();
        var lValidarSiguietntelLista = this.generarEtiqueta();
        var lFin = this.generarEtiqueta();
        this.printWithComment(lInicio + ":", "Etiqueta de incio");
        var tmpPosParametro1 = this.generarTemporal();
        this.printWithComment(tmpPosParametro1 + " = SP + 0 ;", "Posicion del parametro de la lista");
        var tmpPosParametro2 = this.generarTemporal();
        this.printWithComment(tmpPosParametro2 + " = SP + 1 ;", "Posicion del parametro del objeto");
        var tmpParametro1 = this.generarTemporal();
        this.printWithComment(tmpParametro1 + " = Stack[(int)" + tmpPosParametro1 + "];", "Se obtiene la referencia de la lista");
        var tmpParametro2 = this.generarTemporal();
        this.printWithComment(tmpParametro2 + " = Stack[(int)" + tmpPosParametro2 + "];", "Se obtiene la referencia del objeto");
        var tmpObjeto = this.generarTemporal();
        this.printComment("Valor del objeto de la lista");
        this.print(tmpObjeto + " = Heap[(int)" + tmpParametro1 + "];");
        this.printComment("Valor de la referencia de la lista");
        var tmpPosReferencia = this.generarTemporal();
        this.print(tmpPosReferencia + " = " + tmpParametro1 + " + 1 ;");
        var tmpApuntador = this.generarTemporal();
        this.print(tmpApuntador + " = Heap[(int)" + tmpPosReferencia + "];");
        this.print("if ( " + tmpObjeto + " != -1) goto " + lValidarApuntador + " ;");
        //Guardamos el objeto en la primera posicion
        this.printWithComment("Heap[(int)" + tmpParametro1 + "] = " + tmpParametro2 + " ;", "La primera casilla es nula y asignamos el objeto enviado por parametro");
        this.printWithComment("goto " + lFin + " ; ", "Salgo a etiqueta fin");
        this.print(lValidarApuntador + " : ");
        this.print("if ( " + tmpApuntador + " != -1 ) goto " + lValidarSiguietntelLista + " ;" /*,"Buscar en la sigueinte sub lista"*/);
        //Creamos nueva lista y la concatenamos a la existente
        this.printComment("Se va a crear una nueva lista.");
        this.print("SP = SP + 2 ;");
        // this.printWithComment("crearLista(); ","Llamamos funcion que crea lista");
        var tmpApuntadorNuevaLista = this.generarTemporal();
        this.printWithComment(tmpApuntadorNuevaLista + " = Stack[SP] ;", "Se recupera el return del metodo. ");
        this.print("SP = SP - 2 ;");
        this.printComment("Se inserta el objeto a la nueva lista. Se hace llamado recursivo. ");
        this.print("SP = SP + 2 ;");
        var tmpPosAntiguoPosPar1 = tmpPosParametro1;
        //var tmpPosAntiguoPosPar2 = tmpPosParametro2;
        tmpPosParametro1 = this.generarTemporal();
        this.printWithComment(tmpPosParametro1 + " = SP + 0 ;", "Posicion del parametro de la lista");
        tmpPosParametro2 = this.generarTemporal();
        this.printWithComment(tmpPosParametro2 + " = SP + 1 ;", "Posicion del parametro del objeto");
        this.printWithComment("Stack[(int)" + tmpPosParametro1 + "] = " + tmpApuntadorNuevaLista + " ;", "Se pasa la referencia de la nueva lista");
        this.printWithComment("Stack[(int)" + tmpPosParametro2 + "] = " + tmpParametro2 + " ;", "Se pasa la referencia del objeto, el mismo que se recibio por parametro");
        this.print("SP = SP - 2 ;");
        this.printComment("Asociamos la nueva lista a la lista actual");
        this.print("Heap[(int)" + tmpPosReferencia + "] = " + tmpApuntadorNuevaLista + " ;");
        this.printWithComment("goto " + lFin + " ; ", "Salgo a etiqueta fin");
        this.print(lValidarSiguietntelLista + " :");
        //Insertamos en la referencia de la siguiente lista.
        this.printComment("Se busca en el siguiente objeto enlazado");
        this.printWithComment("Stack[(int)" + tmpPosAntiguoPosPar1 + "] = " + tmpApuntador + " ;", "Se pasa la referencia del siguietne objeto de la lista");
        this.printWithComment("goto " + lInicio + " ; ", "Salgo a etiqueta incio");
        this.printWithComment(lFin + " :", "Etiqueta fin");
        this.printWithComment("return ;", "Dejo esto porque el compilador marca error si finaliza el metodo despues de la etiqueta");
        this.print("}");
        this.print("");
    }
    static imprimrObjeto() {
        this.print("/**************************************");
        this.print("concatenarObjeto(Object objetoImprimir ):void");
        this.print("objetoNuevo->stack[P]");
        this.print("**************************************/");
        this.print("void imprimirObjeto()");
        this.print("{");
        var tmpPostParametro1 = this.generarTemporal();
        this.print(tmpPostParametro1 + " = SP + 0 ;");
        var tmpParametro1 = this.generarTemporal();
        this.print(tmpParametro1 + " = Stack[(int)" + tmpPostParametro1 + "]; ");
        var tmpTipoObjeto = this.generarTemporal();
        this.print(tmpTipoObjeto + " = Heap[(int)" + tmpParametro1 + "]; ");
        this.print("}");
        this.print("");
    }
}
CodeUtil.METHOD_CARGARXML = "cargarXml()";
CodeUtil.METHOD_EQUAL_ = "equalString()";
CodeUtil.METHOD_PRINT_STRING = "printString()";
CodeUtil._cadSalida = "";
