set OLDDIR = %CD%

cd /d %~dp0
cd ..

java ^
 -jar utils/closure-compiler/compiler.jar ^
 --formatting=PRETTY_PRINT ^
 --compilation_level=WHITESPACE_ONLY ^
 --js=js/lib/json/json2.js ^
 --js=js/src/econda/util/EscapeHelper.js ^
 --js=js/src/econda/recengine/Context.js ^
 --js=js/src/econda/recengine/ContextCategory.js ^
 --js=js/src/econda/recengine/Widget.js ^
 --js_output_file=js/build/econda_recommendations.js
 
cd %OLDDIR%
 