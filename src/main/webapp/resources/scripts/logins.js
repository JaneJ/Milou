$(document).ready(function(){

  $('#login_fb').click(function(){
    FB.login(function(response) {
   if (response.authResponse) {
	//window.location.href = "index.html";
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
     });
   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
 });
  });
});

window.fbAsyncInit = function() {
        FB.init({
          appId      : '1385045075103554',
          status     : true,
          xfbml      : true
        });
      };

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/et_EE/all.js#xfbml=1&appId=1385045075103554";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));





/*SigninCallback: function(authResult){
  if (authResult['access_token']) {
    $('#gConnect').hide();

    gapi.client.load('plus', 'v1',function(){
      helper.connect();
    });
  }else if (authResult['error']) {}
}
connect: function(){
  gapi.client.plus.people.get({userID:'me'}).execute{
    function(result){
      helper.user=result;
      $('#profileArea').hide();

      var html=helper.getProfileHTML(result);
        
      $('#profileArea').html('Signed in as' + helper.user.displayName + '!')
      $('disconnect').show();
      $('authButtons').show();
    }
  };
}
getProfileHTML: function(user){
  var html='<a target=_"blank" href="'+user.url + '">'+'<img src="'+
  user.image.url +'" alt="'+user.displayName + '" title="' + 
  user.displayName +'" height="35"/>' + '</a>'+user.displayName;
  return html;
}*/
function signinCallback(authResult) {
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
}
