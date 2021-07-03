import { ToastrService } from 'ngx-toastr';
const xml = require('locutus/php/xml/utf8_encode');
import { Formato } from './Formato'
const errores = require('../Models/ListaError.js')
const nodoError = require('../Models/Errores.js')
export class Buscar {

  tablasimbolos = [];
  contenido = [];
  contenido2 = []
  padre = "Global";
  ast: any;
  cadenita = "";
  contador = 0;
  raices = [];
  etiquetas = [];
  encoding = ""
  predicado: any;
  predicados: any[];
  hijos = [];
  vlast = 0;
  vposition = 2;
  traduciendo="";
  constructor(private toastr: ToastrService) {
    this.tablasimbolos = JSON.parse(localStorage.getItem("tablaSimbolo"));
    this.ast = JSON.parse(localStorage.getItem("ASTXPATH"));
    //GENERANDO LO PRIMERO DE UN ARCHIVO DE C
      this.traduciendo+="/------HEADER------/\n"
      this.traduciendo+="#include <stdio.h>\n"
      this.traduciendo+="#include <math.h>\n"
      this.traduciendo+="double heap[19121997];\n"
      this.traduciendo+="double stack[19121997];\n"
      this.traduciendo+="/------MAIN------/\n"
      this.traduciendo+="void main() {\n"
      this.RecorrerAST(this.ast);
      this.encoding = localStorage.getItem("encoding");
  }

  EncontrarEnTablaDeSimbolos(etiqueta: string, padre: string, cualquiera: boolean): boolean {
    let valor;
    // Busca en la tabla de simbolos
    for (let i = 0; i < this.tablasimbolos.length; i++) {
      let elemento = this.tablasimbolos[i]
      // si cualquiera es verdadero, significa que no necesita un padre para buscar
      if (cualquiera) {
        if (elemento.Nombre == etiqueta) {
          this.contenido.push(elemento.Valor);
          valor = true;
        } else if (elemento.Tipo == "Texto") {
          this.contenido.push(elemento.Valor);
          valor = true;
        }
      } else {
        // si es falso entonces si necesita un padre para acceder a él
        if (elemento.Nombre == etiqueta && elemento.Padre == padre) {
          this.contenido.push(elemento.Valor);
          valor = true;
        } else if (elemento.Tipo == etiqueta && elemento.Padre == padre) {
          this.contenido.push(elemento.Valor.valor);
        } else if (etiqueta == "Texto" && elemento.Padre == padre) {
          console.log(padre);
          this.contenido.push(elemento.Valor);
          valor = true;
        }
      }
    }
    // si valor es verdadero significa que encontró el elemento
    if (valor) {
      return true;
    } else {
      return false;
    }
  }

  ObtenerEntorno(padre: string): any {
    let valor = false;
    // Busca en la tabla de simbolos
    for (let i = 0; i < this.tablasimbolos.length; i++) {
      let elemento = this.tablasimbolos[i]
      // si es falso entonces si necesita un padre para acceder a él

      if (elemento.Padre == padre) {
        this.contenido2.push(elemento.Valor.valor);
        valor = true;
      }

    }
    // si valor es verdadero significa que encontró el elemento
    if (valor) {
      return true;
    } else {
      return false;
    }
  }

