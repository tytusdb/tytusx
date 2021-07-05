import { asign } from "./asign";
import { comando } from "./comando";

export class optimizadorC {
    raiz:Object;
    traduccion:String;
    reglas = new Array<String>();
    comandos = new Array<comando>();
    asignaciones = new Array<asign>();
    
    constructor(raiz){
        this.raiz=raiz;
        this.traduccion = this.recorrer(this.raiz);
        
          
    }


    recorrer(nodo:any){
        //PRINCIPAL
        if (this.soyNodo('/', nodo)){
            let contenido="";
            nodo.hijos.forEach(hijo => {
                contenido+=this.recorrer(hijo);
            });
            return contenido;
        }

        //LIBRERIAS
        if (this.soyNodo('LIBRERIA', nodo)){
            return `#include ${nodo.hijos[0]}\n`;
        }

        //RETURN
        if (this.soyNodo('RETURN', nodo)){
            if (nodo.hijos.length>0){
                
                return `return ${this.recorrer(nodo.hijos[0])};\n`;
            }
            return `return;\n`;
        }

        //PRINT
        if (this.soyNodo('PRINT', nodo)){
            if (nodo.hijos.length==1){
                return `printf("${nodo.hijos[0]}");\n`
            }else{
                return `printf("${nodo.hijos[0]}",${this.recorrer(nodo.hijos[1])});\n`;
            }
        }

        //LISTAE

        if (this.soyNodo('LISTA_E', nodo)){
            let co = ``;
            let i = 0;
            nodo.hijos.forEach(son => {
                
                if (i+1==nodo.hijos.length){
                    co+=this.recorrer(son);
                }else{
                    co+=this.recorrer(son)+`,`;
                }
                i++;
            });
            return co;
        }
        



        //GOTO
        if(this.soyNodo('GOTO', nodo)){
            this.comandos.push(new comando(nodo.hijos[0], nodo.linea, true));
            //TODO REVISAR EL ETIQUETA POSIBLE REGLA
            return `goto ${nodo.hijos[0]};\n`;
        }

        //LABEL
        if(this.soyNodo('LABEL',  nodo)){
            //TODO GUARDAR ESTA ETIQUETA Y SU LINEA
            this.comandos.push(new comando(nodo.hijos[0], nodo.linea, false));
            return nodo.hijos[0]+`:\n`;
        }

        //                  FUNCIONES
        if (this.soyNodo('LLAMAR_FUNCION', nodo)){
            return nodo.hijos[0]+`();\n`;
        }

        if (this.soyNodo('CREAR_FUNCION', nodo)){
            let co = nodo.hijos[0]+" "+nodo.hijos[1] +"(){\n";
            nodo.hijos[2].forEach(e => {
                co+="\t"+this.recorrer(e);
            });
            co+="\n }\n";
            return co;
        }
        //                  TERMINA FUNCIONES

        //          EMPIEZA DECLARACION

        if (this.soyNodo('DECLARACION', nodo)){
            //DECLARACION TIPO LISTA_S
            
            let c=nodo.hijos[0]+" "+this.recorrer(nodo.hijos[1])+";\n";;
            
            return c;
        }

        if (this.soyNodo('LISTA_S', nodo)){
            
            let co = ``;
            let i = 0;
            nodo.hijos.forEach(son => {
                
                if (i+1==nodo.hijos.length){
                    co+=this.recorrer(son);
                }else{
                    co+=this.recorrer(son)+`,`;
                }
                i++;
            });
            return co;
        }

        if (this.soyNodo('DECLARACION2', nodo)){
            return nodo.hijos[0]+" "+nodo.hijos[1] +"="+this.recorrer(nodo.hijos[2])+";\n";
        }

        //          TERMINA DECLARACION

        //          IF

        if(this.soyNodo('IF', nodo)){
            //TODO GUARDAR LINEA GUARDAR CONDICION
            
            return this.Regla3_4(nodo);
            /*
            let c =`if (${this.recorrer(nodo.hijos[0])}) goto ${nodo.hijos[1]};\n`;
            return c;*/
        }



        //          TERMINA IF





        //          COMIENZA ASIGNACION
        if (this.soyNodo('ASIGNACION', nodo)){
            //TODO VERIFICAR REGLAS
            return this.Reglas6_16(nodo.hijos[0], nodo.hijos[1]);
        }
        if (this.soyNodo('ASIGNACIONV', nodo)){
            //TODO VERIFICAR REGLAS
            return `${nodo.hijos[0]}[${this.recorrer(nodo.hijos[1])}]=${this.recorrer(nodo.hijos[2])};\n`;
        }

        //          TERMINA ASIGNACION



        /*                           EXPRESIONES                       */ 


        if(this.soyNodo('E',nodo)){
            //PRIMER CASO EN EL QUE EL HIJO ES SOLO UNO
            if (nodo.hijos.length==1){
                return this.recorrer(nodo.hijos[0]);
                //SEGUNDO CASO EN EL QUE TENEMOS 2 HIJOS
            }else if(nodo.hijos.length==2){
                //SOLO PODEMOS TENER 2 CASOS 
                //!E
                //-E
                //TODO REVISAR CASO
                return nodo.hijos[0]+this.recorrer(nodo.hijos[1]);
                
            }else{
                return this.recorrer(nodo.hijos[0])+nodo.hijos[1]+this.recorrer(nodo.hijos[2]);
            }
        }

        /**
         * 
         * 
         * 
         */
        
        //PARA EL ID
        if (this.soyNodo("ID", nodo)){
            return nodo.hijos[0];
        }
        if (this.soyNodo('CORCHETE', nodo)){
            return `[${this.recorrer(nodo.hijos[0])}]`;
        }
        if (this.soyNodo('CORCHETE_ID', nodo)){
            return `${nodo.hijos[0]}[${this.recorrer(nodo.hijos[1])}]`;
        }
        if (this.soyNodo('NUM', nodo)){
            return nodo.hijos[0];
        }
        if (this.soyNodo('CADENA', nodo)){
            return `"${nodo.hijos[0]}"`;
        }
        if (this.soyNodo('CAST', nodo)){
            return `(${nodo.hijos[0]})${this.recorrer(nodo.hijos[1])}`;
        }
        

        



        return"";
    }





