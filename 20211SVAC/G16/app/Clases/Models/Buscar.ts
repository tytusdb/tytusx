import { ToastrService } from 'ngx-toastr';
export class Buscar{

  tablasimbolos=[];
  contenido=[];
  padre="Global";
  ast:any;
  cadenita="";
  contador=0;
  constructor(private toastr:ToastrService){
    this.tablasimbolos=JSON.parse(localStorage.getItem("tablaSimbolo"));
    this.ast=JSON.parse(localStorage.getItem("ASTXPATH"));
    this.RecorrerAST(this.ast);
    console.log(this.contenido)
  }

  EncontrarEnTablaDeSimbolos(etiqueta:string,padre:string):boolean{
    let valor;
    for(let i=0;i<this.tablasimbolos.length;i++){
      let elemento=this.tablasimbolos[i]
      if(elemento.Nombre==etiqueta && elemento.Padre==padre){
        this.contenido.push(elemento.Valor);
        valor=true;
      }
    }
    if(valor){
      return true;
    }else{
      return false;
    }
  }


  RecorrerAST(raiz: any) {

    if (raiz != undefined) {

     if(raiz.hijos!=undefined){
       let array=raiz.hijos
       array.forEach(element => {

        if(element.etiqueta=="/" || element.etiqueta=="//"){
          this.RecorrerAST(element);
          console.log(element.etiqueta)
        }else{
          console.log("------El simbolo tiene elementos-------");
          this.contenido=[]
          let valor=this.EncontrarEnTablaDeSimbolos(element.etiqueta,this.padre);
          this.padre=element.etiqueta;

          if(valor){
            this.RecorrerAST(element);
          }else{
            return
          }

        }
       });
     }

    } else {
      console.log("Ha ocurrido un error");
    }
  }

  darFormato():string{
    let cadena="";
    if(this.contenido.length!=0){
      this.contenido.forEach(element => {
        if(element.valor.nombreFin!=""){
          if(element.Tipo=="Texto" || element.Tipo=="Vacio"){
            cadena+="<"+element.valor.nombreInit;
            if (element.valor.atributos!=null){
              let array=[];
              array.push(element.valor.atributos)
              this.armar(array)
              cadena+=this.cadenita;
              this.cadenita=""
            }
            if(element.valor.nombreFin!=""){
              if(element.valor.texto!=""){
                cadena+=">"+element.valor.texto;
                cadena+="</"+element.valor.nombreFin+">\n"
              }else{
                cadena+="></"+element.valor.nombreFin+">\n"
              }

            }else{
              cadena+="/>";
            }


          }else if(element.Tipo=="Elementos"){
            //console.log(element.valor)
              let array=[];
              array.push(element.valor)
              this.armar(array);
              cadena+=this.cadenita;
              this.cadenita=""


          }


        }
      });
    }else{
      this.toastr.warning("El elemento que busca no se ha encontrado en este archivo XML")
    }
    return cadena
  }

  armar(Elemento:any){

    if(Elemento!=undefined){
      Elemento.forEach(element => {
        if(element.lista!=undefined){
          this.armar(element.lista);
        }else{
          if(element.texto!=undefined){
            this.contador++;
            let elementos=element;
            this.cadenita+="<"+elementos.nombreInit;
            if(elementos.atributos!=undefined && elementos.atributos!=null){
              if(elementos.atributos.lista!=undefined){
                this.armar(elementos.atributos.lista);
              }else{
                let el=elementos.atributos[0];
                this.cadenita+=" "+el.identificador+"="+el.valor;
              }
            }else{
              this.cadenita+=">";
            }
            if(elementos.texto!=""){
              this.cadenita+=">"+elementos.texto+"</"+elementos.nombreFin+">\n";
            }else if(elementos.elementos!=null){
              this.cadenita+="\n";
              this.armar(elementos.elementos.lista);
              this.cadenita+="</"+elementos.nombreFin+">\n";
            }else{
              if(elementos.nombreFin!=""){
                this.cadenita+="</"+elementos.nombreFin+">\n";
              }else{
                this.cadenita+="<"+elementos.nombreInit+"/>\n";
              }
            }
        }

        if(element.identificador!=undefined){
          let elementos=element;
          this.cadenita+=" "+elementos.identificador+"="+elementos.valor+" ";
        }

      }

    });
    }
  }



}
