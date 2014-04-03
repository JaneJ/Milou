 $(document).ready(function(){
 console.log("aside");
 
 var JSONaside1= {
"ArtikliPealkiri":"Täna progen jälle terve öö",
"ArtikliId":"001"};

 var JSONaside2= {
"ArtikliPealkiri":"Mulle meeldib muusikat ka kuulata",
"ArtikliId":"002"};
 
  var JSONaside3= {
"ArtikliPealkiri":"Miks sa mulle poest õuna ei ostnud",
"ArtikliId":"003"};
 
 var aside1 = $('<div id = "aside1"></div>');
 var aside2 = $('<div id = "aside2"></div>');
 var aside3 = $('<div id = "aside3"></div>');
 var aside=$('<aside id = "aside"></aside>');
  
  $(aside).addClass(".side")
  $(aside).append(aside1,aside2,aside3);
  $('#sisu').append(aside);
  
  
  // viimasedUudised
  
  var aside1H4=$("<h4></h4>").text("Viimased uudised");
  $("#aside1").append(aside1H4);
/*siia tuleb andmebaasi vaatest saadud artikli elemendi pealkiri:*/
   var aside1H2=$('<h2 id="aside1H2"></h2>').text("h2");
  $("#aside1").append(aside1H2);
document.getElementById("aside1H2").innerHTML=JSONaside1.ArtikliPealkiri;
  
  
  //Enim loetud
  
    var aside2H4=$("<h4></h4>").text("Enim loetud");
  $("#aside2").append(aside2H4);
    /*siia tuleb andmebaasi vaatest saadud artikli elemendi pealkiri:*/
     var aside2H2=$('<h2 id="aside2H2"></h2>').text("h2");
  $("#aside2").append(aside2H2);
document.getElementById("aside2H2").innerHTML=JSONaside2.ArtikliPealkiri;
  
  
  //Enim kommenteeritud
  
    var aside3H4=$("<h4></h4>").text("Enim kommenteeritud");
  $("#aside3").append(aside3H4);
      /*siia tuleb andmebaasi vaatest saadud artikli elemendi pealkiri:*/
     var aside3H2=$('<h2 id="aside3H2"></h2>').text("h2");
  $("#aside3").append(aside3H2);
document.getElementById("aside3H2").innerHTML=JSONaside3.ArtikliPealkiri;
  
  //kui pealkirjale vajutatakse, tuleb artikkel ette
/*$('h2').on( 'click',function(){
  */
  
  });