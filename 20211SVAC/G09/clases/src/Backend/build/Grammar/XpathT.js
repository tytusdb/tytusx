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
var XpathT = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,13],$V1=[1,5],$V2=[1,6],$V3=[1,8],$V4=[1,9],$V5=[1,10],$V6=[1,11],$V7=[1,12],$V8=[2,3],$V9=[1,15],$Va=[6,7],$Vb=[2,16,17,18,20,21,59,60,61,62,63,64,66,67,68],$Vc=[2,8],$Vd=[6,7,14,15],$Ve=[1,20],$Vf=[1,21],$Vg=[1,22],$Vh=[6,7,14,15,21,25,29,30,33,34,35,36,37,38,42,43,44],$Vi=[1,50],$Vj=[1,49],$Vk=[1,46],$Vl=[1,45],$Vm=[1,47],$Vn=[1,48],$Vo=[1,52],$Vp=[1,53],$Vq=[1,54],$Vr=[1,55],$Vs=[1,56],$Vt=[2,24],$Vu=[1,67],$Vv=[1,68],$Vw=[25,29,30],$Vx=[25,29,30,33,34,35,36,37,38],$Vy=[2,37],$Vz=[1,80],$VA=[1,78],$VB=[1,79],$VC=[1,81],$VD=[21,25,29,30,33,34,35,36,37,38,42,43,44];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"inicio":3,"xpath":4,"inicioaux":5,"EOF":6,"SEPARADOR":7,"simbolo":8,"produccion":9,"produccionaux":10,"aux2":11,"aux":12,"ComandosLocales":13,"SLASH":14,"SLASH_DOBLE":15,"PUNTO":16,"DOBLE_PUNTO":17,"ARROBA":18,"simboloaux":19,"ID":20,"MULTIPLICACION":21,"atributos":22,"COR_IZQUIERDO":23,"operacion":24,"COR_DERECHO":25,"operacion_relacional":26,"opaux2":27,"opaux":28,"AND":29,"OR":30,"operacion_numerica":31,"operacion_relacionalaux":32,"IGUAL":33,"DIFERENTE":34,"MAYOR":35,"MENOR":36,"MAYOR_IGUAL":37,"MENOR_IGUAL":38,"valor":39,"operacion_numericaaux2":40,"operacion_numericaaux":41,"MAS":42,"MENOS":43,"DIVISION":44,"ENTERO":45,"DECIMAL":46,"CADENA":47,"localaux":48,"LANG":49,"TEXTO":50,"PAR_IZQUIERDO":51,"PAR_DERECHO":52,"POSICION":53,"ULTIMO":54,"NODO":55,"local":56,"DOBLE_DOSPUNTOS":57,"ComandosLocalesaux":58,"ANCESTOR":59,"SELF":60,"ATTRIBUTE":61,"CHILD":62,"DESCENDANT":63,"PRECEDING":64,"SIBLING":65,"PARENT":66,"NAMESPACE":67,"FOLLOWING":68,"$accept":0,"$end":1},
terminals_: {2:"error",6:"EOF",7:"SEPARADOR",14:"SLASH",15:"SLASH_DOBLE",16:"PUNTO",17:"DOBLE_PUNTO",18:"ARROBA",20:"ID",21:"MULTIPLICACION",23:"COR_IZQUIERDO",25:"COR_DERECHO",29:"AND",30:"OR",33:"IGUAL",34:"DIFERENTE",35:"MAYOR",36:"MENOR",37:"MAYOR_IGUAL",38:"MENOR_IGUAL",42:"MAS",43:"MENOS",44:"DIVISION",45:"ENTERO",46:"DECIMAL",47:"CADENA",49:"LANG",50:"TEXTO",51:"PAR_IZQUIERDO",52:"PAR_DERECHO",53:"POSICION",54:"ULTIMO",55:"NODO",57:"DOBLE_DOSPUNTOS",59:"ANCESTOR",60:"SELF",61:"ATTRIBUTE",62:"CHILD",63:"DESCENDANT",64:"PRECEDING",65:"SIBLING",66:"PARENT",67:"NAMESPACE",68:"FOLLOWING"},
productions_: [0,[3,3],[5,3],[5,0],[4,2],[4,1],[9,2],[11,3],[11,0],[12,1],[12,1],[8,1],[8,1],[10,1],[10,1],[10,2],[10,1],[10,1],[10,1],[10,2],[10,2],[22,3],[24,2],[27,2],[27,0],[28,2],[28,2],[26,2],[32,2],[32,2],[32,2],[32,2],[32,2],[32,2],[32,0],[31,2],[40,2],[40,0],[41,2],[41,2],[41,2],[41,2],[39,1],[39,1],[39,1],[39,1],[39,2],[39,1],[39,1],[48,1],[48,3],[48,3],[48,3],[48,3],[19,1],[19,1],[19,1],[13,3],[58,1],[58,1],[56,1],[56,5],[56,1],[56,1],[56,1],[56,5],[56,1],[56,3],[56,1],[56,1],[56,1],[56,1],[56,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 20:
console.log("error sintactico") ;
        
        
              new ControlError(yytext, TipoSeleccion.ERROR_SINTACTICO, this._$.first_line, this._$.first_column,"XPatDescendente")
       
break;
case 42: case 43: case 44:
this.$ = $$[$0];
break;
case 45:
this.$ = '\"'+$$[$0]+'\"';
break;
}
},
table: [{2:$V0,3:1,4:2,8:3,9:4,10:7,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7},{1:[3]},{5:14,6:$V8,7:$V9},{2:$V0,9:16,10:7,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7},o($Va,[2,5]),o($Vb,[2,11]),o($Vb,[2,12]),o($Va,$Vc,{11:17,8:18,14:$V1,15:$V2}),o($Vd,[2,13]),o($Vd,[2,14]),o($Vd,[2,16],{19:19,20:$Ve,21:$Vf,49:$Vg}),o($Vd,[2,17],{22:23,23:[1,24]}),o($Vd,[2,18]),{7:[1,25]},{6:[1,26]},{2:$V0,4:27,8:3,9:4,10:7,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7},o($Va,[2,4]),o($Va,[2,6]),{2:$V0,10:29,12:28,13:30,16:$V3,17:$V4,18:$V5,20:$V6,21:$V7,56:31,59:[1,32],60:[1,38],61:[1,33],62:[1,34],63:[1,35],64:[1,36],66:[1,37],67:[1,39],68:[1,40]},o($Vd,[2,15]),o($Vh,[2,54]),o($Vh,[2,55]),o($Vh,[2,56]),o($Vd,[2,19]),{16:$Vi,18:$Vj,20:$Vk,24:41,26:42,31:43,39:44,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs},o($Vd,[2,20]),{1:[2,1]},{5:57,6:$V8,7:$V9},o($Va,$Vc,{8:18,11:58,14:$V1,15:$V2}),o($Vd,[2,9]),o($Vd,[2,10]),{57:[1,59]},{43:[1,60],57:[2,60]},{57:[2,62]},{57:[2,63]},{43:[1,61],57:[2,64]},{43:[1,62],57:[2,66]},{57:[2,68]},{57:[2,69]},{57:[2,70]},{43:[1,63],57:[2,71]},{25:[1,64]},{25:$Vt,27:65,28:66,29:$Vu,30:$Vv},o($Vw,[2,34],{32:69,33:[1,70],34:[1,71],35:[1,72],36:[1,73],37:[1,74],38:[1,75]}),o($Vx,$Vy,{40:76,41:77,21:$Vz,42:$VA,43:$VB,44:$VC}),o($Vh,[2,42]),o($Vh,[2,43]),o($Vh,[2,44]),o($Vh,[2,45]),{19:82,20:$Ve,21:$Vf,49:$Vg},o($Vh,[2,47]),o($Vh,[2,48]),o($Vh,[2,49]),{51:[1,83]},{51:[1,84]},{51:[1,85]},{51:[1,86]},{6:[2,2]},o($Va,[2,7]),{16:$Vi,18:$Vj,20:$Vk,21:[1,89],39:88,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs,58:87},{30:[1,90]},{30:[1,91]},{65:[1,92]},{65:[1,93]},o($Vd,[2,21]),o($Vw,[2,22]),{25:$Vt,27:94,28:66,29:$Vu,30:$Vv},{16:$Vi,18:$Vj,20:$Vk,24:95,26:42,31:43,39:44,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs},{16:$Vi,18:$Vj,20:$Vk,24:96,26:42,31:43,39:44,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs},o($Vw,[2,27]),{16:$Vi,18:$Vj,20:$Vk,31:97,39:44,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs},{16:$Vi,18:$Vj,20:$Vk,31:98,39:44,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs},{16:$Vi,18:$Vj,20:$Vk,31:99,39:44,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs},{16:$Vi,18:$Vj,20:$Vk,31:100,39:44,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs},{16:$Vi,18:$Vj,20:$Vk,31:101,39:44,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs},{16:$Vi,18:$Vj,20:$Vk,31:102,39:44,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs},o($VD,[2,35]),o($Vx,$Vy,{41:77,40:103,21:$Vz,42:$VA,43:$VB,44:$VC}),{16:$Vi,18:$Vj,20:$Vk,31:104,39:44,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs},{16:$Vi,18:$Vj,20:$Vk,31:105,39:44,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs},{16:$Vi,18:$Vj,20:$Vk,31:106,39:44,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs},{16:$Vi,18:$Vj,20:$Vk,31:107,39:44,45:$Vl,46:$Vm,47:$Vn,48:51,49:$Vo,50:$Vp,53:$Vq,54:$Vr,55:$Vs},o($Vh,[2,46]),{52:[1,108]},{52:[1,109]},{52:[1,110]},{52:[1,111]},o($Vd,[2,57]),o($Vd,[2,58]),o($Vd,[2,59]),{43:[1,112]},{43:[1,113]},{57:[2,67]},{57:[2,72]},o($Vw,[2,23]),o($Vw,[2,25]),o($Vw,[2,26]),o($Vw,[2,28]),o($Vw,[2,29]),o($Vw,[2,30]),o($Vw,[2,31]),o($Vw,[2,32]),o($Vw,[2,33]),o($VD,[2,36]),o($VD,[2,38]),o($VD,[2,39]),o($VD,[2,40]),o($VD,[2,41]),o($Vh,[2,50]),o($Vh,[2,51]),o($Vh,[2,52]),o($Vh,[2,53]),{60:[1,114]},{60:[1,115]},{57:[2,61]},{57:[2,65]}],
defaultActions: {26:[2,1],33:[2,62],34:[2,63],37:[2,68],38:[2,69],39:[2,70],57:[2,2],92:[2,67],93:[2,72],114:[2,61],115:[2,65]},
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
    
        const { ControlError } = require('../Xpath/ControlError')
            const { TipoSeleccion } = require('../Xpath/TipoSeleccion')

