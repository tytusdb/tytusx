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

const _Objeto = Objeto
export { _Objeto as Objeto }
const _Atributo = Atributo
export { _Atributo as Atributo }

