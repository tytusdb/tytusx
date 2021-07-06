import { Optimizacion } from "./optimizacion";

export class Optimizaciones {
  private static instance: Optimizaciones;
  private optimizaciones: Optimizacion[];

  private constructor(){
    this.optimizaciones = [];
  }

  private static getInstance() : Optimizaciones{
    if(!Optimizaciones.instance) Optimizaciones.instance = new Optimizaciones();
    return Optimizaciones.instance;
  }

  public static clear() : void{
    Optimizaciones.getInstance().optimizaciones = [];
  }

  public static add(optimizacion: Optimizacion) : void{
    Optimizaciones.getInstance().optimizaciones.push(optimizacion);
  }

  public static getOptimizaciones() : Optimizacion[]{
    return Optimizaciones.getInstance().optimizaciones;
  }

}