  RecorrerAST(raiz: any) {
    // Verifica si la variable raiz tiene elementos
    if (raiz != undefined) {

      if (raiz.hijos != undefined) {
        //si raiz tiene hijos entonces recorre el AST
        let array = raiz.hijos
        array.forEach(element => {
          //  console.log(element.etiqueta)
          // Compara la etiqueta para saber que tipo de recorrido es
          if (element.etiqueta == "/" || element.etiqueta == "//") {
            this.raices.push(element.etiqueta)
            this.RecorrerAST(element);

          } else if (element.etiqueta == "Predicado") {//DE ESTA PARTE YO SOLO AGREGUE ESTE ELSE IF Y LUEGO EL RESOLVER EXPRESION
            this.predicado = this.ResolverExpresion(element.hijos[0])//AQUI SOLO ES ELEMENT
            if(this.predicado!=true){
              this.getPredicado(this.predicado)
            }else{

            }
          } else if (element.etiqueta == "Funcion") {
            this.getFuncion(element.hijos[0]);
          } else if (element.etiqueta == "Eje") {
            let nodo = this.getEje(element.hijos[0]);
            this.RecorrerAST(nodo);
          } else if (element.etiqueta == "Contenido") {
            this.RecorrerAST(element);
          }
          else {
            // Si está aqui significa que ya llegó hasta el final
            // y las etiquetas son elementos, this.contenido sirve para ir guardando los resultados
            this.contenido = []
            //console.log(element.etiqueta)
            for (let i = this.raices.length - 1; i >= 0; i--) {

              // entra a un for para saber qué tipo de raiz le pertenece a la etiqueta
              if (this.raices[i] == "/") {
                this.raices[i] = "";

                // como es una barra, siginifica que necesita un padre para ir a buscar a la tabla de simbolos
                let valor = this.EncontrarEnTablaDeSimbolos(element.etiqueta, this.padre, false);
                // hay un cambio de padre
                this.padre = element.etiqueta;
                if (valor) {
                  // si encontró el valor vuelve a ver si la etiqueta tiene hijos
                  this.RecorrerAST(element);
                  return
                } else {
                  // significa que no lo encontró, y marca error semántico.
                  errores.Errores.add(new nodoError.Error("Semántico", "Etiqueta no encontrada " +
                    "en el archivo: " + element.etiqueta + ".", 1, 1, "XPath"));
                  return
                }
              } else if (this.raices[i] == "//") {
                this.raices[i] = ""
                let valor;
                if (this.raices.length == 1) {
                  valor = this.EncontrarEnTablaDeSimbolos(element.etiqueta, this.padre, true);
                  this.padre = element.etiqueta;
                }
                else {
                  this.ObtenerEntorno(this.padre);

                  if (this.contenido2.length != 0) {
                    this.contenido=[]

                    this.recorrerEntorno(this.contenido2, element.etiqueta);
                  } else {
                    console.log("no se encontró")
                  }
                }

                this.padre = element.etiqueta;
                if (valor) {
                  this.RecorrerAST(element);
                  return
                } else {
                  return
                }
              }
            }
          }
        });

      }

    } else {
      console.log("Ha ocurrido un error");
    }
  }

