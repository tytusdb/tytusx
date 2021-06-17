import { AST } from "../CLASES/AST";
import { Ambito } from "../CLASES/Ambito";
import { Simbolo } from "../CLASES/Simbolo";
import { Tipo } from "../CLASES/Tipo";
import { Atributo } from "../CLASES/Atributo";
//import { Objeto } from "../CLASES/Objeto";
import { Instruccion } from "../CLASES/Instruccion";

const gramatica1 = require('../xml/GRAMATICAS/gramatica1');
const gramatica = require('../xpath/Gramatica/gramatica');

function ejecutarCodigo(txml: string, txpath: string){
    var entradaXML = txml;
    var entradaQuery = txpath;
    const xml = gramatica1.parse(entradaXML);
    const query = gramatica.parse(entradaQuery);
    const entornoGlobal:Ambito = new Ambito(null);

    xml.array.forEach((elemento:Atributo) => {
        console.log(elemento.identificador);
    });

}

ejecutarCodigo(`
<?xml version="1.0" encoding="UTF-8"?>

<bookstore>

<book>
  <title lang="en">Harry Potter</title>
  <price>29.99</price>
</book>

<book>
  <title lang="en">Learning XML</title>
  <price>39.95</price>
</book>

</bookstore> 
`,
`bookstore/book`);
