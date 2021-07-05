const C3D = require('../../C3D')
var {Tipo, ColisionLogical, getTipoById} = require("../AST/Entorno")
const { ErroresGlobal } = require('../AST/Global')
const { Literal } = require("./Expresiones")
//Funcion para el Or entre booleanos
export class Logical
{
    constructor(izquierdo,op,derecho)
    {
        this.op=op
        this.izquierdo=izquierdo;
        this.derecho=derecho;
    }
    
    getValor(Objetos)
    {
        var retornos = new Map()

        for (var obj of Objetos ){
            var valIzq = this.izquierdo.getValor([obj])
            var valDer = this.derecho.getValor([obj])
            operar(retornos,this.op,valIzq,valDer,Objetos)
        }
        var temp = []
        for (const iterator of retornos.values()) {
            temp.push(iterator)
        }
        return temp
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

    getC3D()
    {
        var TCretorno;
        var cod = ''
        var retIzq = this.izquierdo.getC3D()
        var retDer = this.derecho.getC3D()
        var TC0; var TC1; var TC2;
        cod += `//Inicio del Logical\n`

        if(retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.BOOLEAN || retIzq.tipo == Tipo.ATRIB || retDer.tipo == Tipo.NODO || retDer.tipo == Tipo.BOOLEAN || retDer.tipo == Tipo.ATRIB )
        {
            TC0 = C3D.newTemp(); TC1 = TC0; var T0 = C3D.newTemp(); var T1 = C3D.newTemp(); var T2 = C3D.newTemp();
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

            if(retIzq.cod!='' && retIzq.tipo == Tipo.BOOLEAN)
            {
                var T1 = C3D.newTemp(); var T2 = C3D.newTemp();  var T3 = C3D.newTemp(); 
                var T4 = C3D.newTemp(); var T5 = C3D.newTemp(); var TC1 = C3D.newTemp(); 
                var TSP = C3D.newTemp();
                var T6 = C3D.newTemp(); var T7 = C3D.newTemp(); var T8 = C3D.newTemp();

                var La = C3D.newLbl(); var Lb = C3D.newLbl(); var Lc = C3D.newLbl(); 
                var Ld = C3D.newLbl(); var Le = C3D.newLbl(); var Lf = C3D.newLbl();

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
                cod += `${T6} = ${retIzq.valor};\n`
                cod += `${T7} = ${TC1};\n`
                cod += `${Lf}:\n`
                cod += `${T8} = stackConsulta[(int)${T6}];\n`
                cod += `if(${T8} == -2) goto ${Le};\n`
                cod += `stackConsulta[(int)${T7}] = ${T8};\n`
                cod += `${T6} = ${T6} + 1;\n`
                cod += `${T7} = ${T7} + 1;\n`
                cod += `goto ${Lf};\n`
                cod += `${Le}:\n`
                cod += `stackConsulta[(int)${T7}] = -2;\n`

                cod += `sp = ${TSP};\n`
            }

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

            if(retDer.cod!='' && retDer.tipo == Tipo.BOOLEAN)
            {
                var T6 = C3D.newTemp(); var T7 = C3D.newTemp();  var T8 = C3D.newTemp(); 
                var T9 = C3D.newTemp(); var T10 = C3D.newTemp(); var TC2 = C3D.newTemp();
                var TSP = C3D.newTemp();
                var T11 = C3D.newTemp(); var T12 = C3D.newTemp(); var T13 = C3D.newTemp();

                var Le = C3D.newLbl(); var Lf = C3D.newLbl(); 
                var Lg = C3D.newLbl(); var Lh = C3D.newLbl();
                var Li = C3D.newLbl(); var Lj = C3D.newLbl();
                
                if(TC1){ cod += `${T6} = ${TC1};\n` }
                else { cod += `${T6} = ${TC0};\n` }
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
                cod += `${T11} = ${retDer.valor};\n`
                cod += `${T12} = ${TC2};\n`
                cod += `${Li}:\n`
                cod += `${T13} = stackConsulta[(int)${T11}];\n`
                cod += `if(${T13} == -2) goto ${Lj};\n`
                cod += `stackConsulta[(int)${T12}] = ${T13};\n`
                cod += `${T11} = ${T11} + 1;\n`
                cod += `${T12} = ${T12} + 1;\n`
                cod += `goto ${Li};\n`
                cod += `${Lj}:\n`
                cod += `stackConsulta[(int)${T12}] = -2;\n`

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
                
                if(TC1){ cod += `${T6} = ${TC1};\n` }
                else { cod += `${T6} = ${TC0};\n` }
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
        
        if(retIzq.cod!='' && retIzq.tipo != Tipo.BOOLEAN && retIzq.tipo != Tipo.NODO && retIzq.tipo != Tipo.ATRIB )
        {
            cod += retIzq.cod
        }
        
        if(retDer.cod!='' && retDer.tipo != Tipo.BOOLEAN && retDer.tipo != Tipo.NODO && retDer.tipo != Tipo.ATRIB )
        {
            cod += retDer.cod
        }

        if(retIzq.tipo == Tipo.BOOLEAN)
        {
            TCretorno = TC1
            if(retDer.tipo == Tipo.BOOLEAN)
            {
                var TL1 = C3D.newTemp(); var TL2 = C3D.newTemp(); var TL3 = C3D.newTemp(); var TL4 = C3D.newTemp(); 

                var LR0 = C3D.newLbl(); var LR1 = C3D.newLbl(); var LR2 = C3D.newLbl(); var LR3 = C3D.newLbl(); var LR4 = C3D.newLbl();

                cod += `${TL1} = ${TC1};\n`
                cod += `${TL2} = ${TC2};\n`
                cod += `${LR4}:\n`
                cod += `${TL3} = stackConsulta[(int)${TL1}];\n`
                cod += `${TL4} = stackConsulta[(int)${TL2}];\n`
                cod += `if(${TL3} == -2) goto ${LR0};\n`
                switch(this.op)
                {
                    case "and":
                        cod += `if(${TL3} == 0) goto ${LR1};\n`
                        cod += `if(${TL4} == 0) goto ${LR1};\n`
                        cod += `goto ${LR2};\n`
                        break;
                    case "or":
                        cod += `if(${TL3} == 1) goto ${LR2};\n`
                        cod += `if(${TL4} == 1) goto ${LR2};\n`
                        break;
                }
                cod += `${LR1}:\n`
                cod += `stacX[(int)sx] = 0;\n`
                cod += `sx = sx + 1;\n`
                cod += `stacX[(int)sx] = -2;\n`
                cod += `goto ${LR3};\n`

                cod += `${LR2}:\n`
                cod += `stacX[(int)sx] = 1;\n`
                cod += `sx = sx + 1;\n`
                cod += `stacX[(int)sx] = -2;\n`

                cod += `${LR3}:\n`
                cod += `${TL1} = ${TL1} + 1;\n`
                cod += `${TL2} = ${TL2} + 1;\n`
                cod += `goto ${LR4};\n`
                cod += `${LR0}:\n`

                var TP4 = C3D.newTemp(); var TP5 = C3D.newTemp(); var TP6 = C3D.newTemp();
                var LP4 = C3D.newLbl(); var LP5 = C3D.newLbl();
                //Reemplazar el StackConsulta por el StackX
                cod += `${TP4} = 0; \n`                        //contador para el stackX y stackConsulta
                cod += `${LP4}: \n`
                cod += `${TP5} = stacX[(int)${TP4}]; \n`
                cod += `if (${TP5} == -2) goto ${LP5}; \n`      //si el stackX ya se termino vamos a LD
                cod += `${TP6} = ${TC1} + ${TP4}; \n`              //posicion contador del stackConsulta
                cod += `stackConsulta[(int)${TP6}] = ${TP5};\n`   //ponemos en el stackConsulta lo que habia en TQ
                cod += `${TP4} = ${TP4} + 1; \n`                //aumentamos el contador de stackX
                cod += `goto ${LP4}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

                //se acabo el stackX, no hay mas para guardar
                cod += `${LP5}: \n`    
                cod += `${TP6} = ${TC1} + ${TP4};\n`
                cod += `stackConsulta[(int)${TP6}] = -2;\n`
                cod += `sx = 0; \n`
                cod += `stacX[(int)sx] = -2; \n`
            }
        }
        
        if(retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.BOOLEAN || retIzq.tipo == Tipo.ATRIB || retDer.tipo == Tipo.NODO || retDer.tipo == Tipo.BOOLEAN || retDer.tipo == Tipo.ATRIB )
        {
            cod += `spc = ${TC0};\n`
        }
        return {cod:cod,tipo:Tipo.BOOLEAN,valor:TCretorno}   
    }
}

function operar(objeto,op,izqValor,derValor,todos){
    var retorno = false
    // validar tipos
    switch(op){
        case "and":
            for (const izq of izqValor) {
                for (const der of derValor) {
                    if(izq.tipo==Tipo.NODO)
                    {
                        if(der.tipo==Tipo.NODO)
                        {
                            if(izq.entorno == der.entorno)
                            {
                                objeto.set(izq.entorno,izq)
                                break
                            }
                            break
                        }
                        objeto.set(izq.entorno,izq)
                        break
                    }
                    else if(der.tipo==Tipo.NODO)
                    {
                        objeto.set(izq.entorno,der)
                        break
                    }
                    for (const iterator of todos) {
                        objeto.set(iterator.entorno,iterator)
                    }
                    return
                }
            }
            break
        case "or":
            for (const izq of izqValor) {
                if(izq.tipo!=Tipo.NODO)
                {
                    for (const iterator of todos) {
                        objeto.set(iterator.entorno,iterator)
                    }
                    return
                }
                objeto.set(izq.entorno,izq)
            }
            for (const der of derValor) {
                if(der.tipo!=Tipo.NODO)
                {
                    for (const iterator of todos) {
                        objeto.set(iterator.entorno,iterator)
                    }
                    return
                }
                objeto.set(der.entorno,der)
            }
            break
    }
    return retorno
}