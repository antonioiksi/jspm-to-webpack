# From JSPM to WEBPACK

## Step 1
As we got file `package.json` with `jspm` section prepare scripts for install packages

using the great tool `jq` 
```shell
    npm install
    node jq-filter.js # get file `package-with-jspm.json` and transfor into `result_2.json` - npm modules and `result_3.json` - github modules
```

## Step 2
Install modules in your new scratch
```shell
    cp result_2.json result_2.json.sh 
    ./result_2.json.sh # chmod 700 result_2.json.sh
    cp result_3.json result_3.json.sh 
    ./result_3.json.sh # chmod 700 result_3.json.sh
```
> Attentivly check out installation process, if any package fails the whole script (result_2.json.sh | result_3.json.sh) would be stopped! 


## Step 3
Copy src from `jspm` projects and setup webpack




---

```txt
"Niskigvan/mdPickers": "github:Niskigvan/mdPickers@master"                              EQUAL mdPickers CHECKED     npm i --save Niskigvan/mdPickers 

"SheetJS/js-xlsx": "github:SheetJS/sheetjs@^0.14.0"                                     LIKE xlsx CHECKED           npm i --save github:SheetJS/sheetjs#v0.14.0 

"angular-mask": "npm:angular-mask@^1.4.0"                                               LIKE angular-input-masks    npm i --save angular-input-masks@^1.4.0

"angular-material-lightbox": "github:alirezamirian/angular-material-lightbox@^0.0.11"   EQUAL                       npm i --save alirezamirian/angular-material-lightbox#0.0.11 

"angular-ui-tree": "github:angular-ui-tree/angular-ui-tree@^2.22.6"                     EQUAL                       npm i --save github:angular-ui-tree/angular-ui-tree#v2.22.3

"pouchdb": "npm:pouchdb@^6.0.7"                                                         ERROR NOT RESOLVED          npm i --ignore-scripts --save pouchdb@^6.0.7 

"pouchdb-find": "github:Niskigvan/pouchdb-find@master"                                  ???EEMS LIKE                  npm i --save pouchdb-find@^6.4.3                                                                       

"protobi/js-xlsx": "github:protobi/js-xlsx@^0.8.6"                                      THIS FORM FROM SheetJS/sheetjs  npm i --ignore-scripts  --save github:protobi/js-xlsx#v0.8.6     

"reflect-metadata": "npm:reflect-metadata@^0.1.8"           ERROR RELODING          npm i --ignore-scripts --save npm:reflect-metadata@^0.1.8

"sockjs-client": "github:sockjs/sockjs-client@1.1.4"           ERROR                    npm i --save github:sockjs/sockjs-client#v1.1.4
```
