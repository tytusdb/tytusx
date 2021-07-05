import { Tipo } from "./analizadorXPath/AST/Entorno";

// código tres direccciones xml
var contador = -1;  // contador de temporales
var contadorXML = -1;
var cntLbl = 0      // contador de labels
var cntLblXML = -1; 
var hp = 0;         // apuntador del heap
var hpXML = 0;
var sp = 0;         // apuntador base del stack pointer
var spXML = 0;
var c3d = '';       // contenido de código tres direcciones
var c3dXML = '';
var str3d = '';     //contenido de código tres direcciones XPath
var concatenado = ''

export const funcIndices = {
    "CAMINO"                : 0,
    "PARENT"                : 1,
    "ATRIBUTO"              : 2,
    "IMPRIMIRCONSULTA"      : 3,
    "IMPRIMIRATRIBUTO"      : 4,
    "STRING"                : 5,
    "DESCENDANTRECURSIVA"   : 6,
    "DESCENDANT"            : 7,
    "DESCENDANTSELF"        : 8,
    "FOLLOWINGSIBLING"      : 9,
    "PRECEDINGSIBLING"      : 10,
    "ANCESTORRECURSIVA"     : 11,
    "ANCESTOR"              : 12,     
    "ANCESTORSELF"          : 13,
    "SELF"                  : 14, 
    "CASTNUM"               : 15,
    "PREDICADODECIMAL"      : 16,
    "PREDICADONODO"         : 17,
    "RECURSIVAATRIBUTO"     : 18,
    "RRECURSIVAATROBUTO"    : 19,
    "TEXT"                  : 20,
    "LAST"                  : 21,
    "UPPERCASE"             : 22,
    "LOWERCASE"             : 23,
    "TOSTRING"              : 24,
    "SUBSTR1"               : 25,
    "SUBSTR2"               : 26,
}

export function SetearXML()
{
    contadorXML = contador;
    cntLblXML = cntLbl;
    c3dXML = c3d;
    hpXML = hp;
    spXML = sp;
}

export function castNum(){
    var TC0 = newTemp(); var TC1 = newTemp(); var T0 = newTemp(); var T1 = newTemp(); var T2 = newTemp(); var T3 = newTemp();
    var La = newLbl(); var Lb = newLbl();
    
    var cod = ''
    var tab = '\t'

    cod += `void CastNum(){ \n`

    //recibimos los parametros del stack
    cod += tab + `${TC0} = sp + 1; \n`
    cod += tab + `${TC1} = stack[(int)${TC0}]; \n`

    cod += tab + `${T0} = 0; \n`    //el temporal maestro xD
    cod += tab + `${T1} = ${TC1}; \n`
    cod += tab + `${La}: \n`
    cod += tab + `${T2} = heap[(int)${T1}]; \n`
    cod += tab + `if (${T2} == -1) goto ${Lb};\n`
    cod += tab + `${T3} = ${T2} - 48; \n`
    cod += tab + `${T0} = ${T0} * 10; \n`
    cod += tab + `${T0} = ${T0} + ${T3}; \n`
    cod += tab + `${T1} = ${T1} + 1; \n`
    cod += tab + `goto ${La}; \n`

    cod += tab + `${Lb}: \n`
    cod += tab + `stack[(int)sp] = ${T0}; \n` //T0 (?)

    cod += `\n}\n`
    return cod
}
export var funcBoleanas = []   //almacena funciones
export function clearConcatenado(){
    concatenado = ''
}
export function getCima(){
    return sp
}
export function getNextSP(){
    return sp ++
}
export function newTemp(){
    contador++
    return 'T'+contador    
}
export function newLbl(){
    cntLbl ++
    return 'L'+cntLbl
    
}
export function addCodigo3D(str){
    c3d += str;           
}
export function clearC3D(){
    cntLbl = 0;
    cntLblXML = 0;
    contador = 0;
    contadorXML = 0;
    c3d = '';
    c3dXML = '';
    str3d = '';
    hp = 0;
    hpXML = 0;
    sp = 0;
    spXML = 0;
}

export function returnXMLC3D()
{
    cntLbl = cntLblXML;
    contador = contadorXML;
    c3d = c3dXML;
    hp = hpXML;
    sp = spXML;
    str3d = '';
}

function agregarEncabezado(){
    let encab = 
    `#include <stdio.h>
#include <math.h>
double heap[30101999];
double stack[30101999];
double stackHijos[524000];
double stackAtributos[524000];
double Indexes[524000];
double heapConsulta[524000];
double stackConsulta[524000];
double stacX[524000];
double heapConsultaAtributo[50];
double hca;
double sx;
double hp;
double sp;
double sa;
double sh;
double si;
double hpc;
double spc;
double T0`
    //Lista de temporales
    for (let index = 1; index <= contador; index++) {
        encab += `, T${index}`        
    }
    encab += `;\n\n`
    return encab;
}

export function guardarString(posicion, texto){
    
    let nombre = texto
    let Tinicio = newTemp();
    c3d += `${Tinicio} = hp; \n`
    //para cada letra/caracter un espacio en el heap
    for (const letra of nombre) {

        var ascci = letra.charCodeAt(0);
        c3d += `heap[(int)hp] = ${ascci}; \n`
        c3d += `hp = hp + 1; \n`
    }
    //cuando termine el nombre agregamos el -1
    c3d += `heap[(int)hp] = -1; \n`
    c3d += `hp = hp + 1; \n`

    // al finalizar hacer referencia al stack
    // let Tref =  newTemp();
    // c3d += `${Tref} = sp + ${posicion}; \n`
    // c3d += `stack[(int)${Tref}] = ${Tinicio}; \n` // posición en stack donde empieza strig en heap
    // c3d += `\n`

    return Tinicio
}

export function guardarIndexes(refNombre, refAtri, refHijo, refValor){
    var tempPadre = newTemp();
    c3d += `Indexes[(int)si] = ${refNombre}; \n`
    c3d += `si = si + 1; \n`
    c3d += `Indexes[(int)si] = ${refAtri}; \n`
    c3d += `si = si + 1; \n`
    c3d += `Indexes[(int)si] = ${refHijo}; \n`
    c3d += `si = si + 1; \n`
    c3d += `Indexes[(int)si] = ${refValor}; \n`
    c3d += `si = si + 1; \n`
    c3d += `${tempPadre} = si; \n`
    c3d += `Indexes[(int)si] = -2; \n`
    c3d += `si = si + 1; \n`
    return tempPadre
}

export function guardarIndexRaiz(refNombre, refAtri, refHijo, refValor){
    c3d += `Indexes[(int)si] = ${refNombre}; \n`
    c3d += `si = si + 1; \n`
    c3d += `Indexes[(int)si] = ${refAtri}; \n`
    c3d += `si = si + 1; \n`
    c3d += `Indexes[(int)si] = ${refHijo}; \n`
    c3d += `si = si + 1; \n`
    c3d += `Indexes[(int)si] = ${refValor}; \n`
    c3d += `si = si + 1; \n`
    c3d += `Indexes[(int)si] = -2; \n`
    c3d += `si = si + 1; \n`
}

export function guardarStackAtri(Tinicio){
    c3d += `stackAtributos[(int)sa] = ${Tinicio}; \n`
    c3d += `sa = sa + 1; \n`
}

export function guardarStackHijos(Tinicio){
    c3d += `stackHijos[(int)sh] = ${Tinicio}; \n`
    c3d += `sh = sh + 1; \n`
}

export function getReferencia(indice){
    var Tref = newTemp();
    c3d += `${Tref} = ${indice}; \n`
    return Tref
}

export function agregarComentario(){
    c3d += `\n/*${arguments[0]}*/ \n`
}

export function getC3D(){
    return c3d
}

export function concat(str){
    concatenado += str
}

export function getFullC3D(){
    var retorno = ''
    var funciones = addfuncion3d()

    retorno += agregarEncabezado()

    retorno += '\n'+ funciones +'\n'

    retorno += '\n\nint main() {\n'

    retorno += c3d


    retorno += '\n\treturn 0;\n\n'
    retorno += '}'

    //clearC3D()
    return retorno
}

// código tres direcciones xpath
export function addC3D (str){
  str3d += str +'\n'
}

export function getstr3d(){
    var temp = str3d
    str3d = ''
    return temp
}

export function addfuncion3d(str){
    
    var funciones3d = '' //contenido de código tres direcciones para funciones generales
    funciones3d += funcComparar()+'\n'
    funciones3d += funcCompararAscii()+`\n`
    //funciones3d += leerStack()+'\n'
    if(funcBoleanas[funcIndices.IMPRIMIRATRIBUTO]){
        funciones3d += ImprimirAtributo()+'\n'
        funciones3d += ImprimirAtributoR()+'\n'
    }
    if(funcBoleanas[funcIndices.IMPRIMIRCONSULTA]){
        funciones3d += imprimirConsulta()+'\n'
        funciones3d += ImprimirConsultaR()+'\n'
    }
    //recorriendo el arreglo para crear funciones
    if(funcBoleanas[funcIndices.CASTNUM]) funciones3d += castNum() + '\n'
    if(funcBoleanas[funcIndices.TEXT]) funciones3d += funcText() + '\n'
    if(funcBoleanas[funcIndices.TOSTRING]) funciones3d += funcNumberToString() + '\n'
    if(funcBoleanas[funcIndices.LAST]) funciones3d += funcLast() + '\n'
    if(funcBoleanas[funcIndices.UPPERCASE]) funciones3d += funcUpperCase() + '\n'
    if(funcBoleanas[funcIndices.LOWERCASE]) funciones3d += funcLowerCase() + '\n'
    if(funcBoleanas[funcIndices.SUBSTR1]) funciones3d += funcSubStr_int() + `\n`
    if(funcBoleanas[funcIndices.SUBSTR2]) funciones3d += funcSubStr_int_int() + `\n`

    if(funcBoleanas[funcIndices.PREDICADODECIMAL]) funciones3d += predicadoDecimal() + '\n'
    if(funcBoleanas[funcIndices.PREDICADONODO]) funciones3d += predicadoNodo() + '\n'

    if(funcBoleanas[funcIndices.CAMINO]) funciones3d += funcCaminoABS()+'\n'
    if(funcBoleanas[funcIndices.PARENT]) funciones3d += funcParent()+'\n'
    if(funcBoleanas[funcIndices.ATRIBUTO]) funciones3d += funcAtributo()+'\n'
    if(funcBoleanas[funcIndices.RRECURSIVAATROBUTO]) funciones3d += funcAtributoDescendantRecursiva() + '\n'
    if(funcBoleanas[funcIndices.RECURSIVAATRIBUTO]) funciones3d += funcAtributoDescendant() + '\n'
    if(funcBoleanas[funcIndices.STRING]) funciones3d += funcImprimirString()+'\n'
    if(funcBoleanas[funcIndices.FOLLOWINGSIBLING]) funciones3d += funcFollowingSibling()+'\n'  
    if(funcBoleanas[funcIndices.PRECEDINGSIBLING]) funciones3d += funcPrecedingSibling() + '\n' 
    if(funcBoleanas[funcIndices.DESCENDANTRECURSIVA]) funciones3d += funcDescendantRecursiva() + '\n'
    if(funcBoleanas[funcIndices.DESCENDANT]) funciones3d += funcDescendant() + '\n'
    if(funcBoleanas[funcIndices.DESCENDANTSELF]) funciones3d += funcDescendantSelf() + '\n' 
    if(funcBoleanas[funcIndices.ANCESTORRECURSIVA]) funciones3d += funcAncestorRecursiva() + '\n'
    if(funcBoleanas[funcIndices.ANCESTOR]) funciones3d += funcAncestor() + '\n'
    if(funcBoleanas[funcIndices.ANCESTORSELF]) funciones3d += funcAncestorSelf() + '\n'
    if(funcBoleanas[funcIndices.SELF]) funciones3d += funcSelf() + '\n'
    return funciones3d
}

export class Retorno {
    valor = '';
    tipo = 0;
    trueLabel = '';
    falseLabel = '';
    objetos= []
    /* Por si viene una variable 
    Variable = '';*/

    constructor(valor, tipo){
        this.valor = valor;
        this.tipo = tipo;
        this.trueLabel = this.falseLabel = '';
    }

    setLabels(ltrue, lfalse){
        this.ltrue = ltrue
        this.lfalse = lfalse
    }

    getC3D(){
        return this.value;
    }
}

export function funcImprimirString(){
    var cod = ''
    var tab = '\t'

    var T0 = newTemp(); var T1 = newTemp();
    var La = newLbl(); var Lb = newLbl();

    cod += `void imprimirString(){ \n`
    cod += tab + `${T0} = stack[(int)sp]; \n`
    cod += tab + `${La}: \n`    
    cod += tab + `${T1} = heap[(int)${T0}]; \n`
    cod += tab + `if (${T1} == -1) goto ${Lb}; \n`
    cod += tab + `printf("%c", (int)${T1}); \n`
    cod += tab + `${T0} = ${T0} + 1; \n`
    cod += tab + `goto ${La}; \n`
    cod += tab + `${Lb}:;\n`

    //the end
    cod += `\n}\n`
    return cod 
}



/* Inicio de funciones Axes */



