const fillers = require('../fillers.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')
const gameplayEvents = require('../gameplay/events.js')
// const seedApi = require('../gameplay/seeds/api.js')

const onPlayClick = function (event) {
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
  $(event.target).parent('.mnemonic').children('.update-game-form').submit()
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
    // .then((data) => gameplayEvents.makeSentence(data.game.id))
    // .then((data) => {
    //   delete store.sentenceMaker
    //   store.sentenceMaker = {}
    //   store.sentenceMaker.currentSentenceId = data.sentence.id
    //   return gameplayEvents.makeSentenceWords(data, 1, true)
    // })
    // .then((data) => {
    //   return gameplayEvents.seededWordLoop(data, store.sentenceMaker.currentSentenceId)
    // })
    // you will need to add some stuff to call sentence words
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
  $('#content').on('click', '#game-link', gameLinkClick)
  $('#content').on('click', '#new-game-button', gameButtonClick)
  $('#content').on('submit', '#new-game-form', newGameSubmit)
  $('#content').on('click', '.delete-game', deleteGameClick)
  $('#content').on('click', '.update-game', updateGameClick)
  $('#content').on('click', '.nvm', onNvmClick)
  $('#content').on('click', '.cnfrm', onCnfrmClick)
  $('#content').on('submit', '.update-game-form', onEditSubmit)
  $('#content').on('click', '.play-game', onPlayClick)
}

module.exports = {
  addGamesEventListeners
}
