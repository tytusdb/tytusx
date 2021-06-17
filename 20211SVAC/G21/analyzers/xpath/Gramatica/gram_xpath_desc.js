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
var gram_xpath_desc = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[5,7],$V1=[2,6],$V2=[1,4],$V3=[1,5],$V4=[26,28,29,30,31,32,35],$V5=[2,20],$V6=[1,9],$V7=[1,10],$V8=[1,11],$V9=[1,12],$Va=[1,13],$Vb=[1,14],$Vc=[1,15],$Vd=[1,16],$Ve=[1,17],$Vf=[1,18],$Vg=[1,19],$Vh=[1,20],$Vi=[1,21],$Vj=[1,25],$Vk=[1,26],$Vl=[1,27],$Vm=[1,28],$Vn=[1,29],$Vo=[1,30],$Vp=[1,31],$Vq=[5,7,8,11],$Vr=[2,30],$Vs=[1,49],$Vt=[1,64],$Vu=[1,70],$Vv=[1,72],$Vw=[1,61],$Vx=[1,62],$Vy=[1,68],$Vz=[1,63],$VA=[2,37],$VB=[1,69],$VC=[1,71],$VD=[1,73],$VE=[1,74],$VF=[8,26,28,31,32,33,34,35,39,59,60,61,62],$VG=[2,44],$VH=[1,88],$VI=[1,86],$VJ=[1,87],$VK=[1,89],$VL=[1,90],$VM=[8,26,28,30,31,32,33,34,35,39,43,44,45,46,59,60,61,62],$VN=[2,52],$VO=[1,92],$VP=[1,93],$VQ=[1,94],$VR=[1,95],$VS=[1,96],$VT=[1,97],$VU=[8,26,28,30,31,32,33,34,35,39,43,44,45,46,49,50,51,52,53,54,59,60,61,62],$VV=[2,56],$VW=[1,99],$VX=[1,100],$VY=[8,26,28,30,31,32,33,34,35,39,43,44,45,46,49,50,51,52,53,54,57,58,59,60,61,62];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"BEGIN":3,"INSTRUCCIONES":4,"EOF":5,"INSTRUCCION":6,"or":7,"axis":8,"AXISNAME":9,"NODO":10,"d_axis":11,"ancestor":12,"cpuntos":13,"ancestororself":14,"attribute":15,"child":16,"descendant":17,"descendantorself":18,"following":19,"followingsibling":20,"namespace":21,"parent":22,"preceding":23,"precedingsibling":24,"self":25,"identificador":26,"PREDICADOS":27,"punto":28,"ppunto":29,"por":30,"at":31,"text":32,"p_abre":33,"p_cierra":34,"node":35,"PREDICADO":36,"c_abre":37,"CONTENIDO":38,"c_cierra":39,"EXPRESION":40,"T":41,"EXPP":42,"mas":43,"menos":44,"div":45,"mod":46,"F":47,"TP":48,"menorque":49,"menorigual":50,"mayorque":51,"mayorigual":52,"igual":53,"diferente":54,"G":55,"FP":56,"land":57,"lor":58,"numero":59,"StringLiteral":60,"last":61,"position":62,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"or",8:"axis",11:"d_axis",12:"ancestor",13:"cpuntos",14:"ancestororself",15:"attribute",16:"child",17:"descendant",18:"descendantorself",19:"following",20:"followingsibling",21:"namespace",22:"parent",23:"preceding",24:"precedingsibling",25:"self",26:"identificador",28:"punto",29:"ppunto",30:"por",31:"at",32:"text",33:"p_abre",34:"p_cierra",35:"node",37:"c_abre",39:"c_cierra",43:"mas",44:"menos",45:"div",46:"mod",49:"menorque",50:"menorigual",51:"mayorque",52:"mayorigual",53:"igual",54:"diferente",57:"land",58:"lor",59:"numero",60:"StringLiteral",61:"last",62:"position"},
productions_: [0,[3,2],[4,3],[4,1],[6,4],[6,4],[6,0],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,2],[9,0],[10,2],[10,2],[10,2],[10,2],[10,3],[10,3],[10,3],[10,3],[27,2],[27,0],[36,3],[38,2],[38,3],[38,4],[38,4],[38,2],[38,0],[40,2],[42,3],[42,3],[42,3],[42,3],[42,3],[42,0],[41,2],[48,3],[48,3],[48,3],[48,3],[48,3],[48,3],[48,0],[47,2],[56,3],[56,3],[56,0],[55,3],[55,1],[55,1],[55,1],[55,1],[55,3],[55,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
}
},
table: [o($V0,$V1,{3:1,4:2,6:3,8:$V2,11:$V3}),{1:[3]},{5:[1,6]},{5:[2,3],7:[1,7]},o($V4,$V5,{9:8,12:$V6,14:$V7,15:$V8,16:$V9,17:$Va,18:$Vb,19:$Vc,20:$Vd,21:$Ve,22:$Vf,23:$Vg,24:$Vh,25:$Vi}),o($V4,$V5,{9:22,12:$V6,14:$V7,15:$V8,16:$V9,17:$Va,18:$Vb,19:$Vc,20:$Vd,21:$Ve,22:$Vf,23:$Vg,24:$Vh,25:$Vi}),{1:[2,1]},o($V0,$V1,{6:3,4:23,8:$V2,11:$V3}),{10:24,26:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,35:$Vp},{13:[1,32]},{13:[1,33]},{13:[1,34]},{13:[1,35]},{13:[1,36]},{13:[1,37]},{13:[1,38]},{13:[1,39]},{13:[1,40]},{13:[1,41]},{13:[1,42]},{13:[1,43]},{13:[1,44]},{10:45,26:$Vj,28:$Vk,29:$Vl,30:$Vm,31:$Vn,32:$Vo,35:$Vp},{5:[2,2]},o($V0,$V1,{6:46,8:$V2,11:$V3}),o($Vq,$Vr,{27:47,36:48,37:$Vs}),o($Vq,$Vr,{36:48,27:50,37:$Vs}),o($Vq,$Vr,{36:48,27:51,37:$Vs}),o($Vq,$Vr,{36:48,27:52,37:$Vs}),{26:[1,53],30:[1,54]},{33:[1,55]},{33:[1,56]},o($V4,[2,7]),o($V4,[2,8]),o($V4,[2,9]),o($V4,[2,10]),o($V4,[2,11]),o($V4,[2,12]),o($V4,[2,13]),o($V4,[2,14]),o($V4,[2,15]),o($V4,[2,16]),o($V4,[2,17]),o($V4,[2,18]),o($V4,[2,19]),o($V0,$V1,{6:57,8:$V2,11:$V3}),o($V0,[2,4]),o($Vq,[2,21]),o($Vq,$Vr,{36:48,27:58,37:$Vs}),{8:$Vt,26:$Vu,28:$Vv,31:$Vw,32:$Vx,33:$Vy,35:$Vz,38:59,39:$VA,40:60,41:65,47:66,55:67,59:$VB,60:$VC,61:$VD,62:$VE},o($Vq,[2,22]),o($Vq,[2,23]),o($Vq,[2,24]),o($Vq,$Vr,{36:48,27:75,37:$Vs}),o($Vq,$Vr,{36:48,27:76,37:$Vs}),{34:[1,77]},{34:[1,78]},o($V0,[2,5]),o($Vq,[2,29]),{39:[1,79]},{8:$Vt,26:$Vu,28:$Vv,31:$Vw,32:$Vx,33:$Vy,35:$Vz,38:80,39:$VA,40:60,41:65,47:66,55:67,59:$VB,60:$VC,61:$VD,62:$VE},{26:$Vu,28:$Vv,33:$Vy,40:81,41:65,47:66,55:67,59:$VB,60:$VC,61:$VD,62:$VE},{33:[1,82]},{33:[1,83]},{8:$Vt,26:$Vu,28:$Vv,31:$Vw,32:$Vx,33:$Vy,35:$Vz,38:84,39:$VA,40:60,41:65,47:66,55:67,59:$VB,60:$VC,61:$VD,62:$VE},o($VF,$VG,{42:85,30:$VH,43:$VI,44:$VJ,45:$VK,46:$VL}),o($VM,$VN,{48:91,49:$VO,50:$VP,51:$VQ,52:$VR,53:$VS,54:$VT}),o($VU,$VV,{56:98,57:$VW,58:$VX}),{26:$Vu,28:$Vv,33:$Vy,40:101,41:65,47:66,55:67,59:$VB,60:$VC,61:$VD,62:$VE},o($VY,[2,58]),o($VY,[2,59]),o($VY,[2,60]),o($VY,[2,61]),{33:[1,102]},{33:[1,103]},o($Vq,[2,25]),o($Vq,[2,26]),o($Vq,[2,27]),o($Vq,[2,28]),o([5,7,8,11,37],[2,31]),{39:[2,32]},{8:$Vt,26:$Vu,28:$Vv,31:$Vw,32:$Vx,33:$Vy,35:$Vz,38:104,39:$VA,40:60,41:65,47:66,55:67,59:$VB,60:$VC,61:$VD,62:$VE},{34:[1,105]},{34:[1,106]},{39:[2,36]},o($VF,[2,38]),{26:$Vu,28:$Vv,33:$Vy,41:107,47:66,55:67,59:$VB,60:$VC,61:$VD,62:$VE},{26:$Vu,28:$Vv,33:$Vy,41:108,47:66,55:67,59:$VB,60:$VC,61:$VD,62:$VE},{26:$Vu,28:$Vv,33:$Vy,41:109,47:66,55:67,59:$VB,60:$VC,61:$VD,62:$VE},{26:$Vu,28:$Vv,33:$Vy,41:110,47:66,55:67,59:$VB,60:$VC,61:$VD,62:$VE},{26:$Vu,28:$Vv,33:$Vy,41:111,47:66,55:67,59:$VB,60:$VC,61:$VD,62:$VE},o($VM,[2,45]),{26:$Vu,28:$Vv,33:$Vy,47:112,55:67,59:$VB,60:$VC,61:$VD,62:$VE},{26:$Vu,28:$Vv,33:$Vy,47:113,55:67,59:$VB,60:$VC,61:$VD,62:$VE},{26:$Vu,28:$Vv,33:$Vy,47:114,55:67,59:$VB,60:$VC,61:$VD,62:$VE},{26:$Vu,28:$Vv,33:$Vy,47:115,55:67,59:$VB,60:$VC,61:$VD,62:$VE},{26:$Vu,28:$Vv,33:$Vy,47:116,55:67,59:$VB,60:$VC,61:$VD,62:$VE},{26:$Vu,28:$Vv,33:$Vy,47:117,55:67,59:$VB,60:$VC,61:$VD,62:$VE},o($VU,[2,53]),{26:$Vu,28:$Vv,33:$Vy,55:118,59:$VB,60:$VC,61:$VD,62:$VE},{26:$Vu,28:$Vv,33:$Vy,55:119,59:$VB,60:$VC,61:$VD,62:$VE},{34:[1,120]},{34:[1,121]},{34:[1,122]},{39:[2,33]},{8:$Vt,26:$Vu,28:$Vv,31:$Vw,32:$Vx,33:$Vy,35:$Vz,38:123,39:$VA,40:60,41:65,47:66,55:67,59:$VB,60:$VC,61:$VD,62:$VE},{8:$Vt,26:$Vu,28:$Vv,31:$Vw,32:$Vx,33:$Vy,35:$Vz,38:124,39:$VA,40:60,41:65,47:66,55:67,59:$VB,60:$VC,61:$VD,62:$VE},o($VF,$VG,{42:125,30:$VH,43:$VI,44:$VJ,45:$VK,46:$VL}),o($VF,$VG,{42:126,30:$VH,43:$VI,44:$VJ,45:$VK,46:$VL}),o($VF,$VG,{42:127,30:$VH,43:$VI,44:$VJ,45:$VK,46:$VL}),o($VF,$VG,{42:128,30:$VH,43:$VI,44:$VJ,45:$VK,46:$VL}),o($VF,$VG,{42:129,30:$VH,43:$VI,44:$VJ,45:$VK,46:$VL}),o($VM,$VN,{48:130,49:$VO,50:$VP,51:$VQ,52:$VR,53:$VS,54:$VT}),o($VM,$VN,{48:131,49:$VO,50:$VP,51:$VQ,52:$VR,53:$VS,54:$VT}),o($VM,$VN,{48:132,49:$VO,50:$VP,51:$VQ,52:$VR,53:$VS,54:$VT}),o($VM,$VN,{48:133,49:$VO,50:$VP,51:$VQ,52:$VR,53:$VS,54:$VT}),o($VM,$VN,{48:134,49:$VO,50:$VP,51:$VQ,52:$VR,53:$VS,54:$VT}),o($VM,$VN,{48:135,49:$VO,50:$VP,51:$VQ,52:$VR,53:$VS,54:$VT}),o($VU,$VV,{56:136,57:$VW,58:$VX}),o($VU,$VV,{56:137,57:$VW,58:$VX}),o($VY,[2,57]),o($VY,[2,62]),o($VY,[2,63]),{39:[2,34]},{39:[2,35]},o($VF,[2,39]),o($VF,[2,40]),o($VF,[2,41]),o($VF,[2,42]),o($VF,[2,43]),o($VM,[2,46]),o($VM,[2,47]),o($VM,[2,48]),o($VM,[2,49]),o($VM,[2,50]),o($VM,[2,51]),o($VU,[2,54]),o($VU,[2,55])],
defaultActions: {6:[2,1],23:[2,2],80:[2,32],84:[2,36],104:[2,33],123:[2,34],124:[2,35]},
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

    errores = [];
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
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip white space */
break;
case 1:return 16  
break;
case 2:return 18
break;
case 3:return 20
break;
case 4:return 24
break;
case 5:return 14
break;
case 6:return 17
break;
case 7:return 19
break;
case 8:return 23
break;
case 9:return 12
break;
case 10:return 15
break;
case 11:return 25
break;
case 12:return 21
break;
case 13:return 22
break;
case 14:return 32
break;
case 15:return 35
break;
case 16:return 62
break;
case 17:return 61
break;
case 18:return 57
break;
case 19:return 58
break;
case 20:return 53
break;
case 21:return 54
break;
case 22:return 50
break;
case 23:return 49
break;
case 24:return 52
break;
case 25:return 51
break;
case 26:return 43
break;
case 27:return 44
break;
case 28:return 30
break;
case 29:return 45 
break;
case 30:return 46
break;
case 31:return 37
break;
case 32:return 39
break;
case 33:return 33
break;
case 34:return 34
break;
case 35:return 13
break;
case 36:return 'dpuntos'
break;
case 37:return 29
break;
case 38:return 28
break;
case 39:return 31
break;
case 40:return 7
break;
case 41:return 11
break;
case 42:return 8
break;
case 43:return 60
break;
case 44:return 'CharLiteral'
break;
case 45:return 59;
break;
case 46:return 26;  
break;
case 47:  
    console.error('Error léxico: ' + yy_.yytext + ', linea: ' + yy_.yylloc.first_line + ', columna: ' + yy_.yylloc.first_column);
    errores.push({'Error Type': 'Lexico', 'Row': yy_.yylloc.first_line, 'Column': yy_.yylloc.first_column, 'Description': 'El caracter: '+yy_.yytext+' no pertenece al lenguaje' });

