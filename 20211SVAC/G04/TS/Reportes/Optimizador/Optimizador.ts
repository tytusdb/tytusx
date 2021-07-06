class Optimizador{
    run():void{
        const texto: HTMLTextAreaElement = document.getElementById('resultC3D') as HTMLTextAreaElement;
        try{
            // @ts-ignore
            let salida = analizadorOptimizador.parse(texto.value);
            texto.value = salida.codigo;
            agregarReporteOptimizacion(salida.reporte);
        } catch (err) {
            console.log(err);
        }
    }
}