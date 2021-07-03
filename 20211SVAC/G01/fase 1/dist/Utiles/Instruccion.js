//import { xmlDerecha } from '../Gramatica/xmlDerecha.js';

let headers = document.getElementById('headers');
let tablasimbolos = document.getElementById('simbolos');
let listasimbolos = [];

function prueba()
{
    var x = document.getElementById("txml").value;
    var y = document.getElementById("consulta").value;
    console.log("xml: " + x);
    console.log("Con: " + y);
    var p = new DOMParser();
    var xml = p.parseFromString(x, "text/xml");
    var result = xml.evaluate(y, xml, null, XPathResult.ANY_TYPE, null);
    var uno = result.iterateNext();
    var salida = [];
    while(uno)
    {
        salida.push(uno.textContent + "\n");
        uno = result.iterateNext();
        
    }
    var texto = salida.join("");  
    document.getElementById('salida').value = texto; 
    parseXML();
    
}

function Limpiar()
{
    document.getElementById("salida").value = "";
    document.getElementById("grama").value = "";
    document.getElementById("errores").value = "";

}

function parseXML()
{
    var x = document.getElementById("txml").value;
    var y = XMLasc.parse(x);

    var result = [];
    var keys = Object.keys(y);
    keys.forEach(function(key){
        result.push(y[key]);
    });

    const sal = JSON.stringify(y);
    document.getElementById('grama').value =JSON.stringify(result[1]);
    graficarArbol(y.json.nodo);

    ts = new TablaSimbolos(y.json);
    ts = ts.generarTabla();

    if(JSON.stringify(result[3]) == "[]")
    {
        document.getElementById("errores").value = "No se han encontrado errores! :D";
    }
    else
    {
        document.getElementById('errores').value =JSON.stringify(result[3]);
    }

    tablasimbolos.innerHTML = "";
    headers.innerHTML = `
    <th scope="col">Nombre</th>
    <th scope="col">Tipo</th>
    <th scope="col">Ambito</th>
    <th scope="col">Fila</th>
    <th scope="col">Columna</th>
    <th scope="col">Valor</th>
    <th scope="col">Indice</th>
    `;

    listasimbolos.forEach(simbolo => {
        simbolos.innerHTML += `
          <tr>
            <td>${simbolo.nombre}</td>
            <td>${simbolo.tipo}</td>
            <td>${simbolo.ambito}</td>
            <td>${simbolo.fila}</td>
            <td>${simbolo.columna}</td>
            <td>${simbolo.valor}</td>
            <td>${simbolo.indice === -1 ? '' : simbolo.indice}</td>
          </tr>
        `;
    });

}

simple_chart_config = {
    chart: {
        container: "#tree-simple",

        connectors: {
            type: "step"
        },


        node: {
			HTMLclass: "nodeStyle"
		}
    },
    
    nodeStructure: {
        text: {name: "RAIZ"}   
    }
};



function generarArbol(nodoRaiz) {
    

    let rootNode = {
        text: {name: nodoRaiz.valor},
        children: []
    }

    if(nodoRaiz.hijos) {
        nodoRaiz.hijos.forEach(hijo => {
            
            rootNode.children.push(generarArbol(hijo));
        });
    }

    return rootNode;
}

function graficarArbol(nodoRaiz) {
    let raiz = generarArbol(nodoRaiz);
    simple_chart_config.nodeStructure = raiz;
    new Treant(simple_chart_config);
}