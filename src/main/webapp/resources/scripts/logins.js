window.fbAsyncInit = function() {
    FB.init({
      appId      : '1385045075103554', // App ID
      channelUrl : 'http://hayageek.com/examples/oauth/facebook/oauth-javascript/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    
    
  FB.Event.subscribe('auth.authResponseChange', function(response) 
  {
   if (response.status === 'connected') 
    {
      document.getElementById("message").innerHTML +=  "<br>Connected to Facebook";
      //SUCCESS
      
    }  
  else if (response.status === 'not_authorized') 
    {
      document.getElementById("message").innerHTML +=  "<br>Failed to Connect";

    //FAILED
    } else 
    {
      document.getElementById("message").innerHTML +=  "<br>Logged Out";

      //UNKNOWN ERROR
    }
  }); 
  
    };
    
    function Login()
  {
  
    FB.login(function(response) {
       if (response.authResponse) 
       {
          getUserInfo();
        } else 
        {
           console.log('User cancelled login or did not fully authorize.');
        }
     });
  
  
  }

  function getUserInfo() {
      FB.api('/me', function(response) {

    var str="Tere : "+response.name+"!";
        str +="<input type='button' id='logoutfb' value='Logout' onclick='Logout();'/>";
        document.getElementById("profileArea").innerHTML=str;
              
    });
    }

  
  }
  function Logout()
  {
    FB.logout(function(){document.location.reload();});
  }

  // Load the SDK asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));


/*






//Google +

function signinCallback(authResult){
  if (authResult['access_token']) {
    $('#gConnect').hide();

    gapi.client.load('plus', 'v1',function(){
      helper.connect();
    });
  }else if (authResult['error']) {}
}
function connect(){
  gapi.client.plus.people.get({userID:'me'}).execute{
    function(result){
      helper.user=result;
      var html=helper.getProfileHTML(result);
      html+="<input type='button' value='Logout' onclick='Logout();'/>";
        
      $('#profileArea').html('Signed in as' + helper.user.displayName + '!')
      
    }
  };
}
getProfileHTML: function(user){
  var html='<a target=_"blank" href="'+user.url + '">'+'<img src="'+
  user.image.url +'" alt="'+user.displayName + '" title="' + 
  user.displayName +'" height="35"/>' + '</a>'+user.displayName;
  return html;
}
function Logout(){
  gapi.auth.signOut();
}
*/
