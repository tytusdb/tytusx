var dotXPathDesc = '';




//Graficar
function init() {

    document.getElementById('analaizarXPathDescendente')
        .addEventListener('click', () => {
            let xpath_desc_graph = document.getElementById("grafo");
            let ta = document.getElementById(get_vent());
            let contenido = ta.value;


            tree = gramaticaXPathDescendente.parse(contenido);
            newTree = new TreeXPathDesc();
            console.log(tree);
            dotXPathDesc = newTree.graphXPathDescendente(tree);
            dotXPathDesc += '}';

            let parsedData = vis.network.convertDot(dotXPathDesc);

            let data = {
                nodes: parsedData.nodes,
                edges: parsedData.edges
            };

            let options = {
                layout: {
                    hierarchical: {
                        levelSeparation: 100,
                        nodeSpacing: 100,
                        parentCentralization: true
                    }
                }
            };

            // you can extend the options like a normal JSON variable:
            options.nodes = {
                color: "white"
            };

            // create a network
            let network = new vis.Network(xpath_desc_graph, data, options);

        });
    document.getElementById('analaizarXMLDescendente')
        .addEventListener('click', () => {
            let xml_desc_graph = document.getElementById("grafo");
            let ta = document.getElementById(get_vent());
            let contenido = ta.value;


            tree = gramaticaXMLDescendente.parse(contenido);
            newTree = new TreeXMLDesc();
            console.log(tree);
            dotXMLDesc = newTree.graphXMLDescendente(tree);
            dotXMLDesc += '}';
            console.log(dotXMLDesc);
            let parsedData = vis.network.convertDot(dotXMLDesc);

            let data = {
                nodes: parsedData.nodes,
                edges: parsedData.edges
            };

            let options = {
                layout: {
                    hierarchical: {
                        levelSeparation: 100,
                        nodeSpacing: 100,
                        parentCentralization: true
                    }
                }
            };

            // you can extend the options like a normal JSON variable:
            options.nodes = {
                color: "white"
            };

            // create a network
            let network = new vis.Network(xml_desc_graph, data, options);

        });
}