export function funcCaminoABS(){
    var cod = ''
    var tab = `\t`
    cod += `void Camino(){ \n\n`

    var TA = newTemp(); var TB = newTemp(); var TD = newTemp(); var TE = newTemp(); var TF = newTemp(); var TG = newTemp();
    var TH = newTemp(); var TI = newTemp(); var TJ = newTemp(); var TK = newTemp(); var TL = newTemp(); var TM = newTemp();
    var TN = newTemp(); var TO = newTemp(); var TP = newTemp(); var TQ = newTemp(); var TR = newTemp(); 
    
    var LA = newLbl(); var LB = newLbl(); var LC = newLbl(); var LD = newLbl(); var LW = newLbl(); var LX = newLbl();
    var LZ = newLbl(); var LAtri = newLbl();

    cod += tab + `${TA} = spc; \n`                            //iniciamos un contador general para lo que haya en la consulta
    cod += tab + `${TB} = stackConsulta[(int)${TA}]; \n`    //mandamos a traer el primer valor del stack consulta
    cod += tab + `${LZ}: //si llega al final del stackConsulta sale \n`
    cod += tab + `if (${TB} == -2) goto ${LA}; \n`

    cod += tab + `${TD} = ${TB} + 2; \n`                //buscamos el array de hijos del nodo en cuestion
    cod += tab + `${TE} = Indexes[(int)${TD}]; \n`      //la posicion del primer hijo
    cod += tab + `${TF} = ${TE} + 0; \n`                //inicializando contador para los hijos
    cod += tab + `${TG} = stackHijos[(int)${TF}]; \n`   //llamando al primer hijo, stackHijos en la pos TF
    cod += tab + `${LX}: //mientras tenga hijos != -2 \n`
    cod += tab + `if (${TG} == -2) goto ${LB}; \n`
                
    //ahora trabajamos con los objetos del hijo
    cod += tab + `${TH} = ${TG} + 0; \n`                //hacemos un contador para los elementos del hijo, primer elemento (nombre)
    cod += tab + `${TI} = Indexes[(int)${TH}]; \n\n`      //mandamos a traer el nombre del hijo
                
    //cambiamos de entorno
    cod += tab + `${TJ} = sp + 1; \n`                   //mandamos a traer el primer parametro de heap consulta
    cod += tab + `${TK} = stack[(int)${TJ}]; \n`
    cod += tab +`/* Cambiamos de entorno */ \n`
    cod += tab + `sp = sp + 3; \n`
    cod += tab + `${TL} = sp + 1;\n`                    //Entorno nuevo en la posicion 1 (Posicion del Heap)
    cod += tab + `stack[(int)${TL}] = ${TI};\n`         //Asignar al parametro 1 la posicion del heap a comparar
    cod += tab + `${TM} = sp + 2; \n`                   //Entorno nuevo en la posicion 2 (Posicion del heapConsulta)
    cod += tab + `stack[(int)${TM}] = ${TK}; \n`           //Asignar al parametro 2 la posicion del heap consulta a comparar
    cod += tab + `Comparar();\n`                        //llamar a la funcion comparar                 
    cod += tab + `${TN} = sp + 0; \n`                      //Posicion del retorno de comparar
    cod += tab + `${TO} = stack[(int)${TN}];\n\n`      //Guardamos lo que haya retornado comparar

    //regresamos del entorno
    cod += tab +`/* regresamos del entorno */ \n`
    cod += tab + `sp = sp - 3; \n`
    cod += tab + `if (${TO} == 0) goto ${LC}; \n`       //si no hubo retorno vamos a LC

    //si hubo hijo retornado (el retorno fue 1 -> true)
    cod += tab + `stacX[(int)sx] = ${TG}; \n`              //se coloca en el stackX la posicion del hijo en cuestion (?) funcionara recursivamente?
    cod += tab + `sx = sx + 1; \n`                         //Aumentamos el stackX
    cod += tab + `stacX[(int)sx] = -2; \n`

    //si ya termino de guardar al hijo o fue 0 el comparar (false) 
    cod += tab + `${LC}: \n`
    cod += tab + `${TF} = ${TF} + 1; \n`                //aumentamos el contador de hijos
    cod += tab + `${TG} = stackHijos[(int)${TF}]; \n`      //cambiamos de hijo
    cod += tab + `goto ${LX}; \n`//regresamos a la comparacion de nombres de hijos

    //si ya no tiene mas hijos el nodo
    cod += tab + `${LB}: \n`
    cod += tab + `${TA} = ${TA} + 1; \n`//aumentamos el contador inicial de nodos
    cod += tab + `${TB} = stackConsulta[(int)${TA}]; \n`     //nos movemos en el stack de consultas (solo tiene un valor por camino)
    cod += tab + `goto ${LZ}; \n\n`                     //regresamos al inicio de la busqueda para cada camino

    //si ya no tiene nada el stackConsulta
    cod += tab + `${LA}: \n`
    
    //Reemplazar el StackConsulta por el StackX
    cod += tab + `${TP} = 0; \n`                        //contador para el stackX y stackConsulta
    cod += tab + `${TQ} = stacX[(int)${TP}]; \n`
    cod += tab + `${LW}: \n`
    cod += tab + `if (${TQ} == -2) goto ${LD}; \n`      //si el stackX ya se termino vamos a LD
    cod += tab + `${TR} = spc + ${TP}; \n`              //posicion contador del stackConsulta
    cod += tab + `stackConsulta[(int)${TR}] = ${TQ};\n`   //ponemos en el stackConsulta lo que habia en TQ
    cod += tab + `${TP} = ${TP} + 1; \n`                //aumentamos el contador de stackX
    cod += tab + `${TQ} = stacX[(int)${TP}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
    cod += tab + `goto ${LW}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

    //se acabo el stackX, no hay mas para guardar
    cod += tab + `${LD}: \n`    
    cod += tab + `${TR} = spc + ${TP};\n`
    cod += tab + `stackConsulta[(int)${TR}] = -2;\n`
    cod += tab + `sx = 0; \n`
    cod += tab + `stacX[(int)sx] = -2; \n`

    //addCodigo3D(`ImprimirConsultas(); \n`);

    //the end
    cod += '\n} \n'
    return cod
}



export function funcSelf(){
    /* Se devuelve a el mismo */
    var TC1 = newTemp(); var TC0 = newTemp(); var T0 = newTemp(); var T1 = newTemp(); var TF1 = newTemp(); var T2 = newTemp();
    var T3 = newTemp(); var T4 = newTemp(); var T5 = newTemp(); var T6 = newTemp(); var T7 = newTemp(); var T8 = newTemp();
    var La = newLbl(); var Lb = newLbl(); var Lc = newLbl(); var Ld = newLbl(); var Le = newLbl();

    var cod = ''
    var tab = '\t'

    cod += `void Self(){ \n`

    //recibimos los parametros del stack
    cod += tab + `${TC1} = sp + 1; \n`
    cod += tab + `${TC0} = stack[(int)${TC1}]; \n`      //donde inicia el nombre del heap consulta

    //Aqui ya esta listo el stackConsultas que referencia a indexes
    cod += tab + `${T0} = 0; \n`
    cod += tab + `${La}: \n`
    cod += tab + `${T1} = stackConsulta[(int)${T0}]; \n`
    cod += tab + `${TF1} = Indexes[(int)${T1}]; \n`
    //ciclo general
    cod += tab + `if (${T1} == -2) goto ${Lb}; \n`

    //cambiamos de entorno
    cod += tab +`/* Cambiamos de entorno */ \n`
    cod += tab + `sp = sp + 2; \n`
    cod += tab + `${T2} = sp + 1;\n`                    //Entorno nuevo en la posicion 1 (Posicion del Heap)
    cod += tab + `stack[(int)${T2}] = ${TF1};\n`         //Asignar al parametro 1 la posicion del heap a comparar
    cod += tab + `${T3} = sp + 2; \n`                   //Entorno nuevo en la posicion 2 (Posicion del heapConsulta)
    cod += tab + `stack[(int)${T3}] = ${TC0}; \n`       //Asignar al parametro 2 la posicion del heap consulta a comparar
    cod += tab + `Comparar();\n`                        //llamar a la funcion comparar                 
    cod += tab + `${T4} = sp + 0; \n`                   //Posicion del retorno de comparar
    cod += tab + `${T5} = stack[(int)${T4}];\n\n`       //Guardamos lo que haya retornado comparar

    //regresamos del entorno
    cod += tab +`/* regresamos del entorno */ \n`
    cod += tab + `sp = sp - 2; \n`
    cod += tab + `if (${T5} == 0) goto ${Lc}; \n`       //si no hubo retorno vamos a Lc

    //si la comparacion es verdadera
    cod += tab + `stacX[(int)sx] = ${T1}; \n`
    cod += tab + `sx = sx + 1; \n`
    cod += tab + `stacX[(int)sx] = -2; \n` 

    cod += tab + `${Lc}: \n`
    //si no fue verdadero o si ya se guardo cambiamos al siguiente nodo del stackConsulta
    cod += tab + `${T0} = ${T0} + 1; \n`
    cod += tab + `goto ${La}; \n`

    //si ya se termino el stackConsulta
    cod += tab + `${Lb}: \n`
    //Reemplazar el StackX por el StackConsulta
    cod += tab + `${T6} = 0; \n`                        //contador para el stackX y stackConsulta
    cod += tab + `${T7} = stacX[(int)${T6}]; \n`
    cod += tab + `${Ld}: \n`
    cod += tab + `if (${T7} == -2) goto ${Le}; \n`      //si el stackX ya se termino vamos a LD
    cod += tab + `${T8} = spc + ${T6}; \n`              //posicion contador del stackConsulta
    cod += tab + `stackConsulta[(int)${T8}] = ${T7};\n`   //ponemos en el stackConsulta lo que habia en TQ
    cod += tab + `${T6} = ${T6} + 1; \n`                //aumentamos el contador de stackX
    cod += tab + `${T7} = stacX[(int)${T6}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
    cod += tab + `goto ${Ld}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

    //se acabo el stackX, no hay mas para guardar
    cod += tab + `${Le}: \n`    
    cod += tab + `${T8} = spc + ${T6};\n`
    cod += tab + `stackConsulta[(int)${T8}] = -2;\n`
    cod += tab + `sx = 0; \n`
    cod += tab + `stacX[(int)sx] = -2; \n`

    //the end
    cod += '\n} \n'
    return cod





}

export function funcPrecedingSibling(){

    var TC0 = newTemp(); var TC1 = newTemp();
    var T0 = newTemp(); var T1 = newTemp(); var TF1 = newTemp(); var T2 = newTemp(); var T3 = newTemp();
    var T4 = newTemp(); var T5 = newTemp(); var T6 = newTemp(); var T7 = newTemp(); var Tlargo = newTemp();
    var T8 = newTemp(); var T9 = newTemp(); var TF2 = newTemp(); var T10 = newTemp(); var T11 = newTemp();
    var T12 = newTemp(); var T13 = newTemp(); var T14 = newTemp(); var T15 = newTemp(); var T16 = newTemp();
    var Ta = newTemp(); var Tb = newTemp();
    var La = newLbl(); var Lb = newLbl(); var Lc = newLbl(); var Ld = newLbl(); var Le = newLbl(); var Lf = newLbl();
    var Lg = newLbl(); var Lh = newLbl(); var Li = newLbl(); var Lj = newLbl();
    var L1 = newLbl(); var L2 = newLbl(); var L3 = newLbl();

    var cod = ''
    var tab = '\t'

    cod += `void PrecedingSibling(){ \n`

    //recibimos los parametros del stack
    cod += tab + `${TC1} = sp + 1; \n`
    cod += tab + `${TC0} = stack[(int)${TC1}]; \n`      //donde inicia el nombre del heap consulta

    //Aqui ya esta listo el stackConsultas que referencia a indexes
    cod += tab + `${T0} = 0; \n`
    cod += tab + `${La}: \n`
    cod += tab + `${T1} = stackConsulta[(int)${T0}]; \n`

    //ciclo general
    cod += tab + `if (${T1} == -2) goto ${Lb}; \n`

    //buscamos el padre aumentamos nuestro contador hasta la posicion del padre + 4
    cod += tab + `${TF1} = ${T1} + 4; \n`

    //nos metemos en la posicion del padre de ese nodo
    cod += tab + `${T2} = Indexes[(int)${TF1}]; \n`

    //nos movemos T+2; para estar en la posicion de los hijos
    cod += tab + `${T2} = ${T2} + 2; \n`
    cod += tab + `${T3} = Indexes[(int)${T2}]; \n`

    cod += tab + `${T4} = sp + 2; \n`   //inicio de donde estan los indices de los hijos temporalmente
    cod += tab + `${T5} = ${T4}; \n`    //contador para ir guardando (?)
    cod += tab + `${Lc}: \n`
    cod += tab + `${T6} = stackHijos[(int)${T3}]; \n`
    //recorremos todos los hijos de ese padre guardando sus indices en stack
    cod += tab + `if (${T6} == -2) goto ${Ld}; \n`
    cod += tab + `stack[(int)${T5}] = ${T6}; \n`
    cod += tab + `${T3} = ${T3} + 1; \n`
    cod += tab + `${T5} = ${T5} + 1; \n`           //aumentamos el contador
    cod += tab + `goto ${Lc}; \n`

    //ya no hay mas hijos para almacenar temporalmente
    cod += tab + `${Ld}: \n`
    cod += tab + `${Tlargo} = ${T5}; \n`
    cod += tab + `stack[(int)${T5}] = -2; \n`

    //ahora recorremos el stack buscando el indice del nodo 
    cod += tab + `${T7} = ${T4}; \n`    //desde el contador donde iniciaba
    cod += tab + `${Le}: \n`
    cod += tab + `${T8} = stack[(int)${T7}]; \n`
    cod += tab + `if (${T8} == -2) goto ${Lf}; \n`
    cod += tab + `if (${T8} == ${T1}) goto ${Lg}; \n`
    //si no es igual entonces si lo guardamos haciendo las validaciones

    //capturamos el nombre del que viene en el stack
    cod += tab + `${T9} = Indexes[(int)${T8}]; \n`
    //capturamos el nombre de lo que viene en el stackConsulta TC0

    //cambiamos de entorno
    cod += tab +`/* Cambiamos de entorno */ \n`
    cod += tab + `${TF2} = ${Tlargo} + 1; \n`
    cod += tab + `sp = sp + ${TF2}; \n`
    cod += tab + `${T10} = sp + 1;\n`                    //Entorno nuevo en la posicion 1 (Posicion del Heap)
    cod += tab + `stack[(int)${T10}] = ${T9};\n`         //Asignar al parametro 1 la posicion del heap a comparar
    cod += tab + `${T11} = sp + 2; \n`                   //Entorno nuevo en la posicion 2 (Posicion del heapConsulta)
    cod += tab + `stack[(int)${T11}] = ${TC0}; \n`       //Asignar al parametro 2 la posicion del heap consulta a comparar
    cod += tab + `Comparar();\n`                        //llamar a la funcion comparar                 
    cod += tab + `${T12} = sp + 0; \n`                   //Posicion del retorno de comparar
    cod += tab + `${T13} = stack[(int)${T12}];\n\n`       //Guardamos lo que haya retornado comparar

    //regresamos del entorno
    cod += tab +`/* regresamos del entorno */ \n`
    cod += tab + `sp = sp - 2; \n`
    cod += tab + `if (${T13} == 0) goto ${Lh}; \n`       //si no hubo retorno vamos a Lh

    //la comparacion fue verdadera guardamos en stacX el hijo

    cod += tab + `${Ta} = 0; \n` //hacemos un contador para stackX
    cod += tab + `${L1}: \n`
    cod += tab + `${Tb} = stacX[(int)${Ta}]; \n`
    cod += tab + `if(${Tb} == -2) goto ${L2}; \n`      //si no encontro ninguna coincidencia    

    //si no fue -2 entonces hay un nodo a comparar
    cod += tab + `if (${T8} == ${Tb}) goto ${Lh}; \n`    //si es igual pasamos de nodo y salimos    
    //si es diferente pasamos al siguiente nodo
    cod += tab + `${Ta} = ${Ta} + 1; \n`
    cod += tab + `goto ${L1}; \n`
    
    //si se termino stacX no hubieron coincidencias entonces lo guardamos
    cod += tab + `${L2}: \n`
    cod += tab + `stacX[(int)sx] = ${T8}; \n`
    cod += tab + `sx = sx + 1; \n`
    cod += tab + `stacX[(int)sx] = -2; \n` 
    cod += tab + `${Lh}: \n`
    cod += tab + `${T7} = ${T7} + 1; \n`
    cod += tab + `goto ${Le}; \n`

    //la comparacion fue falsa o ya lo guarde pasamos al siguiente
    //se acabo el stack para comparar
    cod += tab + `${Lf}: \n`    
    //ya no debe seguir guardando porque ya llego al que buscabamos
    cod += tab + `${Lg}: \n`
    //si ya terminamos pasamos al siguiente nodo de stackConsulta    
    cod += tab + `${T0} = ${T0} + 1; \n`
    cod += tab + `goto ${La}; \n`
    
    //si ya se termino el stackConsulta
    cod += tab + `${Lb}: \n`
    //Reemplazar el StackX por el StackConsulta
    cod += tab + `${T14} = 0; \n`                        //contador para el stackX y stackConsulta
    cod += tab + `${T15} = stacX[(int)${T14}]; \n`
    cod += tab + `${Li}: \n`
    cod += tab + `if (${T15} == -2) goto ${Lj}; \n`      //si el stackX ya se termino vamos a LD
    cod += tab + `${T16} = spc + ${T14}; \n`              //posicion contador del stackConsulta
    cod += tab + `stackConsulta[(int)${T16}] = ${T15};\n`   //ponemos en el stackConsulta lo que habia en TQ
    cod += tab + `${T14} = ${T14} + 1; \n`                //aumentamos el contador de stackX
    cod += tab + `${T15} = stacX[(int)${T14}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
    cod += tab + `goto ${Li}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

    //se acabo el stackX, no hay mas para guardar
    cod += tab + `${Lj}: \n`   
    cod += tab + `${T16} = spc + ${T14};\n` 
    cod += tab + `stackConsulta[(int)${T16}] = -2;\n`
    cod += tab + `sx = 0; \n`
    cod += tab + `stacX[(int)sx] = -2; \n`

    //the end
    cod += '\n} \n'
    return cod


}

