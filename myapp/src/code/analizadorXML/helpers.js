var fs = require('fs')

class Objeto {
    tipo = ''
    texto = ''
    atributos = []
    hijos = []
    
    constructor(tipo, atributos, hijos){
        this.tipo = tipo.replace('<','')
        this.atributos = atributos
        
        if (hijos instanceof Array){
            this.hijos = hijos
        }else{
            this.texto = hijos
        }
    }
}

class Atributo {
    nombre =''
    valor = ''

    constructor(nombre, valor){
        this.nombre = nombre
        this.valor = valor
    }
}

function getContentByFile(path){
    var retorno = ''

    try {
        retorno = fs.readFileSync(path, 'utf8')
    } catch (err) {
        console.error(err)
    }

    return retorno
}

exports.getContentByFile = getContentByFile
exports.Objeto = Objeto
exports.Atributo = Atributo

