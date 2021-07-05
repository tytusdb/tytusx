

export class Environment {
    public variables: object[] = [];
    public functions: object[] = [];
    public environments:  object[] = [];
    varNumber: number = -1;


    public addVariable(name: string):void{
        //TODO: check variable is not already on list
        for (let i = 0; i < this.variables.length;i++){
            if (this.variables[i]['name']==name){
                console.log("Environment")
            }
        }
        this.variables.push({'name':name, 'code_name': "var"+this.getNextVar()});
    }

    private getNextVar():number{
        return ++this.varNumber;
    }

}