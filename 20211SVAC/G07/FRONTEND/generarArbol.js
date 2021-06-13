// CONFIGURA LA GRAFICA PARA EL ARBOL
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

new Treant(simple_chart_config);

// FUNCION PARA GRAFICAR
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
    let node = generarArbol(nodoRaiz);
    simple_chart_config.nodeStructure = node;
    new Treant(simple_chart_config);
}

function activarModal() {
    document.getElementById('modalAST').classList.add('isActive');
}

const zoomElement = document.getElementById('tree-simple');
const panzoom = Panzoom(zoomElement, {canvas: true});
document.getElementById('btnZoomIn').addEventListener('click', panzoom.zoomIn);
document.getElementById('btnZoomOut').addEventListener('click', panzoom.zoomOut);


// Cerrar el modal
let btnCloseModal = document.getElementById('closeASTContainer');
let myModal = document.getElementById('modalAST');


btnCloseModal.addEventListener('click', () => {
    myModal.classList.remove('isActive');
});
