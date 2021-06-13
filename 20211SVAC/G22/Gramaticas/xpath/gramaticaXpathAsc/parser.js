var gramatica = require('./gramaticaxpath');

function ejecutarCodigo(entrada) {
    var objetos = gramatica.parse(entrada);


}
ejecutarCodigo(
"id/book/book2"+
"|//book/author[author=(\"J\")]"+
"|bookstore/book/title[ancestor::book]"+
"|bookstore/book/title[ancestor::book and child::asdasd]"+
"|././././bookstore"+
"|/bookstore/book[@category=\"web\"][child::title[.=\"Learning XML\"]]"+
"|bookstore/book/title/parent::book[title=\"asdsadasdasd\"]"+
"|/tengo/sueNo[@ganasDeSeguir=\"noHay\"]"+
"|bookstore/book/title[sda=12.50 and child::asdasd]"+
"|//libro[autor=//libro[titulo=\"Pantaleón y las visitadoras\"]/autor/textl]/titulo"+
"|bookstore/book/child::*/child::price"+
"| /bookstore/*/title/self::title[.][.][.][.][.][.]/self::title[.][.][.][.][.][.][.]/self::title[.][.][.][.][.][.][.]/self::title[.][.][.][.][.][.][.]/self::title[.][.][.][.][.][.][.]/self::title[.][.][.][.][.][.][.]/self::title[.][.][.][.][.][.][.]/self::title[.][.][.][.][.][.][.]/self::title[.][.][.][.][.][.][.]/self::title[.][.][.][.][.][.][.]/self::title[.][.][.][.][.][.][.]/self::title[.][.][.][.][.][.][.]/self::title[.]/../.");
