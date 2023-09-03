let baseUrlFavourite = "http://localhost:8080/api/v1/favourite";

$(function () {
    getFavourite();
});

function getFavourite() {
    let accountID = localStorage.getItem("id");
    $.ajax({
        url: baseUrlFavourite + "/getListFavouriteByID/" + accountID,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Bearer " + localStorage.getItem("token")
            );
        },
        contentType: "application/json",
        // data: JSON.stringify(request),
        error: function (err) {
            console.log(err);
            confirm(err.responseJSON.message);
        },
        success: function (data) {
            console.log(data);
            fillDataFavourite(data);
        },
    });
}

function fillDataFavourite(data) {
    $("#favourite-table").empty();
    $("#favourite-table").append(`
        <tr>
            <th>Tên Bài Hát</th>
            <th>Tác Giả</th>
            <th>Ca Sĩ</th>
        </tr>
    `);
    for (let index = 0; index < data.length; index++) {
        let song = data[index];
        $("#favourite-table").append(`
        <tr>
            <td onclick="getPath('${song.song.path}','${song.song.name}','${song.song.singer.name}')">${song.song.name}</td>
            <td>${song.song.author}</td>
            <td>${song.song.singer.name}</td>
            <td><i class="fa-solid fa-x" onclick="deleteFavourite(${song.id})"></i></td>
        </tr>
        `);
    }
}

// onclick="getPath('${song.path}', '${
//     song.name
// }', '${song.singer.name}')

// onclick="deleteFavourite(${song.song.id})

function deleteFavourite(songid) {
    console.log(songid);
    let songIdDelete = songid;
    $.ajax({
        url: baseUrlFavourite + "/" + songIdDelete,
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
            // console.log(data);
            // $("#deleteSongModal").modal("hide");
            showAlertSuccess("Xóa Khỏi danh sách thành công");
            // alert("Xóa khỏi danh sách thành công");
            getFavourite();
            // getListSong();
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
