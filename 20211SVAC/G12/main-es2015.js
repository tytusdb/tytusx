(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "/59w":
/*!*********************************************!*\
  !*** ./src/Clases/Instrucciones/Llamada.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Llamada; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");
/* harmony import */ var _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TablaSimbolos/Tipo */ "lKex");
/* harmony import */ var _Declaracion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Declaracion */ "zWDC");



class Llamada {
    constructor(id, param, linea, col) {
        this.identificador = id;
        this.parametros = param;
        this.columna = col;
        this.linea = linea;
    }
    limpiar() {
        throw new Error("Method not implemented.");
    }
    getvalor3d(controlador, ts) {
        throw new Error("Method not implemented.");
    }
    getTipo(controlador, ts) {
        let valor = this.getValor(controlador, ts);
        if (typeof valor == 'number') {
            return _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE;
        }
        else if (typeof valor == 'string') {
            return _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].CADENA;
        }
        else if (typeof valor == 'boolean') {
            return _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].BOOLEANO;
        }
    }
    getValor(controlador, ts) {
        /*  if(ts.existe(this.identificador)){
              let ts_local=new TablaSimbolos(ts);
  
              let simbolo_funcion=ts.getSimbolo(this.identificador) as Funcion;
              
              if(this.asociacion(controlador,ts_local,simbolo_funcion,ts)){
                  let r=simbolo_funcion.ejecutar(controlador,ts_local);
                  controlador.ambito="Funcion: \n"+this.identificador;
                  controlador.graficarEntornos(controlador,ts_local,"");
                  if(r instanceof Detener || r instanceof Continuar){
                      let error = new Errores('Semantico', `Break y Continue solo son para ciclos`, this.linea, this.columna);
                      controlador.errores.push(error);
                      controlador.append(`Error Semantico : Break y Continue solo son para ciclos. En la linea ${this.linea} y columan ${this.columna}`);
                      return null;
                  }
                  if( r !=null){
  
                      return r;
                  }
              }
  
          }else{
              //Error semantico
          } */
    }
    ejecutar(controlador, ts) {
        /* if(ts.existe(this.identificador)){
             let ts_local=new TablaSimbolos(ts);
 
             let simbolo_funcion=ts.getSimbolo(this.identificador) as Funcion;
             
             if(this.asociacion(controlador,ts_local,simbolo_funcion,ts)){
                 let r=simbolo_funcion.ejecutar(controlador,ts_local);
                 controlador.ambito="Funcion: \n"+this.identificador;
                 controlador.graficarEntornos(controlador,ts_local,"");
                 if(r instanceof Detener || r instanceof Continuar){
                     let error = new Errores('Semantico', `Break y Continue solo son para ciclos`, this.linea, this.columna);
                     controlador.errores.push(error);
                     controlador.append(`Error Semantico : Break y Continue solo son para ciclos. En la linea ${this.linea} y columan ${this.columna}`);
                 
                     return null;
                 }
                 if( r !=null){
                     return r;
                 }
             }
 
         }else{
             //Error semantico
         }*/
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Llamada", "");
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.identificador, ""));
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("(", ""));
        for (let x = 0; x < this.parametros.length; x++) {
            let hijo = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Exp", "");
            hijo.AddHijo(this.parametros[x].recorrer());
            padre.AddHijo(hijo);
        }
        //TODO: AGREGAR NODOS HIJOS DE PARAMETROS
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](")", ""));
        return padre;
    }
    asociacion(controlador, ts, simbolo_funcion, ts_ant) {
        if (this.parametros.length == simbolo_funcion.lista_params.length) {
            for (let x = 0; x < this.parametros.length; x++) {
                let lista_simbolos = new Array();
                lista_simbolos.push(simbolo_funcion.lista_params[x]);
                let asignacion = new _Declaracion__WEBPACK_IMPORTED_MODULE_2__["default"](simbolo_funcion.lista_params[x].tipo, lista_simbolos, this.linea, this.columna);
                asignacion.ejecutar(controlador, ts);
                ts.getSimbolo(simbolo_funcion.lista_params[x].identificador).setValor(this.parametros[x].getValor(controlador, ts_ant));
            }
            return true;
        }
        else {
            //Error semantico
        }
        return false;
    }
}


/***/ }),

/***/ "/RNI":
/*!*************************************************!*\
  !*** ./src/Analizadores/XmlReporteGramatica.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var XmlReporteGramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[5,8],$V2=[1,8],$V3=[11,12],$V4=[1,12],$V5=[9,11,12],$V6=[8,19];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"inicio":3,"raices":4,"EOF":5,"raiz":6,"objeto":7,"<":8,"ID":9,"latributos":10,"/":11,">":12,"texto_libre":13,"objetos":14,"atributos":15,"atributo":16,"=":17,"CADENA":18,"TEXTO":19,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"<",9:"ID",11:"/",12:">",17:"=",18:"CADENA",19:"TEXTO"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[7,5],[7,9],[7,9],[14,2],[14,1],[10,1],[10,0],[15,2],[15,1],[16,3],[13,2],[13,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
this.$ = "inicio -> raices \n"+$$[$0-1];  return this.$; 
break;
case 2:
 this.$ = 'raices -> raices raiz; \n'+$$[$0-1]+$$[$0];
break;
case 3:
this.$ = 'raices -> raiz; \n'+$$[$0]; 
break;
case 4:
 this.$= 'raiz -> objeto; \n'+$$[$0]; 
break;
case 5:
 this.$ = 'objeto -> < ID latributos / >; \n'+$$[$0-2];
break;
case 6:
 this.$ = 'objeto -> < ID latributos >  texto_libre  < / ID >; \n'+$$[$0-6]+$$[$0-4];
break;
case 7:
this.$ ='objeto -> < ID latributos >  objetos </ID >; \n'+$$[$0-6]+$$[$0-4];
break;
case 8:
 this.$ = 'objetos -> objetos objeto; \n'+$$[$0-1]+$$[$0];
break;
case 9:
 this.$ = 'raiz -> objeto; \n'+$$[$0];
break;
case 10:
 this.$ = 'latributos -> atributos; \n'+$$[$0];
break;
case 11:
 this.$= 'latributos -> []; \n';
break;
case 12:
 this.$ = 'atributos -> atributos atributo; \n'+$$[$0-1]+$$[$0];
break;
case 13:
 this.$ = 'atributos -> atributo; \n'+$$[$0];
break;
case 14:
 this.$ = 'atributo -> ID = CADENA; \n';
break;
case 15:
 this.$ = 'texto_libre -> texto_libre TEXTO; \n'+$$[$0-1]; 
break;
case 16:
 this.$ = 'texto_libre -> TEXTO; \n';
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:$V0},{1:[3]},{5:[1,6],6:7,7:4,8:$V0},o($V1,[2,3]),o($V1,[2,4]),{9:$V2},{1:[2,1]},o($V1,[2,2]),o($V3,[2,11],{10:9,15:10,16:11,9:$V4}),{11:[1,13],12:[1,14]},o($V3,[2,10],{16:15,9:$V4}),o($V5,[2,13]),{17:[1,16]},{12:[1,17]},{7:21,8:$V0,13:18,14:19,19:[1,20]},o($V5,[2,12]),{18:[1,22]},o($V1,[2,5]),{8:[1,23],19:[1,24]},{7:26,8:[1,25]},o($V6,[2,16]),{8:[2,9]},o($V5,[2,14]),{11:[1,27]},o($V6,[2,15]),{9:$V2,11:[1,28]},{8:[2,8]},{9:[1,29]},{9:[1,30]},{12:[1,31]},{12:[1,32]},o($V1,[2,6]),o($V1,[2,7])],
defaultActions: {6:[2,1],21:[2,9],26:[2,8]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    let $ESPACIOS = "";

     
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* Ignoro los comentarios simples */
break;
case 1:/* skip whitespace */
break;
case 2: console.log("Reconocio : "+ yy_.yytext); return 18
break;
case 3: console.log("Reconocio : "+ yy_.yytext); return 9
break;
case 4: console.log("Reconocio : "+ yy_.yytext); return 8
break;
case 5: console.log("Reconocio : "+ yy_.yytext); return 17
break;
case 6: console.log("Reconocio : "+ yy_.yytext); return 11
break;
case 7: this.begin("S1"); $ESPACIOS=""; console.log("Reconocio : "+ yy_.yytext); return ">";
break;
case 8: yy_.yytext = $ESPACIOS + "<"; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 19; 
break;
case 9: yy_.yytext = $ESPACIOS + ">"; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 19; 
break;
case 10: yy_.yytext = $ESPACIOS + "&"; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 19; 
break;
case 11: yy_.yytext = $ESPACIOS + "\'"; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 19; 
break;
case 12: yy_.yytext = $ESPACIOS + "\""; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 19; 
break;
case 13:  /* Ignoro los comentarios simples */
break;
case 14: $ESPACIOS += yy.lexer.match;
break;
case 15: this.begin("INITIAL"); console.log("Reconocio : "+ yy_.yytext); return "<";
break;
case 16: yy_.yytext = $ESPACIOS + yy_.yytext; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 19; 
break;
case 17:return 5
break;
case 18: console.log("Error Lexico "+yy_.yytext
                        +" linea "+yy_.yylineno
                        +" columna "+(yy_.yylloc.last_column+1));        
                        
break;
}
},
rules: [/^(?:<!--(.|\n)*-->)/i,/^(?:\s+)/i,/^(?:(("((\\([\'\"\\ntr]))|([^\"\\]+))*")))/i,/^(?:([a-zñA-ZÑ_][a-zñA-ZÑ0-9_]*))/i,/^(?:<)/i,/^(?:=)/i,/^(?:\/)/i,/^(?:>)/i,/^(?:&lt;)/i,/^(?:&gt;)/i,/^(?:&amp;)/i,/^(?:&apos;)/i,/^(?:&quot;)/i,/^(?:<!--(.|\n)*-->)/i,/^(?:\s)/i,/^(?:<)/i,/^(?:.)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"S1":{"rules":[0,8,9,10,11,12,13,14,15,16,17,18],"inclusive":true},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,13,17,18],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (true) {
exports.parser = XmlReporteGramatica;
exports.Parser = XmlReporteGramatica.Parser;
exports.parse = function () { return XmlReporteGramatica.parse.apply(XmlReporteGramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = __webpack_require__(/*! fs */ 1).readFileSync(__webpack_require__(/*! path */ 2).normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
  exports.main(process.argv.slice(1));
}
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "/UlT":
/*!********************************!*\
  !*** ./src/clases/Analizar.ts ***!
  \********************************/
/*! exports provided: errorLex, Analizador */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorLex", function() { return errorLex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Analizador", function() { return Analizador; });
/* harmony import */ var _Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Analizadores/gramatica */ "lbnd");
/* harmony import */ var _Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Analizadores_XML__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Analizadores/XML */ "7krQ");
/* harmony import */ var _Analizadores_XML__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Analizadores_XML__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Analizadores_XMLDescendente__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Analizadores/XMLDescendente */ "EViG");
/* harmony import */ var _Analizadores_XMLDescendente__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Analizadores_XMLDescendente__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Analizadores_XQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Analizadores/XQuery */ "9IBB");
/* harmony import */ var _Analizadores_XQuery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Analizadores_XQuery__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Controlador__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Controlador */ "mXYb");
/* harmony import */ var _TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TablaSimbolos/TablaSimbolos */ "arwD");






let errorLex = [];
/* let error_html = controlador.graficar_Semantico (controlador,ts_globla);  Metodos para lo errores*/
class Analizador {
    ejecutar(entradaxml, entradaxpath) {
        console.log("vamos a analizar la entrada");
        //Ejecutar xml 
        let astxml = _Analizadores_XML__WEBPACK_IMPORTED_MODULE_1__["parse"](entradaxml);
        let controlador = new _Controlador__WEBPACK_IMPORTED_MODULE_4__["default"]();
        let ts_globla = new _TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_5__["TablaSimbolos"](null, "Global");
        console.log(errorLex);
        astxml.ejecutar(controlador, ts_globla);
        //Ejecutar xpath
        if (entradaxpath.length > 0) {
            let astxpaht = _Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0__["parse"](entradaxpath);
            astxml.ejecutarXPath(controlador, ts_globla, astxpaht);
        }
        let ts_html = controlador.graficar_ts(controlador, ts_globla);
        let retorno = { "ts": ts_html, "consola": controlador.consola };
        return retorno;
    }
    ejecutarDes(entradaxml, entradaxpath) {
        console.log("vamos a analizar la entrada");
        //Ejecutar xml 
        let astxml = _Analizadores_XMLDescendente__WEBPACK_IMPORTED_MODULE_2__["parse"](entradaxml);
        let controlador = new _Controlador__WEBPACK_IMPORTED_MODULE_4__["default"]();
        let ts_globla = new _TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_5__["TablaSimbolos"](null, "Global");
        astxml.ejecutarDescendente(controlador, ts_globla);
        //Ejecutar xpath
        if (entradaxpath.length > 0) {
            let astxpaht = _Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0__["parse"](entradaxpath);
            astxml.ejecutarXPath(controlador, ts_globla, astxpaht);
        }
        // console.log("aa");
        let ts_html = controlador.graficar_ts(controlador, ts_globla);
        let retorno = { "ts": ts_html, "consola": controlador.consola };
        return retorno;
    }
    traducirxml(entradaxml, entradaxpath) {
        let astxml = _Analizadores_XML__WEBPACK_IMPORTED_MODULE_1__["parse"](entradaxml);
        let controlador = new _Controlador__WEBPACK_IMPORTED_MODULE_4__["default"]();
        let ts_globla = new _TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_5__["TablaSimbolos"](null, "Global");
        controlador.generador.clearCode();
        astxml.ejecutar(controlador, ts_globla);
        if (entradaxpath.length > 0) {
            let astxpaht = _Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0__["parse"](entradaxpath);
            astxml.ejecutarXPath(controlador, ts_globla, astxpaht);
        }
        let ts_html = controlador.graficar_ts(controlador, ts_globla);
        let retorno = { "ts": ts_html, "consola": controlador.generador.getCode() };
        return retorno;
    }
    recorrer(input) {
        try {
            let ast = _Analizadores_XML__WEBPACK_IMPORTED_MODULE_1__["parse"](input);
            let nodo_ast = ast.recorrer();
            return nodo_ast;
        }
        catch (error) {
        }
    }
    recorrerDes(input) {
        try {
            let ast = _Analizadores_XMLDescendente__WEBPACK_IMPORTED_MODULE_2__["parse"](input);
            console.log(ast);
            let nodo_ast = ast.recorrer();
            return nodo_ast;
        }
        catch (error) {
        }
    }
    recorrerDesxpath(input) {
        try {
            let ast = _Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0__["parse"](input);
            console.log(ast);
            console.log(ast);
            let nodo_ast = ast.recorrer();
            return nodo_ast;
        }
        catch (error) {
        }
    }
    recorrerXquery(entradaxquery) {
        console.log("vamos a analizar la entrada");
        //Ejecutar Xquery
        _Analizadores_XQuery__WEBPACK_IMPORTED_MODULE_3__["parse"](entradaxquery);
    }
}


/***/ }),

/***/ "/l+n":
/*!********************************!*\
  !*** ./src/Clases/Analizar.ts ***!
  \********************************/
/*! exports provided: errorLex, Analizador */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorLex", function() { return errorLex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Analizador", function() { return Analizador; });
/* harmony import */ var _Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Analizadores/gramatica */ "lbnd");
/* harmony import */ var _Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Analizadores_XML__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Analizadores/XML */ "7krQ");
/* harmony import */ var _Analizadores_XML__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Analizadores_XML__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Analizadores_XMLDescendente__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Analizadores/XMLDescendente */ "EViG");
/* harmony import */ var _Analizadores_XMLDescendente__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Analizadores_XMLDescendente__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Analizadores_XQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Analizadores/XQuery */ "9IBB");
/* harmony import */ var _Analizadores_XQuery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Analizadores_XQuery__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Controlador__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Controlador */ "iMxP");
/* harmony import */ var _TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TablaSimbolos/TablaSimbolos */ "AviG");






let errorLex = [];
/* let error_html = controlador.graficar_Semantico (controlador,ts_globla);  Metodos para lo errores*/
class Analizador {
    ejecutar(entradaxml, entradaxpath) {
        console.log("vamos a analizar la entrada");
        //Ejecutar xml 
        let astxml = _Analizadores_XML__WEBPACK_IMPORTED_MODULE_1__["parse"](entradaxml);
        let controlador = new _Controlador__WEBPACK_IMPORTED_MODULE_4__["default"]();
        let ts_globla = new _TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_5__["TablaSimbolos"](null, "Global");
        console.log(errorLex);
        astxml.ejecutar(controlador, ts_globla);
        //Ejecutar xpath
        if (entradaxpath.length > 0) {
            let astxpaht = _Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0__["parse"](entradaxpath);
            astxml.ejecutarXPath(controlador, ts_globla, astxpaht);
        }
        let ts_html = controlador.graficar_ts(controlador, ts_globla);
        let retorno = { "ts": ts_html, "consola": controlador.consola };
        return retorno;
    }
    ejecutarDes(entradaxml, entradaxpath) {
        console.log("vamos a analizar la entrada");
        //Ejecutar xml 
        let astxml = _Analizadores_XMLDescendente__WEBPACK_IMPORTED_MODULE_2__["parse"](entradaxml);
        let controlador = new _Controlador__WEBPACK_IMPORTED_MODULE_4__["default"]();
        let ts_globla = new _TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_5__["TablaSimbolos"](null, "Global");
        astxml.ejecutarDescendente(controlador, ts_globla);
        //Ejecutar xpath
        if (entradaxpath.length > 0) {
            let astxpaht = _Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0__["parse"](entradaxpath);
            astxml.ejecutarXPath(controlador, ts_globla, astxpaht);
        }
        // console.log("aa");
        let ts_html = controlador.graficar_ts(controlador, ts_globla);
        let retorno = { "ts": ts_html, "consola": controlador.consola };
        return retorno;
    }
    traducirxml(entradaxml, entradaxpath) {
        let astxml = _Analizadores_XML__WEBPACK_IMPORTED_MODULE_1__["parse"](entradaxml);
        let controlador = new _Controlador__WEBPACK_IMPORTED_MODULE_4__["default"]();
        let ts_globla = new _TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_5__["TablaSimbolos"](null, "Global");
        controlador.generador.clearCode();
        astxml.ejecutar(controlador, ts_globla);
        if (entradaxpath.length > 0) {
            let astxpaht = _Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0__["parse"](entradaxpath);
            astxml.ejecutarXPath(controlador, ts_globla, astxpaht);
        }
        let ts_html = controlador.graficar_ts(controlador, ts_globla);
        let retorno = { "ts": ts_html, "consola": controlador.generador.getCode() };
        return retorno;
    }
    recorrer(input) {
        try {
            let ast = _Analizadores_XML__WEBPACK_IMPORTED_MODULE_1__["parse"](input);
            let nodo_ast = ast.recorrer();
            return nodo_ast;
        }
        catch (error) {
        }
    }
    recorrerDes(input) {
        try {
            let ast = _Analizadores_XMLDescendente__WEBPACK_IMPORTED_MODULE_2__["parse"](input);
            console.log(ast);
            let nodo_ast = ast.recorrer();
            return nodo_ast;
        }
        catch (error) {
        }
    }
    recorrerDesxpath(input) {
        try {
            let ast = _Analizadores_gramatica__WEBPACK_IMPORTED_MODULE_0__["parse"](input);
            console.log(ast);
            console.log(ast);
            let nodo_ast = ast.recorrer();
            return nodo_ast;
        }
        catch (error) {
        }
    }
    recorrerXquery(entradaxquery) {
        console.log("vamos a analizar la entrada");
        //Ejecutar Xquery
        _Analizadores_XQuery__WEBPACK_IMPORTED_MODULE_3__["parse"](entradaxquery);
    }
}


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\fuent\Desktop\Compiladores 2 Proyecto 1 final\Compiladores2Proyecto1\src\main.ts */"zUnb");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "1NQK":
/*!**********************************************!*\
  !*** ./src/Clases/Instrucciones/Ejecutar.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ejecutar; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");

class Ejecutar {
    constructor(llamada, linea, col) {
        this.llamada = llamada;
        this.linea = linea;
        this.column = col;
    }
    ejecutar(controlador, ts) {
        this.llamada.ejecutar(controlador, ts);
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("exec", "");
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.llamada.identificador, ""));
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("(", ""));
        for (let x = 0; x < this.llamada.parametros.length; x++) {
            let hijo = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Exp", "");
            hijo.AddHijo(this.llamada.parametros[x].recorrer());
            padre.AddHijo(hijo);
        }
        //TODO: AGREGAR NODOS HIJOS DE PARAMETROS
        //a
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](")", ""));
        return padre;
    }
}


/***/ }),

/***/ 2:
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "3Bn/":
/*!********************************************!*\
  !*** ./src/Clases/GeneradorC3D/Nativas.ts ***!
  \********************************************/
/*! exports provided: Nativas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nativas", function() { return Nativas; });
/* harmony import */ var _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneradorC3D */ "cg4T");

class Nativas {
    generarNativas() {
        this.nativa_print_str();
        //this.nativa_print_integer();
        this.nativa_compararIgual_str_str();
        // this.nativa_compararNoIgual_str_str();
        //this.nativa_ToUpperCase();
        //this.nativa_ToLowerCase();
        this.nativa_concat_str_str();
        //this.nativa_concat_dbl_str();
        //  this.nativa_concat_str_dbl();
        this.nativa_concat_int_str();
        this.nativa_concat_str_int();
        //this.nativa_concat_str_bol();
        // this.nativa_concat_bol_str();
        //this.nativa_lenght_str();
        return _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia().getNativas();
    }
    nativa_lenght_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let next = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_lenght_str');
        gen.isFunc = '\t';
        gen.genExpresion(t0, 'p', '1', '+');
        gen.genGetStack(t1, t0);
        gen.genAsignacion(t3, '0');
        gen.genLabel(next);
        gen.genGetHeap(t2, t1);
        gen.genIf(t2, '-1', '==', fin);
        gen.genExpresion(t3, t3, '1', '+');
        gen.genExpresion(t1, t1, '1', '+');
        gen.genGoto(next);
        gen.genLabel(fin);
        gen.genSetStack('p', t3);
        gen.genCode('return;');
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t0);
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
    }
    nativa_print_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let next = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_print_str');
        gen.isFunc = '\t';
        gen.genGetStack(t1, 'p');
        gen.genLabel(next);
        gen.genGetHeap(t2, t1);
        gen.genIf(t2, '-1', '==', fin);
        gen.genPrint('c', t2);
        gen.genExpresion(t1, t1, '1', '+');
        gen.genGoto(next);
        gen.genLabel(fin);
        gen.genCode('return;');
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
    }
    /*
        nativa_print_integer() {
            const gen = GeneradorC3D.getInstancia();
            let t1 = gen.newTemporal();
            let t2 = gen.newTemporal();
            let t3 = gen.newTemporal();
            let inicio = gen.newLabel();
            let nextPos = gen.newLabel();
            let nextPrt = gen.newLabel();
            let fin = gen.newLabel();
    
            gen.genFuncion('nativa_print_integer');
            gen.isFunc = '\t';
            gen.genGetStack(t1, 'p');
            gen.genIf(t1, '0', '>=', inicio);
            gen.genPrint('c', '45');
            gen.genExpresion(t1, t1, '-1', '*');
            gen.genLabel(inicio);
            gen.genAsignacion(t3, 'p');
            gen.genSetStack(t3, '-1');
            gen.genExpresion(t3, t3, '1', '+');
            gen.genLabel(nextPos);
            gen.genIf(t1, '0', '==', nextPrt);
            gen.genCode(`${t2} = fmod(${t1}, 10);`);
            gen.genSetStack(t3, t2);
            gen.genExpresion(t3, t3, '1', '+');
            gen.genExpresion(t1, t1, '10', '/');
            gen.genGoto(nextPos);
            gen.genLabel(nextPrt);
            gen.genExpresion(t3, t3, '1', '-');
            gen.genGetStack(t1, t3);
            gen.genIf(t1, '-1', '==', fin);
            gen.genPrint('i', t1);
            gen.genGoto(nextPrt);
            gen.genLabel(fin);
            gen.genCode('return;');
            gen.genEndFuncion();
            gen.isFunc = '';
            gen.freeTemp(t1);
            gen.freeTemp(t2);
            gen.freeTemp(t3);
        }*/
    nativa_compararIgual_str_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let c1 = gen.newTemporal();
        let c2 = gen.newTemporal();
        let lblfalse = gen.newLabel();
        let lbltrue = gen.newLabel();
        let l2 = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_compararIgual_str_str');
        gen.isFunc = '\t';
        gen.genExpresion(t0, 'p', '1', '+');
        gen.genGetStack(p1, t0);
        gen.genExpresion(t0, 'p', '2', '+');
        gen.genGetStack(p2, t0);
        gen.genIf(p1, '-1', '==', l2);
        gen.genIf(p2, '-1', '==', lblfalse);
        gen.genGoto(inicio);
        gen.genLabel(l2);
        gen.genIf(p2, '-1', '==', lbltrue);
        gen.genGoto(lblfalse);
        gen.genLabel(inicio);
        gen.genGetHeap(c1, p1);
        gen.genGetHeap(c2, p2);
        gen.genLabel(nextPos);
        gen.genIf(c1, c2, '!=', lblfalse);
        gen.genIf(c1, '-1', '==', lbltrue);
        gen.genExpresion(p1, p1, '1', '+');
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGetHeap(c1, p1);
        gen.genGetHeap(c2, p2);
        gen.genGoto(nextPos);
        gen.genLabel(lbltrue);
        gen.genSetStack('p', '1');
        gen.genGoto(fin);
        gen.genLabel(lblfalse);
        gen.genSetStack('p', '0');
        gen.genLabel(fin);
        gen.genCode('return;');
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(p1);
        gen.freeTemp(p2);
        gen.freeTemp(c1);
        gen.freeTemp(c2);
    }
    nativa_compararNoIgual_str_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t1 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let c1 = gen.newTemporal();
        let c2 = gen.newTemporal();
        let lblfalse = gen.newLabel();
        let lbltrue = gen.newLabel();
        let l2 = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_compararNoIgual_str_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genIf(p1, '-1', '==', l2);
        gen.genIf(p2, '-1', '==', lbltrue);
        gen.genGoto(inicio);
        gen.genLabel(l2);
        gen.genIf(p2, '-1', '==', lblfalse);
        gen.genGoto(lbltrue);
        gen.genLabel(inicio);
        gen.genGetHeap(c1, p1);
        gen.genGetHeap(c2, p2);
        gen.genLabel(nextPos);
        gen.genIf(c1, c2, '!=', lbltrue);
        gen.genIf(c1, '-1', '==', lblfalse);
        gen.genExpresion(p1, p1, '1', '+');
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGetHeap(c1, p1);
        gen.genGetHeap(c2, p2);
        gen.genGoto(nextPos);
        gen.genLabel(lbltrue);
        gen.genSetStack('p', '1');
        gen.genGoto(fin);
        gen.genLabel(lblfalse);
        gen.genSetStack('p', '0');
        gen.genLabel(fin);
        gen.genCode('return;');
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
        gen.freeTemp(c1);
        gen.freeTemp(c2);
    }
    nativa_ToUpperCase() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let t4 = gen.newTemporal();
        let nextPos = gen.newLabel();
        let setChar = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_ToUpperCase');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(t2, t1); // carga la referencia del string
        gen.genAsignacion(t3, 'h'); // inicio de posicion vacia del heap
        gen.genLabel(nextPos);
        gen.genGetHeap(t4, t2);
        gen.genIf(t4, '-1', '==', fin);
        gen.genIf(t4, '97', '<', setChar);
        gen.genIf(t4, '122', '>', setChar);
        gen.genExpresion(t4, t4, '32', '-');
        gen.genLabel(setChar);
        gen.genSetHeap('h', t4);
        gen.avanzarHeap();
        gen.genExpresion(t2, t2, '1', '+');
        gen.genGoto(nextPos);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t3);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
        gen.freeTemp(t4);
    }
    nativa_ToLowerCase() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let t4 = gen.newTemporal();
        let nextPos = gen.newLabel();
        let setChar = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_ToLowerCase');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(t2, t1); // carga la referencia del string
        gen.genAsignacion(t3, 'h'); // inicio de posicion vacia del heap
        gen.genLabel(nextPos);
        gen.genGetHeap(t4, t2);
        gen.genIf(t4, '-1', '==', fin);
        gen.genIf(t4, '65', '<', setChar);
        gen.genIf(t4, '90', '>', setChar);
        gen.genExpresion(t4, t4, '32', '+');
        gen.genLabel(setChar);
        gen.genSetHeap('h', t4);
        gen.avanzarHeap();
        gen.genExpresion(t2, t2, '1', '+');
        gen.genGoto(nextPos);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t3);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
        gen.freeTemp(t4);
    }
    nativa_concat_str_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let str1 = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_str_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t1, 'h');
        gen.genLabel(str1);
        gen.genGetHeap(t2, p1);
        gen.genIf(t2, '-1', '==', str2);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '1', '+');
        gen.genGoto(str1);
        gen.genLabel(str2);
        gen.genGetHeap(t2, p2);
        gen.genIf(t2, '-1', '==', fin);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGoto(str2);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t1);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
    nativa_concat_int_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let validar = gen.newLabel();
        let str1 = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_int_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t0, 'h');
        gen.genIf(p1, '0', '>=', inicio);
        gen.genSetHeap('h', '45');
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '-1', '*');
        gen.genLabel(inicio);
        gen.genAsignacion(t1, '0');
        gen.genLabel(nextPos);
        gen.genIf(p1, '0', '==', validar);
        gen.genExpresion(t1, t1, '10', '*');
        gen.genCode(`${t2} = fmod(${p1}, 10);`);
        //gen.genExpresion(t2, '(int)' + p1, '10', '%');
        gen.genExpresion(t1, t1, t2, '+');
        gen.genExpresion(p1, p1, '10', '/');
        gen.genCode(p1 + ' = (int)' + p1 + ';');
        gen.genGoto(nextPos);
        gen.genLabel(validar);
        gen.genIf(t1, '0', '!=', str1);
        gen.genSetHeap('h', '48');
        gen.avanzarHeap();
        gen.genLabel(str1);
        gen.genIf(t1, '0', '==', str2);
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        //gen.genExpresion(t2, '(int)' + t1, '10', '%');
        gen.genExpresion(t2, t2, '48', '+');
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(t1, t1, '10', '/');
        gen.genCode(t1 + ' = (int)' + t1 + ';');
        gen.genGoto(str1);
        gen.genLabel(str2);
        gen.genGetHeap(t2, p2);
        gen.genIf(t2, '-1', '==', fin);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGoto(str2);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
    nativa_concat_str_int() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let pre = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let validar = gen.newLabel();
        let str1 = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_str_int');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t0, 'h');
        gen.genLabel(str2);
        gen.genGetHeap(t2, p1);
        gen.genIf(t2, '-1', '==', pre);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '1', '+');
        gen.genGoto(str2);
        gen.genLabel(pre);
        gen.genIf(p2, '0', '>=', inicio);
        gen.genSetHeap('h', '45');
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '-1', '*');
        gen.genLabel(inicio);
        gen.genAsignacion(t1, '0');
        gen.genLabel(nextPos);
        gen.genIf(p2, '0', '==', validar);
        gen.genExpresion(t1, t1, '10', '*');
        gen.genCode(`${t2} = fmod(${p2}, 10);`);
        //gen.genExpresion(t2, '(int)' + p2, '10', '%');
        gen.genExpresion(t1, t1, t2, '+');
        gen.genExpresion(p2, p2, '10', '/');
        gen.genCode(p2 + ' = (int)' + p2 + ';');
        gen.genGoto(nextPos);
        gen.genLabel(validar);
        gen.genIf(t1, '0', '!=', str1);
        gen.genSetHeap('h', '48');
        gen.avanzarHeap();
        gen.genLabel(str1);
        gen.genIf(t1, '0', '==', fin);
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        //gen.genExpresion(t2, '(int)' + t1, '10', '%');
        gen.genExpresion(t2, t2, '48', '+');
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(t1, t1, '10', '/');
        gen.genCode(t1 + ' = (int)' + t1 + ';');
        gen.genGoto(str1);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
    nativa_concat_dbl_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let t4 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let pre = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let validar = gen.newLabel();
        let str1 = gen.newLabel();
        let strd = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_dbl_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t0, 'h');
        gen.genIf(p1, '0', '>=', pre);
        gen.genSetHeap('h', '45');
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '-1', '*');
        gen.genLabel(pre);
        gen.genCode(`${t1} = (int)${p1};`);
        //gen.genCode(`${t2} = fmod(${p1}, 1);`);
        gen.genAsignacion(t3, '0');
        gen.genLabel(inicio);
        gen.genIf(t1, '0', '==', validar);
        gen.genExpresion(t3, t3, '10', '*');
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        gen.genExpresion(t3, t3, t2, '+');
        gen.genExpresion(t1, t1, '10', '/');
        gen.genCode(`${t1} = (int)${t1};`);
        gen.genGoto(inicio);
        gen.genLabel(validar);
        gen.genIf(t3, '0', '!=', nextPos);
        gen.genSetHeap('h', '48');
        gen.avanzarHeap();
        gen.genLabel(nextPos);
        gen.genIf(t3, '0', '==', str1);
        gen.genCode(`${t1} = fmod(${t3}, 10);`);
        gen.genExpresion(t3, t3, '10', '/');
        gen.genCode(`${t3} = (int)${t3};`);
        gen.genExpresion(t2, t1, '48', '+');
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genGoto(nextPos);
        gen.genLabel(str1);
        gen.genSetHeap('h', '46');
        gen.avanzarHeap();
        gen.genAsignacion(t3, '0');
        gen.genCode(`${t1} = fmod(${p1}, 1);`);
        gen.genLabel(strd);
        gen.genIf(t3, '3', '==', str2);
        gen.genExpresion(t1, t1, '10', '*');
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        gen.genCode(`${t2} = (int)${t2};`);
        gen.genExpresion(t4, t2, '48', '+');
        gen.genSetHeap('h', t4);
        gen.avanzarHeap();
        gen.genExpresion(t3, t3, '1', '+');
        gen.genGoto(strd);
        gen.genLabel(str2);
        gen.genGetHeap(t2, p2);
        gen.genIf(t2, '-1', '==', fin);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGoto(str2);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
        gen.freeTemp(t4);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
    nativa_concat_str_dbl() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let t4 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let pre = gen.newLabel();
        let sig = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let validar = gen.newLabel();
        let str1 = gen.newLabel();
        let strd = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_str_dbl');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t0, 'h');
        gen.genLabel(str2);
        gen.genGetHeap(t2, p1);
        gen.genIf(t2, '-1', '==', sig);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '1', '+');
        gen.genGoto(str2);
        gen.genLabel(sig);
        gen.genIf(p2, '0', '>=', pre);
        gen.genSetHeap('h', '45');
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '-1', '*');
        gen.genLabel(pre);
        gen.genCode(`${t1} = (int)${p2};`);
        //gen.genCode(`${t2} = fmod(${p2}, 1);`);
        gen.genAsignacion(t3, '0');
        gen.genLabel(inicio);
        gen.genIf(t1, '0', '==', validar);
        gen.genExpresion(t3, t3, '10', '*');
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        gen.genExpresion(t3, t3, t2, '+');
        gen.genExpresion(t1, t1, '10', '/');
        gen.genCode(`${t1} = (int)${t1};`);
        gen.genGoto(inicio);
        gen.genLabel(validar);
        gen.genIf(t3, '0', '!=', nextPos);
        gen.genSetHeap('h', '48');
        gen.avanzarHeap();
        gen.genLabel(nextPos);
        gen.genIf(t3, '0', '==', str1);
        gen.genCode(`${t1} = fmod(${t3}, 10);`);
        gen.genExpresion(t3, t3, '10', '/');
        gen.genCode(`${t3} = (int)${t3};`);
        gen.genExpresion(t2, t1, '48', '+');
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genGoto(nextPos);
        gen.genLabel(str1);
        gen.genSetHeap('h', '46');
        gen.avanzarHeap();
        gen.genAsignacion(t3, '0');
        gen.genCode(`${t1} = fmod(${p2}, 1);`);
        gen.genLabel(strd);
        gen.genIf(t3, '3', '==', fin);
        gen.genExpresion(t1, t1, '10', '*');
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        gen.genCode(`${t2} = (int)${t2};`);
        gen.genExpresion(t4, t2, '48', '+');
        gen.genSetHeap('h', t4);
        gen.avanzarHeap();
        gen.genExpresion(t3, t3, '1', '+');
        gen.genGoto(strd);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
        gen.freeTemp(t4);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
    nativa_concat_str_bol() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let str1 = gen.newLabel();
        let bol = gen.newLabel();
        let lblf = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_str_bol');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t0, 'h');
        gen.genLabel(str1);
        gen.genGetHeap(t1, p1);
        gen.genIf(t1, '-1', '==', bol);
        gen.genSetHeap('h', t1);
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '1', '+');
        gen.genGoto(str1);
        gen.genLabel(bol);
        gen.genIf(p2, '1', '!=', lblf);
        gen.genSetHeap('h', '116');
        gen.avanzarHeap();
        gen.genSetHeap('h', '114');
        gen.avanzarHeap();
        gen.genSetHeap('h', '117');
        gen.avanzarHeap();
        gen.genSetHeap('h', '101');
        gen.avanzarHeap();
        gen.genGoto(fin);
        gen.genLabel(lblf);
        gen.genSetHeap('h', '102');
        gen.avanzarHeap();
        gen.genSetHeap('h', '97');
        gen.avanzarHeap();
        gen.genSetHeap('h', '108');
        gen.avanzarHeap();
        gen.genSetHeap('h', '115');
        gen.avanzarHeap();
        gen.genSetHeap('h', '101');
        gen.avanzarHeap();
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
    nativa_concat_bol_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let str2 = gen.newLabel();
        let lblf = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_bol_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t0, 'h');
        gen.genIf(p1, '1', '!=', lblf);
        gen.genSetHeap('h', '116');
        gen.avanzarHeap();
        gen.genSetHeap('h', '114');
        gen.avanzarHeap();
        gen.genSetHeap('h', '117');
        gen.avanzarHeap();
        gen.genSetHeap('h', '101');
        gen.avanzarHeap();
        gen.genGoto(str2);
        gen.genLabel(lblf);
        gen.genSetHeap('h', '102');
        gen.avanzarHeap();
        gen.genSetHeap('h', '97');
        gen.avanzarHeap();
        gen.genSetHeap('h', '108');
        gen.avanzarHeap();
        gen.genSetHeap('h', '115');
        gen.avanzarHeap();
        gen.genSetHeap('h', '101');
        gen.avanzarHeap();
        gen.genLabel(str2);
        gen.genGetHeap(t1, p2);
        gen.genIf(t1, '-1', '==', fin);
        gen.genSetHeap('h', t1);
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGoto(str2);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
}


