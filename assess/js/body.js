let baseUrlProduct = "http://localhost:8080/api/v1/song";
let urlFavourite = "http://localhost:8080/api/v1/favourite";
let urlSinger = "http://localhost:8080/api/v1/singer";
let songName = "";
let author = "";
let singer = "";
let pageNumber = 1;
let isManager = false;
let isUser = false;
let path = "";
let songArray = [];

function SearchSongRequest(songName, author, singer, pageNumber) {
    this.name = songName;
    this.author = author;
    this.singer = singer;
    this.pageNumber = pageNumber;
}

function SongCreateDto(songName, author, singer, path) {
    this.name = songName;
    this.author = author;
    this.singer = singer;
    this.path = path;
}

function SongUpdateDto(id, songName, author, singer, path) {
    this.id = id;
    this.name = songName;
    this.author = author;
    this.singer = singer;
    this.path = path;
}

function SingerCreateDto(singerName, singerImage) {
    this.name = singerName;
    this.image = singerImage;
}

$(function () {
    buildManager();
    getListSong();
    getListSinger();
});

function buildManager() {
    if ("ADMIN" === localStorage.getItem("role")) {
        isManager = true;

        $(".popular-header").empty().append(`
            <h3 style="color: white">Popular</h3>
            <button class="popular-btn" data-toggle="modal" data-target="#modalSong"  onclick="openAddSongModal()">Thêm Mới Bài Hát</button>
            <button class="popular-btn" data-toggle="modal" data-target="#modalSinger"  onclick="openAddSingerModal()">Thêm Mới Ca Sĩ</button>
        `);
    } else {
        isManager = false;
    }

    if ("USER" === localStorage.getItem("role")) {
        isUser = true;
    } else {
        isUser = false;
    }
}

//------------------------ Search Singer -----------------------
function openAddSingerModal() {
    document.getElementById("input-singername").value = "";
    document.getElementById("input-image").value = "";
}

function saveSinger() {
    let singerName = document.getElementById("input-singername").value;
    let image = document.getElementById("input-image").value;
    let request = new SingerCreateDto(singerName, image);
    $.ajax({
        url: urlSinger + "/create",
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Bearer " + localStorage.getItem("token")
            );
        },
        contentType: "application/json",
        data: JSON.stringify(request),
        error: function (err) {
            console.log(err);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            console.log(data);
            $("#modalSinger").modal("hide");
            showAlertSuccess("Tạo Ca sĩ thành công");
            getListSinger();
        },
    });
}

//------------------------ API Get List Song có phân trang -----------------------
function getListSong() {
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
            fillSong(data.content);
            songArray = data.content;
            buildPagination(data.number + 1, data.totalPages);
        },
    });
}

function searchSong() {
    songName = document.getElementById("input-singer-name").value;
    console.log(songName);
    getListSong();
    // let request = new SearchSongRequest(songName, author, singer, pageNumber);
    // $.ajax({
    //     url: baseUrlProduct + "/search",
    //     type: "POST",
    //     // beforeSend: function (xhr) {
    //     //     xhr.setRequestHeader(
    //     //         "Authorization",
    //     //         "Bearer " + localStorage.getItem("token")
    //     //     );
    //     // },
    //     contentType: "application/json",
    //     data: JSON.stringify(request),
    //     error: function (err) {
    //         console.log(err);
    //         confirm(err.responseJSON.message);
    //     },
    //     success: function (data) {
    //         console.log(data.content);
    //         fillSong(data.content);
    //         // songArray = data.content;
    //         buildPagination(data.number + 1, data.totalPages);
    //     },
    // });
}

