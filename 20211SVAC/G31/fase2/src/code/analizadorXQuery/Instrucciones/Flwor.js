import { NodoXQuery, Tipo } from "../Expresiones/Expresion";
import { parse } from "../../analizadorXPath/Xpath";
import { parse as grammar } from "../../analizadorXML/grammar";
import { SimboloXQuery } from "../Tabla/SimboloXQuery";
import { TablaSimbolos } from "../Tabla/TablaSimbolos";
import { Error } from "../Tabla/Error";


export class Flwor extends NodoXQuery{
    
    blindingList = []
    intermedias =  []; 
    returnClause = null; 
    xml; 
    tabla =  null; 
    linea = 0; 
    columna = 0; 

    constructor(tipo, valor,  blindingList, intermedias, returnClause, linea, columna){
        super(tipo, valor)
        this.intermedias = intermedias; 
        this.returnClause = returnClause; 
        this.blindingList = blindingList; 
        this.xml = null; 
        this.linea = linea; 
        this.columna = columna; 
        this.tabla = new TablaSimbolos(); 
    }

    getValor(xml){
        this.xml = this.asignarPadre(xml)
        let retorno = null; 
        for(let variable of this.blindingList){
            let entorno = this.ejecutarConsulta(variable.query)
            entorno = this.asignarPadre(entorno)
            this.tabla.addSimbolo(new SimboloXQuery(variable.linea, variable.columna, variable.nombre, variable.query, entorno, Tipo.CONSULTA));             
        }
        
        if(this.intermedias instanceof Array){
            for(let intermedia of this.intermedias){
                if(intermedia instanceof Where){
                    retorno = intermedia.getValor(this.tabla, this.xml)
                    console.log('VALOR DE WHERE', retorno)
                }
            }
        }
        

        retorno = this.returnClause.getValor(this.tabla, retorno); 
        

        let consola = this.ConvertiraXML(retorno, 0); 
        return consola
    }

    asignarPadre(entorno){
        for(let hijo of entorno.hijos){
            hijo.padre = entorno
            hijo = this.asignarPadre(hijo)
        }
        return entorno
    }

    ejecutarConsulta(consulta){
        if(consulta == '') return 
        var funcion = parse(consulta); 
        if(funcion.errores.length > 0)
        {
            alert(`No se pudo realizar la consulta -> ${consulta}`); 
            console.log(funcion.errores); 
        }
        var respuesta = funcion.Ejecutar(this.xml);   // Aqui uso la consulta del G17
        var xmlNuevo = grammar(respuesta); 
        return xmlNuevo.datos
    }

   ConvertiraXML(nodos,iteracion){
        var XML=""
        for (var i=0;i<iteracion;i++) {
            XML += "  "
        }
        if(nodos.tipo != '/'){
            XML+="<"+nodos.tipo+" "
        }        
        for (const atributo of nodos.atributos) {
            XML+=`${atributo.nombre}="${atributo.valor}" `
        }
        if(nodos.hijos.length>0 || nodos.texto!="")
        {
            if(nodos.tipo != "/"){
                XML+=">"
            }
            
            XML+=nodos.texto
            for (const hijo of nodos.hijos) {
                XML+= "\n" + this.ConvertiraXML(hijo,iteracion+1)
            }
            if(nodos.hijos.length > 0)
            {
                XML += "\n";
                for (var i=0;i<iteracion;i++) {
                    XML += "  "
                }
            }

            if(nodos.tipo != '/'){
                XML+="</"+nodos.tipo+">"
            }
            
        }   
        else
        {
            XML += "/>"
        }
        return XML
    }
}


export class VariableFor {
    nombre = ""; 
    query = ""; 
    linea = 0; 
    columna = 0; 
    varIteracion = null 

    
    constructor(linea, columna, nombre, query, varIteracion){
        this.nombre = nombre; 
        this.query = query; 
        this.linea = linea; 
        this.columna = columna; 
        this.varIteracion = varIteracion; 
    }

}

export class Where {
    linea = 0; 
    columna = 0; 
    expresion = null; 
    instrucciones =  null; 

    constructor(linea, columna, expresion, instrucciones){
        this.linea = linea; 
        this.columna = columna; 
        this.expresion = expresion;
        this.instrucciones = instrucciones;  
    }


    getValor(tabla, xml){     
        let valor  =  this.instrucciones.getValor(tabla, xml); 
        return valor
    }

}

export class OrderBy {
    linea = 0; 
    columna = 0; 
    expresiones = [];  

    constructor(expresiones, linea, columna ){
        this.linea = linea; 
        this.columna = columna; 
        this.expresiones = expresiones; 
    }

    getValor(tabla, entorno){

    }
}


export class Return {
    expresion = null; 

    constructor(expresion){
        this.expresion = expresion; 
    }

    getValor(tabla, entorno){
        let resultado = this.expresion.getValor(tabla, entorno) 



        return resultado
    }


}