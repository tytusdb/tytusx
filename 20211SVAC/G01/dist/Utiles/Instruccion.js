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
    
}