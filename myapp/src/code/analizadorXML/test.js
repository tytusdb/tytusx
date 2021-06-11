var parser = require('./grammar')
var helpers = require('./helpers')


var contenido = '<etiqueta astribu="asdf">'
console.log(helpers.CambiarCodificacion(contenido, "ascii"))