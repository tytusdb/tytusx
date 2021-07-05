import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { TipoOperacion } from "../Expresiones/Operacion";
import { Consulta } from "../XPath/Consulta";
import { Nodo, TipoNodo } from "../XPath/Nodo";
import { Predicate } from "../XPath/Predicate";


export class TranslateXPath{
    contSP: number;
    contHP: number;
    xPathHeap: Array<number>;
    xPathStack: Array<number>;
    strTraduccion: string;    
    xmlHeap: Array<number>;
    xmlStack: Array<number>;
    funcionesUtilizadas: Array<NativaXPath>;
    listaConsultas: Array<Consulta>;
    tabla: Entorno;
    contT: number;
    constructor(listaConsultas: Array<Consulta>, tabla: Entorno, xmlHeap: Array<number>, xmlStack: Array<number>){
        this.contHP = 0;
        this.contSP = 0;
        this.contT = 0;
        this.xPathHeap = [];
        this.xPathStack = [];
        this.funcionesUtilizadas = [];
        this.tabla = tabla;
        this.listaConsultas = listaConsultas;
        this.xmlHeap = xmlHeap;
        this.xmlStack = xmlStack;
        this.strTraduccion = "";
    }
    
    public getFuncionesUtilizadas(): string{
        let funciones = "";
        this.funcionesUtilizadas = this.funcionesUtilizadas.reverse();
        this.funcionesUtilizadas.forEach((func: any) =>{
            switch(func){
                case NativaXPath.TRASLADARSIMBOLO:
                    funciones += this.getTrasladarSimbolo();
                    break;
                case NativaXPath.IMPRIMIRATRIBUTO:
                    funciones += this.getImprimirAtributo();
                    break;
                case NativaXPath.IMPRIMIRCONSULTA:
                    funciones += this.getImprimirConsulta();
                    break;
                case NativaXPath.IMPRIMIRETIQUETA:
                    funciones += this.getImprimirEtiqueta();
                    break;
                case NativaXPath.IMPRIMIRTEXTO:
                    funciones += this.getImprimirTexto();
                    break;
                case NativaXPath.BUSCARTEXTO:
                    funciones += this.getBuscarTexto();
                    break;
                default:
                break;
            }
        });
        return funciones;
    }
    public getDeclaraTempsXPATH(): string{
        //Ver cuantos temporales fueron utlizados.
        let temps = "";
        if(this.contT > 0){
            let i = 0;
            temps = "double tx"+i;
            i++;
            while(i < this.contT){
                temps += ", tx"+i;
                i++;
            }
            temps += ";\n"
        }
        return temps;
    }
    public traducirXPath(): string{
        //console.log('/* Inicio Traduccion XPATH */');
        let resultadoTraduccion = this.traducir();
        //console.log('/* Fin Traduccion  XPATH*/');        
        return resultadoTraduccion;
    }

    private traducir(): string{
        for(let x = 0; x < this.listaConsultas.length; x++){
            let listaNodos = this.listaConsultas[x].listaNodos;
            this.strTraduccion += this.traduccionMain(this.tabla, listaNodos, 0);
        }
        return this.strTraduccion;
    }

