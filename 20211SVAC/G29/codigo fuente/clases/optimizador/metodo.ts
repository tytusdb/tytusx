import {instruccion_3d} from "./instruccion_3d";
import goto_expresion from "./goto_expresion";
import if_expresion from "./if_expresion";
import etiqueta from "./etiqueta";
import eliminado from "./eliminado";
import call_funcion from "./call_funcion";
import {InsertarOptimizacion} from "../../reports/ReportController";
import {r3JitTypeSourceSpan} from "@angular/compiler";
import asignacion from "./asignacion";

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
    return '\n'+ this.tipo + " " + this.met + '(){\n' + this.recolectar_string() + '\n}';
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

  optimizarCaso3(){
    for (let i = 0; i < this.intrucciones_3d.length; i++){
      let comprobar = '';
      let result = false;
      if(this.intrucciones_3d[i] instanceof if_expresion){
        let temp : instruccion_3d = this.intrucciones_3d[i];
        try{
          comprobar = "return " + temp.getLogica();
          result = new Function(comprobar)();
        }catch (e){

        }
        if(result == true){
          InsertarOptimizacion("regla 3", "se remplazo:" + this.intrucciones_3d[i].getText() + " por goto " + temp.etiqueta)
          this.intrucciones_3d[i] = new goto_expresion(temp.etiqueta);
        }
      }
    }
  }

  optimizarCaso4(){
    for (let i = 0; i < this.intrucciones_3d.length; i++){
      let comprobar = '';
      let result = true;
      if(this.intrucciones_3d[i] instanceof if_expresion){
        let temp : instruccion_3d = this.intrucciones_3d[i];
        try{
          comprobar = "return " + temp.getLogica();
          result = new Function(comprobar)();
        }catch (e){

        }
        if(result == false){
          InsertarOptimizacion("regla 4", "se elimino instruccion no se entra al " + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new eliminado();
        }
      }
    }
  }

  optimizarCaso5(){
    let clase1 : asignacion;
    let numero1 : number;
    let clase2 : asignacion;
    let numero2 : number;
    for (let i = 0; i < this.intrucciones_3d.length; i++){
      if(this.intrucciones_3d[i] instanceof asignacion){
        clase1 = this.intrucciones_3d[i] as asignacion;
        numero1 = i+1;
        for (let j = i+1; j < this.intrucciones_3d.length; j++){
          if(this.intrucciones_3d[j] instanceof asignacion){
            clase2 = this.intrucciones_3d[j] as asignacion;
            numero2 = j;
            if( clase1.variable == clase2.izq && clase2.variable == clase1.izq){
              if(clase1.der == '' && clase2.der == "" && clase1.operador == "" && clase2.operador == "" ) {
                  if(this.eliminarAsignacion(clase1,numero1,clase2,numero2)){
                    if(!this.intrucciones_3d[j].getText().includes("[")){
                      InsertarOptimizacion("regla 5" , "se elimino asignacion redundante " + this.intrucciones_3d[j].getText());
                      this.intrucciones_3d[j] = new eliminado();
                    }
                  }
              }
            }
          }
        }
      }
    }
  }

  optimizarCaso6(){
    for (let i = 0; i < this.intrucciones_3d.length; i++){
      if(this.intrucciones_3d[i] instanceof asignacion){
        let temp : asignacion = this.intrucciones_3d[i] as asignacion;
        if(temp.variable == temp.izq && temp.operador == "+" && temp.der == "0" ||
          temp.variable == temp.der && temp.operador == "+" && temp.izq == "0"
          ){
          InsertarOptimizacion("regla 6" , "se elimino la instruccion " + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new eliminado();
        }
        if(temp.variable == temp.izq && temp.operador == "-" && temp.der == "0"){
          InsertarOptimizacion("regla 7" , "se elimino la instruccion " + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new eliminado();
        }
        if(temp.variable == temp.izq && temp.operador == "*" && temp.der == "1" ||
          temp.variable == temp.der && temp.operador == "*" && temp.izq == "1"){
          InsertarOptimizacion("regla 8" , "se elimino la instruccion " + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new eliminado();
        }
        if(temp.variable == temp.izq && temp.operador == "/" && temp.der == "1"){
          InsertarOptimizacion("regla 9" , "se elimino la instruccion " + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new eliminado();
        }
      }
    }
  }

  optimizarCaso7(){
    for (let i = 0; i < this.intrucciones_3d.length; i++){
      if(this.intrucciones_3d[i] instanceof asignacion){
        let temp : asignacion = this.intrucciones_3d[i] as asignacion;
        if(temp.variable != temp.izq && temp.operador == "+" && temp.der == "0"){
          InsertarOptimizacion("regla 10" , "se optimizo quitando la operacion +0 en :"  + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new asignacion(temp.variable, temp.izq, "" , "");
        }
        if(temp.variable != temp.der && temp.operador == "+" && temp.izq == "0"){
          InsertarOptimizacion("regla 10" , "se optimizo quitando la operacion +0 en :"  + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new asignacion(temp.variable, temp.der, "" , "");
        }
        if(temp.variable != temp.izq && temp.operador == "-" && temp.der == "0"){
          InsertarOptimizacion("regla 11" , "se optimizo quitando la operacion -0 en :"  + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new asignacion(temp.variable, temp.izq, "" , "");
        }
        if(temp.variable != temp.izq && temp.operador == "*" && temp.der == "1"){
          InsertarOptimizacion("regla 12" , "se optimizo quitando la operacion *1 en :"  + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new asignacion(temp.variable, temp.izq, "" , "");
        }
        if(temp.variable != temp.der && temp.operador == "*" && temp.izq == "1"){
          InsertarOptimizacion("regla 12" , "se optimizo quitando la operacion *1 en :"  + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new asignacion(temp.variable, temp.der, "" , "");
        }
        if(temp.variable != temp.izq && temp.operador == "/" && temp.der == "1"){
          InsertarOptimizacion("regla 13" , "se optimizo quitando la operacion /1 en :"  + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new asignacion(temp.variable, temp.izq, "" , "");
        }

      }
    }
  }

  optimizarCaso8(){
    for (let i = 0; i < this.intrucciones_3d.length; i++){
      if(this.intrucciones_3d[i] instanceof asignacion){
        let temp : asignacion = this.intrucciones_3d[i] as asignacion;
        if(temp.variable != temp.izq && temp.operador == "*" && temp.der == "2"){
          InsertarOptimizacion("regla 14" , "se optimizo quitando el *2 y sumando por si mismo en :" + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new asignacion(temp.variable, temp.izq, "+", temp.izq);
        }
        if(temp.variable != temp.der && temp.operador == "*" && temp.izq == "2"){
          InsertarOptimizacion("regla 14" , "se optimizo quitando el *2 y sumando por si mismo en :" + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new asignacion(temp.variable, temp.der, "+", temp.der);
        }
        if(temp.operador == "*" && temp.der == "0"){
          InsertarOptimizacion("regla 15" , "se optimizo colocando = 0 en :" + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new asignacion(temp.variable, "0", "", "");
        }
        if(temp.operador == "*" && temp.izq == "0"){
          InsertarOptimizacion("regla 15" , "se optimizo colocando = 0 en :" + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new asignacion(temp.variable, "0", "", "");
        }
        if(temp.operador == "/" && temp.izq == "0"){
          InsertarOptimizacion("regla 16" , "se optimizo colocando = 0 en :" + this.intrucciones_3d[i].getText());
          this.intrucciones_3d[i] = new asignacion(temp.variable, "0", "", "");
        }

      }
    }
  }

  eliminarAsignacion(clase1 : asignacion, numero1 : number, clase2 : asignacion, numero2 : number) : boolean{
    for(let i = numero1; i < numero2; i++){
      if(this.intrucciones_3d[i] instanceof asignacion){
        let temp : asignacion = this.intrucciones_3d[i] as asignacion;
        // comprobar si alguno de los 2 numeros cambia
        if(temp.variable == clase1.variable || temp.variable == clase2.variable){
          return false;
        }
      }
      else if(this.intrucciones_3d[i] instanceof metodo || this.intrucciones_3d[i] instanceof if_expresion ||
        this.intrucciones_3d[i] instanceof goto_expresion){
         return false;
      }
    }
    return true;
  }

  eliminarCodigo(listaEliminar : Array<Number>){
    for(let x of listaEliminar){
        if(!(x instanceof eliminado) ){
          InsertarOptimizacion("regla 1", "se elimino codigo inalcanzable:" + this.intrucciones_3d[x.valueOf()].getText() )
          this.intrucciones_3d[x.valueOf()] = new eliminado();
        }
    }
  }

  recolectar_string(): string{
    let r : string = "";
    for(let t of this.intrucciones_3d){
       if(!(t instanceof eliminado)){
         console.log(t);
         try{
           r+= t.getText() + "\n";
         }catch (e){

         }
       }
    }
    return r;
  }

  getLogica(): string {
    return '';
  }

  etiqueta : string;
}
