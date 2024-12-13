var userName = document.querySelector("#userName");
var userEmail = document.querySelector("#userEmail");
var userPassword = document.querySelector("#userPassword");
var signinEmail = document.querySelector("#signinEmail");
var signinPassword = document.querySelector("#signinPassword");
var signupBtn = document.querySelector('#signupBtn');
var loginBtn = document.querySelector("#loginBtn");
var users = [];

if (localStorage.getItem("users") != null) {
    users = JSON.parse(localStorage.getItem("users"));
}

function required() {
    document.querySelector("#message").innerHTML = `<span class=' text-danger'>All inputs is required</span>`;
}

function exist() {
    document.querySelector("#message").innerHTML = `<span class=' text-danger'>Email already exists</span>`;
}

function success() {
    document.querySelector("#message").innerHTML = `<span class=' text-success'>Success</span>`;
}

function incorrect() {
    document.querySelector("#message").innerHTML = `<span class=' text-danger'>incorrect email or password</span>`;
}

function clear() {
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
}

function emptySignupInputs() {
    if (userName.value != "" && userPassword.value != "" && userEmail.value != "") {
        return false;
    }
    else {
        return true;
    }
}

function emailExist() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == userEmail.value) {
            return true;
        }
    }
    return false;
}

function emptySigninInputs() {
    if (signinEmail.value != "" && signinPassword.value != "") {
        return false;
    }
    else {
        return true;
    }
}

function userExist() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == signinEmail.value && users[i].password == signinPassword.value) {
            var welcomeName = users[i].name;
            localStorage.setItem("welcomeName", JSON.stringify(welcomeName));
            location.replace("home.html")
            return true;
        }
    }
}

if (signupBtn) {
    signupBtn.addEventListener("click", function () {
        var user = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value
        };
        if (!emptySignupInputs()) {
            if (!emailExist()) {
                users.push(user);
                localStorage.setItem("users", JSON.stringify(users));
                success();
                clear();
            } else {
                exist();
                clear();
            }
        } else {
            required();
        }
    });
}

function welcome() {
    var welcomeName = JSON.parse(localStorage.getItem("welcomeName"));
    document.querySelector("#welcome").innerHTML = `Welcome ${welcomeName}`;
}

if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        if (!emptySigninInputs()) {
            if (userExist()) {
            } else {
                incorrect();
            }
        } else {
            required();
        }
    });
}