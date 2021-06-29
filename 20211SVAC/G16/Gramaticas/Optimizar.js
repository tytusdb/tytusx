/* parser generated by jison 0.4.18 */
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
var Optimizar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[14,23],$V2=[16,17],$V3=[1,32],$V4=[1,30],$V5=[1,31],$V6=[10,12,16,17,22,25,48,49,50,51,52,53,54,55,56],$V7=[2,50],$V8=[8,14],$V9=[1,55],$Va=[1,54],$Vb=[1,56],$Vc=[1,57],$Vd=[1,58],$Ve=[11,28,36,40,41,42],$Vf=[7,23],$Vg=[1,80],$Vh=[1,81],$Vi=[1,75],$Vj=[1,76],$Vk=[1,77],$Vl=[1,78],$Vm=[1,79],$Vn=[1,82],$Vo=[1,83],$Vp=[1,84],$Vq=[1,85],$Vr=[11,21,57];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"S":3,"IMPORTACIONES":4,"DECLARACIONES":5,"SENTENCIAS":6,"EOF":7,"numeral":8,"rinclude":9,"menor":10,"id":11,"mayor":12,"DECLARACIONVAR":13,"rfloat":14,"LISTAIDENTIFICADOR":15,"puntocoma":16,"coma":17,"igual":18,"CONSTANTE":19,"corizq":20,"entero":21,"corder":22,"rvoid":23,"parizq":24,"parder":25,"llaveizq":26,"SENTENCIA":27,"llaveder":28,"INSTRUCCION":29,"ASIGNACION":30,"DEFETIQUETA":31,"SENTENCIAIF":32,"SENTENCIAGOTO":33,"SENTENCIAPRINT":34,"LLAMADA":35,"rreturn":36,"OPERADOR":37,"rint":38,"dospuntos":39,"rif":40,"rgoto":41,"rprintf":42,"TIPOPRINT":43,"rchar":44,"ri":45,"rd":46,"rc":47,"mas":48,"menos":49,"por":50,"div":51,"mod":52,"menori":53,"mayori":54,"diferente":55,"igualdad":56,"decimal":57,"$accept":0,"$end":1},
terminals_: {2:"error",7:"EOF",8:"numeral",9:"rinclude",10:"menor",11:"id",12:"mayor",14:"rfloat",16:"puntocoma",17:"coma",18:"igual",20:"corizq",21:"entero",22:"corder",23:"rvoid",24:"parizq",25:"parder",26:"llaveizq",28:"llaveder",36:"rreturn",38:"rint",39:"dospuntos",40:"rif",41:"rgoto",42:"rprintf",44:"rchar",45:"ri",46:"rd",47:"rc",48:"mas",49:"menos",50:"por",51:"div",52:"mod",53:"menori",54:"mayori",55:"diferente",56:"igualdad",57:"decimal"},
productions_: [0,[3,4],[4,6],[4,5],[5,2],[5,1],[13,3],[15,3],[15,5],[15,6],[15,1],[15,3],[15,4],[6,8],[6,7],[27,2],[27,1],[29,1],[29,1],[29,1],[29,1],[29,1],[29,1],[29,2],[30,6],[30,5],[30,4],[30,10],[30,10],[31,2],[32,8],[33,3],[34,10],[35,4],[43,1],[43,1],[43,1],[37,1],[37,1],[37,1],[37,1],[37,1],[37,1],[37,1],[37,1],[37,1],[37,1],[37,1],[19,1],[19,1],[19,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$ = $$[$0-3] + "\n" + $$[$0-2] + "\n" + $$[$0-1]; return {cadena:this.$,reporte:optimizar}; 
break;
case 2:
 this.$ = $$[$0-5] + $$[$0-4] + $$[$0-3] + " " + $$[$0-2] + $$[$0-1] + $$[$0] + "\n"; 
break;
case 3:
 this.$ = $$[$0-4] + $$[$0-3] + " " + $$[$0-2] + $$[$0-1] + $$[$0] + "\n"; 
break;
case 4: case 15: case 29:
 this.$ = $$[$0-1] + $$[$0]; 
break;
case 5: case 10: case 16: case 34: case 35: case 36: case 37: case 38: case 39: case 40: case 41: case 42: case 43: case 44: case 45: case 46: case 47: case 48: case 49: case 50:
 this.$ = $$[$0]; 
break;
case 6: case 31:
 this.$ = $$[$0-2] + " " + $$[$0-1] + $$[$0] + "\n"; 
break;
case 7:
 this.$ = $$[$0-2] + $$[$0-1] + " " + $$[$0]; 
break;
case 8:
 this.$ = $$[$0-4] + $$[$0-3] + " " + $$[$0-2] + " " + $$[$0-2] + " " + $$[$0-1];
break;
case 9:
 this.$ = $$[$0-5] + $$[$0-4] + " " + $$[$0-3] + $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
case 11:
 this.$ = $$[$0-2] + " " + $$[$0-1] + " " + $$[$0]; 
break;
case 12:
 this.$ = $$[$0-3] + $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
case 13:
 this.$ = $$[$0-7] + $$[$0-6] + " " + $$[$0-5] + $$[$0-4] + $$[$0-3] + " " + $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
case 14:
 this.$ = $$[$0-6] + " " + $$[$0-5] + $$[$0-4] + $$[$0-3] + " " + $$[$0-2] + $$[$0-1] + $$[$0] + "\n\n"; 
break;
case 17: case 18: case 19: case 20: case 21: case 22:
 this.$ = "    " + $$[$0]; 
break;
case 23:
 this.$ = "    " + $$[$0-1]; 
break;
case 24:
 this.$ = optimizar.getExpresion($$[$0-5], $$[$0-3], $$[$0-2], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 25:
 this.$ = $$[$0-4] + " " + $$[$0-3] + $$[$0-2] + " " + $$[$0-1] + $$[$0] + "\n"; 
break;
case 26:
 this.$ = $$[$0-3] + " " + $$[$0-2] + " " + $$[$0-1] + $$[$0] + "\n"; 
break;
case 27:
 this.$ = $$[$0-9] + " " + $$[$0-8] + " " + $$[$0-7] + $$[$0-6] + $$[$0-5] + $$[$0-4] + $$[$0-3] + $$[$0-2] + $$[$0-1] + $$[$0] + "\n"; 
break;
case 28:
 this.$ = $$[$0-9] + $$[$0-8] + $$[$0-7] + $$[$0-6] + $$[$0-5] + $$[$0-4] + $$[$0-3] + " " + $$[$0-2] + " " + $$[$0-1] + $$[$0] + "\n"; 
break;
case 30:
 this.$ = optimizar.getInstruccion($$[$0-5], $$[$0-4], $$[$0-3], $$[$0-1], $$[$0], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 32:
 this.$ = $$[$0-9] + $$[$0-8] + $$[$0-7] + $$[$0-6] + " " + $$[$0-5] + $$[$0-4] + $$[$0-3] + $$[$0-2] + $$[$0-1] + $$[$0] + "\n"; 
break;
case 33:
 this.$ = $$[$0-3] + $$[$0-2] + $$[$0-1] + $$[$0] + "\n"; 
break;
}
},
table: [{3:1,4:2,8:[1,3]},{1:[3]},{5:4,8:[1,5],13:6,14:$V0},{9:[1,8]},{6:9,13:10,14:$V0,23:[1,11]},{9:[1,12]},o($V1,[2,5]),{11:[1,14],15:13},{10:[1,15]},{7:[1,16],23:[1,17]},o($V1,[2,4]),{11:[1,18]},{10:[1,19]},{16:[1,20],17:[1,21]},o($V2,[2,10],{18:[1,22],20:[1,23]}),{11:[1,24]},{1:[2,1]},{11:[1,25]},{24:[1,26]},{11:[1,27]},o($V1,[2,6]),{11:[1,28]},{11:$V3,19:29,21:$V4,57:$V5},{21:[1,33]},{12:[1,34]},{24:[1,35]},{25:[1,36]},{12:[1,37]},o($V2,[2,7],{18:[1,38],20:[1,39]}),o($V2,[2,11]),o($V6,[2,48]),o($V6,[2,49]),o($V6,$V7),{22:[1,40]},o($V8,[2,3]),{25:[1,41]},{26:[1,42]},o($V8,[2,2]),{11:$V3,19:43,21:$V4,57:$V5},{21:[1,44]},o($V2,[2,12]),{26:[1,45]},{11:$V9,27:46,29:47,30:48,31:49,32:50,33:51,34:52,35:53,36:$Va,40:$Vb,41:$Vc,42:$Vd},o($V2,[2,8]),{22:[1,59]},{11:$V9,27:60,29:47,30:48,31:49,32:50,33:51,34:52,35:53,36:$Va,40:$Vb,41:$Vc,42:$Vd},{11:$V9,28:[1,61],29:62,30:48,31:49,32:50,33:51,34:52,35:53,36:$Va,40:$Vb,41:$Vc,42:$Vd},o($Ve,[2,16]),o($Ve,[2,17]),o($Ve,[2,18]),o($Ve,[2,19]),o($Ve,[2,20]),o($Ve,[2,21]),o($Ve,[2,22]),{16:[1,63]},{18:[1,64],20:[1,65],24:[1,67],39:[1,66]},{24:[1,68]},{11:[1,69]},{24:[1,70]},o($V2,[2,9]),{11:$V9,28:[1,71],29:62,30:48,31:49,32:50,33:51,34:52,35:53,36:$Va,40:$Vb,41:$Vc,42:$Vd},o($Vf,[2,14]),o($Ve,[2,15]),o($Ve,[2,23]),{10:$Vg,11:[1,74],12:$Vh,19:72,21:$V4,37:73,48:$Vi,49:$Vj,50:$Vk,51:$Vl,52:$Vm,53:$Vn,54:$Vo,55:$Vp,56:$Vq,57:$V5},{24:[1,86]},o($Ve,[2,29]),{25:[1,87]},{11:$V3,19:88,21:$V4,57:$V5},{16:[1,89]},{43:90,45:[1,91],46:[1,92],47:[1,93]},o($Vf,[2,13]),{10:$Vg,12:$Vh,16:[1,95],37:94,48:$Vi,49:$Vj,50:$Vk,51:$Vl,52:$Vm,53:$Vn,54:$Vo,55:$Vp,56:$Vq},{11:$V3,19:96,21:$V4,57:$V5},o([10,12,16,48,49,50,51,52,53,54,55,56],$V7,{20:[1,97]}),o($Vr,[2,37]),o($Vr,[2,38]),o($Vr,[2,39]),o($Vr,[2,40]),o($Vr,[2,41]),o($Vr,[2,42]),o($Vr,[2,43]),o($Vr,[2,44]),o($Vr,[2,45]),o($Vr,[2,46]),o($Vr,[2,47]),{38:[1,98]},{16:[1,99]},{10:$Vg,12:$Vh,37:100,48:$Vi,49:$Vj,50:$Vk,51:$Vl,52:$Vm,53:$Vn,54:$Vo,55:$Vp,56:$Vq},o($Ve,[2,31]),{17:[1,101]},{17:[2,34]},{17:[2,35]},{17:[2,36]},{11:$V3,19:102,21:$V4,57:$V5},o($Ve,[2,26]),{16:[1,103]},{24:[1,104]},{25:[1,105]},o($Ve,[2,33]),{11:$V3,19:106,21:$V4,57:$V5},{24:[1,107]},{16:[1,108]},o($Ve,[2,25]),{38:[1,109]},{11:$V3,19:110,21:$V4,57:$V5},{25:[1,111]},{44:[1,112]},o($Ve,[2,24]),{25:[1,113]},{22:[1,114]},{33:115,41:$Vc},{25:[1,116]},{11:$V3,19:117,21:$V4,57:$V5},{18:[1,118]},{33:119,41:$Vc},{11:$V3,19:120,21:$V4,57:$V5},{22:[1,121]},{11:$V3,19:122,21:$V4,57:$V5},o($Ve,[2,30]),{25:[1,123]},{16:[1,124]},{16:[1,125]},{16:[1,126]},o($Ve,[2,27]),o($Ve,[2,28]),o($Ve,[2,32])],
defaultActions: {16:[2,1],91:[2,34],92:[2,35],93:[2,36]},
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

	var Optimizador = require('../app/Clases/Models/Optimizador.js')
    var optimizar = new Optimizador.Optimizador()
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
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/*Se ignoran comentarios unilinea*/
break;
case 1:/*Se ignoran comentarios multilinea*/
break;
case 2:return 57;
break;
case 3:return 21;
break;
case 4:return 8;
break;
case 5:return 39;
break;
case 6:return 17;
break;
case 7:return 16;
break;
case 8:return 48;
break;
case 9:return 49;
break;
case 10:return 50;
break;
case 11:return 51;
break;
case 12:return 52;
break;
case 13:return 56;
break;
case 14:return 18;
break;
case 15:return 55;
break;
case 16:return 54;
break;
case 17:return 53;
break;
case 18:return 12;
break;
case 19:return 10;
break;
case 20:return 24;
break;
case 21:return 25;
break;
case 22:return 20;
break;
case 23:return 22;
break;
case 24:return 26;
break;
case 25:return 28;
break;
case 26:return 41;
break;
case 27:return 23;
break;
case 28:return 38;
break;
case 29:return 14;
break;
case 30:return 44;
break;
case 31:return 40;
break;
case 32:return 42;
break;
case 33:return 9;
break;
case 34:return 36;
break;
case 35:return 45;
break;
case 36:return 46;
break;
case 37:return 47;
break;
case 38:/*Se ignoran*/
break;
case 39:return 11;
break;
case 40:return 7;
break;
case 41: 
break;
}
},
rules: [/^(?:(\/\/.*\r\n)|(\/\/.*\n)|(\/\/.*\n))/,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/,/^(?:[-]?[0-9]+[.][0-9]+)/,/^(?:[-]?[0-9]+)/,/^(?:#)/,/^(?::)/,/^(?:,)/,/^(?:;)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:==)/,/^(?:=)/,/^(?:<>)/,/^(?:>=)/,/^(?:<=)/,/^(?:>)/,/^(?:<)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:\{)/,/^(?:\})/,/^(?:goto\b)/,/^(?:void\b)/,/^(?:int\b)/,/^(?:float\b)/,/^(?:char\b)/,/^(?:if\b)/,/^(?:printf\b)/,/^(?:include\b)/,/^(?:return\b)/,/^(?:"%i")/,/^(?:"%d")/,/^(?:"%c")/,/^(?:[ \n\r\t]+)/,/^(?:[a-zA-Z](_|\.|[0-9A-Za-z])*)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41],"inclusive":true}}
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


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = Optimizar;
exports.Parser = Optimizar.Parser;
exports.parse = function () { return Optimizar.parse.apply(Optimizar, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}