
function graficarCst(cst) {
    
    const resultArray = [];
    addNestedChildrenToArray(cst.S, resultArray, null, "S");
    

    let contador = false;

    let nodos = [];
    let aristas = [];

    resultArray.forEach(element => {
        if(contador) {
            nodos.push({id: parseInt(element.split("_._")[1], 10), label: element.split("_._")[2] });
            aristas.push({from: parseInt(element.split("_._")[0], 10), to: parseInt(element.split("_._")[1], 10) })
        } else {
            nodos.push({id: parseInt(element.split("_._")[1], 10), label: element.split("_._")[2] })
            contador = true;
        }
    });

    var nodes = new vis.DataSet(nodos);
    var edges = new vis.DataSet(aristas);
    
    var container = document.getElementById("canvas1");
    var data = {
        nodes: nodes,
        edges: edges
    }

    var options = {
        autoResize: true,
        height: '400px',
        clickToUse: false,
        layout: {
            hierarchical: {
                direction: 'UD',
                sortMethod: 'directed',
            }
        },
        physics: {
           stabilization: false,
           barnesHut: {
                gravitationalConstant: -80000,
                springConstant: 0.001,
                springLength: 200
           }
        },
        nodes: {
            shape: 'dot',
            size: 20,
            font: {
                size: 15,
                color: '#000000'
            },
            borderWidth: 2
        }
     };

    var network = new vis.Network(container, data, options);

}

function addNestedChildrenToArray(obj, resultArray, padre, nombre) {
	resultArray.push(padre + "_._" + obj.node_id + "_._" + nombre);
    obj.node_list.forEach(child => addNestedChildrenToArray(child, resultArray, obj.node_id, child.node_name));
}


module.exports.graficarCst = graficarCst;