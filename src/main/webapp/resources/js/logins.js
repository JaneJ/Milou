window.fbAsyncInit = function () {
    $(document).data('loggedName', "Anonüümne");
    console.log(" fb 3 name = Anonüümne");
    FB.init({appId: '1385045075103554', status: false, cookie: true, xfbml: true, oauth: true});
    FB.Event.subscribe('auth.authResponseChange', function (response) {
        if (response.status === 'connected') {
            testAPI();
        } else {
            if (window.location.href == "http://milou.herokuapp.com/pages/addarticle.html") {
                window.location = "http://milou.herokuapp.com"
            }
        }
    });
};
function testAPI() {
    FB.api('/me', function (response) {
        Identify(response.id, response.name)
    });
    $('#profileArea').on('click', '#logout', function () {
        Logout();
    });
}
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/et_EE/all.js#xfbml=1&appId=1385045075103554";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
function Login() {
    FB.login(function (response) {
        if (response.authResponse) {
            FB.api('/me', function (response) {
                Identify(response.id, response.name)
            });
        } else {
            trellidMuutuvad();
            $(document).data('loggedName', "Anonüümne");
            console.log(" fb 39 name = Anonüümne");
        }
    }, {scope: 'email'});
    $('#profileArea').on('click', '#logout', function () {
        Logout();
    });
}
function Logout() {
    $(document).data('loggedName', "Anonüümne");
    console.log("name on anonüümne");
    FB.logout(function (response) {
        var str = "";
        str += "<button class='logi' id='loginfb'>FB Login</button>";
        document.getElementById("profileArea").innerHTML = str;
    });
    $('#profileArea').on('click', '#loginfb', function () {
        Login();
    });
}
$(document).ready(function () {
    $('#loginfb').on('click', function () {
        Login();

    });
    $('#logout').on('click', function () {
        Logout();
    });
});
function Identify(id, name) {
    $.ajax('/kasutaja', {type: "GET", dataType: "Json", data: {id: id}, success: function (data) {
        console.log(data);
        $(document).data('loggedName', name);
        console.log(" fb 70 name ="+name);
        if (data.admin) {
            var str = "Tere : " + name + "!<br>";
            str += "<a href='pages/addarticle.html'>Lisa uudis</a>" + "<br>";
            str += '<button class="logi" id="logout">FB Logout</button>';
            document.getElementById("profileArea").innerHTML = str;
        } else {
            if (window.location.href == "http://milou.herokuapp.com/pages/addarticle.html") {
                window.location = "http://milou.herokuapp.com"
            }
            var str = "Tere : " + name + "!";
            str += "<button class='logi' id='logout'>FB Logout</button>";
            document.getElementById("profileArea").innerHTML = str;
        }
    }, error: function (req, status, data) {
        console.log(data);
        alert("failed: " + status);
    }});
}