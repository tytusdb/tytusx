/*var Dracula = require("graphdracula");
var Graph = Dracula.Graph;
var p = Dracula.Renderer.Raphael.prototype;
Dracula.Renderer.Raphael.prototype = p;
var render = function (r, n) {
    var set = r
        .set()
        .push(
            r
                .rect(n.point[0] - 30, n.point[1] - 13, 50, 50)
                .attr({ fill: "#fa8", "stroke-width": 2, r: 9 })
        )
        .push(
            r.text(n.point[0], n.point[1] + 15, n.id).attr({ "font-size": "20px" })
        );
    return set;
};*/

function graficarAst(ast) {
    //Dracula.Renderer.defaultRenderFunc = render;
    //var Renderer = Dracula.Renderer.Raphael;
    //var Layout = Dracula.Layout.Spring;
    //var graph = new Graph();
    console.log(ast);
    let nodos = [];
    let aristas = [];

    //graph.addNode("" + ast.id, { label: "lista_consultas" });
    nodos.push({id: ast.id, label: "lista_consultas" });

    ast.lista_consultas.forEach((element) => {
        //graph.addNode("" + element.id, { label: "consulta" });
        nodos.push({id: element.id, label: "consulta" });
        //graph.addEdge("" + ast.id, "" + element.id, { directed: true });
        aristas.push({from: ast.id, to: element.id})

        element.consulta.forEach((element2) => {
            //graph.addNode("" + element2.acceso.id, { label: "acceso" });
            nodos.push({id: element2.acceso.id, label: "acceso" });
            /*graph.addEdge("" + element.id, "" + element2.acceso.id, {
                directed: true,
            });*/
            aristas.push({from: element.id, to: element2.acceso.id});

            /*graph.addNode("" + element2.acceso.ambito.id, {
                label: element2.acceso.ambito.ambito,
            });*/
            nodos.push({id: element2.acceso.ambito.id, label: element2.acceso.ambito.ambito });
            /*graph.addNode("" + element2.acceso.valor.id, {
                label: element2.acceso.valor.valor,
            });*/
            nodos.push({id: element2.acceso.valor.id, label: element2.acceso.valor.valor });
            
            /*graph.addEdge("" + element2.acceso.id, "" + element2.acceso.ambito.id, {
                directed: true,
            });*/
            aristas.push({from: element2.acceso.id, to: element2.acceso.ambito.id })
            /*graph.addEdge("" + element2.acceso.id, "" + element2.acceso.valor.id, {
                directed: true,
            });*/
            aristas.push({from: element2.acceso.id, to: element2.acceso.valor.id });

            if(element2.acceso.predicado) {
                nodos.push({id: element2.acceso.predicado.id, label: element2.acceso.predicado.valor + ""});
                aristas.push({from: element2.acceso.id, to: element2.acceso.predicado.id});

                if(element2.acceso.predicado.izq) {
                    nodos.push({id: element2.acceso.predicado.izq.id, label: element2.acceso.predicado.izq.valor});
                    aristas.push({from: element2.acceso.predicado.id, to: element2.acceso.predicado.izq.id });
                }
                if(element2.acceso.predicado.der) {
                    nodos.push({id: element2.acceso.predicado.der.id, label: element2.acceso.predicado.der.valor});
                    aristas.push({from: element2.acceso.predicado.id, to: element2.acceso.predicado.der.id });
                }
                
            }
        });
    });
    var nodes = new vis.DataSet(nodos);
    var edges = new vis.DataSet(aristas);
    //console.log()
    var container = document.getElementById("canvas");
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
    /*var layouter = new Dracula.Layout.Spring(graph);
    layouter.layout();
    var renderer = new Dracula.Renderer.Raphael("#canvas", graph, 1080, 520);
    renderer.draw();*/
}

module.exports.graficarAst = graficarAst;