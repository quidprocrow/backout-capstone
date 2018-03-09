// const fillers = require('../fillers.js')
// const getFormFields = require('../../../lib/get-form-fields.js')
// const ui = require('./ui.js')
const store = require('../store.js')
const seedApi = require('./seeds/api.js')
const api = require('./api.js')
const gameApi = require('../games/api.js')
const gameUi = require('../games/ui.js')

const adjustGame = function (data) {
  data.game.hope = data.game.hope + store.seedPlanter.hopemodifier
  data.game.wisdom = data.game.wisdom + store.seedPlanter.wisdommodifier
  return gameApi.updateGame(data)
}

const redactWords = function (redactArray, currentSentenceWords) {
  const promiseArray = []
  redactArray.forEach((redact) => {
    currentSentenceWords.forEach((word) => {
      if (redact === word.seedid) {
        let blotOut = {
          word: {
            id: word.id,
            clickable: false,
            redacted: true
          }
        }
        blotOut = JSON.stringify(blotOut)
        promiseArray.push(api.updateWord(blotOut))
      }
    })
  })
  return Promise.all(promiseArray)
}

const spitClicksFromWords = function (data) {
  // console.log('I am the data at spit', data)
  let clickless = {
    word: {
      id: data.id,
      text: data.text,
      clickable: false
    }
  }
  clickless = JSON.stringify(clickless)
  return clickless
}

const spitSeedsFromWords = function (data, sentenceId) {
  let seedless = {
    word: {
      text: data.text,
      clickable: data.clickable,
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

const clicklessWordLoop = function (data) {
  // expects an unseeded sentence to be the preceding data.
  // console.log('I am the data at clickless', data)
  const count = data.sentence.words.length
  const clickableWords = data.sentence.words
  const promiseArray = []
  for (let i = 0; i < count; i++) {
    // console.log('I am the data in the for loop', clickableWords[i])
    const newWord = spitClicksFromWords(clickableWords[i])
    // console.log('I got here', newWord)
    promiseArray.push(api.updateWord(newWord))
  }
  return Promise.all([promiseArray])
}

// Creates an array of promises to create words, based
// on the words in the seeded sentence that I want to copy.
// Puts those promises into an array, and then puts that promiseA
const seededWordLoop = function (data, senId) {
  // expects a seeded sentence to be the preceding data.
  const count = data.seededsentence.seededwords.length
  const seedWords = data.seededsentence.seededwords
  const promiseArray = []
  for (let i = 0; i < count; i++) {
    // console.log(seedWords[i])
    const newWord = spitSeedsFromWords(seedWords[i], senId)
    // console.log(newWord)
    promiseArray.push(api.createWord(newWord))
  }
  return Promise.all([promiseArray])
}

// Takes the return of a previous promise.
// Tests to see if that promise is the first sentence, in which case
// it uses the sentence id passed in with the data and appends words to them.
// Otherwise, it assumes that a seed step is being passed in, and uses
// its hard coded sentence index to know which seeded sentence to grab.

const makeSentenceWords = function (data, seedSenId, firstSen) {
  store.sentenceMaker.currentData = data
  return seedApi.showSeedSentence(seedSenId)
}

// Takes an object, inputs the parameters, and makes a blank
// fresh sentence.
// Returns a call to the sentence API to make a new sentence.
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

const getNextStep = function (event) {
  const id = $(event.target).data('id')
  const gameId = $(event.target).data('game-id')
  const origSenId = $(event.target).data('sentence-id')
  // console.log('I am the game id', gameId)

  api.showSentence(origSenId)
    .then((data) => {
      delete store.sentenceMaker
      store.sentenceMaker = {}
      store.sentenceMaker.currentSentenceWords = data.sentence.words
      return clicklessWordLoop(data)
    })
    .then(() => seedApi.showSeedStep(id))
    .then((data) => {
      store.seedPlanter = data.seededstep
      return redactWords(data.seededstep.redact, store.sentenceMaker.currentSentenceWords)
    })
    .then(() => seedApi.showSeedStep(id))
    .then(() => gameApi.showGame(gameId))
    .then((data) => adjustGame(data))
    .then(gameUi.showGameSuccess)
    .then(() => makeSentence(gameId))
    .then((data) => {
      // console.log('I am the data', data)
      delete store.sentenceMaker
      store.sentenceMaker = {}
      store.sentenceMaker.currentSentenceId = data.sentence.id
      // console.log('I am the store sentence', store.sentenceMaker)
      // console.log('what is id here?', id)
      return seedApi.showSeedStep(id)
    })
    .then((data) => {
      // console.log('seeded step', data)
      // console.log('I am the store', store.sentenceMaker)
      return makeSentenceWords(data, data.seededstep.sentenceindex, false)
    })
    .then((data) => {
      return seededWordLoop(data, store.sentenceMaker.currentSentenceId)
    })
    .then(() => gameApi.showGame(gameId))
    .then(gameUi.showGameSuccess)
    .catch(gameUi.showGameFailure)
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