    /**
   * Funcion para determinar en que tipo de nodo estoy
   * @param label
   * @param nodo
   */
  soyNodo(label: string, nodo: any): boolean {
    if (nodo == null || !(nodo instanceof Object)) {
      return false;
    }
    if (nodo.hasOwnProperty('label') && nodo.label != null) {
      return nodo.label === label;
    }
    return false;
  }

  Reglas6_16(nodoD:any,nodo:any){
      //TODO QUE PASA SI TENEMOS HIJOS MAYOR MENOR A 2
      let con="", p="", s="", id="";
      id = nodoD+"";
      if(nodo.hijos.length<3){
          let valor = this.recorrer(nodo);
          if (isNaN(valor) && nodo.hijos.length==1){
            this.asignaciones.push(new asign(id, this.recorrer(nodo), nodo.linea));    
          }
          
          return id+"="+this.recorrer(nodo)+";\n";
      }else{
          //SI TENEMOS HIJOS IGUAL A 3
        
        p = this.recorrer(nodo.hijos[0]);
        s = this.recorrer(nodo.hijos[2]);
        //DEPENDENDO DEL CASO VAMOS A ACTUAR CONFORME NOS DICTA
  
        //DEBEMOS SABER PRIMERO SI ES UN NUMERO
        //O UN ID
        //NOS SIRVE MAS SI ES UN UMERO
        switch(nodo.hijos[1]){
          case "+":
              if (p=="0"){
                  if (id==s){
                      //EJEMPLO
                      //T0 = 0 + T0
                      this.reglas.push(`REGLA 6 >>      RESULTADO eliminado      >> LINEA ${nodo.linea+1}`);
                      return "";
                  }else{
                      //EJEMPLO
                      //T0 = 0 + T1
                      con = id+"="+s+";\n";
                      this.reglas.push(`REGLA 10     >> RESULTADO: "${con}"     >> LINEA:${nodo.linea+1}`);
                  }
              }
              else if (s=="0"){
                  if (id==p){
                      //EJEMPLO
                      //T0 = T0 + 0
                      this.reglas.push(`REGLA 6     >> RESULTADO eliminado      >> LINEA ${nodo.linea+1}`);
                      return "";
                  }else{
                      //EJEMPLO
                      //T0 = 0 + T1
                      con = id+"="+p+";\n";
                      this.reglas.push(`REGLA 10    >> RESULTADO: "${con}"      >> LINEA:${nodo.linea+1}`);
                  }
              }else{
                  con = id+"="+p+"+"+s+";\n";
              }
              break;
          case "-":
              if (p=="0"){
                  if (id==s){
                      //EJEMPLO
                      //T0 = 0 - T0
                      this.reglas.push(`REGLA 7         >> RESULTADO eliminado          >> LINEA ${nodo.linea+1}`);
                      return "";
                  }else{
                      //EJEMPLO
                      //T0 = 0 - T1
                      con = id+"="+s+";\n";
                      this.reglas.push(`REGLA 11        >> RESULTADO: "${con}"       >> LINEA:${nodo.linea+1}`);
                  }
              }
              else if (s=="0"){
                  if (id==p){
                      //EJEMPLO
                      //T0 = T0 - 0
                      this.reglas.push(`REGLA 7         >> RESULTADO eliminado      >> LINEA ${nodo.linea+1}`);
                      return "";
                  }else{
                      //EJEMPLO
                      //T0 = 0 - T1
                      con = id+"="+p+";\n";
                      this.reglas.push(`REGLA 11        >> RESULTADO: "${con}"      >> LINEA:${nodo.linea+1}`);
                  }
              }else{
                  con = id+"="+p+"-"+s+";\n";
              }
              break;
          case "*":
              if (p=="0"){
                  //EJEMPLO
                  // T1 = 0 *T2
                  con = id+"=0;\n";
                  this.reglas.push(`REGLA 15        >> RESULTADO ${con}         >> LINEA:${nodo.linea+1}`);
                  
              }else if (p=="1"){
                  if (id==s){
                      //EJEMPLO
                      //T0 = 1 * T0
                      this.reglas.push(`REGLA 8     >> RESULTADO eliminado      >> LINEA ${nodo.linea+1}`);
                      return "";
                  }else{
                      //EJEMPLO
                      //T0 = 1 * T1
                      con = id+"="+s+";\n";
                      this.reglas.push(`REGLA 12        >> RESULTADO: "${con}"       >> LINEA:${nodo.linea+1}`);
                  }
              }else if (p=="2"){
                  //EJEMPLO
                  //T1 = 2*T2
                  con = id+"="+s+"+"+s+";\n";
                  this.reglas.push(`REGLA 14        >> RESULTADO: ${con}        >> LINEA:${nodo.linea+1}`);
              }
  
  
              //EL LADO DE S
              
              else if (s=="0"){
                  //EJEMPLO
                  // T1 = T2*0
                  con = id+"=0;\n";
                  this.reglas.push(`REGLA 15        >> RESULTADO ${con}      >> LINEA:${nodo.linea+1}`);
                  
              }else if (s=="1"){
                  if (id==p){
                      //EJEMPLO
                      //T0 = T0*1
                      this.reglas.push(`REGLA 8     >> RESULTADO eliminado      >> LINEA ${nodo.linea+1}`);
                      return "";
                  }else{
                      //EJEMPLO
                      //T0 = T1 * 1
                      con = id+"="+p+";\n";
                      this.reglas.push(`REGLA 12        >> RESULTADO: "${con}"      >> LINEA:${nodo.linea+1}`);
                  }
              }else if (s=="2"){
                  //EJEMPLO
                  //T1 = T2 * 2
                  con = id+"="+p+"+"+p+";\n";
                  this.reglas.push(`REGLA 14     >> RESULTADO: ${con}        >> LINEA:${nodo.linea+1}`);
              } 
              
              
              else{
                  con = id+"="+p+"*"+s+";\n";
              }
              break;
          case "/":
              if (p=="0"){
                  con = id+"=0;\n";
                  this.reglas.push(`REGLA 16        >> RESULTADO ${con}      >> LINEA ${nodo.linea+1}`);
              }else if (s=="1"){
                  if (id==p){
                      this.reglas.push(`REGLA 9         >> RESULTADO eliminado      >> LINEA ${nodo.linea+1}`);
                      return "";
                  }else{
                      con = id+'='+p+";\n";
                      this.reglas.push(`REGLA 13        >> RESULTADO ${con}         >> LINEA ${nodo.linea+1}`)
                  }
              }else{
                  con = id+"="+p+"/"+s+";\n";
              }
              break;
          default:
              con = this.recorrer(nodo.hijos[0])+nodo.hijos[1]+this.recorrer(nodo.hijos[2]);
              break;
        }
        return con;
      }
      
  }