//importaciones y demas    
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
case 1:return 36
break;
case 2:return 35
break;
case 3:return 15
break;
case 4:return 14
break;
case 5:return 33
break;
case 6:return 7
break;
case 7:return 42
break;
case 8:return 43
break;
case 9:return 21
break;
case 10:return 44
break;
case 11:return 34
break;
case 12:return 37
break;
case 13:return 38
break;
case 14:return 29
break;
case 15:return 30
break;
case 16:return 'MODULAR'
break;
case 17:return 18
break;
case 18:return 16
break;
case 19:return 17 
break;
case 20:return 57
break;
case 21:return 23
break;
case 22:return 25
break;
case 23:return 51
break;
case 24:return 52
break;
case 25:return 59
break;
case 26:return 61
break;
case 27:return 62
break;
case 28:return 63
break;
case 29:return 68
break;
case 30:return "NAMESPACE"
break;
case 31:return 66
break;
case 32:return 64
break;
case 33:return 60
break;
case 34:return 'SILBLING'
break;
case 35:return 55
break;
case 36:return 49   
break;
case 37:return 53
break;
case 38:return 54
break;
case 39:return 50
break;
case 40: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 47; 
break;
case 41:return 46;
break;
case 42:return 45
break;
case 43:return 20
break;
case 44:return 6;
break;
case 45:console.log(yy_.yytext,"ErroreLexico");new ControlError(yy_.yytext, TipoSeleccion.ERROR_LEXICO, yy_.yylloc.first_line,yy_.yylloc.first_column,"XpathDescendente")
break;
}
},
rules: [/^(?:[\s]+)/i,/^(?:<)/i,/^(?:>)/i,/^(?:\/\/)/i,/^(?:\/)/i,/^(?:=)/i,/^(?:\|)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:div\b)/i,/^(?:!=)/i,/^(?:>=)/i,/^(?:<=)/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:mod\b)/i,/^(?:@)/i,/^(?:\.)/i,/^(?:\.\.)/i,/^(?:::)/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\()/i,/^(?:\))/i,/^(?:ancestor\b)/i,/^(?:attribute\b)/i,/^(?:child\b)/i,/^(?:descendant\b)/i,/^(?:following\b)/i,/^(?:namespace\b)/i,/^(?:parent\b)/i,/^(?:preceding\b)/i,/^(?:self\b)/i,/^(?:silbling\b)/i,/^(?:node\b)/i,/^(?:lang\b)/i,/^(?:position\b)/i,/^(?:last\b)/i,/^(?:text\b)/i,/^(?:'[^\']*')/i,/^(?:[0-9]+(\.[0-9]+)?\b)/i,/^(?:[0-9]+\b)/i,/^(?:[a-zA-Z_][a-zA-Z0-9_]*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],"inclusive":true}}
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
exports.parser = XpathT;
exports.Parser = XpathT.Parser;
exports.parse = function () { return XpathT.parse.apply(XpathT, arguments); };
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