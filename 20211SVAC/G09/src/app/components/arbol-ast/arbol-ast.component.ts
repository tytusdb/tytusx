import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arbol-ast',
  templateUrl: './arbol-ast.component.html',
  styleUrls: ['./arbol-ast.component.css']
})
export class ArbolAstComponent implements OnInit {

  @Input() arbolJson:any
  constructor() { }

  ngOnInit(): void {
  }

}
