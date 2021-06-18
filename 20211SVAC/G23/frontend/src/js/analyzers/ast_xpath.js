function getASTTree(obj) {
  try {
    let str = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport">
      <!-- Bootstrap CSS -->
      <link crossorigin="anonymous" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" rel="stylesheet">
      <title>Title</title>
      <style>
        #divheight{
          height: 400px;
          width: 1050px;
        }
        .nav-tabs > li .close {
          margin: -2px 0 0 10px;
          font-size: 18px;
        }
        .nav-tabs2 > li .close {
          margin: -2px 0 0 10px;
          font-size: 18px;
        }
    
      </style>
    
      <style>
        body {
          font-family: sans-serif;
          font-size: 15px;
        }
    
        .tree ul {
          position: relative;
          padding: 1em 0;
          white-space: nowrap;
          margin: 0 auto;
          text-align: center;
        }
        .tree ul::after {
          content: "";
          display: table;
          clear: both;
        }
    
        .tree li {
          display: inline-block;
          vertical-align: top;
          text-align: center;
          list-style-type: none;
          position: relative;
          padding: 1em 0.5em 0 0.5em;
        }
        .tree li::before, .tree li::after {
          content: "";
          position: absolute;
          top: 0;
          right: 50%;
          border-top: 1px solid #ccc;
          width: 50%;
          height: 1em;
        }
        .tree li::after {
          right: auto;
          left: 50%;
          border-left: 1px solid #ccc;
        }
        /*
        ul:hover::after  {
            transform: scale(1.5); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport)
        }*/
    
        .tree li:only-child::after, .tree li:only-child::before {
          display: none;
        }
        .tree li:only-child {
          padding-top: 0;
        }
        .tree li:first-child::before, .tree li:last-child::after {
          border: 0 none;
        }
        .tree li:last-child::before {
          border-right: 1px solid #ccc;
          border-radius: 0 5px 0 0;
        }
        .tree li:first-child::after {
          border-radius: 5px 0 0 0;
        }
    
        .tree ul ul::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          border-left: 1px solid #ccc;
          width: 0;
          height: 1em;
        }
    
        .tree li a {
          border: 1px solid #ccc;
          padding: 0.5em 0.75em;
          text-decoration: none;
          display: inline-block;
          border-radius: 5px;
          color: #333;
          position: relative;
          top: 1px;
        }
    
        .tree li a:hover,
        .tree li a:hover + ul li a {
          background: #e9453f;
          color: #fff;
          border: 1px solid #e9453f;
        }
    
        .tree li a:hover + ul li::after,
        .tree li a:hover + ul li::before,
        .tree li a:hover + ul::before,
        .tree li a:hover + ul ul::before {
          border-color: #e9453f;
        }
    
        /*# sourceMappingURL=sytle_.css.map */
    
    
      </style>
    </head>
    <body>
    
    
    
    <div class="tree">
      <ul id="tree-list">
    
        <!--AQUI-->
        `

    str = str + printObj(obj, 0, "")
    str = str + `</ul>
    
    
    
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script crossorigin="anonymous" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
            src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script crossorigin="anonymous" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    </body>
    </html>
    `
    return str;
  } catch (error) {
    return "";
  }
}


function printObj(obj, lines, name) {
  console.log(obj)
  let str = "";
  let str_ = "";
  if (Array.isArray(obj)) { //IS ARRAY
    for (let i = 0; i < obj.length; i++) {
      str = str + printObj(obj[i], lines, "");
    }
  } else if (typeof obj === 'object') {// IS OBJECT
    if (obj.tipo === 'SELECT_FROM_CURRENT' || obj.tipo === 'SELECT_FROM_ROOT') { // TODO select Parent
      str = `<li>`;
      str = str + printObj(obj.expresion, 0, (obj.tipo === 'SELECT_FROM_ROOT' ? "/" : "//"));
      str = str + getPredicados(obj.expresion);
      str = str + `</li>`
      console.log(str);
    } else if (obj.tipo === 'EXPRESION') {
      if (typeof obj.expresion === 'object') {
        str = `<a>` + name + getName(obj.expresion) + `</a>`;
      }
    }
  } else { // IS STRING
    for (let i = 0; i < lines; i++) {

      str_ = str_ + "- ";
    }
  }
  return str;
}



function getName(obj) {

  let str = "";
  if (obj.tipo === 'NODENAME') {
    //console.log(obj)
    return obj.nodename;
  } else if (obj.tipo === 'SELECT_PARENT') {
    return obj.expresion;
  } else if (obj.tipo === 'SELECT_CURRENT') {
    return obj.expresion;
  } else if (obj.tipo === 'ASTERISCO') {
    return obj.valor;
  } else if (obj.tipo === 'FUNCION_TEXT') {
    return obj.valor;
  } else if (obj.tipo === 'FUNCION_NODE') {
    return obj.valor;
  } else if (obj.tipo === 'SELECT_ATTRIBUTES') {
    return obj.expresion;
  } else {
    console.log("Error 1")
    console.log(obj)
  }
  return str
}

function getPredicados(obj) {
  let str = "";
  console.log(obj)
  if (obj.predicate !== null && obj.predicate !== undefined) {

    str = `<ul>\n`;
    for (let i = 0; i < obj.predicate.length; i++) {
      str = str + getPredicado(obj.predicate[i]);
    }
    str = str + `</ul>`;
  }
  return str;
}


function getPredicado(obj) {
  let str = ""
  if (obj.tipo === 'PREDICATE') {
    //str = `<li><a> ` + obj.condicion.tipo + `</a>
    //<ul>`
    str = str + getPredicado(obj.condicion);
    //str = str + `
    //</ul></li>`;
  } else if (obj.tipo === 'EXPRESION') { //TODO to check
    if ('valor' in obj.expresion) {
      str = `<li><a>` + obj.expresion.valor + `</a></li>
            `;

    } else if ('nodename' in obj.expresion) {
      str = `<li><a>` + obj.expresion.nodename + `</a></li>
            `;

    } else if (obj.expresion.tipo === 'SELECT_ATTRIBUTES') {
      str = `<li><a>` + "@" + obj.expresion.expresion + `</a></li>
            `;

    } else {
      console.log("error 2")
      console.log(obj)
    }


  } else {
    str = `<li><a>` + obj.tipo + `</a>
                <ul>`
    str = str + getPredicado(obj.opIzq);
    str = str + getPredicado(obj.opDer);
    str = str + `</ul></li>`
  }

  return str;
}

module.exports = getASTTree;