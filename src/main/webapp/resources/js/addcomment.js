$(document).ready(function(){
console.log("teine js fail");
	$("[class^='.comForm']").submit(function(){
		var Kommentaar={};
		Kommentaar.kommentaar=$('.kommentaar').val();
		Kommentaar.artikkel=$(this).data("id");
        Kommentaar.nimi=$(document).data('loggedName');

		$.ajax("/kommentaar",{
				type:"POST",
				dataType:'json',
				data: JSON.stringify(Kommentaar),
				contentType: "application/json; charset=utf-8",
				success: function(Kommentaar){
					alert('Kommentaar edukalt lisatud. ');
				},
				error:function(req, text) {
                    alert('Midagi on valesti addcomment.js rida 36 ');
				}
			});
	});
});