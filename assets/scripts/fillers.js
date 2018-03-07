
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
}

const showManyGames = function () {
  refresh()
  $('#navigation').show()
  $('#many-games').show()
  $('#error-message-section').show()
  $('#user-message').html('')
}

const showOneGame = function (data) {
  refresh()
  $('#navigation').show()
  $('#one-game').show()
  $('#error-message-section').show()
  $('#user-message').html('')
  $('#mnemonic-title').html(data.game.mnemonic)
}

const showIntro = function () {
  refresh()
  $('#intro').show()
}

const tableFill = function (data) {
  const halt = data.games.length - 1
  const tableHtml = (`
    <table class="center">
      <tr>
        <td class="table-top" width="200px">
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
        <td class="table-top" width="100px">
        PLAY
        </td>
      </tr>
    `)
  $('#display-all-games').html(tableHtml)
  data.games.forEach((game, index) => {
    const title = game.mnemonic.slice(0, 16)
    const gameHtml = (`
      <tr height="50px">
        <td class="table-cell" width="221px" data-id="${game.id}">
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
        <td class="table-cell" width="111px">
        <span data-id="${game.id}" class="play-game">GO</span>
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
  $('#navigation').show()
  $('#instructions').show()
  $('#error-message-section').show()
  $('#user-message').html('')
}
const showChangePass = function () {
  refresh()
  $('#navigation').show()
  $('#change-password').show()
  $('#error-message-section').show()
  $('#user-message').html('')
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
  const signHtml = (`
      <h2>SIGN IN</h2>
      <form id="sign-in-form">
        <div class="center">
          <input type="text" name="credentials[email]" placeholder="EMAIL" class="input-field">
        </div>
        <div class="center">
        <input type="password" name= "credentials[password]" placeholder="PASSWORD" class="input-field">
        </div>
        <button class="little-button" id="sign-in-form-button">SIGN IN</button>
      </form>
  `)
  $('#sign-forms').html(signHtml)
}

const showSignUpForm = function () {
  const signHtml = (`
    <form id="sign-up-form">
          <h2>SIGN UP</h2>
          <div class="center">
            <input type="text" name="credentials[email]" placeholder="EMAIL" class="input-field">
          </div>
          <div class="center">
          <input type="password" name= "credentials[password]" placeholder="PASSWORD" class="input-field">
          </div>
          <div class="center">
          <input type="password" name= "credentials[password_confirmation]" placeholder="PASSWORD CONFIRMATION" class="input-field">
          </div>
          <button class="little-button" id="sign-up-form-button">SIGN UP</button>
          </form>
  `)
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
