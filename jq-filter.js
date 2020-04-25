const jq = require('node-jq')
const fs = require('fs')

const jsonPath = 'package-with-jspm.json'

// const jsonPath = '.jspm.dependencies[] | select( contains("jspm"))'

let step_number = 0
async function stepJQ(filter, jsonPathOrData, options) {
    let f_name = `result_${step_number}.json`
    step_number++

    // options = {raw: true} - print without quotes!!!!!
    let result = await jq.run(filter, jsonPathOrData, options);  
    
    fs.writeFileSync(f_name, result, 'utf8')
    return f_name
}

(async() => {
    
    // STEP1 get dependencies
    let filter1 = '.jspm.dependencies'
    let f_name1 = await stepJQ(filter1, jsonPath, {output: 'pretty'})
    let data = fs.readFileSync(f_name1, 'utf8');
    console.log(data)

    // STEP2 remove jspm and systemjs packs
    // let filter2 = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false ) ]'
    // let filter2 = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false )  | {(.key): .value} ] 
    let filter2 = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false )  | {(.key): .value}] | add '
    let f_name2 = await stepJQ(filter2, f_name1, {output: 'pretty'})
    data = fs.readFileSync(f_name2, 'utf8');
    console.log(data)

    // STEP3 filter npm packs and prepare install script
    // let filter3 = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false )  | {(.key): .value}] | add [] | "npm i --save \(sub( "github:|npm:"; ""))"'
    // let filter3 = '.[] | "npm i --save \\(sub( "github:|npm:"; "")) &&"'
    let filter3 = '.[] | select(contains("npm")) | "echo \\"\\(.)\\" &&\n npm i --save \\(.) &&"'
    let f_name3 = await stepJQ(filter3, f_name2, {raw: true})
    data = fs.readFileSync(f_name3, 'utf8');
    console.log(data)
    fs.appendFileSync(f_name3, '\n', 'utf8')
    fs.appendFileSync(f_name3, 'echo "ALL RIGHT😉"', 'utf8')

    // STEP4 filter github packs and prepare install script
    // let filter4 = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false )  | {(.key): .value}] | add [] | "npm i --save \(sub( "github:|npm:"; ""))"'
    // let filter4 = '.[] | "npm i --save \\(sub( "github:|npm:"; "")) &&"'
    // let filter4 = '.[] | select(contains("github")) | "echo \\"\\(.)\\" &&\n npm i --save \\(sub("@\\\\^|@"; "#v")) &&"'
    let filter4 = '.[] | select(contains("github")) | sub("@\\\\^|@"; "#v") | sub("#vmaster";"") | "echo \\"\\(.)\\" &&\n npm i --save \\(.) &&"'
    
    let f_name4 = await stepJQ(filter4, f_name2, {raw: true})
    data = fs.readFileSync(f_name4, 'utf8');
    console.log(data)
    fs.appendFileSync(f_name4, '\n', 'utf8')
    fs.appendFileSync(f_name4, 'echo "ALL RIGHT😉"', 'utf8')



})();

