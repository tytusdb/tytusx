enum ReglaC3D{
    Regla1,
    Regla2,
    Regla3,
    Regla4,
    Regla5,
    Regla6,
    Regla7,
    Regla8,
    Regla9,
    Regla10,
    Regla11,
    Regla12,
    Regla13,
    Regla14,
    Regla15,
    Regla16
}
class Optimizador{
    codigo3d: Codigo3d[];

    constructor(codigo3d: Codigo3d[]) {
        this.codigo3d = codigo3d;
    }

    optimizarCodigo():string{
        let cadena = "";
        for(let codigo of this.codigo3d){
            if(codigo instanceof DeclaracionMetodoC3D){
                codigo.optimizarCodigo();
            }
            cadena += codigo.toString();
        }
        return cadena;
    }
}