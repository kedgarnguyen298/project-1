components.chat = `
<section class="chat-container">
  <div class="aside-left">
    <div id="list-conversation" class="list-conversation">
    </div>
    <form id="form-add-conversation" class="form-add-conversation">
      <div class="input-wrapper">
        <input type="text" name="title" placeholder="Conversation title">
        <div id="title-error" class="message-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="email" name="friendEmail" placeholder="Your friend email">
        <div id="friend-email-error" class="message-error"></div>
      </div>
      <div id="add-conversation-error" class="message-error"></div>
      <button class="icon-btn" type="submit"><i class="fas fa-plus"></i></button>
    </form>
  </div>
  <button id="del-cv-btn" type="button">Delete</button>
  <div class="current-conversation">
    <div id="message-container" class="message-container">
    </div>
    <form id="form-chat" class="form-chat">
      <div class="input-wrapper">
        <input id="form-chat-input" type="text" name="message" placeholder="Enter your message">
      </div>
      <button id="form-chat-submit-btn" type="submit">Send</button>
    </form>
  </div>
</section>
`