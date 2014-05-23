$(document).ready(function(){
console.log("teine js fail");
//$('.addComment').submit(function(){
	$("[class^='.comForm']").submit(function(){
		console.log('Comment to DB');
		var Kommentaar={};
		Kommentaar.kommentaar=$('.kommentaar').val();
        console.log("vaartus "+Kommentaar.kommentaar);
		Kommentaar.artikkel=$(this).data("id");
        console.log("kom vaartus "+Kommentaar.artikkel);
        Kommentaar.nimi=$(document).data('loggedName');
        console.log("kom nimi "+Kommentaar.nimi);

	/*	if(document.getElementById('anonuumne').checked){
			Kommentaar.nimi="Anonüümne";
		}else{
			Kommentaar.nimi="";
		}
*/


        $('#lisaArtikkel').submit(function() {
            console.log('Data to DB');

            var Kommentaar = {};


            Kommentaar.autor=$("#autor").val();
            console.log("formi jaoks id "+idforform);
            Kommentaar.artikkel=idforform.val();
            Kommentaar.kommentaar=$("#komSisu2").val();

            console.log(Kommentaar.autor);
            console.log(Kommentaar.artikkel);
            console.log(Kommentaar.kommentaar);
          /*  if(Artikkel.autor==""){console.log("Tühi")}

            if ( Artikkel.autor==""||Artikkel.pealkiri==""||$('input:radio[name=teema]:checked').val()==""||Artikkel.kirjeldus==""||Artikkel.uudis=="") {
                alert("Kõik vajalikud väljad pole täidetud!");
            }else {*/

                console.log(Kommentaar);
                $.ajax("/kommentaar",{
                    type:"POST",
                    //url:"ArtikkelData/lisaArtikkel",
                    dataType:'json',
                    data: JSON.stringify(Kommentaar),
                    contentType: "application/json; charset=utf-8",

                    success: function(Kommentaar){
                        console.log("success");
                        alert('Kommentaar edukalt lisatud. ');
                        //document.location.reload(true);
                    },
                    error:function(req, text) {
                        console.log(req);
                        console.log(text);
                        console.log("addcomment.js rida 35");
                        alert('Midagi on valesti addcomment.js rida 36 ');
                    }

                });

           // }
            return false;
        });

    });







});