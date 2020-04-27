# From JSPM to WEBPACK
As we got file `package.json` with `jspm` section prepare scripts for install packages

## Step 1
using the great tool `jq` 
```shell
$ npm install
```

## Step 2
Get scripts with install command for `npm` and `github` packages separatelly

```shell
$ # if package with jspm = `package-with-jspm.json`
$ npm start
$ # or
$ node jspm-get-packages.js {PACKAGE-WITH-JSPM.json}
```
The result will be save in files [`output/3.github-install.sh`, `output/3.npm-install.sh`]

## Step 3
Create new project `npm init -y` and lets try to install jspm packages!
> Attentivly check out installation process, if any package fails the whole script (3.github-install.sh | 3.npm-install.sh) would be stopped! 


> output/3.github-install.sh
```
$ # rename npm i --save github:alirezamirian/angular-material-lightbox#v0.0.11
$ # into 
$ npm i --save github:alirezamirian/angular-material-lightbox#0.0.11
```

> output/3.npm-install.sh
```
$ # rename angular-mask@^1.4.0
$ # into 
$ npm i --save angular-input-masks@^1.4.0
```

COMMING SOON!!! 
IN PROGRESS!!!
## Step 4
Copy src from `jspm` projects and setup webpack


gulp

---
## NOTES
```txt
"Niskigvan/mdPickers": "github:Niskigvan/mdPickers@master"                              EQUAL mdPickers CHECKED     npm i --save Niskigvan/mdPickers 

"SheetJS/js-xlsx": "github:SheetJS/sheetjs@^0.14.0"                                     LIKE xlsx CHECKED           npm i --save github:SheetJS/sheetjs#v0.14.0 

"angular-mask": "npm:angular-mask@^1.4.0"                                               LIKE angular-input-masks    npm i --save angular-input-masks@^1.4.0

"angular-material-lightbox": "github:alirezamirian/angular-material-lightbox@^0.0.11"   EQUAL                       npm i --save alirezamirian/angular-material-lightbox#0.0.11 

"angular-ui-tree": "github:angular-ui-tree/angular-ui-tree@^2.22.6"                     EQUAL                       npm i --save github:angular-ui-tree/angular-ui-tree#v2.22.3

"pouchdb": "npm:pouchdb@^6.0.7"                                                         ERROR NOT RESOLVED          npm i --ignore-scripts --save pouchdb@^6.0.7 

"pouchdb-find": "github:Niskigvan/pouchdb-find@master"                                  ???EEMS LIKE                  npm i --save pouchdb-find@^6.4.3                                                                       

"protobi/js-xlsx": "github:protobi/js-xlsx@^0.8.6"                                      THIS FORK FROM SheetJS/sheetjs  npm i --ignore-scripts  --save github:protobi/js-xlsx#v0.8.6     

"reflect-metadata": "npm:reflect-metadata@^0.1.8"           ERROR RELODING          npm i --ignore-scripts --save npm:reflect-metadata@^0.1.8

"sockjs-client": "github:sockjs/sockjs-client@1.1.4"           ERROR                    npm i --save github:sockjs/sockjs-client#v1.1.4
```
