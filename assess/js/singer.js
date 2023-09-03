$(function () {
    // $("#menu").load("./assess/html/menu.html");
    // $("#menu-right").load("./assess/html/menu-right.html");
    // $("#body").load("./assess/html/body.html");
    // getListSinger();
    getListSingerToPage();
});

let baseUrlSingerToPage = "http://localhost:8080/api/v1/singer";
let nameSingerToPage = "";
let pageSingerNumberToPage = 1;
let pageSingerSizeToPage = 12;
let sortSingerFieldToPage = "";
let sortSingerTypeToPage = "";

function SearchSingerDto(
    nameSingerToPage,
    pageSingerNumberToPage,
    pageSingerSizeToPage,
    sortSingerFieldToPage,
    sortSingerTypeToPage
) {
    this.name = nameSingerToPage;
    this.pageNumber = pageSingerNumberToPage;
    this.pageSize = pageSingerSizeToPage;
    this.sortField = sortSingerFieldToPage;
    this.sortType = sortSingerTypeToPage;
}
function getListSingerToPage() {
    let request = new SearchSingerDto(
        nameSingerToPage,
        pageSingerNumberToPage,
        pageSingerSizeToPage,
        sortSingerFieldToPage,
        sortSingerTypeToPage
    );
    $.ajax({
        url: baseUrlSingerToPage + "/search-singer",
        type: "POST",
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader(
        //         "Authorization",
        //         "Bearer " + localStorage.getItem("token")
        //     );
        // },
        contentType: "application/json",
        data: JSON.stringify(request),
        error: function (err) {
            console.log(err);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            // console.log(data);
            // console.log("oke");
            buildPaginationSinger(data.number + 1, data.totalPages);
            fillSingerToPage(data.content);
            // console.log("oke 2");
        },
    });
}

function buildPaginationSinger(number, totalPage) {
    $("#page-singer-number").empty();
    // console.log(number, totalPage);
    for (let index = 1; index <= totalPage; index++) {
        if (number == index) {
            $("#page-singer-number").append(`
        <a href="#!" class="page-singer-number-active" onclick="chosePageSinger(${index})">${index}</a>
        `);
        } else {
            $("#page-singer-number").append(`
        <a href="#!" onclick="chosePageSinger(${index})">${index}</a>
        `);
        }
    }
}

function chosePageSinger(number) {
    pageSingerNumberToPage = number;
    getListSingerToPage();
}

function searchSinger() {
    nameSingerToPage = document.getElementById("input-singer-name").value;
    getListSingerToPage();
}

function fillSingerToPage(listSinger) {
    // let a = document.getElementById("row-page-singer");
    // console.log(a);
    console.log(listSinger);
    $("#row-page-singer").empty();
    for (let index = 0; index <= listSinger.length; index++) {
        let elementAppend = listSinger[index];
        $("#row-page-singer").append(`
        <div class="img-item col-3">
            <img
                onclick="showListSongSinger('${elementAppend.name}')"
                src="${elementAppend.image}"
                alt=""
            />
            <p>${elementAppend.name}</p>
        </div>
        `);
    }
}

function showListSongSinger(singerName) {
    // $("#body").load("/assess/html/songofsinger.html");
    singer = singerName;
    let request = new SearchSongRequest(songName, author, singer, pageNumber);
    $.ajax({
        url: baseUrlProduct + "/search",
        type: "POST",
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader(
        //         "Authorization",
        //         "Bearer " + localStorage.getItem("token")
        //     );
        // },
        contentType: "application/json",
        data: JSON.stringify(request),
        error: function (err) {
            console.log(err);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            // console.log(data.content);
            showListSongOfSinger(data.content);
            // songArray = data.content;
            // buildPagination(data.number + 1, data.totalPages);
        },
    });
}

function showListSongOfSinger(singers) {
    $("#row-page-singer").empty();
    $("#singer-page-title").empty();
    let elementSinger = singers[0];
    $("#row-page-singer").append(`
        <div class="song-of-singer">
            <div class="header">
                <img
                    src="${elementSinger.singer.image}"
                    alt=""
                />
                <h2>${elementSinger.singer.name}</h2>
            </div>
            <table class="body-table" id="body-table-singer">
           
            </table>
        </div>
        `);

    $("#body-table-singer").append(`
            <tr>
                <th>#</th>
                <th>Bài Hát</th>
                <th>Tác Giả</th>
            </tr>
            `);

    for (let index = 0; index < singers.length; index++) {
        let elementSong = singers[index];
        $("#body-table-singer").append(
            `
            <tr>
                <td>` +
                (index + 1) +
                `</td>
                <td class="poiter-name" onclick="getPath('${elementSong.path}', '${elementSong.name}', '${elementSong.singer.name}')
                " >${elementSong.name}</td>
                <td>${elementSong.author}</td>
            </tr>
            `
        );
    }
}

// onclick="getPath('${elementSong.path}', '${elementSong.name}', '${elementSong.singer.name}')
