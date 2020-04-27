const jq = require('node-jq')
const fs = require('fs')

const myArgs = process.argv.slice(2);

// const jsonPath = 'package-with-jspm.json'
const jsonPath = myArgs[0]
if(jsonPath.length === 0) {
    console.error("Please enter package.json with 'jspm.dependencies' section")
    return 1;
}

let dir_output = "output"
if (!fs.existsSync(dir_output)){
    fs.mkdirSync(dir_output);
}

// const jsonPath = '.jspm.dependencies[] | select( contains("jspm"))'

let step_number = 0
async function stepJQ(filter, jsonPathOrData, options, resultPath) {
    // let f_name = `result_${step_number}.json`
    // step_number++

    // options = {raw: true} - print without quotes!!!!!
    let result = await jq.run(filter, jsonPathOrData, options);  
    
    fs.writeFileSync(resultPath, result, 'utf8')
    // return f_name
}

(async() => {
    
    // STEP1 get dependencies
    let resultPath1 = `${dir_output}/1.jspm.dependencies.json`
    let filter1 = '.jspm.dependencies'
    await stepJQ(filter1, jsonPath, {output: 'pretty'}, resultPath1)
    
    let data = fs.readFileSync(resultPath1, 'utf8');
    console.log(data)

    // STEP2 remove jspm and systemjs packs
    let resultPath2 = `${dir_output}/2.jspm.dependencies.no-jspm.no-systemjs.json`
    // let filter2 = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false ) ]'
    // let filter2 = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false )  | {(.key): .value} ] 
    let filter2 = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false )  | {(.key): .value}] | add '
    await stepJQ(filter2, resultPath1, {output: 'pretty'}, resultPath2)
    data = fs.readFileSync(resultPath2, 'utf8');
    console.log(data)

    // STEP3 filter npm packs and prepare install script
    let resultPath3 = `${dir_output}/3.npm-install.sh`
    // let filter3 = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false )  | {(.key): .value}] | add [] | "npm i --save \(sub( "github:|npm:"; ""))"'
    // let filter3 = '.[] | "npm i --save \\(sub( "github:|npm:"; "")) &&"'
    let filter3 = '.[] | select(contains("npm")) | "echo \\"❗ npm i --save \\(.)\\" &&\n npm i --save \\(.) &&"'
    await stepJQ(filter3, resultPath2, {raw: true}, resultPath3)
    data = fs.readFileSync(resultPath3, 'utf8');
    console.log(data)
    fs.appendFileSync(resultPath3, 'echo "\nALL RIGHT😉"', 'utf8')

    // STEP4 filter github packs and prepare install script
    let resultPath4 = `${dir_output}/3.github-install.sh`
    // let filter4 = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false )  | {(.key): .value}] | add [] | "npm i --save \(sub( "github:|npm:"; ""))"'
    // let filter4 = '.[] | "npm i --save \\(sub( "github:|npm:"; "")) &&"'
    // let filter4 = '.[] | select(contains("github")) | "echo \\"\\(.)\\" &&\n npm i --save \\(sub("@\\\\^|@"; "#v")) &&"'
    let filter4 = '.[] | select(contains("github")) | sub("@\\\\^|@"; "#v") | sub("#vmaster";"") | "echo \\"❗ npm i --save \\(.)\\" &&\n npm i --save \\(.) &&"'
    
    await stepJQ(filter4, resultPath2, {raw: true}, resultPath4)
    data = fs.readFileSync(resultPath4, 'utf8');
    console.log(data)
    fs.appendFileSync(resultPath4, 'echo "\nALL RIGHT😉"', 'utf8')

})();

