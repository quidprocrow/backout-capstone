
const refresh = function () {
  $('#intro').hide()
  $('#navigation').hide()
  $('#instructions').hide()
  $('#change-password').hide()
  $('#error-message-section').hide()
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
  $('#error-message-section').html('')
}
const showChangePass = function () {
  refresh()
  $('#navigation').show()
  $('#change-password').show()
  $('#error-message-section').show()
  $('#error-message-section').html('')
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
  showChangePass
}
