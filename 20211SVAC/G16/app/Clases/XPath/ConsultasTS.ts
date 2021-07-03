import { ComponentFactoryResolver } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Simbolo from '../AST/Simbolo';
import { Contenido } from '../Hijos/Contenido';



export class ConsultasTS{
    //ESTA CLASE VA A TENER TODAS LAS TIPOS DE CONSULTAS QUE SE PUEDEN REALIZAR 
    //A LA TABLA QUE CONTIENE LA INFORMACIÓN DEL XML, PARA PODER SER USADAS
    //EN TODAS LAS CLASES ABSTRACTAS QUE SE NECESITEN.
    contenido=[]
    tablasimbolos:any
    padre:any
    encoding:any
    toastr: ToastrService
    hijos = []
    texto=""
    etiqueta
  constructor(){
    this.tablasimbolos = JSON.parse(localStorage.getItem("tablaSimbolo"))
    this.encoding = localStorage.getItem("encoding")
  }

  getEntornoActual(etiqueta: string, padre: string):any{
    this.contenido = [];
    // Busca en la tabla de simbolos
    for (let i = 0; i < this.tablasimbolos.length; i++) {
      let elemento = this.tablasimbolos[i]
        if (elemento.Nombre == etiqueta && elemento.Padre == padre) {
            this.contenido.push(elemento.Valor);
        } else if (elemento.Tipo == etiqueta && elemento.Padre == padre) {
            this.contenido.push(elemento.Valor.valor);
        } else if (etiqueta == "Texto" && elemento.Padre == padre) {
            this.contenido.push(elemento.Valor);
        }
    }
    
    return this.contenido
    }

    getEntornoLibre(etiqueta:string){
        for (let i = 0; i < this.tablasimbolos.length; i++) {
            let elemento = this.tablasimbolos[i]
              if (elemento.Nombre == etiqueta) {
                this.contenido.push(elemento.Valor);
              } else if (elemento.Tipo == "Texto") {
                this.contenido.push(elemento.Valor);
              }
          }
    }

    getPredicado(padre:any, indice):any{
        this.contenido = JSON.parse(padre)
          for (let i= 0; i < this.contenido.length; i++) {
            if (i == (indice - 1)) {
              this.hijos.push(this.contenido[i]);
            }
          }
          this.contenido = [];
          this.contenido = this.hijos;
        return this.contenido
    }

    Menor(indice:any, tope:any, padre:any){
        this.contenido = JSON.parse(padre)
        this.hijos=[];
        if(indice.id==undefined){
          for (let i = indice; i<tope; i++){
            for(let j = 0; j < this.contenido.length; j++){
                if (j==(i-1)){
                    this.hijos.push(this.contenido[j])
                }
            }
          }
        }else{
          for(let i=0; i<this.contenido.length; i++){
            this.getEtiqueta(this.contenido[i], indice.id)
            if(this.etiqueta<tope){
              this.hijos.push(this.contenido[i])
            }
          }
        }
        
        return this.hijos
    }

    Menori(indice:any, tope:any, padre:any){
      this.contenido = JSON.parse(padre)
      this.hijos=[]
      if(indice.id==undefined){
        for (let i = indice; i<=tope; i++){
          for(let j = 0; j < this.contenido.length; j++){
              if (j==(i-1)){
                  this.hijos.push(this.contenido[j])
              }
          }
        }
      }else{
        for(let i=0; i<this.contenido.length; i++){
          this.getEtiqueta(this.contenido[i], indice.id)
          if(this.etiqueta<=tope){
            this.hijos.push(this.contenido[i])
          }
        }
      }
      return this.hijos
  }

  Mayor(indice:any, tope:any, padre:any){
      this.contenido = JSON.parse(padre)
      this.hijos=[]
      if(indice.id==undefined){
        for (let i = tope+1; i<this.contenido.length+1; i++){
          for(let j = 0; j < this.contenido.length; j++){
              if (j==(i-1)){
                  this.hijos.push(this.contenido[j])
              }
          }
        }
      }else{//QUIERE DECIR QUE PUEDE VENIR UNA ETIQUETA
        for(let i=0; i<this.contenido.length; i++){
          this.getEtiqueta(this.contenido[i], indice.id)
          if(this.etiqueta>tope){
            this.hijos.push(this.contenido[i])
          }
        }
      }

      return this.hijos
  }

