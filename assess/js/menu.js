$(function () {
    checklogin();
});

function checklogin() {
    let username = localStorage.getItem("username");
    let noLogin = `
    <i class="fa-solid fa-right-to-bracket"></i>
    <a href="./login.html">Log In</a>
    `;

    let userLogin =
        `
    <div class="user-login" onclick="showBtnLogout()">
        <img
            src="https://media.istockphoto.com/id/1410847427/vi/anh/%C4%91%C3%A0n-%C3%B4ng-%C4%91ang-nghe-nh%E1%BA%A1c-b%E1%BA%B1ng-tai-nghe-m%E1%BB%99t-c%C3%A1ch-tho%E1%BA%A3i-m%C3%A1i-v%C3%A0-vui-v%E1%BA%BB-3d-render.webp?b=1&s=170667a&w=0&k=20&c=6JJIrPYBHIXJoYzQZ6bWvoCImSdU8irtJS3CcXb3uak="
            alt=""
        />
        <span>` +
        username +
        `</span>
        <div id="user-login--logout" onclick="logOut()">Log Out</div>
    </div>
    `;
    if (localStorage.getItem("token") === null) {
        document.getElementById("btn-check-login").innerHTML = noLogin;
    } else {
        document.getElementById("btn-check-login").innerHTML = userLogin;
    }
}

function showBtnLogout() {
    $("#user-login--logout").toggle();
}

function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("fullName");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    window.location.href = "/";
}
