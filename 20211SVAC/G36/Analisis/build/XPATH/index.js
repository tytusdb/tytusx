var parser = require("./core/analisys/grammar").parser;

let ejemplo = `//mundo/continente[last()]`;


function exec (input) {
    return parser.parse(input);
}


function busqueda(nodo){

}

let result = exec(ejemplo);
//console.log(result.errores.length <= 0 ? result.res.xPathResult : result.errores );

console.log(result.errores.length <= 0 ? result.res.astGraph : result.errores );


//console.log(tabla0);

/*


*/