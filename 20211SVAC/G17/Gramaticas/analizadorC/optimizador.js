

class Optimizador {
    textoOptimizar = ''
    textoOptimizado = ''
    textoSplit = []


    constructor (str){
        this.textoOptimizar = str
    }

    optimizar(){
        this.textoOptimizado = this.textoOptimizar
        this.textoSplit = this.textoOptimizado.split('\n')

        

        return textoOptimizado
    }

    quitarConReemplazo(){
        // quitar más cero
        let regExp = new RegExp('+0')
        this.textoOptimizado.replace('+ 0','')

        // quitar menos cero

        // quitar dividido 1

        

    }

}