function fillSong(songlist) {
    // let bbb = $("#body-table");
    // console.log(bbb);
    // songArray = songlist;
    $("#body-table").empty();
    $("#body-table").append(`
    <tr>
   
        <th>Tên Bài Hát</th>
        <th>Tác Giả</th>
        <th>Ca Sĩ</th>
    </tr>
    `);
    for (let index = 0; index < songlist.length; index++) {
        let song = songlist[index];
        let i = index + 1;
        i++;
        $("#body-table").append(
            `
        <tr>
            <td class="song-name-title" onclick="getPath('${song.path}', '${
                song.name
            }', '${song.singer.name}')">${song.name} 
                </td>
            <td>${song.author}</td>
            <td>${song.singer.name}
                </td>
            ${
                isManager
                    ? `
                <td>
                    <i class="fa-solid fa-pencil" onclick="openUpdateSongModal(${song.id})"></i>
                </td>
                <td>
                    <i class="fa-solid fa-trash-can" data-toggle="modal" data-target="#deleteSongModal" onclick="openDeleteSongModal(${song.id})"></i>
                </td>
            `
                    : `
                <td>
                    
                </td>
            `
            }
            ${
                isUser
                    ? `
                <td>
                    <i class="fa-solid fa-plus" onclick="addToFavourite(${song.id})"></i>
                </td>
            `
                    : `
                <td>
                    
                </td>
            `
            }
        </tr>
        `
        );
    }
}

function buildPagination(number, totalPage) {
    $("#page-number").empty();
    for (let index = 1; index <= totalPage; index++) {
        if (number == index) {
            $("#page-number").append(`
        <a href="#!" class="page-number-active" onclick="chosePage(${index})">${index}</a>
        `);
        } else {
            $("#page-number").append(`
        <a href="#!" onclick="chosePage(${index})">${index}</a>
        `);
        }
    }
}

function chosePage(number) {
    pageNumber = number;
    getListSong();
}

/////////////////////// CreateSong ///////////////////////
function openUpdateSongModal(songid) {
    // console.log(songid);
    document.getElementById("accountModalTitle").innerText =
        "Chỉnh Sửa Bài Hát";
    $("#modalSong").modal("show");

    let song = songArray.find((item) => {
        if (item.id == songid) {
            return item;
        }
    });

    // console.log(song);
    // reset value để mỗi lần mở modal ra là dữ liệu trắng
    document.getElementById("SongIdUpdate").value = songid;
    document.getElementById("songnameInput").value = song.name;
    document.getElementById("authorInput").value = song.author;
    document.getElementById("singerInput").value = song.singer.name;
    document.getElementById("pathInput").value = song.path;
}

function openAddSongModal() {
    document.getElementById("accountModalTitle").innerText = "Thêm Mới Bài Hát";

    // reset value để mỗi lần mở modal ra là dữ liệu trắng
    document.getElementById("SongIdUpdate").value = "";
    document.getElementById("songnameInput").value = "";
    document.getElementById("authorInput").value = "";
    document.getElementById("singerInput").value = "";
    document.getElementById("pathInput").value = "";
}

function save() {
    // let songIdUpdate = document.getElementById("SongIdUpdate");
    let title = document.getElementById("accountModalTitle").innerText;
    if (title === "Thêm Mới Bài Hát") {
        createSong();
    } else {
        updateSong();
    }
}

function createSong() {
    let username = document.getElementById("songnameInput").value;
    let author = document.getElementById("authorInput").value;
    let singer = document.getElementById("singerInput").value;
    let path = document.getElementById("pathInput").value;
    let songCreateDto = new SongCreateDto(username, author, singer, path);

    $.ajax({
        url: baseUrlProduct + "/create-song",
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Bearer " + localStorage.getItem("token")
            );
        },
        contentType: "application/json",
        data: JSON.stringify(songCreateDto),
        error: function (err) {
            console.log(err);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            console.log(data);
            $("#modalSong").modal("hide");
            showAlertSuccess("Tạo Bài Hát Thành Công");
            getListSong();
        },
    });
}

/////////////////////// UpdateSong ///////////////////////

function updateSong() {
    let id = document.getElementById("SongIdUpdate").value;
    let username = document.getElementById("songnameInput").value;
    let author = document.getElementById("authorInput").value;
    let singer = document.getElementById("singerInput").value;
    let path = document.getElementById("pathInput").value;
    let songUpdateDto = new SongUpdateDto(id, username, author, singer, path);

    $.ajax({
        url: baseUrlProduct + "/update-song",
        type: "PUT",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Bearer " + localStorage.getItem("token")
            );
        },
        contentType: "application/json",
        data: JSON.stringify(songUpdateDto),
        error: function (err) {
            console.log(err);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            console.log(data);
            $("#modalSong").modal("hide");
            showAlertSuccess("Update Bài Hát Thành Công");
            getListSong();
        },
    });
}

