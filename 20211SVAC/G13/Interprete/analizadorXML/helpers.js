class nodo {
    constructor(linea,columna)
    {
        this.linea=linea
        this.columna=columna
    }
}
module.exports.nodo = nodo;

class Objeto extends nodo {
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
module.exports.Objeto = Objeto;

class Atributo extends nodo {
    nombre =''
    valor = ''

    constructor(nombre, valor, linea, columna){
        super(linea,columna)
        this.nombre = nombre
        this.valor = valor
    }
}
module.exports.Atributo = Atributo;

function CambiarCodificacion (contenido, tipoCodificacion) {
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
module.exports.CambiarCodificacion = CambiarCodificacion;