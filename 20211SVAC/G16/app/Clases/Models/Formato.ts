import { ToastrService } from 'ngx-toastr';
import {Buffer} from 'buffer'

export class Formato{

  contenido=[];
  cadenita="";
  encoding="";
  constructor(contenido:any, private toastr:ToastrService,encoding:string){
    this.contenido=contenido;
    this.encoding=encoding
  }

  darFormato():string{
    let cadena="";
   //recorre el contenido del arreglo
    if(this.contenido.length!=0){

      this.contenido.forEach(element => {
        if(element.valor.nombreInit!=""){

          if(element.Tipo=="Texto" || element.Tipo=="Vacio"){

            cadena+="<"+element.valor.nombreInit;
            if (element.valor.atributos!=null){
              console.log("hay una lista")
              let array=[];
              array.push(element.valor.atributos)
              this.armar(array)
              cadena+=this.cadenita;
              this.cadenita=""
            }
            if(element.valor.nombreFin!=""){
              if(element.valor.texto!=""){

                const cad=this.convertir(element.valor.texto);
                console.log(cad)
                if(cad!="error"){
                  cadena+=">"+cad;
                }
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
            //  this.cadenita+=">";
            }
            if(elementos.texto!=""){
              const cad=this.convertir(elementos.texto);
              if(cad!="error"){
                //habia un >
                this.cadenita+=">"+cad+"</"+elementos.nombreFin+">\n";
              }
            }else if(elementos.elementos!=null){
              this.cadenita+=">"+"\n";
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

  convertir(cadena):string{

    if(this.encoding=="utf"){
      let bufer=new Buffer(cadena,"utf-8");
      return bufer.toString("utf8")
    }else if(this.encoding=="iso"){
      return this.utf8_encode(cadena);

    }else if(this.encoding=="ascii"){
      let bufer=new Buffer(cadena,"ascii");
      return bufer.toString("ascii")
    }
    return "error"
  }

  utf8_encode (argString) { // eslint-disable-line camelcase
    //  discuss at: https://locutus.io/php/utf8_encode/
    // original by: Webtoolkit.info (https://www.webtoolkit.info/)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: sowberry
    // improved by: Jack
    // improved by: Yves Sucaet
    // improved by: kirilloid
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Ulrich
    // bugfixed by: Rafał Kukawski (https://blog.kukawski.pl)
    // bugfixed by: kirilloid
    //   example 1: utf8_encode('Kevin van Zonneveld')
    //   returns 1: 'Kevin van Zonneveld'
    if (argString === null || typeof argString === 'undefined') {
      return ''
    }
    // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const string = (argString + '')
    let utftext = ''
    let start
    let end
    let stringl = 0
    start = end = 0
    stringl = string.length
    for (let n = 0; n < stringl; n++) {
      let c1 = string.charCodeAt(n)
      let enc = null
      if (c1 < 128) {
        end++
      } else if (c1 > 127 && c1 < 2048) {
        enc = String.fromCharCode(
          (c1 >> 6) | 192, (c1 & 63) | 128
        )
      } else if ((c1 & 0xF800) !== 0xD800) {
        enc = String.fromCharCode(
          (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
        )
      } else {
        // surrogate pairs
        if ((c1 & 0xFC00) !== 0xD800) {
          throw new RangeError('Unmatched trail surrogate at ' + n)
        }
        const c2 = string.charCodeAt(++n)
        if ((c2 & 0xFC00) !== 0xDC00) {
          throw new RangeError('Unmatched lead surrogate at ' + (n - 1))
        }
        c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000
        enc = String.fromCharCode(
          (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
        )
      }
      if (enc !== null) {
        if (end > start) {
          utftext += string.slice(start, end)
        }
        utftext += enc
        start = end = n + 1
      }
    }
    if (end > start) {
      utftext += string.slice(start, stringl)
    }
    return utftext
  }
}