function openDeleteSongModal(songId) {
    document.getElementById("songIdDelete").value = songId;
}

function onDeleteSong() {
    let songIdDelete = document.getElementById("songIdDelete").value;

    $.ajax({
        url: baseUrlProduct + "/" + songIdDelete,
        type: "DELETE",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Bearer " + localStorage.getItem("token")
            );
        },
        contentType: "application/json",
        // data: JSON.stringify(songUpdateDto),
        error: function (err) {
            console.log(err);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            console.log(data);
            $("#deleteSongModal").modal("hide");
            showAlertSuccess("Xóa Bài Hát Thành Công");
            getListSong();
        },
    });
}

function showAlertSuccess(text) {
    document.getElementById("text-alert").innerText = text;
    $("#modal-success").addClass("show");
    setTimeout(function () {
        $("#modal-success").removeClass("show");
    }, 2000);
}

function FavouriteCreateDto(songId, accountID) {
    this.songId = songId;
    this.accountID = accountID;
}

function addToFavourite(songid) {
    // console.log(songid);
    let accountID = localStorage.getItem("id");
    let songId = songid;
    let request = new FavouriteCreateDto(songId, accountID);
    $.ajax({
        url: urlFavourite + "/create",
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Bearer " + localStorage.getItem("token")
            );
        },
        contentType: "application/json",
        data: JSON.stringify(request),
        error: function (err) {
            console.log(err);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            console.log(data);
            // $("#modalSong").modal("hide");
            showAlertSuccess("Thêm vào Yêu thích thành công");
            // getListSong();
        },
    });
}

//////////// Play Song /////////////

let audio = document.getElementById("audio");
let songNamePlay = document.getElementById("song-name");
let singerNamePlay = document.getElementById("singer");
let progress = document.getElementById("progress");
let isPlaying = false;
function playSong() {
    if (isPlaying) {
        isPlaying = false;
        document.querySelector(".card-playing").classList.remove("playing");
        audio.pause();
    } else {
        isPlaying = true;
        audio.play();
        document.querySelector(".card-playing").classList.add("playing");
    }
}

function getPath(path, songName, singerName) {
    // console.log(id);
    audio.setAttribute("src", path);
    songNamePlay.innerText = songName;
    singerNamePlay.innerText = singerName;
    // audio.play();
    playSong();
}

audio.ontimeupdate = function () {
    if (audio.duration) {
        let progressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
    }
};

progress.onchange = function (e) {
    let seekTime = (audio.duration / 100) * e.target.value;
    audio.currentTime = seekTime;
};

///////////////// get list singer
let baseUrlSinger = "http://localhost:8080/api/v1/singer";
let nameSinger = "";
let pageSingerNumber = 1;
let pageSingerSize = 6;
let sortSingerField = "";
let sortSingerType = "";

function SearchSinger(
    nameSinger,
    pageSingerNumber,
    pageSingerSize,
    sortSingerField,
    sortSingerType
) {
    this.name = nameSinger;
    this.pageNumber = pageSingerNumber;
    this.pageSize = pageSingerSize;
    this.sortField = sortSingerField;
    this.sortType = sortSingerType;
}
function getListSinger() {
    let request = new SearchSinger(
        nameSinger,
        pageSingerNumber,
        pageSingerSize,
        sortSingerField,
        sortSingerType
    );
    $.ajax({
        url: baseUrlSinger + "/search-singer",
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
            fillSingerToMenuRight(data.content);
        },
    });
}

function fillSingerToMenuRight(listSinger) {
    // let a = $("#singer-list");
    // console.log(a);
    $("#singer-list").empty();
    for (let index = 0; index <= listSinger.length; index++) {
        let singer = listSinger[index];
        $("#singer-list").append(`
        <div class="sub-row col-4 pl-2">
            <img
                onclick="getSongsOfSinger('${singer.name}')"
                src="${singer.image}"
                alt=""
            />                  
             <p>${singer.name}</p>
        </div>
        `);
    }
}
function getSongsOfSinger(singerName) {
    singer = singerName;
    getListSong();
}
