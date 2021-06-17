import { ToastrService } from 'ngx-toastr';
const xml=require('locutus/php/xml/utf8_encode');
import {Formato} from './Formato'
const errores=require('../Models/ListaError.js')
const nodoError=require('../Models/Errores.js')
export class Buscar{

  tablasimbolos=[];
  contenido=[];
  contenido2=[]
  padre="Global";
  ast:any;
  cadenita="";
  contador=0;
  raices=[];
  etiquetas=[];
  encoding=""
  constructor(private toastr:ToastrService){
    this.tablasimbolos=JSON.parse(localStorage.getItem("tablaSimbolo"));
    this.ast=JSON.parse(localStorage.getItem("ASTXPATH"));
    this.RecorrerAST(this.ast);
    this.encoding=localStorage.getItem("encoding");
  }

  EncontrarEnTablaDeSimbolos(etiqueta:string,padre:string,cualquiera:boolean):boolean{
    let valor;
  // Busca en la tabla de simbolos
    for(let i=0;i<this.tablasimbolos.length;i++){
      let elemento=this.tablasimbolos[i]
      // si cualquiera es verdadero, significa que no necesita un padre para buscar
      if(cualquiera){
        if(elemento.Nombre==etiqueta){
          this.contenido.push(elemento.Valor);
          valor=true;
        }
      }else{
        // si es falso entonces si necesita un padre para acceder a él
        if(elemento.Nombre==etiqueta && elemento.Padre==padre){
          this.contenido.push(elemento.Valor);
          valor=true;
        }
      }
    }
    // si valor es verdadero significa que encontró el elemento
    if(valor){
      return true;
    }else{
      return false;
    }
  }


  ObtenerEntorno(etiqueta:string,padre:string):any{
    let valor=false;
  // Busca en la tabla de simbolos
    for(let i=0;i<this.tablasimbolos.length;i++){
      let elemento=this.tablasimbolos[i]
        // si es falso entonces si necesita un padre para acceder a él
        if(elemento.Nombre==etiqueta && elemento.Padre==padre){
          this.contenido2.push(elemento.Valor);
          valor=true;
        }

    }
    // si valor es verdadero significa que encontró el elemento
    if(valor){
      return true;
    }else{
      return false;
    }
  }

  RecorrerAST(raiz: any) {

    // Verifica si la variable raiz tiene elementos
    if (raiz != undefined) {

     if(raiz.hijos!=undefined){
       //si raiz tiene hijos entonces recorre el AST
       let array=raiz.hijos
       array.forEach(element => {
        // Compara la etiqueta para saber que tipo de recorrido es
        if(element.etiqueta=="/" || element.etiqueta=="//"){
          this.raices.push(element.etiqueta)
          this.RecorrerAST(element);

        }
        else{
          // Si está aqui significa que ya llegó hasta el final
          // y las etiquetas son elementos, this.contenido sirve para ir guardando los resultados
          this.contenido=[]

          for(let i=this.raices.length-1;i>=0;i--){

            // entra a un for para saber qué tipo de raiz le pertenece a la etiqueta
            if(this.raices[i]=="/"){
              this.raices[i]="";

              // como es una barra, siginifica que necesita un padre para ir a buscar a la tabla de simbolos
              let valor=this.EncontrarEnTablaDeSimbolos(element.etiqueta,this.padre,false);
              // hay un cambio de padre
              this.padre=element.etiqueta;
              if(valor){
                // si encontró el valor vuelve a ver si la etiqueta tiene hijos
                this.RecorrerAST(element);
                return
              }else{
                // significa que no lo encontró, y marca error semántico.
                errores.Errores.add(new nodoError.Error("Semántico","Etiqueta no encontrada "+
                "en el archivo: "+element.etiqueta+".",1,1,"XPath"));
                return
              }
            }else if(this.raices[i]=="//"){
              console.log(i)
              this.raices[i]=""
              let valor;
              if(i==0 && this.raices.length>1){
                valor=this.EncontrarEnTablaDeSimbolos(element.etiqueta,this.padre,false);
                this.padre=element.etiqueta;
              }else if(this.raices.length==1){
                valor=this.EncontrarEnTablaDeSimbolos(element.etiqueta,this.padre,true);
                this.padre=element.etiqueta;
              }
              else{
               // console.log(element.etiqueta)
               // valor=this.EncontrarEnTablaDeSimbolos(element.etiqueta,this.padre,false);
               this.ObtenerEntorno(element.etiqueta,this.padre);
               if(this.contenido2.length!=0){
                this.recorrerEntorno(this.contenido2,element.etiqueta);
               }else{
                 console.log("no se encontró")
               }
               // valor=this.EncontrarEnTablaDeSimbolos(element.etiqueta,this.padre,true);
              }

              this.padre=element.etiqueta;
              if(valor){
                this.RecorrerAST(element);
                return
              }else{
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

  recorrerEntorno(Contenido:any, nombre:string){
    //recorre el contenido del arreglo

     if(Contenido.length!=0){

       Contenido.forEach(element => {
         console.log(element)
         if(element.nombreInit==nombre){

           if(element.Tipo=="Texto" || element.Tipo=="Vacio"){
              this.contenido.push(element)
           }else if(element.Tipo=="Elementos"){
             //console.log(element.valor)
               let array=[];
               array.push(element.valor)
               this.recorrerEntorno(array,nombre);
           }
         }else{
           if(element.valor.elementos!=undefined){
            this.recorrerEntorno(element.valor.elementos.lista,nombre);
           }else{
            this.recorrerEntorno(element.lista,nombre);
           }

         }
       });
  }
  }

  darFormato():string{
    const formato=new Formato(this.contenido,this.toastr,this.encoding);
    return formato.darFormato();

  }
}