    private traduccionMain(entActual: Entorno, listaNodos: Array<Nodo>, pos: number): string{
        let trad = "";
        //Recorrer la lista de nodos ej: bookstore/book/title
            for(let i = pos; i < listaNodos.length; i++){
                let nodo = listaNodos[i];
                /* Para cada nodo se requiere:  */
                /*  1. Buscar el nombre de este nodo en la lista de simbolos */
                if(!nodo.isFromRoot()){
                    let tmpC = new Consulta(listaNodos, -1, -1);
                    let [resp, _] = tmpC.obtenerSalida(i, entActual, null, false);
                    let xd: Array<Simbolo> = [];
                    xd = xd.concat(resp);
                    for(let k = i; k < listaNodos.length; k++){
                        let auxN = listaNodos[k]
                        trad += this.traducirNodo(auxN);
                        let listaSimbs = this.buscarSimbolos(nodo, entActual);
                        listaSimbs.forEach((elem: any) => {
                            trad += this.traducirSimb(elem);
                        })                        

                    }
                    trad += this.prueba(xd, nodo, listaNodos, listaNodos.length-1, false, false);                    
                }
                switch(nodo.getTipo()){
                    case TipoNodo.IDENTIFIER:
                        
                        let predicado: Predicate | undefined = nodo.getPredicado();
                        if(predicado != undefined){
                            for(let i = 0; i < entActual.tsimbolos.length; i++) {
                                let elem = entActual.tsimbolos[i].valor;
                                if(elem.getNombre() === nodo.getNombre()){
                                    trad += this.traducirPredicado(predicado, elem.valor);
                                    let consultaTemp = new Consulta(listaNodos, -1, -1);
                                    let [respx, _, aux] = consultaTemp.obtenerConsultaPredicado(predicado, i, entActual, entActual, false, nodo.getValor(), false);
                                    let xd: Array<Simbolo> = [];
                                    if(typeof(respx[0]) === "string"){
                                        xd = xd.concat(aux)
                                    }else{
                                        xd = xd.concat(respx);
                                    }
                                    trad += this.prueba(xd, nodo, listaNodos, listaNodos.length-1, false, false);
                                    break;
                                }
                            }
                            break;
                        }else{                        
                            let listaSimbs = this.buscarSimbolos(nodo, entActual);
                            //Para cada entorno obtener posicion del stack y traducir desde ahi.
                            trad += this.prueba(listaSimbs, nodo, listaNodos, i, false, false);
                        }
                        return trad;
                    case TipoNodo.ASTERISCO:
                        //Obtener todo lo de este entorno.
                        trad += this.traducirNodo(nodo);
                        let listaS = this.obtenerAsterisco(entActual);
                        //console.log("listaS: ", listaS);
                        listaS.forEach((s: any) => {
                            let elem = s.valor
                            if(i + 1 == listaNodos.length){
                                //Imprimir
                                if(elem.getTipo() != Tipo.ETIQUETA_UNIQUE){
                                    trad += this.traducirSimb(elem.posicion);
                                    //Llamar a la funcion de impresion
                                    trad += "\n\t/* IMPRIMIR ESTE NODO :2 */\n";
                                    trad += "\ttx"+this.contT+" = XPStack[(int)SP];\n"
                                    trad += "\tHP = tx"+this.contT+";\n";
                                    this.contT = this.contT + 1;
                                    trad += '\tSP = SP + 1;\n'
                                    trad += "\t imprimirConsulta();\n"
                                    //Pushear las funciones utlizadas para imprimir.
                                    if(this.funcionesUtilizadas.indexOf(NativaXPath.IMPRIMIRCONSULTA) == -1){
                                        this.funcionesUtilizadas.push(NativaXPath.IMPRIMIRCONSULTA);
                                    }
                                    if(this.funcionesUtilizadas.indexOf(NativaXPath.IMPRIMIRETIQUETA) == -1){
                                        this.funcionesUtilizadas.push(NativaXPath.IMPRIMIRETIQUETA);
                                    }
                                    if(this.funcionesUtilizadas.indexOf(NativaXPath.IMPRIMIRATRIBUTO) == -1){
                                        this.funcionesUtilizadas.push(NativaXPath.IMPRIMIRATRIBUTO);
                                    }
                                    if(this.funcionesUtilizadas.indexOf(NativaXPath.IMPRIMIRTEXTO) == -1){
                                        this.funcionesUtilizadas.push(NativaXPath.IMPRIMIRTEXTO);
                                    }                                                                    
                                }                              
                            }else{
                                if(elem.getTipo() !=  Tipo.ETIQUETA_UNIQUE){
                                    trad += this.traducirSimb(elem.posicion);
                                    trad += this.traduccionMain(elem.valor, listaNodos, i+1);
                                }
                            }
                        })
                        return trad;
                    case TipoNodo.ATRIBUTO:
                        trad += this.prueba(this.obtenerAtributos(entActual, nodo.getNombre(), nodo.isFromRoot()), nodo, listaNodos, i , false, true);
                        return trad;
                    case TipoNodo.DOT:
                        //Quedarse en el entorno actual. - No sirve :c
                        //trad += this.test(entActual.tsimbolos, nodo, listaNodos, i, true, false);
                        let tempsi = new Consulta(listaNodos, -1, -1);
                        let [respsi, __] = tempsi.obtenerSalida(i, entActual, null, false);
                        let xdsi: Array<Simbolo> = [];
                        xdsi = xdsi.concat(respsi);
                        trad += this.prueba(xdsi, nodo, listaNodos, listaNodos.length - 1, false, false);
                        return trad;
                    case TipoNodo.DOTDOT:
                        //No sirve
                        // trad += this.test(entActual.padre.tsimbolos, nodo, listaNodos, i, true, false);                         
                        let tempsidot = new Consulta(listaNodos, -1, -1);
                        let [respsidot, ___] = tempsidot.obtenerSalida(i, entActual, null, false);
                        let xdsidot: Array<Simbolo> = [];
                        xdsidot = xdsidot.concat(respsidot);
                        trad += this.prueba(xdsidot, nodo, listaNodos, listaNodos.length - 1, false, false);
                        return trad;                        
                        
                    case TipoNodo.FUNCION:
                        if(i + 1 == listaNodos.length){
                            let nombre = nodo.getValor().toLowerCase();
                            if(nombre === "text()"){
                                    //Llamar a la funcion de busqueda de TEXTO
                                    trad += "\n\t/* BUSCAR EL TEXTO DE ESTE NODO E IMPRIMIRLO. */\n";
                                    trad += "\ttx"+this.contT+" = XPStack[(int)SP];\n"
                                    trad += "\tHP = tx"+this.contT+";\n";
                                    this.contT = this.contT + 1;
                                    trad += '\tSP = SP + 1;\n'
                                    trad += "\t buscarTexto();\n"
                                    //Pushear las funciones utlizadas para imprimir.
                                    if(this.funcionesUtilizadas.indexOf(NativaXPath.BUSCARTEXTO) == -1){
                                        this.funcionesUtilizadas.push(NativaXPath.BUSCARTEXTO);
                                    }
                                    if(this.funcionesUtilizadas.indexOf(NativaXPath.IMPRIMIRCONSULTA) == -1){
                                        this.funcionesUtilizadas.push(NativaXPath.IMPRIMIRCONSULTA);
                                    }
                                    if(this.funcionesUtilizadas.indexOf(NativaXPath.IMPRIMIRETIQUETA) == -1){
                                        this.funcionesUtilizadas.push(NativaXPath.IMPRIMIRETIQUETA);
                                    }
                                    if(this.funcionesUtilizadas.indexOf(NativaXPath.IMPRIMIRATRIBUTO) == -1){
                                        this.funcionesUtilizadas.push(NativaXPath.IMPRIMIRATRIBUTO);
                                    }
                                    if(this.funcionesUtilizadas.indexOf(NativaXPath.IMPRIMIRTEXTO) == -1){
                                        this.funcionesUtilizadas.push(NativaXPath.IMPRIMIRTEXTO);
                                    }                                  
                            }
                        }
                        return trad;
                    case TipoNodo.AXIS:
                        let consultaTemp = new Consulta(listaNodos, -1, -1);
                        let [resp, _] = consultaTemp.obtenerSalida(i, entActual, null, false);
                        let xd: Array<Simbolo> = [];
                        xd = xd.concat(resp);
                        trad += this.prueba(xd, nodo, listaNodos, listaNodos.length - 1, false, false);
                        break;
                    case TipoNodo.NODOERROR:
                        return trad;
                }
            }
        
        return trad;
    }


