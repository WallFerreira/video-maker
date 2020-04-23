const readline = require('readline-sync')

function start(){
    const content = {}

content.seachTerm = askAndReturnSeachTerm()
content.prefix = askAndReturnPrefixTerm()

function askAndReturnSeachTerm(){
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