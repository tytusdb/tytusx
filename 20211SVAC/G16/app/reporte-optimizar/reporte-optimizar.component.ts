import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte-optimizar',
  templateUrl: './reporte-optimizar.component.html',
  styleUrls: ['./reporte-optimizar.component.css']
})
export class ReporteOptimizarComponent implements OnInit {

  constructor(private router: Router) { }

  lista: Array<any>

  ngOnInit(): void {
    this.lista = JSON.parse(localStorage.getItem("Optimizador"))
  }

  repoSimbolos() {
    this.router.navigate(['./tablasimbolos']);
  }

  regresar() {
    localStorage.clear();
    this.router.navigate(['./inicio']);
  }

  cstASC() {
    this.router.navigate(['./cstASC']);
  }

  ReporteGram() {
    this.router.navigate(['./gramatical']);
  }

}
