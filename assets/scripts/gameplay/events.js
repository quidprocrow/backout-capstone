const getNextSteps = require('./next-steps.js')
const store = require('../store.js')
const striptags = require('striptags')
const api = require('../games/api.js')
// const ui = require('../games/ui.js')

const redactSentence = function (sentence, redactionArray) {
  // Expects a sentence as a string and an array.
  const sentenceArray = sentence.split(' ')
  redactionArray.forEach(
    sentenceArray.forEach(
      // compare the value of the redaction array to the indexes of the sentence array
    )
  )
}

const stripPreviousSentence = function () {
  // Takes the stored value of the game's sentences.
  const sentenceArray = store.currentGame.sentences.slice()
  // Strips html tags from the last one.
  const updatedSentence = striptags(sentenceArray[sentenceArray.length - 1])
  // Removes the HTML version of the sentence and adds the text only version.
  sentenceArray.pop()
  sentenceArray.push(updatedSentence)
  // Returns the whole array.
  return sentenceArray
}

const storyProgress = function (event) {
  // Takes the id of the clickable span.
  const stepId = $(event.target).data('id')
  // When called with that id, the get next step function returns an object
  // containing a sentence, the indexes of items to redact, and modifiers
  // for the hope and wisdom scores.
  const step = getNextSteps(stepId)
  const sentenceArray = stripPreviousSentence()
  // Expect sentenceArray to be a copy of the game's sentences, with htm tags removed.
  sentenceArray.push(step.sentence)
  // Pushes the newest sentence on to the array.
  store.currentGame.sentences = sentenceArray
  // Adjusts hope and wisdom according to the step.
  store.currentGame.hope += step.hopemodifier
  store.currentGame.wisdom += step.wisdommodifier
  // Create data object to match api expectations.
  const data = {
    game: store.currentGame
  }
  api.updateGame(data)
    .then(console.log)
    .catch(console.error)
}

const addGameplayEventListeners = function () {
  $('#content').on('click', '.clickable', storyProgress)
}

module.exports = {
  addGameplayEventListeners
}