export function funcFollowingSibling(){
    /* Todos los hermanos del nodo en cuestion -> Todos los hijos del padre del nodo actual (menos el actual) */
    var TC0 = newTemp(); var TC1 = newTemp();
    var T0 = newTemp(); var T1 = newTemp(); var TF1 = newTemp(); var T2 = newTemp(); var T3 = newTemp();
    var T4 = newTemp(); var T5 = newTemp(); var T6 = newTemp(); var T7 = newTemp(); var Tlargo = newTemp();
    var T8 = newTemp(); var T9 = newTemp(); var TF2 = newTemp(); var T10 = newTemp(); var T11 = newTemp();
    var T12 = newTemp(); var T13 = newTemp(); var T14 = newTemp(); var T15 = newTemp(); var T16 = newTemp();
    var Ta = newTemp(); var Tb = newTemp();
    var La = newLbl(); var Lb = newLbl(); var Lc = newLbl(); var Ld = newLbl(); var Le = newLbl(); var Lf = newLbl();
    var Lg = newLbl(); var Lh = newLbl(); var Li = newLbl(); var Lj = newLbl();
    var L1 = newLbl(); var L2 = newLbl(); var L3 = newLbl();
    var cod = ''
    var tab = '\t'

    cod += `void FollowingSibling(){ \n`

    //recibimos los parametros del stack
    cod += tab + `${TC1} = sp + 1; \n`
    cod += tab + `${TC0} = stack[(int)${TC1}]; \n`      //donde inicia el nombre del heap consulta

    //Aqui ya esta listo el stackConsultas que referencia a indexes
    cod += tab + `${T0} = spc; \n`
    cod += tab + `${La}: \n`
    cod += tab + `${T1} = stackConsulta[(int)${T0}]; \n`

    //ciclo general
    cod += tab + `if (${T1} == -2) goto ${Lb}; \n`

    //buscamos el padre aumentamos nuestro contador hasta la posicion del padre + 4
    cod += tab + `${TF1} = ${T1} + 4; \n`

    //nos metemos en la posicion del padre de ese nodo
    cod += tab + `${T2} = Indexes[(int)${TF1}]; \n`

    //nos movemos T+2; para estar en la posicion de los hijos
    cod += tab + `${T2} = ${T2} + 2; \n`
    cod += tab + `${T3} = Indexes[(int)${T2}]; \n`

    cod += tab + `${T4} = sp + 2; \n`   //inicio de donde estan los indices de los hijos temporalmente
    cod += tab + `${T5} = ${T4}; \n`    //contador para ir guardando (?)
    cod += tab + `${Lc}: \n`
    cod += tab + `${T6} = stackHijos[(int)${T3}]; \n`
    //recorremos todos los hijos de ese padre guardando sus indices en stack
    cod += tab + `if (${T6} == -2) goto ${Ld}; \n`
    cod += tab + `stack[(int)${T5}] = ${T6}; \n`
    cod += tab + `${T3} = ${T3} + 1; \n`
    cod += tab + `${T5} = ${T5} + 1; \n`           //aumentamos el contador
    cod += tab + `goto ${Lc}; \n`

    //ya no hay mas hijos para almacenar temporalmente
    cod += tab + `${Ld}: \n`
    cod += tab + `${Tlargo} = ${T5}; \n`
    cod += tab + `stack[(int)${T5}] = -2; \n`

    //ahora recorremos el stack buscando el indice del nodo 
    cod += tab + `${T7} = ${T4}; \n`    //desde el contador donde iniciaba
    cod += tab + `${Le}: \n`
    cod += tab + `${T8} = stack[(int)${T7}]; \n`
    cod += tab + `if (${T8} == -2) goto ${Lf}; \n`
    cod += tab + `if (${T8} == ${T1}) goto ${Lg}; \n`
    cod += tab + `${T7} = ${T7} + 1; \n`
    cod += tab + `goto ${Le}; \n`

    cod += tab + `${Lg}: \n`
    cod += tab + `${T7} = ${T7} + 1; \n`
    cod += tab + `${T8} = stack[(int)${T7}];\n`
    cod += tab + `if(${T8} == -2) goto ${Lf}; \n`
    //si fueron iguales los indices empezamos a comparar nombre
    //capturamos el nombre del que viene en el stack
    cod += tab + `${T9} = Indexes[(int)${T8}]; \n`
    //capturamos el nombre de lo que viene en el stackConsulta TC0

    //cambiamos de entorno
    cod += tab +`/* Cambiamos de entorno */ \n`
    cod += tab + `${TF2} = ${Tlargo} + 1; \n`
    cod += tab + `sp = sp + ${TF2}; \n`
    cod += tab + `${T10} = sp + 1;\n`                    //Entorno nuevo en la posicion 1 (Posicion del Heap)
    cod += tab + `stack[(int)${T10}] = ${T9};\n`         //Asignar al parametro 1 la posicion del heap a comparar
    cod += tab + `${T11} = sp + 2; \n`                   //Entorno nuevo en la posicion 2 (Posicion del heapConsulta)
    cod += tab + `stack[(int)${T11}] = ${TC0}; \n`       //Asignar al parametro 2 la posicion del heap consulta a comparar
    cod += tab + `Comparar();\n`                        //llamar a la funcion comparar                 
    cod += tab + `${T12} = sp + 0; \n`                   //Posicion del retorno de comparar
    cod += tab + `${T13} = stack[(int)${T12}];\n\n`       //Guardamos lo que haya retornado comparar

    //regresamos del entorno
    cod += tab +`/* regresamos del entorno */ \n`
    cod += tab + `sp = sp - ${TF2}; \n`
    cod += tab + `if (${T13} == 0) goto ${Lh}; \n`       //si no hubo retorno vamos a Lh

    //la comparacion fue verdadera guardamos en stacX el hijo

    cod += tab + `${Ta} = 0; \n` //hacemos un contador para stackX
    cod += tab + `${L1}: \n`
    cod += tab + `${Tb} = stacX[(int)${Ta}]; \n`
    cod += tab + `if(${Tb} == -2) goto ${L2}; \n`      //si no encontro ninguna coincidencia    

    //si no fue -2 entonces hay un nodo a comparar
    cod += tab + `if (${T8} == ${Tb}) goto ${L3}; \n`    //si es igual pasamos de nodo y salimos    
    //si es diferente pasamos al siguiente nodo
    cod += tab + `${Ta} = ${Ta} + 1; \n`
    cod += tab + `goto ${L1}; \n`
    
    //si se termino stacX no hubieron coincidencias entonces lo guardamos
    cod += tab + `${L2}: \n`
    cod += tab + `stacX[(int)sx] = ${T8}; \n`
    cod += tab + `sx = sx + 1; \n`
    cod += tab + `stacX[(int)sx] = -2; \n` 
    //la comparacion fue falsa o ya lo guarde pasamos al siguiente
    cod += tab + `${L3}: \n`
    cod += tab + `${Lh}: \n`
    cod += tab + `goto ${Lg}; \n`

    //se acabo el stack para comparar
    cod += tab + `${Lf}: \n`
    //si ya terminamos pasamos al siguiente nodo de stackConsulta    
    cod += tab + `${T0} = ${T0} + 1; \n`
    cod += tab + `goto ${La}; \n`
    
    //si ya se termino el stackConsulta
    cod += tab + `${Lb}: \n`
    //Reemplazar el StackX por el StackConsulta
    cod += tab + `${T14} = 0; \n`                        //contador para el stackX y stackConsulta
    cod += tab + `${T15} = stacX[(int)${T14}]; \n`
    cod += tab + `${Li}: \n`
    cod += tab + `if (${T15} == -2) goto ${Lj}; \n`      //si el stackX ya se termino vamos a LD
    cod += tab + `${T16} = spc + ${T14}; \n`              //posicion contador del stackConsulta
    cod += tab + `stackConsulta[(int)${T16}] = ${T15};\n`   //ponemos en el stackConsulta lo que habia en TQ
    cod += tab + `${T14} = ${T14} + 1; \n`                //aumentamos el contador de stackX
    cod += tab + `${T15} = stacX[(int)${T14}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
    cod += tab + `goto ${Li}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

    //se acabo el stackX, no hay mas para guardar
    cod += tab + `${Lj}: \n`    
    cod += tab + `${T16} = spc + ${T14};\n`
    cod += tab + `stackConsulta[(int)${T16}] = -2;\n`
    cod += tab + `sx = 0; \n`
    cod += tab + `stacX[(int)sx] = -2; \n`

    //the end
    cod += '\n} \n'
    return cod    

}

export function funcParent(){
    //en el Parent ya esta listo el stackConsulta :: check
    //estando en el nodo de stackConsulta tengo que buscar su padre :: check
    //comparar si el padre de ese nodo se llama igual a como estoy buscando que se llame el padre ::check
    //si es verdadero entonces tengo que buscar en el stacX que no exista ya guardado ese padre :: check
    //si el padre no existe lo guardo en el stacX   :: check
    //si el padre ya existe nos pasamos a buscar al siguiente nodo en stackConsulta :: check

    var TC0 = newTemp(); var TC1 = newTemp(); var T0 = newTemp(); var T1 = newTemp(); var T2 = newTemp(); var Tr = newTemp();
    var T3 = newTemp(); var T4 = newTemp(); var T5 = newTemp(); var T6 = newTemp(); var T7 = newTemp(); var T8 = newTemp();
    var T9 = newTemp(); var T10 = newTemp(); var T11 = newTemp(); var T12 = newTemp(); var T13 = newTemp();
    var La = newLbl(); var Lb = newLbl(); var Lc = newLbl(); var Ld = newLbl(); var Le = newLbl(); var Lf = newLbl();
    var Lg = newLbl(); var Lh = newLbl();

    var cod = ''
    var tab = '\t'

    cod += `void Parent(){ \n`

    //recibimos los parametros del stack
    cod += tab + `${TC1} = sp + 1; \n`
    cod += tab + `${TC0} = stack[(int)${TC1}]; \n`      //donde inicia el nombre del heap consulta

    //Aqui ya esta listo el stackConsultas que referencia a indexes
    cod += tab + `${T0} = spc; \n`
    cod += tab + `${La}: \n`
    cod += tab + `${T1} = stackConsulta[(int)${T0}]; \n`

    //ciclo general
    cod += tab + `if (${T1} == -2) goto ${Lb}; \n`
    //aumentamos nuestro contador hasta la posicion del padre + 4
    cod += tab + `${T1} = ${T1} + 4; \n`
    //nos movemos a indexes, esta es la posicion del nodo padre en el indexes
    cod += tab + `${T2} = Indexes[(int)${T1}]; \n`
    //tomamos el inicio del nodo padre en indexes
    cod += tab + `${T3} = Indexes[(int)${T2}]; \n`


    //comparamos si el nombre del padre es igual al nombre que estamos comparando
    //cambiamos de entorno
    cod += tab +`/* Cambiamos de entorno */ \n`
    cod += tab + `sp = sp + 2; \n`
    cod += tab + `${T5} = sp + 1;\n`                    //Entorno nuevo en la posicion 1 (Posicion del Heap)
    cod += tab + `stack[(int)${T5}] = ${T3};\n`         //Asignar al parametro 1 la posicion del heap a comparar
    cod += tab + `${T6} = sp + 2; \n`                   //Entorno nuevo en la posicion 2 (Posicion del heapConsulta)
    cod += tab + `stack[(int)${T6}] = ${TC0}; \n`       //Asignar al parametro 2 la posicion del heap consulta a comparar
    cod += tab + `Comparar();\n`                        //llamar a la funcion comparar                 
    cod += tab + `${T7} = sp + 0; \n`                   //Posicion del retorno de comparar
    cod += tab + `${T8} = stack[(int)${T7}];\n\n`       //Guardamos lo que haya retornado comparar

    //regresamos del entorno
    cod += tab +`/* regresamos del entorno */ \n`
    cod += tab + `sp = sp - 2; \n`
    cod += tab + `if (${T8} == 0) goto ${Lc}; \n`       //si no hubo retorno vamos a Lc

    /*si la comparacion fue verdadera*/
    //si es verdadero entonces tengo que buscar en el stacX que no exista ya guardado ese padre

    cod += tab + `${T9} = 0; \n` //hacemos un contador para stackX
    cod += tab + `${Ld}: \n`
    cod += tab + `${T10} = stacX[(int)${T9}]; \n`
    cod += tab + `if(${T10} == -2) goto ${Le}; \n`      //si no encontro ninguna coincidencia    

    //si no fue -2 entonces hay un nodo a comparar
    cod += tab + `if (${T2} == ${T10}) goto ${Lf}; \n`    //si es igual pasamos de nodo y salimos    
    //si es diferente pasamos al siguiente nodo
    cod += tab + `${T9} = ${T9} + 1; \n`
    cod += tab + `goto ${Ld}; \n`
    
    //si se termino stacX no hubieron coincidencias
    cod += tab + `${Le}: \n`
    /* El nodo no ha sido guardado en stackX, lo guardamos */
    cod += tab + `stacX[(int)sx] = ${T2}; \n`
    cod += tab + `sx = sx + 1; \n`
    cod += tab + `stacX[(int)sx] = -2; \n`    

    //si ya terminamos pasamos al siguiente nodo de stackConsulta
    cod += tab + `${Lc}: \n`
    //el nodo ya existe en el stackX, no hacemos nada
    cod += tab + `${Lf}: \n`
    cod += tab + `${T0} = ${T0} + 1; \n`
    cod += tab + `goto ${La}; \n`    

    //si ya se termino el stackConsulta
    cod += tab + `${Lb}: \n`
    //Reemplazar el StackX por el StackConsulta
    cod += tab + `${T11} = 0; \n`                        //contador para el stackX y stackConsulta
    cod += tab + `${T12} = stacX[(int)${T11}]; \n`
    cod += tab + `${Lg}: \n`
    cod += tab + `if (${T12} == -2) goto ${Lh}; \n`      //si el stackX ya se termino vamos a LD
    cod += tab + `${T13} = spc + ${T11}; \n`              //posicion contador del stackConsulta
    cod += tab + `stackConsulta[(int)${T13}] = ${T12};\n`   //ponemos en el stackConsulta lo que habia en TQ
    cod += tab + `${T11} = ${T11} + 1; \n`                //aumentamos el contador de stackX
    cod += tab + `${T12} = stacX[(int)${T11}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
    cod += tab + `goto ${Lg}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

    //se acabo el stackX, no hay mas para guardar
    cod += tab + `${Lh}: \n`    
    cod += tab + `${T13} = spc + ${T11};\n`
    cod += tab + `stackConsulta[(int)${T13}] = -2;\n`
    cod += tab + `sx = 0; \n`
    cod += tab + `stacX[(int)sx] = -2; \n`

    //the end
    cod += '\n} \n'
    return cod
    

    



}

