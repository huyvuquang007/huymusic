let baseUrlAuthLogin = "http://localhost:8080/api/v1/auth";
let baseUrlAccountCreate = "http://localhost:8080/api/v1/account";
function AccountSignUp(fullName, email, username, password) {
    this.fullName = fullName;
    this.email = email;
    this.username = username;
    this.password = password;
}

function login() {
    let username = document.getElementById("usernameLogin").value;
    let password = document.getElementById("passwordLogin").value;
    console.log(username, password);
    //   ------------------------------------- API ĐĂNG NHẬP -------------------------------------
    $.ajax({
        url:
            baseUrlAuthLogin +
            "/login-jwt?username=" +
            username +
            "&password=" +
            password,
        type: "POST",
        contentType: "application/json",
        // data: JSON.stringify(request),
        error: function (err) {
            console.log(err);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            console.log(data);
            localStorage.setItem("fullName", data.fullName);
            localStorage.setItem("id", data.id);
            localStorage.setItem("role", data.role);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            window.location.href = "./index.html";
        },
    });
}

function signUp() {
    let fullName = document.getElementById("fullNameSignUp").value;
    let email = document.getElementById("emailSignUp").value;
    let username = document.getElementById("usernameSignUp").value;
    let password = document.getElementById("passwordSignUp").value;
    console.log(fullName, email, username, password);
    let request = new AccountSignUp(fullName, email, username, password);
    //   ------------------------------------- API ĐĂNG NHẬP -------------------------------------
    $.ajax({
        url: baseUrlAccountCreate + "/create-account",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(request),
        error: function (err) {
            console.log(err);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            console.log(data);
            $("#modal-success").addClass("show");
            setTimeout(function () {
                $("#modal-success").removeClass("show");
            }, 2000);

            setTimeout(function () {
                window.location.href = "./login.html";
            }, 3000);
        },
    });
}
