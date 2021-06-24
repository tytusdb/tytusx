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
var gramaticaXMLDSC = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,4],$V2=[1,5],$V3=[5,18],$V4=[2,4],$V5=[2,5,8,14,18],$V6=[17,20],$V7=[1,18],$V8=[1,17],$V9=[2,15],$Va=[2,15,17,20],$Vb=[1,38],$Vc=[1,30],$Vd=[1,31],$Ve=[1,32],$Vf=[1,33],$Vg=[1,34],$Vh=[1,35],$Vi=[1,36],$Vj=[1,37],$Vk=[2,21],$Vl=[10,15,18,27,28,29,30,31,32,33];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"START":3,"ROOTS":4,"EOF":5,"ROOT":6,"ROOTS_P":7,"prologo":8,"RVERSION":9,"asig":10,"StringLiteral1":11,"RENCODING":12,"prologc":13,"lt":14,"identifier":15,"LIST_ATRIBUTOS":16,"gt":17,"etiqca":18,"CONTENTS":19,"etiqcc":20,"ATRIBUTOS":21,"ATRIBUTO":22,"ATRIBUTOS_P":23,"StringLiteral2":24,"BODY":25,"CONTENTS_P":26,"DoubleLiteral":27,"less":28,"greater":29,"ampersand":30,"apostrophe":31,"quotation":32,"simbolos1":33,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"prologo",9:"RVERSION",10:"asig",11:"StringLiteral1",12:"RENCODING",13:"prologc",14:"lt",15:"identifier",17:"gt",18:"etiqca",20:"etiqcc",24:"StringLiteral2",27:"DoubleLiteral",28:"less",29:"greater",30:"ampersand",31:"apostrophe",32:"quotation",33:"simbolos1"},
productions_: [0,[3,2],[4,2],[7,2],[7,0],[6,8],[6,8],[6,8],[6,7],[6,4],[6,1],[16,1],[16,0],[21,2],[23,2],[23,0],[22,3],[22,3],[22,1],[19,2],[26,2],[26,0],[25,1],[25,1],[25,1],[25,1],[25,1],[25,1],[25,1],[25,1],[25,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$=$$[$0-1];  
                                                         gramatical.agregar('Start->Roots','$$=$$[$0-1]');
                                                        return {
                                                        result: this.$,
                                                        reporteGram: gramatical
                                                    }; 
break;
case 2:
 this.$ = $$[$0]; this.$.push($$[$0-1]); 
                                                         gramatical.agregar('ROOTS -> ROOT ROOTS_P','$$=$$[$0];this.$.push($$[$0-1])');
                                                        
break;
case 3:
 this.$ = $$[$0]; this.$.push($$[$0-1]); 
                                                         gramatical.agregar('ROOTS_P -> ROOT ROOTS_P','$$=$$[$0];this.$.push($$[$0-1])');
                                                        
break;
case 4:
 this.$ = []; 
                                                         gramatical.agregar('ROOTS_P ->  Ɛ','$$=[]');
                                                        
break;
case 5:
 this.$ = new Objeto($$[$0-7],'',_$[$0-7].first_line,_$[$0-7].first_column,[],[],$$[$0-1]); 
                                                                                        gramatical.agregar('ROOT -> prologo RVERSION asig StringLiteral1 RENCODING asig StringLiteral1 prologc','$$ = new Objeto()');
                                                                                        
break;
case 6:
 this.$ = new Objeto($$[$0-6],'',_$[$0-7].first_line,_$[$0-7].first_column,$$[$0-5],$$[$0-3],$$[$0-1]); 
                                                                                         gramatical.agregar('ROOT -> lt identifier LIST_ATRIBUTOS gt ROOTS etiqca identifier gt','$$= new Objeto()');
                                                                                        
break;
case 7:
 this.$ = new Objeto($$[$0-6],$$[$0-3],_$[$0-7].first_line,_$[$0-7].first_column,$$[$0-5],[],$$[$0-1]); 
                                                                                         gramatical.agregar('Start->Roots','$$=$$[$0-7]'); gramatical.agregar('ROOT -> lt identifier LIST_ATRIBUTOS gt CONTENTS etiqca identifier gt','$$ = new Objeto()');
                                                                                        
break;
case 8:
 this.$ = new Objeto($$[$0-5],'',_$[$0-6].first_line,_$[$0-6].first_column,$$[$0-4],[],$$[$0]); 
                                                                                         gramatical.agregar('ROOT -> lt identifier LIST_ATRIBUTOS gt etiqca identifier gt','$$ = new Objeto();');
                                                                                        
break;
case 9:
 this.$ = new Objeto($$[$0-2],'',_$[$0-3].first_line,_$[$0-3].first_column,$$[$0-1],[],''); 
                                                                                          gramatical.agregar('ROOT ->  lt identifier LIST_ATRIBUTOS etiqcc ','$$ = new Objeto()');
                                                                                        
break;
case 10: case 18:
   console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
					new ESintactico("Sintactico", "No se esperaba: "+yytext,"XML Asc", this._$.first_line , this._$.first_column);
				
break;
case 11:
 this.$ = $$[$0]; 
                                                         gramatical.agregar('LIST_ATRIBUTOS -> ATRIBUTOS','$$=$$[$0]');
                                                        
break;
case 12:
 this.$ = []; 
                                                         gramatical.agregar('LIST_ATRIBUTOS ->  Ɛ','$$=[]');
                                                        
break;
case 13:
 this.$ = $$[$0]; this.$.push($$[$0-1]); 
                                                         gramatical.agregar('ATRIBUTOS -> ATRIBUTO ATRIBUTOS_P','$$=$$[$0];this.$.push($$[$0-1])');
                                                        
break;
case 14:
 this.$ = $$[$0]; this.$.push($$[$0-1]); 
                                                         gramatical.agregar('ATRIBUTOS_P -> ATRIBUTO ATRIBUTOS_P','$$=$$[$0];this.$.push($$[$0-1])');
                                                        
break;
case 15:
 this.$ = [] ;
                                                         gramatical.agregar('ATRIBUTOS_P ->  Ɛ','$$=[]');
                                                        
break;
case 16:
 this.$ = new Atributo($$[$0-2],$$[$0],_$[$0-2].first_line,_$[$0-2].first_column); 
                                                         gramatical.agregar('ATRIBUTO -> id asig StringLiteral1','$$ = new Atributo()');
                                                        
break;
case 17:
 this.$ = new Atributo($$[$0-2],$$[$0],_$[$0-2].first_line,_$[$0-2].first_column); 
                                                         gramatical.agregar('ATRIBUTO -> id asig StringLiteral2','$$ = new Atributo()');
                                                        
break;
case 19:
 $$[$0] = $$[$0-1] + ' ' + $$[$0]; this.$=$$[$0];
                                                         gramatical.agregar('Contents -> Body Contents_P','concatenarCaracteres()');
                                                        
break;
case 20:
  $$[$0] = $$[$0-1] + ' ' + $$[$0]; this.$=$$[$0]; 
                                                         gramatical.agregar('Contents_P -> Body Contents','ConcatenarCaracteres()');
                                                        
break;
case 21:
 this.$ = "" ;
                                                         gramatical.agregar('Contents_P ->  Ɛ','$$=""');
                                                        
break;
case 22:
 this.$ = $$[$0]; 
                                                         gramatical.agregar('Body -> Id','$$=$$[$0]');
                                                        
break;
case 23:
 this.$ = $$[$0]; 
                                                         gramatical.agregar('Body -> DoubleLiteral','$$=$$[$0]');
                                                        
break;
case 24:
 this.$ = '<'; 
                                                         gramatical.agregar('Body -> <','$$=$$[$0]');
                                                        
break;
case 25:
 this.$ = '>'; 
                                                         gramatical.agregar('Body -> >','$$=$$[$0]');
                                                        
break;
case 26:
 this.$ = '&'; 
                                                         gramatical.agregar('Body -> &','$$=$$[$0]');
                                                        
break;
case 27:
 this.$ = "'"; 
                                                         gramatical.agregar("Body -> '",'$$=$$[$0]');
                                                        
break;
case 28:
 this.$ = '"'; 
                                                         gramatical.agregar('Body -> "','$$=$$[$0]');
                                                        
break;
case 29:
 this.$ = $$[$0]; 
                                                         gramatical.agregar('Body -> simbolos1','$$=$$[$0]');
                                                        
break;
case 30:
 this.$ = $$[$0]; 
                                                         gramatical.agregar('Body -> asig','$$=$$[$0]');
                                                        
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,8:$V1,14:$V2},{1:[3]},{5:[1,7]},o($V3,$V4,{7:8,6:9,2:$V0,8:$V1,14:$V2}),{9:[1,10]},{15:[1,11]},o($V5,[2,10]),{1:[2,1]},o($V3,[2,2]),o($V3,$V4,{6:9,7:12,2:$V0,8:$V1,14:$V2}),{10:[1,13]},o($V6,[2,12],{16:14,21:15,22:16,2:$V7,15:$V8}),o($V3,[2,3]),{11:[1,19]},{17:[1,20],20:[1,21]},o($V6,[2,11]),o($V6,$V9,{23:22,22:23,2:$V7,15:$V8}),{10:[1,24]},o($Va,[2,18]),{12:[1,25]},{2:$V0,4:26,6:3,8:$V1,10:$Vb,14:$V2,15:$Vc,18:[1,28],19:27,25:29,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,32:$Vi,33:$Vj},o($V5,[2,9]),o($V6,[2,13]),o($V6,$V9,{22:23,23:39,2:$V7,15:$V8}),{11:[1,40],24:[1,41]},{10:[1,42]},{18:[1,43]},{18:[1,44]},{15:[1,45]},{10:$Vb,15:$Vc,18:$Vk,25:47,26:46,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,32:$Vi,33:$Vj},o($Vl,[2,22]),o($Vl,[2,23]),o($Vl,[2,24]),o($Vl,[2,25]),o($Vl,[2,26]),o($Vl,[2,27]),o($Vl,[2,28]),o($Vl,[2,29]),o($Vl,[2,30]),o($V6,[2,14]),o($Va,[2,16]),o($Va,[2,17]),{11:[1,48]},{15:[1,49]},{15:[1,50]},{17:[1,51]},{18:[2,19]},{10:$Vb,15:$Vc,18:$Vk,25:47,26:52,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,32:$Vi,33:$Vj},{13:[1,53]},{17:[1,54]},{17:[1,55]},o($V5,[2,8]),{18:[2,20]},o($V5,[2,5]),o($V5,[2,6]),o($V5,[2,7])],
defaultActions: {7:[2,1],46:[2,19],52:[2,20]},
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