/***/ }),

/***/ "7KGZ":
/*!*******************************************************!*\
  !*** ./src/Clases/Expreciones/Operaciones/Logicas.ts ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Logicas; });
/* harmony import */ var src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/clases/AST/Nodo */ "XRm8");
/* harmony import */ var src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/clases/TablaSimbolos/Tipo */ "YE/1");
/* harmony import */ var _retorno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../retorno */ "munq");
/* harmony import */ var _Operaciones__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Operaciones */ "vu0p");




class Logicas extends _Operaciones__WEBPACK_IMPORTED_MODULE_3__["default"] {
    constructor(exp1, op, exp2, linea, columna, expU) {
        super(exp1, op, exp2, linea, columna, expU);
    }
    limpiar() {
        this.lblFalse = '';
        this.lblTrue = '';
        if (this.expU == false) {
            this.exp1.limpiar();
            this.exp2.limpiar();
        }
        else {
            this.exp1.limpiar();
        }
    }
    getTipo(controlador, ts) {
        let valor = this.getValor(controlador, ts);
        if (typeof valor === 'number') {
            return src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE;
        }
        else if (typeof valor === 'string') {
            return src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].CADENA;
        }
        else if (typeof valor === 'boolean') {
            return src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].BOOLEANO;
        }
    }
    getValor(controlador, TablaSimbolos) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;
        if (this.expU == false) {
            valor_exp1 = this.exp1.getValor(controlador, TablaSimbolos);
            valor_exp2 = this.exp2.getValor(controlador, TablaSimbolos);
        }
        else {
            valor_expU = this.exp1.getValor(controlador, TablaSimbolos);
        }
        switch (this.operador) {
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].AND:
                return this.and(valor_exp1, valor_exp2);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].NOT:
                return this.not(valor_expU);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].OR:
                return this.or(valor_exp1, valor_exp2);
            default:
                break;
        }
    }
    and(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'boolean') {
            if (typeof valor_exp2 == 'boolean') {
                return valor_exp1 && valor_exp2;
            }
            else {
                //Error semantico
            }
        }
    }
    or(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'boolean') {
            if (typeof valor_exp2 == 'boolean') {
                return valor_exp1 || valor_exp2;
            }
            else {
                //Erro semantico
            }
        }
    }
    not(valor_expU) {
        if (typeof valor_expU == 'boolean') {
            return !valor_expU;
        }
        else {
            //Erro semantico
        }
    }
    getvalor3d(controlador, ts) {
        switch (this.operador) {
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].AND:
                return this.and3D(controlador, ts);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].NOT:
                break;
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].OR:
                return this.or3D(controlador, ts);
            default:
                break;
        }
    }
    and3D(controlador, ts) {
        const generador = controlador.generador;
        this.lblTrue = this.lblTrue == '' ? generador.newLabel() : this.lblTrue;
        this.lblFalse = this.lblFalse == '' ? generador.newLabel() : this.lblFalse;
        this.exp1.lblTrue = generador.newLabel();
        this.exp2.lblTrue = this.lblTrue;
        this.exp1.lblFalse = this.exp2.lblFalse = this.lblFalse;
        const expIzq = this.exp1.getvalor3d(controlador, ts);
        generador.genLabel(this.exp1.lblTrue);
        const expDer = this.exp2.getvalor3d(controlador, ts);
        if (expIzq.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].BOOLEANO && expDer.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].BOOLEANO) {
            const Retorno = new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"]('', false, new src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("BOOLEAN"));
            Retorno.lblTrue = this.lblTrue;
            Retorno.lblFalse = this.exp2.lblFalse;
            return Retorno;
        }
    }
    or3D(controlador, ts) {
        const generador = controlador.generador;
        this.lblTrue = this.lblTrue == '' ? generador.newLabel() : this.lblTrue;
        this.lblFalse = this.lblFalse == '' ? generador.newLabel() : this.lblFalse;
        this.exp1.lblTrue = this.exp2.lblTrue = this.lblTrue;
        this.exp1.lblFalse = generador.newLabel();
        this.exp2.lblFalse = this.lblFalse;
        const expIzq = this.exp1.getvalor3d(controlador, ts);
        generador.genLabel(this.exp1.lblFalse);
        const expDer = this.exp2.getvalor3d(controlador, ts);
        if (expIzq.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].BOOLEANO && expDer.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].BOOLEANO) {
            const Retorno = new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"]('', false, new src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("BOOLEAN"));
            Retorno.lblTrue = this.lblTrue;
            Retorno.lblFalse = this.exp2.lblFalse;
            return Retorno;
        }
    }
    recorrer() {
        let padre = new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Exp", "");
        if (this.expU) {
            padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.op, ""));
            padre.AddHijo(this.exp1.recorrer());
        }
        else {
            padre.AddHijo(this.exp1.recorrer());
            padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.op, ""));
            padre.AddHijo(this.exp2.recorrer());
        }
        return padre;
    }
}


/***/ }),

/***/ "7VuF":
/*!*********************************************!*\
  !*** ./src/Clases/xpath/intrucciondoble.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return instrucciondoble; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");

class instrucciondoble {
    constructor(i1, i2) {
        this.i1 = i1;
        this.i2 = i2;
    }
    ejecutar(controlador, ts) {
        this.i1.ejecutar(controlador, ts);
        this.temp = controlador.consola;
        controlador.consola = "";
        this.i2.ejecutar(controlador, ts);
        if (this.temp != controlador.consola) {
            controlador.consola = this.temp + controlador.consola;
        }
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("|", "");
        padre.AddHijo(this.i1.recorrer());
        padre.AddHijo(this.i2.recorrer());
        return padre;
    }
}


/***/ }),

/***/ "7krQ":
/*!*********************************!*\
  !*** ./src/Analizadores/XML.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var XML = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[2,12],$V1=[1,8],$V2=[5,6,8,13],$V3=[1,18],$V4=[1,17],$V5=[2,4,10],$V6=[2,4],$V7=[1,21],$V8=[4,20];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"inicio":3,"<":4,"?":5,"ID":6,"latributos":7,">":8,"raices":9,"EOF":10,"raiz":11,"objeto":12,"/":13,"texto_libre":14,"objetos":15,"atributos":16,"atributo":17,"=":18,"CADENA":19,"TEXTO":20,"$accept":0,"$end":1},
terminals_: {2:"error",4:"<",5:"?",6:"ID",8:">",10:"EOF",13:"/",18:"=",19:"CADENA",20:"TEXTO"},
productions_: [0,[3,8],[9,2],[9,1],[11,1],[12,5],[12,9],[12,9],[12,1],[15,2],[15,1],[7,1],[7,0],[16,2],[16,1],[17,3],[14,2],[14,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$= new ast.default($$[$0-1]);  return this.$; 
break;
case 2: case 9: case 13:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 3: case 10: case 14:
 this.$ = [$$[$0]]; 
break;
case 4:
 this.$ = $$[$0] 
break;
case 5:
 this.$ = new Objeto.default($$[$0-3],'',_$[$0-4].first_line, _$[$0-4].first_column,$$[$0-2],[],1); 
break;
case 6:
 this.$ = new Objeto.default($$[$0-7],$$[$0-4],_$[$0-8].first_line, _$[$0-8].first_column,$$[$0-6],[],2,$$[$0-1]); 
break;
case 7:
 this.$ = new Objeto.default($$[$0-7],'',_$[$0-8].first_line, _$[$0-8].first_column,$$[$0-6],$$[$0-4],2,$$[$0-1]); 
break;
case 8:
  new LErrores("Sintactico", "No se esperaba: "+yytext,"XML", this._$.first_line , this._$.first_column);
break;
case 11: case 17:
 this.$ = $$[$0]; 
break;
case 12:
 this.$ = []; 
break;
case 15:
$$[$0] = $$[$0].slice(1, $$[$0].length-1); this.$ = new Atributo.default($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 16:
 this.$ = $$[$0-1] + $$[$0]; 
break;
}
},
table: [{3:1,4:[1,2]},{1:[3]},{5:[1,3]},{6:[1,4]},{5:$V0,6:$V1,7:5,16:6,17:7},{5:[1,9]},o([5,8,13],[2,11],{17:10,6:$V1}),o($V2,[2,14]),{18:[1,11]},{8:[1,12]},o($V2,[2,13]),{19:[1,13]},{2:$V3,4:$V4,9:14,11:15,12:16},o($V2,[2,15]),{2:$V3,4:$V4,10:[1,19],11:20,12:16},o($V5,[2,3]),o($V5,$V6),{6:$V7},o($V5,[2,8]),{1:[2,1]},o($V5,[2,2]),o([8,13],$V0,{16:6,17:7,7:22,6:$V1}),{8:[1,24],13:[1,23]},{8:[1,25]},{2:$V3,4:$V4,12:29,14:26,15:27,20:[1,28]},o($V5,[2,5]),{4:[1,30],20:[1,31]},{2:$V3,4:[1,32],12:33},o($V8,[2,17]),o($V6,[2,10]),{13:[1,34]},o($V8,[2,16]),{6:$V7,13:[1,35]},o($V6,[2,9]),{6:[1,36]},{6:[1,37]},{8:[1,38]},{8:[1,39]},o($V5,[2,6]),o($V5,[2,7])],
defaultActions: {19:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

    let $ESPACIOS = "";

      const  Atributo = __webpack_require__ (/*! ../Clases/xml/atributo */ "Ab3f");
      const  Objeto  = __webpack_require__ (/*! ../Clases/xml/objeto */ "bzrv");
      const ast =__webpack_require__(/*! ../Clases/AST/Ast */ "ZSbs");
      const  {LErrores} =__webpack_require__ (/*! ../Clases/AST/ListaError */ "wLeh");
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* Ignoro los comentarios simples */
break;
case 1:/* skip whitespace */
break;
case 2: console.log("Reconocio : "+ yy_.yytext); return 19
break;
case 3: console.log("Reconocio : "+ yy_.yytext); return 6
break;
case 4: console.log("Reconocio : "+ yy_.yytext); return 4
break;
case 5: console.log("Reconocio : "+ yy_.yytext); return 18
break;
case 6: console.log("Reconocio : "+ yy_.yytext); return 13
break;
case 7: console.log("Reconocio : "+ yy_.yytext); return 5
break;
case 8: this.begin("S1"); $ESPACIOS=""; console.log("Reconocio : "+ yy_.yytext); return ">";
break;
case 9: yy_.yytext = $ESPACIOS + "<"; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 20; 
break;
case 10: yy_.yytext = $ESPACIOS + ">"; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 20; 
break;
case 11: yy_.yytext = $ESPACIOS + "\&"; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 20; 
break;
case 12: yy_.yytext = $ESPACIOS + "\'"; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 20; 
break;
case 13: yy_.yytext = $ESPACIOS + "\""; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 20; 
break;
case 14:  /* Ignoro los comentarios simples */
break;
case 15: $ESPACIOS += yy.lexer.match;
break;
case 16: this.begin("INITIAL"); console.log("Reconocio : "+ yy_.yytext); return "<";
break;
case 17: yy_.yytext = $ESPACIOS + yy_.yytext; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 20; 
break;
case 18:return 10
break;
case 19: console.log("Error Lexico "+yy_.yytext
                        +" linea "+yy_.yylineno
                        +" columna "+(yy_.yylloc.last_column+1));        
                        
break;
}
},
rules: [/^(?:<!--(.|\n)*-->)/i,/^(?:\s+)/i,/^(?:(("((\\([\'\"\\ntr]))|([^\"\\]+))*")))/i,/^(?:([a-zñA-ZÑ_][a-zñA-ZÑ0-9_]*))/i,/^(?:<)/i,/^(?:=)/i,/^(?:\/)/i,/^(?:\?)/i,/^(?:>)/i,/^(?:&lt;)/i,/^(?:&gt;)/i,/^(?:&amp;)/i,/^(?:&apos;)/i,/^(?:&quot;)/i,/^(?:<!--(.|\n)*-->)/i,/^(?:\s)/i,/^(?:<)/i,/^(?:.)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"S1":{"rules":[0,9,10,11,12,13,14,15,16,17,18,19],"inclusive":true},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,14,18,19],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (true) {
exports.parser = XML;
exports.Parser = XML.Parser;
exports.parse = function () { return XML.parse.apply(XML, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = __webpack_require__(/*! fs */ 1).readFileSync(__webpack_require__(/*! path */ 2).normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
  exports.main(process.argv.slice(1));
}
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "8VeP":
/*!****************************************!*\
  !*** ./src/Clases/xpath/barrabarra.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return barrabarra; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");

class barrabarra {
    constructor(exprecion, sig) {
        this.exprecion = exprecion;
        this.sig = sig;
    }
    ejecutar(controlador, ts) {
        if (this.exprecion.exprecion != null) {
            this.isxprecion(controlador, ts);
        }
        else {
            if (this.sig != null) {
                this.siguiente(controlador, ts);
            }
            else {
                this.obtenerall(controlador, ts);
            }
        }
    }
    obtenerall(controlador, ts) {
        if (ts != null) {
            for (let informacion of ts.tabla) {
                if (this.exprecion.tipo == 1) {
                    if (this.exprecion.id == "*" && informacion.sim.simbolo == 1) {
                        controlador.append(informacion.sim.objeto.gethtml("", controlador));
                    }
                    else {
                        if (informacion.identificador == this.exprecion.id && informacion.sim.simbolo == 1) {
                            controlador.append(informacion.sim.objeto.gethtml("", controlador));
                        }
                    }
                }
                else {
                    if (informacion.identificador == this.exprecion.id && informacion.sim.simbolo == 2) {
                        controlador.append(informacion.sim.valor + "\n");
                    }
                    else {
                        if (this.exprecion.id == "*" && informacion.sim.simbolo == 2) {
                            controlador.append(informacion.sim.valor);
                        }
                    }
                }
            }
            for (let tssig of ts.sig) {
                this.obtenerall(controlador, tssig.sig);
            }
        }
    }
    siguiente(controlador, ts) {
        if (ts != null) {
            for (let tssig of ts.sig) {
                if (this.exprecion.id == tssig.identificador || this.exprecion.id == "*") {
                    this.sig.ejecutar(controlador, tssig.sig);
                }
                else {
                    this.siguiente(controlador, tssig.sig);
                }
            }
        }
    }
    isxprecion(controlador, ts) {
        controlador.idlast = this.exprecion.id;
        let valor = this.exprecion.exprecion.getValor(controlador, ts);
        if (typeof valor == 'number') {
            this.isNumero(controlador, ts, valor);
        }
        else {
            this.esbool(controlador, ts);
        }
    }
    isNumero(controlador, ts, valor) {
        if (this.sig != null) {
            this.siguienteNumero(controlador, ts, valor);
        }
        else {
            this.obtenerallNumero(controlador, ts, valor);
        }
    }
    esbool(controlador, ts) {
        if (this.sig != null) {
            this.siguienteBool(controlador, ts);
        }
        else {
            this.obtenerBool(controlador, ts);
        }
    }
    siguienteNumero(controlador, ts, valor) {
        let cont = 1;
        if (ts != null) {
            for (let tssig of ts.sig) {
                if (this.exprecion.id == tssig.identificador) {
                    valor = this.exprecion.exprecion.getValor(controlador, ts);
                    if (cont == valor) {
                        this.sig.ejecutar(controlador, tssig.sig);
                    }
                    cont++;
                }
                else {
                    this.siguienteNumero(controlador, tssig.sig, valor);
                }
            }
        }
    }
    obtenerallNumero(controlador, ts, valor) {
        let cont = 1;
        if (ts != null) {
            for (let informacion of ts.tabla) {
                if (informacion.identificador == this.exprecion.id) {
                    valor = this.exprecion.exprecion.getValor(controlador, ts);
                    if (cont == valor) {
                        controlador.append(informacion.sim.objeto.gethtml("", controlador));
                    }
                    cont++;
                }
            }
            for (let tssig of ts.sig) {
                this.obtenerallNumero(controlador, tssig.sig, valor);
            }
        }
    }
    siguienteBool(controlador, ts) {
        let cont = 1;
        let posicion = 1;
        if (ts != null) {
            for (let tssig of ts.sig) {
                if (this.exprecion.id == tssig.identificador) {
                    controlador.position = cont;
                    controlador.posicionid = posicion;
                    if (this.exprecion.exprecion.getValor(controlador, ts)) {
                        this.sig.ejecutar(controlador, tssig.sig);
                    }
                    cont++;
                }
                else {
                    this.siguienteBool(controlador, tssig.sig);
                }
                posicion++;
            }
        }
    }
    obtenerBool(controlador, ts) {
        let cont = 1;
        let posicion = 1;
        if (ts != null) {
            for (let informacion of ts.tabla) {
                if (informacion.identificador == this.exprecion.id) {
                    controlador.position = cont;
                    controlador.posicionid = posicion;
                    if (this.exprecion.exprecion.getValor(controlador, ts)) {
                        controlador.append(informacion.sim.objeto.gethtml("", controlador));
                    }
                    cont++;
                }
                posicion++;
            }
            for (let tssig of ts.sig) {
                this.obtenerBool(controlador, tssig.sig);
            }
        }
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("//", "");
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.exprecion.id, ""));
        if (this.exprecion.exprecion != null) {
            padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("[", ""));
            padre.AddHijo(this.exprecion.exprecion.recorrer());
            padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("]", ""));
        }
        if (this.sig != null) {
            padre.AddHijo(this.sig.recorrer());
        }
        return padre;
    }
}


/***/ }),

/***/ "9IBB":
/*!************************************!*\
  !*** ./src/Analizadores/XQuery.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var XQuery = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,6],$V2=[1,7],$V3=[1,8],$V4=[1,9],$V5=[1,10],$V6=[1,11],$V7=[1,12],$V8=[1,13],$V9=[1,14],$Va=[5,7,31],$Vb=[5,7,9,14,15,16,17,20,24,26,27,29,31],$Vc=[1,40],$Vd=[1,43],$Ve=[1,39],$Vf=[1,38],$Vg=[1,37],$Vh=[1,42],$Vi=[1,41],$Vj=[1,46],$Vk=[1,44],$Vl=[1,45],$Vm=[1,47],$Vn=[1,66],$Vo=[1,64],$Vp=[1,60],$Vq=[1,61],$Vr=[1,57],$Vs=[1,58],$Vt=[1,62],$Vu=[1,63],$Vv=[1,65],$Vw=[1,67],$Vx=[1,68],$Vy=[1,69],$Vz=[1,70],$VA=[1,71],$VB=[1,72],$VC=[1,73],$VD=[1,74],$VE=[1,81],$VF=[1,75],$VG=[1,76],$VH=[1,77],$VI=[1,78],$VJ=[1,79],$VK=[1,80],$VL=[1,97],$VM=[1,94],$VN=[1,92],$VO=[1,95],$VP=[1,93],$VQ=[1,85],$VR=[1,86],$VS=[1,87],$VT=[1,88],$VU=[1,89],$VV=[1,90],$VW=[1,91],$VX=[1,96],$VY=[19,22,38,39,40,41,42,43,44,45,46,47,48,49,50,73],$VZ=[5,7,9,14,15,16,17,19,20,24,26,27,29,31],$V_=[1,122],$V$=[1,110],$V01=[1,111],$V11=[1,112],$V21=[1,113],$V31=[1,114],$V41=[1,115],$V51=[1,116],$V61=[1,117],$V71=[1,118],$V81=[1,119],$V91=[1,121],$Va1=[1,126],$Vb1=[1,128],$Vc1=[1,129],$Vd1=[1,130],$Ve1=[1,131],$Vf1=[1,127],$Vg1=[5,7,9,10,11,14,15,16,17,18,19,20,22,24,25,26,27,29,31,33,35,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,55,56,57,59,60,61,62,63,64,65,66,67,68,69,70],$Vh1=[1,139],$Vi1=[19,22,38,39,40,41,42,43,44,48,49,50,73],$Vj1=[19,22,38,39,40,41,42,48,49,50,73],$Vk1=[5,7,9,10,11,14,15,16,17,18,19,20,22,24,25,26,27,29,31,33,35,39,40,41,42,48,49,50,51,52,53,55,56,57,59,60,61,62,63,64,65,66,67,68,69,70],$Vl1=[5,7,9,10,11,14,15,16,17,18,19,20,22,24,25,26,27,29,31,33,35,39,40,41,42,43,44,48,49,50,51,52,53,55,56,57,59,60,61,62,63,64,65,66,67,68,69,70];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INICIO":3,"VARIAS":4,"EOF":5,"INSTRUCCIONES":6,"SIGNOO":7,"SENTENCIAS":8,"FOR":9,"DOLAR":10,"ID":11,"IN":12,"PARAMETROS":13,"WHERE":14,"ORDER":15,"RETURN":16,"IF":17,"PARA":18,"PARC":19,"LET":20,"DOSPUNTOS":21,"IGUAL":22,"OPERADORES":23,"THEN":24,"DATA":25,"ELSE":26,"DECLARE":27,"FUNCTION":28,"AS":29,"LLAVEA":30,"LLAVEC":31,"LISTA_PARAMETROS":32,"BARRA":33,"e":34,"BARRABARRA":35,"RESERV":36,"PUNTOPUNTO":37,"TO":38,"MENORQUE":39,"MAYORQUE":40,"MENORIGUAL":41,"MAYORIGUAL":42,"MAS":43,"MENOS":44,"POR":45,"DIV":46,"MODULO":47,"AND":48,"OR":49,"DIFERENTE":50,"ENTERO":51,"DECIMAL":52,"CADENA":53,"COMA":54,"LAST":55,"POSITION":56,"ANCESTOR":57,"RESERVLARGE":58,"ATTRIBUTE":59,"ANCESORSELF":60,"CHILD":61,"DESCENDANT":62,"FOLLOWING":63,"SIBLING":64,"NAMESPACE":65,"PARENT":66,"PRECENDING":67,"SELF":68,"TEXT":69,"NODE":70,"ARROBA":71,"CORA":72,"CORC":73,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"SIGNOO",9:"FOR",10:"DOLAR",11:"ID",12:"IN",14:"WHERE",15:"ORDER",16:"RETURN",17:"IF",18:"PARA",19:"PARC",20:"LET",21:"DOSPUNTOS",22:"IGUAL",24:"THEN",25:"DATA",26:"ELSE",27:"DECLARE",28:"FUNCTION",29:"AS",30:"LLAVEA",31:"LLAVEC",33:"BARRA",35:"BARRABARRA",37:"PUNTOPUNTO",38:"TO",39:"MENORQUE",40:"MAYORQUE",41:"MENORIGUAL",42:"MAYORIGUAL",43:"MAS",44:"MENOS",45:"POR",46:"DIV",47:"MODULO",48:"AND",49:"OR",50:"DIFERENTE",51:"ENTERO",52:"DECIMAL",53:"CADENA",54:"COMA",55:"LAST",56:"POSITION",57:"ANCESTOR",59:"ATTRIBUTE",60:"ANCESORSELF",61:"CHILD",62:"DESCENDANT",63:"FOLLOWING",64:"SIBLING",65:"NAMESPACE",66:"PARENT",67:"PRECENDING",68:"SELF",69:"TEXT",70:"NODE",71:"ARROBA",72:"CORA",73:"CORC"},
productions_: [0,[3,2],[4,3],[4,1],[6,2],[6,1],[8,5],[8,4],[8,4],[8,4],[8,6],[8,3],[8,6],[8,2],[8,4],[8,7],[8,2],[8,3],[8,8],[8,7],[13,2],[13,1],[32,2],[32,2],[32,3],[32,4],[32,2],[32,4],[32,5],[32,3],[32,3],[32,3],[32,3],[32,3],[32,3],[32,3],[32,3],[32,3],[32,3],[32,3],[32,3],[32,3],[32,4],[32,3],[32,1],[32,1],[32,1],[32,1],[32,7],[32,6],[36,1],[36,1],[36,2],[36,1],[36,1],[36,1],[36,2],[36,1],[36,3],[36,1],[36,1],[36,1],[36,1],[36,3],[36,1],[36,1],[36,1],[36,1],[58,4],[58,2],[34,1],[34,2],[34,2],[34,1],[34,4],[34,1],[34,1],[34,1],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,2],[23,4],[23,3],[23,2],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
  this.$=$$[$0-1]; return this.$ 
break;
case 2:
this.$=new instrucciondoble.default($$[$0-2],$$[$0]);
break;
case 3:
this.$=$$[$0]
break;
}
},
table: [{3:1,4:2,6:3,8:4,9:$V0,14:$V1,15:$V2,16:$V3,17:$V4,20:$V5,24:$V6,26:$V7,27:$V8,29:$V9},{1:[3]},{5:[1,15]},{5:[2,3],7:[1,16]},o($Va,[2,5],{8:4,6:17,9:$V0,14:$V1,15:$V2,16:$V3,17:$V4,20:$V5,24:$V6,26:$V7,27:$V8,29:$V9}),{10:[1,18]},{10:[1,19]},{10:[1,20]},{8:22,9:$V0,10:[1,21],14:$V1,15:$V2,16:$V3,17:$V4,18:[1,23],20:$V5,24:$V6,26:$V7,27:$V8,29:$V9},{18:[1,24]},{10:[1,25]},{25:[1,26]},{8:27,9:$V0,14:$V1,15:$V2,16:$V3,17:$V4,18:[1,28],20:$V5,24:$V6,26:$V7,27:$V8,29:$V9},{28:[1,29]},{11:[1,30]},{1:[2,1]},{6:31,8:4,9:$V0,14:$V1,15:$V2,16:$V3,17:$V4,20:$V5,24:$V6,26:$V7,27:$V8,29:$V9},o($Va,[2,4]),{11:[1,32]},{11:[1,33]},{11:[1,34]},{11:[1,35]},o($Vb,[2,13]),{10:$Vc,11:$Vd,18:$Ve,23:36,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{10:[1,48]},{11:[1,49]},{18:[1,50]},o($Vb,[2,16]),{19:[1,51]},{11:[1,52]},{21:[1,53]},{5:[2,2]},{12:[1,54]},{10:$Vn,11:$Vo,13:55,18:$Vp,25:$Vq,32:56,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,13:82,18:$Vp,25:$Vq,32:56,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},o($Vb,[2,11],{32:56,36:59,13:83,10:$Vn,11:$Vo,18:$Vp,25:$Vq,33:$Vr,35:$Vs,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK}),{19:[1,84],22:$VL,39:$VM,40:$VN,41:$VO,42:$VP,43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX},{10:$Vc,11:$Vd,18:$Ve,23:98,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{18:[1,99]},{10:$Vc,11:$Vd,18:$Ve,23:100,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{11:[1,101]},o($VY,[2,95]),o($VY,[2,96]),o($VY,[2,97]),o($VY,[2,98]),o($VY,[2,99]),o($VY,[2,100]),{11:[1,102]},{11:[1,103]},{21:[1,104]},{10:[1,105]},o($Vb,[2,17]),{21:[1,106]},{11:[1,107]},{10:$Vn,11:$Vo,13:108,18:$Vp,25:$Vq,32:56,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},o($Vb,[2,7]),o($VZ,[2,21],{32:56,36:59,13:109,10:$Vn,11:$Vo,18:$Vp,22:$V_,25:$Vq,33:$Vr,35:$Vs,39:$V$,40:$V01,41:$V11,42:$V21,43:$V31,44:$V41,45:$V51,46:$V61,47:$V71,48:$V81,49:[1,120],50:$V91,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK}),{11:$Va1,34:123,36:124,37:[1,125],45:$Vb1,51:$Vc1,52:$Vd1,53:$Ve1,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK,71:$Vf1},{11:$Va1,34:132,36:133,45:$Vb1,51:$Vc1,52:$Vd1,53:$Ve1,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK,71:$Vf1},{21:[1,134]},{10:$Vc,11:$Vd,18:$Ve,23:135,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{18:[1,136]},o($Vg1,[2,44]),o($Vg1,[2,45]),o($Vg1,[2,46]),o($Vg1,[2,47]),{11:[1,137]},{21:[2,50]},{21:[2,51]},{44:$Vh1,58:138},{21:[2,53]},{21:[2,54]},{21:[2,55]},{21:[2,57],44:$Vh1,58:140},{21:[2,59],44:[1,141]},{21:[2,60]},{21:[2,61]},{21:[2,62],44:[1,142]},{21:[2,64]},{21:[2,65]},{21:[2,66]},{21:[2,67]},o($Vb,[2,8]),o($Vb,[2,9]),o($Vb,[2,14]),{10:$Vc,11:$Vd,18:$Ve,23:143,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{10:$Vc,11:$Vd,18:$Ve,23:144,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{10:$Vc,11:$Vd,18:$Ve,23:145,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{10:$Vc,11:$Vd,18:$Ve,23:146,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{10:$Vc,11:$Vd,18:$Ve,23:147,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{10:$Vc,11:$Vd,18:$Ve,23:148,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{10:$Vc,11:$Vd,18:$Ve,23:149,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{10:$Vc,11:$Vd,18:$Ve,23:150,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{10:$Vc,11:$Vd,18:$Ve,23:151,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{10:$Vc,11:$Vd,18:$Ve,23:152,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{10:$Vc,11:$Vd,18:$Ve,23:153,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{10:$Vc,11:$Vd,18:$Ve,23:154,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{10:$Vc,11:$Vd,18:$Ve,23:155,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},o($VY,[2,91]),{10:$Vc,11:$Vd,18:$Ve,23:156,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{19:[1,157],22:$VL,39:$VM,40:$VN,41:$VO,42:$VP,43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX},o($VY,[2,94]),o($VY,[2,101]),{10:$Vn,11:$Vo,13:158,18:$Vp,25:$Vq,32:56,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{22:[1,159]},{11:[1,160]},{11:[1,161]},{30:[1,162]},o($Vb,[2,6]),o($VZ,[2,20]),{10:$Vn,11:$Vo,18:$Vp,25:$Vq,32:163,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,18:$Vp,25:$Vq,32:164,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,18:$Vp,25:$Vq,32:165,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,18:$Vp,25:$Vq,32:166,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,18:$Vp,25:$Vq,32:167,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,18:$Vp,25:$Vq,32:168,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,18:$Vp,25:$Vq,32:169,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,18:$Vp,25:$Vq,32:170,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,18:$Vp,25:$Vq,32:171,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,18:$Vp,25:$Vq,32:172,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,18:$Vp,25:$Vq,32:173,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,18:$Vp,25:$Vq,32:174,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,18:$Vp,25:$Vq,32:175,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},o($Vg1,[2,22]),{21:[1,176]},o($Vg1,[2,26]),o($Vg1,[2,70],{72:[1,177]}),{11:[1,178],45:[1,179]},o($Vg1,[2,73]),o($Vg1,[2,75]),o($Vg1,[2,76]),o($Vg1,[2,77]),o($Vg1,[2,23]),{21:[1,180]},{11:$Va1,34:181,45:$Vb1,51:$Vc1,52:$Vd1,53:$Ve1,71:$Vf1},{19:[1,183],22:$VL,38:[1,182],39:$VM,40:$VN,41:$VO,42:$VP,43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX},{10:$Vc,11:$Vd,18:$Ve,23:184,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},{29:[1,185]},{21:[2,52]},{49:[1,186],64:[1,187]},{21:[2,56]},{64:[1,188]},{64:[1,189]},o($Vi1,[2,78],{45:$VS,46:$VT,47:$VU}),o($Vi1,[2,79],{45:$VS,46:$VT,47:$VU}),o($VY,[2,80]),o($VY,[2,81]),o($VY,[2,82]),o([19,38,48,49,73],[2,83],{22:$VL,39:$VM,40:$VN,41:$VO,42:$VP,43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU,50:$VX}),o([19,38,49,73],[2,84],{22:$VL,39:$VM,40:$VN,41:$VO,42:$VP,43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,50:$VX}),o($Vj1,[2,85],{43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU}),o($Vj1,[2,86],{43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU}),o($Vj1,[2,87],{43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU}),o($Vj1,[2,88],{43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU}),o($Vj1,[2,89],{43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU}),o($Vj1,[2,90],{43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU}),{19:[1,190],22:$VL,39:$VM,40:$VN,41:$VO,42:$VP,43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX},o($VY,[2,93]),{19:[1,191]},{10:$Vn,11:$Vo,13:192,18:$Vp,25:$Vq,32:56,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{10:$Vn,11:$Vo,13:193,18:$Vp,25:$Vq,32:56,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{18:[1,194]},{6:195,8:4,9:$V0,14:$V1,15:$V2,16:$V3,17:$V4,20:$V5,24:$V6,26:$V7,27:$V8,29:$V9},o($Vk1,[2,29],{43:$V31,44:$V41,45:$V51,46:$V61,47:$V71}),o($Vk1,[2,30],{43:$V31,44:$V41,45:$V51,46:$V61,47:$V71}),o($Vk1,[2,31],{43:$V31,44:$V41,45:$V51,46:$V61,47:$V71}),o($Vk1,[2,32],{43:$V31,44:$V41,45:$V51,46:$V61,47:$V71}),o($Vl1,[2,33],{45:$V51,46:$V61,47:$V71}),o($Vl1,[2,34],{45:$V51,46:$V61,47:$V71}),o($Vg1,[2,35]),o($Vg1,[2,36]),o($Vg1,[2,37]),o([5,7,9,10,11,14,15,16,17,18,19,20,24,25,26,27,29,31,33,35,48,49,51,52,53,55,56,57,59,60,61,62,63,64,65,66,67,68,69,70],[2,38],{22:$V_,39:$V$,40:$V01,41:$V11,42:$V21,43:$V31,44:$V41,45:$V51,46:$V61,47:$V71,50:$V91}),o([5,7,9,10,11,14,15,16,17,18,19,20,24,25,26,27,29,31,33,35,49,51,52,53,55,56,57,59,60,61,62,63,64,65,66,67,68,69,70],[2,39],{22:$V_,39:$V$,40:$V01,41:$V11,42:$V21,43:$V31,44:$V41,45:$V51,46:$V61,47:$V71,48:$V81,50:$V91}),o($Vk1,[2,40],{43:$V31,44:$V41,45:$V51,46:$V61,47:$V71}),o($Vk1,[2,41],{43:$V31,44:$V41,45:$V51,46:$V61,47:$V71}),{11:$Va1,34:196,45:$Vb1,51:$Vc1,52:$Vd1,53:$Ve1,71:$Vf1},{10:$Vc,11:$Vd,18:$Ve,23:197,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},o($Vg1,[2,71]),o($Vg1,[2,72]),{11:$Va1,34:198,45:$Vb1,51:$Vc1,52:$Vd1,53:$Ve1,71:$Vf1},o($Vg1,[2,24]),{10:$Vc,11:$Vd,18:$Ve,23:199,25:$Vf,44:$Vg,51:$Vh,52:$Vi,53:$Vj,55:$Vk,56:$Vl,71:$Vm},o($Vg1,[2,43]),{19:[1,200],22:$VL,39:$VM,40:$VN,41:$VO,42:$VP,43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX},{11:[1,201]},{44:[1,202]},{21:[2,69]},{21:[2,58]},{21:[2,63]},o($VY,[2,92]),o($Vb,[2,10]),o($Vb,[2,12]),{19:[1,203]},{10:$Vn,11:$Vo,13:204,18:$Vp,25:$Vq,32:56,33:$Vr,35:$Vs,36:59,51:$Vt,52:$Vu,53:$Vv,55:$Vw,56:$Vx,57:$Vy,59:$Vz,60:$VA,61:$VB,62:$VC,63:$VD,64:$VE,65:$VF,66:$VG,67:$VH,68:$VI,69:$VJ,70:$VK},{31:[1,205]},o($Vg1,[2,25]),{22:$VL,39:$VM,40:$VN,41:$VO,42:$VP,43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX,73:[1,206]},o($Vg1,[2,27]),{19:[1,207],22:$VL,39:$VM,40:$VN,41:$VO,42:$VP,43:$VQ,44:$VR,45:$VS,46:$VT,47:$VU,48:$VV,49:$VW,50:$VX},o($Vg1,[2,42]),{21:[1,208]},{68:[1,209]},o($Vb,[2,15]),{19:[1,210]},o($Vb,[2,19]),o($Vg1,[2,74]),o($Vg1,[2,28]),{11:[1,211]},{21:[2,68]},o($Vb,[2,18]),o($Vg1,[2,49],{54:[1,212]}),o($Vg1,[2,48])],
defaultActions: {15:[2,1],31:[2,2],67:[2,50],68:[2,51],70:[2,53],71:[2,54],72:[2,55],75:[2,60],76:[2,61],78:[2,64],79:[2,65],80:[2,66],81:[2,67],138:[2,52],140:[2,56],187:[2,69],188:[2,58],189:[2,63],209:[2,68]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    const evaluar = __webpack_require__(/*! ../Clases/Evaluar */ "bGwg");
    const aritmetica= __webpack_require__(/*! ../Clases/Expreciones/Operaciones/Aritmetica */ "jImf");
    const relacional = __webpack_require__(/*! ../Clases/Expreciones/Operaciones/Relaciones */ "VEqm");
    const logica = __webpack_require__(/*! ../Clases/Expreciones/Operaciones/Logicas */ "7KGZ");
    const primitivo = __webpack_require__(/*! ../Clases/Expreciones/Primitivo */ "mcIB");
    
    const identificador= __webpack_require__(/*! ../Clases/Expreciones/Identificador */ "Byf3");
    const last= __webpack_require__(/*! ../Clases/Expreciones/last */ "n/3T");
    const position = __webpack_require__ (/*! ../Clases/Expreciones/position */ "T71e");
    const ternario= __webpack_require__(/*! ../Clases/Expreciones/Ternario */ "qYeL");
    const ast =__webpack_require__(/*! ../Clases/AST/Ast */ "ZSbs");
    const declaracion = __webpack_require__ (/*! ../Clases/Instrucciones/Declaracion */ "zWDC");
    const asignacion = __webpack_require__ (/*! ../Clases/Instrucciones/Asignacion */ "HGo+");
    const funcion = __webpack_require__ (/*! ../Clases/Instrucciones/Funcion */ "h38I");
    const llamada = __webpack_require__ (/*! ../Clases/Instrucciones/Llamada */ "/59w");
    const ejecutar = __webpack_require__ (/*! ../Clases/Instrucciones/Ejecutar */ "1NQK");
    const Print = __webpack_require__ (/*! ../Clases/Instrucciones/Print */ "l5Da");
    const Ifs = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaControl/Ifs */ "WZOa");
    const While = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaCiclos/While */ "fH/y");
    const dowhile =__webpack_require__ (/*! ../Clases/Instrucciones/SentenciaCiclos/DoWhile */ "C4Lw");
    const For =__webpack_require__ (/*! ../Clases/Instrucciones/SentenciaCiclos/For */ "sedW");
    const simbolo= __webpack_require__ (/*! ../Clases/TablaSimbolos/Simbolos */ "hADQ");
    const tipo= __webpack_require__ (/*! ../Clases/TablaSimbolos/Tipo */ "lKex");
    const detener = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaTransferencia/Break */ "L2hm");
    const continuar = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaTransferencia/continuar */ "vyXG");
    const retornar = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaTransferencia/retornar */ "uHk2");
    const sw = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaControl/SW */ "dzIM");
    const cs = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaControl/CS */ "DwkX");
    const acceso= __webpack_require__ (/*! ../Clases/xpath/acceso */ "LjH7");
    const barrabarra= __webpack_require__ (/*! ../Clases/xpath/barrabarra */ "8VeP");
    const informacion = __webpack_require__ (/*! ../Clases/xpath/informacion */ "9Smq");
    const axes = __webpack_require__ (/*! ../Clases/xpath/axes */ "glYm");
    const axesbarrabarra = __webpack_require__ (/*! ../Clases/xpath/axesbarrabarra */ "Hk5z");
    const instrucciondoble =__webpack_require__ (/*! ../Clases/xpath/intrucciondoble */ "7VuF");
    const puntopunto =__webpack_require__ (/*! ../Clases/xpath/puntopunto */ "Y/Ky");
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0: console.log("Reconocio : "+ yy_.yytext); return 18
break;
case 1: console.log("Reconocio : "+ yy_.yytext); return 35
break;
case 2: console.log("Reconocio : "+ yy_.yytext); return 33
break;
case 3: console.log("Reconocio : "+ yy_.yytext); return 19
break;
case 4: console.log("Reconocio : "+ yy_.yytext); return 10
break;
case 5: console.log("Reconocio : "+ yy_.yytext); return 30
break;
case 6: console.log("Reconocio : "+ yy_.yytext); return 31
break;
case 7: console.log("Reconocio : "+ yy_.yytext); return 72
break;
case 8: console.log("Reconocio : "+ yy_.yytext); return 73
break;
case 9: console.log("Reconocio : "+ yy_.yytext); return 37
break;
case 10: console.log("Reconocio : "+ yy_.yytext); return 'PUNTO'
break;
case 11: console.log("Reconocio : "+ yy_.yytext); return 7
break;
case 12: console.log("Reconocio : "+ yy_.yytext); return 21
break;
case 13: console.log("Reconocio : "+ yy_.yytext); return 41
break;
case 14: console.log("Reconocio : "+ yy_.yytext); return 42
break;
case 15: console.log("Reconocio : "+ yy_.yytext); return 22
break;
case 16: console.log("Reconocio : "+ yy_.yytext); return 39
break;
case 17: console.log("Reconocio : "+ yy_.yytext); return 40
break;
case 18: console.log("Reconocio : "+ yy_.yytext); return 50
break;
case 19: console.log("Reconocio : "+ yy_.yytext); return 21
break;
case 20: console.log("Reconocio : "+ yy_.yytext); return 54
break;
case 21: console.log("Reconocio : "+ yy_.yytext); return 71
break;
case 22: console.log("Reconocio : "+ yy_.yytext); return 43
break;
case 23: console.log("Reconocio : "+ yy_.yytext); return 44
break;
case 24: console.log("Reconocio : "+ yy_.yytext); return 45
break;
case 25: console.log("Reconocio : "+ yy_.yytext); return 46
break;
case 26: console.log("Reconocio : "+ yy_.yytext); return 47
break;
case 27: console.log("Reconocio : "+ yy_.yytext); return 48
break;
case 28: console.log("Reconocio : "+ yy_.yytext); return 49
break;
case 29: console.log("Reconocio : "+ yy_.yytext); return 9
break;
case 30: console.log("Reconocio : "+ yy_.yytext); return 12
break;
case 31: console.log("Reconocio : "+ yy_.yytext); return 20
break;
case 32: console.log("Reconocio : "+ yy_.yytext); return 14
break;
case 33: console.log("Reconocio : "+ yy_.yytext); return 15
break;
case 34: console.log("Reconocio : "+ yy_.yytext); return 16
break;
case 35: console.log("Reconocio : "+ yy_.yytext); return 38
break;
case 36: console.log("Reconocio : "+ yy_.yytext); return 17
break;
case 37: console.log("Reconocio : "+ yy_.yytext); return 24
break;
case 38: console.log("Reconocio : "+ yy_.yytext); return 26
break;
case 39: console.log("Reconocio : "+ yy_.yytext); return 27
break;
case 40: console.log("Reconocio : "+ yy_.yytext); return 28
break;
case 41: console.log("Reconocio : "+ yy_.yytext); return 29
break;
case 42: console.log("Reconocio : "+ yy_.yytext); return 20
break;
case 43: console.log("Reconocio : "+ yy_.yytext); return 25
break;
case 44: console.log("Reconocio : "+ yy_.yytext); return 55
break;
case 45: console.log("Reconocio : "+ yy_.yytext); return 56
break;
case 46: console.log("Reconocio : "+ yy_.yytext); return 57
break;
case 47: console.log("Reconocio : "+ yy_.yytext); return 59
break;
case 48: console.log("Reconocio : "+ yy_.yytext); return 68
break;
case 49: console.log("Reconocio : "+ yy_.yytext); return 61
break;
case 50: console.log("Reconocio : "+ yy_.yytext); return 62
break;
case 51: console.log("Reconocio : "+ yy_.yytext); return 63
break;
case 52: console.log("Reconocio : "+ yy_.yytext); return 64
break;
case 53: console.log("Reconocio : "+ yy_.yytext); return 65
break;
case 54: console.log("Reconocio : "+ yy_.yytext); return 66
break;
case 55: console.log("Reconocio : "+ yy_.yytext); return 67
break;
case 56: console.log("Reconocio : "+ yy_.yytext); return 69
break;
case 57: console.log("Reconocio : "+ yy_.yytext); return 70
break;
case 58: console.log("Reconocio : "+ yy_.yytext); return 55
break;
case 59: console.log("Reconocio : "+ yy_.yytext); return 56
break;
case 60: console.log("Reconocio : "+ yy_.yytext); return 52
break;
case 61: console.log("Reconocio : "+ yy_.yytext); return 51
break;
case 62: console.log("Reconocio id : "+ yy_.yytext); return 11
break;
case 63: console.log("Reconocio : "+ yy_.yytext); return 53
break;
case 64: /* skip whitespace */ 
break;
case 65:return 5
break;
case 66: console.log("Error Lexico "+yy_.yytext
                        +" linea "+yy_.yylineno
                        +" columna "+(yy_.yylloc.last_column+1));        
                        
