import { Entorno } from '../../xmlAST/Entorno';
import { Acceso} from './Acceso';
import { ExpressionXquery, Retorno } from "../../Interfaces/ExpressionXquery";
import { tipoPrimitivo } from './Primitivo';
import { Simbolo } from '../../xmlAST/Simbolo';
import { EntornoXQuery } from '../AmbientesXquery/EntornoXQuery';

export class Path implements ExpressionXquery{

    salida: any[];

    constructor (
    public line : Number,
    public column: Number,
    public L_Accesos : Acceso [],
    public tipoPath ?: string
    ){
        this.salida=[];
    }   

    
    private validarAntecesores(): Acceso []{

        let newL_Acc : Acceso[] = []
        for (const acceso of this.L_Accesos) {
            
            if (acceso.tipoAcceso === 'padre'){
                
                if (newL_Acc.length >0){
                    newL_Acc.pop()
                }else {
                    throw new Error("Error Semantico: no se puede Acceder a la raiz del arbol, lina: "+acceso.line+"column: "+acceso.column);
                }
            }else {
                newL_Acc.push(acceso)
            }
        }
        return newL_Acc
    }

    public executeXquery(entXquery: EntornoXQuery, ent : Entorno, simboloPadre?:Simbolo) :Retorno {
        
        this.salida = [];
        this.L_Accesos = this.validarAntecesores();

        if (this.tipoPath !== "sub"){

            if (ent.listaEntornos.length > 0 && this.L_Accesos.length > 0){

                if (ent.identificador === this.L_Accesos[0].id && this.L_Accesos[0].tipoAcceso === "nodo") {//validamos que el id entActual sea igual al id de la poscion Actual de accesos
        
                    if (this.validarPredicadosRaiz(entXquery, ent, 0)) {

                        if(this.L_Accesos.length >  1){ //verificamos si la consutla nos dice que accediendo a descendientes
                            this.getQuery(entXquery, ent, 1); 
                        }else{
                            this.construirNodos(ent, "")
                        }
                    }
                }else if (this.L_Accesos[0].tipoQuery === 'absoluta'){
                    this.getQuery(entXquery, ent, 0);
                }
            }
        }else {

            if (this.L_Accesos.length > 0){
                this.getQuery(entXquery, ent, 0, simboloPadre);
            }else {
                this.construirNodos(ent, "")
            }
        } 
        return {value: this.salida, type: tipoPrimitivo.RESP};
    }

