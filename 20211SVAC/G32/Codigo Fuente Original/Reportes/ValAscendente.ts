//Clase primitiva a exportar para el reporte XML ascendente
export class ValAscendente
{
    //Se almacena en un objeto la producción con sus respectivas reglas gramaticales
    produccion: string;
    reglas: string;

    constructor({produccion, reglas} : {produccion: string, reglas: string})
    {
        Object.assign(this, {produccion, reglas});
    }
}
  