break;
}
},
rules: [/^(?:\()/i,/^(?:\/\/)/i,/^(?:\/)/i,/^(?:\))/i,/^(?:\$)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\.\.)/i,/^(?:\.)/i,/^(?:\|)/i,/^(?:::)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:!=)/i,/^(?::)/i,/^(?:,)/i,/^(?:@)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:div\b)/i,/^(?:mod\b)/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:for\b)/i,/^(?:in\b)/i,/^(?:let\b)/i,/^(?:where\b)/i,/^(?:order by\b)/i,/^(?:return\b)/i,/^(?:to\b)/i,/^(?:if\b)/i,/^(?:then\b)/i,/^(?:else\b)/i,/^(?:declare\b)/i,/^(?:function\b)/i,/^(?:as\b)/i,/^(?:let\b)/i,/^(?:data\b)/i,/^(?:last\(\))/i,/^(?:position\(\))/i,/^(?:ancestor\b)/i,/^(?:attribute\b)/i,/^(?:self\b)/i,/^(?:child\b)/i,/^(?:descendant\b)/i,/^(?:following\b)/i,/^(?:sibling\b)/i,/^(?:namespace\b)/i,/^(?:parent\b)/i,/^(?:preceding\b)/i,/^(?:text\(\))/i,/^(?:node\(\))/i,/^(?:last\(\))/i,/^(?:position\(\))/i,/^(?:[0-9]+(\.[0-9]+)?\b)/i,/^(?:([0-9]+))/i,/^(?:([a-zñA-ZÑ_][a-zñA-ZÑ0-9_]*))/i,/^(?:(("((\\([\'\"\\ntr]))|([^\"\\]+))*")))/i,/^(?:[\s\r\n\t])/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (true) {
exports.parser = XQuery;
exports.Parser = XQuery.Parser;
exports.parse = function () { return XQuery.parse.apply(XQuery, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = __webpack_require__(/*! fs */ 1).readFileSync(__webpack_require__(/*! path */ 2).normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
  exports.main(process.argv.slice(1));
}
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "9Smq":
/*!*****************************************!*\
  !*** ./src/Clases/xpath/informacion.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return informacion; });
class informacion {
    constructor(id, exprecion, tipo) {
        this.id = id;
        this.exprecion = exprecion;
        this.tipo = tipo;
    }
}


/***/ }),

/***/ "Ab3f":
/*!************************************!*\
  !*** ./src/Clases/xml/atributo.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Atributo; });
class Atributo {
    constructor(id, valor, linea, columna) {
        this.identificador = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
    getvalor3d(controlador, ts) {
        throw new Error("Method not implemented.");
    }
    getTipo(controlador, ts) {
        return "atributo";
    }
    getValor(controlador, ts) {
    }
    limpiar() {
    }
    recorrer() {
        throw new Error("Method not implemented.");
    }
}


/***/ }),

/***/ "AviG":
/*!***************************************************!*\
  !*** ./src/Clases/TablaSimbolos/TablaSimbolos.ts ***!
  \***************************************************/
/*! exports provided: TablaSimbolos */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablaSimbolos", function() { return TablaSimbolos; });
/* harmony import */ var _ambito__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ambito */ "ajoU");
/* harmony import */ var _contenido__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contenido */ "RxIe");


class TablaSimbolos {
    constructor(ant, ambito) {
        this.sig = [];
        this.tabla = [];
        this.ant = ant;
        this.ambito = ambito;
    }
    agregar(id, simbolo) {
        let cont = new _contenido__WEBPACK_IMPORTED_MODULE_1__["default"](id, simbolo);
        this.tabla.push(cont);
        //this.tabla.set(id.toLowerCase(), simbolo); 
    }
    agregarSiguiente(id, sig) {
        let amb = new _ambito__WEBPACK_IMPORTED_MODULE_0__["default"](id, sig);
        this.sig.push(amb);
    }
    existe(id) {
        /*  let ts : TablaSimbolos = this;
  
          while(ts != null){
              let existe = ts.tabla.get(id);
  
              if(existe != null){
                  return true;
              }
              ts = ts.ant;
          }*/
        return false;
    }
    existeEnActual(id) {
        /*  let ts : TablaSimbolos = this;
  
          let existe = ts.tabla.get(id);
  
          if(existe != null){
              return true;
          }*/
        return false;
    }
    getSimbolo(id, tipoval) {
        let ts = this;
        console.log("-----------------");
        for (let informacion of ts.tabla) {
            console.log(informacion.identificador + "==" + id + " && " + tipoval + "==" + informacion.sim.simbolo);
            if (informacion.identificador == id && tipoval == informacion.sim.simbolo) {
                return informacion.sim;
            }
        }
        return null;
    }
}


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Byf3":
/*!*************************************************!*\
  !*** ./src/Clases/Expreciones/Identificador.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Identificador; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");
/* harmony import */ var _retorno__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retorno */ "munq");
/* harmony import */ var _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TablaSimbolos/Tipo */ "lKex");



class Identificador {
    constructor(identifador, linea, columna, t) {
        this.identificador = identifador;
        this.linea = linea;
        this.columna = columna;
        this.valor = t;
    }
    getvalor3d(controlador, ts) {
        console.log("getValor3D");
        let existe_id;
        let contador = 1;
        for (let tssig of ts.sig) {
            if (contador == controlador.posicionid) {
                existe_id = tssig.sig.getSimbolo(this.identificador, this.valor);
            }
            contador++;
        }
        console.log(existe_id);
        if (existe_id != null) {
            const generator = controlador.generador;
            if (typeof existe_id.valor == 'number') {
                return new _retorno__WEBPACK_IMPORTED_MODULE_1__["retorno"](existe_id.valor + "", false, new _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["default"]("DOBLE"));
            }
            else if (typeof existe_id.valor == 'string') {
                console.log("entre****");
                console.log(existe_id);
                const temp = generator.newTemporal();
                generator.genAsignacion(temp, 'h');
                for (let i = 0; i < existe_id.valor.length; i++) {
                    generator.genSetHeap('h', existe_id.valor.charCodeAt(i));
                    generator.avanzarHeap();
                }
                generator.genSetHeap('h', '-1');
                generator.avanzarHeap();
                return new _retorno__WEBPACK_IMPORTED_MODULE_1__["retorno"](temp, true, new _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["default"]("STRING"));
            }
            else {
                console.log("no entre");
            }
        }
    }
    limpiar() {
    }
    getTipo(controlador, ts) {
        /* let existe_id = ts.getSimbolo(this.identificador);
         if(existe_id != null ){
             return existe_id.tipo.type;
         }*/
    }
    getValor(controlador, ts) {
        console.log("getValor");
        let existe_id;
        let contador = 1;
        for (let tssig of ts.sig) {
            if (contador == controlador.posicionid) {
                existe_id = tssig.sig.getSimbolo(this.identificador, this.valor);
            }
            contador++;
        }
        if (existe_id != null) {
            return existe_id.valor;
        }
        else {
            /* let error = new Errores('Semantico', `No existe la variable ${this.identificador} en la tabla de simbolos.`, this.linea, this.columna);
             controlador.errores.push(error);
             controlador.append(`Error Semantico : No existe la variable ${this.identificador} en la tabla de simbolos. En la linea ${this.linea} y columan ${this.columna}`);*/
            return null;
        }
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Identificador", "");
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.identificador, ""));
        return padre;
    }
}


/***/ }),

/***/ "C4Lw":
/*!*************************************************************!*\
  !*** ./src/Clases/Instrucciones/SentenciaCiclos/DoWhile.ts ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DoWhile; });
/* harmony import */ var src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/clases/AST/Nodo */ "XRm8");
/* harmony import */ var src_clases_TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/clases/TablaSimbolos/TablaSimbolos */ "arwD");
/* harmony import */ var _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SentenciaTransferencia/Break */ "L2hm");
/* harmony import */ var _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SentenciaTransferencia/continuar */ "vyXG");
/* harmony import */ var _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SentenciaTransferencia/retornar */ "uHk2");





class DoWhile {
    constructor(condicion, lista_instrucciones, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador, ts) {
        let valor_condicion = this.condicion.getValor(controlador, ts);
        if (typeof valor_condicion == 'boolean') {
            do {
                let ts_local = new src_clases_TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["TablaSimbolos"](ts);
                for (let ins of this.lista_instrucciones) {
                    let res = ins.ejecutar(controlador, ts_local);
                    if (ins instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__["default"] || res instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                        controlador.graficarEntornos(controlador, ts_local, " (While)");
                        return null;
                    }
                    else {
                        if (ins instanceof _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_3__["default"] || res instanceof _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                            break;
                        }
                        else {
                            if (ins instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_4__["default"] || res instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_4__["default"]) {
                                controlador.graficarEntornos(controlador, ts_local, " (While)");
                                return res;
                            }
                        }
                    }
                }
                controlador.graficarEntornos(controlador, ts_local, " (doWhile)");
            } while (this.condicion.getValor(controlador, ts));
        }
    }
    recorrer() {
        let padre = new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("CICLO", "");
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("do", ""));
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("{", ""));
        for (let ins of this.lista_instrucciones) {
            padre.AddHijo(ins.recorrer());
        }
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("}", ""));
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("while", ""));
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("(", ""));
        padre.AddHijo(this.condicion.recorrer());
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](")", ""));
        return padre;
    }
}


/***/ }),

/***/ "DwkX":
/*!*********************************************************!*\
  !*** ./src/Clases/Instrucciones/SentenciaControl/CS.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CS; });
/* harmony import */ var src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/clases/AST/Nodo */ "XRm8");
/* harmony import */ var src_clases_TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/clases/TablaSimbolos/TablaSimbolos */ "arwD");
/* harmony import */ var _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SentenciaTransferencia/Break */ "L2hm");
/* harmony import */ var _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SentenciaTransferencia/continuar */ "vyXG");
/* harmony import */ var _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SentenciaTransferencia/retornar */ "uHk2");





class CS {
    constructor(valor_case, lista_intrucciones) {
        this.lista_instrucciones = lista_intrucciones;
        this.valor_case = valor_case;
    }
    ejecutar(controlador, ts) {
        let ts_local = new src_clases_TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["TablaSimbolos"](ts);
        if (this.valor_sw == this.valor_case.getValor(controlador, ts)) {
            for (let res of this.lista_instrucciones) {
                let ins = res.ejecutar(controlador, ts_local);
                if (ins instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__["default"] || res instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                    controlador.graficarEntornos(controlador, ts_local, " (case)");
                    return ins;
                }
                else {
                    if (ins instanceof _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_3__["default"] || res instanceof _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                        controlador.graficarEntornos(controlador, ts_local, " (case)");
                        return ins;
                    }
                    else {
                        if (ins instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_4__["default"] || res instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_4__["default"]) {
                            controlador.graficarEntornos(controlador, ts_local, " (case)");
                            return ins;
                        }
                    }
                }
            }
        }
        controlador.graficarEntornos(controlador, ts_local, " (case)");
    }
    recorrer() {
        let padre = new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("CASE", "");
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("case", ""));
        padre.AddHijo(this.valor_case.recorrer());
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](":", ""));
        for (let ins of this.lista_instrucciones) {
            padre.AddHijo(ins.recorrer());
        }
        return padre;
    }
}


/***/ }),

/***/ "EViG":
/*!********************************************!*\
  !*** ./src/Analizadores/XMLDescendente.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var XMLDescendente = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[5,9],$V2=[1,8],$V3=[12,13],$V4=[1,12],$V5=[1,20];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"inicio":3,"raices":4,"EOF":5,"raiz":6,"objeto":7,"objetos":8,"<":9,"ID":10,"latributos":11,"/":12,">":13,"texto_libre":14,"atributos":15,"atributo":16,"=":17,"CADENA":18,"TEXTO":19,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",9:"<",10:"ID",12:"/",13:">",17:"=",18:"CADENA",19:"TEXTO"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[8,2],[8,1],[7,5],[7,9],[7,9],[11,1],[11,0],[15,2],[15,1],[16,3],[14,2],[14,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 console.log($$[$0-1]); this.$= new ast.default($$[$0-1]);  return this.$; 
break;
case 2: case 12:
 $$[$0].push($$[$0-1]); this.$ = $$[$0];
break;
case 3: case 13:
 this.$ = [$$[$0]]; 
break;
case 4:
 this.$ = $$[$0] 
break;
case 5:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 6:
this.$ = [$$[$0]];
break;
case 7:
 this.$ = new Objeto.default($$[$0-3],'',_$[$0-4].first_line, _$[$0-4].first_column,$$[$0-2],[],1); 
break;
case 8:
 this.$ = new Objeto.default($$[$0-7],$$[$0-4],_$[$0-8].first_line, _$[$0-8].first_column,$$[$0-6],[],2); 
break;
case 9:
 this.$ = new Objeto.default($$[$0-7],'',_$[$0-8].first_line, _$[$0-8].first_column,$$[$0-6],$$[$0-4],2); 
break;
case 10: case 16:
 this.$ = $$[$0]; 
break;
case 11:
 this.$ = []; 
break;
case 14:
 $$[$0] = $$[$0].slice(1, $$[$0].length-1); this.$ = new Atributo.default($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 15:
 this.$ = $$[$0-1] + $$[$0]; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,9:$V0},{1:[3]},{5:[1,6]},{4:7,5:[2,3],6:3,7:4,9:$V0},o($V1,[2,4]),{10:$V2},{1:[2,1]},{5:[2,2]},o($V3,[2,11],{11:9,15:10,16:11,10:$V4}),{12:[1,13],13:[1,14]},o($V3,[2,10]),o($V3,[2,13],{16:11,15:15,10:$V4}),{17:[1,16]},{13:[1,17]},{7:21,8:19,9:$V0,14:18,19:$V5},o($V3,[2,12]),{18:[1,22]},o($V1,[2,7]),{9:[1,23]},{7:25,9:[1,24]},{9:[2,16],14:26,19:$V5},{9:[2,6]},o([10,12,13],[2,14]),{12:[1,27]},{10:$V2,12:[1,28]},{9:[2,5]},{9:[2,15]},{10:[1,29]},{10:[1,30]},{13:[1,31]},{13:[1,32]},o($V1,[2,8]),o($V1,[2,9])],
defaultActions: {6:[2,1],7:[2,2],21:[2,6],25:[2,5],26:[2,15]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    let $ESPACIOS = "";

      const  Atributo = __webpack_require__ (/*! ../Clases/xml/atributo */ "Ab3f");
      const  Objeto  = __webpack_require__ (/*! ../Clases/xml/objeto */ "bzrv");
      const ast =__webpack_require__(/*! ../Clases/AST/Ast */ "ZSbs");
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* Ignoro los comentarios simples */
break;
case 1:/* skip whitespace */
break;
case 2: console.log("Reconocio : "+ yy_.yytext); return 18
break;
case 3: console.log("Reconocio : "+ yy_.yytext); return 10
break;
case 4: console.log("Reconocio : "+ yy_.yytext); return 9
break;
case 5: console.log("Reconocio : "+ yy_.yytext); return 17
break;
case 6: console.log("Reconocio : "+ yy_.yytext); return 12
break;
case 7: this.begin("S1"); $ESPACIOS=""; console.log("Reconocio : "+ yy_.yytext); return ">";
break;
case 8: yy_.yytext = $ESPACIOS + "<"; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 19; 
break;
case 9: yy_.yytext = $ESPACIOS + ">"; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 19; 
break;
case 10: yy_.yytext = $ESPACIOS + "&"; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 19; 
break;
case 11: yy_.yytext = $ESPACIOS + "\'"; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 19; 
break;
case 12: yy_.yytext = $ESPACIOS + "\""; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 19; 
break;
case 13:  /* Ignoro los comentarios simples */
break;
case 14: $ESPACIOS += yy.lexer.match;
break;
case 15: this.begin("INITIAL"); console.log("Reconocio : "+ yy_.yytext); return "<";
break;
case 16: yy_.yytext = $ESPACIOS + yy_.yytext; $ESPACIOS="";  console.log("Reconocio : "+ yy_.yytext); return 19; 
break;
case 17:return 5
break;
case 18: console.log("Error Lexico "+yy_.yytext
                        +" linea "+yy_.yylineno
                        +" columna "+(yy_.yylloc.last_column+1));        
                        
break;
}
},
rules: [/^(?:<!--(.|\n)*-->)/i,/^(?:\s+)/i,/^(?:(("((\\([\'\"\\ntr]))|([^\"\\]+))*")))/i,/^(?:([a-zñA-ZÑ_][a-zñA-ZÑ0-9_]*))/i,/^(?:<)/i,/^(?:=)/i,/^(?:\/)/i,/^(?:>)/i,/^(?:&lt;)/i,/^(?:&gt;)/i,/^(?:&amp;)/i,/^(?:&apos;)/i,/^(?:&quot;)/i,/^(?:<!--(.|\n)*-->)/i,/^(?:\s)/i,/^(?:<)/i,/^(?:.)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"S1":{"rules":[0,8,9,10,11,12,13,14,15,16,17,18],"inclusive":true},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,13,17,18],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (true) {
exports.parser = XMLDescendente;
exports.Parser = XMLDescendente.Parser;
exports.parse = function () { return XMLDescendente.parse.apply(XMLDescendente, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = __webpack_require__(/*! fs */ 1).readFileSync(__webpack_require__(/*! path */ 2).normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
  exports.main(process.argv.slice(1));
}
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "HGo+":
/*!************************************************!*\
  !*** ./src/Clases/Instrucciones/Asignacion.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Asignacion; });
/* harmony import */ var _AST_Errores__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Errores */ "zZ//");
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");
/* harmony import */ var _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TablaSimbolos/Tipo */ "lKex");



class Asignacion {
    constructor(identificador, valor, linea, columna) {
        this.identificador = identificador;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador, ts) {
        if (ts.existe(this.identificador)) {
            let valor = this.valor.getValor(controlador, ts);
            let tipo_valor = this.valor.getTipo(controlador, ts);
            if (ts.getSimbolo(this.identificador).tipo.type == tipo_valor || (tipo_valor == _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipo"].DOBLE && ts.getSimbolo(this.identificador).tipo.type == _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipo"].ENTERO)) {
                ts.getSimbolo(this.identificador).setValor(valor);
            }
            else if ((tipo_valor == _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipo"].CADENA && ts.getSimbolo(this.identificador).tipo.type == _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipo"].CARACTER)) {
                if (valor.length == 1) {
                    ts.getSimbolo(this.identificador).setValor(valor);
                }
                else {
                    let error = new _AST_Errores__WEBPACK_IMPORTED_MODULE_0__["default"]('Semantico', `La variable ${this.identificador} no se le puede asignar el valor \"${valor}\" por que son de distinto tipo.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`Error Semantico : La variable ${this.identificador} no se le puede asignar el valor \"${valor}\" por que son de distinto tipo. En la linea ${this.linea} y columan ${this.columna}`);
                }
            }
            else {
                let error = new _AST_Errores__WEBPACK_IMPORTED_MODULE_0__["default"]('Semantico', `La variable ${this.identificador} no se le puede asignar el valor \"${valor}\" por que son de distinto tipo.`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error Semantico : La variable ${this.identificador} no se le puede asignar el valor \"${valor}\" por que son de distinto tipo. En la linea ${this.linea} y columan ${this.columna}`);
            }
        }
        else {
            let error = new _AST_Errores__WEBPACK_IMPORTED_MODULE_0__["default"]('Semantico', `La variable ${this.identificador} no a sido declarada.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error Semantico : La variable ${this.identificador} no a sido declarada. En la linea ${this.linea} y columan ${this.columna}`);
        }
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_1__["default"]("Asignacion", "");
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_1__["default"](this.identificador, ""));
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_1__["default"]("=", ""));
        padre.AddHijo(this.valor.recorrer());
        return padre;
    }
}


/***/ }),

/***/ "Hk5z":
/*!********************************************!*\
  !*** ./src/Clases/xpath/axesbarrabarra.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return axesbarrabarra; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");

class axesbarrabarra {
    constructor(tipo, exprecion, sig) {
        this.tipo = tipo;
        this.exprecion = exprecion;
        this.sig = sig;
    }
    ejecutar(controlador, ts) {
        if (this.tipo == "child") {
            this.child(controlador, ts);
        }
        else {
            if (this.tipo == "") {
            }
        }
    }
    child(controlador, ts) {
        if (this.exprecion.exprecion != null) {
            this.isxprecion(controlador, ts);
        }
        else {
            if (this.sig != null) {
                this.siguiente(controlador, ts);
            }
            else {
                this.obtenerall(controlador, ts);
            }
        }
    }
    obtenerall(controlador, ts) {
        if (ts != null) {
            for (let informacion of ts.tabla) {
                if (this.exprecion.tipo == 1) {
                    if (this.exprecion.id == "*" && informacion.sim.simbolo == 1) {
                        controlador.append(informacion.sim.objeto.gethtml("", controlador));
                    }
                    else {
                        if (informacion.identificador == this.exprecion.id && informacion.sim.simbolo == 1) {
                            controlador.append(informacion.sim.objeto.gethtml("", controlador));
                        }
                    }
                }
                else {
                    if (informacion.identificador == this.exprecion.id && informacion.sim.simbolo == 2) {
                        controlador.append(informacion.sim.valor + "\n");
                    }
                    else {
                        if (this.exprecion.id == "*" && informacion.sim.simbolo == 2) {
                            controlador.append(informacion.sim.valor);
                        }
                    }
                }
            }
            for (let tssig of ts.sig) {
                this.obtenerall(controlador, tssig.sig);
            }
        }
    }
    siguiente(controlador, ts) {
        if (ts != null) {
            for (let tssig of ts.sig) {
                if (this.exprecion.id == tssig.identificador || this.exprecion.id == "*") {
                    this.sig.ejecutar(controlador, tssig.sig);
                }
                else {
                    this.siguiente(controlador, tssig.sig);
                }
            }
        }
    }
    isxprecion(controlador, ts) {
        controlador.idlast = this.exprecion.id;
        let valor = this.exprecion.exprecion.getValor(controlador, ts);
        if (typeof valor == 'number') {
            this.isNumero(controlador, ts, valor);
        }
        else {
            this.esbool(controlador, ts);
        }
    }
    isNumero(controlador, ts, valor) {
        if (this.sig != null) {
            this.siguienteNumero(controlador, ts, valor);
        }
        else {
            this.obtenerallNumero(controlador, ts, valor);
        }
    }
    esbool(controlador, ts) {
        if (this.sig != null) {
            this.siguienteBool(controlador, ts);
        }
        else {
            this.obtenerBool(controlador, ts);
        }
    }
    siguienteNumero(controlador, ts, valor) {
        let cont = 1;
        if (ts != null) {
            for (let tssig of ts.sig) {
                if (this.exprecion.id == tssig.identificador) {
                    valor = this.exprecion.exprecion.getValor(controlador, ts);
                    if (cont == valor) {
                        this.sig.ejecutar(controlador, tssig.sig);
                    }
                    cont++;
                }
                else {
                    this.siguienteNumero(controlador, tssig.sig, valor);
                }
            }
        }
    }
    obtenerallNumero(controlador, ts, valor) {
        let cont = 1;
        if (ts != null) {
            for (let informacion of ts.tabla) {
                if (informacion.identificador == this.exprecion.id) {
                    valor = this.exprecion.exprecion.getValor(controlador, ts);
                    if (cont == valor) {
                        controlador.append(informacion.sim.objeto.gethtml("", controlador));
                    }
                    cont++;
                }
            }
            for (let tssig of ts.sig) {
                this.obtenerallNumero(controlador, tssig.sig, valor);
            }
        }
    }
    siguienteBool(controlador, ts) {
        let cont = 1;
        let posicion = 1;
        if (ts != null) {
            for (let tssig of ts.sig) {
                if (this.exprecion.id == tssig.identificador) {
                    controlador.position = cont;
                    controlador.posicionid = posicion;
                    if (this.exprecion.exprecion.getValor(controlador, ts)) {
                        this.sig.ejecutar(controlador, tssig.sig);
                    }
                    cont++;
                }
                else {
                    this.siguienteBool(controlador, tssig.sig);
                }
                posicion++;
            }
        }
    }
    obtenerBool(controlador, ts) {
        let cont = 1;
        let posicion = 1;
        if (ts != null) {
            for (let informacion of ts.tabla) {
                if (informacion.identificador == this.exprecion.id) {
                    controlador.position = cont;
                    controlador.posicionid = posicion;
                    if (this.exprecion.exprecion.getValor(controlador, ts)) {
                        controlador.append(informacion.sim.objeto.gethtml("", controlador));
                    }
                    cont++;
                }
                posicion++;
            }
            for (let tssig of ts.sig) {
                this.obtenerBool(controlador, tssig.sig);
            }
        }
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("//", "");
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Child::" + this.exprecion.id, ""));
        if (this.exprecion.exprecion != null) {
            padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("[", ""));
            padre.AddHijo(this.exprecion.exprecion.recorrer());
            padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("]", ""));
        }
        if (this.sig != null) {
            padre.AddHijo(this.sig.recorrer());
        }
        return padre;
    }
}


/***/ }),

/***/ "L2hm":
/*!******************************************************************!*\
  !*** ./src/Clases/Instrucciones/SentenciaTransferencia/Break.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Detener; });
/* harmony import */ var src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/clases/AST/Nodo */ "XRm8");

class Detener {
    constructor() {
    }
    ejecutar(controlador, ts) {
        return this;
    }
    recorrer() {
        let padre = new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("BREAK", "");
        return padre;
    }
}


/***/ }),

/***/ "LjH7":
/*!************************************!*\
  !*** ./src/Clases/xpath/acceso.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return acceso; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");

class acceso {
    constructor(exprecion, sig) {
        this.exprecion = exprecion;
        this.sig = sig;
    }
    ejecutar(controlador, ts) {
        if (this.exprecion.exprecion != null) {
            this.isxprecion(controlador, ts);
        }
        else {
            if (this.sig != null) {
                for (let tssig of ts.sig) {
                    if (this.exprecion.id == "*") {
                        this.sig.ejecutar(controlador, tssig.sig);
                    }
                    else {
                        if (this.exprecion.id == tssig.identificador) {
                            this.sig.ejecutar(controlador, tssig.sig);
                        }
                    }
                }
            }
            else {
                for (let informacion of ts.tabla) {
                    if (this.exprecion.tipo == 1) {
                        if (this.exprecion.id == "*") {
                            controlador.append(informacion.sim.objeto.gethtml("", controlador));
                        }
                        else {
                            if (informacion.identificador == this.exprecion.id && informacion.sim.simbolo == 1) {
                                controlador.append(informacion.sim.objeto.gethtml("", controlador));
                            }
                        }
                    }
                    else {
                        if (informacion.identificador == this.exprecion.id && informacion.sim.simbolo == 2) {
                            controlador.append(informacion.sim.valor + "\n");
                        }
                        else {
                            if (this.exprecion.id == "*" && informacion.sim.simbolo == 2) {
                                controlador.append(informacion.sim.valor);
                            }
                        }
                    }
                }
            }
        }
    }
    isxprecion(controlador, ts) {
        controlador.idlast = this.exprecion.id;
        let valor = this.exprecion.exprecion.getValor(controlador, ts);
        // this.exprecion.exprecion.getvalor3d(controlador,ts);
        if (typeof valor == 'number') {
            this.isNumero(controlador, ts, valor);
        }
        else {
            this.isboolean(controlador, ts);
        }
    }
    isNumero(controlador, ts, posicion) {
        let cont = 1;
        if (this.sig != null) {
            for (let tssig of ts.sig) {
                if (this.exprecion.id == tssig.identificador) {
                    if (cont == posicion) {
                        this.sig.ejecutar(controlador, tssig.sig);
                    }
                    cont++;
                }
            }
        }
        else {
            for (let informacion of ts.tabla) {
                if (informacion.identificador == this.exprecion.id) {
                    if (cont == posicion) {
                        this.exprecion.exprecion.getvalor3d(controlador, ts);
                        controlador.append(informacion.sim.objeto.gethtml("", controlador));
                    }
                    cont++;
                }
            }
        }
    }
    isboolean(controlador, ts) {
        let posicion = 1;
        console.log("entre");
        let cont = 1;
        if (this.sig != null) {
            for (let tssig of ts.sig) {
                if (this.exprecion.id == tssig.identificador) {
                    controlador.position = cont;
                    controlador.posicionid = posicion;
                    if (this.exprecion.exprecion.getValor(controlador, ts)) {
                        this.sig.ejecutar(controlador, tssig.sig);
                    }
                    cont++;
                }
                posicion++;
            }
        }
        else {
            for (let informacion of ts.tabla) {
                if (informacion.identificador == this.exprecion.id) {
                    controlador.position = cont;
                    controlador.posicionid = posicion;
                    if (this.exprecion.exprecion.getValor(controlador, ts)) {
                        let salida = this.exprecion.exprecion.getvalor3d(controlador, ts);
                        controlador.generador.genLabel(salida.lblTrue);
                        controlador.append(informacion.sim.objeto.gethtml("", controlador));
                        controlador.generador.genLabel(salida.lblFalse);
                        this.exprecion.exprecion.limpiar();
                    }
                    cont++;
                }
                posicion++;
            }
        }
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("/", "");
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.exprecion.id, ""));
        if (this.exprecion.exprecion != null) {
            padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("[", ""));
            padre.AddHijo(this.exprecion.exprecion.recorrer());
            padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("]", ""));
        }
        if (this.sig != null) {
            padre.AddHijo(this.sig.recorrer());
        }
        return padre;
    }
}


/***/ }),

/***/ "RxIe":
/*!***********************************************!*\
  !*** ./src/Clases/TablaSimbolos/contenido.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return contenido; });
class contenido {
    constructor(identificador, sim) {
        this.identificador = identificador;
        this.sim = sim;
    }
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _clases_Analizar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../clases/Analizar */ "/UlT");
/* harmony import */ var _Analizadores_XmlReporteGramatica__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Analizadores/XmlReporteGramatica */ "/RNI");
/* harmony import */ var _Analizadores_XmlReporteGramatica__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Analizadores_XmlReporteGramatica__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Analizadores_xPathReporteGramatica__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Analizadores/xPathReporteGramatica */ "V+Xp");
/* harmony import */ var _Analizadores_xPathReporteGramatica__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Analizadores_xPathReporteGramatica__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vis */ "TycK");
/* harmony import */ var vis__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vis__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-bootstrap-md */ "dbUT");
/* harmony import */ var _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ctrl/ngx-codemirror */ "Xl2X");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");








function AppComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_div_8_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r3.ejecutar(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Ejecutar Ascendente");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_div_8_Template_a_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r5.ejecutarDescendente(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Ejecutar Descendente");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_div_8_Template_a_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r6.traducir3D(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Traducir 3D XPAHT");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_div_8_Template_a_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r7.ejecutarXquery(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "Ejecutar XQuery");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function AppComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_div_13_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r8.recorrer(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Arbol AST Ascendente XML");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_div_13_Template_a_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r10.ejecutarDescendente(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Arbol AST Descendente XML");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_div_13_Template_a_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r9); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r11.xprecorrerDes(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Arbol AST Descendente XPAHT");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function AppComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "a", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_div_18_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r12.imprimirTabla(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Gramatical");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "a", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Errores l\u00E9xico");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "a", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Errores sint\u00E1ctico");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "a", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_div_18_Template_a_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r13); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r14.openPage("TablaSim", 2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "Errores el sem\u00E1ntico");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
const _c0 = function () { return { lineNumbers: true, theme: "material", mode: "markdown" }; };
class AppComponent {
    constructor() {
        this.entradaxpath = "";
        this.consola = "";
        this.entradaxml = "";
        this.htmlts = "";
        this.htmlerrores = "";
        this.reporteGramatical = "";
        this.xpathRG = "";
    }
    recorrer() {
        let ana = new _clases_Analizar__WEBPACK_IMPORTED_MODULE_0__["Analizador"]();
        if (this.entradaxml != "") {
            console.log("Vamos a graficar");
            let nodo_ast = ana.recorrer(this.entradaxml);
            let grafo = nodo_ast.GraficarSintactico(); //Aqui tenemos la cadena de graphviz para graficar
            console.log(grafo);
            const container = document.getElementById("app");
            var parsedData = vis__WEBPACK_IMPORTED_MODULE_3__["network"].convertDot(grafo);
            var data = {
                nodes: parsedData.nodes,
                edges: parsedData.edges
            };
            var options = parsedData.options;
            options.layout = {
                "hierarchical": true
            };
            options.nodes = {
                shape: "box",
                color: "#97C2FC",
                arrows: "to"
            };
            var network = new vis__WEBPACK_IMPORTED_MODULE_3__["Network"](container, data, options);
        }
    }
    recorrerDes() {
        let ana = new _clases_Analizar__WEBPACK_IMPORTED_MODULE_0__["Analizador"]();
        if (this.entradaxml != "") {
            console.log("Vamos a graficar");
            let nodo_ast = ana.recorrerDes(this.entradaxml);
            let grafo = nodo_ast.GraficarSintactico(); //Aqui tenemos la cadena de graphviz para graficar
            console.log(grafo);
            const container = document.getElementById("app");
            var parsedData = vis__WEBPACK_IMPORTED_MODULE_3__["network"].convertDot(grafo);
            var data = {
                nodes: parsedData.nodes,
                edges: parsedData.edges
            };
            var options = parsedData.options;
            options.layout = {
                "hierarchical": true
            };
            options.nodes = {
                color: "cyan"
            };
            var network = new vis__WEBPACK_IMPORTED_MODULE_3__["Network"](container, data, options);
        }
    }
    xprecorrerDes() {
        let ana = new _clases_Analizar__WEBPACK_IMPORTED_MODULE_0__["Analizador"]();
        if (this.entradaxpath != "") {
            console.log("Vamos a graficar");
            let nodo_ast = ana.recorrerDesxpath(this.entradaxpath);
            let grafo = nodo_ast.GraficarSintactico(); //Aqui tenemos la cadena de graphviz para graficar
            console.log(grafo);
            const container = document.getElementById("app");
            var parsedData = vis__WEBPACK_IMPORTED_MODULE_3__["network"].convertDot(grafo);
            var data = {
                nodes: parsedData.nodes,
                edges: parsedData.edges
            };
            var options = parsedData.options;
            options.layout = {
                "hierarchical": true
            };
            options.nodes = {
                color: "cyan"
            };
            var network = new vis__WEBPACK_IMPORTED_MODULE_3__["Network"](container, data, options);
        }
    }
    ejecutar() {
        let ana = new _clases_Analizar__WEBPACK_IMPORTED_MODULE_0__["Analizador"]();
        this.consola = "";
        if (this.entradaxml != "") {
            let ejecutar = ana.ejecutar(this.entradaxml, this.entradaxpath);
            this.consola = ejecutar.consola;
            this.htmlts = ejecutar.ts;
            /* this.htmlerrores = ejecutar.errores;*/
        }
    }
    traducir3D() {
        let ana = new _clases_Analizar__WEBPACK_IMPORTED_MODULE_0__["Analizador"]();
        if (this.entradaxml != null) {
            let ejecutar = ana.traducirxml(this.entradaxml, this.entradaxpath);
            this.consola = ejecutar.consola;
        }
    }
    imprimirTabla() {
        let ana = new _clases_Analizar__WEBPACK_IMPORTED_MODULE_0__["Analizador"]();
        if (this.entradaxml != "") {
            let ast = _Analizadores_XmlReporteGramatica__WEBPACK_IMPORTED_MODULE_1__["parse"](this.entradaxml);
            let ast1 = _Analizadores_xPathReporteGramatica__WEBPACK_IMPORTED_MODULE_2__["parse"](this.entradaxpath);
            this.xpathRG = ast1;
            this.reporteGramatical = ast;
        }
    }
    ejecutarDescendente() {
        let ana = new _clases_Analizar__WEBPACK_IMPORTED_MODULE_0__["Analizador"]();
        this.consola = "";
        if (this.entradaxml != "") {
            let ejecutar = ana.ejecutarDes(this.entradaxml, this.entradaxpath);
            this.consola = ejecutar.consola;
            this.htmlts = ejecutar.ts;
            /* this.htmlerrores = ejecutar.errores;*/
        }
    }
    openPage(pageName, valor) {
        if (valor == 1) {
            document.getElementById("tablasimbols").innerHTML = this.htmlts;
        }
        else if (valor == 2) {
            document.getElementById("tablasimbols").innerHTML = this.htmlerrores;
        }
        else if (valor == 3) {
            this.recorrer();
        }
        // Hide all elements with class="tabcontent" by default */
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        // Remove the background color of all tablinks/buttons
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].style.backgroundColor = "";
        }
        document.getElementById(pageName).style.display = "block";
    }
    ejecutarXquery() {
        let ana = new _clases_Analizar__WEBPACK_IMPORTED_MODULE_0__["Analizador"]();
        this.consola = "";
        if (this.entradaxpath != "") {
            ana.recorrerXquery(this.entradaxpath);
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 80, vars: 15, consts: [[1, "nav", "grey", "lighten-4", "py-4"], [1, "nav-item"], ["href", "#!", 1, "nav-link", "disabled"], ["dropdown", "", 1, "nav-item", "dropdown"], ["dropdownToggle", "", "mdbWavesEffect", "", "type", "button", "mdbWavesEffect", "", 1, "nav-link", "dropdown-toggle", "waves-light"], [1, "caret"], ["class", "dropdown-menu dropdown dropdown-primary", "role", "menu", 4, "dropdownMenu"], ["mdbBtn", "", "type", "button", "color", "default", "rounded", "true", "outline", "true", "mdbWavesEffect", "", 3, "click"], [1, "container-fluid"], [1, "col"], [3, "ngModel", "options", "ngModelChange"], [1, "row"], [1, "col-sm-6", "mb-3", "mb-md-0"], [1, "col-sm-6"], ["id", "TablaSim", 1, "tabcontent", 2, "background-color", "#1b1d1c"], ["mdbTable", "", "id", "tablasimbols", "bordered", "true", 2, "width", "100%"], ["id", "ast", 1, "tabcontent", 2, "background-color", "#1b1d1c"], ["id", "graph", 1, "overflow-auto", 2, "text-align", "center"], ["id", "app"], ["role", "menu", 1, "dropdown-menu", "dropdown", "dropdown-primary"], ["mdbWavesEffect", "", 1, "dropdown-item", "waves-light", 3, "click"], [1, "divider", "dropdown-divider"], ["mdbWavesEffect", "", "href", "#", 1, "dropdown-item", "waves-light"], ["mdbWavesEffect", "", "href", "#", 1, "dropdown-item", "waves-light", 3, "click"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ul", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Organizaci\u00F3n de Lenguajes y Compiladores 2");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, " Ejecutar ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, AppComponent_div_8_Template, 13, 0, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, " Arbol ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, AppComponent_div_13_Template, 9, 0, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, " Reportes");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](17, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, AppComponent_div_18_Template, 13, 0, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_Template_button_click_20_listener() { return ctx.openPage("TablaSim", 1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21, "Tabla de S\u00EDmbolos");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](22, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "mdb-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "mdb-card-body");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "mdb-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](28, "XPAHT");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "ngx-codemirror", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngx_codemirror_ngModelChange_30_listener($event) { return ctx.entradaxpath = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](31, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](32, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "mdb-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](36, "mdb-card-body");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](37, "mdb-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](39, "XML");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](40, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](41, "ngx-codemirror", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngx_codemirror_ngModelChange_41_listener($event) { return ctx.entradaxml = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](42, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](43, "mdb-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](44, "mdb-card-body");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](45, "mdb-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](46, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](47, "Consola");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](48, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](49, "ngx-codemirror", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngx_codemirror_ngModelChange_49_listener($event) { return ctx.consola = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](50, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](51, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](52, "table", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](53, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](54, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](55, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](56, "mdb-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](57, "mdb-card-body");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](58, "mdb-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](59, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](60, "REPORTE GRAMATICAL");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](61, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](62, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](63, "mdb-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](64, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](65, "XML");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](66, "ngx-codemirror", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngx_codemirror_ngModelChange_66_listener($event) { return ctx.reporteGramatical = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](67, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](68, "mdb-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](69, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](70, "XPATH");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](71, "ngx-codemirror", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngx_codemirror_ngModelChange_71_listener($event) { return ctx.xpathRG = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](72, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](73, "mdb-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](74, "mdb-card-body");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](75, "mdb-card-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](76, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](77, "Arbol");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](78, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](79, "br");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](30);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.entradaxpath)("options", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](10, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.entradaxml)("options", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](11, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.consola)("options", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](12, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.reporteGramatical)("options", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](13, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.xpathRG)("options", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](14, _c0));
    } }, directives: [angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["BsDropdownDirective"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["BsDropdownToggleDirective"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["WavesDirective"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["BsDropdownMenuDirective"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["MdbBtnDirective"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["MdbCardComponent"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["MdbCardBodyComponent"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["MdbCardTitleComponent"], _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_6__["CodemirrorComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_5__["MdbTableDirective"]], styles: [".column[_ngcontent-%COMP%] {\n  float: left;\n  width: 33.33%;\n  padding: 15px;\n}\n\n.row[_ngcontent-%COMP%]:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n.ui-tabs[_ngcontent-%COMP%] {\n  position: relative;\n  \n  padding: 0.2em;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.2em 0.2em 0;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  list-style: none;\n  float: left;\n  position: relative;\n  top: 0;\n  margin: 1px 0.2em 0 0;\n  border-bottom-width: 0;\n  padding: 0;\n  white-space: nowrap;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  float: left;\n  padding: 0.5em 1em;\n  text-decoration: none;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li.ui-tabs-active[_ngcontent-%COMP%] {\n  margin-bottom: -1px;\n  padding-bottom: 1px;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li.ui-tabs-active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li.ui-state-disabled[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li.ui-tabs-loading[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  cursor: text;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .ui-tabs-collapsible[_ngcontent-%COMP%]   .ui-tabs-nav[_ngcontent-%COMP%]   li.ui-tabs-active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.ui-tabs[_ngcontent-%COMP%]   .ui-tabs-panel[_ngcontent-%COMP%] {\n  display: block;\n  border-width: 0;\n  padding: 1em 1.4em;\n  background: none;\n}\n\nbody[_ngcontent-%COMP%], html[_ngcontent-%COMP%] {\n  height: 100%;\n  margin: 0;\n  font-family: Arial;\n}\n\n.tablink[_ngcontent-%COMP%] {\n  background-color: #555;\n  color: white;\n  float: left;\n  border: none;\n  outline: none;\n  cursor: pointer;\n  padding: 14px 16px;\n  font-size: 17px;\n  width: 25%;\n}\n.tablink[_ngcontent-%COMP%]:hover {\n  background-color: #777;\n}\n\n.tabcontent[_ngcontent-%COMP%] {\n  color: white;\n  display: none;\n  padding: 100px 20px;\n  height: 100%;\n}\n#app[_ngcontent-%COMP%] {\n  height: 800px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGtEQUFBO0FBQ0E7RUFDQyxXQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7QUFDRDtBQUVFLG1DQUFBO0FBQ0E7RUFDRCxXQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7QUFDRDtBQUVFO0VBQ0Qsa0JBQUE7RUFBbUIsdUlBQUE7RUFDbkIsY0FBQTtBQUVEO0FBQUE7RUFDQyxTQUFBO0VBQ0Esc0JBQUE7QUFHRDtBQURBO0VBQ0MsZ0JBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtFQUNBLFVBQUE7RUFDQSxtQkFBQTtBQUlEO0FBRkE7RUFDQyxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtBQUtEO0FBSEE7RUFDQyxtQkFBQTtFQUNBLG1CQUFBO0FBTUQ7QUFKQTs7O0VBR0MsWUFBQTtBQU9EO0FBTEE7O0VBRUMsZUFBQTtBQVFEO0FBTkE7RUFDQyxjQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFTRDtBQU5BLDJFQUFBO0FBQ0E7RUFDQyxZQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBU0Q7QUFORSxvQkFBQTtBQUNBO0VBQ0Qsc0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLFVBQUE7QUFTRDtBQU5FO0VBQ0Qsc0JBQUE7QUFTRDtBQU5FLHNFQUFBO0FBQ0E7RUFDRCxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQVNEO0FBTkU7RUFDRCxhQUFBO0FBU0QiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ3JlYXRlIGNvbHVtbnMgdGhhdCBmbG9hdHMgbmV4dCB0byBlYWNoIG90aGVyICovXHJcbi5jb2x1bW4ge1xyXG5cdGZsb2F0OiBsZWZ0O1xyXG5cdHdpZHRoOiAzMy4zMyU7XHJcblx0cGFkZGluZzogMTVweDtcclxuICB9XHJcbiAgXHJcbiAgLyogQ2xlYXIgZmxvYXRzIGFmdGVyIHRoZSBjb2x1bW5zICovXHJcbiAgLnJvdzphZnRlciB7XHJcblx0Y29udGVudDogXCJcIjtcclxuXHRkaXNwbGF5OiB0YWJsZTtcclxuXHRjbGVhcjogYm90aDtcclxuICB9XHJcblxyXG4gIC51aS10YWJzIHtcclxuXHRwb3NpdGlvbjogcmVsYXRpdmU7LyogcG9zaXRpb246IHJlbGF0aXZlIHByZXZlbnRzIElFIHNjcm9sbCBidWcgKGVsZW1lbnQgd2l0aCBwb3NpdGlvbjogcmVsYXRpdmUgaW5zaWRlIGNvbnRhaW5lciB3aXRoIG92ZXJmbG93OiBhdXRvIGFwcGVhciBhcyBcImZpeGVkXCIpICovXHJcblx0cGFkZGluZzogLjJlbTtcclxufVxyXG4udWktdGFicyAudWktdGFicy1uYXYge1xyXG5cdG1hcmdpbjogMDtcclxuXHRwYWRkaW5nOiAuMmVtIC4yZW0gMDtcclxufVxyXG4udWktdGFicyAudWktdGFicy1uYXYgbGkge1xyXG5cdGxpc3Qtc3R5bGU6IG5vbmU7XHJcblx0ZmxvYXQ6IGxlZnQ7XHJcblx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdHRvcDogMDtcclxuXHRtYXJnaW46IDFweCAuMmVtIDAgMDtcclxuXHRib3JkZXItYm90dG9tLXdpZHRoOiAwO1xyXG5cdHBhZGRpbmc6IDA7XHJcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG4udWktdGFicyAudWktdGFicy1uYXYgbGkgYSB7XHJcblx0ZmxvYXQ6IGxlZnQ7XHJcblx0cGFkZGluZzogLjVlbSAxZW07XHJcblx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcbi51aS10YWJzIC51aS10YWJzLW5hdiBsaS51aS10YWJzLWFjdGl2ZSB7XHJcblx0bWFyZ2luLWJvdHRvbTogLTFweDtcclxuXHRwYWRkaW5nLWJvdHRvbTogMXB4O1xyXG59XHJcbi51aS10YWJzIC51aS10YWJzLW5hdiBsaS51aS10YWJzLWFjdGl2ZSBhLFxyXG4udWktdGFicyAudWktdGFicy1uYXYgbGkudWktc3RhdGUtZGlzYWJsZWQgYSxcclxuLnVpLXRhYnMgLnVpLXRhYnMtbmF2IGxpLnVpLXRhYnMtbG9hZGluZyBhIHtcclxuXHRjdXJzb3I6IHRleHQ7XHJcbn1cclxuLnVpLXRhYnMgLnVpLXRhYnMtbmF2IGxpIGEsIC8qIGZpcnN0IHNlbGVjdG9yIGluIGdyb3VwIHNlZW1zIG9ic29sZXRlLCBidXQgcmVxdWlyZWQgdG8gb3ZlcmNvbWUgYnVnIGluIE9wZXJhIGFwcGx5aW5nIGN1cnNvcjogdGV4dCBvdmVyYWxsIGlmIGRlZmluZWQgZWxzZXdoZXJlLi4uICovXHJcbi51aS10YWJzLWNvbGxhcHNpYmxlIC51aS10YWJzLW5hdiBsaS51aS10YWJzLWFjdGl2ZSBhIHtcclxuXHRjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLnVpLXRhYnMgLnVpLXRhYnMtcGFuZWwge1xyXG5cdGRpc3BsYXk6IGJsb2NrO1xyXG5cdGJvcmRlci13aWR0aDogMDtcclxuXHRwYWRkaW5nOiAxZW0gMS40ZW07XHJcblx0YmFja2dyb3VuZDogbm9uZTtcclxufVxyXG5cclxuLyogU2V0IGhlaWdodCBvZiBib2R5IGFuZCB0aGUgZG9jdW1lbnQgdG8gMTAwJSB0byBlbmFibGUgXCJmdWxsIHBhZ2UgdGFic1wiICovXHJcbmJvZHksIGh0bWwge1xyXG5cdGhlaWdodDogMTAwJTtcclxuXHRtYXJnaW46IDA7XHJcblx0Zm9udC1mYW1pbHk6IEFyaWFsO1xyXG4gIH1cclxuICBcclxuICAvKiBTdHlsZSB0YWIgbGlua3MgKi9cclxuICAudGFibGluayB7XHJcblx0YmFja2dyb3VuZC1jb2xvcjogIzU1NTtcclxuXHRjb2xvcjogd2hpdGU7XHJcblx0ZmxvYXQ6IGxlZnQ7XHJcblx0Ym9yZGVyOiBub25lO1xyXG5cdG91dGxpbmU6IG5vbmU7XHJcblx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdHBhZGRpbmc6IDE0cHggMTZweDtcclxuXHRmb250LXNpemU6IDE3cHg7XHJcblx0d2lkdGg6IDI1JTtcclxuICB9XHJcbiAgXHJcbiAgLnRhYmxpbms6aG92ZXIge1xyXG5cdGJhY2tncm91bmQtY29sb3I6ICM3Nzc7XHJcbiAgfVxyXG4gIFxyXG4gIC8qIFN0eWxlIHRoZSB0YWIgY29udGVudCAoYW5kIGFkZCBoZWlnaHQ6MTAwJSBmb3IgZnVsbCBwYWdlIGNvbnRlbnQpICovXHJcbiAgLnRhYmNvbnRlbnQge1xyXG5cdGNvbG9yOiB3aGl0ZTtcclxuXHRkaXNwbGF5OiBub25lO1xyXG5cdHBhZGRpbmc6IDEwMHB4IDIwcHg7XHJcblx0aGVpZ2h0OiAxMDAlO1xyXG4gIH1cclxuXHJcbiAgI2FwcCB7XHJcblx0aGVpZ2h0OiA4MDBweDtcclxuICB9XHJcbiAgXHJcbiAiXX0= */"] });


/***/ }),

/***/ "T71e":
/*!********************************************!*\
  !*** ./src/Clases/Expreciones/position.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return position; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");
/* harmony import */ var _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TablaSimbolos/Tipo */ "lKex");
/* harmony import */ var _retorno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retorno */ "munq");



class position {
    getvalor3d(controlador, ts) {
        return new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](controlador.position + "", false, new _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("DOBLE"));
    }
    getTipo(controlador, ts) {
        throw new Error("Method not implemented.");
    }
    getValor(controlador, ts) {
        return controlador.position;
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("position();", "");
        return padre;
    }
    limpiar() {
    }
}


/***/ }),

/***/ "V+Xp":
/*!***************************************************!*\
  !*** ./src/Analizadores/xPathReporteGramatica.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var xPathReporteGramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,6],$V2=[1,8],$V3=[1,9],$V4=[1,10],$V5=[1,11],$V6=[1,12],$V7=[1,13],$V8=[1,14],$V9=[1,15],$Va=[1,16],$Vb=[1,17],$Vc=[1,18],$Vd=[1,19],$Ve=[1,20],$Vf=[1,21],$Vg=[1,22],$Vh=[1,23],$Vi=[5,7],$Vj=[1,30],$Vk=[1,31],$Vl=[1,32],$Vm=[5,7,9,11,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31],$Vn=[1,37],$Vo=[1,55],$Vp=[1,56],$Vq=[1,57],$Vr=[1,52],$Vs=[1,59],$Vt=[1,53],$Vu=[1,54],$Vv=[1,58],$Vw=[1,64],$Vx=[1,65],$Vy=[1,63],$Vz=[1,66],$VA=[1,67],$VB=[1,68],$VC=[1,70],$VD=[1,71],$VE=[1,72],$VF=[1,73],$VG=[1,74],$VH=[1,75],$VI=[32,33,35,38,39,40,41,42,43,44,45,46,47,48],$VJ=[32,33,38,39,42,43,44,45,46,47,48],$VK=[33,38,42,43,44,45,46,47,48];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"inicio":3,"varias":4,"EOF":5,"instrucciones":6,"SIGNOO":7,"instruccion":8,"BARRA":9,"e":10,"BARRABARRA":11,"RESERV":12,"DOSPUNTOS":13,"PUNTOPUNTO":14,"ID":15,"LAST":16,"POSITION":17,"ANCESTOR":18,"RESERVLARGE":19,"ATTRIBUTE":20,"ANCESORSELF":21,"CHILD":22,"DESCENDANT":23,"FOLLOWING":24,"NAMESPACE":25,"PARENT":26,"PRECENDING":27,"SELF":28,"TEXT":29,"NODE":30,"SIBLING":31,"MENOS":32,"OR":33,"ARROBA":34,"ASTERISCO":35,"CORA":36,"OPERADORES":37,"CORC":38,"MAS":39,"DIV":40,"MODULO":41,"AND":42,"MAYORQUE":43,"MAYORIGUAL":44,"MENORQUE":45,"MENORIGUAL":46,"DIFERENTE":47,"IGUAL":48,"DECIMAL":49,"ENTERO":50,"CADENA":51,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"SIGNOO",9:"BARRA",11:"BARRABARRA",13:"DOSPUNTOS",14:"PUNTOPUNTO",15:"ID",16:"LAST",17:"POSITION",18:"ANCESTOR",20:"ATTRIBUTE",21:"ANCESORSELF",22:"CHILD",23:"DESCENDANT",24:"FOLLOWING",25:"NAMESPACE",26:"PARENT",27:"PRECENDING",28:"SELF",29:"TEXT",30:"NODE",31:"SIBLING",32:"MENOS",33:"OR",34:"ARROBA",35:"ASTERISCO",36:"CORA",38:"CORC",39:"MAS",40:"DIV",41:"MODULO",42:"AND",43:"MAYORQUE",44:"MAYORIGUAL",45:"MENORQUE",46:"MENORIGUAL",47:"DIFERENTE",48:"IGUAL",49:"DECIMAL",50:"ENTERO",51:"CADENA"},
productions_: [0,[3,2],[4,3],[4,1],[6,2],[6,1],[8,2],[8,2],[8,3],[8,4],[8,2],[8,4],[8,1],[12,1],[12,1],[12,2],[12,1],[12,1],[12,1],[12,2],[12,1],[12,2],[12,1],[12,1],[12,1],[12,1],[12,2],[12,1],[12,1],[12,1],[12,1],[19,4],[19,2],[10,1],[10,2],[10,2],[10,1],[10,4],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,2],[37,1],[37,1],[37,1],[37,1],[37,1],[37,1],[37,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
  this.$ = "inicio -> varias \n"+$$[$0-1];  return this.$; 
break;
case 2:
this.$='varias -> instrucciones SIGNOO instrucciones \n'+$$[$0-2]+$$[$0];
break;
case 3:
this.$='varias -> instrucciones \n'+$$[$0];
break;
case 4:
 this.$ = 'instrucciones -> instruccion instrucciones \n'+$$[$0-1]+$$[$0]; 
break;
case 5:
 this.$= 'instrucciones -> instruccion \n'+$$[$0]; 
break;
case 6:
  this.$ = 'instruccion -> BARRA e; \n'+$$[$0];
break;
case 7:
  this.$ = 'instruccion -> BARRABARRA e; \n'+$$[$0];
break;
case 8:
  this.$ =  'instruccion -> RESERV DOSPUNTOS e; \n'+$$[$0-2]+$$[$0];
break;
case 9:
  this.$ =  'instruccion -> BARRA RESERV DOSPUNTOS e; \n'+$$[$0-2]+$$[$0];
break;
case 10:
  this.$ =  'instruccion -> BARRA PUNTOPUNTO; \n';
break;
case 11:
  this.$ =  'instruccion -> BARRABARRA RESERV DOSPUNTOS e; \n'+$$[$0-2]+$$[$0];
break;
case 12:
  this.$ =  'instruccion -> ID; \n';
break;
case 13:
this.$ = 'RESERV -> LAST; \n';
break;
case 14:
this.$ = 'RESERV -> POSITION; \n';
break;
case 15:
this.$ = 'RESERV -> ANCESTOR RESERVLARGE; \n'+$$[$0];
break;
case 16:
this.$ = 'RESERV -> ATTRIBUTE; \n';
break;
case 17:
this.$ = 'RESERV -> ANCESORSELF; \n';
break;
case 18:
this.$ = 'RESERV -> CHILD; \n';
break;
case 19:
this.$ = 'RESERV -> DESCENDANT RESERVLARGE; \n'+$$[$0];
break;
case 20:
this.$ = 'RESERV -> DESCENDANT; \n';
break;
case 21:
this.$ = 'RESERV -> FOLLOWING RESERVLARGE; \n'+$$[$0];
break;
case 22:
this.$ = 'RESERV -> FOLLOWING; \n';
break;
case 23:
this.$ = 'RESERV -> NAMESPACE; \n';
break;
case 24:
this.$ = 'RESERV -> PARENT; \n';
break;
case 25:
this.$ = 'RESERV -> PRECENDING; \n';
break;
case 26:
this.$ = 'RESERV -> PRECENDING RESERVLARGE; \n'+$$[$0];
break;
case 27:
this.$ = 'RESERV -> SELF; \n';
break;
case 28:
this.$ = 'RESERV -> TEXT; \n';
break;
case 29:
this.$ = 'RESERV -> NODE; \n';
break;
case 30:
this.$ = 'RESERV -> SIBLING; \n';
break;
case 31:
this.$= 'RESERVLARGE -> MENOS OR MENOS SELF; \n'; 
break;
case 32:
this.$= 'RESERVLARGE -> MENOS SIBLING; \n';
break;
case 33:
this.$= 'e -> ID; \n';
break;
case 34:
this.$= 'e -> ARROBA ID; \n';
break;
case 35:
this.$= 'e -> ARROBA ASTERISCO; \n';
break;
case 36:
this.$='e -> ASTERISCO; \n';
break;
case 37:
this.$='e -> ID CORA OPERADORES CORC; \n'+$$[$0-1];
break;
case 38:
this.$ = 'OPERADORES -> OPERADORES MAS OPERADORES; \n'+$$[$0-2]+$$[$0];
break;
case 39:
this.$ = 'OPERADORES -> OPERADORES MENOS OPERADORES; \n'+$$[$0-2]+$$[$0];
break;
case 40:
this.$ = 'OPERADORES -> OPERADORES ASTERISCO OPERADORES; \n'+$$[$0-2]+$$[$0];
break;
case 41:
this.$ = 'OPERADORES -> OPERADORES DIV OPERADORES; \n'+$$[$0-2]+$$[$0];
break;
case 42:
this.$ = 'OPERADORES -> OPERADORES MODULO OPERADORES; \n'+$$[$0-2]+$$[$0];
break;
case 43:
this.$ = 'OPERADORES -> OPERADORES AND OPERADORES; \n'+$$[$0-2]+$$[$0];
break;
case 44:
this.$ = 'OPERADORES -> OPERADORES OR OPERADORES; \n'+$$[$0-2]+$$[$0];
break;
case 45:
this.$ = 'OPERADORES -> OPERADORES MAYORQUE OPERADORES; \n'+$$[$0-2]+$$[$0];
break;
case 46:
this.$ = 'OPERADORES -> OPERADORES MAYORIGUAL OPERADORES; \n'+$$[$0-2]+$$[$0];
break;
case 47:
this.$ = 'OPERADORES -> OPERADORES MENORQUE OPERADORES; \n'+$$[$0-2]+$$[$0];
break;
case 48:
this.$ = 'OPERADORES -> OPERADORES MENORIGUAL OPERADORES; \n'+$$[$0-2]+$$[$0];
break;
case 49:
this.$ = 'OPERADORES -> OPERADORES DIFERENTE OPERADORES; \n'+$$[$0-2]+$$[$0];
break;
case 50:
this.$ = 'OPERADORES -> OPERADORES IGUAL OPERADORES; \n '+$$[$0-2]+$$[$0];
break;
case 51:
this.$ = 'OPERADORES -> MENOS OPERADORES %prec UNARIO; \n '+$$[$0];
break;
case 52:
this.$ = 'OPERADORES -> DECIMAL; \n';
break;
case 53:
this.$ = 'OPERADORES -> ENTERO; \n';
break;
case 54:
this.$ = 'OPERADORES -> ID; \n'; 
break;
case 55:
this.$ = 'OPERADORES -> LAST; \n ';
break;
case 56:
this.$ = 'OPERADORES -> POSITION; \n';
break;
case 57:
this.$ = 'OPERADORES -> CADENA; \n';
break;
case 58:
this.$ = 'OPERADORES ->ARROBA ID; \n'; 
break;
}
},
table: [{3:1,4:2,6:3,8:4,9:$V0,11:$V1,12:7,15:$V2,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh},{1:[3]},{5:[1,24]},{5:[2,3],7:[1,25]},o($Vi,[2,5],{8:4,12:7,6:26,9:$V0,11:$V1,15:$V2,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh}),{10:27,12:28,14:[1,29],15:$Vj,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,34:$Vk,35:$Vl},{10:33,12:34,15:$Vj,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,34:$Vk,35:$Vl},{13:[1,35]},o($Vm,[2,12]),{13:[2,13]},{13:[2,14]},{19:36,32:$Vn},{13:[2,16]},{13:[2,17]},{13:[2,18]},{13:[2,20],19:38,32:$Vn},{13:[2,22],19:39,32:$Vn},{13:[2,23]},{13:[2,24]},{13:[2,25],19:40,32:$Vn},{13:[2,27]},{13:[2,28]},{13:[2,29]},{13:[2,30]},{1:[2,1]},{6:41,8:4,9:$V0,11:$V1,12:7,15:$V2,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh},o($Vi,[2,4]),o($Vm,[2,6]),{13:[1,42]},o($Vm,[2,10]),o($Vm,[2,33],{36:[1,43]}),{15:[1,44],35:[1,45]},o($Vm,[2,36]),o($Vm,[2,7]),{13:[1,46]},{10:47,15:$Vj,34:$Vk,35:$Vl},{13:[2,15]},{31:[1,49],33:[1,48]},{13:[2,19]},{13:[2,21]},{13:[2,26]},{5:[2,2]},{10:50,15:$Vj,34:$Vk,35:$Vl},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:51,49:$Vt,50:$Vu,51:$Vv},o($Vm,[2,34]),o($Vm,[2,35]),{10:60,15:$Vj,34:$Vk,35:$Vl},o($Vm,[2,8]),{32:[1,61]},{13:[2,32]},o($Vm,[2,9]),{32:$Vw,33:[1,69],35:$Vx,38:[1,62],39:$Vy,40:$Vz,41:$VA,42:$VB,43:$VC,44:$VD,45:$VE,46:$VF,47:$VG,48:$VH},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:76,49:$Vt,50:$Vu,51:$Vv},o($VI,[2,52]),o($VI,[2,53]),o($VI,[2,54]),o($VI,[2,55]),o($VI,[2,56]),o($VI,[2,57]),{15:[1,77]},o($Vm,[2,11]),{28:[1,78]},o($Vm,[2,37]),{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:79,49:$Vt,50:$Vu,51:$Vv},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:80,49:$Vt,50:$Vu,51:$Vv},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:81,49:$Vt,50:$Vu,51:$Vv},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:82,49:$Vt,50:$Vu,51:$Vv},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:83,49:$Vt,50:$Vu,51:$Vv},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:84,49:$Vt,50:$Vu,51:$Vv},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:85,49:$Vt,50:$Vu,51:$Vv},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:86,49:$Vt,50:$Vu,51:$Vv},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:87,49:$Vt,50:$Vu,51:$Vv},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:88,49:$Vt,50:$Vu,51:$Vv},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:89,49:$Vt,50:$Vu,51:$Vv},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:90,49:$Vt,50:$Vu,51:$Vv},{15:$Vo,16:$Vp,17:$Vq,32:$Vr,34:$Vs,37:91,49:$Vt,50:$Vu,51:$Vv},o($VI,[2,51]),o($VI,[2,58]),{13:[2,31]},o($VJ,[2,38],{35:$Vx,40:$Vz,41:$VA}),o($VJ,[2,39],{35:$Vx,40:$Vz,41:$VA}),o($VI,[2,40]),o($VI,[2,41]),o($VI,[2,42]),o([33,38,42],[2,43],{32:$Vw,35:$Vx,39:$Vy,40:$Vz,41:$VA,43:$VC,44:$VD,45:$VE,46:$VF,47:$VG,48:$VH}),o([33,38],[2,44],{32:$Vw,35:$Vx,39:$Vy,40:$Vz,41:$VA,42:$VB,43:$VC,44:$VD,45:$VE,46:$VF,47:$VG,48:$VH}),o($VK,[2,45],{32:$Vw,35:$Vx,39:$Vy,40:$Vz,41:$VA}),o($VK,[2,46],{32:$Vw,35:$Vx,39:$Vy,40:$Vz,41:$VA}),o($VK,[2,47],{32:$Vw,35:$Vx,39:$Vy,40:$Vz,41:$VA}),o($VK,[2,48],{32:$Vw,35:$Vx,39:$Vy,40:$Vz,41:$VA}),o($VK,[2,49],{32:$Vw,35:$Vx,39:$Vy,40:$Vz,41:$VA}),o($VK,[2,50],{32:$Vw,35:$Vx,39:$Vy,40:$Vz,41:$VA})],
defaultActions: {9:[2,13],10:[2,14],12:[2,16],13:[2,17],14:[2,18],17:[2,23],18:[2,24],20:[2,27],21:[2,28],22:[2,29],23:[2,30],24:[2,1],36:[2,15],38:[2,19],39:[2,21],40:[2,26],41:[2,2],49:[2,32],78:[2,31]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

   
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0: console.log("Reconocio : "+ yy_.yytext); return 46
break;
case 1: console.log("Reconocio : "+ yy_.yytext); return 44
break;
case 2: console.log("Reconocio : "+ yy_.yytext); return 48
break;
case 3: console.log("Reconocio : "+ yy_.yytext); return 45
break;
case 4: console.log("Reconocio : "+ yy_.yytext); return 43
break;
case 5: console.log("Reconocio : "+ yy_.yytext); return 47
break;
case 6: console.log("Reconocio : "+ yy_.yytext); return 'PARA'
break;
case 7: console.log("Reconocio : "+ yy_.yytext); return 11
break;
case 8: console.log("Reconocio : "+ yy_.yytext); return 9
break;
case 9: console.log("Reconocio : "+ yy_.yytext); return 'PARC'
break;
case 10: console.log("Reconocio : "+ yy_.yytext); return 36
break;
case 11: console.log("Reconocio : "+ yy_.yytext); return 38
break;
case 12: console.log("Reconocio : "+ yy_.yytext); return 34
break;
case 13: console.log("Reconocio : "+ yy_.yytext); return 14
break;
case 14: console.log("Reconocio : "+ yy_.yytext); return 'PUNTO'
break;
case 15: console.log("Reconocio : "+ yy_.yytext); return 7
break;
case 16: console.log("Reconocio : "+ yy_.yytext); return 13
break;
case 17: console.log("Reconocio : "+ yy_.yytext); return 39
break;
case 18: console.log("Reconocio : "+ yy_.yytext); return 32
break;
case 19: console.log("Reconocio : "+ yy_.yytext); return 35
break;
case 20: console.log("Reconocio : "+ yy_.yytext); return 40
break;
case 21: console.log("Reconocio : "+ yy_.yytext); return 41
break;
case 22: console.log("Reconocio : "+ yy_.yytext); return 42
break;
case 23: console.log("Reconocio : "+ yy_.yytext); return 33
break;
case 24: console.log("Reconocio : "+ yy_.yytext); return 16
break;
case 25: console.log("Reconocio : "+ yy_.yytext); return 17
break;
case 26: console.log("Reconocio : "+ yy_.yytext); return 18
break;
case 27: console.log("Reconocio : "+ yy_.yytext); return 20
break;
case 28: console.log("Reconocio : "+ yy_.yytext); return 28
break;
case 29: console.log("Reconocio : "+ yy_.yytext); return 22
break;
case 30: console.log("Reconocio : "+ yy_.yytext); return 23
break;
case 31: console.log("Reconocio : "+ yy_.yytext); return 24
break;
case 32: console.log("Reconocio : "+ yy_.yytext); return 31
break;
case 33: console.log("Reconocio : "+ yy_.yytext); return 25
break;
case 34: console.log("Reconocio : "+ yy_.yytext); return 26
break;
case 35: console.log("Reconocio : "+ yy_.yytext); return 27
break;
case 36: console.log("Reconocio : "+ yy_.yytext); return 29
break;
case 37: console.log("Reconocio : "+ yy_.yytext); return 30
break;
case 38: console.log("Reconocio : "+ yy_.yytext); return 16
break;
case 39: console.log("Reconocio : "+ yy_.yytext); return 17
break;
case 40: console.log("Reconocio : "+ yy_.yytext); return 49
break;
case 41: console.log("Reconocio : "+ yy_.yytext); return 50
break;
case 42: console.log("Reconocio id : "+ yy_.yytext); return 15
break;
case 43: console.log("Reconocio : "+ yy_.yytext); return 51
break;
case 44: /* skip whitespace */ 
break;
case 45:return 5
break;
case 46: console.log("Error Lexico "+yy_.yytext
                        +" linea "+yy_.yylineno
                        +" columna "+(yy_.yylloc.last_column+1));
                                      
                        
break;
}
},
rules: [/^(?:<=)/i,/^(?:>=)/i,/^(?:=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:!=)/i,/^(?:\()/i,/^(?:\/\/)/i,/^(?:\/)/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:@)/i,/^(?:\.\.)/i,/^(?:\.)/i,/^(?:\|)/i,/^(?:::)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:div\b)/i,/^(?:mod\b)/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:last\(\))/i,/^(?:position\(\))/i,/^(?:ancestor\b)/i,/^(?:attribute\b)/i,/^(?:self\b)/i,/^(?:child\b)/i,/^(?:descendant\b)/i,/^(?:following\b)/i,/^(?:sibling\b)/i,/^(?:namespace\b)/i,/^(?:parent\b)/i,/^(?:preceding\b)/i,/^(?:text\(\))/i,/^(?:node\(\))/i,/^(?:last\(\))/i,/^(?:position\(\))/i,/^(?:[0-9]+\.([0-9]+)?\b)/i,/^(?:([0-9]+))/i,/^(?:([a-zñA-ZÑ_][a-zñA-ZÑ0-9_]*))/i,/^(?:(("((\\([\'\"\\ntr]))|([^\"\\]+))*")))/i,/^(?:[\s\r\n\t])/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (true) {
exports.parser = xPathReporteGramatica;
exports.Parser = xPathReporteGramatica.Parser;
exports.parse = function () { return xPathReporteGramatica.parse.apply(xPathReporteGramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = __webpack_require__(/*! fs */ 1).readFileSync(__webpack_require__(/*! path */ 2).normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
  exports.main(process.argv.slice(1));
}
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "VEqm":
/*!**********************************************************!*\
  !*** ./src/Clases/Expreciones/Operaciones/Relaciones.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Relaciones; });
/* harmony import */ var src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/clases/AST/Nodo */ "XRm8");
/* harmony import */ var src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/clases/TablaSimbolos/Tipo */ "YE/1");
/* harmony import */ var _retorno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../retorno */ "munq");
/* harmony import */ var _Operaciones__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Operaciones */ "vu0p");




class Relaciones extends _Operaciones__WEBPACK_IMPORTED_MODULE_3__["default"] {
    constructor(exp1, op, exp2, linea, columna, expU) {
        super(exp1, op, exp2, linea, columna, expU);
    }
    getTipo(controlador, ts) {
        let valor = this.getValor(controlador, ts);
        if (typeof valor === 'number') {
            return src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE;
        }
        else if (typeof valor === 'string') {
            return src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].CADENA;
        }
        else if (typeof valor === 'boolean') {
            return src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].BOOLEANO;
        }
    }
    limpiar() {
        this.lblFalse = '';
        this.lblTrue = '';
        if (this.expU == false) {
            this.exp1.limpiar();
            this.exp2.limpiar();
        }
        else {
            this.exp1.limpiar();
        }
    }
    getValor(controlador, TablaSimbolos) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;
        if (this.expU == false) {
            valor_exp1 = this.exp1.getValor(controlador, TablaSimbolos);
            valor_exp2 = this.exp2.getValor(controlador, TablaSimbolos);
        }
        else {
            valor_expU = this.exp1.getValor(controlador, TablaSimbolos);
        }
        switch (this.operador) {
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].IGUALIGUAL:
                return this.igualigual(valor_exp1, valor_exp2);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].DIFERENTE:
                return this.diferente(valor_exp1, valor_exp2);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].MENORQUE:
                return this.menorque(valor_exp1, valor_exp2);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].MENORIGUAL:
                return this.menorigual(valor_exp1, valor_exp2);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].MAYORQUE:
                return this.mayorque(valor_exp1, valor_exp2);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].MAYORIGUAL:
                return this.mayoigual(valor_exp1, valor_exp2);
            default:
                break;
        }
    }
    igualigual(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'number') {
            if (typeof valor_exp2 == 'number') {
                return valor_exp1 == valor_exp2;
            }
            else if (typeof valor_exp2 == 'boolean') {
                //Error Semantico
            }
            else if (typeof valor_exp2 == 'string') {
                //char
                if (valor_exp2.length == 1) {
                    let num = valor_exp2.charCodeAt(0);
                    return valor_exp1 == num;
                }
                else {
                    //String 
                    //Error semantico
                }
            }
        }
        else if (typeof valor_exp1 == 'boolean') {
            if (typeof valor_exp2 == 'number') {
                //Error semantico
            }
            else if (typeof valor_exp2 == 'boolean') {
                return valor_exp1 == valor_exp2;
            }
            else if (typeof valor_exp2 == 'string') {
                //Error semantico
            }
        }
        else if (typeof valor_exp1 == 'string') {
            if (valor_exp1.length == 1) {
                //char
                if (typeof valor_exp2 == 'number') {
                    let num = valor_exp1.charCodeAt(0);
                    return num == valor_exp2;
                }
                else if (typeof valor_exp2 == 'boolean') {
                    //Error semantico
                }
                else if (typeof valor_exp2 == 'string') {
                    return valor_exp1 == valor_exp2;
                }
            }
            else {
                //cadena
                if (typeof valor_exp2 == 'number') {
                    //error semantico
                }
                else if (typeof valor_exp2 == 'boolean') {
                    //Error semantico
                }
                else if (typeof valor_exp2 == 'string') {
                    return valor_exp1 == valor_exp2;
                }
            }
        }
    }
    diferente(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'number') {
            if (typeof valor_exp2 == 'number') {
                return valor_exp1 != valor_exp2;
            }
            else if (typeof valor_exp2 == 'boolean') {
                //Error Semantico
            }
            else if (typeof valor_exp2 == 'string') {
                //char
                if (valor_exp2.length == 1) {
                    let num = valor_exp2.charCodeAt(0);
                    return valor_exp1 != num;
                }
                else {
                    //String 
                    //Error semantico
                }
            }
        }
        else if (typeof valor_exp1 == 'boolean') {
            if (typeof valor_exp2 == 'number') {
                //Error semantico
            }
            else if (typeof valor_exp2 == 'boolean') {
                return valor_exp1 != valor_exp2;
            }
            else if (typeof valor_exp2 == 'string') {
                //Error semantico
            }
        }
        else if (typeof valor_exp1 == 'string') {
            if (valor_exp1.length == 1) {
                //char
                if (typeof valor_exp2 == 'number') {
                    let num = valor_exp1.charCodeAt(0);
                    return num != valor_exp2;
                }
                else if (typeof valor_exp2 == 'boolean') {
                    //Error semantico
                }
                else if (typeof valor_exp2 == 'string') {
                    return valor_exp1 != valor_exp2;
                }
            }
            else {
                //cadena
                if (typeof valor_exp2 == 'number') {
                    //error semantico
                }
                else if (typeof valor_exp2 == 'boolean') {
                    //Error semantico
                }
                else if (typeof valor_exp2 == 'string') {
                    return valor_exp1 != valor_exp2;
                }
            }
        }
    }
    menorque(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'number') {
            if (typeof valor_exp2 == 'number') {
                return valor_exp1 < valor_exp2;
            }
            else if (typeof valor_exp2 == 'boolean') {
                //Error semantico
            }
            else if (typeof valor_exp2 == 'string') {
                if (valor_exp2.length == 1) {
                    let num = valor_exp2.charCodeAt(0);
                    return valor_exp1 < num;
                }
                else {
                    // Error semantico 
                }
            }
        }
        else if (typeof valor_exp1 == 'boolean') {
            //Error semantico
        }
        else if (typeof valor_exp1 == 'string') {
            if (valor_exp1.length == 1) {
                if (typeof valor_exp2 == 'number') {
                    let num = valor_exp1.charCodeAt(0);
                    return num < valor_exp2;
                }
                else if (typeof valor_exp2 == 'boolean') {
                    //Error semantico
                }
                else if (typeof valor_exp2 == 'string') {
                    if (valor_exp2.length == 1) {
                        let num1 = valor_exp1.charCodeAt(0);
                        let num2 = valor_exp2.charCodeAt(0);
                        return num1 < num2;
                    }
                    else {
                        //Error semantico
                    }
                }
            }
            else {
                //cadena
                //error semantico
            }
        }
    }
    menorigual(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'number') {
            if (typeof valor_exp2 == 'number') {
                return valor_exp1 <= valor_exp2;
            }
            else if (typeof valor_exp2 == 'boolean') {
                //Error semantico
            }
            else if (typeof valor_exp2 == 'string') {
                if (valor_exp2.length == 1) {
                    let num = valor_exp2.charCodeAt(0);
                    return valor_exp1 <= num;
                }
                else {
                    // Error semantico 
                }
            }
        }
        else if (typeof valor_exp1 == 'boolean') {
            //Error semantico
        }
        else if (typeof valor_exp1 == 'string') {
            if (valor_exp1.length == 1) {
                if (typeof valor_exp2 == 'number') {
                    let num = valor_exp1.charCodeAt(0);
                    return num <= valor_exp2;
                }
                else if (typeof valor_exp2 == 'boolean') {
                    //Error semantico
                }
                else if (typeof valor_exp2 == 'string') {
                    if (valor_exp2.length == 1) {
                        let num1 = valor_exp1.charCodeAt(0);
                        let num2 = valor_exp2.charCodeAt(0);
                        return num1 <= num2;
                    }
                    else {
                        //Error semantico
                    }
                }
            }
            else {
                //cadena
                //error semantico
            }
        }
    }
    mayorque(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'number') {
            if (typeof valor_exp2 == 'number') {
                return valor_exp1 > valor_exp2;
            }
            else if (typeof valor_exp2 == 'boolean') {
                //Error semantico
            }
            else if (typeof valor_exp2 == 'string') {
                if (valor_exp2.length == 1) {
                    let num = valor_exp2.charCodeAt(0);
                    return valor_exp1 > num;
                }
                else {
                    // Error semantico 
                }
            }
        }
        else if (typeof valor_exp1 == 'boolean') {
            //Error semantico
        }
        else if (typeof valor_exp1 == 'string') {
            if (valor_exp1.length == 1) {
                if (typeof valor_exp2 == 'number') {
                    let num = valor_exp1.charCodeAt(0);
                    return num > valor_exp2;
                }
                else if (typeof valor_exp2 == 'boolean') {
                    //Error semantico
                }
                else if (typeof valor_exp2 == 'string') {
                    if (valor_exp2.length == 1) {
                        let num1 = valor_exp1.charCodeAt(0);
                        let num2 = valor_exp2.charCodeAt(0);
                        return num1 > num2;
                    }
                    else {
                        //Error semantico
                    }
                }
            }
            else {
                //cadena
                //error semantico
            }
        }
    }
    mayoigual(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'number') {
            if (typeof valor_exp2 == 'number') {
                return valor_exp1 >= valor_exp2;
            }
            else if (typeof valor_exp2 == 'boolean') {
                //Error semantico
            }
            else if (typeof valor_exp2 == 'string') {
                if (valor_exp2.length == 1) {
                    let num = valor_exp2.charCodeAt(0);
                    return valor_exp1 >= num;
                }
                else {
                    // Error semantico 
                }
            }
        }
        else if (typeof valor_exp1 == 'boolean') {
            //Error semantico
        }
        else if (typeof valor_exp1 == 'string') {
            if (valor_exp1.length == 1) {
                if (typeof valor_exp2 == 'number') {
                    let num = valor_exp1.charCodeAt(0);
                    return num >= valor_exp2;
                }
                else if (typeof valor_exp2 == 'boolean') {
                    //Error semantico
                }
                else if (typeof valor_exp2 == 'string') {
                    if (valor_exp2.length == 1) {
                        let num1 = valor_exp1.charCodeAt(0);
                        let num2 = valor_exp2.charCodeAt(0);
                        return num1 >= num2;
                    }
                    else {
                        //Error semantico
                    }
                }
            }
            else {
                //cadena
                //error semantico
            }
        }
    }
    getvalor3d(controlador, ts) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;
        if (this.expU == false) {
            valor_exp1 = this.exp1.getvalor3d(controlador, ts);
            valor_exp2 = this.exp2.getvalor3d(controlador, ts);
        }
        else {
            valor_expU = this.exp1.getvalor3d(controlador, ts);
        }
        switch (this.operador) {
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].IGUALIGUAL:
                return this.igualigual3D(valor_exp1, valor_exp2, controlador);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].DIFERENTE:
                return this.diferente3D(valor_exp1, valor_exp2, controlador);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].MENORQUE:
                return this.menorque3D(valor_exp1, valor_exp2, controlador);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].MENORIGUAL:
                return this.menorigual3D(valor_exp1, valor_exp2, controlador);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].MAYORQUE:
                return this.mayorque3D(valor_exp1, valor_exp2, controlador);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].MAYORIGUAL:
                return this.mayoigual3D(valor_exp1, valor_exp2, controlador);
            default:
                break;
        }
    }
    igualigual3D(valor_exp1, valor_exp2, controlador) {
        const generador = controlador.generador;
        const temp = generador.newTemporal();
        if (valor_exp1.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
            if (valor_exp2.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
                return this.compararExp(valor_exp1, valor_exp2, controlador, '==');
            }
        }
        else {
            if (valor_exp1.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].CADENA) {
                if (valor_exp2.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].CADENA) {
                    const tempAux = generador.newTemporal();
                    generador.genExpresion(tempAux, 'p', 1 + 1, '+');
                    generador.genSetStack(tempAux, valor_exp1.getvalor3d());
                    generador.genExpresion(tempAux, tempAux, '1', '+');
                    generador.genSetStack(tempAux, valor_exp2.getvalor3d());
                    generador.genNextEnv(1);
                    generador.genCall('nativa_compararIgual_str_str');
                    generador.genGetStack(temp, 'p');
                    generador.genAntEnv(1);
                    this.lblTrue = this.lblTrue == '' ? generador.newLabel() : this.lblTrue;
                    this.lblFalse = this.lblFalse == '' ? generador.newLabel() : this.lblFalse;
                    generador.genIf(temp, '1', '==', this.lblTrue);
                    generador.genGoto(this.lblFalse);
                    const Retorno = new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](temp, true, new src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("BOOLEAN"));
                    Retorno.lblTrue = this.lblTrue;
                    Retorno.lblFalse = this.lblFalse;
                    return Retorno;
                }
            }
        }
    }
    menorque3D(valor_exp1, valor_exp2, controlador) {
        if (valor_exp1.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
            if (valor_exp2.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
                return this.compararExp(valor_exp1, valor_exp2, controlador, '<');
            }
        }
    }
    menorigual3D(valor_exp1, valor_exp2, controlador) {
        if (valor_exp1.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
            if (valor_exp2.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
                return this.compararExp(valor_exp1, valor_exp2, controlador, '<=');
            }
        }
    }
    mayorque3D(valor_exp1, valor_exp2, controlador) {
        if (valor_exp1.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
            if (valor_exp2.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
                return this.compararExp(valor_exp1, valor_exp2, controlador, '>');
            }
        }
    }
    mayoigual3D(valor_exp1, valor_exp2, controlador) {
        if (valor_exp1.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
            if (valor_exp2.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
                return this.compararExp(valor_exp1, valor_exp2, controlador, '>=');
            }
        }
    }
    diferente3D(valor_exp1, valor_exp2, controlador) {
        const generador = controlador.generador;
        const temp = generador.newTemporal();
        if (valor_exp1.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
            if (valor_exp2.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
                return this.compararExp(valor_exp1, valor_exp2, controlador, '!=');
            }
        }
        else {
            if (valor_exp1.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].CADENA) {
                if (valor_exp2.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].CADENA) {
                    const tempAux = generador.newTemporal();
                    generador.genExpresion(tempAux, 'p', 1 + 1, '+');
                    generador.genSetStack(tempAux, valor_exp1.getvalor3d());
                    generador.genExpresion(tempAux, tempAux, '1', '+');
                    generador.genSetStack(tempAux, valor_exp2.getvalor3d());
                    generador.genNextEnv(1);
                    generador.genCall('nativa_compararIgual_str_str');
                    generador.genGetStack(temp, 'p');
                    generador.genAntEnv(1);
                    this.lblTrue = this.lblTrue == '' ? generador.newLabel() : this.lblTrue;
                    this.lblFalse = this.lblFalse == '' ? generador.newLabel() : this.lblFalse;
                    generador.genIf(temp, '1', '!=', this.lblTrue);
                    generador.genGoto(this.lblFalse);
                    const Retorno = new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](temp, true, new src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("BOOLEAN"));
                    Retorno.lblTrue = this.lblTrue;
                    Retorno.lblFalse = this.lblFalse;
                    return Retorno;
                }
            }
        }
    }
    compararExp(valor_exp1, valor_exp2, controlador, signo) {
        const generador = controlador.generador;
        this.lblTrue = this.lblTrue == '' ? generador.newLabel() : this.lblTrue;
        this.lblFalse = this.lblFalse == '' ? generador.newLabel() : this.lblFalse;
        generador.genIf(valor_exp1.getvalor3d(), valor_exp2.getvalor3d(), signo, this.lblTrue);
        generador.genGoto(this.lblFalse);
        const Retorno = new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"]('', false, new src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("BOOLEAN"));
        Retorno.lblTrue = this.lblTrue;
        Retorno.lblFalse = this.lblFalse;
        return Retorno;
    }
    recorrer() {
        let padre = new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Exp", "");
        if (this.expU) {
            padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.op, ""));
            padre.AddHijo(this.exp1.recorrer());
        }
        else {
            padre.AddHijo(this.exp1.recorrer());
            padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.op, ""));
            padre.AddHijo(this.exp2.recorrer());
        }
        return padre;
    }
}


