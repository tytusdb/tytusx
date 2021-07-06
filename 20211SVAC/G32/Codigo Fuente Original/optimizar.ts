import { Error } from "./arbol/error";
import { Errores } from "./arbol/errores";
const Objeto_Optimizar = require("./Reportes/Objeto_Optimizar");
const Rep_Optimizar = require("./Reportes/Rep_Optimizar");
const { NodoAST }= require('./arbol/nodoAST');

export class Optimizar {
  salida: string;
  raiz: Object; 
  reporteaux : string = ''; 
  reportenuevo: string = '';
  linea: string = '';
  valoresAceptados = /^[0-9]+$/;

  constructor( raiz: Object) {
    Object.assign(this, { raiz});
  }

  identificar(etiqueta: string, nodo: any): boolean {
    if (nodo == null || !(nodo instanceof Object)) {
      return false;
    }
    if (nodo.hasOwnProperty('label') && nodo.label != null) {
      return nodo.label === etiqueta;
    }
    return false;
  }

  recorrer(): string {
    this.salida = '';
    if (this.raiz != null) {
      try {
        /*this.regla1(this.raiz);
        this.regla3(this.raiz);
        this.regla4(this.raiz);
        this.regla2(this.raiz);
        this.regla5(this.raiz);*/
        this.reducir(this.raiz);
        this.recorrido(this.raiz);
      } catch (error) {
        console.log('error',error);
        return 'No se encontró por algun error';
      }
      
        return this.salida;
    }
    return 'No se puede optimizar';
  }  
    
    
    regla1(nodo: any ) { 
        let nodoBloques  = nodo;  
        let inicio,final,etiqueta ; 
        
        for (var i = 0; i < nodoBloques.hijos.length; i++){
            if(this.identificar('GOTO',nodoBloques.hijos[i])){
                etiqueta = nodoBloques.hijos[i].hijos[1];
                inicio = i;

                for(var j = inicio + 1 ; j < nodoBloques.hijos.length ; j++){
                    if(this.identificar('ETIQUETA',nodoBloques.hijos[j])){
                        if(nodoBloques.hijos[j].hijos[0] == etiqueta){
                            final = j;

                            let etiqueta_boolean = false;
                            for(var r = inicio + 1 ; r < final; r++){
                                if(this.identificar('ETIQUETA',nodoBloques.hijos[r])){
                                    //hay etiqueta de por medio
                                    etiqueta_boolean = true; 
                                }
                            }

                            if(etiqueta_boolean == false){
                                //optimizar
                                let fila = nodoBloques.hijos[j].linea;
                                let nuevo = 'goto ' +etiqueta + ';' + etiqueta + ':';
                                let anterior = 'goto ' +etiqueta + ';' +' <instrucciones> ' + etiqueta + ':';
                                nodoBloques.hijos.splice(inicio +1,final-1);
                                Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Eliminacion de código muerto',
                                regla: '1', eliminado: anterior, nuevo: nuevo, fila: fila}));
                            }
                        }
                    }
                }
            }
        }
    }

    regla2(nodo: any) {
        let nodoBloques  = nodo;  
        let inicio ;  
        let etiqueta; 
        
        
        for (var i = 0; i < nodoBloques.hijos.length; i++){
            if(this.identificar('IF',nodoBloques.hijos[i])){
                inicio = i;
                etiqueta = nodoBloques.hijos[i].hijos[4].hijos[1];
                let op = nodoBloques.hijos[i].hijos[2].hijos[1];

                if (this.identificar('GOTO',nodoBloques.hijos[i+1]) && (this.identificar('ETIQUETA',nodoBloques.hijos[i+2])) && (nodoBloques.hijos[i+2].hijos[0] == etiqueta)){
                    
                    //se puede optimizar
                    let otra_etiqueta = nodoBloques.hijos[i+1].hijos[1];
                    let nuevo = ' ';
                    let anterior = ' '; 
                    let fila = inicio;
                    let otro_op;

                    if (op == '=='){
                        otro_op = '!=';
                    }else if (op == '!='){
                        otro_op = '==';
                    }else if (op == '>'){
                        otro_op = '<';
                    }else if (op == '<'){
                        otro_op = '>';
                    }else if (op == '>='){
                        otro_op = '<=';
                    }else if (op == '<='){
                        otro_op = '>=';
                    }

                    anterior = 'if'+ '(' + nodoBloques.hijos[i].hijos[2].hijos[0] + op + nodoBloques.hijos[i].hijos[2].hijos[2] + ')' + ' goto' + ' ' + etiqueta + '; ' + 'goto' + ' ' + otra_etiqueta + ' ; ' + etiqueta + ':';
                    nuevo = 'if' + '(' + nodoBloques.hijos[i].hijos[2].hijos[0] + otro_op + nodoBloques.hijos[i].hijos[2].hijos[2] + ')' + ' goto ' + otra_etiqueta + ';'; 
                    let condicion_nodo = new NodoAST({label: 'CONDICION', hijos: [nodoBloques.hijos[i].hijos[2].hijos[0],otro_op,nodoBloques.hijos[i].hijos[2].hijos[2]], linea: nodoBloques.hijos[i].linea});

                    let goto_nodo = new NodoAST({label: 'GOTO', hijos: ['goto',otra_etiqueta,';'], linea: nodoBloques.hijos[i].linea});

                    let agregado = new NodoAST({label: 'IF', hijos: ['if','(',condicion_nodo,')',goto_nodo], linea: nodoBloques.hijos[i].linea});

                    nodoBloques.hijos.splice(inicio,3);
                    nodoBloques.hijos.splice(inicio,0,agregado);
                    Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Eliminacion de código muerto',
                                regla: '2', eliminado: anterior, nuevo: nuevo, fila: fila}));
                }
                
            }
        }
    }

    regla3(nodo: any ) {  
        let nodoBloques  = nodo;  
        let if_inicio ;
        let val1,op,val2;

        for (var i = 0; i < nodoBloques.hijos.length; i++){

                if(this.identificar('IF',nodoBloques.hijos[i])){
                    if_inicio = i;
                    let fila = nodoBloques.hijos[i].linea;

                    if(this.identificar('CONDICION',nodoBloques.hijos[i].hijos[2]))
                    {
                       // val1 = Number(nodoBloques.hijos[i].hijos[2].hijos[0]);
                        val1 = nodoBloques.hijos[i].hijos[2].hijos[0];
                        op = nodoBloques.hijos[i].hijos[2].hijos[1];
                        val2= nodoBloques.hijos[i].hijos[2].hijos[2];
                        //val2 = Number(nodoBloques.hijos[i].hijos[2].hijos[2]);

                        if(val1.match(this.valoresAceptados) && val2.match(this.valoresAceptados))
                        {
                            if((val1 == val2 && op == '==') || (val1 != val2 && op == '!=') || (val1 <= val2 && op == '<=') 
                            || (val1 > val2 && op == '>') ||  (val1 < val2 && op == '<') || (val1 >= val2 && op == '>='))
                            {
                                let agregado = new NodoAST({label: 'GOTO', hijos: [nodoBloques.hijos[i].hijos[4].hijos[0],nodoBloques.hijos[i].hijos[4].hijos[1],
                                nodoBloques.hijos[i].hijos[4].hijos[2]], linea: nodoBloques.hijos[i].linea});
                                
                                let nuevo = nodoBloques.hijos[i].hijos[4].hijos[0] + ' ' + nodoBloques.hijos[i].hijos[4].hijos[1] +
                                nodoBloques.hijos[i].hijos[4].hijos[2] ;

                                let anterior = nodoBloques.hijos[i].hijos[0] + '(' + val1 + op + val2 + ')' + nuevo + 
                                ' ' + nodoBloques.hijos[i+1].hijos[0]+ ' '+nodoBloques.hijos[i+1].hijos[1] + ' '+
                                nodoBloques.hijos[i+1].hijos[2];

                                nodoBloques.hijos.splice(if_inicio,2);
                                nodoBloques.hijos.splice(if_inicio,0,agregado);
                                Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Eliminacion de código muerto',
                                regla: '3', eliminado: anterior, nuevo: nuevo, fila: fila}));
                            }
                        }
                    }
                }
         }
    }

    regla4(nodo: any) {
        let nodoBloques  = nodo;  
        let if_inicio ;
        let val1,op,val2;

        for (var i = 0; i < nodoBloques.hijos.length; i++){

                if(this.identificar('IF',nodoBloques.hijos[i])){
                    if_inicio = i;
                    let fila = nodoBloques.hijos[i].linea;

                    if(this.identificar('CONDICION',nodoBloques.hijos[i].hijos[2]))
                    {
                        //val1 = Number(nodoBloques.hijos[i].hijos[2].hijos[0]);
                        val1 = nodoBloques.hijos[i].hijos[2].hijos[0];
                        op = nodoBloques.hijos[i].hijos[2].hijos[1];
                        //val2 = Number(nodoBloques.hijos[i].hijos[2].hijos[2]);
                        val2 = nodoBloques.hijos[i].hijos[2].hijos[2];

                        if(val1.match(this.valoresAceptados) && val2.match(this.valoresAceptados))
                        {
                                if((val1 != val2 && op == '==') || (val1 == val2 && op == '!=') || (val1 <= val2 && op == '>=') 
                                || (val1 > val2 && op == '<') ||  (val1 < val2 && op == '>') || (val1 >= val2 && op == '<='))
                                {

                                    let goto = nodoBloques.hijos[i].hijos[4].hijos[0] + ' ' + nodoBloques.hijos[i].hijos[4].hijos[1] +
                                    nodoBloques.hijos[i].hijos[4].hijos[2] ;

                                    let anterior = nodoBloques.hijos[i].hijos[0] + '(' + val1 + op + val2 + ')' + goto + 
                                    ' ' + nodoBloques.hijos[i+1].hijos[0]+ ' '+nodoBloques.hijos[i+1].hijos[1] + ' '+
                                    nodoBloques.hijos[i+1].hijos[2];

                                    let nuevo = nodoBloques.hijos[i+1].hijos[0]+ ' '+nodoBloques.hijos[i+1].hijos[1] + ' '+
                                    nodoBloques.hijos[i+1].hijos[2];

                                    nodoBloques.hijos.splice(if_inicio,1);

                                    Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Eliminacion de código muerto',
                                    regla: '4', eliminado: anterior, nuevo: nuevo, fila: fila}));
                                    
                                }
                        }
                    }
                }
        }
    }

    regla5(nodo: any ) { 
        let nodoBloques  = nodo;  

        for (var i = 0; i < nodoBloques.hijos.length; i++){
            
            if(this.identificar('ASIGNA',nodoBloques.hijos[i])){
                let temp1 = nodoBloques.hijos[i].hijos[0];
                let temp2 = nodoBloques.hijos[i].hijos[2];
                let inicio_a = i;

                for(var p = inicio_a + 1; p < nodoBloques.hijos.length; p++ ){
                    if(temp2.match(this.valoresAceptados) && temp1.match(this.valoresAceptados))
                        {
                            // no esta igualado a un temporal
                        } else {
                            if(temp2 == nodoBloques.hijos[p].hijos[0] && temp1 == nodoBloques.hijos[p].hijos[2] ){
                                let final = p;
                                let asigna = false;
                            for (var l = inicio_a + 1 ; l < final; l++ ){
                                if(nodoBloques.hijos[l].label == 'ETIQUETA'){
                                    //hay etiqueta
                                    asigna = true;
                                }else if (nodoBloques.hijos[l].hijos[0] == temp1 && nodoBloques.hijos[l].hijos[2] != temp2){
                                    asigna = true;
                                    //cambio de valor
                                }
                            }

                            if(asigna == false){
                                let anterior = temp1 + '=' + temp2 + ';' + ' ' + temp2 + '=' + temp1 + ';';
                                let nuevo = temp1 + '=' + temp2 + ';'; 

                                //podemos optimizar 
                                nodoBloques.hijos.splice(final,1);
                                Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Eliminación de instrucciones redundantes de carga y almacenamiento',
                                    regla: '5', eliminado: anterior, nuevo: nuevo, fila: nodoBloques.hijos[i].linea}));
                            }
                        }
                    }
                }
            }
        }
    }


