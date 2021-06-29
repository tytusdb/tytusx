import { NodoAbs } from "./NodoAbs";
import { ConsultasTS } from "./ConsultasTS.js";
import { ToastrService } from 'ngx-toastr';
import { Formato } from '../Models/Formato'
import { If } from "../Hijos/If";

export class Indice implements NodoAbs {
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
            var x = consulta.getEntornoActual(contenido.id, padre)
            const formato = new Formato(x, this.toastr, this.encoding);
            var y = formato.darFormato()
            console.log(y)
            localStorage.setItem("dad", contenido.id)
        }else{
            localStorage.setItem("idtmp", contenido.id)
            let pred = contenido.pred.execute(padre)
            //VALIDACIÓN SI VIENE ALGO EN .pred
            if (pred.pred!=undefined){
                if (pred.pred=="menor"){
                    const consulta = new ConsultasTS()
                    let w = consulta.Concatenar(pred.id.indice, pred.id.tope, contenido.id, padre)
                    const formato2= new Formato(w, this.toastr, this.encoding)
                    console.log(formato2.darFormato())
                }
            }else{//SI ENTRA ACÁ ES POR QUE VIENE DIRECTO UN NUMERO NO UN ARREGLO DE NUMEROS.
                const consulta = new ConsultasTS()
                let x = consulta.getPredicado(pred, contenido.id, padre)
                const formato = new Formato(x, this.toastr, this.encoding);
                var y = formato.darFormato()
                console.log(y)//VA PARA SALIDA
            }
            localStorage.setItem("dad", contenido.id)
        }
    }

}