    private obtenerAtributos(entActual: Entorno, nombre: string, fromRoot: boolean): Array<Simbolo>{
        let atributo: Array<Simbolo> = [];

        entActual.tsimbolos.forEach((s : any) => {
            let elem = s.valor;
            if(elem.getTipo() === Tipo.ATRIBUTO && (nombre === "*" || elem.getNombre() === nombre)){
                atributo.push(elem);
            }
            if(!fromRoot && elem.getTipo() === Tipo.ETIQUETA){
                atributo = atributo.concat(this.obtenerAtributos(elem.valor, nombre, fromRoot));
            }
        })
        return atributo;
        
    }
    private prueba(listaS: Array<Simbolo>, nodo: Nodo, listaNodos: Array<Nodo>, i: number, flag: boolean, atr: boolean): string{
        let trad = "";
        for(let j= 0; j < listaS.length; j++){
            /* 0. Escribir el nodo en el stack del xpath */
            trad += this.traducirNodo(nodo);
            let enx;
            if(flag){
                enx = listaS[j].valor
            }else{
                enx = listaS[j]
            }
            if(enx.getTipo() == Tipo.ETIQUETA_UNIQUE){
                console.log("-- Unique --");
            }else{
                if(atr){
                    trad += this.traducirSimb(enx.posicion+1);
                }else{
                    trad += this.traducirSimb(enx.posicion);
                }
                if(i + 1 == listaNodos.length){
                    //Llamar a la funcion de impresion
                    trad += "\n\t/* IMPRIMIR ESTE NODO :) */\n";
                    trad += "\ttx"+this.contT+" = XPStack[(int)SP];\n"
                    trad += "\tHP = tx"+this.contT+";\n";
                    this.contT = this.contT + 1;
                    trad += '\tSP = SP + 1;\n'
                    trad += "\t imprimirConsulta();\n"
                    //Pushear las funciones utlizadas para imprimir.
                    if(this.funcionesUtilizadas.indexOf(NativaXPath.IMPRIMIRCONSULTA) == -1){
                        this.funcionesUtilizadas.push(NativaXPath.IMPRIMIRCONSULTA);
                    }
                    if(this.funcionesUtilizadas.indexOf(NativaXPath.IMPRIMIRETIQUETA) == -1){
                        this.funcionesUtilizadas.push(NativaXPath.IMPRIMIRETIQUETA);
                    }
                    if(this.funcionesUtilizadas.indexOf(NativaXPath.IMPRIMIRATRIBUTO) == -1){
                        this.funcionesUtilizadas.push(NativaXPath.IMPRIMIRATRIBUTO);
                    }
                    if(this.funcionesUtilizadas.indexOf(NativaXPath.IMPRIMIRTEXTO) == -1){
                        this.funcionesUtilizadas.push(NativaXPath.IMPRIMIRTEXTO);
                    }                                
                }else{
                    trad += this.traduccionMain(enx.valor, listaNodos, i+1);
                }
            }
        }
        return trad;
    }

