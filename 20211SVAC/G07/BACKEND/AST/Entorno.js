class Entorno {
  constructor(entorno_anterior) {
    this.tabla = new Map();
    this.entorno_anterior = entorno_anterior;
  }

  agregar(id, simbolo) {
    this.tabla.set(id, simbolo);
  }

  eliminar(id) {
    this.tabla.delete(id);
  }

  existe(id) {
    for (let e = this; e != null; e = e.anterior) {
      let simbolo = e.tabla.get(id);
      if (simbolo) {
        return true;
      }
      return false;
    }
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
      const value = e.tabla[id];
      if (value !== undefined) {
        e.tabla[id] = nuevoValor;
      }
    }
  }
}
