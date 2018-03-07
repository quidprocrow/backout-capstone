
const refresh = function () {
  $('#intro').hide()
  $('#navigation').hide()
  $('#instructions').hide()
  $('#change-password').hide()
  $('#many-games').hide()
  $('#user-message').html('')
  $('#sign-forms').html('')
}

const showManyGames = function () {
  refresh()
  $('#navigation').show()
  $('#many-games').show()
  $('#error-message-section').show()
  $('#user-message').html('')
}

const showIntro = function () {
  refresh()
  $('#intro').show()
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
  showNewGameForm
}
