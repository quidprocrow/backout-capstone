const fillers = require('../fillers.js')
// const getFormFields = require('../../../lib/get-form-fields.js')
// const api = require('./api.js')
// const ui = require('./ui.js')
// const store = require('../store.js')

const gameLinkClick = function () {
  fillers.showManyGames()
}

const addGamesEventListeners = function () {
  $('#game-link').on('click', gameLinkClick)
}

module.exports = {
  addGamesEventListeners
}
