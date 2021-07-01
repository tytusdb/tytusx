import {instruccion_3d} from "./instruccion_3d";
import goto_expresion from "./goto_expresion";
import if_expresion from "./if_expresion";
import etiqueta from "./etiqueta";
import eliminado from "./eliminado";
import call_funcion from "./call_funcion";
import {InsertarOptimizacion} from "../../reports/ReportController";
import {r3JitTypeSourceSpan} from "@angular/compiler";

export default class metodo implements instruccion_3d{

  intrucciones_3d : Array<instruccion_3d>;
  public tipo : string;
  public met : string;

  constructor(tipo:string, met: string ) {
    this.intrucciones_3d = new Array<instruccion_3d>();
    this.tipo = tipo;
    this.met = met;
  }

  getText(){
    return this.tipo + " " + this.met + '(){\n' + this.recolectar_string() + '}';
  }

  ejecutar() {
  }

  insertar(instruccion: any) {
    this.intrucciones_3d.push(instruccion);
  }

  insertar_lista(lista: Array<any>) {
    for(let x of lista){
      this.intrucciones_3d.push(x);
    }
  }

  optimizarCaso1(){
    let listaparaEliminar : Array<Number> = [];
    for (let i = 0; i < this.intrucciones_3d.length; i++){
     if(this.intrucciones_3d[i] instanceof goto_expresion){
       for (let j = i+1; j < this.intrucciones_3d.length; j++){
           if(!(this.intrucciones_3d[j] instanceof etiqueta)){
             listaparaEliminar.push(j);
             alert(j);
           }else{
             this.eliminarCodigo(listaparaEliminar);
             listaparaEliminar = [];
             i = j;
             break;
           }
       }
     }
    }
  }

  optimizarCaso2(){
    for (let i = 0; i < this.intrucciones_3d.length; i++){
      let comprobar = '';
      let result = false;
      if(this.intrucciones_3d[i] instanceof if_expresion){
        let temp : instruccion_3d = this.intrucciones_3d[i];
        try{
          comprobar = "return " + temp.getLogica();
          result = new Function(comprobar)();
          alert(result);
        }catch (e){

        }
        if(result == true){
          alert("entre caso 2");
          this.intrucciones_3d[i] = new goto_expresion(temp.etiqueta);
        }
      }
    }
  }

  eliminarCodigo(listaEliminar : Array<Number>){
    for(let x of listaEliminar){
        InsertarOptimizacion("regla 1", "se elimino codigo :" + this.intrucciones_3d[x.valueOf()].getText() )
        this.intrucciones_3d[x.valueOf()] = new eliminado();
    }
  }

  recolectar_string(): string{
    let r : string = "";
    for(let t of this.intrucciones_3d){
       if(!(t instanceof eliminado)){
         r+= t.getText() + "\n";
       }
    }
    return r;
  }

  getLogica(): string {
    return '';
  }

  etiqueta : string;
}
