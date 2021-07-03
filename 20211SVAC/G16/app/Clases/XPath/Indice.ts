import { NodoAbs } from "./NodoAbs";
import { ConsultasTS } from "./ConsultasTS.js";
import { ToastrService } from 'ngx-toastr';
import { Formato } from '../Models/Formato'
import { If } from "../Hijos/If";
import { Console } from "console";

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
        this.encoding = localStorage.getItem("encoding");
        var contenido = this.ejecuciones.execute(padre)
        if(contenido.pred=="false"){
            const consulta = new ConsultasTS()
            let x:any = consulta.newEntorno(padre, contenido.id)
            if(x.length>1){
                localStorage.setItem("dad", JSON.stringify(x))
            }else if(x[0].Valor == undefined){
                    let lista = []
                    lista.push(x[0])
                    localStorage.setItem("dad", JSON.stringify(x[0]))
            }else{
                let lista = []
                lista.push(x[0].Valor.valor)
                var newdad = JSON.stringify(x[0].Valor.valor)
                localStorage.setItem("dad", newdad)
            }
        }else if(contenido.pred=="text"){
            const consulta = new ConsultasTS()
            var x= consulta.getText(padre)
            localStorage.setItem("dad", x)
        }else if(contenido.pred=="node"){
            const consulta = new ConsultasTS()
            var x= consulta.getNode(padre)
            localStorage.setItem("dad", x)
        }else{
            let entornotmp:any
            const consulta = new ConsultasTS()
            let x:any = consulta.newEntorno(padre, contenido.id)
            if(x.length>1){
                entornotmp = JSON.stringify(x)
            }else if(x[0].Valor == undefined){
                    let lista = []
                    lista.push(x[0])
                    entornotmp = JSON.stringify(x[0])
            }else{
                let lista = []
                lista.push(x[0].Valor.valor)
                entornotmp = JSON.stringify(x[0].Valor.valor)
                localStorage.setItem("dad", newdad)
            }
            //PARA EL PREDICADO
            let pred = contenido.pred.execute(entornotmp)
            //VERIFICAR QUE TIPO DE PREDICADO ES:
            if (pred.pred!=undefined){
                if (pred.pred=="menor"){
                    const consulta = new ConsultasTS()
                    let w = consulta.Menor(pred.id.indice, pred.id.tope, entornotmp)
                    localStorage.setItem("dad", JSON.stringify(w))
                }else if (pred.pred=="mayor"){
                    const consulta = new ConsultasTS()
                    let w = consulta.Mayor(pred.id.indice, pred.id.tope, entornotmp)
                    localStorage.setItem("dad", JSON.stringify(w))
                }else if (pred.pred=="menori"){
                    const consulta = new ConsultasTS()
                    let w = consulta.Menori(pred.id.indice, pred.id.tope, entornotmp)
                    localStorage.setItem("dad", JSON.stringify(w))
                }else if (pred.pred=="mayori"){
                    const consulta = new ConsultasTS()
                    let w = consulta.Mayori(pred.id.indice, pred.id.tope, entornotmp)
                    localStorage.setItem("dad", JSON.stringify(w))
                }else if (pred.pred=="igual"){
                    const consulta = new ConsultasTS()
                    let w = consulta.Igual(pred.id.indice, pred.id.tope, entornotmp)
                    localStorage.setItem("dad", JSON.stringify(w))
                }else if (pred.pred=="noigual"){
                    const consulta = new ConsultasTS()
                    let w = consulta.Diferente(pred.id.indice, pred.id.tope, entornotmp)
                    localStorage.setItem("dad", JSON.stringify(w))
                }
            }else{//SI ENTRA ACÁ ES POR QUE VIENE DIRECTO UN NUMERO NO UN ARREGLO DE NUMEROS.
                const consulta = new ConsultasTS()
                let w = consulta.getPredicado(entornotmp, pred)
                localStorage.setItem("dad", JSON.stringify(w))
            }
        }
    }

}