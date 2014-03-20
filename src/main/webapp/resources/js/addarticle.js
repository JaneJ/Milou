$(document).ready(function(){
	var text_max=80;
	$('#m2rke').html(text_max + ' märke alles.' );

	$('#artiklipealkiri').keyup(function(){
		var pealkiri_len=$('#artiklipealkiri').val().length;
		var pealkiri_alles=text_max-pealkiri_len;
		$('#m2rke').html(pealkiri_alles+ ' märke alles.');
	});
});

$(document).ready(function(){
	var text_max=300;
	$('#m2rkelyhi').html(text_max + ' märke alles.' );

	$('#lyhikirjeldus').keyup(function(){
		var pealkiri_len=$('#lyhikirjeldus').val().length;
		var pealkiri_alles=text_max-pealkiri_len;
		$('#mrkelyhi').html(pealkiri_alles+ ' märke alles.');
	});
});



/*
function lisaartikkel(){

	var teema=document.querySelector('input[name="teema"]:checked').value;


	var pealkiri=$('#pealkiri').val();
	var lyhikirjeldus=$('#lyhikirjeldus').val();
	var sisu=$('#artiklisisu').val();
};*/