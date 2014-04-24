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
            "lisatud":"13.04.2014 19:31",
            "teema":"Krimi",
            "vaatamisi":"2"
        },
        {
            "pealkiri":"Teine",
            "id":"3",
            "kirjeldus":"luhikirjeldus id: 3",
            "autor":"Careelika Liisi Kuik",
            "pilt":'<img src="resources/images/pilt2.png" alt="pilt" >',
            "uudis":"Artikli id on 3, json objektis 2. uudis, artikli sisu.",
            "lisatud":"13.04.2014 19:32",
            "teema":"It",
            "vaatamisi":"3"
        },
         {
             "pealkiri":"Kolmas",
             "id":"4",
            "kirjeldus":"luhikirjeldus id: 4",
            "autor":"Careelika Liisi Kuik",
            "pilt":'<img src="resources/images/pilt3.png" alt="pilt" >',

            "uudis":"Artikli id on 4, json objektis 3. uudis, artikli sisu.",
            "lisatud":"13.04.2014 19:33",
            "teema":"Kultuur",
            "vaatamisi":"4"
         },
       {
          "pealkiri":"Neljas",
          "id":"5",
            "kirjeldus":"luhikirjeldus id: 5",
            "autor":"Careelika Liisi Kuik",
            "pilt":'<img src="resources/images/pilt3.png" alt="pilt" >',

            "uudis":"Artikli id on 5, json objektis 4. uudis, artikli sisu.",
            "lisatud":"13.04.2014 19:34",
            "teema":"Majandus",
            "vaatamisi":"5"
      },
             {
                "pealkiri":"Viies",
                "id":"5",
                  "kirjeldus":"luhikirjeldus id: 5",
                  "autor":"Careelika Liisi Kuik",
                  "pilt":'<img src="resources/images/pilt3.png" alt="pilt" >',

                  "uudis":"Artikli id on 5, json objektis 4. uudis, artikli sisu.",
                  "lisatud":"13.04.2014 19:34",
                  "teema":"Majandus",
                  "vaatamisi":"5"
            }

]

