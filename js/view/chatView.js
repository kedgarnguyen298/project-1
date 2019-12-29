view.handlers.chat = function () {
    let app = document.getElementById('app')
    app.innerHTML = components.nav + components.chat
    controller.loadConversations(model.authUser.email)
    controller.setupConversationSnapshot(model.authUser.email)

    let emailDom = document.getElementById('user-profile-email')
    emailDom.innerText = model.authUser.displayName

    let signOutBtn = document.getElementById('sign-out-btn')
    signOutBtn.onclick = signOut

    let formChat = document.getElementById('form-chat')
    formChat.onsubmit = formChatSubmitHandler

    let formAdd = document.getElementById('form-add-conversation')
    formAdd.onsubmit = formAddSubmitHandler

    let delCvBtn = document.getElementById('del-cv-btn')
    delCvBtn.onclick = delCvHandler

    async function delCvHandler() {
        console.log(model.currentConversation)
        firebase.firestore()
        .collection("conversations").doc(model.currentConversation.id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    function signOut() {
        firebase.auth().signOut()
    }

    function formChatSubmitHandler(e) {
        e.preventDefault()
        // 1. get message content from input
        // 2. validate & format message content
        // 3. submit message
        let messageContent = formChat.message.value.trim()
        
        if (messageContent) { // messageContent != ""
            let message = {
                createdAt: new Date().toISOString(),
                content: messageContent,
                owner: model.authUser.email
            }
            controller.sendMessage(message)
        }
    }

    function formAddSubmitHandler(e) {
        e.preventDefault()
        let title = formAdd.title.value
        let friendEmail = formAdd.friendEmail.value
        // TODO: missing validate
        let conversation = {
            title: title,
            createdAt: new Date().toISOString(),
            messages: [],
            users: [
                friendEmail,
                model.authUser.email
            ]
        }

        let validateResult = [
            view.validate(title, validators.stringRequire, 'title-error', 'Invalid title!'),
            view.validate(friendEmail, validators.email, 'friend-email-error', 'Invalid friend email!')
        ]
        if (allPassed(validateResult)) {
            controller.addConversation(conversation, friendEmail)
        }
    }
}

view.showCurrentConversation = function () {
    if (model.currentConversation) {
        let messageContainer = document.getElementById('message-container')
        let messages = model.currentConversation.messages
        messageContainer.innerHTML = ""
        for (let message of messages) {
            let className = "message-chat"
            if (message.owner == model.authUser.email) {
                className += " your"
            }
            let html = `
          <div class="${className}">
            <span>${message.content}</span>
          </div>
        `
            messageContainer.innerHTML += html
        }
        messageContainer.scrollTop = messageContainer.scrollHeight
    }
}

view.showListConversation = function () {
    if (model.conversations instanceof Array && model.conversations.length) {
        let listConversationDiv = document.getElementById('list-conversation')
        listConversationDiv.innerHTML = ""
        for (let conversation of model.conversations) {
            let html = `
          <div class="conversation">
            <span class="conversation-title">${conversation.title}</span>
            <span class="conversation-members">${conversation.users.length} members</span>
          </div>
        `
            listConversationDiv.innerHTML += html
        }
    }
}