/***/ }),

/***/ "WZOa":
/*!**********************************************************!*\
  !*** ./src/Clases/Instrucciones/SentenciaControl/Ifs.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ifs; });
/* harmony import */ var src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/clases/AST/Nodo */ "XRm8");
/* harmony import */ var src_clases_TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/clases/TablaSimbolos/TablaSimbolos */ "arwD");
/* harmony import */ var src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/clases/TablaSimbolos/Tipo */ "YE/1");
/* harmony import */ var _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SentenciaTransferencia/Break */ "L2hm");
/* harmony import */ var _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SentenciaTransferencia/continuar */ "vyXG");
/* harmony import */ var _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SentenciaTransferencia/retornar */ "uHk2");






class Ifs {
    constructor(condicion, lista_ifs, lista_elses, linea, columna) {
        this.condicion = condicion;
        this.lista_ifs = lista_ifs;
        this.lista_elses = lista_elses;
        this.columna = columna;
        this.linea = linea;
    }
    ejecutar(controlador, ts) {
        let ts_local = new src_clases_TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["TablaSimbolos"](ts);
        let valor_condicion = this.condicion.getValor(controlador, ts);
        if (this.condicion.getTipo(controlador, ts) == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_2__["tipo"].BOOLEANO) {
            if (valor_condicion) {
                for (let ins of this.lista_ifs) {
                    let res = ins.ejecutar(controlador, ts_local);
                    if (ins instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_3__["default"] || res instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                        controlador.graficarEntornos(controlador, ts_local, " (While)");
                        return res;
                    }
                    else {
                        if (ins instanceof _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_4__["default"] || res instanceof _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_4__["default"]) {
                            controlador.graficarEntornos(controlador, ts_local, " (While)");
                            return res;
                        }
                        else {
                            if (ins instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_5__["default"] || res instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_5__["default"]) {
                                controlador.graficarEntornos(controlador, ts_local, " (While)");
                                return res;
                            }
                        }
                    }
                    //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                }
                controlador.graficarEntornos(controlador, ts_local, " (IF)");
            }
            else {
                for (let ins of this.lista_elses) {
                    let res = ins.ejecutar(controlador, ts_local);
                    if (ins instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_3__["default"] || res instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                        controlador.graficarEntornos(controlador, ts_local, " (While)");
                        return res;
                    }
                    else {
                        if (ins instanceof _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_4__["default"] || res instanceof _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_4__["default"]) {
                            controlador.graficarEntornos(controlador, ts_local, " (While)");
                            return res;
                        }
                        else {
                            if (ins instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_5__["default"] || res instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_5__["default"]) {
                                controlador.graficarEntornos(controlador, ts_local, " (While)");
                                return res;
                            }
                        }
                    }
                    //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                }
                controlador.graficarEntornos(controlador, ts_local, " (IF)");
            }
        }
        return null;
    }
    recorrer() {
        let padre = new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("SENTENCIA", "");
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("if", ""));
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("(", ""));
        padre.AddHijo(this.condicion.recorrer());
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](")", ""));
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("{", ""));
        for (let ins of this.lista_ifs) {
            padre.AddHijo(ins.recorrer());
        }
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("}", ""));
        if (this.lista_elses.length > 0) {
            padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("}", ""));
            padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("else", ""));
            padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("{", ""));
            for (let ins of this.lista_elses) {
                padre.AddHijo(ins.recorrer());
            }
            padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("}", ""));
        }
        return padre;
    }
}


/***/ }),

/***/ "XRm8":
/*!********************************!*\
  !*** ./src/clases/AST/Nodo.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Nodo; });
/**
 * @class Clase para el manejo de nodos de la grafica del ast
 */
class Nodo {
    /**
     * @constructor Crea un nuevo nodo a graficar del ast
     * @param token guarda el token del nodo
     * @param lexema guarda el lexema del nodo
     */
    constructor(token, lexema) {
        this.token = token;
        this.lexema = lexema;
        this.hijos = new Array();
    }
    /**
     * @method AddHijo agrega un nuevo hijo a la lista
     * @param nuevo hace referencia al nuevo nodo
     */
    AddHijo(nuevo) {
        this.hijos.push(nuevo);
    }
    /**
     * @function getToken retorna el nombre del token
     * @returns retorna el token
     */
    getToken() {
        return this.token;
    }
    /**
     * @function GraficarSintactico Hace la estructura de la grafica
     * @returns retorna la cadena total de la grafica
     */
    GraficarSintactico() {
        let grafica = `dinetwork {\n\n${this.GraficarNodos(this, "0")} \n\n}`;
        return grafica;
    }
    /**
     * @function GraficarNodos
     * @param nodo indica el nodo donde nos posicionamos
     * @param i hara referencia al numero o identificador del nodo a graficar
     * @returns retorna la cadena de los nodos
     */
    GraficarNodos(nodo, i) {
        let k = 0;
        let r = "";
        let nodoTerm = nodo.token;
        nodoTerm = nodoTerm.replace("\"", "");
        r = `node${i}[label = \"${nodoTerm}\"];\n`;
        for (let j = 0; j <= nodo.hijos.length - 1; j++) {
            r = `${r}node${i} -> node${i}${k}\n`;
            r = r + this.GraficarNodos(nodo.hijos[j], "" + i + k);
            k = k + 1;
        }
        if (!(nodo.lexema.match('')) || !(nodo.lexema.match(""))) {
            let nodoToken = nodo.lexema;
            nodoToken = nodoToken.replace("\"", "");
            r = r + `node${i}c[label = \"${nodoToken}\"];\n`;
            r = r + `node${i} -> node${i}c\n`;
        }
        return r;
    }
}


/***/ }),

/***/ "XUFC":
/*!***********************************************!*\
  !*** ./src/clases/TablaSimbolos/contenido.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return contenido; });
class contenido {
    constructor(identificador, sim) {
        this.identificador = identificador;
        this.sim = sim;
    }
}


/***/ }),

/***/ "Y/Ky":
/*!****************************************!*\
  !*** ./src/Clases/xpath/puntopunto.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return puntopunto; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");

class puntopunto {
    constructor(exprecion, sig) {
        this.exprecion = exprecion;
        this.sig = sig;
        this.contador = 0;
    }
    ejecutar(controlador, ts) {
        if (this.sig != null) {
            if (this.contador == 0) {
                this.sig.ejecutar(controlador, ts.ant);
            }
            this.contador = 1;
        }
        else {
            if (this.contador == 0) {
                ts = ts.ant;
                for (let informacion of ts.tabla) {
                    if (informacion.sim.simbolo == 1) {
                        controlador.append(informacion.sim.objeto.gethtml("", controlador));
                    }
                }
            }
            this.contador = 1;
        }
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("/..", "");
        if (this.sig != null) {
            padre.AddHijo(this.sig.recorrer());
        }
        return padre;
    }
}


/***/ }),

/***/ "YE/1":
/*!******************************************!*\
  !*** ./src/clases/TablaSimbolos/Tipo.ts ***!
  \******************************************/
/*! exports provided: tipo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tipo", function() { return tipo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tipo; });
var tipo;
(function (tipo) {
    tipo[tipo["ENTERO"] = 0] = "ENTERO";
    tipo[tipo["DOBLE"] = 1] = "DOBLE";
    tipo[tipo["BOOLEANO"] = 2] = "BOOLEANO";
    tipo[tipo["CARACTER"] = 3] = "CARACTER";
    tipo[tipo["CADENA"] = 4] = "CADENA";
    tipo[tipo["VOID"] = 5] = "VOID";
    tipo[tipo["OBJETO"] = 6] = "OBJETO";
    tipo[tipo["IDENTIFICADOR"] = 7] = "IDENTIFICADOR";
})(tipo || (tipo = {}));
class Tipo {
    constructor(stype) {
        this.stype = stype;
        this.type = this.getTipo(stype);
    }
    getTipo(stype) {
        if (stype == 'DOBLE') {
            return tipo.DOBLE;
        }
        else if (stype == 'ENTERO') {
            return tipo.ENTERO;
        }
        else if (stype == 'STRING') {
            return tipo.CADENA;
        }
        else if (stype == 'BOOLEAN') {
            return tipo.BOOLEANO;
        }
        else if (stype == 'VOID') {
            return tipo.VOID;
        }
        else if (stype == 'CHAR') {
            return tipo.CARACTER;
        }
        else if (stype == 'OBJETO') {
            return tipo.OBJETO;
        }
        else if (stype == 'IDENTIFICADOR') {
            return tipo.IDENTIFICADOR;
        }
    }
    getStype() {
        return this.stype;
    }
}


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-bootstrap-md */ "dbUT");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ctrl/ngx-codemirror */ "Xl2X");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");








class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
            angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MDBBootstrapModule"].forRoot(),
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_5__["CodemirrorModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"], angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_3__["MDBRootModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
        _ctrl_ngx_codemirror__WEBPACK_IMPORTED_MODULE_5__["CodemirrorModule"]] }); })();


/***/ }),

/***/ "ZSbs":
/*!*******************************!*\
  !*** ./src/Clases/AST/Ast.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ast; });
/* harmony import */ var _TablaSimbolos_Simbolos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TablaSimbolos/Simbolos */ "hADQ");
/* harmony import */ var _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TablaSimbolos/Tipo */ "lKex");
/* harmony import */ var _xml_objeto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../xml/objeto */ "bzrv");
/* harmony import */ var _Nodo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Nodo */ "Zr6O");




class Ast {
    constructor(lista_instrucciones) {
        this.lista_instrucciones = lista_instrucciones;
    }
    ejecutar(controlador, ts) {
        console.log("vamos a compilar la entrada");
        for (let instruccion of this.lista_instrucciones) {
            if (instruccion instanceof _xml_objeto__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                let tipo = new _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("OBJETO");
                let sim = new _TablaSimbolos_Simbolos__WEBPACK_IMPORTED_MODULE_0__["default"](1, tipo, instruccion.identificador, instruccion.texto, instruccion);
                ts.agregar(instruccion.identificador, sim);
                ts.agregarSiguiente(instruccion.identificador, instruccion.ejecutar(controlador, ts));
            }
        }
        this.graficar(controlador, ts);
    }
    ejecutarDescendente(controlador, ts) {
        console.log("vamos a compilar la entrada");
        for (let instruccion of this.lista_instrucciones) {
            if (instruccion instanceof _xml_objeto__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                let tipo = new _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("OBJETO");
                let sim = new _TablaSimbolos_Simbolos__WEBPACK_IMPORTED_MODULE_0__["default"](1, tipo, instruccion.identificador, instruccion.texto, instruccion);
                ts.agregar(instruccion.identificador, sim);
                ts.agregarSiguiente(instruccion.identificador, instruccion.ejecutar(controlador, ts));
            }
        }
        this.graficar(controlador, ts);
        console.log(ts);
    }
    ejecutarXPath(controlador, ts, instruccion) {
        instruccion.ejecutar(controlador, ts);
    }
    graficar(controlador, ts) {
        console.log("vamos a compilar xpaht");
        if (ts != null) {
            controlador.graficarEntornos(controlador, ts, ts.ambito);
            for (let tssig of ts.sig) {
                this.graficar(controlador, tssig.sig);
            }
        }
    }
    recorrer() {
        let raiz = new _Nodo__WEBPACK_IMPORTED_MODULE_3__["default"]("INICIO", "");
        for (let inst of this.lista_instrucciones) {
            raiz.AddHijo(inst.recorrer());
        }
        return raiz;
    }
}


/***/ }),

/***/ "Zr6O":
/*!********************************!*\
  !*** ./src/Clases/AST/Nodo.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Nodo; });
/**
 * @class Clase para el manejo de nodos de la grafica del ast
 */
class Nodo {
    /**
     * @constructor Crea un nuevo nodo a graficar del ast
     * @param token guarda el token del nodo
     * @param lexema guarda el lexema del nodo
     */
    constructor(token, lexema) {
        this.token = token;
        this.lexema = lexema;
        this.hijos = new Array();
    }
    /**
     * @method AddHijo agrega un nuevo hijo a la lista
     * @param nuevo hace referencia al nuevo nodo
     */
    AddHijo(nuevo) {
        this.hijos.push(nuevo);
    }
    /**
     * @function getToken retorna el nombre del token
     * @returns retorna el token
     */
    getToken() {
        return this.token;
    }
    /**
     * @function GraficarSintactico Hace la estructura de la grafica
     * @returns retorna la cadena total de la grafica
     */
    GraficarSintactico() {
        let grafica = `dinetwork {\n\n${this.GraficarNodos(this, "0")} \n\n}`;
        return grafica;
    }
    /**
     * @function GraficarNodos
     * @param nodo indica el nodo donde nos posicionamos
     * @param i hara referencia al numero o identificador del nodo a graficar
     * @returns retorna la cadena de los nodos
     */
    GraficarNodos(nodo, i) {
        let k = 0;
        let r = "";
        let nodoTerm = nodo.token;
        nodoTerm = nodoTerm.replace("\"", "");
        r = `node${i}[label = \"${nodoTerm}\"];\n`;
        for (let j = 0; j <= nodo.hijos.length - 1; j++) {
            r = `${r}node${i} -> node${i}${k}\n`;
            r = r + this.GraficarNodos(nodo.hijos[j], "" + i + k);
            k = k + 1;
        }
        if (!(nodo.lexema.match('')) || !(nodo.lexema.match(""))) {
            let nodoToken = nodo.lexema;
            nodoToken = nodoToken.replace("\"", "");
            r = r + `node${i}c[label = \"${nodoToken}\"];\n`;
            r = r + `node${i} -> node${i}c\n`;
        }
        return r;
    }
}


/***/ }),

/***/ "ajoU":
/*!********************************************!*\
  !*** ./src/Clases/TablaSimbolos/ambito.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ambito; });
class ambito {
    constructor(identificador, sig) {
        this.identificador = identificador;
        this.sig = sig;
    }
}


/***/ }),

/***/ "arwD":
/*!***************************************************!*\
  !*** ./src/clases/TablaSimbolos/TablaSimbolos.ts ***!
  \***************************************************/
/*! exports provided: TablaSimbolos */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablaSimbolos", function() { return TablaSimbolos; });
/* harmony import */ var _ambito__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ambito */ "z8/j");
/* harmony import */ var _contenido__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contenido */ "XUFC");


class TablaSimbolos {
    constructor(ant, ambito) {
        this.sig = [];
        this.tabla = [];
        this.ant = ant;
        this.ambito = ambito;
    }
    agregar(id, simbolo) {
        let cont = new _contenido__WEBPACK_IMPORTED_MODULE_1__["default"](id, simbolo);
        this.tabla.push(cont);
        //this.tabla.set(id.toLowerCase(), simbolo); 
    }
    agregarSiguiente(id, sig) {
        let amb = new _ambito__WEBPACK_IMPORTED_MODULE_0__["default"](id, sig);
        this.sig.push(amb);
    }
    existe(id) {
        /*  let ts : TablaSimbolos = this;
  
          while(ts != null){
              let existe = ts.tabla.get(id);
  
              if(existe != null){
                  return true;
              }
              ts = ts.ant;
          }*/
        return false;
    }
    existeEnActual(id) {
        /*  let ts : TablaSimbolos = this;
  
          let existe = ts.tabla.get(id);
  
          if(existe != null){
              return true;
          }*/
        return false;
    }
    getSimbolo(id, tipoval) {
        let ts = this;
        console.log("-----------------");
        for (let informacion of ts.tabla) {
            console.log(informacion.identificador + "==" + id + " && " + tipoval + "==" + informacion.sim.simbolo);
            if (informacion.identificador == id && tipoval == informacion.sim.simbolo) {
                return informacion.sim;
            }
        }
        return null;
    }
}


/***/ }),

/***/ "bGwg":
/*!*******************************!*\
  !*** ./src/Clases/Evaluar.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Evaluar; });
class Evaluar {
    constructor(resultado) {
        this.resultado = resultado;
    }
    get_Resultado() {
        return this.resultado;
    }
}


/***/ }),

/***/ "bzrv":
/*!**********************************!*\
  !*** ./src/Clases/xml/objeto.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Objeto; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");
/* harmony import */ var _TablaSimbolos_Simbolos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TablaSimbolos/Simbolos */ "hADQ");
/* harmony import */ var _TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TablaSimbolos/TablaSimbolos */ "AviG");
/* harmony import */ var _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TablaSimbolos/Tipo */ "lKex");




class Objeto {
    constructor(id, texto, linea, columna, listaAtributos, listaO, tipoetiqueta, etiquetaF) {
        this.identificador = id;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.listaAtributos = listaAtributos;
        this.listaObjetos = listaO;
        this.tipoetiqueta = tipoetiqueta;
        this.etiquetaF = etiquetaF;
    }
    ejecutar(controlador, ts) {
        if (this.tipoetiqueta == 2) {
            if (this.identificador != this.etiquetaF) {
                controlador.append("Error: La etiqueta de inicio y fin no coinciden:: inicio: " + this.identificador + " final: " + this.etiquetaF);
            }
        }
        this.posicionid3d = this.generar3d(this.identificador, controlador);
        let ts_local = new _TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_2__["TablaSimbolos"](ts, this.identificador);
        if (this.texto.length > 0) {
            this.posiciontext3d = this.generar3d(this.texto, controlador);
        }
        for (let at of this.listaAtributos) {
            let tipo = new _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"]("IDENTIFICADOR");
            let sim = new _TablaSimbolos_Simbolos__WEBPACK_IMPORTED_MODULE_1__["default"](2, tipo, at.identificador, at.valor);
            at.posicion3d = this.generar3d(at.valor, controlador);
            at.posicionId3d = this.generar3d(at.identificador, controlador);
            ts_local.agregar(at.identificador, sim);
        }
        for (let at of this.listaObjetos) {
            let tipo = new _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["default"]("OBJETO");
            const regex = /^[0-9]+("."[0-9]+)?$/;
            let sim;
            if (isNaN(Number(at.texto))) {
                console.log("no numero:" + at.texto);
                sim = new _TablaSimbolos_Simbolos__WEBPACK_IMPORTED_MODULE_1__["default"](1, tipo, at.identificador, at.texto, at);
            }
            else {
                console.log("numero: " + at.texto);
                sim = new _TablaSimbolos_Simbolos__WEBPACK_IMPORTED_MODULE_1__["default"](1, tipo, at.identificador, Number(at.texto), at);
            }
            ts_local.agregar(at.identificador, sim);
            ts_local.agregarSiguiente(at.identificador, at.ejecutar(controlador, ts_local));
        }
        return ts_local;
    }
    gethtml(tab, controlador) {
        const generator = controlador.generador;
        generator.genPrint('c', '60');
        generator.genSetStack('p', this.posicionid3d);
        generator.genCall('nativa_print_str');
        let xml = tab + "<" + this.identificador;
        for (let at of this.listaAtributos) {
            generator.genPrint('c', '32');
            generator.genSetStack('p', at.posicionId3d);
            generator.genCall('nativa_print_str');
            generator.genPrint('c', '61');
            generator.genPrint('c', '34');
            generator.genSetStack('p', at.posicion3d);
            generator.genCall('nativa_print_str');
            generator.genPrint('c', '34');
            xml += " " + at.identificador + "=\"" + at.valor + "\" ";
        }
        if (this.tipoetiqueta == 1) {
            generator.genPrint('c', '47');
            generator.genPrint('c', '62');
            xml += "/>";
        }
        else {
            if (this.texto.length > 0) {
                generator.genPrint('c', '62');
                generator.genSetStack('p', this.posiciontext3d);
                generator.genCall('nativa_print_str');
                generator.genPrint('c', '60');
                generator.genSetStack('p', this.posicionid3d);
                generator.genCall('nativa_print_str');
                generator.genPrint('c', '47');
                generator.genPrint('c', '62');
                xml += ">" + this.texto + "<" + this.identificador + "/>";
            }
            else {
                tab = tab + "   ";
                generator.genPrint('c', '62');
                xml += ">";
                for (let at of this.listaObjetos) {
                    xml += "\n";
                    generator.genPrint('c', '10');
                    xml += at.gethtml(tab, controlador);
                }
                generator.genPrint('c', '10');
                generator.genPrint('c', '60');
                generator.genSetStack('p', this.posicionid3d);
                generator.genCall('nativa_print_str');
                generator.genPrint('c', '47');
                generator.genPrint('c', '62');
                xml += tab + "\n<" + this.identificador + "/>";
            }
        }
        return xml;
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("objeto", "");
        let hijo = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.identificador, "");
        if (this.texto.length > 0) {
            hijo.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.texto, ""));
        }
        for (let at of this.listaAtributos) {
            hijo.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](at.identificador, ""));
        }
        for (let at of this.listaObjetos) {
            hijo.AddHijo(at.recorrer());
        }
        padre.AddHijo(hijo);
        return padre;
    }
    generar3d(entrada, controlador) {
        const generator = controlador.generador;
        const temp = generator.newTemporal();
        generator.genAsignacion(temp, 'h');
        for (let i = 0; i < entrada.length; i++) {
            generator.genSetHeap('h', entrada.charCodeAt(i));
            generator.avanzarHeap();
        }
        generator.genSetHeap('h', '-1');
        generator.avanzarHeap();
        return temp;
    }
}


