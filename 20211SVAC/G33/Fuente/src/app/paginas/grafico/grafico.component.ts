import { Component } from '@angular/core';

import * as vis from 'vis';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent {

  constructor() { }

  ngOnInit() {
    var container = document.getElementById("vis");
    console.log(localStorage.getItem("grafo"));
    var DOTstring = localStorage.getItem("grafo");;
    var parsedData = vis.network.convertDot(DOTstring);
  
    var data = {
      nodes: parsedData.nodes,
      edges: parsedData.edges
    };

    var options = parsedData.options;

    // you can extend the options like a normal JSON variable:
    options = {
      layout: {
        hierarchical: {
          sortMethod: 'directed',  // hubsize, directed
          direction: 'UD'   // UD, DU, LR, RL
        }
      },
      nodes: {
        color: 'skyblue',
        shape: 'box'
      }
    }

    // create a network
    var network = new vis.Network(container, data, options);
    network.stabilize();  
  }
}
