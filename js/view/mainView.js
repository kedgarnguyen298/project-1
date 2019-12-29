const view = {
    handlers: {}
}

view.handlers.loading = function () {
    let app = document.getElementById('app')
    app.innerHTML = components.loading
}

const validators = {
    stringRequire(str) {
        return str != ''
    },
    email(str) {
        return str != '' && str.includes('@')
    },
    password(str) {
        return str != '' && str.length >= 6
    }
}

view.showComponent = function (name) {
    let handler = view.handlers[name]
    if (handler instanceof Function) {
        handler ()
    }
}

view.setText = function (id, text) {
    document.getElementById(id).innerText = text
}

view.validate = function (value, validator, idErrorTag, messageError) {
    if (validator(value)) { 
        view.setText(idErrorTag, '')
        return true
    } else {
        view.setText(idErrorTag, messageError)
        return false
    }
}


function allPassed(validateResult) {
    for (let result of validateResult) {
        if (!result) {
            return false
        }
    }
    return true
}