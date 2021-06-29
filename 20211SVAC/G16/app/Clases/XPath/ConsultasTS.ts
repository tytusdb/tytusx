import { ToastrService } from 'ngx-toastr';



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

    getPredicado(indice:number, etiqueta:any, padre:any):any{
        this.contenido = [];
        this.getEntornoActual(etiqueta, padre)
          for (let i= 0; i < this.contenido.length; i++) {
            if (i == (indice - 1)) {
              this.hijos.push(this.contenido[i]);
            }
          }
          this.contenido = [];
          this.contenido = this.hijos;
        return this.contenido
    }

    Concatenar(indice:any, tope:any, etiqueta:any, padre:any){
        this.contenido = []
        this.hijos=[];
        this.getEntornoActual(etiqueta, padre)
        for (let i = indice; i<tope; i++){
            for(let j = 0; j < this.contenido.length; j++){
                if (j==(i-1)){
                    this.hijos.push(this.contenido[j])
                }
            }
        }
        return this.hijos
    }

}
