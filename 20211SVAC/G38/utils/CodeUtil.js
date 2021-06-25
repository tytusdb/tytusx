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
        var temporalI = this.generarTemporal();
        this.printWithComment(temporalI + " = 0 ;", "Temporal i");
        var temporalPosParametro1 = this.generarTemporal();
        this.printWithComment(temporalPosParametro1 + " = SP + 0 ; ", "Pos parametro 1 (Cadena1)");
        var lInicio = this.generarEtiqueta();
        var lFinl = this.generarEtiqueta();
        var temporalChar1 = this.generarTemporal();
        this.printWithComment(lInicio + ":", "Etiqueta Inicio");
        this.print(temporalPosParametro1 + " = " + temporalPosParametro1 + " + " + temporalI + " ;");
        this.printWithComment(temporalChar1 + " = Repository[(int)" + temporalPosParametro1 + "] ; ", "Caracter de la cadena.");
        this.print("if (" + temporalChar1 + " == -1 ) goto " + lFinl + " ;");
        this.print('printf("%c",(int)' + temporalChar1 + ');');
        this.print(temporalI + " = " + temporalI + " + 1 ;");
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
}
CodeUtil.METHOD_CARGARXML = "cargarXml()";
CodeUtil.METHOD_EQUAL_ = "equalString()";
CodeUtil.METHOD_PRINT_STRING = "printString()";
CodeUtil._cadSalida = "";
