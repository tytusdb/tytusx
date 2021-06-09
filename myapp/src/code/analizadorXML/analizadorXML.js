var parser = require('./grammar')
var helpers = require('./helpers')

function Ejecutar(contenido){
    //console.log(contenido)
    var resultado = parser.parse(contenido)
    console.log(JSON.stringify(resultado.datos))
    return resultado
}

exports.Ejecutar = Ejecutar