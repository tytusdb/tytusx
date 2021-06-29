class Entorno {
  constructor(padre) {
    this.tabla = new Map();
    this.padre = padre;
  }

  agregar(id, simbolo) {
    this.tabla.set(id, simbolo);
  }

  eliminar(id) {
    this.tabla.delete(id);
  }

  existe(id) {
    for (let e = this; e != null; e = e.padre) {
      let simbolo = e.tabla.get(id);
      if (simbolo) {
        return true;
      }
      return false;
    }
  }
  getFuncion(id) {
    for (let e = this; e != null; e = e.padre) {
      
      let simbolo = e.tabla.get(id);
      if (simbolo) {
        return simbolo;
      }
      
    }
    return false;
  }

  existeEnActual(id) {
    let simbolo = this.tabla.get(id);
    if (simbolo) {
      return true;
    }
    return false;
  }

  getSimbolo(id) {
    return this.tabla.get(id);
  }

  reemplazar(id, nuevoValor) {
    for (let e = this; e != null; e = e.anterior) {
      const value = e.tabla.get(id);
      if (value !== undefined) {
        e.tabla.set(id,nuevoValor);
      }
    }
  }
}
