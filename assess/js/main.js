$(function () {
    // $("#menu").load("./assess/html/menu.html");
    // $("#menu-right").load("./assess/html/menu-right.html");
    $("#body").load("./assess/html/body.html");
    // getListSinger();
});

// load trang favourite.html
function openFavourite() {
    event.preventDefault;
    $("#body").load("/assess/html/favourite.html");
}

// load trang favourite.html
function showAllSinger() {
    // event.preventDefault;
    $("#body").load("/assess/html/singer.html");
}

// function play() {
//     console.log("abc");
//     document
//         .getElementById("audio")
//         .setAttribute(
//             "src",
//             "https://mp3-s1-zmp3.zmdcdn.me/0c830da702e4ebbab2f5/411146484926211717?authen=exp=1690810643~acl=/0c830da702e4ebbab2f5/*~hmac=468d553ee413d1acfdf54a7af4d18826&fs=MTY5MDYzNzg0Mzg2MHx3ZWJWNnwwfDE3MS4yNTEdUngMjM4LjmUsICx"
//         );
//     document.getElementById("audio").play();
// }
