(this.webpackJsonpproyecto1compi2=this.webpackJsonpproyecto1compi2||[]).push([[105],{139:function(t,e,n){!function(t){"use strict";var e={addition:"positive",attributes:"attribute",bold:"strong",cite:"keyword",code:"atom",definitionList:"number",deletion:"negative",div:"punctuation",em:"em",footnote:"variable",footCite:"qualifier",header:"header",html:"comment",image:"string",italic:"em",link:"link",linkDefinition:"link",list1:"variable-2",list2:"variable-3",list3:"keyword",notextile:"string-2",pre:"operator",p:"property",quote:"bracket",span:"quote",specialChar:"tag",strong:"strong",sub:"builtin",sup:"builtin",table:"variable-3",tableHeading:"operator"};function n(t,e){e.mode=d.newLayout,e.tableHeading=!1,"definitionList"===e.layoutType&&e.spanningLayout&&t.match(p("definitionListEnd"),!1)&&(e.spanningLayout=!1)}function i(t,n,i){if("_"===i)return t.eat("_")?a(t,n,"italic",/__/,2):a(t,n,"em",/_/,1);if("*"===i)return t.eat("*")?a(t,n,"bold",/\*\*/,2):a(t,n,"strong",/\*/,1);if("["===i)return t.match(/\d+\]/)&&(n.footCite=!0),r(n);if("("===i&&t.match(/^(r|tm|c)\)/))return o(n,e.specialChar);if("<"===i&&t.match(/(\w+)[^>]+>[^<]+<\/\1>/))return o(n,e.html);if("?"===i&&t.eat("?"))return a(t,n,"cite",/\?\?/,2);if("="===i&&t.eat("="))return a(t,n,"notextile",/==/,2);if("-"===i&&!t.eat("-"))return a(t,n,"deletion",/-/,1);if("+"===i)return a(t,n,"addition",/\+/,1);if("~"===i)return a(t,n,"sub",/~/,1);if("^"===i)return a(t,n,"sup",/\^/,1);if("%"===i)return a(t,n,"span",/%/,1);if("@"===i)return a(t,n,"code",/@/,1);if("!"===i){var l=a(t,n,"image",/(?:\([^\)]+\))?!/,1);return t.match(/^:\S+/),l}return r(n)}function a(t,e,n,i,a){var l=t.pos>a?t.string.charAt(t.pos-a-1):null,o=t.peek();if(e[n]){if((!o||/\W/.test(o))&&l&&/\S/.test(l)){var u=r(e);return e[n]=!1,u}}else(!l||/\W/.test(l))&&o&&/\S/.test(o)&&t.match(new RegExp("^.*\\S"+i.source+"(?:\\W|$)"),!1)&&(e[n]=!0,e.mode=d.attributes);return r(e)}function r(t){var n=l(t);if(n)return n;var i=[];return t.layoutType&&i.push(e[t.layoutType]),i=i.concat(u(t,"addition","bold","cite","code","deletion","em","footCite","image","italic","link","span","strong","sub","sup","table","tableHeading")),"header"===t.layoutType&&i.push(e.header+"-"+t.header),i.length?i.join(" "):null}function l(t){var n=t.layoutType;switch(n){case"notextile":case"code":case"pre":return e[n];default:return t.notextile?e.notextile+(n?" "+e[n]:""):null}}function o(t,e){var n=l(t);if(n)return n;var i=r(t);return e?i?i+" "+e:e:i}function u(t){for(var n=[],i=1;i<arguments.length;++i)t[arguments[i]]&&n.push(e[arguments[i]]);return n}function s(t){var e=t.spanningLayout,n=t.layoutType;for(var i in t)t.hasOwnProperty(i)&&delete t[i];t.mode=d.newLayout,e&&(t.layoutType=n,t.spanningLayout=!0)}var c={cache:{},single:{bc:"bc",bq:"bq",definitionList:/- .*?:=+/,definitionListEnd:/.*=:\s*$/,div:"div",drawTable:/\|.*\|/,foot:/fn\d+/,header:/h[1-6]/,html:/\s*<(?:\/)?(\w+)(?:[^>]+)?>(?:[^<]+<\/\1>)?/,link:/[^"]+":\S/,linkDefinition:/\[[^\s\]]+\]\S+/,list:/(?:#+|\*+)/,notextile:"notextile",para:"p",pre:"pre",table:"table",tableCellAttributes:/[\/\\]\d+/,tableHeading:/\|_\./,tableText:/[^"_\*\[\(\?\+~\^%@|-]+/,text:/[^!"_=\*\[\(<\?\+~\^%@-]+/},attributes:{align:/(?:<>|<|>|=)/,selector:/\([^\(][^\)]+\)/,lang:/\[[^\[\]]+\]/,pad:/(?:\(+|\)+){1,2}/,css:/\{[^\}]+\}/},createRe:function(t){switch(t){case"drawTable":return c.makeRe("^",c.single.drawTable,"$");case"html":return c.makeRe("^",c.single.html,"(?:",c.single.html,")*","$");case"linkDefinition":return c.makeRe("^",c.single.linkDefinition,"$");case"listLayout":return c.makeRe("^",c.single.list,p("allAttributes"),"*\\s+");case"tableCellAttributes":return c.makeRe("^",c.choiceRe(c.single.tableCellAttributes,p("allAttributes")),"+\\.");case"type":return c.makeRe("^",p("allTypes"));case"typeLayout":return c.makeRe("^",p("allTypes"),p("allAttributes"),"*\\.\\.?","(\\s+|$)");case"attributes":return c.makeRe("^",p("allAttributes"),"+");case"allTypes":return c.choiceRe(c.single.div,c.single.foot,c.single.header,c.single.bc,c.single.bq,c.single.notextile,c.single.pre,c.single.table,c.single.para);case"allAttributes":return c.choiceRe(c.attributes.selector,c.attributes.css,c.attributes.lang,c.attributes.align,c.attributes.pad);default:return c.makeRe("^",c.single[t])}},makeRe:function(){for(var t="",e=0;e<arguments.length;++e){var n=arguments[e];t+="string"===typeof n?n:n.source}return new RegExp(t)},choiceRe:function(){for(var t=[arguments[0]],e=1;e<arguments.length;++e)t[2*e-1]="|",t[2*e]=arguments[e];return t.unshift("(?:"),t.push(")"),c.makeRe.apply(null,t)}};function p(t){return c.cache[t]||(c.cache[t]=c.createRe(t))}var d={newLayout:function(t,e){return t.match(p("typeLayout"),!1)?(e.spanningLayout=!1,(e.mode=d.blockType)(t,e)):(l(e)||(t.match(p("listLayout"),!1)?n=d.list:t.match(p("drawTable"),!1)?n=d.table:t.match(p("linkDefinition"),!1)?n=d.linkDefinition:t.match(p("definitionList"))?n=d.definitionList:t.match(p("html"),!1)&&(n=d.html)),(e.mode=n||d.text)(t,e));var n},blockType:function(t,e){var n,i;return e.layoutType=null,(n=t.match(p("type")))?((n=(i=n[0]).match(p("header")))?(e.layoutType="header",e.header=parseInt(n[0][1])):i.match(p("bq"))?e.layoutType="quote":i.match(p("bc"))?e.layoutType="code":i.match(p("foot"))?e.layoutType="footnote":i.match(p("notextile"))?e.layoutType="notextile":i.match(p("pre"))?e.layoutType="pre":i.match(p("div"))?e.layoutType="div":i.match(p("table"))&&(e.layoutType="table"),e.mode=d.attributes,r(e)):(e.mode=d.text)(t,e)},text:function(t,e){if(t.match(p("text")))return r(e);var n=t.next();return'"'===n?(e.mode=d.link)(t,e):i(t,e,n)},attributes:function(t,n){return n.mode=d.layoutLength,t.match(p("attributes"))?o(n,e.attributes):r(n)},layoutLength:function(t,e){return t.eat(".")&&t.eat(".")&&(e.spanningLayout=!0),e.mode=d.text,r(e)},list:function(t,e){var n=t.match(p("list"));e.listDepth=n[0].length;var i=(e.listDepth-1)%3;return e.layoutType=i?1===i?"list2":"list3":"list1",e.mode=d.attributes,r(e)},link:function(t,n){return n.mode=d.text,t.match(p("link"))?(t.match(/\S+/),o(n,e.link)):r(n)},linkDefinition:function(t,n){return t.skipToEnd(),o(n,e.linkDefinition)},definitionList:function(t,e){return t.match(p("definitionList")),e.layoutType="definitionList",t.match(/\s*$/)?e.spanningLayout=!0:e.mode=d.attributes,r(e)},html:function(t,n){return t.skipToEnd(),o(n,e.html)},table:function(t,e){return e.layoutType="table",(e.mode=d.tableCell)(t,e)},tableCell:function(t,e){return t.match(p("tableHeading"))?e.tableHeading=!0:t.eat("|"),e.mode=d.tableCellAttributes,r(e)},tableCellAttributes:function(t,n){return n.mode=d.tableText,t.match(p("tableCellAttributes"))?o(n,e.attributes):r(n)},tableText:function(t,e){return t.match(p("tableText"))?r(e):"|"===t.peek()?(e.mode=d.tableCell,r(e)):i(t,e,t.next())}};t.defineMode("textile",(function(){return{startState:function(){return{mode:d.newLayout}},token:function(t,e){return t.sol()&&n(t,e),e.mode(t,e)},blankLine:s}})),t.defineMIME("text/x-textile","textile")}(n(4))}}]);
//# sourceMappingURL=105.f79d6a02.chunk.js.map