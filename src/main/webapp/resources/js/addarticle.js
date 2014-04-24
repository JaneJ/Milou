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

/*
$('#submit').click(function() {
	event.preventDefault();
	console.log('Data to DB');
	var data=$("form.artikkel").serializeObject();
		
	console.log(data);
        var Artikkel = new Object();
        //var Pilt = new Object();

       // Pilt.pilt=$("#file").val();
        Artikkel.autor=$("#autor").val();
        Artikkel.pealkiri=$("#pealkiri").val();
        Artikkel.kirjeldus=$("#lyhikirjeldus").val();
        Artikkel.uudis=$("#sisu").val();
        Artikkel.teema = $('input:radio[name=teema]:checked').val();
        console.log(Artikkel.autor+ Artikkel.pealkiri+ Artikkel.kirjeldus);
       
 		if (Artikkel.teema=="Koomiks") {
 			if (!Artikkel.pealkiri & /*!Pilt.pilt*//*) {
 				alert("Kõik vajalikud väljad pole täidetud!");
 			}else {
			$.ajax("/artiklid",{
				type:"POST",
				
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
		};});*/





$('#submit').click(function(){
	event.preventDefault();
	var radios=document.getElementByName('teema');
	var teema='';
	for(var i=0;i<radios.length;i++){
   if(radios[i].checked)
      teema = radios[i].value;
	};


	var JSONObject={
		"autor": document.getElementById('autor'),
		"pealkiri":document.getElementById('pealkiri'),
		"kirjeldus":document.getElementById('lyhikirjeldus'),
		"uudis":document.getElementById('sisu'),
		"teema":teema
		
	}

	//var json=JSON.stringify(JSONObject);
	$.ajax("/artiklid",{
				type:"POST",
				
				dataType:'json',
				data: JSON.stringify(JSONObject),
				contentType: "application/json; charset=utf-8",
 				success: function(JSONObject){   
					console.log("success");
				
				},
				error:function(req, text) {
					console.log(req);
					console.log(text);
					console.log(JSONObject);
				}});

});

//Kuhugi siia funktsioon, mis lisab selle ka pealehele ???

