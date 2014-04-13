/*see js vastutab aside ala dunaamiliste toimingute eest, kui aside on juba olemas*/

$(document).ready(function() {
    console.log("articleFromAside.js");

    //see funktsioon peaks edasi viima uksiku artikli kuvamiseni, kui andmebaasist artikli json saadud
    function vastus(data){
        console.log("siia peaks joudma andmebaasi vastus");
        console.log(data);
        //showArticle(data)
    };

    //kui vajutame artikli pealkirja peal (aside alal)
    $('.side, h2').on('click',function(){
        console.log("valiti aside pealkiri");
         var id = $(this).data("id");
         console.log(id);
                    // tahab andmebaasilt vastuseks vastava id-ga artiklit, json objektina
                    $.ajax('/artiklid', {
                        type: "GET",
                        data: {id:id},
                        //success: vastus ("vastuse sisu")
                        success: vastus

                    });


         console.log("-> paring: GET, '/artiklid', id: "+id);

    });


});

