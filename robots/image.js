const google = require('googleapis').google;
const customSearch = google.customsearch('v1');
const state = require('./state.js');

const googleSearchCredentials = require('../credentials/google-search.json')

async function robot(){
    const content = state.load()

await feacthImagesOfAllSentences(content)

state.save(content)

async function feacthImagesOfAllSentences(content){
    for(const sentence of content.sentences){
        const query = `${content.searchTerm} ${sentence.keywords[0]}` 
        sentence.images = await feacthGoogleAndReturnImagesLinks(query)

        sentence.googleSearchQuery = query

    }
}

    async function feacthGoogleAndReturnImagesLinks(query){
        const response = await customSearch.cse.list({
            auth: googleSearchCredentials.apikey,
            cx: googleSearchCredentials.seachEngineId,
            q: query,
            searchType: 'image',
            num: 2
    })
    const imagesUrl = response.data.items.map((item) => {
        return item.link
      })
  
      return imagesUrl
    }  
}

module.exports = robot

