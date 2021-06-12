class Etiqueta {
  constructor(nombre, texto, contenido, atributo = "", tipo = "completa") {
    this.nombre = nombre;
    this.texto = texto;
    this.contenido = contenido;
    this.cuerpo = "";
    this.atributo = atributo;
    this.tipo = tipo;
  }
  obtenerXML() {
    if (this.tipo == "completa") {
      this.cuerpo += "<" + this.nombre + " ";
      if (this.atributo != "" && this.atributo != undefined) {
        this.cuerpo +=
          this.atributo.etiqueta + '="' + this.atributo.valor + '"';
      }

      this.cuerpo += ">\n";
      if (this.texto != "" && this.texto != undefined) {
        this.cuerpo += this.texto + "\n";
      }
      if (this.contenido != "" && this.contenido != undefined) {
        this.cuerpo += this.contenido + "\n";
      }

      this.cuerpo += "</" + this.nombre + ">\n";
    } else if (this.tipo == "unica") {
      this.cuerpo += "<" + this.nombre+" ";
      if (this.atributo != "" && this.atributo != undefined) {
        this.cuerpo +=
          this.atributo.etiqueta + '="' + this.atributo.valor + '"';
      }
      this.cuerpo+= "/>\n";
    }

    return this.cuerpo;
  }
}
