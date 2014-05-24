$(document).ready(function () {
    var text_max = 80;
    $('#formMargid').html(text_max + ' mÃ¤rke alles.');
    $('#formArtikliPealkiri').keyup(function () {
        var pealkiri_len = $('#formArtikliPealkiri').val().length;
        var pealkiri_alles = text_max - pealkiri_len;
        $('#formMargid').html(pealkiri_alles + ' mÃ¤rke alles.');
        var a = $(document).data('loggedName');
        console.log("Autori nimi: "+a);
    });
});
$(document).ready(function () {
    var text_max = 300;
    $('#formMargidLuhi').html(text_max + ' mÃ¤rke alles.');
    $('#lyhikirjeldus2').keyup(function () {
        var pealkiri_len = $('#lyhikirjeldus2').val().length;
        var pealkiri_alles = text_max - pealkiri_len;
        $('#formMargidLuhi').html(pealkiri_alles + ' mÃ¤rke alles.');
    });
    console.log("tere");
    $('#lisaArtikkel').submit(function () {
        var a = $(document).data('loggedName');
        console.log('Data to DB'+ "a on "+a);
        var Artikkel = {};
        Artikkel.autor = a;
        Artikkel.pealkiri = $("#formArtikliPealkiri").val();
        Artikkel.kirjeldus = $("#lyhikirjeldus2").val();
        Artikkel.uudis = $("#artiklisisu").val();
        Artikkel.teema = $('input:radio[name=teema]:checked').val();
        Artikkel.pilt = $("#pilt").val();
        console.log(Artikkel.autor);
        console.log("" == $("#autor").val());
        var a = $(document).data('loggedName');
        console.log("Autori nimi: "+a);
        if (Artikkel.autor == "") {
            console.log("TÃ¼hi")
            Artikkel.autor ="Anonüümne";
        }
        if (Artikkel.autor == "" || Artikkel.pealkiri == "" || $('input:radio[name=teema]:checked').val() == "" || Artikkel.kirjeldus == "" || Artikkel.uudis == "") {
            alert("KÃµik vajalikud vÃ¤ljad pole tÃ¤idetud!");
        }

        else if (Artikkel.autor === "Jane Jürgenson" || Artikkel.autor === "Kristiina Pokk" || Artikkel.autor === "Careelika Liisi Kuik") {
            console.log(Artikkel);
            $.ajax("/artiklid", {type: "POST", dataType: 'json', data: JSON.stringify(Artikkel), contentType: "application/json; charset=utf-8", success: function (Artikkel) {
                console.log("success");
                alert('Artikkel edukalt Ã¼les laetud!');
                document.location.reload(true);
            }, error: function (req, text) {
                console.log(req);
                console.log(text);
            }});
        }
        else{
            alert("Artikli lisamiseks logige sisse administraatori õigustes.");

        }
        return false;
    });

    $(document).on("click", "lisaArtikkel",function(){
        var a = $(document).data('loggedName');
        if(a===""){
            a ="Anonüümne";

        }
        console.log("Autori nimi: "+a);
        $("#autor").val(a);
        $("#autoriNimi").text("Autor: "+a);
        console.log("Autori nimi: "+a);

    });
});