reducir(nodo: any){
    if (nodo instanceof Object) {
        if (this.identificar('S', nodo)) {
          this.reducir(nodo.hijos[0]);
        }
    }

    if (this.identificar('INICIO', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.reducir(element);
          }
        });
    }

    if (this.identificar('HEADER',nodo)){
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
              this.reducir(element);
            }
        });
    }

    if(this.identificar('L_DECLARACION',nodo)){
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
              this.reducir(element);
            }
        });
    }

    if(this.identificar('FUNCIONES',nodo)){
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
                this.reducir(element);
            }
        });
    }

    if(this.identificar('FUNCION',nodo)){
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
                this.reducir(element);
            }
        });
    }

    if(this.identificar('BLOQUES',nodo)){
        console.log(nodo);
        this.regla1(nodo);
        this.regla3(nodo);
        this.regla4(nodo);
        this.regla2(nodo);
        this.regla5(nodo);
    }
    
   } 

  recorrido(nodo: any): void {
    if (nodo instanceof Object) {
        if (this.identificar('S', nodo)) {
          this.recorrido(nodo.hijos[0]);
        }
    }

    if (this.identificar('INICIO', nodo)) {
        nodo.hijos.forEach((element: any) => {
          if (element instanceof Object) {
            this.recorrido(element);
          }
        });
    }

    if (this.identificar('HEADER',nodo)){
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
              this.recorrido(element);
            }
        });
    }

    if (this.identificar('IMPORT',nodo)){
        nodo.hijos.forEach((element: any) => {
                this.salida += element;
            if (element == '#include'){
                this.salida += ' ';
            }
            if (element == '>'){
                this.salida += '\r\n';
            }
        });
    }

    if(this.identificar('L_DECLARACION',nodo)){
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
              this.recorrido(element);
            }
        });
    }

    if(this.identificar('DECLARACION',nodo)){
        nodo.hijos.forEach((element: any) => {
            if(element == '['){
                this.salida += element;
            }else if(element.match(this.valoresAceptados)){
                this.salida += element;
            }else{
                this.salida += element + ' ';
            }
            
            if (element == ';'){
                    this.salida += '\r\n';
                }
        });
    }

    if(this.identificar('DECLARACION_ACCESO',nodo)){
        nodo.hijos.forEach((element: any) => {
            if(element == nodo.hijos[0]){
                this.salida += element + ' ';
            }else{
                this.salida += element;
            }
            
            if (element == ';'){
                    this.salida += '\r\n';
                }
        });
    }

    if(this.identificar('FUNCIONES',nodo)){
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
                this.recorrido(element);
            }
        });
    }

    if(this.identificar('FUNCION',nodo)){
        this.salida += '\r\n';
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
                this.recorrido(element);
            }else{
                this.salida += element + ' ';
                if ( element == '}' || element == '{'){
                    this.salida += '\r\n';
                }
            }
        });
    }

    if(this.identificar('ACCESO',nodo)){
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
                this.recorrido(element);
            }else{
                this.salida += element ;
            }
        });
    }

    if(this.identificar('LLAMADA',nodo)){
        this.salida += '\t';
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
                this.recorrido(element);
            }else{
                this.salida += element ;
            }
        });
        this.salida += '\r\n';
    }

    if(this.identificar('PRINT',nodo)){
        this.salida += '\t';
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
                this.recorrido(element);
            }else{
                this.salida += element ;
            }
        });
        this.salida += '\r\n';
    }

    if(this.identificar('RETURN',nodo)){
        nodo.hijos.forEach((element: any) => {
            if(element == nodo.hijos[0]){
                this.salida += '\t';
                this.salida += element + ' ';
            }else{
                this.salida += element + ' ';
            }
            
                if ( element == ';'){
                    this.salida += '\r\n';
                }
        });
    }


    if(this.identificar('BLOQUES',nodo)){
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
                this.recorrido(element);
            }
        });
    }

    if(this.identificar('GOTO',nodo)){
        this.salida += '\t';
            nodo.hijos.forEach((element: any) => {
                    this.salida += element + ' ';
                    if (element == ';'){
                        this.salida += '\r\n';
                    }   
            });
    }

    if(this.identificar('IF',nodo)){
        this.salida += '\t';
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
                this.recorrido(element);
            }else{
                this.salida += element + ' ';
                if (element == ';' || element == '{'){
                    this.salida += '\r\n';
                }
            }
        });
    }

    if(this.identificar('CONDICION',nodo)){
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
                this.recorrido(element);
            }else{
                this.salida += element + ' ';
                if (element == ';' || element == '{'){
                    this.salida += '\r\n';
                }
            }
        });
    }


    if(this.identificar('ETIQUETA',nodo)){
        this.salida += '\t';
            nodo.hijos.forEach((element: any) => {
                    this.salida += element + ' ';
                    if (element == ':'){
                        this.salida += '\r\n';
                    }   
            });
    }

    if(this.identificar('ASIGNA',nodo)){
        this.salida += '\t';
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
                this.recorrido(element);
            }else{
                this.salida += element + ' ';
                if (element == ';' ){
                    this.salida += '\r\n';
                }
            }
        });
    }

    if(this.identificar('ASIGNA_ACCESO',nodo)){
        this.salida += '\t';
        nodo.hijos.forEach((element: any) => {
            if (element instanceof Object) {
                this.recorrido(element);
            }else{
                this.salida += element + ' ';
                if (element == ';' ){
                    this.salida += '\r\n';
                }
            }
        });
    }

    if(this.identificar('ASIGNA_EXPR',nodo)){
        this.salida += '\t';

        let id = nodo.hijos[0]; 
        let arg1 = nodo.hijos[2].hijos[0];
        let op = nodo.hijos[2].hijos[1];
        let arg2 = nodo.hijos[2].hijos[2];
        let linea = nodo.linea;
        let nuevo:string ;
        let anterior: string; 
       
        //regla 6  T1 = T1 +0; Se elimina 
        if (id == arg1 && arg2 == 0 && op == '+' || id == arg2 && arg1 == 0 && op == '+' ){
            anterior = id + ' ' + '=' + arg1 + ' ' + op + ' ' + arg2;
            nuevo = ' ';
            Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Simplificación algebraica y reducción por fuerza',
            regla: '6', eliminado: anterior, nuevo: nuevo, fila: linea}));
        }
        
        // regla 7  T1 = T1 - 0; se elimina
        else if (id == arg1 && arg2 == 0 && op == '-'){
            anterior = id + ' ' + '=' + arg1 + ' ' + op + ' ' + arg2;
            nuevo = ' ';
            Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Simplificación algebraica y reducción por fuerza',
            regla: '7', eliminado: anterior, nuevo: nuevo, fila: linea}));
        }

        //regla 8 T1 = T1 * 1; se elimina
        else if (id == arg1 && arg2 == 1 && op == '*' || id == arg2 && arg1 == 1 && op == '*' ){
            anterior = id + ' ' + '=' + arg1 + ' ' + op + ' ' + arg2;
            nuevo = ' ';
            Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Simplificación algebraica y reducción por fuerza',
            regla: '8', eliminado: anterior, nuevo: nuevo, fila: linea}));
        }

        //regla 9 T1 = T1 / 1; se elimina
        else if (id == arg1 && arg2 == 1 && op == '/' ){
            anterior = id + ' ' + '=' + arg1 + ' ' + op + ' ' + arg2;
            nuevo = ' ';
            Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Simplificación algebraica y reducción por fuerza',
            regla: '9', eliminado: anterior, nuevo: nuevo, fila: linea}));
        }

        //regla 10 T1 = T2 + 0;; T1 = T2;
        else if (id != arg1 && arg2 == 0 && op == '+' || id != arg2 && arg1 == 0 && op == '+' ){
            anterior = id + ' ' + '=' + arg1 + ' ' + op + ' ' + arg2;

            if (arg2 == 0){
                this.salida += id + ' ' + '=' + ' ' + arg1 + ';' + '\n';
                nuevo = id + ' ' + '=' + ' ' + arg1 + ';';
            }else if (arg1 == 0){
                this.salida += id + ' ' + '=' + ' ' + arg2 + ';' + '\n';
                nuevo = id + ' ' + '=' + ' ' + arg2 + ';' ;
            }
            Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Simplificación algebraica y reducción por fuerza',
            regla: '10', eliminado: anterior, nuevo: nuevo, fila: linea}));
        }

        //regla 11 T1 = T2 - 0 ; T1 = T2; 
        else if (id != arg1 && arg2 == 0 && op == '-'){
            anterior = id + ' ' + '=' + arg1 + ' ' + op + ' ' + arg2;

            if (arg2 == 0){
                this.salida += id + ' ' + '=' + ' ' + arg1 + ';' + '\n';
                nuevo = id + ' ' + '=' + ' ' + arg1 + ';';
            }
            Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Simplificación algebraica y reducción por fuerza',
            regla: '11', eliminado: anterior, nuevo: nuevo, fila: linea}));
        }

        //regla 12 X = Y *1 ; x = y; 
        else if (id != arg1 && arg2 == 1 && op == '*' || id != arg2 && arg1 == 1 && op == '*' ){
            anterior = id + ' ' + '=' + arg1 + ' ' + op + ' ' + arg2;

            if (arg2 == 1){
                this.salida += id + ' ' + '=' + ' ' + arg1 + ';' + '\n';
                nuevo = id + ' ' + '=' + ' ' + arg1 + ';';
            }else if (arg1 == 1){
                this.salida += id + ' ' + '=' + ' ' + arg2 + ';' + '\n';
                nuevo = id + ' ' + '=' + ' ' + arg2 + ';' ;
            }
            Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Simplificación algebraica y reducción por fuerza',
            regla: '12', eliminado: anterior, nuevo: nuevo, fila: linea}));
        }

        //regla 13 X = Y / 1 ; x = y; 
        else if (id != arg1 && arg2 == 1 && op == '/'){
            anterior = id + ' ' + '=' + arg1 + ' ' + op + ' ' + arg2;

                this.salida += id + ' ' + '=' + ' ' + arg1 + ';' + '\n';
                nuevo = id + ' ' + '=' + ' ' + arg1 + ';';
            
            Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Simplificación algebraica y reducción por fuerza',
            regla: '13', eliminado: anterior, nuevo: nuevo, fila: linea}));
        }

        //regla 14 x = y * 2 ; x = y + y ; 
        else if (id != arg1 && arg2 == 2 && op == '*' || id != arg2 && arg1 == 2 && op == '*' ){
            anterior = id + ' ' + '=' + arg1 + ' ' + op + ' ' + arg2;

            if (arg2 == 2){
                this.salida += id + ' ' + '=' + ' ' + arg1 + ' + ' + arg1 + ' ;' + '\n';
                nuevo = id + ' ' + '=' + ' ' + arg1 + ' + ' + arg1 + ' ;' ;
            }else if (arg1 == 2){
                this.salida += id + ' ' + '=' + ' ' + arg2 + ' + ' + arg2 + ' ;'  + '\n';
                nuevo = id + ' ' + '=' + ' ' + arg2 + ' + ' + arg2 + ' ;' ;
            }
            Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Simplificación algebraica y reducción por fuerza',
            regla: '14', eliminado: anterior, nuevo: nuevo, fila: linea}));
        }

        //regla 15 T1 = T2 *0 ; T1 = 0;
        else if (id != arg1 && arg2 == 0 && op == '*' || id != arg2 && arg1 == 0 && op == '*' ){
            anterior = id + ' ' + '=' + arg1 + ' ' + op + ' ' + arg2;

                this.salida += id + ' ' + '=' + ' ' + 0 + ' ;'  + '\n';
                nuevo = id + ' ' + '=' + ' ' + 0 + ' ;' ;
            
            Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Simplificación algebraica y reducción por fuerza',
            regla: '15', eliminado: anterior, nuevo: nuevo, fila: linea}));
        }

        //regla 16 x = 0/y ; x = 0;
        else if (id != arg2 && arg1 == 0 && op == '/' ){
            anterior = id + ' ' + '=' + arg1 + ' ' + op + ' ' + arg2;

                this.salida += id + ' ' + '=' + ' ' + 0 + ' ;'  + '\n';
                nuevo = id + ' ' + '=' + ' ' + 0 + ' ;' ;
            
            Rep_Optimizar.Rep_Optimizar.getInstance().push(new Objeto_Optimizar.Objeto_Optimizar({ tipo: 'Simplificación algebraica y reducción por fuerza',
            regla: '16', eliminado: anterior, nuevo: nuevo, fila: linea}));
        }

        else{
            this.salida +=  id + ' ' + '=' + arg1 + ' ' + op + ' ' + arg2 + ';' + '\r\n';
        }
        
     }

     
   }
};

