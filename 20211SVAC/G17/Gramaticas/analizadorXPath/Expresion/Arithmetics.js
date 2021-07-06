import { Retorno, newTemp} from '../../C3D';
const C3D = require('../../C3D')
const { Colision, ColisionTipo, Tipo, getTipoById } = require('../AST/Entorno')
const { ErroresGlobal } = require('../AST/Global')
const { Literal } = require("./Expresiones");

export class Arithmetic {

    constructor (izquierdo,op,derecho){
        this.op=op
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }

    getValor(Objetos){
        var retorno = []

        var valIzq = this.izquierdo.getValor(Objetos)
        var valDer = this.derecho.getValor(Objetos)
            // plano cartesiano entre valores izq y valores 
        for (var izq of valIzq){
            for (var der of valDer){
                var newValor = operar(izq, this.op, der)
                if ((newValor!=undefined || newValor!=null) && !this.contiene(retorno,newValor)){
                    retorno.push(
                        new Literal(
                            ColisionTipo[izq.tipo][der.tipo],
                            newValor
                        )
                    )
                }
            }
        }
        return retorno
    }

    getC3D(){
        var cod = ''
        var retIzq = this.izquierdo.getC3D()
        var retDer = this.derecho.getC3D()
        var TC0; var TC1; var TC2;
        cod += `//Inicio Arimeticas\n`
        if(retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.ATRIB || retDer.tipo == Tipo.NODO || retDer.tipo == Tipo.ATRIB )
        {
            TC0 = C3D.newTemp(); var T0 = C3D.newTemp(); var T1 = C3D.newTemp(); var T2 = C3D.newTemp();
            var La = C3D.newLbl(); var Lb = C3D.newLbl(); 
            cod += `${TC0} = spc;\n`
            cod += `${T0} = sp + 1; \n`
            cod += `${T1} = spc; \n`
            cod += `${Lb}:\n`
            cod += `${T2} = stackConsulta[(int)${T1}]; \n`
            cod += `if(${T2} == -2) goto ${La};\n`
            cod += `stack[(int)${T0}] = ${T2};\n`
            cod += `${T0} = ${T0} + 1;\n`
            cod += `${T1} = ${T1} + 1;\n`
            cod += `goto ${Lb};\n`
            cod += `${La}:\n`
            cod += `stack[(int)${T0}] = -2;\n`

            if(retIzq.cod!='' && (retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.ATRIB))
            { 
                var T1 = C3D.newTemp(); var T2 = C3D.newTemp(); 
                var T3 = C3D.newTemp(); var T4 = C3D.newTemp();
                var T5 = C3D.newTemp(); var TC1 = C3D.newTemp();
                var TSP = C3D.newTemp();
                var La = C3D.newLbl(); var Lb = C3D.newLbl(); 
                var Lc = C3D.newLbl(); var Ld = C3D.newLbl();

                cod += `${T1} = ${TC0}; \n`
                cod += `${Lb}:\n`
                cod += `${T2} = stackConsulta[(int)${T1}]; \n`
                cod += `if(${T2} == -2) goto ${La};\n`
                cod += `${T1} = ${T1} + 1;\n`
                cod += `goto ${Lb};\n`
                cod += `${La}:\n`
                cod += `spc = ${T1} + 1;\n`
                cod += `${T3} = sp + 1; \n`
                cod += `${T4} = spc; \n`
                cod += `${Ld}:\n`
                cod += `${T5} = stack[(int)${T3}];\n`
                cod += `if(${T5} == -2) goto ${Lc};\n`
                cod += `stackConsulta[(int)${T4}]=${T5};\n`
                cod += `${T3} = ${T3} + 1;\n`
                cod += `${T4} = ${T4} + 1;\n`
                cod += `goto ${Ld};\n`
                cod += `${Lc}:\n`
                cod += `stackConsulta[(int)${T4}] = -2;\n`
                cod += `${TC1} = spc;\n`
                cod += `${TSP} = sp;\n`
                cod += `sp = ${T3} + 1;\n`  

                cod += retIzq.cod
                cod += `sp = ${TSP};\n`

            }
            
            if(retDer.cod != '' && (retDer.tipo == Tipo.NODO || retDer.tipo == Tipo.ATRIB))
            {
                var T6 = C3D.newTemp(); var T7 = C3D.newTemp(); 
                var T8 = C3D.newTemp(); var T9 = C3D.newTemp(); 
                var T10 = C3D.newTemp(); var TC2 = C3D.newTemp();
                var TSP = C3D.newTemp();

                var Le = C3D.newLbl(); var Lf = C3D.newLbl(); 
                var Lg = C3D.newLbl(); var Lh = C3D.newLbl()
                
                cod += `${T6} = ${TC0};\n`
                cod += `${Lf}:\n`
                cod += `${T7} = stackConsulta[(int)${T6}];\n`
                cod += `if(${T7} == -2) goto ${Le};\n`
                cod += `${T6} = ${T6} + 1;\n`
                cod += `goto ${Lf};\n`
                cod += `${Le}:\n`
                cod += `spc = ${T6} + 1;\n`
                cod += `${T8} = sp + 1;\n`
                cod += `${T9} = spc; \n`
                cod += `${Lg}:\n`
                cod += `${T10} = stack[(int)${T8}];\n`
                cod += `if(${T10} == -2) goto ${Lh};\n`
                cod += `stackConsulta[(int)${T9}]=${T10};\n`
                cod += `${T8} = ${T8} + 1;\n`
                cod += `${T9} = ${T9} + 1;\n`
                cod += `goto ${Lg};\n`
                cod += `${Lh}:\n`
                cod += `stackConsulta[(int)${T9}] = -2;\n`
                cod += `${TC2} = spc;\n`
                cod += `${TSP} = sp;\n`
                cod += `sp = ${T8} + 1;\n`

                cod += retDer.cod
                cod += `sp = ${TSP};\n` 
            }  
        }
        
        if(retIzq.cod!='' && retIzq.tipo != Tipo.NODO && retIzq.tipo != Tipo.ATRIB )
        {
            cod += retIzq.cod
        }
        
        if(retDer.cod!='' && retDer.tipo != Tipo.NODO && retDer.tipo != Tipo.ATRIB )
        {
            cod += retDer.cod
        }

        var TC3;
        if(retIzq.tipo == Tipo.DECIMAL || retIzq.tipo == Tipo.INTEGER)
        {
            TC3 = retIzq.valor
            //cod += `${TC3} = ${retIzq.valor};\n` 
        }
        else if(retIzq.tipo == Tipo.NODO)
        {   
            var TF1=newTemp();var T11 = newTemp();var T12 = newTemp();TC3 = newTemp();
            cod += `${TF1} = stackConsulta[(int)${TC1}];\n`
            cod += `${TF1} = ${TF1} + 3;\n`
            cod += `${T11} = Indexes[(int)${TF1}];\n`
            cod += `sp = sp + 1;\n`
            cod += `${T12} = sp + 1;\n`
            cod += `stack[(int)${T12}] = ${T11};\n`
            C3D.funcBoleanas[C3D.funcIndices.CASTNUM] = true
            cod += `CastNum();\n`
            cod += `${TC3} = stack[(int)sp];\n`
            cod += `sp = sp - 1;\n`
        }
        else if(retIzq.tipo == Tipo.ATRIB)
        {
            var TF1=newTemp();var T11 = newTemp();var T12 = newTemp();TC3 = newTemp();
            cod += `${TF1} = stackConsulta[(int)${TC1}];\n`
            cod += `${TF1} = ${TF1} + 1;\n`
            cod += `${T11} = stackAtributos[(int)${TF1}];\n`
            cod += `sp = sp + 1;\n`
            cod += `${T12} = sp + 1;\n`
            cod += `stack[(int)${T12}] = ${T11};\n`
            C3D.funcBoleanas[C3D.funcIndices.CASTNUM] = true
            cod += `CastNum();\n`
            cod += `${TC3} = stack[(int)sp];\n`
            cod += `sp = sp - 1;\n`
        }

        var TC4;
        if(retDer.tipo == Tipo.DECIMAL)
        {
            TC4 = retDer.valor;
            //cod += `${TC4} = ${retDer.valor};\n` 
        }
        else if(retDer.tipo == Tipo.NODO)
        {
            var TF2=newTemp(); var T13 = newTemp();var T14 = newTemp();TC4 = newTemp();
            cod += `${TF2} = stackConsulta[(int)${TC2}];\n`
            cod += `${TF2} = ${TF2} + 3;\n`
            cod += `${T13} = Indexes[(int)${TF2}];\n`
            cod += `sp = sp + 1;\n`
            cod += `${T14} = sp + 1;\n`
            cod += `stack[(int)${T14}] = ${T13};\n`
            C3D.funcBoleanas[C3D.funcIndices.CASTNUM] = true
            cod += `CastNum();\n`
            cod += `${TC4} = stack[(int)sp];\n`
            cod += `sp = sp - 1;\n`
        }
        else if(retDer.tipo == Tipo.ATRIB)
        {
            var TF2=newTemp(); var T13 = newTemp();var T14 = newTemp();TC4 = newTemp();
            cod += `${TF2} = stackConsulta[(int)${TC2}];\n`
            cod += `${TF2} = ${TF2} + 1;\n`
            cod += `${T13} = stackAtributos[(int)${TF2}];\n`
            cod += `sp = sp + 1;\n`
            cod += `${T14} = sp + 1;\n`
            cod += `stack[(int)${T14}] = ${T13};\n`
            C3D.funcBoleanas[C3D.funcIndices.CASTNUM] = true
            cod += `CastNum();\n`
            cod += `${TC4} = stack[(int)sp];\n`
            cod += `sp = sp - 1;\n` 
        }

        var TC5 = newTemp();
        switch(this.op)
        {
            case "+":
                cod += `${TC5} = ${TC3} + ${TC4};\n`
                break;
            case "-":
                cod += `${TC5} = ${TC3} - ${TC4};\n`
                break;
            case "*":
                cod += `${TC5} = ${TC3} * ${TC4};\n`
                break;
            case "div":
                cod += `${TC5} = (float)${TC3} / (float)${TC4};\n`
                break;
            case "mod":
                cod += `${TC5} = (int)${TC3} % ${TC4};\n`
                break;
            case "idiv":
                cod += `${TC5} = (int)(${TC3} / ${TC4});\n`
                break;
        } 
        if(retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.ATRIB || retDer.tipo == Tipo.NODO || retDer.tipo == Tipo.ATRIB )
        {
            cod += `spc = ${TC0};\n`
        }
        return {cod:cod,tipo:Tipo.DECIMAL,valor:TC5}
    }
    
