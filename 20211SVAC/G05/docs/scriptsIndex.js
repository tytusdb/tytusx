//------------------------------Scripts para el index.html---------------------------------------
var contTab = 1;
var activeTab = "";
var activeNav = "";
var activeText = "";
var activeNombre = "";


document.getElementById("btnNuevo").addEventListener('click', function() {
    var nombre = prompt('Nombre del archivo');

    if (nombre == "" || nombre == null) {
        alert("Campo vacio!")
    }else{
        nombre += ".xml";

        var boton = document.getElementById("nav-tab");
        boton.innerHTML += `<button class="nav-link" id="nav-${contTab}-tab" data-bs-toggle="tab" data-bs-target="#nav-${contTab}" type="button" role="tab" aria-controls="nav-${contTab}" aria-selected="true" onclick="selector('nav-${contTab}-tab', 'nav-${contTab}', 'textArea${contTab}', '${nombre}');">${nombre}</button>`;

        var elemento = document.getElementById("nav-tabContent");
        elemento.innerHTML += `<div class="tab-pane fade" id="nav-${contTab}" role="tabpanel" aria-labelledby="nav-${contTab}-tab"><textarea class="form-control" id="textArea${contTab}" rows="15"></textarea></div>`;
        
        contTab++;
    }
});

document.getElementById("attachment").addEventListener('click', function() {
    document.getElementById("file-input").click();
});

document.getElementById("file-input").addEventListener('change', function(e) {
    var archivo = e.target.files[0];

    if (!archivo) {
        return;
    }

    var boton = document.getElementById("nav-tab");
    boton.innerHTML += `<button class="nav-link" id="nav-${contTab}-tab" data-bs-toggle="tab" data-bs-target="#nav-${contTab}" type="button" role="tab" aria-controls="nav-${contTab}" aria-selected="true" onclick="selector('nav-${contTab}-tab', 'nav-${contTab}', 'textArea${contTab}', '${archivo.name}');">${archivo.name}</button>`;

    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        var elemento = document.getElementById("nav-tabContent");
        elemento.innerHTML += `<div class="tab-pane fade" id="nav-${contTab-1}" role="tabpanel" aria-labelledby="nav-${contTab-1}-tab"><textarea class="form-control" id="textArea${contTab-1}" rows="15">${contenido}</textarea></div>`;
    };
    lector.readAsText(archivo);

    contTab++;
});

function selector(idTab, idNav, idText, name) {
    activeTab = idTab;
    activeNav = idNav;
    activeText = idText;
    activeName = name;
};

function cerrarTab(){
    tab = document.getElementById(activeTab);
    nav = document.getElementById(activeNav);	
    if (!tab || !nav){
        alert("El elemento selecionado no existe");
    } else {
        padre = tab.parentNode;
        padre.removeChild(tab);

        madre = nav.parentNode;
        madre.removeChild(nav);
    }
};

function descargar(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

document.getElementById("btnGuardar").addEventListener("click", function () {
    var texto = document.getElementById(activeText).value;
    
    descargar(activeName, texto);
}, false);

var cadenaReporteTablaS =""

document.getElementById("btnAnalizarA").addEventListener('click', function() {
    cadenaReporteTablaS= myBundle.ejecutarXML(document.getElementById(activeText).value);
    console.log(cadenaReporteTablaS);
    alert("Se ha cargado el XML");
});

document.getElementById("btnGraficaAST").addEventListener('click', function() {
    myBundle.realizarGraficaAST();
});


let tituloReporte="Tabla de Reporte"

var valorTabla = 0

function llenarTablaReportes() {
    valorTabla=1
   manejoTablas()
   
};

function llenarTablaErrores() {
    valorTabla=2
   manejoTablas()

}

function manejoTablas() {
    if (valorTabla == 1) {
        document.getElementById("tablasimbolos").innerHTML = cadenaReporteTablaS
        tituloReporte = "Tabla de Simbolos"
        document.getElementById("tituloRep").innerText = tituloReporte
    } else if (valorTabla == 2) {
        var cadenaError = myBundle.reporteTablaErrores()
        document.getElementById("tablasimbolos").innerHTML = cadenaError
        tituloReporte = "Tabla de Errores"
        document.getElementById("tituloRep").innerText = tituloReporte
    }
};