    private getQuery(entXquery: EntornoXQuery, entPadre: Entorno, posActAcceso: number, simboloPadre?:Simbolo) {
        
        if(simboloPadre !== undefined ){ // si la consulta es una sub consulta y el padre es un atributo --> /@id[subconsulta]
           
            if (this.L_Accesos[posActAcceso].tipoAcceso === "actual"){

                if(this.L_Accesos.length < posActAcceso + 1){
                    this.getQuery(entXquery, entPadre, posActAcceso + 1, simboloPadre);
                }else{

                    //if (this.tipoPath === "sub"){
                        this.salida.push({value : simboloPadre.valor.replaceAll("\"",""), type: tipoPrimitivo.STRING}) ;
                    /*}else {
                        this.salida.push(simboloPadre.valor.replaceAll("\"","") + "\n");
                    }*/
                } 
            }else {
                throw new Error("Nose puede acceder a un atributo: " + this.L_Accesos[posActAcceso].id);
            }  

        }else { // si la consuta es una sub o una normal y el padre es un nodo  -----> /id/id || /id/@id || /id/. || /id/*               
           
            if (this.L_Accesos[posActAcceso].tipoAcceso === "atributo"){
               
                const atri = entPadre.getAtributo(this.L_Accesos[posActAcceso].id)
                if(atri != null){

                    if (this.validarPredicadosAtri(entXquery, entPadre, atri, posActAcceso)){
                    
                        if(this.L_Accesos.length > posActAcceso + 1){ //verificamos si no es el ultimo acceso
                            this.getQuery(entXquery, entPadre, posActAcceso + 1, atri); 
                        }else{

                            //if (this.tipoPath === "sub"){
                                this.salida.push({value : atri.valor.replaceAll("\"",""), type: tipoPrimitivo.STRING});
                            /*}else{
                                this.salida.push(atri.valor.replaceAll("\"","") + "\n");
                            }*/
                        }
                    }
                }else if(entPadre.listaEntornos.length > 0 && this.L_Accesos[posActAcceso].tipoQuery === 'absoluta') {
                    
                    for (const entChild of entPadre.listaEntornos ) {//recorremos los hijos del entorno padre que llamaremos entActual
                        this.getQuery(entXquery, entChild, posActAcceso);
                    }
                }

            }else if (this.L_Accesos[posActAcceso].tipoAcceso === "todosAtributos"){

                if (this.L_Accesos.length === posActAcceso + 1){

                    if (this.L_Accesos[posActAcceso].tipoQuery === 'absoluta'){
                    
                        this.construirTodosAtributos(entPadre);
                        
                    }else {
    
                        if (entPadre.listaSimbolos.length > 0){
    
                            for (const atri of entPadre.listaSimbolos){
        
                                if (this.validarPredicadosAtri(entXquery, entPadre, atri, posActAcceso)){
                                   
                                    //if (this.tipoPath === "sub"){
                                    this.salida.push({value : atri.valor.replaceAll("\"",""), type: tipoPrimitivo.STRING});
                                    /*}else{
                                        this.salida.push(atri.valor.replaceAll("\"","") + "\n");
                                    }*/
                                }
                            }
                        }
                    }
                }else{
                    throw new Error("Error Semantico: no se puede mostrar todos los atributos del nodos descendientes ya que no se ah terminado la lista de accesos");
                }

            }else if (this.L_Accesos[posActAcceso].tipoAcceso ==='texto'){

                if (this.L_Accesos.length === posActAcceso + 1){

                    if (this.L_Accesos[posActAcceso].tipoQuery === 'absoluta'){

                        this.construirTodosTextos(entPadre);

                    }else {
                        
                        if (entPadre.texto !== ''){
                            //if (this.tipoPath === "sub"){
                                this.salida.push({value : entPadre.texto, type: tipoPrimitivo.STRING});
                            /*}else {
                                this.salida.push(entPadre.texto + '\n');
                            }*/
                        }
                    }
                    
                }else {
                    throw new Error("Error Semantico: no se puede mostrar el texto de los nodo descendientes ya que no se ah terminado la lista de accesos");
                }

            }else if (this.L_Accesos[posActAcceso].tipoAcceso === "actual" ){

                if(this.L_Accesos.length >  posActAcceso + 1){ //verificamos si no es el ultimo acceso
                    this.getQuery(entXquery, entPadre, posActAcceso + 1); 
                }else{
                    this.construirNodos(entPadre, "")
                }

            }else if (this.L_Accesos[posActAcceso].tipoAcceso === "todosNodos"){

                if(entPadre.listaEntornos.length > 0){
                    
                    for (const entActual of entPadre.listaEntornos) {//recorremos los hijos del entorno padre que llamaremos entActual
                        
                        if (this.validarPredicadosNodos(entXquery, entPadre, entActual, posActAcceso)){
                    
                            if(this.L_Accesos.length > posActAcceso + 1){ //verificamos si no es el ultimo acceso
                                this.getQuery(entXquery, entActual, posActAcceso + 1); 
                            }else{
                                this.construirNodos(entActual, "")
                            }
                        }
                    }
                }

            }else if (this.L_Accesos[posActAcceso].tipoAcceso === "nodo"){
                
                if(entPadre.listaEntornos.length > 0){
                      
                    for (const entActual of entPadre.listaEntornos) {//recorremos los hijos del entorno padre que llamaremos entActual
    
                        if(entActual.identificador === this.L_Accesos[posActAcceso].id){//validamos que el id del entorno sea igual al id de la poscion Actual de Accesos
                    
                            if (this.validarPredicadosNodos(entXquery, entPadre, entActual, posActAcceso)){
        
                                if(this.L_Accesos.length > posActAcceso + 1){ //verificamos si no es el ultimo acceso
                                    this.getQuery(entXquery, entActual, posActAcceso + 1);
                                }else{
                                    this.construirNodos(entActual, "");
                                }
                            }
                        }else if (this.L_Accesos[posActAcceso].tipoQuery === 'absoluta'){
                            this.getQuery(entXquery, entActual, posActAcceso);
                        }
                    }
                }

            }else {
                throw new Error("ERROR FATAL Semantico: El tipo; "+this.L_Accesos[posActAcceso].tipoAcceso+" del acceso: "+this.L_Accesos[posActAcceso].tipoAcceso+" no se reconoce como valido, " + 
                "linea: "+this.L_Accesos[posActAcceso].line+" comlumna: "+this.L_Accesos[posActAcceso].column);
            }   
        }
    }

    private construirTodosTextos(entPadre:Entorno){
        
        if (entPadre.texto !== ''){
            //if (this.tipoPath === "sub"){
                this.salida.push({value : entPadre.texto, type: tipoPrimitivo.STRING});
            /*}else {
                this.salida.push(entPadre.texto + '\n');
            }*/
        }

        if (entPadre.listaEntornos.length > 0){
            
            for (const entActual of entPadre.listaEntornos) {
                this.construirTodosTextos(entActual);
            }
        }
    }

    private construirTodosAtributos(entPadre:Entorno) {

        for (const atri of entPadre.listaSimbolos){

            //if (this.tipoPath === "sub"){
                this.salida.push({value : atri.valor.replaceAll("\"",""), type: tipoPrimitivo.STRING});
            /*}else{
                this.salida.push(atri.valor.replaceAll("\"","") + "\n");
            }*/
        }

        if (entPadre.listaEntornos.length > 0){
            
            for (const entActual of entPadre.listaEntornos) {
                this.construirTodosAtributos(entActual);
            }
        }

    }

