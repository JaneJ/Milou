//FB  
  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1385045075103554',
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  FB.Event.subscribe('auth.authResponseChange', function(response) {
    
    if (response.status === 'connected') {
      
      testAPI();
    } else if (response.status === 'not_authorized') {
      
      FB.login();
    } else {
      
      FB.login();
    }
  });
  };

  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/et_EE/all.js#xfbml=1&appId=1385045075103554";
   ref.parentNode.insertBefore(js, ref);
  }(document));

  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Good to see you, ' + response.name + '.');
    });
  }
   FB.logout(function(response) {
        // Person is now logged out
    });*/

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

