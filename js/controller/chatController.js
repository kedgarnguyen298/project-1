
controller.loadConversations = async function (email) {
  let data = await firebase.firestore()
    .collection('conversations')
    .where('users', 'array-contains', email)
    .get()
  let conversations = []
  for (let doc of data.docs) {
    let conversation = doc.data()
    conversation.id = doc.id
    conversations.push(conversation)
  }
  model.saveConversations(conversations)
  if (conversations.length > 0) {
    model.saveCurrentConversation(conversations[0])
  }
  view.showCurrentConversation()
  view.showListConversation()
}

controller.setupConversationSnapshot = async function (email) {
  let firstTimeRun = true
  firebase.firestore()
    .collection('conversations')
    .where('users', 'array-contains', email)
    .onSnapshot(function (snapshot) {
      if (firstTimeRun) {
        // ignore run the first time
        firstTimeRun = false
        return
      }
      // run else where when database change
      let docChanges = snapshot.docChanges()
      for (let docChange of docChanges) {
        let conversation = docChange.doc.data()
        conversation.id = docChange.doc.id

        if (docChange.type == 'modified') {

          model.updateConversation(conversation)
          if (conversation.id == model.currentConversation.id) {
            model.currentConversation = conversation
            view.showCurrentConversation()
          }
        }
        if (docChange.type == 'added') {
          model.updateConversation(conversation)
        }
      }

      view.showListConversation()
    })
}

controller.sendMessage = async function (message) {
  let btnSubmit = document.getElementById('form-chat-submit-btn')
  let input = document.getElementById('form-chat-input')
  btnSubmit.setAttribute('disabled', true)

  try {
    await firebase.firestore().collection('conversations')
      .doc(model.currentConversation.id)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
      })
  } catch (err) {
    console.log(err)
  }

  btnSubmit.removeAttribute('disabled')
  input.value = ''
}

controller.addConversation = async function (conversation, friendEmail) {
  try {
    let formAdd = document.getElementById('form-add-conversation')
    view.setText('add-conversation-error', '')
    let signInMethods = await firebase
      .auth()
      .fetchSignInMethodsForEmail(friendEmail)
    if (!signInMethods.length) {
      throw new Error('Email do not exist')
    }

    await firebase
      .firestore()
      .collection('conversations')
      .add(conversation)

    formAdd.title.value = ''
    formAdd.friendEmail.value = ''
  } catch (err) {
    view.setText('add-conversation-error', err.message)
  }
}