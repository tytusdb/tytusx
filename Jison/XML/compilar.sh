#!/bin/zsh

echo compilando archivo jison...
jison AnalyzerXML.jison
echo ----------------------------------------

echo moviendo archivo
cp AnalyzerXML.js ../../dist/
mv AnalyzerXML.js ../../
echo ----------------------------------------
