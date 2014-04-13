/*see js vastutab pealehe parem ja vasak div artiklite laadimise eest
 puudu on:
  1) andmebaasist mitut artiklit sisaldava jsoni saamine
  2) onscroll artiklite juurde laadimine lehe alla
*/

$(document).ready(function(){
 console.log("mainArticles.js");


var JSONArticle=[
         {
            "pealkiri":"Esimene",
            "id":"2",
            "kirjeldus":"luhikirjeldus id: 2",
            "autor":"Careelika Liisi Kuik",
            "pilt":'<img src="resources/images/pilt1.png" alt="pilt" >',
            "uudis":"Artikli id on 2, json objektis esimene uudis, artikli sisu.",
            "lisatud":"13.04.2014 19:31"
        },
        {
            "pealkiri":"Teine",
            "id":"3",
            "kirjeldus":"luhikirjeldus id: 3",
            "autor":"Careelika Liisi Kuik",
            "pilt":'<img src="resources/images/pilt2.png" alt="pilt" >',
            "uudis":"Artikli id on 3, json objektis 2. uudis, artikli sisu.",
            "lisatud":"13.04.2014 19:32"
        },
         {
             "pealkiri":"Kolmas",
             "id":"4",
            "kirjeldus":"luhikirjeldus id: 4",
            "autor":"Careelika Liisi Kuik",
            "pilt":'<img src="resources/images/pilt3.png" alt="pilt" >',

            "uudis":"Artikli id on 4, json objektis 3. uudis, artikli sisu.",
            "lisatud":"13.04.2014 19:33"
         },
       {
          "pealkiri":"Neljas",
          "id":"5",
            "kirjeldus":"luhikirjeldus id: 5",
            "autor":"Careelika Liisi Kuik",
            "pilt":'<img src="resources/images/pilt3.png" alt="pilt" >',

            "uudis":"Artikli id on 5, json objektis 4. uudis, artikli sisu.",
            "lisatud":"13.04.2014 19:34"
      }

]

//lisame pealehele div-id
var vasak = $("<div id='vasak'></div>");
var parem = $("<div id='parem'></div>");
$("#sisu").append(vasak,parem);




    //uhekaupa ehitame ja lisame artiklid
    for( var i=0; i<JSONArticle.length;i++){
    var json = JSONArticle[i];
    buildArticle(json)
    }

    console.log("koik artiklid tehtud");




    //ehitab artikli eelvaate valmis ette antud json kujul uksiku artikli andmetest
    //terve artikli ehitab fun showArticle

      function buildArticle(json){
        console.log("buildArticle");

            //loome tagid
            var article =$('<article></article>');
            var h1=$("<h1></h1>");
            var header =$('<header></header>');
            var footer =$('<footer></footer>');
            var p=$("<p></p>");
            var p2=$("<p></p>");
            var loeKom=$("<a></a>").text("Loe kommentaare");
            var teeKom=$("<a></a>").text("Kommenteeri");
            var img=json.pilt;
            loeKom.addClass("loeKom");
            teeKom.addClass("teeKom");

            //anname vaartuse tagidele
            h1.text(json.pealkiri);
            h1.data("id",json.id);
            console.log(json.pealkiri);
            footer.text("Autor: "+json.autor);
            p.text(json.uudis);
            p2.text(json.lisatud);

            //uhendame osad uksteisega
            header.append(h1);
            article.append(header);
            article.append(img);
            article.append(p);
            footer.append(p2,loeKom,teeKom);
            article.append(footer);
            article.addClass("article");

           //valib artikli asukohaks kordamooda parem ja vasak div
            if (i%2 ==0)
              {
               vasak.append(article);
              }
            else
              {
              parem.append(article);
              }

            console.log("valmis artikkel ");
      };



             //kui vajutame artikli pealkirja peal pealehel
             $("h1").on('click',function(){
                 console.log("valiti article,'h1'");
                  var id = $(this).data("id");
                  console.log(id);
                             // tahab andmebaasilt vastuseks vastava id-ga artiklit, json objektina
                             $.ajax('/artiklid', {
                                 type: "GET",
                                 data: {id:id},
                                 success: showArticle

                             });


                  console.log("-> paring: GET, '/artiklid', id: "+id);


                //lahendus ilma andmebaasita
                var data= JSONArticle[2]
                showArticle(data)

             });



               function removeAllButAside(){
                       $('#sisu').contents(':not(aside)').remove();
               };


                //sarnane buildArticle fun-le, aga ehitab artikli ulest taies suuruses, koos koikide osadega
               function showArticle(json) {   /*argument responseText*/
                    console.log("kuvab Artikli");
                    removeAllButAside()
                    console.log(json.pealkiri);
                    buildFullArticle(json);
               };


               function buildFullArticle(json){
                       console.log("buildFullArticle");

            var article =$('<article></article>');
            var h1=$("<h1></h1>");
            var header =$('<header></header>');
            var footer =$('<footer></footer>');
            var p=$("<p></p>");
            var p2=$("<p></p>");
            var loeKom=$("<a></a>").text("Loe kommentaare");
            var teeKom=$("<a></a>").text("Kommenteeri");
            var img=json.pilt;
            loeKom.addClass("loeKom");
            teeKom.addClass("teeKom");

            //anname vaartuse tagidele
            h1.text(json.pealkiri);
            h1.data("id",json.id);
            console.log(json.pealkiri);
            footer.text("Autor: "+json.autor);
            p.text(json.uudis);
            p2.text(json.lisatud);

            //uhendame osad uksteisega
            header.append(h1);
            article.append(header);
            article.append(img);
            article.append(p);
            footer.append(p2,loeKom,teeKom);
            article.append(footer);
            article.addClass("article");


                       var vp=$("<section id = 'vasakParem'></section>");
                        vp.append(article);
                       $("#sisu").append(vp);

                }


      /* kui klikitakse "tagasi" (artikli) peal
      tagasi.click( function(){
      console.log("eemaldab sisu");
       $(this).closest('article').remove();
      }); */

});
