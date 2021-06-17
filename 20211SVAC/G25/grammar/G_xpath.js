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
var G_xpath = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,9],$V1=[1,10],$V2=[1,11],$V3=[1,12],$V4=[1,13],$V5=[1,14],$V6=[1,16],$V7=[1,17],$V8=[1,18],$V9=[1,19],$Va=[1,20],$Vb=[1,21],$Vc=[5,14,15,16,17,18,19,23,25,26,27,28,29],$Vd=[5,8,14,15,16,17,18,19,23,25,26,27,28,29],$Ve=[16,17,18,19,21,22,23,25,26,27,28,29],$Vf=[1,34],$Vg=[1,48],$Vh=[1,49],$Vi=[1,44],$Vj=[1,46],$Vk=[1,47],$Vl=[16,17,18,19],$Vm=[1,53],$Vn=[1,51],$Vo=[1,52],$Vp=[1,54],$Vq=[1,55],$Vr=[21,32,33,34,35,36,38],$Vs=[32,33,34,38],$Vt=[21,32,33,34,35,38];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INICIO":3,"OR_LISTA_NODE":4,"EOF":5,"RUTA":6,"LISTA_NODE":7,"t_barra":8,"PATH":9,"NODE":10,"EXPR":11,"WILDCARD":12,"AXES":13,"t_doble_diagonal":14,"t_diagonal":15,"StringLiteral":16,"t_arroba":17,"t_doble_punto":18,"t_punto":19,"PREDICATES":20,"t_multiplicacion":21,"node":22,"ancestor":23,"t_doble_dos_puntos":24,"t_ancestor_or_self":25,"t_attribute":26,"t_child":27,"t_descendant":28,"t_following":29,"t_corchete_izquierdo":30,"EXPRESION":31,"t_corchete_derecho":32,"t_suma":33,"t_resta":34,"t_div":35,"t_igual":36,"t_parentesis_izquierdo":37,"t_parentesis_derecho":38,"PRIMITIVO":39,"number":40,"cadena":41,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"t_barra",14:"t_doble_diagonal",15:"t_diagonal",16:"StringLiteral",17:"t_arroba",18:"t_doble_punto",19:"t_punto",21:"t_multiplicacion",22:"node",23:"ancestor",24:"t_doble_dos_puntos",25:"t_ancestor_or_self",26:"t_attribute",27:"t_child",28:"t_descendant",29:"t_following",30:"t_corchete_izquierdo",32:"t_corchete_derecho",33:"t_suma",34:"t_resta",35:"t_div",36:"t_igual",37:"t_parentesis_izquierdo",38:"t_parentesis_derecho",40:"number",41:"cadena"},
productions_: [0,[3,2],[4,2],[4,1],[6,2],[6,1],[7,2],[7,1],[9,2],[9,2],[9,1],[9,3],[9,2],[10,1],[10,1],[11,1],[11,2],[11,1],[11,1],[11,1],[12,1],[12,2],[12,1],[13,2],[13,2],[13,2],[13,2],[13,2],[13,2],[20,4],[31,3],[31,3],[31,3],[31,3],[31,3],[31,3],[31,1],[39,1],[39,1],[39,1],[39,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 
        var root = new AST_XPATH($$[$0-1]);
        root.setErrores(list_error);
        list_error = [];
        return root; 
    
break;
case 2: case 6:
$$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 3: case 7:
 this.$ = [$$[$0]]
break;
case 4: case 35:
 this.$ = $$[$0-1]; 
break;
case 5: case 36: case 37: case 38: case 39: case 40:
 this.$ = $$[$0]; 
break;
case 8:
this.$ = new Nodo($$[$0-1], null, null, $$[$0], null, TipoX.PATH, this._$.first_line, this._$.first_column);
break;
case 9:
this.$ = new Nodo($$[$0-1],null,null,$$[$0],null,TipoX.WILDCARD, this._$.first_line, this._$.first_column);
break;
case 10:
this.$ = new Nodo(null,$$[$0],null,null,null,TipoX.PATH, this._$.first_line, this._$.first_column);
break;
case 11:
this.$ = new Nodo($$[$0-2],$$[$0],$$[$0-1],null,null,TipoX.AXES, this._$.first_line, this._$.first_column);
break;
case 12:
this.$ = new Nodo(null,null,$$[$0-1],null,null,TipoX.AXES, this._$.first_line, this._$.first_column);
break;
case 13: case 14: case 15: case 16: case 17: case 18: case 19: case 20: case 22:
this.$ = $$[$0];
break;
case 21:
this.$ = $$[$0-1] + $$[$0];
break;
case 23: case 24: case 25: case 26: case 27: case 28:
 this.$ = $$[$0-1];
break;
case 29:
this.$ = new Predicado($$[$0-3],$$[$0-1],this._$.first_line, this._$.first_column);
break;
case 30:
 this.$ = $$[$0-2] + $$[$0]; 
break;
case 31:
 this.$ = $$[$0-2] - $$[$0]; 
break;
case 32:
 this.$ = $$[$0-2] * $$[$0]; 
break;
case 33:
 this.$ = $$[$0-2] / $$[$0]; 
break;
case 34:
 this.$ = $$[$0-2] + $$[$0-1]+ $$[$0]; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,9:5,10:6,11:7,13:8,14:$V0,15:$V1,16:$V2,17:$V3,18:$V4,19:$V5,20:15,23:$V6,25:$V7,26:$V8,27:$V9,28:$Va,29:$Vb},{1:[3]},{5:[1,22],6:23,7:4,9:5,10:6,11:7,13:8,14:$V0,15:$V1,16:$V2,17:$V3,18:$V4,19:$V5,20:15,23:$V6,25:$V7,26:$V8,27:$V9,28:$Va,29:$Vb},o($Vc,[2,3]),{5:[2,5],8:[1,24],9:25,10:6,11:7,13:8,14:$V0,15:$V1,16:$V2,17:$V3,18:$V4,19:$V5,20:15,23:$V6,25:$V7,26:$V8,27:$V9,28:$Va,29:$Vb},o($Vd,[2,7]),{11:26,12:27,13:28,16:$V2,17:[1,29],18:$V4,19:$V5,20:15,21:[1,30],22:[1,31],23:$V6,25:$V7,26:$V8,27:$V9,28:$Va,29:$Vb},o($Vd,[2,10]),{11:32,16:$V2,17:$V3,18:$V4,19:$V5,20:15},o($Ve,[2,13]),o($Ve,[2,14]),o($Vd,[2,15],{30:[1,33]}),{16:$Vf},o($Vd,[2,17]),o($Vd,[2,18]),o($Vd,[2,19]),{24:[1,35]},{24:[1,36]},{24:[1,37]},{24:[1,38]},{24:[1,39]},{24:[1,40]},{1:[2,1]},o($Vc,[2,2]),o($Vc,[2,4]),o($Vd,[2,6]),o($Vd,[2,8]),o($Vd,[2,9]),{11:41,16:$V2,17:$V3,18:$V4,19:$V5,20:15},{16:$Vf,21:[1,42]},o($Vd,[2,20]),o($Vd,[2,22]),o($Vd,[2,12]),{16:$Vg,17:$Vh,31:43,37:$Vi,39:45,40:$Vj,41:$Vk},o($Vd,[2,16]),o($Vl,[2,23]),o($Vl,[2,24]),o($Vl,[2,25]),o($Vl,[2,26]),o($Vl,[2,27]),o($Vl,[2,28]),o($Vd,[2,11]),o($Vd,[2,21]),{21:$Vm,32:[1,50],33:$Vn,34:$Vo,35:$Vp,36:$Vq},{16:$Vg,17:$Vh,31:56,37:$Vi,39:45,40:$Vj,41:$Vk},o($Vr,[2,36]),o($Vr,[2,37]),o($Vr,[2,38]),o($Vr,[2,39]),{16:[1,57]},o($Vd,[2,29]),{16:$Vg,17:$Vh,31:58,37:$Vi,39:45,40:$Vj,41:$Vk},{16:$Vg,17:$Vh,31:59,37:$Vi,39:45,40:$Vj,41:$Vk},{16:$Vg,17:$Vh,31:60,37:$Vi,39:45,40:$Vj,41:$Vk},{16:$Vg,17:$Vh,31:61,37:$Vi,39:45,40:$Vj,41:$Vk},{16:$Vg,17:$Vh,31:62,37:$Vi,39:45,40:$Vj,41:$Vk},{21:$Vm,33:$Vn,34:$Vo,35:$Vp,36:$Vq,38:[1,63]},o($Vr,[2,40]),o($Vs,[2,30],{21:$Vm,35:$Vp,36:$Vq}),o($Vs,[2,31],{21:$Vm,35:$Vp,36:$Vq}),o($Vt,[2,32],{36:$Vq}),o($Vt,[2,33],{36:$Vq}),o([32,38],[2,34],{21:$Vm,33:$Vn,34:$Vo,35:$Vp,36:$Vq}),o($Vr,[2,35])],
