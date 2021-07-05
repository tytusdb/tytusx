var {Tipo, Colision, getTipoById} = require("../AST/Entorno");
const C3D = require('../../C3D')
const { ErroresGlobal } = require('../AST/Global')
const { Literal } = require("./Expresiones");

export class ComparisonExp {

    constructor (izquierdo,op,derecho){
        this.op=op
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }

    getValor(Objetos)
    {
        var retorno = []
        
        for (var obj of Objetos ){
            var valIzq = this.izquierdo.getValor([obj])
            var valDer = this.derecho.getValor([obj])
            for (var izq of valIzq) {
                var salir = false
                for (var der of valDer){
                    if (comparison(izq,this.op,der)){
                        retorno.push(obj)
                        salir = true
                        break
                    }
                }
                if (salir) break
            }
        }
        return retorno
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
        cod += `//Inicio Relacional\n`
        if(retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.ATRIB || retDer.tipo == Tipo.NODO || retDer.tipo == Tipo.ATRIB )
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

            if(retIzq.cod!='' && (retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.ATRIB))
            { 
                var T1 = C3D.newTemp(); var T2 = C3D.newTemp(); 
                var T3 = C3D.newTemp(); var T4 = C3D.newTemp();
                var T5 = C3D.newTemp(); TC1 = C3D.newTemp();
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
                var T10 = C3D.newTemp(); TC2 = C3D.newTemp();
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

        /* Comparaciones del hijo izquierdo */
        if(retIzq.tipo == Tipo.NODO) {
            TCretorno = TC1;
            switch(retDer.tipo)
            {
                case Tipo.STRING: {
                        var TR0 = C3D.newTemp(); var TR1 = C3D.newTemp(); var TR2 = C3D.newTemp(); var TR3 = C3D.newTemp(); var TR4 = C3D.newTemp();
                        var TR5 = C3D.newTemp(); var TR6 = C3D.newTemp(); var TR7 = C3D.newTemp(); 

                        var LR3 = C3D.newLbl(); var LR1 = C3D.newLbl(); var LR4 = C3D.newLbl(); var LR2 = C3D.newLbl();

                        cod += `${TR0} = ${retDer.valor};\n`
                        cod += `${TR1} = ${TC1};\n`
                        cod += `${LR2}:\n`
                        cod += `${TR2} = stackConsulta[(int)${TR1}];\n`
                        cod += `if(${TR2}==-2) goto ${LR3};\n`
                        cod += `${TR3} = ${TR2} + 3;\n`
                        cod += `${TR4} = Indexes[(int)${TR3}];\n`
                        cod += `sp = sp + 1;\n`
                        cod += `${TR5} = sp + 1;\n`
                        cod += `stack[(int)${TR5}] = ${TR4};\n`
                        cod += `${TR6} = sp + 2;\n`
                        cod += `stack[(int)${TR6}] = ${TR0};\n`
                        cod += `CompararAscii();\n`
                        cod += `${TR7} = stack[(int)sp];\n`
                        cod += `sp = sp - 1;\n`
                        switch(this.op)
                        {
                            case "=":
                                cod += `if (${TR7} != 0) goto ${LR1};\n`
                                break;
                            case "!=":
                                cod += `if (${TR7} == 0) goto ${LR1};\n`
                                break;
                            case "<":
                                cod += `if (${TR7} >= 0) goto ${LR1};\n`
                                break;
                            case "<=":
                                cod += `if (${TR7} > 0) goto ${LR1};\n`
                                break;
                            case ">":
                                cod += `if (${TR7} <= 0) goto ${LR1};\n`
                                break;
                            case ">=":
                                cod += `if (${TR7} < 0) goto ${LR1};\n`
                                break;
                        }
                        cod += `stacX[(int)sx] = 1;\n`
                        cod += `sx = sx + 1;\n;`
                        cod += `stacX[(int)sx] = -2;\n`
                        cod += `goto ${LR4};\n`
                        cod += `${LR1}:\n`
                        cod += `stacX[(int)sx] = 0;\n`
                        cod += `sx = sx + 1;\n;`
                        cod += `stacX[(int)sx] = -2;\n`
                        cod += `${LR4}:\n`
                        cod += `${TR1} = ${TR1} + 1;\n`
                        cod += `goto ${LR2};\n`
                        cod += `${LR3}:\n`
                        
                        var TP = C3D.newTemp(); var TQ = C3D.newTemp(); var TR = C3D.newTemp(); 
                        
                        var LW = C3D.newLbl(); var Lx = C3D.newLbl()
                        //Reemplazar el StackConsulta por el StackX
                        cod += `${TP} = 0; \n`                        //contador para el stackX y stackConsulta
                        cod += `${TQ} = stacX[(int)${TP}]; \n`
                        cod += `${LW}: \n`
                        cod += `if (${TQ} == -2) goto ${Lx}; \n`      //si el stackX ya se termino vamos a LD
                        cod += `${TR} = ${TC1} + ${TP}; \n`              //posicion contador del stackConsulta
                        cod += `stackConsulta[(int)${TR}] = ${TQ};\n`   //ponemos en el stackConsulta lo que habia en TQ
                        cod += `${TP} = ${TP} + 1; \n`                //aumentamos el contador de stackX
                        cod += `${TQ} = stacX[(int)${TP}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
                        cod += `goto ${LW}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

                        //se acabo el stackX, no hay mas para guardar
                        cod += `${Lx}: \n`   
                        cod += `${TR} = ${TC1} + ${TP};\n` 
                        cod += `stackConsulta[(int)${TR}] = -2;\n`
                        cod += `sx = 0; \n`
                        cod += `stacX[(int)sx] = -2; \n`
                    }
                    break;
                
                case Tipo.INTEGER:
                case Tipo.DECIMAL: {
                    var TR0 = C3D.newTemp(); var TR1 = C3D.newTemp(); var TR2 = C3D.newTemp(); var TR3 = C3D.newTemp(); var TR4 = C3D.newTemp();
                    var TR5 = C3D.newTemp(); var TR6 = C3D.newTemp(); 

                    var LR3 = C3D.newLbl(); var LR1 = C3D.newLbl(); var LR4 = C3D.newLbl(); var LR2 = C3D.newLbl();

                    cod += `${TR0} = ${retDer.valor};\n`
                    cod += `${TR1} = ${TC1};\n`
                    cod += `${LR2}:\n`
                    cod += `${TR2} = stackConsulta[(int)${TR1}];\n`
                    cod += `if(${TR2}==-2) goto ${LR3};\n`
                    cod += `${TR3} = ${TR2} + 3;\n`
                    cod += `${TR4} = Indexes[(int)${TR3}];\n`

                    cod += `${TR5} = sp + 1;\n`
                    cod += `stack[(int)${TR5}] = ${TR4};\n`
                    C3D.funcBoleanas[C3D.funcIndices.CASTNUM] = true
                    cod += `CastNum();\n`
                    cod += `${TR6} = stack[(int)sp];\n`
                    cod += `sp = sp - 1;\n`

                    switch(this.op)
                    {
                        case "=":
                            cod += `if (${TR6} != ${TR0}) goto ${LR1};\n`
                            break;
                        case "!=":
                            cod += `if (${TR6} == ${TR0}) goto ${LR1};\n`
                            break;
                        case "<":
                            cod += `if (${TR6} >= ${TR0}) goto ${LR1};\n`
                            break;
                        case "<=":
                            cod += `if (${TR6} > ${TR0}) goto ${LR1};\n`
                            break;
                        case ">":
                            cod += `if (${TR6} <= ${TR0}) goto ${LR1};\n`
                            break;
                        case ">=":
                            cod += `if (${TR6} < ${TR0}) goto ${LR1};\n`
                            break;
                    }
                    cod += `stacX[(int)sx] = 1;\n`
                    cod += `sx = sx + 1;\n;`
                    cod += `stacX[(int)sx] = -2;\n`
                    cod += `goto ${LR4};\n`
                    cod += `${LR1}:\n`
                    cod += `stacX[(int)sx] = 0;\n`
                    cod += `sx = sx + 1;\n;`
                    cod += `stacX[(int)sx] = -2;\n`
                    cod += `${LR4}:\n`
                    cod += `${TR1} = ${TR1} + 1;\n`
                    cod += `goto ${LR2};\n`
                    cod += `${LR3}:\n`
                    
                    var TP = C3D.newTemp(); var TQ = C3D.newTemp(); var TR = C3D.newTemp(); 
                    
                    var LW = C3D.newLbl(); var Lx = C3D.newLbl()
                    //Reemplazar el StackConsulta por el StackX
                    cod += `${TP} = 0; \n`                        //contador para el stackX y stackConsulta
                    cod += `${TQ} = stacX[(int)${TP}]; \n`
                    cod += `${LW}: \n`
                    cod += `if (${TQ} == -2) goto ${Lx}; \n`      //si el stackX ya se termino vamos a LD
                    cod += `${TR} = ${TC1} + ${TP}; \n`              //posicion contador del stackConsulta
                    cod += `stackConsulta[(int)${TR}] = ${TQ};\n`   //ponemos en el stackConsulta lo que habia en TQ
                    cod += `${TP} = ${TP} + 1; \n`                //aumentamos el contador de stackX
                    cod += `${TQ} = stacX[(int)${TP}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
                    cod += `goto ${LW}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

                    //se acabo el stackX, no hay mas para guardar
                    cod += `${Lx}: \n`   
                    cod += `${TR} = ${TC1} + ${TP};\n` 
                    cod += `stackConsulta[(int)${TR}] = -2;\n`
                    cod += `sx = 0; \n`
                    cod += `stacX[(int)sx] = -2; \n`
                }
                break;

                case Tipo.NODO:
                case Tipo.ATRIB:
            }
            //cod += `${TC3} = ${retIzq.valor};\n` 
        }
        else if(retIzq.tipo == Tipo.ATRIB){
            TCretorno = TC1;
            switch(retDer.tipo)
            {
                case Tipo.STRING:
                    {
                        var TR0 = C3D.newTemp(); var TR1 = C3D.newTemp(); var TR2 = C3D.newTemp(); var TR3 = C3D.newTemp(); var TR4 = C3D.newTemp();
                        var TR5 = C3D.newTemp(); var TR6 = C3D.newTemp(); var TR7 = C3D.newTemp(); 

                        var LR3 = C3D.newLbl(); var LR1 = C3D.newLbl(); var LR4 = C3D.newLbl(); var LR2 = C3D.newLbl();

                        cod += `${TR0} = ${retDer.valor};\n`
                        cod += `${TR1} = ${TC1};\n`
                        cod += `${LR2}:\n`
                        cod += `${TR2} = stackConsulta[(int)${TR1}];\n`
                        cod += `if(${TR2}==-2) goto ${LR3};\n`
                        cod += `${TR3} = ${TR2} + 1;\n`
                        cod += `${TR4} = stackAtributos[(int)${TR3}];\n`
                        cod += `sp = sp + 1;\n`
                        cod += `${TR5} = sp + 1;\n`
                        cod += `stack[(int)${TR5}] = ${TR4};\n`
                        cod += `${TR6} = sp + 2;\n`
                        cod += `stack[(int)${TR6}] = ${TR0};\n`
                        cod += `CompararAscii();\n`
                        cod += `${TR7} = stack[(int)sp];\n`
                        cod += `sp = sp - 1;\n`
                        switch(this.op)
                        {
                            case "=":
                                cod += `if (${TR7} != 0) goto ${LR1};\n`
                                break;
                            case "!=":
                                cod += `if (${TR7} == 0) goto ${LR1};\n`
                                break;
                            case "<":
                                cod += `if (${TR7} >= 0) goto ${LR1};\n`
                                break;
                            case "<=":
                                cod += `if (${TR7} > 0) goto ${LR1};\n`
                                break;
                            case ">":
                                cod += `if (${TR7} <= 0) goto ${LR1};\n`
                                break;
                            case ">=":
                                cod += `if (${TR7} < 0) goto ${LR1};\n`
                                break;
                        }
                        cod += `stacX[(int)sx] = 1;\n`
                        cod += `sx = sx + 1;\n;`
                        cod += `stacX[(int)sx] = -2;\n`
                        cod += `goto ${LR4};\n`
                        cod += `${LR1}:\n`
                        cod += `stacX[(int)sx] = 0;\n`
                        cod += `sx = sx + 1;\n;`
                        cod += `stacX[(int)sx] = -2;\n`
                        cod += `${LR4}:\n`
                        cod += `${TR1} = ${TR1} + 1;\n`
                        cod += `goto ${LR2};\n`
                        cod += `${LR3}:\n`
                        
                        var TP = C3D.newTemp(); var TQ = C3D.newTemp(); var TR = C3D.newTemp(); 
                        
                        var LW = C3D.newLbl(); var Lx = C3D.newLbl()
                        //Reemplazar el StackConsulta por el StackX
                        cod += `${TP} = 0; \n`                        //contador para el stackX y stackConsulta
                        cod += `${TQ} = stacX[(int)${TP}]; \n`
                        cod += `${LW}: \n`
                        cod += `if (${TQ} == -2) goto ${Lx}; \n`      //si el stackX ya se termino vamos a LD
                        cod += `${TR} = ${TC1} + ${TP}; \n`              //posicion contador del stackConsulta
                        cod += `stackConsulta[(int)${TR}] = ${TQ};\n`   //ponemos en el stackConsulta lo que habia en TQ
                        cod += `${TP} = ${TP} + 1; \n`                //aumentamos el contador de stackX
                        cod += `${TQ} = stacX[(int)${TP}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
                        cod += `goto ${LW}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

                        //se acabo el stackX, no hay mas para guardar
                        cod += `${Lx}: \n`   
                        cod += `${TR} = ${TC1} + ${TP};\n` 
                        cod += `stackConsulta[(int)${TR}] = -2;\n`
                        cod += `sx = 0; \n`
                        cod += `stacX[(int)sx] = -2; \n`
                    }
                    break;
                
                case Tipo.INTEGER:
                case Tipo.DECIMAL:
                    {
                        var TR0 = C3D.newTemp(); var TR1 = C3D.newTemp(); var TR2 = C3D.newTemp(); var TR3 = C3D.newTemp(); var TR4 = C3D.newTemp();
                        var TR5 = C3D.newTemp();  var TR7 = C3D.newTemp(); 

                        var LR3 = C3D.newLbl(); var LR1 = C3D.newLbl(); var LR4 = C3D.newLbl(); var LR2 = C3D.newLbl();

                        cod += `${TR0} = ${retDer.valor};\n`
                        cod += `${TR1} = ${TC1};\n`
                        cod += `${LR2}:\n`
                        cod += `${TR2} = stackConsulta[(int)${TR1}];\n`
                        cod += `if(${TR2}==-2) goto ${LR3};\n`
                        cod += `${TR3} = ${TR2} + 1;\n`
                        cod += `${TR4} = stackAtributos[(int)${TR3}];\n`

                        cod += `sp = sp + 1;\n`
                        cod += `${TR5} = sp + 1;\n`
                        cod += `stack[(int)${TR5}] = ${TR4};\n`
                        C3D.funcBoleanas[C3D.funcIndices.CASTNUM] = true
                        cod += `CastNum();\n`
                        cod += `${TR7} = stack[(int)sp];\n`
                        cod += `sp = sp - 1;\n`
                        switch(this.op)
                        {
                            case "=":
                                cod += `if (${TR7} != ${TR0}) goto ${LR1};\n`
                                break;
                            case "!=":
                                cod += `if (${TR7} == ${TR0}) goto ${LR1};\n`
                                break;
                            case "<":
                                cod += `if (${TR7} >= ${TR0}) goto ${LR1};\n`
                                break;
                            case "<=":
                                cod += `if (${TR7} > ${TR0}) goto ${LR1};\n`
                                break;
                            case ">":
                                cod += `if (${TR7} <= ${TR0}) goto ${LR1};\n`
                                break;
                            case ">=":
                                cod += `if (${TR7} < ${TR0}) goto ${LR1};\n`
                                break;
                        }
                        cod += `stacX[(int)sx] = 1;\n`
                        cod += `sx = sx + 1;\n;`
                        cod += `stacX[(int)sx] = -2;\n`
                        cod += `goto ${LR4};\n`
                        cod += `${LR1}:\n`
                        cod += `stacX[(int)sx] = 0;\n`
                        cod += `sx = sx + 1;\n;`
                        cod += `stacX[(int)sx] = -2;\n`
                        cod += `${LR4}:\n`
                        cod += `${TR1} = ${TR1} + 1;\n`
                        cod += `goto ${LR2};\n`
                        cod += `${LR3}:\n`
                        
                        var TP = C3D.newTemp(); var TQ = C3D.newTemp(); var TR = C3D.newTemp(); 
                        
                        var LW = C3D.newLbl(); var Lx = C3D.newLbl()
                        //Reemplazar el StackConsulta por el StackX
                        cod += `${TP} = 0; \n`                        //contador para el stackX y stackConsulta
                        cod += `${TQ} = stacX[(int)${TP}]; \n`
                        cod += `${LW}: \n`
                        cod += `if (${TQ} == -2) goto ${Lx}; \n`      //si el stackX ya se termino vamos a LD
                        cod += `${TR} = ${TC1} + ${TP}; \n`              //posicion contador del stackConsulta
                        cod += `stackConsulta[(int)${TR}] = ${TQ};\n`   //ponemos en el stackConsulta lo que habia en TQ
                        cod += `${TP} = ${TP} + 1; \n`                //aumentamos el contador de stackX
                        cod += `${TQ} = stacX[(int)${TP}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
                        cod += `goto ${LW}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

                        //se acabo el stackX, no hay mas para guardar
                        cod += `${Lx}: \n`   
                        cod += `${TR} = ${TC1} + ${TP};\n` 
                        cod += `stackConsulta[(int)${TR}] = -2;\n`
                        cod += `sx = 0; \n`
                        cod += `stacX[(int)sx] = -2; \n`
                    }
                    break;
                
                    
                case Tipo.NODO:
                case Tipo.ATRIB:
            }
        }
        else if (retIzq.tipo == Tipo.DECIMAL){
            switch (retDer.tipo) {
                case Tipo.DECIMAL:
                    {
                        var TR0 = C3D.newTemp(); var TR1 = C3D.newTemp(); var Tcont = C3D.newTemp(); 
                        var TR2 = C3D.newTemp(); var Treal = C3D.newTemp(); var TR3 = C3D.newTemp();
                        var Tinicio = C3D.newTemp(); var Tcont1 = C3D.newTemp();
                        var LR2 = C3D.newLbl(); var LR3 = C3D.newLbl(); var La = C3D.newLbl(); var Lb = C3D.newLbl(); var Lc = C3D.newLbl();
                        
                        cod += `${TR0} = ${retIzq.valor};\n`
                        cod += `${TR1} = ${retDer.valor};\n`
                        //recorremos el stackConsulta hasta -2
                        cod += `${Treal} = spc; \n`
                        cod += `${TR2} = spc;\n`
                        cod += `${Tcont} = 0; \n`
                        cod += `${LR2}:\n`
                        cod += `${TR3} = stackConsulta[(int)${TR2}];\n`
                        cod += `if(${TR3} == -2) goto ${LR3};\n`
                        cod += `${TR2} = ${TR2} + 1; \n`
                        cod += `${Tcont} = ${Tcont} + 1; \n`
                        cod += `goto ${LR2}; \n`

                        cod += `${LR3}: \n`

                        //cambio de entorno
                        cod += `spc = ${TR2} + 1; \n`
                        cod += `${Tinicio} = spc; \n`
                        cod += `${Tcont1} = spc; \n`

                        switch(this.op)
                            {       //verificar a que etiqueta me voy si es verdadero o falso
                                case "=":
                                    cod += `if (${TR0} != ${TR1}) goto ${Lc};\n`
                                    break;
                                case "!=":
                                    cod += `if (${TR0} == ${TR1}) goto ${Lc};\n`
                                    break;
                                case "<":
                                    cod += `if (${TR0} >= ${TR1}) goto ${Lc};\n`
                                    break;
                                case "<=":
                                    cod += `if (${TR0} > ${TR1}) goto ${Lc};\n`
                                    break;
                                case ">":
                                    cod += `if (${TR0} <= ${TR1}) goto ${Lc};\n`
                                    break;
                                case ">=":
                                    cod += `if (${TR0} < ${TR1}) goto ${Lc};\n`
                                    break;
                            }
                        
                        cod += `${La}: \n`  //si los numero son iguales -> true
                        cod += `if (${Tcont} <= 0) goto ${Lb}; \n`
                        cod += `stackConsulta[(int)${Tcont1}] = 1; \n`
                        cod += `${Tcont1} = ${Tcont1} + 1; \n`
                        cod += `${Tcont} = ${Tcont} - 1; \n`
                        cod += `goto ${La}; \n`
                        
                        //si los numeros son diferentes -> false
                        cod += `${Lc}: \n`
                        cod += `if (${Tcont} <= 0) goto ${Lb}; \n`
                        cod += `stackConsulta[(int)${Tcont1}] = 0; \n`
                        cod += `${Tcont1} = ${Tcont1} + 1; \n`
                        cod += `${Tcont} = ${Tcont} - 1; \n`
                        cod += `goto ${Lc}; \n` 

                        cod += `${Lb}: \n`  //terminamos de guardar los stackConsulta
                        cod += `stackConsulta[(int)${Tcont1}] = -2; \n`
                        cod += `spc = ${Treal}; \n`
                        
                        TCretorno = Tinicio
                    }
                    break;
                case Tipo.STRING:
                    /* Aqui devuelve falso */
                    break;
            }
        }
        else if (retIzq.tipo == Tipo.STRING ){
            switch (retDer.tipo) {
                case Tipo.DECIMAL:
                    /* Aqui devuelve falso */
                    break;
                case Tipo.STRING:
                    {
                        var TR0 = C3D.newTemp(); var TR1 = C3D.newTemp(); var TR2 = C3D.newTemp(); var Tcont = C3D.newTemp();
                        var Tinicio = C3D.newTemp(); var Tcont1 = C3D.newTemp(); var Treal = C3D.newTemp();
                        var TR3 = C3D.newTemp(); var TR5 = C3D.newTemp(); var TR6 = C3D.newTemp(); var TR7 = C3D.newTemp();
                        var LR2 = C3D.newLbl(); var LR3 = C3D.newLbl(); var La = C3D.newLbl(); var Lb = C3D.newLbl();
                        var Lc = C3D.newLbl(); 
                        /* Aqui hacemos una comparacion */
                        cod += `${TR0} = ${retIzq.valor};\n`    
                        cod += `${TR1} = ${retDer.valor};\n`
                        
                        //recorremos el stackConsulta hasta -2
                        cod += `${Treal} = spc; \n`
                        cod += `${TR2} = spc;\n`
                        cod += `${Tcont} = 0; \n`
                        cod += `${LR2}:\n`
                        cod += `${TR3} = stackConsulta[(int)${TR2}];\n`
                        cod += `if(${TR3}==-2) goto ${LR3};\n`
                        cod += `${TR2} = ${TR2} + 1; \n`
                        cod += `${Tcont} = ${Tcont} + 1; \n`
                        cod += `goto ${LR2}; \n`

                        

                        /* Hacemos la comparacion como tal */
                        cod += `${LR3}: \n`

                        //cambio de entorno
                        cod += `spc = ${TR2} + 1; \n`
                        cod += `${Tinicio} = spc; \n`
                        cod += `${Tcont1} = spc; \n`

                        cod += `sp = sp + 1;\n`
                        cod += `${TR5} = sp + 1;\n`
                        cod += `stack[(int)${TR5}] = ${TR0};\n`
                        cod += `${TR6} = sp + 2;\n`
                        cod += `stack[(int)${TR6}] = ${TR1};\n`
                        cod += `CompararAscii();\n`
                        cod += `${TR7} = stack[(int)sp];\n`
                        cod += `sp = sp - 1;\n`
                        switch(this.op)
                        {
                            case "=":
                                cod += `if (${TR7} != 0) goto ${Lc};\n`
                                break;
                            case "!=":
                                cod += `if (${TR7} == 0) goto ${Lc};\n`
                                break;
                            case "<":
                                cod += `if (${TR7} >= 0) goto ${Lc};\n`
                                break;
                            case "<=":
                                cod += `if (${TR7} > 0) goto ${Lc};\n`
                                break;
                            case ">":
                                cod += `if (${TR7} <= 0) goto ${Lc};\n`
                                break;
                            case ">=":
                                cod += `if (${TR7} < 0) goto ${Lc};\n`
                                break;
                        }
                        //si los numeros son diferentes -> false
                        cod += `${La}: \n`  //si los numero son iguales -> true
                        cod += `if (${Tcont} <= 0) goto ${Lb}; \n`
                        cod += `stackConsulta[(int)${Tcont1}] = 1; \n`
                        cod += `${Tcont1} = ${Tcont1} + 1; \n`
                        cod += `${Tcont} = ${Tcont} - 1; \n`
                        cod += `goto ${La}; \n`
                        
                        cod += `${Lc}: \n`
                        cod += `if (${Tcont} <= 0) goto ${Lb}; \n`
                        cod += `stackConsulta[(int)${Tcont1}] = 0; \n`
                        cod += `${Tcont1} = ${Tcont1} + 1; \n`
                        cod += `${Tcont} = ${Tcont} - 1; \n`
                        cod += `goto ${Lc}; \n`            
                        
                        cod += `${Lb}: \n`  //terminamos de guardar los stackConsulta
                        cod += `stackConsulta[(int)${Tcont1}] = -2; \n`
                        cod += `spc = ${Treal}; \n`
                        
                        TCretorno = Tinicio
                    }
                    break;
            }
        }

        /* Comparaciones del hijo derecho */
        else if(retDer.tipo == Tipo.NODO)
        {
            TCretorno = TC2;
            switch(retIzq.tipo)
            {
                case Tipo.STRING: {
                        var TR0 = C3D.newTemp(); var TR1 = C3D.newTemp(); var TR2 = C3D.newTemp(); var TR3 = C3D.newTemp(); var TR4 = C3D.newTemp();
                        var TR5 = C3D.newTemp(); var TR6 = C3D.newTemp(); var TR7 = C3D.newTemp(); 

                        var LR3 = C3D.newLbl(); var LR1 = C3D.newLbl(); var LR4 = C3D.newLbl(); var LR2 = C3D.newLbl();

                        cod += `${TR0} = ${retIzq.valor};\n`
                        cod += `${TR1} = ${TC2};\n`
                        cod += `${LR2}:\n`
                        cod += `${TR2} = stackConsulta[(int)${TR1}];\n`
                        cod += `if(${TR2}==-2) goto ${LR3};\n`
                        cod += `${TR3} = ${TR2} + 3;\n`
                        cod += `${TR4} = Indexes[(int)${TR3}];\n`
                        cod += `sp = sp + 1;\n`
                        cod += `${TR5} = sp + 1;\n`
                        cod += `stack[(int)${TR5}] = ${TR0};\n`
                        cod += `${TR6} = sp + 2;\n`
                        cod += `stack[(int)${TR6}] = ${TR4};\n`
                        cod += `CompararAscii();\n`
                        cod += `${TR7} = stack[(int)sp];\n`
                        cod += `sp = sp - 1;\n`
                        switch(this.op)
                        {
                            case "=":
                                cod += `if (${TR7} != 0) goto ${LR1};\n`
                                break;
                            case "!=":
                                cod += `if (${TR7} == 0) goto ${LR1};\n`
                                break;
                            case "<":
                                cod += `if (${TR7} >= 0) goto ${LR1};\n`
                                break;
                            case "<=":
                                cod += `if (${TR7} > 0) goto ${LR1};\n`
                                break;
                            case ">":
                                cod += `if (${TR7} <= 0) goto ${LR1};\n`
                                break;
                            case ">=":
                                cod += `if (${TR7} < 0) goto ${LR1};\n`
                                break;
                        }
                        cod += `stacX[(int)sx] = 1;\n`
                        cod += `sx = sx + 1;\n;`
                        cod += `stacX[(int)sx] = -2;\n`
                        cod += `goto ${LR4};\n`
                        cod += `${LR1}:\n`
                        cod += `stacX[(int)sx] = 0;\n`
                        cod += `sx = sx + 1;\n;`
                        cod += `stacX[(int)sx] = -2;\n`
                        cod += `${LR4}:\n`
                        cod += `${TR1} = ${TR1} + 1;\n`
                        cod += `goto ${LR2};\n`
                        cod += `${LR3}:\n`
                        
                        var TP = C3D.newTemp(); var TQ = C3D.newTemp(); var TR = C3D.newTemp(); 
                        
                        var LW = C3D.newLbl(); var Lx = C3D.newLbl()
                        //Reemplazar el StackConsulta por el StackX
                        cod += `${TP} = 0; \n`                        //contador para el stackX y stackConsulta
                        cod += `${TQ} = stacX[(int)${TP}]; \n`
                        cod += `${LW}: \n`
                        cod += `if (${TQ} == -2) goto ${Lx}; \n`      //si el stackX ya se termino vamos a LD
                        cod += `${TR} = ${TC2} + ${TP}; \n`              //posicion contador del stackConsulta
                        cod += `stackConsulta[(int)${TR}] = ${TQ};\n`   //ponemos en el stackConsulta lo que habia en TQ
                        cod += `${TP} = ${TP} + 1; \n`                //aumentamos el contador de stackX
                        cod += `${TQ} = stacX[(int)${TP}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
                        cod += `goto ${LW}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

                        //se acabo el stackX, no hay mas para guardar
                        cod += `${Lx}: \n`   
                        cod += `${TR} = ${TC2} + ${TP};\n` 
                        cod += `stackConsulta[(int)${TR}] = -2;\n`
                        cod += `sx = 0; \n`
                        cod += `stacX[(int)sx] = -2; \n`
                    }
                    break;
                
                case Tipo.INTEGER:
                case Tipo.DECIMAL: {
                    var TR0 = C3D.newTemp(); var TR1 = C3D.newTemp(); var TR2 = C3D.newTemp(); var TR3 = C3D.newTemp(); var TR4 = C3D.newTemp();
                    var TR5 = C3D.newTemp(); var TR6 = C3D.newTemp(); 

                    var LR3 = C3D.newLbl(); var LR1 = C3D.newLbl(); var LR4 = C3D.newLbl(); var LR2 = C3D.newLbl();

                    cod += `${TR0} = ${retIzq.valor};\n`
                    cod += `${TR1} = ${TC2};\n`
                    cod += `${LR2}:\n`
                    cod += `${TR2} = stackConsulta[(int)${TR1}];\n`
                    cod += `if(${TR2}==-2) goto ${LR3};\n`
                    cod += `${TR3} = ${TR2} + 3;\n`
                    cod += `${TR4} = Indexes[(int)${TR3}];\n`

                    cod += `${TR5} = sp + 1;\n`
                    cod += `stack[(int)${TR5}] = ${TR4};\n`
                    C3D.funcBoleanas[C3D.funcIndices.CASTNUM] = true
                    cod += `CastNum();\n`
                    cod += `${TR6} = stack[(int)sp];\n`
                    cod += `sp = sp - 1;\n`

                    switch(this.op)
                    {
                        case "=":
                            cod += `if (${TR0} != ${TR6}) goto ${LR1};\n`
                            break;
                        case "!=":
                            cod += `if (${TR0} == ${TR6}) goto ${LR1};\n`
                            break;
                        case "<":
                            cod += `if (${TR0} >= ${TR6}) goto ${LR1};\n`
                            break;
                        case "<=":
                            cod += `if (${TR0} > ${TR6}) goto ${LR1};\n`
                            break;
                        case ">":
                            cod += `if (${TR0} <= ${TR6}) goto ${LR1};\n`
                            break;
                        case ">=":
                            cod += `if (${TR0} < ${TR6}) goto ${LR1};\n`
                            break;
                    }
                    cod += `stacX[(int)sx] = 1;\n`
                    cod += `sx = sx + 1;\n;`
                    cod += `stacX[(int)sx] = -2;\n`
                    cod += `goto ${LR4};\n`
                    cod += `${LR1}:\n`
                    cod += `stacX[(int)sx] = 0;\n`
                    cod += `sx = sx + 1;\n;`
                    cod += `stacX[(int)sx] = -2;\n`
                    cod += `${LR4}:\n`
                    cod += `${TR1} = ${TR1} + 1;\n`
                    cod += `goto ${LR2};\n`
                    cod += `${LR3}:\n`
                    
                    var TP = C3D.newTemp(); var TQ = C3D.newTemp(); var TR = C3D.newTemp(); 
                    
                    var LW = C3D.newLbl(); var Lx = C3D.newLbl()
                    //Reemplazar el StackConsulta por el StackX
                    cod += `${TP} = 0; \n`                        //contador para el stackX y stackConsulta
                    cod += `${TQ} = stacX[(int)${TP}]; \n`
                    cod += `${LW}: \n`
                    cod += `if (${TQ} == -2) goto ${Lx}; \n`      //si el stackX ya se termino vamos a LD
                    cod += `${TR} = ${TC2} + ${TP}; \n`              //posicion contador del stackConsulta
                    cod += `stackConsulta[(int)${TR}] = ${TQ};\n`   //ponemos en el stackConsulta lo que habia en TQ
                    cod += `${TP} = ${TP} + 1; \n`                //aumentamos el contador de stackX
                    cod += `${TQ} = stacX[(int)${TP}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
                    cod += `goto ${LW}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

                    //se acabo el stackX, no hay mas para guardar
                    cod += `${Lx}: \n`   
                    cod += `${TR} = ${TC2} + ${TP};\n` 
                    cod += `stackConsulta[(int)${TR}] = -2;\n`
                    cod += `sx = 0; \n`
                    cod += `stacX[(int)sx] = -2; \n`
                }
                break;

                case Tipo.NODO:
                case Tipo.ATRIB:
            }
        }
        else if(retDer.tipo == Tipo.ATRIB){
            TCretorno = TC2;
            switch(retIzq.tipo)
            {
                case Tipo.STRING:
                    {
                        var TR0 = C3D.newTemp(); var TR1 = C3D.newTemp(); var TR2 = C3D.newTemp(); var TR3 = C3D.newTemp(); var TR4 = C3D.newTemp();
                        var TR5 = C3D.newTemp(); var TR6 = C3D.newTemp(); var TR7 = C3D.newTemp(); 

                        var LR3 = C3D.newLbl(); var LR1 = C3D.newLbl(); var LR4 = C3D.newLbl(); var LR2 = C3D.newLbl();

                        cod += `${TR0} = ${retIzq.valor};\n`
                        cod += `${TR1} = ${TC2};\n`
                        cod += `${LR2}:\n`
                        cod += `${TR2} = stackConsulta[(int)${TR1}];\n`
                        cod += `if(${TR2}==-2) goto ${LR3};\n`
                        cod += `${TR3} = ${TR2} + 1;\n`
                        cod += `${TR4} = stackAtributos[(int)${TR3}];\n`
                        cod += `sp = sp + 1;\n`
                        cod += `${TR5} = sp + 1;\n`
                        cod += `stack[(int)${TR5}] = ${TR0};\n`
                        cod += `${TR6} = sp + 2;\n`
                        cod += `stack[(int)${TR6}] = ${TR4};\n`
                        cod += `CompararAscii();\n`
                        cod += `${TR7} = stack[(int)sp];\n`
                        cod += `sp = sp - 1;\n`
                        switch(this.op)
                        {
                            case "=":
                                cod += `if (${TR7} != 0) goto ${LR1};\n`
                                break;
                            case "!=":
                                cod += `if (${TR7} == 0) goto ${LR1};\n`
                                break;
                            case "<":
                                cod += `if (${TR7} >= 0) goto ${LR1};\n`
                                break;
                            case "<=":
                                cod += `if (${TR7} > 0) goto ${LR1};\n`
                                break;
                            case ">":
                                cod += `if (${TR7} <= 0) goto ${LR1};\n`
                                break;
                            case ">=":
                                cod += `if (${TR7} < 0) goto ${LR1};\n`
                                break;
                        }
                        cod += `stacX[(int)sx] = 1;\n`
                        cod += `sx = sx + 1;\n;`
                        cod += `stacX[(int)sx] = -2;\n`
                        cod += `goto ${LR4};\n`
                        cod += `${LR1}:\n`
                        cod += `stacX[(int)sx] = 0;\n`
                        cod += `sx = sx + 1;\n;`
                        cod += `stacX[(int)sx] = -2;\n`
                        cod += `${LR4}:\n`
                        cod += `${TR1} = ${TR1} + 1;\n`
                        cod += `goto ${LR2};\n`
                        cod += `${LR3}:\n`
                        
                        var TP = C3D.newTemp(); var TQ = C3D.newTemp(); var TR = C3D.newTemp(); 
                        
                        var LW = C3D.newLbl(); var Lx = C3D.newLbl()
                        //Reemplazar el StackConsulta por el StackX
                        cod += `${TP} = 0; \n`                        //contador para el stackX y stackConsulta
                        cod += `${TQ} = stacX[(int)${TP}]; \n`
                        cod += `${LW}: \n`
                        cod += `if (${TQ} == -2) goto ${Lx}; \n`      //si el stackX ya se termino vamos a LD
                        cod += `${TR} = ${TC2} + ${TP}; \n`              //posicion contador del stackConsulta
                        cod += `stackConsulta[(int)${TR}] = ${TQ};\n`   //ponemos en el stackConsulta lo que habia en TQ
                        cod += `${TP} = ${TP} + 1; \n`                //aumentamos el contador de stackX
                        cod += `${TQ} = stacX[(int)${TP}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
                        cod += `goto ${LW}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

                        //se acabo el stackX, no hay mas para guardar
                        cod += `${Lx}: \n`   
                        cod += `${TR} = ${TC2} + ${TP};\n` 
                        cod += `stackConsulta[(int)${TR}] = -2;\n`
                        cod += `sx = 0; \n`
                        cod += `stacX[(int)sx] = -2; \n`
                    }
                    break;
                
                case Tipo.INTEGER:
                case Tipo.DECIMAL:
                    {
                        var TR0 = C3D.newTemp(); var TR1 = C3D.newTemp(); var TR2 = C3D.newTemp(); var TR3 = C3D.newTemp(); var TR4 = C3D.newTemp();
                        var TR5 = C3D.newTemp();  var TR7 = C3D.newTemp(); 

                        var LR3 = C3D.newLbl(); var LR1 = C3D.newLbl(); var LR4 = C3D.newLbl(); var LR2 = C3D.newLbl();

                        cod += `${TR0} = ${retIzq.valor};\n`
                        cod += `${TR1} = ${TC2};\n`
                        cod += `${LR2}:\n`
                        cod += `${TR2} = stackConsulta[(int)${TR1}];\n`
                        cod += `if(${TR2}==-2) goto ${LR3};\n`
                        cod += `${TR3} = ${TR2} + 1;\n`
                        cod += `${TR4} = stackAtributos[(int)${TR3}];\n`

                        cod += `sp = sp + 1;\n`
                        cod += `${TR5} = sp + 1;\n`
                        cod += `stack[(int)${TR5}] = ${TR4};\n`
                        C3D.funcBoleanas[C3D.funcIndices.CASTNUM] = true
                        cod += `CastNum();\n`
                        cod += `${TR7} = stack[(int)sp];\n`
                        cod += `sp = sp - 1;\n`
                        switch(this.op)
                        {
                            case "=":
                                cod += `if (${TR0} != ${TR7}) goto ${LR1};\n`
                                break;
                            case "!=":
                                cod += `if (${TR0} == ${TR7}) goto ${LR1};\n`
                                break;
                            case "<":
                                cod += `if (${TR0} >= ${TR7}) goto ${LR1};\n`
                                break;
                            case "<=":
                                cod += `if (${TR0} > ${TR7}) goto ${LR1};\n`
                                break;
                            case ">":
                                cod += `if (${TR0} <= ${TR7}) goto ${LR1};\n`
                                break;
                            case ">=":
                                cod += `if (${TR0} < ${TR7}) goto ${LR1};\n`
                                break;
                        }
                        cod += `stacX[(int)sx] = 1;\n`
                        cod += `sx = sx + 1;\n;`
                        cod += `stacX[(int)sx] = -2;\n`
                        cod += `goto ${LR4};\n`
                        cod += `${LR1}:\n`
                        cod += `stacX[(int)sx] = 0;\n`
                        cod += `sx = sx + 1;\n;`
                        cod += `stacX[(int)sx] = -2;\n`
                        cod += `${LR4}:\n`
                        cod += `${TR1} = ${TR1} + 1;\n`
                        cod += `goto ${LR2};\n`
                        cod += `${LR3}:\n`
                        
                        var TP = C3D.newTemp(); var TQ = C3D.newTemp(); var TR = C3D.newTemp(); 
                        
                        var LW = C3D.newLbl(); var Lx = C3D.newLbl()
                        //Reemplazar el StackConsulta por el StackX
                        cod += `${TP} = 0; \n`                        //contador para el stackX y stackConsulta
                        cod += `${TQ} = stacX[(int)${TP}]; \n`
                        cod += `${LW}: \n`
                        cod += `if (${TQ} == -2) goto ${Lx}; \n`      //si el stackX ya se termino vamos a LD
                        cod += `${TR} = ${TC2} + ${TP}; \n`              //posicion contador del stackConsulta
                        cod += `stackConsulta[(int)${TR}] = ${TQ};\n`   //ponemos en el stackConsulta lo que habia en TQ
                        cod += `${TP} = ${TP} + 1; \n`                //aumentamos el contador de stackX
                        cod += `${TQ} = stacX[(int)${TP}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
                        cod += `goto ${LW}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

                        //se acabo el stackX, no hay mas para guardar
                        cod += `${Lx}: \n`   
                        cod += `${TR} = ${TC2} + ${TP};\n` 
                        cod += `stackConsulta[(int)${TR}] = -2;\n`
                        cod += `sx = 0; \n`
                        cod += `stacX[(int)sx] = -2; \n`
                    }
                    break;
                
                    
                case Tipo.NODO:
                case Tipo.ATRIB:
            }
        }
        else if (retDer.tipo == Tipo.DECIMAL){
            switch (retIzq.tipo) {
                case Tipo.DECIMAL:
                    {
                        var TR0 = C3D.newTemp(); var TR1 = C3D.newTemp(); var Tcont = C3D.newTemp(); 
                        var TR2 = C3D.newTemp(); var Treal = C3D.newTemp(); var TR3 = C3D.newTemp();
                        var Tinicio = C3D.newTemp(); var Tcont1 = C3D.newTemp();
                        var LR2 = C3D.newLbl(); var LR3 = C3D.newLbl(); var La = C3D.newLbl(); var Lb = C3D.newLbl(); var Lc = C3D.newLbl();
                        
                        cod += `${TR0} = ${retDer.valor};\n`
                        cod += `${TR1} = ${retIzq.valor};\n`
                        //recorremos el stackConsulta hasta -2
                        cod += `${Treal} = spc; \n`
                        cod += `${TR2} = spc;\n`
                        cod += `${Tcont} = 0; \n`
                        cod += `${LR2}:\n`
                        cod += `${TR3} = stackConsulta[(int)${TR2}];\n`
                        cod += `if(${TR3} == -2) goto ${LR3};\n`
                        cod += `${TR2} = ${TR2} + 1; \n`
                        cod += `${Tcont} = ${Tcont} + 1; \n`
                        cod += `goto ${LR2}; \n`

                        cod += `${LR3}: \n`

                        //cambio de entorno
                        cod += `spc = ${TR2} + 1; \n`
                        cod += `${Tinicio} = spc; \n`
                        cod += `${Tcont1} = spc; \n`

                        switch(this.op)
                            {       //verificar a que etiqueta me voy si es verdadero o falso
                                case "=":
                                    cod += `if (${TR0} != ${TR1}) goto ${Lc};\n`
                                    break;
                                case "!=":
                                    cod += `if (${TR0} == ${TR1}) goto ${Lc};\n`
                                    break;
                                case "<":
                                    cod += `if (${TR0} >= ${TR1}) goto ${Lc};\n`
                                    break;
                                case "<=":
                                    cod += `if (${TR0} > ${TR1}) goto ${Lc};\n`
                                    break;
                                case ">":
                                    cod += `if (${TR0} <= ${TR1}) goto ${Lc};\n`
                                    break;
                                case ">=":
                                    cod += `if (${TR0} < ${TR1}) goto ${Lc};\n`
                                    break;
                            }
                        
                        cod += `${La}: \n`  //si los numero son iguales -> true
                        cod += `if (${Tcont} <= 0) goto ${Lb}; \n`
                        cod += `stackConsulta[(int)${Tcont1}] = 1; \n`
                        cod += `${Tcont1} = ${Tcont1} + 1; \n`
                        cod += `${Tcont} = ${Tcont} - 1; \n`
                        cod += `goto ${La}; \n`
                        
                        //si los numeros son diferentes -> false
                        cod += `${Lc}: \n`
                        cod += `if (${Tcont} <= 0) goto ${Lb}; \n`
                        cod += `stackConsulta[(int)${Tcont1}] = 0; \n`
                        cod += `${Tcont1} = ${Tcont1} + 1; \n`
                        cod += `${Tcont} = ${Tcont} - 1; \n`
                        cod += `goto ${Lc}; \n` 

                        cod += `${Lb}: \n`  //terminamos de guardar los stackConsulta
                        cod += `stackConsulta[(int)${Tcont1}] = -2; \n`
                        cod += `spc = ${Treal}; \n`
                        
                        TCretorno = Tinicio
                    }
                    break;
                case Tipo.STRING:
                    /* Aqui devuelve falso */
                    break;
            }
        }
        else if (retDer.tipo == Tipo.STRING ){
            switch (retIzq.tipo) {
                case Tipo.DECIMAL:
                    /* Aqui devuelve falso */
                    break;
                case Tipo.STRING:
                    {
                        var TR0 = C3D.newTemp(); var TR1 = C3D.newTemp(); var TR2 = C3D.newTemp(); var Tcont = C3D.newTemp();
                        var Tinicio = C3D.newTemp(); var Tcont1 = C3D.newTemp(); var Treal = C3D.newTemp();
                        var TR3 = C3D.newTemp(); var TR5 = C3D.newTemp(); var TR6 = C3D.newTemp(); var TR7 = C3D.newTemp();
                        var LR2 = C3D.newLbl(); var LR3 = C3D.newLbl(); var La = C3D.newLbl(); var Lb = C3D.newLbl();
                        var Lc = C3D.newLbl(); 
                        /* Aqui hacemos una comparacion */
                        cod += `${TR0} = ${retDer.valor};\n`    
                        cod += `${TR1} = ${retIzq.valor};\n`
                        
                        //recorremos el stackConsulta hasta -2
                        cod += `${Treal} = spc; \n`
                        cod += `${TR2} = spc;\n`
                        cod += `${Tcont} = 0; \n`
                        cod += `${LR2}:\n`
                        cod += `${TR3} = stackConsulta[(int)${TR2}];\n`
                        cod += `if(${TR3}==-2) goto ${LR3};\n`
                        cod += `${TR2} = ${TR2} + 1; \n`
                        cod += `${Tcont} = ${Tcont} + 1; \n`
                        cod += `goto ${LR2}; \n`


                        /* Hacemos la comparacion como tal */
                        cod += `${LR3}: \n`

                        //cambio de entorno
                        cod += `spc = ${TR2} + 1; \n`
                        cod += `${Tinicio} = spc; \n`
                        cod += `${Tcont1} = spc; \n`

                        cod += `sp = sp + 1;\n`
                        cod += `${TR5} = sp + 1;\n`
                        cod += `stack[(int)${TR5}] = ${TR0};\n`
                        cod += `${TR6} = sp + 2;\n`
                        cod += `stack[(int)${TR6}] = ${TR1};\n`
                        cod += `CompararAscii();\n`
                        cod += `${TR7} = stack[(int)sp];\n`
                        cod += `sp = sp - 1;\n`
                        switch(this.op)
                        {
                            case "=":
                                cod += `if (${TR7} != 0) goto ${Lc};\n`
                                break;
                            case "!=":
                                cod += `if (${TR7} == 0) goto ${Lc};\n`
                                break;
                            case "<":
                                cod += `if (${TR7} >= 0) goto ${Lc};\n`
                                break;
                            case "<=":
                                cod += `if (${TR7} > 0) goto ${Lc};\n`
                                break;
                            case ">":
                                cod += `if (${TR7} <= 0) goto ${Lc};\n`
                                break;
                            case ">=":
                                cod += `if (${TR7} < 0) goto ${Lc};\n`
                                break;
                        }
                        //si los numeros son diferentes -> false
                        cod += `${La}: \n`  //si los numero son iguales -> true
                        cod += `if (${Tcont} <= 0) goto ${Lb}; \n`
                        cod += `stackConsulta[(int)${Tcont1}] = 1; \n`
                        cod += `${Tcont1} = ${Tcont1} + 1; \n`
                        cod += `${Tcont} = ${Tcont} - 1; \n`
                        cod += `goto ${La}; \n`
                        
                        cod += `${Lc}: \n`
                        cod += `if (${Tcont} <= 0) goto ${Lb}; \n`
                        cod += `stackConsulta[(int)${Tcont1}] = 0; \n`
                        cod += `${Tcont1} = ${Tcont1} + 1; \n`
                        cod += `${Tcont} = ${Tcont} - 1; \n`
                        cod += `goto ${Lc}; \n`            
                        
                        cod += `${Lb}: \n`  //terminamos de guardar los stackConsulta
                        cod += `stackConsulta[(int)${Tcont1}] = -2; \n`
                        cod += `spc = ${Treal}; \n`
                        
                        TCretorno = Tinicio
                    }
                    break;
            }
        }
        
        if(retIzq.tipo == Tipo.NODO || retIzq.tipo == Tipo.ATRIB || retDer.tipo == Tipo.NODO || retDer.tipo == Tipo.ATRIB )
        {
            cod += `spc = ${TC0};\n`
        }
        return {cod:cod,tipo:Tipo.BOOLEAN,valor:TCretorno}   
    }
}

function comparison(izq, op, der) {
    if(!Colision[izq.tipo][der.tipo])
    {
        ErroresGlobal.push({Error:`No se pudieron operar los tipos ${getTipoById(izq.tipo)} - ${getTipoById(der.tipo)}`,tipo:"Semantico",Linea:0,columna:0})
        return false
    }
    switch(op)
    {
        case "=":
            return izq.valor == der.valor
        case "!=":
            return izq.valor != der.valor
        case "<":
            return izq.valor <= der.valor
        case "<=":
            return izq.valor <= der.valor
        case ">":
            return izq.valor > der.valor
        case ">=":
            return izq.valor >= der.valor
    }
    return false
}

/*
    /biblioteca/libro[titulo > 5]
    /biblioteca[libro/titulo > 5]
*/