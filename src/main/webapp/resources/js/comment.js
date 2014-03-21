$(document).ready(function(){


//kui valitakse naita kommentaare
  $('.naitaKommentaare').on( 'click',function(){
  console.log("naitaKommentaare"); 
    $("article").not($(this).closest('article')).hide("slow");
	$('.uudisKommentaarid').slideDown("slow");
  });
  
  //kui klikitakse kommentaari peal
  $('.kommenteeriLink').on( 'click',function(){
  console.log(".uudisKommentaarid"); 
	$('.uudisKommentaarid').slideDown("slow");
  });
 
  
  //kui valitakse kommenteeri
  $('.kommenteeriLink').on( 'click',function(){
  console.log(".uudisKommenteeri"); 
    $("article").not($(this).closest('article')).hide("slow");
	$(this).closest('.uudisKommenteeri').removeClass(".hidden");
	
	$('.uudisKommenteeri').slideDown("slow");
  });

    /*kui klikitakse kommenteerimisala peal
  $('.kommenteeriLink').on( 'dblclick',function(){
  console.log(".uudisKommenteeri"); 
	$('.uudisKommenteeri').slideUp("slow");
  });*/
  
  	var text_max=300;
	$('.kommenteeriMargid').html(text_max + ' m&#228;rke alles.' );

	$('.kommenteeriSisu').keyup(function(){
	console.log("loendab marke");
		var pealkiri_len=$('.kommenteeriSisu').val().length;
		var pealkiri_alles=text_max-pealkiri_len;
		$('.kommenteeriMargid').html(pealkiri_alles+ ' m&#228;rke alles.');
	});
  
});