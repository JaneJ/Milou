window.fbAsyncInit = function() {
    FB.init({
      appId      : '1385045075103554', // App ID
      status     : false, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
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
      FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
       /*if(me.id== | me.id== | me.id==){
        var str="Tere : "+response.name+"!";
        str +="<button id='logout' onclick='Logout()'>FB Logout</button>";<br>
        str +="<a href="pages/addarticle.html">Lisa uudis</a></li>"
        document.getElementById("profileArea").innerHTML=str;


       }*/
        var str="Tere : "+response.name+"!";
        str +="<button id='logout' onclick='Logout()'>FB Logout</button>";
        document.getElementById("profileArea").innerHTML=str;
        console.log(response.authResponse.accessToken);
     });
   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
 },{perms:'read_stream,publish_stream,offline_access'});
  };

function Logout()
  {

    FB.logout(function(){document.location.reload();});
  }

    