  Mayori(indice:any, tope:any, padre:any){
    this.contenido = JSON.parse(padre)
    this.hijos=[]
    if(indice.id==undefined){
      for (let i = tope
        ; i<this.contenido.length+1; i++){
        for(let j = 0; j < this.contenido.length; j++){
            if (j==(i-1)){
                this.hijos.push(this.contenido[j])
            }
        }
      }
    }else{
      for(let i=0; i<this.contenido.length; i++){
        this.getEtiqueta(this.contenido[i], indice.id)
        if(this.etiqueta>=tope){
          this.hijos.push(this.contenido[i])
        }
      }
    }
    
    return this.hijos
}

  Igual(indice:any, tope:any, padre:any){
    this.contenido = JSON.parse(padre)
    this.hijos=[]
    if(indice.id!=undefined){
      for(let i=0; i<this.contenido.length; i++){
        this.getEtiqueta(this.contenido[i], indice.id)
        if(this.etiqueta==tope){
          this.hijos.push(this.contenido[i])
        }
      }
    }
    return this.hijos
  }

  Diferente(indice:any, tope:any, padre:any){
    this.contenido = JSON.parse(padre)
    this.hijos=[]
    if(indice.id!=undefined){
      for(let i=0; i<this.contenido.length; i++){
        this.getEtiqueta(this.contenido[i], indice.id)
        if(this.etiqueta!=tope){
          this.hijos.push(this.contenido[i])
        }
      }
    }
    return this.hijos
  }


    newEntorno(Contenido: any, nombre: string) {
    if (Contenido.length != undefined && Contenido!=null) {
        Contenido.forEach(element => {
            if(element.nombreInit!=undefined){
              if (element.nombreInit == nombre) {
  
                if (element.elementos !=null) {
  
                  this.contenido.push(element)
                }else{
  
                  this.contenido.push(element)
                }
              }else{
                let array=[]
                if(element.elementos!=null){
                  array.push(element.elementos)
                  this.newEntorno(array,nombre)
                }
              }
            }else if(element.lista!=undefined){
  
              if(element!=null){
                element.lista.forEach(elemento2 => {
                  let array=[]
                  array.push(elemento2)
                  this.newEntorno(array,nombre);
              });
              }
            }
        });
      }else{
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
              this.newEntorno(array,nombre)
            }
          }
        }else if(Contenido.lista!=undefined){
  
            if(Contenido!=null){
                Contenido.lista.forEach(elemento2 => {
                let array=[]
                array.push(elemento2)
                this.newEntorno(array,nombre);
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
                this.newEntorno(array,nombre)
              }
            }
          }

        }
        return this.contenido
    }
    
    getText(padre:any){
      let texto=""
      padre.forEach(element => {
        texto+="\n"+ element.texto
      });
      return texto
    }

    recorrerElementos(Contenido:any){
      if(Contenido.lista!=undefined){
        for(let i=0; i<Contenido.lista.length; i++){
          this.recorrerElementos(Contenido.lista[i])
        }
      }else{
        this.texto+="\n"+ Contenido.texto
      }
    }

    getNode(padre:any){
      this.texto=""
      padre.forEach(element => {
        this.recorrerElementos(element.elementos)
      });
      return this.texto
    }

    getEtiqueta(padre:any, etiqueta:any){
      if(padre.lista!=undefined){
        for(let i=0; i<padre.lista.length; i++){
          this.getEtiqueta(padre.lista[i], etiqueta)
        }
      }else{
        if(padre.elementos!=undefined){
          this.getEtiqueta(padre.elementos, etiqueta)
        }else{
          if(padre.nombreInit==etiqueta){
            var n = String(padre.texto)
            var numero = n.replace(" ", "")
            this.etiqueta=Number(numero)
          }
        }
      }
    }
}
