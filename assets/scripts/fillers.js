const store = require('./store.js')
const introTemplate = require('./templates/intro.handlebars')
const navTemplate = require('./templates/nav.handlebars')
const instructionsTemplate = require('./templates/instructions.handlebars')
const msgTemplate = require('./templates/message.handlebars')
const changePassTemplate = require('./templates/change-password.handlebars')
const signInTemplate = require('./templates/sign-in-form.handlebars')
const signUpTemplate = require('./templates/sign-up-form.handlebars')

const refresh = function () {
  $('#intro').hide()
  $('#navigation').hide()
  $('#instructions').hide()
  $('#change-password').hide()
  $('#many-games').hide()
  $('#user-message').html('')
  $('#sign-forms').html('')
  $('#new-game-form-area').html('')
  $('#mnemonic-title').html('')
  $('#one-game').hide()
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

const showManyGames = function () {
  refresh()
  $('#navigation').show()
  $('#many-games').show()
  $('#error-message-section').show()
  $('#user-message').html('')
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
  const halt = data.games.length - 1
  const tableHtml = (`
    <table class="center">
      <tr>
        <td class="table-top" width="300px">
        MNEMONIC
        </td>
        <td class="table-top" width="50px">
        SENTENCES
        </td>
        <td class="table-top" width="75px">
        HOPE
        </td>
        <td class="table-top" width="75px">
        WISDOM
        </td>
      </tr>
    `)
  $('#display-all-games').html(tableHtml)
  data.games.forEach((game, index) => {
    const title = game.mnemonic.slice(0, 16)
    const gameHtml = (`
      <tr height="50px">
        <td class="table-cell" width="332px" data-id="${game.id}">
        <p class="mnemonic" data-mnemonic-update="${game.mnemonic}">${title}</p>

        <span data-id="${game.id}" class="delete-game">X</span>
        <span data-id="${game.id}" class="update-game">EDIT</span>

        </td>
        <td class="table-cell" width="111px" data-id="${game.id}">
        ${game.sentences.length}
        </td>
        <td class="table-cell" width="83px" data-id="${game.id}">
        ${game.hope}
        </td>
        <td class="table-cell" width="83px" data-id="${game.id}">
        ${game.wisdom}
        </td>
      </tr>
      `)
    $('#display-all-games').append(gameHtml)
    if (index === halt) {
      const endTableHtml = (`
        </table>
        `)
      $('#display-all-games').append(endTableHtml)
    }
  })
}

const showInstructions = function () {
  refresh()
  const navHtml = navTemplate()
  const instructionsHtml = instructionsTemplate()
  const msgHtml = msgTemplate()
  $('#content').html(navHtml)
  $('#content').append(instructionsHtml)
  $('#content').append(msgHtml)
  greeting()
}

const showChangePass = function () {
  refresh()
  const navHtml = navTemplate()
  const changePassHtml = changePassTemplate()
  const msgHtml = msgTemplate()
  $('#content').html(navHtml)
  $('#content').append(changePassHtml)
  $('#content').append(msgHtml)
  greeting()
}

const showUpdateField = function (game, gameValue, id) {
  const inputHtml = (`
    <form class="update-game-form" data-id="${id}">
        <input type="text" name="game[mnemonic]" style="max-width: 200px" value="${gameValue}">
    </form>
    `)
  const confirmHtml = (`
    <span data-id="${id}" class="cnfrm">CNFRM</span>
    `)
  const nevermindHtml = (`
      <span data-id="${id}" class="nvm">NVM</span>
      `)
  $(game).siblings('.mnemonic').html(inputHtml)
  $(game).siblings('.delete-game').hide()
  $(game).hide()
  $(game).parent().append(confirmHtml)
  $(game).parent().append(nevermindHtml)
}

const showNewGameForm = function () {
  const newGameHtml = (`
    <form id="new-game-form">
      <div class="center">
        <input type="text" name="game[mnemonic]" placeholder="NICKNAME FOR THIS GAME" class="input-field">
      </div>
      <button class="little-button" id="new-game-form-button">CONFIRM</button>
    </form>
    `)
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
