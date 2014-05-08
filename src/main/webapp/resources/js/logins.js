/*$(document).ready (function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
});

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}*/

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

$(document).ready(function(){

function Login(){
    FB.login(function(response) {
   if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ');
      var access_token =   FB.getAuthResponse()['accessToken'];
      console.log('Access Token = '+ access_token);
      FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
       var Kasutaja={};
       Kasutaja.id=response.id;
       Kasutaja.username=response.username;
       Kasutaja.admin=false;
       Kasutaja.nimi=response.name;
       console.log(Kasutaja);
      

       /*if(response.id in kasutaja andmebaas, siis admin)

       $.ajax("/kasutaja", {
       		type: "GET",
       		dataType: 'json',
       		success: function(resp) {
       			if(resp) {
       				console.log("Admin");
       				var str="Tere : "+response.name+"!<br>";
                            str +="<a href='pages/addarticle.html'>Lisa uudis</a>"+"<br>";
                            str +='<button id="logout">FB Logout</button>';
                            document.getElementById("profileArea").innerHTML=str;

       			} else {
       				console.log("Ei ole admin");
       				var str="Tere : "+response.name+"!";
                            str +="<button id='logout'>FB Logout</button>";
                            document.getElementById("profileArea").innerHTML=str;

       			}
       		}
       	});
*/


  
      
       if (response.name==="Jane Jürgenson"|| response.name==="Kristiina Pokk"||response.name==="Careelika Liisi Kuik") {
        var str="Tere : "+response.name+"!<br>";
        str +="<a href='pages/addarticle.html'>Lisa uudis</a>"+"<br>";
        str +='<button id="logout">FB Logout</button>';
        document.getElementById("profileArea").innerHTML=str;
      }else{
        var str="Tere : "+response.name+"!";
        str +="<button id='logout'>FB Logout</button>";
        document.getElementById("profileArea").innerHTML=str;

      }
        
     });
   } else {
     console.log('User cancelled login or did not fully authorize.');

       //localhostis addArticle katsetamiseks read 59-68 dubleeritud 43-47 juurest, hiljem uuesti ara kustutada, et koik oigesti toimiks
/*
       var str="Tere : "+response.name+"!<br>";
       str +="<a id='addNews'>Lisa uudis</a><br>";
       //muutsin!, tegin buttoniks
       //str +="<a href='pages/addarticle.html'>Lisa uudis</a>"+"<br>";
       str +="<button id='logout'>FB Logout</button>";
       document.getElementById("profileArea").innerHTML=str;

       // muutuste lopp*/
   }
 },{scope:'email'});
  }


function Logout(){
console.log('logout');
  FB.logout(function(response){
    var str="";
  str +="<button id='loginfb'>FB Login</button>";
  document.getElementById("profileArea").innerHTML=str;
  

});}

  
  
  // 1 kui klikitakse login peal, read 65-72, asendab onclick="Login()" html-is

  
  FB.getLoginStatus(function(response) {

  if (response.status === 'connected') {
     var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
   if (response.name==="Jane Jürgenson"|| response.name==="Kristiina Pokk"||response.name==="Careelika Liisi Kuik") {
        var str="Tere : "+response.name+"!<br>";
        str +="<a href='pages/addarticle.html'>Lisa uudis</a>"+"<br>";
        str +='<button id="logout">FB Logout</button>';
        document.getElementById("profileArea").innerHTML=str;
      }else{
        var str="Tere : "+response.name+"!";
        str +="<button id='logout'>FB Logout</button>";
        document.getElementById("profileArea").innerHTML=str;

      }
   
  } 
 });

  $('#loginfb').on('click',function(){
  Login();
  console.log("login.js - 68 login"); });

  $('#logout').on('click',function(){
      console.log('Ei.');
    Logout();
    console.log("login.js - 68 logout");});});