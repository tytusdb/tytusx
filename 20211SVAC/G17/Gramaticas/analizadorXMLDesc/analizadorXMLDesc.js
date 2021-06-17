var parser = require('./grammarDesc')

function Ejecutar(contenido){
    var resultado = parser.parse(contenido)
    console.log(JSON.stringify(resultado))
    return resultado
}

exports.Ejecutar = Ejecutar