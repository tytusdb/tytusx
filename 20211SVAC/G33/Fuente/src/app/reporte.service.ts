import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ReporteService {

  tablaSimbolosXML: any[] = [];

  llenarTablaXML(array: any[]) {
    this.tablaSimbolosXML = array;
    console.log(this.tablaSimbolosXML)
  }

  obtenerTablaXML() {
    return this.tablaSimbolosXML;
  }
}