  ResolverExpresion(raiz: any): any {
    //console.log(raiz)
      switch (raiz.etiqueta) {
        case "+":
          if(this.ResolverExpresion(raiz.hijos[0]) == "last"){
            break;
          }else if(this.ResolverExpresion(raiz.hijos[0]) == "position"){
            return 0
          }
          else{
            return Number(this.ResolverExpresion(raiz.hijos[0])) + Number(this.ResolverExpresion(raiz.hijos[1]))
          }
        case "-":
          if(this.ResolverExpresion(raiz.hijos[0]) == "last"){
            return this.getLast()
          }else if(this.ResolverExpresion(raiz.hijos[0]) == "position"){
            return 0
          }else{
            return Number(this.ResolverExpresion(raiz.hijos[0])) - Number(this.ResolverExpresion(raiz.hijos[1]))
          }
        case "*":
          if(this.ResolverExpresion(raiz.hijos[0]) == "last"){
            errores.Errores.add(new nodoError.Error("Semántico", "No se puede sumar al metodo Last ", 1, 1, "XPath"));
            break
          }else if(this.ResolverExpresion(raiz.hijos[0]) == "position"){
            return 0
          }else{
            return Number(this.ResolverExpresion(raiz.hijos[0])) * Number(this.ResolverExpresion(raiz.hijos[1]))
          }
        case "mod":
          if(this.ResolverExpresion(raiz.hijos[0]) == "last"){
            errores.Errores.add(new nodoError.Error("Semántico", "No se puede sumar al metodo Last ", 1, 1, "XPath"));
            break
          }else if(this.ResolverExpresion(raiz.hijos[0]) == "position"){
            return 0
          }else{
            return Number(this.ResolverExpresion(raiz.hijos[0])) % Number(this.ResolverExpresion(raiz.hijos[1]))
          }

        case "div":
        if(this.ResolverExpresion(raiz.hijos[0]) == "last"){
          errores.Errores.add(new nodoError.Error("Semántico", "No se puede sumar al metodo Last ", 1, 1, "XPath"));
          return this.contenido
        }else if(this.ResolverExpresion(raiz.hijos[0]) == "position"){
          return 0
        }else{
          return Number(this.ResolverExpresion(raiz.hijos[0])) / Number(this.ResolverExpresion(raiz.hijos[1]))
        }
        case "<":
          if(this.ResolverExpresion(raiz.hijos[0]) == "position"){
            this.predicados=[]
            let last = this.getLast();
            let indice = this.ResolverExpresion(raiz.hijos[1])
            for (let i=1; i < last; i++){
              if(i<indice){
                this.predicados.push(i)
              }
            }
            return true
          }
        break
        case "Funcion":
          if(raiz.hijos[0].etiqueta=="last"){
            return "last"
          }else if(raiz.hijos[0].etiqueta=="position"){
            return "position"
          }
          return 123
        default:
          return raiz.etiqueta
      }
  }

  //Retorna el predicado que debe de ser
  getPredicado(indice:number){
    this.contenido = [];
    let valor = this.EncontrarEnTablaDeSimbolos(this.padre, "", true);
    if (valor) {
      for (let i: number = 0; i < this.contenido.length; i++) {
        if (i == (indice - 1)) {
          this.hijos.push(this.contenido[i]);
        }
      }
      this.contenido = [];
      this.contenido = this.hijos;
    } else {
      errores.Errores.add(new nodoError.Error("Semántico", "No hay hijos para realizar el metodo Last ", 1, 1, "XPath"));
    }
  }

  getLast():number{
    return this.contenido.length -1
  }