    contiene(objeto,numero)
    {
        for (const iterator of objeto) {
            if(iterator.valor==numero) return true
        }
        return false
    }

    Graficar(ListaNodes,ListaEdges,contador)
    {
        var NodosActuales = []
        var nodoActual = {id:contador.num,label:this.op}
        NodosActuales.push(nodoActual);ListaNodes.push(nodoActual);contador.num++
        var nodos = this.izquierdo.Graficar(ListaNodes,ListaEdges,contador)
        for (const nodo of nodos) {
            ListaEdges.push({from:nodoActual.id,to:nodo.id})
        }
        nodos=this.derecho.Graficar(ListaNodes,ListaEdges,contador)
        for (const nodo of nodos) {
            ListaEdges.push({from:nodoActual.id,to:nodo.id})
        }
        return NodosActuales
    }
}

function operar(izq, op, der){
    var retorno = false
    // validar tipos
    if (Colision[izq.tipo][der.tipo]){
        switch(op){
            case "+":
                retorno =  Number(izq.valor) + Number(der.valor)
                break;
            case "-":
                retorno = Number(izq.valor) - Number(der.valor)
                break;
            case "*":
                retorno = Number(izq.valor) * Number(der.valor)
                break;
            case "div":
                retorno = Number(izq.valor) / Number(der.valor)
                break;
            case "mod":
                retorno = Number(izq.valor) % Number(der.valor)
                break;
            case "idiv":
                retorno = Math.trunc(Number(izq.valor) / Number(der.valor))
                break;
        }   
    } 
    else
    {
        ErroresGlobal.push({Error:`No se pudieron operar los tipos ${getTipoById(izq.tipo)} - ${getTipoById(der.tipo)}`,tipo:"Semantico",Linea:0,columna:0})
    } 
    return retorno
}

