#!/bin/zsh

echo compilando archivo jison...
jison AnalyzerXML.jison
jison ../XPATH/jisonXpaht.jison
echo ----------------------------------------

echo traspilando archivos TypeScript
tsc
echo ----------------------------------------

echo moviendo archivo
mv AnalyzerXML.js ../../js
mv jisonXpaht.js ../XPATH/
echo ----------------------------------------
