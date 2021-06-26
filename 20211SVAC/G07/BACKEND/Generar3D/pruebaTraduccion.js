let traductorC3D = new Traduccion();


let ref1 = traductorC3D.traducirNumero(150);
let ref2 = traductorC3D.traducirCadena("Spiderman");
let ref3 = traductorC3D.traducirNumero(500);
let ref4 = traductorC3D.traducirCadena("Attack on Titan");




traductorC3D.traducirFuncion('<book pages="');
traductorC3D.imprimirNumero(ref1);
traductorC3D.traducirFuncion('">');
traductorC3D.imprimirCadena(ref2);
traductorC3D.traducirFuncion(`</book>\n`);

traductorC3D.traducirFuncion('<book pages="');
traductorC3D.imprimirNumero(ref3);
traductorC3D.traducirFuncion('">');
traductorC3D.imprimirCadena(ref4);
traductorC3D.traducirFuncion(`</book>\n`);


traductorC3D.traducirFuncion('<book pages="');
traductorC3D.imprimirNumero(ref1);
traductorC3D.traducirFuncion('">');
traductorC3D.imprimirCadena(ref4);
traductorC3D.traducirFuncion(`</book>\n`);



console.log(traductorC3D.obtenerCodigo());