
export interface instruccion_3d{
  intrucciones_3d : Array<instruccion_3d>

  ejecutar();
  insertar(instruccion : instruccion_3d);
}
