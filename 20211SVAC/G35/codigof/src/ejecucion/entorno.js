"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
const errores_1 = require("../arbol/errores");
const error_1 = require("../arbol/error");
class Entorno {
    constructor(padre) {
        this.padre = padre != null ? padre : null;
        this.variables = new Map();
        this.types = new Map();
        this.etiquetas = new Map();
        this.simbolos = new Map();
        this.funciones = new Map();
    }
    /*constructor(padre_: Entorno) {
      this.padre = padre_;
      this.variables = new Map();
      this.types = new Map();
  
      this.etiquetas = new Map();
  
      this.simbolos=new Map();
      this.funciones = new Map();
    }*/
    //NUEVO
    setEtiqueta(et) {
        this.etiquetas.set(et.dameID(), et);
    }
    getEtiqueta(id) {
        for (let e = this; e != null; e = e.padre) {
            let variable = e.etiquetas.get(id);
            if (variable != null)
                return variable;
        }
    }
    hasEtiqueta(id) {
        for (let e = this; e != null; e = e.padre) {
            if (e.etiquetas.has(id)) {
                return true;
            }
        }
        return false;
    }
    //NUEVO
    setVariable(variable) {
        this.variables.set(variable.id, variable);
    }
    getVariable(id) {
        for (let e = this; e != null; e = e.padre) {
            let variable = e.variables.get(id);
            if (variable != null)
                return variable;
        }
        //Compruebo en las funciones ya declaradas
        // if (this.deboBuscarEnFunciones(id) && !EntornoAux.getInstance().estoyBuscandoEnFuncion) {
        //   EntornoAux.getInstance().estoyBuscandoEnFuncion = true;
        //   //Capturo el id de la funcion
        //   const id_funcion = this.getIdFuncionABuscar(id);
        //   //Si no existe la funcion
        //   if (!this.hasFuncion(id_funcion)) {
        //     EntornoAux.getInstance().estoyBuscandoEnFuncion = false;
        //     return null
        //   };
        //   //Si existe la funcion voy a ejecutar sus instrucciones
        //   const funcion = this.getFuncion(id_funcion);
        //   //Hago una copia del entorno actual para que me afecte la ejecucion de las instrucciones de la funcion
        //   const copia_entorno = _.cloneDeep(this);
        //   //Creo el entorno de la funcion
        //   const entorno_fn = new Entorno(copia_entorno);
        //   //Ejecuto las instrucciones de la funcion
        //   for (let instruccion of funcion.instrucciones) {
        //     instruccion.ejecutar(entorno_fn);
        //     // Valido si luego de la ejecucion de la instruccion ya existe la variable que busco
        //     if (entorno_fn.hasVariable(id)) {
        //       EntornoAux.getInstance().estoyBuscandoEnFuncion = false;
        //       return entorno_fn.getVariable(id);
        //     }
        //   }
        //   EntornoAux.getInstance().estoyBuscandoEnFuncion = false;
        // }
        return null;
    }
    hasVariable(id) {
        for (let e = this; e != null; e = e.padre) {
            if (e.variables.has(id)) {
                return true;
            }
        }
        return false;
    }
    updateValorVariable(id, valor) {
        const variable = this.getVariable(id);
        if (variable) {
            variable.valor = valor;
        }
    }
    getType(id) {
        for (let e = this; e != null; e = e.padre) {
            let type = e.types.get(id);
            if (type != null)
                return type;
        }
        return null;
    }
    setType(type) {
        this.types.set(type.id, type);
    }
    setFuncion(funcion) {
        this.funciones.set(funcion.identificador, funcion);
    }
    hasFuncion(id) {
        for (let e = this; e != null; e = e.padre) {
            if (e.funciones.has(id)) {
                return true;
            }
        }
        return false;
    }
    getFuncion(id) {
        for (let e = this; e != null; e = e.padre) {
            if (e.funciones.has(id)) {
                return e.funciones.get(id);
            }
        }
        return null;
    }
    //Utilizado para obtener el id de la funcion en la cual debo ir a buscar
    getIdFuncionABuscar(id) {
        var _a;
        const ids = id.split("_", 2);
        return (_a = ids[1]) !== null && _a !== void 0 ? _a : '';
    }
    getEntornoGlobal() {
        for (let e = this; e != null; e = e.padre) {
            if (e.padre == null)
                return e;
        }
    }
    toString() {
        let salida = `*** ETIQUETAS ****\n`;
        /*for (let variable of Array.from(this.etiquetas.values())) {
          salida += variable.recorrer("GLOBAL");
        }*/
        return salida;
    }
    getVariables() {
        return Array.from(this.variables.values());
    }
    //NUEVOS XQUERY
    insertarVariable(simbolo_, linea_) {
        if (this.simbolos.has(simbolo_.identificador)) {
            //Error, ya existe esta variable
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: linea_.toString(),
                descripcion: ('La variable ' + simbolo_.identificador + ' ya existe'),
            }));
            return;
        }
        this.simbolos.set(simbolo_.identificador, simbolo_);
    }
    buscarVariable(identificador_, linea_) {
        for (let e = this; e != null; e = e.padre) {
            let variable = e.simbolos.get(identificador_);
            if (variable != null) {
                return variable;
            }
        }
        errores_1.Errores.getInstance().push(new error_1.Error({
            tipo: "semantico",
            linea: (linea_ + 1).toString(),
            descripcion: ('La variable ' + identificador_ + ' no existe'),
        }));
        return null;
    }
    insertarFuncion(funcion_, linea_) {
        if (this.funciones.has(funcion_.identificador)) {
            //Error, ya existe esta variable
            errores_1.Errores.getInstance().push(new error_1.Error({
                tipo: "semantico",
                linea: linea_.toString(),
                descripcion: ('La funcion declarada ya existe'),
            }));
            return;
        }
        this.funciones.set(funcion_.identificador, funcion_);
    }
    //No se uso
    buscarFuncion3(identificador_, linea_) {
        for (let e = this; e != null; e = e.padre) {
            let funcion_ = e.funciones.get(identificador_);
            //console.log(funccion_);
            if ((funcion_ != null) && (funcion_ != undefined)) {
                return funcion_;
            }
        } //FIN DEL FOR
        errores_1.Errores.getInstance().push(new error_1.Error({
            tipo: "semantico",
            linea: linea_.toString(),
            descripcion: ('La funcion no existe'),
        }));
        return null;
    }
    //No se uso
    buscarFuncion2(identificador_, linea_) {
        for (let e = this; e != null; e = e.padre) {
            if (this.funciones.has(identificador_)) {
                let funcionRes = e.funciones.get(identificador_);
                return funcionRes;
            }
        }
        errores_1.Errores.getInstance().push(new error_1.Error({
            tipo: "semantico",
            linea: linea_.toString(),
            descripcion: ('La funcion ndsadaso existe'),
        }));
        return null;
    }
    //ESTA SE USO
    buscarFuncion(nombre, linea) {
        var e = this;
        while (e != null) {
            if (e.funciones.has(nombre)) {
                var sim = e.funciones.get(nombre);
                return sim;
            }
            e = e.padre;
        }
        errores_1.Errores.getInstance().push(new error_1.Error({
            tipo: "semantico",
            linea: linea.toString(),
            descripcion: ('La funcion no existe'),
        }));
        return null;
    }
    //No se uso
    buscarVariable2(nombre, linea) {
        var e = this;
        while (e != null) {
            if (e.simbolos.has(nombre)) {
                var sim = e.simbolos.get(nombre);
                return sim;
            }
            e = e.padre;
            //console.log("se convirtio en padre");
        }
        return null;
    }
}
exports.Entorno = Entorno;