export class Unary {
    constructor (op,izquierdo){
        this.op=op
        this.izquierdo = izquierdo;
    }

    getValor(Objetos){
        var retorno = []
        // recorrer lista de objetos
        for (var obj of Objetos) {
            var valIzq = this.izquierdo.getValor([obj])
            // recorrer lista de resultados de izquierda
            for (var izq of valIzq) {
                if (Colision[Tipo.INTEGER][izq.tipo]){
                    var newValor = null
                    switch(this.op){
                        case "-":
                            newValor = - izq.valor
                        break;
                        case "+":
                            newValor = + izq.valor
                        break;
                    } 
                    if (newValor && !this.contiene(retorno,newValor)) retorno.push(new Literal(izq.tipo, newValor))
                }
                else
                {
                    ErroresGlobal.push({Error:`No se puede realizar operacion en ${getTipoById(izq.tipo)}`,tipo:"Semantico",Linea:0,columna:0})
                } 
            }
        }
        return retorno
    }

    getC3D(){
        var cod = ''
        var retIzq = this.izquierdo.getC3D()
        var TC0; var TC1;

        if(retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.ATRIB)
        {
            TC0 = C3D.newTemp(); var T0 = C3D.newTemp(); var T1 = C3D.newTemp(); var T2 = C3D.newTemp();
            var La = C3D.newLbl(); var Lb = C3D.newLbl(); 
            cod += `${TC0} = spc;\n`
            cod += `${T0} = sp + 1; \n`
            cod += `${T1} = spc; \n`
            cod += `${Lb}:\n`
            cod += `${T2} = stackConsulta[(int)${T1}]; \n`
            cod += `if(${T2} == -2) goto ${La};\n`
            cod += `stack[(int)${T0}] = ${T2};\n`
            cod += `${T0} = ${T0} + 1;\n`
            cod += `${T1} = ${T1} + 1;\n`
            cod += `goto ${Lb};\n`
            cod += `${La}:\n`
            cod += `stack[(int)${T0}] = -2;\n`

            if(retIzq.cod!='' && (retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.ATRIB))
            { 
                var T1 = C3D.newTemp(); var T2 = C3D.newTemp(); 
                var T3 = C3D.newTemp(); var T4 = C3D.newTemp();
                var T5 = C3D.newTemp(); var TC1 = C3D.newTemp();

                var La = C3D.newLbl(); var Lb = C3D.newLbl(); 
                var Lc = C3D.newLbl(); var Ld = C3D.newLbl();

                cod += `${T1} = ${TC0}; \n`
                cod += `${Lb}:\n`
                cod += `${T2} = stackConsulta[(int)${T1}]; \n`
                cod += `if(${T2} == -2) goto ${La};\n`
                cod += `${T1} = ${T1} + 1;\n`
                cod += `goto ${Lb};\n`
                cod += `${La}:\n`
                cod += `spc = ${T1} + 1;\n`
                cod += `${T3} = sp + 1; \n`
                cod += `${T4} = spc; \n`
                cod += `${Ld}:\n`
                cod += `${T5} = stack[(int)${T3}];\n`
                cod += `if(${T5} == -2) goto ${Lc};\n`
                cod += `stackConsulta[(int)${T4}]=${T5};\n`
                cod += `${T3} = ${T3} + 1;\n`
                cod += `${T4} = ${T4} + 1;\n`
                cod += `goto ${Ld};\n`
                cod += `${Lc}:\n`
                cod += `stackConsulta[(int)${T4}] = -2;\n`
                cod += `${TC1} = spc;\n`
                cod += `sp = ${T3} + 1;\n`  

                cod += retIzq.cod
                cod += `sp = sp - ${T3};\n`
                cod += `sp = sp - 1;\n`
            }   
        }
        
        if(retIzq.cod!='' && retIzq.tipo != Tipo.NODO && retIzq.tipo != Tipo.ATRIB )
        {
            cod += retIzq.cod
        }
        
        var TC3;
        if(retIzq.tipo == Tipo.DECIMAL || retIzq.tipo == Tipo.INTEGER)
        {
            TC3 = retIzq.valor
            //cod += `${TC3} = ${retIzq.valor};\n` 
        }
        else if(retIzq.tipo == Tipo.NODO)
        {   
            var TF1=newTemp();var T11 = newTemp();var T12 = newTemp();TC3 = newTemp();
            cod += `${TF1} = stackConsulta[(int)${TC1}];\n`
            cod += `${TF1} = ${TF1} + 3;\n`
            cod += `${T11} = Indexes[(int)${TF1}];\n`
            cod += `sp = sp + 1;\n`
            cod += `${T12} = sp + 1;\n`
            cod += `stack[(int)${T12}] = ${T11};\n`
            C3D.funcBoleanas[C3D.funcIndices.CASTNUM] = true
            cod += `CastNum();\n`
            cod += `${TC3} = stack[(int)sp];\n`
            cod += `sp = sp - 1;\n`
        }
        else if(retIzq.tipo == Tipo.ATRIB)
        {
            var TF1=newTemp();var T11 = newTemp();var T12 = newTemp();TC3 = newTemp();
            cod += `${TF1} = stackConsulta[(int)${TC1}];\n`
            cod += `${TF1} = ${TF1} + 1;\n`
            cod += `${T11} = stackAtributos[(int)${TF1}];\n`
            cod += `sp = sp + 1;\n`
            cod += `${T12} = sp + 1;\n`
            cod += `stack[(int)${T12}] = ${T11};\n`
            C3D.funcBoleanas[C3D.funcIndices.CASTNUM] = true
            cod += `CastNum();\n`
            cod += `${TC3} = stack[(int)sp];\n`
            cod += `sp = sp - 1;\n`
        }
        var TC5 = newTemp();
        switch(this.op)
        {
            case "+":
                cod += `${TC5} = ${TC3};\n`
                break;
            case "-":
                cod += `${TC5} = - ${TC3};\n`
                break;
        } 
        if(retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.ATRIB)
        {
            cod += `spc = ${TC0};\n`
        }
        return {cod:cod,tipo:Tipo.DECIMAL,valor:TC5}
    }

