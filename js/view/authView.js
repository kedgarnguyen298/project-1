view.handlers.register = function () {
    let app = document.getElementById('app')
    app.innerHTML = components.register

    let link = document.getElementById('register-link')
    link.onclick = linkClickHandler

    let form = document.getElementById('register-form')
    form.onsubmit = formChatSubmitHandler

    function linkClickHandler() {
        view.showComponent('logIn')
    }

    function formChatSubmitHandler(event) {
        event.preventDefault()
        // 1. get all info entered by user
        // 2. validate info
        // 3. submit info
        let registerInfo = {
            firstname: form.firstname.value,
            lastname: form.lastname.value,
            email: form.email.value,
            password: form.password.value,
            confirmPassword: form.confirmPassword.value
        }

        let validateResult = [
            view.validate(registerInfo.firstname, validators.stringRequire
                , 'firstname-error', 'Invalid firstname!'),
            view.validate(registerInfo.lastname
                , validators.stringRequire, 'lastname-error', 'Invalid lastname!'),
            view.validate(registerInfo.email, validators.email
                , 'email-error', 'Invalid email!'),
            view.validate(registerInfo.password, validators.password
                , 'password-error', 'Invalid password!'),
            view.validate(registerInfo.confirmPassword, function (confirmPassword) {
                return confirmPassword != '' && confirmPassword == registerInfo.password
            }, 'confirm-password-error', 'Invalid confirm password!')
        ]

        if (allPassed(validateResult)) {
            // submit
            controller.register(registerInfo)
        }

    }
}

view.handlers.logIn = function () {
    let app = document.getElementById('app')
    app.innerHTML = components.logIn

    let link = document.getElementById('log-in-link')
    link.onclick = linkClickHandler

    let form = document.getElementById('log-in-form')
    form.onsubmit = formChatSubmitHandler

    function linkClickHandler() {
        view.showComponent('register')
    }

    function formChatSubmitHandler(event) {
        event.preventDefault()

        let logInInfo = {
            email: form.email.value,
            password: form.password.value
        }

        let validateResult = [
            view.validate(logInInfo.email, validators.email, 'email-error', 'Invalid email!'),
            view.validate(logInInfo.password, validators.password, 'password-error', 'Invalid password!')
        ]

        if (allPassed(validateResult)) {
            controller.logIn(logInInfo)
        }
    }
}