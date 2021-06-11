var parser = require('./grammarDesc')


var conteindo = `<biblioteca>
<libro>
  <titulo>La vida está en otra parte</titulo>
  <autor>Milan Kundera</autor>
</libro>
</biblioteca>`
var resultado = parser.parse(conteindo)
console.log('Resultado')
console.log(JSON.stringify(resultado))