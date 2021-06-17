

class Error extends Array<NodoError>{

    constructor(){
        super();
    }

    public static add(err:NodoError){
        this.prototype.push(err);
    }

    public static clear(){
        while(this.prototype.length>0){
            this.prototype.pop();
        }
    }
}
export{Error};