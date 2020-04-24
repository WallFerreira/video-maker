const readline = require('readline-sync');
const robots = {
    text: require('./robots/text.js')
   }

async function start(){
    const content = {}

content.searchTerm = askAndReturnSearchTerm()
content.prefix = askAndReturnPrefixTerm()

await robots.text(content)

function askAndReturnSearchTerm(){
    return readline.question('Type a Wikipedia serach term:  ')
}

function askAndReturnPrefixTerm(){
    const prefixes = ['Who is', 'what is', 'The history of']
    const selectPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ')
    const selectPrefixText = prefixes[selectPrefixIndex]

    return selectPrefixText
}

console.log(content)

}

start();