/***/ }),

/***/ "cg4T":
/*!*************************************************!*\
  !*** ./src/Clases/GeneradorC3D/GeneradorC3D.ts ***!
  \*************************************************/
/*! exports provided: GeneradorC3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneradorC3D", function() { return GeneradorC3D; });
/* harmony import */ var _Nativas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Nativas */ "3Bn/");

class GeneradorC3D {
    /**
     * constructor de la clase singleton
     */
    constructor() {
        this.isFunc = '';
        this.temporal = this.label = 0;
        this.code = [];
        this.codeFuncion = [];
        this.tempStorage = new Set();
    }
    agregarFuncion(funcion) {
        funcion.forEach((fun) => {
            this.codeFuncion.push(fun);
        });
    }
    /**
     * Obtiene la instancia de la clase singleton
     */
    static getInstancia() {
        return this.generador || (this.generador = new this());
    }
    /**
     * Retorna el set de los temporales que estan en uso
     */
    getTempStorage() {
        return this.tempStorage;
    }
    /**
     * Vacia el set de los temporales
     */
    clearTempStorage() {
        this.tempStorage.clear();
    }
    /**
     * asigna el set al set local de temporales
     * @param tempStorage lista tipo Set que se asignara al set local
     */
    setTempStorage(tempStorage) {
        this.tempStorage = tempStorage;
    }
    /**
     * borra el C3D que tenga guardado la clase y reinicia los temporales y labels
     */
    clearCode() {
        this.temporal = this.label = 0;
        this.code = [];
        this.codeFuncion = [];
        this.tempStorage = new Set();
    }
    clearSoloCode() {
        this.code = [];
    }
    /**
     * Ingresa en el C3D el valor que se asigna como parametro
     * @param code valor que se asignara al C3D de la clase
     */
    genCode(code) {
        this.code.push(this.isFunc + code);
    }
    /**
     * Retorna el C3D que se haya generado en la clase singleton
     */
    getCode() {
        let nativas = new _Nativas__WEBPACK_IMPORTED_MODULE_0__["Nativas"]();
        let encabezado = '#include <stdio.h>\n#include <math.h>\ndouble Stack[60000]; double Heap[60000];\nint p; int h;\n';
        let main = `\nint main() {\n${this.code.join('\n')}\n\nreturn 0;\n}\n`;
        const funciones = this.codeFuncion.join('\n');
        this.code = [];
        let strNativas = nativas.generarNativas();
        //strNativas = ''; // comentar despues de terminar
        let c3d = `${encabezado}${this.getTemporales()};\n${strNativas}\n${funciones}\n${main}`;
        return c3d;
    }
    getSoloCode() {
        return this.code;
    }
    setSoloCode(codeA) {
        this.code = codeA;
    }
    getNativas() {
        return this.code.join('\n');
    }
    getTemporales() {
        let lista = 'double ';
        for (let i = 0; i < this.temporal; i++) {
            lista += 'T' + i;
            lista += i < this.temporal - 1 ? ',' : '';
        }
        return lista;
    }
    /**
     * Crea un nuevo temporal y lo retorna
     */
    newTemporal() {
        const temp = 'T' + this.temporal++;
        this.tempStorage.add(temp);
        return temp;
    }
    /**
     * Crea una nueva etiqueta y la retorna
     */
    newLabel() {
        return 'L' + this.label++;
    }
    /**
     * funcion que agrega una nueva etiqueta el C3D
     * @param label valor que se agregara al C3D como tipo etiqueta
     */
    genLabel(label) {
        this.code.push(`${this.isFunc}${label}:`);
    }
    /**
     * Genera una nueva expresion y la agrega al C3D
     * @param tem Temporal al que se le asignara la expresion
     * @param izq Expresion izquierda que se asignara al temporal
     * @param der Expresion derecha que se asignara al temporal
     * @param operator Operador de la expresion
     */
    genExpresion(tem, iqz, der = '', operator = '') {
        this.code.push(`${this.isFunc}${tem} = ${iqz} ${operator} ${der};`);
    }
    /**
     * asigna un valor a un temporal o puntero
     * @param tem variable que recibira el valor
     * @param val valor que sera asignado
     */
    genAsignacion(tem, val) {
        this.code.push(`${this.isFunc}${tem} = ${val};`);
    }
    /**
     * genera un goto con el valor de label y lo agrega el C3D
     * @param label valor de etiqueta al cual se hara el goto
     */
    genGoto(label) {
        this.code.push(`${this.isFunc}goto ${label};`);
    }
    /**
     * genera un if y lo agrega al C3D
     * @param iqz Expresion izquierda de la condicion if
     * @param der Expresion derecha de la condicion if
     * @param operator Operador boleano de la condicion
     * @param label Etiqueta de salto si la condicion es verdadera
     */
    genIf(iqz, der, operator, label) {
        this.code.push(`${this.isFunc}if (${iqz} ${operator} ${der}) goto ${label};`);
    }
    /**
     * Intruccion que hace avanzar el puntero heap a su siguite posicion
     */
    avanzarHeap() {
        this.code.push(this.isFunc + 'h = h + 1;');
    }
    /**
     * genera un acceso al heap en la posicion index y lo asiga al tem
     * @param tem temporal que recibira el valor del heap
     * @param index posicion del heap al cual se accedera
     */
    genGetHeap(tem, index) {
        index = index[0] === 'T' ? '(int)' + index : index;
        this.code.push(`${this.isFunc}${tem} = Heap[${index}];`);
    }
    /**
     * genera una asignacion de valor al heap en la posicion index
     * @param index posicion del heap al cual se desea acceder
     * @param valor valor que se asignara a la posicion del heap
     */
    genSetHeap(index, valor) {
        index = index[0] === 'T' ? '(int)' + index : index;
        this.code.push(`${this.isFunc}Heap[${index}] = ${valor};`);
    }
    /**
     * genera una asignacion a tem del valor del stack en la posicion index
     * @param tem temporal al cual se asignara el valor del stack
     * @param index posicion del stack al cual se desea acceder
     */
    genGetStack(tem, index) {
        index = index[0] === 'T' ? '(int)' + index : index;
        this.code.push(`${this.isFunc}${tem} = Stack[${index}];`);
    }
    /**
     * genera una asignacion al stack en la posicion index
     * @param index posicion del stack al cual se desea acceder
     * @param value valor que sera asignado al stack
     */
    genSetStack(index, value) {
        index = index[0] === 'T' ? '(int)' + index : index;
        this.code.push(`${this.isFunc}Stack[${index}] = ${value};`);
    }
    /**
     * genera un desplazamiento del stack para generar un nuevo ambito
     * @param size posiciones que se desplazara el stack
     */
    genNextEnv(size) {
        this.code.push(`${this.isFunc}p = p + ${size};`);
    }
    /**
     * genera un desplazamiento del stack para volver a un ambito anterios
     * @param size posiciones que se desplazara el stack
     */
    genAntEnv(size) {
        this.code.push(`${this.isFunc}p = p - ${size};`);
    }
    /**
     * genera una llamada a una funcion
     * @param id nombre de la funcion
     */
    genCall(id) {
        this.code.push(`${this.isFunc}${id}();`);
    }
    /**
     * Genera el encabezado de una funcion
     * @param id nombre de la funcion
     */
    genFuncion(id) {
        this.code.push(`\nvoid ${id}() {`);
    }
    /**
     * Genera el cierre de la definicion de una funcion
     */
    genEndFuncion() {
        this.code.push('}');
    }
    /**
     * genera un printf con el tipo de dato y el valor
     * @param formato tipo de dato que se va a imprimir
     * @param valor valor que se va a imprimir
     */
    genPrint(formato, valor) {
        valor = valor[0] === 'T' && formato !== 'f' ? '(int)' + valor : valor;
        this.code.push(`${this.isFunc}printf("%${formato}",${valor});`);
    }
    /**
     * genera un print del valor true
     */
    genPrintTrue() {
        this.genPrint('c', 't'.charCodeAt(0));
        this.genPrint('c', 'r'.charCodeAt(0));
        this.genPrint('c', 'u'.charCodeAt(0));
        this.genPrint('c', 'e'.charCodeAt(0));
    }
    /**
     * genera un print del valor false
     */
    genPrintFalse() {
        this.genPrint('c', 'f'.charCodeAt(0));
        this.genPrint('c', 'a'.charCodeAt(0));
        this.genPrint('c', 'l'.charCodeAt(0));
        this.genPrint('c', 's'.charCodeAt(0));
        this.genPrint('c', 'e'.charCodeAt(0));
    }
    /**
     * genera un print del valor null
     */
    genPrintNull() {
        this.genPrint('c', 'n'.charCodeAt(0));
        this.genPrint('c', 'u'.charCodeAt(0));
        this.genPrint('c', 'l'.charCodeAt(0));
        this.genPrint('c', 'l'.charCodeAt(0));
    }
    /**
     * genera un nuevo comentario
     * @param comment valor del comentario
     */
    genComentario(comment) {
        this.code.push(`${this.isFunc}// ----- ${comment} -----`);
    }
    /**
     * borra un temporal del storage
     * @param temp temporal que ya no se utilizara
     */
    freeTemp(temp) {
        if (this.tempStorage.has(temp)) {
            this.tempStorage.delete(temp);
        }
    }
    /**
     * agrega un temporal al storage
     * @param temp temporal que se agregara al storage
     */
    genTemp(temp) {
        if (!this.tempStorage.has(temp))
            this.tempStorage.add(temp);
    }
}


/***/ }),

/***/ "dzIM":
/*!*********************************************************!*\
  !*** ./src/Clases/Instrucciones/SentenciaControl/SW.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SW; });
/* harmony import */ var src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/clases/AST/Nodo */ "XRm8");
/* harmony import */ var src_clases_TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/clases/TablaSimbolos/TablaSimbolos */ "arwD");
/* harmony import */ var _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SentenciaTransferencia/Break */ "L2hm");
/* harmony import */ var _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SentenciaTransferencia/retornar */ "uHk2");




class SW {
    constructor(valo_sw, lista_case, lista_defaul) {
        this.valor_sw = valo_sw;
        this.Lista_case = lista_case;
        this.Lista_defaul = lista_defaul;
    }
    ejecutar(controlador, ts) {
        let ts_local = new src_clases_TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["TablaSimbolos"](ts);
        for (let sw of this.Lista_case) {
            sw.valor_sw = this.valor_sw.getValor(controlador, ts_local);
        }
        let x = 0;
        for (let ins of this.Lista_case) {
            let res = ins.ejecutar(controlador, ts_local);
            if (ins instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__["default"] || res instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                controlador.graficarEntornos(controlador, ts_local, " (switch)");
                x = 1;
                break;
            }
            else {
                if (ins instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_3__["default"] || res instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                    controlador.graficarEntornos(controlador, ts_local, " (switch)");
                    return res;
                }
            }
        }
        if (x == 0) {
            for (let ins of this.Lista_defaul) {
                let res = ins.ejecutar(controlador, ts_local);
                if (ins instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__["default"] || res instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                    controlador.graficarEntornos(controlador, ts_local, " (switch)");
                    break;
                }
                else {
                    if (ins instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_3__["default"] || res instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                        controlador.graficarEntornos(controlador, ts_local, " (switch)");
                        return res;
                    }
                }
            }
        }
        controlador.graficarEntornos(controlador, ts_local, " (switch)");
    }
    recorrer() {
        let padre = new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("SWITCH", "");
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("switch", ""));
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("(", ""));
        padre.AddHijo(this.valor_sw.recorrer());
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](")", ""));
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("{", ""));
        for (let ins of this.Lista_case) {
            padre.AddHijo(ins.recorrer());
        }
        if (this.Lista_defaul.length > 0) {
            padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("default:", ""));
            for (let ins of this.Lista_defaul) {
                padre.AddHijo(ins.recorrer());
            }
        }
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("}", ""));
        return padre;
    }
}


/***/ }),

/***/ "fH/y":
/*!***********************************************************!*\
  !*** ./src/Clases/Instrucciones/SentenciaCiclos/While.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return While; });
/* harmony import */ var src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/clases/AST/Nodo */ "XRm8");
/* harmony import */ var src_clases_TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/clases/TablaSimbolos/TablaSimbolos */ "arwD");
/* harmony import */ var _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SentenciaTransferencia/Break */ "L2hm");
/* harmony import */ var _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SentenciaTransferencia/continuar */ "vyXG");
/* harmony import */ var _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SentenciaTransferencia/retornar */ "uHk2");





class While {
    constructor(condicion, lista_instrucciones, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador, ts) {
        let valor_condicion = this.condicion.getValor(controlador, ts);
        if (typeof valor_condicion == 'boolean') {
            while (this.condicion.getValor(controlador, ts)) {
                let ts_local = new src_clases_TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["TablaSimbolos"](ts);
                for (let ins of this.lista_instrucciones) {
                    let res = ins.ejecutar(controlador, ts_local);
                    if (ins instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__["default"] || res instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                        controlador.graficarEntornos(controlador, ts_local, " (While)");
                        return null;
                    }
                    else {
                        if (ins instanceof _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_3__["default"] || res instanceof _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                            break;
                        }
                        else {
                            if (ins instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_4__["default"] || res instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_4__["default"]) {
                                controlador.graficarEntornos(controlador, ts_local, " (While)");
                                return res;
                            }
                        }
                    }
                }
                controlador.graficarEntornos(controlador, ts_local, " (While)");
            }
        }
    }
    recorrer() {
        let padre = new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("CICLO", "");
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("while", ""));
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("(", ""));
        padre.AddHijo(this.condicion.recorrer());
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](")", ""));
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("{", ""));
        for (let ins of this.lista_instrucciones) {
            padre.AddHijo(ins.recorrer());
        }
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("}", ""));
        return padre;
    }
}


/***/ }),

/***/ "glYm":
/*!**********************************!*\
  !*** ./src/Clases/xpath/axes.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return axes; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");

class axes {
    constructor(tipo, exprecion, sig) {
        this.tipo = tipo;
        this.exprecion = exprecion;
        this.sig = sig;
    }
    ejecutar(controlador, ts) {
        if (this.tipo == "child") {
            this.child(controlador, ts);
        }
        else {
            if (this.tipo == "") {
            }
        }
    }
    child(controlador, ts) {
        if (this.exprecion.exprecion != null) {
            this.isxprecion(controlador, ts);
        }
        else {
            if (this.sig != null) {
                for (let tssig of ts.sig) {
                    if (this.exprecion.id == "*") {
                        this.sig.ejecutar(controlador, tssig.sig);
                    }
                    else {
                        if (this.exprecion.id == tssig.identificador) {
                            this.sig.ejecutar(controlador, tssig.sig);
                        }
                    }
                }
            }
            else {
                for (let informacion of ts.tabla) {
                    if (this.exprecion.tipo == 1) {
                        if (this.exprecion.id == "*") {
                            controlador.append(informacion.sim.objeto.gethtml("", controlador));
                        }
                        else {
                            if (informacion.identificador == this.exprecion.id && informacion.sim.simbolo == 1) {
                                controlador.append(informacion.sim.objeto.gethtml("", controlador));
                            }
                        }
                    }
                    else {
                        if (informacion.identificador == this.exprecion.id && informacion.sim.simbolo == 2) {
                            controlador.append(informacion.sim.valor + "\n");
                        }
                        else {
                            if (this.exprecion.id == "*" && informacion.sim.simbolo == 2) {
                                controlador.append(informacion.sim.valor);
                            }
                        }
                    }
                }
            }
        }
    }
    isxprecion(controlador, ts) {
        controlador.idlast = this.exprecion.id;
        let valor = this.exprecion.exprecion.getValor(controlador, ts);
        if (typeof valor == 'number') {
            this.isNumero(controlador, ts, valor);
        }
        else {
            this.isboolean(controlador, ts);
        }
    }
    isNumero(controlador, ts, posicion) {
        let cont = 1;
        if (this.sig != null) {
            for (let tssig of ts.sig) {
                if (this.exprecion.id == tssig.identificador) {
                    if (cont == posicion) {
                        this.sig.ejecutar(controlador, tssig.sig);
                    }
                    cont++;
                }
            }
        }
        else {
            for (let informacion of ts.tabla) {
                if (informacion.identificador == this.exprecion.id) {
                    if (cont == posicion) {
                        controlador.append(informacion.sim.objeto.gethtml("", controlador));
                    }
                    cont++;
                }
            }
        }
    }
    isboolean(controlador, ts) {
        let posicion = 1;
        console.log("entre");
        let cont = 1;
        if (this.sig != null) {
            for (let tssig of ts.sig) {
                if (this.exprecion.id == tssig.identificador) {
                    controlador.position = cont;
                    controlador.posicionid = posicion;
                    if (this.exprecion.exprecion.getValor(controlador, ts)) {
                        this.sig.ejecutar(controlador, tssig.sig);
                    }
                    cont++;
                }
                posicion++;
            }
        }
        else {
            for (let informacion of ts.tabla) {
                if (informacion.identificador == this.exprecion.id) {
                    controlador.position = cont;
                    controlador.posicionid = posicion;
                    if (this.exprecion.exprecion.getValor(controlador, ts)) {
                        controlador.append(informacion.sim.objeto.gethtml("", controlador));
                    }
                    cont++;
                }
                posicion++;
            }
        }
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("/", "");
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Child::" + this.exprecion.id, ""));
        if (this.exprecion.exprecion != null) {
            padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("[", ""));
            padre.AddHijo(this.exprecion.exprecion.recorrer());
            padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("]", ""));
        }
        if (this.sig != null) {
            padre.AddHijo(this.sig.recorrer());
        }
        return padre;
    }
}


/***/ }),

/***/ "h38I":
/*!*********************************************!*\
  !*** ./src/Clases/Instrucciones/Funcion.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Funcion; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");
/* harmony import */ var _TablaSimbolos_Simbolos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TablaSimbolos/Simbolos */ "hADQ");
/* harmony import */ var _TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TablaSimbolos/TablaSimbolos */ "AviG");



class Funcion extends _TablaSimbolos_Simbolos__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(simbolo, tipo, identificador, lista_params, metodo, lista_instrucciones, linea, columna) {
        super(simbolo, tipo, identificador, null, lista_params, metodo);
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    agregarSimboloFuncion(controlador, ts) {
        /* if(!(ts.existe(this.identificador))){
             ts.agregar(this.identificador,this);
         }else{
             //Error semantico
         }*/
    }
    ejecutar(controlador, ts) {
        let ts_local = new _TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_2__["TablaSimbolos"](ts);
        for (let ins of this.lista_instrucciones) {
            let r = ins.ejecutar(controlador, ts_local);
            if (r != null) {
                controlador.ambito = "Funcion: \n" + this.identificador;
                controlador.graficarEntornos(controlador, ts_local, "");
                return r;
            }
        }
        controlador.ambito = "Funcion: \n" + this.identificador;
        controlador.graficarEntornos(controlador, ts_local, "");
        return null;
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Funcion", "");
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.tipo.stype, ""));
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.identificador, ""));
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("(", ""));
        for (let x = 0; x < this.lista_params.length; x++) {
            let hijo = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Identificador", "");
            hijo.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.lista_params[x].identificador, ""));
            padre.AddHijo(hijo);
        }
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](")", ""));
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("{", ""));
        let hijo_instrucciones = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Instrucciones", "");
        for (let inst of this.lista_instrucciones) {
            hijo_instrucciones.AddHijo(inst.recorrer());
        }
        padre.AddHijo(hijo_instrucciones);
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("}", ""));
        return padre;
    }
}


/***/ }),

/***/ "hADQ":
/*!**********************************************!*\
  !*** ./src/Clases/TablaSimbolos/Simbolos.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Simbolos; });
class Simbolos {
    constructor(simbolo, tipo, identificador, valor, objeto, lista_params, metodo) {
        this.simbolo = simbolo;
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
        this.lista_params = lista_params;
        this.metodo = metodo;
        this.objeto = objeto;
    }
    setValor(valor) {
        this.valor = valor;
    }
}


/***/ }),

/***/ "iMxP":
/*!***********************************!*\
  !*** ./src/Clases/Controlador.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Controlador; });
/* harmony import */ var _GeneradorC3D_GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneradorC3D/GeneradorC3D */ "cg4T");

class Controlador {
    constructor() {
        this.errores = new Array();
        this.consola = "";
        this.cuerpo;
        this.idlast = "";
        this.position = 0;
        this.acceso = 1;
        this.generador = _GeneradorC3D_GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
    }
    append(consola) {
        this.consola += consola + "\n";
    }
    graficar_ts(controlador, ts) {
        var cuerpohtml = "<thead class=\"black white-text\"><tr><td colspan=\"6\">Tabla de Simbolos </td></tr><tr><th>Tipo</th><th>Nombre</th><th>Ambito</th><th>Valor</th></tr></thead>";
        cuerpohtml += this.cuerpo;
        return cuerpohtml;
    }
    graficarEntornos(controlador, ts, ubicacion) {
        var cuerpohtml = "";
        for (let sim of ts.tabla) {
            cuerpohtml += "<tr mdbTableCol class=\"grey lighten-1 black-text\"><th scope=\"row\">" + this.getRol(sim.sim) + "</th><td>" + sim.identificador +
                "</td>" +
                "</td><td>" + ubicacion +
                "</td><td>" + this.getValor(sim.sim) + "</tr>";
        }
        this.cuerpo = this.cuerpo + cuerpohtml;
    }
    graficar_Semantico(controlador, ts) {
        var cuerpohtml = "<thead class=\"black white-text\"><tr><td colspan=\"4\">Errores Semanticos </td></tr><tr><th>Tipo</th><th>Descripcion</th><th>Fila</th><th>Columna</th></tr></thead>";
        for (let sim of controlador.errores) {
            console.log(`Errores`);
            cuerpohtml += "<tr mdbTableCol class=\"grey lighten-1 black-text\"><th scope=\"row\">" + sim.tipo + "</th><td>" + sim.descripcion +
                "</td><td>" + sim.linea + "</td>" +
                "</td><td>" + sim.columna + "</tr>";
        }
        return cuerpohtml;
    }
    getValor(sim) {
        if (sim.valor != null) {
            return sim.valor.toString();
        }
        else {
            return '...';
        }
    }
    getTipo(sim) {
        return sim.tipo.stype.toLowerCase();
    }
    getRol(sim) {
        let rol = '';
        switch (sim.simbolo) {
            case 1:
                rol = "objeto";
                break;
            case 2:
                rol = "identificador";
                break;
            case 3:
                rol = "metodo";
                break;
            case 4:
                rol = "vector";
                break;
            case 5:
                rol = "lista";
                break;
            case 6:
                rol = "parametro";
                break;
        }
        return rol;
    }
    getAmbito() {
        return 'global';
    }
    parametros(sim) {
        if (sim.lista_params != undefined) {
            return sim.lista_params.length;
        }
        else {
            return "...";
        }
    }
}


/***/ }),

/***/ "jImf":
/*!**********************************************************!*\
  !*** ./src/Clases/Expreciones/Operaciones/Aritmetica.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Aritmetica; });
/* harmony import */ var src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/clases/AST/Nodo */ "XRm8");
/* harmony import */ var src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/clases/TablaSimbolos/Tipo */ "YE/1");
/* harmony import */ var _retorno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../retorno */ "munq");
/* harmony import */ var _Operaciones__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Operaciones */ "vu0p");




class Aritmetica extends _Operaciones__WEBPACK_IMPORTED_MODULE_3__["default"] {
    constructor(exp1, operador, exp2, linea, columna, expU) {
        super(exp1, operador, exp2, linea, columna, expU);
    }
    limpiar() {
        this.lblFalse = '';
        this.lblTrue = '';
        if (this.expU == false) {
            this.exp1.limpiar();
            this.exp2.limpiar();
        }
        else {
            this.exp1.limpiar();
        }
    }
    getTipo(controlador, ts) {
        let valor = this.getValor(controlador, ts);
        if (typeof valor == 'number') {
            return src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE;
        }
        else if (typeof valor == 'string') {
            return src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].CADENA;
        }
        else if (typeof valor == 'boolean') {
            return src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].BOOLEANO;
        }
    }
    getValor(controlador, ts) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;
        if (this.expU == false) {
            valor_exp1 = this.exp1.getValor(controlador, ts);
            valor_exp2 = this.exp2.getValor(controlador, ts);
        }
        else {
            valor_expU = this.exp1.getValor(controlador, ts);
        }
        switch (this.operador) {
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].SUMA:
                return this.suma(valor_exp1, valor_exp2);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].RESTA:
                return this.resta(valor_exp1, valor_exp2);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].MULTI:
                return this.multiplicacion(valor_exp1, valor_exp2);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].DIV:
                return this.divicion(valor_exp1, valor_exp2);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].POT:
                return this.potencia(valor_exp1, valor_exp2);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].MODULO:
                return this.modulo(valor_exp1, valor_exp2);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].UNARIO:
                return this.unario(valor_expU);
            default:
                //Se produjo un error inesperado
                break;
        }
    }
    recorrer() {
        let padre = new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Exp", "");
        if (this.expU) {
            padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.op, ""));
            padre.AddHijo(this.exp1.recorrer());
        }
        else {
            padre.AddHijo(this.exp1.recorrer());
            padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.op, ""));
            padre.AddHijo(this.exp2.recorrer());
        }
        return padre;
    }
    unario(valor_expU) {
        if (typeof valor_expU == 'number') {
            return -valor_expU;
        }
        else {
            //Error semantico
        }
    }
    suma(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'number') {
            if (typeof valor_exp2 == 'number') {
                return valor_exp1 + valor_exp2;
            }
            else if (typeof valor_exp2 == 'boolean') {
                let num = 1;
                if (valor_exp2 == false) {
                    num = 0;
                }
                return valor_exp1 + num;
            }
            else if (typeof valor_exp2 == 'string') {
                if (valor_exp2.length == 1) {
                    let numascci = valor_exp2.charCodeAt(0);
                    return valor_exp1 + numascci;
                }
                else {
                    return valor_exp1 + valor_exp2;
                }
            }
        }
        else if (typeof valor_exp1 == 'boolean') {
            if (typeof valor_exp2 == 'number') {
                let num = 1;
                if (valor_exp1 == false) {
                    num = 0;
                }
                return num + valor_exp2;
            }
            else if (typeof valor_exp2 == 'boolean') {
                //Error semantico
            }
            else if (typeof valor_exp2 === 'string') {
                if (valor_exp2.length == 1) {
                    //Error semantico
                }
                else {
                    return valor_exp1 + valor_exp2;
                }
            }
        }
        else if (typeof valor_exp1 == 'string') {
            // Caracter
            if (valor_exp1.length == 1) {
                if (typeof valor_exp2 == 'number') {
                    let numascci = valor_exp1.charCodeAt(0);
                    return numascci + valor_exp2;
                }
                else {
                    if (typeof valor_exp2 == 'string') {
                        return valor_exp1 + valor_exp2;
                    }
                    else {
                        if (typeof valor_exp2 == 'boolean') {
                            //Error Semantico
                        }
                    }
                }
            }
            else {
                //Cadena
                if (typeof valor_exp2 == 'number') {
                    return valor_exp1 + valor_exp2;
                }
                else if (typeof valor_exp2 == 'boolean') {
                    return valor_exp1 + valor_exp2;
                }
                else {
                    if (typeof valor_exp2 == 'string') {
                        return valor_exp1 + valor_exp2;
                    }
                }
            }
        }
    }
    resta(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'number') {
            if (typeof valor_exp2 == 'number') {
                return valor_exp1 - valor_exp2;
            }
            else if (typeof valor_exp2 == 'boolean') {
                let num = 1;
                if (valor_exp2 == false) {
                    num = 0;
                }
                return valor_exp1 - num;
            }
            else if (typeof valor_exp2 == 'string') {
                //Caracter
                if (valor_exp2.length == 1) {
                    let numascci = valor_exp2.charCodeAt(0);
                    return valor_exp1 - numascci;
                }
                else {
                    //Error Semantico
                }
            }
        }
        else if (typeof valor_exp1 == 'boolean') {
            if (typeof valor_exp2 == 'number') {
                let num = 1;
                if (valor_exp1 == false) {
                    num = 0;
                }
                return num - valor_exp2;
            }
            else if (typeof valor_exp2 == 'boolean') {
                //Error semantico
            }
            else if (typeof valor_exp2 == 'string') {
                //Errro semantico
            }
        }
        else if (typeof valor_exp1 == 'string') {
            //caracter
            if (valor_exp1.length == 1) {
                if (typeof valor_exp2 == 'number') {
                    let numascci = valor_exp1.charCodeAt(0);
                    return numascci - valor_exp2;
                }
                else if (typeof valor_exp2 == 'boolean') {
                    // Error semantico
                }
                else if (typeof valor_exp2 == 'string') {
                    // Error semantico
                }
            }
            else {
                //cadena
                //Error semantico
            }
        }
    }
    multiplicacion(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'number') {
            if (typeof valor_exp2 == 'number') {
                return valor_exp1 * valor_exp2;
            }
            else {
                if (typeof valor_exp2 == 'boolean') {
                    //Error Semantico
                }
                else if (typeof valor_exp2 == 'string') {
                    //caracter
                    if (valor_exp2.length == 1) {
                        let numascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 * numascci;
                    }
                    else {
                        //Error semantico
                        //cadena
                    }
                }
            }
        }
        else if (typeof valor_exp1 == 'boolean') {
            //Error semantico
        }
        else if (typeof valor_exp1 == 'string') {
            // caracter
            if (valor_exp1.length == 1) {
                if (typeof valor_exp2 == 'number') {
                    let numascci = valor_exp1.charCodeAt(0);
                    return numascci * valor_exp2;
                }
                else if (typeof valor_exp2 == 'boolean') {
                    //Error semantico
                }
                else if (typeof valor_exp2 == 'string') {
                    //Error semantico
                }
            }
            else {
                //cadena
                //Error Semantico
            }
        }
    }
    divicion(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'number') {
            if (typeof valor_exp2 == 'number') {
                return valor_exp1 / valor_exp2;
            }
            else {
                if (typeof valor_exp2 == 'boolean') {
                    //Error Semantico
                }
                else if (typeof valor_exp2 == 'string') {
                    //caracter
                    if (valor_exp2.length == 1) {
                        let numascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 / numascci;
                    }
                    else {
                        //Error semantico
                        //cadena
                    }
                }
            }
        }
        else if (typeof valor_exp1 == 'boolean') {
            //Error semantico
        }
        else if (typeof valor_exp1 == 'string') {
            // caracter
            if (valor_exp1.length == 1) {
                if (typeof valor_exp2 == 'number') {
                    let numascci = valor_exp1.charCodeAt(0);
                    return numascci / valor_exp2;
                }
                else if (typeof valor_exp2 == 'boolean') {
                    //Error semantico
                }
                else if (typeof valor_exp2 == 'string') {
                    //Error semantico
                }
            }
            else {
                //cadena
                //Error Semantico
            }
        }
    }
    potencia(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'number') {
            if (typeof valor_exp2 == 'number') {
                return Math.pow(valor_exp1, valor_exp2);
            }
            else if (typeof valor_exp2 == 'boolean') {
                //Error semantico
            }
            else if (typeof valor_exp2 == 'string') {
                //Erroro semantico
            }
        }
        else if (typeof valor_exp1 == 'boolean') {
            //Erro semantico
        }
        else if (typeof valor_exp1 == 'string') {
            // Error semantico
        }
    }
    modulo(valor_exp1, valor_exp2) {
        if (typeof valor_exp1 == 'number') {
            if (typeof valor_exp2 == 'number') {
                return valor_exp1 % valor_exp2;
            }
            else if (typeof valor_exp2 == 'boolean') {
                //Error semantico
            }
            else if (typeof valor_exp2 == 'string') {
                //Erroro semantico
            }
        }
        else if (typeof valor_exp1 == 'boolean') {
            //Erro semantico
        }
        else if (typeof valor_exp1 == 'string') {
            // Error semantico
        }
    }
    // Generar codigo 3d
    getvalor3d(controlador, ts) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;
        if (this.expU == false) {
            valor_exp1 = this.exp1.getvalor3d(controlador, ts);
            valor_exp2 = this.exp2.getvalor3d(controlador, ts);
        }
        else {
            valor_expU = this.exp1.getvalor3d(controlador, ts);
        }
        switch (this.operador) {
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].SUMA:
                console.log("entre a suma");
                return this.suma3D(valor_exp1, valor_exp2, controlador);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].RESTA:
                return this.resta3D(valor_exp1, valor_exp2, controlador);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].MULTI:
                return this.multiplicacion3D(valor_exp1, valor_exp2, controlador);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].DIV:
                return this.divicion3D(valor_exp1, valor_exp2, controlador);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].POT:
                return this.potencia(valor_exp1, valor_exp2);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].MODULO:
                return this.modulo3D(valor_exp1, valor_exp2, controlador);
            case _Operaciones__WEBPACK_IMPORTED_MODULE_3__["Operador"].UNARIO:
                return this.unario3D(valor_expU, controlador);
            default:
                //Se produjo un error inesperado
                break;
        }
    }
    suma3D(valor_exp1, valor_exp2, controlador) {
        const generador = controlador.generador;
        const temp = generador.newTemporal();
        let tempAux;
        switch (valor_exp1.tipo.type) {
            case src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE:
                switch (valor_exp2.tipo.type) {
                    case src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE:
                        generador.genExpresion(temp, valor_exp1.getvalor3d(), valor_exp2.getvalor3d(), '+');
                        return new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](temp, true, valor_exp2.tipo);
                    case src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].CADENA:
                        let tempAux = generador.newTemporal();
                        generador.freeTemp(tempAux);
                        generador.genExpresion(tempAux, 'p', 1 + 1, '+');
                        generador.genSetStack(tempAux, valor_exp1.getvalor3d());
                        generador.genExpresion(tempAux, tempAux, '1', '+');
                        generador.genSetStack(tempAux, valor_exp2.getvalor3d());
                        generador.genNextEnv(1);
                        generador.genCall('nativa_concat_int_str');
                        generador.genGetStack(temp, 'p');
                        generador.genAntEnv(1);
                        return new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](temp, true, new src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("STRING"));
                    case src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].BOOLEANO:
                    default:
                        break;
                }
                break;
            case src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].CADENA:
                switch (valor_exp2.tipo.type) {
                    case src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE:
                        tempAux = generador.newTemporal();
                        generador.freeTemp(tempAux);
                        generador.genExpresion(tempAux, 'p', 1 + 1, '+');
                        generador.genSetStack(tempAux, valor_exp1.getvalor3d());
                        generador.genExpresion(tempAux, tempAux, '1', '+');
                        generador.genSetStack(tempAux, valor_exp2.getvalor3d());
                        generador.genNextEnv(1);
                        generador.genCall('nativa_concat_str_int');
                        generador.genGetStack(temp, 'p');
                        generador.genAntEnv(1);
                        return new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](temp, true, new src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("STRING"));
                    case src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].CADENA:
                        tempAux = generador.newTemporal();
                        generador.freeTemp(tempAux);
                        generador.genExpresion(tempAux, 'p', 1 + 1, '+');
                        generador.genSetStack(tempAux, valor_exp1.getvalor3d());
                        generador.genExpresion(tempAux, tempAux, '1', '+');
                        generador.genSetStack(tempAux, valor_exp2.getvalor3d());
                        generador.genNextEnv(1);
                        generador.genCall('nativa_concat_str_str');
                        generador.genGetStack(temp, 'p');
                        generador.genAntEnv(1);
                        return new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](temp, true, new src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("STRING"));
                    case src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].BOOLEANO:
                    default:
                        break;
                }
            default:
                break;
        }
    }
    resta3D(valor_exp1, valor_exp2, controlador) {
        const generador = controlador.generador;
        const temp = generador.newTemporal();
        if (valor_exp1.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
            if (valor_exp2.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
                generador.genExpresion(temp, valor_exp1.getvalor3d(), valor_exp2.getvalor3d(), '-');
                return new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](temp, true, valor_exp2.tipo);
            }
        }
    }
    multiplicacion3D(valor_exp1, valor_exp2, controlador) {
        const generador = controlador.generador;
        const temp = generador.newTemporal();
        if (valor_exp1.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
            if (valor_exp2.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
                generador.genExpresion(temp, valor_exp1.getvalor3d(), valor_exp2.getvalor3d(), '*');
                return new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](temp, true, valor_exp2.tipo);
            }
        }
    }
    divicion3D(valor_exp1, valor_exp2, controlador) {
        const generador = controlador.generador;
        const temp = generador.newTemporal();
        if (valor_exp1.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
            if (valor_exp2.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
                generador.genExpresion(temp, valor_exp1.getvalor3d(), valor_exp2.getvalor3d(), '/');
                return new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](temp, true, valor_exp2.tipo);
            }
        }
    }
    modulo3D(valor_exp1, valor_exp2, controlador) {
        const generador = controlador.generador;
        const temp = generador.newTemporal();
        if (valor_exp1.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
            if (valor_exp2.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
                generador.genCode(temp + ' = fmod(' + valor_exp1.getvalor3d() + ',' + valor_exp2.getvalor3d() + ');');
                return new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](temp, true, valor_exp2.tipo);
            }
        }
    }
    unario3D(valor_exp1, controlador) {
        const generador = controlador.generador;
        const temp = generador.newTemporal();
        if (valor_exp1.tipo.type == src_clases_TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE) {
            generador.genExpresion(temp, valor_exp1.getvalor3d(), '-1', '*');
            return new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](temp, true, valor_exp1.tipo);
        }
    }
}


