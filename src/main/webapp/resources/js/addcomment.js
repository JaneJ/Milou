$(document).ready(function(){

	$('addComment').submit(function(){
		console.log('Comment to DB');
		var Kommentaar={};
		Kommentaar.kommentaar=$('#kommentaar').val();
		Kommentaar.artikkel=$(this).data("id");


		if(document.getElementById('ananuumne').checked){
			Kommentaar.nimi="Ananüümne";
		}else{
			Kommentaar.nimi="";
		}

		$.ajax("/kommentaarid",{
				type:"POST",
				//url:"ArtikkelData/lisaArtikkel",
				dataType:'json',
				data: JSON.stringify(Kommentaar),
				contentType: "application/json; charset=utf-8",
 
				success: function(Kommentaar){   
					console.log("success");
					alert('Kommentaar edukaltlisatud. ');
					//document.location.reload(true);
				},
				error:function(req, text) {
					console.log(req);
					console.log(text);
				}

			});

	});

});