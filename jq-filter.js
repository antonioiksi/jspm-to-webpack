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
    let filter = '.jspm.dependencies'
    
    let f_name = await stepJQ(filter, jsonPath, {output: 'pretty'})
    let data = fs.readFileSync(f_name, 'utf8');
    console.log(data)

    // let filter = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false ) ]'
    // let filter = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false )  | {(.key): .value} ] 
    filter = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false )  | {(.key): .value}] | add'

    f_name = await stepJQ(filter, f_name, {output: 'pretty'})
    data = fs.readFileSync(f_name, 'utf8');
    console.log(data)

    // filter = '[to_entries[] | select(.value | contains("jspm") ==false and contains("systemjs") ==false )  | {(.key): .value}] | add [] | "npm i --save \(sub( "github:|npm:"; ""))"'
    filter = '.[] | "npm i --save \\(sub( "github:|npm:"; "")) &&"'
    f_name = await stepJQ(filter, f_name, {raw: true})
    data = fs.readFileSync(f_name, 'utf8');
    console.log(data)

    fs.appendFileSync(f_name, '\n', 'utf8')
    fs.appendFileSync(f_name, 'echo "ALL RIGHT😉"', 'utf8')
})();

