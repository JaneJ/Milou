var xmlHttp=createXmlHttpRequestObject();
function createXmlHttpRequestObject(){
	alert("createXmlHttpRequestObject");
	var xmlHttp;
	
	if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}else{

		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

	
	}
		return xmlHttp;
	
}

function process(){
	alert("process()");
	if(xmlHttp){
		try{
			xmlHttp.open("GET","ajaxTest.txt", true); /*ei alusta serveriuhendust, konfib uhendust, kuidas ja mida saadetakse*/
			xmlHttp.onreadystatechange = handleServerResponse();
			xmlHttp.send(null);
		
		}catch(e){
			alert(e.toString());
		}
	}
}

function handleServerResponse(){
	alert("handleServerResponse()");
	var theD = document.getElementById('theD');
	if(xmlHttp.readyState==1){
		theD.innerHTML += "Status 1: server connection established <br/>";
	} else if(xmlHttp.readyState==2){
		theD.innerHTML += "Status 2: request received <br/>";
	} else if(xmlHttp.readyState==3){
		theD.innerHTML += "Status 3: processing request <br/>";
	} else if(xmlHttp.readyState==4){
		
		if(xmlHttp.status==200){
			try{	
				text = xmlHttp.responseText; /*peaks txt faili sisu olema*/
				theD.innerHTML += "Status 4: request is finished, response is ready <br/>";
				theD.innerHTML += text;
			}catch(e){
			alert(e.toString());
		
		}
		}else{
			alert(xmlHttp.statusText);
		}
	}

}
