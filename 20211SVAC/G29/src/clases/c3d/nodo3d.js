export class nodo3d {
    constructor() {
        this.code = "";
        this.header = `/*------HEADER------*/
#include <stdio.h>
#include <math.h>\n
double heap[30101999];
double stack[30101999];
double S;
double H;
char x[100] = "select nodes void";
char xx[100] = "select atr void";
char xxx[100] = "exp relacional";
char nup[100] = "uppercase";
char nlow[100] = "lowercase";
char nsub[100] = "substring";
char ord[100] = "order";\n`;
        this.main = `/*------MAIN------*/
void main() {
\tS = 0; H = 0;\n`;
        this.funciones = `/*------FUNCIONES------*/\n`;
        this.t_res = 0;
        this.t = 0;
        this.s = 0;
        this.h = 0;
        this.last_stack = 0;
        this.stack = {};
        this.heap = {};
        this.temp = {};
    }
    addRoot() {
        this.stack[this.last_stack] = 0;
        this.main += `\tstack[(int)${this.last_stack}] = 0;\t\t// se agrega nodo raiz\n`;
        this.last_stack += 1;
    }
    addNodo(ent) {
        //nuevo entorno
        let simbol = ent.tabla["id"];
        this.stack[this.last_stack] = 0;
        this.main += `\n\tstack[(int)${this.last_stack}] = 0;\t\t// se agrega nodo "${ent.tabla["id"].valor}"\n`;
        simbol.stack = this.last_stack;
        this.last_stack += 1;
        //ini id
        this.main += `\t// se añade el id ${simbol.valor}\n`;
        let ini = { "id": this.generateTemp(), "val": this.h };
        this.main += `\tt${ini.id} = H;\n`;
        //se guarda caracter por caracter
        for (let i = 0; i < simbol.valor.length; i++) {
            this.heap[this.h] = simbol.valor.charCodeAt(i);
            this.main += `\theap[(int)H] = ${simbol.valor.charCodeAt(i)};\t\t//se agrega el caracter H[${this.h}] ${simbol.valor.charAt(i)}\n`;
            this.h += 1;
            this.main += `\tH = H + 1;\n`;
        }
        //se guarda el fin de la cadena
        this.heap[this.h] = -1;
        this.main += `\theap[(int)H] = -1;\t\t//se agrega el caracter eos H[${this.h}] -1\n`;
        this.h += 1;
        this.main += `\tH = H + 1;\n`;
        //se guarda la referencia al heap en el stack
        this.stack[this.last_stack] = ini.val;
        this.main += `\tstack[(int)${this.last_stack}] = t${ini.id};\t\t//se guarda la referencia al heap en el stack\n`;
        this.temp[ini.id] = ini.val;
        //fin id
        this.last_stack += 1;
    }
    addAtr(simbol) {
        //id
        this.main += `\t//se añade el atributo ${simbol.id}\n`;
        let ini = { "id": this.generateTemp(), "val": this.h };
        this.main += `\tt${ini.id} = H;\n`;
        //se guarda caracter por caracter
        let atr = simbol.id;
        for (let i = 0; i < atr.length; i++) {
            this.heap[this.h] = atr.charCodeAt(i);
            this.main += `\theap[(int)H] = ${atr.charCodeAt(i)};\t\t//se agrega el caracter H[${this.h}] ${atr.charAt(i)}\n`;
            this.h += 1;
            this.main += `\tH = H + 1;\n`;
        }
        //se guarda el fin de la cadena
        this.heap[this.h] = -1;
        this.main += `\theap[(int)H] = -1;\t\t//se agrega el caracter eos H[${this.h}] -1\n`;
        this.h += 1;
        this.main += `\tH = H + 1;\n`;
        //se guarda la referencia al heap en el stack
        this.stack[this.last_stack] = ini.val;
        this.main += `\tstack[(int)${this.last_stack}] = t${ini.id};\t\t//se guarda la referencia al heap en el stack\n`;
        simbol.stack = this.last_stack;
        this.last_stack += 1;
        this.temp[ini.id] = ini.val;
        //valor
        this.main += `\t//se añade el atributo ${simbol.id} = ${simbol.valor}\n`;
        ini = { "id": this.generateTemp(), "val": this.h };
        this.main += `\tt${ini.id} = H;\n`;
        //se guarda caracter por caracter
        atr = simbol.valor;
        for (let i = 0; i < atr.length; i++) {
            this.heap[this.h] = atr.charCodeAt(i);
            this.main += `\theap[(int)H] = ${atr.charCodeAt(i)};\t\t//se agrega el caracter H[${this.h}] ${atr.charAt(i)}\n`;
            this.h += 1;
            this.main += `\tH = H + 1;\n`;
        }
        //se guarda el fin de la cadena
        this.heap[this.h] = -1;
        this.main += `\theap[(int)H] = -1;\t\t//se agrega el caracter eos H[${this.h}] -1\n`;
        this.h += 1;
        this.main += `\tH = H + 1;\n`;
        //se guarda la referencia al heap en el stack
        this.stack[this.last_stack] = ini.val;
        this.main += `\tstack[(int)${this.last_stack}] = t${ini.id};\t\t//se guarda la referencia al heap en el stack\n`;
        this.last_stack += 1;
        this.temp[ini.id] = ini.val;
    }
    addVal(simbol) {
        this.main += `\t// se añade el valor ${simbol.id}\n`;
        let ini = { "id": this.generateTemp(), "val": this.h };
        this.main += `\tt${ini.id} = H;\n`;
        //se guarda caracter por caracter
        let atr = simbol.valor;
        for (let i = 0; i < atr.length; i++) {
            this.heap[this.h] = atr.charCodeAt(i);
            this.main += `\theap[(int)H] = ${atr.charCodeAt(i)};\t\t//se agrega el caracter H[${this.h}] ${atr.charAt(i)}\n`;
            this.h += 1;
            this.main += `\tH = H + 1;\n`;
        }
        //se guarda el fin de la cadena
        this.heap[this.h] = -1;
        this.main += `\theap[(int)H] = -1;\t\t//se agrega el caracter eos H[${this.h}] -1\n`;
        this.h += 1;
        this.main += `\tH = H + 1;\n`;
        //se guarda la referencia al heap en el stack
        this.stack[this.last_stack] = ini.val;
        this.main += `\tstack[(int)${this.last_stack}] = t${ini.id};\t\t//se guarda la referencia al heap en el stack\n`;
        simbol.stack = this.last_stack;
        this.last_stack += 1;
        this.temp[ini.id] = ini.val;
    }
    endCode() {
        //xpath
        this.matchID();
        this.matchAtr();
        this.matchAncestor();
        this.matchChild();
        this.matchSelf();
        this.matchFollowing();
        this.matchPreceding();
        this.expInt();
        this.expRel1();
        this.expRel2();
        /*this.printResult()
        this.addPrint()*/
        this.StrCode();
        this.AtrCode();
        this.ValCode();
        this.ValCode2();
        //xquery
        this.upperCase();
        this.lowerCase();
        this.subString();
        this.order();
        //this.TagFinCode()
        this.declareTemps();
        this.code = this.header;
        this.code += this.funciones;
        this.code += this.main;
        this.code += '\treturn;\n}';
    }
    generateTemp() {
        let temporal = this.t;
        this.temp[this.t] = -1;
        this.t += 1;
        return temporal;
    }
    declareTemps() {
        let temps = `double`;
        for (let key in this.temp) {
            temps += ` t${key},`;
        }
        temps = temps.slice(0, temps.length - 1);
        temps += ";\n";
        this.header += temps;
    }
    printResult() {
        this.main += `\t/* ini print consulta */\n`;
        //resultado de la consulta
        let res = { "id": this.t_res, "val": this.temp[this.t_res] };
        this.main += `\tt${res.id} = ${this.temp[this.t_res]};\t\t//resultado\n`;
        //ultimo stack disponible
        let last = { "id": this.generateTemp(), "val": this.s + this.last_stack };
        this.main += `\tt${last.id} = S + ${this.last_stack};\t\t//ultimo stack disponible = return\n`;
        //siguiente stack parametro
        let param = { "id": this.generateTemp(), "val": last.val + 1 };
        this.main += `\tt${param.id} = t${last.id} + 1;\t\t//siguiente stack param\n`;
        //asignacion siguiente stack = resultado consulta
        this.stack[param.val] = this.stack[res.val];
        this.main += `\tstack[(int)t${param.id}] = stack[(int)t${res.id}];\t\t//en el ultimo resultado[1]\n`;
        console.log(param.val + "-" + res.val);
        console.log(this.stack[param.val] + "=" + this.stack[res.val]);
        //this.main += `printf("%c", (char)80);printf("%f",(double)t${param.id});printf("%c", (char)82);printf("%f",(double)t${res.id});printf("%c", (char)10);\n`
        this.s = this.s + this.last_stack;
        this.main += `\tS = S + ${this.last_stack};\t\t//cambio de entorno\n`;
        this.main += `\tprintResult();\n`; //llamada()
        //retorno de print
        /*let ret = { "id": this.generateTemp(), "val": this.stack[this.s] }
        this.main += `\tt${ret.id} = stack[(int)S];\t\t//resultado\n`*/
        this.s = this.s - this.last_stack;
        this.main += `\tS = S - ${this.last_stack};\t\t//regreso de entorno\n`;
        this.main += `\tprintf("%c", (char)10);\t\t//salto de linea\n`;
        this.main += `\t/* fin print consulta */\n`;
    }
    addPrint() {
        this.funciones += `void printResult(){\n`;
        this.funciones += `\tprintf("%s",xx);printf("%c",(char)10);\n`;
        //declaracion
        let l22 = { "id": this.generateTemp(), "val": -1 }; //ref
        let l23 = { "id": this.generateTemp(), "val": -1 }; //ref_s
        let l24 = { "id": this.generateTemp(), "val": -1 }; //ref_h
        let l25 = { "id": this.generateTemp(), "val": -1 }; //val
        let l26 = { "id": this.generateTemp(), "val": -1 };
        let l27 = { "id": this.generateTemp(), "val": -1 };
        //asignacion de valores
        this.funciones += `\tt${l22.id} = S + 1;\t\t//\n`;
        this.funciones += `\tt${l23.id} = stack[(int)t${l22.id}];\t\t//\n`;
        this.funciones += `\tt${l24.id} = heap[(int)t${l23.id}];\t\t//\n`;
        this.funciones += `\tt${l25.id} = heap[(int)t${l24.id}];\t\t//\n`;
        this.funciones += `\tt${l26.id} = stack[(int)t${l23.id}];\t\t//\n`;
        this.funciones += `\tt${l27.id} = heap[(int)t${l26.id}];\t\t//\n`;
        this.funciones += `\tprintf("%c",(char)82);printf("%f",(double)t${l22.id});\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l23.id});\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l24.id});\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l25.id});printf("%c",(char)10);\n`;
        //loops
        this.funciones += `\tLnodo:\t\t//\n`;
        this.funciones += `\tif (t${l24.id} == -1) goto Lfin2;\t\t//\n`;
        this.funciones += `\tLid:\t\t//\n`;
        this.funciones += `\tif (t${l25.id} == -1) goto Lfin1;\t\t//\n`;
        this.funciones += `\tprintf("%c",(char)t${l25.id});\t\t//\n`;
        this.funciones += `\tt${l24.id} = t${l24.id} + 1;\t\t//\n`;
        this.funciones += `\tt${l25.id} = heap[(int)t${l24.id}];\t\t//\n`;
        this.funciones += `\tgoto Lid;\t\t//\n`;
        this.funciones += `\tLfin1:\t\t//\n`;
        this.funciones += `\tprintf("%c",(char)10);\n`;
        this.funciones += `\tt${l23.id} = t${l23.id} + 1;\t\t//\n`;
        this.funciones += `\tt${l24.id} = heap[(int)t${l23.id}];\t\t//\n`;
        this.funciones += `\tt${l25.id} = heap[(int)t${l24.id}];\t\t//\n`;
        this.funciones += `\tgoto Lnodo;\t\t//\n`;
        this.funciones += `\tLfin2:\t\t//\n`;
        this.funciones += `\tprintf("%s",xx);printf("%c",(char)10);\n`;
        this.funciones += `\treturn;\n}\n`;
    }
    matchID() {
        this.funciones += `void matchId(){\n`;
        this.funciones += `\tprintf("%s",x);printf("%c",(char)10);\n`;
        let l10 = { "id": this.generateTemp(), "val": -1 };
        let l11 = { "id": this.generateTemp(), "val": -1 };
        let l12 = { "id": this.generateTemp(), "val": -1 };
        let l13 = { "id": this.generateTemp(), "val": -1 };
        let l14 = { "id": this.generateTemp(), "val": -1 };
        let l15 = { "id": this.generateTemp(), "val": -1 };
        let l16 = { "id": this.generateTemp(), "val": -1 };
        //param
        this.funciones += `\tt${l10.id} = S + 1;\t\t//parametro a buscar\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l10.id});`;
        this.funciones += `\tt${l11.id} = stack[(int)t${l10.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l11.id});`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l12.id});printf("%c",(char)10);`;
        //id
        this.funciones += `\tt${l13.id} = S + 2;\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l13.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l13.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l15.id});printf("%c",(char)10);`;
        this.funciones += `\tt${l16.id} = t${l14.id};\t\t//ref 1er char id\n`;
        //comparacion *
        this.funciones += `\tif (t${l12.id} == 42) goto Lacept;\t\t//si es * acepta\n`;
        //validacion cadena
        this.funciones += `\tLverify:\t\t//validacion de cadena\n`;
        this.funciones += `\tif (t${l12.id} == t${l15.id}) goto Llast;\t\t//iguales, verifica eos\n`;
        //no match
        this.funciones += `\tgoto Lfin;\t\t//no hay match fin\n`;
        //validacion -1
        this.funciones += `\tLlast:\t\t//verifica eos\n`;
        this.funciones += `\tif (t${l12.id} == -1) goto Lacept;\t\t//fin de la cadena acept\n`;
        this.funciones += `\tt${l11.id} = t${l11.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l14.id} = t${l14.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tgoto Lverify;\t\t//no es eof, vuelve a verify\n`;
        //aceptacion
        this.funciones += `\tLacept:\t\t//aceptacion de la cadena\n`;
        this.funciones += `\tprintf("%c",(char)77);printf("%f",(double)H);printf("%c",(char)32);printf("%f",(double)t${l16.id});printf("%c",(char)10);\n`;
        this.funciones += `\theap[(int)H] = t${l16.id} - 1;\t\t//posicion heap del id match\n`;
        this.funciones += `\tH = H + 1;\t\t//espacio para siguiente valor\n`;
        //fin
        this.funciones += `\tLfin:\t\t//fin de la etiqueta\n`;
        this.funciones += `\tprintf("%s",x);printf("%c",(char)10);\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
    matchAtr() {
        this.funciones += `void matchAtr(){\n`;
        this.funciones += `\tprintf("%s",xx);printf("%c",(char)10);\n`;
        let l10 = { "id": this.generateTemp(), "val": -1 };
        let l11 = { "id": this.generateTemp(), "val": -1 };
        let l12 = { "id": this.generateTemp(), "val": -1 };
        let l13 = { "id": this.generateTemp(), "val": -1 };
        let l14 = { "id": this.generateTemp(), "val": -1 };
        let l15 = { "id": this.generateTemp(), "val": -1 };
        let l16 = { "id": this.generateTemp(), "val": -1 };
        let l17 = { "id": this.generateTemp(), "val": -1 };
        let l18 = { "id": this.generateTemp(), "val": -1 };
        //param
        this.funciones += `\tt${l10.id} = S + 1;\t\t//parametro a buscar\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l10.id});`;
        this.funciones += `\tt${l11.id} = stack[(int)t${l10.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l11.id});`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l12.id});printf("%c",(char)10);`;
        //param
        this.funciones += `\tt${l13.id} = S + 2;\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l13.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l13.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l15.id});printf("%c",(char)10);`;
        this.funciones += `\tt${l16.id} = t${l14.id};\t\t//ref 1er char id\n`;
        //id
        this.funciones += `\tt${l17.id} = S + 3;\t\t//id existente\n`;
        this.funciones += `\tt${l18.id} = stack[(int)t${l17.id}];\t\t//stack nodo\n`;
        //comparacion *
        this.funciones += `\tif (t${l12.id} == 42) goto Lacept;\t\t//si es * acepta\n`;
        //validacion cadena
        this.funciones += `\tLverify:\t\t//validacion de cadena\n`;
        this.funciones += `\tprintf("%c",(char)t${l15.id});\n`;
        this.funciones += `\tif (t${l12.id} == t${l15.id}) goto Llast;\t\t//iguales, verifica eos\n`;
        //no match
        this.funciones += `\tgoto Lfin;\t\t//no hay match fin\n`;
        //validacion -1
        this.funciones += `\tLlast:\t\t//verifica eos\n`;
        this.funciones += `\tif (t${l12.id} == -1) goto Lacept;\t\t//fin de la cadena acept\n`;
        this.funciones += `\tt${l11.id} = t${l11.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l14.id} = t${l14.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tgoto Lverify;\t\t//no es eof, vuelve a verify\n`;
        //aceptacion
        this.funciones += `\tLacept:\t\t//aceptacion de la cadena\n`;
        this.funciones += `\tprintf("%c",(char)77);printf("%f",(double)H);printf("%c",(char)32);printf("%f",(double)t${l16.id});printf("%c",(char)10);\n`;
        this.funciones += `\theap[(int)H] = t${l17.id};\t\t//posicion heap del id match\n`;
        this.funciones += `\tH = H + 1;\t\t//espacio para siguiente valor\n`;
        //fin
        this.funciones += `\tLfin:\t\t//fin de la etiqueta\n`;
        this.funciones += `\tprintf("%s",xx);printf("%c",(char)10);\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
    matchAncestor() {
        this.funciones += `void matchAncestor(){\n`;
        this.funciones += `\tprintf("%s",x);printf("%c",(char)10);\n`;
        let l10 = { "id": this.generateTemp(), "val": -1 };
        let l11 = { "id": this.generateTemp(), "val": -1 };
        let l12 = { "id": this.generateTemp(), "val": -1 };
        let l13 = { "id": this.generateTemp(), "val": -1 };
        let l14 = { "id": this.generateTemp(), "val": -1 };
        let l15 = { "id": this.generateTemp(), "val": -1 };
        let l16 = { "id": this.generateTemp(), "val": -1 };
        //param
        this.funciones += `\tt${l10.id} = S + 1;\t\t//parametro a buscar\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l10.id});`;
        this.funciones += `\tt${l11.id} = stack[(int)t${l10.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l11.id});`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l12.id});printf("%c",(char)10);`;
        //id
        this.funciones += `\tt${l13.id} = S + 2;\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l13.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l13.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l15.id});printf("%c",(char)10);`;
        this.funciones += `\tt${l16.id} = t${l14.id};\t\t//ref 1er char id\n`;
        //comparacion *
        this.funciones += `\tif (t${l12.id} == 42) goto Lacept;\t\t//si es * acepta\n`;
        //validacion cadena
        this.funciones += `\tLverify:\t\t//validacion de cadena\n`;
        this.funciones += `\tif (t${l12.id} == t${l15.id}) goto Llast;\t\t//iguales, verifica eos\n`;
        //no match
        this.funciones += `\tgoto Lfin;\t\t//no hay match fin\n`;
        //validacion -1
        this.funciones += `\tLlast:\t\t//verifica eos\n`;
        this.funciones += `\tif (t${l12.id} == -1) goto Lacept;\t\t//fin de la cadena acept\n`;
        this.funciones += `\tt${l11.id} = t${l11.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l14.id} = t${l14.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tgoto Lverify;\t\t//no es eof, vuelve a verify\n`;
        //aceptacion
        this.funciones += `\tLacept:\t\t//aceptacion de la cadena\n`;
        this.funciones += `\tprintf("%c",(char)77);printf("%f",(double)H);printf("%c",(char)32);printf("%f",(double)t${l16.id});printf("%c",(char)10);\n`;
        this.funciones += `\theap[(int)H] = t${l16.id} - 1;\t\t//posicion heap del id match\n`;
        this.funciones += `\tH = H + 1;\t\t//espacio para siguiente valor\n`;
        //fin
        this.funciones += `\tLfin:\t\t//fin de la etiqueta\n`;
        this.funciones += `\tprintf("%s",x);printf("%c",(char)10);\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
    matchChild() {
        this.funciones += `void matchChild(){\n`;
        this.funciones += `\tprintf("%s",x);printf("%c",(char)10);\n`;
        let l10 = { "id": this.generateTemp(), "val": -1 };
        let l11 = { "id": this.generateTemp(), "val": -1 };
        let l12 = { "id": this.generateTemp(), "val": -1 };
        let l13 = { "id": this.generateTemp(), "val": -1 };
        let l14 = { "id": this.generateTemp(), "val": -1 };
        let l15 = { "id": this.generateTemp(), "val": -1 };
        let l16 = { "id": this.generateTemp(), "val": -1 };
        //param
        this.funciones += `\tt${l10.id} = S + 1;\t\t//parametro a buscar\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l10.id});`;
        this.funciones += `\tt${l11.id} = stack[(int)t${l10.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l11.id});`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l12.id});printf("%c",(char)10);`;
        //id
        this.funciones += `\tt${l13.id} = S + 2;\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l13.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l13.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l15.id});printf("%c",(char)10);`;
        this.funciones += `\tt${l16.id} = t${l14.id};\t\t//ref 1er char id\n`;
        //comparacion *
        this.funciones += `\tif (t${l12.id} == 42) goto Lacept;\t\t//si es * acepta\n`;
        //validacion cadena
        this.funciones += `\tLverify:\t\t//validacion de cadena\n`;
        this.funciones += `\tif (t${l12.id} == t${l15.id}) goto Llast;\t\t//iguales, verifica eos\n`;
        //no match
        this.funciones += `\tgoto Lfin;\t\t//no hay match fin\n`;
        //validacion -1
        this.funciones += `\tLlast:\t\t//verifica eos\n`;
        this.funciones += `\tif (t${l12.id} == -1) goto Lacept;\t\t//fin de la cadena acept\n`;
        this.funciones += `\tt${l11.id} = t${l11.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l14.id} = t${l14.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tgoto Lverify;\t\t//no es eof, vuelve a verify\n`;
        //aceptacion
        this.funciones += `\tLacept:\t\t//aceptacion de la cadena\n`;
        this.funciones += `\tprintf("%c",(char)77);printf("%f",(double)H);printf("%c",(char)32);printf("%f",(double)t${l16.id});printf("%c",(char)10);\n`;
        this.funciones += `\theap[(int)H] = t${l16.id} - 1;\t\t//posicion heap del id match\n`;
        this.funciones += `\tH = H + 1;\t\t//espacio para siguiente valor\n`;
        //fin
        this.funciones += `\tLfin:\t\t//fin de la etiqueta\n`;
        this.funciones += `\tprintf("%s",x);printf("%c",(char)10);\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
    matchSelf() {
        this.funciones += `void matchSelf(){\n`;
        this.funciones += `\tprintf("%s",x);printf("%c",(char)10);\n`;
        let l10 = { "id": this.generateTemp(), "val": -1 };
        let l11 = { "id": this.generateTemp(), "val": -1 };
        let l12 = { "id": this.generateTemp(), "val": -1 };
        let l13 = { "id": this.generateTemp(), "val": -1 };
        let l14 = { "id": this.generateTemp(), "val": -1 };
        let l15 = { "id": this.generateTemp(), "val": -1 };
        let l16 = { "id": this.generateTemp(), "val": -1 };
        //param
        this.funciones += `\tt${l10.id} = S + 1;\t\t//parametro a buscar\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l10.id});`;
        this.funciones += `\tt${l11.id} = stack[(int)t${l10.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l11.id});`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l12.id});printf("%c",(char)10);`;
        //id
        this.funciones += `\tt${l13.id} = S + 2;\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l13.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l13.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l15.id});printf("%c",(char)10);`;
        this.funciones += `\tt${l16.id} = t${l14.id};\t\t//ref 1er char id\n`;
        //comparacion *
        this.funciones += `\tif (t${l12.id} == 42) goto Lacept;\t\t//si es * acepta\n`;
        //validacion cadena
        this.funciones += `\tLverify:\t\t//validacion de cadena\n`;
        this.funciones += `\tif (t${l12.id} == t${l15.id}) goto Llast;\t\t//iguales, verifica eos\n`;
        //no match
        this.funciones += `\tgoto Lfin;\t\t//no hay match fin\n`;
        //validacion -1
        this.funciones += `\tLlast:\t\t//verifica eos\n`;
        this.funciones += `\tif (t${l12.id} == -1) goto Lacept;\t\t//fin de la cadena acept\n`;
        this.funciones += `\tt${l11.id} = t${l11.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l14.id} = t${l14.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tgoto Lverify;\t\t//no es eof, vuelve a verify\n`;
        //aceptacion
        this.funciones += `\tLacept:\t\t//aceptacion de la cadena\n`;
        this.funciones += `\tprintf("%c",(char)77);printf("%f",(double)H);printf("%c",(char)32);printf("%f",(double)t${l16.id});printf("%c",(char)10);\n`;
        this.funciones += `\theap[(int)H] = t${l16.id} - 1;\t\t//posicion heap del id match\n`;
        this.funciones += `\tH = H + 1;\t\t//espacio para siguiente valor\n`;
        //fin
        this.funciones += `\tLfin:\t\t//fin de la etiqueta\n`;
        this.funciones += `\tprintf("%s",x);printf("%c",(char)10);\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
    matchFollowing() {
        this.funciones += `void matchFollowing(){\n`;
        this.funciones += `\tprintf("%s",x);printf("%c",(char)10);\n`;
        let l10 = { "id": this.generateTemp(), "val": -1 };
        let l11 = { "id": this.generateTemp(), "val": -1 };
        let l12 = { "id": this.generateTemp(), "val": -1 };
        let l13 = { "id": this.generateTemp(), "val": -1 };
        let l14 = { "id": this.generateTemp(), "val": -1 };
        let l15 = { "id": this.generateTemp(), "val": -1 };
        let l16 = { "id": this.generateTemp(), "val": -1 };
        //param
        this.funciones += `\tt${l10.id} = S + 1;\t\t//parametro a buscar\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l10.id});`;
        this.funciones += `\tt${l11.id} = stack[(int)t${l10.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l11.id});`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l12.id});printf("%c",(char)10);`;
        //id
        this.funciones += `\tt${l13.id} = S + 2;\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l13.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l13.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l15.id});printf("%c",(char)10);`;
        this.funciones += `\tt${l16.id} = t${l14.id};\t\t//ref 1er char id\n`;
        //comparacion *
        this.funciones += `\tif (t${l12.id} == 42) goto Lacept;\t\t//si es * acepta\n`;
        //validacion cadena
        this.funciones += `\tLverify:\t\t//validacion de cadena\n`;
        this.funciones += `\tif (t${l12.id} == t${l15.id}) goto Llast;\t\t//iguales, verifica eos\n`;
        //no match
        this.funciones += `\tgoto Lfin;\t\t//no hay match fin\n`;
        //validacion -1
        this.funciones += `\tLlast:\t\t//verifica eos\n`;
        this.funciones += `\tif (t${l12.id} == -1) goto Lacept;\t\t//fin de la cadena acept\n`;
        this.funciones += `\tt${l11.id} = t${l11.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l14.id} = t${l14.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tgoto Lverify;\t\t//no es eof, vuelve a verify\n`;
        //aceptacion
        this.funciones += `\tLacept:\t\t//aceptacion de la cadena\n`;
        this.funciones += `\tprintf("%c",(char)77);printf("%f",(double)H);printf("%c",(char)32);printf("%f",(double)t${l16.id});printf("%c",(char)10);\n`;
        this.funciones += `\theap[(int)H] = t${l16.id} - 1;\t\t//posicion heap del id match\n`;
        this.funciones += `\tH = H + 1;\t\t//espacio para siguiente valor\n`;
        //fin
        this.funciones += `\tLfin:\t\t//fin de la etiqueta\n`;
        this.funciones += `\tprintf("%s",x);printf("%c",(char)10);\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
    matchPreceding() {
        this.funciones += `void matchPreceding(){\n`;
        this.funciones += `\tprintf("%s",x);printf("%c",(char)10);\n`;
        let l10 = { "id": this.generateTemp(), "val": -1 };
        let l11 = { "id": this.generateTemp(), "val": -1 };
        let l12 = { "id": this.generateTemp(), "val": -1 };
        let l13 = { "id": this.generateTemp(), "val": -1 };
        let l14 = { "id": this.generateTemp(), "val": -1 };
        let l15 = { "id": this.generateTemp(), "val": -1 };
        let l16 = { "id": this.generateTemp(), "val": -1 };
        //param
        this.funciones += `\tt${l10.id} = S + 1;\t\t//parametro a buscar\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l10.id});`;
        this.funciones += `\tt${l11.id} = stack[(int)t${l10.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l11.id});`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//param 1er char\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l12.id});printf("%c",(char)10);`;
        //id
        this.funciones += `\tt${l13.id} = S + 2;\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l13.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l13.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l14.id} = stack[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${l14.id});`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//id existente\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${l15.id});printf("%c",(char)10);`;
        this.funciones += `\tt${l16.id} = t${l14.id};\t\t//ref 1er char id\n`;
        //comparacion *
        this.funciones += `\tif (t${l12.id} == 42) goto Lacept;\t\t//si es * acepta\n`;
        //validacion cadena
        this.funciones += `\tLverify:\t\t//validacion de cadena\n`;
        this.funciones += `\tif (t${l12.id} == t${l15.id}) goto Llast;\t\t//iguales, verifica eos\n`;
        //no match
        this.funciones += `\tgoto Lfin;\t\t//no hay match fin\n`;
        //validacion -1
        this.funciones += `\tLlast:\t\t//verifica eos\n`;
        this.funciones += `\tif (t${l12.id} == -1) goto Lacept;\t\t//fin de la cadena acept\n`;
        this.funciones += `\tt${l11.id} = t${l11.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l14.id} = t${l14.id} + 1;\t\t//siguiente posicion\n`;
        this.funciones += `\tt${l12.id} = heap[(int)t${l11.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tt${l15.id} = heap[(int)t${l14.id}];\t\t//siguiente caracter\n`;
        this.funciones += `\tgoto Lverify;\t\t//no es eof, vuelve a verify\n`;
        //aceptacion
        this.funciones += `\tLacept:\t\t//aceptacion de la cadena\n`;
        this.funciones += `\tprintf("%c",(char)77);printf("%f",(double)H);printf("%c",(char)32);printf("%f",(double)t${l16.id});printf("%c",(char)10);\n`;
        this.funciones += `\theap[(int)H] = t${l16.id} - 1;\t\t//posicion heap del id match\n`;
        this.funciones += `\tH = H + 1;\t\t//espacio para siguiente valor\n`;
        //fin
        this.funciones += `\tLfin:\t\t//fin de la etiqueta\n`;
        this.funciones += `\tprintf("%s",x);printf("%c",(char)10);\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
    printEntorno(ent) {
        for (let n_ent of ent) {
            /*console.log("ENTORNO")
            console.log(n_ent)*/
            this.main += `\tprintf("%c",(char)10);\n`;
            let nTag = n_ent.tabla["n_etiquetas"].valor;
            if (nTag == 0) {
                let xquery = ent[0];
                console.log("XQUERY RESULT");
                console.log(xquery);
                //cadena result
                let simbol = xquery.tabla["valor"];
                let ini = { "id": this.generateTemp(), "val": this.h };
                this.main += `\tt${ini.id} = H;\n`;
                //se guarda caracter por caracter
                for (let i = 0; i < simbol.valor.length; i++) {
                    this.heap[this.h] = simbol.valor.charCodeAt(i);
                    this.main += `\theap[(int)H] = ${simbol.valor.charCodeAt(i)};\n`;
                    this.h += 1;
                    this.main += `\tH = H + 1;\n`;
                }
                //se guarda el fin de la cadena
                this.heap[this.h] = -1;
                this.main += `\theap[(int)H] = -1;\t\t//se agrega el caracter eos H[${this.h}] -1\n`;
                this.h += 1;
                this.main += `\tH = H + 1;\n`;
                //
                let ret = { "id": this.generateTemp(), "val": this.s + this.last_stack };
                this.main += `\tt${ret.id} = S + ${this.last_stack};\n`;
                //parametro
                let param = { "id": this.generateTemp(), "val": ret.val + 1 };
                this.main += `\tt${param.id} = t${ret.id} + 1;\n`;
                //valor stack cadena
                this.stack[param.val] = ini.val;
                this.main += `\tstack[(int)t${param.id}] = t${ini.id};\n`;
                //entorno in
                this.s = this.s + this.last_stack;
                this.main += `\tS = S + ${this.last_stack};\n`;
                this.temp;
                //llamadaVal()
                this.main += `\tprintVal2();\n`;
                //entorno out
                ret.val = this.stack[this.s];
                this.main += `\tt${ret.id} = stack[(int)S];\n`;
                this.s = this.s - this.last_stack;
                this.main += `\tS = S - ${this.last_stack};\n`;
            }
            else if (nTag == 1) {
                //tag ini
                this.main += `\tprintf("%c",(char)60);\n`;
                let id = n_ent.tabla["id"];
                //retorno
                let ret = { "id": this.generateTemp(), "val": this.s + this.last_stack };
                this.main += `\tt${ret.id} = S + ${this.last_stack};\n`;
                //parametro
                let param = { "id": this.generateTemp(), "val": ret.val + 1 };
                this.main += `\tt${param.id} = t${ret.id} + 1;\n`;
                //valor stack cadena
                let ini = { "id": this.generateTemp(), "val": id.stack + 1 };
                this.main += `\tt${ini.id} = ${id.stack} + 1;\n`;
                this.stack[param.val] = ini.val;
                this.main += `\tstack[(int)t${param.id}] = t${ini.id};\n`;
                //entorno in
                this.s = this.s + this.last_stack;
                this.main += `\tS = S + ${this.last_stack};\n`;
                this.temp;
                //llamadaIni()
                this.main += `\tprintStr();\n`;
                //entorno out
                ret.val = this.stack[this.s];
                this.main += `\tt${ret.id} = stack[(int)S];\n`;
                this.s = this.s - this.last_stack;
                this.main += `\tS = S - ${this.last_stack};\n`;
                this.main += `\tprintf("%c",(char)47);\n`;
                this.main += `\tprintf("%c",(char)62);\n`;
            }
            else if (nTag == 2) {
                //tag ini
                this.main += `\tprintf("%c",(char)60);\n`;
                let id = n_ent.tabla["id"];
                //retorno
                let ret = { "id": this.generateTemp(), "val": this.s + this.last_stack };
                this.main += `\tt${ret.id} = S + ${this.last_stack};\n`;
                //parametro
                let param = { "id": this.generateTemp(), "val": ret.val + 1 };
                this.main += `\tt${param.id} = t${ret.id} + 1;\n`;
                //valor stack cadena
                let ini = { "id": this.generateTemp(), "val": id.stack + 1 };
                this.main += `\tt${ini.id} = ${id.stack} + 1;\n`;
                this.stack[param.val] = ini.val;
                this.main += `\tstack[(int)t${param.id}] = t${ini.id};\n`;
                //entorno in
                this.s = this.s + this.last_stack;
                this.main += `\tS = S + ${this.last_stack};\n`;
                this.temp;
                //llamadaIni()
                this.main += `\tprintID();\n`;
                //entorno out
                ret.val = this.stack[this.s];
                this.main += `\tt${ret.id} = stack[(int)S];\n`;
                this.s = this.s - this.last_stack;
                this.main += `\tS = S - ${this.last_stack};\n`;
                //atributos
                this.printAtributos(n_ent);
                this.main += `\tprintf("%c",(char)62);\n`;
                //valor | nodos
                if (n_ent.tabla["valor"] == null) {
                    //hijos, funcion recursiva
                    for (let key in n_ent.tabla) {
                        if (key.startsWith("hijo")) {
                            this.printEntorno([n_ent.tabla[key].valor]);
                        }
                    }
                    this.main += `\tprintf("%c",(char)10);\n`;
                }
                else {
                    //valor
                    let id = n_ent.tabla["valor"];
                    /*console.log("VAL")
                    console.log(id)*/
                    //retorno
                    let ret = { "id": this.generateTemp(), "val": this.s + this.last_stack };
                    this.main += `\tt${ret.id} = S + ${this.last_stack};\n`;
                    //parametro
                    let param = { "id": this.generateTemp(), "val": ret.val + 1 };
                    this.main += `\tt${param.id} = t${ret.id} + 1;\n`;
                    //valor stack cadena
                    let ini = { "id": this.generateTemp(), "val": id.stack };
                    this.main += `\tt${ini.id} = ${id.stack};\n`;
                    this.stack[param.val] = ini.val;
                    this.main += `\tstack[(int)t${param.id}] = t${ini.id};\n`;
                    //entorno in
                    this.s = this.s + this.last_stack;
                    this.main += `\tS = S + ${this.last_stack};\n`;
                    this.temp;
                    //llamadaVal()
                    this.main += `\tprintVal();\n`;
                    //entorno out
                    ret.val = this.stack[this.s];
                    this.main += `\tt${ret.id} = stack[(int)S];\n`;
                    this.s = this.s - this.last_stack;
                    this.main += `\tS = S - ${this.last_stack};\n`;
                }
                //tag fin
                //retorno
                id = n_ent.tabla["id"];
                this.main += `\tprintf("%c",(char)60);\n`;
                this.main += `\tprintf("%c",(char)47);\n`;
                ret = { "id": this.generateTemp(), "val": this.s + this.last_stack };
                this.main += `\tt${ret.id} = S + ${this.last_stack};\n`;
                //parametro
                param = { "id": this.generateTemp(), "val": ret.val + 1 };
                this.main += `\tt${param.id} = t${ret.id} + 1;\n`;
                //valor stack cadena
                ini = { "id": this.generateTemp(), "val": id.stack + 1 };
                this.main += `\tt${ini.id} = ${id.stack} + 1;\n`;
                this.stack[param.val] = ini.val;
                this.main += `\tstack[(int)t${param.id}] = t${ini.id};\n`;
                //entorno in
                this.s = this.s + this.last_stack;
                this.main += `\tS = S + ${this.last_stack};\n`;
                this.temp;
                //llamadaIni()
                this.main += `\tprintID();\n`;
                //entorno out
                ret.val = this.stack[this.s];
                this.main += `\tt${ret.id} = stack[(int)S];\n`;
                this.s = this.s - this.last_stack;
                this.main += `\tS = S - ${this.last_stack};\n`;
                this.main += `\tprintf("%c",(char)62);\n`;
                //this.main += `\tprintf("%c",(char)88);printf("%c",(char)88);printf("%c",(char)88);\n`
            }
        }
    }
    printAtributos(ent) {
        for (let key in ent.tabla) {
            if (key.startsWith("atr")) {
                let id = ent.tabla[key];
                /*console.log("ATR")
                console.log(id)*/
                //id
                let ret = { "id": this.generateTemp(), "val": this.s + this.last_stack };
                this.main += `\tt${ret.id} = S + ${this.last_stack};\n`;
                //parametro
                let param = { "id": this.generateTemp(), "val": ret.val + 1 };
                this.main += `\tt${param.id} = t${ret.id} + 1;\n`;
                //valor stack cadena
                let ini = { "id": this.generateTemp(), "val": id.stack };
                this.main += `\tt${ini.id} = ${id.stack};\n`;
                this.stack[param.val] = ini.val;
                this.main += `\tstack[(int)t${param.id}] = t${ini.id};\n`;
                //entorno in
                this.s = this.s + this.last_stack;
                this.main += `\tS = S + ${this.last_stack};\n`;
                this.temp;
                //llamada()
                this.main += `\tprintAtr();\n`;
                //entorno out
                ret.val = this.stack[this.s];
                this.main += `\tt${ret.id} = stack[(int)S];\n`;
                this.s = this.s - this.last_stack;
                this.main += `\tS = S - ${this.last_stack};\n`;
                //val
                ret = { "id": this.generateTemp(), "val": this.s + this.last_stack };
                this.main += `\tt${ret.id} = S + ${this.last_stack};\n`;
                //parametro
                param = { "id": this.generateTemp(), "val": ret.val + 1 };
                this.main += `\tt${param.id} = t${ret.id} + 1;\n`;
                //valor stack cadena
                ini = { "id": this.generateTemp(), "val": id.stack + 1 };
                this.main += `\tt${ini.id} = ${id.stack} + 1;\n`;
                this.stack[param.val] = ini.val;
                this.main += `\tstack[(int)t${param.id}] = t${ini.id};\n`;
                //entorno in
                this.s = this.s + this.last_stack;
                this.main += `\tS = S + ${this.last_stack};\n`;
                this.temp;
                //llamada()
                this.main += `\tprintAtrVal();\n`;
                //entorno out
                ret.val = this.stack[this.s];
                this.main += `\tt${ret.id} = stack[(int)S];\n`;
                this.s = this.s - this.last_stack;
                this.main += `\tS = S - ${this.last_stack};\n`;
            }
        }
    }
    printValor(ent) {
        //
    }
    StrCode() {
        /*************************** NODOS ***************************/
        this.funciones += `void printID(){\n`;
        //declaracion
        let s_val = { "id": this.generateTemp(), "val": -1 }; //valor s
        let s_i = { "id": this.generateTemp(), "val": -1 }; //stack index
        let ref_h = { "id": this.generateTemp(), "val": -1 }; //stack [val] = heap index
        let val = { "id": this.generateTemp(), "val": -1 }; //heap [val] = val
        //asignacion de valores
        this.funciones += `\tt${s_val.id} = S + 1;\t\t//\n`;
        this.funciones += `\tt${s_i.id} = stack[(int)t${s_val.id}];\t\t//\n`;
        this.funciones += `\tt${ref_h.id} = stack[(int)t${s_i.id}];\t\t//\n`;
        this.funciones += `\tt${val.id} = heap[(int)t${ref_h.id}];\t\t//\n`;
        /*this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${s_val.id});\n`
        this.funciones += `\tprintf("%c",(char)73);printf("%f",(double)t${s_i.id});\n`
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${ref_h.id});\n`
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${val.id});\n`
        this.funciones += `\tprintf("%c",(char)10);\n`*/
        //ini
        //loop
        this.funciones += `\tLchar:\t\t//\n`;
        this.funciones += `\tif (t${val.id} == -1) goto Lfin;\t\t//\n`;
        this.funciones += `\tprintf("%c",(char)t${val.id});\t\t//\n`;
        this.funciones += `\tt${ref_h.id} = t${ref_h.id} + 1;\t\t//\n`;
        this.funciones += `\tt${val.id} = heap[(int)t${ref_h.id}];\t\t//\n`;
        this.funciones += `\tgoto Lchar;\t\t//\n`;
        this.funciones += `\tLfin:\t\t//\n`;
        //fin
        this.funciones += `\treturn;\n}\n`;
    }
    TagFinCode() {
        this.funciones += `void printTagFin(){\n`;
        //declaracion
        let s_val = { "id": this.generateTemp(), "val": -1 }; //valor s
        let s_i = { "id": this.generateTemp(), "val": -1 }; //stack index
        let ref_h = { "id": this.generateTemp(), "val": -1 }; //stack [val] = heap index
        let val = { "id": this.generateTemp(), "val": -1 }; //heap [val] = val
        //asignacion de valores
        this.funciones += `\tt${s_val.id} = S + 1;\t\t//\n`;
        this.funciones += `\tt${s_i.id} = stack[(int)t${s_val.id}];\t\t//\n`;
        this.funciones += `\tt${ref_h.id} = stack[(int)t${s_i.id}];\t\t//\n`;
        this.funciones += `\tt${val.id} = heap[(int)t${ref_h.id}];\t\t//\n`;
        /*this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${s_val.id});\n`
        this.funciones += `\tprintf("%c",(char)73);printf("%f",(double)t${s_i.id});\n`
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${ref_h.id});\n`
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${val.id});\n`
        this.funciones += `\tprintf("%c",(char)10);\n`*/
        //ini
        this.funciones += `\tprintf("%c",(char)60);printf("%c",(char)47);\n`;
        //loop
        this.funciones += `\tLchar:\t\t//\n`;
        this.funciones += `\tif (t${val.id} == -1) goto Lfin;\t\t//\n`;
        this.funciones += `\tprintf("%c",(char)t${val.id});\t\t//\n`;
        this.funciones += `\tt${ref_h.id} = t${ref_h.id} + 1;\t\t//\n`;
        this.funciones += `\tt${val.id} = heap[(int)t${ref_h.id}];\t\t//\n`;
        this.funciones += `\tgoto Lchar;\t\t//\n`;
        this.funciones += `\tLfin:\t\t//\n`;
        //fin
        this.funciones += `\tprintf("%c",(char)62);\n`;
        this.funciones += `\treturn;\n}\n`;
    }
    AtrCode() {
        /****************************** ID ******************************/
        this.funciones += `void printAtr(){\n`;
        //declaracion
        let s_val = { "id": this.generateTemp(), "val": -1 }; //valor s
        let s_i = { "id": this.generateTemp(), "val": -1 }; //stack index
        let ref_h = { "id": this.generateTemp(), "val": -1 }; //stack [val] = heap index
        let val = { "id": this.generateTemp(), "val": -1 }; //heap [val] = val
        //asignacion de valores
        this.funciones += `\tt${s_val.id} = S + 1;\t\t//\n`;
        this.funciones += `\tt${s_i.id} = stack[(int)t${s_val.id}];\t\t//\n`;
        this.funciones += `\tt${ref_h.id} = stack[(int)t${s_i.id}];\t\t//\n`;
        this.funciones += `\tt${val.id} = heap[(int)t${ref_h.id}];\t\t//\n`;
        /*this.funciones += `\tprintf("%c",(char)10);\n`
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${s_val.id});\n`
        this.funciones += `\tprintf("%c",(char)73);printf("%f",(double)t${s_i.id});\n`
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${ref_h.id});\n`
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${val.id});\n`
        this.funciones += `\tprintf("%c",(char)10);\n`*/
        //ini
        this.funciones += `\tprintf("%c",(char)32);\n`;
        //loop
        this.funciones += `\tLchar:\t\t//\n`;
        this.funciones += `\tif (t${val.id} == -1) goto Lfin;\t\t//\n`;
        this.funciones += `\tprintf("%c",(char)t${val.id});\t\t//\n`;
        this.funciones += `\tt${ref_h.id} = t${ref_h.id} + 1;\t\t//\n`;
        this.funciones += `\tt${val.id} = heap[(int)t${ref_h.id}];\t\t//\n`;
        this.funciones += `\tgoto Lchar;\t\t//\n`;
        this.funciones += `\tLfin:\t\t//\n`;
        //fin
        this.funciones += `\treturn;\n}\n`;
        /****************************** VAL ******************************/
        this.funciones += `void printAtrVal(){\n`;
        //declaracion
        s_val = { "id": this.generateTemp(), "val": -1 }; //valor s
        s_i = { "id": this.generateTemp(), "val": -1 }; //stack index
        ref_h = { "id": this.generateTemp(), "val": -1 }; //stack [val] = heap index
        val = { "id": this.generateTemp(), "val": -1 }; //heap [val] = val
        //asignacion de valores
        this.funciones += `\tt${s_val.id} = S + 1;\t\t//\n`;
        this.funciones += `\tt${s_i.id} = stack[(int)t${s_val.id}];\t\t//\n`;
        this.funciones += `\tt${ref_h.id} = stack[(int)t${s_i.id}];\t\t//\n`;
        this.funciones += `\tt${val.id} = heap[(int)t${ref_h.id}];\t\t//\n`;
        /*this.funciones += `\tprintf("%c",(char)10);\n`
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${s_val.id});\n`
        this.funciones += `\tprintf("%c",(char)73);printf("%f",(double)t${s_i.id});\n`
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${ref_h.id});\n`
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${val.id});\n`
        this.funciones += `\tprintf("%c",(char)10);\n`*/
        //ini
        this.funciones += `\tprintf("%c",(char)61);\n`;
        this.funciones += `\tprintf("%c",(char)34);\n`;
        //loop
        this.funciones += `\tLchar:\t\t//\n`;
        this.funciones += `\tif (t${val.id} == -1) goto Lfin;\t\t//\n`;
        this.funciones += `\tprintf("%c",(char)t${val.id});\t\t//\n`;
        this.funciones += `\tt${ref_h.id} = t${ref_h.id} + 1;\t\t//\n`;
        this.funciones += `\tt${val.id} = heap[(int)t${ref_h.id}];\t\t//\n`;
        this.funciones += `\tgoto Lchar;\t\t//\n`;
        this.funciones += `\tLfin:\t\t//\n`;
        //fin
        this.funciones += `\tprintf("%c",(char)34);\n`;
        this.funciones += `\treturn;\n}\n`;
    }
    ValCode() {
        /*************************** VAL ***************************/
        this.funciones += `void printVal(){\n`;
        //declaracion
        let s_val = { "id": this.generateTemp(), "val": -1 }; //valor s
        let ref_h = { "id": this.generateTemp(), "val": -1 }; //stack [val] = heap index
        let val = { "id": this.generateTemp(), "val": -1 }; //heap [val] = val
        //asignacion de valores
        this.funciones += `\tt${s_val.id} = S + 1;\t\t//\n`;
        this.funciones += `\tt${ref_h.id} = stack[(int)t${s_val.id}];\t\t//\n`;
        this.funciones += `\tt${val.id} = heap[(int)t${ref_h.id}];\t\t//\n`;
        /*this.funciones += `\tprintf("%c",(char)10);\n`
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${s_val.id});\n`
        this.funciones += `\tprintf("%c",(char)73);printf("%f",(double)t${s_i.id});\n`
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${ref_h.id});\n`
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${val.id});\n`
        this.funciones += `\tprintf("%c",(char)10);\n`*/
        //ini
        //loop
        this.funciones += `\tLchar:\t\t//\n`;
        this.funciones += `\tif (t${val.id} == -1) goto Lfin;\t\t//\n`;
        this.funciones += `\tprintf("%c",(char)t${val.id});\t\t//\n`;
        this.funciones += `\tt${ref_h.id} = t${ref_h.id} + 1;\t\t//\n`;
        this.funciones += `\tt${val.id} = heap[(int)t${ref_h.id}];\t\t//\n`;
        this.funciones += `\tgoto Lchar;\t\t//\n`;
        this.funciones += `\tLfin:\t\t//\n`;
        //fin
        this.funciones += `\treturn;\n}\n`;
    }
    ValCode2() {
        /*************************** VAL ***************************/
        this.funciones += `void printVal2(){\n`;
        //declaracion
        let s_val = { "id": this.generateTemp(), "val": -1 }; //valor s
        let ref_h = { "id": this.generateTemp(), "val": -1 }; //stack [val] = heap index
        let val = { "id": this.generateTemp(), "val": -1 }; //heap [val] = val
        //asignacion de valores
        this.funciones += `\tt${s_val.id} = S + 1;\t\t//\n`;
        this.funciones += `\tt${ref_h.id} = stack[(int)t${s_val.id}];\t\t//\n`;
        this.funciones += `\tt${val.id} = heap[(int)t${ref_h.id}];\t\t//\n`;
        /*this.funciones += `\tprintf("%c",(char)10);\n`
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${s_val.id});\n`
        this.funciones += `\tprintf("%c",(char)73);printf("%f",(double)t${s_i.id});\n`
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${ref_h.id});\n`
        this.funciones += `\tprintf("%c",(char)86);printf("%f",(double)t${val.id});\n`
        this.funciones += `\tprintf("%c",(char)10);\n`*/
        //ini
        //loop
        this.funciones += `\tLchar:\t\t//\n`;
        this.funciones += `\tif (t${val.id} == -1) goto Lfin;\t\t//\n`;
        this.funciones += `\tprintf("%c",(char)t${val.id});\t\t//\n`;
        this.funciones += `\tt${ref_h.id} = t${ref_h.id} + 1;\t\t//\n`;
        this.funciones += `\tt${val.id} = heap[(int)t${ref_h.id}];\t\t//\n`;
        this.funciones += `\tgoto Lchar;\t\t//\n`;
        this.funciones += `\tLfin:\t\t//\n`;
        //fin
        this.funciones += `\treturn;\n}\n`;
    }
    expInt() {
        this.funciones += `void expInt(){\n`;
        let slc_ref = { "id": this.generateTemp(), "val": -1 };
        let num_ref = { "id": this.generateTemp(), "val": -1 };
        let slc_heap = { "id": this.generateTemp(), "val": -1 };
        let ent = { "id": this.generateTemp(), "val": -1 };
        let num = { "id": this.generateTemp(), "val": -1 };
        let i = { "id": this.generateTemp(), "val": 0 };
        this.funciones += `\tt${slc_ref.id} = S + 1;\n`;
        this.funciones += `\tt${num_ref.id} = S + 2;\n`;
        this.funciones += `\tt${slc_heap.id} = stack[(int)t${slc_ref.id}];\n`;
        this.funciones += `\tt${num.id} = stack[(int)t${num_ref.id}];\t\t//valor index\n`;
        this.funciones += `\tt${ent.id} = heap[(int)t${slc_heap.id}];\t\t//posicion slc\n`;
        this.funciones += `\tt${i.id} = 0;\n`;
        this.funciones += `\tLindex:\n`;
        this.funciones += `\tif (t${i.id} == t${num.id}) goto Lmatch;\n`;
        this.funciones += `\tt${i.id} = t${i.id} + 1;\n`;
        this.funciones += `\tt${slc_heap.id} = t${slc_heap.id} + 1;\n`;
        this.funciones += `\tt${ent.id} = heap[(int)t${slc_heap.id}];\n`;
        this.funciones += `\tgoto Lindex;\n`;
        this.funciones += `\tLmatch:\n`;
        this.funciones += `\theap[(int)H] = t${ent.id};\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
    expRel1() {
        this.funciones += `void expRel1(){\n`;
        this.funciones += `\tprintf("%s",xxx);printf("%c",(char)10);\n`;
        //ref
        let r_tipo = { "id": this.generateTemp(), "val": -1 };
        let r_x = { "id": this.generateTemp(), "val": -1 };
        let r_val = { "id": this.generateTemp(), "val": -1 };
        let r_id = { "id": this.generateTemp(), "val": -1 };
        //val
        let tipo = { "id": this.generateTemp(), "val": -1 };
        let x = { "id": this.generateTemp(), "val": -1 };
        let val = { "id": this.generateTemp(), "val": -1 };
        let id = { "id": this.generateTemp(), "val": -1 };
        //referencia
        this.funciones += `\tt${r_tipo.id} = S + 1;\n`;
        this.funciones += `\tt${r_x.id} = S + 2;\n`;
        this.funciones += `\tt${r_val.id} = S + 3;\n`;
        this.funciones += `\tt${r_id.id} = S + 4;\n`;
        //valor
        this.funciones += `\tt${tipo.id} = stack[(int)t${r_tipo.id}];\n`;
        this.funciones += `\tt${x.id} = stack[(int)t${r_x.id}];\n`;
        this.funciones += `\tt${val.id} = stack[(int)t${r_val.id}];\n`;
        this.funciones += `\tt${id.id} = stack[(int)t${r_id.id}];\n`;
        this.funciones += `\tprintf("%f",(double)t${r_tipo.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${r_x.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${r_val.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${r_id.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${tipo.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${x.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${val.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${id.id});printf("%c",(char)10);\n`;
        //tipo
        this.funciones += `\tif (t${tipo.id} == 1) goto Lmenor;\n`;
        this.funciones += `\tif (t${tipo.id} == 2) goto Lmenor_igual;\n`;
        this.funciones += `\tif (t${tipo.id} == 3) goto Lmayor;\n`;
        this.funciones += `\tif (t${tipo.id} == 4) goto Lmayor_igual;\n`;
        this.funciones += `\tif (t${tipo.id} == 5) goto Ligual;\n`;
        this.funciones += `\tif (t${tipo.id} == 6) goto Ldif;\n`;
        this.funciones += `\tgoto Lfin;\n`;
        //1
        this.funciones += `\tLmenor:\n`;
        this.funciones += `\tif (t${x.id} < t${val.id}) goto Lacept;\n`;
        this.funciones += `\tgoto Lfin;\n`;
        //2
        this.funciones += `\tLmenor_igual:\n`;
        this.funciones += `\tif (t${x.id} <= t${val.id}) goto Lacept;\n`;
        this.funciones += `\tgoto Lfin;\n`;
        //3
        this.funciones += `\tLmayor:\n`;
        this.funciones += `\tif (t${x.id} > t${val.id}) goto Lacept;\n`;
        this.funciones += `\tgoto Lfin;\n`;
        //4
        this.funciones += `\tLmayor_igual:\n`;
        this.funciones += `\tif (t${x.id} >= t${val.id}) goto Lacept;\n`;
        this.funciones += `\tgoto Lfin;\n`;
        //5
        this.funciones += `\tLigual:\n`;
        this.funciones += `\tif (t${x.id} == t${val.id}) goto Lacept;\n`;
        this.funciones += `\tgoto Lfin;\n`;
        //6
        this.funciones += `\tLdif:\n`;
        this.funciones += `\tif (t${x.id} != t${val.id}) goto Lacept;\n`;
        this.funciones += `\tgoto Lfin;\n`;
        //acept
        this.funciones += `\tLacept:\n`;
        this.funciones += `\tprintf("%c",(char)89);printf("%c",(char)10);\n`;
        this.funciones += `\theap[(int)H] = t${id.id};\n`;
        this.funciones += `\tH = H + 1;\n`;
        this.funciones += `\t;\n`;
        //fin
        this.funciones += `\tLfin:\n`;
        this.funciones += `\tprintf("%s",xxx);printf("%c",(char)10);\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
    expRel2() {
        this.funciones += `void expRel2(){\n`;
        this.funciones += `\tprintf("%s",xxx);printf("%c",(char)10);\n`;
        //ref
        let r_tipo = { "id": this.generateTemp(), "val": -1 };
        let r_val = { "id": this.generateTemp(), "val": -1 };
        let r_compare = { "id": this.generateTemp(), "val": -1 };
        let r_id = { "id": this.generateTemp(), "val": -1 };
        //val
        let tipo = { "id": this.generateTemp(), "val": -1 };
        let val = { "id": this.generateTemp(), "val": -1 };
        let compare = { "id": this.generateTemp(), "val": -1 };
        let id = { "id": this.generateTemp(), "val": -1 };
        //ref val
        let sr_val = { "id": this.generateTemp(), "val": -1 };
        let h_val = { "id": this.generateTemp(), "val": -1 };
        let h_compare = { "id": this.generateTemp(), "val": -1 };
        //referencia
        this.funciones += `\tt${r_tipo.id} = S + 1;\n`;
        this.funciones += `\tt${r_val.id} = S + 2;\n`;
        this.funciones += `\tt${r_compare.id} = S + 3;\n`;
        this.funciones += `\tt${r_id.id} = S + 4;\n`;
        //valor
        this.funciones += `\tt${tipo.id} = stack[(int)t${r_tipo.id}];\n`; //#
        this.funciones += `\tt${val.id} = stack[(int)t${r_val.id}];\n`; //pos stack
        this.funciones += `\tt${compare.id} = stack[(int)t${r_compare.id}];\n`; //pos heap
        this.funciones += `\tt${id.id} = stack[(int)t${r_id.id}];\n`; //pos stack
        //ref val
        this.funciones += `\tt${sr_val.id} = stack[(int)t${val.id}];\n`;
        this.funciones += `\tt${h_val.id} = heap[(int)t${sr_val.id}];\n`;
        this.funciones += `\tt${h_compare.id} = heap[(int)t${compare.id}];\n`;
        //heap val
        this.funciones += `\tprintf("%f",(double)t${r_tipo.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${r_val.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${r_compare.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${r_id.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${tipo.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${sr_val.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${compare.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${id.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${h_val.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%f",(double)t${h_compare.id});printf("%c",(char)10);\n`;
        //ini
        this.funciones += `\tLini:\n`;
        this.funciones += `\tprintf("%c",(char)t${h_val.id});\n`;
        this.funciones += `\tprintf("%c",(char)t${h_compare.id});\n`;
        this.funciones += `\tprintf("%f",(double)t${h_val.id});\n`;
        this.funciones += `\tprintf("%f",(double)t${h_compare.id});\n`;
        this.funciones += `\tprintf("%c",(char)32);\n`;
        //tipo
        this.funciones += `\tif (t${tipo.id} == 5) goto Ligual;\n`;
        this.funciones += `\tif (t${tipo.id} == 6) goto Ldif;\n`;
        this.funciones += `\tgoto Lfin;\n`;
        //5
        this.funciones += `\tLigual:\n`;
        this.funciones += `\tif (t${h_val.id} == t${h_compare.id}) goto Lnext;\n`;
        this.funciones += `\tgoto Lfin;\n`;
        //6
        this.funciones += `\tLdif:\n`;
        this.funciones += `\tif (t${h_val.id} != t${h_compare.id}) goto Lacept;\n`;
        this.funciones += `\tgoto Lnext;\n`;
        //next
        this.funciones += `\tLnext:\n`;
        this.funciones += `\tif (t${h_val.id} == -1) goto Lacept;\n`;
        this.funciones += `\tt${sr_val.id} = t${sr_val.id} + 1;\n`;
        this.funciones += `\tt${compare.id} = t${compare.id} + 1;\n`;
        this.funciones += `\tt${h_val.id} = heap[(int)t${sr_val.id}];\n`;
        this.funciones += `\tt${h_compare.id} = heap[(int)t${compare.id}];\n`;
        this.funciones += `\tgoto Lini;\n`;
        //acept
        this.funciones += `\tLacept:\n`;
        this.funciones += `\tprintf("%c",(char)89);printf("%c",(char)10);\n`;
        this.funciones += `\theap[(int)H] = t${id.id};\n`;
        this.funciones += `\tprintf("%f",(double)t${id.id});\n`;
        this.funciones += `\tH = H + 1;\n`;
        this.funciones += `\t;\n`;
        //fin
        this.funciones += `\tLfin:\n`;
        this.funciones += `\tprintf("%s",xxx);printf("%c",(char)10);\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
    upperCase() {
        this.funciones += `void upperCase(){\n`;
        this.funciones += `\tprintf("%s",nup);printf("%c",(char)10);\n`;
        //ref
        let s1 = { "id": this.generateTemp(), "val": -1 };
        let sval = { "id": this.generateTemp(), "val": -1 };
        let hval = { "id": this.generateTemp(), "val": -1 };
        //val
        this.funciones += `\tt${s1.id} = S + 1;\n`;
        this.funciones += `\tprintf("%c",(char)73);printf("%f",(double)t${s1.id});\n`;
        this.funciones += `\tprintf("%c",(char)32);\n`;
        this.funciones += `\tt${sval.id} = stack[(int)t${s1.id}];\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${sval.id});\n`;
        this.funciones += `\tprintf("%c",(char)32);\n`;
        this.funciones += `\tt${hval.id} = heap[(int)t${sval.id}];\t\t//posicion slc\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${hval.id});\n`;
        this.funciones += `\tprintf("%c",(char)10);\n`;
        //ciclo
        this.funciones += `\tLini:\n`;
        this.funciones += `\tif (t${hval.id} == -1) goto Lfin;\n`;
        this.funciones += `\tif (t${hval.id} < 97) goto Lnext;\n`;
        this.funciones += `\tif (t${hval.id} > 122) goto Lnext;\n`;
        this.funciones += `\theap[(int)t${sval.id}] = t${hval.id} - 32;\n`;
        this.funciones += `\tLnext:\n`;
        //this.funciones += `\tt${hval.id} = heap[(int)t${sval.id}];\n`
        //this.funciones += `\tprintf("%c",(char)t${hval.id});\n`
        this.funciones += `\tt${sval.id} = t${sval.id} + 1;\n`;
        this.funciones += `\tt${hval.id} = heap[(int)t${sval.id}];\n`;
        this.funciones += `\tgoto Lini;\n`;
        //fin
        this.funciones += `\tLfin:\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
    lowerCase() {
        this.funciones += `void lowerCase(){\n`;
        this.funciones += `\tprintf("%s",nlow);printf("%c",(char)10);\n`;
        //ref
        let s1 = { "id": this.generateTemp(), "val": -1 };
        let sval = { "id": this.generateTemp(), "val": -1 };
        let hval = { "id": this.generateTemp(), "val": -1 };
        //val
        this.funciones += `\tt${s1.id} = S + 1;\n`;
        this.funciones += `\tprintf("%c",(char)73);printf("%f",(double)t${s1.id});\n`;
        this.funciones += `\tprintf("%c",(char)32);\n`;
        this.funciones += `\tt${sval.id} = stack[(int)t${s1.id}];\n`;
        this.funciones += `\tprintf("%c",(char)83);printf("%f",(double)t${sval.id});\n`;
        this.funciones += `\tprintf("%c",(char)32);\n`;
        this.funciones += `\tt${hval.id} = heap[(int)t${sval.id}];\t\t//posicion slc\n`;
        this.funciones += `\tprintf("%c",(char)72);printf("%f",(double)t${hval.id});\n`;
        this.funciones += `\tprintf("%c",(char)10);\n`;
        //ciclo
        this.funciones += `\tLini:\n`;
        this.funciones += `\tif (t${hval.id} == -1) goto Lfin;\n`;
        this.funciones += `\tif (t${hval.id} < 65) goto Lnext;\n`;
        this.funciones += `\tif (t${hval.id} > 90) goto Lnext;\n`;
        this.funciones += `\theap[(int)t${sval.id}] = t${hval.id} + 32;\n`;
        this.funciones += `\tLnext:\n`;
        //this.funciones += `\tt${hval.id} = heap[(int)t${sval.id}];\n`
        //this.funciones += `\tprintf("%c",(char)t${hval.id});\n`
        this.funciones += `\tt${sval.id} = t${sval.id} + 1;\n`;
        this.funciones += `\tt${hval.id} = heap[(int)t${sval.id}];\n`;
        this.funciones += `\tgoto Lini;\n`;
        //fin
        this.funciones += `\tLfin:\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
    subString() {
        this.funciones += `void subString(){\n`;
        this.funciones += `\tprintf("%s",nsub);printf("%c",(char)10);\n`;
        //ref
        let s1 = { "id": this.generateTemp(), "val": -1 };
        let s2 = { "id": this.generateTemp(), "val": -1 };
        let s3 = { "id": this.generateTemp(), "val": -1 };
        let ini = { "id": this.generateTemp(), "val": -1 };
        let fin = { "id": this.generateTemp(), "val": -1 };
        let posh = { "id": this.generateTemp(), "val": -1 };
        let ini_res = { "id": this.generateTemp(), "val": -1 };
        let fin_res = { "id": this.generateTemp(), "val": -1 };
        //val
        this.funciones += `\tt${s1.id} = S + 1;\n`;
        this.funciones += `\tt${s2.id} = S + 2;\n`;
        this.funciones += `\tt${s3.id} = S + 3;\n`;
        this.funciones += `\tt${ini.id} = stack[(int)t${s1.id}];\n`;
        this.funciones += `\tt${fin.id} = stack[(int)t${s2.id}];\n`;
        this.funciones += `\tt${posh.id} = stack[(int)t${s3.id}];\n`;
        this.funciones += `\tt${ini_res.id} = t${posh.id} + t${ini.id};\n`;
        this.funciones += `\tt${fin_res.id} = t${posh.id} + t${fin.id};\n`;
        //valores in
        this.funciones += `\tprintf("%c",(char)49);printf("%f",(double)t${s1.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%c",(char)50);printf("%f",(double)t${s2.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%c",(char)51);printf("%f",(double)t${s3.id});printf("%c",(char)10);\n`;
        //ini-fin pos
        this.funciones += `\tprintf("%c",(char)105);printf("%f",(double)t${ini.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%c",(char)102);printf("%f",(double)t${fin.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%c",(char)112);printf("%f",(double)t${posh.id});printf("%c",(char)10);\n`;
        //result
        this.funciones += `\tprintf("%c",(char)120);printf("%f",(double)t${ini_res.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%c",(char)121);printf("%f",(double)t${fin_res.id});printf("%c",(char)10);\n`;
        //cambio
        this.funciones += `\theap[(int)t${posh.id}] = t${ini_res.id};\n`;
        this.funciones += `\theap[(int)t${fin_res.id}] = -1;\n`;
        this.funciones += `\tstack[(int)S] = t${ini_res.id};\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
    order() {
        this.funciones += `void order(){\n`;
        this.funciones += `\tprintf("%s",ord);printf("%c",(char)10);\n`;
        let s1 = { "id": this.generateTemp(), "val": -1 };
        let s2 = { "id": this.generateTemp(), "val": -1 };
        let i1 = { "id": this.generateTemp(), "val": -1 };
        let i2 = { "id": this.generateTemp(), "val": -1 };
        let up1 = { "id": this.generateTemp(), "val": -1 };
        let up2 = { "id": this.generateTemp(), "val": -1 };
        let child1 = { "id": this.generateTemp(), "val": -1 };
        let child2 = { "id": this.generateTemp(), "val": -1 };
        let schar1 = { "id": this.generateTemp(), "val": -1 };
        let schar2 = { "id": this.generateTemp(), "val": -1 };
        let char1 = { "id": this.generateTemp(), "val": -1 };
        let char2 = { "id": this.generateTemp(), "val": -1 };
        let j1 = { "id": this.generateTemp(), "val": -1 };
        let j2 = { "id": this.generateTemp(), "val": -1 };
        let temp = { "id": this.generateTemp(), "val": -1 };
        //param
        this.funciones += `\tt${s1.id} = S + 1;\n`;
        this.funciones += `\tt${s2.id} = S + 2;\n`;
        this.funciones += `\tt${i1.id} = stack[(int)t${s1.id}];\n`;
        this.funciones += `\tt${i2.id} = stack[(int)t${s2.id}];\n`;
        this.funciones += `\tt${j1.id} = t${i1.id} + 1;\n`;
        this.funciones += `\tt${j2.id} = t${i2.id} + 1;\n`;
        //valores
        this.funciones += `\tLini:\n`;
        this.funciones += `\tt${up1.id} = heap[(int)t${i1.id}];\n`;
        this.funciones += `\tt${up2.id} = heap[(int)t${j1.id}];\n`;
        this.funciones += `\tt${child1.id} = heap[(int)t${i2.id}];\n`;
        this.funciones += `\tt${child2.id} = heap[(int)t${j2.id}];\n`;
        this.funciones += `\tt${schar1.id} = stack[(int)t${child1.id}];\n`;
        this.funciones += `\tt${schar2.id} = stack[(int)t${child2.id}];\n`;
        this.funciones += `\tt${char1.id} = heap[(int)t${schar1.id}];\n`;
        this.funciones += `\tt${char2.id} = heap[(int)t${schar2.id}];\n`;
        this.funciones += `\tprintf("%c",(char)73);printf("%f",(double)t${i1.id});\n`;
        this.funciones += `\tprintf("%c",(char)74);printf("%f",(double)t${j1.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%c",(char)73);printf("%f",(double)t${i2.id});\n`;
        this.funciones += `\tprintf("%c",(char)74);printf("%f",(double)t${j2.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%c",(char)67);printf("%f",(double)t${char1.id});printf("%c",(char)10);\n`;
        this.funciones += `\tprintf("%c",(char)67);printf("%f",(double)t${char2.id});printf("%c",(char)10);\n`;
        this.funciones += `\tif (t${child1.id} == -1) goto Lfin;\n`;
        this.funciones += `\tif (t${child2.id} == -1) goto Lnextij;\n`;
        this.funciones += `\tLchar:\n`;
        this.funciones += `\tif (t${char1.id} > t${char2.id}) goto Lchange;\n`;
        this.funciones += `\tif (t${char1.id} == t${char2.id}) goto Lnextchar;\n`;
        this.funciones += `\tgoto Lnextj;\n`;
        this.funciones += `\tLchange:\n`; //CH
        this.funciones += `\tprintf("%c",(char)67);printf("%c",(char)72);printf("%c",(char)10);\n`;
        //up
        this.funciones += `\tt${temp.id} = t${up1.id};\n`;
        this.funciones += `\theap[(int)t${i1.id}] = t${up2.id};\n`;
        this.funciones += `\theap[(int)t${j1.id}] = t${temp.id};\n`;
        //child
        this.funciones += `\tt${temp.id} = t${child1.id};\n`;
        this.funciones += `\theap[(int)t${i2.id}] = t${child2.id};\n`;
        this.funciones += `\theap[(int)t${j2.id}] = t${temp.id};\n`;
        this.funciones += `\tgoto Lnextj;\n`;
        this.funciones += `\tLnextchar:\n`; //NC
        this.funciones += `\tprintf("%c",(char)78);printf("%c",(char)67);printf("%c",(char)10);\n`;
        this.funciones += `\tif (t${char1.id} == -1) goto Lnextj;\n`;
        this.funciones += `\tt${schar1.id} = t${schar1.id} + 1;\n`;
        this.funciones += `\tt${schar2.id} = t${schar2.id} + 1;\n`;
        this.funciones += `\tt${char1.id} = heap[(int)t${schar1.id}];\n`;
        this.funciones += `\tt${char2.id} = heap[(int)t${schar2.id}];\n`;
        this.funciones += `\tgoto Lchar;\n`;
        this.funciones += `\tLnextij:\n`; //NIJ
        this.funciones += `\tprintf("%c",(char)78);printf("%c",(char)73);printf("%c",(char)74);printf("%c",(char)10);\n`;
        this.funciones += `\tt${i1.id} = t${i1.id} + 1;\n`;
        this.funciones += `\tt${i2.id} = t${i2.id} + 1;\n`;
        this.funciones += `\tt${j1.id} = t${i1.id} + 1;\n`;
        this.funciones += `\tt${j2.id} = t${i2.id} + 1;\n`;
        this.funciones += `\tgoto Lini;\n`;
        this.funciones += `\tLnextj:\n`; //NJ
        this.funciones += `\tprintf("%c",(char)78);printf("%c",(char)74);printf("%c",(char)10);\n`;
        this.funciones += `\tt${j1.id} = t${j1.id} + 1;\n`;
        this.funciones += `\tt${j2.id} = t${j2.id} + 1;\n`;
        this.funciones += `\tgoto Lini;\n`;
        //
        this.funciones += `\tLfin:\n`;
        this.funciones += `\tprintf("%c",(char)10);printf("%s",ord);printf("%c",(char)10);\n`;
        this.funciones += `\treturn;\n`;
        this.funciones += `\n}\n`;
    }
}
//# sourceMappingURL=nodo3d.js.map