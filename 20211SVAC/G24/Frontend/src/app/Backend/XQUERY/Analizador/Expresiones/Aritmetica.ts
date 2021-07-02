import NodoErrores from "src/app/Backend/XML/Analizador/Excepciones/NodoErrores";
import tablaSimbolosxml from "src/app/Backend/XML/Analizador/Simbolos/tablaSimbolos";
import { Instruccion } from "../Abstracto/Instruccion";
import nodoAST from "../Abstracto/nodoAST";
import Arbol from "../Simbolos/Arbol";
import Simbolo from "../Simbolos/Simbolo";
import tablaSimbolos from "../Simbolos/tablaSimbolos";
import Tipo, { tipoDato } from "../Simbolos/Tipo";

export default class Aritmetica extends Instruccion {
 
  codigo3D(arbol: Arbol, tabla: tablaSimbolos) {
    throw new Error('Method not implemented.');
  }
  private operando1: Instruccion | undefined;
  private operando2: Instruccion | undefined;
  private operandoUnico: Instruccion | undefined;
  private operador: Operadores;

  constructor(
    operador: Operadores,
    fila: number,
    columna: number,
    op1: Instruccion,
    op2?: Instruccion
  ) {
    super(new Tipo(tipoDato.ENTERO), fila, columna);
    this.operador = operador;
    if (!op2) this.operandoUnico = op1;
    else {
      this.operando1 = op1;
      this.operando2 = op2;
    }
  }
  public getNodoAST(): nodoAST {
    let nodo = new nodoAST('ARITMETICA');
    if (this.operandoUnico != null) {
      nodo.agregarHijo(this.operador + '');
      nodo.agregarHijoAST(this.operandoUnico.getNodoAST());
    } else {
      nodo.agregarHijoAST(this.operando1?.getNodoAST());
      nodo.agregarHijo(this.operador + '', 'ar', this.operador);
      nodo.agregarHijoAST(this.operando2?.getNodoAST());
    }
    return nodo;
  }
  public interpretar(arbol: Arbol, tabla: tablaSimbolos, tablaxml: tablaSimbolosxml) {
    let izq, der, uno;
    izq = der = uno = null;
    if (this.operandoUnico != null) {
      uno = this.operandoUnico.interpretar(arbol, tabla, tablaxml)
      if (uno instanceof NodoErrores) return uno;
    } else {
      izq = this.operando1?.interpretar(arbol, tabla, tablaxml)
      if (izq instanceof NodoErrores) return izq;
      der = this.operando2?.interpretar(arbol, tabla, tablaxml)
      if (der instanceof NodoErrores) return der;
    }
    switch (this.operador) {
      case Operadores.SUMA:
        return this.operador1Suma(izq, der);
      case Operadores.RESTA:
        return this.operador1Resta(izq, der);
      case Operadores.MULTIPLICACION:
        return this.operador1Multi(izq, der);
      case Operadores.DIVISION:
        return this.operador1Division(izq, der);
      case Operadores.MODULADOR:
        return this.operador1Mod(izq, der);
      case Operadores.MENOSNUM:
        return this.opMenosUnario(uno);
      default:
        return new NodoErrores(
          'ERROR SEMANTICO',
          'OPERADOR INVALIDO',
          this.fila,
          this.columna
        );
    }
  }

