$(document).ready(function(){
 console.log("test2.js");

  var JSONartikkel1= {
"ArtikliPealkiri":"Esimene",
"ArtikliId":"001",
"ArtikliLuhikirjeldus":"Luhi",
"ArtikliSisu":"Kreeka mütoloogias läheb kangelane Theseus Kreeta saarele, et tappa seal Minotaurus ehk lõpetada seeläbi aastaid kestnud regulaarne noorte ateenalaste ohverdamine Kreetal Knossose labürindis, kust arvati välja pääsemine võimatu olevat, keskpaigas peidus olevale hirmuäratavale koletisele – Minotaurusele."};


var vasak=$('<section id="vasak"></section>').text("See on vasak."); 
var parem=$('<section id="parem"></section>').text("See on parem.");

 
var article =$('<article></article>'); 
var h1=$("<h1></h1>").text("Esimene");
var header =$('<header></header>'); 
var footer =$('<footer></footer>');
var pText="Kreeka mütoloogias läheb kangelane Theseus Kreeta saarele, et tappa seal Minotaurus ehk lõpetada seeläbi aastaid kestnud regulaarne noorte ateenalaste ohverdamine Kreetal Knossose labürindis, kust arvati välja pääsemine võimatu olevat, keskpaigas peidus olevale hirmuäratavale koletisele – Minotaurusele."
var p=$("<p></p>"); 
var img='<img src="resources/images/pilt1.png" alt="pilt" >'
var autor="- Autor: Kristiina Pokk"
var loeKom=$("<span></span>").text("Loe kommentaare"); 
var teeKom=$("<span></span>").text("Kommenteeri"); 

var b=$("<button></button>").text("eemalda"); 
  $(vasak).addClass("vasak")
  $(parem).addClass("parem")
$("#sisu").append(vasak, parem);        
$("#parem").append(article);
$(article).append(header);
$(header).append(h1);
$(article).append(img);
$(p).append(pText);
$(article).append(p);
$(article).append(loeKom);
$(article).append(teeKom);
$(article).append(footer);
$(footer).append(autor);

$(article).append(b);








});