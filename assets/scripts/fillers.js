const store = require('./store.js')
const introTemplate = require('./templates/intro.handlebars')
const navTemplate = require('./templates/nav.handlebars')
const instructionsTemplate = require('./templates/instructions.handlebars')
const msgTemplate = require('./templates/message.handlebars')
const changePassTemplate = require('./templates/change-password.handlebars')
const signInTemplate = require('./templates/sign-in-form.handlebars')
const signUpTemplate = require('./templates/sign-up-form.handlebars')
const manyGamesTemplate = require('./templates/many-games.handlebars')
const indexGamesTemplate = require('./templates/index-games.handlebars')
const newGameTemplate = require('./templates/new-game.handlebars')
const updateGameTemplate = require('./templates/update-game.handlebars')

const refresh = function () {
  $('#content').html('')
}

const greeting = function () {
  const userGreet = store.user.email.split('@')
  // Greet the user.
  if (userGreet[0].length < 16) {
    $('.user-greeting').html(userGreet[0]).css('text-transform', 'uppercase')
  } else {
    $('.user-greeting').html('HELLO').css('text-transform', 'uppercase')
  }
}

const showNav = function () {
  const navHtml = navTemplate()
  $('#content').html(navHtml)
  greeting()
}

const showMsg = function () {
  const msgHtml = msgTemplate()
  $('#content').append(msgHtml)
}

const showManyGames = function () {
  refresh()
  showNav()
  const manyGamesHtml = manyGamesTemplate()
  $('#content').append(manyGamesHtml)
  showMsg()
}

const storyFill = function (data) {
  const story = ['<p class="justify">']
  const neatSentences = store.currentGame.words.sort(function (a, b) {
    if (a.seedid < b.seedid) {
      return -1
    } else if (a.seedid > b.seedid) {
      return 1
    } else {
      return 0
    }
  })
  neatSentences.forEach((word) => {
    if (word.clickable === true) {
      const palimpsest = '<span class="clickable" data-id="' + word.seedstep + '" data-sentence-id="' + word.sentence_id + '" data-game-id="' + store.currentGame.id + '">' + word.text + '</span>'
      story.push(palimpsest)
    } else if (word.redacted === true) {
      const palimpsest = '<span class="redacted">' + word.text + '</span>'
      story.push(palimpsest)
    } else {
      story.push(word.text)
    }
  })
  story.push('</p>')
  const neatHtml = story.join(' ')
  $('#display-one-game').html(neatHtml)
}

const showOneGame = function (data) {
  refresh()
  $('#navigation').show()
  $('#one-game').show()
  $('#error-message-section').show()
  $('#user-message').html('')
  $('#mnemonic-title').html(data.game.mnemonic)
  $('#wisdom-bar-percentage').css('width', (data.game.wisdom + '%'))
  $('#hope-bar-percentage').css('width', (data.game.hope + '%'))
  storyFill(data)
}

const showIntro = function () {
  refresh()
  const introHtml = introTemplate()
  $('#content').html(introHtml)
}

const tableFill = function (data) {
  const indexGamesHtml = indexGamesTemplate({'games': data.games})
  $('#display-all-games').html(indexGamesHtml)
}

const showInstructions = function () {
  refresh()
  showNav()
  const instructionsHtml = instructionsTemplate()
  $('#content').append(instructionsHtml)
  showMsg()
}

const showChangePass = function () {
  refresh()
  showNav()
  const changePassHtml = changePassTemplate()
  $('#content').append(changePassHtml)
  showMsg()
}

const showUpdateField = function (game, gameValue, id) {
  // const inputHtml = (`
  //   <form class="update-game-form" data-id="${id}">
  //       <input type="text" name="game[mnemonic]" style="max-width: 200px" value="${gameValue}">
  //   </form>
  //   `)
  // const confirmHtml = (`
  //   <span data-id="${id}" class="cnfrm">CNFRM</span>
  //   `)
  // const nevermindHtml = (`
  //     <span data-id="${id}" class="nvm">NVM</span>
  //     `)
  const gameData = {
    id: id,
    mnemonic: gameValue
  }
  const inputHtml = updateGameTemplate({'game': gameData})
  $(game).siblings('.mnemonic').html(inputHtml)
  $(game).siblings('.delete-game').hide()
  $(game).hide()
  // $(game).parent().append(confirmHtml)
  // $(game).parent().append(nevermindHtml)
}

const showNewGameForm = function () {
  const newGameHtml = newGameTemplate()
  $('#new-game-form-area').html(newGameHtml)
}

const showSignInForm = function () {
  const signHtml = signInTemplate()
  $('#sign-forms').html(signHtml)
}

const showSignUpForm = function () {
  const signHtml = signUpTemplate()
  $('#sign-forms').html(signHtml)
}

module.exports = {
  refresh,
  showSignInForm,
  showSignUpForm,
  showInstructions,
  showIntro,
  showChangePass,
  showManyGames,
  showNewGameForm,
  showUpdateField,
  tableFill,
  showOneGame
}
