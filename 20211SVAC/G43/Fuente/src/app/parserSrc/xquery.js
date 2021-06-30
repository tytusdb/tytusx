var c = (function(){
    var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,8],$V1=[1,9],$V2=[1,10],$V3=[1,11],$V4=[1,12],$V5=[5,19,20,21,22,23],$V6=[13,25],$V7=[12,18],$V8=[1,35],$V9=[1,37],$Va=[1,38],$Vb=[13,28,39,41],$Vc=[1,46],$Vd=[1,58],$Ve=[1,60],$Vf=[1,61],$Vg=[1,56],$Vh=[1,57],$Vi=[1,59],$Vj=[1,63],$Vk=[2,47],$Vl=[12,16,25,47,48,49,50,51,52,53,54,55,56,57],$Vm=[2,53],$Vn=[13,15,24,48,59,60];
    var parser = {trace: function trace () { },
    yy: {},
    symbols_: {"error":2,"INI":3,"ARCHIVO":4,"EOF":5,"DECLARACIONES":6,"DECLARACION":7,"DECLARACIONVARIABLE":8,"DECLARACIONFUNCION":9,"TIPO":10,"LIDS":11,"ptcoma":12,"id":13,"corizq":14,"entero":15,"corder":16,"LDECLARACIONVARIABLE":17,"coma":18,"rint":19,"rfloat":20,"rdouble":21,"rchar":22,"rvoid":23,"parizq":24,"parder":25,"BLOQUE":26,"llaveizq":27,"llaveder":28,"LINSTRUCCION":29,"INSTRUCCION":30,"ASIGNACION":31,"SI":32,"IRA":33,"ETIQUETA":34,"igual":35,"EXPASIGNACION":36,"EXPARRAY":37,"EXPBASICO":38,"rif":39,"EXPCOMPARACION":40,"rgoto":41,"dospuntos":42,"EXP":43,"EXPARITMETICO":44,"COMPARADOR":45,"ARITMETICO":46,"mas":47,"menos":48,"por":49,"div":50,"mod":51,"mayor":52,"menor":53,"mayori":54,"menori":55,"igualdad":56,"diferente":57,"EXPBASICONUMERO":58,"cadena":59,"numero":60,"$accept":0,"$end":1},
    terminals_: {2:"error",5:"EOF",12:"ptcoma",13:"id",14:"corizq",15:"entero",16:"corder",18:"coma",19:"rint",20:"rfloat",21:"rdouble",22:"rchar",23:"rvoid",24:"parizq",25:"parder",27:"llaveizq",28:"llaveder",35:"igual",39:"rif",41:"rgoto",42:"dospuntos",47:"mas",48:"menos",49:"por",50:"div",51:"mod",52:"mayor",53:"menor",54:"mayori",55:"menori",56:"igualdad",57:"diferente",59:"cadena",60:"numero"},
    productions_: [0,[3,2],[4,1],[6,2],[6,1],[7,1],[7,1],[8,3],[8,6],[17,3],[17,1],[10,1],[10,1],[10,1],[10,1],[10,1],[9,5],[11,3],[11,1],[26,2],[26,3],[29,2],[29,1],[30,2],[30,2],[30,2],[30,1],[31,3],[31,3],[32,5],[33,2],[34,2],[36,1],[36,1],[40,3],[44,3],[46,1],[46,1],[46,1],[46,1],[46,1],[45,1],[45,1],[45,1],[45,1],[45,1],[45,1],[43,1],[43,1],[37,4],[38,1],[38,2],[38,1],[58,1],[58,1],[58,1],[58,4]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
    /* this == yyval */
    
    var $0 = $$.length - 1;
    switch (yystate) {
    case 1:
    this.$=$$[$0-1]; return $$[$0-1]
    break;
    case 2: case 5: case 6: case 11: case 12: case 13: case 14: case 15: case 26: case 32: case 33: case 36: case 37: case 38: case 39: case 40: case 41: case 42: case 43: case 44: case 45: case 46: case 47: case 48:
    this.$=$$[$0]
    break;
    case 3:
    this.$=$$[$0-1]; this.$.push($$[$0])
    break;
    case 4: case 10: case 18:
    this.$=[]; this.$.push($$[$0])
    break;
    case 7:
    this.$=new cDeclaracion.DeclaracionVariable($$[$0-2], $$[$0-1])
    break;
    case 8:
    this.$=new cDeclaracion.DeclaracionArray($$[$0-5],$$[$0-4],$$[$0-2]) 
    break;
    case 9:
    this.$=$$[$0-2]; this.$.push($$[$0-1])
    break;
    case 16:
    this.$=new cDeclaracion.DeclaracionFuncion($$[$0-4],$$[$0-3],[],$$[$0])
    break;
    case 17:
    this.$=$$[$0-2]; this.$.push($$[$0])
    break;
    case 19:
    this.$=new cBloque.Bloque([])
    break;
    case 20:
    this.$=new cBloque.Bloque($$[$0-1])
    break;
    case 21:
    this.$=$$[$0-1];this.$.push($$[$0])
    break;
    case 22:
    this.$=[];this.$.push($$[$0])
    break;
    case 23: case 24: case 25:
    this.$=$$[$0-1]
    break;
    case 27:
    this.$=new cAsignacion.Asignacion($$[$0-2], $$[$0])
    break;
    case 28:
    this.$=new cAsignacion.AsignacionArray($$[$0-2], $$[$0])
    break;
    case 29:
    this.$=new cSi.Si($$[$0-2],$$[$0], false)
    break;
    case 30:
    this.$=new cSi.Ira($$[$0])
    break;
    case 31:
    this.$=new cSi.Etiqueta($$[$0-1])
    break;
    case 34:
    this.$=new cExpresion.Comparacion($$[$0-2], $$[$0-1], $$[$0])
    break;
    case 35:
    this.$=new cExpresion.Aritmetico($$[$0-2],$$[$0-1],$$[$0])
    break;
    case 49:
    this.$= new cExpresion.Arreglo($$[$0-3],$$[$0-1])
    break;
    case 50:
    this.$= $$[$0]
    break;
    case 51:
    this.$= new cExpresion.Unario($$[$0-1], $$[$0])
    break;
    case 52:
    this.$= new cExpresion.Literal('char',$$[$0])
    break;
    case 53:
    this.$= new cExpresion.Id($$[$0])
    break;
    case 54:
    this.$= new cExpresion.Literal('float',$$[$0])
    break;
    case 55:
    this.$= new cExpresion.Literal('int',$$[$0])
    break;
    case 56:
    this.$= new cExpresion.Casteo($$[$0-2], $$[$0])
    break;
    }
    },
    table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,19:$V0,20:$V1,21:$V2,22:$V3,23:$V4},{1:[3]},{5:[1,13]},{5:[2,2],7:14,8:5,9:6,10:7,19:$V0,20:$V1,21:$V2,22:$V3,23:$V4},o($V5,[2,4]),o($V5,[2,5]),o($V5,[2,6]),{11:15,13:[1,16]},o($V6,[2,11]),o($V6,[2,12]),o($V6,[2,13]),o($V6,[2,14]),o($V6,[2,15]),{1:[2,1]},o($V5,[2,3]),{12:[1,17],18:[1,18]},o($V7,[2,18],{14:[1,19],24:[1,20]}),o($V5,[2,7]),{13:[1,21]},{15:[1,22]},{25:[1,23]},o($V7,[2,17]),{16:[1,24]},{26:25,27:[1,26]},{12:[1,27]},o($V5,[2,16]),{13:$V8,28:[1,28],29:29,30:30,31:31,32:32,33:33,34:34,37:36,39:$V9,41:$Va},o($V5,[2,8]),o($V5,[2,19]),{13:$V8,28:[1,39],30:40,31:31,32:32,33:33,34:34,37:36,39:$V9,41:$Va},o($Vb,[2,22]),{12:[1,41]},{12:[1,42]},{12:[1,43]},o($Vb,[2,26]),{14:$Vc,35:[1,44],42:[1,45]},{35:[1,47]},{24:[1,48]},{13:[1,49]},o($V5,[2,20]),o($Vb,[2,21]),o($Vb,[2,23]),o($Vb,[2,24]),o($Vb,[2,25]),{13:$Vd,15:$Ve,24:$Vf,36:50,37:54,38:53,43:51,44:52,48:$Vg,58:55,59:$Vh,60:$Vi},o($Vb,[2,31]),{13:$Vj,15:$Ve,24:$Vf,58:62,60:$Vi},{13:$Vj,15:$Ve,24:$Vf,38:64,48:$Vg,58:55,59:$Vh,60:$Vi},{13:$Vj,15:$Ve,24:$Vf,38:66,40:65,48:$Vg,58:55,59:$Vh,60:$Vi},{12:[2,30]},{12:[2,27]},{12:[2,32]},{12:[2,33]},{12:$Vk,46:67,47:[1,68],48:[1,69],49:[1,70],50:[1,71],51:[1,72]},o($Vl,[2,48]),o($Vl,[2,50]),{13:$Vj,15:$Ve,24:$Vf,38:73,48:$Vg,58:55,59:$Vh,60:$Vi},o($Vl,[2,52]),o($Vl,$Vm,{14:$Vc}),o($Vl,[2,54]),o($Vl,[2,55]),{10:74,19:$V0,20:$V1,21:$V2,22:$V3,23:$V4},{16:[1,75]},o($Vl,$Vm),{12:[2,28]},{25:[1,76]},{45:77,52:[1,78],53:[1,79],54:[1,80],55:[1,81],56:[1,82],57:[1,83]},{13:$Vj,15:$Ve,24:$Vf,38:84,48:$Vg,58:55,59:$Vh,60:$Vi},o($Vn,[2,36]),o($Vn,[2,37]),o($Vn,[2,38]),o($Vn,[2,39]),o($Vn,[2,40]),o($Vl,[2,51]),{25:[1,85]},o([12,16,25,35,47,48,49,50,51,52,53,54,55,56,57],[2,49]),{33:86,41:$Va},{13:$Vj,15:$Ve,24:$Vf,38:87,48:$Vg,58:55,59:$Vh,60:$Vi},o($Vn,[2,41]),o($Vn,[2,42]),o($Vn,[2,43]),o($Vn,[2,44]),o($Vn,[2,45]),o($Vn,[2,46]),{12:[2,35]},{13:$Vd,15:$Ve,24:$Vf,37:54,38:89,43:88,48:$Vg,58:55,59:$Vh,60:$Vi},{12:[2,29]},{25:[2,34]},o($Vl,[2,56]),o($Vl,$Vk)],
    defaultActions: {13:[2,1],49:[2,30],50:[2,27],51:[2,32],52:[2,33],64:[2,28],84:[2,35],86:[2,29],87:[2,34]},
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
    
        const cDeclaracion  = require('./AST/instrucciones/declaracion') 
        const cAsignacion   = require('./AST/instrucciones/asignacion') 
        const cSi           = require('./AST/instrucciones/si') 
        const cBloque       = require('./AST/instrucciones/bloque') 
        const cExpresion    = require('./AST/expresiones/expresion') 
        
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
    case 0:
    break;
    case 1:
    break;
    case 2:
    break;
    case 3:
    break;
    case 4:return "rprintf";
    break;
    case 5:return "rreturn";
    break;
    case 6:return "rif"; 
    break;
    case 7:return "rgoto"; 
    break;
    case 8:return "rint";
    break;
    case 9:return "rdouble";
    break;
    case 10:return "rfloat"
    break;
    case 11:return "rchar";
    break;
    case 12:return "rvoid";
    break;
    case 13:return 12;
    break;
    case 14:return 42;
    break;
    case 15:return 18;
    break;
    case 16:return 24;
    break;
    case 17:return 25;
    break;
    case 18:return 14;
    break;
    case 19:return 16;
    break;
    case 20:return 27;
    break;
    case 21:return 28;
    break;
    case 22:return 'almohadita';
    break;
    case 23:return 54;
    break;
    case 24:return 55;
    break;
    case 25:return 56;
    break;
    case 26:return 57;
    break;
    case 27:return 35;
    break;
    case 28:return 47;
    break;
    case 29:return 48;
    break;
    case 30:return 49;
    break;
    case 31:return 50;
    break;
    case 32:return 51;
    break;
    case 33:return 52;
    break;
    case 34:return 53;
    break;
    case 35:return 'and';
    break;
    case 36:return 'or';
    break;
    case 37:return 'not';
    break;
    case 38:return 13;
    break;
    case 39:return 60;
    break;
    case 40:return 15;
    break;
    case 41: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 59; 
    break;
    case 42: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 59; 
    break;
    case 43:return 5;
    break;
    case 44: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column); 
    break;
    }
    },
    rules: [/^(?:\/\/.*)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:[ \r\t]+)/i,/^(?:\n)/i,/^(?:printf\b)/i,/^(?:return\b)/i,/^(?:if\b)/i,/^(?:goto\b)/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:float\b)/i,/^(?:char\b)/i,/^(?:void\b)/i,/^(?:;)/i,/^(?::)/i,/^(?:,)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\{)/i,/^(?:\})/i,/^(?:#)/i,/^(?:>=)/i,/^(?:<=)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:=)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:>)/i,/^(?:<)/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:!)/i,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/i,/^(?:[0-9]+(\.[0-9]+)\b)/i,/^(?:[0-9]+\b)/i,/^(?:"((\\")|[^\n\"])*")/i,/^(?:'((\\')|[^\n\'])*')/i,/^(?:$)/i,/^(?:.)/i],
    conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],"inclusive":true}}
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
    exports.parser = c;
    exports.Parser = c.Parser;
    exports.parse = function () { return c.parse.apply(c, arguments); };
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