const { Objeto } = require('../Interprete/Expresion/Objeto');
const { Atributo } = require('../Interprete/Expresion/Atributo');
const {ELexico, ESintactico} = require('../Interprete/Util/TError')
const {Gramatical} = require('../Simbolo/Gramatical')
 var gramatical = new Gramatical(); 

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
case 0:this.begin('comment');
break;
case 1:this.popState();
break;
case 2:/* ignora contenido de los comentarios*/
break;
case 3:// ignora los espacios en blanco
break;
case 4:return 8;
break;
case 5:return 13;
break;
case 6:return 18;
break;
case 7:return 20;
break;
case 8:return 9;
break;
case 9:return 12
break;
case 10:return 28;
break;
case 11:return 29;
break;
case 12:return 30;
break;
case 13:return 31;
break;
case 14:return 32;
break;
case 15:return 14;
break;
case 16:return 17;
break;
case 17:return 10;
break;
case 18:return 27;
break;
case 19:return 11
break;
case 20:return 24
break;
case 21:return 15;
break;
case 22:return 33;
break;
case 23:
            console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                 new ELexico("Lexico", "Caracter inesperado \'"+yy_.yytext+"\'", 'XML Asc', yy_.yylloc.first_line, yy_.yylloc.first_column)
        
break;
case 24:return 5
break;
}
},
rules: [/^(?:<!--)/,/^(?:-->)/,/^(?:.)/,/^(?:\s+)/,/^(?:<\?xml\b)/,/^(?:\?>)/,/^(?:<\/)/,/^(?:\/>)/,/^(?:version\b)/,/^(?:encoding\b)/,/^(?:&lt;)/,/^(?:&gt;)/,/^(?:&amp;)/,/^(?:&apos;)/,/^(?:&quot;)/,/^(?:<)/,/^(?:>)/,/^(?:=)/,/^(?:\d+([.]\d*)?)/,/^(?:"[^\"]*")/,/^(?:'[^\']*')/,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/,/^(?:([\u0021]|[\u0023-\u0025]|[\u0028-\u002F]|[\u003A-\u003B]|[\u003F-\u0040]|[\u005B-\u0060]|[\u007B-\u007E]|[\u00A1-\u00AC]|[\u00AE-\uD7F0])+)/,/^(?:.)/,/^(?:$)/],
conditions: {"comment":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"inclusive":true},"INITIAL":{"rules":[0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"inclusive":true}}
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
exports.parser = gramaticaXMLDSC;
exports.Parser = gramaticaXMLDSC.Parser;
exports.parse = function () { return gramaticaXMLDSC.parse.apply(gramaticaXMLDSC, arguments); };
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