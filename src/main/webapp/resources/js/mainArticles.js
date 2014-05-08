/*see js vastutab pealehe parem ja vasak div artiklite laadimise eest
 */

$(document).ready(function(){
    console.log("mainArticles.js");


//lisame pealehele div-id
    var vasak = $("<div id='vasak'></div>");
    var parem = $("<div id='parem'></div>");
    $("#sisu").append(vasak,parem);


    $.ajax('/pealeht', {
        type: "GET",
        dataType: "Json",
        data: {},
        success: addMain,
        error: function(req, status) { alert("failed: " + status); }

    });


    var i=0;
    function addMain(JSONArticle){
        //  console.log("lisamise tsukkel- addMain");
        // console.log(JSONArticle);
        //uhekaupa ehitame ja lisame artiklid
        for( i=0; i<JSONArticle.length;i++){
            var json = JSONArticle[i];
            buildArticle(json);

        }

        //console.log("koik artiklid tehtud");
        addAside()
    };


    //ehitab artikli eelvaate valmis ette antud json kujul uksiku artikli andmetest
    //terve artikli ehitab fun showArticle

    function buildArticle(json){
        // console.log("buildArticle");

        //loome tagid
        var article =$('<article></article>');
       
        var h1=$("<h1></h1>");
        var header =$('<header></header>');
        var footer =$('<footer></footer>');
        var p=$("<p></p>");
        var p2=$("<p></p>");
        // var p4=$("<p></p>");
        var loeKom=$("<a></a>").text("Loe kommentaare");
        var teeKom=$("<a></a>").text("Kommenteeri");
        // var pilt= <img src="resources/images/pilt1.png" alt="pilt" >
        // var img=json.pilt;
        loeKom.addClass("loeKom");
        teeKom.addClass("teeKom");
        loeKom.data("id",json.id);
        teeKom.data("id",json.id);

        //anname vaartuse tagidele
        h1.text(json.pealkiri);
        h1.data("id",json.id);
        // console.log(json.pealkiri);
        footer.text("Autor: "+json.autor);
        p.text(json.kirjeldus);
        p2.text(json.lisatud);


        //uhendame osad uksteisega
        header.append(h1);
        article.append(header);
        //article.append(img);
        article.append(p);
        footer.append(p2,loeKom,teeKom);
        article.append(footer);
        article.addClass("article");
        h1.addClass("getArticle");
        //katse
        h1.id=json.id;
        loeKom.addClass("getComments");
        teeKom.addClass("addComment");


        if (i%2 ==0)

        {

            vasak.append(article);

        }

        else

        {

            parem.append(article);

        }


        isPaused = false;
        console.log("valmis artikkel ");
    };




    function removeAllButAside(){
        $('#sisu').contents().remove();
    };




    //sarnane buildArticle fun-le, aga ehitab artikli ulest taies suuruses, koos koikide osadega
    function showArticle(json) {   /*argument responseText*/
        //    console.log("kuvab Artikli");

        //  console.log(json);
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
        var p4=$("<p></p>");
        var loeKom=$("<a></a>").text("Loe kommentaare");
        var teeKom=$("<a></a>").text("Kommenteeri");
        var img=json.pilt;
        loeKom.addClass("loeKom");
        teeKom.addClass("teeKom");

        //anname vaartuse tagidele
        h1.text(json.pealkiri);
        h1.data("id",json.id);
        //   console.log(json.pealkiri);
        footer.text("Autor: "+json.autor);
        p.text(json.uudis);
        p2.text(json.lisatud);
        //p3.text(json.kirjeldus);
        p4.text("Tagasi");

        //uhendame osad uksteisega
        header.append(h1);
        article.append(header);
        article.append(img);
        //article.append(p3);
        article.append(p);
        footer.append(p2,loeKom,teeKom, p4);
        article.append(footer);
        article.addClass("article");
        //h1.removeClass("getArticle");
        h1.addClass("getArticle");
        loeKom.addClass("getComments");
        loeKom.data("id",json.id);
        teeKom.addClass("addComment");
        teeKom.data("id",json.id);
        p4.addClass("back");


        var vp=$("<section id = 'vasakParem'></section>");
        vp.append(article);
        removeAllButAside()
        $("#sisu").append(vp);
        addAside()
        isPaused=false;
        console.log("artikkel lisatud, isPaused=false, rida 176");
    }


    //kui klikitakse "tagasi" (artikli) peal
    $(document).on("click", ".back",function(){
        // console.log("eemaldab sisu");
        window.history.back();
        //history.go(-1);
        //window.location.reload();
        //$(this).closest('article').remove();
    });



    function addAside(){

        //  console.log("aside");





        var aside1 = $('<div id = "aside1"></div>');
        var aside2 = $('<div id = "aside2"></div>');
        var aside3 = $('<div id = "aside3"></div>');
        var aside=$('<aside id = "side"></aside>');

        $(aside).addClass(".side")
        $(aside).append(aside1,aside2,aside3);
        $('#sisu').append(aside);


        // viimasedUudised
        var aside1H4=$("<h4></h4>").text("Viimased uudised");

        // tahab andmebaasilt vastuseks vastava id-ga artiklit, json objektina
        $.ajax('/newest', {
            type: "GET",
            dataType: "Json",
            // data: {id:id},
            success: asidefun1,
            error: function(req, status) { alert("failed: " + status); }

        });


        function asidefun1(data)
        {
            //   console.log("data"+data);
            //   console.log("esimene aside" + data[1].id);
            buildAsideElements(data,aside1H4,"#aside1")
        }


        //Enim loetud
        var aside2H4=$("<h4></h4>").text("Enim loetud");

        // tahab andmebaasilt vastuseks vastava id-ga artiklit, json objektina
        $.ajax('/viewed', {
            type: "GET",
            dataType: "Json",
            // data: {id:id},
            success: asidefun2,
            error: function(req, status) { alert("failed: " + status); }

        });


        function asidefun2(data)
        {
            //  console.log("data"+data);
            buildAsideElements(data,aside2H4,"#aside2")
        }



        //Enim kommenteeritud
        var aside3H4=$("<h4></h4>").text("Enim kommenteeritud");

        // tahab andmebaasilt vastuseks vastava id-ga artiklit, json objektina
        $.ajax('/commented', {
            type: "GET",
            dataType: "Json",
            // data: {id:id},
            success: asidefun3,
            error: function(req, status) { alert("failed: " + status); }

        });


        function asidefun3(data)
        {
            buildAsideElements(data,aside3H4,"#aside3")
        }
    };

    function buildAsideElements(JSON,nr,a) {   /*argument responseText*/
        // console.log("loob elemendi asidesse");
        $(a).append(nr);
        for( var i=0; i<JSON.length;i++){
            var json = JSON[i];
            var nr=$('<h2 ></h2>');

            nr.text(json.pealkiri);
            nr.data("id",json.id);
            nr.addClass("getArticle");
            nr.addClass(nr);
            $(a).append(nr);
            //   console.log(i);
        }

    };

    function askArticle(id, bool){

        window.history.pushState("", id, "#artikkel"+id);


        // tahab andmebaasilt vastuseks vastava id-ga artiklit, json objektina
        $.ajax('/artiklid', {
            type: "GET",
            dataType: "Json",
            data: {id:id},
            success: showArticle,
            error: function(req, status) { alert("failed: " + status); }

        });


        //   console.log("-> paring: GET, '/artiklid', id: "+id);
        /*  if(bool==true){
         addForm(id);
         }
         */
        /*     //lahendus ilma andmebaasita
         var data= JSONArticle[id];
         showArticle(data);

         */
    }

    //kui vajutame artikli pealkirja peal (aside alal)
    $(document).on("click", ".getArticle",function(){

        // console.log("valiti aside pealkiri");
        var id = $(this).data("id");
        askArticle(id, false);

    });


    //kui vajutame "loe kommentaare"
    $(document).on("click", ".getComments",function(){
        // console.log("valiti getComments");
        var id = $(this).data("id");
        // console.log("soovib selle artikli kommentaare: "+id);
        // tahab andmebaasilt vastuseks vastava id-ga artikli kommentaare, json objektina
        $.ajax('/kommentaar', {
            type: "GET",
            dataType: "Json",
            data: {id:id},
            success: showComments,
            error: function(req, status) { alert("failed: " + status); }


        });


        console.log("-> paring: GET, '/kommentaar', id: "+id);

        /*     //lahendus ilma andmebaasita
         var data= JSONComment
         showComments(data)  */

    });

    function showComments(jsonA) { //  argument responseText

        //  console.log("kuvab kommentaarid");
        window.history.pushState("", "Kommentaarid", 'kommentaarid');
        removeAllButAside();

        for( var i=0; i<jsonA.length;i++){
            var json = jsonA[i];


            console.log(json.kommentaar);
            buildComment(json);
            /*     if(json.artikkel ==3){
             console.log(json.artikkel);
             buildComment(json);
             }else{
             console.log("pole oige"+ json.articleId);
             }*/
        }
        addAside();
        var p4=$("<p></p>");
        p4.text("Tagasi");
        p4.addClass("back");
        $("#sisu").append(p4);



    };


    function buildComment(json) {   /*argument responseText*/
        //  console.log("loob kommentaari");

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
        //   console.log(json.kommentaar);
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

    function addForm(articleId){
        var form =$('<div></div>');

        console.log("joudis addArticleForm");



        // var section =$('<section id="vasakParem"></section>');
        var sect = document.createElement("section");
        var f = document.createElement("form");
        sect.setAttribute('id',"vasakParem");

        f.setAttribute('class',"artikkel");
        f.setAttribute('id',"lisaArtikkel");
        f.setAttribute('method',"post");
        f.setAttribute('action',"/artiklid");
        //f.setAttribute('action',"/artiklid");
        f.setAttribute('enctype',"multipart/form-data");

        var teemad = document.createElement("div");
        teemad.setAttribute('class',"teemad");
        teemad.setAttribute('id',"teema");
        teemad.setAttribute('text',"Teemad");
        // teemad.set

        f.appendChild(teemad);

        var s = document.createElement("input"); //input element, Submit button
        var valArray = ["IT", "Kultuur","Sport", "Majandus","Koomiks","Krimi"];
        f.appendChild(document.createTextNode("Teema"));
        f.appendChild(document.createElement("br"));
        var tDiv = document.createElement("div");
        tDiv.setAttribute("class","teemad");
        tDiv.setAttribute("id","teemad");

        for (var i = 0; i < valArray.length; i++){
            var a = document.createElement("input");
            a.setAttribute('type',"radio");
            a.setAttribute('name',"teema");


            a.setAttribute('value',valArray[i]);



            tDiv.appendChild(a);
            tDiv.appendChild(document.createTextNode(valArray[i]))
        }
        f.appendChild(tDiv);
        f.appendChild(document.createElement("br"));
        f.appendChild(document.createTextNode("Pealkiri"));
        f.appendChild(document.createElement("br"));
        var a = document.createElement("textarea");
        a.setAttribute('type',"textarea");
        f.appendChild(a);

        f.appendChild(document.createElement("br"));
        f.appendChild(document.createTextNode("Lühikirjeldus"));
        f.appendChild(document.createElement("br"));
        var a = document.createElement("textarea");
        a.setAttribute('type',"textarea");
        a.rows="5";
        f.appendChild(a);

        f.appendChild(document.createElement("br"));
        f.appendChild(document.createTextNode("Artikli sisu"));
        f.appendChild(document.createElement("br"));
        var a = document.createElement("textarea");
        a.setAttribute('type',"textarea");
        a.rows="5";
        f.appendChild(a);

        f.appendChild(document.createElement("br"));
        f.appendChild(document.createTextNode("Pildi url:"));
        var a = document.createElement("input");
        a.setAttribute('type',"textarea");
        f.appendChild(a);

        f.appendChild(document.createElement("br"));
        f.appendChild(document.createTextNode("Autor"));
        var a = document.createElement("input");
        a.setAttribute('type',"textarea");
        f.appendChild(a);

        f.appendChild(document.createElement("br"));
        s.setAttribute('type',"submit");
        s.setAttribute('value',"Submit");


        f.appendChild(s);
        sect.appendChild(f);



//and some more input elements here
//and dont forget to add a submit button

        //document.getElementsByTagName('body')[0].appendChild(f);
        document.getElementById('sisu').appendChild(sect);
        // $('#sisu').add(sect);
        console.log("form peaks olemas olema");


    /*
        waitForIt();

        function waitForIt(){
            if (isPaused) {
                setTimeout(function(){waitForIt()},200);
                console.log("ootab");
            } else {
                $("#sisu").append(form);
                console.log("lisab");
            };
        }
        */


    }
    var isPaused = false;
    console.log("paused vale");
    function addComment(articleId) { //  argument responseText
        //alert("Kommenteerimiseks tuleb sisse logida! "+articleId);
        console.log("lisab kommentaari");
        removeAllButAside();
        isPaused = true;
        askArticle(articleId, true);
        console.log("enne");
        addForm(articleId);
        console.log("parast");


    };



    // Lehe laadimisel oige artikli juurde minemine.
    if(window.location.hash)
    {
        var jupp = window.location.hash.substring(1);
        if(jupp.substring(0,8) == "artikkel")
        {
            var id = parseInt(jupp.substring(8)); // koik parast sona "artikkel"
            //   var data= JSONArticle[id];
            // showArticle(data);
        }
    }

    document.body.setAttribute("onhashchange", "trellidMuutuvad()");


    //kommentaari lisamine
    $('addComment').submit(function(){
        console.log('Comment to DB');
        var Kommentaar={};
        Kommentaar.kommentaar=$('#kommentaar').val();
        Kommentaar.artikkel=$(this).data("id");


        if(document.getElementById('anonuumne').checked){
            Kommentaar.nimi="Anonüümne";
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
                alert('Kommentaar edukalt lisatud. ');
                //document.location.reload(true);
            },
            error:function(req, text) {
                console.log(req);
                console.log(text);
            }

        });

    });

    $(document).on("click", ".lisaArtikkel",function(){

        //  console.log("Admin tahab artiklit lisada");
        removeAllButAside();
        /*        #include('templates/footerTemplate.html')           */


    });

    //addarticle osa juurde, et poleks enam html-ile viimiset, vaid js lahendakse selle


    $(document).ready(function(){
        var text_max=80;
        $('#formMargid').html(text_max + ' märke alles.' );

        $('#formArtikliPealkiri').keyup(function(){
            var pealkiri_len=$('#formArtikliPealkiri').val().length;
            var pealkiri_alles=text_max-pealkiri_len;
            $('#formMargid').html(pealkiri_alles+ ' märke alles.');
        });
    });


    var text_max=300;
    $('#formMargidLuhi').html(text_max + ' märke alles.' );

    $('#lyhikirjeldus2').keyup(function(){
        var pealkiri_len=$('#lyhikirjeldus2').val().length;
        var pealkiri_alles=text_max-pealkiri_len;
        $('#formMargidLuhi').html(pealkiri_alles+ ' märke alles.');
    });



    console.log("tere");

    $('#lisaArtikkel').submit(function() {
        console.log('Data to DB');

        var Artikkel = {};


        Artikkel.autor=$("#autor").val();
        Artikkel.pealkiri=$("#formArtikliPealkiri").val();
        Artikkel.kirjeldus=$("#lyhikirjeldus2").val();
        Artikkel.uudis=$("#artiklisisu").val();
        Artikkel.teema = $('input:radio[name=teema]:checked').val();
        Artikkel.pilt=$("#pilt").val();
        //console.log(Artikkel.autor+ Artikkel.pealkiri+ Artikkel.kirjeldus);

        if ( $("#autor").val()==""&$("#formArtikliPealkiri").val()==""&$("#artiklisisu").val()==""&$('input:radio[name=teema]:checked').val()==""&$("#lyhikirjeldus2").val()=="") {
            alert("Kõik vajalikud väljad pole täidetud!");
        }else {

            console.log(Artikkel);
            $.ajax("/artiklid",{
                type:"POST",
                //url:"ArtikkelData/lisaArtikkel",
                dataType:'json',
                data: JSON.stringify(Artikkel),
                contentType: "application/json; charset=utf-8",

                success: function(Artikkel){
                    console.log("success");
                    alert('Artikkel edukalt üles laetud!');
                    document.location.reload(true);
                },
                error:function(req, text) {
                    console.log(req);
                    console.log(text);
                }

            });

        }
        return false;
    });

    function addArticleForm(){
        console.log("joudis addArticleForm");



        // var section =$('<section id="vasakParem"></section>');
        var sect = document.createElement("section");
        var f = document.createElement("form");
        sect.setAttribute('id',"vasakParem");

        f.setAttribute('class',"artikkel");
        f.setAttribute('id',"lisaArtikkel");
        f.setAttribute('method',"post");
        f.setAttribute('action',"/artiklid");
        //f.setAttribute('action',"/artiklid");
        f.setAttribute('enctype',"multipart/form-data");

        var teemad = document.createElement("div");
        teemad.setAttribute('class',"teemad");
        teemad.setAttribute('id',"teema");
        teemad.setAttribute('text',"Teemad");
        // teemad.set

        f.appendChild(teemad);

        var s = document.createElement("input"); //input element, Submit button
        var valArray = ["IT", "Kultuur","Sport", "Majandus","Koomiks","Krimi"];
        f.appendChild(document.createTextNode("Teema"));
        f.appendChild(document.createElement("br"));
        var tDiv = document.createElement("div");
        tDiv.setAttribute("class","teemad");
        tDiv.setAttribute("id","teemad");

        for (var i = 0; i < valArray.length; i++){
            var a = document.createElement("input");
            a.setAttribute('type',"radio");
            a.setAttribute('name',"teema");


            a.setAttribute('value',valArray[i]);



            tDiv.appendChild(a);
            tDiv.appendChild(document.createTextNode(valArray[i]))
        }
        f.appendChild(tDiv);
        f.appendChild(document.createElement("br"));
        f.appendChild(document.createTextNode("Pealkiri"));
        f.appendChild(document.createElement("br"));
        var a = document.createElement("textarea");
        a.setAttribute('type',"textarea");
        f.appendChild(a);

        f.appendChild(document.createElement("br"));
        f.appendChild(document.createTextNode("Lühikirjeldus"));
        f.appendChild(document.createElement("br"));
        var a = document.createElement("textarea");
        a.setAttribute('type',"textarea");
        a.rows="5";
        f.appendChild(a);

        f.appendChild(document.createElement("br"));
        f.appendChild(document.createTextNode("Artikli sisu"));
        f.appendChild(document.createElement("br"));
        var a = document.createElement("textarea");
        a.setAttribute('type',"textarea");
        a.rows="5";
        f.appendChild(a);

        f.appendChild(document.createElement("br"));
        f.appendChild(document.createTextNode("Pildi url:"));
        var a = document.createElement("input");
        a.setAttribute('type',"textarea");
        f.appendChild(a);

        f.appendChild(document.createElement("br"));
        f.appendChild(document.createTextNode("Autor"));
        var a = document.createElement("input");
        a.setAttribute('type',"textarea");
        f.appendChild(a);

        f.appendChild(document.createElement("br"));
        s.setAttribute('type',"submit");
        s.setAttribute('value',"Submit");


        f.appendChild(s);
        sect.appendChild(f);



//and some more input elements here
//and dont forget to add a submit button

        //document.getElementsByTagName('body')[0].appendChild(f);
        document.getElementById('sisu').appendChild(sect);
        // $('#sisu').add(sect);
        console.log("form peaks olemas olema");


    }




    //kui vajutame artikli pealkirja peal (aside alal)
    $(document).on("click", "#addNews",function(){

        console.log("klikiti -lisa uudis- fb logimise juurest");
        removeAllButAside();
        addArticleForm();

    });



    function trellidMuutuvad()
    {
        if('' === window.location.hash)
            window.location.reload();
    }

});