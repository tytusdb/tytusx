import { Errores } from '../arbol/errores';
import { Error } from '../arbol/error';
import { Salida } from '../arbol/salida';
import { Entorno } from './entorno';
import * as _ from 'lodash';
import { Entornos } from './entornos';
import { Etiqueta } from './etiqueta';
import { Atributo } from './atributo';
import { Expresion } from './Expresion/Expresion'
import { TIPO_DATO } from './Expresion/Tipo';
import { salidaXPATH } from '../ejecucion/salidaXPATH';
export class Ejecucion {
  raiz: Object;
  raiz2:Object;
  raizXML: Object;
  contador: number;
  contador2: number;
  contadorxml: number=0;
  dot: string;
  dot2: string;
  dotXML: string;
  CODIGO:string;
  ArrayEtiquetas = new Array<Etiqueta>();
  objetoActual: Etiqueta;
  atributoActual: Etiqueta;
  inicioRaiz: boolean;
  controladorAtributoImpresion: boolean;
  atributoID: string;
  contadorConsola: number;
  arrayPosicionPadres = new Array<number>();
  auxiliarArrayPosicionPadres: number;
  inicioPadre: number;
  pathCompleto: boolean;
  consolaSalidaXPATH = new Array<Etiqueta>();
  controladorDobleSimple: boolean; //FALSE = SIMPLE , TRUE = DOBLE 
  auxiliarEtiquetaResolverExpresion = null;
  controladorPredicado = false;
  controladorPredicadoInicio = false;
  controladorText = false;
 // arrayPosicionPadres = new Array<number>();
  //consolaSalidaXPATH = new Array<Etiqueta>();
  //auxiliarEtiquetaResolverExpresion = new Array<Etiqueta>();
  auxiliarAxe = "";
  dobleSimpleAxe = false;
  controladorAncestor = false;
  arrayAncestor = new Array<Etiqueta>();
  padresDobleAcceso = new Array<Etiqueta>();

  constructor(raiz: Object, raizXML:Object, raiz2:Object) {
       
    this.raiz=raiz;
    this.raiz2=raiz2;
    this.raizXML=raizXML;
    this.contador=this.contadorxml=0;
    this.contador2=0;
    this.dot=this.dotXML='';
    this.dot2='';
    this.objetoActual = null;
    this.atributoActual = null;
    this.inicioRaiz = false;
    this.controladorDobleSimple = false;
    this.controladorAtributoImpresion = false;
    this.atributoID = '';
    this.contadorConsola = 0;
    this.arrayPosicionPadres.push(this.contadorConsola);
    this.auxiliarArrayPosicionPadres = -1;
    this.inicioPadre = 0;
    this.pathCompleto = true;
    this.auxiliarEtiquetaResolverExpresion = null;
    this.controladorPredicado = false;
    this.controladorPredicadoInicio = false;
    this.controladorText = false;
    this.auxiliarAxe = "";
    this.dobleSimpleAxe = false;
    this.controladorAncestor = false;
    
    
  }

  getDot(): string {
    this.contador = 0;
    this.dot = "digraph G {\n";
    if (this.raiz != null) {
      this.generacionDot(this.raiz);
    }
    this.dot += "\n}";
    return this.dot;
  }

  generacionDot(nodo: any): void {
    if (nodo instanceof Object) {
      let idPadre = this.contador;
      this.dot += `node${idPadre}[label="${this.getStringValue(nodo.label)}"];\n`;
      if (nodo.hasOwnProperty("hijos")) {
        nodo.hijos.forEach((nodoHijo: any) => {
          let idHijo = ++this.contador;
          this.dot += `node${idPadre} -> node${idHijo};\n`;
          if (nodoHijo instanceof Object) {
            this.generacionDot(nodoHijo);
          } else {
            this.dot += `node${idHijo}[label="${this.getStringValue(nodoHijo)}"];`;
          }
        });
      }
    }
  }

