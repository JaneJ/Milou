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
});

$(document).ready(function(){
$('#submit').click(function() {
        var Artikkel = new Object();
        Artikkel.autor=$("#autor").val();
        Artikkel.pealkiri=$("#pealkiri").val();
        Artikkel.pilt=$("#file").val();
        Artikkel.kirjeldus=$("#lyhikirjeldus").val();
        Artikkel.uudis=$("#sisu").val();
        Artikkel.teema = $('input:radio[name=teema]:checked').val();
        console.log(Artikkel.autor+ Artikkel.pealkiri+ Artikkel.kirjeldus);
       
 		if (Artikkel.teema=="Koomiks") {
 			if (!Artikkel.pealkiri & !Artikkel.pilt & !Artikkel.pilt ) {
 				alert("Kõik vajalikud väljad pole täidetud!");
 			}else {
			$.ajax("/artiklid",{
				type:"POST",
				url:"/artiklid",
				dataType:'json',
				data: JSON.stringify(Artikkel),
				contentType: "application/json; charset=utf-8",
 
				success: function(Artikkel){   
					console.log("success");
					/*


					*/
				},
				error:function(req, text) {
					console.log(req);
					console.log(text);
				}

			});}}
		if (!Artikkel.teema & !Artikkel.autor & ! Artikkel.pealkiri & !Artikkel.kirjeldus & ! Artikkel.sisu ) {
			alert("Kõik vajalikud väljad pole täidetud!")
		}else {
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
		};});});


//Kuhugi siia funktsioon, mis lisab selle ka pealehele ???