    private obtenerAsterisco(entActual: Entorno): Array<Simbolo>{
        let listaS: Array<Simbolo> = []
        entActual.tsimbolos.forEach((e: Simbolo)=>{
            listaS.push(e);
        })
        return listaS;
    }

    private traducirNombre(nombre: string){
         //XPStack[(int)0] = 30
         let tradNodo:string = '\n\t /* NODO "'+nombre+'" EN STACK*/ \n';
         nombre.split('').forEach((element:any) => {
            tradNodo = tradNodo
            +'\tXPStack[(int)SP] = '+element.charCodeAt(0)+'; \n'
            +'\tSP = SP + 1; \n';
            this.xPathStack.push(element.charCodeAt(0));
            this.contSP++;
        });

        return tradNodo;
    }

    private traducirNodo(nodo: Nodo): string{
        let nombre = nodo.getNombre();
        let predicado: Predicate | undefined = nodo.getPredicado();
        let tradNodo:string = "";
        //XPStack[(int)0] = 30
       tradNodo += this.traducirNombre(nombre);
        if(predicado != undefined){
            //Escribir tambien el predicado
        }
        //Se coloca un -1 para indicar que ya se termino de escribir este nombre.
        tradNodo += '\t XPStack[(int)SP] = -1; \n';
        tradNodo += '\t SP = SP + 1; \n';
        this.xPathStack.push(-1);
        this.contSP++;
        return tradNodo;
    }

    private traducirSimb(stackPointer: number): string{
        //1. Crear Txn = stack[(int)stackpointer];
        let simb3dir = '\t H = stack[(int)'+stackPointer+']; \n';
        //H tiene la posicion del heap (xml) donde inicia el simbolo.
        //2. Llamar a funcion para que escribe el simbolo en el heap del xpath.
        simb3dir += '\t trasladarSimbolo();'
        if(this.funcionesUtilizadas.indexOf(NativaXPath.TRASLADARSIMBOLO) === -1){
            //Agregar a la lista de funciones que se utilizaran.
            this.funcionesUtilizadas.push(NativaXPath.TRASLADARSIMBOLO);
        }
        return simb3dir;
    }

