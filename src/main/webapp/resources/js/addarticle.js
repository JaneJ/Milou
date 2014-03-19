$(document).ready(function(){
	var text_max=80;
	$('#märke').html(text_max + ' märke alles.' );

	$('#artiklipealkiri').keyup(function(){
		var pealkiri_len=$('#artiklipealkiri').val().length;
		var pealkiri_alles=text_max-pealkiri_len;
		$('#märke').html(pealkiri_alles+ ' märke alles.');
	});
});

$(document).ready(function(){
	var text_max=300;
	$('#märkelühi').html(text_max + ' märke alles.' );

	$('#lyhikirjeldus').keyup(function(){
		var pealkiri_len=$('#lyhikirjeldus').val().length;
		var pealkiri_alles=text_max-pealkiri_len;
		$('#märkelühi').html(pealkiri_alles+ ' märke alles.');
	});
});



/*
function lisaartikkel(){

	var teema=document.querySelector('input[name="teema"]:checked').value;


	var pealkiri=$('#pealkiri').val();
	var lyhikirjeldus=$('#lyhikirjeldus').val();
	var sisu=$('#artiklisisu').val();
};*/