    contiene(objeto,numero)
    {
        for (const iterator of objeto) {
            if(iterator.valor==numero) return true
        }
        return false
    }

    Graficar(ListaNodes,ListaEdges,contador)
    {
        var NodosActuales = []
        var nodoActual = {id:contador.num,label:this.op}
        NodosActuales.push(nodoActual);ListaNodes.push(nodoActual);contador.num++
        var nodos = this.izquierdo.Graficar(ListaNodes,ListaEdges,contador)
        for (const nodo of nodos) {
            ListaEdges.push({from:nodoActual.id,to:nodo.id})
        }
        return NodosActuales
    }


}

export class RangeExp
{
    constructor(inicio,fin)
    {
        this.inicio = inicio
        this.fin = fin
    }

    getValor(Objetos)
    {
        var retorno = []
        var valinicio = this.inicio.getValor(Objetos)
        var valfin = this.fin.getValor(Objetos)
            // plano cartesiano entre valores izq y valores 
        if(valinicio.length != 1 || valfin.length != 1 || valfin[0].tipo!=Tipo.INTEGER || valinicio[0].tipo!=Tipo.INTEGER)
        {
            ErroresGlobal.push({Error:`Se esperaba entero to entero`,tipo:"Semantico",Linea:0,columna:0})
            return []
        }
        for (let index = Number(valinicio[0].valor); index <= Number(valfin[0].valor); index++) {
            retorno.push(new Literal(Tipo.INTEGER,index))
        }
        return retorno
    }
    