    public getTrasladarSimbolo(){
        //Escribir nombre de la funcion
        let code = 'void trasladarSimbolo(){\n'
        //Guardar en un temporal el inicio del simbolo en el heap del XPATH 
        //0. tx0 = HP
        let primerTemp = 'tx'+this.contT;
        this.contT = this.contT + 1;
        code += '\t'+primerTemp+" = HP;\n";
        code += '\t/*--- TX'+this.contT+' TIENE EL VALOR CON EL QUE FINALIZA EL AMBITO --- */ \n';
        let segundoTemp = 'tx'+this.contT;
        this.contT = this.contT + 1;
        //Un segundo temporal para guardar el valor con el que se finaliza el ambito.
        //1. tx2 = heap[(int)H];
        code += "\t"+segundoTemp+" = heap[(int)H];\n";
        //2. Empezar a copiar lo que hay en el heap del xml hacia el heap del XPATH
        code += '\tXPHeap[(int)HP] = heap[(int)H];\n';
        //3. Sumar los contadores del heap del xml y el heap de XPATH
        code += '\t HP = HP + 1;\n\t H = H+1;\n';
        //Tercer temporal para ir copiando del heap xml hacia el heap del xpath
        let tercerTemp = 'tx'+this.contT;
        this.contT = this.contT + 1;
        //Empezar con la primera etiqueta
        code += '\tL1:\n'
            + '\t\t'+tercerTemp+' = heap[(int)H];\n'
            + '\t\tif('+tercerTemp+' == '+segundoTemp+') goto L2;\n'
            + '\t\tXPHeap[(int)HP] = '+tercerTemp+';\n'
        //4. Sumar los contadores del heap del xml y el heap de XPATH
        code += '\t\t HP = HP + 1;\n\t\t H = H+1;\n';
        //5. Regresar a primer etiqueta para seguir copiando.
        code += '\t\tgoto L1;\n'
        //6. Escribir el contenido de la etiqueta 2.
        code += '\tL2: \n'
            + '\t\t/*--- Ya se completo el ambito en el heap del xpath ---*/\n'
            + '\t\tXPHeap[(int)HP] = heap[(int)H];\n'
            + '\t\t H = H + 1;\n \t\tHP = HP + 1;\n'
            + '\t\tXPStack[(int)SP] = '+primerTemp+';\n';
        
        //7. Return.
        code += '\treturn;\n'
        code += '}\n';
        return code;
    }

 
    private buscarSimbolos(nodo: Nodo, entActual: Entorno): Array<Simbolo>{
        let entSimbolo: Array<Simbolo> = [];
        for(let i = 0; i < entActual.tsimbolos.length; i++) {
            let el = entActual.tsimbolos[i].valor;

            if(el.getNombre() === nodo.getNombre()){
                entSimbolo.push(el);
            }
            if(!nodo.isFromRoot()){
                //Si es // entrar a buscar a cada entorno.
                if(el.getTipo() === Tipo.ETIQUETA){
                    entSimbolo.concat(this.buscarSimbolos(nodo, el.valor));
                }
            }
        }
        return entSimbolo;
    }


    private getBuscarTexto(): string{
        let code = "void buscarTexto(){\n";
        let primerTemp = "tx"+this.contT; //tx34
        this.contT = this.contT + 1;
        let tercerTemp = "tx"+this.contT; //tx36
        code += '\t\t'+tercerTemp+' = 0;\n'
        this.contT = this.contT + 1;
        code += "\t"+primerTemp+' = XPHeap[(int)HP];\n';
        code +=  '\tHP = HP + 1;\n'
                + '\t//Buscar en este nodo, donde hay texto.\n';
        
        let segundoTemp = "tx"+this.contT; //tx35
        this.contT = this.contT + 1;
        //Primer etiqueta, Valida si se encontro texto (-3)
        code += '\tL1:\n'
            + '\t\t'+segundoTemp+' = XPHeap[(int)HP];\n'
            + '\t\tif('+segundoTemp+' == -3) goto L7;\n'
            + '\t\tHP = HP + 1;\n'
            + '\t\tgoto L2;\n';

        //Segunda etiqueta, verifica si es atributo
        code += '\tL2:\n'
            + '\t\t//ver si es atributo\n'
            + '\t\tif('+segundoTemp+' != -2) goto L6;\n'
            + '\t\t//Es atributo, ignorar su cadena (-3) y luego continuar\n'
            + '\t\tHP = HP + 1;\n'
            + '\t\t'+segundoTemp+' = XPHeap[(int)HP];\n'
            + '\t\tgoto L3;\n';
        //Tercera etiqueta, ignora -3 dos veces
        code += '\tL3:\n'
            + '\t\t//Ignorar dos veces -3 (texto inicio-final)\n'
            + '\t\tif('+segundoTemp+' == -3) goto L4;\n'
            + '\t\tHP = HP + 1;\n'
            + '\t\t'+segundoTemp+' = XPHeap[(int)HP];\n'
            + '\t\tgoto L3;\n';

        code += '\tL4:\n'
            + '\t\tif('+tercerTemp+' == 1) goto L5;\n'
            + '\t\t'+tercerTemp+' = 1;\n'
            + '\t\tHP = HP + 1;\n'
            + '\t\t'+segundoTemp+' = XPHeap[(int)HP];\n'
            + '\t\tgoto L3;\n';
        
        //Cuarta etiqueta, Regresa a buscar texto normal.
        code += '\tL5:\n'
            + '\t\tHP = HP + 1;\n'
            + '\t\t'+tercerTemp+' = 0;\n'
            + '\t\tgoto L1;\n';

        //Quinta etiqueta, Revisa si este no es finalizacion de entorno.
        code += '\tL6:\n'
            + '\t\t//Ver si no es finalizacion de entorno\n'
            + '\t\tif('+segundoTemp+' <= '+primerTemp+') goto L8;\n'
            + '\t\tgoto L1;\n';
        //Sexta etiqueta, imprime la consulta.
        code += '\tL7:\n'
            + '\t\t//Se encontro donde inicia el texto, imprimirlo.\n'
            + '\t\timprimirConsulta();\n';
        //Septima etiqueta, solo retorna.
        code += '\tL8:\n'
            + '\treturn;\n'
        code += "}\n"
        return code;
    }

