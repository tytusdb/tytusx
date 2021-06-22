let traductor = new Traduccion();


//let ref1 = traductor.traducirCadena("hola");
//let ref2 = traductor.traducirCadena("Cadena");
//console.log(traductor.obtenerCodigo());

//traductor.obtenerCadena(ref1);
//console.log("-----");
//traductor.obtenerCadena(ref2);

let ref1 = traductor.traducirNumero(65);
let ref2 = traductor.traducirCadena("Ahjk");
let ref3 = traductor.traducirNumero(12.4);
let ref4 = traductor.traducirCadena("Cadena");
let ref5 = traductor.traducirNumero(30);


console.log(traductor.obtenerCodigo());

