$(document).ready(function(){
	var text_max=80;
	$('#formMargid').html(text_max + ' märke alles.' );

	$('#artiklipealkiri').keyup(function(){
		var pealkiri_len=$('#artiklipealkiri').val().length;
		var pealkiri_alles=text_max-pealkiri_len;
		$('#formMargid').html(pealkiri_alles+ ' märke alles.');
	});
});

$(document).ready(function(){
	var text_max=300;
	$('#formMargidLuhi').html(text_max + ' märke alles.' );

	$('#lyhikirjeldus').keyup(function(){
		var pealkiri_len=$('#lyhikirjeldus').val().length;
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
        Artikkel.uudis=$("#artiklisisu").value();
        Artikkel.teema = $('input:radio[name=teema]:checked').val();
        //console.log(Artikkel.autor+ Artikkel.pealkiri+ Artikkel.kirjeldus);

		if (!Artikkel.teema & !Artikkel.autor & ! Artikkel.pealkiri & !Artikkel.kirjeldus & ! Artikkel.sisu ) {
			alert("Kõik vajalikud väljad pole täidetud!")
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

