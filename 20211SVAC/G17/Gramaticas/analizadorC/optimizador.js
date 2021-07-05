const analizadorC = require('./c')

export class Optimizador {
    textoOptimizar = ''
    textoOptimizado = ''
    textoSplit = []


    constructor (str){
        this.textoOptimizar = str
    }

    optimizar(){
        this.textoOptimizado = ''
        
        
        var newInstrucciones = []
        var ResultadoParse = analizadorC.parse(this.textoOptimizar)
        var instrucciones = ResultadoParse.ins
        // antiguas instrucciones
        console.log('vijas instrucciones');
        console.log(instrucciones);
        this.textoOptimizado = ''
        for (var instruccion of instrucciones) {
            newInstrucciones.push(instruccion.optimizar())
        }

        for (const instruccion of newInstrucciones) {
            this.textoOptimizado += instruccion.tresd()
        }

        this.textoOptimizado = ResultadoParse.lib + '\n' + this.textoOptimizado
        // nuevas instrucciones
        console.log('nuevas instrucciones');
        console.log(newInstrucciones);
        console.log('nuevo texto');
        console.log(this.textoOptimizado);
        return this.textoOptimizado
    }
}