    private getImprimirConsulta(): string{
        let code = "void imprimirConsulta(){\n";
        code += "\t/* --- tx"+this.contT+" TIENE EL VALOR CON EL QUE FINALIZA LA CONSULTA -- */\n";
        let primerTemp = 'tx'+this.contT;
        this.contT = this.contT + 1;
        //Guardar el valor con el que termina la consulta.
        code += '\t'+primerTemp+' = XPHeap[(int)HP];\n'
        //Empezar con la primera et para verificar que tipo de consulta es
        code += '\tL1:\n'; //Este verifica si es etiqueta <
        code += '\t\t /* -- Ver si es etiqueta -- */\n';
        code += '\t\t if('+primerTemp+' > -5) goto L2;\n';
        code += '\t\timprimirEtiqueta();\n';
        //La segunda etiqueta verifica si es atributo o texto.
        code += '\tL2:\n'
        code += '\t\t /* -- Ver si es atributo(-2) o texto(-3) -- */\n';
        code += '\t\tif('+primerTemp+' == -2) goto L3;\n';
        code += '\t\tif('+primerTemp+' == -3) goto L4;\n';        
        code += '\t\tgoto L5;\n';
        //La tercera etiqueta llama al metodo para imprimir atributo.
        code += '\tL3: \n'
            + '\t\tHP = HP + 2;\n'
            + '\t\timprimirAtributo();\n'
            + '\t\tgoto L5;\n'
        //La cuarta etiqueta llama al metodo para imprimir texto
        code += '\tL4: \n'
            + '\t\tHP = HP + 1;\n'
            + '\t\timprimirTexto();\n'
            + '\t\tgoto L5;\n'
        //La quinta etiqueta es el fin del metodo.
        code += '\tL5: \n'
            + '\tprintf("%c", (char) 10);\n'
            + '\treturn;\n'
            + '}\n';
        
    
        return code;
    }