/***/ }),

/***/ "l5Da":
/*!*******************************************!*\
  !*** ./src/Clases/Instrucciones/Print.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Print; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");

class Print {
    constructor(expresion, linea, columna) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador, ts) {
        let valor = this.expresion.getValor(controlador, ts);
        controlador.append(valor);
        return null;
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Print", "");
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("print", ""));
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("(", ""));
        let hijo = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("exp", "");
        hijo.AddHijo(this.expresion.recorrer());
        padre.AddHijo(hijo);
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](")", ""));
        return padre;
    }
}


/***/ }),

/***/ "lKex":
/*!******************************************!*\
  !*** ./src/Clases/TablaSimbolos/Tipo.ts ***!
  \******************************************/
/*! exports provided: tipo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tipo", function() { return tipo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tipo; });
var tipo;
(function (tipo) {
    tipo[tipo["ENTERO"] = 0] = "ENTERO";
    tipo[tipo["DOBLE"] = 1] = "DOBLE";
    tipo[tipo["BOOLEANO"] = 2] = "BOOLEANO";
    tipo[tipo["CARACTER"] = 3] = "CARACTER";
    tipo[tipo["CADENA"] = 4] = "CADENA";
    tipo[tipo["VOID"] = 5] = "VOID";
    tipo[tipo["OBJETO"] = 6] = "OBJETO";
    tipo[tipo["IDENTIFICADOR"] = 7] = "IDENTIFICADOR";
})(tipo || (tipo = {}));
class Tipo {
    constructor(stype) {
        this.stype = stype;
        this.type = this.getTipo(stype);
    }
    getTipo(stype) {
        if (stype == 'DOBLE') {
            return tipo.DOBLE;
        }
        else if (stype == 'ENTERO') {
            return tipo.ENTERO;
        }
        else if (stype == 'STRING') {
            return tipo.CADENA;
        }
        else if (stype == 'BOOLEAN') {
            return tipo.BOOLEANO;
        }
        else if (stype == 'VOID') {
            return tipo.VOID;
        }
        else if (stype == 'CHAR') {
            return tipo.CARACTER;
        }
        else if (stype == 'OBJETO') {
            return tipo.OBJETO;
        }
        else if (stype == 'IDENTIFICADOR') {
            return tipo.IDENTIFICADOR;
        }
    }
    getStype() {
        return this.stype;
    }
}


/***/ }),

/***/ "laoz":
/*!*************************************************!*\
  !*** ./src/clases/GeneradorC3D/GeneradorC3D.ts ***!
  \*************************************************/
/*! exports provided: GeneradorC3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneradorC3D", function() { return GeneradorC3D; });
/* harmony import */ var _Nativas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Nativas */ "pkUk");

class GeneradorC3D {
    /**
     * constructor de la clase singleton
     */
    constructor() {
        this.isFunc = '';
        this.temporal = this.label = 0;
        this.code = [];
        this.codeFuncion = [];
        this.tempStorage = new Set();
    }
    agregarFuncion(funcion) {
        funcion.forEach((fun) => {
            this.codeFuncion.push(fun);
        });
    }
    /**
     * Obtiene la instancia de la clase singleton
     */
    static getInstancia() {
        return this.generador || (this.generador = new this());
    }
    /**
     * Retorna el set de los temporales que estan en uso
     */
    getTempStorage() {
        return this.tempStorage;
    }
    /**
     * Vacia el set de los temporales
     */
    clearTempStorage() {
        this.tempStorage.clear();
    }
    /**
     * asigna el set al set local de temporales
     * @param tempStorage lista tipo Set que se asignara al set local
     */
    setTempStorage(tempStorage) {
        this.tempStorage = tempStorage;
    }
    /**
     * borra el C3D que tenga guardado la clase y reinicia los temporales y labels
     */
    clearCode() {
        this.temporal = this.label = 0;
        this.code = [];
        this.codeFuncion = [];
        this.tempStorage = new Set();
    }
    clearSoloCode() {
        this.code = [];
    }
    /**
     * Ingresa en el C3D el valor que se asigna como parametro
     * @param code valor que se asignara al C3D de la clase
     */
    genCode(code) {
        this.code.push(this.isFunc + code);
    }
    /**
     * Retorna el C3D que se haya generado en la clase singleton
     */
    getCode() {
        let nativas = new _Nativas__WEBPACK_IMPORTED_MODULE_0__["Nativas"]();
        let encabezado = '#include <stdio.h>\n#include <math.h>\ndouble Stack[60000]; double Heap[60000];\nint p; int h;\n';
        let main = `\nint main() {\n${this.code.join('\n')}\n\nreturn 0;\n}\n`;
        const funciones = this.codeFuncion.join('\n');
        this.code = [];
        let strNativas = nativas.generarNativas();
        //strNativas = ''; // comentar despues de terminar
        let c3d = `${encabezado}${this.getTemporales()};\n${strNativas}\n${funciones}\n${main}`;
        return c3d;
    }
    getSoloCode() {
        return this.code;
    }
    setSoloCode(codeA) {
        this.code = codeA;
    }
    getNativas() {
        return this.code.join('\n');
    }
    getTemporales() {
        let lista = 'double ';
        for (let i = 0; i < this.temporal; i++) {
            lista += 'T' + i;
            lista += i < this.temporal - 1 ? ',' : '';
        }
        return lista;
    }
    /**
     * Crea un nuevo temporal y lo retorna
     */
    newTemporal() {
        const temp = 'T' + this.temporal++;
        this.tempStorage.add(temp);
        return temp;
    }
    /**
     * Crea una nueva etiqueta y la retorna
     */
    newLabel() {
        return 'L' + this.label++;
    }
    /**
     * funcion que agrega una nueva etiqueta el C3D
     * @param label valor que se agregara al C3D como tipo etiqueta
     */
    genLabel(label) {
        this.code.push(`${this.isFunc}${label}:`);
    }
    /**
     * Genera una nueva expresion y la agrega al C3D
     * @param tem Temporal al que se le asignara la expresion
     * @param izq Expresion izquierda que se asignara al temporal
     * @param der Expresion derecha que se asignara al temporal
     * @param operator Operador de la expresion
     */
    genExpresion(tem, iqz, der = '', operator = '') {
        this.code.push(`${this.isFunc}${tem} = ${iqz} ${operator} ${der};`);
    }
    /**
     * asigna un valor a un temporal o puntero
     * @param tem variable que recibira el valor
     * @param val valor que sera asignado
     */
    genAsignacion(tem, val) {
        this.code.push(`${this.isFunc}${tem} = ${val};`);
    }
    /**
     * genera un goto con el valor de label y lo agrega el C3D
     * @param label valor de etiqueta al cual se hara el goto
     */
    genGoto(label) {
        this.code.push(`${this.isFunc}goto ${label};`);
    }
    /**
     * genera un if y lo agrega al C3D
     * @param iqz Expresion izquierda de la condicion if
     * @param der Expresion derecha de la condicion if
     * @param operator Operador boleano de la condicion
     * @param label Etiqueta de salto si la condicion es verdadera
     */
    genIf(iqz, der, operator, label) {
        this.code.push(`${this.isFunc}if (${iqz} ${operator} ${der}) goto ${label};`);
    }
    /**
     * Intruccion que hace avanzar el puntero heap a su siguite posicion
     */
    avanzarHeap() {
        this.code.push(this.isFunc + 'h = h + 1;');
    }
    /**
     * genera un acceso al heap en la posicion index y lo asiga al tem
     * @param tem temporal que recibira el valor del heap
     * @param index posicion del heap al cual se accedera
     */
    genGetHeap(tem, index) {
        index = index[0] === 'T' ? '(int)' + index : index;
        this.code.push(`${this.isFunc}${tem} = Heap[${index}];`);
    }
    /**
     * genera una asignacion de valor al heap en la posicion index
     * @param index posicion del heap al cual se desea acceder
     * @param valor valor que se asignara a la posicion del heap
     */
    genSetHeap(index, valor) {
        index = index[0] === 'T' ? '(int)' + index : index;
        this.code.push(`${this.isFunc}Heap[${index}] = ${valor};`);
    }
    /**
     * genera una asignacion a tem del valor del stack en la posicion index
     * @param tem temporal al cual se asignara el valor del stack
     * @param index posicion del stack al cual se desea acceder
     */
    genGetStack(tem, index) {
        index = index[0] === 'T' ? '(int)' + index : index;
        this.code.push(`${this.isFunc}${tem} = Stack[${index}];`);
    }
    /**
     * genera una asignacion al stack en la posicion index
     * @param index posicion del stack al cual se desea acceder
     * @param value valor que sera asignado al stack
     */
    genSetStack(index, value) {
        index = index[0] === 'T' ? '(int)' + index : index;
        this.code.push(`${this.isFunc}Stack[${index}] = ${value};`);
    }
    /**
     * genera un desplazamiento del stack para generar un nuevo ambito
     * @param size posiciones que se desplazara el stack
     */
    genNextEnv(size) {
        this.code.push(`${this.isFunc}p = p + ${size};`);
    }
    /**
     * genera un desplazamiento del stack para volver a un ambito anterios
     * @param size posiciones que se desplazara el stack
     */
    genAntEnv(size) {
        this.code.push(`${this.isFunc}p = p - ${size};`);
    }
    /**
     * genera una llamada a una funcion
     * @param id nombre de la funcion
     */
    genCall(id) {
        this.code.push(`${this.isFunc}${id}();`);
    }
    /**
     * Genera el encabezado de una funcion
     * @param id nombre de la funcion
     */
    genFuncion(id) {
        this.code.push(`\nvoid ${id}() {`);
    }
    /**
     * Genera el cierre de la definicion de una funcion
     */
    genEndFuncion() {
        this.code.push('}');
    }
    /**
     * genera un printf con el tipo de dato y el valor
     * @param formato tipo de dato que se va a imprimir
     * @param valor valor que se va a imprimir
     */
    genPrint(formato, valor) {
        valor = valor[0] === 'T' && formato !== 'f' ? '(int)' + valor : valor;
        this.code.push(`${this.isFunc}printf("%${formato}",${valor});`);
    }
    /**
     * genera un print del valor true
     */
    genPrintTrue() {
        this.genPrint('c', 't'.charCodeAt(0));
        this.genPrint('c', 'r'.charCodeAt(0));
        this.genPrint('c', 'u'.charCodeAt(0));
        this.genPrint('c', 'e'.charCodeAt(0));
    }
    /**
     * genera un print del valor false
     */
    genPrintFalse() {
        this.genPrint('c', 'f'.charCodeAt(0));
        this.genPrint('c', 'a'.charCodeAt(0));
        this.genPrint('c', 'l'.charCodeAt(0));
        this.genPrint('c', 's'.charCodeAt(0));
        this.genPrint('c', 'e'.charCodeAt(0));
    }
    /**
     * genera un print del valor null
     */
    genPrintNull() {
        this.genPrint('c', 'n'.charCodeAt(0));
        this.genPrint('c', 'u'.charCodeAt(0));
        this.genPrint('c', 'l'.charCodeAt(0));
        this.genPrint('c', 'l'.charCodeAt(0));
    }
    /**
     * genera un nuevo comentario
     * @param comment valor del comentario
     */
    genComentario(comment) {
        this.code.push(`${this.isFunc}// ----- ${comment} -----`);
    }
    /**
     * borra un temporal del storage
     * @param temp temporal que ya no se utilizara
     */
    freeTemp(temp) {
        if (this.tempStorage.has(temp)) {
            this.tempStorage.delete(temp);
        }
    }
    /**
     * agrega un temporal al storage
     * @param temp temporal que se agregara al storage
     */
    genTemp(temp) {
        if (!this.tempStorage.has(temp))
            this.tempStorage.add(temp);
    }
}


/***/ }),

/***/ "lbnd":
/*!***************************************!*\
  !*** ./src/Analizadores/gramatica.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,6],$V2=[1,8],$V3=[1,9],$V4=[1,10],$V5=[1,11],$V6=[1,12],$V7=[1,13],$V8=[1,14],$V9=[1,15],$Va=[1,16],$Vb=[1,23],$Vc=[1,17],$Vd=[1,18],$Ve=[1,19],$Vf=[1,20],$Vg=[1,21],$Vh=[1,22],$Vi=[5,7],$Vj=[1,30],$Vk=[1,31],$Vl=[1,32],$Vm=[5,7,9,11,15,16,17,18,20,21,22,23,24,26,27,28,29,30,31,32],$Vn=[1,37],$Vo=[1,58],$Vp=[1,59],$Vq=[1,60],$Vr=[1,54],$Vs=[1,62],$Vt=[1,55],$Vu=[1,56],$Vv=[1,57],$Vw=[1,61],$Vx=[1,67],$Vy=[1,72],$Vz=[1,68],$VA=[1,66],$VB=[1,69],$VC=[1,70],$VD=[1,71],$VE=[1,73],$VF=[1,74],$VG=[1,75],$VH=[1,76],$VI=[1,77],$VJ=[1,78],$VK=[25,33,35,38,39,40,41,42,43,44,45,46,47,48,50],$VL=[25,33,38,39,42,43,44,45,46,47,48,50],$VM=[33,38,42,43,44,45,46,47,48,50];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"inicio":3,"varias":4,"EOF":5,"instrucciones":6,"SIGNOO":7,"instruccion":8,"BARRA":9,"e":10,"BARRABARRA":11,"RESERV":12,"DOSPUNTOS":13,"PUNTOPUNTO":14,"ID":15,"LAST":16,"POSITION":17,"ANCESTOR":18,"RESERVLARGE":19,"ATTRIBUTE":20,"ANCESORSELF":21,"CHILD":22,"DESCENDANT":23,"FOLLOWING":24,"MENOS":25,"SIBLING":26,"NAMESPACE":27,"PARENT":28,"PRECENDING":29,"SELF":30,"TEXT":31,"NODE":32,"OR":33,"ARROBA":34,"ASTERISCO":35,"CORA":36,"OPERADORES":37,"CORC":38,"MAS":39,"DIV":40,"MODULO":41,"AND":42,"MAYORQUE":43,"MAYORIGUAL":44,"MENORQUE":45,"MENORIGUAL":46,"DIFERENTE":47,"IGUAL":48,"PARA":49,"PARC":50,"DECIMAL":51,"ENTERO":52,"CADENA":53,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"SIGNOO",9:"BARRA",11:"BARRABARRA",13:"DOSPUNTOS",14:"PUNTOPUNTO",15:"ID",16:"LAST",17:"POSITION",18:"ANCESTOR",20:"ATTRIBUTE",21:"ANCESORSELF",22:"CHILD",23:"DESCENDANT",24:"FOLLOWING",25:"MENOS",26:"SIBLING",27:"NAMESPACE",28:"PARENT",29:"PRECENDING",30:"SELF",31:"TEXT",32:"NODE",33:"OR",34:"ARROBA",35:"ASTERISCO",36:"CORA",38:"CORC",39:"MAS",40:"DIV",41:"MODULO",42:"AND",43:"MAYORQUE",44:"MAYORIGUAL",45:"MENORQUE",46:"MENORIGUAL",47:"DIFERENTE",48:"IGUAL",49:"PARA",50:"PARC",51:"DECIMAL",52:"ENTERO",53:"CADENA"},
productions_: [0,[3,2],[4,3],[4,1],[6,2],[6,1],[8,2],[8,2],[8,3],[8,4],[8,2],[8,4],[8,1],[12,1],[12,1],[12,2],[12,1],[12,1],[12,1],[12,2],[12,1],[12,3],[12,1],[12,1],[12,1],[12,1],[12,3],[12,1],[12,1],[12,1],[12,1],[19,4],[19,2],[10,1],[10,2],[10,2],[10,1],[10,4],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,3],[37,2],[37,3],[37,1],[37,1],[37,1],[37,1],[37,1],[37,1],[37,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
  this.$=$$[$0-1]; return this.$ 
break;
case 2:
this.$=new instrucciondoble.default($$[$0-2],$$[$0]);
break;
case 3:
this.$=$$[$0]
break;
case 4:
 $$[$0-1].sig=$$[$0]; this.$ = $$[$0-1]; 
break;
case 5:
 this.$= $$[$0]; 
break;
case 6:
  this.$ = new acceso.default($$[$0],null);
break;
case 7:
  this.$ = new barrabarra.default($$[$0],null);
break;
case 8: case 9:
  this.$ =  new axes.default($$[$0-2],$$[$0],null);
break;
case 10:
  this.$ =  new puntopunto.default($$[$0-1],null);
break;
case 11:
  this.$ =  new axesbarrabarra.default($$[$0-2],$$[$0],null)
break;
case 12:
  this.$ =  new acceso.default(new informacion.default($$[$0],null,1),null);
break;
case 13: case 14: case 16: case 17: case 18: case 20: case 22: case 23: case 24: case 25: case 27: case 28: case 29: case 30:
this.$ = $$[$0]
break;
case 15: case 19:
this.$ = $$[$0-1] + $$[$0]
break;
case 21: case 26:
this.$ = $$[$0-2]+$$[$0-1]+$$[$0]
break;
case 31:
this.$ = $$[$0-3]+$$[$0-2]+$$[$0-1]+$$[$0]
break;
case 32:
this.$ = $$[$0-1]+$$[$0]
break;
case 33: case 36:
this.$=new informacion.default($$[$0],null,1);
break;
case 34: case 35:
this.$=new informacion.default($$[$0],null,2);
break;
case 37:
this.$=new informacion.default($$[$0-3],$$[$0-1],1);
break;
case 38:
this.$ = new aritmetica.default($$[$0-2], '+', $$[$0], $$[$0-2].first_line, $$[$0-2].last_column, false);
break;
case 39:
this.$ = new aritmetica.default($$[$0-2], '-', $$[$0], $$[$0-2].first_line, $$[$0-2].last_column, false);
break;
case 40:
this.$ = new aritmetica.default($$[$0-2], '*', $$[$0], $$[$0-2].first_line, $$[$0-2].last_column, false);
break;
case 41:
this.$ = new aritmetica.default($$[$0-2], '/', $$[$0], $$[$0-2].first_line, $$[$0-2].last_column, false);
break;
case 42:
this.$ = new aritmetica.default($$[$0-2], '%', $$[$0], $$[$0-2].first_line, $$[$0-2].last_column, false);
break;
case 43:
this.$ = new logica.default($$[$0-2], '&&', $$[$0], $$[$0-2].first_line, $$[$0-2].last_column, false);
break;
case 44:
this.$ = new logica.default($$[$0-2], '||', $$[$0], $$[$0-2].first_line, $$[$0-2].last_column, false);
break;
case 45:
this.$ = new relacional.default($$[$0-2],'>', $$[$0], $$[$0-2].first_line, $$[$0-2].last_column, false);
break;
case 46:
this.$ = new relacional.default($$[$0-2],'>=', $$[$0], $$[$0-2].first_line, $$[$0-2].last_column, false);
break;
case 47:
this.$ = new relacional.default($$[$0-2],'<', $$[$0], $$[$0-2].first_line, $$[$0-2].last_column, false);
break;
case 48:
this.$ = new relacional.default($$[$0-2],'<=', $$[$0], $$[$0-2].first_line, $$[$0-2].last_column, false);
break;
case 49:
this.$ = new relacional.default($$[$0-2],'!=', $$[$0], $$[$0-2].first_line, $$[$0-2].last_column, false);
break;
case 50:
this.$ = new relacional.default($$[$0-2],'==', $$[$0], $$[$0-2].first_line, $$[$0-2].last_column, false);
break;
case 51:
this.$ = new aritmetica.default($$[$0], 'UNARIO', null, $$[$0-1].first_line, $$[$0-1].last_column, true);
break;
case 52:
this.$ = $$[$0-1];
break;
case 53: case 54:
this.$ = new primitivo.default(Number(yytext), $$[$0].first_line, $$[$0].last_column,-1);
break;
case 55:
this.$ = new identificador.default($$[$0] , _$[$0].first_line, _$[$0].last_column,1); 
break;
case 56:
this.$ = new last.default();
break;
case 57:
this.$ = new position.default();
break;
case 58:
$$[$0] = $$[$0].slice(1, $$[$0].length-1); this.$ = new primitivo.default($$[$0], $$[$0].first_line, $$[$0].last_column);
break;
case 59:
this.$ = new identificador.default($$[$0] , _$[$0-1].first_line, _$[$0-1].last_column,2); 
break;
}
},
table: [{3:1,4:2,6:3,8:4,9:$V0,11:$V1,12:7,15:$V2,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,26:$Vb,27:$Vc,28:$Vd,29:$Ve,30:$Vf,31:$Vg,32:$Vh},{1:[3]},{5:[1,24]},{5:[2,3],7:[1,25]},o($Vi,[2,5],{8:4,12:7,6:26,9:$V0,11:$V1,15:$V2,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,26:$Vb,27:$Vc,28:$Vd,29:$Ve,30:$Vf,31:$Vg,32:$Vh}),{10:27,12:28,14:[1,29],15:$Vj,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,26:$Vb,27:$Vc,28:$Vd,29:$Ve,30:$Vf,31:$Vg,32:$Vh,34:$Vk,35:$Vl},{10:33,12:34,15:$Vj,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,26:$Vb,27:$Vc,28:$Vd,29:$Ve,30:$Vf,31:$Vg,32:$Vh,34:$Vk,35:$Vl},{13:[1,35]},o($Vm,[2,12]),{13:[2,13]},{13:[2,14]},{19:36,25:$Vn},{13:[2,16]},{13:[2,17]},{13:[2,18]},{13:[2,20],19:38,25:$Vn},{13:[2,22],25:[1,39]},{13:[2,23]},{13:[2,24]},{13:[2,25],25:[1,40]},{13:[2,27]},{13:[2,28]},{13:[2,29]},{13:[2,30]},{1:[2,1]},{6:41,8:4,9:$V0,11:$V1,12:7,15:$V2,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,26:$Vb,27:$Vc,28:$Vd,29:$Ve,30:$Vf,31:$Vg,32:$Vh},o($Vi,[2,4]),o($Vm,[2,6]),{13:[1,42]},o($Vm,[2,10]),o($Vm,[2,33],{36:[1,43]}),{15:[1,44],35:[1,45]},o($Vm,[2,36]),o($Vm,[2,7]),{13:[1,46]},{10:47,15:$Vj,34:$Vk,35:$Vl},{13:[2,15]},{26:[1,49],33:[1,48]},{13:[2,19]},{26:[1,50]},{26:[1,51]},{5:[2,2]},{10:52,15:$Vj,34:$Vk,35:$Vl},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:53,49:$Vt,51:$Vu,52:$Vv,53:$Vw},o($Vm,[2,34]),o($Vm,[2,35]),{10:63,15:$Vj,34:$Vk,35:$Vl},o($Vm,[2,8]),{25:[1,64]},{13:[2,32]},{13:[2,21]},{13:[2,26]},o($Vm,[2,9]),{25:$Vx,33:$Vy,35:$Vz,38:[1,65],39:$VA,40:$VB,41:$VC,42:$VD,43:$VE,44:$VF,45:$VG,46:$VH,47:$VI,48:$VJ},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:79,49:$Vt,51:$Vu,52:$Vv,53:$Vw},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:80,49:$Vt,51:$Vu,52:$Vv,53:$Vw},o($VK,[2,53]),o($VK,[2,54]),o($VK,[2,55]),o($VK,[2,56]),o($VK,[2,57]),o($VK,[2,58]),{15:[1,81]},o($Vm,[2,11]),{30:[1,82]},o($Vm,[2,37]),{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:83,49:$Vt,51:$Vu,52:$Vv,53:$Vw},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:84,49:$Vt,51:$Vu,52:$Vv,53:$Vw},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:85,49:$Vt,51:$Vu,52:$Vv,53:$Vw},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:86,49:$Vt,51:$Vu,52:$Vv,53:$Vw},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:87,49:$Vt,51:$Vu,52:$Vv,53:$Vw},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:88,49:$Vt,51:$Vu,52:$Vv,53:$Vw},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:89,49:$Vt,51:$Vu,52:$Vv,53:$Vw},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:90,49:$Vt,51:$Vu,52:$Vv,53:$Vw},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:91,49:$Vt,51:$Vu,52:$Vv,53:$Vw},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:92,49:$Vt,51:$Vu,52:$Vv,53:$Vw},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:93,49:$Vt,51:$Vu,52:$Vv,53:$Vw},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:94,49:$Vt,51:$Vu,52:$Vv,53:$Vw},{15:$Vo,16:$Vp,17:$Vq,25:$Vr,34:$Vs,37:95,49:$Vt,51:$Vu,52:$Vv,53:$Vw},o($VK,[2,51]),{25:$Vx,33:$Vy,35:$Vz,39:$VA,40:$VB,41:$VC,42:$VD,43:$VE,44:$VF,45:$VG,46:$VH,47:$VI,48:$VJ,50:[1,96]},o($VK,[2,59]),{13:[2,31]},o($VL,[2,38],{35:$Vz,40:$VB,41:$VC}),o($VL,[2,39],{35:$Vz,40:$VB,41:$VC}),o($VK,[2,40]),o($VK,[2,41]),o($VK,[2,42]),o([33,38,42,50],[2,43],{25:$Vx,35:$Vz,39:$VA,40:$VB,41:$VC,43:$VE,44:$VF,45:$VG,46:$VH,47:$VI,48:$VJ}),o([33,38,50],[2,44],{25:$Vx,35:$Vz,39:$VA,40:$VB,41:$VC,42:$VD,43:$VE,44:$VF,45:$VG,46:$VH,47:$VI,48:$VJ}),o($VM,[2,45],{25:$Vx,35:$Vz,39:$VA,40:$VB,41:$VC}),o($VM,[2,46],{25:$Vx,35:$Vz,39:$VA,40:$VB,41:$VC}),o($VM,[2,47],{25:$Vx,35:$Vz,39:$VA,40:$VB,41:$VC}),o($VM,[2,48],{25:$Vx,35:$Vz,39:$VA,40:$VB,41:$VC}),o($VM,[2,49],{25:$Vx,35:$Vz,39:$VA,40:$VB,41:$VC}),o($VM,[2,50],{25:$Vx,35:$Vz,39:$VA,40:$VB,41:$VC}),o($VK,[2,52])],
defaultActions: {9:[2,13],10:[2,14],12:[2,16],13:[2,17],14:[2,18],17:[2,23],18:[2,24],20:[2,27],21:[2,28],22:[2,29],23:[2,30],24:[2,1],36:[2,15],38:[2,19],41:[2,2],49:[2,32],50:[2,21],51:[2,26],82:[2,31]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    const evaluar = __webpack_require__(/*! ../Clases/Evaluar */ "bGwg");
    const aritmetica= __webpack_require__(/*! ../Clases/Expreciones/Operaciones/Aritmetica */ "jImf");
    const relacional = __webpack_require__(/*! ../Clases/Expreciones/Operaciones/Relaciones */ "VEqm");
    const logica = __webpack_require__(/*! ../Clases/Expreciones/Operaciones/Logicas */ "7KGZ");
    const primitivo = __webpack_require__(/*! ../Clases/Expreciones/Primitivo */ "mcIB");
    
    const identificador= __webpack_require__(/*! ../Clases/Expreciones/Identificador */ "Byf3");
    const last= __webpack_require__(/*! ../Clases/Expreciones/last */ "n/3T");
    const position = __webpack_require__ (/*! ../Clases/Expreciones/position */ "T71e");
    const ternario= __webpack_require__(/*! ../Clases/Expreciones/Ternario */ "qYeL");
    const ast =__webpack_require__(/*! ../Clases/AST/Ast */ "ZSbs");
    const declaracion = __webpack_require__ (/*! ../Clases/Instrucciones/Declaracion */ "zWDC");
    const asignacion = __webpack_require__ (/*! ../Clases/Instrucciones/Asignacion */ "HGo+");
    const funcion = __webpack_require__ (/*! ../Clases/Instrucciones/Funcion */ "h38I");
    const llamada = __webpack_require__ (/*! ../Clases/Instrucciones/Llamada */ "/59w");
    const ejecutar = __webpack_require__ (/*! ../Clases/Instrucciones/Ejecutar */ "1NQK");
    const Print = __webpack_require__ (/*! ../Clases/Instrucciones/Print */ "l5Da");
    const Ifs = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaControl/Ifs */ "WZOa");
    const While = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaCiclos/While */ "fH/y");
    const dowhile =__webpack_require__ (/*! ../Clases/Instrucciones/SentenciaCiclos/DoWhile */ "C4Lw");
    const For =__webpack_require__ (/*! ../Clases/Instrucciones/SentenciaCiclos/For */ "sedW");
    const simbolo= __webpack_require__ (/*! ../Clases/TablaSimbolos/Simbolos */ "hADQ");
    const tipo= __webpack_require__ (/*! ../Clases/TablaSimbolos/Tipo */ "lKex");
    const detener = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaTransferencia/Break */ "L2hm");
    const continuar = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaTransferencia/continuar */ "vyXG");
    const retornar = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaTransferencia/retornar */ "uHk2");
    const sw = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaControl/SW */ "dzIM");
    const cs = __webpack_require__ (/*! ../Clases/Instrucciones/SentenciaControl/CS */ "DwkX");
    const acceso= __webpack_require__ (/*! ../Clases/xpath/acceso */ "LjH7");
    const barrabarra= __webpack_require__ (/*! ../Clases/xpath/barrabarra */ "8VeP");
    const informacion = __webpack_require__ (/*! ../Clases/xpath/informacion */ "9Smq");
    const axes = __webpack_require__ (/*! ../Clases/xpath/axes */ "glYm");
    const axesbarrabarra = __webpack_require__ (/*! ../Clases/xpath/axesbarrabarra */ "Hk5z");
    const instrucciondoble =__webpack_require__ (/*! ../Clases/xpath/intrucciondoble */ "7VuF");
    const puntopunto =__webpack_require__ (/*! ../Clases/xpath/puntopunto */ "Y/Ky");
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0: console.log("Reconocio : "+ yy_.yytext); return 46
break;
case 1: console.log("Reconocio : "+ yy_.yytext); return 44
break;
case 2: console.log("Reconocio : "+ yy_.yytext); return 48
break;
case 3: console.log("Reconocio : "+ yy_.yytext); return 45
break;
case 4: console.log("Reconocio : "+ yy_.yytext); return 43
break;
case 5: console.log("Reconocio : "+ yy_.yytext); return 47
break;
case 6: console.log("Reconocio : "+ yy_.yytext); return 49
break;
case 7: console.log("Reconocio : "+ yy_.yytext); return 11
break;
case 8: console.log("Reconocio : "+ yy_.yytext); return 9
break;
case 9: console.log("Reconocio : "+ yy_.yytext); return 50
break;
case 10: console.log("Reconocio : "+ yy_.yytext); return 36
break;
case 11: console.log("Reconocio : "+ yy_.yytext); return 38
break;
case 12: console.log("Reconocio : "+ yy_.yytext); return 34
break;
case 13: console.log("Reconocio : "+ yy_.yytext); return 14
break;
case 14: console.log("Reconocio : "+ yy_.yytext); return 'PUNTO'
break;
case 15: console.log("Reconocio : "+ yy_.yytext); return 7
break;
case 16: console.log("Reconocio : "+ yy_.yytext); return 13
break;
case 17: console.log("Reconocio : "+ yy_.yytext); return 39
break;
case 18: console.log("Reconocio : "+ yy_.yytext); return 25
break;
case 19: console.log("Reconocio : "+ yy_.yytext); return 35
break;
case 20: console.log("Reconocio : "+ yy_.yytext); return 40
break;
case 21: console.log("Reconocio : "+ yy_.yytext); return 41
break;
case 22: console.log("Reconocio : "+ yy_.yytext); return 42
break;
case 23: console.log("Reconocio : "+ yy_.yytext); return 33
break;
case 24: console.log("Reconocio : "+ yy_.yytext); return 16
break;
case 25: console.log("Reconocio : "+ yy_.yytext); return 17
break;
case 26: console.log("Reconocio : "+ yy_.yytext); return 18
break;
case 27: console.log("Reconocio : "+ yy_.yytext); return 20
break;
case 28: console.log("Reconocio : "+ yy_.yytext); return 30
break;
case 29: console.log("Reconocio : "+ yy_.yytext); return 22
break;
case 30: console.log("Reconocio : "+ yy_.yytext); return 23
break;
case 31: console.log("Reconocio : "+ yy_.yytext); return 24
break;
case 32: console.log("Reconocio : "+ yy_.yytext); return 26
break;
case 33: console.log("Reconocio : "+ yy_.yytext); return 27
break;
case 34: console.log("Reconocio : "+ yy_.yytext); return 28
break;
case 35: console.log("Reconocio : "+ yy_.yytext); return 29
break;
case 36: console.log("Reconocio : "+ yy_.yytext); return 31
break;
case 37: console.log("Reconocio : "+ yy_.yytext); return 32
break;
case 38: console.log("Reconocio : "+ yy_.yytext); return 16
break;
case 39: console.log("Reconocio : "+ yy_.yytext); return 17
break;
case 40: console.log("Reconocio : "+ yy_.yytext); return 51
break;
case 41: console.log("Reconocio : "+ yy_.yytext); return 52
break;
case 42: console.log("Reconocio id : "+ yy_.yytext); return 15
break;
case 43: console.log("Reconocio : "+ yy_.yytext); return 53
break;
case 44: /* skip whitespace */ 
break;
case 45:return 5
break;
case 46: console.log("Error Lexico "+yy_.yytext
                        +" linea "+yy_.yylineno
                        +" columna "+(yy_.yylloc.last_column+1));
                                      
                        
break;
}
},
rules: [/^(?:<=)/i,/^(?:>=)/i,/^(?:=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:!=)/i,/^(?:\()/i,/^(?:\/\/)/i,/^(?:\/)/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:@)/i,/^(?:\.\.)/i,/^(?:\.)/i,/^(?:\|)/i,/^(?:::)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:div\b)/i,/^(?:mod\b)/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:last\(\))/i,/^(?:position\(\))/i,/^(?:ancestor\b)/i,/^(?:attribute\b)/i,/^(?:self\b)/i,/^(?:child\b)/i,/^(?:descendant\b)/i,/^(?:following\b)/i,/^(?:sibling\b)/i,/^(?:namespace\b)/i,/^(?:parent\b)/i,/^(?:preceding\b)/i,/^(?:text\(\))/i,/^(?:node\(\))/i,/^(?:last\(\))/i,/^(?:position\(\))/i,/^(?:[0-9]+(\.[0-9]+)?\b)/i,/^(?:([0-9]+))/i,/^(?:([a-zñA-ZÑ_][a-zñA-ZÑ0-9_]*))/i,/^(?:(("((\\([\'\"\\ntr]))|([^\"\\]+))*")))/i,/^(?:[\s\r\n\t])/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (true) {
exports.parser = gramatica;
exports.Parser = gramatica.Parser;
exports.parse = function () { return gramatica.parse.apply(gramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = __webpack_require__(/*! fs */ 1).readFileSync(__webpack_require__(/*! path */ 2).normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
  exports.main(process.argv.slice(1));
}
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "YuTi")(module)))

/***/ }),

/***/ "mXYb":
/*!***********************************!*\
  !*** ./src/clases/Controlador.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Controlador; });
/* harmony import */ var _GeneradorC3D_GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneradorC3D/GeneradorC3D */ "laoz");

class Controlador {
    constructor() {
        this.errores = new Array();
        this.consola = "";
        this.cuerpo;
        this.idlast = "";
        this.position = 0;
        this.acceso = 1;
        this.generador = _GeneradorC3D_GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
    }
    append(consola) {
        this.consola += consola + "\n";
    }
    graficar_ts(controlador, ts) {
        var cuerpohtml = "<thead class=\"black white-text\"><tr><td colspan=\"6\">Tabla de Simbolos </td></tr><tr><th>Tipo</th><th>Nombre</th><th>Ambito</th><th>Valor</th></tr></thead>";
        cuerpohtml += this.cuerpo;
        return cuerpohtml;
    }
    graficarEntornos(controlador, ts, ubicacion) {
        var cuerpohtml = "";
        for (let sim of ts.tabla) {
            cuerpohtml += "<tr mdbTableCol class=\"grey lighten-1 black-text\"><th scope=\"row\">" + this.getRol(sim.sim) + "</th><td>" + sim.identificador +
                "</td>" +
                "</td><td>" + ubicacion +
                "</td><td>" + this.getValor(sim.sim) + "</tr>";
        }
        this.cuerpo = this.cuerpo + cuerpohtml;
    }
    graficar_Semantico(controlador, ts) {
        var cuerpohtml = "<thead class=\"black white-text\"><tr><td colspan=\"4\">Errores Semanticos </td></tr><tr><th>Tipo</th><th>Descripcion</th><th>Fila</th><th>Columna</th></tr></thead>";
        for (let sim of controlador.errores) {
            console.log(`Errores`);
            cuerpohtml += "<tr mdbTableCol class=\"grey lighten-1 black-text\"><th scope=\"row\">" + sim.tipo + "</th><td>" + sim.descripcion +
                "</td><td>" + sim.linea + "</td>" +
                "</td><td>" + sim.columna + "</tr>";
        }
        return cuerpohtml;
    }
    getValor(sim) {
        if (sim.valor != null) {
            return sim.valor.toString();
        }
        else {
            return '...';
        }
    }
    getTipo(sim) {
        return sim.tipo.stype.toLowerCase();
    }
    getRol(sim) {
        let rol = '';
        switch (sim.simbolo) {
            case 1:
                rol = "objeto";
                break;
            case 2:
                rol = "identificador";
                break;
            case 3:
                rol = "metodo";
                break;
            case 4:
                rol = "vector";
                break;
            case 5:
                rol = "lista";
                break;
            case 6:
                rol = "parametro";
                break;
        }
        return rol;
    }
    getAmbito() {
        return 'global';
    }
    parametros(sim) {
        if (sim.lista_params != undefined) {
            return sim.lista_params.length;
        }
        else {
            return "...";
        }
    }
}


