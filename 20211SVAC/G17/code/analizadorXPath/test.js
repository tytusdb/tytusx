var helpers = require('../analizadorXML/helpers')

var obj = new helpers.Objeto(
    '/',[],
    [
        new helpers.Objeto(
            'comidas',[],
            [
                new helpers.Objeto(
                    'comida',[],
                    [],
                    1,2, 'Soy un pepian'
                ),new helpers.Objeto(
                    'comida',[],
                    [],
                    1,2, 'Soy un jocon'
                )
            ],
            1,2, 'Esta es una lista de comidas'
        ),
        new helpers.Objeto(
            'bebidas',[],
            [
                new helpers.Objeto(
                    'bebida',[],
                    [],
                    1,2, 'Soy una horchata'
                ),new helpers.Objeto(
                    'bebida',[],
                    [],
                    1,2, 'Soy una rosa de jamaica'
                )
            ],
            1,2, 'Esta es una lista de bebidas'
        )
    ],1,2,'Esta es la raíz del archivo'
)

console.log(obj.getTextoRelativo())
