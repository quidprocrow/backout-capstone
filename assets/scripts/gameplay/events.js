// const fillers = require('../fillers.js')
// const getFormFields = require('../../../lib/get-form-fields.js')
// const api = require('./api.js')
// const ui = require('./ui.js')
const store = require('../store.js')
const seedApi = require('./seeds/api.js')
const api = require('./api.js')

const spitSeedsFromWords = function (data, sentenceId) {
  let seedless = {
    word: {
      text: data.text,
      clickable: data.clickable,
      step: data.step,
      user_id: store.user.id,
      redacted: data.redacted,
      sentence_id: sentenceId,
      seedid: data.id

    }
  }
  seedless = JSON.stringify(seedless)
  return seedless
}

const seededWordLoop = function (data, senId) {
  const count = data.seededsentence.seededwords.length
  const seedWords = data.seededsentence.seededwords
  for (let i = 0; i < count; i++) {
    console.log(seedWords[i])
    const newWord = spitSeedsFromWords(seedWords[i], senId)
    console.log(newWord)
    api.createWord(newWord)
      .then(console.log)
      .catch(console.error)
  }
}

const makeSentenceWords = function (data, seedSenId) {
  const senId = data.sentence.id
  seedApi.showSeedSentence(seedSenId)
    .then((data) => seededWordLoop(data, senId))
    .catch(console.errors)
}

const makeSentence = function (id) {
  let seedless = {
    sentence: {
      active: 'active',
      game_id: id,
      user_id: store.user.id
    }
  }
  seedless = JSON.stringify(seedless)
  return api.createSentence(seedless)
}

module.exports = {
  makeSentence,
  makeSentenceWords,
  seededWordLoop,
  spitSeedsFromWords
}
