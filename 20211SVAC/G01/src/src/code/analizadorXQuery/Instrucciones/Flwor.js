import { NodoXQuery, Tipo } from "../Expresiones/Expresion";
import { parse } from "../../analizadorXPath/Xpath";
import { parse as grammar } from "../../analizadorXML/grammar";
import { SimboloXQuery } from "../Tabla/SimboloXQuery";
import { Entorno, TablaSimbolos } from "../Tabla/TablaSimbolos";
import { Error } from "../Tabla/Error";
import { isArguments, result } from "lodash";
import { Asignacion } from "../Expresiones/Declaracion";
import { Objeto } from  '../../analizadorXML/helpers'


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

    getValor(entorno, xml){
        this.xml = this.asignarPadre(xml)

        let entornoFlor = new Entorno(entorno, 'for'); // nuevo entorno para el flowr

        if(Array.isArray(this.blindingList)){ // agregue los parametros 
            for(let variable of this.blindingList){
                if(variable instanceof VariableFor){
                    console.log('Es una variable for')
                    if(entornoFlor instanceof Entorno){
                        let valor = this.ejecutarConsulta(variable.query)
                        console.log('Esto se trajo de la variable del for', valor)
                        let declaracion =  entornoFlor.declarar(variable.nombre, valor, variable.linea, variable.columna); 
                        if(declaracion instanceof Error)
                            return declaracion
                    }
                    console.log('Se declararon las variables del for', entornoFlor)
                }

                
                if(variable instanceof Asignacion){
                    console.log('Es una asignacion')

                    let retorno = variable.getValor(entornoFlor, xml)
                    console.log('Se realizo la asignacion', retorno)
                }

            }   
                

            
        
            console.log('Se declararon las variables del for', entornoFlor)
        }else{
            let declaracion = entornoFlor.declarar(this.blindingList.nombre, null, this.blindingList.linea, this.blindingList.columna)
            if(declaracion instanceof Error)
                return declaracion
        }

        let retorno; 
        let retornos = []
        if(Array.isArray(this.intermedias)){
            for(let instruccion of this.intermedias){
                retorno = instruccion.getValor(entornoFlor, xml)
                retornos.push(retorno)
                console.log('resultado de una intermedia', retorno)
            }
        }

        if(this.returnClause != undefined &&  this.returnClause != null){
            if(Array.isArray(this.returnClause)){
                for(let instruccion of this.returnClause){
                    let retorno = instruccion.getValor(entornoFlor, xml)
                    if(retorno != undefined || !retorno instanceof Error) 
                        retorno += retorno                     
                }

                // aqui verificar que devolver 
                return retorno
            }else{
                let retorno = this.returnClause.getValor(entornoFlor, xml)
                console.log('RETORNO DEL FLWOR', retorno)
                console.log('tengo que verificar esto del where', retornos)
                
                // aqui verificar que devolver
                return this.ConvertiraXML(retorno)
            }
        }
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

    comprobar(retorno1, retorno2){
        for(let retorno of retorno1){
            if(retorno instanceof Objeto){

            }
        }
    }

    comprobarObjetos(objeto1, objeto2){
        if(objeto1 instanceof Objeto && objeto2 instanceof Objeto){
            if(objeto1.atributos.length === objeto2.atributos.length){
                for (let index = 0; index < objeto1.atributos.length; index++) {
                    let atributo1 = objeto1.atributos[index]
                    let atributo2 = objeto2.atributos[index]
                    if(atributo1.nombre == atributo2.nombre && atributo1.valor == atributo2.valor){

                    }else{
                        //console.log('false en atributo nombre y valor ')
                        return false
                    }
                }

                if(objeto1.hijos.length === objeto2.hijos.length){
                    for (let index = 0; index < objeto2.hijos.length; index++) {
                        let hijo1 =  objeto1.hijos[index]; 
                        let hijo2 = objeto2.hijos[index]; 
                        if(hijo1.texto == hijo2.texto && hijo1.tipo == hijo2.tipo){

                        }else{
                           // console.log('false en hijos texto y tipo')
                            return false
                        }
                    }
                }else{
                    //console.log('false en hijos length')
                    return false
                }

            }else{
                //console.log('false en atributos lenght')
                return false
            }
        }else{
            //console.log('false en Objeto')
            return false
        }

        return true
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


    getValor(entorno, xml){     
        let valor  =  this.instrucciones.getValor(entorno, xml); 
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

    getValor(entorno, xml){

    }
}


export class Return {
    expresion = null; 

    constructor(expresion){
        this.expresion = expresion; 
    }

    getValor(entorno, xml){
        let resultado = this.expresion.getValor(entorno, xml) 
        if(resultado == undefined)
            console.log('Esto viene del return ', this, resultado)
        return resultado
    }
}

