/* FUNCIONES PARA EJECUCIÓN DE XQUERY */
const parseXQUERY = function(entrada){
    var mensajeConsola = "";
    try {
        console.log("***************************************************\n");
        console.log("**************ANALISIS DE XQUERY*******************\n");
        document.getElementById('consola').innerHTML += "\n>**********************************************\n"
                                                        + ">**************ANALISIS DE XQUERY***********\n";
        try {
            let resultado = gramaticaXQUERY.parse(entrada);
            if (resultado != undefined){
                console.log(">Se ejecutó correctamente el parser de XQUERY.\n");
                document.getElementById('consola').innerHTML += ">Se ejecutó correctamente el parser de XQUERY. \n";
            }else{
                console.log(">Undefinde Se ejecutó correctamente el parser de XQUERY.\n");
                document.getElementById('consola').innerHTML += ">Undefinded Se ejecutó correctamente el parser de XQUERY. \n";
            }
        } catch (e) {
            console.log(">[ERROR]:Ocurrió un error en el parseo del contenido XQUERY\n");
                document.getElementById('consola').innerHTML += ">[ERROR]:Ocurrió un error en el parseo del contenido XQUERY \n";
        }
    } catch (error) {
        document.getElementById('consola').innerHTML += ">" + error.toString(); 
    }
}

/* codemirror para textarea de XQUERY */
var code2 = document.getElementById("EntradaXQuery");
var editor2 = CodeMirror.fromTextArea(code2, {
    height: "350px;",
        mode: "text/x-sql",
        lineNumbers: true
});

function showCodeXQuery(){
    var text = editor2.getValue();
    return text;
}

