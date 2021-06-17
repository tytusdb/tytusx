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
var gramaticaXMLDescendente = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,8],$V1=[1,9],$V2=[1,10],$V3=[1,15],$V4=[6,19],$V5=[2,5],$V6=[1,22],$V7=[2,6,15,19,21],$V8=[18,23,25],$V9=[2,22],$Va=[2,14,15,19,21];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"XML":3,"T_CONF":4,"TAGS_LIST":5,"EOF":6,"TAG":7,"TAG_LIST":8,"TAG_APERTURA":9,"TAG_OP":10,"U_TAG":11,"OPEN_TAG":12,"TAG_CIERRE":13,"cadena_letras":14,"openTagAp":15,"TAG_AP_MEN":16,"LISTA_ATRIBUTOS":17,"cierra_tagap":18,"openTag":19,"closingTag":20,"openTagOp":21,"TAG_SELEC":22,"close_tag_u":23,"t_congOp":24,"t_congClose":25,"ATRIBUTO":26,"LA":27,"atName":28,"atAsi":29,"atValue":30,"$accept":0,"$end":1},
terminals_: {2:"error",6:"EOF",12:"OPEN_TAG",14:"cadena_letras",15:"openTagAp",18:"cierra_tagap",19:"openTag",20:"closingTag",21:"openTagOp",23:"close_tag_u",24:"t_congOp",25:"t_congClose",28:"atName",29:"atAsi",30:"atValue"},
productions_: [0,[3,3],[3,2],[5,2],[8,2],[8,0],[7,2],[7,1],[7,2],[10,2],[10,2],[10,1],[9,2],[16,2],[16,1],[13,2],[11,2],[22,2],[22,1],[4,3],[17,2],[27,2],[27,0],[26,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

            this.$ = new NodeDescXML('XML', '');
            this.$.childList.push($$[$0-2]);
            this.$.childList.push($$[$0-1]);

            return this.$;
         
break;
case 2:



            this.$ = new NodeDescXML('XML', '');
            this.$.childList.push($$[$0-1]);

            return this.$;
        
break;
case 3:

    this.$ = new NodeDescXML('TAGS_LIST', '');
    this.$.childList.push($$[$0-1]);
    this.$.childList.push($$[$0]);



break;
case 4:

        this.$ = new NodeDescXML('TAG_LIST', '');
        this.$.childList.push($$[$0-1]);
        this.$.childList.push($$[$0]);
    
break;
case 5:


  
break;
case 6:

            this.$ = new NodeDescXML('TAG', '');
            this.$.childList.push($$[$0-1]);
            this.$.childList.push(new NodeDescXML($$[$0], 'TAG_OP'));
        
break;
case 7:

            this.$ = new NodeDescXML('TAG', '');
            this.$.childList.push($$[$0]);
         
break;
case 8:


        
break;
case 9:

            this.$ = new NodeDescXML('TAG_OP', '');
            this.$.childList.push($$[$0-1]);
            this.$.childList.push($$[$0]);
    
break;
case 10:

            this.$ = new NodeDescXML('TAG_OP', '');
            this.$.childList.push(new NodeDescXML($$[$0-1], 'cadena_letras'));
            this.$.childList.push($$[$0]);
    
break;
case 11:

            this.$ = new NodeDescXML('TAG_OP', '');
            this.$.childList.push($$[$0]);
    
break;
case 12:

        this.$ = new NodeDescXML('TAG_APERTURA', '');
        this.$.childList.push(new NodeDescXML($$[$0-1], 'openTagAp'));
        this.$.childList.push($$[$0]);
    
break;
case 13:

        this.$ = new NodeDescXML('TAG_AP_MEN', '');
        this.$.childList.push(new NodeDescXML($$[$0-1], 'cierra_tagap'));
        this.$.childList.push($$[$0]);
    
break;
case 14:

        this.$ = new NodeDescXML('TAG_AP_MEN', '');
        this.$.childList.push(new NodeDescXML($$[$0], 'cierra_tagap'));
    
break;
case 15:

        this.$ = new NodeDescXML('TAG_AP_MEN', '');
        this.$.childList.push(new NodeDescXML($$[$0-1], 'openTag'));
        this.$.childList.push(new NodeDescXML($$[$0], 'CLOSING_TAG'));
    
break;
case 16:

        this.$ = new NodeDescXML('U_TAG', '');
        this.$.childList.push(new NodeDescXML($$[$0-1], 'openTagOp'));
        this.$.childList.push($$[$0]);
    
break;
case 17:

        this.$ = new NodeDescXML('TAG_SELEC', '');
        this.$.childList.push($$[$0-1]);
        this.$.childList.push(new NodeDescXML($$[$0], 'close_tag_u'));
    
break;
case 18:

        this.$ = new NodeDescXML('TAG_SELEC', '');
        this.$.childList.push(new NodeDescXML($$[$0], 'close_tag_u'));

    
break;
case 19:

            this.$ = new NodeDescXML('T_CONF', '');
            this.$.childList.push(new NodeDescXML($$[$0-2], 't_congOp'));
            this.$.childList.push($$[$0-1]);
            this.$.childList.push(new NodeDescXML($$[$0-1], 't_congClose'));
        
break;
case 20:

        this.$ = new NodeDescXML('LISTA_ATRIBUTOS', '');
        this.$.childList.push($$[$0-1]);

        if($$[$0] === undefined || !$$[$0]) {
            this.$.setChild(new NodeDescXML('LA', ''));
        } else {
            this.$.setChild($$[$0]);
            this.$.setChild(new NodeDescXML("EPSILON", ''));
        }

break;
case 21:

    this.$ = new NodeDescXML('LA', '');
    this.$.childList.push($$[$0-1]);
    if($$[$0] === undefined || !$$[$0]) {
        this.$.setChild(new NodeDescXML('LA', ''));
    } else {
        this.$.setChild($$[$0]);
        this.$.setChild(new NodeDescXML("EPSILON", ''));
    }

break;
case 23:

        this.$ = new NodeDescXML('ATRIBUTO', '');
        this.$.childList.push(new NodeDescXML($$[$0-2], 'atName'));
        this.$.childList.push(new NodeDescXML($$[$0-1], 'atAsi'));
        this.$.childList.push(new NodeDescXML($$[$0], 'atValue'));
        
break;
}
},
table: [{2:$V0,3:1,4:2,5:3,7:5,9:6,11:7,15:$V1,21:$V2,24:[1,4]},{1:[3]},{2:$V0,5:11,7:5,9:6,11:7,15:$V1,21:$V2},{6:[1,12]},{17:13,26:14,28:$V3},o($V4,$V5,{9:6,11:7,8:16,7:17,2:$V0,15:$V1,21:$V2}),{2:$V0,5:19,7:5,9:6,10:18,11:7,13:21,14:[1,20],15:$V1,19:$V6,21:$V2},o($V7,[2,7]),{12:[1,23]},{16:24,17:25,18:[1,26],26:14,28:$V3},{17:28,22:27,23:[1,29],26:14,28:$V3},{6:[1,30]},{1:[2,2]},{25:[1,31]},o($V8,$V9,{27:32,26:33,28:$V3}),{29:[1,34]},o($V4,[2,3]),o($V4,$V5,{9:6,11:7,7:17,8:35,2:$V0,15:$V1,21:$V2}),o($V7,[2,6]),{13:36,19:$V6},{13:37,19:$V6},o($V7,[2,11]),{20:[1,38]},o($V7,[2,8]),o($Va,[2,12]),{18:[1,39]},o($Va,[2,14]),o($V7,[2,16]),{23:[1,40]},o($V7,[2,18]),{1:[2,1]},o([2,15,21],[2,19]),o($V8,[2,20]),o($V8,$V9,{26:33,27:41,28:$V3}),{30:[1,42]},o($V4,[2,4]),o($V7,[2,9]),o($V7,[2,10]),o($V7,[2,15]),o($Va,[2,13]),o($V7,[2,17]),o($V8,[2,21]),o([18,23,25,28],[2,23])],
defaultActions: {12:[2,2],30:[2,1]},
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


    const listaGramatical = [];

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
case 0:this.begin("Comentario"); 
break;
case 1:
break;
case 2:
break;
case 3:this.popState(); 
break;
case 4:
break;
case 5: this.begin("TagApertura"); return 24; 
break;
case 6:
break;
case 7: return 28; 
break;
case 8: return 29 
break;
case 9: return 30; 
break;
case 10: this.popState(); return 25; 
break;
case 11: this.begin("TagApertura"); return 12; 
break;
case 12:
break;
case 13: return 28; 
break;
case 14: return 29 
break;
case 15: return 30; 
break;
case 16: this.popState(); return 'CIERRA_TAGAP'; 
break;
case 17: this.popState();  return 23; 
break;
case 18: this.begin("TagCierre"); return 19 
break;
case 19: this.popState(); return 20 
break;
case 20:
break;
case 21: return 14; 
break;
case 22: return 6; 
break;
case 23: 
break;
}
},
rules: [/^(?:<!--)/i,/^(?:[\r\t]+)/i,/^(?:\n)/i,/^(?:-->)/i,/^(?:[^"-->"]+)/i,/^(?:<\?xml\b)/i,/^(?:[\s\r\t\n]+)/i,/^(?:[a-zA-Z_][a-zA-Z0-9_]*)/i,/^(?:=)/i,/^(?:"[^\"\n]*")/i,/^(?:\?>)/i,/^(?:<[a-zA-Z_][a-zA-Z0-9_]*)/i,/^(?:[\s\r\t\n]+)/i,/^(?:[a-zA-Z_][a-zA-Z0-9_]*)/i,/^(?:=)/i,/^(?:"[^\"\n]*")/i,/^(?:>)/i,/^(?:\/>)/i,/^(?:<\/[a-zA-Z_][a-zA-Z0-9_]*)/i,/^(?:>)/i,/^(?:[\s\r\t\n]+)/i,/^(?:[^<]+)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"TagCierre":{"rules":[19],"inclusive":false},"TagApertura":{"rules":[6,7,8,9,10,12,13,14,15,16,17],"inclusive":false},"Comentario":{"rules":[1,2,3,4],"inclusive":false},"INITIAL":{"rules":[0,5,11,18,20,21,22,23],"inclusive":true}}
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
exports.parser = gramaticaXMLDescendente;
exports.Parser = gramaticaXMLDescendente.Parser;
exports.parse = function () { return gramaticaXMLDescendente.parse.apply(gramaticaXMLDescendente, arguments); };
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