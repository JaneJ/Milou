Ext.util.JSON=new (function(){
var _1={}.hasOwnProperty?true:false;
var _2=function(n){
return n<10?"0"+n:n;
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
var _3=function(s){
if(/["\\\x00-\x1f]/.test(s)){
return "\""+s.replace(/([\x00-\x1f\\"])/g,function(a,b){
var c=m[b];
if(c){
return c;
}
c=b.charCodeAt();
return "\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);
})+"\"";
}
return "\""+s+"\"";
};
var _4=function(o){
var a=["["],b,i,l=o.length,v;
for(i=0;i<l;i+=1){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(v===null?"null":Ext.util.JSON.encode(v));
b=true;
}
}
a.push("]");
return a.join("");
};
var _5=function(o){
return "\""+o.getFullYear()+"-"+_2(o.getMonth()+1)+"-"+_2(o.getDate())+"T"+_2(o.getHours())+":"+_2(o.getMinutes())+":"+_2(o.getSeconds())+"\"";
};
this.encode=function(o){
if(typeof o=="undefined"||o===null){
return "null";
}else{
if(o instanceof Array){
return _4(o);
}else{
if(o instanceof Date){
return _5(o);
}else{
if(typeof o=="string"){
return _3(o);
}else{
if(typeof o=="number"){
return isFinite(o)?String(o):"null";
}else{
if(typeof o=="boolean"){
return String(o);
}else{
var a=["{"],b,i,v;
for(i in o){
if(!_1||o.hasOwnProperty(i)){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(this.encode(i),":",v===null?"null":this.encode(v));
b=true;
}
}
}
a.push("}");
return a.join("");
}
}
}
}
}
}
};
this.decode=function(_6){
return eval("("+_6+")");
};
})();
Ext.encode=Ext.util.JSON.encode;
Ext.decode=Ext.util.JSON.decode;
var rabbit={result:{},parameters:{},util:{bind:function(_7,_8){
return function(){
try{
return _7.apply(_8,arguments);
}
catch(e){
console.error(e);
return undefined;
}
};
},appendVersionQuery:function(_9){
return _9+"?v="+rabbit.parameters.codeVersion;
},isElementChildOfSelector:function(_a,_b){
return $(_a).parents(_b).length>0;
},userRole:null},logLevel:"debug"};
rabbit.events={buttonClicked:"buttonClicked",buttonMouseOver:"buttonMouseOver",buttonMouseOut:"buttonMouseOut",checkBoxClicked:"checkBoxClicked",click:"click",clickAreaClicked:"clickAreaClicked",clickAreaHovered:"clickAreaHovered",iphoneSwitchClicked:"iphoneSwitchClicked",loadPage:"loadPage",pageLoaded:"pageLoaded",propertyChange:"propertyChange",radioButtonClicked:"radioButtonClicked",svgBlur:"svgBlur",svgFocus:"svgFocus",tabButtonMouseOut:"tabButtonMouseOut",tabButtonMouseOver:"tabButtonMouseOver",showDatepicker:"showDatepicker",hideDatepicker:"hideDatepicker",changeDatepickerPage:"changeDatepickerPage",changeSlider:"changeSlider",subMenuShow:"subMenuShow",subMenuHide:"subMenuHide",sliderChangedEvent:"sliderChangedEvent",treeViewNodeClicked:"treeViewNodeClicked",treeViewScrolled:"treeViewScrolled",ratingResultChangedEvent:"ratingResultChangedEvent",ratingMouseOut:"ratingMouseOut",ratingMouseOver:"ratingMouseOver",toggleToggleSection:"toggleToggleSection",orientationChanged:"orientationChanged"};
rabbit.stencilEvents={pinchIn:"pinchIn",pinchOut:"pinchOut"};
rabbit.eventDispatcher=function _returnEventDispatcher(){
var _c={};
var _d={};
return {registerOnEvent:function registerOnEvent(_e,_f,_10,_11){
if(typeof _e!=="string"||typeof _f!=="function"||typeof _10!=="object"){
throw "Invalid Arguments for registerOnEvent";
}
if(!_c.hasOwnProperty(_e)){
_c[_e]=[];
}
var _12={"callback":_f,"thisArg":_10,"includeEventType":false};
if(_11){
_12.includeEventType=true;
}
_c[_e].push(_12);
},registerOnCategoryEvent:function(_13,_14,_15){
if(typeof _13!=="string"||typeof _14!=="function"||typeof _15!=="object"){
throw "Invalid Arguments for registerOnEventForCategory";
}
if(!_d.hasOwnProperty(_13)){
_d[_13]=[];
}
var _16={"callback":_14,"thisArg":_15,"includeEventType":true};
_d[_13].push(_16);
console.log("ok for "+_13);
},raiseEvent:function raiseEvent(_17){
this._raiseCategoryEvent.apply(this,arguments);
this._raiseNormalEvent.apply(this,arguments);
},_raiseCategoryEvent:function raiseEvent(_18){
var _19=_18.replace(/\..*$/,"");
if(_19!=_18){
console.log("Try to raise catergory "+_19);
var _1a=_d[_19];
if(typeof _1a==="undefined"){
console.warn("No handler category for invoked eventType "+_18+" (category: "+_19+")");
return;
}
for(var i=0;i<_1a.length;i++){
try{
var _1b=Array.prototype.slice.call(arguments);
this._raiseEvent(_1a[i],_1b);
}
catch(e){
console.error(e);
}
}
}
},_raiseNormalEvent:function raiseEvent(_1c){
var _1d=_c[_1c];
if(typeof _1d==="undefined"){
console.warn("No handler for invoked eventType "+_1c);
return;
}
for(var i=0;i<_1d.length;i++){
try{
var _1e=Array.prototype.slice.call(arguments);
this._raiseEvent(_1d[i],_1e);
}
catch(e){
console.error(e);
}
}
},_raiseEvent:function(_1f,_20){
var _21=_1f.callback;
var _22=_1f.thisArg;
var _23=_1f.includeEventType;
if(typeof _21!=="function"){
return;
}
if(!_23){
_20.shift();
}
_21.apply(_22,_20);
}};
}();
rabbit.result.manager={currentPageId:"no",pageNames:null,datePickerClicked:false,customDatepickerObjects:[],init:function(_24,_25,_26){
try{
rabbit.common.i18n.init({lang:rabbit.result.lang});
}
catch(e){
console.error("error during i18n init",e);
}
rabbit.prototypeType=_25;
rabbit.browser=_26;
this.initialPageId=_24;
try{
var _27=document.getElementById("pageData").firstChild;
var _28="";
while(_27!=null){
_28+=_27.nodeValue;
_27=_27.nextSibling;
}
this.pageData=Ext.util.JSON.decode(_28).pages;
var _29=document.getElementById("pageNames").firstChild;
if((_29!=null)&&(_29.nodeValue!="__pageNames__")){
_28="";
while(_29!=null){
_28+=_29.nodeValue;
_29=_29.nextSibling;
}
this.pageNames=Ext.util.JSON.decode(_28);
}
var _2a=document.getElementsByTagName("div");
this.layers=new Array();
this.pageLayers=new Array();
for(var i=0;i<_2a.length;i++){
if(_2a[i].getAttribute("name")=="layer"){
this.layers.push(_2a[i]);
}else{
if(_2a[i].getAttribute("name")=="pageLayer"){
this.pageLayers.push(_2a[i]);
}
}
}
this._initPlugins();
if(_24!=undefined){
rabbit.facade.loadPage(_24);
}
}
catch(e){
console.error(e);
}
rabbit.result.manager._hackToMakeArrowsWork();
},_forceRedraw:function(){
var _2b=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;
var _2c=navigator.userAgent.toLowerCase().indexOf("safari")>-1;
if(_2b||_2c){
document.body.style.webkitTransform="scale(1)";
}else{
if(window.resizeTo&&window.outerWidth&&window.outerHeight){
window.resizeTo(window.outerWidth+1,window.outerHeight+1);
window.resizeTo(window.outerWidth-1,window.outerHeight-1);
}
}
},_hackToMakeArrowsWork:function(){
window.setTimeout(this._forceRedraw,1000);
},_initPlugins:function _initPlugins(){
for(var i=0;i<rabbit.facade._availablePlugins.length;i++){
try{
var _2d=rabbit.facade._availablePlugins[i];
_2d.init.apply(_2d,_2d._initialArguments);
}
catch(e){
console.error(e);
}
}
},_handleDomEvent:function _handleDomEvent(_2e){
return function(_2f){
rabbit.eventDispatcher.raiseEvent(_2e,_2f);
};
},setClass:function(_30,_31){
_30.setAttribute("class",_31);
},goToPage:function(_32){
var _33=this.pageData[_32];
if(_33!==undefined){
if(rabbit.result.manager.isExport){
location.href=rabbit.result.manager.pageNames[_32];
}else{
if(window.parentBody){
window.parentBody.trigger("pidoco:changePage");
}
location.href=rabbit.result.manager.urlPattern.replace(/__page__/,_32);
}
}else{
if(!_32.match(/^[a-zA-Z0-9]*:\/\//)){
_32="http://"+_32;
}
location.href=_32;
}
},showPage:function(_34){
try{
if(_34==""){
return;
}
if(_34==this.currentPageId){
return;
}
var _35=this.pageData[_34];
console.log("show page",_34,_35);
if(_35==undefined){
if(_34.indexOf("://")!=-1){
window.location.href=_34;
}else{
window.location.href="http://"+_34;
}
return;
}
var id;
for(var i=0;i<this.layers.length;i++){
id=this.layers[i].getAttribute("id");
if(_35[id]==true){
$(this.layers[i]).css("left","0px");
$(this.layers[i]).css("top","0px");
}else{
$(this.layers[i]).css("left","-3000px");
$(this.layers[i]).css("top","-3000px");
}
}
for(var i=0;i<this.pageLayers.length;i++){
if(this.pageLayers[i].getAttribute("id")==(_34+"-layer")){
$(this.pageLayers[i]).css("left","0px");
$(this.pageLayers[i]).css("top","0px");
}else{
$(this.pageLayers[i]).css("left","-3000px");
$(this.pageLayers[i]).css("top","-3000px");
}
}
this.changeTab(_34);
rabbit.eventDispatcher.raiseEvent(rabbit.events.pageLoaded,_35);
}
catch(e){
console.error(e);
}
},changeTab:function changeTab(_36){
var _37=selectorUtil.getElementsByName("target"+this.currentPageId);
for(var i=0;i<_37.length;i++){
if(_37[i].getAttribute("class")){
this.setClass(_37[i],_37[i].getAttribute("class").replace(/\bselected\b/,""));
}else{
this.setClass(_37[i],"");
}
}
_37=selectorUtil.getElementsByName("target"+_36);
for(i=0;i<_37.length;i++){
if(_37[i].getAttribute("class")){
this.setClass(_37[i],"selected "+_37[i].getAttribute("class"));
}else{
this.setClass(_37[i],"selected");
}
}
this.currentPageId=_36;
},menuExternalLinkCallback:function(_38){
if(_38.indexOf("://")==-1){
_38="http://"+_38;
}
window.location.href=_38;
},menuClick:function(a,b,_39){
if(rabbit.result.manager.pageData[_39]!=null){
if(rabbit.result.manager.pageNames==null){
if(rabbit.result.manager.currentPageId!=_39){
var url=window.location.href;
url=url.replace(rabbit.result.manager.initialPageId,_39);
window.location.href=url;
}
}else{
if(rabbit.result.manager.pageNames[_39]!=null){
url=window.location.href;
url=url.substr(0,url.lastIndexOf("/"));
window.location.href=url+"/"+rabbit.result.manager.pageNames[_39];
}
}
}else{
rabbit.result.manager.menuExternalLinkCallback(_39);
}
},onSvgBlur:function(id){
rabbit.facade.raiseEvent(rabbit.events.svgBlur,id);
},onPropertyChanged:function(id,_3a){
rabbit.facade.raiseEvent(rabbit.events.propertyChange,id,_3a);
},onSvgFocus:function(id){
rabbit.facade.raiseEvent(rabbit.events.svgFocus,id);
},onSvgChanged:function(id,_3b){
rabbit.facade.raiseEvent(rabbit.events.checkBoxClicked,id,_3b);
},fireMouseOn:function(id){
rabbit.facade.fireMouseOn(id);
},setupDatepicker:function(id){
rabbit.stencils.datepicker.setupDatepicker(id);
},setupMenu:function(id,_3c){
rabbit.stencils.menu.setupMenu(id,_3c);
},setFill:function(id,_3d){
rabbit.stencils.stencil.setFill(id,_3d);
},setupSlider:function(id,_3e,_3f,_40,pos){
rabbit.stencils.slider.setupSlider(id,_3e,_3f,_40,pos);
}};
rabbit.facade=function _returnFacade(){
var _41=rabbit.eventDispatcher;
return {_availablePlugins:[],vml:false,registerPlugin:function registerPlugin(_42,_43){
try{
var _44=Array.prototype.slice.call(arguments);
_44.shift();
_42._initialArguments=_44;
this._availablePlugins.push(_42);
}
catch(e){
console.log(e);
}
},registerOnEvent:function registerOnEvent(_45,_46,_47){
try{
if(_.isArray(_45)){
for(var i=0;i<_45.length;i++){
console.debug("Registering a handler for "+_45[i]);
_41.registerOnEvent(_45[i],_46,_47,true);
}
}else{
if(_.isString(_45)){
console.debug("Registering a handler for "+arguments[0]);
_41.registerOnEvent(_45,_46,_47,false);
}
}
}
catch(e){
console.error(e);
return undefined;
}
},registerOnCategoryEvent:function(_48,_49,_4a){
try{
_41.registerOnCategoryEvent(_48,_49,_4a,true);
}
catch(e){
console.error(e);
return undefined;
}
},raiseEvent:function raiseEvent(_4b){
console.debug("Raising a "+arguments[0]+" event");
try{
return _41.raiseEvent.apply(_41,arguments);
}
catch(e){
console.error(e);
return undefined;
}
},fireMouseOn:function fireMouseOn(_4c){
var _4d=document.getElementById(_4c);
if(_4d==null){
return;
}
console.debug("Forwarding a click event to "+_4c);
_4d.click();
_4d.focus();
},loadPage:function loadPage(_4e){
return rabbit.result.manager.showPage(_4e);
},getBaseUrl:function getBaseUrl(){
return rabbit.result.manager.baseUrl;
},getPageUrl:function getPageUrl(){
return this.getBaseUrl()+rabbit.result.manager.currentPageId;
},getRole:function getRole(){
return rabbit.result.manager.currentRole;
}};
}();
if(typeof (console)==="undefined"){
Console=function(){
this.log=function(){
};
this.warn=function(){
};
this.error=function(){
};
this.debug=function(){
};
};
console=new Console();
}else{
if(typeof console.debug==="undefined"){
console.warn=console.log;
console.debug=console.log;
}else{
if(rabbit.logLevel==="error"){
console.warn=function(){
};
console.log=function(){
};
console.debug=function(){
};
}else{
if(rabbit.logLevel==="warn"){
console.log=function(){
};
console.debug=function(){
};
}else{
if(rabbit.logLevel==="log"){
console.debug=function(){
};
}
}
}
}
}
if((!document.URL.match(/http:\/\/localhost:.*/))&&(!document.URL.match(/http(s)?:\/\/stage\.pidoco\.com.*/))){
console.log=function(){
};
console.error=function(e){
var _4f={"message":e.name+": "+e.message,"url":e.fileName,"line":e.lineNumber,"stack":e.stack,"userAgent":navigator.userAgent,"pageId":rabbit.result.manager.currentPageId};
jQuery.post(rabbit.result.manager.baseUrl+rabbit.result.manager.currentPageId+"/errorreport","data="+Ext.util.JSON.encode(_4f));
};
}
rabbit.interaction={actions:{click:"action.click",hover:"action.hover"},reactions:{showPage:function(_50,_51,_52){
if(_52.withoutReload=="true"){
rabbit.facade.loadPage(_52.target);
}else{
rabbit.result.manager.goToPage(_52.target);
}
}},registerInteraction:function(_53,_54,_55){
if(!_.isArray(_55)){
_55=[_55];
}
if(!_.has(rabbit.interaction.actions,_53.type)){
console.error("Action \""+_53.type+"\" is not supported");
}
_.each(_55,function(_56){
if(!_.has(rabbit.interaction.reactions,_56.type)){
console.error("Reaction \""+_56.type+"\" is not supported");
}
});
rabbit.interaction.actionTriggers[_53.type](_53,_54,_55);
rabbit.facade.registerOnEvent(rabbit.interaction.actions[_53.type]+"-"+_54,function(e){
_.each(_55,function(_57){
rabbit.interaction.reactions[_57.type](e,$("#"+_54),_57);
});
},null,_54);
},actionTriggers:{click:function(_58,_59,_5a){
$("#"+_59).on("click",function(e){
rabbit.facade.raiseEvent("action.click-"+_59,rabbit.interaction.serializeEvent(e));
});
},hover:function(_5b,_5c,_5d){
$("#"+_5c).on("mouseenter",function(e){
rabbit.facade.raiseEvent("action.hover-"+_5c,rabbit.interaction.serializeEvent(e));
});
}},serializeEvent:function(e){
return {type:e.type};
}};
if(!rabbit.plugins){
rabbit.plugins={};
}
rabbit.plugins.background=function(){
var _5e=rabbit.facade;
return {init:function init(){
_5e.registerOnEvent(rabbit.events.pageLoaded,this.adjustBackgroundImage,this);
},adjustBackgroundImage:function adjustBackgroundImage(_5f){
var _60=document.getElementById("borderDiv");
_60.style.width=_5f.width+"px";
_60.style.height=_5f.height+"px";
var _61=document.getElementById("background");
_61.setAttribute("width",_5f.width);
_61.setAttribute("height",_5f.height);
_61.setAttribute("style","width:"+_5f.width+"px;height:"+_5f.height+"px;");
this._replaceBackgroundImage(_5f);
},_replaceBackgroundImage:function _replaceBackgroundImage(_62){
if(!_5e.vml){
var _63=document.getElementById("background");
var _64=_63.getElementsByTagNameNS("http://www.w3.org/2000/svg","image")[0];
_64.setAttribute("width",_62.width);
_64.setAttribute("height",_62.height);
if(_62.image!==""){
_64.setAttribute("display","inherit");
_64.setAttributeNS("http://www.w3.org/1999/xlink","href",_62.image);
}else{
_64.setAttribute("display","none");
_64.removeAttributeNS("http://www.w3.org/1999/xlink","href");
}
}else{
var _63=document.getElementById("background");
var _64=document.createElement("img");
_64.style.width="";
_64.style.height="";
_64.setAttribute("src",_62.image.replace("_(d)+Z",""));
_63.replaceChild(_64,_63.firstChild);
if(_62.image==""){
_64.style.display="none";
}else{
_64.style.display="inline";
this._adjustBackgroundImgSize(_62.width,_62.height);
}
}
},_adjustBackgroundImgSize:function _adjustBackgroundImgSize(_65,_66){
if(!document.images[0].complete){
window.setTimeout("rabbit.plugins.background._adjustBackgroundImgSize("+_65+", "+_66+");",100);
return;
}
var _67=document.images[0].width;
var _68=document.images[0].height;
if(_67/_68>_65/_66){
document.images[0].width=_65;
document.images[0].height=_68*_65/_67;
}else{
document.images[0].width=_67*_66/_68;
document.images[0].height=_66;
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.background);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.autocomplete=(function(){
return {init:function init(){
},setupAutocomplete:function setupAutocomplete(id,_69){
_69=_69.split("|c");
var oDS=new YAHOO.util.LocalDataSource(_69);
oDS.responseSchema={fields:["state"]};
var oAC=new YAHOO.widget.AutoComplete(id+"-input",id+"-con",oDS);
oAC.prehighlightClassName="yui-ac-prehighlight";
oAC.useShadow=false;
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.autocomplete);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.accordion=function(){
var _6a=600;
var _6b=".accordion-header";
var _6c=".accordion-content";
var _6d="accordion-active";
var _6e=30;
var _6f=function(_70){
var _71=$(_70).parents().children(_6b);
var _72=_71.index(_70);
return _72;
};
var _73=function(_74){
return $(_74).parent().parent().parent().attr("id");
};
var _75=function(_76){
return $("#"+_76).find(_6b).length;
};
var _77=function(_78,_79,_7a){
var _7b=$("#"+_78+">div>"+_6b).length;
$("#"+_78).find(_6c+">div").css("position","relative").css("left","0px").css("top","0px").css("width",_79+"px").css("height",(_7a-_7b*_6e-2)+"px");
};
return {_accordions:{},init:function init(){
},setupAccordion:function(id,_7c,_7d,_7e){
var _7f=_75(id);
if(_7e<1){
_7e=1;
}
if(_7e>_7f){
_7e=_7f;
}
_7e--;
$("#"+id).find(_6b).click({"accordionObject":this},this.raiseClickCallback);
_77(id,_7c,_7d);
this.showTab(id,_7e,false);
},showTab:function(id,_80,_81){
this._accordions[id]=_80;
if(_81){
$("#"+id).find(_6c).slideUp(_6a);
}else{
$("#"+id).find(_6c).hide();
}
var _82=$("#"+id).find(_6b).removeClass(_6d)[_80];
$(_82).addClass(_6d).next().slideDown(_6a,function onCompleteCallback(){
if(BrowserDetect.browser=="MSIE"){
$(this).css("width",$(this).css("width"));
}
});
},raiseClickCallback:function(evt){
evt.data.accordionObject.clickCallback(evt.data.accordionObject,this);
},clickCallback:function(_83,_84){
var _85=_6f(_84);
var _86=_73(_84);
if(_83._accordions[_86]===_85){
return;
}
_83.showTab(_86,_85,true);
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.accordion);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.button=function(){
var _87=rabbit.facade;
return {init:function init(){
_87.registerOnEvent(rabbit.events.buttonMouseOver,this.onMouseOver,this);
_87.registerOnEvent(rabbit.events.buttonMouseOut,this.onMouseOut,this);
},onMouseOver:function onMouseOver(id){
document.getElementById(id).className="ClickableSketchHover";
},onMouseOut:function onMouseOut(id){
document.getElementById(id).className="ClickableSketch";
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.button);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.checkBox=function(){
var _88=rabbit.facade;
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.checkBoxClicked,this.onClick,this);
},onClick:function onClick(_89,_8a){
console.log("Click to checkbox "+_89);
var _8b=document.getElementById(_89);
if(_8b==null){
return true;
}
var _8c=document.getElementById(_8a);
if(_8c==null){
return true;
}
if(!_8b.checked){
_8c.setAttribute("visibility","hidden");
}else{
_8c.setAttribute("visibility","inherit");
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.checkBox);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.datepicker=function(){
var _8d=rabbit.facade;
var _8e=[];
var _8f=false;
var _90=null;
var _91=function(id){
for(var i=0;i<_8e.length;i++){
var _92=_8e[i];
if(_92.calendarId==id){
return _92;
}
}
return null;
};
var _93=function(id,_94,_95){
var _96=_91(id);
_96.calendar.setYear(_94);
_96.calendar.setMonth(_95);
_96.calendar.render();
};
var _97=function _hideCalendar(id,_98,_99){
if(_98){
document.getElementById(id+"_input").value=_98;
}
var _9a=_91(id);
_9a.calendarVisible=false;
var svg=document.getElementById(_9a.calendarId+"_open_calendar");
if(svg){
svg.style.display="none";
}
_9a.calendar.hide();
_9a.overlay.hide();
_8f=false;
$("html").unbind("click",_90);
};
var _9b=function _showCalendar(id,_9c){
var _9d=_91(id);
_9d.calendarVisible=true;
_9d.calendar.show();
_9d.overlay.show();
_8f=true;
var svg=document.getElementById(_9d.calendarId+"_open_calendar");
if(svg){
svg.style.display="block";
}
_90=function(e){
if(!rabbit.util.isElementChildOfSelector(e.target,"#"+id)){
_97(id);
}
};
$("html").bind("click",_90);
};
var _9e=function _9e(_9f){
for(var i=0;i<_9f.childNodes.length;i++){
var _a0=_9f.childNodes[i];
if(_a0.nodeType!=1){
continue;
}
if(_a0.getAttribute("id")==undefined){
_a0.setAttribute("id",_9f.getAttribute("id")+"_"+i);
}
arguments.callee(_a0);
}
};
var _a1=function _a1(evt){
if(!evt){
return;
}
if(!_8d.vml){
evt.stopPropagation();
}else{
evt.cancelBubble=true;
}
};
return {init:function init(){
_8d.registerOnEvent(rabbit.events.click,this.hideDatePickerOnClick,this);
rabbit.facade.registerOnEvent(rabbit.events.showDatepicker,_9b,this);
rabbit.facade.registerOnEvent(rabbit.events.hideDatepicker,_97,this);
rabbit.facade.registerOnEvent(rabbit.events.changeDatepickerPage,_93,this);
},calendarOpen:function(id){
return _8f;
}(),setupDatepicker:function setupDatepicker(id){
try{
var _a2=new YAHOO.widget.Overlay(id+"_ov",{zIndex:9990,width:"200px",height:"200px",context:[id+"_input","tl","bl"]});
_a2.render();
if(rabbit.result.lang=="de"){
var cal=new YAHOO.widget.Calendar(id+"_cal",{START_WEEKDAY:1});
cal.cfg.setProperty("DATE_FIELD_DELIMITER",".");
cal.cfg.setProperty("MDY_DAY_POSITION",1);
cal.cfg.setProperty("MDY_MONTH_POSITION",2);
cal.cfg.setProperty("MDY_YEAR_POSITION",3);
cal.cfg.setProperty("MD_DAY_POSITION",1);
cal.cfg.setProperty("MD_MONTH_POSITION",2);
cal.cfg.setProperty("MONTHS_SHORT",["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]);
cal.cfg.setProperty("MONTHS_LONG",["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]);
cal.cfg.setProperty("WEEKDAYS_1CHAR",["S","M","D","M","D","F","S"]);
cal.cfg.setProperty("WEEKDAYS_SHORT",["So","Mo","Di","Mi","Do","Fr","Sa"]);
cal.cfg.setProperty("WEEKDAYS_MEDIUM",["Son","Mon","Die","Mit","Don","Fre","Sam"]);
cal.cfg.setProperty("WEEKDAYS_LONG",["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]);
}else{
var cal=new YAHOO.widget.Calendar(id+"_cal");
}
var _a3=new Object();
_a3["calendar"]=cal;
_a3.overlay=_a2;
_a3["calendarId"]=id;
_a3["calendarVisible"]=false;
_8e.push(_a3);
cal.selectEvent.subscribe(rabbit.util.bind(function(evt,d){
var _a4=this.formatIsoDate(d[0][0][0],d[0][0][1],d[0][0][2]);
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_a3.calendarId,_a4,rabbit.util.userRole,"displayMouseClick");
},this),cal,true);
cal.render();
cal.hide();
_a2.hide();
var _a5=id+"_cal";
_9e(document.getElementById(id+"_cal"));
cal.changePageEvent.subscribe(rabbit.util.bind(function(evt,d){
var _a6=cal.cfg.getProperty("pagedate");
var _a7=_a6.getUTCFullYear();
var _a8=_a6.getMonth();
rabbit.facade.raiseEvent(rabbit.events.changeDatepickerPage,_a3.calendarId,_a7,_a8,rabbit.util.userRole,"displayMouseClick");
_9e(document.getElementById(_a5));
},this),cal,true);
YAHOO.util.Event.addListener(id+"_button","click",rabbit.util.bind(this.toggleCalendarCallback,this),_a3);
YAHOO.util.Event.addListener(id+"_input","focus",rabbit.util.bind(this.toggleCalendarCallback,this),_a3);
YAHOO.util.Event.addListener(id+"_ov","click",_a1);
}
catch(e){
console.error("Error setting up datepicker");
console.error(e);
}
},hideDatePickerOnClick:function hideDatePickerOnClick(e){
if(this.calendarOpen){
for(var i=0;i<_8e.length;i++){
var _a9=_8e[i];
if(_a9.calendarVisible){
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_a9.calendarId,null,rabbit.util.userRole,"displayMouseClick");
}
}
}
},toggleCalendarCallback:function toggleCalendarCallback(evt,_aa){
if(!_aa.calendarVisible){
rabbit.facade.raiseEvent(rabbit.events.showDatepicker,_aa.calendarId,rabbit.util.userRole,"displayMouseClick");
this.calendarOpen=true;
}else{
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_aa.calendarId,null,rabbit.util.userRole,"displayMouseClick");
this.calendarOpen=false;
}
_a1(evt);
},formatIsoDate:function formatIsoDate(y,m,d){
return y.toString()+(m<10?"-0":"-")+m.toString()+(d<10?"-0":"-")+d.toString();
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.datepicker);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.menu=function(){
var _ab=[];
var _ac=function(_ad){
for(var i=0;i<_ab.length;i++){
var _ae=_ab[i];
if(_ae.domId==_ad){
return _ae;
}
}
return null;
};
var _af=function(_b0,_b1){
var _b2=_ac(_b0);
if(_b2){
for(var i=0;i<_b1.length;i++){
var _b3=_b2.getSubmenus();
for(var j=0;j<_b3.length;j++){
if(_b3[j].id==_b1[i]){
_b2=_b3[j];
}
}
}
}
return _b2;
};
var _b4=function(_b5,_b6,_b7){
if(_b7!=null&&_b7!=rabbit.util.userRole){
var _b8=_af(_b5,_b6);
if(_b8){
_b8.show();
}
}
};
var _b9=function(_ba,_bb,_bc){
if(_bc!=null&&_bc!=rabbit.util.userRole){
var _bd=_af(_ba,_bb);
if(_bd){
_bd.hide();
}
}
};
var _be=function(obj){
var _bf=obj;
var _c0=[];
while(_bf.getRoot()!=_bf){
_c0.push(_bf.id);
_bf=_bf.getRoot();
}
var _c1=_bf.domId;
var _c2=[];
for(var i=_c0.length-1;i>=0;i--){
_c2.push(_c0[i]);
}
return [_c1,_c2];
};
var _c3=function(){
var _c4=_be(this);
rabbit.facade.raiseEvent(rabbit.events.subMenuShow,_c4[0],_c4[1],rabbit.util.userRole);
};
var _c5=function(){
var _c6=_be(this);
rabbit.facade.raiseEvent(rabbit.events.subMenuHide,_c6[0],_c6[1],rabbit.util.userRole);
};
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.subMenuShow,_b4,this);
rabbit.facade.registerOnEvent(rabbit.events.subMenuHide,_b9,this);
},setupMenu:function setupMenu(id,_c7,_c8){
try{
_c7=_c7.replace(/&quot;/g,"\"");
_c7=Ext.util.JSON.decode(_c7);
if(_c8=="vertical"){
var _c9=new YAHOO.widget.Menu(id+"-bar",{itemdata:_c7,visible:true,position:"static",hidedelay:750,lazyload:true});
}else{
var _c9=new YAHOO.widget.MenuBar(id+"-bar",{lazyload:true,autosubmenudisplay:true,showdelay:10,itemdata:_c7});
}
_c9.render(id+"-menu-container");
_c9.show();
_c9.domId=id;
_ab.push(_c9);
_c9.subscribe("show",_c3);
_c9.subscribe("hide",_c5);
}
catch(e){
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.menu);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.radioButton=function(){
var _ca=rabbit.facade;
return {init:function init(){
_ca.registerOnEvent(rabbit.events.radioButtonClicked,this.onClick,this);
},getAllRadioButtons:function getAllRadioButtons(){
var _cb=[];
var _cc=document.getElementsByTagName("input");
for(var i=0;i<_cc.length;i++){
if(_cc[i].type==="radio"){
_cb.push(_cc[i]);
}
}
return _cb;
},onClick:function onClick(_cd,_ce){
console.log("Click to radioButton "+_cd);
var _cf=this.getAllRadioButtons();
for(var i=0;i<_cf.length;i++){
var _d0=_cf[i];
var _d1=_d0.getAttribute("id")+"_svgChecked";
var _d2=document.getElementById(_d1);
if(_d2!=null){
if(!_d0.checked){
if(rabbit.facade.vml){
_d2.style.setAttribute("display","none");
}else{
_d2.setAttribute("visibility","hidden");
}
}else{
if(rabbit.facade.vml){
_d2.style.removeAttribute("display");
}else{
_d2.setAttribute("visibility","inherit");
}
}
}
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.radioButton);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.slider=function(){
var _d3={};
var _d4=function(_d5,_d6,_d7){
var _d8=_d3[_d5];
if(!_d8){
return;
}
if(_d7!=null&&_d7!=rabbit.util.userRole){
console.log("_sliderChangedCallback "+_d6);
_d8.setValue(_d6);
}
};
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.sliderChangedEvent,_d4,this);
},setupSlider:function(id,_d9,_da,_db,_dc){
try{
_d9=parseInt(_d9);
_db=parseInt(_db);
if(_dc){
_dc=parseInt(_dc)*2;
}else{
_dc=0;
}
var _dd=(_db-(_db)/21)/10;
var _de=_dd*_d9;
var _df=_db-_de;
var _e0=null;
if(_da=="vertical"){
_e0=YAHOO.widget.Slider.getVertSlider(id,id+"_thumb_vert",_df,_de,_dd);
}else{
_e0=YAHOO.widget.Slider.getHorizSlider(id,id+"_thumb_horiz",_df,_de,_dd);
}
_d3[id]=_e0;
_e0.animate=false;
_e0.subscribe("change",function(){
var _e1=Math.round(this.getValue()+_dc);
rabbit.facade.raiseEvent(rabbit.events.sliderChangedEvent,id,_e1,rabbit.util.userRole);
});
}
catch(e){
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.slider);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.stencil=function(){
var _e2=rabbit.facade;
var _e3=function _e3(_e4,_e5){
var _e6=document.getElementById(_e4);
if(_e6){
_e6.style.setProperty("fill",_e5,"");
}
};
var _e7=function _e7(_e8,_e9){
var _ea,_eb=document.getElementById(_e8);
if(_eb){
if(_e9=="url(#sketchedHover)"){
_ea=_eb.ownerDocument.createElement("v:fill");
_ea.setAttribute("src",rabbit.common.baseUrl+"result/icons/sketchedFilledButton.png");
_ea.setAttribute("type","tile");
_ea.setAttribute("origin","0.1,0.1");
_ea.setAttribute("size","175pt,75pt");
_ea.setAttribute("on","true");
_eb.getElementsByTagName("fill")[0].parentNode.replaceChild(_ea,_eb.getElementsByTagName("fill")[0]);
}else{
_ea=_eb.ownerDocument.createElement("v:fill");
_ea.setAttribute("color",_e9);
_ea.setAttribute("on"," true");
_eb.getElementsByTagName("fill")[0].parentNode.replaceChild(_ea,_eb.getElementsByTagName("fill")[0]);
}
}
};
return {init:function init(){
_e2.registerOnEvent(rabbit.events.svgFocus,this.onSvgFocus,this);
_e2.registerOnEvent(rabbit.events.svgBlur,this.onSvgBlur,this);
_e2.registerOnEvent(rabbit.events.propertyChange,this.onPropertyChanged,this);
},setFill:function setFill(id,_ec){
if(rabbit.facade.vml){
_e7(id,_ec);
}else{
_e3(id,_ec);
}
},onSvgFocus:function onSvgFocus(_ed){
var _ee;
if(_ed instanceof Array){
for(var key in _ed){
_ee=document.getElementById(_ed[key]);
if(_ee!=null){
_ee.setAttribute("class","svg_selected_element");
}
}
}else{
_ee=document.getElementById(_ed);
if(_ee!=null){
_ee.setAttribute("class","svg_selected_element");
}
}
},onSvgBlur:function onSvgBlur(_ef){
var _f0;
if(_ef instanceof Array){
for(var key in _ef){
_f0=document.getElementById(_ef[key]);
if(_f0!=null){
_f0.setAttribute("class","svg_unselected_element");
}
}
}else{
_f0=document.getElementById(_ef);
if(_f0!=null){
_f0.setAttribute("class","svg_unselected_element");
}
}
},onPropertyChanged:function onPropertyChanged(_f1,_f2){
var _f3=document.getElementById(_f2);
if(_f3==null){
return true;
}
console.debug("Property changed on "+_f1);
if(event.srcElement[event.propertyName]==false){
_f3.style.setAttribute("display","none");
}else{
_f3.style.removeAttribute("display");
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.stencil);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.tabButton=function(){
var _f4=rabbit.facade;
var _f5=function _f5(_f6,_f7){
var _f8=document.getElementById(_f6);
if(_f8){
_f8.className=_f7;
}
};
var _f9=function _f9(_fa,_fb){
var _fc=document.getElementById(_fa);
if(_fc){
_fc.style.setProperty("fill",_fb,"");
}
};
var _fd=function _fd(_fe,_ff){
var _100,node=document.getElementById(_fe);
if(node){
if(_ff=="url(#sketchedHover)"){
_100=node.ownerDocument.createElement("v:fill");
_100.setAttribute("src",rabbit.common.baseUrl+"result/icons/sketchedFilledButton.png");
_100.setAttribute("type","tile");
_100.setAttribute("origin","0.1,0.1");
_100.setAttribute("size","175pt,75pt");
_100.setAttribute("on","true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_100,node.getElementsByTagName("fill")[0]);
}else{
_100=node.ownerDocument.createElement("v:fill");
_100.setAttribute("color",_ff);
_100.setAttribute("on"," true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_100,node.getElementsByTagName("fill")[0]);
}
}
};
return {init:function init(){
_f4.registerOnEvent(rabbit.events.tabButtonMouseOver,this.handleMouseOver,this);
_f4.registerOnEvent(rabbit.events.tabButtonMouseOut,this.handleMouseOut,this);
_f4.registerOnEvent(rabbit.events.loadPage,this.loadPage,this);
},loadPage:function loadPage(_101){
_f4.loadPage(_101);
},handleMouseOver:function handleMouseOut(id,mode){
if(rabbit.prototypeType=="IOS"&&(rabbit.browser=="mobile"||rabbit.browser=="iphone")){
return;
}
if(typeof id!=="string"||(mode!=="result"&&mode!=="sketched")){
console.error("Updating tabButton "+id+" failed.");
return;
}
try{
if(mode==="sketched"){
_f5(id+"_div_small","ClickableSketchHover");
_f5(id+"_div_big","ClickableSketchHover");
}else{
if(rabbit.vml){
_fd(id+"_big_path","#EEEEEE");
_fd(id+"_small_path","#EEEEEE");
}else{
_f9(id+"_big_path","#EEEEEE");
_f9(id+"_small_path","#EEEEEE");
}
}
}
catch(e){
console.error("Updating tabButton "+id+" failed.");
console.error(e);
}
},handleMouseOut:function handleMouseOut(id,mode){
if(rabbit.prototypeType=="IOS"&&(rabbit.browser=="mobile"||rabbit.browser=="iphone")){
return;
}
if(typeof id!=="string"||(mode!=="result"&&mode!=="sketched")){
console.error("Updating tabButton "+id+" failed.");
return;
}
try{
if(mode==="sketched"){
_f5(id+"_div_small","ClickableSketch");
_f5(id+"_div_big","ClickableSketch");
}else{
if(rabbit.vml){
_fd(id+"_big_path","white");
_fd(id+"_small_path","white");
}else{
_f9(id+"_big_path","white");
_f9(id+"_small_path","white");
}
}
}
catch(e){
console.error("Updating tabButton "+id+" failed.");
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.tabButton);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.iphoneSwitch=function(){
var _102=rabbit.facade;
return {init:function init(){
_102.registerOnEvent(rabbit.events.iphoneSwitchClicked,this.onClick,this);
},onClick:function onClick(id){
$("#"+id).toggleClass("switch-selected");
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.iphoneSwitch);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.rating=function(){
var _103="rating_white.png";
var _104="rating_black.png";
var _105=rabbit.facade;
var _106=new Array();
var _107=function(id){
if(_106[id]){
return parseInt(_106[id]);
}
return 0;
};
var _108=function(id,_109){
_106[id]=_109;
};
var _10a=function(id,_10b){
var i=1;
_10b=parseInt(_10b);
while(true){
var _10c=document.getElementById(id+"-"+i);
if(_10c==null){
break;
}
var _10d=_10c.getAttribute("src");
_10d=_10d.substring(0,_10d.lastIndexOf("/")+1);
if(i>=_10b+1){
_10d+=_103;
}else{
_10d+=_104;
}
_10c.setAttribute("src",_10d);
i++;
}
};
return {init:function init(){
_105.registerOnEvent(rabbit.events.ratingResultChangedEvent,this.onClick,this);
_105.registerOnEvent(rabbit.events.ratingMouseOut,this.onMouseOut,this);
_105.registerOnEvent(rabbit.events.ratingMouseOver,this.onMouseOver,this);
},onLoad:function onLoad(id,_10e){
_108(id,_10e);
},onClick:function onClick(id,_10f){
_108(id,_10f);
_10a(id,_10f);
},onMouseOut:function onMouseOut(id){
_10a(id,_107(id));
},onMouseOver:function onMouseOver(id,_110){
_10a(id,parseInt(_110));
},checkMouseOutDiv:function(id,_111){
if(_111.relatedTarget){
return _111.relatedTarget.id.indexOf(id)==-1;
}else{
return _111.toElement.id.indexOf(id)==-1;
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.rating);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.tree=function(){
var _112=20;
return {_trees:{},init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.treeViewNodeClicked,this.clickCallback,this);
rabbit.facade.registerOnEvent(rabbit.events.treeViewScrolled,this.scrollCallback,this);
},setupTree:function setupMenu(id,_113){
try{
_113=_113.replace(/&quot;/g,"\"");
_113=Ext.util.JSON.decode(_113);
this._trees[id]=_113;
}
catch(e){
console.error(e);
}
},clickCallback:function(_114,sth){
var _115=document.getElementById(_114+"-buttonvline");
var _116="open";
if(_115){
if(_115.style.display=="none"){
_116="closed";
}
if(_116=="closed"){
_115.style.display="";
}else{
_115.style.display="none";
}
var elem=document.getElementById(_114+"-treeviewnodeid");
if(elem&&elem.nextSibling){
if(_116=="closed"){
elem.nextSibling.style.display="none";
}else{
elem.nextSibling.style.display="";
}
this.update(_114,_116);
}
}
},scrollCallback:function(id,_117,_118){
var _119=document.getElementById(id);
_119.scrollTop=_117;
_119.scrollLeft=_118;
},update:function(_11a,_11b){
this.setStatus(_11a,_11b);
this.recalculateLineLengths(_11a);
},setStatus:function(_11c,_11d){
var tree=this.getTree(_11c);
if(tree){
this.setStatusOnSubtree(this.getTreeName(_11c),tree,_11c,_11d);
}
},setStatusOnSubtree:function(_11e,tree,_11f,_120){
if(tree){
for(var i=0;i<tree.length;i++){
var node=tree[i];
var _121=_11e+"-"+i;
if(_121==_11f){
node.treeItemType=(_120=="closed"?"-":"+");
return true;
}
if(node.subtree){
if(this.setStatusOnSubtree(_121,node.subtree,_11f,_120)){
return true;
}
}
}
}
},recalculateLineLengths:function(_122){
var tree=this.getTree(_122);
if(tree){
var _123=this.getTreeName(_122);
var _124=document.getElementById(_123+"-openingvline");
this.traverseTree(_123,_124,tree,null);
}
},traverseTree:function(_125,node,_126,_127){
var _128=false;
if(_127==null){
_127={0:0,1:0};
_128=true;
}
var rows=0;
var _129=0;
var _12a=0;
var _12b=0;
_127[0]=0;
_127[1]=0;
if(!_128){
rows++;
}
if(_126){
for(var i=0;i<_126.length;i++){
var _12c=_126[i];
var _12d=null;
if(_12c.subtree){
_12d=_12c.subtree;
}
this.traverseTree(_125+"-"+i,_12c,_12d,_127);
_12a=_129+1;
_129=_129+_127[0];
_12b=_12b+_127[1];
}
}
var _12e=null;
if(_128){
_12e=node;
}else{
_12e=document.getElementById(_125+"-openingvline");
}
if(_12e){
var _12f=_12e.parentNode;
_12f.style.height=""+(_112*_129)+"px";
var _130=(_12a-_12b)*_112;
_12e.style.top=""+_130+"px";
}else{
}
if(_128||"+"==node.treeItemType){
_127[0]=rows+_129;
}else{
_127[0]=rows;
}
_127[1]=rows+_12b;
},getTree:function(_131){
if(_131){
var _132=this.getTreeName(_131);
if(this._trees[_132]){
return this._trees[_132];
}else{
return null;
}
}
},getTreeName:function(_133){
return _133.substring(0,_133.indexOf("-"));
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.tree);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.togglesection=function(){
var _134=0;
var _135=".togglesection-header";
var _136=".togglesection-content";
var _137="content";
var _138="#borderDiv";
var _139="open";
var _13a=rabbit.facade;
var _13b=function(_13c,_13d){
$("#"+_13c+_137).find(".iframe").css("width",_13d+"px");
};
return {togglers:new Array(),init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.pageLoaded,this.pageLoaded,this);
rabbit.facade.registerOnEvent(rabbit.events.toggleToggleSection,this.toggle,this);
},setupToggler:function(id,_13e,_13f){
console.log("setup toggle",id,_13e);
this.togglers.push({id:id,page:_13e});
$("#"+id).find(_135).click(function(){
rabbit.facade.raiseEvent(rabbit.events.toggleToggleSection,id);
});
$(_138).append($("#"+id).find(_136));
},pageLoaded:function(_140){
for(var i=0;i<this.togglers.length;i++){
$("#"+this.togglers[i].id+_137).hide();
}
},toggle:function(_141){
$("#"+_141+_137).slideToggle(_134,function(){
$("#"+_141).toggleClass(_139);
});
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.togglesection);
rabbit.common={baseUrl:"/rabbit/"};
if(rabbit.common==undefined){
rabbit.common={};
}
rabbit.common.i18n={translation:{},init:function(_142){
this.lang=_142.lang;
if((!this.lang)||(!this.translation[this.lang])){
this.lang="en";
}
},t:function(key,_143){
if(_143){
var _144=key.toLowerCase();
_144=_144.replace(/ /g,"-");
_144=_143+"."+_144;
}else{
var _144=key;
}
var lang=rabbit.common.i18n.lang;
if(!rabbit.common.i18n.translation[lang]){
console.log("no lang found for",key);
lang="en";
}
if(!rabbit.common.i18n.translation[lang]){
console.log("no lang found for",key);
return key;
}
if(rabbit.common.i18n.translation[lang][_144]){
return rabbit.common.i18n.translation[lang][_144];
}
return key;
},translation:{}};
var t=rabbit.common.i18n.t;

