var cParser = require('./c')

var resultado = cParser.parse(
`
double sp;
double T0, T1, T2, T3, T4, T5, T6, T7;
`
)

console.log(resultado);