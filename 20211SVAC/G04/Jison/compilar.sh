#!/bin/zsh

echo compilando archivos jison...
jison ./XML/AnalyzerXML.jison
jison ./XPATH/jisonXpaht.jison
jison ./XPATH/AnalyzerXpathDesc.jison
echo ----------------------------------------

echo traspilando archivos TypeScript
tsc
echo ----------------------------------------

echo moviendo archivo
mv AnalyzerXML.js ../js
mv jisonXpaht.js ./XPATH
mv AnalyzerXpathDesc.js ../js/XPATH
echo ----------------------------------------