  /*----------------------------------------------------------MENOSUNARIO------------------------------------------------- */
  private opMenosUnario(izq: any) {
    let opUn = this.operandoUnico?.tipoDato.getTipo();
    switch (opUn) {
      case tipoDato.ENTERO:
        this.tipoDato = new Tipo(tipoDato.ENTERO);
        return parseInt(izq) * -1;
      case tipoDato.DECIMAL:
        this.tipoDato = new Tipo(tipoDato.DECIMAL);
        return parseFloat(izq) * -1.0;
    }
  }
  /*----------------------------------------------------------SUMA------------------------------------------------- */
  private operador1Suma(izq: any, der: any) {
    let op1 = this.operando1?.tipoDato.getTipo();
    let op2 = this.operando2?.tipoDato.getTipo();
    switch (
      op1 //operador 1
    ) {
      case tipoDato.ENTERO:
        return this.op2Suma(1, op2, izq, der);
      case tipoDato.DECIMAL:
        return this.op2Suma(2, op2, izq, der);
      case tipoDato.BOOLEANO:
        return this.op2Suma(3, op2, izq, der);
      case tipoDato.CADENA:
        return this.op2Suma(4, op2, izq, der);
      case tipoDato.CARACTER:
        return this.op2Suma(5, op2, izq, der);
    }
  }
  private op2Suma(numero: number, op2: any, izq: any, der: any) {
    if (numero == 1) {
      //entero
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          return parseInt(izq) + parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) + parseFloat(der);
        case tipoDato.BOOLEANO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          let dats = der + '';
          let otr = dats.toLowerCase();
          return otr == 'true' ? parseInt(izq) + 1 : parseInt(izq);
        case tipoDato.CADENA: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          return izq + '' + der;
        case tipoDato.CARACTER: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          var da = der + '';
          var res = da.charCodeAt(0);
          return parseInt(izq) + res;
      }
    } else if (numero == 2) {
      //decimal
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) + parseFloat(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) + parseFloat(der);
        case tipoDato.BOOLEANO: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          let dats = der + '';
          let otr = dats.toLowerCase();
          return otr == 'true' ? parseFloat(izq) + 1 : parseFloat(izq);
        case tipoDato.CADENA: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          return izq + '' + der;
        case tipoDato.CARACTER: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da = der + '';
          var res = da.charCodeAt(0);
          return parseFloat(izq) + res;
      }
    } else if (numero == 3) {
      //boolean
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          let dats = izq + '';
          let otr = dats.toLowerCase();
          if (otr == 'true') return parseInt(der) + 1;
          return parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          let dats1 = izq + '';
          let otr1 = dats1.toLowerCase();
          return otr1 == 'true' ? parseFloat(der) + 1 : parseFloat(der);
        case tipoDato.CADENA: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          return izq + '' + der;
        default:
          //error
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    } else if (numero == 4) {
      //cadena
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          return izq + '' + der;
        case tipoDato.DECIMAL: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          return izq + '' + der;
        case tipoDato.BOOLEANO: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          return izq + '' + der;
        case tipoDato.CADENA: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          return izq + '' + der;
        case tipoDato.CARACTER: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          var dato = der;
          return izq + '' + dato;
      }
    } else if (numero == 5) {
      //caracter
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          var da1 = izq + '';
          var res1 = da1.charCodeAt(0);
          return res1 + parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da1 = izq + '';
          var res1 = da1.charCodeAt(0);
          return res1 + parseFloat(der);
        case tipoDato.CADENA: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          var otro11 = izq;
          return otro11 + '' + der;
        case tipoDato.CARACTER: //retorna cadena
          this.tipoDato = new Tipo(tipoDato.CADENA);
          var otro = der;
          var otro1 = izq;
          return otro1 + '' + otro;
        default:
          //error semantico
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    }
  }
  /*----------------------------------------------------------RESTA------------------------------------------------- */
  private operador1Resta(izq: any, der: any) {
    let op1 = this.operando1?.tipoDato.getTipo();
    let op2 = this.operando2?.tipoDato.getTipo();
    switch (
      op1 //operador 1
    ) {
      case tipoDato.ENTERO:
        return this.op2Resta(1, op2, izq, der);
      case tipoDato.DECIMAL:
        return this.op2Resta(2, op2, izq, der);
      case tipoDato.BOOLEANO:
        return this.op2Resta(3, op2, izq, der);
      case tipoDato.CADENA:
        return this.op2Resta(4, op2, izq, der);
      case tipoDato.CARACTER:
        return this.op2Resta(5, op2, izq, der);
    }
  }
  private op2Resta(numero: number, op2: any, izq: any, der: any) {
    if (numero == 1) {
      //entero
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          return parseInt(izq) - parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) - parseFloat(der);
        case tipoDato.BOOLEANO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          let dats = der + '';
          let otr = dats.toLowerCase();
          return otr == 'true' ? parseInt(izq) - 1 : parseInt(izq);
        case tipoDato.CARACTER: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          var da = der + '';
          var res = da.charCodeAt(0);
          return parseInt(izq) - res;
        default:
          //error
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    } else if (numero == 2) {
      //decimal
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) - parseFloat(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) - parseFloat(der);
        case tipoDato.BOOLEANO: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          let dats = der + '';
          let otr = dats.toLowerCase();
          return otr == 'true' ? parseFloat(izq) - 1 : parseFloat(izq);
        case tipoDato.CARACTER: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da = der + '';
          var res = da.charCodeAt(0);
          return parseFloat(izq) - res;
        default:
          //error
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    } else if (numero == 3) {
      //boolean
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          let dats = izq + '';
          let otr = dats.toLowerCase();
          return otr == 'true' ? parseInt(der) - 1 : parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          let dats1 = izq + '';
          let otr1 = dats1.toLowerCase();
          return otr1 == 'true' ? parseFloat(der) - 1 : parseFloat(der);
        default:
          //error
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    } else if (numero == 4) {
      //cadena
      return new NodoErrores(
        'SEMANTICO',
        'TIPO DE DATO NO PERMITIDO',
        this.fila,
        this.columna
      );
    } else if (numero == 5) {
      //caracter
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          var da1 = izq + '';
          var res1 = da1.charCodeAt(0);
          return res1 - parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da1 = izq + '';
          var res1 = da1.charCodeAt(0);
          return res1 - parseFloat(der);
        default:
          //error semantico
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    }
  }
  /*----------------------------------------------------------MULTIPLICACION------------------------------------------------- */
  private operador1Multi(izq: any, der: any) {
    let op1 = this.operando1?.tipoDato.getTipo();
    let op2 = this.operando2?.tipoDato.getTipo();
    switch (
      op1 //operador 1
    ) {
      case tipoDato.ENTERO:
        return this.op2Multi(1, op2, izq, der);
      case tipoDato.DECIMAL:
        return this.op2Multi(2, op2, izq, der);
      case tipoDato.BOOLEANO:
        return this.op2Multi(3, op2, izq, der);
      case tipoDato.CADENA:
        return this.op2Multi(4, op2, izq, der);
      case tipoDato.CARACTER:
        return this.op2Multi(5, op2, izq, der);
    }
  }
  private op2Multi(numero: number, op2: any, izq: any, der: any) {
    if (numero == 1) {
      //entero
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          return parseInt(izq) * parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) * parseFloat(der);
        case tipoDato.CARACTER: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          var da = der + '';
          var res = da.charCodeAt(0);
          return parseInt(izq) * res;
        default:
          //error
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    } else if (numero == 2) {
      //decimal
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) * parseFloat(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) * parseFloat(der);
        case tipoDato.CARACTER: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da = der + '';
          var res = da.charCodeAt(0);
          return parseFloat(izq) * res;
        default:
          //error
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    } else if (numero == 3) {
      //boolean
      //error
      return new NodoErrores(
        'SEMANTICO',
        'TIPO DE DATO NO PERMITIDO',
        this.fila,
        this.columna
      );
    } else if (numero == 4) {
      //cadena
      //error
      return new NodoErrores(
        'SEMANTICO',
        'TIPO DE DATO NO PERMITIDO',
        this.fila,
        this.columna
      );
    } else if (numero == 5) {
      //caracter
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          var da1 = izq + '';
          var res1 = da1.charCodeAt(0);
          return res1 * parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da1 = izq + '';
          var res1 = da1.charCodeAt(0);
          return res1 * parseFloat(der);
        default:
          //error semantico
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    }
  }
  /*----------------------------------------------------------DIVISION------------------------------------------------- */
  private operador1Division(izq: any, der: any) {
    let op1 = this.operando1?.tipoDato.getTipo();
    let op2 = this.operando2?.tipoDato.getTipo();
    switch (
      op1 //operador 1
    ) {
      case tipoDato.ENTERO:
        return this.op2Division(1, op2, izq, der);
      case tipoDato.DECIMAL:
        return this.op2Division(2, op2, izq, der);
      case tipoDato.BOOLEANO:
        return this.op2Division(3, op2, izq, der);
      case tipoDato.CADENA:
        return this.op2Division(4, op2, izq, der);
      case tipoDato.CARACTER:
        return this.op2Division(5, op2, izq, der);
    }
  }
  private op2Division(numero: number, op2: any, izq: any, der: any) {
    if (numero == 1) {
      //entero
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return der != 0
            ? parseInt(izq) / parseInt(der)
            : 'NO SE PUEDE DIVIDIR SOBRE CERO';
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return der != 0
            ? parseFloat(izq) / parseFloat(der)
            : 'NO SE PUEDE DIVIDIR SOBRE CERO';
        case tipoDato.CARACTER: //retorna entero
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da = der + '';
          var res = da.charCodeAt(0);
          return res != 0
            ? parseInt(izq) / res
            : 'NO SE PUEDE DIVIDIR SOBRE CERO';
        default:
          //error
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    } else if (numero == 2) {
      //decimal
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return der != 0
            ? parseFloat(izq) / parseFloat(der)
            : 'NO SE PUEDE DIVIDIR SOBRE CERO';
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return der != 0
            ? parseFloat(izq) / parseFloat(der)
            : 'NO SE PUEDE DIVIDIR SOBRE CERO';
        case tipoDato.CARACTER: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da = der + '';
          var res = da.charCodeAt(0);
          return der != 0
            ? parseFloat(izq) / res
            : 'NO SE PUEDE DIVIDIR SOBRE CERO';
        default:
          //error
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    } else if (numero == 3) {
      //boolean
      //error
      return new NodoErrores(
        'SEMANTICO',
        'TIPO DE DATO NO PERMITIDO',
        this.fila,
        this.columna
      );
    } else if (numero == 4) {
      //cadena
      //error
      return new NodoErrores(
        'SEMANTICO',
        'TIPO DE DATO NO PERMITIDO',
        this.fila,
        this.columna
      );
    } else if (numero == 5) {
      //caracter
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da1 = izq + '';
          var res1 = da1.charCodeAt(0);
          return der != 0
            ? res1 / parseInt(der)
            : 'NO SE PUEDE DIVIDIR SOBRE CERO';
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          var da1 = izq + '';
          var res1 = da1.charCodeAt(0);
          return der != 0
            ? res1 / parseFloat(der)
            : 'NO SE PUEDE DIVIDIR SOBRE CERO';
        default:
          //error semantico
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    }
  }
  
  /*----------------------------------------------------------MODULACION------------------------------------------------- */
  private operador1Mod(izq: any, der: any) {
    let op1 = this.operando1?.tipoDato.getTipo();
    let op2 = this.operando2?.tipoDato.getTipo();
    switch (
      op1 //operador 1
    ) {
      case tipoDato.ENTERO:
        return this.op2Mod(1, op2, izq, der);
      case tipoDato.DECIMAL:
        return this.op2Mod(2, op2, izq, der);
      case tipoDato.BOOLEANO:
        return this.op2Mod(3, op2, izq, der);
      case tipoDato.CADENA:
        return this.op2Mod(4, op2, izq, der);
      case tipoDato.CARACTER:
        return this.op2Mod(5, op2, izq, der);
    }
  }
  private op2Mod(numero: number, op2: any, izq: any, der: any) {
    if (numero == 1) {
      //entero
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna entero
          this.tipoDato = new Tipo(tipoDato.ENTERO);
          return parseInt(izq) % parseInt(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) % parseFloat(der);
        default:
          //error
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    } else if (numero == 2) {
      //decimal
      switch (
        op2 //OPERADOR 2
      ) {
        case tipoDato.ENTERO: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) % parseFloat(der);
        case tipoDato.DECIMAL: //retorna decimal
          this.tipoDato = new Tipo(tipoDato.DECIMAL);
          return parseFloat(izq) % parseFloat(der);
        default:
          //error
          return new NodoErrores(
            'SEMANTICO',
            'TIPO DE DATO NO PERMITIDO',
            this.fila,
            this.columna
          );
      }
    } else if (numero == 3) {
      //boolean
      //error
      return new NodoErrores(
        'SEMANTICO',
        'TIPO DE DATO NO PERMITIDO',
        this.fila,
        this.columna
      );
    } else if (numero == 4) {
      //cadena
      //error
      return new NodoErrores(
        'SEMANTICO',
        'TIPO DE DATO NO PERMITIDO',
        this.fila,
        this.columna
      );
    } else if (numero == 5) {
      //caracter
      //error
      return new NodoErrores(
        'SEMANTICO',
        'TIPO DE DATO NO PERMITIDO',
        this.fila,
        this.columna
      );
    }
  }
}
export enum Operadores {
  SUMA,
  RESTA,
  MULTIPLICACION,
  DIVISION,
  POTENCIA,
  MODULADOR,
  MENOSNUM,
}
