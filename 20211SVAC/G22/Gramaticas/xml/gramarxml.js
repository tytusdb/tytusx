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
var gramarxml = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,15],$V1=[1,18],$V2=[1,13],$V3=[1,16],$V4=[1,19],$V5=[1,20],$V6=[1,21],$V7=[1,22],$V8=[7,8,23,25,34,39,40,41,42,43,44,45,46,47,48,49],$V9=[1,30],$Va=[17,23,34],$Vb=[1,42],$Vc=[1,44],$Vd=[1,45],$Ve=[1,46],$Vf=[1,47],$Vg=[1,48],$Vh=[1,49],$Vi=[1,50],$Vj=[1,51],$Vk=[1,41],$Vl=[1,43],$Vm=[23,25,46,47],$Vn=[2,42],$Vo=[1,53],$Vp=[8,23,25,34,39,40,41,42,43,44,45,46,47,48,49,50,51],$Vq=[17,23,25,34,46,47],$Vr=[8,23,25,34,39,40,41,42,43,44,45,46,47,48,49],$Vs=[1,63],$Vt=[1,64],$Vu=[9,15,17,18,19,20,23,25,34,39,40,41,42,43,44,45,46,47,48,49],$Vv=[23,25,34,39,40,41,42,43,44,45,46,47,48,49,50,51],$Vw=[50,51];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"XML_GRAMAR":3,"ENCABEZADO":4,"ABRIR_ELEMENTO":5,"CONTENIDO_ELEMENTO":6,"EOF":7,"menosque":8,"c_interroga":9,"xml":10,"version":11,"igual":12,"QUOTES":13,"TIPO_DATO":14,"encoding":15,"FORMAT":16,"masque":17,"UTF":18,"ASCII":19,"ISO":20,"ELEMENTOS":21,"ELEMENTO":22,"identificador":23,"inicoment":24,"menos":25,"ETIQUETA":26,"COMENTARIO":27,"ATRIBUTOS":28,"CIERRE_ELEMENTO":29,"ATRIBUTO":30,"C_ATRIBUTO":31,"TIPOCONTENIDO":32,"CONTENIDO_ETIQUETA":33,"div":34,"C_TEXTO":35,"TIPO":36,"SIGNOS":37,"SPECIALCHARS":38,"lessthan":39,"graterthan":40,"ampersand":41,"simplequote":42,"doublequote":43,"colon":44,"underscore":45,"decimal":46,"entero":47,"mas":48,"por":49,"comilla":50,"apostrofe":51,"$accept":0,"$end":1},
terminals_: {2:"error",7:"EOF",8:"menosque",9:"c_interroga",10:"xml",11:"version",12:"igual",15:"encoding",17:"masque",18:"UTF",19:"ASCII",20:"ISO",23:"identificador",24:"inicoment",25:"menos",34:"div",39:"lessthan",40:"graterthan",41:"ampersand",42:"simplequote",43:"doublequote",44:"colon",45:"underscore",46:"decimal",47:"entero",48:"mas",49:"por",50:"comilla",51:"apostrofe"},
productions_: [0,[3,4],[4,15],[16,1],[16,1],[16,1],[21,2],[21,1],[21,1],[22,2],[5,2],[5,4],[6,1],[6,1],[26,2],[26,1],[28,2],[28,1],[30,5],[31,2],[31,1],[29,6],[29,5],[29,2],[27,4],[27,3],[35,2],[35,1],[33,2],[33,1],[36,1],[36,1],[32,1],[32,1],[32,1],[38,1],[38,1],[38,1],[38,1],[38,1],[38,1],[38,1],[14,1],[14,1],[14,1],[37,1],[37,1],[37,1],[37,1],[13,1],[13,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 8:
 console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
break;
}
},
table: [{3:1,4:2,8:[1,3]},{1:[3]},{5:4,8:[1,5]},{9:[1,6]},{6:7,14:17,17:$V0,23:$V1,25:$V2,26:8,27:9,28:10,29:11,30:14,34:$V3,35:12,46:$V4,47:$V5},{23:$V6,24:$V7},{10:[1,23]},{7:[1,24]},o($V8,[2,12]),o($V8,[2,13]),{17:$V0,23:[1,27],29:25,30:26,34:$V3},o($V8,[2,15]),{14:29,23:$V9,25:[1,28],46:$V4,47:$V5},{25:[1,31]},o($Va,[2,17]),{5:40,8:[1,33],14:37,22:36,23:$V9,25:$Vb,32:35,33:32,34:$Vc,36:34,37:38,38:39,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj,46:$V4,47:$V5,48:$Vk,49:$Vl},{17:[1,52]},o($Vm,[2,27]),o($Vm,$Vn,{12:$Vo}),o($Vp,[2,43]),o($Vp,[2,44]),o($Vq,[2,10]),{25:[1,54]},{11:[1,55]},{1:[2,1]},o($V8,[2,14]),o($Va,[2,16]),{12:$Vo},{25:[1,56]},o($Vm,[2,26]),o($Vp,$Vn),{17:[1,57]},{5:40,8:[1,58],14:37,22:36,23:$V9,25:$Vb,32:35,34:$Vc,36:59,37:38,38:39,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj,46:$V4,47:$V5,48:$Vk,49:$Vl},{23:$V6,24:$V7,34:[1,60]},o($Vr,[2,29]),o($Vr,[2,30]),o($Vr,[2,31]),o($Vp,[2,32]),o($Vp,[2,33]),o($Vp,[2,34]),{6:61,14:17,17:$V0,23:$V1,25:$V2,26:8,27:9,28:10,29:11,30:14,34:$V3,35:12,46:$V4,47:$V5},o($Vp,[2,45]),o($Vp,[2,46]),o($Vp,[2,47]),o($Vp,[2,48]),o($Vp,[2,35]),o($Vp,[2,36]),o($Vp,[2,37]),o($Vp,[2,38]),o($Vp,[2,39]),o($Vp,[2,40]),o($Vp,[2,41]),o($V8,[2,23]),{13:62,50:$Vs,51:$Vt},{25:[1,65]},{12:[1,66]},{17:[1,67]},o($V8,[2,25]),{23:$V6,24:$V7,34:[1,68]},o($Vr,[2,28]),{23:[1,69]},o($Vr,[2,9]),{14:37,23:$V9,25:$Vb,31:70,32:71,34:$Vc,37:38,38:39,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj,46:$V4,47:$V5,48:$Vk,49:$Vl},o($Vu,[2,49]),o($Vu,[2,50]),o($Vq,[2,11]),{13:72,50:$Vs,51:$Vt},o($V8,[2,24]),{23:[1,73]},{17:[1,74]},{13:75,14:37,23:$V9,25:$Vb,32:76,34:$Vc,37:38,38:39,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,45:$Vj,46:$V4,47:$V5,48:$Vk,49:$Vl,50:$Vs,51:$Vt},o($Vv,[2,20]),{14:77,23:$V9,46:$V4,47:$V5},{17:[1,78]},o($V8,[2,22]),o($Va,[2,18]),o($Vv,[2,19]),{13:79,50:$Vs,51:$Vt},o($V8,[2,21]),{15:[1,80]},{12:[1,81]},{13:82,50:$Vs,51:$Vt},{16:83,18:[1,84],19:[1,85],20:[1,86]},{13:87,50:$Vs,51:$Vt},o($Vw,[2,3]),o($Vw,[2,4]),o($Vw,[2,5]),{9:[1,88]},{17:[1,89]},{8:[2,2]}],
defaultActions: {24:[2,1],89:[2,2]},
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
case 0:return 'REVALUAR';
break;
case 1:return 'ACEPTAR';
break;
case 2:return 'ptcoma';
break;
case 3:return 'parizq';
break;
case 4:return 'parder';
break;
case 5:return 'corizq';
break;
case 6:return 'corder';
break;
case 7:return 8;
break;
case 8:return 17;
break;
case 9:return 12;
break;
case 10:return 50;
break;
case 11:return 51;
break;
case 12:return 24;
break;
case 13:return 9;
break;
case 14:return 10;
break;
case 15:return 11;
break;
case 16:return 15;
break;
case 17:return 18
break;
case 18:return 19;
break;
case 19:return 20;
break;
case 20:return 39;
break;
case 21:return 40;
break;
case 22:return 41;
break;
case 23:return 42;
break;
case 24:return 43;
break;
case 25:return 44;
break;
case 26:return 45;
break;
case 27:return 48;
break;
case 28:return 25;
break;
case 29:return 49;
break;
case 30:return 34;
break;
case 31:
break;
case 32:
break;
case 33:return 46;
break;
case 34:return 47;
break;
case 35:return 23; 
break;
case 36:return 7;
break;
case 37: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column); 
break;
}
},
rules: [/^(?:Evaluar\b)/i,/^(?:Aceptar\b)/i,/^(?:;)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:<)/i,/^(?:>)/i,/^(?:=)/i,/^(?:")/i,/^(?:')/i,/^(?:!)/i,/^(?:\?)/i,/^(?:xml\b)/i,/^(?:version\b)/i,/^(?:encoding\b)/i,/^(?:UTF-8\b)/i,/^(?:ASCII\b)/i,/^(?:ISO859-1\b)/i,/^(?:&lt;)/i,/^(?:&gt;)/i,/^(?:&amp;)/i,/^(?:&apos;)/i,/^(?:&quot;)/i,/^(?::)/i,/^(?:_\b)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:[ \r\t]+)/i,/^(?:\n)/i,/^(?:[0-9]+(\.[0-9]+)?\b)/i,/^(?:[0-9]+\b)/i,/^(?:([a-zA-Z0-9])[a-zA-Z0-9_]*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],"inclusive":true}}
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
exports.parser = gramarxml;
exports.Parser = gramarxml.Parser;
exports.parse = function () { return gramarxml.parse.apply(gramarxml, arguments); };
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