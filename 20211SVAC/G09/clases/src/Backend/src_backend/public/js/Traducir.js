function Traducir() {
    if (!editor.getValue()) {
        alert("NO HAY NADA PARA ANALIZAR");
        return;
    }
    $.ajax({
        url: "/Ejecutar",
        type: "post",
        data: { entrada: editor.getValue() },
    }).done(function(res) {
        console.log(res)
        editor4D.setValue(res.data.Cuadruplos);
        var divSimbol = document.getElementById('Simbolos');
        var divErrores = document.getElementById('Errores');
        divSimbol.innerHTML = res.data.Simbolos;
        divErrores.innerHTML = res.data.Errores;
        setTimeout(function() {
            editor4D.refresh();
        }, 1);
    });
}

function MostrarErrores() {
    console.log("Clic! MostrarErrores");
}

function MostrarSimbolos() {
    console.log("Clic! MostrarSimbolos");
}