    private construirNodos(entPadre:Entorno, tab : string){

        //if (this.tipoPath === "sub"){
            this.salida.push({value : entPadre , type: tipoPrimitivo.NODO})
        /*}else {

            var atributos = "";
            for (const atri of entPadre.listaSimbolos) { // construyo atributos
                atributos+= atri.identificador + " = \"" + atri.valor.replaceAll("\"","") + "\"  ";
            }

            //construyo Nodos
            if(entPadre.listaEntornos.length === 0 && entPadre.texto === ''){
                this.salida.push(tab +"<" + entPadre.identificador + " " + atributos + "/>\n");
            }
            else if(entPadre.listaEntornos.length > 0){

                this.salida.push(tab +"<" + entPadre.identificador + " " + atributos + ">\n");
                for (const entActual of entPadre.listaEntornos) {
                    this.construirNodos(entActual, tab + "   ");    //         //nombre  /biblio/libro//nombre             
                }
                this.salida.push(tab +"</" + entPadre.identificador + ">\n");
            
            } else{
                this.salida.push(tab +"<"+ entPadre.identificador +" "+ atributos+">"+entPadre.texto+"</"+entPadre.identificador+">\n");
            }

        }*/
    }

    private validarPredicadosAtri(entXquery: EntornoXQuery, entPadre: Entorno, simboloPadre:Simbolo, posActAcceso:number) : boolean{

        for (let i = 0; i < this.L_Accesos[posActAcceso].predicados.length; i++) {
            
            var result : Retorno = this.L_Accesos[posActAcceso].predicados[i].executeXquery(entXquery ,entPadre, simboloPadre);
            if (result.value === tipoPrimitivo.NUMBER){
                
                if (result.value - 1 >= 0 && result.value - 1 < entPadre.listaEntornos.length){
                    if (entPadre.listaSimbolos[result.value - 1] !== simboloPadre){
                        return false; 
                    }
                }
            }else if (result.type === tipoPrimitivo.RESP){
                
                if (result.value.length === 0){
                    return false;
                } 
            }else if (result.value === false) {
                return false ;
            }
            
        }
        return true;
    } 

    private validarPredicadosNodos(entXquery: EntornoXQuery, entPadre: Entorno, entActual : Entorno, posActAcceso:number) : boolean{

        for (let i = 0; i < this.L_Accesos[posActAcceso].predicados.length; i++) {
            
            var result : Retorno = this.L_Accesos[posActAcceso].predicados[i].executeXquery(entXquery ,entActual);
            if (result.type === tipoPrimitivo.NUMBER){
                
                if (result.value - 1 >= 0 && result.value - 1 < entPadre.listaEntornos.length){
                    if (entPadre.listaEntornos[result.value - 1] !== entActual){
                        return false; 
                    }
                }
            }else if (result.type === tipoPrimitivo.RESP){
                
                if (result.value.length === 0){
                    return false;
                } 
            }else if (result.value === false) {
                return false ;
            }
        }
        return true;
    }

    private validarPredicadosRaiz(entXquery: EntornoXQuery, entActual : Entorno, posActAcceso:number) : boolean{

        for (let i = 0; i < this.L_Accesos[posActAcceso].predicados.length; i++) {
            
            var result : Retorno = this.L_Accesos[posActAcceso].predicados[i].executeXquery(entXquery ,entActual);
            if (result.type === tipoPrimitivo.NUMBER){
                
                if ( result.value !== 1){
                    return false;
                }
            }else if (result.type === tipoPrimitivo.RESP){
                
                if (result.value.length === 0){
                    return false;
                } 
            }else if (result.value === false) {
                return false ;
            }
        }
        return true;
    }

    public GraficarAST(texto:string):string {
        if (this.tipoPath === "relativa") {
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"/\"];\n";
        } else if (this.tipoPath === "absoluta") {
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"//\"];\n";
        } else {
            texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "[label=\"sub\"];\n";
        }
        for (const key in this.L_Accesos) {
            texto = this.L_Accesos[key].GraficarAST(texto);
            if (this.line.toString() !== this.L_Accesos[key].line.toString() || this.column.toString() !== this.L_Accesos[key].column.toString()) {
                texto += "nodo" + this.line.toString() + "_" + this.column.toString() + "-> nodo" + this.L_Accesos[key].line.toString() + "_" + this.L_Accesos[key].column.toString() + ";\n";
            }
        }
        return texto;
    }
    /*private unirSalida () : string{

        let salida : string = ""

        for (const element of this.salida) {
            salida += element
        }
        return salida;
    }
    return {value: this.unirSalida(), type: tipoPrimitivo.STRING};*/

}