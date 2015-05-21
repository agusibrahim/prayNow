// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

if(window.location.pathname.indexOf("android_asset")>-1){
	$$("body").css({"zoom": "90%"});
}else{
	$$("body").css({"zoom": "130%"});
}
var PT = new PrayTimes('Makkah');
myApp.alert("detect location");
navigator.geolocation.getCurrentPosition(function (pos){
var pp=PT.getTimes(new Date(), [pos.coords.latitude, pos.coords.longitude], +7);
var list = ['Imsak', 'Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
for(p in list){
	var html='<li><div class="item-content"><div class="item-inner"> <div class="link item-title">'+list[p]+'</div><div class="item-after">'+pp[list[p].toLowerCase()]+'</div></div></div></li>';
	$$(".list-block ul").append(html);
}
$('#timer-7').timer({duration: 45, unit: 'm'});
myApp.closeModal();
}, function (err){
	alert(err.toString());
});
document.addEventListener("deviceready", function(){
var div = document.getElementById("map_canvas");
map = plugin.google.maps.Map.getMap(div, {
  'controls': {
    'compass': true,
    'myLocationButton': true,
    'zoom': true
  }
});
map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
function onMapReady() {
  var button = document.getElementById("button");
  button.addEventListener("click", onBtnClicked, false);
}
function onBtnClicked() {
	map.showDialog();
}

});

