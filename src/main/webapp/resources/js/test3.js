$(document).ready(function(){
 console.log("test3.js");

var JSONArticle={
"ArtikliPealkiri":"Esimene",
"ArtikliId":"001",
"ArtikliLuhikirjeldus":"Luhi",
"ArtikliJalus":"- Autor: Kristiina Pokk",
"ArtikliPilt":'<img src="resources/images/pilt1.png" alt="pilt" >',
"ArtikliSisu":"Kreeka mütoloogias läheb kangelane Theseus Kreeta saarele, et tappa seal Minotaurus ehk lõpetada seeläbi aastaid kestnud regulaarne noorte ateenalaste ohverdamine Kreetal Knossose labürindis, kust arvati välja pääsemine võimatu olevat, keskpaigas peidus olevale hirmuäratavale koletisele – Minotaurusele.",
"ArtikliAeg":"02.04.2014 21:19"};

var article =$('<article></article>'); 
var h1=$("<h1></h1>");
var header =$('<header></header>'); 
var footer =$('<footer></footer>');
var p=$("<p></p>"); 
var loeKom=$("<span></span>").text("Loe kommentaare"); 
var teeKom=$("<span></span>").text("Kommenteeri"); 
var img=$('<img src= alt="pilt">'); 
//var img='<img src="resources/images/pilt1.png" alt="pilt" >'




$(article).append(header);
$(header).append(h1);
$(article).append(img);
//$(p).append(pText);
$(article).append(p);
$(article).append(footer);
$(article).append(loeKom);
$(article).append(teeKom);
//$(footer).append(autor);

       
$("#vasak").append(article);

var headerList = document.getElementsByTagName("h1");
headerList[0].innerHTML=JSONArticle.ArtikliPealkiri;
var footerList = document.getElementsByTagName("footer");
footerList[0].innerHTML=JSONArticle.ArtikliJalus;
var pList = document.getElementsByTagName("p"); 
pList[0].innerHTML=JSONArticle.ArtikliSisu;  
var imgList = document.getElementsByTagName("img"); 
imgList[0].innerHTML=JSONArticle.ArtikliPilt; 


  
  
  // kui klikitakse "eemalda" (artikli) peal
  $('article').on( 'click',function(){
  console.log("eemaldab sisu"); 
  var a= $(this).closest('article');
  $("#vasak").remove(); 
  $("#parem").remove(); 
  $(a).addClass("vasakParem")
  $('#sisu').append(a);
  });
  

  


});
