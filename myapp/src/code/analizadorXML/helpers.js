class nodo {
    constructor(linea,columna)
    {
        this.linea=linea
        this.columna=columna
    }
}





class Objeto extends nodo {
    tipo = ''
    texto = ''
    atributos = []
    hijos = []
    
    
    constructor(tipo, atributos, hijos, linea, columna){
        super(linea,columna)
        this.tipo = tipo.replace('<','')
        this.atributos = atributos
        
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

class Atributo extends nodo {
    nombre =''
    valor = ''

    constructor(nombre, valor, linea, columna){
        super(linea,columna)
        this.nombre = nombre
        this.valor = valor
    }
}

/*
const _Objeto = Objeto
export { _Objeto as Objeto }
const _Atributo = Atributo
export { _Atributo as Atributo }
*/

exports.Objeto = Objeto
exports.Atributo = Atributo
