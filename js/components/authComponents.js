components.register = `
<section class="register-container">
  <form id="register-form" class="register-form">
    <h3 class="form-header">
      <span>Simple Chat</span>
    </h3>
    <div class="form-content">
      <!-- input.. -->
      <div class="name-wrapper">
        <div class="input-wrapper">
          <input type="text" name="firstname" placeholder="Firstname">
          <div id="firstname-error" class="message-error"></div>
        </div>
        <div class="input-wrapper">
          <input type="text" name="lastname" placeholder="Lastname">
          <div id="lastname-error" class="message-error"></div>
        </div>
      </div>
      <div class="input-wrapper">
        <input type="email" name="email" placeholder="Email">
        <div id="email-error" class="message-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="password" name="password" placeholder="Password">
        <div id="password-error" class="message-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="password" name="confirmPassword" placeholder="Confirm password">
        <div id="confirm-password-error" class="message-error"></div>
      </div>
    </div>
    <div id="register-error" class="message-error"></div>
    <div id="register-success" class="message-success"></div>
    <div class="form-footer">
      <!-- link + button -->
      <a id="register-link" href="#">Already have an account? Log in</a>
      <button id="register-submit-btn" type="submit">Register</button>
    </div>
  </form>
</section>`

components.logIn = `
<section class="log-in-container">
  <form id="log-in-form" class="log-in-form">
    <h3 class="form-header">
      <span>Simple Chat</span>
    </h3>
    <div class="form-content">
      <!-- input.. -->
      <div class="input-wrapper">
        <input type="email" name="email" placeholder="Email">
        <div id="email-error" class="message-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="password" name="password" placeholder="Password">
        <div id="password-error" class="message-error"></div>
      </div>
    </div>
    <div id="log-in-error" class="message-error"></div>
    <div class="form-footer">
      <!-- link + button -->
      <a id="log-in-link" href="#">Not yet have an account? Register</a>
      <button id="log-in-submit-btn" type="submit">Log in</button>
    </div>
  </form>
</section>`