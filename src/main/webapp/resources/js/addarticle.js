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


/*$('#submit').click(function() {
	console.log('Data to DB');
	var data=$("form.artikkel").serializeObject();
	var Art={};
	var a=this.serializeArray();
	
	console.log(data);
        var Artikkel = {};
        //var Pilt = new Object();

       // Pilt.pilt=$("#file").val();
        Artikkel.autor=$("#autor").val();
        Artikkel.pealkiri=$("#pealkiri").val();
        Artikkel.kirjeldus=$("#lyhikirjeldus").val();
        Artikkel.uudis=$("#sisu").val();
        Artikkel.teema = $('input:radio[name=teema]:checked').val();
        console.log(Artikkel.autor+ Artikkel.pealkiri+ Artikkel.kirjeldus);
       
 		if (Artikkel.teema=="Koomiks") {
 			if (!Artikkel.pealkiri & !Pilt.pilt) {
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


//Kuhugi siia funktsioon, mis lisab selle ka pealehele ???

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(function() {
    $('artikkel').click(function() {
        $('#result').text(JSON.stringify($('form').serializeObject()));
        return false;
    });
});