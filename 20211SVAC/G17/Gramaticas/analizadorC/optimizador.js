const analizadorC = require('./c')

export class Optimizador {
    textoOptimizar = ''
    textoOptimizado = ''
    textoSplit = []


    constructor (str){
        this.textoOptimizar = str
    }

    optimizar(){
        this.textoOptimizado = this.textoOptimizar
        
        
        var instrucciones = analizadorC.parse(this.textoOptimizado)
        console.log(instrucciones);

        return this.textoOptimizado
    }
}