    private getImprimirEtiqueta(): string {
        let code = "void imprimirEtiqueta() {\n";
        let primerTemp  = "tx"+this.contT; //tx5
        this.contT = this.contT + 1;
        code += "\t"+primerTemp+' = XPHeap[(int)HP];\n';
        code += '\tHP = HP + 1;\n';
        let segundoTemp = "tx"+this.contT;
        this.contT = this.contT + 1;
        code += '\t'+segundoTemp+' = 0;\n'; //tx11
        let tercerTemp = "tx"+this.contT;
        this.contT = this.contT + 1;
        code += '\t'+tercerTemp+' = HP;\n'    //tx10
        //Empezar a imprimir la etiqueta.
        code += '\tprintf("%c", (int) 60); //Ascii <\n';
        let cuartoTemp = "tx"+this.contT; // tx6
        this.contT = this.contT + 1;        
        //Primer etiqueta, verifica si ya se acabo el ambito.
        code += '\tL1:\n'
            + '\t\t'+cuartoTemp+' = XPHeap[(int)HP];\n'
            + '\t\tif('+cuartoTemp+' == '+primerTemp+') goto L2;\n'
            + '\t\tgoto L3;\n';
        //Etiqueta L3, verifica si es atributo (-2)
        code += '\tL3:\n'
            + '\t\tif('+cuartoTemp+' != -2) goto L4;\n'
            + '\t\tHP = HP + 1;\n'
            + '\t\tprintf("%c", (char) 32); // Espacio\n'
            + '\t\timprimirAtributo();\n'
            + '\t\tHP = HP + 1;\n'
            + '\t\tgoto L1;\n';
        //Etiqueta L4, verifica si es texto (-3)
        code += '\tL4:\n'
            + '\t\t//Ver si es texto\n'
            + '\t\tif('+cuartoTemp+' != -3) goto L5;\n'
            + '\t\tprintf("%c", (char) 62); //Ascii >\n'
            + '\t\tHP = HP + 1;\n'
            + '\t\t'+segundoTemp+' = 1;\n'
            + '\t\timprimirTexto();\n'
            + '\t\tgoto L1;\n';
        //Etiqueta L5, verifica si es -1 (ya termino el id de la etiqueta)
        code += '\tL5:\n'
            + '\t\tif('+cuartoTemp+' != -1) goto L6;\n'
            + '\t\tHP = HP + 1;\n'
            + '\t\tgoto L1;\n';
        //Etiqueta L6
        code += '\tL6:\n'
            + '\t\t//Revisar si hay otra etiqueta\n'
            + '\t\tif('+cuartoTemp+' < '+primerTemp+') goto L7;\n'
            + '\t\t//Aun no, solo imprimir caracter.\n'
            + '\t\tprintf("%c", (char) '+cuartoTemp+');\n'
            + '\t\tHP = HP + 1;\n'
            + '\t\tgoto L1;\n';
        //Etiqueta L7, imprimir el entorno de la etiqueta interior.
        let quintoTemp = "tx"+this.contT; // tx13
        this.contT = this.contT + 1;        
        code += '\tL7:\n'
            + '\t\tif('+segundoTemp+' == 0) goto L10;\n'
            + '\t\tXPStack[(int)SP] = '+primerTemp+';\n'
            + '\t\tSP = SP + 1;\n'
            + '\t\tXPStack[(int)SP] = '+tercerTemp+';\n'
            + '\t\tSP = SP + 1;\n'
            + '\t\timprimirEtiqueta();\n'
            + '\t\t'+primerTemp+' = XPStack[(int)SP];\n'
            + '\t\t'+quintoTemp+' = SP + 1;\n'
            + '\t\t'+segundoTemp+' = 1;\n'
            + '\t\t'+tercerTemp+' = XPStack[(int)'+quintoTemp+'];\n'
            + '\t\tHP = HP + 1;\n'
            + '\t\tgoto L1;\n';
        //Etiqueta L10, imprime caracter de cierre. >
        code += '\tL10:\n'
            + '\t\tprintf("%c", (char) 62); //Ascii >\n'
            + '\t\t'+segundoTemp+' = 1;\n'
            + '\t\tgoto L7;\n';
        //Etiqueta L2: Escribe una etiqueta de cierra </cierre>
        code += '\tL2:\n'
            + '\t\t//EScribir etiqueta de cierre.\n'
            + '\t\tif('+segundoTemp+'== 0) goto L11;\n'
            + '\t\tprintf("%c", (char) 60); //Ascii <\n'
            + '\t\tprintf("%c", (char) 47); //Ascii /\n'
            + '\t\tgoto L8;\n';
        //Etiqueta L11: Imprime caracter de cierre. >
        code += '\tL11:\n'
        + '\t\tprintf("%c", (char) 62); //Ascii >\n'
        + '\t\t'+segundoTemp+' = 1;\n'
        + '\t\tgoto L2;\n';
        //Etiqueta L8: Escribe id de cierre </ cierre >
        code += '\tL8:\n'
            + '\t\t'+cuartoTemp+' = XPHeap[(int)'+tercerTemp+'];\n'
            + '\t\tif('+cuartoTemp+' == -1) goto L9;\n'
            + '\t\tprintf("%c", (char) '+cuartoTemp+');\n'
            + '\t\t'+tercerTemp+' = '+tercerTemp+' + 1;\n'
            + '\t\tgoto L8;\n';
        
        //Etiqueta L9: imprimire caracter de cierre > y termina el metodo :D
        code += '\tL9:\n'
            + '\t\tprintf("%c", (char) 62); //Ascii >\n'
            + '\tSP = SP - 2;\n'
            + '\treturn;\n'

        code += "}\n"

        return code;
    }

