const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apikey
const sentenceBoundaryDetection = require('sbd')

async function robot(content) {
 await fetchContentFromWikipedida(content)
     sanitizeContent(content)
     breackContentIntoSentences(content)


async function fetchContentFromWikipedida(content) {
    const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
    const wikipedidaAlgorithm = algorithmiaAuthenticated.algo("web/WikipediaParser/0.1.2?timeout=300")  
    const wikipediaResponse = await wikipedidaAlgorithm.pipe(content.searchTerm)
    const wikipediaContent = wikipediaResponse.get()

    content.sourceContentOriginal = wikipediaContent.content
  }

  function sanitizeContent(content) {
    const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
    const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)
    
    content.sourceContentSanitized = withoutDatesInParentheses

    function removeBlankLinesAndMarkdown(text) {
      const allLines = text.split('\n')

      const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
        if (line.trim().length === 0 || line.trim().startsWith('=')) {
          return false
        }

        return true
      })

      return withoutBlankLinesAndMarkdown.join(' ')
    }
 }

    function removeDatesInParentheses(text){
        return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
    }
     
    function breackContentIntoSentences(content){
        content.sentences = []
        const sentences =  sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentences => {
            content.sentences.push({
                text: sentences,
                keywords: [],
                images: []
            })
        }))
    }
}
module.exports = robot