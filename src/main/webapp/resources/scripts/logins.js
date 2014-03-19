window.fbAsyncInit = function() {
    FB.init({
      appId      : '1385045075103554', // App ID
      status     : true, // check login status
      //cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    


$document.ready(function(){
  $('#loginfb').click(function){
    FB.login(function(response))
    if (response.authResult) {
      window.location.href="#";
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me',function){
        console.log('Good to see you, ' + response.name + '.');
        var str="Tere : "+response.name+"!";
        str +="<input type='button' id='logoutfb' value='Logout' />";
        document.getElementById("profileArea").innerHTML=str;
      }else{console.log('User cancelled login or did not fully authorize.');
       }
 });
    
(function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/all.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    
   
 $document.ready(function(){
  $('#logutfb').click(function){
    FB.logout(function(){document.location.reload();});
  }});



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
