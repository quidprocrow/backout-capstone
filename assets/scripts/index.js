'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const userEvents = require('./users/events.js')
const gameEvents = require('./games/events.js')
const gameplayEvents = require('./gameplay/events.js')
const fillers = require('./fillers.js')

$(() => {
  setAPIOrigin(location, config)
  fillers.showIntro()
  userEvents.addUserEventListeners()
  gameEvents.addGamesEventListeners()
  gameplayEvents.addGameplayEventListeners()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
