import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
const errores=require('../Clases/Models/ListaError.js')
@Component({
  selector: 'app-errores',
  templateUrl: './errores.component.html',
  styleUrls: ['./errores.component.css']
})
export class ErroresComponent implements OnInit {
  lista=[];
  constructor(private router:Router) {
    this.lista=errores.Errores.geterror();
  }
  ngOnInit(): void {

  }
  repoSimbolos(){
    this.router.navigate(['./tablasimbolos']);
    }
  regresar(){
      this.router.navigate(['./inicio']);
  }
  Errores(){
    this.router.navigate(['./errores']);
  }
}
