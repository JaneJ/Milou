$(document).ready(function(){
	var text_max=80;
	$('#formMargid').html(text_max + ' märke alles.' );

	$('#formArtikliPealkiri').keyup(function(){
		var pealkiri_len=$('#formArtikliPealkiri').val().length;
		var pealkiri_alles=text_max-pealkiri_len;
		$('#formMargid').html(pealkiri_alles+ ' märke alles.');
	});
});

$(document).ready(function(){
	var text_max=300;
	$('#formMargidLuhi').html(text_max + ' märke alles.' );

	$('#lyhikirjeldus2').keyup(function(){
		var pealkiri_len=$('#lyhikirjeldus2').val().length;
		var pealkiri_alles=text_max-pealkiri_len;
		$('#formMargidLuhi').html(pealkiri_alles+ ' märke alles.');
	});



console.log("tere");

$('#lisaArtikkel').submit(function() {
	console.log('Data to DB');

        var Artikkel = {};

        
        Artikkel.autor=$("#autor").val();
        Artikkel.pealkiri=$("#formArtikliPealkiri").val();
        Artikkel.kirjeldus=$("#lyhikirjeldus2").val();
        Artikkel.uudis=$("#artiklisisu").val();
        Artikkel.teema = $('input:radio[name=teema]:checked').val();
        Artikkel.pilt=$("#pilt").val();
        console.log(Artikkel.autor);
        console.log((""==$("#autor").val());

		if ( $("#autor").val()==""&&$("#formArtikliPealkiri").val()==""&&$("#artiklisisu").val()==""&&$('input:radio[name=teema]:checked').val()==""&&$("#lyhikirjeldus2").val()=="") {
			alert("Kõik vajalikud väljad pole täidetud!");
		}else {

			console.log(Artikkel);
			$.ajax("/artiklid",{
				type:"POST",
				//url:"ArtikkelData/lisaArtikkel",
				dataType:'json',
				data: JSON.stringify(Artikkel),
				contentType: "application/json; charset=utf-8",
 
				success: function(Artikkel){   
					console.log("success");
					alert('Artikkel edukalt üles laetud!');
					document.location.reload(true);
				},
				error:function(req, text) {
					console.log(req);
					console.log(text);
				}

			});

		}
		return false;
	});

});

