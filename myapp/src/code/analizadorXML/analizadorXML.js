var parser = require('./grammar')
var helpers = require('./helpers')

function Ejecutar(contenido){
    // primer pasada
    var resultado = parser.parse(contenido)
    var tipoCodificacion = parser.tipoCodificacion
    contenido = helpers.CambiarCodificacion(contenido, tipoCodificacion)
    

    // segunda pasada
    var resultado = parser.parse(contenido)
    console.log(JSON.stringify(resultado.datos))
    return resultado
}

exports.Ejecutar = Ejecutar