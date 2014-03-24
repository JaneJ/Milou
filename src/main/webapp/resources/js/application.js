
$(document).ready(function(){


 /* //otsingulahtrisse millegi sisestamisel
      $('#search-designe').on( 'keydown',function(){
	  var value = this.value;
  console.log(value);
	$('#searchItem').text("Otsib: "+value+"...");
  });
  
  //parast otsingus enter vajutamist
      $('#search-designe').on( 'change',function(){
	  var value = this.value;
  console.log(value);
	$('#searchItem').text("Viimati otsis: "+value);
  });

  //kui klikkida otsingu lahtri peal
      $('#search-designe').on( 'focus',function(){
	  var value = "";
  console.log(value);
	$('#searchItem').text(value);
  });
  */

  //uudise pealkirjale klikkides
  $('.uudisPealkiri').on( 'click',function(){
  console.log("application.js - uudise pealkiri"); 
  $("article").not($(this).closest('article')).hide("fast");

  //vaja on eemaldada plokipaigutus
  $(this).removeClass('.parem');
  $(this).removeClass('.vasak');
  $(this).removeClass('.style');
  $(this).closest('article').addClass('.uudisAktiivne');


	$(".uudisJalus").show("slow");
	$(".uudisTagasi").show("slow");
	$(".uudisTekst").slideDown("slow");
   });
   
  //kui valitakse naita kommentaare
  $('.naitaKommentaare').on( 'click',function(){
  console.log("uudisJalus"); 
    $("article").not($(this).closest('article')).hide("fast");
	$(this).closest('article').removeClass('.hidden');
	var article= $(this).closest('article');
	article.removeClass('.hidden');
	//$(".uudisJalus").slideDown("slow");
	$('.uudisKommentaarid').slideDown("slow");
  });
   
 /* /*
 //kui valitakse naita kommentaare
  $('#naitaKommentaare').on( 'click',function(){
  console.log("naitaKommentaare"); 
	$('#uudisKommentaarid').slideDown("slow");
  });
   */
   //kui valitakse "nav Lisa artikkel"
   $('#lisaArtikkel').on( 'click',function(){
  console.log("nav - #lisaArtikkel");
$('.vasak').hide();  
$('.parem').hide(); 
$('#side').hide(); 
  $("#formLisaArtikkel").show("slow");
   });
   


  
});
