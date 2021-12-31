$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/index_page/post",
        data: {},
        success: function (response) {
            let rows = response[0]['all_photo'];
            let login_user = response[1];

            document.getElementById('user-home').alt = login_user;

            for (let i = 0; i < rows.length; i++) {
                let photo = rows[i]['container'][0]['photo'];
                let photo_like = rows[i]['container'][0]['like'];
                let avatar = rows[i]['avatar'];
                let name = rows[i]['name'];
                let temp_html = ``;

                if (photo) {
                    temp_html = `
                                <div class="content">
                                    <section class="con">
                                        <div class="userInfo">
                                            <a href="#" onclick="profile_main_icon(this)" >
                                            <img src="static/images/user/${avatar}" />
                                                <h4>${name}</h4>
                                            </a>
                                            <div class="is_pointer">
                                                <img src="../static/images/more@3x.png" onclick="opendia()" alt="">
                                            </div>
                                        </div>
                                        <div class="image_box" style="background-image: url('/static/images/post-contents/${photo}')"></div>
                                            <div class="left-wrapper">
                                                <img src="../static/images/like@3x.png" onclick="like(this)" alt="${name},${photo}">
                                                <img class="icon-2" src="../static/images/comment@3x.png">
                                                <img src="../static/images/dm@3x.png">
                                                <img class="right-wrapper" src="../static/images/favorite@3x.png">
                                            </div>
                        
                                        <div class="comment">
                                            <h4><strong>${name}</strong>님 외 <strong id="${name}like">${photo_like}명</strong>이 좋아합니다.</h4>
                                            <p><strong>돈통</strong> : 안녕하세요</p>
                                            <span>2시간 전</span>
                                        </div>
                                    </section>
                                </div>
                                `
                    $("#content-wrapper").append(temp_html);
                    $(".userInfo")
                }
            }
        }
    });
})

function logout() {
    $.removeCookie('mytoken');
    alert('로그아웃!')
    window.location.href = '/login'
}

// 하트 버튼
function like(data) {
    let name = data.alt.split(',')[0];
    let photo = data.alt.split(',')[1];
    let like = Number(document.getElementById(`${name}like`).innerText.split('명')[0]);
    let likeCount;
    if (data.attributes[0].value === '../static/images/like@3x.png') {
        likeCount = like + 1;
        data.setAttribute('src', '../static/images/like@4x.png');
    } else {
        likeCount = like - 1;
        data.setAttribute('src', '../static/images/like@3x.png');
    }

    $.ajax({
        type: "POST",
        url: "/main/user_like",
        data: { 'photo': photo, 'like': likeCount },
        success: function (response) {
            document.getElementById(`${name}like`).innerText = `${String(response['user_like'])}명`;
        }
    });
}

// post 더 보기 버튼
function opendia() {
    let dialog = document.getElementById('dialog');

    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        alert('예기치 못한 오류')
    }
    dialog.addEventListener('cancel', function onClose() {
        window.location.reload();
    });

    $(document).mouseup(function (e) {
        let dialogPopup = $("#dialog");
        if (dialogPopup.has(e.target).length === 0) {
            $("#dialog button").click();
        }
    });
}

// 헤더 홈 버튼
function profile_main(obj) {
    window.location.href = '/profile_main/' + obj.alt;
}

// 포스트 아이콘
function profile_main_icon(obj) {
    window.location.href = '/profile_main/' + obj.innerText;
}