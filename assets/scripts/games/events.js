const fillers = require('../fillers.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')
const gameplayEvents = require('../gameplay/events.js')
// const seedApi = require('../gameplay/seeds/api.js')

const onPlayClick = function (event) {
  console.log('it happen')
  const id = $(event.target).data('id')
  api.showGame(id)
    .then(ui.showGameSuccess)
    .catch(ui.showGameFailure)
}

// Takes the updated mnemonic and places it a copy of original game.
const smooshUpdate = function (returnedData, formData) {
  returnedData.game.mnemonic = formData.game.mnemonic
  return api.updateGame(returnedData)
}

// const spitSeedsFromWords = function (data, sentenceId) {
//   let seedless = {
//     word: {
//       text: data.text,
//       clickable: data.clickable,
//       step: data.step,
//       user_id: store.user.id,
//       redacted: data.redacted,
//       sentence_id: sentenceId,
//       seedid: data.id
//
//     }
//   }
//   seedless = JSON.stringify(seedless)
//   return seedless
// }
//
// const wordLoop = function (data, senId) {
//   const count = data.seededsentence.seededwords.length
//   const seedWords = data.seededsentence.seededwords
//   for (let i = 0; i < count; i++) {
//     console.log(seedWords[i])
//     const newWord = spitSeedsFromWords(seedWords[i], senId)
//     console.log(newWord)
//     api.createWord(newWord)
//       .then()
//       .catch(ui.indexGamesFailure)
//   }
// }
//
// const firstSentenceWords = function (data) {
//   const senId = data.sentence.id
//   seedApi.showSeedSentence(1)
//     .then((data) => wordLoop(data, senId))
//     .catch(console.errors)
// }
//
// const firstSentence = function (id) {
//   let seedless = {
//     sentence: {
//       active: 'active',
//       game_id: id,
//       user_id: store.user.id
//     }
//   }
//   seedless = JSON.stringify(seedless)
//   return api.createSentence(seedless)
// }

const onEditSubmit = function (event) {
  event.preventDefault()
  const id = $(event.target).data('id')
  const data = getFormFields(event.target)
  api.showGame(id)
    .then((returnedData) => smooshUpdate(returnedData, data))
    .then(api.indexGames)
    .then(ui.indexGamesSuccess)
    .catch(ui.indexGamesFailure)
}

const onCnfrmClick = function (event) {
  $(event.target).siblings('.mnemonic').children('.update-game-form').submit()
}

const onNvmClick = function () {
  api.indexGames()
    .then(ui.indexGamesSuccess)
    .catch(ui.indexGamesFailure)
}

const updateGameClick = function (event) {
  const id = $(event.target).data('id')
  const gameValue = $(event.target).siblings('.mnemonic').data('mnemonic-update')
  fillers.showUpdateField(event.target, gameValue, id)
}

const deleteGameClick = function (event) {
  const id = $(event.target).data('id')
  api.deleteGame(id)
    .then(api.indexGames)
    .then(ui.indexGamesSuccess)
    .catch(ui.indexGamesFailure)
}

const newGameSubmit = function (event) {
  event.preventDefault()
  let data = getFormFields(event.target)
  data.game.hope = 75
  data.game.wisdom = 50
  data.game.user_id = store.user.id
  data = JSON.stringify(data)
  api.createGame(data)
    .then((data) => gameplayEvents.makeSentence(data.game.id))
    .then((data) => gameplayEvents.makeSentenceWords(data, 1))
    .then(ui.createGameSuccess)
    .then(api.indexGames)
    .then(ui.indexGamesSuccess)
    .catch(ui.createGameFailure)
}

const gameButtonClick = function () {
  fillers.showNewGameForm()
}

const gameLinkClick = function () {
  fillers.showManyGames()
  api.indexGames()
    .then(ui.indexGamesSuccess)
    .catch(ui.indexGamesFailure)
}

const addGamesEventListeners = function () {
  $('#game-link').on('click', gameLinkClick)
  $('#new-game-button').on('click', gameButtonClick)
  $('#new-game-form-area').on('submit', '#new-game-form', newGameSubmit)
  $('#display-all-games').on('click', '.delete-game', deleteGameClick)
  $('#display-all-games').on('click', '.update-game', updateGameClick)
  $('#display-all-games').on('click', '.nvm', onNvmClick)
  $('#display-all-games').on('click', '.cnfrm', onCnfrmClick)
  $('#display-all-games').on('submit', '.update-game-form', onEditSubmit)
  $('#display-all-games').on('click', '.play-game', onPlayClick)
}

module.exports = {
  addGamesEventListeners
}
