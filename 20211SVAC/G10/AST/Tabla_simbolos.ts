class Tabla_simbolos{
    
    public registros:{[id:number] : Simbolo}={};
    public num_registro:number=0;
    
    agregar(simbolo:Simbolo){                
        this.num_registro=this.num_registro+1;    
        this.registros[this.num_registro] = simbolo;
    }
    

    eliminar(num_registro:number):boolean{                   
            const value = this.registros[num_registro];
            if (value!==undefined)
            {
                delete this.registros[num_registro];
                return true;
            }
        
        return false;
    }

    existe(num_registro:number):boolean{                
            const value = this.registros[num_registro];
            if (value!==undefined)
            {
                return true;
            }        
        return false;
    }
    getSimbolo(num_registro:number):any{
        
        
            if (this.registros[num_registro]!==undefined)
            {
                return this.registros[num_registro];
            }        
        return null;
    }

    reemplazar(num_registro:number, nuevoValor:Simbolo){                
            const value = this.registros[num_registro];
            if (value!==undefined)
            {
                this.registros[num_registro] = nuevoValor;
            }        
    }

}