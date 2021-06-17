/***********************************************FUNCIONES ESPECÍFICAS DE XPATH*********************************************************** */
//Función para ejecutar el parser del analizador XPATH de jison
const parseXPath = function (entrada) {
    var mensajeConsola = "";
    try {
        console.log("Ingresó a la función parseXML" + new Date());
        document.getElementById('consola').innerHTML += ">Intentando analizar XPATH (" + new Date() + ") \n";
        try {
            let resultado = gramaticaXPATH.parse(entrada);            
            //alert("analizo");
            if (resultado) {
                //alert("resultado ok");
                document.getElementById('consola').value += ">Se ejecutó el parser";
                console.info('Entrada fue parseada correctamente!!!!');
                document.getElementById('consola').value += ">Entrada parseada correctamente! \n";
            } else {
                console.info('No se ejecutó la clase parser de XPATH');
            }
            return resultado;
        } catch (e) {
            document.getElementById('consola').value += ">Error al parsear la entrada: \n>" + e.toString() + "\n";
            throw ('Error al parserar la entrada: ' + e);
        }
    } catch (error) {
        console.log(error);
        if (!error)
            document.getElementById('consola').value += ">"+error.toString() + "\n";
    }

};