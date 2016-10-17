# Компилируем .pug
Компилированиe с помощью File Watcher в IDE от JetBrains
* __Arguments__: $FileName$ --pretty --out $ProjectFileDir$/public/ -O "{'basedir': 'path_to/bullosafe/src/'}"
* __Output paths to refresh__: $ProjectFileDir$/public/$FileNameWithoutExtension$.html
* __Scope pattern__: !file[src]:*/_*//*