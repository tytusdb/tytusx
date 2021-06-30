import { NodoAbs } from "./NodoAbs";
import { Formato } from '../Models/Formato'
import { ConsultasTS } from "./ConsultasTS.js";
import { ToastrService } from 'ngx-toastr';
export class DobleIndice implements NodoAbs {
    ejecuciones:any
    entorno:string
    encoding
    contenido:any
    toastr: ToastrService
    tablasimbolos:any
    constructor(contenido:any) {
        this.ejecuciones=contenido
    }

    execute(padre) {
        this.tablasimbolos = JSON.parse(localStorage.getItem("tablaSimbolo"))
        this.encoding = localStorage.getItem("encoding");
        var contenido = this.ejecuciones.execute(padre)
        if(contenido.pred=="false"){
            const consulta = new ConsultasTS()
            var x = consulta.getEntornoLibre(contenido.id)
            const formato = new Formato(x, this.toastr, this.encoding);
            var y = formato.darFormato()
            console.log(y)//VA PARA SALIDA
            localStorage.setItem("dad", contenido.id)
        }else{
          localStorage.setItem("idtmp", contenido.id)
          let pred = contenido.pred.execute(padre)
          const consulta = new ConsultasTS()
          let x = consulta.getPredicado(pred, contenido.id, padre)
            const formato = new Formato(x, this.toastr, this.encoding);
            var y = formato.darFormato()
            console.log(y)//VA PARA SALIDA
          
          localStorage.setItem("dad", contenido.id)
          
        }
    }
}