export function funcAtributo(){

    var TC1 = newTemp(); var TC0 = newTemp(); var T0 = newTemp(); var T1 = newTemp(); var T2 = newTemp();
    var T3 = newTemp(); var T4 = newTemp(); var T5 = newTemp(); var T6 = newTemp(); var T7 = newTemp();
    var T8 = newTemp(); var TP = newTemp(); var TQ = newTemp(); var TR = newTemp();
    var Ld = newLbl(); var La = newLbl(); var Lb = newLbl(); var Lc = newLbl(); var Le = newLbl();
    var LW = newLbl(); var Lx = newLbl(); 
    var cod = ''
    var tab = '\t'

    cod += `void Atributo(){\n`  // /book/title/@lang

    cod += tab + `${TC1} = sp + 1; \n`
    cod += tab + `${TC0} = stack[(int)${TC1}]; \n`

    //Aqui ya esta listo el stackConsultas que referencia a indexes
    cod += tab + `${T0} = spc; \n`
    cod += tab + `${Le}: \n`
    cod += tab + `${T1} = stackConsulta[(int)${T0}]; \n`

    cod += tab + `if (${T1} == -2) goto ${Ld}; \n`

    cod += tab + `${T1} = ${T1} + 1; \n`

    //nos movemos a indexes
    cod += tab + `${T2} = Indexes[(int)${T1}]; \n`
    
    //nos movemos al stackAtributos
    cod += tab + `${Lc}: \n`
    cod += tab + `${T3} = stackAtributos[(int)${T2}]; \n`
    
    //mientras que no se terminen los atributos
    cod += tab + `if (${T3} == -2 ) goto ${La}; \n`
    //iniciamos un contador para los atributos (posicion inicial del heap)
    cod += tab + `${T4} = ${T3} + 0; \n`
      
    //si hay atributo entonces tenemos que comparar el nombre con el que estan buscando                
    //cambiamos de entorno
    cod += tab +`/* Cambiamos de entorno */ \n`
    cod += tab + `sp = sp + 1; \n`
    cod += tab + `${T5} = sp + 1;\n`                    //Entorno nuevo en la posicion 1 (Posicion del Heap)
    cod += tab + `stack[(int)${T5}] = ${T4};\n`         //Asignar al parametro 1 la posicion del heap a comparar
    cod += tab + `${T6} = sp + 2; \n`                   //Entorno nuevo en la posicion 2 (Posicion del heapConsulta)
    cod += tab + `stack[(int)${T6}] = ${TC0}; \n`       //Asignar al parametro 2 la posicion del heap consulta a comparar
    cod += tab + `Comparar();\n`                        //llamar a la funcion comparar                 
    cod += tab + `${T7} = sp + 0; \n`                   //Posicion del retorno de comparar
    cod += tab + `${T8} = stack[(int)${T7}];\n\n`      //Guardamos lo que haya retornado comparar

    //regresamos del entorno
    cod += tab +`/* regresamos del entorno */ \n`
    cod += tab + `sp = sp - 1; \n`
    cod += tab + `if (${T8} == 0) goto ${Lb}; \n`       //si no hubo retorno vamos a LB

    cod += tab + `stacX[(int)sx] = ${T2}; \n`
    cod += tab + `sx = sx + 1; \n`
    cod += tab + `stacX[(int)sx] = -2; \n`
    cod += tab + `goto ${La}; \n`

    cod += tab + `${Lb}: \n`
    //si no coincidio que siga buscando
    cod += tab + `${T2} = ${T2} + 3; \n`
    cod += tab + `goto ${Lc}; \n`
    cod += tab + `${La}: \n`
    cod += tab + `${T0} = ${T0} + 1; \n`
    cod += tab + `goto ${Le}; \n`
    cod += tab + `${Ld}:\n`

    //Reemplazar el StackConsulta por el StackX
    cod += tab + `${TP} = 0; \n`                        //contador para el stackX y stackConsulta
    cod += tab + `${TQ} = stacX[(int)${TP}]; \n`
    cod += tab + `${LW}: \n`
    cod += tab + `if (${TQ} == -2) goto ${Lx}; \n`      //si el stackX ya se termino vamos a LD
    cod += tab + `${TR} = spc + ${TP}; \n`              //posicion contador del stackConsulta
    cod += tab + `stackConsulta[(int)${TR}] = ${TQ};\n`   //ponemos en el stackConsulta lo que habia en TQ
    cod += tab + `${TP} = ${TP} + 1; \n`                //aumentamos el contador de stackX
    cod += tab + `${TQ} = stacX[(int)${TP}];\n`           //capturamos lo que hay en stackX en esa nueva posicion
    cod += tab + `goto ${LW}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

    //se acabo el stackX, no hay mas para guardar
    cod += tab + `${Lx}: \n`   
    cod += tab + `${TR} = spc + ${TP};\n` 
    cod += tab + `stackConsulta[(int)${TR}] = -2;\n`
    cod += tab + `sx = 0; \n`
    cod += tab + `stacX[(int)sx] = -2; \n`

    //addCodigo3D(`ImprimirConsultas(); \n`);

    //the end
    cod += '\n} \n'
    return cod
}

export function funcAtributoDescendantRecursiva()
{
    var cod = ''
    var tab = `\t`
    // 1 HeapConsulta   

    cod += `void AtributoDescendantRecusriva(){ \n\n`
    var T2A = newTemp();var T2B = newTemp();
    var T2C = newTemp();var T2D = newTemp();var T2E = newTemp();var T2F = newTemp()
    var T2G = newTemp();var TA0 = newTemp();var T2H = newTemp();var TA1 = newTemp();
    var T2I = newTemp();var T2J = newTemp();var T2K = newTemp();var T2L = newTemp();
    var T2M = newTemp();var T2N = newTemp();var T2O = newTemp();var T2P = newTemp();var T2Q = newTemp();

    var E2A = newLbl();var E2B = newLbl();var LA1 = newLbl();var LA3 = newLbl();var E2C = newLbl();var E2D = newLbl();

    cod += tab + `${T2A} = sp + 0; \n`
    cod += tab + `${T2B} = stack[(int)${T2A}]; \n`
    cod += tab + `${T2B} = ${T2B} + 2; \n`
    cod += tab + `${T2C} = Indexes[(int)${T2B}]; \n`
    cod += tab + `if (${T2C} == -2) goto ${E2A}; \n`


    cod += tab + `${T2D} = sp + 2; \n`
    cod += tab + `stack[(int)${T2D}]=${T2C};\n`
    // Label que va a loopear
    cod += tab + `${E2D}:`
    //Me muevo al contador de los hijos en el stack
    cod += tab + `${T2E} = sp + 2; \n`;
    cod += tab + `${T2F} = stack[(int)${T2E}];\n`
    //Busco el hijo en la posicion que guarde
    cod += tab + `${T2G} = stackHijos[(int)${T2F}]; \n`
    cod += tab + `if (${T2G} == -2) goto ${E2B}; \n` //Ya no hay hijos
    //Obtener la posicion del stackAtributos
    cod += tab + `${TA0} = ${T2G} + 1;\n`
    cod += tab + `${T2H} = Indexes[(int)${TA0}]; \n`
    cod += tab + `if(${T2H} == -2 ) goto ${LA1};\n`
    //Obtener el apuntador al heapConsulta
    cod += tab + `${LA3}:\n`
    cod += tab + `${TA1} = stackAtributos[(int)${T2H}];\n`
    cod += tab + `if(${TA1} == -2) goto ${LA1};\n`
    cod += tab + `${T2I} = sp + 1; \n`
    cod += tab + `${T2J} = stack[(int)${T2I}]; \n`
    cod += tab + `sp = sp + 4; \n`
    cod += tab + `${T2K} = sp + 1;\n`
    cod += tab + `stack[(int)${T2K}] = ${TA1};\n`
    cod += tab + `${T2L} = sp + 2;\n`
    cod += tab + `stack[(int)${T2L}] = ${T2J};\n`
    cod += tab + `Comparar(); \n`                        //llamar a la funcion comparar 
    cod += tab + `${T2M} = sp + 0; \n`                      //Posicion del retorno de comparar
    cod += tab + `${T2N} = stack[(int)${T2M}];\n`      //Guardamos lo que haya retornado comparar
    cod += tab + `sp = sp - 4; \n`
    cod += tab + `if(${T2N} == 0) goto ${E2C};\n`
    
    cod += tab + `stacX[(int)sx] = ${T2H}; \n`              //se coloca en el stackX la posicion del hijo en cuestion (?) funcionara recursivamente?
    cod += tab + `sx = sx + 1; \n`                         //Aumentamos el stackX
    cod += tab + `stacX[(int)sx] = -2; \n`

    cod += tab + `${E2C}: \n`
    cod += tab + `${T2H} = ${T2H} + 3;\n`
    cod += tab + `goto ${LA3};\n`

    cod += tab + `${LA1}:\n`

    //LLamada Recursiva
    cod += tab + `sp = sp + 4; \n`
    cod += tab + `stack[(int)sp] = ${T2G}; \n`
    cod += tab + `${T2O} = sp + 1; \n`
    cod += tab + `stack[(int)${T2O}]= ${T2J}; \n` 
    cod += tab + `AtributoDescendantRecusriva();\n`
    cod += tab + `sp = sp - 4;`

    cod += tab + `${T2P} = sp + 2; \n`;
    cod += tab + `${T2Q} = stack[(int)${T2P}]; \n`
    cod += tab + `${T2Q} = ${T2Q} + 1; \n`
    cod += tab + `stack[(int)${T2P}] = ${T2Q};\n`
    cod += tab + `goto ${E2D};\n`

    cod += tab + `${E2B}:; \n`
    cod += tab + `${E2A}:; \n`
    cod += '}\n\n' 

    return cod
}

export function funcAtributoDescendant(){
    var cod = ''
    var tab = `\t`
    // 1 HeapConsulta   
    cod += 'void AtributoDescendant(){\n\n'
    var T1A = newTemp();var T1B = newTemp();var T1C = newTemp();var T1D = newTemp();var T1E = newTemp();var T1F = newTemp()
    var T1G = newTemp();var T1H = newTemp();var T1I = newTemp();
    var E1A = newLbl();var E1B = newLbl();var E1C = newLbl();var E1D = newLbl();

    cod += tab + `${T1A} = spc; \n`
    cod += `${E1B}: \n`
    cod += tab + `${T1B} = stackConsulta[(int)${T1A}]; \n`
    cod += tab + `if (${T1B} == -2) goto ${E1A}; \n`
    cod += tab + `${T1C} = sp + 1 ;\n`
    cod += tab + `${T1D} = stack[(int)${T1C}]; \n`
    cod += tab + `sp = sp + 2; \n`
    cod += tab + `${T1E} = sp + 0; \n`
    cod += tab + `stack[(int)${T1E}] = ${T1B}; \n`
    cod += tab + `${T1F} = sp + 1; \n`
    cod += tab + `stack[(int)${T1F}] = ${T1D}; \n`
    cod += tab + `AtributoDescendantRecusriva(); \n`
    cod += tab + `sp = sp - 2; \n`
    cod += tab + `${T1A} = ${T1A} + 1; \n`
    cod += tab + `goto ${E1B}; \n`
    cod += `${E1A}:;\n`

     //Reemplazar el StackConsulta por el StackX
     cod += tab + `${T1G} = 0; \n`                        //contador para el stackX y stackConsulta
     cod += tab + `${E1D}: \n`
     cod += tab + `${T1H} = stacX[(int)${T1G}]; \n`
     cod += tab + `if (${T1H} == -2) goto ${E1C}; \n`      //si el stackX ya se termino vamos a LD
     cod += tab + `${T1I} = spc + ${T1G}; \n`              //posicion contador del stackConsulta
     cod += tab + `stackConsulta[(int)${T1I}] = ${T1H};\n`   //ponemos en el stackConsulta lo que habia en TQ
     cod += tab + `${T1G} = ${T1G} + 1; \n`                //aumentamos el contador de stackX
     cod += tab + `goto ${E1D}; \n`                       //vamos a comprobar si stackX tiene mas para guardar
 
     //se acabo el stackX, no hay mas para guardar
     cod += tab + `${E1C}: \n`  
     cod += tab + `${T1I} = spc + ${T1G};\n`  
     cod += tab + `stackConsulta[(int)${T1I}] = -2;\n`
     cod += tab + `sx = 0; \n`
     cod += tab + `stacX[(int)sx] = -2; \n`

    cod += '}\n\n' 

    return cod
}

export function funcComparar(){
    var T0 = newTemp(); var T1 = newTemp(); var T2 = newTemp(); var T3 = newTemp(); var T4 = newTemp();
    var T5 = newTemp(); var T6 = newTemp();
    var L0 = newLbl(); var L1 = newLbl(); var L2 = newLbl(); var L3 = newLbl(); var L4 = newLbl();
    var L5 = newLbl(); var L6 = newLbl(); var L7 = newLbl(); var L8 = newLbl();
    
    var str = 
    `void Comparar(){
    ${T0} = sp + 0;
    stack[(int)${T0}] = 1;  //seteado en verdadero por defecto
    ${T1} = sp + 1;
    ${T2} = stack[(int)${T1}];
    ${T3} = heap[(int)${T2}];
    ${T4} = sp + 2;
    ${T5} = stack[(int)${T4}];
    ${T6} = heapConsulta[(int)${T5}];
    //en caso sea *
    if (${T6} == 42) goto ${L8};
    //de lo contrario inicia el ciclo
    ${L0}: 
    if (${T3} != -1) goto ${L1};
    goto ${L2};
    ${L1}: 
    if (${T6} != -1) goto ${L3};
    goto ${L4};
    ${L3}: 
    if (${T3} == ${T6}) goto ${L5};
    goto ${L6};
    ${L5}: 
    ${T2} = ${T2} + 1;
    ${T3} = heap[(int)${T2}];
    ${T5} = ${T5} + 1;
    ${T6} = heapConsulta[(int)${T5}];
    goto ${L0};
    ${L6}: 
    stack[(int)${T0}] = 0;
    ${L2}:${L4}:;
    if (${T3} != ${T6}) goto ${L7};
    goto ${L8};
    ${L7}: 
    stack[(int)${T0}] = 0;
    ${L8}:;
}`

    return str
}
//0 retorno
//1 heap
//2 heap
//3 tipo
export function funcCompararAscii(){
    var T0 = newTemp(); var T1 = newTemp(); var T2 = newTemp(); var T3 = newTemp(); var T4 = newTemp();
    var T5 = newTemp(); var T6 = newTemp();
    var L0 = newLbl(); var L1 = newLbl(); var L2 = newLbl(); var L3 = newLbl(); var L4 = newLbl();
    var L5 = newLbl(); var L6 = newLbl(); var L7 = newLbl(); var L8 = newLbl(); var L9 = newLbl();
    
    var str = 
    `void CompararAscii(){
    ${T0} = sp + 0;
    stack[(int)${T0}] = 0;  //seteado en verdadero por defecto
    ${T1} = sp + 1;
    ${T2} = stack[(int)${T1}];
    ${T3} = heap[(int)${T2}];
    ${T4} = sp + 2;
    ${T5} = stack[(int)${T4}];
    ${T6} = heap[(int)${T5}];
    ${L0}: 
    if (${T3} != -1) goto ${L1};
    goto ${L2};
    ${L1}: 
    if (${T6} != -1) goto ${L3};
    goto ${L4};
    ${L3}: 
    if (${T3} == ${T6}) goto ${L5};
    
    if (${T3} > ${T6})  goto ${L6};  
    goto ${L7};
    ${L5}: 
    ${T2} = ${T2} + 1;
    ${T3} = heap[(int)${T2}];
    ${T5} = ${T5} + 1;
    ${T6} = heap[(int)${T5}];
    goto ${L0};
    ${L2}:${L4}:;
    if (${T3} != ${T6}) goto ${L7};
    goto ${L8};
    
    ${L7}: 
    if (${T3} == -1) goto ${L9};
    ${L6}: 
    stack[(int)${T0}] = -1;
    goto ${L8};
    ${L9}:
    stack[(int)${T0}] = 1;
    goto ${L8};
    ${L8}:;
}`

    return str
}

export function funcDescendantRecursiva()
{
    var cod = ''
    var tab = `\t`
    // 1 HeapConsulta   

    cod += `void DescendantRecusriva(){ \n\n`
    var T2A = newTemp();var T2B = newTemp();var T2C = newTemp();var T2D = newTemp();var T2E = newTemp();var T2F = newTemp()
    var T2G = newTemp();var T2H = newTemp();var T2I = newTemp();var T2J = newTemp();var T2K = newTemp();var T2L = newTemp();
    var T2M = newTemp();var T2N = newTemp();var T2O = newTemp();var T2P = newTemp();var T2Q = newTemp();

    var E2A = newLbl();var E2B = newLbl();var E2C = newLbl();var E2D = newLbl();

    cod += tab + `${T2A} = sp + 0; \n`
    cod += tab + `${T2B} = stack[(int)${T2A}]; \n`
    cod += tab + `${T2B} = ${T2B} + 2; \n`
    cod += tab + `${T2C} = Indexes[(int)${T2B}]; \n`
    cod += tab + `if (${T2C} == -2) goto ${E2A}; \n`
    cod += tab + `${T2D} = sp + 2; \n`
    cod += tab + `stack[(int)${T2D}]=${T2C};\n`
    // Label que va a loopear
    cod += tab + `${E2D}:`
    //Me muevo al contador de los hijos en el stack
    cod += tab + `${T2E} = sp + 2; \n`;
    cod += tab + `${T2F} = stack[(int)${T2E}];\n`
    //Busco el hijo en la posicion que guarde
    cod += tab + `${T2G} = stackHijos[(int)${T2F}]; \n`
    cod += tab + `if (${T2G} == -2) goto ${E2B}; \n` //Ya no hay hijos
    //Obtener el nombre en el indexes
    cod += tab + `${T2H} = Indexes[(int)${T2G}]; \n`
    //Obtener el apuntador al heapConsulta
    cod += tab + `${T2I} = sp + 1; \n`
    cod += tab + `${T2J} = stack[(int)${T2I}]; \n`
    cod += tab + `sp = sp + 4; \n`
    cod += tab + `${T2K} = sp + 1;\n`
    cod += tab + `stack[(int)${T2K}] = ${T2H};\n`
    cod += tab + `${T2L} = sp + 2;\n`
    cod += tab + `stack[(int)${T2L}] = ${T2J};\n`
    cod += tab + `Comparar(); \n`                        //llamar a la funcion comparar 
    cod += tab + `${T2M} = sp + 0; \n`                      //Posicion del retorno de comparar
    cod += tab + `${T2N} = stack[(int)${T2M}];\n`      //Guardamos lo que haya retornado comparar
    cod += tab + `sp = sp - 4; \n`
    cod += tab + `if(${T2N} == 0) goto ${E2C};\n`
    
    cod += tab + `stacX[(int)sx] = ${T2G}; \n`              //se coloca en el stackX la posicion del hijo en cuestion (?) funcionara recursivamente?
    cod += tab + `sx = sx + 1; \n`                         //Aumentamos el stackX
    cod += tab + `stacX[(int)sx] = -2; \n`

    cod += tab + `${E2C}: \n`
    //LLamada Recursiva
    cod += tab + `sp = sp + 4; \n`
    cod += tab + `stack[(int)sp] = ${T2G}; \n`
    cod += tab + `${T2O} = sp + 1; \n`
    cod += tab + `stack[(int)${T2O}]= ${T2J}; \n` 
    cod += tab + `DescendantRecusriva();\n`
    cod += tab + `sp = sp - 4;`

    cod += tab + `${T2P} = sp + 2; \n`;
    cod += tab + `${T2Q} = stack[(int)${T2P}]; \n`
    cod += tab + `${T2Q} = ${T2Q} + 1; \n`
    cod += tab + `stack[(int)${T2P}] = ${T2Q};\n`
    cod += tab + `goto ${E2D};\n`

    cod += tab + `${E2B}:; \n`
    cod += tab + `${E2A}:; \n`
    cod += '}\n\n' 

    return cod
}

export function funcDescendant(){
    var cod = ''
    var tab = `\t`
    // 1 HeapConsulta   
    cod += 'void Descendant(){\n\n'
    var T1A = newTemp();var T1B = newTemp();var T1C = newTemp();var T1D = newTemp();var T1E = newTemp();var T1F = newTemp()
    var T1G = newTemp();var T1H = newTemp();var T1I = newTemp();
    var E1A = newLbl();var E1B = newLbl();var E1C = newLbl();var E1D = newLbl();

    cod += tab + `${T1A} = spc; \n`
    cod += `${E1B}: \n`
    cod += tab + `${T1B} = stackConsulta[(int)${T1A}]; \n`
    cod += tab + `if (${T1B} == -2) goto ${E1A}; \n`
    cod += tab + `${T1C} = sp + 1 ;\n`
    cod += tab + `${T1D} = stack[(int)${T1C}]; \n`
    cod += tab + `sp = sp + 2; \n`
    cod += tab + `${T1E} = sp + 0; \n`
    cod += tab + `stack[(int)${T1E}] = ${T1B}; \n`
    cod += tab + `${T1F} = sp + 1; \n`
    cod += tab + `stack[(int)${T1F}] = ${T1D}; \n`
    cod += tab + `DescendantRecusriva(); \n`
    cod += tab + `sp = sp - 2; \n`
    cod += tab + `${T1A} = ${T1A} + 1; \n`
    cod += tab + `goto ${E1B}; \n`
    cod += `${E1A}:;\n`

     //Reemplazar el StackConsulta por el StackX
     cod += tab + `${T1G} = 0; \n`                        //contador para el stackX y stackConsulta
     cod += tab + `${E1D}: \n`
     cod += tab + `${T1H} = stacX[(int)${T1G}]; \n`
     cod += tab + `if (${T1H} == -2) goto ${E1C}; \n`      //si el stackX ya se termino vamos a LD
     cod += tab + `${T1I} = spc + ${T1G}; \n`              //posicion contador del stackConsulta
     cod += tab + `stackConsulta[(int)${T1I}] = ${T1H};\n`   //ponemos en el stackConsulta lo que habia en TQ
     cod += tab + `${T1G} = ${T1G} + 1; \n`                //aumentamos el contador de stackX
     cod += tab + `goto ${E1D}; \n`                       //vamos a comprobar si stackX tiene mas para guardar
 
     //se acabo el stackX, no hay mas para guardar
     cod += tab + `${E1C}: \n`  
     cod += tab + `${T1I} = spc + ${T1G};\n`  
     cod += tab + `stackConsulta[(int)${T1I}] = -2;\n`
     cod += tab + `sx = 0; \n`
     cod += tab + `stacX[(int)sx] = -2; \n`

    cod += '}\n\n' 

    return cod
}

export function funcDescendantSelf(){
    var cod = ''
    var tab = `\t`
    // 1 HeapConsulta   
    cod += 'void DescendantSelf(){\n\n'
    var T1A = newTemp();var T1B = newTemp();
    
    var T3A = newTemp();var T3B = newTemp();var T3C = newTemp();var T3D = newTemp();var T3E = newTemp();var T3F = newTemp();
    var T3G = newTemp();

    var T1C = newTemp();var T1D = newTemp();var T1E = newTemp();var T1F = newTemp()
    var T1G = newTemp();var T1H = newTemp();var T1I = newTemp();
    
    var E3A = newLbl();
    var E1A = newLbl();var E1B = newLbl();var E1C = newLbl();var E1D = newLbl();

    cod += tab + `${T1A} = spc; \n`
    cod += `${E1B}: \n`
    cod += tab + `${T1B} = stackConsulta[(int)${T1A}]; \n`
    cod += tab + `if (${T1B} == -2) goto ${E1A}; \n`

    //Obtener el apuntador al heapConsulta
    cod += tab + `${T3A} = Indexes[(int)${T1B}];\n`
    cod += tab + `${T3B} = sp + 1; \n`
    cod += tab + `${T3C} = stack[(int)${T3B}]; \n`
    cod += tab + `sp = sp + 4; \n`
    cod += tab + `${T3D} = sp + 1;\n`
    cod += tab + `stack[(int)${T3D}] = ${T3A};\n`
    cod += tab + `${T3E} = sp + 2;\n`
    cod += tab + `stack[(int)${T3E}] = ${T3C};\n`
    cod += tab + `Comparar(); \n`                        //llamar a la funcion comparar 
    cod += tab + `${T3F} = sp + 0; \n`                      //Posicion del retorno de comparar
    cod += tab + `${T3G} = stack[(int)${T3F}];\n`      //Guardamos lo que haya retornado comparar
    cod += tab + `sp = sp - 4; \n`
    
    cod += tab + `if(${T3G} == 0) goto ${E3A};\n`
    cod += tab + `stacX[(int)sx] = ${T1B}; \n`              //se coloca en el stackX la posicion del hijo en cuestion (?) funcionara recursivamente?
    cod += tab + `sx = sx + 1; \n`                         //Aumentamos el stackX
    cod += tab + `stacX[(int)sx] = -2; \n`

    cod += tab + `${E3A}:`

    cod += tab + `${T1C} = sp + 1 ;\n`
    cod += tab + `${T1D} = stack[(int)${T1C}]; \n`
    cod += tab + `sp = sp + 2; \n`
    cod += tab + `${T1E} = sp + 0; \n`
    cod += tab + `stack[(int)${T1E}] = ${T1B}; \n`
    cod += tab + `${T1F} = sp + 1; \n`
    cod += tab + `stack[(int)${T1F}] = ${T1D}; \n`
    cod += tab + `DescendantRecusriva(); \n`
    cod += tab + `sp = sp - 2; \n`
    cod += tab + `${T1A} = ${T1A} + 1; \n`
    cod += tab + `goto ${E1B}; \n`
    cod += `${E1A}:;\n`

     //Reemplazar el StackConsulta por el StackX
     cod += tab + `${T1G} = 0; \n`                        //contador para el stackX y stackConsulta
     cod += tab + `${E1D}: \n`
     cod += tab + `${T1H} = stacX[(int)${T1G}]; \n`
     cod += tab + `if (${T1H} == -2) goto ${E1C}; \n`      //si el stackX ya se termino vamos a LD
     cod += tab + `${T1I} = spc + ${T1G}; \n`              //posicion contador del stackConsulta
     cod += tab + `stackConsulta[(int)${T1I}] = ${T1H};\n`   //ponemos en el stackConsulta lo que habia en TQ
     cod += tab + `${T1G} = ${T1G} + 1; \n`                //aumentamos el contador de stackX
     cod += tab + `goto ${E1D}; \n`                       //vamos a comprobar si stackX tiene mas para guardar
 
     //se acabo el stackX, no hay mas para guardar
     cod += tab + `${E1C}: \n`    
     cod += tab + `${T1I} = spc + ${T1G};\n`
     cod += tab + `stackConsulta[(int)${T1G}] = -2;\n`
     cod += tab + `sx = 0; \n`
     cod += tab + `stacX[(int)sx] = -2; \n`

    cod += '}\n\n' 

    return cod
}

export function funcAncestorRecursiva()
{
    var cod = ''
    var tab = `\t`
    // 1 HeapConsulta   

    cod += `void AncestorRecusriva(){ \n\n`
    var TC1 = newTemp(); var TC0 = newTemp(); var T1 = newTemp(); var T2 = newTemp(); var T3 = newTemp();
    var T5 = newTemp(); var T6 = newTemp(); var T7 = newTemp(); var T8 = newTemp(); var T9 = newTemp(); var T10 = newTemp(); 
    var T11 = newTemp(); 
    
    var Lb = newLbl(); var Lc = newLbl(); var Ld = newLbl(); var Le = newLbl(); var Lf = newLbl();

        //recibimos los parametros del stack
    cod += tab + `${TC1} = sp + 1; \n`
    cod += tab + `${TC0} =stack[(int)${TC1}]; \n`      //donde inicia el nombre del heap consulta
    cod += tab + `${T1} = stack[(int)sp]; \n`
    cod += tab + `${T1} = ${T1} + 4; \n`
    //nos movemos a indexes, esta es la posicion del nodo padre en el indexes
    cod += tab + `${T2} = Indexes[(int)${T1}]; \n`
    cod += tab + `if(${T2} == -2) goto ${Lb};\n`
    //tomamos el inicio del nodo padre en indexes
    cod += tab + `${T3} = Indexes[(int)${T2}]; \n`
    //comparamos si el nombre del padre es igual al nombre que estamos comparando
    //cambiamos de entorno
    cod += tab +`/* Cambiamos de entorno */ \n`
    cod += tab + `sp = sp + 2; \n`
    cod += tab + `${T5} = sp + 1;\n`                    //Entorno nuevo en la posicion 1 (Posicion del Heap)
    cod += tab + `stack[(int)${T5}] = ${T3};\n`         //Asignar al parametro 1 la posicion del heap a comparar
    cod += tab + `${T6} = sp + 2; \n`                   //Entorno nuevo en la posicion 2 (Posicion del heapConsulta)
    cod += tab + `stack[(int)${T6}] = ${TC0}; \n`       //Asignar al parametro 2 la posicion del heap consulta a comparar
    cod += tab + `Comparar();\n`                        //llamar a la funcion comparar                 
    cod += tab + `${T7} = sp + 0; \n`                   //Posicion del retorno de comparar
    cod += tab + `${T8} = stack[(int)${T7}];\n\n`       //Guardamos lo que haya retornado comparar

    //regresamos del entorno
    cod += tab +`/* regresamos del entorno */ \n`
    cod += tab + `sp = sp - 2; \n`
    cod += tab + `if (${T8} == 0) goto ${Lc}; \n`       //si no hubo retorno vamos a Lc

    /*si la comparacion fue verdadera*/
    //si es verdadero entonces tengo que buscar en el stacX que no exista ya guardado ese padre

    cod += tab + `${T9} = 0; \n` //hacemos un contador para stackX
    cod += tab + `${Ld}: \n`
    cod += tab + `${T10} = stacX[(int)${T9}]; \n`
    cod += tab + `if(${T10} == -2) goto ${Le}; \n`      //si no encontro ninguna coincidencia    

    //si no fue -2 entonces hay un nodo a comparar
    cod += tab + `if (${T2} == ${T10}) goto ${Lf}; \n`    //si es igual pasamos de nodo y salimos    
    //si es diferente pasamos al siguiente nodo
    cod += tab + `${T9} = ${T9} + 1; \n`
    cod += tab + `goto ${Ld}; \n`
    
    //si se termino stacX no hubieron coincidencias
    cod += tab + `${Le}: \n`
    /* El nodo no ha sido guardado en stackX, lo guardamos */
    cod += tab + `stacX[(int)sx] = ${T2}; \n`
    cod += tab + `sx = sx + 1; \n`
    cod += tab + `stacX[(int)sx] = -2; \n`    

    //si ya terminamos pasamos al siguiente nodo de stackConsulta
    cod += tab + `${Lc}: \n`
    //el nodo ya existe en el stackX, no hacemos nada
    cod += tab + `${Lf}: \n`

    cod += tab + `sp = sp + 2; \n`
    cod += tab + `stack[(int)sp] = ${T2};\n`
    cod += tab + `${T11}=sp + 1;\n`
    cod += tab + `stack[(int)${T11}] = ${TC0};\n`
    cod += tab + `AncestorRecusriva();\n`
    cod += tab + `sp = sp - 2; \n`
    cod += tab + `${Lb}:; \n`
    //the end
    cod += '}\n\n' 

    return cod
}

export function funcAncestor()
{
    var cod = ''
    var tab = `\t`
    // 1 HeapConsulta   
    cod += 'void Ancestor(){\n\n'
    var T1A = newTemp();var T1B = newTemp();var T1C = newTemp();var T1D = newTemp();var T1E = newTemp();var T1F = newTemp()
    var T1G = newTemp();var T1H = newTemp();var T1I = newTemp();
    var E1A = newLbl();var E1B = newLbl();var E1C = newLbl();var E1D = newLbl();

    cod += tab + `${T1A} = spc; \n`
    cod += `${E1B}: \n`
    cod += tab + `${T1B} = stackConsulta[(int)${T1A}]; \n`
    cod += tab + `if (${T1B} == -2) goto ${E1A}; \n`
    cod += tab + `${T1C} = sp + 1 ;\n`
    cod += tab + `${T1D} = stack[(int)${T1C}]; \n`
    cod += tab + `sp = sp + 2; \n`
    cod += tab + `${T1E} = sp + 0; \n`
    cod += tab + `stack[(int)${T1E}] = ${T1B}; \n`
    cod += tab + `${T1F} = sp + 1; \n`
    cod += tab + `stack[(int)${T1F}] = ${T1D}; \n`
    cod += tab + `AncestorRecusriva(); \n`
    cod += tab + `sp = sp - 2; \n`
    cod += tab + `${T1A} = ${T1A} + 1; \n`
    cod += tab + `goto ${E1B}; \n`
    cod += `${E1A}:;\n`

     //Reemplazar el StackConsulta por el StackX
     cod += tab + `${T1G} = 0; \n`                        //contador para el stackX y stackConsulta
     cod += tab + `${E1D}: \n`
     cod += tab + `${T1H} = stacX[(int)${T1G}]; \n`
     cod += tab + `if (${T1H} == -2) goto ${E1C}; \n`      //si el stackX ya se termino vamos a LD
     cod += tab + `${T1I} = spc + ${T1G}; \n`              //posicion contador del stackConsulta
     cod += tab + `stackConsulta[(int)${T1I}] = ${T1H};\n`   //ponemos en el stackConsulta lo que habia en TQ
     cod += tab + `${T1G} = ${T1G} + 1; \n`                //aumentamos el contador de stackX
     cod += tab + `goto ${E1D}; \n`                       //vamos a comprobar si stackX tiene mas para guardar
 
     //se acabo el stackX, no hay mas para guardar
     cod += tab + `${E1C}: \n`    
     cod += tab + `${T1I} = spc + ${T1G};\n`
     cod += tab + `stackConsulta[(int)${T1I}] = -2;\n`
     cod += tab + `sx = 0; \n`
     cod += tab + `stacX[(int)sx] = -2; \n`

    cod += '}\n\n' 

    return cod
}

export function funcAncestorSelf()
{
    var cod = ''
    var tab = `\t`
    // 1 HeapConsulta   
    cod += 'void AncestorSelf(){\n\n'
    var T1A = newTemp();var T1B = newTemp();
    
    var T3A = newTemp();var T3B = newTemp();var T3C = newTemp();var T3D = newTemp();var T3E = newTemp();var T3F = newTemp();
    var T3G = newTemp();

    var T1C = newTemp();var T1D = newTemp();var T1E = newTemp();var T1F = newTemp()
    var T1G = newTemp();var T1H = newTemp();var T1I = newTemp();
    
    var E3A = newLbl();
    var E1A = newLbl();var E1B = newLbl();var E1C = newLbl();var E1D = newLbl();

    cod += tab + `${T1A} = spc; \n`
    cod += `${E1B}: \n`
    cod += tab + `${T1B} = stackConsulta[(int)${T1A}]; \n`
    cod += tab + `if (${T1B} == -2) goto ${E1A}; \n`

    //Obtener el apuntador al heapConsulta
    cod += tab + `${T3A} = Indexes[(int)${T1B}];\n`
    cod += tab + `${T3B} = sp + 1; \n`
    cod += tab + `${T3C} = stack[(int)${T3B}]; \n`
    cod += tab + `sp = sp + 4; \n`
    cod += tab + `${T3D} = sp + 1;\n`
    cod += tab + `stack[(int)${T3D}] = ${T3A};\n`
    cod += tab + `${T3E} = sp + 2;\n`
    cod += tab + `stack[(int)${T3E}] = ${T3C};\n`
    cod += tab + `Comparar(); \n`                        //llamar a la funcion comparar 
    cod += tab + `${T3F} = sp + 0; \n`                      //Posicion del retorno de comparar
    cod += tab + `${T3G} = stack[(int)${T3F}];\n`      //Guardamos lo que haya retornado comparar
    cod += tab + `sp = sp - 4; \n`
    
    cod += tab + `if(${T3G} == 0) goto ${E3A};\n`
    cod += tab + `stacX[(int)sx] = ${T1B}; \n`              //se coloca en el stackX la posicion del hijo en cuestion (?) funcionara recursivamente?
    cod += tab + `sx = sx + 1; \n`                         //Aumentamos el stackX
    cod += tab + `stacX[(int)sx] = -2; \n`

    cod += tab + `${E3A}:`

    cod += tab + `${T1C} = sp + 1 ;\n`
    cod += tab + `${T1D} = stack[(int)${T1C}]; \n`
    cod += tab + `sp = sp + 2; \n`
    cod += tab + `${T1E} = sp + 0; \n`
    cod += tab + `stack[(int)${T1E}] = ${T1B}; \n`
    cod += tab + `${T1F} = sp + 1; \n`
    cod += tab + `stack[(int)${T1F}] = ${T1D}; \n`
    cod += tab + `AncestorRecusriva(); \n`
    cod += tab + `sp = sp - 2; \n`
    cod += tab + `${T1A} = ${T1A} + 1; \n`
    cod += tab + `goto ${E1B}; \n`
    cod += `${E1A}:;\n`

     //Reemplazar el StackConsulta por el StackX
     cod += tab + `${T1G} = 0; \n`                        //contador para el stackX y stackConsulta
     cod += tab + `${E1D}: \n`
     cod += tab + `${T1H} = stacX[(int)${T1G}]; \n`
     cod += tab + `if (${T1H} == -2) goto ${E1C}; \n`      //si el stackX ya se termino vamos a LD
     cod += tab + `${T1I} = spc + ${T1G}; \n`              //posicion contador del stackConsulta
     cod += tab + `stackConsulta[(int)${T1I}] = ${T1H};\n`   //ponemos en el stackConsulta lo que habia en TQ
     cod += tab + `${T1G} = ${T1G} + 1; \n`                //aumentamos el contador de stackX
     cod += tab + `goto ${E1D}; \n`                       //vamos a comprobar si stackX tiene mas para guardar
 
     //se acabo el stackX, no hay mas para guardar
     cod += tab + `${E1C}: \n`    
     cod += tab + `${T1I} = spc + ${T1G};\n`
     cod += tab + `stackConsulta[(int)${T1I}] = -2;\n`
     cod += tab + `sx = 0; \n`
     cod += tab + `stacX[(int)sx] = -2; \n`

    cod += '}\n\n' 

    return cod
}

export function ImprimirConsultaR(){
    var T0 = newTemp(); var T1 = newTemp(); var T2 = newTemp();
    var La = newLbl(); var Lb = newLbl();
    var cod = ''
    var tab = '\t'
    cod += `void ImprimirConsultaR(){ \n`
    cod += tab + `${T0} = spc; \n`                            //iniciamos un contador
    cod += tab + `${La}: \n`                                //etiqueta recursiva
    cod += tab + `${T1} = stackConsulta[(int)${T0}]; \n`    //capturamos lo que esta en stackConsulta
    cod += tab + `if (${T1} == -2) goto ${Lb}; \n`          //si stackConsulta no es -2
    cod += tab + `\n/* Cambio de entorno */\n`              //cambiamos de entorno
    cod += tab + `sp = sp + 1; \n`                          //enviamos un parametro
    cod += tab + `${T2} = sp + 0; \n`                       //posicion del parametro en el entorno
    cod += tab + `stack[(int)${T2}] = ${T1}; \n`            //guardamos el parametro en el stack
    cod += tab + `ImprimirConsulta(); \n`                   //call ImprimirConsulta
    cod += tab + `printf("%c", 10); \n`
    cod += tab + `sp = sp - 1; \n`                          //regresamos del entorno
    cod += tab + `${T0} = ${T0} + 1; \n`                    //aumentamos el contador para el stack consulta
    cod += tab + `goto ${La}; \n`                           //ciclo
    cod += tab + `${Lb}:; \n`                               //salimos del metodo
    cod += `\n}\n`
    return cod
}

export function imprimirConsulta(){
    var TC1 = newTemp();
    var T0 = newTemp(); var T1 = newTemp(); var T2 = newTemp(); var T3 = newTemp(); var T4 = newTemp(); var T5 = newTemp();
    var T6 = newTemp(); var T7 = newTemp(); var T8 = newTemp(); var T9 = newTemp(); var T10 = newTemp(); var T11 = newTemp();
    var T12 = newTemp(); var T13 = newTemp(); var T14 = newTemp(); var T15 = newTemp(); var T16 = newTemp();
    var T17 = newTemp(); var T18 = newTemp(); var T19 = newTemp(); var T20 = newTemp(); var T21 = newTemp();
    var T22 = newTemp(); var T23 = newTemp();

    var LC = newLbl(); var LD = newLbl(); var LE = newLbl(); var LF = newLbl(); var LG = newLbl(); var LH = newLbl();
    var LI = newLbl(); var LJ = newLbl(); var LK = newLbl(); var LL = newLbl(); var LN = newLbl(); var LO = newLbl();
    var LP = newTemp(); var LQ = newLbl(); var LR = newLbl(); var LM =  newLbl(); var LS = newLbl();
    
    var cod = ''
    var tab = '\t'

    cod += `void ImprimirConsulta(){ \n`

    cod += tab + `\n/* Recibimiento de parametros */\n`
    cod += tab + `${T0} = sp + 0; \n`
    cod += tab + `${T1} = stack[(int)${T0}]; \n`
    cod += tab + `${T2} = Indexes[(int)${T1}]; \n`           //recojemos el indice de la respuesta (nombre del objeto)
    
    cod += tab + `\n/* Nombre del objeto */\n`
    //tratamos con el nombre del objeto
    cod += tab + `printf("%c", '<'); \n`                    //imprimimos el '<'
    cod += tab + `${T4} = ${T2}; \n`                        //iniciamos un contador para el heap, en donde se quedo la primera posicion
    
    cod += tab + `${LD}: \n`
    cod += tab + `${T3} = heap[(int)${T4}]; \n`             //la primera posicion del nombre     
    cod += tab + `if (${T3} == -1) goto ${LC}; \n`          //mientras no lea -1
    cod += tab + `printf("%c", (int)${T3}); \n`                  //como no es -1 entonces lo imprimimos
    cod += tab + `${T4} = ${T4} + 1; \n`                    //aumentamos el contador para recorrer el heap
    cod += tab + `goto ${LD}; \n`
    cod += tab + `${LC}: \n`    //ya termino el string

    cod += tab + `\n/* nombre atributo */\n`
    //tratamos con los atributos
    cod += tab + `${T1} = ${T1} + 1; \n`                    //aumentamos el contador para el indexes
    cod += tab + `${T5} = Indexes[(int)${T1}]; \n`          //estamos en la posicion de los atributos
    
    cod += tab + `if (${T5} == -2) goto ${LS}; \n`

    cod += tab + `${T6} = ${T5}; \n`                        //iniciamos el contador para recorrer el stackAtributos
    cod += tab + `${T7} = stackAtributos[(int)${T6}]; \n`   //nos ponemos en la posicion del stackAtributos
    cod += tab + `${LF}: \n`
    cod += tab + `printf("%c", (int)32); \n`
    cod += tab + `if (${T7} == -2) goto ${LE}; \n`           //mientras que los atributos no sean -2  

    cod += tab + `${T8} = heap[(int)${T7}]; \n`                 //mando a buscar en el heap el atributo
    cod += tab + `${T9} = ${T7}; \n`                            //hacemos un contador para el heap
    cod += tab + `${LI}: \n`
    cod += tab + `if (${T8} == -1) goto ${LG}; \n`             //recorremos el heap 
    cod += tab + `printf("%c", (int)${T8}); \n`
    cod += tab + `${T9} = ${T9} + 1; \n`
    cod += tab + `${T8} = heap[(int)${T9}]; \n`
    cod += tab + `goto ${LI}; \n`                           //termina nombre atributo

    cod += tab + `${LG}: \n`
    cod += tab + `printf("%c",(int)61); \n`
    cod += tab + `printf("%c",(int)34); \n`

    cod += tab + `\n/* valor del atributo */\n`
    //seguimos con el valor atributo
    cod += tab + `${T6} = ${T6} + 1; \n`                //aumentamos el contador para stackAtributos
    cod += tab + `${T10} = stackAtributos[(int)${T6}]; \n` //mandamos a buscar en el heap el valor 

    cod += tab + `${T11} = ${T10}; \n`  //nuevo contador 
    cod += tab + `${LH}: \n`
    cod += tab + `${T12} = heap[(int)${T11}]; \n`       //tenemos el primer caracter del valor
    cod += tab + `if (${T12} == -1) goto ${LJ}; \n`
    cod += tab + `printf("%c", (int)${T12}); \n`
    cod += tab + `${T11} = ${T11} + 1; \n`
    cod += tab + `goto ${LH};\n`
    
    cod += tab + `${LJ}: \n`    //se termino el string
    cod += tab + `printf("%c", (int)34); \n`

    cod += tab + `${T6} = ${T6} + 2; \n`                    //sumamos 2 al stack atributos para pasarnos al siguiente atributo
    cod += tab + `${T7} = stackAtributos[(int)${T6}]; \n`
    cod += tab + `goto ${LF}; \n`
    cod += tab + `${LE}: \n`
    cod += tab + `${LS}: \n`   
    cod += tab + `printf("%c", (int)62); \n`                 //si ya no hay mas atributos cerramos la etiqueta

    cod += tab + `\n/* Hijos del objeto */\n`
    //tratamos con los hijos
    cod += tab + `${T1} = ${T1} + 1; \n`                    //nos movemos una posicion en el indexes
    cod += tab + `${T13} = Indexes[(int)${T1}]; \n`         //mandamos a buscar la posicion en el indexes
    cod += tab + `if (${T13} == -2) goto ${LK}; \n`         //si la posicion en el indexes no es -2
    cod += tab + `printf("%c", (int)10); \n`
    cod += tab + `${T14} = ${T13}; \n`                          //iniciamos un contador para los hijos -> T14
    
    cod += tab + `${LM}: \n`
    cod += tab + `${T15} = stackHijos[(int)${T14}]; \n`    //si tuvo hijos, los buscamos en el stackHijos    

    //hacemos un ciclo para que recorra los hijos
    
    cod += tab + `if (${T15} == -2) goto ${LL}; \n`       //mientras que tenga hijos

    /* enviamos los parametros a la llamada recursiva */
    cod += tab + `/* nos cambiamos de entorno */ \n`
    cod += tab + `sp = sp + 1; \n`
    cod += tab + `stack[(int)sp] = ${T15}; \n` //colocamos los parametros (objeto en T15)
    cod += tab + `ImprimirConsulta(); \n`
    cod += tab + `sp = sp - 1; \n`
    cod += tab + `printf("%c", (int)10); \n`

    /* regreso de la llamada recursiva */
    cod += tab + `${T14} = ${T14} + 1; \n` 
    cod += tab + `goto ${LM}; \n`

    cod += tab + `${LL}: \n`   //ya no tiene hijos
    cod += tab + `${LK}: \n` //si no tiene hijos

    
    cod += tab + `\n/* texto del objeto */\n`
    //tratamos con el texto
    cod += tab + `${T22} = sp + 0; \n`
    cod += tab + `${T23} = stack[(int)${T22}]; \n`
    cod += tab + `${T23} = ${T23} + 3; \n`
    
    cod += tab + `${T16} = Indexes[(int)${T23}]; \n`    //obtenemos el valor en indexes
    cod += tab + `if (${T16} == -2) goto ${LP}; \n`        //verificamos si tiene texto

    cod += tab + `${TC1} = ${T16}; \n`
    cod += tab + `${LO}: \n`
    cod += tab + `${T17} = heap[(int)${TC1}];\n`        //vamos al heap a buscar la referencia    
    cod += tab + `if (${T17} == -1) goto ${LN}; \n`
    cod += tab + `printf("%c", (int)${T17}); \n`
    cod += tab + `${TC1} = ${TC1} + 1; \n`
    cod += tab + `goto ${LO}; \n`

    cod += tab + `${LN}: \n`     //se termino el texto
    cod += tab + `${LP}: \n`     //el objeto no tenia texto

    //al final cerramos la etiqueta del objeto

    cod += tab + `\n/* cerrando etiqueta */\n`
    cod += tab + `printf("%c", (int)60); \n`            // '<'
    cod += tab + `printf("%c", (int)47); \n`            // '/'
    
    cod += tab + `${T18} = sp + 0; \n`
    cod += tab + `${T19} = stack[(int)${T18}]; \n`
    cod += tab + `${T20} = Indexes[(int)${T19}]; \n`           //recojemos el indice de la respuesta (nombre del objeto)

    cod += tab + `${LR}: \n`
    cod += tab + `${T21} = heap[(int)${T20}]; \n`       //buscamos en el heap el nombre de nuevo
    cod += tab + `if (${T21} == -1) goto ${LQ}; \n`     //mientras el string no sea -1
    cod += tab + `printf("%c", (int)${T21}); \n`
    cod += tab + `${T20} = ${T20} + 1; \n`
    cod += tab + `goto ${LR}; \n`
    
    //the end!
    cod += tab + `${LQ}:; \n`
    cod += tab + `printf("%c", (int)62); \n`             // '>'

    cod += '\n} \n'

    return cod
}

export function ImprimirAtributoR(){

    var T0 = newTemp(); var T1 = newTemp(); var T2 = newTemp();
    var La = newLbl(); var Lb = newLbl();
    var cod = ''
    var tab = '\t'
    cod += `void ImprimirAtributoR(){ \n`
    cod += tab + `${T0} = spc; \n`                            //iniciamos un contador
    cod += tab + `${La}: \n`                                //etiqueta recursiva
    cod += tab + `${T1} = stackConsulta[(int)${T0}]; \n`    //capturamos lo que esta en stackConsulta
    cod += tab + `if (${T1} == -2) goto ${Lb}; \n`          //si stackConsulta no es -2
    cod += tab + `\n/* Cambio de entorno */\n`              //cambiamos de entorno
    cod += tab + `sp = sp + 1; \n`                          //enviamos un parametro
    cod += tab + `${T2} = sp + 0; \n`                       //posicion del parametro en el entorno
    cod += tab + `stack[(int)${T2}] = ${T1}; \n`            //guardamos el parametro en el stack
    cod += tab + `ImprimirAtributo(); \n`                   //call ImprimirConsulta
    cod += tab + `printf("%c", 10); \n`
    cod += tab + `sp = sp - 1; \n`                          //regresamos del entorno
    cod += tab + `${T0} = ${T0} + 1; \n`                    //aumentamos el contador para el stack consulta
    cod += tab + `goto ${La}; \n`                           //ciclo
    cod += tab + `${Lb}:; \n`                               //salimos del metodo
    cod += `\n}\n`
    return cod
}

export function ImprimirAtributo(){
    var T0 = newTemp(); var T1 = newTemp(); var T2 = newTemp();  var T3 = newTemp(); var T4 = newTemp(); var T5 = newTemp();
    var La = newLbl(); var Lb = newLbl();
    
    var cod = ''
    var tab = '\t'

    cod += `void ImprimirAtributo(){ \n`

    cod += tab + `\n/* Recibimiento de parametros */\n`
    cod += tab + `${T0} = sp + 0; \n`
    cod += tab + `${T1} = stack[(int)${T0}]; \n`
    cod += tab + `${T2} = stackAtributos[(int)${T1}]; \n`       //recojemos el indice de la respuesta (nombre del atributo)

    cod += tab + `${T1} = ${T1} + 1; \n` //nos movemos uno para encontrar el valor del atributo
    cod += tab + `${T3} = stackAtributos[(int)${T1}]; \n` //obtenemos el valor del atributo

    //imprimimos lo que haya en el heap en esa posicion
    cod += tab + `${La}: \n`
    cod += tab + `${T4} = heap[(int)${T3}]; \n`//mandamos a llamar a la referencia al heap general de ese valor
    cod += tab + `if (${T4} == -1) goto ${Lb}; \n`
    cod += tab + `printf("%c", (int)${T4}); \n`
    cod += tab + `${T3} = ${T3} + 1; \n`
    cod += tab + `goto ${La}; \n`
    cod += tab + `${Lb}:;`
    //the end
    cod += `\n}\n`
    return cod
}

export function leerHeap(){
    var Temp1 = newTemp();
    var Labl1 = newLbl();
    var Labl2 = newLbl();

    var str = 'void leerHeap(){ \n'
    str += `    ${Temp1} = 0; \n`
    //inicia el ciclo para leer el heap
    str += `    ${Labl1}: \n`
    str += `    if (${Temp1} == 50) goto ${Labl2}; \n`
    str += `    printf("%f -> %f \\n", ${Temp1}, heap[(int)${Temp1}]); \n`
    str += `    ${Temp1} = ${Temp1} + 1; \n`
    str += `    goto ${Labl1}; \n`
    str += `    ${Labl2}:; \n`
    str += `}\n `
    return str;
}

export function leerStack(){
    var Temp1 = newTemp();
    var Labl1 = newLbl();
    var Labl2 = newLbl();

    var str = 'void leerStack(){ \n'
    str += `    ${Temp1} = 0; \n`
    //inicia el ciclo para leer el heap
    str += `    ${Labl1}: \n`
    str += `    if (${Temp1} == 50) goto ${Labl2}; \n`
    str += `    printf("%f -> %f \\n", ${Temp1},stack[(int)${Temp1}]); \n`
    str += `    ${Temp1} = ${Temp1} + 1; \n`
    str += `    goto ${Labl1}; \n`
    str += `    ${Labl2}:; \n`
    str += `}\n `
    return str
}

export function leerHeapConsulta(){
    var Temp1 = newTemp();
    var Labl1 = newLbl();
    var Labl2 = newLbl();

    var str = 'void leerHeapConsulta(){ \n'
    str += `    ${Temp1} = 0; \n`
    //inicia el ciclo para leer el heap
    str += `    ${Labl1}: \n`
    str += `    if (${Temp1} == 50) goto ${Labl2}; \n`
    str += `    printf("%f -> %f \\n", ${Temp1},heapConsulta[(int)${Temp1}]); \n`
    str += `    ${Temp1} = ${Temp1} + 1; \n`
    str += `    goto ${Labl1}; \n`
    str += `    ${Labl2}:; \n`
    str += `}\n `
    return str
}

//tempCod.valor == sp+0

export function predicadoDecimal()
{
    let cod = ""

    let tab = "\t"
    var TP1 = newTemp(); var TP2 = newTemp(); var TP3 = newTemp(); var TP4 = newTemp();
    var TP5 = newTemp(); var TP6 = newTemp();

    var LP1 = newLbl(); var LP2 = newLbl(); var LP3 = newLbl(); var LP4 = newLbl(); var LP5 = newLbl();

    cod += `void predicadoDecimal() {\n`
    cod += tab + `${TP1} = stack[(int)sp];\n`
    cod += tab + `${TP2} = spc;\n`
    cod += tab + `${TP3} = 1;\n`
    cod += tab + `${LP3}:\n`
    cod += tab + `${TP4} = stackConsulta[(int)${TP2}];\n`
    cod += tab + `if( ${TP4} == -2 ) goto ${LP1};\n`
    cod += tab + `if( ${TP3} != ${TP1} ) goto ${LP2};\n`
    cod += tab + `stacX[(int)sx] = ${TP4};\n`
    cod += tab + `sx = sx + 1;\n`
    cod += tab + `stacX[(int)sx] = -2;\n`
    cod += tab + `goto ${LP1};\n`
    cod += tab + `${LP2}:\n`
    cod += tab + `${TP2} = ${TP2} + 1;\n`
    cod += tab + `${TP3} = ${TP3} + 1;\n`
    cod += tab + `goto ${LP3};\n`
    cod += tab + `${LP1}:\n`

    //Reemplazar el StackConsulta por el StackX
    cod += tab + `${TP4} = 0; \n`                        //contador para el stackX y stackConsulta
    cod += tab + `${LP4}: \n`
    cod += tab + `${TP5} = stacX[(int)${TP4}]; \n`
    cod += tab + `if (${TP5} == -2) goto ${LP5}; \n`      //si el stackX ya se termino vamos a LD
    cod += tab + `${TP6} = spc + ${TP4}; \n`              //posicion contador del stackConsulta
    cod += tab + `stackConsulta[(int)${TP6}] = ${TP5};\n`   //ponemos en el stackConsulta lo que habia en TQ
    cod += tab + `${TP4} = ${TP4} + 1; \n`                //aumentamos el contador de stackX
    cod += tab + `goto ${LP4}; \n`                       //vamos a comprobar si stackX tiene mas para guardar

    //se acabo el stackX, no hay mas para guardar
    cod += tab + `${LP5}: \n`    
    cod += tab + `${TP6} = spc + ${TP4};\n`
    cod += tab + `stackConsulta[(int)${TP6}] = -2;\n`
    cod += tab + `sx = 0; \n`
    cod += tab + `stacX[(int)sx] = -2; \n`
    cod += `}\n\n`

    return cod
}

//0 posicion stackConsulta
export function predicadoNodo()
{
    let cod = ""

    let tab = "\t"
    var TP1 = newTemp(); var TP2 = newTemp(); var TPC = newTemp(); var TP4 = newTemp(); var TP5 = newTemp();

    var LP1 = newLbl(); var LP3 = newLbl(); var LP2 = newLbl(); 

    cod += `void predicadoNodo() {\n`
    cod += tab + `${TP1} = stack[(int)sp];\n`
    cod += tab + `${TP2} = spc;\n`
    cod += tab + `${TPC} = spc;\n`
    cod += tab + `${LP2}:\n`
    cod += tab + `${TP4} = stackConsulta[(int)${TP1}];\n`
    cod += tab + `${TP5} = stackConsulta[(int)${TP2}];\n`
    cod += tab + `if( ${TP4} == -2 ) goto ${LP1};\n`
    cod += tab + `if( ${TP4} == 0) goto ${LP3};\n`
    cod += tab + `stackConsulta[(int)${TPC}] = ${TP5};\n`
    cod += tab + `${TPC} = ${TPC} + 1;\n`
    cod += tab + `${LP3}:\n`
    cod += tab + `${TP1} = ${TP1} + 1;\n`
    cod += tab + `${TP2} = ${TP2} + 1;\n`
    cod += tab + `goto ${LP2};\n`
    cod += tab + `${LP1}:\n`
    cod += tab + `stackConsulta[(int)${TPC}] = -2;\n`
    cod += `}\n\n`

    return cod
}


//Funciones nativas
export function funcText()
{
    var TT1 = newTemp(); var TT2 = newTemp(); var TT3 = newTemp(); var TT4 = newTemp();

    var LT1 = newLbl(); var LT2 = newLbl();  var LT3 = newLbl();  var LT4 = newLbl();  var LT5 = newLbl();
    let cod = ""
    //0 retorno
    cod += `void Text() {\n`
    cod += 
    `stack[(int)sp]=hp;
    ${TT1} = spc;
    ${LT5}:
    ${TT2} = stackConsulta[(int)${TT1}];
    if(${TT2} == -2 ) goto ${LT1};
    ${TT2} = ${TT2} + 3;
    ${TT3} = Indexes[(int)${TT2}];
    if(${TT3} == -2 ) goto ${LT2};
    ${LT4}:
    ${TT4} = heap[(int)${TT3}];
    if(${TT4} == -1) goto ${LT3};
    heap[(int)hp] = ${TT4};
    hp = hp + 1;
    ${TT3} = ${TT3} + 1;
    goto ${LT4};
    ${LT3}:
    heap[(int)hp] = 10;
    hp = hp + 1; 
    ${LT2}:
    ${TT1} = ${TT1} + 1;
    goto ${LT5};
    ${LT1}:
    heap[(int)hp] = -1;
    hp = hp + 1;
    `
    cod += `}\n\n`

    return cod
}

export function funcNumberToString(){
    
    var T10 = newTemp(); var T11 = newTemp(); TC3 = newTemp(); var T14 = newTemp();
    var Tcima = newTemp(); var TBase = newTemp(); var TC3 = newTemp();
    var Lj = newLbl(); var Li = newLbl(); var Lm = newLbl(); var Lk = newLbl();
    
    var cod = ''
    var tab = '\t'

    cod += `void NumberToString(){ \n`
    cod +=  tab + `${TBase} = sp + 0; \n` 
    cod +=  tab + `${Tcima} = ${TBase}; \n`
    cod +=  tab + `${T10} = stack[(int)${TBase}]; \n`       //capturamos el valor

    cod +=  tab + `${Lj}: \n`
    cod +=  tab + `${T11} = (int)${T10} % 10; \n`           //guardamos el residuo de hacer un mod 
    
    cod +=  tab + `if (${T10} == 0) goto ${Li}; \n`    //si el cociente es cero terminamos de guardar
    cod +=  tab + `${T10} = (int)${T10}/10; \n`        //guardamos el cociente la parte entera
    cod +=  tab + `stack[(int)${Tcima}] = ${T11}; \n`  //si no es cero, guardamos en el stack el cociente
    cod +=  tab + `${Tcima} = ${Tcima} + 1; \n`        //aumentamos el contador
    cod +=  tab + `goto ${Lj}; \n`

    cod +=  tab + `${Li}: \n`  //se termino el numero
    cod +=  tab + `${Tcima} = ${Tcima} - 1; \n`
    cod +=  tab + `${TC3} = hp; \n`
    cod +=  tab + `${Lm}: \n`
    cod +=  tab + `if (${Tcima} < ${TBase}) goto ${Lk}; \n` //recorremos el stack en forma invertida
    cod +=  tab + `${T14} = stack[(int)${Tcima}]; \n`
    cod +=  tab + `${T14} = ${T14} + 48; \n`
    cod +=  tab + `heap[(int)hp] = ${T14}; \n`   //metemos en el heap
    cod +=  tab + `hp = hp + 1; \n`
    cod +=  tab + `${Tcima} = ${Tcima} - 1; \n`
    cod +=  tab + `goto ${Lm}; \n`

    cod +=  tab + `${Lk}: \n`  //terminamos el numero invertido
    cod +=  tab + `heap[(int)hp] = -1; \n`
    cod +=  tab + `hp = hp + 1; \n`

    //retorno en la posicion
    cod += tab + `stack[(int)sp] = ${TC3}; \n`

    cod +=  tab + `\n}\n`
    return cod

}
export function funcLast()
{
    var TT0 = newTemp(); var TT1 = newTemp(); var TT2 = newTemp(); 
    var LT1 = newLbl(); var LT2 = newLbl(); 
    let cod = ""
    //0 retorno
    cod += `void Last() {\n`
    cod += 
    `${TT0} = 0;
    ${TT1} = spc;
    ${LT2}:
    ${TT2} = stackConsulta[(int)${TT1}];
    if(${TT2} == -2 ) goto ${LT1};
    ${TT0} = ${TT0} + 1;
    ${TT1} = ${TT1} + 1;
    goto ${LT2};
    ${LT1}:
    stack[(int)sp] = ${TT0};
    `
    cod += `}\n\n`

    return cod
}

export function funcUpperCase()
{
    var TC0 = newTemp();
    var TT0 = newTemp(); var TTS=newTemp(); var TT1 = newTemp(); var TT2 = newTemp(); 
    var LT1 = newLbl(); var LT2 = newLbl(); var LT3 = newLbl();
    let cod = ""
    //0 retorno
    //1 apuntador al heap
    cod += `void UpperCase() {\n`
    cod += 
    `${TC0} = hp;
    ${TT0} = sp + 1;
    ${TTS} = stack[(int)${TT0}];
    ${LT3}:
    ${TT1} = heap[(int)${TTS}];
    if(${TT1} == -1) goto ${LT1};
    if(${TT1} < 97 ) goto ${LT2};
    if(${TT1} > 122) goto ${LT2};
    ${TT1} = ${TT1} - 32;
    ${LT2}:
    heap[(int)hp] = ${TT1};
    hp = hp + 1;
    ${TTS} = ${TTS} + 1;
    goto ${LT3};
    ${LT1}:
    heap[(int)hp] = -1;
    hp = hp + 1;
    stack[(int)sp] = ${TC0};
    `
    cod += `}\n\n`

    return cod
}

export function funcLowerCase()
{
    var TC0 = newTemp();
    var TT0 = newTemp(); var TTS=newTemp(); var TT1 = newTemp(); var TT2 = newTemp(); 
    var LT1 = newLbl(); var LT2 = newLbl(); var LT3 = newLbl();
    let cod = ""
    //0 retorno
    //1 apuntador al heap
    cod += `void LowerCase() {\n`
    cod += 
    `${TC0} = hp;
    ${TT0} = sp + 1;
    ${TTS} = stack[(int)${TT0}];
    ${LT3}:
    ${TT1} = heap[(int)${TTS}];
    if(${TT1} == -1) goto ${LT1};
    if(${TT1} < 65 ) goto ${LT2};
    if(${TT1} > 90) goto ${LT2};
    ${TT1} = ${TT1} + 32;
    ${LT2}:
    heap[(int)hp] = ${TT1};
    hp = hp + 1;
    ${TTS} = ${TTS} + 1;
    goto ${LT3};
    ${LT1}:
    heap[(int)hp] = -1;
    hp = hp + 1;
    stack[(int)sp] = ${TC0};
    `
    cod += `}\n\n`

    return cod
}

export function funcSubStr_int()
{
    var TC0 = newTemp();
    var TT0 = newTemp(); var TT1 = newTemp(); var TT2 = newTemp(); var TT3 = newTemp(); var TT4 = newTemp();
    var TT5 = newTemp();  
    var LT1 = newLbl(); var LT2 = newLbl(); var LT3 = newLbl();
    let cod = ""
    //0 retorno
    //1 apuntador al heap
    //2 limite inferior
    cod += `void SubString_int() {\n`
    cod += 
    `${TC0} = hp;
    ${TT0} = sp + 2;
    ${TT1} = stack[(int)${TT0}];
    ${TT2} = sp + 1;
    ${TT3} = stack[(int)${TT2}];
    ${TT4} = 1;
    ${LT3}:
    ${TT5} = heap[(int)${TT3}];
    if( ${TT5} == -1 ) goto ${LT1};
    if( ${TT4} >= ${TT1} ) goto ${LT2};
    ${TT4} = ${TT4} + 1;
    ${TT3} = ${TT3} + 1;
    goto ${LT3};
    ${LT2}:
    heap[(int)hp] = ${TT5};
    hp = hp + 1;
    ${TT4} = ${TT4} + 1;
    ${TT3} = ${TT3} + 1;
    goto ${LT3};
    ${LT1}:
    heap[(int)hp] = -1;
    hp = hp + 1;
    stack[(int)sp] = ${TC0};
    `
    cod += `}\n\n`

    return cod
}

export function funcSubStr_int_int()
{
    var TC0 = newTemp();
    var TT_2 = newTemp(); var TT_1 = newTemp();
    var TT0 = newTemp(); var TT1 = newTemp(); var TT2 = newTemp(); var TT3 = newTemp(); var TT4 = newTemp();var TT_3 = newTemp();
    var TT5 = newTemp();  
    var LT1 = newLbl(); var LT2 = newLbl(); var LT3 = newLbl();
    let cod = ""
    //0 retorno
    //1 apuntador al heap
    //2 limite inferior
    //3 limite superior
    cod += `void SubString_int_int() {\n`
    cod += 
    `${TC0} = hp;
    ${TT_2} = sp + 3;
    ${TT_1} = stack[(int)${TT_2}];
    ${TT0} = sp + 2;
    ${TT1} = stack[(int)${TT0}];
    ${TT2} = sp + 1;
    ${TT3} = stack[(int)${TT2}];
    ${TT4} = 1;
    ${TT_3} = 1;
    ${LT3}:
    ${TT5} = heap[(int)${TT3}];
    if( ${TT5} == -1 ) goto ${LT1};
    if( ${TT4} >= ${TT1} ) goto ${LT2};
    ${TT4} = ${TT4} + 1;
    ${TT3} = ${TT3} + 1;
    goto ${LT3};
    ${LT2}:
    if( ${TT_3} > ${TT_1} ) goto ${LT1};
    heap[(int)hp] = ${TT5};
    hp = hp + 1;
    ${TT_3} = ${TT_3} + 1;
    ${TT4} = ${TT4} + 1;
    ${TT3} = ${TT3} + 1;
    goto ${LT3};
    ${LT1}:
    heap[(int)hp] = -1;
    hp = hp + 1;
    stack[(int)sp] = ${TC0};
    `
    cod += `}\n\n`

    return cod
}
