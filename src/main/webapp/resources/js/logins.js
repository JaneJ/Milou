window.fbAsyncInit = function() {
    FB.init({
      appId      : '1385045075103554', // App ID
      status     : false, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true,  // parse XFBML
      oauth      : true 
    });

};

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
      var access_token =   FB.getAuthResponse()['accessToken'];
      console.log('Access Token = '+ access_token);
      FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');

  
       /*if(me.id== | me.id== | me.id==){
        var str="Tere : "+response.name+"!";
        str +="<button id='logout' onclick='Logout()'>FB Logout</button>";<br>
        str +="<a href="pages/addarticle.html">Lisa uudis</a></li>"
        document.getElementById("profileArea").innerHTML=str;


       }*/
       if (access_token==="CAATrsOZBzD0IBAOLZB6JItiRZA7esu6ZCVJ4qXH6x8j9dMkJfZC4FDLrIdHz5FPBmMaOYRSVADQB3BqYZBfZBvXUgq6hL5Hy7uad6kuauHA4vzZBv9Q3sNxd2qFPFspcL2uwF9v7Q3VLsKCfg5wrJ6te4b1l5emlOe2jKnQJcaezlRj3oEaXeeBJEJefRgiX7lZCNrpEYoX1JTQZDZD") {
        var str="Tere : "+response.name+"!";
        str +="<a href='pages/addarticle.html'>Lisa uudis</a><br>"
        str +="<button id='logout' onclick='Logout()'>FB Logout</button>";
        document.getElementById("profileArea").innerHTML=str;
      }else{
        var str="Tere : "+response.name+"!";
        str +="<button id='logout' onclick='Logout()'>FB Logout</button>";
        document.getElementById("profileArea").innerHTML=str;

      }
        
     });
   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
 },{scope:'email'});
  };

function Logout()
  {

    FB.logout(function(){document.location.reload();});
  }

    


