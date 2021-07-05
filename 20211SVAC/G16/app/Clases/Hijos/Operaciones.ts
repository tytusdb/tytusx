import { XPath } from './XPath.js';
import { Operador } from './TipoOperacion.js';
import Entorno from '../AST/Entorno';
import { Expresion } from './../Interfaces/Expresion';
import Objeto from '../Models/Objeto.js';

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
    console.log(node)
    let op1=this.operador1.ejecutar(Entorno,node);
    let op2=this.operador2.ejecutar(Entorno,node);
    if(node!=undefined){
      if(op1.etiqueta!=undefined){
       let cadena= node+"["+op1.etiqueta+this.getTipo(this.tipo)+op2+"]"
       let nuevo=new XPath(cadena);
       nuevo.ejecutar(Entorno,node);
       if(nuevo.padre!=null){
         Entorno.setVariable(this.operador1.valor,{xpath:nuevo.padre});
       }
       if(nuevo.padre.length==1){
         return {xpath:nuevo.padre[0]}
       }
       return {xpath:nuevo.padre};
      }else if(op2.etiqueta!=undefined){
        let cadena= node+"["+op1+this.getTipo(this.tipo)+op2.etiqueta+"]"
        let nuevo=new XPath(cadena);
        nuevo.ejecutar(Entorno,node);
        if(nuevo.padre!=null){
          console.log(nuevo.padre)
          Entorno.setVariable(this.operador2.valor,{xpath:nuevo.padre});
        }
        if(nuevo.padre.length==1){
          return {xpath:nuevo.padre[0]}
        }
        return {xpath:nuevo.padre}
      }
    }

    if(op1==null && op2==null){
      return null
    }
    switch(this.tipo){
      case Operador.TO:
        try{

            Number(op1);
            Number(op2);


          let array=[]
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

        }
        break;
      case Operador.SUMA:
        let arreglito=[]

        if(op1.length!=undefined && this.operador1.tipo!=0 && op2.length!=undefined &&
          this.operador2.tipo!=0){
            for (let index = 0; index < op1.length; index++) {
              const element = op1[index];
              arreglito.push(element+op2[index])
            }
        }else if(op1.length!=undefined && this.operador1.tipo!=0){
          for (let index = 0; index < op1.length; index++) {
            const element = op1[index];
            arreglito.push(element+op2)
          }
          return arreglito
        }else if (op2.length!=undefined && this.operador2.tipo!=0){
          for (let index = 0; index < op2.length; index++) {
            const element = op2[index];
            arreglito.push(op1+element)
          }
          return arreglito
        }

        return op1+op2;
      case Operador.RESTA:
        try{
          let arreglito=[]
          if(op1.length!=undefined){
            for (let index = 0; index < op1.length; index++) {
              const element = op1[index];
              arreglito.push(element-op2)
            }
            return arreglito
          }else if (op2.length!=undefined){
            for (let index = 0; index < op2.length; index++) {
              const element = op2[index];
              arreglito.push(op1-element)
            }
            return arreglito
          }
          Number(op1);
          Number(op2);
          return op1-op2;
        }catch(Error){
          console.log("Solo números we")
        }
        break;
      case Operador.MULTIPLICACION:
        try{
          let arreglito=[]
          if(op1.length!=undefined){
            for (let index = 0; index < op1.length; index++) {
              const element = op1[index];
              arreglito.push(element*op2)
            }
            return arreglito
          }else if (op2.length!=undefined){
            for (let index = 0; index < op2.length; index++) {
              const element = op2[index];
              arreglito.push(op1*element)
            }
            return arreglito
          }
          Number(op1);
          Number(op2);
          return op1*op2;
        }catch(Error){
          console.log("Solo números we")
        }
        break;
      case Operador.DIVISION:
        try{
          let arreglito=[]
          if(op1.length!=undefined){
            Number(op2);
            if(op2==0){
              // error semántico, división por 0
              return null
             }
            for (let index = 0; index < op1.length; index++) {
              const element = Number(op1[index]);
              arreglito.push(element/op2)
            }
            return arreglito
          }else if (op2.length!=undefined){
            Number(op1)
            for (let index = 0; index < op2.length; index++) {
              const element = Number(op2[index]);
              if(element==0){
                // error semántico, división por 0
                return null
               }
              arreglito.push(op1/element)
            }
            return arreglito
          }
          Number(op1);
          Number(op2);
          return op1/op2;
        }catch(Error){
          console.log("Solo números we")
        }
        break;
      case Operador.MODAL:
        try{
          let arreglito=[]
          if(op1.length!=undefined){
            Number(op2);
            if(op2==0){
              // error semántico, división por 0
              return null
             }
            for (let index = 0; index < op1.length; index++) {
              const element = Number(op1[index]);
              arreglito.push(element%op2)
            }
            return arreglito
          }else if (op2.length!=undefined){
            Number(op1)
            for (let index = 0; index < op2.length; index++) {
              const element = Number(op2[index]);
              if(element==0){
                // error semántico, división por 0
                return null
               }
              arreglito.push(op1%element)
            }
            return arreglito
          }
          Number(op1);
          Number(op2);
          return op1%op2;
        }catch(Error){
          console.log("Solo números we")
        }
        break;
      case Operador.AND:

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
        if(op1 instanceof Array){
          let retorno=[]
         op1.forEach(elemento=>{
           if(elemento instanceof Objeto){
             let valor;
             try{
               valor=Number(elemento.texto)
             }catch(Error){
               valor=elemento.texto
             }
             if(valor!=op2){
                retorno.push(elemento)
             }
           }
         });
         return retorno
        }else if(op2 instanceof Array){
          let retorno=[]
          op2.forEach(elemento=>{
            if(elemento instanceof Objeto){
              let valor;
              try{
                valor=Number(elemento.texto)
              }catch(Error){
                valor=elemento.texto
              }
              if(valor!=op1){
                 retorno.push(elemento)
              }
            }
          });
          return retorno
        }

        if(op1!=op2){
          return true
        }
        return false
      case Operador.IGUAL:
        if(op1 instanceof Array){
          let retorno=[]
         op1.forEach(elemento=>{
           if(elemento instanceof Objeto){
             let valor;
             try{
               valor=Number(elemento.texto)
             }catch(Error){
               valor=elemento.texto
             }
             if(valor==op2){
                retorno.push(elemento)
             }
           }
         });
         return retorno
        }else if(op2 instanceof Array){
          let retorno=[]
          op2.forEach(elemento=>{
            if(elemento instanceof Objeto){
              let valor;
              try{
                valor=Number(elemento.texto)
              }catch(Error){
                valor=elemento.texto
              }
              if(valor==op1){
                 retorno.push(elemento)
              }
            }
          });
          return retorno
        }
        if(op1==op2){
          return true
        }
        return false
      case Operador.IGUALU:
        if(op1 instanceof Array){
          let bandera=false;
          let retorno=[]
         op1.forEach(elemento=>{
           if(elemento instanceof Objeto){
             let valor;
             try{
               valor=Number(elemento.texto)
             }catch(Error){
               valor=elemento.texto
             }
             if(valor==op2 && !bandera){
                retorno.push(elemento)
                bandera=true;
             }else if(bandera && valor==op2){
               // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
               return null
             }
           }
         });
         return retorno
        }else if(op2 instanceof Array){
          let bandera=false;
          let retorno=[]
          op2.forEach(elemento=>{
            if(elemento instanceof Objeto){
              let valor;
              try{
                valor=Number(elemento.texto)
              }catch(Error){
                valor=elemento.texto
              }
              if(valor==op1 && !bandera ){
                 retorno.push(elemento)
                 bandera=true;
              }else if(bandera && valor==op1){
                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                return null
              }
            }
          });
          return retorno
        }
      break;
      case Operador.DIFERENTEU:
        if(op1 instanceof Array){
          let bandera=false;
          let retorno=[]
         op1.forEach(elemento=>{
           if(elemento instanceof Objeto){
             let valor;
             try{
               valor=Number(elemento.texto)
             }catch(Error){
               valor=elemento.texto
             }
             if(valor!=op2 && !bandera){
                retorno.push(elemento)
                bandera=true;
             }else if(bandera && valor!=op2){
               // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
               return null
             }
           }
         });
         return retorno
        }else if(op2 instanceof Array){
          let bandera=false;
          let retorno=[]
          op2.forEach(elemento=>{
            if(elemento instanceof Objeto){
              let valor;
              try{
                valor=Number(elemento.texto)
              }catch(Error){
                valor=elemento.texto
              }
              if(valor!=op1 && !bandera ){
                 retorno.push(elemento)
                 bandera=true;
              }else if(bandera && valor!=op1){
                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                return null
              }
            }
          });
          return retorno
        }
        break;
      case Operador.MAYOR:
        console.log("ESTÁ EN MAYOR QUÉ")
        console.log(Array.isArray(op1))
        if(Array.isArray(op1)){
          let retorno=[]
         op1.forEach(elemento=>{
           if(elemento.texto!=undefined){
             let valor;
             try{
               valor=Number(elemento.texto)
             }catch(Error){
               valor=elemento.texto
             }
             if(valor>op2){
                retorno.push(elemento)
             }
           }
         });
         return retorno
        }else if(op2 instanceof Array){
          let retorno=[]
          op2.forEach(elemento=>{
            if(elemento.texto!=undefined){
              let valor;
              try{
                valor=Number(elemento.texto)
              }catch(Error){
                valor=elemento.texto
              }
              if(op1>valor){
                 retorno.push(elemento)
              }
            }
          });
          return retorno
        }
        if(op1>op2){
          return true
        }
        return false
      case Operador.MAYORI:
        if(op1 instanceof Array){
          let retorno=[]
         op1.forEach(elemento=>{
           if(elemento instanceof Objeto){
             let valor;
             try{
               valor=Number(elemento.texto)
             }catch(Error){
               valor=elemento.texto
             }
             if(valor>=op2){
                retorno.push(elemento)
             }
           }
         });
         return retorno
        }else if(op2 instanceof Array){
          let retorno=[]
          op2.forEach(elemento=>{
            if(elemento instanceof Objeto){
              let valor;
              try{
                valor=Number(elemento.texto)
              }catch(Error){
                valor=elemento.texto
              }
              if(op1>=valor){
                 retorno.push(elemento)
              }
            }
          });
          return retorno
        }
        if(op1>=op2){
          return true
        }
        return false
      case Operador.MAYORU:
        if(op1 instanceof Array){
          let bandera=false;
          let retorno=[]
         op1.forEach(elemento=>{
           if(elemento instanceof Objeto){
             let valor;
             try{
               valor=Number(elemento.texto)
             }catch(Error){
               valor=elemento.texto
             }
             if(valor>op2 && !bandera){
                retorno.push(elemento)
                bandera=true;
             }else if(bandera && valor>op2){
               // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
               return null
             }
           }
         });
         return retorno
        }else if(op2 instanceof Array){
          let bandera=false;
          let retorno=[]
          op2.forEach(elemento=>{
            if(elemento instanceof Objeto){
              let valor;
              try{
                valor=Number(elemento.texto)
              }catch(Error){
                valor=elemento.texto
              }
              if(op1>valor && !bandera ){
                 retorno.push(elemento)
                 bandera=true;
              }else if(bandera && op1>valor){
                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                return null
              }
            }
          });
          return retorno
        }
        break;
      case Operador.MAYORIU:
        if(op1 instanceof Array){
          let bandera=false;
          let retorno=[]
         op1.forEach(elemento=>{
           if(elemento instanceof Objeto){
             let valor;
             try{
               valor=Number(elemento.texto)
             }catch(Error){
               valor=elemento.texto
             }
             if(valor>=op2 && !bandera){
                retorno.push(elemento)
                bandera=true;
             }else if(bandera && valor>=op2){
               // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
               return null
             }
           }
         });
         return retorno
        }else if(op2 instanceof Array){
          let bandera=false;
          let retorno=[]
          op2.forEach(elemento=>{
            if(elemento instanceof Objeto){
              let valor;
              try{
                valor=Number(elemento.texto)
              }catch(Error){
                valor=elemento.texto
              }
              if(op1>=valor && !bandera ){
                 retorno.push(elemento)
                 bandera=true;
              }else if(bandera && op1>=valor){
                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                return null
              }
            }
          });
          return retorno
        }
        break;
      case Operador.MENOR:
        if(op1 instanceof Array){
          let retorno=[]
         op1.forEach(elemento=>{
           if(elemento instanceof Objeto){
             let valor;
             try{
               valor=Number(elemento.texto)
             }catch(Error){
               valor=elemento.texto
             }
             if(valor<op2){
                retorno.push(elemento)
             }
           }
         });
         return retorno
        }else if(op2 instanceof Array){
          let retorno=[]
          op2.forEach(elemento=>{
            if(elemento instanceof Objeto){
              let valor;
              try{
                valor=Number(elemento.texto)
              }catch(Error){
                valor=elemento.texto
              }
              if(op1<valor){
                 retorno.push(elemento)
              }
            }
          });
          return retorno
        }
        if(op1<op2){
          return true
        }
        return false

      case Operador.MENORI:
        if(op1 instanceof Array){
          let retorno=[]
         op1.forEach(elemento=>{
           if(elemento instanceof Objeto){
             let valor;
             try{
               valor=Number(elemento.texto)
             }catch(Error){
               valor=elemento.texto
             }
             if(valor<=op2){
                retorno.push(elemento)
             }
           }
         });
         return retorno
        }else if(op2 instanceof Array){
          let retorno=[]
          op2.forEach(elemento=>{
            if(elemento instanceof Objeto){
              let valor;
              try{
                valor=Number(elemento.texto)
              }catch(Error){
                valor=elemento.texto
              }
              if(op1<=valor){
                 retorno.push(elemento)
              }
            }
          });
          return retorno
        }
        if(op1<=op2){
          return true
        }
        return false
      case Operador.MENORU:
        if(op1 instanceof Array){
          let bandera=false;
          let retorno=[]
         op1.forEach(elemento=>{
           if(elemento instanceof Objeto){
             let valor;
             try{
               valor=Number(elemento.texto)
             }catch(Error){
               valor=elemento.texto
             }
             if(valor<op2 && !bandera){
                retorno.push(elemento)
                bandera=true;
             }else if(bandera && valor<op2){
               // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
               return null
             }
           }
         });
         return retorno
        }else if(op2 instanceof Array){
          let bandera=false;
          let retorno=[]
          op2.forEach(elemento=>{
            if(elemento instanceof Objeto){
              let valor;
              try{
                valor=Number(elemento.texto)
              }catch(Error){
                valor=elemento.texto
              }
              if(op1<valor && !bandera ){
                 retorno.push(elemento)
                 bandera=true;
              }else if(bandera && op1<valor){
                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                return null
              }
            }
          });
          return retorno
        }
        break;
      case Operador.MENORIU:
        if(op1 instanceof Array){
          let bandera=false;
          let retorno=[]
         op1.forEach(elemento=>{
           if(elemento instanceof Objeto){
             let valor;
             try{
               valor=Number(elemento.texto)
             }catch(Error){
               valor=elemento.texto
             }
             if(valor<=op2 && !bandera){
                retorno.push(elemento)
                bandera=true;
             }else if(bandera && valor<=op2){
               // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
               return null
             }
           }
         });
         return retorno
        }else if(op2 instanceof Array){
          let bandera=false;
          let retorno=[]
          op2.forEach(elemento=>{
            if(elemento instanceof Objeto){
              let valor;
              try{
                valor=Number(elemento.texto)
              }catch(Error){
                valor=elemento.texto
              }
              if(op1<=valor && !bandera ){
                 retorno.push(elemento)
                 bandera=true;
              }else if(bandera && op1<=valor){
                // SIGNIFICA QUE HAY MÁS IGUALES, MATCH ERROR
                return null
              }
            }
          });
          return retorno
        }
        break;


    }
    return null;
  }

 getTipo(tipo:Operador):string{
    switch(tipo){
      case Operador.RESTA:
        return "-"
      case Operador.SUMA:
        return "+"
      case Operador.MULTIPLICACION:
        return "*"
      case Operador.DIVISION:
        return "div"
      case Operador.MODAL:
        return "%"
      case Operador.OR:
        return "or"
      case Operador.AND:
        return "and"
      case Operador.MAYOR:
        return ">"
      case Operador.MENOR:
        return "<"
      case Operador.MAYORI:
        return ">="
      case Operador.MENORI:
        return "<="
      case Operador.MAYORU:
        return "gt"
      case Operador.MAYORIU:
        return "ge"
      case Operador.MENORU:
        return "lt"
      case Operador.MENORIU:
        return "le"
      case Operador.IGUALU:
        return "eq"
      case Operador.DIFERENTEU:
        return "ne"

    }
    return "F"
  }


}
