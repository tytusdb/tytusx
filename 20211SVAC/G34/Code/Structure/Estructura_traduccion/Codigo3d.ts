import * as enumGlobal from "../../Structure/Estructura_traduccion/Estructuras_estaticas";

export class Codigo3d {
  codigo3d: Array<string>;
  codigoEncabezado: Array<string>;
  constructor() {
    this.codigo3d = new Array<string>();
    this.codigoEncabezado = new Array<string>();
  }

  setValor(valor: string): void {
    this.codigo3d.push(valor + "\n");
  }

  setValor2(valor: string): void {
    this.codigoEncabezado.push(valor + "\n");
  }

  getReporte(): string {
    let cadena: string = "";
    this.setEncabezado();
    this.setConcatenar();
    this.setConvertirNumeros();
    this.setCompararCadenas();
    this.setImprimirXML();
    this.setFilterEXP();

    for (let i = 0; i < this.codigoEncabezado.length; i++) {
      cadena += this.codigoEncabezado[i];
    }

    for (let i = 0; i < this.codigo3d.length; i++) {
      cadena += this.codigo3d[i];
    }
    return cadena;
  }

  setEncabezado(): void {
    this.setValor2("#include <stdio.h>");
    this.setValor2("");
    this.setValor2("float Heap[100000];");
    this.setValor2("float Stack[100000];");
    this.setValor2("");
    this.setValor2("float SP = 0;");
    this.setValor2("float HP = 0;");
    this.setValor2("");

    let declaracion: string = "float ";
    for (let i: number = 0; i < enumGlobal.g_temporales; i++) {
      declaracion += "T" + i;
      if (i < enumGlobal.g_temporales - 1) {
        declaracion += ",";
      }
    }
    declaracion += ";";
    this.setValor2(declaracion);
  }

  setImprimirXML(): void {
    this.setValor2("int imprimirXML_macano(){");
    this.setValor2("T1 = SP + 1;");
    this.setValor2("T2 = Stack[(int)T1];");
    this.setValor2("T5 = HP;");
    this.setValor2("L1:");
    this.setValor2("T6 = Heap[(int)T2];");
    this.setValor2("if (T6 == 03) goto L2;")
    this.setValor2("printf(\"%c\", (char)T6);")
    this.setValor2("T2 = T2 + 1;")
    this.setValor2("goto L1;");
    this.setValor2("L2:");
    this.setValor2("return 0;");
    this.setValor2("}");
  }

  setLowerCase(): void {
    this.setValor2("int lowerCase_macano(){");
    this.setValor2("T1 = SP + 1;");
    this.setValor2("T2 = Stack[(int)T1];");
    this.setValor2("T5 = HP;");
    this.setValor2("L11:");
    this.setValor2("T6 = Heap[(int)T2];");
    this.setValor2("if (T6 == 03) goto L12;");
    this.setValor2("if (T6 > 64) goto L15;"); // L5 sigue and
    this.setValor2("goto L16;"); // L6 no convertir 
    this.setValor2("L15:")
    this.setValor2("if (T6 < 91) goto L17;"); // L7 convertir
    this.setValor2("goto L16;"); // L6 no convertir
    this.setValor2("L17:");
    this.setValor2("T6 = T6 + 32;");
    this.setValor2("L16:");
    this.setValor2("Heap[(int)HP] = T6;");
    this.setValor2("HP = HP + 1;");
    this.setValor2("T2 = T2 + 1;");
    this.setValor2("goto L11;");
    this.setValor2("L12:");
    this.setValor2("Heap[(int)HP] = 03;");
    this.setValor2("HP = HP + 1;");
    this.setValor2("Stack[(int)SP] = T5;");
    this.setValor2("return 0;");
    this.setValor2("}");
  }

  setUpperCase(): void {
    this.setValor2("int upperCase_macano(){");
    this.setValor2("T1 = SP + 1;");
    this.setValor2("T2 = Stack[(int)T1];");
    this.setValor2("T5 = HP;");
    this.setValor2("L21:");
    this.setValor2("T6 = Heap[(int)T2];");
    this.setValor2("if (T6 == 03) goto L22;");
    this.setValor2("if (T6 > 96) goto L25;"); // L5 sigue and
    this.setValor2("goto L26;"); // L6 no convertir 
    this.setValor2("L25:")
    this.setValor2("if (T6 < 123) goto L27;"); // L7 convertir
    this.setValor2("goto L26;"); // L6 no convertir
    this.setValor2("L27:");
    this.setValor2("T6 = T6 - 32;");
    this.setValor2("L26:");
    this.setValor2("Heap[(int)HP] = T6;");
    this.setValor2("HP = HP + 1;");
    this.setValor2("T2 = T2 + 1;");
    this.setValor2("goto L21;");
    this.setValor2("L22:");
    this.setValor2("Heap[(int)HP] = 03;");
    this.setValor2("HP = HP + 1;");
    this.setValor2("Stack[(int)SP] = T5;");
    this.setValor2("return 0;");
    this.setValor2("}");
  }