    Graficar(ListaNodes,ListaEdges,contador)
    {
        var NodosActuales = []
        var nodoActual = {id:contador.num,label:"to"}
        NodosActuales.push(nodoActual);ListaNodes.push(nodoActual);contador.num++
        var nodos = this.izquierdo.Graficar(ListaNodes,ListaEdges,contador)
        for (const nodo of nodos) {
            ListaEdges.push({from:nodoActual.id,to:nodo.id})
        }
        nodos=this.derecho.Graficar(ListaNodes,ListaEdges,contador)
        for (const nodo of nodos) {
            ListaEdges.push({from:nodoActual.id,to:nodo.id})
        }
        return NodosActuales
    }
}

export class Concat 
{
    constructor (izquierdo,derecho){
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }

    getValor(Objetos){
        var retorno = []

        var valIzq = this.izquierdo.getValor(Objetos)
        var valDer = this.derecho.getValor(Objetos)
            // plano cartesiano entre valores izq y valores 
        for (var izq of valIzq){
            for (var der of valDer){
                retorno.push(
                    new Literal(
                        Tipo.STRING,
                        `${izq.valor}${der.valor}`
                    )
                )
            }
        }
        return retorno
    } 


    getC3D(){
        var cod = ''
        var retIzq = this.izquierdo.getC3D()
        var retDer = this.derecho.getC3D()
        var TC0; var TC1; var TC2;

        if(retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.ATRIB || retDer.tipo == Tipo.NODO || retDer.tipo == Tipo.ATRIB )
        {
            TC0 = C3D.newTemp(); var T0 = C3D.newTemp(); var T1 = C3D.newTemp(); var T2 = C3D.newTemp();
            var La = C3D.newLbl(); var Lb = C3D.newLbl(); 
            cod += `${TC0} = spc;\n`
            cod += `${T0} = sp + 1; \n`
            cod += `${T1} = spc; \n`
            cod += `${Lb}:\n`
            cod += `${T2} = stackConsulta[(int)${T1}]; \n`
            cod += `if(${T2} == -2) goto ${La};\n`
            cod += `stack[(int)${T0}] = ${T2};\n`
            cod += `${T0} = ${T0} + 1;\n`
            cod += `${T1} = ${T1} + 1;\n`
            cod += `goto ${Lb};\n`
            cod += `${La}:\n`
            cod += `stack[(int)${T0}] = -2;\n`

            if(retIzq.cod!='' && (retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.ATRIB))
            { 
                var T1 = C3D.newTemp(); var T2 = C3D.newTemp(); 
                var T3 = C3D.newTemp(); var T4 = C3D.newTemp();
                var T5 = C3D.newTemp(); var TC1 = C3D.newTemp();

                var La = C3D.newLbl(); var Lb = C3D.newLbl(); 
                var Lc = C3D.newLbl(); var Ld = C3D.newLbl();

                cod += `${T1} = ${TC0}; \n`
                cod += `${Lb}:\n`
                cod += `${T2} = stackConsulta[(int)${T1}]; \n`
                cod += `if(${T2} == -2) goto ${La};\n`
                cod += `${T1} = ${T1} + 1;\n`
                cod += `goto ${Lb};\n`
                cod += `${La}:\n`
                cod += `spc = ${T1} + 1;\n`
                cod += `${T3} = sp + 1; \n`
                cod += `${T4} = spc; \n`
                cod += `${Ld}:\n`
                cod += `${T5} = stack[(int)${T3}];\n`
                cod += `if(${T5} == -2) goto ${Lc};\n`
                cod += `stackConsulta[(int)${T4}]=${T5};\n`
                cod += `${T3} = ${T3} + 1;\n`
                cod += `${T4} = ${T4} + 1;\n`
                cod += `goto ${Ld};\n`
                cod += `${Lc}:\n`
                cod += `stackConsulta[(int)${T4}] = -2;\n`
                cod += `${TC1} = spc;\n`
                cod += `sp = ${T3} + 1;\n`  

                cod += retIzq.cod
                cod += `sp = sp - ${T3};\n`
                cod += `sp = sp - 1;\n`

            }
            
            if(retDer.cod != '' && (retDer.tipo == Tipo.NODO || retDer.tipo == Tipo.ATRIB))
            {
                var T6 = C3D.newTemp(); var T7 = C3D.newTemp(); 
                var T8 = C3D.newTemp(); var T9 = C3D.newTemp(); 
                var T10 = C3D.newTemp(); var TC2 = C3D.newTemp();

                var Le = C3D.newLbl(); var Lf = C3D.newLbl(); 
                var Lg = C3D.newLbl(); var Lh = C3D.newLbl()
                
                cod += `${T6} = ${TC0};\n`
                cod += `${Lf}:\n`
                cod += `${T7} = stackConsulta[(int)${T6}];\n`
                cod += `if(${T7} == -2) goto ${Le};\n`
                cod += `${T6} = ${T6} + 1;\n`
                cod += `goto ${Lf};\n`
                cod += `${Le}:\n`
                cod += `spc = ${T6} + 1;\n`
                cod += `${T8} = sp + 1;\n`
                cod += `${T9} = spc; \n`
                cod += `${Lg}:\n`
                cod += `${T10} = stack[(int)${T8}];\n`
                cod += `if(${T10} == -2) goto ${Lh};\n`
                cod += `stackConsulta[(int)${T9}]=${T10};\n`
                cod += `${T8} = ${T8} + 1;\n`
                cod += `${T9} = ${T9} + 1;\n`
                cod += `goto ${Lg};\n`
                cod += `${Lh}:\n`
                cod += `stackConsulta[(int)${T9}] = -2;\n`
                cod += `${TC2} = spc;\n`
                cod += `sp = ${T8} + 1;\n`

                cod += retDer.cod
                cod += `sp = sp - ${T8};\n`
                cod += `sp = sp - 1;\n` 
            }  
        }
        
        if(retIzq.cod!='' && retIzq.tipo != Tipo.NODO && retIzq.tipo != Tipo.ATRIB )
        {
            cod += retIzq.cod
        }
        
        if(retDer.cod!='' && retDer.tipo != Tipo.NODO && retDer.tipo != Tipo.ATRIB )
        {
            cod += retDer.cod
        }
        /* Concatenacion como tal */
        //Hijo Izquierdo
        var TC3;
        if(retIzq.tipo == Tipo.DECIMAL || retIzq.tipo == Tipo.INTEGER)
        {
            var T10 = newTemp(); var T11 = newTemp(); TC3 = newTemp(); var T14 = newTemp();
            var Tcima = newTemp(); var TBase = newTemp();

            var Lj = C3D.newLbl(); var Li = C3D.newLbl(); var Lm = C3D.newLbl(); var Lk = C3D.newLbl();
            
            //nos cambiamos de entorno
            cod += `sp = sp + 1; \n`
            cod += `${TBase} = sp + 0; \n` 
            cod += `${Tcima} = ${TBase}; \n`
            cod += `${T10} = ${retIzq.valor}; \n`       //capturamos el valor

            cod += `${Lj}: \n`
            cod += `${T11} = (int)${T10} % 10; \n`           //guardamos el residuo de hacer un mod 
            
            cod += `if (${T10} == 0) goto ${Li}; \n`    //si el cociente es cero terminamos de guardar
            cod += `${T10} = (int)${T10}/10; \n`        //guardamos el cociente la parte entera
            cod += `stack[(int)${Tcima}] = ${T11}; \n`  //si no es cero, guardamos en el stack el cociente
            cod += `${Tcima} = ${Tcima} + 1; \n`        //aumentamos el contador
            cod += `goto ${Lj}; \n`

            cod += `${Li}: \n`  //se termino el numero
            cod += `${Tcima} = ${Tcima} - 1; \n`
            cod += `${TC3} = hp; \n`
            cod += `${Lm}: \n`
            cod += `if (${Tcima} < ${TBase}) goto ${Lk}; \n` //recorremos el stack en forma invertida
            cod += `${T14} = stack[(int)${Tcima}]; \n`
            cod += `${T14} = ${T14} + 48; \n`
            cod += `heap[(int)hp] = ${T14}; \n`   //metemos en el heap
            cod += `hp = hp + 1; \n`
            cod += `${Tcima} = ${Tcima} - 1; \n`
            cod += `goto ${Lm}; \n`

            cod += `${Lk}: \n`  //terminamos el numero invertido
            cod += `heap[(int)hp] = -1; \n`
            cod += `hp = hp + 1; \n`

        }
        else if(retIzq.tipo == Tipo.STRING){
            TC3 = newTemp();
            cod += `${TC3} = ${retIzq.valor}; \n`
        }
        else if(retIzq.tipo == Tipo.NODO)
        {   
            var TF1=newTemp(); TC3 = newTemp();
            cod += `${TF1} = stackConsulta[(int)${TC1}];\n`
            cod += `${TF1} = ${TF1} + 3;\n`
            cod += `${TC3} = Indexes[(int)${TF1}];\n`            
        }
        else if(retIzq.tipo == Tipo.ATRIB)
        {
            var TF1=newTemp(); TC3 = newTemp();
            cod += `${TF1} = stackConsulta[(int)${TC1}];\n`
            cod += `${TF1} = ${TF1} + 1;\n`
            cod += `${TC3} = stackAtributos[(int)${TF1}];\n`            
        }

        //Hijo Derecho
        var TC4;
        if(retDer.tipo == Tipo.DECIMAL || retDer.tipo == Tipo.INTEGER)
        {
            var T10 = newTemp(); var T11 = newTemp(); TC4 = newTemp(); var T14 = newTemp();
            var Tcima = newTemp(); var TBase = newTemp();

            var Lj = C3D.newLbl(); var Li = C3D.newLbl(); var Lm = C3D.newLbl(); var Lk = C3D.newLbl();
            
            //nos cambiamos de entorno
            cod += `sp = sp + 1; \n`
            cod += `${TBase} = sp + 0; \n` 
            cod += `${Tcima} = ${TBase}; \n`
            cod += `${T10} = ${retDer.valor}; \n`       //capturamos el valor

            cod += `${Lj}: \n`
            cod += `${T11} = (int)${T10} % 10; \n`           //guardamos el residuo de hacer un mod 
            
            cod += `if (${T10} == 0) goto ${Li}; \n`    //si el cociente es cero terminamos de guardar
            cod += `${T10} = (int)${T10}/10; \n`        //guardamos el cociente la parte entera
            cod += `stack[(int)${Tcima}] = ${T11}; \n`  //si no es cero, guardamos en el stack el cociente
            cod += `${Tcima} = ${Tcima} + 1; \n`        //aumentamos el contador
            cod += `goto ${Lj}; \n`

            cod += `${Li}: \n`  //se termino el numero
            cod += `${Tcima} = ${Tcima} - 1; \n`
            cod += `${TC4} = hp; \n`
            cod += `${Lm}: \n`
            
            cod += `if (${Tcima} < ${TBase}) goto ${Lk}; \n` //recorremos el stack en forma invertida
            cod += `${T14} = stack[(int)${Tcima}]; \n`
            cod += `${T14} = ${T14} + 48; \n`
            cod += `heap[(int)hp] = ${T14}; \n`   //metemos en el heap
            cod += `hp = hp + 1; \n`
            cod += `${Tcima} = ${Tcima} - 1; \n`
            cod += `goto ${Lm}; \n`

            cod += `${Lk}: \n`  //terminamos el numero invertido
            cod += `heap[(int)hp] = -1; \n`
            cod += `hp = hp + 1; \n`
        }
        else if(retDer.tipo == Tipo.STRING){
            TC4 = newTemp();
            cod += `${TC4} = ${retDer.valor}; \n`
        }
        else if(retDer.tipo == Tipo.NODO)
        {
            var TF2=newTemp(); TC4 = newTemp();
            cod += `${TF2} = stackConsulta[(int)${TC2}];\n`
            cod += `${TF2} = ${TF2} + 3;\n`
            cod += `${TC4} = Indexes[(int)${TF2}];\n`            
        }
        else if(retDer.tipo == Tipo.ATRIB)
        {
            var TF2=newTemp(); TC4 = newTemp();
            cod += `${TF2} = stackConsulta[(int)${TC2}];\n`
            cod += `${TF2} = ${TF2} + 1;\n`
            cod += `${TC4} = stackAtributos[(int)${TF2}];\n`             
        }

        var TC5 = newTemp();
        var Ta = newTemp(); var Tb = newTemp(); var Tc = newTemp(); var Td = newTemp();
        var LA = C3D.newLbl(); var LB = C3D.newLbl(); var LC = C3D.newLbl(); var LD = C3D.newLbl(); 

        cod += `${TC5} = hp;\n`
        /*guardamos el primer hijo*/
        cod += `${Ta} = ${TC3}; \n` //capturamos donde inicia el primer hijo
        cod += `${LB}: \n`
        cod += `${Tb} = heap[(int)${Ta}]; \n`        
        cod += `if (${Tb} == -1) goto ${LA}; \n`
        cod += `heap[(int)hp] = ${Tb}; \n`
        cod += `hp = hp + 1; \n`
        cod += `${Ta} = ${Ta} + 1; \n`
        cod += `goto ${LB}; \n`

        cod += `${LA}: \n`      //si ya se termino el primer string pasamos al siguiente
        cod += `${Tc} = ${TC4}; \n`
        cod += `${LD}: \n`
        cod += `${Td} = heap[(int)${Tc}]; \n`
        cod += `if (${Td} == -1) goto ${LC}; \n`
        cod += `heap[(int)hp] = ${Td}; \n`
        cod += `hp = hp + 1; \n`
        cod += `${Tc} = ${Tc} + 1; \n`
        cod += `goto ${LD}; \n`
        cod += `${LC}: \n`
        cod += `heap[(int)hp] = -1; \n`
        cod += `hp = hp + 1; \n`

        if(retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.ATRIB || retDer.tipo == Tipo.NODO || retDer.tipo == Tipo.ATRIB )
        {
            cod += `spc = ${TC0};\n`
        }

        return {cod:cod,tipo:Tipo.STRING,valor:TC5}
    }


    Graficar(ListaNodes,ListaEdges,contador)
    {
        var NodosActuales = []
        var nodoActual = {id:contador.num,label:"||"}
        NodosActuales.push(nodoActual);ListaNodes.push(nodoActual);contador.num++
        var nodos = this.izquierdo.Graficar(ListaNodes,ListaEdges,contador)
        for (const nodo of nodos) {
            ListaEdges.push({from:nodoActual.id,to:nodo.id})
        }
        nodos=this.derecho.Graficar(ListaNodes,ListaEdges,contador)
        for (const nodo of nodos) {
            ListaEdges.push({from:nodoActual.id,to:nodo.id})
        }
        return NodosActuales
    }
}