  Regla3_4(nodo:any){

    //NOS ASEGURAMOS QUE SEA E -> E SIGNO E
    if (nodo.hijos[0].hijos.length>2){
        let pri = this.recorrer(nodo.hijos[0].hijos[0])
        let seg = this.recorrer(nodo.hijos[0].hijos[2]);
        let signo = nodo.hijos[0].hijos[1]+"";
        
        
        //VERIFICAMOS SI SON NUMEROS
        if (!isNaN(pri) && !isNaN(seg)){
            
            //COMPROBAMOS LOS TIPOS DE DATOS
            switch(signo){
                case "==":
                    if (pri!=seg){
                        this.reglas.push(`REGLA 4       >> RESULTADO elimino instruccion if      >> LINEA: ${nodo.linea+1}`);
                        return "";
                    }
                    if (pri==seg){
                        this.reglas.push(`REGLA 3       >> RESULTADO sustitucion goto ${nodo.hijos[1]}      >> LINEA: ${nodo.linea+1}`);
                        return `goto ${nodo.hijos[1]};\n`;
                    }
                    break;
                case "!=":
                    if (pri==seg){
                        this.reglas.push(`REGLA 4        >> RESULTADO elimino instruccion if         >> LINEA: ${nodo.linea+1}`);
                        return "";
                    }
                    if (pri!=seg){
                        this.reglas.push(`REGLA 3       >> RESULTADO sustitucion goto ${nodo.hijos[1]}      >> LINEA: ${nodo.linea+1}`);
                        return `goto ${nodo.hijos[1]};\n`;
                    }
                    break;
                case ">":
                    if (pri<=seg){
                        this.reglas.push(`REGLA 4       >> RESULTADO elimino instruccion if      >> LINEA: ${nodo.linea+1}`);
                        return "";
                    }
                    if (pri>seg){
                        this.reglas.push(`REGLA 3        >> RESULTADO sustitucion goto ${nodo.hijos[1]}         >> LINEA: ${nodo.linea+1}`);
                        return `goto ${nodo.hijos[1]};\n`;
                    }
                    break;
                case "<":
                    if (pri>=seg){
                        this.reglas.push(`REGLA 4       >> RESULTADO elimino instruccion if      >> LINEA: ${nodo.linea+1}`);
                        return "";
                    }
                    if (pri<seg){
                        this.reglas.push(`REGLA 3       >> RESULTADO sustitucion goto ${nodo.hijos[1]}       >> LINEA: ${nodo.linea+1}`);
                        return `goto ${nodo.hijos[1]};\n`;
                    }
                    break;
                case ">=":
                    if (pri<seg){
                        this.reglas.push(`REGLA 4       >> RESULTADO elimino instruccion if         >> LINEA: ${nodo.linea+1}`);
                        return "";
                    }
                    if (pri>=seg){
                        this.reglas.push(`REGLA 3       >> RESULTADO sustitucion goto ${nodo.hijos[1]}      >> LINEA: ${nodo.linea+1}`);
                        return `goto ${nodo.hijos[1]};\n`;
                    }
                    break;
                case "<=":
                    if (pri>seg){
                        this.reglas.push(`REGLA 4        >> RESULTADO elimino instruccion if        >> LINEA: ${nodo.linea+1}`);
                        return "";
                    }
                    if (pri<=seg){
                        this.reglas.push(`REGLA 3       >> RESULTADO sustitucion goto ${nodo.hijos[1]}      >> LINEA: ${nodo.linea+1}`);
                        return `goto ${nodo.hijos[1]};\n`;
                    }
                    break;
            }//SWITCH   
        }//IF SON NUMEROS
    }//SON MAYOR A DOS HIJOS
      return `if (${this.recorrer(nodo.hijos[0])}) goto ${nodo.hijos[1]};\n`;
  }

