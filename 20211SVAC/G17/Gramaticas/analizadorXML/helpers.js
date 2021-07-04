var C3D = require('../C3D')

export class nodo {
    constructor(linea,columna)
    {
        this.linea=linea
        this.columna=columna
    }
}

export class ObjetoPrincipal extends nodo {
    tipo = ''
    texto = ''
    atributos = []
    hijos = []
    posTipo = 0;
    posTexto = 0;

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

        var refPadres = []

        var temphijo = '-2' 
        if(this.hijos.length > 0){

            temphijo = C3D.getReferencia(`sh`)
            for (const iterator of this.hijos) {
                C3D.agregarComentario(`guardando hijo: ${iterator.tipo}`)
                C3D.guardarStackHijos(iterator.ref)
                refPadres.push(iterator.refPadre)
            }

            C3D.addCodigo3D(`stackHijos[(int)sh] = -2; \n sh = sh + 1; \n`);
        }

        /* C3D */
        // ajustar posición respecto a stack pointer
        this.posTipo = C3D.getNextSP()

        C3D.agregarComentario(`** agregando "${this.tipo}" **`);
        var tempTipo = C3D.guardarString(this.posTipo, this.tipo);

        this.ref = C3D.getReferencia(`si`)
        C3D.guardarIndexRaiz(tempTipo, '-2', temphijo, '-2')

        C3D.addCodigo3D(`stack[(int)sp] = ${this.ref}; \n`)

        for (const iterator of refPadres) {
            C3D.addCodigo3D(`Indexes[(int)${iterator}] = ${this.ref}; \n`);
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

export class Objeto extends nodo {
    tipo = ''
    texto = ''
    atributos = []
    hijos = []
    posTipo = 0;
    posTexto = 0;

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

        var tempAtri = '-2' 
        var tempPadreAtri = []
        if(this.atributos.length > 0){

            tempAtri = C3D.getReferencia(`sa`)
            for (const iterator of this.atributos) {
                C3D.agregarComentario(`guardando atributo: ${iterator.nombre}`)
                C3D.guardarStackAtri(iterator.Temp1)
                C3D.agregarComentario(`guardando valor atributo: ${iterator.valor}`)
                C3D.guardarStackAtri(iterator.Temp2)
                C3D.agregarComentario(`guardando padre del atributo`)
                tempPadreAtri.push(C3D.getReferencia(`sa`));
                C3D.guardarStackAtri("-2")

            }
            C3D.addCodigo3D(`stackAtributos[(int)sa] = -2; \n sa = sa + 1; \n`);
        }

        var refPadres = []

        var temphijo = '-2' 
        if(this.hijos.length > 0){

            temphijo = C3D.getReferencia(`sh`)
            for (const iterator of this.hijos) {
                C3D.agregarComentario(`guardando hijo: ${iterator.tipo}`)
                C3D.guardarStackHijos(iterator.ref)
                refPadres.push(iterator.refPadre)
            }

            C3D.addCodigo3D(`stackHijos[(int)sh] = -2; \n sh = sh + 1; \n`);
        }

        /* C3D */
        // ajustar posición respecto a stack pointer
        this.posTipo = C3D.getNextSP()
        this.posTexto = C3D.getNextSP()

        C3D.agregarComentario(`** agregando "${this.tipo}" **`);
        var tempTipo = C3D.guardarString(this.posTipo, this.tipo);

        var tempTexto = '-2'
        if(this.texto != ''){
            C3D.agregarComentario(`** agregando "${this.texto}" **`);
            tempTexto = C3D.guardarString(this.posTexto, this.texto);
        }      
        this.ref = C3D.getReferencia(`si`)
        this.refPadre = C3D.guardarIndexes(tempTipo, tempAtri, temphijo, tempTexto);

        for (const iterator of tempPadreAtri) {
            C3D.addCodigo3D(`stackAtributos[(int)${iterator}] = ${this.ref}; \n`);
        }

        for (const iterator of refPadres) {
            C3D.addCodigo3D(`Indexes[(int)${iterator}] = ${this.ref}; \n`);
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
    posNombre = 0;
    posValor = 0;

    constructor(nombre, valor, linea, columna){
        super(linea,columna)
        this.nombre = nombre
        this.valor = valor

        // ajustar posición respecto a stack pointer
        this.posNombre = C3D.getNextSP()
        this.posValor = C3D.getNextSP()

        C3D.agregarComentario(`** agregando ${this.nombre} **`);
        this.Temp1 = C3D.guardarString(this.posNombre, this.nombre);

        C3D.agregarComentario(`** agregando ${this.valor} **`);
        this.Temp2 = C3D.guardarString(this.posValor, this.valor);
        
    }

}

export function CambiarCodificacion (contenido, tipoCodificacion) {
    //var buffer = Buffer.from(contenido)
    var iconv = require('iconv-lite');
    switch(tipoCodificacion.toLowerCase()){
        case "utf8":
        case "utf-8":
            contenido = iconv.decode(contenido, "utf-8");
            break
        case "utf-16le":
        case "utf16le":
            contenido = iconv.decode(contenido, "utf-16le");
            break
        case "utf-16be":
        case "utf16be":
            contenido = iconv.decode(contenido, "utf-16be");
            break
        case "utf-16":
        case "utf-16":
            contenido = iconv.decode(contenido, "utf-16");
            break;
        case "ascii":
            contenido = iconv.decode(contenido, "ascii");
            var utf16beexists=iconv.encodingExists("ascii")
        case "iso-8859-1":
            contenido = iconv.decode(contenido, "ISO-8859-1");
            // const bytes = stringToBytes(contenido);
            // const blob = new Blob([bytes.buffer], { type: 'text/plain; charset=ISO-8859-1' });
            // contenido = buffer.toString("")
        break;
        default:
            //alert('No se ha logrado identificar el tipo de codificación del archivo, se usará por defect UTF-8.')
            contenido = iconv.decode(contenido, "utf-8");
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