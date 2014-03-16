
window.fbAsyncInit = function() {
    FB.init({
      appId      : '1385045075103554', // App ID
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    
   
  
FB.login(function(response) {
  if (response.authResponse) 
    {
      FB.api('/me', function(response) {
              
    });
  } else 
    {
      console.log('User cancelled login or did not fully authorize.');
    }
     },{scope: 'email,user_photos,user_videos'});
  

 

  // Load the SDK asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));


/*

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
      $('#profileArea').hide();

      var html=helper.getProfileHTML(result);
        
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
/*function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    document.getElementById('signinButton').setAttribute('style', 'display: none');
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}*/