  //JULISSA AQUI ESTÁ EL MÉTODO DE LAS FUNCIONES
  getFuncion(nodo: any): any {
    switch (nodo.etiqueta) {
      case "position":
        /*AQUI HAY QUE VER DE QUÉ FORMA OBETENER EL VALOR DE LA EXPRESIÓN QUE ACOMPAÑA A ESTA FUNCIÓN Y
        ASIGNAR ESE RESULTADO A LA VARIABLE vposition QUE ESTÁ GLOBAL EN TODA LA CLASE (SI ES UNA
        EXPRESION SIMPLE COMO position()<2 PUES ENTONCES vposition TENDRÍA EL VALOR DE 2). YO ASUMO QUE
        PARA ESTA FUNCIÓN SERÁN SÓLO LAS OPERACIONES RELACIONALES, PERO NO ESTOY 100% SEGURO.*/
        this.contenido = []
        this.vposition = 0
        let valor1 = this.EncontrarEnTablaDeSimbolos(this.padre, "", true);
        console.log(valor1);
        if (valor1) {
          console.log(this.contenido);
          for (let i: number = 0; i < this.contenido.length; i++) {
            if (i < (this.vposition - 1)) {
              this.hijos.push(this.contenido[i]);
            } else {
              break;
            }
          }
          this.contenido = [];
          this.contenido = this.hijos;
        } else {
          //error semántico: No hay hijos, no se puede hacer función position()
        }
        break;
      case "last":
        this.contenido = [];
        this.vlast = 0;
        let valor = this.EncontrarEnTablaDeSimbolos(this.padre, "", true);
        if (valor) {
          let contlas = this.contenido.length - this.vlast;
          console.log(this.contenido);
          console.log(contlas);
          for (let i: number = 0; i < this.contenido.length; i++) {
            if (i == (contlas - 1)) {
              this.hijos.push(this.contenido[i]);
            }
          }
          this.contenido = [];
          this.contenido = this.hijos;
        } else {
          //error semántico: No hay hijos, no se puede hacer función last()
        }
        break;
      case "node":
        /*ESTA FUNCION LO QUE HACE ES QUE DEVUELVE ABSOLUTAMENTE TODOS LOS NODOS QUE ESTÁN DENTRO DEL
        PADRE INDICADO, ESTA CREO QUE NO VIENE DENTRO DE LOS PREDICADOS, Y SI VIENE NO TENDRÍA EXPRESIONES,
        VENDRÍA SOLITA xD*/
        this.contenido = [];
        let valor2 = this.EncontrarEnTablaDeSimbolos(this.padre, "", true);
        if (valor2) {
          this.contenido.forEach(element => {
            this.hijos.push(element);
          });
          this.contenido = [];
          this.contenido = this.hijos;
        } else {
          //error semántico: No hay hijos, no se puede hacer función node()
        }
        break;
      case "text":
        /*ESTA FUNCION DEVUELVE TODOS LOS TEXTOS QUE VIENEN EN LOS NODOS HIJOS (POR EJEMPLO SI VIENE
        <libro>Hola</libro> ENTONCES DEVUELVE Hola). ESTA FUNCIÓN TAMPOCO TRAE EXPRESIONES, SIEMPRE VA
        SOLITA, ASÍ COMO YO :c*/
        this.contenido = [];
        console.log("padre: " + this.padre);
        this.EncontrarEnTablaDeSimbolos("Texto", this.padre, false);
        break;
    }
  }

  getEje(nodo: any): any {
    switch (nodo.etiqueta) {
      case "ancestor":
        return (nodo);
      case "ancestor-or-self":
        return (nodo);
      case "attribute":
        return (nodo);
      case "child":
        this.contenido = [];
        this.EncontrarEnTablaDeSimbolos(this.padre, "", true);
        return (nodo);
      case "descendant":
        return (nodo);
      case "descendant-or-self":
        return (nodo);
      case "following":
        return (nodo);
      case "following-sibling":
        return (nodo);
      case "namespace":
        return (nodo);
      case "parent":
        return (nodo);
      case "preceding":
        return (nodo);
      case "preceding-sibling":
        return (nodo);
      case "self":
        return (nodo);
    }
  }

  recorrerEntorno(Contenido: any, nombre: string) {
    //recorre el contenido del arreglo
      if(Contenido.Nombre!=undefined){
        if (Contenido.Nombre == nombre) {

          if (Contenido.elementos !=null) {

            this.contenido.push(Contenido)
          }else{

            this.contenido.push(Contenido)
          }
        }else{
          let array=[]
          if(Contenido.elementos!=null){
            array.push(Contenido.elementos)
            this.recorrerEntorno(array,nombre)
          }
        }
      }else if(Contenido.lista!=undefined){

        if(Contenido!=null){
          Contenido.lista.forEach(elemento2 => {
            let array=[]
            array.push(elemento2)
            this.recorrerEntorno(array,nombre);
        });
        }
      }else if(Contenido.nombreInit!=undefined){
        if (Contenido.nombreInit == nombre) {

          if (Contenido.elementos !=null) {

            this.contenido.push(Contenido)
          }else{

            this.contenido.push(Contenido)
          }
        }else{
          let array=[]
          if(Contenido.elementos!=null){
            array.push(Contenido.elementos)
            this.recorrerEntorno(array,nombre)
          }
        }
      }

  }

  darFormato(): string {
    const formato = new Formato(this.contenido, this.toastr, this.encoding);
    return formato.darFormato();

  }

}
