$(document).ready(function(){

//lisame pealehele div-id
    var vasak = $("<div id='vasak'></div>");
    var parem = $("<div id='parem'></div>");
    $("#sisu").append(vasak,parem);
    var onSisu=true;
    var idforform=0;
    var dict  = {};
    $(document).data('form-enabled', dict);
    var dict = $(document).data('form-enabled');

    $.ajax('/pealeht', {
        type: "GET",
        dataType: "Json",
        data: {},
        success: addMain,
        error: function(req, status) { alert("failed 21: " + status); }
    });

    function addMainByDefault() {
        $.ajax('/pealeht', {
            type: "GET",
            dataType: "Json",
            data: {},
            success: addMain,
            error: function(req, status) { alert("failed 32: " + status); }
        });
    }

    var i=0;
    var isTopic=false;
    function addMain(JSONArticle) {
        //uhekaupa ehitame ja lisame artiklid
        for (i = 0; i < JSONArticle.length; i++) {
            var json = JSONArticle[i];
            buildArticle(json);
        }
        if (isTopic===false) {
        }else{
            if(JSONArticle.length===0){
                alert("Selle teema kohta hetkel uudiseid pole.");
                addMainByDefault();
            }
        }
        addAside();
    };

    //ehitab artikli eelvaate valmis ette antud json kujul uksiku artikli andmetest
    //terve artikli ehitab fun buildFullArticle
    function buildArticle(json){
        //loome tagid
        var article =$('<article></article>');
        var h1=$("<h1></h1>");
        var header =$('<header></header>');
        var footer =$('<footer></footer>');
        var p=$("<p></p>");
        var p2=$("<p></p>");
        var loeKom=$("<a></a>").text("Loe kommentaare");
        var teeKom=$("<a></a>").text("Kommenteeri");
        article.data("id",json.id);
        var img=json.pilt;
        loeKom.addClass("loeKom");
        teeKom.addClass("teeKom");
        loeKom.data("id",json.id);
        teeKom.data("id",json.id);
        $(h1).attr('id',json.id);

        //anname vaartuse tagidele
        h1.text(json.pealkiri+"("+json.vaatamisi+")");
        h1.data("id",json.id);
        footer.text("Autor: "+json.autor);
        p.text(json.kirjeldus);
        p.addClass(json.id.toString()+"k");
        p2.text(json.lisatud);

        //uhendame osad uksteisega
        header.append(h1);
        article.append(header);
        article.append("</br>");
        article.append(img);
        article.append("</br>");
        article.append(p);
        footer.append(p2,loeKom,teeKom);
        article.append(footer);
        article.addClass("article");
        h1.addClass("getArticle");
        loeKom.addClass("getComments");
        teeKom.addClass("addComment");

        if (i%2 ==0){
            vasak.append(article);
        }else{
            parem.append(article);
        }
    };

    function removeAllButAside(){
        $('#sisu').contents().remove();
        onSisu=false;
    };

    //sarnane buildArticle fun-le, aga ehitab artikli ulest taies suuruses, koos koikide osadega
    function buildFullArticle(json){
        var dict = $(document).data('form-enabled');
        dict[json.id] = false;
        var article =$('<article></article>');
        var h1=$("<h1></h1>");
        var header =$('<header></header>');
        var footer =$('<footer></footer>');
        var p=$("<p></p>");
        var p2=$("<p></p>");
        var p4=$("<p></p>");
        var loeKom=$("<a></a>").text("Loe kommentaare");
        var teeKom=$("<a></a>").text("Kommenteeri");
        var img=json.pilt;
        loeKom.addClass("loeKom");
        teeKom.addClass("teeKom");

        //anname vaartuse tagidele
        h1.text(json.pealkiri+"("+json.vaatamisi+")");
        h1.text(json.pealkiri);
        $(h1).attr('id',json.id);
        h1.data("id",json.id);
        footer.text("Autor: "+json.autor);
        p.text(json.uudis);
        p2.text(json.lisatud);
        p4.text("Tagasi");

        //uhendame osad uksteisega
        header.append(h1);
        article.append(header);
        article.append(img);
        article.append(p);
        footer.append(p2,loeKom,teeKom, p4);
        article.append(footer);
        article.addClass("article");
        h1.addClass("getArticle");
        loeKom.addClass("getComments");
        loeKom.data("id",json.id);
        teeKom.addClass("addComment");
        teeKom.data("id",json.id);
        p4.addClass("back");
        article.data('id', json.id);

        var vp=$("<section id = 'vasakParem'></section>");
        vp.append(article);
        removeAllButAside()
        $("#sisu").append(vp);
        addAside()
    }

    //kui klikitakse "tagasi" (artikli) peal
    $(document).on("click", ".back",function(){
        window.history.back();
    });

    function addAside(){
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
            success: asidefun1,
            error: function(req, status) { alert("failed: " + status); }
        });

        function asidefun1(data)
        {
            buildAsideElements(data,aside1H4,"#aside1")
        }

        //Enim loetud
        var aside2H4=$("<h4></h4>").text("Enim loetud");
        // tahab andmebaasilt vastuseks vastava id-ga artiklit, json objektina
        $.ajax('/viewed', {
            type: "GET",
            dataType: "Json",
            success: asidefun2,
            error: function(req, status) { alert("failed: " + status); }
        });

        function asidefun2(data)
        {
            buildAsideElements(data,aside2H4,"#aside2")
        }

        //Enim kommenteeritud
        var aside3H4=$("<h4></h4>").text("Enim kommenteeritud");
        // tahab andmebaasilt vastuseks vastava id-ga artiklit, json objektina
        $.ajax('/commented', {
            type: "GET",
            dataType: "Json",
            success: asidefun3,
            error: function(req, status) { alert("failed: " + status); }
        });

        function asidefun3(data)
        {
            buildAsideElements(data,aside3H4,"#aside3")
        }
    };

    function buildAsideElements(JSON,nr,a) {
        $(a).append(nr);
        for( var i=0; i<JSON.length;i++){
            var json = JSON[i];
            var nr=$('<h2 ></h2>');
            nr.text(json.pealkiri);
            nr.data("id",json.id);
            nr.addClass("getArticle");
            nr.addClass(nr);
            $(nr).attr('id',json.id);
            $(a).append(nr);
        }
    };

    function askArticle(id){
        window.history.pushState("", id, "#artikkel"+id);
        // tahab andmebaasilt vastuseks vastava id-ga artiklit, json objektina
        $.ajax('/artiklid', {
            type: "GET",
            dataType: "Json",
            data: {id:id},
            success:  buildFullArticle,
            error: function(req, status) { alert("failed: " + status); }
        });
    }

    //kui vajutame artikli pealkirja peal (aside alal)
    $(document).on("click", ".getArticle",function(){
        var id = $(this).data("id");
        askArticle(id, false);
    });

    //kui vajutame "loe kommentaare"
    $(document).on("click", ".getComments",function(){
        var id = $(this).data("id");

        $.ajax('/kommentaar', {
            type: "GET",
            dataType: "Json",
            data: {id:id},
            success: showComments,
            error: function(req, status) { alert("failed 311 : " + status); }
        });
    });

    function showComments(jsonA) {
        if(jsonA.length===0){
            alert("Selle uudise kohta hetkel kommentaare pole.");
        }else {
            window.history.pushState("", "Kommentaarid", 'kommentaarid');
            removeAllButAside();
            for( var i=0; i<jsonA.length;i++){
                var json = jsonA[i];
                buildComment(json);
            }
            addAside();
        }
    };

    function buildComment(json) {
        //loome tagid
        var div =$('<div></div>');
        var footer =$('<footer></footer>');
        var autor=$("<p></p>");
        var aeg=$("<p></p>");
        var id=$("<p></p>");
        var kommentaar=$("<p></p>");

        //anname vaartuse tagidele
        id.text("Kommentaari id: "+json.id);
        autor.text("Autor: "+json.autor);
        aeg.text(json.aeg);
        kommentaar.text(json.kommentaar);

        //uhendame osad uksteisega
        div.append(kommentaar);
        footer.append(autor,aeg);
        div.append(footer);
        div.addClass("comment");
        div.addClass("vasakParem");
        $("#sisu").append(div);
    };

    //kui vajutame "kommenteeri"
    $(document).on("click", ".teeKom",function() {
        var id = $(this).data("id");
        var el = $(this);
        idforform=id;
        var dict = $(document).data('form-enabled');
        if(dict[id] === true){
            var str= ".comForm"+id.toString();
            $(str).toggle();
        }else{
            addCommentForm(id,el);
        }
    });

    function addCommentForm(articleId,el){
        var cl = "comForm"+articleId.toString();
        dict[articleId] = true;
        $(document).data('addComForm',articleId);
        var sect = document.createElement("section");
        var f = document.createElement("form");
        f.setAttribute('class',cl);
        f.setAttribute('method',"post");
        f.setAttribute('action',"/kommentaar");
        f.setAttribute('enctype',"multipart/form-data");
        f.appendChild(document.createElement("br"));
        //autor
        f.appendChild(document.createElement("br"));
        f.appendChild(document.createTextNode("Autor: "+$(document).data('loggedName')));
        //kommentaari sisu
        f.appendChild(document.createElement("br"));
        f.appendChild(document.createTextNode("Kommentaar:"));
        f.appendChild(document.createElement("br"));
        var aDiv = document.createElement("div");
        aDiv.setAttribute('class',".kommentaar");
        var as = document.createElement("textarea");
        as.setAttribute('id',articleId);
        as.rows="10";
        as.cols="20";
        as.name="sisu";
        aDiv.appendChild(as);
        f.appendChild(aDiv);
        f.appendChild(document.createElement("br"));
        var s = document.createElement("input"); //input element, Submit button
        s.setAttribute('type',"submit");
        s.setAttribute('value',"Submit");
        f.appendChild(s);
        sect.appendChild(f);
        $('#sisu').append(sect);
        el.closest('article').append(sect);
    }

    // Lehe laadimisel oige artikli juurde minemine.
    if(window.location.hash)
    {
        var jupp = window.location.hash.substring(1);
        if(jupp.substring(0,8) == "artikkel")
        {
            var id = parseInt(jupp.substring(8)); // koik parast sona "artikkel"
        }
    }

    document.body.setAttribute("onhashchange", "trellidMuutuvad()");
    //kommentaari lisamine
    /*   $("[class^='.comForm']").submit(function(){
     var Kommentaar={};
     Kommentaar.kommentaar=$('#komSisu').val();
     Kommentaar.artikkel=$(this).data("id");
     if(document.getElementById('anonuumne').checked){
     Kommentaar.nimi="Anonüümne";
     }else{
     Kommentaar.nimi="";
     }

     $.ajax("/kommentaarid",{
     type:"POST",
     dataType:'json',
     data: JSON.stringify(Kommentaar),
     contentType: "application/json; charset=utf-8",
     success: function(Kommentaar){
     },
     error:function(req, text) {
     }     });
     });
     */
    $(document).on("click", ".lisaArtikkel",function(){
        removeAllButAside();
    });

    function trellidMuutuvad()
    {
        if('' === window.location.hash)
            window.location.reload();
    }

    //pealehe tab
    $(document).on("click", "[class^='category']",function(){
        var name= $(this).attr('name');
        isTopic=true;
        if (onSisu ===false){
            removeAllButAside();
            addAside()
            $("#sisu").append(vasak,parem);
            onSisu=true;
        }else{
            $('#vasak').contents().remove();
            $('#parem').contents().remove();
        }

        $.ajax('/pealeht', {
            type: "GET",
            dataType: "Json",
            data: {teema:name},
            success: addMain,
            error: function(req, status) { alert("failed: " + "teema oli "+name +" status: "+status); }
        });
    });
});