  setConcatenar(): void {
    this.setValor2("int concatenar_cadenas_macano(){")
    this.setValor2("T1 = SP + 1;");
    this.setValor2("T2 = Stack[(int)T1];");
    this.setValor2("T3 = SP + 2;");
    this.setValor2("T4 = Stack[(int)T3];");
    this.setValor2("T5 = HP;");
    this.setValor2("L31:");
    this.setValor2("T6 = Heap[(int)T2];");
    this.setValor2("if (T6 == 03) goto L32;")
    this.setValor2("Heap[(int)HP] = T6;");
    this.setValor2("HP = HP + 1;");
    this.setValor2("T2 = T2 + 1;");
    this.setValor2("goto L31;");
    this.setValor2("L32:");
    this.setValor2("T6 = Heap[(int)T4];");
    this.setValor2("if (T6 == 03) goto L33;")
    this.setValor2("Heap[(int)HP] = T6;");
    this.setValor2("HP = HP + 1;");
    this.setValor2("T4 = T4 + 1;");
    this.setValor2("goto L32;")
    this.setValor2("L33:");
    this.setValor2("Heap[(int)HP] = 03;");
    this.setValor2("HP = HP + 1;");
    this.setValor2("Stack[(int)SP] = T5;");
    this.setValor2("return 0;");
    this.setValor2("}");
  }

  setCompararCadenas(): void {
    this.setValor2("int comparar_cadenas_macano(){");
    this.setValor2("Stack[(int)SP] = 0;")
    this.setValor2("T1 = SP + 1;");
    this.setValor2("T2 = Stack[(int)T1];");
    this.setValor2("T3 = SP + 1;");
    this.setValor2("T4 = Stack[(int)T3];");
    this.setValor2("L41:");
    this.setValor2("T6 = Heap[(int)T2];");
    this.setValor2("T8 = Heap[(int)T4];");
    this.setValor2("if(T6 != T8) goto L42;");
    this.setValor2("if(T6 == 03) goto L43;");
    this.setValor2("T2 = T2 + 1;");
    this.setValor2("T4 = T4 + 1;");
    this.setValor2("goto L41;");
    this.setValor2("L43:");
    this.setValor2("Stack[(int)SP] = 1;")
    this.setValor2("L42:");
    this.setValor2("return 0;");
    this.setValor2("}");
  }

  setConvertirNumeros(): void {
    this.setValor2("int convertir_numero_macano(){");
    this.setValor2("T9 = HP;")
    this.setValor2("T10 = SP + 1;");
    this.setValor2("T11 = Stack[(int)T10];"); // valor
    this.setValor2("if(T11 > 0) goto L75;")
    this.setValor2("Heap[(int)HP] = 45;");
    this.setValor2("HP = HP + 1;");
    this.setValor2("T1 = 0 - 1;")
    this.setValor2("T11 = T11 * T1;");
    this.setValor2("L75:");
    this.setValor2("T12 = 1;") // divisor
    this.setValor2("T13 = T11;") // temp
    this.setValor2("L55:")
    this.setValor2("if (T13 <= 1) goto L36;")
    this.setValor2("T12 = T12 * 10;")
    this.setValor2("T13 = T11 / T12;")
    this.setValor2("goto L55;")
    this.setValor2("L36:")
    this.setValor2("if (T12 <= 1) goto L37;")
    this.setValor2("T14 = (int)T11 % (int)T12;"); // primero
    this.setValor2("T12 = T12 / 10;");
    this.setValor2("T15 = (int)T11 % (int)T12;"); // segundo
    this.setValor2("T16 = T14 - T15;") // tercero
    this.setValor2("T17 = T16 / T12;") // total
    this.setValor2("T17 = T17 + 48;")
    this.setValor2("Heap[(int)HP] = T17;");
    this.setValor2("HP = HP + 1;");
    this.setValor2("goto L36;")
    this.setValor2("L37:");
    this.setValor2("T11 = (int)T11 % (int)1;");
    this.setValor2("T18 = 0;") // contador
    this.setValor2("Heap[(int)HP] = 46;");
    this.setValor2("HP = HP + 1;");
    this.setValor2("L18:");
    this.setValor2("if (T18 >= 6) goto L19;");
    this.setValor2("T11 = T11 * 10;");
    this.setValor2("T19 = (int)T11 % (int)1;"); // resta2
    this.setValor2("T20 = T11 - T19;"); // actual
    this.setValor2("T21 = (int)T11 % (int)10;")
    this.setValor2("T21 = T21 + 48;")
    this.setValor2("Heap[(int)HP] = T21;");
    this.setValor2("HP = HP + 1;");
    this.setValor2("T18 = T18 + 1;")
    this.setValor2("goto L18;")
    this.setValor2("L19:");
    this.setValor2("Heap[(int)HP] = 03;");
    this.setValor2("HP = HP + 1;");
    this.setValor2("Stack[(int)SP] = T9;");
    this.setValor2("return 0;");
    this.setValor2("}");
  }

  setFilterEXP() {
    this.setValor2("int filterExp_macano(){");
    this.setValor2("T1 = SP + 1;");
    this.setValor2("T2 = Stack[(int)T1];");
    this.setValor2("T3 = SP + 1;");
    this.setValor2("T4 = Stack[(int)T3];");
    this.setValor2("L51:");
    this.setValor2("T6 = Heap[(int)T2];");
    this.setValor2("T8 = Heap[(int)T4];");
    this.setValor2("T2 = T2 + 1;");
    this.setValor2("T4 = T4 + 1;");
    this.setValor2("L53:");
    this.setValor2("return 0;");
    this.setValor2("}");
  }
}