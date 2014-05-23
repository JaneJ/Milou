window.fbAsyncInit = function() {


    $(document).data('loggedName', "Anonymous2");
    FB.init({
        appId      : '1385045075103554', // App ID
        status     : false, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true,  // parse XFBML
        oauth      : true
    });

            FB.Event.subscribe('auth.authResponseChange', function (response) {
                // Here we specify what we do with the response anytime this event occurs. 
                if (response.status === 'connected') {
                    
                    testAPI();
                } 
                else{ if(window.location.href=="http://milou.herokuapp.com/pages/addarticle.html"){
                                window.location="http://milou.herokuapp.com"
                            }

                
            }});

};
function testAPI() {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('Good to see you, ' + response.name + '.');
                 Identify(response.id, response.name)
             });
             
                


    $('#profileArea').on('click','#logout',function(){
            console.log('Ei. Logout');
            Logout();
            console.log("login.js - 68 logout");
        }
    );
}

            
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/et_EE/all.js#xfbml=1&appId=1385045075103554";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));




function Login(){
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('Good to see you, ' + response.name + '.');
                Identify(response.id, response.name)
                });

            
        } else {
            console.log('User cancelled login or did not fully authorize.');
            trellidMuutuvad();
            $(document).data('loggedName', "Anonymous");
            console.log("nimi: "+$(document).data('loggedName'));
          
        }


    },{scope:'email'});


    $('#profileArea').on('click','#logout',function(){
            console.log('Ei. Logout');
            Logout();
            console.log("login.js - 68 logout");
        }
    );
}


function Logout(){
    console.log('logout');
    FB.logout(function(response){
        var str="";
        str +="<button id='loginfb'>FB Login</button>";
        document.getElementById("profileArea").innerHTML=str;



    });

    $('#profileArea').on('click','#loginfb',function(){
            console.log('Login');
            Login();
            console.log("login.js - login");
        }
    );

}

// 1 kui klikitakse login peal, read 65-72, asendab onclick="Login()" html-is
$(document).ready(function(){

    $('#loginfb').on('click',function(){
        Login();
        console.log("login.js - 68 login");
        $(document).data('loggedName');
        console.log("loggedname 176  "+$(document).data('loggedName'));



    });

    $('#logout').on('click',function(){
            console.log('Ei. Logout');
            Logout();
            console.log("login.js - 68 logout");
        }
    );
});
function Identify(id,name){
     $.ajax('/kasutaja',{
                    type: "GET",
                    dataType: "Json",
                    data: {id:id},
                    success:function(data){
                        console.log(data);

                        if (data.admin){
                            var str = "Tere : " + name + "!<br>";
                            str += "<a href='pages/addarticle.html'>Lisa uudis</a>" + "<br>";
                            str += '<button id="logout">FB Logout</button>';
                            document.getElementById("profileArea").innerHTML = str;
                        } else {
                            if(window.location.href=="http://milou.herokuapp.com/pages/addarticle.html"){
                                window.location="http://milou.herokuapp.com"
                            }
                            var str = "Tere : " + name + "!";
                            str += "<button id='logout'>FB Logout</button>";
                            document.getElementById("profileArea").innerHTML = str;
                        }
                    },
                    error: function(req, status, data) { 
                        console.log(data);

                        alert("failed: " + status); }
                });


}
