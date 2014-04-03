$(document).ready(function(){


  // 1 kui klikitakse kommentaari peal
  $('#uudisKommentaarid').on( 'click',function(){
  console.log(" 1 '#uudisKommentaarid'"); 
	$('#uudisKommentaarid').slideUp("slow");
  });

  
  
  
  
  
  // 2 kui klikitakse pealkirja peal 
  $('#uudisPealkiri').on( 'mouseenter',function(){
  
  console.log(" 2 uudisPealkiri"); 
	//$('#uudisKommentaarid').slideDown("slow");
  });
  
    // 3 kui klikitakse pealkirja peal 
  $('#uudisPealkiri').on( 'dblclick',function(){
  
  console.log(" 3 uudisPealkiri"); 
 // $(this).closest('#uudisKommentaarid').show();
  //$('#uudisKommentaarid').show();
	//$('#uudisKommentaarid').slideDown("slow");
	$(".article").hide();
	$(".article").hide();
  });

});