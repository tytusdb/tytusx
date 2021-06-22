let traductor = new Traduccion();


let ref1 = traductor.traducirCadena("hola 123 2");
let ref2 = traductor.traducirCadena("Cadena qwe @");
//console.log(traductor.obtenerCodigo());

traductor.obtenerCadena(ref1);
console.log("-----");
traductor.obtenerCadena(ref2);