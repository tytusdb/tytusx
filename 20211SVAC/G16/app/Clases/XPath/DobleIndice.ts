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
    tablasimbolos:[]
    constructor(contenido:any) {
        this.ejecuciones=contenido
    }

    execute(padre) {
      this.tablasimbolos = JSON.parse(localStorage.getItem("tablasimbolos"))
      this.encoding = localStorage.getItem("encoding")
      var contenido = this.ejecuciones.execute(padre)
      if(contenido.pred=="false"){
          const consulta = new ConsultasTS()
          let x:any = consulta.newEntorno(padre, contenido.id)
          if(x.length>1){
              localStorage.setItem("dad", JSON.stringify(x))
              //Guardando el padre anterior
              try{
                  localStorage.setItem("dadant", JSON.stringify(padre))
              }catch{
                  localStorage.setItem("dadant", padre)
              }
              
          }else if(x[0].Valor == undefined){
                  let lista = []
                  lista.push(x[0])
                  localStorage.setItem("dad", JSON.stringify(x[0]))
                  //Guardando el padre anterior
                  try{
                      localStorage.setItem("dadant", JSON.stringify(padre))
                  }catch{
                      localStorage.setItem("dadant", padre)
                  }
          }else{
              let lista = []
              lista.push(x[0].Valor.valor)
              var newdad = JSON.stringify(x[0].Valor.valor)
              localStorage.setItem("dad", newdad)
              //Guardando el padre anterior
              try{
                  localStorage.setItem("dadant", JSON.stringify(padre))
              }catch{
                  localStorage.setItem("dadant", padre)
              }
          }
      }else if(contenido.pred=="text"){
          const consulta = new ConsultasTS()
          var x= consulta.getText(padre)
          localStorage.setItem("dad", x)
          //Guardando el padre anterior
          try{
              localStorage.setItem("dadant", JSON.stringify(padre))
          }catch{
              localStorage.setItem("dadant", padre)
          }
      }else if(contenido.pred=="node"){
          const consulta = new ConsultasTS()
          var x= consulta.getNode(padre)
          localStorage.setItem("dad", x)
          //Guardando el padre anterior
          try{
              localStorage.setItem("dadant", JSON.stringify(padre))
          }catch{
              localStorage.setItem("dadant", padre)
          }
      }else if(contenido.pred=="atributoid"){
          const consulta = new ConsultasTS()
          let w = consulta.getOnlyAtributo(padre, contenido.id.indice)
          localStorage.setItem("dad", w)
          //Guardando el padre anterior
          try{
              localStorage.setItem("dadant", JSON.stringify(padre))
          }catch{
              localStorage.setItem("dadant", padre)
          }
      }else if(contenido.pred=="atributoT"){//SI VIENE SOLO UN ATRIBUTO
          const consulta = new ConsultasTS()
          let w = consulta.getOnlyAtributo(padre, "all")
          localStorage.setItem("dad", w)
          //Guardando el padre anterior
          try{
              localStorage.setItem("dadant", JSON.stringify(padre))
          }catch{
              localStorage.setItem("dadant", padre)
          }
      }else if(contenido.pred=="dospuntos"){
          let x
          try{
              x = JSON.parse(localStorage.getItem("dadant"))
              localStorage.setItem("dad", JSON.stringify(x))
          }catch{
              x = localStorage.getItem("dadant")
              localStorage.setItem("dad", x)
          }
          
      }else if(contenido.pred=="punto"){

      }else if (contenido.pred=="menor"){
          console.log(contenido)
          const consulta = new ConsultasTS()
          let w = consulta.Menor(contenido.id.indice, contenido.id.tope, padre)
          localStorage.setItem("dad", JSON.stringify(w))
         //Guardando el padre anterior
          try{
              localStorage.setItem("dadant", JSON.stringify(padre))
          }catch{
              localStorage.setItem("dadant", padre)
          }
      }else{//ACA ENTRA SI VIENE CON PREDICADO
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
          }
          //PARA EL PREDICADO
          let pred = contenido.pred.execute(entornotmp)
          //VERIFICAR QUE TIPO DE PREDICADO ES:
          if (pred.pred!=undefined){
              if (pred.pred=="menor"){
                  const consulta = new ConsultasTS()
                  let w = consulta.Menor(pred.id.indice, pred.id.tope, entornotmp)
                  localStorage.setItem("dad", JSON.stringify(w))
                 //Guardando el padre anterior
                  try{
                      localStorage.setItem("dadant", JSON.stringify(padre))
                  }catch{
                      localStorage.setItem("dadant", entornotmp)
                  }
              }else if (pred.pred=="mayor"){
                  const consulta = new ConsultasTS()
                  let w = consulta.Mayor(pred.id.indice, pred.id.tope, entornotmp)
                  localStorage.setItem("dad", JSON.stringify(w))
                  //Guardando el padre anterior
                  try{
                      localStorage.setItem("dadant", JSON.stringify(padre))
                  }catch{
                      localStorage.setItem("dadant", entornotmp)
                  }
              }else if (pred.pred=="menori"){
                  const consulta = new ConsultasTS()
                  let w = consulta.Menori(pred.id.indice, pred.id.tope, entornotmp)
                  localStorage.setItem("dad", JSON.stringify(w))
                  //Guardando el padre anterior
                  try{
                      localStorage.setItem("dadant", JSON.stringify(padre))
                  }catch{
                      localStorage.setItem("dadant", entornotmp)
                  }
              }else if (pred.pred=="mayori"){
                  const consulta = new ConsultasTS()
                  let w = consulta.Mayori(pred.id.indice, pred.id.tope, entornotmp)
                  localStorage.setItem("dad", JSON.stringify(w))
                  //Guardando el padre anterior
                  try{
                      localStorage.setItem("dadant", JSON.stringify(padre))
                  }catch{
                      localStorage.setItem("dadant", entornotmp)
                  }
              }else if (pred.pred=="igual"){
                  const consulta = new ConsultasTS()
                  let w = consulta.Igual(pred.id.indice, pred.id.tope, entornotmp)
                  localStorage.setItem("dad", JSON.stringify(w))
                  //Guardando el padre anterior
                  try{
                      localStorage.setItem("dadant", JSON.stringify(padre))
                  }catch{
                      localStorage.setItem("dadant", entornotmp)
                  }
              }else if (pred.pred=="noigual"){
                  const consulta = new ConsultasTS()
                  let w = consulta.Diferente(pred.id.indice, pred.id.tope, entornotmp)
                  localStorage.setItem("dad", JSON.stringify(w))
                  //Guardando el padre anterior
                  try{
                      localStorage.setItem("dadant", JSON.stringify(padre))
                  }catch{
                      localStorage.setItem("dadant", entornotmp)
                  }
              }else if(pred.pred=="atributoid"){//SI VIENE SOLO UN ATRIBUTO
                  const consulta = new ConsultasTS()
                  let w = consulta.getAtributo(entornotmp, pred.id.indice)
                  localStorage.setItem("dad", JSON.stringify(w))
                  //Guardando el padre anterior
                  try{
                      localStorage.setItem("dadant", JSON.stringify(padre))
                  }catch{
                      localStorage.setItem("dadant", entornotmp)
                  }
              }else if(pred.pred=="atributoT"){//SI VIENE SOLO UN ATRIBUTO
                  const consulta = new ConsultasTS()
                  let w = consulta.getAtributo(entornotmp, "all")
                  localStorage.setItem("dad", JSON.stringify(w))
                  //Guardando el padre anterior
                  try{
                      localStorage.setItem("dadant", JSON.stringify(padre))
                  }catch{
                      localStorage.setItem("dadant", entornotmp)
                  }
              }
          }else{//SI ENTRA ACÁ ES POR QUE VIENE DIRECTO UN NUMERO NO UN ARREGLO DE NUMEROS.
                  const consulta = new ConsultasTS()
                  let w = consulta.getPredicado(entornotmp, pred)
                  localStorage.setItem("dad", JSON.stringify(w))
                  //Guardando el padre anterior
                  try{
                      localStorage.setItem("dadant", JSON.stringify(padre))
                  }catch{
                      localStorage.setItem("dadant", entornotmp)
                  }
          }
      }
    }
}