/***/ }),

/***/ "mcIB":
/*!*********************************************!*\
  !*** ./src/Clases/Expreciones/Primitivo.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Primitivo; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");
/* harmony import */ var _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TablaSimbolos/Tipo */ "lKex");
/* harmony import */ var _retorno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retorno */ "munq");



class Primitivo {
    constructor(primitivo, line, columna, nodo) {
        this.primitivo = primitivo;
        this.linea = line;
        this.columan = columna;
        this.nodo = nodo;
    }
    getTipo(controlador, ts) {
        let valor = this.getValor(controlador, ts);
        if (typeof valor == 'number') {
            return _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].DOBLE;
        }
        else if (typeof valor == 'string') {
            return _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].CADENA;
        }
        else if (typeof valor == 'boolean') {
            return _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].BOOLEANO;
        }
    }
    getValor(controlador, ts) {
        return this.primitivo;
    }
    getvalor3d(controlador, ts) {
        let valor = this.getValor(controlador, ts);
        const generator = controlador.generador;
        if (typeof valor == 'number') {
            return new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](this.primitivo, false, new _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("DOBLE"));
        }
        else if (typeof valor == 'string') {
            const temp = generator.newTemporal();
            generator.genAsignacion(temp, 'h');
            for (let i = 0; i < valor.length; i++) {
                generator.genSetHeap('h', valor.charCodeAt(i));
                generator.avanzarHeap();
            }
            generator.genSetHeap('h', '-1');
            generator.avanzarHeap();
            return new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](temp, true, new _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("STRING"));
        }
        else if (typeof valor == 'boolean') {
            return _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["tipo"].BOOLEANO;
        }
    }
    limpiar() {
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("Primitivo", "");
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](this.primitivo.toString(), ""));
        return padre;
    }
}


/***/ }),

/***/ "munq":
/*!*******************************************!*\
  !*** ./src/Clases/Expreciones/retorno.ts ***!
  \*******************************************/
/*! exports provided: retorno */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retorno", function() { return retorno; });
class retorno {
    constructor(valor, istemp, tipo) {
        this.valor = valor;
        this.istemp = istemp;
        this.tipo = tipo;
        this.lblTrue = this.lblFalse = '';
    }
    getvalor3d() {
        return this.valor;
    }
}


/***/ }),

/***/ "n/3T":
/*!****************************************!*\
  !*** ./src/Clases/Expreciones/last.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return last; });
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");
/* harmony import */ var _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TablaSimbolos/Tipo */ "lKex");
/* harmony import */ var _retorno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retorno */ "munq");



class last {
    constructor() {
    }
    getvalor3d(controlador, ts) {
        let cont = 0;
        for (let informacion of ts.tabla) {
            if (informacion.identificador == controlador.idlast) {
                cont++;
            }
        }
        return new _retorno__WEBPACK_IMPORTED_MODULE_2__["retorno"](cont + "", false, new _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_1__["default"]("DOBLE"));
    }
    getTipo(controlador, ts) {
    }
    getValor(controlador, ts) {
        let cont = 0;
        for (let informacion of ts.tabla) {
            if (informacion.identificador == controlador.idlast) {
                cont++;
            }
        }
        return cont;
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("LAST();", "");
        return padre;
    }
    limpiar() {
    }
}


/***/ }),

/***/ "pkUk":
/*!********************************************!*\
  !*** ./src/clases/GeneradorC3D/Nativas.ts ***!
  \********************************************/
/*! exports provided: Nativas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nativas", function() { return Nativas; });
/* harmony import */ var _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneradorC3D */ "laoz");

class Nativas {
    generarNativas() {
        this.nativa_print_str();
        //this.nativa_print_integer();
        this.nativa_compararIgual_str_str();
        // this.nativa_compararNoIgual_str_str();
        //this.nativa_ToUpperCase();
        //this.nativa_ToLowerCase();
        this.nativa_concat_str_str();
        //this.nativa_concat_dbl_str();
        //  this.nativa_concat_str_dbl();
        this.nativa_concat_int_str();
        this.nativa_concat_str_int();
        //this.nativa_concat_str_bol();
        // this.nativa_concat_bol_str();
        //this.nativa_lenght_str();
        return _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia().getNativas();
    }
    nativa_lenght_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let next = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_lenght_str');
        gen.isFunc = '\t';
        gen.genExpresion(t0, 'p', '1', '+');
        gen.genGetStack(t1, t0);
        gen.genAsignacion(t3, '0');
        gen.genLabel(next);
        gen.genGetHeap(t2, t1);
        gen.genIf(t2, '-1', '==', fin);
        gen.genExpresion(t3, t3, '1', '+');
        gen.genExpresion(t1, t1, '1', '+');
        gen.genGoto(next);
        gen.genLabel(fin);
        gen.genSetStack('p', t3);
        gen.genCode('return;');
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t0);
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
    }
    nativa_print_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let next = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_print_str');
        gen.isFunc = '\t';
        gen.genGetStack(t1, 'p');
        gen.genLabel(next);
        gen.genGetHeap(t2, t1);
        gen.genIf(t2, '-1', '==', fin);
        gen.genPrint('c', t2);
        gen.genExpresion(t1, t1, '1', '+');
        gen.genGoto(next);
        gen.genLabel(fin);
        gen.genCode('return;');
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
    }
    /*
        nativa_print_integer() {
            const gen = GeneradorC3D.getInstancia();
            let t1 = gen.newTemporal();
            let t2 = gen.newTemporal();
            let t3 = gen.newTemporal();
            let inicio = gen.newLabel();
            let nextPos = gen.newLabel();
            let nextPrt = gen.newLabel();
            let fin = gen.newLabel();
    
            gen.genFuncion('nativa_print_integer');
            gen.isFunc = '\t';
            gen.genGetStack(t1, 'p');
            gen.genIf(t1, '0', '>=', inicio);
            gen.genPrint('c', '45');
            gen.genExpresion(t1, t1, '-1', '*');
            gen.genLabel(inicio);
            gen.genAsignacion(t3, 'p');
            gen.genSetStack(t3, '-1');
            gen.genExpresion(t3, t3, '1', '+');
            gen.genLabel(nextPos);
            gen.genIf(t1, '0', '==', nextPrt);
            gen.genCode(`${t2} = fmod(${t1}, 10);`);
            gen.genSetStack(t3, t2);
            gen.genExpresion(t3, t3, '1', '+');
            gen.genExpresion(t1, t1, '10', '/');
            gen.genGoto(nextPos);
            gen.genLabel(nextPrt);
            gen.genExpresion(t3, t3, '1', '-');
            gen.genGetStack(t1, t3);
            gen.genIf(t1, '-1', '==', fin);
            gen.genPrint('i', t1);
            gen.genGoto(nextPrt);
            gen.genLabel(fin);
            gen.genCode('return;');
            gen.genEndFuncion();
            gen.isFunc = '';
            gen.freeTemp(t1);
            gen.freeTemp(t2);
            gen.freeTemp(t3);
        }*/
    nativa_compararIgual_str_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let c1 = gen.newTemporal();
        let c2 = gen.newTemporal();
        let lblfalse = gen.newLabel();
        let lbltrue = gen.newLabel();
        let l2 = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_compararIgual_str_str');
        gen.isFunc = '\t';
        gen.genExpresion(t0, 'p', '1', '+');
        gen.genGetStack(p1, t0);
        gen.genExpresion(t0, 'p', '2', '+');
        gen.genGetStack(p2, t0);
        gen.genIf(p1, '-1', '==', l2);
        gen.genIf(p2, '-1', '==', lblfalse);
        gen.genGoto(inicio);
        gen.genLabel(l2);
        gen.genIf(p2, '-1', '==', lbltrue);
        gen.genGoto(lblfalse);
        gen.genLabel(inicio);
        gen.genGetHeap(c1, p1);
        gen.genGetHeap(c2, p2);
        gen.genLabel(nextPos);
        gen.genIf(c1, c2, '!=', lblfalse);
        gen.genIf(c1, '-1', '==', lbltrue);
        gen.genExpresion(p1, p1, '1', '+');
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGetHeap(c1, p1);
        gen.genGetHeap(c2, p2);
        gen.genGoto(nextPos);
        gen.genLabel(lbltrue);
        gen.genSetStack('p', '1');
        gen.genGoto(fin);
        gen.genLabel(lblfalse);
        gen.genSetStack('p', '0');
        gen.genLabel(fin);
        gen.genCode('return;');
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(p1);
        gen.freeTemp(p2);
        gen.freeTemp(c1);
        gen.freeTemp(c2);
    }
    nativa_compararNoIgual_str_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t1 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let c1 = gen.newTemporal();
        let c2 = gen.newTemporal();
        let lblfalse = gen.newLabel();
        let lbltrue = gen.newLabel();
        let l2 = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_compararNoIgual_str_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genIf(p1, '-1', '==', l2);
        gen.genIf(p2, '-1', '==', lbltrue);
        gen.genGoto(inicio);
        gen.genLabel(l2);
        gen.genIf(p2, '-1', '==', lblfalse);
        gen.genGoto(lbltrue);
        gen.genLabel(inicio);
        gen.genGetHeap(c1, p1);
        gen.genGetHeap(c2, p2);
        gen.genLabel(nextPos);
        gen.genIf(c1, c2, '!=', lbltrue);
        gen.genIf(c1, '-1', '==', lblfalse);
        gen.genExpresion(p1, p1, '1', '+');
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGetHeap(c1, p1);
        gen.genGetHeap(c2, p2);
        gen.genGoto(nextPos);
        gen.genLabel(lbltrue);
        gen.genSetStack('p', '1');
        gen.genGoto(fin);
        gen.genLabel(lblfalse);
        gen.genSetStack('p', '0');
        gen.genLabel(fin);
        gen.genCode('return;');
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
        gen.freeTemp(c1);
        gen.freeTemp(c2);
    }
    nativa_ToUpperCase() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let t4 = gen.newTemporal();
        let nextPos = gen.newLabel();
        let setChar = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_ToUpperCase');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(t2, t1); // carga la referencia del string
        gen.genAsignacion(t3, 'h'); // inicio de posicion vacia del heap
        gen.genLabel(nextPos);
        gen.genGetHeap(t4, t2);
        gen.genIf(t4, '-1', '==', fin);
        gen.genIf(t4, '97', '<', setChar);
        gen.genIf(t4, '122', '>', setChar);
        gen.genExpresion(t4, t4, '32', '-');
        gen.genLabel(setChar);
        gen.genSetHeap('h', t4);
        gen.avanzarHeap();
        gen.genExpresion(t2, t2, '1', '+');
        gen.genGoto(nextPos);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t3);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
        gen.freeTemp(t4);
    }
    nativa_ToLowerCase() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let t4 = gen.newTemporal();
        let nextPos = gen.newLabel();
        let setChar = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_ToLowerCase');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(t2, t1); // carga la referencia del string
        gen.genAsignacion(t3, 'h'); // inicio de posicion vacia del heap
        gen.genLabel(nextPos);
        gen.genGetHeap(t4, t2);
        gen.genIf(t4, '-1', '==', fin);
        gen.genIf(t4, '65', '<', setChar);
        gen.genIf(t4, '90', '>', setChar);
        gen.genExpresion(t4, t4, '32', '+');
        gen.genLabel(setChar);
        gen.genSetHeap('h', t4);
        gen.avanzarHeap();
        gen.genExpresion(t2, t2, '1', '+');
        gen.genGoto(nextPos);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t3);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
        gen.freeTemp(t4);
    }
    nativa_concat_str_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let str1 = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_str_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t1, 'h');
        gen.genLabel(str1);
        gen.genGetHeap(t2, p1);
        gen.genIf(t2, '-1', '==', str2);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '1', '+');
        gen.genGoto(str1);
        gen.genLabel(str2);
        gen.genGetHeap(t2, p2);
        gen.genIf(t2, '-1', '==', fin);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGoto(str2);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t1);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
    nativa_concat_int_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let validar = gen.newLabel();
        let str1 = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_int_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t0, 'h');
        gen.genIf(p1, '0', '>=', inicio);
        gen.genSetHeap('h', '45');
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '-1', '*');
        gen.genLabel(inicio);
        gen.genAsignacion(t1, '0');
        gen.genLabel(nextPos);
        gen.genIf(p1, '0', '==', validar);
        gen.genExpresion(t1, t1, '10', '*');
        gen.genCode(`${t2} = fmod(${p1}, 10);`);
        //gen.genExpresion(t2, '(int)' + p1, '10', '%');
        gen.genExpresion(t1, t1, t2, '+');
        gen.genExpresion(p1, p1, '10', '/');
        gen.genCode(p1 + ' = (int)' + p1 + ';');
        gen.genGoto(nextPos);
        gen.genLabel(validar);
        gen.genIf(t1, '0', '!=', str1);
        gen.genSetHeap('h', '48');
        gen.avanzarHeap();
        gen.genLabel(str1);
        gen.genIf(t1, '0', '==', str2);
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        //gen.genExpresion(t2, '(int)' + t1, '10', '%');
        gen.genExpresion(t2, t2, '48', '+');
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(t1, t1, '10', '/');
        gen.genCode(t1 + ' = (int)' + t1 + ';');
        gen.genGoto(str1);
        gen.genLabel(str2);
        gen.genGetHeap(t2, p2);
        gen.genIf(t2, '-1', '==', fin);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGoto(str2);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
    nativa_concat_str_int() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let pre = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let validar = gen.newLabel();
        let str1 = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_str_int');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t0, 'h');
        gen.genLabel(str2);
        gen.genGetHeap(t2, p1);
        gen.genIf(t2, '-1', '==', pre);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '1', '+');
        gen.genGoto(str2);
        gen.genLabel(pre);
        gen.genIf(p2, '0', '>=', inicio);
        gen.genSetHeap('h', '45');
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '-1', '*');
        gen.genLabel(inicio);
        gen.genAsignacion(t1, '0');
        gen.genLabel(nextPos);
        gen.genIf(p2, '0', '==', validar);
        gen.genExpresion(t1, t1, '10', '*');
        gen.genCode(`${t2} = fmod(${p2}, 10);`);
        //gen.genExpresion(t2, '(int)' + p2, '10', '%');
        gen.genExpresion(t1, t1, t2, '+');
        gen.genExpresion(p2, p2, '10', '/');
        gen.genCode(p2 + ' = (int)' + p2 + ';');
        gen.genGoto(nextPos);
        gen.genLabel(validar);
        gen.genIf(t1, '0', '!=', str1);
        gen.genSetHeap('h', '48');
        gen.avanzarHeap();
        gen.genLabel(str1);
        gen.genIf(t1, '0', '==', fin);
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        //gen.genExpresion(t2, '(int)' + t1, '10', '%');
        gen.genExpresion(t2, t2, '48', '+');
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(t1, t1, '10', '/');
        gen.genCode(t1 + ' = (int)' + t1 + ';');
        gen.genGoto(str1);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
    nativa_concat_dbl_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let t4 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let pre = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let validar = gen.newLabel();
        let str1 = gen.newLabel();
        let strd = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_dbl_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t0, 'h');
        gen.genIf(p1, '0', '>=', pre);
        gen.genSetHeap('h', '45');
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '-1', '*');
        gen.genLabel(pre);
        gen.genCode(`${t1} = (int)${p1};`);
        //gen.genCode(`${t2} = fmod(${p1}, 1);`);
        gen.genAsignacion(t3, '0');
        gen.genLabel(inicio);
        gen.genIf(t1, '0', '==', validar);
        gen.genExpresion(t3, t3, '10', '*');
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        gen.genExpresion(t3, t3, t2, '+');
        gen.genExpresion(t1, t1, '10', '/');
        gen.genCode(`${t1} = (int)${t1};`);
        gen.genGoto(inicio);
        gen.genLabel(validar);
        gen.genIf(t3, '0', '!=', nextPos);
        gen.genSetHeap('h', '48');
        gen.avanzarHeap();
        gen.genLabel(nextPos);
        gen.genIf(t3, '0', '==', str1);
        gen.genCode(`${t1} = fmod(${t3}, 10);`);
        gen.genExpresion(t3, t3, '10', '/');
        gen.genCode(`${t3} = (int)${t3};`);
        gen.genExpresion(t2, t1, '48', '+');
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genGoto(nextPos);
        gen.genLabel(str1);
        gen.genSetHeap('h', '46');
        gen.avanzarHeap();
        gen.genAsignacion(t3, '0');
        gen.genCode(`${t1} = fmod(${p1}, 1);`);
        gen.genLabel(strd);
        gen.genIf(t3, '3', '==', str2);
        gen.genExpresion(t1, t1, '10', '*');
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        gen.genCode(`${t2} = (int)${t2};`);
        gen.genExpresion(t4, t2, '48', '+');
        gen.genSetHeap('h', t4);
        gen.avanzarHeap();
        gen.genExpresion(t3, t3, '1', '+');
        gen.genGoto(strd);
        gen.genLabel(str2);
        gen.genGetHeap(t2, p2);
        gen.genIf(t2, '-1', '==', fin);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGoto(str2);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
        gen.freeTemp(t4);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
    nativa_concat_str_dbl() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let t2 = gen.newTemporal();
        let t3 = gen.newTemporal();
        let t4 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let pre = gen.newLabel();
        let sig = gen.newLabel();
        let inicio = gen.newLabel();
        let nextPos = gen.newLabel();
        let validar = gen.newLabel();
        let str1 = gen.newLabel();
        let strd = gen.newLabel();
        let str2 = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_str_dbl');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t0, 'h');
        gen.genLabel(str2);
        gen.genGetHeap(t2, p1);
        gen.genIf(t2, '-1', '==', sig);
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '1', '+');
        gen.genGoto(str2);
        gen.genLabel(sig);
        gen.genIf(p2, '0', '>=', pre);
        gen.genSetHeap('h', '45');
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '-1', '*');
        gen.genLabel(pre);
        gen.genCode(`${t1} = (int)${p2};`);
        //gen.genCode(`${t2} = fmod(${p2}, 1);`);
        gen.genAsignacion(t3, '0');
        gen.genLabel(inicio);
        gen.genIf(t1, '0', '==', validar);
        gen.genExpresion(t3, t3, '10', '*');
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        gen.genExpresion(t3, t3, t2, '+');
        gen.genExpresion(t1, t1, '10', '/');
        gen.genCode(`${t1} = (int)${t1};`);
        gen.genGoto(inicio);
        gen.genLabel(validar);
        gen.genIf(t3, '0', '!=', nextPos);
        gen.genSetHeap('h', '48');
        gen.avanzarHeap();
        gen.genLabel(nextPos);
        gen.genIf(t3, '0', '==', str1);
        gen.genCode(`${t1} = fmod(${t3}, 10);`);
        gen.genExpresion(t3, t3, '10', '/');
        gen.genCode(`${t3} = (int)${t3};`);
        gen.genExpresion(t2, t1, '48', '+');
        gen.genSetHeap('h', t2);
        gen.avanzarHeap();
        gen.genGoto(nextPos);
        gen.genLabel(str1);
        gen.genSetHeap('h', '46');
        gen.avanzarHeap();
        gen.genAsignacion(t3, '0');
        gen.genCode(`${t1} = fmod(${p2}, 1);`);
        gen.genLabel(strd);
        gen.genIf(t3, '3', '==', fin);
        gen.genExpresion(t1, t1, '10', '*');
        gen.genCode(`${t2} = fmod(${t1}, 10);`);
        gen.genCode(`${t2} = (int)${t2};`);
        gen.genExpresion(t4, t2, '48', '+');
        gen.genSetHeap('h', t4);
        gen.avanzarHeap();
        gen.genExpresion(t3, t3, '1', '+');
        gen.genGoto(strd);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(t2);
        gen.freeTemp(t3);
        gen.freeTemp(t4);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
    nativa_concat_str_bol() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let str1 = gen.newLabel();
        let bol = gen.newLabel();
        let lblf = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_str_bol');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t0, 'h');
        gen.genLabel(str1);
        gen.genGetHeap(t1, p1);
        gen.genIf(t1, '-1', '==', bol);
        gen.genSetHeap('h', t1);
        gen.avanzarHeap();
        gen.genExpresion(p1, p1, '1', '+');
        gen.genGoto(str1);
        gen.genLabel(bol);
        gen.genIf(p2, '1', '!=', lblf);
        gen.genSetHeap('h', '116');
        gen.avanzarHeap();
        gen.genSetHeap('h', '114');
        gen.avanzarHeap();
        gen.genSetHeap('h', '117');
        gen.avanzarHeap();
        gen.genSetHeap('h', '101');
        gen.avanzarHeap();
        gen.genGoto(fin);
        gen.genLabel(lblf);
        gen.genSetHeap('h', '102');
        gen.avanzarHeap();
        gen.genSetHeap('h', '97');
        gen.avanzarHeap();
        gen.genSetHeap('h', '108');
        gen.avanzarHeap();
        gen.genSetHeap('h', '115');
        gen.avanzarHeap();
        gen.genSetHeap('h', '101');
        gen.avanzarHeap();
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
    nativa_concat_bol_str() {
        const gen = _GeneradorC3D__WEBPACK_IMPORTED_MODULE_0__["GeneradorC3D"].getInstancia();
        let t0 = gen.newTemporal();
        let t1 = gen.newTemporal();
        let p1 = gen.newTemporal();
        let p2 = gen.newTemporal();
        let str2 = gen.newLabel();
        let lblf = gen.newLabel();
        let fin = gen.newLabel();
        gen.genFuncion('nativa_concat_bol_str');
        gen.isFunc = '\t';
        gen.genExpresion(t1, 'p', '1', '+');
        gen.genGetStack(p1, t1);
        gen.genExpresion(t1, 'p', '2', '+');
        gen.genGetStack(p2, t1);
        gen.genAsignacion(t0, 'h');
        gen.genIf(p1, '1', '!=', lblf);
        gen.genSetHeap('h', '116');
        gen.avanzarHeap();
        gen.genSetHeap('h', '114');
        gen.avanzarHeap();
        gen.genSetHeap('h', '117');
        gen.avanzarHeap();
        gen.genSetHeap('h', '101');
        gen.avanzarHeap();
        gen.genGoto(str2);
        gen.genLabel(lblf);
        gen.genSetHeap('h', '102');
        gen.avanzarHeap();
        gen.genSetHeap('h', '97');
        gen.avanzarHeap();
        gen.genSetHeap('h', '108');
        gen.avanzarHeap();
        gen.genSetHeap('h', '115');
        gen.avanzarHeap();
        gen.genSetHeap('h', '101');
        gen.avanzarHeap();
        gen.genLabel(str2);
        gen.genGetHeap(t1, p2);
        gen.genIf(t1, '-1', '==', fin);
        gen.genSetHeap('h', t1);
        gen.avanzarHeap();
        gen.genExpresion(p2, p2, '1', '+');
        gen.genGoto(str2);
        gen.genLabel(fin);
        gen.genSetHeap('h', '-1');
        gen.avanzarHeap();
        gen.genSetStack('p', t0);
        gen.genEndFuncion();
        gen.isFunc = '';
        gen.freeTemp(t1);
        gen.freeTemp(p1);
        gen.freeTemp(p2);
    }
}


/***/ }),

/***/ "qYeL":
/*!********************************************!*\
  !*** ./src/Clases/Expreciones/Ternario.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ternario; });
/* harmony import */ var _AST_Errores__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Errores */ "zZ//");
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");


class Ternario {
    constructor(condicion, verdadero, falso, linea, columna) {
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
        this.linea = linea;
        this.columna = columna;
    }
    getvalor3d(controlador, ts) {
        throw new Error("Method not implemented.");
    }
    getTipo(controlador, ts) {
        let valor_condicion = this.condicion.getValor(controlador, ts);
        if (typeof valor_condicion == 'boolean') {
            return valor_condicion ? this.verdadero.getTipo(controlador, ts) : this.falso.getTipo(controlador, ts);
        }
        else {
            let error = new _AST_Errores__WEBPACK_IMPORTED_MODULE_0__["default"]('Semantico', `La condicion del ternario no es booleana.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error Semantico : La condicion del ternario no es booleana. En la linea ${this.linea} y columan ${this.columna}`);
        }
    }
    limpiar() {
    }
    getValor(controlador, ts) {
        let valor_condicion = this.condicion.getValor(controlador, ts);
        if (typeof valor_condicion == 'boolean') {
            return valor_condicion ? this.verdadero.getValor(controlador, ts) : this.falso.getValor(controlador, ts);
        }
        else {
            let error = new _AST_Errores__WEBPACK_IMPORTED_MODULE_0__["default"]('Semantico', `La condicion del ternario no es booleana.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error Semantico : La condicion del ternario no es booleana. En la linea ${this.linea} y columan ${this.columna}`);
        }
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_1__["default"]("Ternario", "");
        padre.AddHijo(this.condicion.recorrer());
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_1__["default"](":", ""));
        padre.AddHijo(this.falso.recorrer());
        padre.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_1__["default"]("?", ""));
        padre.AddHijo(this.verdadero.recorrer());
        return padre;
    }
}


/***/ }),

/***/ "sedW":
/*!*********************************************************!*\
  !*** ./src/Clases/Instrucciones/SentenciaCiclos/For.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return For; });
/* harmony import */ var src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/clases/AST/Nodo */ "XRm8");
/* harmony import */ var src_clases_TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/clases/TablaSimbolos/TablaSimbolos */ "arwD");
/* harmony import */ var _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SentenciaTransferencia/Break */ "L2hm");
/* harmony import */ var _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SentenciaTransferencia/continuar */ "vyXG");
/* harmony import */ var _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SentenciaTransferencia/retornar */ "uHk2");





class For {
    constructor(condicion, lista_instrucciones, inicio, fin, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.inicio = inicio;
        this.fin = fin;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador, ts) {
        let ts_for = new src_clases_TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["TablaSimbolos"](ts);
        this.inicio.ejecutar(controlador, ts_for);
        let valor_condicion = this.condicion.getValor(controlador, ts_for);
        if (typeof valor_condicion == 'boolean') {
            while (this.condicion.getValor(controlador, ts_for)) {
                let ts_local = new src_clases_TablaSimbolos_TablaSimbolos__WEBPACK_IMPORTED_MODULE_1__["TablaSimbolos"](ts_for);
                for (let ins of this.lista_instrucciones) {
                    let res = ins.ejecutar(controlador, ts_local);
                    if (ins instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__["default"] || res instanceof _SentenciaTransferencia_Break__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                        controlador.graficarEntornos(controlador, ts_local, " (While)");
                        return null;
                    }
                    else {
                        if (ins instanceof _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_3__["default"] || res instanceof _SentenciaTransferencia_continuar__WEBPACK_IMPORTED_MODULE_3__["default"]) {
                            break;
                        }
                        else {
                            if (ins instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_4__["default"] || res instanceof _SentenciaTransferencia_retornar__WEBPACK_IMPORTED_MODULE_4__["default"]) {
                                controlador.graficarEntornos(controlador, ts_local, " (While)");
                                return res;
                            }
                        }
                    }
                    //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                }
                controlador.graficarEntornos(controlador, ts_local, " (FOR)");
                this.fin.ejecutar(controlador, ts_for);
            }
        }
        controlador.graficarEntornos(controlador, ts_for, " (FOR)");
    }
    recorrer() {
        let padre = new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("CICLO", "");
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("for", ""));
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("(", ""));
        padre.AddHijo(this.inicio.recorrer());
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](";", ""));
        padre.AddHijo(this.condicion.recorrer());
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](";", ""));
        padre.AddHijo(this.fin.recorrer());
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"](")", ""));
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("{", ""));
        for (let ins of this.lista_instrucciones) {
            padre.AddHijo(ins.recorrer());
        }
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("}", ""));
        return padre;
    }
}


/***/ }),

/***/ "uHk2":
/*!*********************************************************************!*\
  !*** ./src/Clases/Instrucciones/SentenciaTransferencia/retornar.ts ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return retornar; });
/* harmony import */ var src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/clases/AST/Nodo */ "XRm8");

class retornar {
    constructor(valor) {
        this.valor = valor;
    }
    ejecutar(controlador, ts) {
        if (this.valor != null) {
            return this.valor.getValor(controlador, ts);
        }
        else {
            return null;
        }
    }
    recorrer() {
        let padre = new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("RETURN", "");
        padre.AddHijo(new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("return", ""));
        if (this.valor != null) {
            padre.AddHijo(this.valor.recorrer());
        }
        return padre;
    }
}


/***/ }),

/***/ "vu0p":
/*!***********************************************************!*\
  !*** ./src/Clases/Expreciones/Operaciones/Operaciones.ts ***!
  \***********************************************************/
/*! exports provided: Operador, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Operador", function() { return Operador; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Operaciones; });
var Operador;
(function (Operador) {
    Operador[Operador["SUMA"] = 0] = "SUMA";
    Operador[Operador["RESTA"] = 1] = "RESTA";
    Operador[Operador["MULTI"] = 2] = "MULTI";
    Operador[Operador["DIV"] = 3] = "DIV";
    Operador[Operador["POT"] = 4] = "POT";
    Operador[Operador["MODULO"] = 5] = "MODULO";
    Operador[Operador["MENORQUE"] = 6] = "MENORQUE";
    Operador[Operador["MAYORQUE"] = 7] = "MAYORQUE";
    Operador[Operador["AND"] = 8] = "AND";
    Operador[Operador["NOT"] = 9] = "NOT";
    Operador[Operador["UNARIO"] = 10] = "UNARIO";
    Operador[Operador["IGUALIGUAL"] = 11] = "IGUALIGUAL";
    Operador[Operador["MAYORIGUAL"] = 12] = "MAYORIGUAL";
    Operador[Operador["DIFERENTE"] = 13] = "DIFERENTE";
    Operador[Operador["MENORIGUAL"] = 14] = "MENORIGUAL";
    Operador[Operador["OR"] = 15] = "OR";
})(Operador || (Operador = {}));
class Operaciones {
    constructor(exp1, operador, exp2, linea, columna, expU) {
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.columna = columna;
        this.linea = linea;
        this.expU = expU;
        this.op = operador;
        this.operador = this.getOperador(operador);
        this.lblFalse = this.lblTrue = '';
    }
    getvalor3d(controlador, ts) {
        throw new Error("Method not implemented.");
    }
    limpiar() {
    }
    getOperador(op) {
        if (op == '+') {
            return Operador.SUMA;
        }
        else if (op == '-') {
            return Operador.RESTA;
        }
        else if (op == '<') {
            return Operador.MENORQUE;
        }
        else if (op == '*') {
            return Operador.MULTI;
        }
        else if (op == '/') {
            return Operador.DIV;
        }
        else if (op == '>') {
            return Operador.MAYORQUE;
        }
        else if (op == '&&') {
            return Operador.AND;
        }
        else if (op == '!') {
            return Operador.NOT;
        }
        else if (op == 'UNARIO') {
            return Operador.UNARIO;
        }
        else if (op == '==') {
            return Operador.IGUALIGUAL;
        }
        else if (op == '>=') {
            return Operador.MAYORIGUAL;
        }
        else if (op == '^') {
            return Operador.POT;
        }
        else if (op == '%') {
            return Operador.MODULO;
        }
        else if (op == '!=') {
            return Operador.DIFERENTE;
        }
        else if (op == '<=') {
            return Operador.MENORIGUAL;
        }
        else if (op == '||') {
            return Operador.OR;
        }
    }
    getTipo(controlador, ts) {
        throw new Error("Method not implemented.");
    }
    getValor(controlador, ts) {
        throw new Error("Method not implemented.");
    }
    recorrer() {
        throw new Error("Method not implemented.");
    }
}


/***/ }),

/***/ "vyXG":
/*!**********************************************************************!*\
  !*** ./src/Clases/Instrucciones/SentenciaTransferencia/continuar.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Continuar; });
/* harmony import */ var src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/clases/AST/Nodo */ "XRm8");

class Continuar {
    constructor() {
    }
    ejecutar(controlador, ts) {
        return this;
    }
    recorrer() {
        let padre = new src_clases_AST_Nodo__WEBPACK_IMPORTED_MODULE_0__["default"]("CONTUNUE", "");
        return padre;
    }
}


/***/ }),

/***/ "wLeh":
/*!**************************************!*\
  !*** ./src/Clases/AST/ListaError.ts ***!
  \**************************************/
/*! exports provided: LErrores */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LErrores", function() { return LErrores; });
/* harmony import */ var _Analizar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Analizar */ "/l+n");
/* harmony import */ var _Errores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Errores */ "zZ//");


class LErrores {
    constructor(tipo, descripcion, analizador, linea, columna) {
        console.log("hay un error");
        _Analizar__WEBPACK_IMPORTED_MODULE_0__["errorLex"].push(new _Errores__WEBPACK_IMPORTED_MODULE_1__["default"](tipo, descripcion, linea, columna, analizador));
        console.log(_Analizar__WEBPACK_IMPORTED_MODULE_0__["errorLex"]);
    }
}


/***/ }),

/***/ "z8/j":
/*!********************************************!*\
  !*** ./src/clases/TablaSimbolos/ambito.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ambito; });
class ambito {
    constructor(identificador, sig) {
        this.identificador = identificador;
        this.sig = sig;
    }
}


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! codemirror/mode/javascript/javascript */ "+dQi");
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! codemirror/mode/markdown/markdown */ "lZu9");
/* harmony import */ var codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_markdown_markdown__WEBPACK_IMPORTED_MODULE_5__);






if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zWDC":
/*!*************************************************!*\
  !*** ./src/Clases/Instrucciones/Declaracion.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Declaracion; });
/* harmony import */ var _AST_Errores__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AST/Errores */ "zZ//");
/* harmony import */ var _AST_Nodo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AST/Nodo */ "Zr6O");
/* harmony import */ var _TablaSimbolos_Simbolos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TablaSimbolos/Simbolos */ "hADQ");
/* harmony import */ var _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TablaSimbolos/Tipo */ "lKex");




class Declaracion {
    constructor(type, lista_simbolos, linea, columna) {
        this.type = type;
        this.lista_simbolos = lista_simbolos;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador, ts) {
        for (let simbolo of this.lista_simbolos) {
            let variable = simbolo;
            if (ts.existeEnActual(variable.identificador)) {
                let error = new _AST_Errores__WEBPACK_IMPORTED_MODULE_0__["default"]('Semantico', `La variable ${variable.identificador} ya existe en el entorno actual.`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error Semantico : La variable ${variable.identificador} ya existe en el entorno actual. En la linea ${this.linea} y columan ${this.columna}`);
                continue;
            }
            if (variable.valor != null) {
                let valor = variable.valor.getValor(controlador, ts);
                let tipo_valor = variable.valor.getTipo(controlador, ts);
                console.log(tipo_valor, this.type.type);
                if (tipo_valor == this.type.type || (tipo_valor == _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipo"].DOBLE && this.type.type == _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipo"].ENTERO)) {
                    let nuevo_simb = new _TablaSimbolos_Simbolos__WEBPACK_IMPORTED_MODULE_2__["default"](variable.simbolo, this.type, variable.identificador, valor);
                    ts.agregar(variable.identificador, nuevo_simb);
                }
                else if (tipo_valor == _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipo"].CADENA && this.type.type == _TablaSimbolos_Tipo__WEBPACK_IMPORTED_MODULE_3__["tipo"].CARACTER) {
                    if (valor.length == 1) {
                        let nuevo_simb = new _TablaSimbolos_Simbolos__WEBPACK_IMPORTED_MODULE_2__["default"](variable.simbolo, this.type, variable.identificador, valor);
                        ts.agregar(variable.identificador, nuevo_simb);
                    }
                    else {
                        let error = new _AST_Errores__WEBPACK_IMPORTED_MODULE_0__["default"]('Semantico', `La variable ${variable.identificador} no se le puede asignar el valor \"${valor}\" por que son de distinto tipo.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Error Semantico : La variable ${variable.identificador} no se le puede asignar el valor \"${valor}\" por que son de distinto tipo. En la linea ${this.linea} y columan ${this.columna}`);
                    }
                }
                else {
                    let error = new _AST_Errores__WEBPACK_IMPORTED_MODULE_0__["default"]('Semantico', `La variable ${variable.identificador} no se le puede asignar el valor \"${valor}\" por que son de distinto tipo.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`Error Semantico : La variable ${variable.identificador} no se le puede asignar el valor \"${valor}\" por que son de distinto tipo. En la linea ${this.linea} y columan ${this.columna}`);
                }
            }
            else {
                let nuevo_simb = new _TablaSimbolos_Simbolos__WEBPACK_IMPORTED_MODULE_2__["default"](variable.simbolo, this.type, variable.identificador, null);
                ts.agregar(variable.identificador, nuevo_simb);
            }
        }
    }
    recorrer() {
        let padre = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_1__["default"]("Declaraciones", "");
        for (let simbolo of this.lista_simbolos) {
            let p = new _AST_Nodo__WEBPACK_IMPORTED_MODULE_1__["default"]("Declaracion", "");
            p.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_1__["default"](simbolo.identificador, ""));
            p.AddHijo(new _AST_Nodo__WEBPACK_IMPORTED_MODULE_1__["default"](";", ""));
            padre.AddHijo(p);
        }
        return padre;
    }
}


/***/ }),

/***/ "zZ//":
/*!***********************************!*\
  !*** ./src/Clases/AST/Errores.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Errores; });
class Errores {
    constructor(tipo, descripcion, linea, columna, analizador) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
        this.analizador = analizador;
    }
}


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map