  getStringValue(label: string): string {
    return label.replace(/[\n\"\'\`]+/g,"");
  }


  getDotXML(): string {
    this.contadorxml = 0;
    this.dotXML = "digraph G {\n";
    if (this.raizXML != null) {
      this.generacionDotXML(this.raizXML);
    }
    this.dotXML += "\n}";
    console.log(this.dotXML);
    return this.dotXML;
  }

  generacionDotXML(nodo: any): void {
    if (nodo instanceof Object) {
      let idPadre = this.contadorxml;
      this.dotXML += `node${idPadre}[label="${this.getStringValue(nodo.label)}"];\n`;
      if (nodo.hasOwnProperty("hijos")) {
        nodo.hijos.forEach((nodoHijo: any) => {
          let idHijo = ++this.contadorxml;
          this.dotXML += `node${idPadre} -> node${idHijo};\n`;
          if (nodoHijo instanceof Object) {
            this.generacionDotXML(nodoHijo);
          } else {
            this.dotXML += `node${idHijo}[label="${this.getStringValue(nodoHijo)}"];`;
          }
        });
      }
    }
  }

  getDot2(): string {
    this.contador2 = 0;
    this.dot2 = "digraph G {\n";
    if (this.raiz2 != null) {
      this.generacionDot2(this.raiz2);
    }
    this.dot2 += "\n}";
    return this.dot2;
  }

  generacionDot2(nodo: any): void {
    if (nodo instanceof Object) {
      let idPadre = this.contador2;
      this.dot2 += `node${idPadre}[label="${this.getStringValue(nodo.label)}"];\n`;
      if (nodo.hasOwnProperty("hijos")) {
        nodo.hijos.forEach((nodoHijo: any) => {
          let idHijo = ++this.contador2;
          this.dot2 += `node${idPadre} -> node${idHijo};\n`;
          if (nodoHijo instanceof Object) {
            this.generacionDot2(nodoHijo);
          } else {
            this.dot2 += `node${idHijo}[label="${this.getStringValue(nodoHijo)}"];`;
          }
        });
      }
    }
  }

  ejecutar(): void {
    
    
    const instrucciones = this.recorrerXML(this.raizXML);
    
    if (instrucciones instanceof Array) {      
      
      const entorno = new Entorno();
      Salida.getInstance().clear();
      instrucciones.forEach(element => {
        
        entorno.setEtiqueta(element);
        this.ArrayEtiquetas.push(element);
      });

      Entornos.getInstance().push(entorno);
    }

    //EDVIN AQUI PONE TU CODIGO DE EJECUTAR
    //this.recorrerExpresion(this.raiz); //<--Use esto para probar el resolverExpresion, pero no sirve para nada
    //Para utilizar el resolverExpresion solo hacer ResolverExpresion(Nodo) con el nodo que querras resolver
    //Retorna un objeto de tipo Expresion con tipo(string, number, bool) y su valor
    /*ACA EMPIEZA LA EJECUCION DE LA CONSULTA DE XPATH
    */
    
    this.recorrerArbolConsulta(this.raiz);
  }

  getSalida(): String[] {
    return Salida.getInstance().lista;
  }

  

  imprimirErrores(): void {
    if (Errores.getInstance().hasErrors()) {
      Errores.getInstance().getErrors().forEach((error: Error) => {
        console.log(error.descripcion);
      });
    }
  }

  //EDVIN
  /*
  
  AQUI FALTA EL METODO RECORRER, ESE LO AGREGAS DE TU CODIGO
  
  */ 

  recorrerXML(nodo: any): any {
    //S
    if (this.soyNodo('/', nodo)) {
      
      return this.recorrerXML(nodo.hijos[0]);
    }

    if(this.soyNodo('OBJETOS', nodo)){
      let etiquetas = new Array<Etiqueta>();
      nodo.hijos.forEach((nodoHijo: any) => {
        if (this.soyNodo('OBJETO', nodoHijo)) {
          //this.recorrer(nodoHijo);
          
          let NuevaEtiqueta = this.recorrerXML(nodoHijo);
          etiquetas.push(NuevaEtiqueta);

        }else if(this.soyNodo('COD',nodoHijo)){
          this.CODIGO = nodoHijo.hijos[0];
        }
      });

      return etiquetas;
      
    }

    if (this.soyNodo('TEXTO',nodo)){
      if (this.soyNodo('TEXTO',nodo)){
        return nodo.hijos[0].hijos[0];
      }
      return nodo.hijos[0];
    }

    if(this.soyNodo('COD', nodo)){
      this.CODIGO=nodo.hijos[0];
      //alert(this.CODIGO);
    }

    if (this.soyNodo('ATRIBUTO', nodo)){
      
      let tam = 0;
      let listaA = new Array<Atributo>();
      while(tam<nodo.hijos.length){
        let nuevo = new Atributo(nodo.hijos[tam], nodo.hijos[tam+1]);
        listaA.push(nuevo);
        tam+=2;
      }
      return listaA;
    }

    if(this.soyNodo('OBJETO', nodo)){
      
      let id = nodo.hijos[0].label;
      
      let atributos = new Array<Atributo>();
      let textoo="";
      let hijoEtiqueta = new Array<Etiqueta>();
      
      
      nodo.hijos[0].hijos.forEach((nodoHijo:any) => {
        
        if (this.soyNodo('ATRIBUTO', nodoHijo)){
          atributos = this.recorrerXML(nodoHijo);
        }else if (this.soyNodo('TEXTO', nodoHijo)){
          textoo += " "+this.recorrerXML(nodoHijo);
        }else if(this.soyNodo('OBJETO', nodoHijo)){
          let Nuevo = this.recorrerXML(nodoHijo);
          hijoEtiqueta.push(Nuevo);
        }
        
      });
      
      let NuevaEtiqueta = new Etiqueta(id, atributos, hijoEtiqueta, textoo);
      return NuevaEtiqueta;
    }

    
  }

  /**
   * Funcion para determinar si no tengo funciones anidadas
   * @param nodo
   */
  puedoEjecutar(nodo: any): boolean {

    //S
    if (this.soyNodo('S', nodo)) {
      for (let nodoHijo of nodo.hijos) {
        const resp = this.puedoEjecutar(nodoHijo);
        if (!resp) return false;
      }
    }

    //INSTRUCCIONES
    if (this.soyNodo('INSTRUCCIONES', nodo)) {
      for (let nodoHijo of nodo.hijos) {
        //Ejecuto solo los nodos que sean DECLARACION_FUNCION
        if (this.soyNodo('DECLARACION_FUNCION', nodoHijo)) {
          const res = this.puedoEjecutar(nodoHijo);
          if (!res) return false;
        }
      }
    }

    //DECLARACION_FUNCION
    if (this.soyNodo('DECLARACION_FUNCION', nodo)) {
      for (let nodoHijo of nodo.hijos) {
        //Si es el nodo INSTRUCCIONES
        if (this.soyNodo('INSTRUCCIONES', nodoHijo)) {
          for (let nodoInst of nodoHijo.hijos) {
            if (this.soyNodo('DECLARACION_FUNCION', nodoInst)) {
              return false;
            }
          }
        }
      }
    }

    return true;
  }

  /**
   * Funcion para determinar en que tipo de nodo estoy
   * @param label
   * @param nodo
   */
  soyNodo(label: string, nodo: any): boolean {
    if (nodo == null || !(nodo instanceof Object)) {
      return false;
    }
    if (nodo.hasOwnProperty('label') && nodo.label != null) {
      return nodo.label === label;
    }
    return false;
  }

  resolverExpresion(nodo: any): Expresion{
    if (this.soyNodo('VAL', nodo)) {
      //Para verificar si lo que se va a examinar es una ruta o un elemento unicamente
      //Sí la cantidad de hijos es mayor a 1, significa que tenemos una ruta 
      if (nodo.hijos.length > 1||this.soyNodo('SIMPLE',nodo.hijos[0])||this.soyNodo('DOBLE',nodo.hijos[0])||this.soyNodo('identificador',nodo.hijos[0].hijos[0])||this.soyNodo('atributo',nodo.hijos[0].hijos[0]))
      {
        let instanciaResolverExpresion = new Ejecucion(nodo,this.raizXML,null);
        //instanciaResolverExpresion.ArrayEtiquetas = this.ArrayEtiquetas;
        //instanciaResolverExpresion.ejExp();
        for (var i = this.contadorConsola; i < this.consolaSalidaXPATH.length; i++) {
          instanciaResolverExpresion.ArrayEtiquetas.push(this.consolaSalidaXPATH[i]);
         // salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameID());

        }
        instanciaResolverExpresion.recorrerArbolConsulta(instanciaResolverExpresion.raiz);
      /*  let arrayRetorno = new Array<Etiqueta>();
        for (var i = instanciaResolverExpresion.contadorConsola; i < instanciaResolverExpresion.consolaSalidaXPATH.length - 1;i++)
        {
          arrayRetorno.push(instanciaResolverExpresion.consolaSalidaXPATH[i]);
        }*/
        
        return new Expresion({tipo_:TIPO_DATO.ETIQUETA,valor_:instanciaResolverExpresion});
      }
        
      
      return this.resolverExpresion(nodo.hijos[0]);
    }
    if (this.soyNodo('X', nodo)) {
      return this.resolverExpresion(nodo.hijos[0]);
    }
    if (this.soyNodo('E', nodo)) {
      return this.resolverExpresion(nodo.hijos[0]);
    }
    if (this.soyNodo('entero', nodo)) {
      var valor_=Number(nodo.hijos[0]);
      return new Expresion({tipo_:TIPO_DATO.NUMBER,valor_:valor_});
    }
    if (this.soyNodo('string_s', nodo)) {
      let valor_ = nodo.hijos[0].toString();
      var result = valor_.substring(1, valor_.length-1);
      return new Expresion({tipo_:TIPO_DATO.STRING,valor_:result});
    }
    if (this.soyNodo('string_d', nodo)) {
      let valor_ = nodo.hijos[0].toString();
      var result = valor_.substring(1, valor_.length-1);
      return new Expresion({tipo_:TIPO_DATO.STRING,valor_:result});
    }
    if (this.soyNodo('last', nodo)) {
      let valor_ = (this.consolaSalidaXPATH.length) - this.contadorConsola;
      return new Expresion({tipo_:TIPO_DATO.NUMBER,valor_:valor_});
    }


    //NEGATIVO
    else if (this.soyNodo('negativo', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      
      //numero:
      if (expresion1.tipo==1){
        let a1=Number(expresion1.valor.toString());
        let valor_=a1*-1;
        return new Expresion({tipo_:TIPO_DATO.NUMBER,valor_:valor_});
      }
      //erroror
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar -'+this.obtenerTipo_string(expresion1)),
        })
      );
    }//FIN DE negativo

    //SUMA +
    if (this.soyNodo('+', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      let expresion2=this.resolverExpresion(nodo.hijos[1]);
      
      //Si el nodo1 es numero:
      if (expresion1.tipo==1){
        let a1=Number(expresion1.valor.toString());
        //Si el nodo2 es numero:
        if (expresion2.tipo==1){
          let a2=Number(expresion2.valor.toString());
          let valor_=a1+a2;
          return new Expresion({tipo_:TIPO_DATO.NUMBER,valor_:valor_});
        }
        //numero + cadena
        else if (expresion2.tipo==2){
          let a1=(expresion1.valor.toString());          
          let b0=expresion2.valor.toString();
          
          let valor_=a1.concat(b0);
          return new Expresion({tipo_:TIPO_DATO.STRING,valor_:valor_});
        }
      }

      //Si nodo1 es cadena
      else if(expresion1.tipo==2){
        let a1=expresion1.valor.toString();
        //Si el nodo2 es numero:
        if (expresion2.tipo==1){
          let b1=expresion2.valor.toString();
          
          let valor_=a1.concat(b1);
          return new Expresion({tipo_:TIPO_DATO.STRING,valor_:valor_});
        }
        //Si a2 es string
        else if (expresion2.tipo==2){
          let b1=expresion2.valor.toString();
          
          let valor_=a1.concat(b1);
          return new Expresion({tipo_:TIPO_DATO.STRING,valor_:valor_});
        }
        
        //Si string + bool
        else if (expresion2.tipo==3){
          let b1=expresion2.valor.toString();
          
          let valor_=a1.concat(b1);
          return new Expresion({tipo_:TIPO_DATO.STRING,valor_:valor_});
        }
      }

      else if(expresion1.tipo==3){
        let a1=expresion1.valor.toString();
        //bool + string 
        if (expresion2.tipo==2){
          let b1=expresion2.valor.toString();
          
          let valor_=a1.concat(b1);
          return new Expresion({tipo_:TIPO_DATO.STRING,valor_:valor_});
        }
      }
      //ErrorSUMA
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar '+this.obtenerTipo_string(expresion1)+" + "+this.obtenerTipo_string(expresion2)),
        })
      );
    }//FIN DE LA SUMA

    //RESTA -
    else if (this.soyNodo('-', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      let expresion2=this.resolverExpresion(nodo.hijos[1]);
      
      //Si el nodo1 es numero:
      if (expresion1.tipo==1){
        let a1=Number(expresion1.valor.toString());
        //Si el nodo2 es numero:
        if (expresion2.tipo==1){
          let a2=Number(expresion2.valor.toString());
          let valor_=a1-a2;
          return new Expresion({tipo_:TIPO_DATO.NUMBER,valor_:valor_});
        }
      }
      //ErrorRESTA
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar '+this.obtenerTipo_string(expresion1)+" - "+this.obtenerTipo_string(expresion2)),
        })
      );
    }//FIN DE LA RESTA

    //MULTIPLICACION
    else if (this.soyNodo('*', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      let expresion2=this.resolverExpresion(nodo.hijos[1]);
      
      //Si el nodo1 es numero:
      if (expresion1.tipo==1){
        let a1=Number(expresion1.valor.toString());
        //Si el nodo2 es numero:
        if (expresion2.tipo==1){
          let a2=Number(expresion2.valor.toString());
          let valor_=a1*a2;
          return new Expresion({tipo_:TIPO_DATO.NUMBER,valor_:valor_});
        }
        //numero * cadena
        else if (expresion2.tipo==2){
          let b0=expresion2.valor.toString();
          let b1="";
          for (var i=0;i<a1;i++){
            b1=b1.concat(b0);
          }
          let valor_=b1;
          return new Expresion({tipo_:TIPO_DATO.STRING,valor_:valor_});
        }
      }

      //Si el nodo1 es numero:
      if (expresion1.tipo==2){
        let a1=expresion1.valor.toString();
        //numero * cadena
        if (expresion2.tipo==1){
          let b0=Number(expresion2.valor.toString());
          let b1="";
          for (var i=0;i<b0;i++){
            b1=b1.concat(a1);
          }
          let valor_=b1;
          return new Expresion({tipo_:TIPO_DATO.STRING,valor_:valor_});
        }
      }
      //errorMulti
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar '+this.obtenerTipo_string(expresion1)+" * "+this.obtenerTipo_string(expresion2)),
        })
      );
    }//FIN DE LA MULTI

    //DIVISION
    else if (this.soyNodo('div', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      let expresion2=this.resolverExpresion(nodo.hijos[1]);
      
      //Si el nodo1 es numero:
      if (expresion1.tipo==1){
        let a1=Number(expresion1.valor.toString());
        //Si el nodo2 es numero:
        if (expresion2.tipo==1){
          let a2=Number(expresion2.valor.toString());
          let valor_=a1/a2;
          return new Expresion({tipo_:TIPO_DATO.NUMBER,valor_:valor_});
        }
      }
      //errorDivi
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar '+this.obtenerTipo_string(expresion1)+" / "+this.obtenerTipo_string(expresion2)),
        })
      );
    }//FIN DE LA DIvi

    //DIVISION
    else if (this.soyNodo('mod', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      let expresion2=this.resolverExpresion(nodo.hijos[1]);
      
      //Si el nodo1 es numero:
      if (expresion1.tipo==1){
        let a1=Number(expresion1.valor.toString());
        //Si el nodo2 es numero:
        if (expresion2.tipo==1){
          let a2=Number(expresion2.valor.toString());
          let valor_=a1%a2;
          return new Expresion({tipo_:TIPO_DATO.NUMBER,valor_:valor_});
        }
      }
      //errorMod
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar '+this.obtenerTipo_string(expresion1)+" mod "+this.obtenerTipo_string(expresion2)),
        })
      );
    }//FIN DE LA mod

    //mayorque
    else if (this.soyNodo('>', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      let expresion2=this.resolverExpresion(nodo.hijos[1]);
      
      //numero:
      if (expresion1.tipo==1){
        let a1=Number(expresion1.valor.toString());
        //numero > numero:
        if (expresion2.tipo==1){
          let a2=Number(expresion2.valor.toString());
          let valor_=a1 > a2;
          return new Expresion({tipo_:TIPO_DATO.BOOLEAN,valor_:valor_});
        }
      }
      //errormayor
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar '+this.obtenerTipo_string(expresion1)+" > "+this.obtenerTipo_string(expresion2)),
        })
      );
    }//FIN DE LA mayor

    //menorque
    else if (this.soyNodo('<', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      let expresion2=this.resolverExpresion(nodo.hijos[1]);
      
      //bool:
      if (expresion1.tipo==1){
        let a1=Number(expresion1.valor.toString());
        //bool and bool:
        if (expresion2.tipo==1){
          let a2=Number(expresion2.valor.toString());
          let valor_=a1 < a2;
          return new Expresion({tipo_:TIPO_DATO.BOOLEAN,valor_:valor_});
        }
      }
      //errormayor
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar '+this.obtenerTipo_string(expresion1)+" < "+this.obtenerTipo_string(expresion2)),
        })
      );
    }//FIN DE menor

    //mayor igual que
    else if (this.soyNodo('>=', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      let expresion2=this.resolverExpresion(nodo.hijos[1]);
      
      //bool:
      if (expresion1.tipo==1){
        let a1=Number(expresion1.valor.toString());
        //bool and bool:
        if (expresion2.tipo==1){
          let a2=Number(expresion2.valor.toString());
          let valor_=a1 >= a2;
          return new Expresion({tipo_:TIPO_DATO.BOOLEAN,valor_:valor_});
        }
      }
      //errormayor igual
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar '+this.obtenerTipo_string(expresion1)+" >= "+this.obtenerTipo_string(expresion2)),
        })
      );
    }//FIN DE mayor igual

    //menor igual que
    else if (this.soyNodo('<=', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      let expresion2=this.resolverExpresion(nodo.hijos[1]);
      
      //numero:
      if (expresion1.tipo==1){
        let a1=Number(expresion1.valor.toString());
        //numero <= numero:
        if (expresion2.tipo==1){
          let a2=Number(expresion2.valor.toString());
          let valor_=a1 <= a2;
          return new Expresion({tipo_:TIPO_DATO.BOOLEAN,valor_:valor_});
        }
      }
      //errormenor igual
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar '+this.obtenerTipo_string(expresion1)+" <= "+this.obtenerTipo_string(expresion2)),
        })
      );
    }//FIN DE menor igual
    
    //diferente que
    else if (this.soyNodo('!=', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      let expresion2=this.resolverExpresion(nodo.hijos[1]);
      
      //numero:
      if (expresion1.tipo==1){
        let a1=Number(expresion1.valor.toString());
        //numero = numero:
        if (expresion2.tipo==1){
          let a2=Number(expresion2.valor.toString());
          let valor_=a1 != a2;
          return new Expresion({tipo_:TIPO_DATO.BOOLEAN,valor_:valor_});
        }
      }
      //string:
      if (expresion1.tipo==2){
        let a1=(expresion1.valor.toString());
        //string = string
        if (expresion2.tipo==2){
          let a2=(expresion2.valor.toString());
          let valor_=a1 != a2;
          return new Expresion({tipo_:TIPO_DATO.BOOLEAN,valor_:valor_});
        }
      }
      //bool:
      if (expresion1.tipo==3){
        let a1=JSON.parse(expresion1.valor.toString());
        //bool = bool
        if (expresion2.tipo==3){
          let a2=JSON.parse(expresion2.valor.toString());
          let valor_=a1 != a2;
          return new Expresion({tipo_:TIPO_DATO.BOOLEAN,valor_:valor_});
        }
      }
      //errorigual
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar '+this.obtenerTipo_string(expresion1)+" != "+this.obtenerTipo_string(expresion2)),
        })
      );
    }//FIN DE  diferente

    //igual que
    else if (this.soyNodo('=', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      let expresion2=this.resolverExpresion(nodo.hijos[1]);
      
      //numero:
      if (expresion1.tipo==1){
        let a1=Number(expresion1.valor.toString());
        //numero = numero:
        if (expresion2.tipo==1){
          let a2=Number(expresion2.valor.toString());
          let valor_=a1 == a2;
          return new Expresion({tipo_:TIPO_DATO.BOOLEAN,valor_:valor_});
        }
      }
      //string:
      if (expresion1.tipo==2){
        let a1=(expresion1.valor.toString());
        //string = string
        if (expresion2.tipo==2){
          let a2=(expresion2.valor.toString());
          let valor_=a1 == a2;
          return new Expresion({tipo_:TIPO_DATO.BOOLEAN,valor_:valor_});
        }
      }
      //bool:
      if (expresion1.tipo==3){
        let a1=JSON.parse(expresion1.valor.toString());
        //bool = bool
        if (expresion2.tipo==3){
          let a2=JSON.parse(expresion2.valor.toString());
          let valor_=a1 == a2;
          return new Expresion({tipo_:TIPO_DATO.BOOLEAN,valor_:valor_});
        }
      }
       //etiqueta:
      if (expresion1.tipo == 4) {
        let contador = 0;
         let datosRetorno = new Array<string>();
        let a1 = <Ejecucion>expresion1.valor;
        // a1 = JSON.parse(expresion1.valor); //OBTENEMOS LA INSTANCIA DE LA CLASE EJECUCION
         let valorComparar = expresion2.valor.toString(); //OBTENEMOS EL VALOR A COMPARAR
         //RECORREMOS LA LISTA DE ETIQUETAS ENCONTRADAS EN LA RUTA
         for (var i = a1.contadorConsola; i < a1.consolaSalidaXPATH.length;i++)
         {
           //salidaXPATH.getInstance().push("entra");
           
           //ASIGNAMOS UNA VARIABLE TEMPORAL
           let temp = a1.consolaSalidaXPATH[i];
          // salidaXPATH.getInstance().push(temp.dameID());
           //salidaXPATH.getInstance().push(temp.dameValor());
           //salidaXPATH.getInstance().push(valorComparar);
           //VERIFICAMOS SI SE BUSCA UN ATRIBUTO O ETIQUETA
           if (a1.controladorAtributoImpresion)
           {

             //SI ENTRAMOS ACA ES QUE SE BUSCA UN ATRIBUTO
             //ESTABLECEMOS EN LA CLASE PADRE QUE UN ATRIBUTO VAMOS A IMPRIMIR SI FUESE EL ULTIMO
           //  this.controladorAtributoImpresion = true;
             for (let entry of temp.atributos)
             {
               //RECORREMOS CADA UNO DE LOS ATRIBUTOS
               let x = entry;
               //OBTENEMOS EL NOMBRE DEL ATRIBUTO A EXAMINAR
               let nombreAtributo = x.dameNombre();
              // salidaXPATH.getInstance().push(nombreAtributo);
               //VERIFICAMOS SI ES EL ATRIBUTO CORRECTO
               if (nombreAtributo==a1.atributoID)
               {
                 //VERIFICAMOS SI ES EL VALOR INDICADO
                 if (x.dameValor()==valorComparar)
                 {
                   if (contador == 0) {
                     datosRetorno.push("atributo");
                     datosRetorno.push(nombreAtributo);
                     datosRetorno.push(valorComparar);
                    
                   }
                   contador++;
                   }
                 }
               }
           } else {
            
            
             if (temp.dameValor().substring(1)===valorComparar) {
              
               if (contador == 0) {
                 datosRetorno.push("etiqueta");
                 datosRetorno.push(temp.dameID());
                 datosRetorno.push(valorComparar);
              
               }
               contador++;
             }
             }
           
           }
           return new Expresion({tipo_:TIPO_DATO.ETIQUETA,valor_:datosRetorno});
      }
      //errorigual
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar '+this.obtenerTipo_string(expresion1)+" == "+this.obtenerTipo_string(expresion2)),
        })
      );
    }//FIN DE  diferente

    //and
    else if (this.soyNodo('and', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      let expresion2=this.resolverExpresion(nodo.hijos[1]);
      
      //bool:
      if (expresion1.tipo==3){
        let a1=JSON.parse(expresion1.valor.toString());
        //bool and bool:
        if (expresion2.tipo==3){
          let a2=JSON.parse(expresion2.valor.toString());
          let valor_=a1 && a2;
          return new Expresion({tipo_:TIPO_DATO.BOOLEAN,valor_:valor_});
        }
      }
      //errorand
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar '+this.obtenerTipo_string(expresion1)+" AND "+this.obtenerTipo_string(expresion2)),
        })
      );
    }//FIN DE and

    //OR
    else if (this.soyNodo('or', nodo)) {
      let expresion1=this.resolverExpresion(nodo.hijos[0]);
      let expresion2=this.resolverExpresion(nodo.hijos[1]);
      
      //bool:
      if (expresion1.tipo==3){
        let a1=JSON.parse(expresion1.valor.toString());
        //bool and bool:
        if (expresion2.tipo==3){
          let a2=JSON.parse(expresion2.valor.toString());
          let valor_=a1 || a2;
          return new Expresion({tipo_:TIPO_DATO.BOOLEAN,valor_:valor_});
        }
      }
      //erroror
      Errores.getInstance().push(
        new Error({
          tipo: "semantico",
          linea: (Number(nodo.linea)+1).toString(),
          descripcion: ('No es posible operar '+this.obtenerTipo_string(expresion1)+" OR "+this.obtenerTipo_string(expresion2)),
        })
      );
    }//FIN DE or
    
    return new Expresion({tipo_:TIPO_DATO.ERROR,valor_:"ErrorExpresion"});
  }//FIN RESOLVER EXP
  obtenerTipo_string(expresion_: Expresion): string{
    if (expresion_.tipo==0){
      return 'error';
    }
    else if (expresion_.tipo==1){
      return 'numero'
    }
    else if (expresion_.tipo==2){
      return 'cadena'
    }
    else if (expresion_.tipo==3){
      return 'booleano'
    }
    else {
      return 'error'
    }
  }

  recorrerExpresion(nodo: any): void{
    if (this.soyNodo('INICIO', nodo)) {
      this.recorrerExpresion(nodo.hijos[0]);
    }
    if (this.soyNodo('L', nodo)) {
      this.recorrerExpresion(nodo.hijos[0]);
    }
    if (this.soyNodo('CONSULTA', nodo)) {
      this.recorrerExpresion(nodo.hijos[0]);
    }
    if (this.soyNodo('SIMPLE', nodo)) {
      this.recorrerExpresion(nodo.hijos[0]);
    }
    if (this.soyNodo('PREDICADO', nodo)) {
      var a1= this.resolverExpresion(nodo.hijos[1]);
      console.log(a1);
    }

  }

  /*
  +
  +
  +
  +IMPLEMENTACION XPATH IMPLEMENTACION XPATH IMPLEMENTACION XPATH IMPLEMENTACION XPATH
  +
  +
  +
  */
  
         //METODO PARA RECORRER EL ARBOL DE CONSULTAS 
         recorrerArbolConsulta(nodo: any): any {
          //NODO INICIO 
          if (this.tipoNodo('INICIO', nodo)) {
            return this.recorrerArbolConsulta(nodo.hijos[0]);
           }
           
           
      
       
       
          //NODO L, ES LA LISTA DE CONSULTAS 
          if (this.tipoNodo('L', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            //SE RECORREN TODOS LOS NODOS QUE REPRESENTAN UNA CONSULTA 
            for (var i = 0; i < nodo.hijos.length;i++)
            {
              this.recorrerArbolConsulta(nodo.hijos[i]);
              this.reiniciar();
            }
          }
      
          //PARA RECORRER TODOS LOS ELEMENTOS QUE COMPONEN LA CONSULTA 
          if (this.tipoNodo('CONSULTA', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            //salidaXPATH.getInstance().push(nodo.hijos.length);
            
            for (var i = 0; i < nodo.hijos.length;i++)
            {
              this.pathCompleto = false;
              this.controladorAtributoImpresion = false;
              this.controladorDobleSimple = false;
              this.controladorPredicado = false;
              this.recorrerArbolConsulta(nodo.hijos[i]);
              
            }
           }
           
             //PARA RECORRER TODOS LOS ELEMENTOS QUE COMPONEN LA CONSULTA 
          if (this.tipoNodo('VAL', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            //salidaXPATH.getInstance().push(nodo.hijos.length);
            
            for (var i = 0; i < nodo.hijos.length;i++)
            {
              this.pathCompleto = false;
              this.controladorAtributoImpresion = false;
              this.controladorDobleSimple = false;
              this.controladorPredicado = false;
              this.recorrerArbolConsulta(nodo.hijos[i]);
              
            }
          }
      
          //PARA VERIFICAR EL TIPO DE ACCESO, EN ESTE CASO // 
      
          if (this.tipoNodo('DOBLE', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            //Establecemos que se tiene un acceso de tipo DOBLE BARRA 
            this.controladorDobleSimple = true;
            
            
              this.recorrerArbolConsulta(nodo.hijos[0]);
            
          }
      
            //PARA VERIFICAR EL TIPO DE ACCESO, EN ESTE CASO: /
            if (this.tipoNodo('SIMPLE', nodo)) {
              //return this.recorrer(nodo.hijos[0]);
              //Establecemos que se tiene un acceso de tipo DOBLE BARRA 
              this.controladorDobleSimple = false;
              this.recorrerArbolConsulta(nodo.hijos[0]);
              
            }
      
          //PARA VERIFICAR SI EL ELEMENTO A BUSCAR ES UN IDENTIFICADOR  
          if (this.tipoNodo('identificador', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            const str = nodo.hijos[0] as string;
            //verificamos si es una etiqueta doble o simple
            //salidaXPATH.getInstance().push(str);
            this.busquedaElemento(str);
            /*
            EN ESTA PARTE SE VA A PROCEDER PARA IR A BUSCAR EL ELEMENTO SEGÚN TIPO DE ACCESO 
            */
           //return;
          }
      
          //PARA VERIFICAR SI LO QUE SE VA A ANALIZAR ES UN PREDICADO  
          if (this.tipoNodo('PREDICADO', nodo)) {
            this.controladorPredicado = true;
            const identificadorPredicado = nodo.hijos[0] as string;
            //Primero se procede a la búsqueda del predicado
            this.busquedaElemento(identificadorPredicado);
            //Seguidamente se resuelve la expresión
            let resultadoExpresion = this.resolverExpresion(nodo.hijos[1]);
    
            //SI EL RESULTADO ES DE TIPO ETIQUETA
            if (resultadoExpresion.tipo==4)
            {
              let datos = <Array<string>> resultadoExpresion.valor;
    
             
              let a = datos[0];
              let b = datos[1];
              let c = datos[2];
             
              
              let limite = this.consolaSalidaXPATH.length;
           for (var i = this.contadorConsola; i < limite;i++)
           {
            // salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameID());
            this.auxiliarPredicado(a,b,c,this.consolaSalidaXPATH[i]);
           
           }
            }
    
    
              //SI EL RESULTADO ES DE TIPO ETIQUETA
              if (resultadoExpresion.tipo==1)
              {
                
                this.consolaSalidaXPATH.push(this.consolaSalidaXPATH[(this.contadorConsola + resultadoExpresion.valor)-1]);
                this.contadorConsola = this.consolaSalidaXPATH.length - 1;
            }
            
            
            
            this.controladorPredicadoInicio = false;
          }
      
          //PARA VERIFICAR QUE ES UN PREDICADO DE UN ATRIBUTO
          if (this.tipoNodo('PREDICADO_A', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            const identificadorPredicadoAtributo = nodo.hijos[0] as string;
            //RECORREMOS LO QUE VA DENTRO DE LLAVES PARA OBTENER EL VALOR
            
            //AQUI VA EL METODO RESOLVER EXPRESION DE SEBAS PUTO 
            return this.recorrerArbolConsulta(nodo.hijos[1]);
          }
      
            //PARA VERIFICAR SI EL ELEMENTO A BUSCAR ES UN ATRIBUTO  
           if (this.tipoNodo('atributo', nodo)) {
            this.controladorAtributoImpresion = true;
             const identificadorAtributo = nodo.hijos[0] as string;
             if (this.inicioRaiz) {
               let limite = this.consolaSalidaXPATH.length ;
               for (var i = this.contadorConsola; i < limite; i++) {
                 let x = this.consolaSalidaXPATH[i];
                 //let nodoBuscarAtributo = this.consolaSalidaXPATH[this.consolaSalidaXPATH.length - 1];
                 let nodoBuscarAtributo = x;
                 //Se procede a la búsqueda de los atributos en todos los nodos
                 for (let entry of nodoBuscarAtributo.atributos) {
                   let atributoTemporal = entry;
                   let nombreAbributo = atributoTemporal.dameNombre();
                   if (nombreAbributo == identificadorAtributo) {
                     this.atributoID = identificadorAtributo;
                     this.pathCompleto = true;
                     //  this.contadorConsola = i;
                    
                     //  this.consolaSalidaXPATH.push(nodoBuscarAtributo);
                   }
    
                 }
               
                 /*for (let entry of nodoBuscarAtributo.hijos) {
                   this.busquedaAtributo(entry, identificadorAtributo);
                 }*/
                 if (this.controladorDobleSimple) {
                   this.busquedaAtributo(x, identificadorAtributo);
                 }
               } 
             } else {
               this.inicioRaiz = true;
               for (let entry of this.ArrayEtiquetas)
               {
                 let temp = entry;
                 for (let entry2 of temp.atributos)
                 {
                   let aTemp = entry2;
                   let nameAtt = aTemp.dameNombre();
                   if (nameAtt==identificadorAtributo)
                   {
                    this.atributoID = identificadorAtributo;
                    this.pathCompleto = true;
                     }
                 }
                 
                 if (this.controladorDobleSimple) {
                  this.busquedaAtributo(entry, identificadorAtributo);
                }
                 }
           }
            
          }
          
      
            //PARA VERIFICAR SI EL ELEMENTO A BUSCAR ES CUALQUIER ELEMENTO   
            if (this.tipoNodo('any', nodo)) {
           
              //SIGNIFICA ACCESO DOBLE
              if (this.controladorDobleSimple)
              {
                let controladorNuevoInicio = -1;
                let limite = this.consolaSalidaXPATH.length;
                for (var i = this.contadorConsola; i < limite;i++)
                {
                  let temporal = this.consolaSalidaXPATH[i];
                  for (let entry of temporal.hijos)
                  {
                    //insertamos TODOS los hijos
                    this.consolaSalidaXPATH.push(entry);
                    if (controladorNuevoInicio == -1) controladorNuevoInicio = this.consolaSalidaXPATH.length - 1;
                    this.complementoAnyElement(entry);
                    }
                  }
                this.contadorConsola = controladorNuevoInicio;
                this.pathCompleto = true;
              }
              //SIGNIFICA ACCESO SIMPLE 
              else
              {
                //Controlamos el nuevo acceso para cuando coloquemos un nuevo elemento en la lista 
                let controladorNuevoInicio = -1;
                let limite = this.consolaSalidaXPATH.length;
                for (var i = this.contadorConsola; i < limite;i++)
                {
                  let temporal = this.consolaSalidaXPATH[i];
                  for (let entry of temporal.hijos)
                  {
                    //insertamos TODOS los hijos
                    this.consolaSalidaXPATH.push(entry);
                    if (controladorNuevoInicio == -1) controladorNuevoInicio = this.consolaSalidaXPATH.length - 1;
                    }
                  }
                this.contadorConsola = controladorNuevoInicio;
                this.pathCompleto = true;
               }
              
           }
    
            //PARA VERIFICAR SI EL ELEMENTO A BUSCAR ES UNA PALABRA RESERVADA  que simplicaria un AXE 
            if (this.tipoNodo('reservada', nodo)) {
              //return this.recorrer(nodo.hijos[0]);
              const identificador = nodo.hijos[0] as string;
              this.auxiliarAxe = identificador;
              //VERIFICAMOS EL TIPO DE ACCESO DE AXE 
              if (this.controladorDobleSimple) this.dobleSimpleAxe = true;
          }
          
          if (this.tipoNodo('AXE', nodo)) {
            //return this.recorrer(nodo.hijos[0]);
            if (this.dobleSimpleAxe) this.controladorDobleSimple = true;
            //Si Solicita implementar el axe child
            if (this.auxiliarAxe == "child") {
              this.recorrerArbolConsulta(nodo.hijos[0]);
            }
            //Si necesitsa implementar el axe attribute
            if (this.auxiliarAxe=="attribute")
            {
              //Le cambiamos la etiqueta de identificador a atributo para fines de optimizacion de codigo
              nodo.hijos[0].label = "atributo";
              this.recorrerArbolConsulta(nodo.hijos[0]);
              
            }
            //Si necesitsa implementar el ancestor
            if (this.auxiliarAxe=="ancestor")
            {
              //Va a resolver el predicado o identificador que pudiese venir 
              this.recorrerArbolConsulta(nodo.hijos[0]);
    
    
              
            }
    
            if (this.auxiliarAxe == "descendant")
            {
              this.controladorDobleSimple = true;
              this.recorrerArbolConsulta(nodo.hijos[0]);
              }
            //Reiniciamos la variable cuando ya se acabe el axe
            this.auxiliarAxe = "";
             
        }
                //PARA VERIFICAR SI EL ELEMENTO A BUSCAR ES UN ATRIBUTO  
                if (this.tipoNodo('X', nodo)) {
                  //return this.recorrer(nodo.hijos[0]);
                  //const identificadorAtributo = nodo.hijos[0] as string;
                  this.controladorDobleSimple = true;
                  this.recorrerArbolConsulta(nodo.hijos[0]);
                  /*
                  EN ESTA PARTE SE VA A PROCEDER PARA IR A BUSCAR EL ELEMENTO SEGÚN TIPO DE ACCESO 
                  */
              }
          //PARA VERIFICAR SI SE NECESITAN TODOS LOS ATRIBUTOS DEL NODO ACTUAL    
          if (this.tipoNodo('any_att', nodo)) {
            
            this.controladorText = true;
            const identificadorAtributo = nodo.hijos[0] as string;
            //Verificamos el tipo de acceso
            //Significa acceso con prioridad
            if (this.controladorDobleSimple)
            {
              
              //VERIFICAMOS DESDE DONDE INICIAMOS
              if (!this.inicioRaiz)
              {
    
                this.inicioRaiz = true;
                for (let entry of this.ArrayEtiquetas)
                {
                  for (let att of entry.atributos)
                  {
                    salidaXPATH.getInstance().push(att.dameNombre()+"="+att.dameValor());
                  }
                  this.complementoAnnyAtributte(entry);
                  }
                
              } else
              {
                let limite = this.consolaSalidaXPATH.length;
                for (var i = this.contadorConsola; i < limite;i++)
                {
                  let entry = this.consolaSalidaXPATH[i];
                  for (let att of entry.atributos)
                  {
                    salidaXPATH.getInstance().push(att.dameNombre()+"="+att.dameValor());
                  }
                  this.complementoAnnyAtributte(entry);
                  }
               }
            }
            //Acceso sin prioridad
            else {
              if (!this.inicioRaiz)
              {
                for (let entry of this.ArrayEtiquetas)
                {
                  for (let att of entry.atributos)
                  {
                    salidaXPATH.getInstance().push(att.dameNombre()+"="+att.dameValor());
                  }
                  
                  }
              } else
              {
                let limite = this.consolaSalidaXPATH.length;
                for (var i = this.contadorConsola; i < limite;i++)
                {
                  let entry = this.consolaSalidaXPATH[i];
                  for (let att of entry.atributos)
                  {
                    salidaXPATH.getInstance().push(att.dameNombre()+"="+att.dameValor());
                  }
    
                  }
               }
              
              }
           }//FIN ANNY ATT
           
            //PARA VERIFICAR SI SE ESTÁ INVOCANDO A LA FUNCIÓN TEXT()    
          if (this.tipoNodo('text', nodo)) {
            this.controladorText = true;
            const identificadorAtributo = nodo.hijos[0] as string;
            //Si se necesita el texto de el actual y los descendientes
            if (this.controladorDobleSimple)
            {
              for (var i = this.contadorConsola; i < this.consolaSalidaXPATH.length;i++)
              {
                if (this.consolaSalidaXPATH[i].dameValor()==""||this.consolaSalidaXPATH[i].dameValor()==" ")
                {
                  
                } else {
                  salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameValor());
                }
                this.complementoText(this.consolaSalidaXPATH[i]);
                  }
            } else {
              //si necesita solo el texto del actual 
              for (var i = this.contadorConsola; i < this.consolaSalidaXPATH.length;i++)
              {
                if (this.consolaSalidaXPATH[i].dameValor()==""||this.consolaSalidaXPATH[i].dameValor()==" ")
                {
                  
                } else {
                  salidaXPATH.getInstance().push(this.consolaSalidaXPATH[i].dameValor());
                  }
                  }
              }
          }
      
           //PARA VERIFICAR SI ES EL TIPO DE ACCESO AL PADRE: ":"  
           if (this.tipoNodo('puntos', nodo)) {
              const cantidad = nodo.hijos[0] as string;
             //DOSPUNTOSSSSSSSSS
             if (cantidad.length == 2) {
               this.pathCompleto = true;
             
               if (this.auxiliarArrayPosicionPadres == -1) {
                 this.auxiliarArrayPosicionPadres = this.arrayPosicionPadres.length - 1;
               }
               for (var i = this.auxiliarArrayPosicionPadres; i >= 0; i--) {
              
                 let contadorHermanos = this.arrayPosicionPadres[i];
                 let controladorInicio = 0;
                 if (i > 0) {
                   
                   while (contadorHermanos != this.arrayPosicionPadres[i - 1]) {
                     this.consolaSalidaXPATH.push(this.consolaSalidaXPATH[contadorHermanos]);
                     
                     if (controladorInicio == 0) {
                       this.contadorConsola = this.consolaSalidaXPATH.length - 1;
                     }
                     controladorInicio++;
                     contadorHermanos--;
                     this.auxiliarArrayPosicionPadres = contadorHermanos;
    
                   }
                 } else {
                   while (contadorHermanos >= 0) {
                     this.consolaSalidaXPATH.push(this.consolaSalidaXPATH[contadorHermanos]);
                    
                     if (controladorInicio == 0) {
                       this.contadorConsola = this.consolaSalidaXPATH.length - 1;
                     }
                     controladorInicio++;
                     contadorHermanos--;
                     this.auxiliarArrayPosicionPadres = contadorHermanos;
                   }
                 }
                 break;
               
               }
              
             }
             //SIGNIFICA QUE TIENE SOLO UN PUNTO 
             else {
               this.pathCompleto = true;
             }
    ///DOS PUNTOOOOOOOOOOOOOOOOS
          }
      
      
                
      
      }//FIN DE METODO PARA RECORRER EL ARBOL DE CONSULTAS 
      complementoAnnyAtributte(objeto: Etiqueta) {
        for (let a of objeto.hijos) {
          for (let b of a.atributos) {
            salidaXPATH.getInstance().push(b.dameNombre()+"="+b.dameValor());
          }
          this.complementoAnnyAtributte(a);
        }
    
      }
      complementoAnyElement(objeto: Etiqueta)
      {
        for (let entry of objeto.hijos)
        {
          this.consolaSalidaXPATH.push(entry);
          this.complementoAnyElement(entry);
          }
      }
      //Metodo para complementar la implementación de text
      complementoText(nodo: Etiqueta)
      {
        //Se recorren los nodos de la etiqueta para imprimir su valor si tuvieran
        for (let entry of nodo.hijos)
        {
            //Señales de que NO tiene valor
            if (entry.dameValor()==""||entry.dameValor()==" ")
            {
              
            } else {
              //Se imprime de una vez en la consola final
              salidaXPATH.getInstance().push(entry.dameValor());
          }
          //Buscamos recursivamente
          this.complementoText(entry);
          }
      }
    
       /**METODO PARA COMPLEMENTAR LA BUSQUEDA DEL VALOR DE UN PREDICADO
         * Funcion para determinar en que tipo de nodo estoy
         * @param tipo
         * @param nombre
         * @param valor
         * @param objeto
         */
      auxiliarPredicado(tipo:string,nombre:string,valor:string,objeto:Etiqueta)
      {
        //Verificamos si lo que se buscó en el predicado es un atributo o etiqueta
        if (tipo == "atributo") {
          //Recorremos los atributos del objecto en cuestion
          for (let att of objeto.atributos)
          {
            //Si los nombres de atributos son iguales
            if (att.dameNombre()==nombre)
            {
              //Si los valores de los atributos son iguales al valor ingresado en el predicado
              if (att.dameValor()==valor)
              {
                //Guardamos el elemento que contiene el atributo
                this.consolaSalidaXPATH.push(objeto);
                //Esta linea de codigo para para verificar el nuevo punto de inicio de la consola final, para no redundar
                if (!this.controladorPredicadoInicio) { this.contadorConsola = this.consolaSalidaXPATH.length - 1; this.controladorPredicadoInicio = true;}
                }//Cierre comparacion valor
              }//Cierre comparacion nombre
          }//Cierre for para recorrer atributos
          
          for (let entry of objeto.hijos )
          {
            for (let att of entry.atributos)
            {
              //Si los nombres de atributos son iguales
              if (att.dameNombre()==nombre)
              {
                //Si los valores de los atributos son iguales al valor ingresado en el predicado
                if (att.dameValor()==valor)
                {
                  //Guardamos el elemento que contiene el atributo
                  this.consolaSalidaXPATH.push(objeto);
                  //Esta linea de codigo para para verificar el nuevo punto de inicio de la consola final, para no redundar
                  if (!this.controladorPredicadoInicio) { this.contadorConsola = this.consolaSalidaXPATH.length - 1; this.controladorPredicadoInicio = true;}
                  }//Cierre comparacion valor
                }//Cierre comparacion nombre
            }//Ci
            }
        } else {
          //Si lo que se busca es una etiqueta en el predicado
          for (let entry of objeto.hijos) {
            //Recorremos cada uno de los hijos y verificamos el nombre de la etiqueta
            if (entry.dameID() == nombre) {
              //Sí hay concidencia, se procede a examinar si el valor es el buscado
              if (entry.dameValor().substring(1) == valor) {
                //Agregamos el objeto a la consola de salida
                this.consolaSalidaXPATH.push(objeto);
                //Al iguar que n fragmento anteriores, se establece el nuevo punto de inicio
                if (!this.controladorPredicadoInicio) {
                  this.contadorConsola = this.consolaSalidaXPATH.length - 1;
                  this.controladorPredicadoInicio = true;
                }//cierreControladorInicio
              }//CIERRE VALOR
            }//CIERREID
          
          }//CIERRE RECORRIDO DE HIJOS
        }
        //La siguiente linea comentada es para recursividad, pendiente de uso.
       
        
        
      }
       /**
         * Funcion para determinar en que tipo de nodo estoy
         * @param etiqueta
         * @param nodoActual
         */
        tipoNodo(etiqueta: string, nodoActual: any): boolean {
          if (nodoActual == null || !(nodoActual instanceof Object)) {
            return false;
          }
          if (nodoActual.hasOwnProperty('label') && nodoActual.label != null) {
            return nodoActual.label === etiqueta;
          }
          return false;
      }
      
    
        /**
         * Funcion para determinar en que tipo de nodo estoy
         * @param nombre
         * 
         */
      //METODO PARA BUSCAR UN ELEMENTO EN LA TABLA DE SIMBOLOS
      
      busquedaElemento(nombre: string) {
        /*
        Se dividirá la búsqueda según el tipo de acceso / o //
        */
        if (!this.controladorDobleSimple) {
          //VERIFICAMOS SI EL OBJETO A BUSCAR PARTE DE LA RAIZ O NO 
          if (!this.inicioRaiz) {
            //SE COMIENZA EN LA RAIZ 
            for (let entry of this.ArrayEtiquetas) {
              //Usamos una variable auxiliar para almacenar el objeto en cuestion
              let auxiliarBusqueda = entry;
          
              //Verificamos si encontramos el elemento
              if (auxiliarBusqueda.id == nombre) {
                this.pathCompleto = true;
                //Si se encuentra, significa que la siguiente busqueda se debe hacer a partir de este elemento
                this.consolaSalidaXPATH.push(auxiliarBusqueda);
                //Establecemos que ya no comience desde la raiz
                this.inicioRaiz = true;
              }
            }
          }
          //Ahora se procede a iniciar desde el elemento padre en caso de ya haberlo encontrado en la raiz 
          else {
          
            //Iniciamos la búsqueda en el último elementro encontrado dentro de la lista final
            let auxiliarContadorConsola = 0;
            let limite = this.consolaSalidaXPATH.length;
            for (var i = this.contadorConsola; i <limite; i++)
            {
              let auxiliarBusqueda = this.consolaSalidaXPATH[i];
              //Examinamos cada uno de los hijos de ese elemento
              for (var j = 0; j < auxiliarBusqueda.hijos.length;j++)
              {
                //Si coincide la busqueda, se agrega a la lista final y se activan las banderas respectivas
                let temporal = auxiliarBusqueda.hijos[j];
                if (temporal.id==nombre)
                {
                  this.pathCompleto = true;
                  this.consolaSalidaXPATH.push(temporal);
                  auxiliarContadorConsola = i;
                  }
                }
             
            }
            //Fragmento que nos sirve para ir guardando los padres asi como el nuevo inicio de la lista
            this.contadorConsola = auxiliarContadorConsola;
            this.arrayPosicionPadres.push(this.contadorConsola);
            this.contadorConsola++;
    
            
          }
        } else { //ELSE PARA BUSCAR CON EL TIPO DE ACCESO //
          
          //nuevamente verificamos si se inicia en la raiz o en el elemento en cuestion 
          if (!this.inicioRaiz)
          {
            //this.arrayPosicionPadres.push(0);
            //En caso de iniciar en la raiz partimos del array de etiquetas 
            for (let entry of this.ArrayEtiquetas)
            {
              let auxiliarBusqueda = entry;
              
                //Verificamos si encontramos el elemento
              if (auxiliarBusqueda.id == nombre) {
                this.pathCompleto = true;
                //Agregamos a la lista el elementro encontrado
                this.consolaSalidaXPATH.push(auxiliarBusqueda);
                //Establecemos que ya no comience desde la raiz
                  
              }
              //Llamamos al método recursivo ya que al ser tipo de acceso doble tiene que buscar en todos los lados posibles
              this.auxiliarDoble(auxiliarBusqueda,nombre);
            }
            //Activamos la bandera para ya no iniciar desde la raiz sino en el ultimo elementro encontrado
            this.inicioRaiz = true;
    
          }
          else {
            //Establecemos el limite de inicio y fin
            let auxiliarContadorConsola = 0;
            let limite = this.consolaSalidaXPATH.length;
              for (var i = this.contadorConsola; i < limite; i++)
              {
                let auxiliarBusqueda = this.consolaSalidaXPATH[i];
                //Revisamos cada uno de los hijos
                for (var j = 0; j < auxiliarBusqueda.hijos.length;j++)
                {
                  //Si coinciden los valores respectivos
                  let temporal = auxiliarBusqueda.hijos[j];
                  if (temporal.id==nombre)
                  {
                    //Guardamos el nuevo elemento a mostrar o examinar y actualizamos el punto de inicio de la lista final
                    this.pathCompleto = true;
                    this.consolaSalidaXPATH.push(temporal);
                    auxiliarContadorConsola = i;
                  }
                  //Se llama al método recursivo para iniciar la busqueda a fondo 
                  this.auxiliarDoble(temporal,nombre);
                  }
               
            }
            //Establecemos los nuevos puntos de inicio asi como los padres
              this.contadorConsola = auxiliarContadorConsola;
              this.arrayPosicionPadres.push(this.contadorConsola);
              this.contadorConsola++;
            
          }//fin inicio raiz DOBLE
    
    
    
        }//FIN DE TIPO DE ACCESO://
      }//Fin del metodo para la búsqueda de un elemento
    
        /**
         * 
         * @param objeto
         * @param nombre
         * 
         */
      //METODO AUXILIAR PARA LA BUSQUEDA CON ACCESO //
      auxiliarDoble(objeto: Etiqueta, nombre: string) 
      {
        
        //Metodo recursivo que nos servira para buscar en todas las partes dentro de la raiz 
        for (let entry of objeto.hijos)
        {
          let auxiliarBusqueda = entry;
          this.auxiliarDoble(auxiliarBusqueda,nombre);
          //Verificamos si encontramos el elemento
          if (auxiliarBusqueda.id == nombre) {
           // this.padresDobleAcceso.push(objeto);
            this.pathCompleto = true;
            //Si se encuentra, significa que la siguiente busqueda se debe hacer a partir de este elemento
            this.consolaSalidaXPATH.push(auxiliarBusqueda);
            
          }
        }
       // return null;
      }
    
    
      busquedaAtributo(objeto: Etiqueta, nombre: string)
      {
        for (let entry of objeto.atributos)
        {
          let temporal = entry;
          let nombreAtributo = temporal.dameNombre();
          
          if (nombreAtributo==nombre)
          {
            this.pathCompleto = true;
            this.atributoID = nombre;
            this.consolaSalidaXPATH.push(objeto);
    
          }
    
        }
        
        for (let entry of objeto.hijos)
        {
          this.busquedaAtributo(entry,nombre);
          }
      }
    
    
      //PARA MOSTRAR EN CONSOLA LOS RESULTADOS 
      getSalidaXPATH(): String[] {
        return salidaXPATH.getInstance().lista;
      
      }
    
      //METODO PARA LA LIMPIEZA DE LO QUE SE MUESTRA EN CONSOLA
      clearXPATH(): any {
        salidaXPATH.getInstance().clear();
      
      }
    
      //METODO PARA REINICIAR TODO AL MOMENTO DE EJECUTAR UNA NUEVA CONSULTA 
      reiniciar()
      {
        if (!this.controladorText)
        {
        if (this.pathCompleto) {
          for (var i = this.contadorConsola; i < this.consolaSalidaXPATH.length; i++) {
            let entry = this.consolaSalidaXPATH[i];
            //salidaXPATH.getInstance().push(this.consolaSalidaXPATH.pop().DameValorFormatoEtiqueta());
            if (!this.controladorAtributoImpresion) {
              salidaXPATH.getInstance().push(entry.DameValorFormatoEtiqueta());
            } else {
              for (let att of entry.atributos) {
                let attTemp = att;
                salidaXPATH.getInstance().push(attTemp.dameNombre() + "=" + attTemp.dameValor());
              }
            }
          }
        }
      }
        this.contador=this.contadorxml=0;
        this.dot=this.dotXML='';
        this.objetoActual = null;
        this.atributoActual = null;
        this.inicioRaiz = false;
        this.controladorDobleSimple = false;
        this.controladorAtributoImpresion = false;
        this.atributoID = '';
        this.contadorConsola = 0;
        this.arrayPosicionPadres.push(this.contadorConsola);
        this.auxiliarArrayPosicionPadres = -1;
        this.inicioPadre = 0;
        this.pathCompleto = true;
        this.auxiliarEtiquetaResolverExpresion = null;
        this.controladorPredicado = false;
        this.controladorPredicadoInicio = false;
        this.controladorText = false;
        this.arrayPosicionPadres = new Array<number>();
        this.consolaSalidaXPATH = new Array<Etiqueta>();
        this.auxiliarEtiquetaResolverExpresion = new Array<Etiqueta>();
        this.auxiliarAxe = "";
        this.dobleSimpleAxe = false;
        this.controladorAncestor = false;
        this.arrayAncestor = new Array<Etiqueta>();
        this.padresDobleAcceso = new Array<Etiqueta>();
      }
    
      //METODO PARA BUSCAR TODOS LOS PADRES DE UN NODO 
      metodoAncestor(nombre:string): any
      {
       
          //En cualquier de los dos casos, se comienza desde el punto más alto puesto que ambos comandos incluyen a TODOS LOS PADRES
          for (let entry of this.ArrayEtiquetas)
          {
            if (entry.dameID()==nombre)
            {
    
            }  
          }
          
        
      }

}