defaultActions: {22:[2,1]},
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

    /*const { Nodo } = require("../dist/xpath/instrucciones/Nodo");   
    const { Expresion } = require("../dist/xpath/instrucciones/Expresion"); 
    const { Predicado } = require("../dist/xpath/instrucciones/Predicado");    
    const { Wildcard } = require("../dist/xpath/instrucciones/Wildcard");    
    const { Axes } = require("../dist/xpath/instrucciones/Axes");    
    const { AxesPredicado } = require("../dist/xpath/instrucciones/AxesPredicado");    
    const { AST_XPATH } = require("../dist/xpath/ast/AST_XPATH");  
    const { Error } = require("../dist/xpath/reportes/Error");  */

    var list_error = [];
     //REPORTE DE ERRORES
    function addError(tipo, descripcion, line, column) {
        let gramatica = new Error(tipo,descripcion,line,column);
        //list_error.push(error);
    }
    
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
case 0:return 't_coma';
break;
case 1:return 't_or';
break;
case 2:return 't_and';
break;
case 3:return 't_eq';
break;
case 4:return 't_ne';
break;
case 5:return 't_lt';
break;
case 6:return 't_le';
break;
case 7:return 't_gt';
break;
case 8:return 't_ge';
break;
case 9:return 36;
break;
case 10:return 't_diferente';
break;
case 11:return 't_menor_que';
break;
case 12:return 't_mayor_que';
break;
case 13:return 't_is';
break;
case 14:return 24;
break;
case 15:return 't_doble_barra';
break;
case 16:return 8;
break;
case 17:return 't_to';
break;
case 18:return 33;
break;
case 19:return 34;
break;
case 20:return 21;
break;
case 21:return 35;
break;
case 22:return 't_idiv';
break;
case 23:return 't_mod';
break;
case 24:return 't_union';
break;
case 25:return 't_except';
break;
case 26:return 't_instance';
break;
case 27:return 't_of';
break;
case 28:return 't_treat';
break;
case 29:return 't_as';
break;
case 30:return 't_castable';
break;
case 31:return 't_cast';
break;
case 32:return 14;
break;
case 33:return 15;
break;
case 34:return 't_dos_puntos';
break;
case 35:return 18;
break;
case 36:return 19;
break;
case 37:return 17;
break;
case 38:return 30;
break;
case 39:return 32;
break;
case 40:return 37;
break;
case 41:return 38;
break;
case 42:return 't_llave_izquierda';
break;
case 43:return 't_llave_derecha';
break;
case 44:return 't_dolar';
break;
case 45:return 't_modulo';
break;
case 46:return 't_numeral';
break;
case 47:return 't_return';
break;
case 48:return 't_in';
break;
case 49:return 't_satisfies';
break;
case 50:return 't_then';
break;
case 51:return 't_else';
break;
case 52:return 27;
break;
case 53:return 28;
break;
case 54:return 26;
break;
case 55:return 't_self';
break;
case 56:return 't_descendant-or-self';
break;
case 57:return 't_following-sibling';
break;
case 58:return 29;
break;
case 59:return 't_namespace';
break;
case 60:return 't_parent';
break;
case 61:return 't_ancestor';
break;
case 62:return 't_preceding_sibling';
break;
case 63:return 't_preceding-sibling';
break;
case 64:return 't_preceding';
break;
case 65:return 25;
break;
case 66:return 't_function';
break;
case 67:return 't_map';
break;
case 68:return 't_array';
break;
case 69:return 't_empty-sequence';
break;
case 70:return 't_item';
break;
case 71:return 't_node';
break;
case 72:return 't_text';
break;
case 73:return 't_document-node';
break;
case 74:return 't_comment';
break;
case 75:return 't_namespace-node';
break;
case 76:return 't_processing-instruction';
break;
case 77:return 't_schema-attribute';
break;
case 78:return 't_element';
break;
case 79:return 't_schema-element';
break;
case 80:return 't_interrogacion';
break;
case 81:return 't_Q';
break;
case 82:return 't_doble_comillas';
break;
case 83:return 't_doble_comilla';
break;
case 84:return 't_not';
break;
case 85: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 41 
break;
case 86:return 40
break;
case 87:return 16;
break;
case 88:return 5;
break;
case 89:  list_error.push(`Error léxico`,`No se esperaba ${yy_.yytext}`,yy_.yylloc.first_line, yy_.yylloc.first_column); 
break;
}
},
rules: [/^(?:\s+,)/,/^(?:or\b)/,/^(?:and\b)/,/^(?:eq\b)/,/^(?:ne\b)/,/^(?:lt\b)/,/^(?:le\b)/,/^(?:gt\b)/,/^(?:ge\b)/,/^(?:=)/,/^(?:!)/,/^(?:<)/,/^(?:>)/,/^(?:is\b)/,/^(?:::)/,/^(?:\|\|)/,/^(?:\|)/,/^(?:to\b)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:div\b)/,/^(?:idiv\b)/,/^(?:mod\b)/,/^(?:union\b)/,/^(?:except\b)/,/^(?:instance\b)/,/^(?:of\b)/,/^(?:treat\b)/,/^(?:as\b)/,/^(?:castable\b)/,/^(?:cast\b)/,/^(?:\/\/)/,/^(?:\/)/,/^(?::)/,/^(?:\.\.)/,/^(?:\.)/,/^(?:@)/,/^(?:\[)/,/^(?:\])/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\$)/,/^(?:%)/,/^(?:#)/,/^(?:return\b)/,/^(?:in\b)/,/^(?:satisfies\b)/,/^(?:then\b)/,/^(?:else\b)/,/^(?:child\b)/,/^(?:descendant\b)/,/^(?:attribute\b)/,/^(?:self\b)/,/^(?:descendant-or-self\b)/,/^(?:following-sibling\b)/,/^(?:following\b)/,/^(?:namespace\b)/,/^(?:parent\b)/,/^(?:ancestor\b)/,/^(?:preceding-sibling\b)/,/^(?:preceding-sibling\b)/,/^(?:preceding\b)/,/^(?:ancestor-or-self\b)/,/^(?:function\b)/,/^(?:map\b)/,/^(?:array\b)/,/^(?:empty-sequence\b)/,/^(?:item\b)/,/^(?:node\(\))/,/^(?:text\b)/,/^(?:document-node\b)/,/^(?:comment\b)/,/^(?:namespace-node\b)/,/^(?:processing-instruction\b)/,/^(?:schema-attribute\b)/,/^(?:element\b)/,/^(?:schema-element\b)/,/^(?:\?)/,/^(?:Q\b)/,/^(?:x\b)/,/^(?:y\b)/,/^(?:not\b)/,/^(?:"[^\"]*")/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:[a-zA-Z_][a-zA-Z0-9_ñÑ]*)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89],"inclusive":true}}
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
exports.parser = G_xpath;
exports.Parser = G_xpath.Parser;
exports.parse = function () { return G_xpath.parse.apply(G_xpath, arguments); };
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