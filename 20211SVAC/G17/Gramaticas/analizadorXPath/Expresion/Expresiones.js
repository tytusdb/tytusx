import { Camino } from "./axes"
import { Atributo } from "./axes"

const { Tipo } = require("../AST/Entorno")
var C3D  = require('../../C3D')

//Literales para el uso de datos y tipos
export class NodoExp
{
    constructor(tipo,valor)
    {
        this.tipo=tipo
        this.valor=valor
    }

    getValor()
    {

    }

    getC3D()
    {}
}
 
export class Literal extends NodoExp
{
    posValor = 0
    constructor(tipo,valor){
        super(tipo,valor) 
    }

    getValor()
    {
        return [this]
    }

    getC3D(){
        //dependiendo el tipo, la devolucion
        switch(this.tipo){
            case Tipo.INTEGER:
            case Tipo.DECIMAL:
                return [new C3D.Retorno(this.valor, this.tipo)]
            case Tipo.BOOLEAN:
                
                //retorno 1 si es true y 0 si es false
                var val = ''
                if (this.valor.ToString().ToLower() == "true")
                {
                    val = '1'
                }
                else if (this.valor.ToString().ToLower() == "false")
                {
                    val = '0'
                }

                var retornar = new C3D.Retorno(val, this.tipo)
                var trueLabel = C3D.newLabel()
                var falseLabel = C3D.newLabel()
                retornar.trueLabel = trueLabel
                retornar.falseLabel = falseLabel
                return [retornar]
            
            case Tipo.STRING:
                this.posValor = C3D.getNextSP()
                var tmp = C3D.guardarString(this.posValor, this.valor)
                return [new C3D.Retorno(tmp, this.tipo)]
        }
        
    }

    Graficar(ListaNodes,ListaEdges,contador)
    {
        var NodosActuales = []
        var nodoActual = {id:contador.num,label:this.valor}
        NodosActuales.push(nodoActual);ListaNodes.push(nodoActual);contador.num++
        return NodosActuales
    }
}

export class Nodo extends NodoExp
{
    constructor(tipo,entorno,pila,valor,posicion=-1)
    {
        super(tipo,valor) // Tipo es NODO; valor es TEXTO
        this.entorno=entorno // Atributos e Hijos de Etiqueta
        this.pila=pila // Anteriores
        this.posicion=posicion
    }

    setPosicion(posicion)
    {
        this.posicion=posicion
    }

    getValor()
    {
    }

    getC3D(){}
}

export class Variable extends NodoExp
{
    constructor(tipo,valor)
    {
        super(tipo,valor)
    }

    getValor(nodos)
    {
        var retornos = []
        for (const nodo of nodos) {
            if(nodo.entorno.tipo==this.valor){
                retornos=retornos.concat(nodo.entorno.hijos)
                break
            }
        }
        return retornos
    }
}

export class PathExp  
{
    constructor(caminos) 
    {
        this.caminos=caminos
    }

    getValor(Entorno)
    {
        var Retornos = Entorno
        for (const iterator of this.caminos) {
            if(Retornos[0] && Retornos[0].tipo!=Tipo.NODO && Retornos[0].tipo!=Tipo.ATRIB) break
            Retornos = iterator.getValor(Retornos)
        }
        if(Retornos.length>0)
        {

            return Retornos
        }
        else
        {
            return [new Literal(Tipo.ERROR,'@Error@',[])]
        }
    }

    getC3D(objetos)
    {
        var esCamino = false;
        var esAtributo = false;
        var retornos = []

        /* verificamos si entre los caminos viene un atributo */
        for (const objeto of this.caminos) {
            if(objeto instanceof Atributo){
                esAtributo = true
                esCamino = false
            }else if(objeto instanceof Camino){
                esCamino = true
                esAtributo = false
            }else{
                /* Para aritmeticas nada */
            }
        }

        //Ahora verificamos como lo ejecutamos
        if(esAtributo){
            for (const objeto of this.caminos){
                retornos = retornos.concat(objeto.getC3D(objetos)) 
                var cod = '';
                for (const iterator of retornos) {
                    cod += iterator
                }
                C3D.addCodigo3D(`\n`);
                C3D.agregarComentario(` Añadiendo la raiz para la consulta `);
                C3D.addCodigo3D(`stackConsulta[0] = stack[0]; \n`);
                C3D.addCodigo3D(`stackConsulta[1] = -2; \n`);
                C3D.addCodigo3D(cod);
                C3D.addfuncion3d(C3D.funcAtributo())             
            }
            esAtributo = false

        }else if(esCamino){
            for (const objeto of this.caminos){
                retornos = retornos.concat(objeto.getC3D(objetos)) 
                var cod = '';
                for (const iterator of retornos) {
                    cod += iterator
                }
                C3D.addCodigo3D(`\n`);
                C3D.agregarComentario(` Añadiendo la raiz para las consulta `);
                C3D.addCodigo3D(`stackConsulta[0] = stack[0]; \n`);
                C3D.addCodigo3D(`stackConsulta[1] = -2; \n`);
                C3D.addCodigo3D(cod);
                C3D.addfuncion3d(C3D.funcCaminoABS())               
            }
            esCamino = false
        }else{
            for (const objeto of this.caminos){
                retornos = retornos.concat(objeto.getC3D(objetos))               
            }
            return retornos
        }
        
    }

    Graficar(ListaNodes,ListaEdges,contador)
    {   
        var NodosActuales = []
        for(var i=0; i < this.caminos.length; i++)
        {
            var nodoActual = {id:contador.num,label:"RelativePath"}
            NodosActuales.push(nodoActual);ListaNodes.push(nodoActual);contador.num++
            var nodos = this.caminos[i].Graficar(ListaNodes,ListaEdges,contador)
            for (const nodo of nodos) {
              ListaEdges.push({from:nodoActual.id,to:nodo.id})
            }
        }
        return NodosActuales
    }
}

export class Parentesis 
{
    constructor(expresiones)
    {
        this.expresiones=expresiones
    }

    getValor(nodos)
    {
        var retorno = []
        for (const expresion of this.expresiones) {
            retorno = retorno.concat(expresion.getValor(nodos))
        }
        return retorno
    }
}