import { Component, OnInit, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Objeto } from 'src/Expresiones/Objeto';
import { Error } from 'src/app/AST/Error';
import { Optimizacion } from 'src/app/OptimizarCodigo';


@Component({
  selector: 'app-optimizaciones',
  templateUrl: './optimizaciones.component.html',
  styleUrls: ['./optimizaciones.component.css']
})
export class OptimizacionesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Optimizacion[]) {}
  source:Optimizacion[] = this.data;
  ngOnInit(): void {
    console.log(this.data);
  }


}