  DameReporte():string{
      let c ="";
      this.reglas.forEach(r => {
          c+=r.replace("\n", "")+"\n";
      });
      return c;
  }

  //BUSCAR GOTO SEGUIDOS
  SegundaPasada(){
      let miArray = this.traduccion.split("\n");
      let salida = "";
      let i=0;
      while(i<miArray.length){
        salida+=miArray[i]+"\n";
        if(i+1<miArray.length){
            if (miArray[i].indexOf("goto")!=-1 && miArray[i+1].indexOf("goto")!=-1){
                i++;
            }
        }
        i++;
      }
      this.traduccion = salida;      

  }//FIN SEGUNDA PASADA

  Regla1(){
    //AHORA VAMOS A HACER BUSQUEDA BURBUJA PARA CADA UNO
    let j=0,k=0;
    for (j=0;j<this.comandos.length;j++){
        //BUSCAMOS Y GUARDAMOS CADA UNA DE LAS ETIQUETAS
        let Label1 = this.comandos[j];
        k = j+1;
        for(k;k<this.comandos.length;k++){
            let Label2 = this.comandos[k];
            //AHORA BUSCAMOS SI VUELVE A APARECER LA SIGUIENTE ETIQUETA 
            if (Label2.id==Label1.id){
                //ENTONCES VEREMOS SI CUMPLE LA REGLA
                //SI EL PRIMERO QUE ENCONTRAMOS ES GOTO
                //Y EL SEGUNDO NO, ENTONCES APLICAMOS EL ALGORITMO
                if (Label1.goto && !Label2.goto){
                    //RECORTAMOS EL STRING DE DONDE INICIA Y DONDE TERMINA
                    let CodigoABuscar = this.traduccion.slice(Label1.linea+1, Label2.linea-1);
                    if (!this.buscarEtiquetas(CodigoABuscar)){
                        //AHORA DIGAMOS QUE NO HAY ETIQUETAS
                        //LO BORRAMOS 

                        //salida = this.recortarStringContrario(salida, Label1.linea+1, Label2.linea-1);
                        //CREAMOS EL REPORTE 
                        this.reglas.push(`REGLA 1        >>  se eliminaron las lineas [${Label1.linea+1} - ${Label1.linea-1}]        >> LINEAS en el rango anterior`);
                    }//IF NO HAY ETIQUETAS ENTRE CODIGO
                }//SI LABEL ES GOTO Y EL SEGUNDO NO 
            }//SI LOS ID SON IGUALES
        }//SEGUNDO FOR K
    }//PRIMER FOR
  }

