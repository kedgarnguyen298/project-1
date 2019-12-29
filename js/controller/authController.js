
controller.initAuth = function () {
    view.showComponent('loading')
    firebase.auth().onAuthStateChanged(authStateChangedHandler)

    function authStateChangedHandler(user) {
        if (user && user.emailVerified) {
            model.authenticated(user)
            view.showComponent('chat')
        } else {
            view.showComponent('register')
        }
    }
}

controller.register = async function (registerInfo) {
    let email = registerInfo.email
    let password = registerInfo.password
    let displayName = registerInfo.firstname + " " + registerInfo.lastname
    let buttonSubmit = document.getElementById('register-submit-btn')

    // 1. create account with email and password
    // 2. update account.displayName
    // 3. send confirm email
    buttonSubmit.setAttribute('disabled', true)
    try {
        view.setText('register-error', '')
        view.setText('register-success', '')

        await firebase.auth().createUserWithEmailAndPassword(email, password) // throw Error
        firebase.auth().currentUser.updateProfile({
            displayName: displayName
        })
        await firebase.auth().currentUser.sendEmailVerification()

        view.setText('register-success', 'An confirm link has been sended to your email address!')
    } catch (err) {
        console.error(err)
        view.setText('register-error', err.message)
    }
    buttonSubmit.removeAttribute('disabled')
}

controller.logIn = async function (logInInfo) {
    // 1. sign in user with email & password
    // 2. if correct email & password & email verified >> log in success
    // 3. else >> log in failed
    let email = logInInfo.email
    let password = logInInfo.password
    let btnSubmit = document.getElementById('log-in-submit-btn')

    view.setText('log-in-error', '')
    btnSubmit.setAttribute('disabled', true)
    try {
        let result = await firebase.auth().signInWithEmailAndPassword(email, password)
        if (!result.user || !result.user.emailVerified) {
            throw new Error('Must verify email!')
        }
    } catch (err) {
        console.error(err)
        view.setText('log-in-error', err.message)
        btnSubmit.removeAttribute('disabled')
    }

    view.showComponent('chat')
}