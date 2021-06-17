import { Component, OnInit } from '@angular/core';
// Import para las graficas
// import * as vis from 'vis';
// import { viz } from 'viz.js';
// const Viz = require('viz.js');
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';
// Import para el servicio
import { DotService } from '../../services/dot.service';

@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styleUrls: ['./ast.component.css'],
})
export class AstComponent implements OnInit {
  constructor(private dotService: DotService) {}

  ngOnInit(): void {
    let dotRes = this.dotService.getDot();
    //alert(dotRes);
    // var parsedData = vis.network.convertDot(dotRes);
    // var data = {
    //   nodes: parsedData.nodes,
    //   edges: parsedData.edges
    // };
    // var options = parsedData.options;
    // var container = document.getElementById("graph");
    // var network = new vis.Network(container, data, options);
    let viz = new Viz({ Module, render });
    viz
      .renderImageElement(dotRes)
      .then(function (element) {
        document.getElementById('graph').appendChild(element);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