    private getImprimirAtributo(): string {
        let code = "void imprimirAtributo(){\n";
        let primerTemp = 'tx'+this.contT;
        this.contT = this.contT + 1;
        code += '\tL1:\n'
            + '\t\t'+primerTemp+' = XPHeap[(int)HP];\n'
            + '\t\tif('+primerTemp+' == -2) goto L2;\n'
            + '\t\tprintf("%c", (char)'+primerTemp+');\n'
            + '\t\tHP = HP + 1;\n'
            + '\t\tgoto L1;\n';
        //Etiqueta L2, imprimir espacio = y el valor del atributo
        code += '\tL2:\n'
            + '\t\tprintf("%c", (char) 32); // Espacio\n'
            + '\t\tprintf("%c", (char)61); // = \n'
            + '\t\tprintf("%c", (char) 32); // Espacio\n'
            + '\t\tHP = HP + 2;\n';
        //Etiqueta L3, imprime el valor del atributo.
        code += '\tL3:\n'
        code += '\t\t'+primerTemp+' = XPHeap[(int)HP];\n'
        code += '\t\tif('+primerTemp+' == -3) goto L4;\n'
        code += '\t\tprintf("%c", (char)'+primerTemp+');\n'
        code += '\t\tHP = HP + 1;\n'
        code += '\t\tgoto L3;\n';
        //Etiqueta L4; Imprime espacio y termina el metodo.
        code += '\tL4:\n'
            + '\t\tprintf("%c", (char) 32);// Espacio\n'
            + '\treturn;\n';
        code += '}\n'
        return code;
    }

    private getImprimirTexto(): string{
        let code = "void imprimirTexto(){\n";
        code += "\t//Texto termina con -3\n";
        let primerTemp = 'tx'+this.contT;
        this.contT = this.contT + 1;        
        code += '\tL1:\n'
            + '\t\t'+primerTemp+' = XPHeap[(int)HP];\n'
            + '\t\tif('+primerTemp+' == -3) goto L2;\n'
            + '\t\tprintf("%c", (char)'+primerTemp+');\n'
            + '\t\tHP = HP + 1;\n'
            + '\t\tgoto L1;\n'
            + '\tL2:\n'
            + '\t\tHP = HP + 1;\n'
            + '\treturn;\n';
        code += "}\n"
        return code;
    }

    private traducirPredicado(predicado: Predicate, entorno: Entorno): string{
        let operaciones = predicado.get3Dir(entorno);
        let trad = "\n\t/*-- TRADUCIENDO PREDICADO -- */\n";
        if(operaciones instanceof Array){
            if(this.obtenerSigno(operaciones[1]) === "idk"){
                return "";
            }
            let [aux, _] = this.continuarTrad(operaciones);
            trad += aux;
            
        }else{
            if(isNaN(operaciones)){
                return "";
            }
            let varTemporal = "tx"+this.contT;
            this.contT++;                  
            trad += "\t"+varTemporal+" = "+operaciones+";\n";
        }
        //Obtener resultado
        return trad;
    }

    private continuarTrad(ops: Array<any>): [string, string]{
        let trad = "";
        let izq = ops[0];
        let signo = ops[1];
        let der = ops[2];

        let numIzq, numDer = null;

        if(izq instanceof Array){
            let aux = "";
            
            [aux, numIzq] = this.continuarTrad(izq);
            trad += aux;
        }else{
            numIzq = izq;
        }

        if(der instanceof Array){
            let aux = "";
            [aux, numDer] = this.continuarTrad(der);
            trad += aux;
        }else{
            numDer = der;
        }

        let varTemporal = "tx"+this.contT;
        this.contT++;      

        trad += "\t"+varTemporal+" = "+numIzq;
        //Concatenar signo.
        trad += this.obtenerSigno(signo);
        trad += numDer+";\n"
        return [trad, varTemporal];
    }

    private obtenerSigno(operacion: TipoOperacion): string{
        switch(operacion){
            case TipoOperacion.SUMA:
                return "+";
            case TipoOperacion.RESTA:
                return "-";
            case TipoOperacion.DIVISION:
                return "/";
            case TipoOperacion.MOD:
                return "%";
            case TipoOperacion.MULTIPLICACION:
                return "*";
            default:
                return "idk";
        }
    }
}


export enum NativaXPath{
    PRINTSTRING,
    COMPARESTRINGS,
    TRASLADARSIMBOLO,
    IMPRIMIRCONSULTA,
    IMPRIMIRETIQUETA,
    IMPRIMIRTEXTO,
    IMPRIMIRATRIBUTO,
    BUSCARTEXTO,
}