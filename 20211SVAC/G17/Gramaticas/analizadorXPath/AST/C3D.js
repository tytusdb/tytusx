// código tres direccciones xml
var contador = -1;  // contador de temporales
var cntLbl = 0      // contador de labels
var hp = 0;         // apuntador del heap
var sp = 0;         // apuntador cima del stack pointer
var c3d = '';       // contenido de código tres direcciones
var str3d = ''      // contenido tres direcciones de xpath

export function getNextSP(){
    return sp ++
}


export function newTemp(){
    contador++
    return 'T'+contador    
}

function newLbl(){
    return cntLbl ++
}

export function clearC3D(){
    contador = 0;
    c3d = '';
    hp = 0;
    sp = 0;
}

export function clearXPTC3D(){
    str3d = ''
}

function agregarEncabezado(){
    let encab = `#include <stdio.h>\n#include <math.h>\ndouble heap[30101999];\ndouble stack[30101999];\ndouble hp;\ndouble sp;\ndouble T0`
    //Lista de temporales
    for (let index = 1; index <= contador; index++) {
        encab += `, T${index}`        
    }
    encab += `;\n\n`
    return encab;
}

export function guardarString(posicion, texto){
    
    let nombre = texto+"#"
    let Tinicio = newTemp();
    c3d += `${Tinicio} = hp; \n`
    //para cada letra/caracter un espacio en el heap
    for (const letra of nombre) {

        var ascci = letra.charCodeAt(0);        
        c3d += `heap[(int)hp] = ${ascci}; \n`
        c3d += `hp = hp + 1; \n`
    }
    //al finalizar hacer referencia al stack
    let Tref =  newTemp();
    c3d += `${Tref} = sp + ${posicion}; \n`
    c3d += `stack[(int)${Tref}] = ${Tinicio}; \n` // posición en stack donde empieza strig en heap
    c3d += `\n`

    return Tref
}

export function agregarComentario(){
    c3d += `/*${arguments[0]}*/ \n`
}

export function getC3D(){
    return c3d
}

export function getFullC3D(){
    var retorno = ''

    retorno += agregarEncabezado()

    retorno += '\n\nint main() {\n'

    retorno += c3d
    retorno += str3d

    retorno += '\n\t\treturn 0;\n\n'
    retorno += '}'

    //clearC3D()
    return retorno
}


// código tres direcciones xpath

export function addC3D (str){
  str3d += str +'\n'
}

export class Retorno {
    valor = '';
    tipo = '';
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
// vianny


// david
