import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Nodo from '../Clases/Models/NodoAST';
import { Network, DataSet, Node, Edge, IdType } from 'vis';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-astxpath',
  templateUrl: './astxpath.component.html',
  styleUrls: ['./astxpath.component.css']
})
export class ASTXPathComponent implements OnInit {

  nodoraiz: Nodo;
  public nodes: Node;
  public edges: Edge;
  public network: Network;
  listanodes = [];
  listaedges = [];
  contgrafica: number = 0;
  nodohoja: number = 0;
  public numero: number = 0;

  constructor(private router: Router, public toast: ToastrService) { }

  ngOnInit(): void {
    console.log("AST -> XPATH")

    this.nodoraiz = JSON.parse(localStorage.getItem("ASTXPATH"));
    console.log(this.nodoraiz)
    if (this.nodoraiz != null || this.nodoraiz != undefined) {
      this.Graficar(this.nodoraiz);
    }
  }

  ReporteGram(){
    this.router.navigate(['./gramatical']);
  }

  regresar() {
    this.router.navigate(['./inicio']);
  }

  CSTAsc() {
    this.router.navigate(['./cstASC']);
  }

  CSTDec() {
    this.router.navigate(['./cstDEC']);
  }

  ASTXPATH() {
    this.router.navigate(['./AST-XPath']);
  }

  repoSimbolos() {
    this.router.navigate(['./tablasimbolos']);
  }

  Graficar(raiz: Nodo) {
    this.listaedges = [];
    this.listanodes = [];
    this.contgrafica = 0;
    this.RecorrerAST(raiz)
    console.log(this.listanodes);
    //console.log("------------------")
    //console.log(this.listanodes)
    //console.log(this.listaedges)
    //console.log("------------------")
    var nodes = new DataSet(this.listanodes);
    var edges = new DataSet(this.listaedges);
    var container = document.getElementById('visualizar');
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
      layout: {
        randomSeed: undefined,
        improvedLayout: true,
        hierarchical: {
          enabled: true
        }
      }
    };
    var network = new Network(container, data, options);
  }

  RecorrerAST(raiz: Nodo) {
    if (raiz != undefined) {
      let nodo = {
        id: this.numero,
        label: raiz.etiqueta
      }
      this.listanodes.push(nodo);
      this.RecorrerHijos(raiz, nodo.id);
    } else {
      console.log("Ha ocurrido un error");
    }
  }

  RecorrerHijos(raiz: Nodo, idpadre: number) {
    if (raiz != undefined) {
      if (raiz.hijos.length > 0) {
        for (let i: number = 0; i < raiz.hijos.length; i++) {
          if (raiz.hijos[i] != undefined) {
            let nodo = {
              id: this.getID(this.numero),
              label: raiz.hijos[i].etiqueta
            }
            let edge = {
              from: idpadre,
              to: this.numero
            }
            this.listanodes.push(nodo);
            this.listaedges.push(edge);
            if (raiz.hijos[i].hijos.length > 0) {
              this.RecorrerHijos(raiz.hijos[i], nodo.id);
            }
          }
        }
      }
    }
  }

  getID(num: number): number {
    this.numero++;
    return this.numero;
  }

}
