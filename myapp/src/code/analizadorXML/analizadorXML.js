var parser = require('./grammar')
var helpers = require('./helpers')

function Ejecutar(contenido){
    // segunda pasada
    var resultado = parser.parse(contenido)
    console.log(JSON.stringify(resultado.datos))
    return resultado
}

exports.Ejecutar = Ejecutar