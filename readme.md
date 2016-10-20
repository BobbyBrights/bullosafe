# Компилируем .pug
Компилированиe с помощью File Watcher в IDE от JetBrains
* __Arguments__: $FileName$ --pretty --out $ProjectFileDir$/public/ -O "{'basedir': 'path_to/bullosafe/src/'}"
* __Output paths to refresh__: $ProjectFileDir$/public/$FileNameWithoutExtension$.html
* __Scope pattern__: !file[src]:*/_*//*

# SVG-изображения
Работают только при запущенном сервере (локально тоже), так как загружаются из svgIcons.js, используя Local Storage для их кеширования

