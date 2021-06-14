//------------------------------Scripts para el reportes.html------------------------------------

var valorTabla = 0

function llenarTablaReportes() {
    valorTabla=1
   manejoTablas()
}
function llenarTablaErrores() {
    valorTabla=2
   manejoTablas()
}

function manejoTablas() {
    if (valorTabla == 1) {
        document.getElementById("tablasimbolos").innerHTML = myBundle.cadenaReporteTS
    } else if (valorTabla == 2) {
        var cadenaError = myBundle.reporteTablaErrores()
        document.getElementById("tablasimbolos").innerHTML = cadenaError
    }
}