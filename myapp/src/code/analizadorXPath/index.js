var analizador = require("./Xpath")

retorno = analizador.parse(`5 = 5`);
console.log(retorno.Ejecutar());

/*
    /biblioteca/libro/fechaPublicacion[1973=@año]
*/