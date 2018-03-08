// const fillers = require('../fillers.js')
// const getFormFields = require('../../../lib/get-form-fields.js')
// const ui = require('./ui.js')
const store = require('../store.js')
const seedApi = require('./seeds/api.js')
const api = require('./api.js')
const gameApi = require('../games/api.js')
const gameUi = require('../games/ui.js')

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
  if (data.seededstep !== null) {
    seedless.word.seedstep = data.seededstep.id
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

const makeSentenceWords = function (data, seedSenId, firstSen) {
  console.log('what is data when you get to make sentence words?', data)
  let senId = null
  if (firstSen === true) {
    senId = data.sentence.id
  } else {
    senId = store.sentenceMaker.currentSentenceId
  }
  console.log('I am the seed sentence Id you want', seedSenId)
  console.log('I am the sentence you want to put words on', senId)
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

const getNextSentence = function () {
  console.log('sup')
}

const getNextStep = function (event) {
  const id = $(event.target).data('id')
  const gameId = $(event.target).data('game-id')
  console.log('I am the game id', gameId)

  makeSentence(gameId)
    .then((data) => {
      console.log('I am the data', data)
      store.sentenceMaker = {}
      store.sentenceMaker.currentSentenceId = data.sentence.id
      console.log('I am the store sentence', store.sentenceMaker)
      console.log('what is id here?', id)
      return seedApi.showSeedStep(id)
    })
    .then((data) => {
      console.log('seeded step', data)
      console.log('I am the store', store.sentenceMaker)
      return makeSentenceWords(data, data.seededstep.sentenceindex, false)
    })
    // .then(() => gameApi.showOneGame(gameId))
    // .then(gameUi.showGameSuccess)
    .catch(console.error)
}

const addGameplayEventListeners = function () {
  $('#display-one-game').on('click', '.clickable', getNextStep)
}

module.exports = {
  makeSentence,
  makeSentenceWords,
  seededWordLoop,
  spitSeedsFromWords,
  addGameplayEventListeners
}