  Regla5(){
      //RECORREMOS DE NUEVO
      let j=0,i=0;
      this.asignaciones.forEach(e => {
          //recorremos de nuevo buscando si hay coincidencia
          j=i+1;
          for(j;j<this.asignaciones.length;j++){
              if(e.id1==this.asignaciones[j].id2 && e.id2==this.asignaciones[j].id1){
                  //SI HAY DOS ASIGNACIONES QUE CAMBIAN
                  let inicio = e.linea,final=this.asignaciones[j].linea;
                  let corto= this.traduccion.slice(inicio+1, final-1);
                  if (!this.buscarAsignaciones(corto, e.id1, e.id2)){
                      //ENCOTRAMOS ASIGANCIONES
                      this.reglas.push(`REGLA 5         >>  se eliminaron       >> LINEAS [${e.linea}-${this.asignaciones[j].linea}]`);
                  }
              }
          }
          i++;
      });
  }

  //NOS AYUDA A BUSCAR CODIGO ETIQUETA DE UN TEXTO ESPECIFICO
  buscarEtiquetas(s:string):boolean{
      if (s.indexOf("goto")!=-1 || s.indexOf(":")!=-1){
          return true;
      }
      return false;
  }

  buscarAsignaciones(s:string, id1:string, id2:string){
      if(s.indexOf("=")!=-1){
          if (s.indexOf(id1)!=1 || s.indexOf(id2)!=-1){
              true;
          }
      }
      return false;
  }

  recortarString(s:string, de:number, a:number){
      if (a>de){
          let miArray = s.split("\n");
          let salida="";
          while (a!=de){
              salida +=miArray[de]+"\n";
              de++;
          }

      }
      return s;
  }
  recortarStringContrario(s:string, de:number, a:number){
      if (a>de){
          let primera = s.slice(0, de);
          let segunda = s.slice(a, s.length-1);
          let final =primera+segunda;
          return final;
      }
      return s;
  }


}