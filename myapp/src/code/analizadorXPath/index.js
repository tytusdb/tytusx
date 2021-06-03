var analizador = require("./Xpath")

analizador.parse(`//libro[@id lt (1+1)]`);