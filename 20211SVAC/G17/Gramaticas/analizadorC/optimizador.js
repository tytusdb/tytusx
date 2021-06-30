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
        var instrucciones = analizadorC.parse(this.textoOptimizar)
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

        // nuevas instrucciones
        console.log('nuevas instrucciones');
        console.log(newInstrucciones);
        console.log('nuevo texto');
        console.log(this.textoOptimizado);
        return this.textoOptimizado
    }
}