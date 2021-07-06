class Optimizador {
    run() {
        const texto = document.getElementById('resultC3D');
        try {
            // @ts-ignore
            let salida = analizadorOptimizador.parse(texto.value);
            texto.value = salida.codigo;
            agregarReporteOptimizacion(salida.reporte);
        }
        catch (err) {
            console.log(err);
        }
    }
}