break;
case 48:return 5
break;
}
},
rules: [/^(?:\s+)/,/^(?:child\b)/,/^(?:descendant-or-self\b)/,/^(?:following-sibling\b)/,/^(?:preceding-sibling\b)/,/^(?:ancestor-or-self\b)/,/^(?:descendant\b)/,/^(?:following\b)/,/^(?:preceding\b)/,/^(?:ancestor\b)/,/^(?:attribute\b)/,/^(?:self\b)/,/^(?:namespace\b)/,/^(?:parent\b)/,/^(?:text\b)/,/^(?:node\b)/,/^(?:position\b)/,/^(?:last\b)/,/^(?:and\b)/,/^(?:or\b)/,/^(?:=)/,/^(?:!=)/,/^(?:<=)/,/^(?:<)/,/^(?:>=)/,/^(?:>)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:div\b)/,/^(?:mod\b)/,/^(?:\[)/,/^(?:\])/,/^(?:\()/,/^(?:\))/,/^(?:::)/,/^(?::)/,/^(?:\.\.)/,/^(?:\.)/,/^(?:@)/,/^(?:\|)/,/^(?:\/\/)/,/^(?:\/)/,/^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/,/^(?:{charliteral})/,/^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+))|[0-9]+)/,/^(?:[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9_ñÑ]*)/,/^(?:.)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],"inclusive":true}}
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
exports.parser = gram_xpath_desc;
exports.Parser = gram_xpath_desc.Parser;
exports.parse = function () { return gram_xpath_desc.parse.apply(gram_xpath_desc, arguments); };
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