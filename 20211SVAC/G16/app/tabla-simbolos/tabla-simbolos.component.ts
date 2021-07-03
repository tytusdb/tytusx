import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-simbolos',
  templateUrl: './tabla-simbolos.component.html',
 })
export class TablaSimbolosComponent implements OnInit {

  constructor(private router:Router) {

  }
  lista:Array<any>;
  ngOnInit(): void {
    this.lista=JSON.parse(localStorage.getItem("tablaSimboloAux"));
    
  }

  repoSimbolos(){
    this.router.navigate(['./tablasimbolos']);
  }
  regresar(){
    localStorage.clear();
    this.router.navigate(['./inicio']);
  }

  cstASC() {
    this.router.navigate(['./cstASC']);
  }

  ReporteGram(){
    this.router.navigate(['./gramatical']);
  }
}
