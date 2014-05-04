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
       console.log(response.id);
       console.log(response.username);
       var Kasutaja={};
       Kasutaja.id=response.id;
       Kasutaja.username=response.username;
       Kasutaja.admin=false;
       Kasutaja.nimi=response.name;
       console.log(Kasutaja);


  
      
       if (response.name==="Jane Jürgenson"|| response.name==="Kristiina Pokk"||response.name==="Careelika Liisi Kuik")/*Algne, hiljem access tokenite abil kuidagi*/ {
        var str="Tere : "+response.name+"!<br>";
        str +="<a href='pages/addarticle.html'>Lisa uudis</a>"+"<br>";
        str +="<button id='logout'>FB Logout</button>";
        document.getElementById("profileArea").innerHTML=str;
      }else{
        var str="Tere : "+response.name+"!";
        str +="<button id='logout'>FB Logout</button>";
        document.getElementById("profileArea").innerHTML=str;

      }
        
     });
   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
 },{scope:'email'});
  }


function Logout(){
  FB.logout(function(response){
    var str="";
  str +="<button id='loginfb'>FB Login</button>";
  document.getElementById("profileArea").innerHTML=str;
  

});}

  
  
  // 1 kui klikitakse login peal, read 65-72, asendab onclick="Login()" html-is
$(document).ready(function(){

  $('#loginfb').on( 'click',function(){
  Login();
  console.log("login.js - 68 login"); });

  $('#logout').on( 'click',function(){
      console.log('Ei.');
    Logout();
    console.log("login.js - 68 logout");});});