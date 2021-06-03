var parser = require('./grammar')
var helpers = require('./helpers')


var conteindo = helpers.getContentByFile('test1.xml')
var resultado = parser.parse(conteindo)
console.log('Resultado')
console.log(JSON.stringify(resultado))
