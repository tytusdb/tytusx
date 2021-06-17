
del "../../__build/gramaticas/xml" /q
call jison -o "../../__build/gramaticas/xml/xmlAnalyzer.js"  xmlAnalyzer.jison
call jison -o "../../__build/gramaticas/xml/xmlAnalyzerAst.js"  xmlAnalyzerAst.jison
