$(document).ready(function(){


//kui valitakse naita kommentaare
  $('.naitaKommentaare').on( 'click',function(){
  console.log("naitaKommentaare"); 
    $("article").not($(this).closest('article')).hide("slow");
	$('#uudisKommentaarid').slideDown("slow");
  });
  
  //kui klikitakse kommentaari peal
  $('.uudisKommentaarid').on( 'click',function(){
  console.log("#uudisKommentaarid"); 
	$('#uudisKommentaarid').slideUp("slow");
  });
 
  
  //kui valitakse kommenteeri
  $('.kommenteeri').on( 'click',function(){
  console.log("#kommenteeri"); 
    $("article").not($(this).closest('article')).hide("slow");
	$('#uudisKommenteeri').slideDown("slow");
  });

    //kui klikitakse kommenteerimisala peal
  $('#uudisKommenteeri').on( 'click',function(){
  console.log("#uudisKommenteeri"); 
	$('#uudisKommenteeri').slideUp("slow");
  });
  
});