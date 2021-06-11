export class nodo {
    constructor(linea,columna)
    {
        this.linea=linea
        this.columna=columna
    }
}


export class Objeto extends nodo {
    tipo = ''
    texto = ''
    atributos = []
    hijos = []
    
    constructor(tipo, atributos, hijos, linea, columna, texto = ''){
        super(linea,columna)
        this.tipo = tipo.replace('<','')
        this.atributos = atributos
        this.texto = texto
        if (hijos instanceof Array){
            this.hijos = hijos
        }else{
            this.texto = hijos
        }
    }

    setTipo(tipo){
        this.tipo = tipo.replace('</','')
    }

    getTextoRelativo(){
        // recorrer insertar el valor actual
        var retorno = []
        if (this.texto != '') retorno.push(this.texto)

        // recorrer hijos
        for (var hijo of this.hijos){
            var retornoHijo = hijo.getTextoRelativo()
            retorno = retorno.concat(retornoHijo)
        }
        return retorno
    }
}

export class Atributo extends nodo {
    nombre =''
    valor = ''

    constructor(nombre, valor, linea, columna){
        super(linea,columna)
        this.nombre = nombre
        this.valor = valor
    }
}

export function CambiarCodificacion (contenido, tipoCodificacion) {
    var buffer = Buffer.from(contenido)
    switch(tipoCodificacion){
        case "utf8":
            contenido = buffer.toString("utf8")
        break;
        case "utf16le":
            contenido = buffer.toString("utf16le")
        break;
        case "ascii":
            contenido = buffer.toString("ascii")
        break;
        default:
            //alert('No se ha logrado identificar el tipo de codificación del archivo, se usará por defect UTF-8.')
            contenido = buffer.toString("utf8")
    }

    return contenido
}

/*
const _Objeto = Objeto
export { _Objeto as Objeto }
const _Atributo = Atributo
export { _Atributo as Atributo }
const _Atributo = Atributo
export { _Atributo as Atributo }
*/

//exports.Objeto = Objeto
//exports.Atributo = Atributo
//exports.CambiarCodificacion = CambiarCodificacion