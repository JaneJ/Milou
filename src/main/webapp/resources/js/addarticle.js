$(document).ready(function(){
	var text_max=80;
	$('#formMargid').html(text_max + ' märke alles.' );

	$('#"formArtikliPealkiri"').keyup(function(){
		var pealkiri_len=$('#"formArtikliPealkiri"').val().length;
		var pealkiri_alles=text_max-pealkiri_len;
		$('#formMargid').html(pealkiri_alles+ ' märke alles.');
	});
});

$(document).ready(function(){
	var text_max=300;
	$('#formMargidLuhi').html(text_max + ' märke alles.' );

	$('#lyhikirjeldus').keyup(function(){
		var pealkiri_len=$('#formKirjeldus').val().length;
		var pealkiri_alles=text_max-pealkiri_len;
		$('#formMargidLuhi').html(pealkiri_alles+ ' märke alles.');
	});
});



/*
function lisaartikkel(){

	var teema=document.querySelector('input[name="teema"]:checked').value;


	var pealkiri=$('#pealkiri').val();
	var formKirjeldus=$('#formKirjeldus').val();
	var sisu=$('#artiklisisu').val();
};*/