var JSONComment=[
         {
            "id":"1",
            "artikkel":"2",
            "autor":"Careelika Liisi Kuik",
            "kommentaar":'see on kommentaar 2',
            "aeg":"23.04.2014 19:31"
        },
        {
            "id":"2",
            "artikkel":"4",
            "autor":"Careelika Liisi Kuik",
            "kommentaar":'see on kommentaar 3',
            "aeg":"23.04.2014 19:31"
        },
         {
            "id":"3",
            "artikkel":"3",
            "autor":"Careelika Liisi Kuik",
            "kommentaar":'see on kommentaar 4',
            "aeg":"23.04.2014 19:31"
         },
       {
            "id":"4",
            "artikkel":"2",
            "autor":"Careelika Liisi Kuik",
            "kommentaar":'see on kommentaar 5',
            "aeg":"23.04.2014 19:31"
      }

]

  var JSONaside1= [
             {
                         "ArtikliPealkiri":"Viimane, id:4",
                         "ArtikliId":"4"},
                         {
                                     "ArtikliPealkiri":"Eelviimane , id:3",
                                     "ArtikliId":"3"},
                                     {
                                                 "ArtikliPealkiri":"Üle-eelviimane , id:2",
                                                 "ArtikliId":"2"}

             ];

             var JSONaside2= [
             {
                         "ArtikliPealkiri":"Loetud, id:2",
                         "ArtikliId":2},
              {
                          "ArtikliPealkiri":"Teine artikkel, id:3",
                          "ArtikliId":3},
             {
                         "ArtikliPealkiri":"Kolmas artikkel, id:4",
                         "ArtikliId":4}

             ];

             var JSONaside3= [
             {
                         "ArtikliPealkiri":"Kommenteeritud, id:2",
                         "ArtikliId":2},
              {
                          "ArtikliPealkiri":"Teine, id:3",
                          "ArtikliId":3},
             {
                         "ArtikliPealkiri":"Kolmas , id:4",
                         "ArtikliId":4}

             ];


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
    addAside()



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
            p.text(json.kirjeldus);
            p2.text(json.lisatud);

            //uhendame osad uksteisega
            header.append(h1);
            article.append(header);
            article.append(img);
            article.append(p);
            footer.append(p2,loeKom,teeKom);
            article.append(footer);
            article.addClass("article");
            h1.addClass("getArticle");
            loeKom.addClass("getComments");
            teeKom.addClass("addComment");

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




               function removeAllButAside(){
                       $('#sisu').contents().remove();
               };




                //sarnane buildArticle fun-le, aga ehitab artikli ulest taies suuruses, koos koikide osadega
               function showArticle(json) {   /*argument responseText*/
                    console.log("kuvab Artikli");

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
            //var p3=$("<p></p>");
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
            //p3.text(json.kirjeldus);

            //uhendame osad uksteisega
            header.append(h1);
            article.append(header);
            article.append(img);
            //article.append(p3);
            article.append(p);
            footer.append(p2,loeKom,teeKom);
            article.append(footer);
            article.addClass("article");
            //h1.removeClass("getArticle");
            h1.addClass("getArticle");
            loeKom.addClass("getComments");
            teeKom.addClass("addComment");


                       var vp=$("<section id = 'vasakParem'></section>");
                        vp.append(article);
                        removeAllButAside()
                       $("#sisu").append(vp);
                       addAside()


                }


      /* kui klikitakse "tagasi" (artikli) peal
      tagasi.click( function(){
      console.log("eemaldab sisu");
       $(this).closest('article').remove();
      }); */



           function addAside(){

             console.log("aside");



                          /*                 // tahab andmebaasilt vastuseks vastava id-ga artiklit, json objektina
                                           $.ajax('/artiklid', {
                                               type: "GET",
                                               dataType: "Json",
                                               data: {id:id},
                                               success: showArticle

                                           });
                                                     */

             var aside1 = $('<div id = "aside1"></div>');
             var aside2 = $('<div id = "aside2"></div>');
             var aside3 = $('<div id = "aside3"></div>');
             var aside=$('<aside id = "side"></aside>');

              $(aside).addClass(".side")
              $(aside).append(aside1,aside2,aside3);
              $('#sisu').append(aside);


              // viimasedUudised
              var aside1H4=$("<h4></h4>").text("Viimased uudised");
                buildAsideElements(JSONaside1,aside1H4,"#aside1")

              //Enim loetud
                var aside2H4=$("<h4></h4>").text("Enim loetud");
                 buildAsideElements(JSONaside2,aside2H4,"#aside2")

              //Enim kommenteeritud
                var aside3H4=$("<h4></h4>").text("Enim kommenteeritud");
                 buildAsideElements(JSONaside3,aside3H4,"#aside3")

           };

                  function buildAsideElements(JSON,nr,a) {   /*argument responseText*/
                       console.log("loob elemendi asidesse");
                       $(a).append(nr);
                            for( var i=0; i<JSON.length;i++){
                            var json = JSON[i];
                            var nr=$('<h2 class="aside1H2"></h2>');

                            nr.text(json.ArtikliPealkiri);
                            nr.data("id",json.ArtikliId);
                            nr.addClass("getArticle");
                            $(a).append(nr);
                            console.log(i);
                            }

                  };



               //kui vajutame artikli pealkirja peal (aside alal)
               $(document).on("click", ".getArticle",function(){
              // $(".getArticle").on('click',function(){
                   console.log("valiti aside pealkiri");
                    var id = $(this).data("id");
                    console.log(id);
              /*                 // tahab andmebaasilt vastuseks vastava id-ga artiklit, json objektina
                               $.ajax('/artiklid', {
                                   type: "GET",
                                   dataType: "Json",
                                   data: {id:id},
                                   success: showArticle

                               });
                                         */

                    console.log("-> paring: GET, '/artiklid', id: "+id);

                    //lahendus ilma andmebaasita
                    var data= JSONArticle[id]
                    showArticle(data)

               });


            //kui vajutame "loe kommentaare"
               $(document).on("click", ".getComments",function(){
                   console.log("valiti getComments");
                    var id = $(this).data("id");
                    console.log(id);
              /*                 // tahab andmebaasilt vastuseks vastava id-ga artikli kommentaare, json objektina
                               $.ajax('/kommentaar', {
                                   type: "GET",
                                   dataType: "Json",
                                   data: {id:id},
                                   success: showComments


                               });
                                         */

                    console.log("-> paring: GET, '/kommentaar', id: "+id);

                    //lahendus ilma andmebaasita
                    var data= JSONComment
                    showComments(data)

               });

              function showComments(jsonA) { //  argument responseText

                    console.log("kuvab kommentaarid");
                         removeAllButAside();

                        for( var i=0; i<jsonA.length;i++){
                        var json = jsonA[i];


                                            console.log(json.kommentaar);
                                            buildComment(json);
                        if(i ==0){
                          addAside();
                        }
                        }



               };


               function buildComment(json) {   /*argument responseText*/
                    console.log("loob kommentaari");

                    //console.log(json.pealkiri);

                                //loome tagid
                                var div =$('<div></div>');
                                var footer =$('<footer></footer>');
                                var autor=$("<p></p>");
                                var aeg=$("<p></p>");
                                var id=$("<p></p>");
                                var kommentaar=$("<p></p>");
                               // loeKom.addClass("kommentaar");

                                //anname vaartuse tagidele

                                id.text("Kommentaari id: "+json.id);
                                autor.text("Autor: "+json.autor);
                                aeg.text(json.aeg);
                                kommentaar.text(json.kommentaar);

                                //uhendame osad uksteisega
                               // div.append(id);
                                div.append(kommentaar);
                                footer.append(autor,aeg);
                                div.append(footer);
                                console.log(json.kommentaar);
                                div.addClass("comment");
                               div.addClass("vasakParem");

                                //TODO
                                /*kui ajaxi viitest on naha, et artikkel on avatud, siis kleepida lehe otsa kommentaarid, mitte uuele lehele. */
                                $("#sisu").append(div);

               };

            //kui vajutame "kommenteeri"
               $(document).on("click", ".addComment",function(){
                   console.log("valiti addComment");
                    var id = $(this).data("id");
                    console.log(id);
                    addComment(id)

               });


      function addComment(articleId) { //  argument responseText
            alert("Kommenteerimiseks tuleb sisse logida!");
            console.log("lisab kommentaari");
                // showArticle(articleId);
                 var form =$('<div></div>');

            form.append('<h2>Form</h2>');
            form.append('<form action="" method="post">');
            form.append('<textarea wrap="physical" cols="20" name="quote" rows="5">Kommentaar!</textarea><br/>');
            form.append('Anonüümne: <input type="checkbox" name="anonymous" value="anonymous"/><br/>');
            form.append('<p><input type="submit" /></p>');
            form.append('</form>');
            form.append('<h2>JSON</h2>');
            form.append('<pre id="result">');
            form.append('</pre>');






             $("#sisu").append(form);




       };

       $.fn.serializeObject = function()
       {
       console.log("serialize");
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
           $('form').submit(function() {
           console.log("lisab");
               $('#result').text(JSON.stringify($('form').serializeObject()));
               return false;
           });
       });

});
