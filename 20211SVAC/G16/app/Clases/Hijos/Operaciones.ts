import { Operador } from './TipoOperacion.js';
import Entorno from '../AST/Entorno';
import { Expresion } from './../Interfaces/Expresion';

export class Operacion implements Expresion{

  tipo:Operador;
  operador1:any;
  operador2:any;

  constructor(tipo:Operador,operador1:any,operador2:any) {
    this.tipo=tipo;
    this.operador1=operador1;
    this.operador2=operador2;
  }
  ejecutar(Entorno: Entorno, node:any) {
    console.log("Pasó por operación")
    let op1=this.operador1.ejecutar(Entorno,this.operador1);
    let op2=this.operador2.ejecutar(Entorno,this.operador2);
    if(op1==null && op2==null){
      return null
    }
    switch(this.tipo){
      case Operador.TO:
        try{
          Number(op1);
          Number(op2);
          let array=[]
          console.log(op1)
          if(op1<op2){
            while(op1<=op2){
              array.push(op1);
              op1=op1+1;
            }
            return array
          }else{
            console.log("el operador 1 debe ser mayor al segundo")
          }
        }catch(Error){
          console.log("Solo números we")
        }
        break;
      case Operador.SUMA:
        return op1+op2;
      case Operador.RESTA:
        try{
          Number(op1);
          Number(op2);
          return op1-op2;
        }catch(Error){
          console.log("Solo números we")
        }
        break;
      case Operador.MULTIPLICACION:
        try{
          Number(op1);
          Number(op2);
          return op1*op2;
        }catch(Error){
          console.log("Solo números we")
        }
        break;
      case Operador.DIVISION:
        try{
          Number(op1);
          Number(op2);
          if(op2==0){
           // error semántico, división por 0
           return null
          }
          return op1/op2;
        }catch(Error){
          console.log("Solo números we")
        }
        break;
      case Operador.MODAL:
        try{
          Number(op1);
          Number(op2);
          return op1%op2;
        }catch(Error){
          console.log("Solo números we")
        }
        break;
      case Operador.AND:
        console.log(op1+"and"+op2);
        if(op1 && op2){
          return true
        }
        return false
      case Operador.OR:
        if(op1 || op2){
          return true
        }
        return false
      case Operador.DIFERENTE:
        if(op1!=op2){
          return true
        }
        return false
      case Operador.IGUAL:
       console.log(op1+"="+op2);
        if(op1==op2){
          return true
        }
        return false
      case Operador.IGUALU:
        break;
      case Operador.DIFERENTEU:

        break;
      case Operador.MAYOR:
        if(op1>op2){
          return true
        }
        return false
      case Operador.MAYORI:
        if(op1>=op2){
          return true
        }
        return false
      case Operador.MAYORU:
        break;
      case Operador.MAYORIU:
        break;
      case Operador.MENOR:
        if(op1<op2){
          return true
        }
        return false

      case Operador.MENORI:
        if(op1<=op2){
          return true
        }
        return false
      case Operador.MENORU:
        break;
      case Operador.MENORIU:
        break;


    }
    return null;
  }




}
