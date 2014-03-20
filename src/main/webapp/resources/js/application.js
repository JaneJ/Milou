
$(document).ready(function(){


  //otsingulahtrisse millegi sisestamisel
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
  

  
  $('h2').on( 'click',function(){
  console.log("parent"); 
  $("article").not($(this).closest('article')).hide("slow");

  	$("#uudisJalus").show("slow");
	$(".uudisTekst").slideDown("slow");
   });
   
   //kui valitakse naita kommentaare
  $('h2').on( 'click',function(){
  console.log("uudisJalus"); 
	$("#uudisJalus").slideDown("slow");
  });
   
 /*  //kui valitakse naita kommentaare
  $('#naitaKommentaare').on( 'click',function(){
  console.log("naitaKommentaare"); 
	$('#uudisKommentaarid').slideDown("slow");
  });*/

   //kui valitakse "nav Lisa artikkel"
   $('#lisaArtikkel').on( 'click',function(){
  console.log("nav - #lisaArtikkel");
$('table').hide();  
$('.cathegories').hide();  
  $("#formLisaArtikkel").show("slow");
   });
   

  
});
