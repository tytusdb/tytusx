var tsObjetoStack = /** @class */ (function () {
    function tsObjetoStack(tipo, apuntadorName, apuntadorAtributos, apuntadorHijos, apuntadorContenido) {
        this.tipo = tipo;
        this.apuntadorNombre = apuntadorName;
        this.apuntadorAtributos = apuntadorAtributos;
        this.apuntadorHijos = apuntadorHijos;
        this.apuntadorContenido = apuntadorContenido;
    }
    tsObjetoStack.prototype.getTipo = function () {
        return this.tipo;
    };
    tsObjetoStack.prototype.setTipo = function (tipo) {
        this.tipo = tipo;
    };
    tsObjetoStack.prototype.getApuntadorNombre = function () {
        return this.apuntadorNombre;
    };
    tsObjetoStack.prototype.setApuntadorNombre = function (apuntadorNombre) {
        this.apuntadorNombre = apuntadorNombre;
    };
    tsObjetoStack.prototype.getApuntadorAtributos = function () {
        return this.apuntadorAtributos;
    };
    tsObjetoStack.prototype.setApuntadorAtributos = function (apuntadorAtributos) {
        this.apuntadorAtributos = apuntadorAtributos;
    };
    tsObjetoStack.prototype.getApuntadorHijos = function () {
        return this.apuntadorHijos;
    };
    tsObjetoStack.prototype.setApuntadorHijos = function (apuntadorHijos) {
        this.apuntadorHijos = apuntadorHijos;
    };
    tsObjetoStack.prototype.getApuntadorContenido = function () {
        return this.apuntadorContenido;
    };
    tsObjetoStack.prototype.setApuntadorContenido = function (apuntadorContenido) {
        this.apuntadorContenido = apuntadorContenido;
    };
    return tsObjetoStack;
}());
